import { prisma } from "../../../../prisma/index.mjs";

export default async function projects(req, res){

    const project = await prisma.project.findUnique({
        where:{
            id: Number(req.query.id)
        }
    })

    return res.json(project)
}