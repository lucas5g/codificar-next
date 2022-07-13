import { prisma } from "../../../../prisma/index.js"
import { getLastTagReact, getLastTagWeb } from "../../../utils/fetch"

export default async function handler(req, res) {
    const { platform } = req.query

    const lastTagWeb = await getLastTagWeb()
    const lastTagReact = await getLastTagReact()


    if (platform === 'web') {

        const projects = await prisma.project.findMany({
            where: {
                status: true,
                NOT: {
                    versionWeb: lastTagWeb
                }

            }
        })
        res.json({
            lastTagWeb,
            totalProjects: projects.length,
            projects
        })
        return
    }

    if (platform === 'react') {
        const projects = await prisma.project.findMany({
            where: {
                status: true,
                NOT: {
                    versionAndroid: lastTagReact
                }

            },
            select: {
                name: true,
                versionAndroid: true,
                urlUploadAndroid: true,
                extensionAndroid: true,
            }
        })

        projects.map(project => project.name = project.name
            .replace('molde restaurante', 'molde_restaurante')
            .replace('medicol', 'medicolappmarketplace')
            .replace(' ', '')
            .replace('á', 'a')
            .replace('ã', 'a')
            .replace('ç', 'c')
        )
        res.json({
            lastTagReact,
            totalProjects: projects.length,
            projects
        })
        return
    }


    res.status(401).json({
        msg: 'web ou react como plataforma'
    })

}