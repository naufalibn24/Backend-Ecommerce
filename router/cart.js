const express = require('express')
const approuter = express.Router()

const CartController = require('../controllers/cartcontroller')

approuter.post("/cart/:userId", CartController.addItemToCart)
approuter.post("/order/:id", CartController.Orderdetails)

module.exports = approuter