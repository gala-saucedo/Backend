const { Router } = require("express")
const ProductsManagerFs = require("../managers/FileSystem/products.manager.js")

const router = Router()
const productsManagerFs = new ProductsManagerFs()

// GET que trae todos los productos
router.get("/", async (req, res) =>{
    try {
        const productsDb = await productsManagerFs.getProducts()
        res.send({status: "success", data: productsDb})
    } catch (error) {       
        console.log(error)
        res.status(500).send({ status: "error", error: "Error al obtener los productos"})
    }
})

// GET que trae un producto por id
router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params
        const product = await productsManagerFs.getProduct(parseInt(id))
        if (!product) {
            return res.status(404).send({ status: "error", error: "Producto no encontrado" })
        }
        res.send({ status: "success", data: product })
    } catch (error) {
        console.log(error)
        res.status(500).send({ status: "error", error: "Error al obtener el producto" })
    }
})

// POST que crea un nuevo producto
router.post("/", async(req, res) =>{
    try {
        const { body } = req
        const response = await productsManagerFs.createProducts(body)
        res.send({status: "success", data: response})
    } catch (error) {
        console.log(error)
        res.status(500).send({ status: "error", error: "Error al crear el producto"})
    }
})

// PUT que actualiza un producto
router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params
        const response = await productsManagerFs.updateProducts(parseInt(id), req.body)
        if (!response) {
            return res.status(404).send({ status: "error", error: "Producto no encontrado" })
        }
        res.send({ status: "success", data: response })
    } catch (error) {
        console.log(error)
        res.status(500).send({ status: "error", error: "Error al actualizar el producto" })
    }
});

// DELETE que elimina un producto
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params
        const response = await productsManagerFs.deleteProducts(parseInt(id))
        res.send({ status: "success", data: response })
    } catch (error) {
        console.log(error)
        res.status(500).send({ status: "error", error: "Error al eliminar el producto" })
    }
})

module.exports = router