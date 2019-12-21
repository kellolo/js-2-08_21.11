const path = require('path')

const conf = {
    port: 4200,
    host: 'http://localhost'
}
const db = {
    cart: path.resolve(__dirname, 'db/userCart.json'),
    catalog: path.resolve(__dirname, 'db/catalog.json'),
    log: path.resolve(__dirname, 'db/stats.json')
}

const express = require('express')
const fs = require('fs')
const logger = require('./logger')
const handler = require('./handler')

const server = express()

server.use(express.json())
console.log(path.resolve())
server.use('/', express.static(path.resolve('dist', 'public')))

server.route('/catalog')
    .get((req, res) => {
        fs.readFile(db.catalog, 'utf-8', (err, data) => {
            if (err) {
                res.status(404).json({result:0})
            } else {
                res.send(data)
            }
        })
    })

server.route('/cart')
    .get((req, res) => {
        fs.readFile(db.cart, 'utf-8', (err, data) => {
            if (err) {
                res.status(404).json({result:0})
            } else {
                res.send(data)
            }
        })
    })
    .post((req, res) => {
        logger(req, db.log)
        handler(req, res, db.cart)
    })
server.route('/cart/:id')
    .put((req, res) => {
        logger(req, db.log)
        handler(req, res, db.cart)
    })
    .delete((req, res) => {
        logger(req, db.log)
        handler(req, res, db.cart)
    })

server.listen(conf.port, () => {
    console.log(`Server start at ${conf.host}:${conf.port}`)
})