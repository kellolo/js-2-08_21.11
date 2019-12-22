function findProduct(id, oldCart) {
    return oldCart.contents.find(item => item.id_product === id)
}

let cart = {
    add(req, oldCart) {
        oldCart.contents.push(Object.assign({}, req.body, {quantity:1}));
        oldCart.amount += req.body.price;
        oldCart.countGoods++;
        return oldCart;
    },
    change(req,oldCart) {
        let findProd = findProduct(+req.params.id, oldCart);
        findProd.quantity += req.body.op;
        oldCart.amount += findProd.price*req.body.op;
        oldCart.countGoods += req.body.op;
        return oldCart;
    },
    del(req,oldCart) {
        let findProd = findProduct(+req.params.id, oldCart);
        oldCart.contents.splice(oldCart.contents.indexOf(findProd),1);
        oldCart.amount -= findProd.price;
        oldCart.countGoods--;
        return oldCart;
    }
}

module.exports = cart;