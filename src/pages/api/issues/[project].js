import moment from "moment"
import { distinctArrayObj } from "../../../helpers"
import { apiRedmine } from "../../../services/api"

export default async function issues(req, res) {

    const { project } = req.query

    let project_id

    project === 'marketplace' && (project_id = 'ifood-clone')
    project === 'servicos' && (project_id = 'uber-servicos')

    if (project_id === undefined) {
        res.status(404).json({
            msg: 'Project id não encontrado.'
        })
        return
    }
    const { data } = await apiRedmine.get(`/issues.json?sort=status&limit=100&project_id=${project_id}`)

    const issues = data.issues.map(issue => {

        return {
            url: `https://redmine.codificar.com.br/issues/${issue.id}`,
            subject: issue.subject,
            status: issue.status.name,
            id: issue.id,
            assigned_to: issue.assigned_to && issue.assigned_to,
            tracker: issue.tracker,
            priority: issue.priority.name,
            project: issue.project,
            creationDays: moment().diff(issue.created_on, 'days')
        }
    })


    const trackers = distinctArrayObj({ arrayObj: issues, filter: 'tracker' })
    const assigneds = distinctArrayObj({ arrayObj: issues, filter: 'assigned_to' })
    const clients = distinctArrayObj({ arrayObj: issues, filter: 'project' })

    res.json({
        issuesQuantity: issues.length,
        issues,
        trackers,
        assigneds,
        clients,

    })

}