import bcryptJs from "bcryptjs"
import { AuthenticateUseCase } from "../../../../modules/accounts/useCases/authenticate/AuthenticateUseCase.js"
import { InMemoryAccountRepository } from "../../../../modules/accounts/repositories/inMemoryRepository/InMemoryAccountRepository.js"
import { AppError } from "../../../../errors/AppError.js"

let accountRepository
let authenticateUseCase
let account

describe("AuthenticateUseCase", () => {
  beforeAll(async () => {
    accountRepository = new InMemoryAccountRepository()
    authenticateUseCase = new AuthenticateUseCase(accountRepository)

    const hashedPassword = await bcryptJs.hash("123456", 8)

    account = await accountRepository.create({
      name: "John Doe",
      email: "johndoe@gmail.com",
      password: hashedPassword,
    })
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
    ).rejects.toEqual(new AppError("Invalid credentials!"))

    await expect(
      authenticateUseCase.execute({
        email: account.email,
        password: "incorrectPassword",
      })
    ).rejects.toEqual(new AppError("Invalid credentials!"))
  })
})
