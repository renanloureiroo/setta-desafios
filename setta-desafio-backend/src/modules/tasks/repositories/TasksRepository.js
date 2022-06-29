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
}

export { TasksRepository }
