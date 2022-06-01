import express from "express";
import path from "path";


import { projectsVersion } from "./bot/projects-version.mjs"
import "./services/cron.mjs"


const app = express()
app.use(express.static(path.resolve() + '/src/assets'))


app.get('/', (req, res) => {
    res.json({ api: 'cods' })
})

// app.get('/projects', async(req, res) => {

//     const projects = await prisma.project.findMany({
//         orderBy: [{
//             name: 'asc'
//         }]
//     })

//     return res.json(projects)
// })

app.get('/projects-update-list', (req, res) => {
    projectsVersion()

    res.json({
        msg: 'Atualizando listas dos projetos via webhook'
    })
})


app.listen(process.env.PORT, () => { console.log(`Server run http://localhost:${process.env.PORT}`) })