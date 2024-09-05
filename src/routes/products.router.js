const { Router } = require("express")
const ProductsManagerFs = require("../managers/FileSystem/products.manager.js")
const router = Router()
const productsManagerFs = new ProductsManagerFs()

// GET que trae todos los productos con paginación, filtros, y ordenamiento
router.get("/", async (req, res) => {
    try {
        const { limit = 10, page = 1, sort, query } = req.query

        // Convertir limit y page a enteros
        const limitInt = parseInt(limit)
        const pageInt = parseInt(page)

        // Obtener todos los productos
        let products = await productsManagerFs.getProducts()
        console.log(products)

        // Filtrar por query si es necesario
        if (query) {
            products = products.filter(product => product.type === query)
        }

        // Ordenar por precio si sort está definido
        if (sort) {
            products.sort((a, b) => {
                if (sort === 'asc') return a.price - b.price
                if (sort === 'desc') return b.price - a.price
                return 0
            })
        }

        // Implementar paginación
        const totalProducts = products.length
        const totalPages = Math.ceil(totalProducts / limitInt)
        const paginatedProducts = products.slice((pageInt - 1) * limitInt, pageInt * limitInt)

        // Crear links para la navegación entre páginas
        const hasPrevPage = pageInt > 1
        const hasNextPage = pageInt < totalPages
        const prevPage = hasPrevPage ? pageInt - 1 : null
        const nextPage = hasNextPage ? pageInt + 1 : null
        const prevLink = hasPrevPage ? `?limit=${limitInt}&page=${prevPage}&sort=${sort}&query=${query}` : null
        const nextLink = hasNextPage ? `?limit=${limitInt}&page=${nextPage}&sort=${sort}&query=${query}` : null

        // Devolver el resultado en el formato solicitado
        res.send({
            status: 'success',
            payload: paginatedProducts,
            totalPages: totalPages,
            prevPage: prevPage,
            nextPage: nextPage,
            page: pageInt,
            hasPrevPage: hasPrevPage,
            hasNextPage: hasNextPage,
            prevLink: prevLink,
            nextLink: nextLink
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({ status: "error", error: "Error al obtener los productos" })
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

// POST que crea un producto 
router.post("/", async (req, res) => {
    await productsManagerFs.addProduct(req.body)
    req.app.get("socketio").emit("newProduct") 
    res.status(201).send("Producto creado")
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