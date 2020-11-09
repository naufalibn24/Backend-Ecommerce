const express = require('express')
const approuter = express.Router()
const Catcontroller = require('../controllers/Categorycontroller')

approuter.get('/categories', Catcontroller.findcategory)
approuter.post('/category', Catcontroller.postcategory)
approuter.get('/categories/:categoryId', Catcontroller.showpicture)


module.exports = approuter