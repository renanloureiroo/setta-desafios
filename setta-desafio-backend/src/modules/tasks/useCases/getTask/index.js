import { TasksRepository } from "../../repositories/TasksRepository.js"
import { GetTaskUseCase } from "./GetTaskUseCase.js"
import { GetTaskController } from "./GetTaskController.js"

const getTaskUseCase = new GetTaskUseCase(new TasksRepository())

const getTaskController = new GetTaskController(getTaskUseCase)

export { getTaskController }
