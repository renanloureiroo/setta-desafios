import bcryptJs from "bcryptjs"
import { prisma } from "../../../../../database/prisma/prisma.js"

import { TasksRepository } from "../../../../../modules/tasks/repositories/TasksRepository.js"
import { CreateTaskUseCase } from "../../../../../modules/tasks/useCases/createTask/CreateTaskUseCase.js"

let user
let createTaskUseCase

describe("CreateTaskUseCase", () => {
  beforeAll(async () => {
    const hashedPassword = await bcryptJs.hash("123456", 8)

    user = await prisma.user.create({
      data: {
        name: "John Doe",
        email: "johndoe@email.com",
        password: hashedPassword,
      },
    })

    createTaskUseCase = new CreateTaskUseCase(new TasksRepository())
  })

  afterEach(async () => {
    await prisma.task.deleteMany({})
    await prisma.$disconnect()
  })

  afterAll(async () => {
    await prisma.user.deleteMany({})
    await prisma.$disconnect()
  })

  it("should be able to create a new Task", async () => {
    const task = {
      name: "Task",
      focusedTime: 120,
      pausedTime: 60,
      blocks: [
        {
          type: "focus",
          time: 60,
        },

        {
          type: "pause",
          time: 30,
        },

        {
          type: "focus",
          time: 30,
        },

        {
          type: "pause",
          time: 30,
        },

        {
          type: "focus",
          time: 30,
        },
      ],
    }

    const response = await createTaskUseCase.execute({
      ...task,
      userId: user.id,
    })

    expect(response).toHaveProperty("id")
  })
})
