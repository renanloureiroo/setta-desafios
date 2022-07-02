import { UsersRepository } from "../../repositories/UsersRepository.js"
import { CreateAccountUseCase } from "./CreateUserUseCase.js"
import { CreateAccountController } from "./CreateUserController.js"

const createUserUseCase = new CreateAccountUseCase(new UsersRepository())
const createUserController = new CreateAccountController(createUserUseCase)

export { createUserController }
