import { AuthenticateUseCase } from "./AuthenticateUseCase.js"
import { AuthenticateController } from "./AuthenticateController.js"
import { UsersRepository } from "../../repositories/UsersRepository.js"

const usersRepository = new UsersRepository()
const authenticateUseCase = new AuthenticateUseCase(usersRepository)
const authenticateController = new AuthenticateController(authenticateUseCase)

export { authenticateController }
