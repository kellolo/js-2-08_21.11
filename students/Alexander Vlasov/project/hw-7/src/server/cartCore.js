function findItem (id, obj) {
    return obj.contents.find (o => o.id_product === id)
}

let cart = {
    POST: function(req, oldCart) {
        oldCart.contents.push (Object.assign ({}, req.body, {quantity: 1}))
        return oldCart
    },
    PUT: function(req, oldCart) {
        let find = findItem (+req.params.id, oldCart)
        find.quantity += req.body.operation
        return oldCart
    },
    DELETE: function(req, oldCart) {
        let find = findItem (+req.params.id, oldCart)
        oldCart.contents.splice (oldCart.contents.indexOf (find), 1)
        return oldCart
    }
}

module.exports = cart