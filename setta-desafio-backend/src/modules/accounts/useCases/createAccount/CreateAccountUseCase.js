import bcryptJs from "bcryptjs"
import { AppError } from "../../../../errors/AppError.js"

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

    const hashedPassword = await bcryptJs.hash(password, 8)

    const account = this.accountsRepository.create({
      name,
      email,
      password: hashedPassword,
    })

    return account
  }
}

export { CreateAccountUseCase }
