const { Router } = require("express")
const ProductsManagerFs = require("../managers/FileSystem/products.manager.js")

const router = Router()
const productsManagerFs = new ProductsManagerFs()

// Ruta para la vista de home con todos los productos
router.get("/", async (req, res) => {
    try {
        const products = await productsManagerFs.getProducts()
        res.render("home", { 
            title: "Lista de Productos", 
            products // Enviamos los productos a la vista
        })
    } catch (error) {
        res.status(500).send("Error al obtener los productos")
    }
})

// Ruta para la vista de productos en tiempo real
router.get("/realTimeProducts", async (req, res) => {
    try {
        const products = await productsManagerFs.getProducts()
        res.render("realTimeProducts", { 
            title: "Productos en Tiempo Real", 
            products
        })
    } catch (error) {
        res.status(500).send("Error al obtener los productos")
    }
})

module.exports = router
