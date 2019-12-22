const fs = require('fs')
const moment = require('moment')

const path =  './server/db'
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
  fs.readFile(`${path}/${fname.logs}`, 'utf-8', (err, data) => {
    if(err) {
      console.log (`-!!!- log file [${path}/${fname.logs}] not founded -!!!-`)
    } else {
      let recent = JSON.parse(data)
      recent.push(entry)

      fs.writeFile(`${path}/${fname.logs}`, JSON.stringify(recent, null, 2), err => {
        if(err)
          console.log (`-!!!- can't save log file [${path}/${fname.logs}] -!!!-`) 
        })
    }
  })
}

module.exports = {path, fname, logAction, logEntry, logSave}