import moment from "moment"
import { distinctArrayObj } from "../../../helpers"
import { apiRedmine } from "../../../services/api"

export default async function issues(req, res) {

    const { data } = await apiRedmine.get('/issues.json?sort=status&limit=50')

    // console.log(data.issues)

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
    const projects = distinctArrayObj({ arrayObj: issues, filter: 'project' })

    res
        .json({
            issues,
            trackers,
            assigneds,
            projects

        })

}