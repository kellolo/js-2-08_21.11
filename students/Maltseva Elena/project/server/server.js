const express = require ('express')
const fs = require ('fs')
const shop = express ()

shop.use (express.json())

shop.use ('/', express.static('public'))

shop.get ('/catalog', (req, res) => {
    fs.readFile ('server/data/catalog.json', 'utf-8', (err, data) => {
        if (err) {
            res.sendStatus (404, JSON.stringify ({result: 0}))
        } else {
            res.send (data)
        }
    })
})

shop.get ('/cart', (req, res) => {
    fs.readFile ('server/data/cart.json', 'utf-8', (err, data) => {
        if (err) {
            res.sendStatus (404, JSON.stringify ({result: 0}))
        } else {
            res.send (data)
        }
    })
})

shop.post ('/cart', (req, res) => {
    fs.readFile ('server/data/cart.json', 'utf-8', (err, data) => {
        if (err) {
            res.sendStatus (404, JSON.stringify ({result: 0}))
        } else {
            const cart = JSON.parse(data)
            cart.contents.push (Object.assign({}, req.body, {quantity: 1}))
            fs.writeFile ('server/data/cart.json', JSON.stringify(cart, null, 2), (err) => {
                if (err) {
                    res.sendStatus (500, JSON.stringify ({result: 0}))
                } else {
                    res.send (cart)
                }
            })
            addLog('add product', req.body.product_name)
        }
    })
})

shop.put ('/cart/:id', (req, res) => {
    fs.readFile ('server/data/cart.json', 'utf-8', (err, data) => {
        if (err) {
            res.sendStatus (404, JSON.stringify ({result: 0}))
        } else {
            const cart = JSON.parse(data)
            let find = cart.contents.find (element => element.id_product === +req.params.id);
            find.quantity += req.body.act
            fs.writeFile ('server/data/cart.json', JSON.stringify(cart, null, 2), (err) => {
                    if (err) {
                        res.sendStatus (500, JSON.stringify ({result: 0}))
                    } else {
                        res.send (cart)
                    }
                })
                addLog(`change quantity of product: ${req.body.act}`, find.product_name)
            }
    })
})

shop.delete ('/cart/:id', (req, res) => {
    fs.readFile ('server/data/cart.json', 'utf-8', (err, data) => {
        if (err) {
            res.sendStatus (404, JSON.stringify ({result: 0}))
        } else {
            const cart = JSON.parse(data)
            let find = cart.contents.find (element => element.id_product === +req.params.id);
            cart.contents.splice(cart.contents.indexOf(find), 1)      
            fs.writeFile ('server/data/cart.json', JSON.stringify(cart, null, 2), (err) => {
                    if (err) {
                        res.sendStatus (500, JSON.stringify ({result: 0}))
                    } else {
                        res.send (cart)
                    }
                })
                addLog('remove product', find.product_name)
            }
    })
})

function addLog (act, prod) {
    fs.readFile ('server/data/stats.json', 'utf-8', (err, data) => {
        if (err) {
            res.sendStatus (404, JSON.stringify ({result: 0}))
        } else {
            const actLog = JSON.parse(data)
            actLog.push({
                action: act,
                product_name: prod,
                time: new Date()
            })
            fs.writeFile ('server/data/stats.json', JSON.stringify(actLog, null, 2), (err) => {
                if (err) {
                    actLog.push(`${err}`)
                }
            })
        }
    })
}


shop.listen (3030, () => {
    console.log ('Server listen at port 3030...')
})