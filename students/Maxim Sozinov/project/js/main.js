// const FAKE_API_CATALOG = 'https://raw.githubusercontent.com/havkin/js-2-08_21.11/master/students/Maxim%20Sozinov/fake-server/catalogData.json';
// const FAKE_API_CART = 'https://raw.githubusercontent.com/havkin/js-2-08_21.11/master/students/Maxim%20Sozinov/fake-server/getBasket.json';


class List {
    constructor(url, container) {
        this.container = container;
        this.url = url;
        this.products = [];
        this.filtered = [];
        this._init();
    }
    _init() {
        return false;
    }
    getJSON(url) {
        return fetch(url)
            .then(d => d.json());
    }
    handleData(arr) {
        arr.forEach(el => {
            this.products.push(new lists[this.constructor.name](el));
            this.filtered.push(new lists[this.constructor.name](el));
        });
    }
    // _render() {
    //     let block = document.querySelector(this.container);
    //     block.innerHTML = "";
    //     this.products.forEach(item => {
    //         block.insertAdjacentHTML('beforeend', item.render());
    //     });
    // }
    filterList(value) {
        const regexp = new RegExp(value, 'i');
        this.filtered = this.products.filter(good =>
            regexp.test(good.product_name));
    }
}

class Catalog extends List {
    constructor(url, container) { // убрал cart из параметров
        super(url, container);
        // this.cart = cart   //-  вот это зачем?
    }
    _init() {
        this.getJSON(this.url)
            .then(data => this.handleData(data));
        // .then (() => this._render ());
    }

}

class Cart extends List {
    constructor(url, container) {
        super(url, container);
        this.addItem_url = "https://raw.githubusercontent.com/havkin/js-2-08_21.11/master/students/Maxim%20Sozinov/fake-server/addToCart.json";
        this.removeItem_url = "https://raw.githubusercontent.com/havkin/js-2-08_21.11/master/students/Maxim%20Sozinov/fake-server/removeFromCart.json";
    }
    _init() {
        this.getJSON(this.url)
            .then(data => this.handleData(data.contents));
        // .then (() => this._render ());
    }
    addItem(item) {
        this._fetchData(this.addItem_url)
            .then((data) => {
                if (data.result === 1) {
                    let itemId = +item.dataset.id;
                    let findItem = this.products.find(el => el.id_product === itemId);
                    if (!findItem) {
                        //заглушка для БД
                        let prod = {
                            id: +item.dataset.id,
                            title: item.dataset.name,
                            price: +item.dataset.price,
                            img: "https://placehold.it/100x80",
                            quantity: 1
                        };
                        //                        
                        this.products.push(new CartItem(prod));
                    } else {
                        findItem.increaseQnt();
                    }
                    // this._render();
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
                    let findItem = this.products.find(el => el.id_product === itemId);
                    if (findItem.quantity > 1) {
                        findItem.reduceQnt();
                    } else {
                        this.products.splice(this.products.indexOf(findItem), 1);
                        // document.querySelector(`.cart-item[data-id="${itemId}"]`).remove();
                    }
                    // this._render();
                } else {
                    console.log(`Ошибка ${data.result}`);
                }
            })
            .catch((errStatus) => {
                console.log(`Ошибка ${errStatus}`);
            });
    }
    _fetchData(url) {
        return fetch(url).then(dataJSON => dataJSON.json());
    }
}

class Item {
    constructor(prod) {
        this.id_product = prod.id;
        this.product_name = prod.title;
        this.price = prod.price;
        this.img = prod.img;
    }
    // render () {
    //     return `<div class="product-item" data-id="${this.id_product}">
    //                 <img src="${this.img}" alt="Some img">
    //                 <div class="desc">
    //                     <h3>${this.product_name}</h3>
    //                     <p>${this.price} $</p>
    //                     <button class="buy-btn" 
    //                     data-id="${this.id_product}"
    //                     data-name="${this.product_name}"
    //                     data-image="${this.img}"
    //                     data-price="${this.price}">Купить</button>
    //                 </div>
    //             </div>`;
    // }
}

class Product extends Item {}

class CartItem extends Item {
    constructor(product) {
        super(product);
        this.quantity = product.quantity;
    }
    // render () {
    //     return `<div class="cart-item" data-id="${this.id_product}">
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
    //             </div>`;
    // }
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
    Cart: CartItem,

};

let vm_catalog = new Vue({
    el: '#catalog',
    data: {
        catalog: {},
        catalogContainer: '.products',
        FAKE_API_CATALOG: 'https://raw.githubusercontent.com/havkin/js-2-08_21.11/master/students/Maxim%20Sozinov/fake-server/catalogData.json'
    },
    methods: {
        addInCart(evt) {
            vm_cart.cart.addItem(evt.target);
        }
    },
    mounted() {
        this.catalog = new Catalog(this.FAKE_API_CATALOG, this.catalogContainer);
        console.log(this.catalog);
    }
});

let vm_cart = new Vue({
    el: '#cart',
    data: {
        show: false,
        cart: {},
        cartContainer: '.cart-block',
        FAKE_API_CART: 'https://raw.githubusercontent.com/havkin/js-2-08_21.11/master/students/Maxim%20Sozinov/fake-server/getBasket.json'
    },
    methods: {
        toggleShow() {
            this.show = !this.show;
        },
        removeItem(evt) {
            this.cart.removeItem(evt.target);
        }
    },
    mounted() {
        this.cart = new Cart(this.FAKE_API_CART, this.cartContainer);
        console.log(this.cart);
    }

});

let vm_search = new Vue({
    el: '#search',
    data: {
        value: '',
        filtered: []
    },
    methods: {
        filterGoods() {
            vm_catalog.catalog.filterList(this.value);
        }
    }
});