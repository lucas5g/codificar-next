import cron from 'node-cron'
import axios from 'axios';

cron.schedule('10 9-21 * * 1-5', () => {
    console.log('Update version projects')
        // axios.get('http://version.aplicativoderestaurante.com.br:3000/api/projetos/update-info')
        // projectsVersion()
});

const minute = 16
cron.schedule(`${minute} 4 * * *`, () => {
    console.log('cron portal')
    axios.get('http://version.aplicativoderestaurante.com.br:3000/api/projetos/update-info/portal')

})
cron.schedule(`${minut + 1} 4 * * *`, () => {
    console.log('cron ios')
    axios.get('http://version.aplicativoderestaurante.com.br:3000/api/projetos/update-info/ios')
})
cron.schedule(`${minute + 2} 4 * * *`, () => {
    console.log('cron android')
    axios.get('http://version.aplicativoderestaurante.com.br:3000/api/projetos/update-info/android')
})


cron.schedule('9 12,15 * * *', () => {
    console.log("Cron log test")
});



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