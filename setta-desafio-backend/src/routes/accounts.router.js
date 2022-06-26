import { Router } from "express"
import { createAccountController } from "../modules/accounts/useCases/createAccount/index.js"

const accountsRouter = Router()

accountsRouter.post("/", async (req, res) =>
  createAccountController.handle(req, res)
)

export { accountsRouter }
