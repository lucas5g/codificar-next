import axios from 'axios'
import { prisma } from '../../../../prisma/index.mjs'
import { getProjects } from '../../../utils/fetch.js'

export default async function projects(req, res) {


    if (req.method === 'GET') {

        const projects = await getProjects()

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

        const { name, portal, ios, android, versionWeb, versionIos, versionAndroid, status, extensionAndroid, urlUploadAndroid } = req.body

        if (!name || !ios || !android || !extensionAndroid || !urlUploadAndroid) {
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
                extensionAndroid,
                urlUploadAndroid,
                status: status === 'true' ? true : false
            },
        })

        return res.json(project)
    }
}