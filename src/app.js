const express = require('express')
const app = express()
const productsRouter = require('./routes/products.router')
const cartRouter = require('./routes/cart.router')

app.use(express.static(`${__dirname}/../public`))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Rutas de productos
app.use('/api/products', productsRouter)

// Rutas de carritos
app.use('/api/carts', cartRouter)

app.listen(8080, () => {
    console.log('Servidor listo!')
});
