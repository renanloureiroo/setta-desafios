import express from "express"
import morgan from "morgan"
import { appRoutes } from "./routes/index.js"

const app = express()

app.use(express.json())
app.use(morgan("dev"))

app.use("/api/v1", appRoutes)

export { app }
