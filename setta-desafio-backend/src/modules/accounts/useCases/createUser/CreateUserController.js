class CreateAccountController {
  createUserUseCase
  constructor(createUserUseCase) {
    this.createUserUseCase = createUserUseCase
  }

  async handle(req, res) {
    const { name, email, password } = req.body

    try {
      const account = await this.createUserUseCase.execute({
        name,
        email,
        password,
      })

      return res.status(201).json(account)
    } catch (err) {
      return res.status(err.statusCode).json({
        error: err.message,
      })
    }
  }
}

export { CreateAccountController }
