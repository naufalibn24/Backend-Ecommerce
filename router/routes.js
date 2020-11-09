const express = require('express')
const approuter = express.Router()
const UserRoute = require('./user')
const CatRoute = require('./category')
const prodRoute = require('./product')
const cartRoute = require('./cart')
const errorhandler = require('../Middleware/errorhandler')


approuter.use("/", UserRoute)
approuter.use("/", CatRoute)
approuter.use("/", prodRoute)
approuter.use("/", cartRoute)

approuter.use(errorhandler)


module.exports = approuter