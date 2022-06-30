import bcryptJs from "bcryptjs"
import { AuthenticateUseCase } from "../../../../../modules/accounts/useCases/authenticate/AuthenticateUseCase.js"
import { AppError } from "../../../../../errors/AppError.js"
import { AccountRepository } from "../../../../../modules/accounts/repositories/AccountRepository.js"
import { prisma } from "../../../../../database/prisma/prisma.js"

let accountRepository
let authenticateUseCase
let account

describe("AuthenticateUseCase", () => {
  beforeAll(async () => {
    accountRepository = new AccountRepository()
    authenticateUseCase = new AuthenticateUseCase(accountRepository)

    const hashedPassword = await bcryptJs.hash("123456", 8)

    account = await accountRepository.create({
      name: "John Doe",
      email: "johndoe@gmail.com",
      password: hashedPassword,
    })
  })

  afterAll(async () => {
    await prisma.user.deleteMany()
    await prisma.$disconnect()
  })

  it("should be able to authenticate a user", async () => {
    const response = await authenticateUseCase.execute({
      email: account.email,
      password: "123456",
    })

    expect(response).toHaveProperty("accessToken")
  })

  it("should not be able with incorrect credentials", async () => {
    await expect(
      authenticateUseCase.execute({
        email: "incorrectEmail@gmail.com",
        password: "123456",
      })
    ).rejects.toEqual(new AppError("Invalid credentials!", 400))

    await expect(
      authenticateUseCase.execute({
        email: account.email,
        password: "incorrectPassword",
      })
    ).rejects.toEqual(new AppError("Invalid credentials!", 401))
  })
})