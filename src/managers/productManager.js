class ProductManager {
    constructor() {
        this.products = [];
    }

    addProduct(product) {
        this.products.push(product);
    }

    getProductById(productId) {
        return this.products.find(product => product.id === productId);
    }
}

module.exports = ProductManager;

