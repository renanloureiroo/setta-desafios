import bcryptJs from "bcryptjs"
import jwt from "jsonwebtoken"
import { AppError } from "../../../../errors/AppError.js"

class AuthenticateUseCase {
  usersRepository
  constructor(usersRepository) {
    this.usersRepository = usersRepository
  }

  async execute({ email, password }) {
    const accountExists = await this.usersRepository.findByEmail(email)

    if (!accountExists) {
      throw new AppError("Invalid credentials!")
    }

    const matchPassword = await bcryptJs.compare(
      password,
      accountExists.password
    )
    if (!matchPassword) {
      throw new AppError("Invalid credentials!", 401)
    }

    const accessToken = jwt.sign(
      {
        name: accountExists.name,
        email: accountExists.email,
      },
      process.env.JWT_SECRET_KEY,
      {
        subject: accountExists.id,
        expiresIn: "7d",
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
