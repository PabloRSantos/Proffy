import {Request, Response} from 'express'
import db from '../database/connection'
import generateToken from '../utils/generateToken'
import bcrypt from 'bcryptjs'
import crypto from 'crypto'
import sendEmail from '../utils/sendEmail'
import convertHourToMinutes from '../utils/convertHourToMinutes'

interface userLogin {
    id: string,
    password: string,
}

interface userResetPassword {
    resetPasswordTime: Date,
    resetPassword: string
}

interface userUpdateInfos {
    name: string,
    sobrenome: string,
    bio: string,
    whatsapp: string,
    avatar: string,
}

interface reqBodyUpdateInfos {
    user: userUpdateInfos,
    classes: {
        cost: string,
        subject: string
    }

    scheduleItems: [{
        id: number,
        week_day: number,
        from: string,
        to: string,
        class_id?: number
    }]

}


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

    async create (req: Request, res:Response){
         let {email, name, sobrenome, password} = req.body

         password = await bcrypt.hash(password, 10)

         const users = await db('users').first().where('email', email)

         if(users) {
             return res.json({error: 'Email já cadastrado'})
         }

         const userId = await db("users").insert({email, password, name, sobrenome})

         return res.json({
            sucess: "Cadastrado com sucesso", 
            token: generateToken(userId.toString()),
            userId
        })
    }

    async login (req: Request, res:Response){
        let {email, password} = req.body

        const user: userLogin = await db('users').where("email", email).select('id', 'password').first()

        if(!user){
            return res.json({error: 'Usuário não encontrado'})
        }

        if(!await bcrypt.compare(password, user.password)){
            return res.json({error: "Ooops, a senha não confere"})
        }

        return res.json({token: generateToken(user.id.toString())})


    }

    async recoverPassword (req: Request, res: Response){
        const {email} = req.params

        try {
        const user = await db("users").first().where({email})

        if(!user)
            return res.json({error: 'Email inválido'})

        const token = crypto.randomBytes(20).toString('hex')

        const now = new Date()
        now.setHours(now.getHours() + 1)

        await db('users').where('email', email).update({
            resetPassword: token,
            resetPasswordTime: now
        })
  

        await sendEmail.sendMail({
        to: email,
        from: 'pablorsantos15@gmail.com',
        subject: "Recuperação de senha", 
        template: 'recoverPassword',
        context: {token}
    }, (err: any) => {
        if (err)
            console.log(err)
    })

        return res.json({message: 'enviado'})
    } catch (e){
        console.log(e)
    }
    }

    async resetPassword (req: Request, res: Response){
        let {password, token} = req.body

        try {

        const user: userResetPassword = await db('users').where('resetPassword', token).select('resetPasswordTime', 'resetPassword').first()

        if(!user)
            return res.json({error: 'Erro ao achar usuário, tente novamente'})

        const now = new Date()

        if(user.resetPasswordTime < now) 
            return res.json({error: 'Token expirado, gere outro novamente'})
        
        if(user.resetPassword !== token)
            return res.json({error: 'Token inválido ou já utilizado'})

        
        password = await bcrypt.hash(password, 10)

        await db('users').where('resetPassword', token).update({password, resetPassword: null})
        
        
        return res.json({message: 'Alterado com sucesso'})

        } catch (e) {
            console.log(e)
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

                scheduleItems.forEach(async (item, index) => {
                        if(index >= scheduleCount[0].total){
                            item.class_id = scheduleItems[0].class_id
                                await trx('class_schedule').insert({
                                week_day: item.week_day,
                                to: convertHourToMinutes(item.to),
                                from: convertHourToMinutes(item.from),
                                class_id: item.class_id
                            })

                            return
                        }
    
                        await trx('class_schedule').where('id', item.id).update({
                            week_day: item.week_day,
                            to: convertHourToMinutes(item.to),
                            from: convertHourToMinutes(item.from),
                            })
                        
                    })
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
}