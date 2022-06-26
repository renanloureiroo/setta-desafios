import bcryptJs from "bcryptjs"
import jwt from "jsonwebtoken"
import { AppError } from "../../../../errors/AppError.js"

class AuthenticateUseCase {
  accountsRepository
  constructor(accountsRepository) {
    this.accountsRepository = accountsRepository
  }

  async execute({ email, password }) {
    const accountExists = await this.accountsRepository.findByEmail(email)

    if (!accountExists) {
      throw new AppError("Invalid credentials!")
    }

    const matchPassword = await bcryptJs.compare(
      password,
      accountExists.password
    )
    if (!matchPassword) {
      throw new AppError("Invalid credentials!")
    }

    const accessToken = jwt.sign(
      {
        name: accountExists.name,
        email: accountExists.email,
      },
      "ce362aa0f973e6e22f42e005dda251bd",
      {
        subject: accountExists.id,
      }
    )

    return {
      account: {
        id: accountExists.id,
        name: accountExists.name,
        email: accountExists.email,
      },
      accessToken,
    }
  }
}

export { AuthenticateUseCase }