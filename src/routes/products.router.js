const { Router } = require('express')
const router = Router()
const ProductManager = require('../managers/productManager')
const productManager = new ProductManager()

// GET /api/products
router.get('/', (req, res) => {
    const products = productManager.getAllProducts()
    res.status(200).json(products)
})

// GET /api/products/:productId
router.get('/:productId', (req, res) => {
    const productId = parseInt(req.params.productId)
    const product = productManager.getProductById(productId)
    if (product) {
        res.status(200).json(product)
    } else {
        res.status(404).json({ message: 'Product not found' })
    }
})

// PUT /api/products/:productId
router.put('/:productId', (req, res) => {
    const productId = parseInt(req.params.productId)
    const updatedProduct = req.body
    const success = productManager.updateProduct(productId, updatedProduct)
    if (success) {
        res.status(200).json({ message: 'Product updated' })
    } else {
        res.status(404).json({ message: 'Product not found' })
    }
})

// DELETE /api/products/:productId
router.delete('/:productId', (req, res) => {
    const productId = parseInt(req.params.productId)
    const success = productManager.deleteProduct(productId)
    if (success) {
        res.status(200).json({ message: 'Product deleted' })
    } else {
        res.status(404).json({ message: 'Product not found' })
    }
})

module.exports = router
