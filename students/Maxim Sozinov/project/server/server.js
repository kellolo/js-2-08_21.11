const express = require('express');
const fs = require('fs');
const handler = require('./handler');

const app = express();

app.use(express.json());

app.use('/', express.static('public'));

app.get('/catalog', (req, res) => {

    fs.readFile('server/db/catalogData.json', 'utf8', (err, data) => {
        if (err) {
            res.sendStatus(404);
        } else {
            res.send(data);
        }
    });

});

app.get('/cart', (req, res) => {

    fs.readFile('server/db/getBasket.json', 'utf8', (err, data) => {
        if (err) {
            res.sendStatus(404);
        } else {
            res.send(data);
        }
    });

});

function rewriteCart (cart) {
    let newCart = {
        "amount": 46600,
        "countGoods": 2,
        "contents": cart
    };
    fs.writeFile('server/db/getBasket.json', JSON.stringify(newCart), (err) => {
        if (err) {
            throw err;
        }
    });
    return (JSON.stringify(newCart));
}

function logActions (action, item) {
    let data = `action: ${action}, product: ${item.title}, time: ${(new Date(Date.now())).toString ()} \n`;
   
    fs.appendFile('server/db/stat.txt', data, (err) => {
        if (err) {
            throw err;
        }
        console.log('The "data to append" was appended to file!');
      });
}

app.post('/cart', (req, res) => {

    handler(req, res, 'server/db/getBasket.json', 'add');

});

app.delete('/cart', (req, res) => {

    handler(req, res, 'server/db/getBasket.json', 'delete');

});

app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
});