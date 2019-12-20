//Вчера косяк был в том, что дважды вызывался метод _init () - отсюда навешивалось по два event Listener на клик по каждой кнопке
// устранено

// так же был косяк здесь:
// _updateCart (product) {
//     console.log (product)
//     let block = document.querySelector (`.cart-item[data-id = "${product.id_product}"]`)
// не тот селектор был прокинут в определение блока. надо было искать по дата-атрибуту id - иначе невозможно было определить нужный блок
// устранено

//const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses'


let app = new Vue ({
    el: '#app',
    data: {
        cartImage: 'https://placehold.it/100x80',
        cartUrl: '/getBasket.json',
        showCart: false
        
    },
    methods: {
        getJson (url) {
            return fetch (url)
            .then (result => result.json())
            .catch (err => {
                console.log (err)
            })
        },
        postJson (url, data) {
            return fetch (url, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify (data)
            })
            .then (result => result.json())
            .catch (err => {
                console.log (err)
            })
        },
        putJson (url, data) {
            return fetch (url, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify (data)
            })
            .then (result => result.json())
            .catch (err => {
                console.log (err)
            })
        },
        deleteJson (url) {
            return fetch (url, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then (result => result.json())
            .catch (err => {
                console.log (err)
            })
        },
    },
    
})

// class List {
//     constructor (url, container) {
//         this.container = container
//         this.url = url
//         this.goods = [] //то, что мы запрашиваем с сети
//         this.allProducts = [] //то, что мы сохраняем локально
//         this._init ()
//     }
//     _init () {
//         return false
//     }
//     getJson (url) {
//         return fetch (url ? url : `${API + this.url}`)
//             .then (result => result.json())
//             .catch (err => {
//                 console.log (err)
//             })
//     }
//     handleData (data) {
//         this.goods = [...data]
//         this.render ()
//     }
//     render () {
//         const block = document.querySelector (this.container)
//         for (let product of this.goods) {
//             const prod = new lists [this.constructor.name] (product)
//             this.allProducts.push (prod)
//             block.insertAdjacentHTML ('beforeend', prod.render ())
//         }
//     }
// }

// class Item {
//     constructor (el, img = image) {
//         this.product_name = el.product_name
//         this.price = el.price
//         this.id_product = el.id_product
//         this.img = img
//     }
//     render () {
        // return `<div class="product-item" data-id="${this.id_product}">
        //     <img src="${this.img}" alt="Some img">
        //     <div class="desc">
        //         <h3>${this.product_name}</h3>
        //         <p>${this.price} $</p>
        //         <button class="buy-btn" 
        //         data-id="${this.id_product}"
        //         data-name="${this.product_name}"
        //         data-image="${this.img}"
        //         data-price="${this.price}">Купить</button>
        //     </div>
        // </div>`
//     }
// }

// class catalogItem extends Item { }

// class CartItem extends Item {
//     constructor (el, img = cartImage) {
//         super (el, img)
//         this.quantity = el.quantity
//     }
//     render () {
//         return `
//             <div class="cart-item" data-id="${this.id_product}">
//                 <div class="product-bio">
//                     <img src="${this.img}" alt="Some image">
//                     <div class="product-desc">
//                         <p class="product-title">${this.product_name}</p>
//                         <p class="product-quantity">Quantity: ${this.quantity}</p>
//                         <p class="product-single-price">$${this.price} each</p>
//                     </div>
//                 </div>
//                 <div class="right-block">
//                     <p class="product-price">${this.quantity * this.price}</p>
//                     <button class="del-btn" data-id="${this.id_product}">&times;</button>
//                 </div>
//             </div>
//         `
//     }
// }

// class Catalog extends List {
//     constructor (cart, url = CATALOG_URL, container = '.products') {
//         super (url, container)
//         this.cart = cart
//         this.getJson ()
//             .then (data => this.handleData(data))
//     }
//     _init () {
//         document.querySelector (this.container).addEventListener ('click', event => {
//             if (event.target.classList.contains('buy-btn')) {
//                 this.cart.addProduct (event.target)
//             }
//         })
//     }
// //render () => const prod = new lists [Catalog] (product) // prod = new Item (product)
// }

// class Cart extends List {
// //render () => const prod = new lists [Cart] (product) // prod = new CartItem (product)
//     constructor (url = CART_URL, container = '.cart-block') {
//         super (url, container)
//         this.getJson ()
//             .then (data => this.handleData(data.contents)) 
//     }

//     addProduct (element) {
//         this.getJson (API + '/addToBasket.json')
//             .then (response => {
//                 if (response.result) {
//                     let prodId = +element.dataset['id']
//                     let find = this.allProducts.find (item => item.id_product === prodId)
//                     if (find) {
//                         find.quantity ++
//                         this._updateCart (find)
//                     } else {
//                         let product = {
//                             id_product: prodId,
//                             price: +element.dataset['price'],
//                             product_name: element.dataset['name'],
//                             img: +element.dataset['image'],
//                             quantity: 1
//                         }
//                         //this.allProducts.push(product)
//                         this.goods = [product]
//                         this.render ()
//                     }
//                 }
//             })
//     }

//     removeProduct (element) {
//         this.getJson (API + '/deleteFromBasket.json')
//             .then (response => {
//                 if (response.result) {
//                     let prodId = +element.dataset['id']
//                     let find = this.allProducts.find (item => item.id_product === prodId)

//                     if (find.quantity > 1) {
//                         find.quantity --
//                         this._updateCart (find)
//                     } else {
                        
//                         this.allProducts.splice(this.allProducts.indexOf(find), 1)
//                         let block = document.querySelector (`.cart-item[data-id = "${find.id_product}"]`)
//                         block.remove ()

//                     }
//                 }
//             })
//     }
//     _updateCart (product) {
//         console.log (product)
//         let block = document.querySelector (`.cart-item[data-id = "${product.id_product}"]`)
//         block.querySelector('.product-quantity').textContent = `Quantity: ${product.quantity}`
//         block.querySelector('.product-price').textContent = `${product.quantity * product.price}`
//     }
//     _init () {
//         document.querySelector ('.btn-cart').addEventListener ('click', () => {
//             //document.querySelector (this.container).classList.toggle ('invisible')
//             document.querySelector('.cart-block').classList.toggle('invisible')
//         })

//         document.querySelector (this.container).addEventListener ('click', event => {
//             if (event.target.classList.contains('del-btn')) {
//                 this.removeProduct (event.target)
//                 // console.log (`Товар ${event.target.dataset.name} удален`)
//             }
//         })
//     }
// }

// let lists = {
//     Catalog: Item,
//     Cart: CartItem
// }

// let cart = new Cart ()
// let catalog = new Catalog (cart)