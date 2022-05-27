import axios from 'axios'

export default async function projects(req, res) {

    const { data } = await axios.get('http://version.aplicativoderestaurante.com.br:8080/projects')


    res.json(data)


}