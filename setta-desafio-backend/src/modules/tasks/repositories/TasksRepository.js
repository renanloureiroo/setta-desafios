import { prisma } from "../../../database/prisma/prisma.js"

class TasksRepository {
  async create({ name, focusedTime, pausedTime, blocks, userId }) {
    const task = await prisma.task.create({
      data: {
        name,
        focusedTime,
        pausedTime,
        userId,
      },
    })

    await prisma.timeBlock.createMany({
      data: blocks.map((block) => {
        return {
          type: block.type,
          time: block.time,
          taskId: task.id,
        }
      }),
    })

    return task
  }

  async findById(id) {
    return await prisma.task.findFirst({
      where: {
        id,
      },
      include: {
        timeBlocks: true,
      },
    })
  }

  async findAllByUserId(userId) {
    return await prisma.task.findMany({
      where: {
        userId,
      },
      include: {
        timeBlocks: true,
      },
    })
  }
}

export { TasksRepository }
