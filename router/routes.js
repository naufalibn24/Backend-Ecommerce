const express = require('express')
const approuter = express.Router()
const UserRoute = require('./user')
const CatRoute = require('./category')
const prodRoute = require('./product')
const cartRoute = require('./cart')
const errorhandler = require('../Middleware/errorhandler')


approuter.use("/", UserRoute, CatRoute, prodRoute, cartRoute)

approuter.use(errorhandler)


module.exports = approuter