const express = require('express')
const approuter = express.Router()
const ProductController = require('../controllers/Productcontroller')

approuter.post('/products', ProductController.createProduct)
approuter.put('/products/:productId', ProductController.putproduct)
approuter.get('/products/:Id_category', ProductController.getproductbycategory)
approuter.get('/products', ProductController.productAll)
approuter.get('/product/:productId', ProductController.showPicture)
module.exports = approuter