import axios from 'axios'
import { prisma } from '../../../../prisma/index.js'
import { getClients, getLastTag } from '../../../utils/fetch.js'

export default async function projects(req, res) {



    if (req.method === 'GET') {

        const project = await prisma.project.findFirst({
            where: {
                slug: req.query.project
            }
        })

        // console.log({ project })

        const clients = await getClients({ projectId: project.id })
        const lastTagWeb = await getLastTag({ projectIdGit: project.projectIdGitWeb })
        const lastTagUser = await getLastTag({ projectIdGit: project.projectIdGitUser })
        const lastTagProvider = await getLastTag({ projectIdGit: project.projectIdGitProvider })

        // console.log({ clients, lastTagWeb })
        return res.json({
            clients,
            lastTagWeb,
            lastTagUser,
            lastTagProvider
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