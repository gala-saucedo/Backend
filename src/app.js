const express = require('express')
const app = express()
const multer = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, `${__dirname}/../files`)
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname + '__test')
    }
})
const uploader = multer({ storage })

app.use(express.static(`${__dirname}/../public`))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

const products = []
let idCounter = 1

app.get('/api/products', (req, res) => {
    res.status(200).json(products)
})

app.post('/api/products', uploader.array('thumbnails', 5), (req, res) => {
    const newProduct = {
        id: idCounter++,
        title: req.body.title,
        description: req.body.description,
        code: req.body.code,
        price: req.body.price,
        status: req.body.status !== undefined ? req.body.status : true,
        stock: req.body.stock,
        category: req.body.category,
        thumbnails: req.files.map(file => file.filename)
    }

    products.push(newProduct)
    res.status(201).json(newProduct)
})

// Importa el enrutador de carritos
const cartRouter = require('./routes/cart.router')
// Agrega el enrutador de carritos como middleware
app.use('/api/carts', cartRouter)

app.listen(8080, () => {
    console.log('Servidor listo!')
})