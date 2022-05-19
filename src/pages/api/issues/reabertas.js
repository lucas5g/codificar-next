import { devUserRocket, sendMessageRocket } from "../../../helpers"
import { apiRedmine } from "../../../services/api"

export default async function handler(req, res) {

    const { data } = await apiRedmine.get('/issues.json?status_id=8')
    console.log(data)


    data.issues.map(issue => {
        const text = `*REABERTA* - https://redmine.codificar.com.br/issues/${issue.id} - ${issue.subject}`
        console.log(text)
        console.log(devUserRocket(issue))
        sendMessageRocket('@lucas.sousa', text)
        sendMessageRocket(devUserRocket(issue), text)
    })

    res.json({
        msg: 'reabert',
        issues: data.issues
    })
}