import axios from 'axios'
import { prisma } from '../../../../prisma/index.js'
import { getClients, getLastTagReact, getLastTagWeb } from '../../../utils/fetch.js'

export default async function projects(req, res) {


    const { project } = req.query

    if (req.method === 'GET') {

        const clients = await getClients()
        const lastTagWeb = await getLastTagWeb()
        const lastTagReact = await getLastTagReact()

        return res.json({
            clients,
            lastTagWeb,
            lastTagReact
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