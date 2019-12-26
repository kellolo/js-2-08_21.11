const express = require("express");

const fs = require('fs')

const catalog = require('./catalogCore')

const cart = require('./cartCore')

const handler = require('./handler')

const app = express()

app.use(express.json())
app.use('/', express.static('public')) // localhost:3000
//----------------------------------------------------------------------
app.get('/catalog', (req, res) => {
    handler(req, res, 'server/data/catalog.json', catalog, "get")
})

app.get('/cart', (req, res) => {
    handler(req, res, 'server/data/cart.json', cart, 'get')
})

app.post('/cart', (req, res) => {
    handler(req, res, 'server/data/cart.json', cart, 'add')
})

app.put('/cart/:id', (req, res) => {
    handler(req, res, 'server/data/cart.json', cart, 'change')
})

app.delete('/cart/:id', (req, res) => {
    handler(req, res, 'server/data/cart.json', cart, 'del')
})

app.listen(3000, () => {
    console.log('server listening at port 3000...')
})