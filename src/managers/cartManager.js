class CartManager {
    constructor() {
        this.carts = [];
    }

    addCart(cart) {
        this.carts.push(cart);
    }

    getCartById(cartId) {
        return this.carts.find(cart => cart.id === cartId);
    }
}

module.exports = CartManager;