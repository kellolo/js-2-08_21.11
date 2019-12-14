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

    filterList(value) {
        const regexp = new RegExp(value, 'i');
        this.filtered = this.products.filter(good =>
            regexp.test(good.product_name));
    }
}

class Catalog extends List {
    constructor(url, container) { 
        super(url, container);
    }
    _init() {
        this.getJSON(this.url)
            .then(data => this.handleData(data));
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
                    }
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
}

class Product extends Item {}

class CartItem extends Item {
    constructor(product) {
        super(product);
        this.quantity = product.quantity;
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
    Cart: CartItem,

};

// let vm_catalog = new Vue({
//     el: '#catalog',
//     data: {
//         catalog: {},
//         catalogContainer: '.products',
//         FAKE_API_CATALOG: 'https://raw.githubusercontent.com/havkin/js-2-08_21.11/master/students/Maxim%20Sozinov/fake-server/catalogData.json'
//     },
//     methods: {
//         addInCart(evt) {
//             vm_cart.cart.addItem(evt.target);
//         }
//     },
//     mounted() {
//         this.catalog = new Catalog(this.FAKE_API_CATALOG, this.catalogContainer);
//     }
// });

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

new Vue ({
    el: v_catalog,
    data: {
        // url: 'https://raw.githubusercontent.com/havkin/js-2-08_21.11/master/students/Maxim%20Sozinov/fake-server/catalogData.json' 
    },
    methods: {
        getJson (url) {
            return fetch (url)
            .then (result => result.json())
            .catch (err => {
                console.log (err);
            });
        },
    }
});