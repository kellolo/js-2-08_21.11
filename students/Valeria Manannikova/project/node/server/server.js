const express = require ('express')
const bodyParser = require('body-parser')
//const mod = require ('./mod')

const fs = require ('fs') //file system (docs NODE)
const app = express ()
app.use (express.json())
app.use ('/', express.static ('public')) //localhost:3030/
app.use('/', bodyParser.json('public'))

app.get('/catalog', (req, res) => {
    fs.readFile ('server/db/catalog.json', 'utf-8', (err, data) => {
    if (err) {
        res.sendStatus (404, JSON.stringify ({result: 0}))
    } else {
        res.send (data)
    }
})
})

app.get('/cart', (req, res) => {
    fs.readFile ('server/db/userCart.json', 'utf-8', (err, data) => {

    if (err) {
        res.sendStatus (404, JSON.stringify ({result: 0}))
    } else {
        res.send (data)
    }
})
})
app.post('/addToBasket', (req, res) => {
    fs.readFile('cart.json', 'utf8', (err, data) => {
      if (err) {
        res.send('{"result": 0}');
      } else {
        const cart = JSON.parse(data);
        const item = req.body;
        
        cart.push(item);
  
        fs.writeFile('userCart.json', JSON.stringify(cart), (err) => {
          if (err) {
            res.send('{"result": 0}');
          } else {
            res.send('{"result": 1}');
          }
        });
      }
    });
  });


app.listen (3030, ()=> {
    console.log ('kghkghk 3030')
})

