const { Router } = require('express')
const router = Router()
const CartManager = require('../managers/cartManager')
const cartManager = new CartManager('./data/carts.json')

router.post('/', async (req, res) => {
    const newCart = {
        id: Math.floor(Math.random() * 1000), // Genera un ID único
        products: req.body.products || [] // Array de objetos con los productos
    }

    await cartManager.addCart(newCart)
    res.status(201).json(newCart)
})

router.get('/:cid', async (req, res) => {
    const cid = parseInt(req.params.cid)
    const cart = await cartManager.getCartById(cid)
    if (!cart) {
        return res.status(404).json({ message: 'Cart not found' })
    }

    res.status(200).json(cart.products)
})

router.post('/:cid/product/:pid', async (req, res) => {
    const cid = parseInt(req.params.cid)
    const pid = parseInt(req.params.pid)
    const cart = await cartManager.getCartById(cid)
    if (!cart) {
        return res.status(404).json({ message: 'Cart not found' })
    }

    await cartManager.addCart(cid, pid, 1)
    res.status(200).json({ message: 'Producto agregado al carrito' })
})

module.exports = router