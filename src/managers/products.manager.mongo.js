const mongoose = require("mongoose")
const { v4: uuidv4 } = require("uuid")

const productSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    code: { type: String, required: true, unique: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    category: { type: [String], required: true },
    status: { type: Boolean, default: true },
    id: { type: String, default: uuidv4 } // Generar ID único
})

const Product = mongoose.model("Product", productSchema)

class ProductsManagerMongo {
    async getProducts() {
        return await Product.find({})
    }

    async getProduct(id) {
        return await Product.findOne({ id })
    }

    async addProduct(newProduct) {
        const product = new Product(newProduct)
        await product.save()
        return product
    }

    async updateProduct(id, updateData) {
        return await Product.findOneAndUpdate({ id }, updateData, { new: true })
    }

    async deleteProduct(id) {
        return await Product.findOneAndDelete({ id })
    }
}

module.exports = ProductsManagerMongo
