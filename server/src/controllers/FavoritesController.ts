import {Request, Response} from 'express'
import db from '../database/connection'
import { IClasses, IScheduleItems } from '../utils/interfaces'
import classesWithSchedule from '../utils/classesWithSchedule'



export default class FavoritesController{
    async index (req: Request, res: Response){
        try {
            const user_id = req.userId

            const {page} = req.query
            const skip = (Number(page) - 1) * 5
            let totalItems: Array<{pages: Number}> = []
            let classes: Array<IClasses> = []
            let schedule: Array<IScheduleItems> = []

            
            classes = await db('favorites')
                .where('favorites.user_id', user_id)
                .join('classes', 'classes.id', '=', 'favorites.class_id')
                .join("users", "classes.user_id", "=", "users.id")
                .select('classes.*', 'users.*', 'favorites.id as favorite_id')
                .limit(5)
                .offset(skip)

            schedule = await db('favorites')
                .where({user_id})
                .join('class_schedule', 'class_schedule.class_id', '=', 'favorites.class_id')
                .limit(5)
                .offset(skip)

            totalItems = await db('classes').count('* as pages')
            
            var { pages } = totalItems[0]
            pages = Number(pages) / 5

            const classesSchedule = classesWithSchedule(classes, schedule)

            return res.json({pages, classes: classesSchedule})

        } catch (error) {
            console.log(error)
            return res.json({})
        }
    }

    async add (req: Request, res: Response){
        const {class_id} = req.body
        const user_id = req.userId
    
        await db('favorites').where({user_id}).insert({
            class_id,
            user_id
        })

        return res.json({message: 'Favoritado com sucesso'})
    }

    async delete (req: Request, res: Response){
        const {id} = req.params
    
        await db('favorites').where({id}).del()

        return res.json({message: 'Desfavoritado com sucesso'})
    }
}