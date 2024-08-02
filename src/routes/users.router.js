const { Router } = require("express")

const router = Router()

function auth(req, res, next) {
    if(!req.user){
       return res.send("No puede avanzar")
    }
}

const users = []

router.get("/", auth,(req, res) => {

    res.send({data: users})
})

router.post("/", (req, res) => {
    const { body } = req
    if(!body.email || !body.password ) {
        return res.status(400).send({status: "error", error: "falta data" })
    }
    users.push({ id: users.length + 1, ...body })
    res.status(200).send({data:users})
})

router.put("/", (req, res) =>{
    res.send("put hola mundo")
})

router.delete("/:uid", (req, res) => { 
    const { uid } = req.params
    const nuevaLista = users.filter(user => user.id === Number(uid))
    res.send(nuevaLista)
})

module.exports = router