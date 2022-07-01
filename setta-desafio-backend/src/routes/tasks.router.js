import { Router } from "express"
import { saveDataExecuteTaskController } from "../modules/tasks/useCases/saveDataExecuteTask/index.js"

import { getTaskController } from "../modules/tasks/useCases/getTask/index.js"
import { getAllTasksController } from "../modules/tasks/useCases/getAllTasks/index.js"
import { getMetricsController } from "../modules/tasks/useCases/getMetrics/index.js"

const tasksRouter = Router()

tasksRouter.get("/metrics", (req, res) => getMetricsController.handle(req, res))
tasksRouter.get("/:id", (req, res) => getTaskController.handle(req, res))
tasksRouter.get("/", (req, res) => getAllTasksController.handle(req, res))
tasksRouter.post("/", (req, res) =>
  saveDataExecuteTaskController.handle(req, res)
)

export { tasksRouter }
