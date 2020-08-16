import {Request, Response} from "express"

import db from "../database/connection"
import convertHourToMinutes from "../utils/convertHourToMinutes"


interface ScheduleItem {
    week_day: number;
    from: string;
    to: string;
}



export default class ClassesController {
    async index (req: Request, res: Response){
        const filters = req.query

        const subject = filters.subject as string
        const week_day = filters.week_day as string
        const time = filters.time as string

        if(!filters.subject || !filters.week_day || !filters.time) {
            return res.status(400).json({
                error: "Missing filters to search classes"
            })
        }

        const timeInMinute = convertHourToMinutes(time)

        const classes = await db("classes")
        .whereExists(function (){
            this.select("class_schedule.*")
            .from("class_schedule")
            .whereRaw('`class_schedule`.`class_id` = `classes`.`id`')
            .whereRaw('`class_schedule`.`week_day` = ??', [Number(week_day)])
            .whereRaw('`class_schedule`.`from` <= ??', [timeInMinute])
            .whereRaw('`class_schedule`.`to` > ??', [timeInMinute])
        })
        .where("classes.subject", subject)
        .join("users", "classes.user_id", "=", "users.id")
        .select("classes.*", "users.*")

        return res.json(classes)

    }
    
    async create(req: Request, res: Response){
        const {
            name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost,
            schedule} = req.body
    
            const trx = await db.transaction()
    
    
            try {        
    
                const insertedUsersIds = await trx("users").insert({
                    name,
                    avatar,
                    whatsapp,
                    bio
                })
    
                const user_id = insertedUsersIds[0]
    
                const insertedClassesIds = await trx("classes").insert({
                    subject,
                    cost,
                    user_id
                })
    
                const class_id = insertedClassesIds[0]
    
                const classSchedule = schedule.map((scheduleItem: ScheduleItem) => {
                    return {
                        class_id,
                        week_day: scheduleItem.week_day,
                        from: convertHourToMinutes(scheduleItem.from),
                        to: convertHourToMinutes(scheduleItem.to)
                    }
                })
    
                await trx("class_schedule").insert(classSchedule)
    
                await trx.commit()
    
                return res.status(201).json({message: "Criado com sucesso"})
    
            } catch (err){
                await trx.rollback()

                console.log(err)
    
                return res.status(400).json({
                    error: "Erro ao criar nova classe"
                })
            }
    
    }

    async show (req: Request, res: Response){
        try {

            const user_id = req.userId

            const classes = await db('classes')
            .where({user_id})
            .join('class_schedule', 'class_schedule.class_id', '=', 'classes.id')

            return res.json(classes)

        } catch (e) {
            return res.status(404).json({error: 'Erro no servidor'})
        }
    }
}