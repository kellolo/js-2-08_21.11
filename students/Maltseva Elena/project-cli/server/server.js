const express = require ('express')
const fs = require ('fs')
const shop = express ()
const handler = require ('./handler')

shop.use (express.json())

shop.get ('/catalog', (req, res) => {
    fs.readFile ('./data/catalog.json', 'utf-8', (err, data) => {
        if (err) {
            res.sendStatus (404, JSON.stringify ({result: 0}))
        } else {
            res.send (data)
        }
    })
})

shop.get ('/cart', (req, res) => {
    fs.readFile ('./data/cart.json', 'utf-8', (err, data) => {
        if (err) {
            res.sendStatus (404, JSON.stringify ({result: 0}))
        } else {
            res.send (data)
        }
    })
})

shop.post ('/cart', (req, res) => {
    handler(req, res, './data/cart.json', 'add')
})

shop.put ('/cart/:id', (req, res) => {
    handler(req, res, './data/cart.json', 'change')
})

shop.delete ('/cart/:id', (req, res) => {
    handler(req, res, './data/cart.json', 'remove')
})

shop.listen (3000, () => {
    console.log ('Server listen at port 3000...')
})