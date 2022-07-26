import moment from "moment"
import { distinctArrayObj } from "../../../helpers"
import { apiRedmine } from "../../../services/api"
import { prisma } from '../../../../prisma'

export default async function issues(req, res) {

    const { slugProject } = req.query

    const project = await prisma.project.findFirst({
        where: {
            slug: slugProject
        }
    })

    // console.log({ slugProject, project })

    if (!project) {
        return res
            .status(404)
            .json({ msg: `O ${slugProject} não foi cadastrado.` })
    }

    try {


        const { data } = await apiRedmine.get(`/issues.json?sort=status&limit=100&project_id=${project.projectIdRedmine}`)

        const issues = data.issues.map(issue => {

            return {
                url: `https://redmine.codificar.com.br/issues/${issue.id}`,
                subject: issue.subject,
                status: issue.status.name,
                id: issue.id,
                assigned_to: issue.assigned_to && issue.assigned_to,
                tracker: issue.tracker,
                priority: issue.priority.name,
                client: issue.project,
                creationDays: moment().diff(issue.created_on, 'days')
            }
        })


        const trackers = distinctArrayObj({ arrayObj: issues, filter: 'tracker' })
        const assigneds = distinctArrayObj({ arrayObj: issues, filter: 'assigned_to' })
        const clients = distinctArrayObj({ arrayObj: issues, filter: 'client' })

        return res.json({
            issuesQuantity: issues.length,
            issues,
            trackers,
            assigneds,
            clients,

        })
    } catch (error) {
        // console.log(error.response.data)
        return res
            .status(404)
            .json({ msg: 'Erro na api do redmine. Verifica se o project_id está correto.' })

    }

}