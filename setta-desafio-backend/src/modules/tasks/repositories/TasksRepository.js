import { prisma } from "../../../database/prisma/prisma.js"

class TasksRepository {
  async create({ name, focusedTime, pausedTime, blocks, userId }) {
    console.table({ name, focusedTime, pausedTime, blocks, userId })
    const task = await prisma.task.create({
      data: {
        name,
        focusedTime,
        pausedTime,
        userId,
      },
    })

    await prisma.blocksTime.createMany({
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
    console.log(id)
    return await prisma.task.findFirst({
      where: {
        id,
      },
      include: {
        BlocksTime: true,
      },
    })
  }

  async findAllByUserId(userId) {
    return await prisma.task.findMany({
      where: {
        userId,
      },
      include: {
        BlocksTime: true,
      },
    })
  }
}

export { TasksRepository }