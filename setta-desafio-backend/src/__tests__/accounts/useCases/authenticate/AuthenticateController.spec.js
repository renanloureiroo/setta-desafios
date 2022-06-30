import bcryptJs from "bcryptjs"
import request from "supertest"

import { prisma } from "../../../../database/prisma/prisma.js"

import { AccountRepository } from "../../../../modules/accounts/repositories/AccountRepository.js"
import { CreateAccountUseCase } from "../../../../modules/accounts/useCases/createAccount/CreateAccountUseCase.js"
import { app } from "../../../../app.js"

let accountsRepository
let createAccountUseCase

describe("/api/v1/accounts/signin", () => {
  beforeAll(async () => {
    accountsRepository = new AccountRepository()
    createAccountUseCase = new CreateAccountUseCase(accountsRepository)
  })

  afterEach(async () => {
    await prisma.user.deleteMany()

    await prisma.$disconnect()
  })

  it("should be able to authenticate account", async () => {
    await createAccountUseCase.execute({
      name: "John Doe",
      email: "johndoe@gmail.com",
      password: "123456",
    })

    await request(app)
      .post("/api/v1/accounts/signin")
      .send({
        email: "johndoe@gmail.com",
        password: "123456",
      })
      .expect(200)
      .expect((response) => {
        expect(response.body).toHaveProperty("accessToken")
      })
  })

  it("should not be able to authenticate account with invalid credentials", async () => {
    await createAccountUseCase.execute({
      name: "John Doe",
      email: "johndoe@gmail.com",
      password: "123456",
    })

    await request(app)
      .post("/api/v1/accounts/signin")
      .send({
        email: "john@gmail.com",
        password: "123456",
      })
      .expect(400)
      .expect((response) => {
        expect(response.body).toHaveProperty("error", "Invalid credentials!")
      })

    await request(app)
      .post("/api/v1/accounts/signin")
      .send({
        email: "johndoe@gmail.com",
        password: "000000",
      })
      .expect(401)
      .expect((response) => {
        expect(response.body).toHaveProperty("error", "Invalid credentials!")
      })
  })
})
