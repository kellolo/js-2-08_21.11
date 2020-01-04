function findItem (id, oldCart) {
    return oldCart.contents.find (pr => pr.id_product === id)
}

let cart = {
    change (req, obj) {
        let find = find(+req.params.id, obj)
        find.quantity += req.body.op
        return {newCart:JSON.stringify(obj, null, '\t'), name: find.product_name}
    },
    add (req, obj) {
        obj.contents.push (Object.assign ({}, req.body, {quantity: 1}))
        return {newCart:JSON.stringify(obj, null, '\t'), name: req.body.product_name}
    },
    del (req, obj) {
        let find = findItem(+req.params.id, obj)
        obj.contents.splice (obj.contents.indexOf (find), 1)
        return {newCart:JSON.stringify(obj, null, '\t'), name: find.product_name}
    }

}

module.exports = cart