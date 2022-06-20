import axios from "axios"
import { prisma } from "../../prisma/index.mjs"

export const getProjects = async() => {
    return await prisma.project.findMany({
        orderBy: { name: 'asc' }
    })
}

export const getLastTagWeb = async() => {
    return await axios.get(process.env.NEXT_PUBLI_GITLAB_URL_TAG, {
        headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLI_GITLAB_KEY}`
        }
    })
}

export const getLastTagReact = async() => {
    return await axios.get('https://git.codificar.com.br/api/v4/projects/238/repository/tags', {
        headers: {
            Authorization: `Bearer ${process.env.GITLAB_KEY}`
        }
    })
}