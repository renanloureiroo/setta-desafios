import { Router } from "express"
import { createAccountController } from "../modules/accounts/useCases/createAccount/index.js"
import { authenticateController } from "../modules/accounts/useCases/authenticate/index.js"
const accountsRouter = Router()

accountsRouter.post("/signup", (req, res) =>
  createAccountController.handle(req, res)
)

accountsRouter.post("/signin", (req, res) =>
  authenticateController.handle(req, res)
)

export { accountsRouter }
