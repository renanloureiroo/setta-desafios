import { InMemoryAccountRepository } from "../../../../modules/accounts/repositories/inMemoryRepository/InMemoryAccountRepository.js"
import { CreateAccountUseCase } from "../../../../modules/accounts/useCases/createAccount/CreateAccountUseCase.js"

let AccountRepository
let createAccountUseCase

describe("CreateAccountUseCase", () => {
  beforeAll(() => {
    AccountRepository = new InMemoryAccountRepository()
    createAccountUseCase = new CreateAccountUseCase(AccountRepository)
  })

  it("should be able to create a new account", async () => {
    const account = await createAccountUseCase.execute({
      name: "John Doe",
      email: "johndoe@gmai.com",
      password: "123456",
    })

    expect(account).toHaveProperty("id")
  })

  it("should not be able to create a new account with already registered", async () => {
    const account = {
      name: "John Doe",
      email: "johndoe@gmai.com",
      password: "123456",
    }
    await createAccountUseCase.execute(account)

    expect(async () => {
      await createAccountUseCase.execute(account)
    }).rejects.toTrow("Email already register!")
  })
})
