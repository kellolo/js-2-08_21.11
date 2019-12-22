const fs = require('fs')

function handler(req, res, file, object, action) {
    fs.readFile(file, 'utf-8', (err, data) => {
        if (err) {
            res.sendStatus(404, JSON.stringify({
                result: 0
            }))
        } else {
            data = JSON.parse(data)
            let newCart = object[action](req, data)
            if (action === "get") res.send(JSON.stringify(newCart))
            else {
                fs.writeFile(file, JSON.stringify(newCart), (err) => {
                    if (!err) {
                        res.send(JSON.stringify(newCart))
                    } else {
                        res.sendStatus(500, JSON.stringify({
                            result: 0
                        }))
                    }
                })
            }
        }
    })
}

module.exports = handler