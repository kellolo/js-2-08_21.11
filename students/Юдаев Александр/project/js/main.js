let app = new Vue ({
    el: '#products',
    data: {
        url: 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses'
    },
    methods: {
        showSome(){
            console.log(this);
        }
    },
    computed: {

    },
    mounted(){

    },
    created(){
        this.showSome();
    }
});



//
// //заглушки (имитация базы данных)
// const FAKE_API_CATALOG = 'https://raw.githubusercontent.com/batoxa/archive/master/js-2/json/goods.json';
// const GB_FAKE_API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
// const image = 'https://placehold.it/200x150';
// const cartImage = 'https://placehold.it/100x80';
//
// class List {
//     constructor (url, container) {
//         this.container = container;
//         this.url = url;
//         this.items = [];
//         //this.renderedItems = []
//         this._init ();
//     }
//     _init () {
//         return false;
//     }
//     getJSON (url) {
//         return fetch (url)
//             .then (d => d.json ());
//     }
//     handleData (arr) {
//         arr.forEach(el => {
//             this.items.push (new lists [this.constructor.name] (el));
//         });
//     }
//     _render () {
//         let bl = document.querySelector (this.container);
//         this.items.forEach (product => {
//             bl.insertAdjacentHTML ('beforeend', product.render ());
//         });
//     }
// }
//
// class Catalog extends List {
//     constructor (cart, url = GB_FAKE_API + '/catalogData.json', container = '.products') {
//         super (url, container);
//         this.cart = cart;
//     }
//     _init () {
//         this.getJSON (this.url)
//             .then (data => this.handleData (data))
//             .then (() => this._render ());
//     }
// }
//
// class Cart extends List {
//     constructor (url = GB_FAKE_API + '/getBasket.json', container = '.cart-block') {
//         super (url, container);
//     }
//     _init () {
//         this.getJSON (this.url)
//             .then (data => this.handleData (data.contents))
//             .then (() => this._render ());
//     }
//     // всякие там картовские штуки
// }
//
// class Item {
//     constructor (prod, img = image) {
//         this.id_product = prod.id_product;
//         this.product_name = prod.product_name;
//         this.price = prod.price;
//         this.img = img;
//     }
//     render () {
//         return `<div class="product-item" data-id="${this.id_product}">
//                     <img src="${this.img}" alt="Some img">
//                     <div class="desc">
//                         <h3>${this.product_name}</h3>
//                         <p>${this.price} $</p>
//                         <button class="buy-btn"
//                         data-id="${this.id_product}"
//                         data-name="${this.product_name}"
//                         data-image="${this.img}"
//                         data-price="${this.price}">Купить</button>
//                     </div>
//                 </div>`;
//     }
// }
//
// class Product extends Item {}
//
// class CartItem extends Item {
//     constructor (prod, img = cartImage) {
//         super (prod, img);
//         this.quantity = prod.quantity;
//     }
//     render () {
//         return `<div class="cart-item" data-id="${this.id_product}">
//                     <div class="product-bio">
//                         <img src="${this.img}" alt="Some image">
//                         <div class="product-desc">
//                             <p class="product-title">${this.product_name}</p>
//                             <p class="product-quantity">Quantity: ${this.quantity}</p>
//                             <p class="product-single-price">$${this.price} each</p>
//                         </div>
//                     </div>
//                     <div class="right-block">
//                         <p class="product-price">${this.quantity * this.price}</p>
//                         <button class="del-btn" data-id="${this.id_product}">&times;</button>
//                     </div>
//                 </div>`;
//     }
// }
//
// let lists = {
//     Catalog: Product,
//     Cart: CartItem
//     //Название класса списка: Класс соотв эл-та списка
// };
//
// let catalog = new Catalog ();
// let cart = new Cart ();