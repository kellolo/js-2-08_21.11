const fs = require ('fs')
const moment = require ('moment')

function addLog (act, prod) {
    fs.readFile ('server/data/stats.json', 'utf-8', (err, data) => {
        if (err) {
            console.log(err)
        } else {
            const actLog = JSON.parse(data)
            actLog.push({
                action: act,
                product_name: prod,
                time: moment().format('DD-MM-YYYY, hh:mm:ss')
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