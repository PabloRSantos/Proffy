import jwt from 'jsonwebtoken'
import "dotenv/config"

export default function generateToken (userId: string){
    const auth = process.env.JWT_AUTH as string

    return jwt.sign(userId, auth, {})
}