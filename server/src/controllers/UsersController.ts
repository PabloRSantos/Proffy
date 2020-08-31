import {Request, Response} from 'express'
import path from 'path'
import fs from 'fs'

import db from '../database/connection'

import convertHourToMinutes from '../utils/convertHourToMinutes'
import {reqBodyUpdateInfos } from '../utils/interfaces'


export default class UserController {
    async show (req: Request, res:Response){

        try {
            const id = req.userId

            const user = await db('users').where({id}).first()

            return res.json(user)

        } catch (e) {
            console.log(e)

            return res.status(404).json({error: 'Erro no servidor'})
        }
    }

    async updateInfos (req: Request, res: Response){
        const {
            scheduleItems,
            user,
            classes,
        }: reqBodyUpdateInfos = req.body

        const trx = await db.transaction()

        try {

            if(scheduleItems) {

                const scheduleCount: any = await trx('class_schedule').where('class_id', scheduleItems[0].class_id).count('* as total')

                
                await Promise.all(scheduleItems.map(async (item, index) => {
                        if(index >= scheduleCount[0].total){
                            item.class_id = scheduleItems[0].class_id
                            
                                await trx('class_schedule').insert({
                                week_day:  Number(item.week_day),
                                to: convertHourToMinutes(item.to),
                                from: convertHourToMinutes(item.from),
                                class_id: item.class_id
                            })
                        } else {

                            await trx('class_schedule').where('id', item.id).update({
                            week_day: Number(item.week_day),
                            to: convertHourToMinutes(item.to),
                            from: convertHourToMinutes(item.from),
                            })

                        }
                    }))

             }

            const userId = req.userId

            if(classes) {

                classes.cost = classes.cost.replace('R$', '')

                await trx('classes').where('id', userId).update({
                    cost: Number(classes.cost),
                    subject: classes.subject
                })
            }

            if(user)            
                await trx('users').first().where('id', userId).update({
                    name: user.name,
                    sobrenome: user.sobrenome,
                    avatar: user.avatar,
                    whatsapp: user.whatsapp,
                    bio: user.bio
                })

                await trx.commit()

            return res.json({message: 'Informações alteradas com sucesso'})

        } catch (e){
            await trx.rollback()

            console.log(e)

            return res.json({error: 'Erro ao alterar informações'})
        }
    }

    async updateProfilePic (req: Request, res: Response){
        try {

                const id = req.userId
                const user = await db("users").select("avatar").where({id}).first()

                if(user.avatar !== 'default.png'){
                    fs.unlink(path.resolve(__dirname, "..", "..", "uploads", "users", user.avatar), () => {
                        console.log('old pic unlinked')
                    })
                }

                await db("users").where({id}).first().update("avatar", req.file.filename)

                return res.json({
                    message: "Salvo com sucesso",
                    file: req.file.filename
                })

           } catch (e) {

                console.log(e)

                fs.unlink(path.resolve(__dirname, "..", "..", "uploads", "users", req.file.filename), () => {
                    console.log('pic upload canceled')
                    })

                return res.status(401).json({message: 'Erro ao alterar foto de perfil'})
           }
    }

}