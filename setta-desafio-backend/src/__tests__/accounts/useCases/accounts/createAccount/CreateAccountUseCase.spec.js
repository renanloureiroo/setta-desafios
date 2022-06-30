import { AppError } from "../../../../../errors/AppError.js"
import { AccountRepository } from "../../../../../modules/accounts/repositories/AccountRepository.js"
import { CreateAccountUseCase } from "../../../../../modules/accounts/useCases/createAccount/CreateAccountUseCase.js"
import { prisma } from "../../../../../database/prisma/prisma.js"

let accountRepository
let createAccountUseCase

describe("CreateAccountUseCase", () => {
  beforeAll(() => {
    accountRepository = new AccountRepository()
    createAccountUseCase = new CreateAccountUseCase(accountRepository)
  })

  afterAll(async () => {
    const deleteAccounts = prisma.user.deleteMany()
    await prisma.$transaction([deleteAccounts])
    await prisma.$disconnect()
  })

  it("should be able to create a new account", async () => {
    const account = await createAccountUseCase.execute({
      name: "John Doe",
      email: "johndoe@gmail.com",
      password: "123456",
    })

    expect(account).toHaveProperty("id")
  })

  it("should not be able to create a new account with already registered", async () => {
    await accountRepository.create({
      name: "John Doe",
      email: "johndoetwo@gmail.com",
      password: "123456",
    })

    await expect(
      createAccountUseCase.execute({
        name: "John Doe",
        email: "johndoetwo@gmail.com",
        password: "123456",
      })
    ).rejects.toEqual(new AppError("Email already register!"))
  })
})