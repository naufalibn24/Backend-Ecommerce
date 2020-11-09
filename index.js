const express = require('express')
const app = express()
const port = 3000
const mongooseconfig = require('./config/mongoose')
const cors = require('cors')
const approuter = require('./router/routes')
const bodyParser = require("body-parser");


mongooseconfig()
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors())
app.use(approuter)


app.listen(port, () => {
    console.log(`listen on http://localhost:${port}`)
})