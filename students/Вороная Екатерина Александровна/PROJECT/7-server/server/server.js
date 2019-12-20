const express = require ('express') //for npm mods
// const mod = require ('./mod') //for custom mods

const fs = require ('fs') //file system (docs NODE)

const app = express ()

app.use (express.json ())

app.use ('/', express.static ('public')) //localhost:3030/

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
app.listen (3030, () => {
    console.log ('Server listening at port 3030...')
})