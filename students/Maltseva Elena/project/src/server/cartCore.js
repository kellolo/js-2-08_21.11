const addLog = require ('./addLog')

function findItem (req, oldCart) {
    return oldCart.contents.find (element => element.id_product === +req.params.id);
}

let cart = {
    add (req, data) {
        data.contents.push (Object.assign({}, req.body, {quantity: 1}))
        addLog ('add product', req.body.product_name)
        return data
    },
    change (req, data) {
        let find = findItem (req, data);
        find.quantity += req.body.act
        addLog (`change quantity of product: ${req.body.act}`, find.product_name)
        return data
    },
    remove (req, data) {
        let find = findItem (req, data);
        data.contents.splice(data.contents.indexOf(find), 1)
        addLog('remove product', find.product_name)
        return data
    }
}

module.exports = cart