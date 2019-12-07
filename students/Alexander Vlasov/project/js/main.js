// константы картинок и url апишек
const image = 'https://placehold.it/200x150'
const cartImage = 'https://placehold.it/100x80'
const API_URL = 'https://raw.githubusercontent.com/ASVVlasov/online-store-api/master/responses/'

// класс для запросов к API
class API {
    // проще конечно через fetch для ДЗ сделал через promise)
    _getPromise(url) {
        return new Promise((resolve, reject) => {
                let xhr
                if (window.XMLHttpRequest) {
                    xhr = new XMLHttpRequest()
                } else if (window.ActiveXObject) {
                    xhr = new ActiveXObject("Microsoft.XMLHTTP")
                }
                xhr.onreadystatechange = function () {
                    if (xhr.readyState === 4) {
                        if (xhr.status === 200) {
                            resolve(xhr.responseText)
                        } else {
                            reject(xhr.statusText)
                        }
                    }
                }
                xhr.open('GET', url, true)
                xhr.send()

            })
            .then(dataJSON => JSON.parse(dataJSON))
    }
    getCatalogData() {
        return this._getPromise(`${API_URL}catalogData.json`)
    }
    getBasket() {
        return this._getPromise(`${API_URL}getBasket.json`)
    }
    addToBasket() {
        return this._getPromise(`${API_URL}addToBasket.json`)
    }
    deleteFromBasket() {
        return this._getPromise(`${API_URL}deleteFromBasket.json`)
    }
}

class Catalog {
    constructor() {
        this.products = []
        this.container = '.products'
        this._init()
    }
    _init() {
        api.getCatalogData()
            .then(data => {
                data.forEach(product => {
                    this.products.push(new Product(product))
                })
                this.render()
            })
            .catch(error => console.log(`Ошибка получения данных каталога: ${error}`))
    }
    render() {
        let trg = document.querySelector(this.container)
        trg.innerHTML = this.products.map(product => product.render()).join('')
    }
    getById(productId) {
        return this.products.find(prod => prod.id_product === productId)
    }
}

class Product {
    constructor(prod) {
        this.id_product = prod.id_product
        this.product_name = prod.product_name
        this.price = prod.price
        this.img = image
    }
    render() {
        return `<div class="product-item" data-id="${this.id_product}">
                    <img src="${this.img}" alt="Some img">
                    <div class="desc">
                        <h3>${this.product_name}</h3>
                        <p>${this.price} $</p>
                        <button class="buy-btn" 
                        data-id="${this.id_product}"
                        data-title="${this.product_name}"
                        data-image="${this.img}"
                        data-price="${this.price}">Купить</button>
                    </div>
                </div>`
    }
}

class Cart {
    constructor() {
        this.cartItems = []
        this.container = '.cart-block'
        this._init()
    }
    _init() {
        api.getBasket()
            .then(data => {
                data.contents.forEach(product => {
                    this.cartItems.push(new CartItem(product))
                })
                this.render()
            })
            .catch(error => console.log(`Ошибка получения данных корзины: ${error}`))
    }
    render() {
        let trg = document.querySelector(this.container)
        trg.innerHTML = this.cartItems.map(cartItem => cartItem.render()).join('')
    }
    addProduct(product) {
        api.addToBasket()
            .then(data => {
                if (data.result == 1) {
                    let find = this.cartItems.find(cart => cart.id_product === product.id_product)
                    if (!find) {
                        this.cartItems.push(new CartItem(product))
                    } else {
                        find.quantity++
                    }
                    this.render()
                } else {
                    console.log(`Невозможно добавить товар в корзину`)
                }
            })
            .catch(error => console.log(`Ошибка добавления в корзину: ${error}`))
    }
    removeProduct(productId) {
        api.deleteFromBasket()
            .then(data => {
                if (data.result == 1) {
                    let find = this.cartItems.find(product => product.id_product === productId)
                    if (find.quantity > 1) {
                        find.quantity--
                    } else {
                        this.cartItems.splice(this.cartItems.indexOf(find), 1)
                    }
                    this.render()
                } else {
                    console.log(`Невозможно удалить товар из корзины`)
                }
            })
            .catch(error => console.log(`Ошибка удаления из корзины: ${error}`))
    }
}

class CartItem {
    constructor(cart) {
        this.id_product = cart.id_product
        this.product_name = cart.product_name
        this.price = cart.price
        this.img = cartImage
        this.quantity = cart.quantity ? cart.quantity : 1
    }
    render() {
        return `<div class="cart-item" data-id="${this.id_product}">
                    <div class="product-bio">
                        <img src="${this.img}" alt="Some image">
                        <div class="product-desc">
                            <p class="product-title">${this.product_name}</p>
                            <p class="product-quantity">Quantity: ${this.quantity}</p>
                            <p class="product-single-price">$${this.price} each</p>
                        </div>
                    </div>
                    <div class="right-block">
                        <p class="product-price">$${this.quantity * this.price}</p>
                        <button class="del-btn" data-id="${this.id_product}">&times;</button>
                    </div>
                </div>`
    }
}

let api = new API()
let catalog = new Catalog()
let cart = new Cart()

//кнопка скрытия и показа корзины
document.querySelector('.btn-cart').addEventListener('click', () => {
    document.querySelector('.cart-block').classList.toggle('invisible')
})
//кнопки удаления товара (добавляется один раз)
document.querySelector('.cart-block').addEventListener('click', (evt) => {
    if (evt.target.classList.contains('del-btn')) {
        cart.removeProduct(+evt.target.dataset['id'])
    }
})
//кнопки покупки товара (добавляется один раз)
document.querySelector('.products').addEventListener('click', (evt) => {
    if (evt.target.classList.contains('buy-btn')) {
        cart.addProduct(catalog.getById(+evt.target.dataset['id']))
    }
})