const express = require('express')
const bodyParser = require ('body-parser') //1
const fs = require('fs')


const app = express ()
app.use (express.json ())
app.use (bodyParser.json()) //2
app.use ('/', express.static ('public'))//localhost:3030/



app.get ('/Manarox', (req, res) => {
    fs.readFile ('server/db/cat.json', 'utf-8', (err, data) => {
        if (err) {
            res.sendStatus (404, JSON.stringify ({result: 0}))
        } else {
            res.send (data)
        }
    })
})

app.get ('/cartUrl', (req, res) => {
    fs.readFile ('server/db/getBasket.json', 'utf-8', (err, data) => {
        if (err) {
            res.sendStatus (404, JSON.stringify ({result: 0}))
        } else {
            res.send (data)
        }
    })
})

// app.post ('/add-to-cart', (req, res) => {
//     fs.readFile ('server/db/cart.json', 'utf-8', (err, data) => {
//         if (err) {
//             res.sendStatus (404, JSON.stringify ({result: 0}))
//         } else {
//             const cart = JSON.parse(data)
//             const item = req.body
//             let find = cart.find (element => element.id_product === item.id_product)
//                         if (!find) {
//                             cart.push (Object.assign({}, item, {quantity: 1}))
//                         }  else {
//                             find.quantity++
//                         }
//             fs.writeFile ('server/db/cart.json', JSON.stringify(cart), (err) => {
//                 if (err) {
//                     alert ("Возникла ошибка") 
//                 }
//             })
//             addLog('add product', item.product_name)
//             res.send (cart)
//         }
//     })
// })

app.get ('/addUrl', (req, res) => {
    fs.readFile ('server/db/addToBasket.json', 'utf-8', (err, data) => {
        if (err) {
            res.sendStatus (404, JSON.stringify ({result: 0}))
        } else {
            res.send (data)
        }
    })
})

// app.post ('/delete-from-cart', (req, res) => {
//     fs.readFile ('server/db/cart.json', 'utf-8', (err, data) => {
//         if (err) {
//             res.sendStatus (404, JSON.stringify ({result: 0}))
//         } else {
//             const cart = JSON.parse(data)
//             const item = req.body
//             let find = cart.find (element => element.id_product === item.id_product);
//                         if (find.quantity > 1) {
//                             find.quantity--;
//                         } else {
//                             cart.splice(cart.indexOf(find), 1);
//                         }
//             fs.writeFile ('server/db/cart.json', JSON.stringify(cart), (err) => {
//                 if (err) {
//                     alert ("Возникла ошибка") 
//                 }
//             })
//             addLog('remove product', item.product_name)
//             res.send (cart)
//         }
//     })
// })


app.get ('/delUrl', (req, res) => {
    fs.readFile ('server/db/deleteFromBasket.json', 'utf-8', (err, data) => {
        if (err) {
            res.sendStatus (404, JSON.stringify ({result: 0}))
        } else {
            res.send (data)
        }
    })
})

// function addLog (act, prod) {
//     fs.readFile ('server/db/stats.json', 'utf-8', (err, data) => {
//         if (err) {
//             res.sendStatus (404, JSON.stringify ({result: 0}))
//         } else {
//             const actLog = JSON.parse(data)
//             actLog.push({
//                 action: act,
//                 product_name: prod,
//                 time: new Date()
//             })
//             fs.writeFile ('server/db/stats.json', JSON.stringify(actLog), (err) => {
//                 if (err) {
//                     actLog.push(`${err}`)
//                 }
//             })
//         }
//     })
// }


app.listen (3030, () => {
    console.log ('Server listening at port 3030...')
})