const catalogRoute = '/catalog'
const catalogPath = 'server/data/catalog.json'
const cartRoute = '/cart'
const cartPath = 'server/data/cart.json'


const express = require("express");
const fs = require('fs')
const app = express()

app.use(express.json())
app.use('/', express.static('public')) // localhost:3000

app.get(catalogRoute, (req, res) => {
    catalog.Load()
    if (catalog.error) {
        res.sendStatus(404, JSON.stringify({
            result: 0
        }))
    } else {
        res.send(catalog.prepareData())
    }
})

app.get(cartRoute, (req, res) => {

    cart.Load()
    if (cart.error) {
        res.sendStatus(404, JSON.stringify({
            result: 0
        }))
    } else {
        res.send(cart.prepareData())
    }
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
                let data = this._prepareData()
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
    prepareData() {
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
    prepareData() {
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
    prepareData() {
        let data = []
        data.push({
            "contents": this.items,
            "totalCost": this.totalCost
        })
        return JSON.stringify(data)
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