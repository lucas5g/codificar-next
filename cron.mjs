import cron from 'node-cron'
import axios from 'axios';
import 'dotenv/config'

const minute = 10
const time = minute => `*/${minute} 9-20 * * 1-5`

/**
 * Web marketplace') 
 */
cron.schedule(time(minute), () => {

    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/clientes/update-info`, {
        params: {
            platform: 'web',
            project: 'marketplace'
        }
    })
})

/**
 * Ios user marketplace
 */
cron.schedule(time(minute + 2), () => {
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/clientes/update-info/ios-user`)
})

/**
 * Android user marketplace
 */
cron.schedule(time(minute + 4), () => {
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/clientes/update-info/android-user`)
})


cron.schedule('57 23 * * 1-5', () => {
    console.log('cron report daily')
        // axios.get('http://version.aplicativoderestaurante.com.br:3000/api/issues/report')
})

cron.schedule('12 * * * *', () => {
    updateInfoWeb()
})



;





(async() => {

})()

/**
 *  Point Record
 */