const express = require('express');
const fs = require('fs');

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

app.post('/cart', (req, res) => {
    let newItem = req.body;

    fs.readFile('server/db/getBasket.json', 'utf8', (err, data) => {
        if (err) {
            res.sendStatus(404);
        } else {
            let cart = JSON.parse(data).contents;
            let findItem = cart.find(el => el.id === newItem.id);
            if (!findItem) {
                newItem.quantity = 1;
                newItem.img = "https://placehold.it/100x80";
                cart.push(newItem);                        
            } else {
                findItem.quantity++;
            }
            let newCart = {
                "amount": 46600,
                "countGoods": 2,
                "contents": cart
            };

            fs.writeFile('server/db/getBasket.json', JSON.stringify(newCart), (err) => {
                if (err) {
                    res.sendStatus(404);
                } else {
                    console.log('OK');
                    res.send(JSON.stringify(newCart));
                }
            });
            // res.send(data);
        }
    });
});

app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
});