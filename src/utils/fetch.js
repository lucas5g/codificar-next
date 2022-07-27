import axios from "axios"
import { prisma } from "../../prisma"

export const getClients = async({ projectId }) => {
    return await prisma.client.findMany({
        where: { projectId },
        orderBy: { name: 'asc' },
    })
}


export const getLastTag = async({ projectIdGit }) => {

    if (!projectIdGit) {
        return null
    }
    const { data } = await axios.get(`https://git.codificar.com.br/api/v4/projects/${projectIdGit}/repository/tags`, {
        headers: {
            Authorization: `Bearer ${process.env.GITLAB_KEY}`
        }
    })

    return data[0].name
}

export const getProject = async({ projectSlug }) => {
    const project = await prisma.project.findFirst({
        where: { slug: projectSlug }
    })

    return project
}