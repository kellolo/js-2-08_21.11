const fs = require ('fs')
const cart = require ('./cartCore')

function handler (req, res, file, action) {
    fs.readFile (file, 'utf-8', (err, data) => {
        if (err) {
            res.sendStatus (404, JSON.stringify ({result: 0}))
        } else {
            data = JSON.parse (data)

            let newCart = cart[action] (req, data)

            fs.writeFile (file, JSON.stringify(newCart, null, 2), (err) => {
                if (!err) {
                    res.send (JSON.stringify ({result: 1}))
                } else {
                    res.sendStatus (500, JSON.stringify ({result: 0}))
                }
            })
            
        }
    })
}

module.exports = handler