import axios from "axios"
export const apiRocket = axios.create({
    baseURL: 'https://chat.codificar.com.br/api/v1'
})