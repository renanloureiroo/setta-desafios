import { prisma } from "../../../../database/prisma/prisma.js"

class CreateAccountUseCase {
  async execute({ name, email, password }) {
    const user = await prisma.user.create({
      name,
      email,
      password,
    })

    return user
  }
}

export { CreateAccountUseCase }
