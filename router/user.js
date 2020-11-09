const express = require('express')
const approuter = express.Router()
const UserController = require('../controllers/usercontroller')
const CartController = require('../controllers/cartcontroller')
const auth = require('../Middleware/auth')

approuter.post("/register", UserController.register)
approuter.post("/login", UserController.login)
approuter.get("/profile/:userId", auth, UserController.getUser)
approuter.post("/adress/:userId", auth, UserController.address)
approuter.put("/profile/:userId", auth, UserController.updateuser)



module.exports = approuter