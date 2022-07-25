export function delay(delay) {
    return new Promise(res => setTimeout(res, delay))
}

import { apiRocket } from "../services/api"

export const sendMessageRocket = async(channel, text) => {

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

export const distinctArrayObj = ({ arrayObj, filter }) => {

    const arrayFilter = arrayObj.map(result => result[filter]).filter(result => result !== undefined)

    const arrayDistinct = [...new Map(arrayFilter.map(result => [result.name, result])).values()]

    const arraySort = arrayDistinct.sort((a, b) => a.name.localeCompare(b.name))
    return arraySort
}

export const devUserRocket = (user) => {

    const name = user.assigned_to ? user.assigned_to.name : user.name
        // return "name " + name
        // console.log(name.replace("  ", " "))
    if (!name) {
        return 'NÃO ATRIBUÍDA'
    }

    if (name === 'Wallace Souza') {
        return '@wallace.sousa'
    }

    if (name === 'Maurício  da Silva Souza') {
        return '@mauricio.silva'
    }

    if (name === 'Davi  Porto Araújo') {
        return '@davi.araujo'

    }

    if (name === 'Leandro  Ribeiro') {
        return '@leandro.ribeiro'

    }

    const userRocket = '@' + name
        .replace("  ", " ")
        .split(' ')
        .slice(0, 2)
        .join('.')
        .toLowerCase()
        .replace('ç', 'c')
        .replace('í', 'i')

    // console.log(userRocket)


    return userRocket
}

export const convertSlug = name => {

    return name
        .replace('ç', 'c')
        .replace(/[ã, á]/g, 'a')
        .replace(' ', '-')
        .toLowerCase()
}