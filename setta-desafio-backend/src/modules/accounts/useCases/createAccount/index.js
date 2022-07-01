import { AccountRepository } from "../../repositories/AccountRepository.js"
import { CreateAccountUseCase } from "./CreateAccountUseCase.js"
import { CreateAccountController } from "./CreateAccountController.js"

const createAccountUseCase = new CreateAccountUseCase(new AccountRepository())
const createAccountController = new CreateAccountController(
  createAccountUseCase
)

export { createAccountController }
