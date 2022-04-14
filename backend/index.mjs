import express from "express"
import './services/job.mjs'
const app = express()

app.get('/', (req, res) => {
    res.json({
        msg: 'api codificar'
    })
})

const PORT = 8000
app.listen(PORT, () => console.log(`http://localhost:${PORT}`))