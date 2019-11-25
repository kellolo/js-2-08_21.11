//заглушки (имитация базы данных)
const image = 'https://placehold.it/200x150';
const cartImage = 'https://placehold.it/100x80';
const items = ['Notebook', 'Display', 'Keyboard', 'Mouse', 'Phones', 'Router', 'USB-camera', 'Gamepad'];
const prices = [1000, 200, 20, 10, 25, 30, 18, 24];
const ids = [1, 2, 3, 4, 5, 6, 7, 8];


//глобальные сущности корзины и каталога (ИМИТАЦИЯ! НЕЛЬЗЯ ТАК ДЕЛАТЬ!)
var userCart = [];
var list = fetchData();


class Catalog {
    constructor() {
        this.products = []
        this.container = '.products'
        this._init()
    }
    _init() {
        list.forEach(el => {
            this.products.push(new Product(el))
        })
        this.render()
    }
    render() {
        let trg = document.querySelector(this.container)
        let str = ''
        this.products.forEach(prod => {
            str += prod.render()
        })
        trg.innerHTML = str
    }
    getById(productId) {
        return this.products.find(prod => prod.id === productId)
    }
}

class Product {
    constructor(prod) {
        this.id = prod.id
        this.title = prod.title
        this.price = prod.price
        this.img = prod.img
    }
    render() {
        return `<div class="product-item" data-id="${this.id}">
                    <img src="${this.img}" alt="Some img">
                    <div class="desc">
                        <h3>${this.title}</h3>
                        <p>${this.price} $</p>
                        <button class="buy-btn" 
                        data-id="${this.id}"
                        data-title="${this.title}"
                        data-image="${this.img}"
                        data-price="${this.price}">Купить</button>
                    </div>
                </div>`
    }
}

class Cart {
    constructor() {
        this.cartItems = [];
        this.container = '.cart-block';
    }
    render() {
        let trg = document.querySelector(this.container);
        trg.innerHTML = this.cartItems.map(cartItem => cartItem.render()).join('');
    }
    addProduct(product) {
        let find = this.cartItems.find(cart => cart.id === product.id)
        if (!find) {
            this.cartItems.push(new CartItem(product))
        } else {
            find.quantity++;
        }
        this.render();
    }
    removeProduct(productId) {
        let find = this.cartItems.find(product => product.id === productId)
        if (find.quantity > 1) {
            find.quantity--;
        } else {
            this.cartItems.splice(this.cartItems.indexOf(find), 1);
        }
        this.render();
    }
}

class CartItem {
    constructor(cart) {
        this.title = cart.title;
        this.id = cart.id;
        this.img = cartImage;
        this.price = +cart.price;
        this.quantity = 1;
    }
    render() {
        return `<div class="cart-item" data-id="${this.id}">
                    <div class="product-bio">
                        <img src="${this.img}" alt="Some image">
                        <div class="product-desc">
                            <p class="product-title">${this.title}</p>
                            <p class="product-quantity">Quantity: ${this.quantity}</p>
                            <p class="product-single-price">$${this.price} each</p>
                        </div>
                    </div>
                    <div class="right-block">
                        <p class="product-price">$${this.quantity * this.price}</p>
                        <button class="del-btn" data-id="${this.id}">&times;</button>
                    </div>
                </div>`
    }
}

let catalog = new Catalog()
let cart = new Cart()

//кнопка скрытия и показа корзины
document.querySelector('.btn-cart').addEventListener('click', () => {
    document.querySelector('.cart-block').classList.toggle('invisible');
});
//кнопки удаления товара (добавляется один раз)
document.querySelector('.cart-block').addEventListener ('click', (evt) => {
    if (evt.target.classList.contains ('del-btn')) {
        removeProduct (evt.target);
    }
})
//кнопки покупки товара (добавляется один раз)
document.querySelector('.products').addEventListener ('click', (evt) => {
    if (evt.target.classList.contains ('buy-btn')) {
        addProduct (evt.target);
    }
})

//создание массива объектов - имитация загрузки данных с сервера
function fetchData() {
    let arr = [];
    for (let i = 0; i < items.length; i++) {
        arr.push(createProduct(i));
    }
    return arr
};

//создание товара
function createProduct(i) {
    return {
        id: ids[i],
        title: items[i],
        price: prices[i],
        img: image,
    }
};

//рендер списка товаров (каталога) - выпилено


//CART

//Добавление продуктов в корзину
function addProduct(product) {
    let productId = +product.dataset['id']; //data-id="1"
    let find = catalog.getById(productId) //товар или false
    cart.addProduct(find)
}

//удаление товаров
function removeProduct(product) {
    let productId = +product.dataset['id'];
    cart.removeProduct(productId)
}

// //перерендер корзины - выпилено