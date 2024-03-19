const { Router } = require('express')
const router = Router()
const ProductManager = require('../managers/productManager')
const productManager = new ProductManager()

router.get('/', async (req, res) => {
    const products = await productManager.getAllProducts()
    res.status(200).json(products)
})

router.get('/:productId', async (req, res) => {
    const productId = parseInt(req.params.productId)
    const product = await productManager.getProductById(productId)
    if (product) {
        res.status(200).json(product)
    } else {
        res.status(404).json({ message: 'Product not found' })
    }
})

router.put('/:productId', async (req, res) => {
    const productId = parseInt(req.params.productId)
    const updatedProduct = req.body
    const success = await productManager.updateProduct(productId, updatedProduct)
    if (success) {
        res.status(200).json({ message: 'Product updated' })
    } else {
        res.status(404).json({ message: 'Product not found' })
    }
})

router.delete('/:productId', async (req, res) => {
    const productId = parseInt(req.params.productId)
    const deletedProduct = await productManager.getProductById(productId)
    const success = await productManager.deleteProduct(productId)
    if (success) {
        res.status(200).json({ message: 'Product deleted' })
        io.emit('deleteProduct', deletedProduct); // Emitir evento de WebSocket al eliminar un producto
    } else {
        res.status(404).json({ message: 'Product not found' })
    }
})

module.exports = router
