import { AppError } from "../../../../errors/AppError.js"
class GetTaskUseCase {
  tasksRepository
  constructor(tasksRepository) {
    this.tasksRepository = tasksRepository
  }
  async execute(id) {
    try {
      const task = await this.tasksRepository.findById(id)

      if (!task) {
        throw new AppError("Task not found", 404)
      }

      return task
    } catch (error) {
      console.log(error)
    }
  }
}

export { GetTaskUseCase }
