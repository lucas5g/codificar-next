import { prisma } from "../../../../prisma/index.js"
import { getLastTagReact, getLastTagWeb } from "../../../utils/fetch"

export default async function handler(req, res) {


    // return res.json({msg: 'teste api'})

    const lastTagWeb = await getLastTagWeb()
    const lastTagReact = await getLastTagReact()

    const projectsWeb = await prisma.project.findMany({
        where: {
            status: true,
            NOT: {
                versionWeb: lastTagWeb
            }

        }
    })

    const web = {
        lastTag: lastTagWeb,
        total: projectsWeb.length,
        projects: projectsWeb
    }

    const projectsAndroid = await prisma.project.findMany({
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

    projectsAndroid.map(project => {
        project.name = project.name
            .replace('molde restaurante', 'molde_restaurante')
            .replace('medicol', 'medicolappmarketplace')
            .replace('demo', 'demomarketplace')
            .replace(' ', '')
            .replace('á', 'a')
            .replace('ã', 'a')
            .replace('ç', 'c')


        project.auto = `./auto -v ${lastTagReact} -p ${project.name} -a ${project.extensionAndroid}`
        project.extensionAndroid = undefined
    })

    const android = {
        lastTag: lastTagReact,
        total: projectsAndroid.length,
        projects: projectsAndroid
    }

    // console.log({ projectsName })
    res.json({ web, android })
}