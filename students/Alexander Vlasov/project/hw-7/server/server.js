const port = 4200

const express = require('express')
const fs = require('fs')
const server = express()

const ResOk = {
    result: 1
}
const ResErr = {
    result: 0
}


function logger(req, res, next) {
    fs.readFile('server/stats.json', 'utf-8', (err, data) => {
        if (err) {
            res.status(404).send(JSON.stringify(ResErr))
        } else {
            let json = JSON.parse(data)
            json.push({
                method: req.method,
                product_name: req.body.product_name,
                dateTime: (new Date()).toISOString()
            })
            fs.writeFile('server/stats.json', JSON.stringify(json), (err) => {
                if (err) {
                    res.status(404).send(JSON.stringify(ResErr))
                } else {
                    next()
                }
            })
        }
    })
}

server.use(express.json())
server.use('/', express.static('public'))

server.route('/catalog')
    .get((req, res) => {
        fs.readFile('server/db/catalog.json', 'utf-8', (err, data) => {
            if (err) {
                res.status(404).send(JSON.stringify(ResErr))
            } else {
                res.send(data)
            }
        })
    })

server.route('/cart')
    .all(logger)
    .get((req, res) => {
        fs.readFile('server/db/userCart.json', 'utf-8', (err, data) => {
            if (err) {
                res.status(404).send(JSON.stringify(ResErr))
            } else {
                res.send(data)
            }
        })
    })
    .put((req, res) => {
        res.send(ResOk)
    })
    .delete((req, res) => {
        res.send(ResOk)
    })

server.listen(port, () => {
    console.log(`Server start at http://localhost:${port}`)
})