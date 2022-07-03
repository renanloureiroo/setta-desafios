import { AppError } from "../../../../../errors/AppError.js"
import { UsersRepository } from "../../../../../modules/accounts/repositories/UsersRepository.js"
import { CreateUserUseCase } from "../../../../../modules/accounts/useCases/createUser/CreateUserUseCase.js"
import { prisma } from "../../../../../database/prisma/prisma.js"

let usersRepository
let createUserUseCase

describe("CreateAccountUseCase", () => {
  beforeAll(() => {
    usersRepository = new UsersRepository()
    createUserUseCase = new CreateUserUseCase(usersRepository)
  })

  afterEach(async () => {
    const deleteAccounts = prisma.user.deleteMany()
    await prisma.$transaction([deleteAccounts])
    await prisma.$disconnect()
  })

  it("should be able to create a new account", async () => {
    const account = await createUserUseCase.execute({
      name: "John Doe",
      email: "johndoe@gmail.com",
      password: "123456",
    })

    expect(account).toHaveProperty("id")
  })

  it("should not be able to create a new account with already registered", async () => {
    await usersRepository.create({
      name: "John Doe",
      email: "johndoetwo@gmail.com",
      password: "123456",
    })

    await expect(
      createUserUseCase.execute({
        name: "John Doe",
        email: "johndoetwo@gmail.com",
        password: "123456",
      })
    ).rejects.toEqual(new AppError("Email already register!"))
  })
})
