import cron from 'node-cron'
import axios from 'axios';

// cron.schedule('10 9-21 * * 1-5', () => {
//     console.log('Update version projects')
//         // axios.get('http://version.aplicativoderestaurante.com.br:3000/api/projetos/update-info')
//         // projectsVersion()
// });

const minute = 10
const time = minute => `*/${minute} 10-20 * * 1-5`

cron.schedule(time(minute), () => {

    // cron.schedule('* * * * *', () => {
    console.log('cron portal')
    axios.get('http://version.aplicativoderestaurante.com.br:3000/api/projetos/update-info/portal')
})


cron.schedule(time(minute + 2), () => {
    console.log('cron ios')
    axios.get('http://version.aplicativoderestaurante.com.br:3000/api/projetos/update-info/ios')
})

cron.schedule(time(minute + 4), () => {
    console.log('cron android')
    axios.get('http://version.aplicativoderestaurante.com.br:3000/api/projetos/update-info/android')
})


cron.schedule('22 1,4 * * *', () => {
    console.log("Cron log test")
});

cron.schedule('23 58 * * 1-5', () => {
    console.log('cron report daily')
    axios.get('http://version.aplicativoderestaurante.com.br:3000/api/issues/report')
})


// import { pointRecord } from '../bot/point-record.js'
// cron.schedule('20 9,14 * * 1-5', () => {
//     console.log('Running report ponto')
//     console.log('new Date()')
//     pointRecord();
// });


(async() => {
    console.log('Cron node')
    console.log(new Date())
        // axios.get('http://localhost:3000/api/projetos/update-info')

    // const projects = await prisma.project.findMany()

    // console.log(projects)

    // console.log(new Date())
    // pointRecord();
    // console.log(await projectsVersion())

    // const date = new Date()
    // console.log(date)
    // console.log('test')
})()

/**
 *  Point Record
 */