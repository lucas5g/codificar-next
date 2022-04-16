import axios from "axios";

const baseURL = () => {
    if (typeof window !== 'undefined') {
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
console.log(baseURL())