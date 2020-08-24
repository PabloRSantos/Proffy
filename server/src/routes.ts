import express from "express"

import multer from 'multer'
import {user} from '../src/config/multer'

const uploadUserProfile = multer(user)

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
routes.get('/user', authMiddleware, usersController.show)
routes.get('/recover/password/:email', usersController.recoverPassword)
routes.put('/resetPassword', usersController.resetPassword)
routes.put('/updateInfos', authMiddleware, usersController.updateInfos)
routes.put('/profilePic', authMiddleware, uploadUserProfile.single('imagem'), usersController.updateProfilePic)

routes.post("/classes", authMiddleware, classesControllers.create)
routes.get("/classes", classesControllers.index)
routes.get("/class", authMiddleware, classesControllers.show)
routes.delete("/class/:id", authMiddleware, classesControllers.delete)


export default routes