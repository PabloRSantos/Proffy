import {Request, Response} from 'express'
import bcrypt from 'bcryptjs'
import crypto from 'crypto'
import generateToken from '../utils/generateToken'
import db from '../database/connection'
import { IUsers } from '../utils/interfaces'
import sendEmail from '../utils/sendEmail'



export default class SessionController {
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

       const user: IUsers = await db('users').where("email", email).select('id', 'password').first()

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

        const user: IUsers = await db('users').where('resetPassword', token).select('resetPasswordTime', 'resetPassword').first()

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
}