const { Router } = require("express")
const { userModel } = require("../models/users.model")

const router = Router()

function auth(req, res, next) {
    if(!req.user){
       return res.send("No puede avanzar")
    }
}

const users = []

router.get("/", async (req, res) => {
    const users = await userModel.find().explain("executionsStats")
    console.log(users)

    res.send({ status: "success", payload: users})
})

router.post("/", async (req, res) => {
    const { body } = req
    // if(!body.email || !body.password ) {
    if( !body.first_name || !body.email ) {
        return res.status(400).send({status: "error", error: "falta data" })
    }
    // users.push({ id: users.length + 1, ...body })
    const result = await userModel.create(body)

    res.status(200).send({data:result})
})

router.put("/:uid", async (req, res) =>{
    const { uid } = req.params

    let userToReplace = req.body
    if ( !userToReplace.first_name || !userToReplace ) {
        return res.status(400).send({status: "error", error: "falta data" })
    }
    const result = await userModel.updateOne({_id: uid}, userToReplace)
    req.send({status: "seccess", message: "usuario actualizado"})
})

router.delete("/:uid", async (req, res) => { 
    const { uid } = req.params
    const result = await userModel.deleteOne({ _id: uid })
    res.send({ status: "success", message: "usuario eliminado" })
})

module.exports = router