class GetMetricsController {
  getMetricsUseCase
  constructor(getMetricsUseCase) {
    this.getMetricsUseCase = getMetricsUseCase
  }

  async handle(req, res) {
    const userId = req.user.id

    try {
      const metrics = await this.getMetricsUseCase.execute(userId)

      return res.status(200).json(metrics)
    } catch (err) {
      return res.status(err.statusCode).json({ error: err.message })
    }
  }
}
export { GetMetricsController }
