import {Request, Response} from 'express'
import db from '../database/connection'
import { IClasses, IScheduleItems } from '../utils/interfaces'
import classesWithSchedule from '../utils/classesWithSchedule'



export default class FavoritesController{
    async index (req: Request, res: Response){
        try {
            const user_id = req.userId

            let classes: Array<IClasses> = []
            let schedule: Array<IScheduleItems> = []

            
            classes = await db('favorites')
                .where('favorites.user_id', user_id)
                .join('classes', 'classes.id', '=', 'favorites.class_id')
                .join("users", "classes.user_id", "=", "users.id")
                .select('classes.*', 'users.*', 'favorites.id as favorite_id', 'classes.id as class_id')

            schedule = await db('favorites')
                .where({user_id})
                .join('class_schedule', 'class_schedule.class_id', '=', 'favorites.class_id')

            
            const classesSchedule = classesWithSchedule(classes, schedule)

            return res.json({classes: classesSchedule})

        } catch (error) {
            console.log(error)
            return res.json({message: 'Erro ao listar aulas'})
        }
    }

    async add (req: Request, res: Response){
        try {
            
            const {class_id} = req.body
            const user_id = req.userId
        
            await db('favorites').where({user_id}).insert({
                class_id,
                user_id
            })

            return res.json({message: 'Favoritado com sucesso'})
        } catch (error) {
            console.log(error)
            return res.json({message: 'Erro ao favoritar aula'})   
        }
    }

    async delete (req: Request, res: Response){

        try {
        
            const class_id = req.params.id
            const user_id = req.userId

            await db('favorites')
                .where({class_id, user_id})
                .del()

            return res.json({message: 'Desfavoritado com sucesso'})
        } catch (error) {
            console.log(error)
            return res.json({message: 'Erro ao desfavoritar aula'})
        }
    }

}