//заглушки (имитация базы данных)
const image = 'https://placehold.it/200x150';
const cartImage = 'https://placehold.it/100x80';
const APIs = 'https://raw.githubusercontent.com/LenaMaltseva/online-store-api/master/responses';


class List {
    constructor (container, url) {
        this.items = []
        this.container = container
        this.url = url
        this._init()
    }
    _init () {
        return false
    }
    fetchData (url) {
        return fetch (url)
                .then (dataJSON => dataJSON.json())
    }
    handleData (dataArr) {
        dataArr.forEach (el => {
            this.items.push (new lists [this.constructor.name] (el))
        })
    }
    _render () {
        let trg = document.querySelector(this.container);
        let str = '';
        this.items.forEach (item => {
            str += item.render()
        });
        trg.innerHTML = str;
    }
}

class Item {
    constructor (product, img) {
        this.id_product = product.id_product;
        this.product_name = product.product_name;
        this.price = product.price;
        this.img = img;
    }
    render () {
        return false
    }
}

class Catalog extends List {
    constructor (container = '.products', url = `${APIs}/catalogData.json`, cart) {
        super (container, url)
        this.cart = cart
    }
    _init () {
        this.fetchData (this.url)
            .then (data => this.handleData(data))
            .then (() => this._render ())
            .catch (err => {document.querySelector(this.container).innerText = `Ошибка загрузки данных ${err}`})
    }
}

class Product extends Item {
    constructor (product, img = image) {
        super (product, img)
    }
    render () {
        return `<div class="product-item" data-id="${this.id_product}">
                    <img src="${this.img}" alt="Some img">
                    <div class="desc">
                        <h3>${this.product_name}</h3>
                        <p>${this.price} rub.</p>
                        <button class="buy-btn" 
                        data-id="${this.id_product}"
                        data-name="${this.product_name}"
                        data-image="${this.img}"
                        data-price="${this.price}">Купить</button>
                    </div>
                </div>`
    }
}

class Cart extends List {
    constructor (container = '.cart-block', url = `${APIs}/getBasket.json`) {
        super (container, url)
    }
    _init () {
        this.fetchData (this.url)
            .then (data => this.handleData(data.contents))
            .then (() => this._render())
            .catch (err => {document.querySelector(this.container).innerText = `Ошибка загрузки данных ${err}`})
    }
    addProduct (product) {
        this.fetchData (`${APIs}/addToBasket.json`)
            .then (data => {
                // не поняла, как/куда применить данные из этого API, сделала ветвление, на основе его результата
                if (data.result == 1) {
                    // костыль сборки продукта из данных, считываемых с кнопки "Купить"
                    let selectedProduct = {
                        'id_product': +product.dataset['id'],
                        'product_name': product.dataset['name'],
                        'price': +product.dataset['price'],
                        'quantity': 1
                    }
                    let find = this.items.find (element => element.id_product === selectedProduct.id_product)
                    if (!find) {
                        this.items.push (new CartItem (selectedProduct))
                    }  else {
                        find.quantity++
                    }
                    this._render();
                } else {
                    alert("В процессе добавления товара возникла ошибка")
                }
            })
            .catch (err => {document.querySelector(this.container).innerText = `Ошибка загрузки данных ${err}`})
    }
    removeProduct (product) {
        this.fetchData (`${APIs}/deleteFromBasket.json`)
            .then (data => {
                ////не поняла, как/куда применить данные из этого API, сделала ветвление, на основе его результата
                if (data.result == 1) {
                    let productId = +product.dataset['id'];
                    let find = this.items.find (element => element.id_product === productId);
                    if (find.quantity > 1) {
                        find.quantity--;
                    } else {
                        this.items.splice(this.items.indexOf(find), 1);
                        document.querySelector(`.cart-item[data-id="${productId}"]`).remove()
                    }
                    this._render();
                } else {
                    alert("В процессе удаления товара возникла ошибка")
                }
            }) 
            .catch (err => {document.querySelector(this.container).innerText = `Ошибка обновления корзины ${err}`})
    }
}

class CartItem extends Item {
    constructor (product, img = cartImage) {
        super(product, img)
        this.quantity = product.quantity
        this.render()
    }
    render () {
        return `<div class="cart-item" data-id="${this.id_product}">
                    <div class="product-bio">
                        <img src="${this.img}" alt="Some image">
                        <div class="product-desc">
                            <p class="product-title">${this.product_name}</p>
                            <p class="product-quantity">Quantity: ${this.quantity}</p>
                            <p class="product-single-price">${this.price} rub. each</p>
                        </div>
                    </div>
                    <div class="right-block">
                        <p class="product-price">${this.quantity * this.price}</p>
                        <button class="del-btn" data-id="${this.id_product}">&times;</button>
                    </div>
                </div>`
    }
}

let lists = {
    Catalog: Product,
    Cart: CartItem
}

let catalog = new Catalog ();
let cart = new Cart ();

//кнопка скрытия и показа корзины
document.querySelector('.btn-cart').addEventListener('click', () => {
    document.querySelector('.cart-block').classList.toggle('invisible');
});
//кнопки удаления товара (добавляется один раз)
document.querySelector('.cart-block').addEventListener ('click', (evt) => {
    if (evt.target.classList.contains ('del-btn')) {
        cart.removeProduct(evt.target);
    }
})
//кнопки покупки товара (добавляется один раз)
document.querySelector('.products').addEventListener ('click', (evt) => {
    if (evt.target.classList.contains ('buy-btn')) {
        cart.addProduct(evt.target);
    }
})