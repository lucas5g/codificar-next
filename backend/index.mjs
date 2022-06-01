import express from "express";
import path from "path";
import { prisma } from "../prisma/index.mjs";

import "./services/cron.mjs"


const app = express()
app.use(express.static(path.resolve() + '/src/assets'))


app.get('/', (req, res) => {
    res.json({ api: 'cods' })
})

app.get('/projects', async(req, res) => {

    const projects = await prisma.project.findMany({
        orderBy: [{
            name: 'asc'
        }]
    })

    return res.json(projects)
})

app.listen(process.env.PORT, () => { console.log(`Server run http://localhost:${process.env.PORT}`) })