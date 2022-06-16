import { prisma } from "../../../../prisma/index.mjs";

export default async function projects(req, res) {

    if (req.method === 'GET') {

        const project = await prisma.project.findUnique({
            where: {
                id: Number(req.query.id)
            }
        })
        return res.json(project)
    }

    if (req.method === 'PUT') {
        const { name, portal, ios, android, versionWeb, versionIos, versionAndroid, status } = req.body

        const project = await prisma.project.update({
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
            where: {
                id: Number(req.query.id)
            }
        })


        res.json(project)

    }
}