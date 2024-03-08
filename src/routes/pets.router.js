const { Router } = require('express');
const router = Router();
const Product = require('./product.js'); // Importa el objeto Product
const uploader = require('../middlewares/uploadFile');

const products = []; // Lista de productos

router.get('/', (req, res) => {
    res.status(200).json(products);
});

router.post('/', uploader.single('image'), (req, res) => {
    const newProduct = {
        id: Math.floor(Math.random() * 1000), // Genera un ID único
        title: req.body.title,
        description: req.body.description,
        code: req.body.code,
        price: req.body.price,
        status: req.body.status === undefined ? true : req.body.status,
        stock: req.body.stock,
        category: req.body.category,
        thumbnails: req.body.thumbnails || [] // Array de strings con las rutas de las imágenes
    }

    products.push(newProduct)
    res.status(201).json(newProduct)
})

router.put('/:pid', (req, res) => {
    const pid = parseInt(req.params.pid)
    const index = products.findIndex(product => product.id === pid)
    if (index === -1) {
        return res.status(404).json({ message: 'Product not found' })
    }

    const updatedProduct = {
        id: pid,
        title: req.body.title || products[index].title,
        description: req.body.description || products[index].description,
        code: req.body.code || products[index].code,
        price: req.body.price || products[index].price,
        status: req.body.status || products[index].status,
        stock: req.body.stock || products[index].stock,
        category: req.body.category || products[index].category,
        thumbnails: req.body.thumbnails || products[index].thumbnails
    }

    products[index] = updatedProduct
    res.status(200).json(updatedProduct)
})

router.delete('/:pid', (req, res) => {
    const pid = parseInt(req.params.pid)
    const index = products.findIndex(product => product.id === pid)
    if (index === -1) {
        return res.status(404).json({ message: 'Product not found' })
    }

    products.splice(index, 1)
    res.status(200).json({ message: 'Product deleted' })
})

module.exports = router
