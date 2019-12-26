const express = require('express');
const bodyParser = require('body-parser');

const fs = require ('fs');
const app = express();
app.use (express.json())
app.use(bodyParser.json());
app.use ('/', express.static ('public')) //localhost:3030/

app.get ('/catalog', (req, res) => {
    fs.readFile ('server/db/catalog.json', 'utf-8', (err, data) => {
        if (err) {
            res.sendStatus (404, JSON.stringify ({result: 0}))
        } else {
            res.send (data)
        }
    })
})

app.get ('/cart', (req, res) => {
    fs.readFile ('server/db/userCart.json', 'utf-8', (err, data) => {
        if (err) {
            res.sendStatus (404, JSON.stringify ({result: 0}))
        } else {
            res.send (data)
        }
    })
})



app.post('/addToCart', (req, res) => {
    fs.readFile('cart.json', 'utf8', (err, data) => {
      if (err) {
        res.send('{"result": 0}');
      } else {
        const cart = JSON.parse(data);
        const item = req.body;
        
        cart.push(item);
  
        fs.writeFile('cart.json', JSON.stringify(cart), (err) => {
          if (err) {
            res.send('{"result": 0}');
          } else {
            res.send('{"result": 1}');
          }
        });
      }
    });
  });
  
  

//post, put, delete


app.listen(3030, () => {
    console.log('server listening at port 3030...')
})