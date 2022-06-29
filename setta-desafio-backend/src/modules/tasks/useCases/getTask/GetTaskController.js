class GetTaskController {
  getTaskUseCase
  constructor(getTaskUseCase) {
    this.getTaskUseCase = getTaskUseCase
  }

  async handle(req, res) {
    const { id } = req.query

    try {
      const task = await this.getTaskUseCase.execute(id)

      return res.json(task)
    } catch (err) {
      return res.status(err.statusCode).json({
        error: err.message,
      })
    }
  }
}

export { GetTaskController }
