const fs = require('fs')
const cart = require('./cartCore')

function handler(req, res, filename) {
    fs.readFile(filename, 'utf-8', (err, data) => {
        if (err) {
            res.status(404).json({result: 0})
        } else {

            data = JSON.parse(data)
            let newCart = cart[req.method](req, data)

            fs.writeFile(filename, JSON.stringify(newCart, null, 2), (err) => {
                if (err) {
                    res.status(500).json({result: 0})
                } else {
                    res.json({result: 1})
                }
            })
        }
    })
}

module.exports = handler