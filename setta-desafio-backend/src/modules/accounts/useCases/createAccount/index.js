import { CreateAccountUseCase } from "./CreateAccountUseCase.js"
import { CreateAccountController } from "./CreateAccountController.js"

const useCase = new CreateAccountUseCase()

const controller = new CreateAccountController(useCase)

export { controller }
