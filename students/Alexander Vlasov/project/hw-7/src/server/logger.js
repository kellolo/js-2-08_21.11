const fs = require('fs')
const logInfo = require('./logCore')

function logger(req, filename) {
    fs.readFile(filename, 'utf-8', (err, data) => {
        if (err) {
            console.log(`Read log Error.`)
        } else {
            data = JSON.parse(data)
            let event = {
                method: req.method,
                id_product: logInfo[req.method](req),
                dateTime: (new Date()).toISOString()
            }
            data.push(event)
            
            fs.writeFile(filename, JSON.stringify(data, null, 2), (err) => {
                if (err) {
                    console.log(`Write log Error. Product: ${event.id_product}, Method: ${event.method}`)
                }
            })
        }
    })
}

module.exports = logger