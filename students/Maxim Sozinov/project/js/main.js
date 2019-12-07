
//кнопка скрытия и показа корзины
document.querySelector('.btn-cart').addEventListener('click', () => {
    document.querySelector('.cart-block').classList.toggle('invisible');
});

//кнопки удаления товара (добавляется один раз)
document.querySelector('.cart-block').addEventListener('click', (evt) => {
    if (evt.target.classList.contains('del-btn')) {
        userCart.removeItem(evt.target);
    }
});

//кнопки покупки товара (добавляется один раз)
document.querySelector('.products').addEventListener('click', (evt) => {
    if (evt.target.classList.contains('buy-btn')) {
        userCart.addItem(evt.target);
    }
});

const FAKE_API_CATALOG = 'https://raw.githubusercontent.com/havkin/js-2-08_21.11/master/students/Maxim%20Sozinov/fake-server/catalogData.json'
const FAKE_API_CART = 'https://raw.githubusercontent.com/havkin/js-2-08_21.11/master/students/Maxim%20Sozinov/fake-server/getBasket.json';

const catalogContainer = '.products';
const cartContainer = '.cart-block';

// let lists = {
//     //Название класса списка: Класс соотв эл-та списка
//     Catalog: Product,
//     Cart: CartItem
// };

class List {
    constructor (url, container) {
        this.container = container;
        this.url = url;
        this.items = [];
        this._init ();
    }
    _init () {
        return false;
    }
    getJSON (url) {
        return fetch (url)
                .then (d => d.json ());
    }
    handleData (arr) {
        arr.forEach(el => {
            this.items.push (new lists[this.constructor.name] (el));
        });
    }
    _render () {
        let block = document.querySelector (this.container);
        this.items.forEach (item => {
            block.insertAdjacentHTML ('beforeend', item.render ());
        });
    }
}

class Catalog extends List {
    constructor(url, container) {  // убрал cart из параметров
        super (url, container);
        // this.cart = cart   //-  вот это зачем?
    }
    _init () {
        this.getJSON (this.url)
            .then (data => this.handleData (data))
            .then (() => this._render ());
    }
}

class Cart extends List {
    constructor(url, container) {
        super (url, container);
        this.addItem_url = "https://raw.githubusercontent.com/havkin/js-2-08_21.11/master/students/Maxim%20Sozinov/fake-server/addToCart.json";
        this.removeItem_url = "https://raw.githubusercontent.com/havkin/js-2-08_21.11/master/students/Maxim%20Sozinov/fake-server/removeFromCart.json";
    }
    _init () {
        this.getJSON (this.url)
            .then (data => this.handleData (data.contents))
            .then (() => this._render ());
    }
    addItem(item) {
        this._fetchData(this.addItem_url)
            .then((data) => {
                if (data.result === 1) {
                    let itemId = +item.dataset.id;
                    let findItem = this.products.find(el => el.id === itemId);
                    if (!findItem) {
                        this.products.push(new CartItem(item));
                    } else {
                        findItem.increaseQnt();
                    }
                    this._render();
                } else {
                    console.log(`Ошибка ${data.result}`);
                }
            })
            .catch((errStatus) => {
                console.log(`Ошибка ${errStatus}`);
            });
    }
    removeItem(item) {
        this._fetchData(this.removeItem_url)
            .then((data) => {
                if (data.result === 1) {
                    let itemId = +item.dataset.id;
                    let findItem = this.products.find(el => el.id === itemId);
                    if (findItem.quantity > 1) {
                        findItem.reduceQnt();
                    } else {
                        this.products.splice(this.products.indexOf(findItem), 1);
                        document.querySelector(`.cart-item[data-id="${itemId}"]`).remove();
                    }
                    this._render();
                } else {
                    console.log(`Ошибка ${data.result}`);
                }
            })
            .catch((errStatus) => {
                console.log(`Ошибка ${errStatus}`);
            });
    }
    // _render() {
    //     let allProducts = '';
    //     for (let el of this.products) {
    //         allProducts += `<div class="cart-item" data-id="${el.id}">
    //                         <div class="product-bio">
    //                             <img src="${el.img}" alt="Some image">
    //                             <div class="product-desc">
    //                                 <p class="product-title">${el.name}</p>
    //                                 <p class="product-quantity">Quantity: ${el.quantity}</p>
    //                                 <p class="product-single-price">$${el.price} each</p>
    //                             </div>
    //                         </div>
    //                         <div class="right-block">
    //                             <p class="product-price">${el.quantity * el.price}</p>
    //                             <button class="del-btn" data-id="${el.id}">&times;</button>
    //                         </div>
    //                     </div>`;
    //     }

    //     document.querySelector(this.container).innerHTML = allProducts;
    // }
    _fetchData(url) {
        return fetch(url) .then(dataJSON => dataJSON.json());
    }
}

class Item {
    constructor (prod) {
        this.id_product = prod.id;
        this.product_name = prod.title;
        this.price = prod.price;
        this.img = prod.img;
    }
    render () {
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
                </div>`;
    }
}

class Product extends Item {}
// class Product {
//     constructor(prod) {
//         this.id = prod.id;
//         this.title = prod.title;
//         this.price = prod.price;
//         this.img = prod.img;
//     }
//     render() {
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
//                 </div>`;
//     }
// }
class CartItem extends Item {
    constructor(product) {
        super(product);
        this.quantity = product.quantity;
    }
    render () {
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
                </div>`;
    }
    increaseQnt() {
        this.quantity++;
    }
    reduceQnt() {
        this.quantity--;
    }
}

let lists = {
    //Название класса списка: Класс соотв эл-та списка
    Catalog: Product,
    Cart: CartItem
};

// main
// ------------------------------------------------

let catalog = new Catalog(FAKE_API_CATALOG, catalogContainer);
let userCart = new Cart(FAKE_API_CART, cartContainer);
