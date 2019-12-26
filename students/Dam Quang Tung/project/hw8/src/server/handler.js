const fs = require('fs');
const changeCart = require('./cartCore');
  

function logActions (action, item) {
    let data = `action: ${action}, product: ${item.title}, time: ${(new Date(Date.now())).toString ()} \n`;
   
    fs.appendFile('../db/stat.txt', data, (err) => {
        if (err) {
            throw err;
        }
        console.log('The "data to append" was appended to file!');
      });
}

function handler (item, res, file, action) {

    fs.readFile(file, 'utf8', (err, data) => {
        if (err) {
            res.sendStatus(404);
        } else {
            let newCart = changeCart[action] (data, item, file);
            logActions(action, item);
            res.send(newCart);
        }
    });
}

module.exports = handler;