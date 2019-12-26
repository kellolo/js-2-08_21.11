const fs = require('fs');

function rewriteCart (cart, file) {
    let newCart = {
        "amount": '',
        "countGoods": '',
        "contents": cart
    };
    fs.writeFile(file, JSON.stringify(newCart, null, 2), (err) => {
        if (err) {
            throw err;
        }
    });
    return (JSON.stringify(newCart));
}  

const changeCart = {
    add (data, item, file) {
        let cart = JSON.parse(data).contents;
        let findItem = cart.find(el => el.id === item.id);
    
        if (!findItem) {
            item.quantity = 1;
            item.img = "https://placehold.it/100x80";
            cart.push(item);                        
        } else {
            findItem.quantity++;
        }
        return rewriteCart (cart, file);
    },

    delete (data, item, file) {
        let cart = JSON.parse(data).contents;
        let findItem = cart.find(el => el.id === item.id);

        if (findItem.quantity > 1) {
            findItem.quantity--;
        } else {
            cart.splice(cart.indexOf(findItem), 1);
        }
        return rewriteCart (cart, file);
    }
};


module.exports = changeCart;