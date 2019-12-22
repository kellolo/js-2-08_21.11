const fs = require('fs')
const moment = require('moment')

const root =  './server/db'
const fname =  {
    catalog:  'catalog.json',
    basket:   'basket.json',
    logs:     'stats.json'
}

const logAction = {
    add:    'add',
    remove: 'remove'
};
  
const logEntry = (action, name) => { return {
    time: moment().format('DD-MM-YYYY HH:mm:ss'),
    action: action,
    product_name: name
  }
}

const logSave = (entry) => {
  fs.readFile(`${root}/${fname.logs}`, 'utf-8', (err, data) => {
    if(err) {
      console.log (`-!!!- log file [${root}/${fname.logs}] not founded -!!!-`)
    } else {
      let recent = JSON.parse(data)
      recent.push(entry)

      fs.writeFile(`${root}/${fname.logs}`, JSON.stringify(recent, null, 2), err => {
        if(err)
          console.log (`-!!!- can't save log file [${root}/${fname.logs}] -!!!-`) 
        })
    }
  })
}

module.exports = {root, fname, logAction, logEntry, logSave}