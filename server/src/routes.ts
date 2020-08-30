import express from "express"

import multer from 'multer'
import {user} from '../src/config/multer'

const uploadUserProfile = multer(user)

import ClassesController from "./controllers/ClassesController"
import ConenctionsController from "./controllers/ConnectionsController"
import UserController from "./controllers/UsersController"
import SessionController from "./controllers/SessionController"
import FavoritesController from "./controllers/FavoritesController"

import authMiddleware from './middlewares/auth'

const routes = express.Router()

const classesControllers = new ClassesController()
const conenctionsController = new ConenctionsController()
const usersController = new UserController()
const sessionController = new SessionController()
const favoritesController = new FavoritesController()

routes.post("/connections",conenctionsController.create)
routes.get("/connections", conenctionsController.index)

routes.post('/cadastro', sessionController.create)
routes.post('/login', sessionController.login)
routes.get('/recover/password/:email', sessionController.recoverPassword)
routes.put('/resetPassword', sessionController.resetPassword)

routes.get('/favorites', authMiddleware, favoritesController.index)
routes.post('/favorite', authMiddleware, favoritesController.add)
routes.delete('/favorite/:id', authMiddleware, favoritesController.delete)

routes.get('/user', authMiddleware, usersController.show)
routes.put('/updateInfos', authMiddleware, usersController.updateInfos)
routes.put('/profilePic', authMiddleware, uploadUserProfile.single('imagem'), usersController.updateProfilePic)

routes.post("/classes", authMiddleware, classesControllers.create)
routes.get("/classes", classesControllers.index)
routes.get("/class", authMiddleware, classesControllers.show)
routes.delete("/class/:id", authMiddleware, classesControllers.delete)


export default routes