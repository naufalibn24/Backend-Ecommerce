const express = require('express')
const app = express()
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
app.get('/', (req, res) => {
    res.send('alhamdulillah wasukurillaah');
})

var server = app.listen(process.env.PORT || 3000, function () {
    var port = server.address().port;
    console.log("Express is working on port " + port);
});