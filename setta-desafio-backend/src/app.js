import express from "express"
import cors from "cors"

import { appRoutes } from "./routes/index.js"

const app = express()

app.use(express.json())
app.use(cors())

app.use("/api/v1", appRoutes)

export { app }
