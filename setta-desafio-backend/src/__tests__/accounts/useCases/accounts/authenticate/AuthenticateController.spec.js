import request from "supertest"
import bcryptJs from "bcryptjs"

import { app } from "../../../../../app.js"
import { prisma } from "../../../../../database/prisma/prisma"

describe("/accounts", () => {
  afterEach(async () => {
    await prisma.user.deleteMany({})
    await prisma.$disconnect()
  })

  describe("signin", () => {
    it("should be able to authenticate a user", async () => {
      const hashedPassword = await bcryptJs.hash("123456", 8)

      await prisma.user.create({
        data: {
          name: "John Doe",
          email: "johndoe@email.com",
          password: hashedPassword,
        },
      })

      await request(app)
        .post("/api/v1/accounts/signin")
        .send({
          email: "johndoe@email.com",
          password: "123456",
        })
        .expect(200)
        .expect((response) => {
          expect(response.body).toHaveProperty("accessToken")
        })
    })
  })
})
