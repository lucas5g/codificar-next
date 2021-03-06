import { apiRedmine } from "../../../services/api"
import { sendMessageRocket, devUserRocket } from "../../../helpers/index.js"
import moment from "moment-timezone"
import { json } from "express/lib/response"
import { text } from "express"

export default async function report(req, res) {

    /**
     * Report diário às 11:58
     */
    console.log(req.rawHeaders[1])

    // return
    const date = req.query.date || moment().tz('America/Sao_Paulo').format('YYYY-MM-DD')


    const filter = `updated_on=${date}&status_id=*&sort=status`
    const { data } = await apiRedmine.get(`/issues.json?${filter}`)

    const { data: time_entries } = await apiRedmine.get(`/time_entries.json?from=${date}&to=${date}`)


    const issues = data.issues.map(issue => ({
        id: `https://redmine.codificar.com.br/issues/${issue.id}`,
        subject: issue.subject,
        assigned_to: devUserRocket(issue),
        project: issue.project.name,
        status: issue.status.name
    }))

    const times = time_entries.time_entries
        .filter(time => time.comments)
        .map(time => {
            // return issues[]
            return time.comments && {
                id: `https://redmine.codificar.com.br/issues/${time.issue.id}`,
                comments: time.comments || 'SEM COMENTÁRIOS',
                project: time.project.name,
                user: devUserRocket(time.user)
            }
        })

    let textReport = `\n:robot: Report geral do Projeto de Marketplace *${moment(date).tz('America/Sao_Paulo').format('DD/MM/YYYY')} ${moment().tz('America/Sao_Paulo').format('HH:mm')}*\n`

    issues.map((issue, index) => (

        textReport += `
            ${index + 1} - ${issue.id} - ${issue.subject} 
            ${issue.assigned_to} - *${issue.project.toUpperCase().trim()}* - ${issue.status}\n`
    ))

    let cont = 0

    times.map((time, index) => (cont++,
            textReport += `
            ${cont + data.issues.length} - ${time.id} - ${time.comments}
            ${time.user} - *${time.project}*\n`

        ))
        // console.log(textReport)

    // return res.send(textReport)

    sendMessageRocket(process.env.ROCKET_CHANNEL, textReport)

    res.json({
        issues,
        times
    })

}