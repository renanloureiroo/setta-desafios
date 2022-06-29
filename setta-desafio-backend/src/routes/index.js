import { Router } from "express"
import { ensureAuthenticate } from "../middlewares/ensureAuthenticate.js"
import { accountsRouter } from "./accounts.router.js"
import { tasksRouter } from "./tasks.router.js"

const appRoutes = Router()

appRoutes.use("/accounts", accountsRouter)
appRoutes.use("/tasks", ensureAuthenticate, tasksRouter)

export { appRoutes }
