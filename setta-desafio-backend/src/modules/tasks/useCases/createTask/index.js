import { TasksRepository } from "../../repositories/TasksRepository.js"
import { CreateTaskUseCase } from "./CreateTaskUseCase.js"
import { CreateTaskController } from "./CreateTaskController.js"

const createTaskUseCase = new CreateTaskUseCase(new TasksRepository())
const createTaskController = new CreateTaskController(createTaskUseCase)

export { createTaskController }
