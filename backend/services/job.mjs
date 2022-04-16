import axios from "axios"

setInterval(async() => {
    const { data } = await axios.get('http://localhost:3001/api/issues/report?date=2022-04-14')
    console.log(data)
}, 3000)