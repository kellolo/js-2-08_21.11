const express = require ('express') //for npm mods
// const mod = require ('./mod') //for custom mods
const parser = require("body-parser");
const urlencodedParser = parser.urlencoded({extended: false});

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

app.post ('/addToCart', urlencodedParser, (req, res) => {
    if (!req.body) res.sendStatus (500, JSON.stringify ({result: 0}))
    else {
        fs.readFile ('server/db/userCart.json', 'utf-8', (err, data) => {
            if (err) {
                res.sendStatus (404, JSON.stringify ({result: 0}))
            } else {
                let jsData = JSON.parse(data)

                const findElement = jsData.contents.find(el => el.id_product == +req.body.id_product)

                if (findElement) findElement.quantity ++
                else jsData.contents.push( { 
                    "id_product": +req.body.id_product, 
                    "product_name": req.body.product_name,
                    "price": +req.body.price,
                    "quantity": 1
                } )
                
                fs.writeFile ('server/db/userCart.json', JSON.stringify (jsData), (err) => {
                    if (err) res.sendStatus (404, JSON.stringify ({result: 0}))
                    else res.sendStatus (200, JSON.stringify ({result: 1}))
                })
            }
        })
    }
})

app.post ('/deleteFromCart', urlencodedParser, (req, res) => {
    if (!req.body) res.sendStatus (500, JSON.stringify ({result: 0}))
    else {
        fs.readFile ('server/db/userCart.json', 'utf-8', (err, data) => {
            if (err) {
                res.sendStatus (404, JSON.stringify ({result: 0}))
            } else {
                let jsData = JSON.parse(data)

                const findElement = jsData.contents.find(el => el.id_product == +req.body.id_product)

                if (findElement) {
                    if (findElement.quantity > 1) findElement.quantity --
                    else jsData.contents = jsData.contents.filter(el => el.id_product != +req.body.id_product)
                }
                
                fs.writeFile ('server/db/userCart.json', JSON.stringify (jsData), (err) => {
                    if (err) res.sendStatus (404, JSON.stringify ({result: 0}))
                    else res.sendStatus (200, JSON.stringify ({result: 1}))
                })
            }
        })
    }
})

//post, put, delete

app.listen (3030, () => {
    console.log ('Server listening at port 3030...')
})
