import axios from 'axios'
import { prisma } from '../../../../prisma/index.mjs'

export default async function projects(req, res) {


    if (req.method === 'GET') {

        const projects = await prisma.project.findMany({
            orderBy: { name: 'asc' },

        })
        const { data: portal } = await axios.get(process.env.GITLAB_URL_TAG, {
            headers: {
                Authorization: `Bearer ${process.env.GITLAB_KEY}`
            }
        })
        const { data: react } = await axios.get('https://git.codificar.com.br/api/v4/projects/238/repository/tags', {
            headers: {
                Authorization: `Bearer ${process.env.GITLAB_KEY}`
            }
        })

        return res.json({
            projects,
            lastTagWeb: portal[0].name,
            lastTagReact: react[0].name
        })

    }

    if (req.method === 'POST') {

        const { name, portal, ios, android, versionWeb, versionIos, versionAndroid, status } = req.body

        if (!name || !ios || !android) {
            return res.status(401).json({
                msg: 'Todos os campos são obrigatórios'
            })
        }

        const projectNameExist = await prisma.project.findUnique({ where: { name } })

        if (projectNameExist) {
            return res.status(401).json({
                msg: 'Já existe um projeto com este nome.'
            })
        }
        const project = await prisma.project.create({
            data: {
                name,
                portal,
                ios,
                android,
                versionWeb,
                versionIos,
                versionAndroid,
                status: status === 'true' ? true : false
            },
        })

        return res.json(project)
    }
}