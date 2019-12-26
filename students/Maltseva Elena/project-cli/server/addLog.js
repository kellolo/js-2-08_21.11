const fs = require ('fs')

function addLog (act, prod) {
    fs.readFile ('./data/stats.json', 'utf-8', (err, data) => {
        if (err) {
            console.log(err)
        } else {
            const actLog = JSON.parse(data)
            actLog.push({
                action: act,
                product_name: prod,
                time: new Date()
            })
            fs.writeFile ('./data/stats.json', JSON.stringify(actLog, null, 2), (err) => {
                if (err) {
                    actLog.push(`${err}`)
                }
            })
        }
    })
}

module.exports = addLog