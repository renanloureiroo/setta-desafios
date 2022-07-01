class GetMetricsUseCase {
  tasksRepository
  constructor(tasksRepository) {
    this.tasksRepository = tasksRepository
  }

  async execute(userId) {
    const tasks = await this.tasksRepository.findAllByUserId(userId)

    const totalTasks = tasks.length

    const averageFocusedTime =
      tasks
        .map((task) => {
          const totalTime = task.focusedTime + task.pausedTime
          return (task.focusedTime * 100) / totalTime
        })
        .reduce((acc, curr) => acc + curr, 0) / totalTasks

    const averagePausedTime = 100 - averageFocusedTime

    const averageFirstFocusTimeBlock =
      tasks
        .map((task) => {
          return task.BlocksTime[0].time
        })
        .reduce((acc, curr) => acc + curr, 0) / totalTasks

    const biggestFocusTimeBlock = tasks
      .flatMap((task) => {
        const times = task.BlocksTime.filter((block) => {
          if (block.type === "focus") {
            return block
          }
        }).map((block) => block.time)

        return times
      })
      .reduce((acc, curr) => {
        if (curr > acc) {
          return curr
        }
        return acc
      }, 0)

    return {
      averageFocusedTime,
      averagePausedTime,
      averageFirstFocusTimeBlock,
      biggestFocusTimeBlock,
    }
  }
}

export { GetMetricsUseCase }
