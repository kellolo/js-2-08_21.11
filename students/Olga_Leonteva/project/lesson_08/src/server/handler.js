const fs = require ('fs')
const cart = require ('./cartCore')
const stat = require ('./stat')


function handler (req, res, file, action) {
    fs.readFile (file, 'utf-8', (err, data) => {
        if (err) {
            res.sendStatus (404, JSON.stringify ({result: 0}))
        } else {
            data = JSON.parse(data)
                let {newCart, name} = cart[action] (req, data)


            fs.writeFile (file, newCart, (err) => {
                if (!err) {
                    res.send (JSON.stringify({result: 1}))
                    stat (action, name)
                } else {
                    res.sendStatus (500, JSON.stringify({result: 0}))
                }
            })
            
        }
    })
}

module.exports = handler