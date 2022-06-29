import { AppError } from "../../../../errors/AppError.js"
class GetTaskUseCase {
  tasksRepository
  constructor(tasksRepository) {
    this.tasksRepository = tasksRepository
  }
  async execute(id) {
    const task = await this.tasksRepository.findById(id)

    if (!task) {
      throw new AppError("Task not found", 404)
    }

    return task
  }
}

export { GetTaskUseCase }
