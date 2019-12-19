const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();
const urlencodedParser = bodyParser.urlencoded({extended: false});

app.use(express.json());

app.use('/', express.static('public'));

app.get('/catalog', (req,res) => {
    fs.readFile('server/db/catalog.json', 'utf-8', (err,data) => {
        if (err) {
            res.sendStatus(404, JSON.stringify({result:0}))
        } else {
            res.send(data);
        }
    })
})

app.get('/cart', (req,res) => {
    fs.readFile('server/db/userCart.json', 'utf-8', (err,data) => {
        if (err) {
            res.sendStatus(404, JSON.stringify({result:0}))
        } else {
            res.send(data);
        }
    })
})

app.get('/addToCart', (req,res) => {
})

app.post('/addToCart', urlencodedParser, (req,res) => {
    if (!req.body) {
        res.sendStatus(400);
    } else {
        addToCart(req.body.data,res);
    }
})

app.post('/removeFromCart', urlencodedParser, (req,res) => {
    console.log('remove', req.body.data);
    
    if(!req.body) {
        res.sendStatus(400);
    } else {
        let isEmpty = false;
        fs.readFile('server/db/userCart.json', 'utf-8', (err,data) => {
            if (err) {
                res.json({result:0})
            } else {
                console.log(req.body.data);
                let userCart = JSON.parse(data);
                userCart.amount -= userCart.contents[req.body.data].price;
                userCart.countGoods--;
                if (userCart.contents[req.body.data].quantity !== 1) {
                    userCart.contents[req.body.data].quantity--;
                } else {
                    userCart.contents.splice(req.body.data,1);
                }
                fs.writeFile('server/db/userCart.json', JSON.stringify(userCart), (err) => {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log("удален");
                    }
                })
                isEmpty = userCart.contents.length > 0 ? false : true;
                res.json({result:1, cart: userCart, empty: isEmpty});
            }
        });
    }
});

app.post('/filter', urlencodedParser, (req,res) => {
    let regFilter = new RegExp(req.body.data,'i');
    if (!req.body) {
        res.sendStatus(400);
    } else {
        //addToCart(req.body.data,res);
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

function addToCart(product,res) {
    fs.readFile('server/db/userCart.json', 'utf-8', (err,data) => {
        if (err) {
            return JSON.stringify({result:0});
        } else {
            let oldCart = JSON.parse(data);
            product.quantity = 1;
            if(!findInCart(product, oldCart)) {
                oldCart.contents.push(product);
            }
            oldCart.amount += product.price;
            oldCart.countGoods++;
            fs.writeFile('server/db/userCart.json', JSON.stringify(oldCart), (err) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log(product, "добавлен");
                }
            });
            res.json({result:1, cart: oldCart})
            res.end();
        }
    })
}

function findInCart(product, cart) {
    let result = false;
    let index = cart.contents.find((el,i) => {
        if (product.id_product === el.id_product) {
            el.quantity++;
            result = true;
        }
    });
    return result;
}

app.listen(3030, () => {
    console.log('Server starting...');
})