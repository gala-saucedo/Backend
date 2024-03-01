const fs = require(`fs`)

const express = require(`express`)

const { ProductManager } = require('./index');

const app = express()

const manager = new ProductManager();

async function main() {

    // Cargar productos desde el archivo (si existe)
    await manager.loadProductsFromFile();

    // Agregar algunos productos
    await manager.addProduct(new Product("Laptop", "Una laptop potente", 1000, "laptop.jpg", "LT001", 10));
    await manager.addProduct(new Product("Teléfono", "Un teléfono inteligente", 500, "telefono.jpg", "TP001", 20));
    await manager.addProduct(new Product("Tablet", "Una tablet compacta", 300, "tablet.jpg", "TB001", 15));

    // Actualizar el precio del producto con ID 1
    const updatedProduct = await manager.updateProduct(1, { price: 1200 });
    if (updatedProduct) {
        console.log("Producto actualizado:", updatedProduct);
    } else {
        console.log("Producto no encontrado.");
    }
}

main().catch(error => {
    console.error("Error en la ejecución principal:", error);
});

app.get(`/saludo`, (req, res) => {
    res.end(`Hola mundo desdes express`)
})

app.listen(3000, () => {
    console.log(`servidor listo`)
})

app.get('/products', async (req, res) => {
    try {
        // Obtener el parámetro 'limit' de la query
        const limit = req.query.limit ? parseInt(req.query.limit) : null;

        // Obtener los productos del ProductManager
        const products = await manager.getProductsFromFile();

        // Limitar la cantidad de productos si se proporciona el parámetro 'limit'
        const limitedProducts = limit ? products.slice(0, limit) : products;

        // Devolver los productos como objeto JSON
        res.json(limitedProducts);
    } catch (error) {
        console.error("Error al obtener los productos:", error);
        res.status(500).json({ error: "Error al obtener los productos" });
    }
})

app.get('/products/:pid', async (req, res) => {
    try {
        // Obtener el parámetro 'pid' de los parámetros de la ruta
        const productId = parseInt(req.params.pid);

        // Obtener el producto del ProductManager
        const product = await manager.getProductById(productId);

        if (product) {
            // Devolver el producto como objeto JSON
            res.json(product);
        } else {
            res.status(404).json({ error: "Producto no encontrado" });
        }
    } catch (error) {
        console.error("Error al obtener el producto:", error);
        res.status(500).json({ error: "Error al obtener el producto" });
    }
});

