const API_URL = "https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/addToBasket.json";


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
        this.products = [];
        this.container = '.products';
        this.url = "https://raw.githubusercontent.com/havkin/js-2-08_21.11/master/students/Maxim%20Sozinov/fake-server/catalogData.json";
        this._init();
    }
    _init() {
        this.fetchProducts()
            .then((data) => {
                this.products = JSON.parse(data);
                console.log(this.products);
                this.render();
            })
            .catch((errStatus) => {
                console.log(`Ошибка ${errStatus}`);
            });
        // this.products = lst;
        // lst.forEach(el => {
        //     this.products.push(new Product(el));
        // });
        // this.render();
    }
    render() {
        let trg = document.querySelector(this.container);
        let str = '';
        this.products.forEach(prod => {
            let prodItem = new Product(prod);
            str += prodItem.render();
        });
        trg.innerHTML = str;
    }
    fetchProducts() {
        return new Promise((resolve, reject) => {
            let request;
            if (window.XMLHttpRequest) {
                request = new XMLHttpRequest();
            } else if (window.ActiveXObject) {
                request = new ActiveXObject("Microsoft.XMLHTTP");
            }
            request.onreadystatechange = function () {
                if (request.readyState === 4) {
                    if (request.status == 200) {
                        resolve(request.responseText);
                    } else {
                        reject(request.status);
                    }
                }
            };
            request.open('GET', this.url, true);
            request.send();
        });
    }
}

class Cart {
    constructor() {
        this.products = [];
        this.container = '.cart-block';
        this.addItem_url = "https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/addToBasket.json";
        this.removeItem_url = "https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/deleteFromBasket.json";
    }
    addItem(item) {
        this._fetchData(this.addItem_url)
            .then((data) => {
                if (JSON.parse(data).result === 1) {
                    console.log('OK');
                    let itemId = +item.dataset.id;
                    let findItem = this.products.find(el => el.id === itemId);
                    if (!findItem) {
                        this.products.push(new CartItem(item));
                    } else {
                        findItem.increaseQnt();
                    }
                    this._render();
                }
            })
            .catch((errStatus) => {
                console.log(`Ошибка ${errStatus}`);
            });
        // let itemId = +item.dataset.id;
        // let findItem = this.products.find(el => el.id === itemId);
        // if (!findItem) {
        //     this.products.push(new CartItem(item));
        // } else {
        //     findItem.increaseQnt();
        // }
        // this._render();
    }
    removeItem(item) {
        this._fetchData(this.removeItem_url)
            .then((data) => {
                if (JSON.parse(data).result === 1) {
                    let itemId = +item.dataset.id;
                    let findItem = this.products.find(el => el.id === itemId);
                    if (findItem.quantity > 1) {
                        findItem.reduceQnt();
                    } else {
                        this.products.splice(this.products.indexOf(findItem), 1);
                        document.querySelector(`.cart-item[data-id="${itemId}"]`).remove();
                    }
                    this._render();
                }
            })
            .catch((errStatus) => {
                console.log(`Ошибка ${errStatus}`);
            });
        // let itemId = +item.dataset.id;
        // let findItem = this.products.find(el => el.id === itemId);
        // if (findItem.quantity > 1) {
        //     findItem.reduceQnt();
        // } else {
        //     this.products.splice(this.products.indexOf(findItem), 1);
        //     document.querySelector(`.cart-item[data-id="${itemId}"]`).remove();
        // }
        // this._render();
    }
    _render() {
        let allProducts = '';
        for (let el of this.products) {
            allProducts += `<div class="cart-item" data-id="${el.id}">
                            <div class="product-bio">
                                <img src="${el.img}" alt="Some image">
                                <div class="product-desc">
                                    <p class="product-title">${el.name}</p>
                                    <p class="product-quantity">Quantity: ${el.quantity}</p>
                                    <p class="product-single-price">$${el.price} each</p>
                                </div>
                            </div>
                            <div class="right-block">
                                <p class="product-price">${el.quantity * el.price}</p>
                                <button class="del-btn" data-id="${el.id}">&times;</button>
                            </div>
                        </div>`;
        }

        document.querySelector(this.container).innerHTML = allProducts;
    }
    _fetchData(url) {
        return new Promise((resolve, reject) => {
            let request;
            if (window.XMLHttpRequest) {
                request = new XMLHttpRequest();
            } else if (window.ActiveXObject) {
                request = new ActiveXObject("Microsoft.XMLHTTP");
            }
            request.onreadystatechange = function () {
                if (request.readyState === 4) {
                    if (request.status == 200) {
                        resolve(request.responseText);
                    } else {
                        reject(request.status);
                    }
                }
            };
            request.open('GET', url, true);
            request.send();
        });
    }
}

class CartItem {
    constructor(product) {
        this.name = product.dataset.name;
        this.id = +product.dataset.id;
        this.img =  'https://placehold.it/100x80';
        this.price = +product.dataset.price;
        this.quantity = 1;
    }
    increaseQnt() {
        this.quantity++;
    }
    reduceQnt() {
        this.quantity--;
    }
}

// function fetchData(url) {
//     return new Promise((resolve, reject) => {
//         let request;
//         if (window.XMLHttpRequest) {
//             request = new XMLHttpRequest();
//         } else if (window.ActiveXObject) {
//             request = new ActiveXObject("Microsoft.XMLHTTP");
//         }
//         request.onreadystatechange = function () {
//             if (request.readyState === 4) {
//                 if (request.status == 200) {
//                     resolve(request.responseText);
//                 } else {
//                     reject(request.status);
//                 }
//             }
//         };
//         request.open('GET', url, true);
//         request.send();
//     });
// }


// main
// ------------------------------------------------

let catalog = new Catalog();
let userCart = new Cart();

// fetchData(API_URL)
//     .then((data) => {
//         if (JSON.parse(data).result === 1) {
//             console.log('OK');
//         }
//     })
//     .catch((errStatus) => {
//         console.log(`Ошибка ${errStatus}`);
//     });