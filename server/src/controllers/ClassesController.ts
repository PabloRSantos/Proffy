import {Request, Response} from "express"

import db from "../database/connection"
import convertHourToMinutes from "../utils/convertHourToMinutes"


interface ScheduleItem {
    week_day: number;
    from: string;
    to: string;
}

interface Classes {
    subject: string,
    cost: number,
    id: number
}



export default class ClassesController {
    async index (req: Request, res: Response){
        try {
            const {page, ...filters} = req.query
            const skip = (Number(page) - 1) * 5

            const totalItems: any = await db('classes').count('* as pages')

            let { pages } = totalItems[0]

            pages = pages / 5

            if(filters.subject && filters.week_day && filters.time) {

                const subject = filters.subject as string
                const week_day = filters.week_day as string
                const time = filters.time as string

                if(!filters.subject || !filters.week_day || !filters.time) {
                    return res.status(400).json({
                        error: "Missing filters to search classes"
                    })
                }

                const timeInMinute = convertHourToMinutes(time)

                const classes = await db('classes')
                .join('class_schedule', 'class_schedule.class_id', '=', 'classes.id')
                .join("users", "classes.user_id", "=", "users.id")
                .where('class_schedule.week_day', Number(week_day))
                .andWhere('class_schedule.from', '<=', timeInMinute)
                .andWhere('class_schedule.to', '>', timeInMinute)
                .andWhere("classes.subject", subject)
                .select('classes.*', 'users.*')
                .limit(5)
                .offset(skip)

                return res.json({classes, pages})

            }

            const classes = await db('classes')
            .join("users", "classes.user_id", "=", "users.id")
            .select('classes.*', 'users.*')
            .limit(5)
            .offset(skip)

            return res.json({classes, pages})
        
        } catch (e) {
            console.log(e)

            return res.status(404)
        }

    }
    
    async create(req: Request, res: Response){
        const {
            whatsapp,
            bio,
            subject,
            cost,
            schedule} = req.body
    
            const trx = await db.transaction()
    
    
            try {        
    
                const insertedUsersIds = await trx("users").update({
                    whatsapp,
                    bio,
                })

                const user_id = insertedUsersIds
    
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

            const classes: Classes = await db('classes')
            .where({user_id}).select('id', 'subject', 'cost').first()

            if(!classes) return res.json({})

            const scheduleClasses = await db('class_schedule')
            .where('class_id', classes.id)

            return res.json({classes, scheduleClasses} || {})

        } catch (e) {
            console.log(e)
            return res.json({error: 'Erro no servidor'})
        }
    }

    async delete (req: Request, res: Response){
        const {id} = req.params

        await db('class_schedule').where({id}).del()

        return res.json({message: 'Excluido com sucesso'})
    }
}