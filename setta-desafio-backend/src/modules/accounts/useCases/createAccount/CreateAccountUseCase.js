import { AppError } from "../../../../errors/AppError"

class CreateAccountUseCase {
  accountsRepository
  constructor(accountsRepository) {
    this.accountsRepository = accountsRepository
  }
  async execute({ name, email, password }) {
    const accountAlreadyExists = await this.accountsRepository.findByEmail(
      email
    )
    if (accountAlreadyExists) {
      throw new AppError("Email already register!")
    }
    const account = this.accountsRepository.create({
      name,
      email,
      password,
    })

    return account
  }
}

export { CreateAccountUseCase }
