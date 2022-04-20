import express from "express"
import './services/job.mjs'

import { router } from "./routes/index.mjs"

const app = express()

app.use(express.json())
app.use(router)





const PORT = 8002
app.listen(PORT, () => console.log(`http://localhost:${PORT}`))