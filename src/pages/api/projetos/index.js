import { json } from "express"
import { prisma } from "../../../../prisma"
import { convertSlug } from "../../../helpers"

export default async function handler(req, res) {

    if (req.method === 'GET') {

        const projects = await prisma.project.findMany({
            orderBy: { name: 'asc' }
        })

        return res.json(projects)

    }

    if (req.method === 'POST') {
        const { projectIdRedmine, name, channelRocket, qa } = req.body
        if (!projectIdRedmine || !name || !channelRocket || !qa) {
            return res
                .status(401)
                .json({ msg: 'Todos os campos são obrigatórios.' })

        }

        const projectIdExist = await prisma.project.findFirst({ where: { projectIdRedmine } })

        if (projectIdExist) {
            return res
                .status(401)
                .json({ msg: 'Esse projeto id do redmine já foi cadastrado.' })
        }

        if (await prisma.project.findFirst({ where: { name } })) {
            return res
                .status(401)
                .json({ msg: 'Esse nome já foi cadastrado.' })
        }

        const project = await prisma.project.create({
            data: {
                projectIdRedmine,
                name,
                channelRocket,
                qa,
                slug: convertSlug(name)
            }
        })
        return res.json(project)


    }

    res.json({ msg: 'method not found' })
}