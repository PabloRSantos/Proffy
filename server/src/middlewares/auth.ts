import {Request, Response, NextFunction} from 'express'
import jwt from 'jsonwebtoken'

export default function authMiddleware (req: Request, res: Response, next: NextFunction){
    const authHeader = req.headers.authorization
    const auth = process.env.JWT_AUTH as string
    

    if(!authHeader)
        return res.json({error: 'Token não informado'})

    const parts = authHeader.split(' ')

    if(parts.length != 2)
        return res.json({error: "Token inválido"})

    const [ scheme, token ] = parts
     
     if(!/^Bearer$/i.test(scheme))
        return res.json({message: "Erro no token"})

        jwt.verify(token, auth, (err, decoded) => {
            if(err) return res.json({message: "Token inválido"})

            req.userId = Number(decoded)

            return next()
        })   



}