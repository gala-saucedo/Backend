const { Router } = require('express')
const router = Router()
const CartManager = require('../managers/cartManager');
const cartManager = new CartManager();

router.post('/', (req, res) => {
    const newCart = {
        id: Math.floor(Math.random() * 1000), // Genera un ID único
        products: req.body.products || [] // Array de objetos con los productos
    }

    cartManager.addCart(newCart);
    res.status(201).json(newCart);
});

router.get('/:cid', (req, res) => {
    const cid = parseInt(req.params.cid);
    const cart = cartManager.getCartById(cid);
    if (!cart) {
        return res.status(404).json({ message: 'Cart not found' });
    }

    res.status(200).json(cart.products);
});

router.post('/:cid/product/:pid', (req, res) => {
    const cid = parseInt(req.params.cid);
    const pid = parseInt(req.params.pid);
    const cart = cartManager.getCartById(cid);
    if (!cart) {
        return res.status(404).json({ message: 'Cart not found' });
    }

    const existingProduct = cart.products.find(product => product.pid === pid);

    if (existingProduct) {
        // Si el producto ya existe en el carrito, incrementar la cantidad
        existingProduct.quantity++;
    } else {
        // Si el producto no existe en el carrito, agregarlo con cantidad 1
        cart.products.push({ pid, quantity: 1 });
    }

    res.status(200).json({ message: 'Product added to cart' });
});

module.exports = router
