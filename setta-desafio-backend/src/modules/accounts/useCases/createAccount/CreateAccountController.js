class CreateAccountController {
  createAccountUseCase
  constructor(createAccountUseCase) {
    this.createAccountUseCase = createAccountUseCase
  }

  async handle(req, res) {
    const { name, email, password } = req.body

    try {
      const account = await this.createAccountUseCase.execute({
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
