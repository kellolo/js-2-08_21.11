const express = require ('express')


const fs = require ('fs')

const app = express ()

const handler = require ('./handler')

app.use (express.json ())

app.use ('/', express.static ('public'))

app.get ('/catalog', (req, res) => {
    fs.readFile ('server/db/catalog.json', 'utf-8', (err, data) => {
        if (err) {
            res.sendStatus (404, JSON.stringify ({result: 0}))
        } else {
            res.send (data)
        }
    })
})

app.get ('/cart', (req, res) => {
    fs.readFile ('server/db/userCart.json', 'utf-8', (err, data) => {
        if (err) {
            res.sendStatus (404, JSON.stringify ({result: 0}))
        } else {
            res.send (data)
        }
    })
})

app.post ('/cart', (req, res) => {
    handler ( req, res, 'server/db/userCart.json', 'add' )
})

app.put ('/cart:id', (req, res) => {
    handler ( req, res, 'server/db/userCart.json', 'change' )
})

app.delete ('/cart:id', (req, res) => {
    handler ( req, res, 'server/db/userCart.json', 'del' )
})

app.listen (8080, () => {
    console.log ('Server listening at port 8080...')
})