import { Router } from "express"
import { accountsRouter } from "./accounts.router.js"

const appRoutes = Router()

appRoutes.use("/accounts", accountsRouter)

export { appRoutes }
