import { prisma } from "../../../../prisma/index.js";

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
        const { name, portal, ios, android, versionWeb, versionIos, versionAndroid, status, extensionAndroid, urlUploadAndroid } = req.body

        console.log({ status })
        const project = await prisma.project.update({
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
                status: (status === 'true' || status === true) ? true : false
            },
            where: {
                id: Number(req.query.id)
            }
        })


        res.json(project)

    }
}