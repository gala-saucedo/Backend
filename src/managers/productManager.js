const fs = require('fs').promises

class ProductManager {
    constructor(filePath) {
        this.filePath = filePath
    }

    async addProduct(product) {
        const products = await this.getAllProducts()
        products.push(product)
        await this.saveProducts(products);
    }

    async getAllProducts() {
        try {
            const data = await fs.readFile(this.filePath, 'utf8')
            return JSON.parse(data)
        } catch (err) {
            return []
        }
    }

    async getProductById(productId) {
        const products = await this.getAllProducts()
        return products.find(product => product.id === productId)
    }

    async updateProduct(productId, updatedProduct) {
        const products = await this.getAllProducts()
        const index = products.findIndex(product => product.id === productId)
        if (index !== -1) {
            products[index] = { ...products[index], ...updatedProduct }
            await this.saveProducts(products)
            return true
        }
        return false
    }

    async deleteProduct(productId) {
        const products = await this.getAllProducts()
        const updatedProducts = products.filter(product => product.id !== productId)
        await this.saveProducts(updatedProducts)
    }

    async saveProducts(products) {
        await fs.writeFile(this.filePath, JSON.stringify(products, null, 2))
    }
}

module.exports = ProductManager