import request from "supertest"
import { app } from "../../../../app.js"
import { prisma } from "../../../../database/prisma/prisma.js"

describe("CreateAccountController", () => {
  afterAll(async () => {
    const deleteUser = prisma.user.deleteMany()
    await prisma.$transaction([deleteUser])
    await prisma.$disconnect()
  })

  it("should be able to create a new account", async () => {
    await request(app)
      .post("/api/v1/accounts")
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
})
