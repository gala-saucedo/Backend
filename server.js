const http = require(`http`)

const server = http.createServer((req, res) => {
    res.end(`hola mundo, soy gala`)
})

server. listen(3000, () =>{
    console.log(`servidor listo`)
})