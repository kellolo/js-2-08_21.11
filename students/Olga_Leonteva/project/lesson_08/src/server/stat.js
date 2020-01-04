const fs = require ('fs')
const moment = require ('moment')

const stat = (action, name) => {
    fs.readFile ('./server/db/logs.json', 'utf-8', (err, data) => {
        if (err) {
            console.log ('Can not read logs...')
        } else {
            let d = JSON.parse (data)
            let newLog = {
                prod_name: name,
                user_action: action,
                time: moment().format ('DD MM YYYY, h:mm:ss')
            }
            console.log (newLog)
            d.push (newLog)
            fs.writeFile ('./server/db/logs.json', JSON.stringify(d, null, '\t'), (err) => {
                if (err) {
                    console.log ('Can not write...')
                }
            })
        }
    })
}

module.exports = stat