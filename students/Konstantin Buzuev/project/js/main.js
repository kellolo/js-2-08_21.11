//заглушки (имитация базы данных)
const image = 'https://placehold.it/200x150';
const cartImage = 'https://placehold.it/100x80';
// Начинаю выпиливать заглушки
// const items = ['Notebook', 'Display', 'Keyboard', 'Mouse', 'Phones', 'Router', 'USB-camera', 'Gamepad'];
// const prices = [1000, 200, 20, 10, 25, 30, 18, 24];
// const ids = [1, 2, 3, 4, 5, 6, 7, 8];


//глобальные сущности корзины и каталога (ИМИТАЦИЯ! НЕЛЬЗЯ ТАК ДЕЛАТЬ!)
//var userCart = []; - выпилил
// var list = fetchData() - выпилил с особым удовольствием

class Product {
    constructor(prod) {
        this.id = prod.id;
        this.title = prod.title;
        this.price = prod.price;
        this.img = prod.img;
    }
    render() {
        return `<div class="product-item" data-id="${this.id}">
                    <img src="${this.img}" alt="Some img">
                    <div class="desc">
                        <h3>${this.title}</h3>
                        <p>${this.price} $</p>
                        <button class="buy-btn" 
                        data-id="${this.id}"
                        data-name="${this.title}"
                        data-image="${this.img}"
                        data-price="${this.price}">Купить</button>
                    </div>
                </div>`;
    }
}
class Catalog {
    constructor() {
        this.products = []
        this.container = '.products'
        this._init()
    }
    _init() {
        let list = [];
        let url = 'https://raw.githubusercontent.com/Konstantin-Buzuev/online-store-api/master/catalogData.json';
        this._catalogFetch(url)
            .then(dataJSON => dataJSON.json())
            .then(data => {
                data.forEach(el => {
                    let newProd = new Object(0)
                    newProd.id = el.id_product
                    newProd.title = el.product_name
                    newProd.price = el.price
                    newProd.img = image
                    this.products.push(new Product(newProd))
                })

            })
            .then(() => {
                this.render()
            })
            .catch(err => {
                console.log(err)
            })
    }
    _catalogFetch(url) {
        return fetch(url)
    }
    render() {
        let trg = document.querySelector(this.container)
        let str = ''
        this.products.forEach(prod => {
            str += prod.render()
        })
        trg.innerHTML = str
        let buttons = [...document.getElementsByClassName("buy-btn")]
        buttons.forEach(button => {
            button.addEventListener("click", function () {
                cart.addItem(button);
            })
        })
    }
}

let catalog = new Catalog()

class CartItem {
    constructor(prod) {
        /*Product fields*/
        this.id = prod.id;
        this.name = prod.name;
        this.img = prod.img;
        this.price = prod.price;
        /*CartItem fields*/
        this.quantity = 1
        this._calculateCost()
    }
    _calculateCost() {
        this.cost = this.price * this.quantity
    }
    put() {
        this.quantity++;
        this._calculateCost()
    }
    take() {
        this.quantity = (--this.quantity < 0) ? 0 : this.quantity
        this._calculateCost()
    }
    render() {
        return `<div class="cart-item" data-id="${this.id}">
                    <div class="product-bio">
                        <img src="${this.img}" alt="Some image">
                        <div class="product-desc">
                        <p class="product-title">${this.name}</p>
                        <p class="product-quantity">Quantity: ${this.quantity}</p>
                        <p class="product-single-price">$${this.price} each</p>
                        </div>
                    </div>
                    <div class="right-block">
                    <p class="product-price">${this.cost}</p>
                    <button class="del-btn" data-id="${this.id}">&times;</button>
                    </div>
                </div>`
    }
}

class Cart {
    constructor() {
        /*Use Map(product, quantity) in next iteration!*/
        this.items = [];
        this.cost = 0;
    }
    _createItem(product) {
        return {
            id: +product.dataset.id,
            title: product.dataset.name,
            img: product.dataset.image,
            price: product.dataset.price,
        }
    }
    _calculateCost() {
        this.cost = 0
        for (let i = 0; i < this.items.length; i++) this.cost += this.items[i].cost;
    }
    _renderCart() {
        let cartHTML = '';
        this.items.forEach(item => {
            cartHTML += item.render();
        });
        document.querySelector(`.cart-block`).innerHTML = cartHTML;
    }
    addItem(product) {
        let newItem = this._createItem(product)
        let find = this.items.find(element => element.id === newItem.id);
        if (find) find.put();
        else this.items.push(new CartItem(newItem))
        this._calculateCost()
        this._renderCart()
    }
    removeItem(product) {
        let item = this._createItem(product)
        let find = this.items.find(element => element.id === newItem.id);
        find.take()
        if (find.quantity == 0) document.querySelector(`.cart-item[data-id="${productId}"]`).remove()
        this._calculateCost()
        this._renderCart()
    }

}

let cart = new Cart()






//кнопка скрытия и показа корзины
// document.querySelector('.btn-cart').addEventListener('click', () => {
//     document.querySelector('.cart-block').classList.toggle('invisible');
// });
// //кнопки удаления товара (добавляется один раз)
// document.querySelector('.cart-block').addEventListener ('click', (evt) => {
//     if (evt.target.classList.contains ('del-btn')) {
//         removeProduct (evt.target);
//     }
// })
// //кнопки покупки товара (добавляется один раз)
// document.querySelector('.products').addEventListener ('click', (evt) => {
//     if (evt.target.classList.contains ('buy-btn')) {
//         addProduct (evt.target);
//     }
// })

//создание массива объектов - имитация загрузки данных с сервера
// function fetchData() - Выпилено
//создание товара
// function createProduct(i) - Выпилено 
//рендер списка товаров (каталога) - выпилено
//CART
//добавление товаров - выпилено
//удаление товаров - выпилено
//перерендер корзины - выпилено