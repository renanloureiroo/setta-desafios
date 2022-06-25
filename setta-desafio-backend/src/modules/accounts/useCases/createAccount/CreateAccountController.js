class CreateAccountController {
  constructor(createAccountUseCase) {}

  async handle({ req, res }) {
    const { name, email, password } = req.body

    const user = await this.createAccountUseCase.execute({
      name,
      email,
      password,
    })

    res.status(201).json(user)
  }
}

export { CreateAccountController }
