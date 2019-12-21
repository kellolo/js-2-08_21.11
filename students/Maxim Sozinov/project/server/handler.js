const fs = require('fs');

function rewriteCart (cart) {
    let newCart = {
        "amount": '',
        "countGoods": '',
        "contents": cart
    };
    fs.writeFile('server/db/getBasket.json', JSON.stringify(newCart, null, 2), (err) => {
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

const changeCart = {
    add (data, item) {
        let cart = JSON.parse(data).contents;
        let findItem = cart.find(el => el.id === item.id);
    
        if (!findItem) {
            item.quantity = 1;
            item.img = "https://placehold.it/100x80";
            cart.push(item);                        
        } else {
            findItem.quantity++;
        }
    
        return cart;
    },
    delete (data, item) {
        let cart = JSON.parse(data).contents;
        let findItem = cart.find(el => el.id === item.id);

        if (findItem.quantity > 1) {
            findItem.quantity--;
        } else {
            cart.splice(cart.indexOf(findItem), 1);
        }
        return cart;
    }
};


function handler (req, res, file, action) {
    let item = req.body;

    fs.readFile(file, 'utf8', (err, data) => {
        if (err) {
            res.sendStatus(404);
        } else {
            let newCart = changeCart[action] (data, item);

            logActions(action, item);
            res.send(rewriteCart (newCart));
        }
    });
}

module.exports = handler;