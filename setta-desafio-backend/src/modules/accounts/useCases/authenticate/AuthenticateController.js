class AuthenticateController {
  authenticateUseCase
  constructor(authenticateUseCase) {
    this.authenticateUseCase = authenticateUseCase
  }
  async handle(req, res) {
    const { email, password } = req.body

    try {
      const access = await this.authenticateUseCase.execute({ email, password })

      return res.json({
        ...access,
      })
    } catch (err) {
      return res.status(err.statusCode).json({
        error: err.message,
      })
    }
  }
}

export { AuthenticateController }
