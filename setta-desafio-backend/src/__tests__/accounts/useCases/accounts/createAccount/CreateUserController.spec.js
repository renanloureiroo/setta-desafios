import request from "supertest"
import bcryptJs from "bcryptjs"

import { app } from "../../../../../app.js"
import { prisma } from "../../../../../database/prisma/prisma.js"

describe("/accounts", () => {
  afterEach(async () => {
    await prisma.user.deleteMany({})
    prisma.$disconnect()
  })

  describe("/signup", () => {
    it("should be able to create a new user", async () => {
      await request(app)
        .post("/api/v1/accounts/signup")
        .send({
          name: "John Doe",
          email: "johndoe@email.com",
          password: "123456",
        })
        .expect(201)
        .expect((response) => {
          expect(response.body).toHaveProperty("id")
        })
    })

    it("should not be able to create a new user with an already used email", async () => {
      const hashedPassword = await bcryptJs.hash("123456", 8)

      await prisma.user.create({
        data: {
          name: "John Doe",
          email: "johndoe@email.com",
          password: hashedPassword,
        },
      })

      await request(app)
        .post("/api/v1/accounts/signup")
        .send({
          name: "John Doe",
          email: "johndoe@email.com",
          password: "123456",
        })
        .expect(400)
        .expect((response) => {
          expect(response.body).toHaveProperty(
            "error",
            "Email already register!"
          )
        })
    })
  })
})
