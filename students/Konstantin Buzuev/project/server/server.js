const catalogRoute = '/catalog'
const catalogPath = 'server/data/catalog.json'
const cartRoute = '/cart'
const addRoute = '/add'
const removeRoute = '/remove'
const cartPath = 'server/data/cart.json'


const express = require("express");
const fs = require('fs')
const app = express()

app.use(express.json())
app.use('/', express.static('public')) // localhost:3000
//----------------------------------------------------------------------
app.get(catalogRoute, (req, res) => {
    catalog.Load()
    if (catalog.error) {
        res.sendStatus(404, JSON.stringify({
            result: 0
        }))
    } else {
        res.send(catalog.Data())
    }
})
app.get(cartRoute, (req, res) => {
    cart.Load()
    if (cart.error) {
        res.sendStatus(404, JSON.stringify({
            result: 0
        }))
    } else {
        res.send(cart.Data())
    }
})
app.get(`${addRoute}/:id`, (req, res) => {
    cart.AddItemToCart(req.params.id)
    res.send(cart.Data())
})
app.get(`${removeRoute}/:id`, (req, res) => {
    cart.RemoveItemFromCart(req.params.id)
    res.send(cart.Data())
})

app.listen(3000, () => {
    console.log('server listening at port 3000...')
})
//------------------------------------------------------------------------------------------
//--- Some Back-end classes
class List {
    constructor(url) {
        this.url = url
        this.items = []
        this.error = null
        this.Load()
    }
    Save() {
        return false
    }
    Load() {
        return false
    }
    _getJSON(url) {
        return new Promise((res, rej) => {
                fs.readFile(url, 'utf-8', (err, data) => {
                    if (err) {
                        rej(err)
                    }
                    this.error = null
                    res(JSON.parse(data))
                })
            })
            .catch(err => {
                this.error = err
            })
    }
    _setJSON(url) {
        return new Promise((res, rej) => {
                let data = this.Data()
                fs.writeFile(url, data, (err) => {
                    if (err) rej(err)
                    else res(0)
                })
            })
            .catch(err => this.error = err)
    }
    _handleData(arr) {
        this.items = []
        arr.forEach(el => {
            this.items.push(new lists[this.constructor.name](el))
        })
    }
    Data() {
        return false
    }
}

class Catalog extends List {
    constructor(url) {
        super(url)
    }
    Load() {
        this._getJSON(this.url)
            .then((data) => this._handleData(data))
    }
    Data() {
        return JSON.stringify(this.items)
    }
}

class Cart extends List {
    constructor(url) {
        super(url)
    }
    Load() {
        this._getJSON(this.url)
            .then((data) => {
                this._handleData(data[0].contents)
                this.totalCost = data[0].totalCost
            })
    }
    Data() {
        let data = []
        data.push({
            "contents": this.items,
            "totalCost": this.totalCost
        })
        return JSON.stringify(data)
    }
    AddItemToCart(id) {
        let product = this.items.find(item => item.id == id)
        if (product) product.quantity++
        else {
            product = catalog.items.find(item => item.id == id)
            product.quantity = 1
            this.items.push(product)
        }
        this._setJSON(this.url)
    }
    RemoveItemFromCart(id) {
        let index = this.items.findIndex(item => item.id == id)
        if (--this.items[index].quantity === 0) this.items.splice(index, 1)
        this._setJSON(this.url)
    }
}


class Item {
    constructor(prod) {
        this.id = prod.id
        this.title = prod.title
        this.description = prod.description
        this.price = prod.price
        this.characteristics = prod.characteristics
        this.imageURL = prod.imageURL
        this.fullImageURL = prod.fullImageURL
    }
}

class Product extends Item {}

class CartItem extends Item {
    constructor(prod) {
        super(prod)
        this.quantity = prod.quantity
    }
}

let lists = {
    Catalog: Product,
    Cart: CartItem
}

let catalog = new Catalog(catalogPath)
let cart = new Cart(cartPath)