import { prisma } from "../../../../prisma/index.js";

export default async function handler(req, res) {

    if (req.method === 'GET') {

        const client = await prisma.client.findUnique({
            where: {
                id: Number(req.query.id)
            }
        })
        return res.json(client)
    }

    if (req.method === 'PUT') {
        const { name, portal, ios, android, versionWeb, versionIos, versionAndroid, status, extensionAndroid, urlUploadAndroid } = req.body

        console.log({ status })
        const client = await prisma.client.update({
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


        return res.json(client)

    }
}