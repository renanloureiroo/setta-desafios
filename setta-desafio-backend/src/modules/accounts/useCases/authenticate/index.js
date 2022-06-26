import { AuthenticateUseCase } from "./AuthenticateUseCase.js"
import { AuthenticateController } from "./AuthenticateController.js"
import { AccountRepository } from "../../repositories/AccountRepository.js"

const accountRepository = new AccountRepository()
const authenticateUseCase = new AuthenticateUseCase(accountRepository)
const authenticateController = new AuthenticateController(authenticateUseCase)

export { authenticateController }
