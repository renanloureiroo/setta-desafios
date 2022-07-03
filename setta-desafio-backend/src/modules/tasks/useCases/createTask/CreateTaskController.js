class CreateTaskController {
  createTaskUseCase
  constructor(createTaskUseCase) {
    this.createTaskUseCase = createTaskUseCase
  }

  async handle(req, res) {
    const userId = req.user.id
    const { name, focusedTime, pausedTime, blocks } = req.body
    try {
      const task = await this.createTaskUseCase.execute({
        name,
        focusedTime,
        pausedTime,
        blocks,
        userId,
      })
      return res.status(201).json(task)
    } catch (err) {
      return res.status(400).json({ error: err.message })
    }
  }
}

export { CreateTaskController }
