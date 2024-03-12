const { Router } = require('express');
const router = Router();
const ProductManager = require('../managers/productManager');
const productManager = new ProductManager();

router.post('/', (req, res) => {
    // Utilizamos el productManager para agregar un nuevo producto
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
    };

    productManager.addProduct(newProduct);
    res.status(201).json(newProduct);
});

