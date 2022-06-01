import cron from 'node-cron'
import dotenv from "dotenv";
import { projectsVersion } from '../bot/projects-version.mjs'


dotenv.config();


cron.schedule('*/30 9,19 * * 1-5', () => {
    console.log('Update version projects')
    projectsVersion()
});


// import { pointRecord } from '../bot/point-record.js'
// cron.schedule('20 9,14 * * 1-5', () => {
//     console.log('Running report ponto')
//     console.log('new Date()')
//     pointRecord();
// });


(async() => {

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