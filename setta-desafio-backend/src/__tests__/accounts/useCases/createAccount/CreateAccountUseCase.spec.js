import { jest } from "@jest/globals"
import { CreateAccountUseCase } from "../../../../modules/accounts/useCases/createAccount/CreateAccountUseCase.js"
import { prismaMock } from "../../../../../singleton.js"

let createAccountUseCase

describe("CreateAccountUseCase", () => {
  beforeAll(() => {
    createAccountUseCase = new CreateAccountUseCase()
  })

  it("should be able to create a new account", async () => {
    const userMock = {
      id: "cjld2cjxh0000qzrmn831i7rn",
      name: "John Doe",
      email: "johndoe@gmai.com",
      password: "123456",
      createdAt: new Date(),
      tasks: [],
    }

    const user = await createAccountUseCase.execute({
      name: "John Doe",
      email: "johndoe@gmai.com",
      password: "123456",
    })

    prismaMock.user.create.mockResolvedValue(userMock)
    expect(user).toHaveProperty("id")
  })

  it("should not be able to create a new account with already registered", async () => {
    const user = {
      name: "John Doe",
      email: "johndoe@gmai.com",
      password: "123456",
    }
    await createAccountUseCase.execute(user)

    expect(async () => {
      await createAccountUseCase.execute(user)
    }).rejects.toTrow("Email already exists!")
  })
})
