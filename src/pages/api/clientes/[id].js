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
        const { body } = req

        body.status = (body.status === true || body.status === 'true') ? true : false

        const client = await prisma.client.update({
            data: body,
            where: {
                id: Number(req.query.id)
            }
        })


        return res.json(client)

    }
}