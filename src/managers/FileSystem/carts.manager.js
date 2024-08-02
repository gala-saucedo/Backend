const fs = require("fs")
const path = "/dbjson/cartsDb.json"

class CartManagerFs{
    constructor(){
        this.path = this.path
    }
    readCart = async () => {
        try {
            if (fs.existsSync(this.path)) {
                const cartsJson = await fs.promises.readFile(this.path, "utf-8")
                return JSON.parse(cartsJson)
            }
            return []
        } catch (error) {
            console.log("Error", error)
            return []
        }
    }
    createCart = async () => {
        try {
            const carts = await this.readCart()
            const newCart = {
                id: carts.length ? carts[carts.length - 1].id + 1 : 1,
                products: []
            }
            carts.push(newCart)
            await fs.promises.writeFile(this.path, JSON.stringify(carts, null, 2))
            return newCart
        } catch (error) {
            console.log(error)
        }
    }
    getCartById = async (id) => {
        try {
            const carts = await this.readCart()
            const cart = carts.find(cart => cart.id === id)
            return cart || null
        } catch (error) {
            console.log(error)
        }
    }
    createProductToCart = async (cartId, productId) => {
        try {
            const carts = await this.readCart()
            const cartIndex = carts.findIndex(cart => cart.id === cartId)
            if (cartIndex === -1) {
                return null
            }
            const cart = carts[cartIndex]
            const productIndex = cart.products.findIndex(product => product.productId === productId)

            if (productIndex === -1) {
                cart.products.push({ productId, quantity: 1 })
            } else {
                cart.products[productIndex].quantity += 1
            }

            await fs.promises.writeFile(this.path, JSON.stringify(carts, null, 2))
            return cart
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = CartManagerFs
