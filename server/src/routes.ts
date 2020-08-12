import express from "express"
import ClassesController from "./controllers/ClassesController"
import ConenctionsController from "./controllers/ConnectionsController"


const routes = express.Router()

const classesControllers = new ClassesController()
const conenctionsController = new ConenctionsController()

routes.post("/classes", classesControllers.create)
routes.get("/classes", classesControllers.index)

routes.post("/connections",conenctionsController.create)
routes.get("/connections",conenctionsController.index)


export default routes