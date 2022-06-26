import { prisma } from "../../../database/prisma/prisma.js"

class AccountRepository {
  async create({ name, email, password }) {
    return await prisma.user.create({
      data: {
        name,
        email,
        password,
      },
    })
  }

  async findByEmail(email) {
    return prisma.user.findFirst({
      where: {
        email,
      },
    })
  }
}

export { AccountRepository }
