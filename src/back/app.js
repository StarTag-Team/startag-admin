const express = require('express')
const bodyParser = require("body-parser")
const cors = require("cors")

const app = express()
require('./config/routes.js')(app)

app.use(bodyParser.json())
app.use(cors())

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
})