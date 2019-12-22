function findItem(id, oldCart) {
    return oldCart.contents.find(pr => pr.id === id)
}

let cart = {
    get(req, obj) {
        return obj
    },
    change(req, obj) {
        let find = findItem(+req.params.id, obj)
        find.quantity += req.body.op
        obj.totalCost += req.body.op * find.price
        return obj
    },
    add(req, obj) {
        obj.contents.push(Object.assign({}, req.body, {
            quantity: 1
        }))
        obj.totalCost += req.body.price
        return obj
    },
    del(req, obj) {
        console.log("Got DEL request")
        let find = findItem(+req.params.id, obj)
        obj.totalCost -= find.price
        obj.contents.splice(obj.contents.indexOf(find), 1)
        return obj
    }
}

module.exports = cart