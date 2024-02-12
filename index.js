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

class ProductManager {
    constructor() {
        this.products = []
    }

    addProduct(product) {
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
        console.log("Producto agregado exitosamente.")
    }

    getProducts() {
        return this.products
    }

    getProductById(productId) {
        for (let product of this.products) {
            if (product.id === productId) {
                return product
            }
        }
        console.log("Producto no encontrado.")
    }
}

const manager = new ProductManager()

// Agregar algunos productos
manager.addProduct(new Product("Laptop", "Una laptop potente", 1000, "laptop.jpg", "LT001", 10))
manager.addProduct(new Product("Teléfono", "Un teléfono inteligente", 500, "telefono.jpg", "TP001", 20));
manager.addProduct(new Product("Tablet", "Una tablet compacta", 300, "tablet.jpg", "TB001", 15))

// Mostrar los productos
console.log("Productos:")
for (let product of manager.getProducts()) {
    console.log(`ID: ${product.id}, Título: ${product.title}, Descripción: ${product.description}, Precio: ${product.price}, Código: ${product.code}, Stock: ${product.stock}`)
}

// Buscar un producto por ID
console.log("\nBuscar producto por ID:")
const productId = 2
const foundProduct = manager.getProductById(productId)
if (foundProduct) {
    console.log(`Producto encontrado - Título: ${foundProduct.title}`)
}
