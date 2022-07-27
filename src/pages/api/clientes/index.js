import axios from 'axios'
import { prisma } from '../../../../prisma'
import { getClients, getLastTag } from '../../../utils/fetch.js'

export default async function projects(req, res) {



    if (req.method === 'GET') {

        const project = await prisma.project.findFirst({
            where: {
                slug: req.query.project
            }
        })

        const clients = await getClients({ projectId: project.id })
        const lastTagWeb = await getLastTag({ projectIdGit: project.projectIdGitWeb })
        const lastTagUser = await getLastTag({ projectIdGit: project.projectIdGitUser })
        const lastTagProvider = await getLastTag({ projectIdGit: project.projectIdGitProvider })

        return res.json({
            clients,
            lastTagWeb,
            lastTagUser,
            lastTagProvider
        })

    }

    if (req.method === 'POST') {


        const { body } = req
        body.status = (body.status === true || body.status === 'true') ? true : false


        const clientNameExist = await prisma.client.findUnique({ where: { name: body.name } })

        if (clientNameExist) {
            return res.status(401).json({
                msg: 'Já existe um projeto com este nome.'
            })
        }
        const client = await prisma.client.create({
            data: body
        })

        return res.json(client)
    }
}