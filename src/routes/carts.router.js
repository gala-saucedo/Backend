const { Router } = require("express")
const CartManagerFs = require("../managers/FileSystem/carts.manager.js")

const router = Router()
const cartManagerFs = new CartManagerFs()

// POST que crea un nuevo carrito
router.post("/", async (req, res) => {
    try {
        const newCart = await cartManagerFs.createCart()
        res.send({ status: "success", data: newCart })
    } catch (error) {
        console.log(error)
        res.status(500).send({ status: "error", error: "Error al crear el carrito" })
    }
})

// GET que trae un carrito por id
router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params
        const cart = await cartManagerFs.getCartById(parseInt(id))
        if (!cart) {
            return res.status(404).send({ status: "error", error: "Carrito no encontrado" })
        }
        res.send({ status: "success", data: cart })
    } catch (error) {
        console.log(error)
        res.status(500).send({ status: "error", error: "Error al obtener el carrito" })
    }
})

// POST que agrega un producto al carrito
router.post("/:id/product/:productId", async (req, res) => {
    try {
        const { id, productId } = req.params
        const cart = await cartManagerFs.createProductToCart(parseInt(id), parseInt(productId))
        if (!cart) {
            return res.status(404).send({ status: "error", error: "Carrito no encontrado" })
        }
        res.send({ status: "success", data: cart })
    } catch (error) {
        console.log(error)
        res.status(500).send({ status: "error", error: "Error al agregar el producto al carrito" })
    }
})

module.exports = router