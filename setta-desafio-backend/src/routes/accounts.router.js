import { Router } from "express"
import { createUserController } from "../modules/accounts/useCases/createUser/index.js"
import { authenticateController } from "../modules/accounts/useCases/authenticate/index.js"

const accountsRouter = Router()

accountsRouter.post("/signup", (req, res) =>
  createUserController.handle(req, res)
)

accountsRouter.post("/signin", (req, res) =>
  authenticateController.handle(req, res)
)

export { accountsRouter }
