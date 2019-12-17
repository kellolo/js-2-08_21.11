//заглушки (имитация базы данных)
const image = 'https://placehold.it/200x150';
const cartImage = 'https://placehold.it/100x80';
// const items = ['Notebook', 'Display', 'Keyboard', 'Mouse', 'Phones', 'Router', 'USB-camera', 'Gamepad'];
// const prices = [1000, 200, 20, 10, 25, 30, 18, 24];
// const ids = [1, 2, 3, 4, 5, 6, 7, 8];
let count = 0
const FAKE_API_CATALOG = 'https://raw.githubusercontent.com/batoxa/archive/master/js-2/json/goods.json'
const GB_FAKE_API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses'


//глобальные сущности корзины и каталога (ИМИТАЦИЯ! НЕЛЬЗЯ ТАК ДЕЛАТЬ!)
// var userCart = [];
// // var list = fetchData ();
// let url = 'https://raw.githubusercontent.com/Manarox/css3-html5/master/Catalog.json'


class List {
    constructor(url, container) {
        this.container = container
        this.url = url
        this.items = []
            //this.renderedItems = []
        this.containerCount = '.zall'
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
    _render() {
        let Count = document.querySelector(this.containerCount)
        let trg = document.querySelector(this.container);
        let str = '';
        this.items.forEach(item => {
            str += item.render()
        });
        trg.innerHTML = str;
        Count.innerHTML = count
    }
}

class Catalog extends List {
    constructor(cart, url = `${GB_FAKE_API}/catalogData.json`, container = '.products') {
        super(url, container)
        this.cart = cart
    }
    _init() {
        this.getJSON(this.url)
            .then(data => this.handleData(data))
            .then(() => this._render())
    }
}

class Cart extends List {
    constructor(url, container = '.cart-block') {
        super(url, container)
    }
    CountM() {
        count--
    }
    CountP() {
        count++
    }
    _init() {
        this.getJSON(this.url)
            .then(data => this.handleData(data.contents))
            .then(() => this._render())

    }
    addProduct(product) {
        this.getJSON(`${GB_FAKE_API}/addToBasket.json`)
            .then(data => {
                if (data.result === 1) {
                    let selectedProduct = {
                        'id_product': +product.dataset['id'],
                        'product_name': product.dataset['name'],
                        'price': +product.dataset['price'],
                        'quantity': 1
                    }

                    let productId = +product.dataset.id; //data-id="1"

                    let find = this.items.find(element => element.id_product === selectedProduct.id_product); //товар или false


                    if (!find) {
                        this.items.push(new CartItem(selectedProduct))
                    } else {
                        find.quantity++
                    }
                    this._render()
                } else {
                    console.log(`Ошибка ${data.result}`)
                }
            })
            .catch(err => { document.querySelector(this.container).innerText = `Ошибка загрузки данных ${err}` })
    }
    removeProduct(product) {
        this.getJSON(`${GB_FAKE_API}/deleteFromBasket.json`)
            .then(data => {
                if (data.result === 1) {
                    let productId = +product.dataset.id;
                    let find = this.items.find(element => element.id_product === productId);
                    if (find.quantity > 1) {
                        find.quantity--;
                    } else {
                        this.items.splice(this.items.indexOf(find), 1);
                        document.querySelector(`.cart-item[data-id="${productId}"]`).remove()
                    }
                    this._render()
                } else {
                    console.log(`Ошибка ${data.result}`)
                }
            })
            .catch(err => { document.querySelector(this.container).innerText = `Ошибка загрузки данных ${err}` })
    }
}

class Item {
    constructor(prod, img = image) {
        this.id_product = prod.id_product
        this.product_name = prod.product_name
        this.price = prod.price
        this.img = img
    }
    render() {
        return `<div class="product-item" data-id="${this.id_product}">
                        <img src="${this.img}" alt="Some img">
                        <div class="desc">
                            <h3>${this.product_name}</h3>
                            <p>${this.price} $</p>
                            <button class="buy-btn" 
                            data-id="${this.id_product}"
                            data-name="${this.product_name}"
                            data-image="${this.img}"
                            data-price="${this.price}">Купить</button>
                        </div>
                    </div>`
    }
}


class Product extends Item {
    constructor(product, img = image) {
        super(product, img)
    }
    render() {
        return `<div class="product-item" data-id="${this.id_product}">
                    <img src="${this.img}" alt="Some img">
                    <div class="desc">
                        <h3>${this.product_name}</h3>
                        <p>${this.price} $</p>
                        <button class="buy-btn" 
                        data-id="${this.id_product}"
                        data-name="${this.product_name}"
                        data-image="${this.img}"
                        data-price="${this.price}">Купить</button>
                    </div>
                </div>`
    }
}

class CartItem extends Item {
    constructor(prod, img = cartImage) {
        super(prod, img)
        this.quantity = prod.quantity
        this.render()
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

let catalog = new Catalog()
let cart = new Cart()




// Начало по Vue
// const app = new Vue({
//     el: '#app',
//     data: {},
//     methods: {}
// })

//     function promiseRequest (url) {
//         return new Promise ((resolve, reject) => {
//             let xhr = new XMLHttpRequest()
//             xhr.onreadystatechange = function () {
//                 if (xhr.readyState === 4) {
//                     if (xhr.status == 200) {
//                         resolve (xhr.responseText)
//                     } else {
//                         reject (xhr.status)
//                     }
//                 }
//             }
//             xhr.open('GET', url, true) 
//             xhr.send()
//         })
//     }

// class Catalog {
//     constructor () {
//         this.products = []
//         this.container = '.products'
//         this._init ()
//     }
//     // _init () {
//     //     list.forEach (el => {
//     //         this.products.push (new Product (el))
//     //     })
//     //     this.render ()
//     // }

//     _init () {
//         promiseRequest (url) 
//             .then ((data) => {
//                 let b = JSON.parse (data)
//                 b.forEach(el => {
//                     this.products.push (new Product (el))
//                 })
//                 console.log (JSON.parse (data))
//             })
//             .then ((data) => {
//                 this.render ()
//             })
//             .catch ((errStatus) => {
//                 console.log (`Ошибка ${errStatus}`)
//             })
//     }

//     render () {
//         let trg = document.querySelector (this.container)
//         let str = ''
//         this.products.forEach (prod => {
//             str += prod.render ()
//         })
//         trg.innerHTML = str
//     }
// }

// class Product {
//     constructor (prod) {
//         this.id = prod.id
//         this.title = prod.title
//         this.price = prod.price
//         this.img = prod.img
//     }   
//     render () {
//         return `<div class="product-item" data-id="${this.id}">
//                     <img src="${this.img}" alt="Some img">
//                     <div class="desc">
//                         <h3>${this.title}</h3>
//                         <p>${this.price} $</p>
//                         <button class="buy-btn" 
//                         data-id="${this.id}"
//                         data-name="${this.title}"
//                         data-image="${this.img}"
//                         data-price="${this.price}">Купить</button>
//                     </div>
//                 </div>`
//     }
// }

// class Cart {
//     constructor () {
//         this.userCart = []
//         this.container = '.cart-block'
//         this.containerCount = '.zall'
//     }
//     CountM () {
//         count--
//     }
//     CountP () {
//         count++
//     }
//     renderCart () {
//         let trg = document.querySelector (this.container)
//         let Count = document.querySelector (this.containerCount)
//         let str = ''
//         this.userCart.forEach (prod => {
//             str += prod.renderCartItem ()
//         })
//         trg.innerHTML = str
//         Count.innerHTML = count
//     }
//     addProduct (product) {
//         let productId = +product.dataset['id']; //data-id="1"
//         let find = this.userCart.find (element => element.id === productId); //товар или false
//         if (!find) {
//             this.userCart.push (new CartItem (product))
//         }  else {
//             find.quantity++
//         }
//         this.renderCart ()
//     }
//     removeProduct (product) {
//         let productId = +product.dataset['id'];
//         let find = this.userCart.find (element => element.id === productId);
//         if (find.quantity > 1) {
//             find.quantity--;
//         } else {
//             this.userCart.splice(this.userCart.indexOf(find), 1);
//             document.querySelector(`.cart-item[data-id="${productId}"]`).remove()
//         }
//         this.renderCart ()
//     }
// }

// class CartItem {
//     constructor (prod) {
//         this.id = +prod.dataset['id']
//         this.img = cartImage
//         this.title = prod.dataset['name']
//         this.price = +prod.dataset['price']
//         this.quantity = 1
//     }
//     renderCartItem () {
//         return `<div class="cart-item" data-id="${this.id}">
//         <div class="product-bio1">
//             <img src="${this.img}" alt="Some image">
//             <div class="product-desc">
//                 <p class="product-title">${this.title}</p>
//                 <p class="product-quantity">Quantity: ${this.quantity}</p>
//                 <p class="product-single-price">$${this.price} each</p>
//             </div>
//         </div>
//         <div class="right-block">
//             <p class="product-price">${this.quantity * this.price}</p>
//             <button class="del-btn" data-id="${this.id}">&times;</button>
//         </div>
//     </div>`
//     }
// }

// let catalog = new Catalog()
// let cart = new Cart()

// //кнопка скрытия и показа корзины
document.querySelector('.btn-cart').addEventListener('click', () => {
    document.querySelector('.cart-block').classList.toggle('invisible');
});
// // //кнопки удаления товара (добавляется один раз)
document.querySelector('.cart-block').addEventListener('click', (evt) => {
        if (evt.target.classList.contains('del-btn')) {
            cart.CountM()
            cart.removeProduct(evt.target)
        }
    })
    //     // //кнопки покупки товара (добавляется один раз)
document.querySelector('.products').addEventListener('click', (evt) => {
    if (evt.target.classList.contains('buy-btn')) {
        cart.CountP()
        cart.addProduct(evt.target);
    }
})

//создание массива объектов - имитация загрузки данных с сервера
// function fetchData () {
//     let arr = [];
//     for (let i = 0; i < items.length; i++) {
//         arr.push (createProduct (i));
//     }
//     return arr
// };

//создание товара
// function createProduct (i) {
//     return {
//         id: ids[i],
//         title: items[i],
//         price: prices[i],
//         img: image,
//     }
// };

//рендер списка товаров (каталога) - выпилено


//CART

// Добавление продуктов в корзину
// function addProduct (product) {
//     let productId = +product.dataset['id']; //data-id="1"
//     let find = userCart.find (element => element.id === productId); //товар или false
//     if (!find) {
//         userCart.push ({
//             name: product.dataset ['name'],
//             id: productId,
//             img: cartImage,
//             price: +product.dataset['price'],
//             quantity: 1
//         })
//     }  else {
//         find.quantity++
//     }
//     renderCart ()
// }

//удаление товаров
// function removeProduct (product) {
//     let productId = +product.dataset['id'];
//     let find = userCart.find (element => element.id === productId);
//     if (find.quantity > 1) {
//         find.quantity--;
//     } else {
//         userCart.splice(userCart.indexOf(find), 1);
//         document.querySelector(`.cart-item[data-id="${productId}"]`).remove()
//     }
//     renderCart ();
// }

//перерендер корзины
// function renderCart () {
//     let allProducts = '';
//     for (el of userCart) {
//         allProducts += `<div class="cart-item" data-id="${el.id}">
//                             <div class="product-bio">
//                                 <img src="${el.img}" alt="Some image">
//                                 <div class="product-desc">
//                                     <p class="product-title">${el.name}</p>
//                                     <p class="product-quantity">Quantity: ${el.quantity}</p>
//                                     <p class="product-single-price">$${el.price} each</p>
//                                 </div>
//                             </div>
//                             <div class="right-block">
//                                 <p class="product-price">${el.quantity * el.price}</p>
//                                 <button class="del-btn" data-id="${el.id}">&times;</button>
//                             </div>
//                         </div>`
//     }

//     document.querySelector(`.cart-block`).innerHTML = allProducts;
// }