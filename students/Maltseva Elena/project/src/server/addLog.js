const fs = require ('fs')

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

module.exports = addLog