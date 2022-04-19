import axios from "axios";

const baseURL = () => {
    if (typeof window !== 'undefined') {
        console.log(window.location.origin)
        console.log('0419')
        return window.location.origin
    }
    // return process.env.BASE_URL
}

export const api = axios.create({
    baseURL: `${baseURL()}/api`
})

export const apiRocket = axios.create({
    baseURL: process.env.ROCKET_URL
})

export const apiRedmine = axios.create({
    baseURL: process.env.REDMINE_URL,
    params: {
        key: process.env.REDMINE_KEY,
        project_id: process.env.REDMINE_PROJECT_ID
    }
})