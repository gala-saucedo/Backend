const fs = require('fs').promises

class CartManager {
    constructor(filePath) {
        this.filePath = filePath
    }

    async addCart(cartId, productId, quantity) {

        if (typeof productId !== 'number' || productId <= 0) {
            throw new Error('productId debe ser un número entero positivo')
        }
    
        if (!Number.isInteger(quantity) || quantity <= 0) {
            throw new Error('quantity debe ser un número entero positivo')
        }
        const carts = await this.getAllCarts()
        const cartIndex = carts.findIndex(cart => cart.id === cartId)
        if (cartIndex === -1) {
            // Si el carrito no existe, se crea uno nuevo
            const newCart = {
                id: cartId,
                products: [{ productId, quantity }]
            }
            carts.push(newCart)
        } else {
            // Si el carrito ya existe, se agrega el producto al carrito existente
            const products = carts[cartIndex].products
            const productIndex = products.findIndex(product => product.productId === productId)
            if (productIndex !== -1) {
                // Si el producto ya existe en el carrito, se incrementa la cantidad
                products[productIndex].quantity += quantity
            } else {
                // Si el producto no existe en el carrito, se agrega con la cantidad especificada
                products.push({ productId, quantity })
            }
        }

        await this.saveCarts(carts)
    }

    async getAllCarts() {
        try {
            const data = await fs.readFile(this.filePath, 'utf8')
            return JSON.parse(data)
        } catch (err) {
            return []
        }
    }

    async getCartById(cartId) {
        const carts = await this.getAllCarts()
        return carts.find(cart => cart.id === cartId)
    }

    async updateCart(cartId, updatedCart) {
        const carts = await this.getAllCarts();
        const index = carts.findIndex(cart => cart.id === cartId)
        if (index !== -1) {
            carts[index] = { ...carts[index], ...updatedCart }
            await this.saveCarts(carts)
            return true
        }
        return false
    }

    async deleteCart(cartId) {
        const carts = await this.getAllCarts()
        const updatedCarts = carts.filter(cart => cart.id !== cartId)
        await this.saveCarts(updatedCarts)
    }

    async saveCarts(carts) {
        await fs.writeFile(this.filePath, JSON.stringify(carts, null, 2))
    }
}

module.exports = CartManager
