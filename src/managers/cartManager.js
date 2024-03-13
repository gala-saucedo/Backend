const fs = require('fs').promises

class CartManager {
    constructor(filePath) {
        this.filePath = filePath
    }

    async addCart(cart) {
        const carts = await this.getAllCarts()
        carts.push(cart)
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
