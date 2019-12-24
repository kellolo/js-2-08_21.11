const express = require('express');
const fs = require('fs');
const handler = require('./handler');

const app = express();

app.use(express.json());

app.use('/', express.static('../../public'));

app.get('/catalog', (req, res) => {

    fs.readFile('../db/catalogData.json', 'utf8', (err, data) => {
        if (err) {
            res.sendStatus(404);
        } else {
            res.send(data);
        }
    });

});

app.get('/cart', (req, res) => {

    fs.readFile('../db/getBasket.json', 'utf8', (err, data) => {
        if (err) {
            res.sendStatus(404);
        } else {
            res.send(data);
        }
    });

});

app.post('/cart', (req, res) => {

    handler(req.body, res, '../db/getBasket.json', 'add');

});

app.delete('/cart', (req, res) => {

    handler(req.body, res, '../db/getBasket.json', 'delete');

});

app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
});