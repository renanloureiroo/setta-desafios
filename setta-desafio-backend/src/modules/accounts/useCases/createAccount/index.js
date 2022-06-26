import { AccountRepository } from "../../repositories/AccountRepository.js"
import { CreateAccountUseCase } from "./CreateAccountUseCase.js"
import { CreateAccountController } from "./CreateAccountController.js"

const accountRepository = new AccountRepository()
const createAccountUseCase = new CreateAccountUseCase(accountRepository)
const createAccountController = new CreateAccountController(
  createAccountUseCase
)

export { createAccountController }
