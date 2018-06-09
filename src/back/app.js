const express = require('express')
const bodyParser = require("body-parser")
const cors = require("cors")
const app = express()

require('./config/routes.js')(app)

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
})