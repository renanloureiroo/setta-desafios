import { GetMetricsUseCase } from "./GetMetricsUseCase.js"
import { GetMetricsController } from "./GetMetricsController.js"
import { TasksRepository } from "../../repositories/TasksRepository.js"

const getMetricsUseCase = new GetMetricsUseCase(new TasksRepository())
const getMetricsController = new GetMetricsController(getMetricsUseCase)

export { getMetricsController }
