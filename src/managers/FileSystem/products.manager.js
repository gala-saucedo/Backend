const fs = require("fs")
const path = "./dbjson/productsDb.json"
const { v4: uuidv4 } = require("uuid")

class ProductsManagerFs {
    constructor () {
        this.path = path
    }

    readProducts = async () => {
        if(fs.existsSync(path)){
            const productsJson = await fs.promises.readFile(path, "utf-8")
            const productJs = JSON.parse(productsJson)
            return productJs
        }
        return[]
    }

    getProducts = async () => {
        const products = await this.readProducts()
        return products
    }

    getProduct = async (id) => {
        const products = await this.readProducts()
        const product = products.find(p => p.id === id)
        return product || null
    }

    createProducts = async (newProduct) => {
        try {
            const products = await this.readProducts()
            newProduct.id = uuidv4()  // General un unico ID 
            newProduct.status = true 

            //Validar campos obligatorios
            const requiredFields = ["title", "description", "code", "price", "stock", "category"]
            for (const field of requiredFields) {
                if (!newProduct[field]) {
                    throw new Error(`Falta este campo obligatorio: ${field}`)
                }
            }
            if (typeof newProduct.title !== 'string' ||
                typeof newProduct.description !== 'string' ||
                typeof newProduct.code !== 'string' ||
                typeof newProduct.price !== 'number' ||
                typeof newProduct.stock !== 'number' ||
                !Array.isArray(newProduct.category) ||
                !newProduct.category.every(item => typeof item === "string")) {
                throw new Error('Tipo de dato invalido')
            }

            products.push(newProduct)
            await fs.promises.writeFile(this.path, JSON.stringify(products, null, "\t"))
            return newProduct

        } catch (error) {
            console.log(error)
            throw new Error("Error al crear el producto")
        }
    }

    updateProducts = async (id, updateProduct) => {
        try {
            const products = await this.readProducts()
            const productIndex = products.findIndex(p => p.id === id)
            if (productIndex === -1){
                return null
            }
            const product = products[productIndex]
            products[productIndex] = {...product, ...updateProduct, id: product.id}
            await fs.promises.writeFile(path, JSON.stringify(products, null, "\t"))
            return products[productIndex]
        } catch (error) {
            console.log(error)
        }
    }
    deleteProducts = async (id) => {
        try {
            const products = await this.readProducts()
            const newProducts = products.filter(p => p.id !== id)
            await fs.promises.writeFile(path, JSON.stringify(newProducts, null, "\t"))
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = ProductsManagerFs