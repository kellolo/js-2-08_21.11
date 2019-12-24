const fs = require ('fs')
const cart = require ('./cartCore')

function handler (req, res, API, action) {
    fs.readFile (API, 'utf-8', (err, data) => {
        if (err) {
            res.sendStatus (404, JSON.stringify ({result: 0}))
        } else {
            data = JSON.parse(data)
            let newCart = cart[action] (req, data)
            fs.writeFile (API, JSON.stringify(newCart, null, 2), (err) => {
                if (err) {
                    res.sendStatus (500, JSON.stringify ({result: 0}))
                } else {
                    res.send (newCart)
                }
            })
        }
    })
}

module.exports = handler