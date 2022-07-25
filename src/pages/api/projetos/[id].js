import { prisma } from "../../../../prisma";
import { convertSlug } from "../../../helpers";

export default async function handler(req, res) {

    const project = await prisma.project.findFirst({
        where: {
            id: Number(req.query.id)
        }
    })

    if (!project) {
        return res
            .status(401)
            .json({ msg: 'Projeto não existe' })
    }

    if (req.method === 'GET') {
        return res.json(project)
    }

    if (req.method === 'PUT') {
        const { projectIdRedmine, name, channelRocket, qa } = req.body

        if (!projectIdRedmine || !name || !channelRocket || !qa) {
            return res
                .status(401)
                .json({ msg: 'Todos os campos são obrigatórios.' })

        }

        const projectUpdate = await prisma.project.update({
            where: {
                id: Number(req.query.id)
            },
            data: {
                projectIdRedmine,
                name,
                channelRocket,
                qa,
                slug: convertSlug(name)
            }
        })

        return res.json(projectUpdate)
    }


    res.status(404).json({ msg: 'Method not found' })
}