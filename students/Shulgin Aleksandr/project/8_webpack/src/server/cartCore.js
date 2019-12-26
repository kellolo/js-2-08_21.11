function findItem (id, oldCart) {
    return oldCart.contents.find (pr => pr.id_product === id)
}

let cart = {
    change (req, obj) {
        let find = findItem (+req.params.id, obj)
        find.quantity += req.body.op
        return obj
    },
    add (req, obj) {
        obj.contents.push (Object.assign ({}, req.body, {quantity: 1}))
        return obj
    },
    del (req, obj) {
        let find = findItem (+req.params.id, obj)
        obj.contents.splice (obj.contents.indexOf (find), 1)
        return obj
    }
}

module.exports = cart