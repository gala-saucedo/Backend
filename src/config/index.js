const { connect } = require ("mongoose")

module.exports.connectDB = async () => {
    console.log("base de datos conectada")
    return await connect("mongodb+srv://galasaucedo0:coder.0ponfo@coder0.kooaz.mongodb.net/coder?retryWrites=true&w=majority&appName=coder0")
}