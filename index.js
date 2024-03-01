const { EventEmitter } = require('events');
const fs = require('fs').promises;

class Product {
    constructor(title, description, price, thumbnail, code, stock) {
        this.id = null
        this.title = title
        this.description = description
        this.price = price
        this.thumbnail = thumbnail
        this.code = code
        this.stock = stock
    }
}
async function main( ) {
class ProductManager extends EventEmitter {
    constructor() {
        super();
        this.products = []
    }

    async addProduct(product) {
        // Validar campos obligatorios
        if (!product.title || !product.description || !product.price || !product.thumbnail || !product.code || !product.stock) {
            console.log("Error: Todos los campos son obligatorios.")
            return
        }

        // Validar duplicados en el campo 'code'
        for (let existingProduct of this.products) {
            if (existingProduct.code === product.code) {
                console.log(`Error: El producto con código '${product.code}' ya existe.`)
                return
            }
        }

        // Generar ID automático
        product.id = this.products.length + 1

        this.products.push(product)
        this.emit('productAdded', product)
        console.log("Producto agregado exitosamente.")

        // Guardar productos en un archivo
        await this.saveProductsToFile();
    }

    async loadProductsFromFile() {
        try {
            const data = await fs.readFile('products.json', 'utf8');
            this.products = JSON.parse(data);
            console.log("Productos cargados desde el archivo 'products.json'.");
        } catch (error) {
            if (error.code === 'ENOENT') {
                console.log("El archivo 'products.json' no existe. Inicializando lista de productos vacía.");
                this.products = []; // Inicializar como un arreglo vacío si el archivo no existe
            } else {
                console.error("Error al cargar los productos:", error);
            }
        }
    }

    async saveProductsToFile() {
        try {
            await fs.writeFile('products.json', JSON.stringify(this.products, null, 2));
            console.log("Productos guardados en el archivo 'products.json'.");
        } catch (error) {
            console.error("Error al guardar los productos:", error);
        }
    }

    async getProductById(productId) {
        try {
            const data = await fs.readFile('products.json', 'utf8');
            const products = JSON.parse(data);
            const product = products.find(product => product.id === productId);
            if (product) {
                return product;
            } else {
                console.log("Producto no encontrado.");
                return null;
            }
        } catch (error) {
            console.error("Error al leer los productos:", error);
            return null
        }
    }

    async updateProduct(productId, updatedFields) {
        try {
            const data = await fs.readFile('products.json', 'utf8');
            if (!data.trim()) {
                console.log("El archivo 'products.json' está vacío. No se puede actualizar ningún producto.");
                return null;
            }
            const products = JSON.parse(data);
            const productIndex = products.findIndex(product => product.id === productId);
            if (productIndex !== -1) {
                const updatedProduct = { ...products[productIndex], ...updatedFields };
                products[productIndex] = updatedProduct;
                await fs.writeFile('products.json', JSON.stringify(products, null, 2));
                console.log(`Producto con ID ${productId} actualizado.`);
                return updatedProduct;
            } else {
                console.log("Producto no encontrado.");
                return null;
            }
        } catch (error) {
            console.error("Error al actualizar el producto:", error);
            return null;
        }
    }

    async deleteProduct(productId) {
        try {
            const data = await fs.readFile('products.json', 'utf8');
            const products = JSON.parse(data);
            const productIndex = products.findIndex(product => product.id === productId);
            if (productIndex !== -1) {
                products.splice(productIndex, 1);
                await fs.writeFile('products.json', JSON.stringify(products, null, 2));
                console.log(`Producto con ID ${productId} eliminado.`);
                return true;
            } else {
                console.log("Producto no encontrado.");
                return false;
            }
        } catch (error) {
            console.error("Error al eliminar el producto:", error);
            return false;
        }
    }

    async getProductsFromFile() {
        try {
            const data = await fs.readFile('products.json', 'utf8');
            const products = JSON.parse(data);
            return products;
        } catch (error) {
            console.error("Error al leer los productos:", error);
            return [];
        }
    }

    getProducts() {
        return this.products
    }
}

const manager = new ProductManager()

// Cargar productos desde el archivo (si existe)
manager.loadProductsFromFile();

// Agregar listener para el evento 'productAdded'
manager.on('productAdded', () => {
    console.log("Lista de productos actualizada:");
    for (let product of manager.getProducts()) {
        console.log(`ID: ${product.id}, Título: ${product.title}, Descripción: ${product.description}, Precio: ${product.price}, Código: ${product.code}, Stock: ${product.stock}`)
    }
});

// Agregar algunos productos
manager.addProduct(new Product("Laptop", "Una laptop potente", 1000, "laptop.jpg", "LT001", 10))
manager.addProduct(new Product("Teléfono", "Un teléfono inteligente", 500, "telefono.jpg", "TP001", 20));
manager.addProduct(new Product("Tablet", "Una tablet compacta", 300, "tablet.jpg", "TB001", 15))

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

const {ProductManager} = require (`./ProductManager`)
module.exports = {ProductManager}

