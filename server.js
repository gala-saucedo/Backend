const express = require('express')
const app = express()
const http = require(`http`)

app.get('/', (req, res) => {
    res.end(`hola mundo, soy gala`)
})

app.listen(8080, () => {
    console.log(`Servidor listo`)
})
