import { UsersRepository } from "../../repositories/UsersRepository.js"
import { CreateUserUseCase } from "./CreateUserUseCase.js"
import { CreateUserController } from "./CreateUserController.js"

const createUserUseCase = new CreateUserUseCase(new UsersRepository())
const createUserController = new CreateUserController(createUserUseCase)

export { createUserController }
