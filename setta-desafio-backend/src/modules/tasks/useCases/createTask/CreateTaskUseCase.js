class CreateTaskUseCase {
  tasksRepository
  constructor(tasksRepository) {
    this.tasksRepository = tasksRepository
  }

  async execute({ name, focusedTime, pausedTime, blocks, userId }) {
    const task = await this.tasksRepository.create({
      name,
      focusedTime,
      pausedTime,
      blocks,
      userId,
    })

    return task
  }
}

export { CreateTaskUseCase }
