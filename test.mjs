import cron from 'node-cron'
import axios from 'axios';
import 'dotenv/config'
import moment from 'moment';


(async() => {

    const { data } = await axios.get('https://redmine.codificar.com.br/issues.json', {
        params: {
            project_id: 'uber-servicos',
            key: process.env.REDMINE_KEY,
            limit: 100,
            // status_id: 'closed'

        }
    })

    const { total_count } = data

    const issues = data.issues.map(issue => {
        return {
            id: issue.id,
            subject: issue.subject,
            client: issue.project.name,
            status: issue.status,
            assigned_to: issue.assigned_to,
            creationDays: moment().diff(issue.created_on, 'days'),
            // ...issue
        }

    })

    const closeTask = issues.filter(issue => issue.client !== 'MoviCare' && issue.creationDays > 90)

    // closeTask.forEach((issue, index) => (
    //     console.log(`${index + 1} - https://redmine.codificar.com.br/issues/${issue.id} - ${issue.client} - ${issue.subject} - ${issue.creationDays}`)
    // ))



    // closeTask.map((issue, index) => {
    //     setTimeout(() => {
    //         const url = `https://redmine.codificar.com.br/issues/${issue.id}.json?key=${process.env.REDMINE_KEY}`
    //         console.log(url)
    //         axios.put(url, {
    //             "issue": {
    //                 "assigned_to_id": 338,
    //                 "status_id": 6,
    //                 "start_date": "2022-07-28",
    //                 "due_date": "2022-07-28",
    //                 "estimated_hours": 1
    //             }
    //         })
    //     }, index * 677)
    // })

    // {
    //     assigne
    // }
    // console.log({
    //     issues,
    //     total_count,
    //     closeTaskLenght: closeTask.length
    //         // issues
    // })

})()

/**
 *  Point Record
 */