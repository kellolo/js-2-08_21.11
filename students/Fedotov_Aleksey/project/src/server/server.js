const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');

const handler = require('./handler');
const app = express();
const urlencodedParser = bodyParser.urlencoded({extended: false});

app.use(express.json());

app.use('/', express.static('public'));

app.get('/catalog', (req,res) => {
    //res.sendStatus(404, JSON.stringify({result:0}))
    
    fs.readFile('db/catalog.json', 'utf-8', (err,data) => {
        if (err) {
            res.sendStatus(404, JSON.stringify({result:0}))
        } else {
            res.send(data);
        }
    })
})

app.get('/cart', (req,res) => {
    fs.readFile('db/userCart.json', 'utf-8', (err,data) => {
        if (err) {
            res.sendStatus(404, JSON.stringify({result:0}))
        } else {
            res.send(data);
        }
    })
})

app.post('/cart', urlencodedParser, (req,res) => {
    if (!req.body) {
        res.sendStatus(400);
    } else {
        console.log('server is working');
        handler(req, res, 'server/db/userCart.json', 'add');
    }
})

app.put('/cart/:id', urlencodedParser, (req,res) => {
    console.log("Зашел в PUT");
    handler(req, res, 'server/db/userCart.json', 'change');
});

app.delete('/cart/:id', urlencodedParser, (req,res) => {
    console.log("Зашел в delete");
    handler(req, res, 'server/db/userCart.json', 'del');
});

app.post('/filter', urlencodedParser, (req,res) => {
    let regFilter = new RegExp(req.body.data,'i');
    if (!req.body) {
        res.sendStatus(400);
    } else {
        fs.readFile('server/db/catalog.json', 'utf-8', (err,data) => {
            if (err) {
                res.json({result: err})
            } else {
                let filterArr = [];
                let catalog = JSON.parse(data);
                filterArr = catalog.filter(product => regFilter.test(product.product_name))
                res.json({filter: filterArr, result: 1});
            }
        })
    }
})


app.listen(3030, () => {
    console.log('Server starting...');
})