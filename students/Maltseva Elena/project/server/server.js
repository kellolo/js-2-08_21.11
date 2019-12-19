const express = require ('express')
const bodyParser = require ('body-parser')
const fs = require ('fs')
const shop = express ()

shop.use (express.json())
shop.use (bodyParser.json())

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

shop.post ('/add-to-cart', (req, res) => {
    fs.readFile ('server/data/cart.json', 'utf-8', (err, data) => {
        if (err) {
            res.sendStatus (404, JSON.stringify ({result: 0}))
        } else {
            const cart = JSON.parse(data)
            const item = req.body
            let find = cart.find (element => element.id_product === item.id_product)
                        if (!find) {
                            cart.push (Object.assign({}, item, {quantity: 1}))
                        }  else {
                            find.quantity++
                        }
            fs.writeFile ('server/data/cart.json', JSON.stringify(cart), (err) => {
                if (err) {
                    alert ("В процессе добавления товара возникла ошибка, попробуйте еще раз.") 
                }
            })
            addLog('add product', item.product_name)
            res.send (cart)
        }
    })
})

shop.post ('/delete-from-cart', (req, res) => {
    fs.readFile ('server/data/cart.json', 'utf-8', (err, data) => {
        if (err) {
            res.sendStatus (404, JSON.stringify ({result: 0}))
        } else {
            const cart = JSON.parse(data)
            const item = req.body
            let find = cart.find (element => element.id_product === item.id_product);
                        if (find.quantity > 1) {
                            find.quantity--;
                        } else {
                            cart.splice(cart.indexOf(find), 1);
                        }
            fs.writeFile ('server/data/cart.json', JSON.stringify(cart), (err) => {
                if (err) {
                    alert ("В процессе удаления товара возникла ошибка, попробуйте еще раз.") 
                }
            })
            addLog('remove product', item.product_name)
            res.send (cart)
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
            fs.writeFile ('server/data/stats.json', JSON.stringify(actLog), (err) => {
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