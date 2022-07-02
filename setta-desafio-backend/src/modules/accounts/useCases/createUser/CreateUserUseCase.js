import bcryptJs from "bcryptjs"
import { AppError } from "../../../../errors/AppError.js"

class CreateAccountUseCase {
  usersRepository
  constructor(usersRepository) {
    this.usersRepository = usersRepository
  }
  async execute({ name, email, password }) {
    const accountAlreadyExists = await this.usersRepository.findByEmail(email)
    if (accountAlreadyExists) {
      throw new AppError("Email already register!")
    }

    const hashedPassword = await bcryptJs.hash(password, 8)

    const account = await this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
    })

    return account
  }
}

export { CreateAccountUseCase }
