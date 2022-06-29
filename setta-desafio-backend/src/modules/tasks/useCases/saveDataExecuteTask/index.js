import { TasksRepository } from "../../repositories/TasksRepository.js"
import { SaveDataExecuteTaskUseCase } from "./SaveDataExecuteTaskUseCase.js"
import { SaveDataExecuteTaskController } from "./SaveDataExecuteTaskController.js"

const saveDataExecuteTaskUseCase = new SaveDataExecuteTaskUseCase(
  new TasksRepository()
)
const saveDataExecuteTaskController = new SaveDataExecuteTaskController(
  saveDataExecuteTaskUseCase
)

export { saveDataExecuteTaskController }
