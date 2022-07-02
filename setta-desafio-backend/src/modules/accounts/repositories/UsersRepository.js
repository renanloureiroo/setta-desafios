import { prisma } from "../../../database/prisma/prisma.js"

class UsersRepository {
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

  async findById(id) {
    return prisma.user.findFirst({
      where: {
        id,
      },
    })
  }
}

export { UsersRepository }
