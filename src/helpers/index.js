export function delay(delay) {
    return new Promise(res => setTimeout(res, delay))
}

import { apiRocket } from "../services/api"

export const sendMessageRocket = async(channel, text) => {

    if (process.env.BASE_URL === 'http://localhost:3000') {
        console.log('no send job localhost')
        console.log({
            channel,
            text
        })
        return
    }

    // return
    try {

        const { data } = await apiRocket.post('/login', {
            user: process.env.ROCKET_USERNAME,
            password: process.env.ROCKET_PASSWORD
        })
        const { userId, authToken } = data.data

        await apiRocket.post('/chat.postMessage', {
            channel,
            text
        }, {
            headers: {
                'X-Auth-Token': authToken,
                'X-User-Id': userId
            }
        })
    } catch (error) {
        console.log(error)
    }
}