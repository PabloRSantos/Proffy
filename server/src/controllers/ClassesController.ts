import {Request, Response} from "express"

import db from "../database/connection"
import convertHourToMinutes from "../utils/convertHourToMinutes"
import convertMinutesToHour from "../utils/convertMinutosToHour"


interface ScheduleItem {
    week_day: number;
    from: string;
    to: string;
    class_id: number
}

interface Classes {
    subject: string,
    cost: string,
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

                const timeInMinute = convertHourToMinutes(time)

                const classes = await db('classes')
                .join('class_schedule', 'class_schedule.class_id', '=', 'classes.id')
                .join("users", "classes.user_id", "=", "users.id")
                .where('class_schedule.week_day', Number(week_day))
                .andWhere('class_schedule.from', '<=', timeInMinute)
                .andWhere('class_schedule.to', '>', timeInMinute)
                .andWhere("classes.subject", subject)
                .select('classes.*', 'users.*', 'class_schedule.*')
                .limit(5)
                .offset(skip)

                var ref = 0
                var schedule: any = []
    
                const classesWithSchedule = classes.map((classItem: ScheduleItem, index: number) => {
    
                    const from = convertMinutesToHour(Number(classItem.from)) 
                    const to = convertMinutesToHour(Number(classItem.to)) 
    
                    if(index === classes.length - 1){
                        schedule.push({
                            hour: `${from} - ${to}`, day: classItem.week_day
                        })
                    }
    
                    if(classItem.class_id !== classes[ref].class_id && index !== 0 || index === classes.length - 1) {
    
                        const days = schedule.map((scheduleItem: any) => scheduleItem.day)
    
                        let cont = 0
                        
                        while(schedule.length < 5){
    
                            if(days.indexOf(cont) === -1){
                                schedule.push({
                                    hour: `-`, day: cont
                                })
                            }
    
                            cont++
                        }
    
                        schedule.sort((a: any, b: any) => {
                            return a.day < b.day ? -1 : a.day > b.day ? 1 : 0;
                        });
                        
                        const Array = {
                            classItem: classes[ref],
                            schedule
                        }
    
                        schedule = []
                        ref = index
    
                        return Array
                    }
    
                    schedule.push({
                        hour: `${from} - ${to}`, day: classItem.week_day
                    })
    
                })
                .filter((classItem: any) => classItem !== undefined)
    
    
                return res.json({pages, classes: classesWithSchedule})

            }


            let classes: any = await db('classes')
            .join("users", "classes.user_id", "=", "users.id")
            .join('class_schedule', 'class_schedule.class_id', '=', 'classes.id')
            .select('classes.*', 'users.*', 'class_schedule.*')
            .orderBy('class_schedule.class_id', 'asc')
            .offset(skip)

            console.log(classes)

            var ref = 0
            var schedule: any = []

            const classesWithSchedule = classes.map((classItem: ScheduleItem, index: number) => {

                const from = convertMinutesToHour(Number(classItem.from)) 
                const to = convertMinutesToHour(Number(classItem.to)) 

                if(index === classes.length - 1){
                    schedule.push({
                        hour: `${from} - ${to}`, day: classItem.week_day
                    })
                }

                if(classItem.class_id !== classes[ref].class_id && index !== 0 || index === classes.length - 1) {

                    const days = schedule.map((scheduleItem: any) => scheduleItem.day)

                    let cont = 0
                    
                    while(schedule.length < 5){

                        if(days.indexOf(cont) === -1){
                            schedule.push({
                                hour: `-`, day: cont
                            })
                        }

                        cont++
                    }

                    schedule.sort((a: any, b: any) => {
                        return a.day < b.day ? -1 : a.day > b.day ? 1 : 0;
                    });
                    
                    const Array = {
                        classItem: classes[ref],
                        schedule
                    }

                    schedule = []
                    ref = index

                    return Array
                }

                schedule.push({
                    hour: `${from} - ${to}`, day: classItem.week_day
                })

            })
            .filter((classItem: any) => classItem !== undefined)


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
    
                const insertedUsersIds = await trx("users").where('id', req.userId).update({
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

            classes.cost = `R$${classes.cost}`

            const scheduleClasses = await db('class_schedule')
            .where('class_id', classes.id)

            scheduleClasses.forEach((scheduleItem: ScheduleItem) => {
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