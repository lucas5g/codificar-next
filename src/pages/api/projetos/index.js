import axios from 'axios'
import { prisma } from '../../../../prisma/index.mjs'

export default async function projects(req, res) {

    const projects = await prisma.project.findMany({
        orderBy: { name: 'asc' },
        where: {
            status: {
                equals: true
            }
        }
    })

    const { data: portal } = await axios.get(process.env.GITLAB_URL_TAG, {
        headers: {
            Authorization: `Bearer ${process.env.GITLAB_KEY}`
        }
    })
    const { data: react } = await axios.get('https://git.codificar.com.br/api/v4/projects/238/repository/tags', {
        headers: {
            Authorization: `Bearer ${process.env.GITLAB_KEY}`
        }
    })

    res.json({
        projects,
        lastTagWeb: portal[0].name,
        lastTagReact: react[0].name
    })


}