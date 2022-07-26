require('dotenv').config();
const express = require('express')
const logger = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors');

const main = require('./routes/index')

const app = express()

app.use(cors())
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/', main)

let PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log("Server listening on",PORT);
})

module.exports = app;
