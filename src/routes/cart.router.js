const { Router } = require('express')
const router = Router()

const carts = [] // Lista de carritos

router.post('/', (req, res) => {
    const newCart = {
        id: Math.floor(Math.random() * 1000), // Genera un ID único
        products: req.body.products || [] // Array de objetos con los productos
    }

    carts.push(newCart)
    res.status(201).json(newCart)
})

router.get('/:cid', (req, res) => {
    const cid = parseInt(req.params.cid)
    const cart = carts.find(cart => cart.id === cid)
    if (!cart) {
        return res.status(404).json({ message: 'Cart not found' })
    }

    res.status(200).json(cart.products)
});

router.post('/:cid/product/:pid', (req, res) => {
    const cid = parseInt(req.params.cid)
    const pid = parseInt(req.params.pid)
    const cartIndex = carts.findIndex(cart => cart.id === cid)
    if (cartIndex === -1) {
        return res.status(404).json({ message: 'Cart not found' })
    }

    const cart = carts[cartIndex]
    const existingProductIndex = cart.products.findIndex(product => product.pid === pid)

    if (existingProductIndex !== -1) {
        // Si el producto ya existe en el carrito, incrementar la cantidad
        cart.products[existingProductIndex].quantity++
    } else {
        // Si el producto no existe en el carrito, agregarlo con cantidad 1
        cart.products.push({ pid, quantity: 1 })
    }

    res.status(200).json({ message: 'Product added to cart' })
})

module.exports = router
