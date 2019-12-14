// константы картинок
const image = 'https://placehold.it/200x150'
const cartImage = 'https://placehold.it/100x80'

class List {
    constructor(url) {
        this.url = url
        this.items = []
        this._init()
    }
    _init() {
        return false
    }
    getJSON(url) {
        return fetch(url)
            .then(d => d.json())
    }
    handleData(arr) {
        arr.forEach(el => {
            this.items.push(new lists[this.constructor.name](el))
        })
    }
}

class Catalog extends List {
    constructor(url) {
        super(url)
    }
    _init() {
        this.getJSON(`${this.url}catalogData.json`)
            .then(data => this.handleData(data))
    }

    filter(searchText) {
        return this.items.filter(prod => prod.product_name.search(new RegExp(searchText, 'i')) != -1)
    }
}

class Cart extends List {
    constructor(url) {
        super(url)
    }
    _init() {
        this.getJSON(`${this.url}getBasket.json`)
            .then(data => this.handleData(data.contents))
    }

    addCartItem(product) {
        this.getJSON(`${this.url}addToBasket.json`)
            .then(data => {
                if (data.result == 1) {
                    let find = this.items.find(cart => cart.id_product === product.id_product)
                    if (!find) {
                        this.items.push(new CartItem(product))
                    } else {
                        find.quantity++
                    }
                }
            })
    }

    removeCartItem(product) {
        this.getJSON(`${this.url}deleteFromBasket.json`)
            .then(data => {
                if (data.result == 1) {
                    if (product.quantity === 1) {
                        this.items.splice(this.items.indexOf(product), 1)
                    } else {
                        product.quantity--
                    }
                }
            })
    }
}

class Item {
    constructor(prod, img = image) {
        this.id_product = prod.id_product
        this.product_name = prod.product_name
        this.price = prod.price
        this.img = img
    }
}

class Product extends Item {}

class CartItem extends Item {
    constructor(prod, img = cartImage) {
        super(prod, img)
        this.quantity = prod.quantity ? prod.quantity : 1
    }
}

let lists = {
    Catalog: Product,
    Cart: CartItem
}

let market = new Vue({
    el: '#market',
    data: {
        API_URL: 'https://raw.githubusercontent.com/ASVVlasov/online-store-api/master/responses/',
        catalog: Catalog,
        cart: Cart,
        cartShow: false,
        searchText: ''
    },
    methods: {
        toggleCartShow() {
            this.cartShow = !this.cartShow
        },
        addCartItem(product) {
            this.cart.addCartItem(product)
        },
        removeCartItem(product) {
            this.cart.removeCartItem(product)
        },
        amountPrice(cartItem) {
            return cartItem.quantity * cartItem.price
        }
    },
    computed: {
        filteredItems() {
            return this.catalog.filter(this.searchText)
        }
    },
    created() {
        this.cart = new Cart(this.API_URL)
        this.catalog = new Catalog(this.API_URL)
    }
})