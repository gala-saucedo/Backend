const express = require("express")
const userRouter = require("./routes/users.router.js")
const productRouter = require("./routes/products.router.js")
const cartRouter = require("./routes/carts.router.js")
const pruebaRouter = require("./routes/pruebas.router.js")
const viewsRouter = require("./routes/views.router.js")
const { create } = require("express-handlebars")
const path = require("path")

const { Server } = require("socket.io")

const app = express()
const PORT = 8080

const logger = require("morgan")
const { uploader } = require("./utils/multer.js")

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use("/static", express.static(__dirname + "/public"))
app.use(logger("dev"))

// Configuración de Handlebars
const hbs = create({
    layoutsDir: path.join(__dirname, "views", "layouts"),
    defaultLayout: "main",
})

app.engine("handlebars", hbs.engine)
app.set("views", path.join(__dirname, "/views"))
app.set("view engine", "handlebars")

// rutas para usuarios, productos y carritos
app.use("/api/users", userRouter)
app.use("/api/products", productRouter)
app.use("/api/carts", cartRouter)
// prueba
app.use("/pruebas", pruebaRouter)
app.use("/", viewsRouter)

app.use((error, req, res, next) => {
    console.log(error.stack)
    res.status(500).send("Error de server")
})

// Inicia el servidor HTTP
const httpServer = app.listen(PORT, () => {
    console.log("Escuchando en el puerto:", PORT)
})

const io = new Server(httpServer)

// WebSocket: emitir productos cada vez que se actualicen
io.on("connection", (socket) => {
    console.log("Nuevo cliente conectado")

    // Escuchar cuando se cree un nuevo producto
    socket.on("newProduct", async () => {
        const products = await productsManagerFs.getProducts() // Obtiene los productos
        io.emit("updateProducts", products) // Envía los productos actualizados a todos los clientes
    })

    // Escuchar cuando se elimine un producto
    socket.on("deleteProduct", async () => {
        const products = await productsManagerFs.getProducts()
        io.emit("updateProducts", products) // Envía los productos actualizados a todos los clientes
    })

    // Manejo de desconexión
    socket.on("disconnect", () => {
        console.log("Cliente desconectado")
    })
})
