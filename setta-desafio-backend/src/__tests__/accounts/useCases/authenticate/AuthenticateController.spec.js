import bcryptJs from "bcryptjs"
import request from "supertest"

import { prisma } from "../../../../database/prisma/prisma.js"
import { AccountRepository } from "../../../../modules/accounts/repositories/AccountRepository.js"
import { app } from "../../../../app.js"

let accountsRepository

describe("/api/v1/accounts/signin", () => {
  beforeEach(async () => {
    accountsRepository = new AccountRepository()
    const hashedPassword = await bcryptJs.hash("123456", 8)

    await accountsRepository.create({
      name: "John Doe",
      email: "johndoe@gmail.com",
      password: hashedPassword,
    })
  })

  afterEach(async () => {
    const deleteAccounts = prisma.user.deleteMany()
    await prisma.$transaction([deleteAccounts])
    await prisma.$disconnect()
  })

  it("should be able to authenticate account", async () => {
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
      .expect(400)
      .expect((response) => {
        expect(response.body).toHaveProperty("error", "Invalid credentials!")
      })
  })
})
