import {Request, Response} from "express"

import db from "../database/connection"
import convertHourToMinutes from "../utils/convertHourToMinutes"
import convertMinutesToHour from "../utils/convertMinutosToHour"
import { IClasses, IScheduleItems, IScheduleWeekDays } from "../utils/interfaces"




export default class ClassesController {
    async index (req: Request, res: Response){
        try {
            const {page, ...filters} = req.query
            const skip = (Number(page) - 1) * 5
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
                .select('classes.*', 'users.*')
                .limit(5)
                .offset(skip)

                schedule = await db('class_schedule')
                .join('classes', 'classes.id', '=', 'class_schedule.class_id')
                .where('class_schedule.week_day', Number(week_day))
                .andWhere('class_schedule.from', '<=', timeInMinute)
                .andWhere('class_schedule.to', '>', timeInMinute)
                .andWhere("classes.subject", subject)
                .select('class_schedule.*')
                .limit(5)
                .offset(skip)

                totalItems = await db('classes')
                    .join('class_schedule', 'class_schedule.class_id', '=', 'classes.id')
                    .where('class_schedule.week_day', Number(week_day))
                    .andWhere('class_schedule.from', '<=', timeInMinute)
                    .andWhere('class_schedule.to', '>', timeInMinute)
                    .andWhere("classes.subject", subject)
                    .count('* as pages')

                var { pages } = totalItems[0]
                pages = Number(pages) / 5

            } else {
                classes = await db('classes')
                .join("users", "classes.user_id", "=", "users.id")
                .join('class_schedule', 'class_schedule.class_id', '=', 'classes.id')
                .select('classes.*', 'users.*')
                .distinct('users.id')
                .limit(5)
                .offset(skip)

                schedule = await db('class_schedule')
                .limit(5)
                .offset(skip)


                totalItems = await db('classes').count('* as pages')

                var { pages } = totalItems[0]
                pages = Number(pages) / 5

            }   


           const classesWithSchedule = classes.map((classItem) => {

                const filteredSchedule = schedule.filter(scheduleItem => scheduleItem.class_id === classItem.id)

                let cont = 0

                while(cont < 5){
                        const filteredScheduleInWhile = filteredSchedule
                            .filter(scheduleItem => scheduleItem.week_day === cont)

                        if(filteredScheduleInWhile.length === 0){
                           filteredSchedule.push({
                                from: `-`, to: '-', week_day: cont
                            })
                        }

                        cont++
                }

                filteredSchedule.sort((a, b) => {
                    return a.week_day < b.week_day ? -1 : a.week_day > b.week_day ? 1 : 0;
                })

                    let calendar: Array<IScheduleWeekDays> = []

                    calendar = filteredSchedule.map(scheduleItem => {
                        
                        if(scheduleItem.from === '-'){
                           return {
                               day: scheduleItem.week_day,
                               hour: '-'
                           }
                        }

                        const to = convertMinutesToHour(Number(scheduleItem.to))
                        const from = convertMinutesToHour(Number(scheduleItem.from))

                        return {
                            day: scheduleItem.week_day,
                            hour: `${from} - ${to}`
                        }
                     })


                return {
                    classItem,
                    scheduleItem: calendar
                }
        })

            return res.json({pages, classes: classesWithSchedule})
        
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
    
                await trx("users").where('id', req.userId).update({
                    whatsapp,
                    bio,
                })

                const user_id = req.userId
    
                const insertedClassesIds = await trx("classes").insert({
                    subject,
                    cost,
                    user_id
                })

                const class_id = insertedClassesIds[0]
    
                const classSchedule = schedule.map((scheduleItem: IScheduleItems) => {
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
        const {id} = req.params

        await db('class_schedule').where({id}).del()

        return res.json({message: 'Excluido com sucesso'})
    }
}