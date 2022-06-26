import bcryptJs from "bcryptjs"
import { AuthenticateUseCase } from "../../../../modules/accounts/useCases/authenticate/AuthenticateUseCase.js"
import { InMemoryAccountRepository } from "../../../../modules/accounts/repositories/inMemoryRepository/InMemoryAccountRepository.js"

let accountRepository
let authenticateUseCase
describe("AuthenticateUseCase", () => {
  beforeAll(async () => {
    accountRepository = new InMemoryAccountRepository()
    authenticateUseCase = new AuthenticateUseCase(accountRepository)

    const hashedPassword = bcryptJs.hash("123456", 8)

    await accountRepository.create({
      name: "John Doe",
      email: "johndoe@gmail.com",
      password: hashedPassword,
    })
  })

  it("should be able to authenticate a user", async () => {
    const response = await authenticateUseCase.execute({
      email: "johndoe@gmail.com",
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
        email: "johndoe@gmail.com",
        password: "incorrectPassword",
      })
    ).rejects.toEqual(new AppError("Invalid credentials!"))
  })
})
