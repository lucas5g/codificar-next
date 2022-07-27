import cron from 'node-cron'
import axios from 'axios';
import 'dotenv/config'


(async() => {

    const { data } = await  axios.get('https://redmine.codificar.com.br/issues.json', {
        params: {
            project_id: 'uber-servicos',
            key: process.env.REDMINE_KEY,
            limit: 100

        }
    })

    const { total_count } = data

    const issues = data.issues.map( issue => {
        return {
            id: issue.id,
            subject: issue.subject
        }
        
    }) 

    console.log({
        total_count,
        issues
    })

})()

/**
 *  Point Record
 */