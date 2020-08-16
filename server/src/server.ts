import express from "express"
import routes from "./routes"
import cors from "cors"
import path from 'path'
import "dotenv/config"

const app = express()

app.use(cors())
app.use(express.json())
app.use(routes)
app.use('/uploads/users', express.static(path.resolve(__dirname, '..', 'uploads', 'users')))

app.listen(3333)