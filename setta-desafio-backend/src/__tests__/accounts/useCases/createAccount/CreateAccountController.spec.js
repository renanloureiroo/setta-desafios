import request from "supertest"
import { app } from "../../../../app.js"
import { prisma } from "../../../../database/prisma/prisma.js"
import { AccountRepository } from "../../../../modules/accounts/repositories/AccountRepository.js"
import { CreateAccountUseCase } from "../../../../modules/accounts/useCases/createAccount/CreateAccountUseCase.js"

let accountsRepository
let createAccountUseCase

describe("/api/v1/accounts POST ENDPOINT", () => {
  beforeAll(async () => {
    accountsRepository = new AccountRepository()
    createAccountUseCase = new CreateAccountUseCase(accountsRepository)
  })

  afterEach(async () => {
    await prisma.user.deleteMany()

    await prisma.$disconnect()
  })

  it("should create a new account", async () => {
    await request(app)
      .post("/api/v1/accounts/signup")
      .send({
        name: "John Doe",
        email: "johndoe@gmail.com",
        password: "123456",
      })
      .expect(201)
      .expect((response) => {
        expect(response.body).toHaveProperty("id")
      })
  })

  it("should not create a new account with email already registered", async () => {
    await createAccountUseCase.execute({
      name: "John Doe",
      email: "john@gmail.com",
      password: "123456",
    })

    await request(app)
      .post("/api/v1/accounts/signup")
      .send({
        name: "John Doe",
        email: "john@gmail.com",
        password: "123456",
      })
      .expect(400)
      .expect((response) => {
        expect(response.body).toHaveProperty("error", "Email already register!")
      })
  })
})
