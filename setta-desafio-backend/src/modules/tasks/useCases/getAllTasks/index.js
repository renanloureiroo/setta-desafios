import { TasksRepository } from "../../repositories/TasksRepository.js"
import { GetAllTasksUseCase } from "./GetAllTasksUseCase.js"
import { GetAllTasksController } from "./GetAllTasksController.js"

const getAllTasksUseCase = new GetAllTasksUseCase(new TasksRepository())
const getAllTasksController = new GetAllTasksController(getAllTasksUseCase)

export { getAllTasksController }
