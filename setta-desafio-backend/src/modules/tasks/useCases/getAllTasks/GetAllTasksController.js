class GetAllTasksController {
  getAllTasksUseCase
  constructor(getAllTasksUseCase) {
    this.getAllTasksUseCase = getAllTasksUseCase
  }

  async handle(req, res) {
    const userId = req.user.id

    try {
      const tasks = await this.getAllTasksUseCase.execute(userId)

      return res.json(tasks)
    } catch (err) {
      return res.status(err.statusCode).json({
        error: err.message,
      })
    }
  }
}

export { GetAllTasksController }
