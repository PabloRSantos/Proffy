import {Request, Response} from 'express'
import db from '../database/connection'
import generateToken from '../utils/generateToken'
import bcrypt from 'bcryptjs'

interface userLogin {
    id: string,
    email: string,
    password: string,
    name: string
}


export default class UserController {
    async create (req: Request, res:Response){
         let {email, password} = req.body

         password = await bcrypt.hash(password, 10)

         const users = await db('users').first().where('email', email)

         if(users) {
             return res.json({error: 'Email já cadastradp'})
         }

         const userId = await db("users").insert({email, password})

         console.log(userId.toString())

         return res.json({
            sucess: "Cadastrado com sucesso", 
            token: generateToken(userId.toString()),
            userId
        })
    }

    async login (req: Request, res:Response){
        let {email, password} = req.body

        const user : userLogin = await db('users').where("email", email).select('password','id', 'email', 'name').first()

        if(!user){
            return res.json({error: 'Usuário não encontrado'})
        }

        if(!bcrypt.compare(password, user.password)){
            return res.json({error: "Ooops, a senha não confere"})
        }

        return res.json({token: generateToken(user.id.toString())})


    }
}