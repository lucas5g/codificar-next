import express from  'express'

const app = express()

app.get('/', (req, res) => {
    res.json({api : 'cods'})
})


app.listen(8000, () => console.log('HTTP run server'))