const express = require('express')
const http = require('http')
const exphbs = require('express-handlebars')
const ProductManager = require('./managers/productManager')
const socketIo = require('socket.io'); // Importa Socket.IO

const app = express()
const server = http.createServer(app)
const io = socketIo(server)

const productManager = new ProductManager('./data/products.json')

// Configuración de Handlebars
app.engine('handlebars', exphbs())
app.set('view engine', 'handlebars')

// Middleware para servir archivos estáticos
app.use(express.static('public'))

// Ruta para renderizar la vista realTimeProducts.handlebars
app.get('/realtimeproducts', async (req, res) => {
    try {
        const products = await productManager.getAllProducts()
        res.render('realTimeProducts', { products })
    } catch (error) {
        console.error('Error al obtener la lista de productos:', error)
        res.status(500).send('Error interno del servidor')
    }
})

// WebSockets
io.on('connection', (socket) => {
    console.log('Usuario conectado')

    // Emitir la lista de productos cuando un usuario se conecta
    socket.emit('products', productManager.getAllProducts())

    // Escuchar eventos para actualizar la lista de productos
    socket.on('updateProducts', async () => {
        const products = await productManager.getAllProducts()
        io.emit('products', products) // Emitir la lista actualizada a todos los clientes
    })
})

// Iniciar el servidor
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`)
})
