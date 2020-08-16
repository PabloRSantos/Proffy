import express from "express"
import ClassesController from "./controllers/ClassesController"
import ConenctionsController from "./controllers/ConnectionsController"
import UserController from "./controllers/UsersController"
import authMiddleware from './middlewares/auth'


const routes = express.Router()

const classesControllers = new ClassesController()
const conenctionsController = new ConenctionsController()
const usersController = new UserController()

routes.post("/connections",conenctionsController.create)
routes.get("/connections", conenctionsController.index)

routes.post('/cadastro', usersController.create)
routes.post('/login', usersController.login)
routes.get('/recover/password', usersController.recoverPassword)
routes.post('/resetPassword', usersController.resetPassword)

routes.post("/classes", authMiddleware, classesControllers.create)
routes.get("/classes", classesControllers.index)


export default routes