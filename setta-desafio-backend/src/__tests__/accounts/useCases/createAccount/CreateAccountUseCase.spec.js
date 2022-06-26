import { AppError } from "../../../../errors/AppError.js"
import { InMemoryAccountRepository } from "../../../../modules/accounts/repositories/inMemoryRepository/InMemoryAccountRepository.js"
import { CreateAccountUseCase } from "../../../../modules/accounts/useCases/createAccount/CreateAccountUseCase.js"

let accountRepository
let createAccountUseCase

describe("CreateAccountUseCase", () => {
  beforeEach(() => {
    accountRepository = new InMemoryAccountRepository()
    createAccountUseCase = new CreateAccountUseCase(accountRepository)
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
      email: "johndoeTwo@gmail.com",
      password: "123456",
    })

    await expect(
      createAccountUseCase.execute({
        name: "John Doe",
        email: "johndoeTwo@gmail.com",
        password: "123456",
      })
    ).rejects.toEqual(new AppError("Email already register!"))
  })
})
