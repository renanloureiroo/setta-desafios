class GetAllTasksUseCase {
  tasksRepository
  constructor(tasksRepository) {
    this.tasksRepository = tasksRepository
  }
  async execute(userId) {
    const tasks = await this.tasksRepository.findAllByUserId(userId)
    return tasks
  }
}

export { GetAllTasksUseCase }
