import express from "express"
import morgan from "morgan"
import { appRoutes } from "./routes/index.js"
import "reflect-metadata"

import cors from "cors"

const app = express()

app.use(express.json())
app.use(
  cors({
    origin: "*",
  })
)

app.use(morgan("dev"))

app.use("/api/v1", appRoutes)

export { app }
