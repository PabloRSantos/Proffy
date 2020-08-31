import {Request, Response} from "express"

import db from "../database/connection"
import convertHourToMinutes from "../utils/convertHourToMinutes"
import convertMinutesToHour from "../utils/convertMinutosToHour"
import { IClasses, IScheduleItems } from "../utils/interfaces"
import classesWithSchedule from "../utils/classesWithSchedule"




export default class ClassesController {
    async index (req: Request, res: Response){
        try {
            const {page, ...filters} = req.query
            const skip = (Number(page) - 1) * 10
            let totalItems: Array<{pages: Number}> = []
            let classes: Array<IClasses> = []
            let schedule: Array<IScheduleItems> = []

            if(filters.subject && filters.week_day && filters.time) {
                const subject = filters.subject as string
                const week_day = filters.week_day as string
                const time = filters.time as string

                const timeInMinute = convertHourToMinutes(time)

                classes = await db('classes')
                .join('class_schedule', 'class_schedule.class_id', '=', 'classes.id')
                .join("users", "classes.user_id", "=", "users.id")
                .where('class_schedule.week_day', Number(week_day))
                .andWhere('class_schedule.from', '<=', timeInMinute)
                .andWhere('class_schedule.to', '>', timeInMinute)
                .andWhere("classes.subject", subject)
                .select('classes.*', 'users.*', 'classes.id as class_id')
                .limit(10)
                .offset(skip)

                schedule = await db('class_schedule')
                .join('classes', 'classes.id', '=', 'class_schedule.class_id')
                .where('class_schedule.week_day', Number(week_day))
                .andWhere('class_schedule.from', '<=', timeInMinute)
                .andWhere('class_schedule.to', '>', timeInMinute)
                .andWhere("classes.subject", subject)
                .select('class_schedule.*')
                .limit(10)
                .offset(skip)

                totalItems = await db('classes')
                    .join('class_schedule', 'class_schedule.class_id', '=', 'classes.id')
                    .where('class_schedule.week_day', Number(week_day))
                    .andWhere('class_schedule.from', '<=', timeInMinute)
                    .andWhere('class_schedule.to', '>', timeInMinute)
                    .andWhere("classes.subject", subject)
                    .count('* as pages')

                var { pages } = totalItems[0]
                pages = Number(pages) / 10

            } else {
                classes = await db('classes')
                .join("users", "classes.user_id", "=", "users.id")
                .join('class_schedule', 'class_schedule.class_id', '=', 'classes.id')
                .select('classes.*', 'users.*', 'classes.id as class_id')
                .distinct('users.id')
                .limit(10)
                .offset(skip)

                schedule = await db('class_schedule')
                .limit(10)
                .offset(skip)


                totalItems = await db('classes').count('* as pages')

                var { pages } = totalItems[0]
                pages = Number(pages) / 10

            }   


           const classesSchedule = classesWithSchedule(classes, schedule)

            return res.json({pages, classes: classesSchedule})
        
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
            scheduleItems} = req.body

            const trx = await db.transaction()
    
            try {        
    
                await trx("users").where('id', req.userId).update({
                    whatsapp,
                    bio,
                })

                const user_id = req.userId
    
                const insertedClassesIds = await trx("classes").insert({
                    subject,
                    cost,
                    user_id
                }).returning('id')

                const class_id = insertedClassesIds[0]
    
                const classSchedule = scheduleItems.map((scheduleItem: IScheduleItems) => {
                    return {
                        class_id,
                        week_day: scheduleItem.week_day,
                        from: convertHourToMinutes(scheduleItem.from),
                        to: convertHourToMinutes(scheduleItem.to)
                    }
                })
    
                await trx("class_schedule").insert(classSchedule)
    
                await trx.commit()
    
                return res.json({message: "Criado com sucesso"}).status(201)
    
            } catch (err){
                await trx.rollback()

                return res.json({
                    message: "Erro ao criar nova classe"
                }).status(400)
            }
    
    }

    async show (req: Request, res: Response){
        try {

            const user_id = req.userId

            const classes: IClasses = await db('classes')
            .where({user_id}).select('id', 'subject', 'cost').first()

            if(!classes) return res.json({})

            classes.cost = `R$${classes.cost}`

            const scheduleClasses = await db('class_schedule')
            .where('class_id', classes.id)

            scheduleClasses.forEach((scheduleItem: IScheduleItems) => {
                scheduleItem.to = convertMinutesToHour(Number(scheduleItem.to))
                scheduleItem.from = convertMinutesToHour(Number(scheduleItem.from))
            })

            return res.json({classes, scheduleClasses} || {})

        } catch (e) {
            console.log(e)
            return res.json({error: 'Erro no servidor'})
        }
    }

    async delete (req: Request, res: Response){
        try {
            const {id} = req.params

            await db('class_schedule').where({id}).del()

            return res.json({message: 'Excluido com sucesso'})
        } catch (e) {
            console.log(e)
            return res.json({message: 'Erro ao excluir'})
        }
    }
}