import cron from 'node-cron'
import axios from 'axios';
import 'dotenv/config'


const minute = 10
    // const time = minute => '8 0 * * 1-5'
const time = minute => `*/${minute} 9-20 * * 1-5`;
(async() => {

    const { data: projects } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/projetos`)

    /**
     * Web marketplace') 
     */
    // console.log({ projects })
    cron.schedule(time(minute), () => {

        projects.map((project, index) => {

            setTimeout(() => {

                axios.get(`${process.env.NEXT_PUBLIC_API_URL}/clientes/update-info`, {
                    params: {
                        platform: 'web',
                        projectSlug: project.slug
                    }
                })
            }, 60 * 1000 * index)
        })
    })

    /**
     * Ios user marketplace
     */
    cron.schedule(time(minute + 10), () => {
        projects.map((project, index) => {

            setTimeout(() => {

                axios.get(`${process.env.NEXT_PUBLIC_API_URL}/clientes/update-info`, {
                    params: {
                        platform: 'ios-user',
                        projectSlug: project.slug
                    }
                })
            }, 60 * 1000 * index)
        })
    })

    /**
     * Android user marketplace
     */
    cron.schedule(time(minute + 20), () => {
        // axios.get(`${process.env.NEXT_PUBLIC_API_URL}/clientes/update-info/android-user`)
        projects.map((project, index) => {

            setTimeout(() => {

                axios.get(`${process.env.NEXT_PUBLIC_API_URL}/clientes/update-info`, {
                    params: {
                        platform: 'android-user',
                        projectSlug: project.slug
                    }
                })
            }, 60 * 1000 * index)
        })
    })


    cron.schedule('57 23 * * 1-5', () => {
        console.log('cron report daily')
            // axios.get('http://version.aplicativoderestaurante.com.br:3000/api/issues/report')
    })



})()