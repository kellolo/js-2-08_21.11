//заглушки (имитация базы данных)
const image = 'https://placehold.it/200x150'
const cartImage = 'https://placehold.it/100x80'

//const items = ['Notebook', 'Display', 'Keyboard', 'Mouse', 'Phones', 'Router', 'USB-camera', 'Gamepad']
//const prices = [1000, 200, 20, 10, 25, 30, 18, 24]
//const ids = [1, 2, 3, 4, 5, 6, 7, 8]
const api = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/catalogData.json'

//глобальные сущности корзины и каталога (ИМИТАЦИЯ! НЕЛЬЗЯ ТАК ДЕЛАТЬ!)
//let list = fetchData ()

/*
let userCart = []
let fullCart
*/

const app = new Vue({
    el: '#app',
    data: {
        catalogURL: api,
        products: null,
        cart: null,
        cartImage: 'https://placehold.it/100x80',
        image: 'https://placehold.it/200x150',
        cartVisible: false,
        // searchLine

    },
    mounted() {
        this.getJSON(this.catalogURL)
            .then(d => this.products = d)
    },
    methods: {
        cartShown() {
            this.cartVisible = !this.cartVisible;
        },
        getJSON(url) {
            return fetch(url)
                .then(result => result.json())
        },
        addItem(event) {
            console.log(event.target);
            let item = this.products.find((el) => el.id == event.target.dataset["id"]);
            item.quantity = typeof (item.quantity) === 'undefined' ? 1 : item.quantity + 1;
            this.cart = this.products.filter(el => typeof (el.quantity) != 'undefined' && el.quantity > 0);
        },
        removeItem(event) {
            let prod = this.products.find((el) => el.id == event.target.dataset["id"]);
            prod.quantity--;
            this.cart = this.products.filter(el => typeof (el.quantity) != 'undefined' && el.quantity > 0);
        }
    }
});

document.querySelector('.btn-search').addEventListener('click', (e) => {
    const value = searchInput.value;
    list.filter(value);
});

/*
function makeRequest (method, url) {
    return new Promise(function (resolve, reject) {
        let xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.onload = function () {
            if (this.status >= 200 && this.status < 300) {
                resolve(xhr.response);
            } else {
                reject({
                    status: this.status,
                    statusText: xhr.statusText,
                    url: url
                });
            }
        };
        xhr.onerror = function () {
            reject({
                status: this.status,
                statusText: xhr.statusTextt,
                url: url
            });
        };
        xhr.send();
    });
}

makeRequest ('GET', api)
    .then((data) => {
       return JSON.parse(data);
    })
    .then((cat) => {
        new Catalog(cat);
    })
    .catch((err) => {
        let products = document.querySelector(".products");
        products.style.cssText = "grid-template-columns: none;";
        products.innerHTML = `<div>Не удалось загрузить <a href= "${err.url}" target="_blank">данные</a> с сервера, получена ошибка: ${err.status} (${err.statusText})</div>`;
    });

class Catalog {
	constructor (cat) {
		this.products = []
		this.cat = cat;
		this.container = '.products'
		this._init ()
	}
	
    _init(){
        this.cat.forEach (el => {
            this.products.push(new Product (el));
        });
        this.render()
    }
//	
//    _init () {
//        fetch(cat)
//            .then(d => d.json())
//            .then((data) => {
//                data.forEach (el => {
//                    this.products.push (new Product (el))
//                })
//            })
//            .finally(() => this.render ())
//    }
//	
	render () {
		let block = document.querySelector (this.container) 
		let str = ''
		this.products.forEach (product => { 
			str += product.render ()
		})
		block.innerHTML = str
	} 
}

//let catalog = new Catalog();

class Product {
    constructor(product) {
        this.id = product.id_product
        this.title = product.product_name
        this.price = product.price
        //this.img = product.img
        this.img = image
    }
    render() {
        return `<div class="product-item" data-id="${this.id}"> 
                    <img src="${this.img}" alt="Some img"> 
                    <div class = "desc">
                        <h3>${this.title}</h3>  
						<p>${this.price} $</p>  
						<button class = "buy-btn"
							data-id = "${this.id}"
							data-name = "${this.title}"
							data-image = "${this.img}"
							data-price = "${this.price}">Купить</button> 
					</div> 
				</div>`
	}
}

////рендер списка товаров (каталога)
///*
//function renderProducts () {
//    let arr = [];
//    for (item of list) {
//        arr.push(item.createTemplate())
//    }
//    document.querySelector('.products').innerHTML = arr.join('');
//}
//renderProducts ();
//*/
//
////создание массива объектов - имитация загрузки данных с сервера
///* function fetchData () {
//    let arr = [];
//    for (let i = 0; i < items.length; i++) {
//        arr.push (createProduct (i));
//    }
//    return arr
//}; */
//
////создание товара
///* function createProduct (i) {
//    return {
//        id: ids[i],
//        //name: items[i],
//        title: items[i],
//        price: prices[i],
//        img: image */ /*,
//        quantity: 0,
//        createTemplate: function () {
//            return `<div class="product-item" data-id="${this.id}">
//                        <img src="${this.img}" alt="Some img">
//                        <div class="desc">
//                            <h3>${this.name}</h3>
//                            <p>${this.price} $</p>
//                            <button class="buy-btn" 
//                            data-id="${this.id}"
//                            data-name="${this.name}"
//                            data-image="${this.img}"
//                            data-price="${this.price}">Купить</button>
//                        </div>
//                    </div>`
//		},*/
//
//        /*add: function() {
//            this.quantity++
//        }*/ /*
//    }
//}; */
//
//
//
////CART
//
//// Добавление продуктов в корзину
///* 
//function addProduct (product) {
//    let productId = +product.dataset['id'];
//    let find = userCart.find (element => element.id === productId);
//    if (!find) {
//        userCart.push ({
//            name: product.dataset ['name'],
//            id: productId,
//            img: cartImage,
//            price: +product.dataset['price'],
//            quantity: 1
//        })
//    }  else {
//        find.quantity++
//    }
//    renderCart ()
//} */ 
//
////удаление товаров
///* 
//function removeProduct (product) {
//    let productId = +product.dataset['id'];
//    let find = userCart.find (element => element.id === productId);
//    if (find.quantity > 1) {
//        find.quantity--;
//    } else {
//        userCart.splice(userCart.indexOf(find), 1);
//        document.querySelector(`.cart-item[data-id="${productId}"]`).remove()
//    }
//    renderCart ();
//} */
//
////перерендер корзины 
///*
//function renderCart () {
//    let allProducts = '';
//    for (el of userCart) {
//        allProducts += `<div class="cart-item" data-id="${el.id}">
//                            <div class="product-bio">
//                                <img src="${el.img}" alt="Some image">
//                                <div class="product-desc">
//                                    <p class="product-title">${el.name}</p>
//                                    <p class="product-quantity">Quantity: ${el.quantity}</p>
//                                    <p class="product-single-price">$${el.price} each</p>
//                                </div>
//                            </div>
//                            <div class="right-block">
//                                <p class="product-price">${el.quantity * el.price}</p>
//                                <button class="del-btn" data-id="${el.id}">&times;</button>
//                            </div>
//                        </div>`
//    }
//    document.querySelector(`.cart-block`).innerHTML = allProducts;
//} */

/*
class CartItem {
    constructor(product) {
        this.title = product.dataset['name']
        this.id = product.dataset['id']
        //this.img = product.dataset['image']
        this.img = cartImage
        this.price = product.dataset['price']
        this.quantity = 1
    }
    renderCart() {
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
                        <p class="product-price">Full:${this.quantity * this.price} $</p>
                        <button class="del-btn" data-id="${this.id}">&times;</button>
                    </div>
                </div>`
    }
}

class Cart {
    constructor(product, block) {
        this.cartProduct = new CartItem(product)
        this.block = `.${block}`
        this.productId = this.cartProduct.id;
        this.totalPrice = 0
        this.cart = userCart
    }
    addProduct() {
        let find = this.cart.find(element => element.id === this.productId);
        if (find) {
            find.quantity++
        } else {
            this.cart.push(this.cartProduct)
        }
        this.fullPrice()
    }
    removeProduct() {
        let find = userCart.find(element => element.id === this.productId);
        if (find.quantity > 1) {
            find.quantity--;
        } else {
            userCart.splice(userCart.indexOf(find), 1);
        }
        this.fullPrice()
    }
    fullPrice() {
        this.cart.forEach(item => {
                this.totalPrice += +item.price * item.quantity
            })
        this.render();
    }
    render() {
        let block = document.querySelector(this.block)
        let str = ''
        block.innerHTML = str
        this.cart.forEach(item => {
            str += item.renderCart()
        })
        str += `<p>Total: ${this.totalPrice} $ </p>`
        block.innerHTML = str
    }
}

//кнопка скрытия и показа корзины
document.querySelector('.btn-cart').addEventListener('click', () => {
    document.querySelector('.cart-block').classList.toggle('invisible');
});

//кнопки удаления товара (добавляется один раз)
document.querySelector('.cart-block').addEventListener('click', (evt) => {
    if (evt.target.classList.contains('del-btn')) {
        fullCart = new Cart(evt.target, 'cart-block').removeProduct()
    }
})

//кнопки покупки товара (добавляется один раз)
document.querySelector('.products').addEventListener('click', (evt) => {
    if (evt.target.classList.contains('buy-btn')) {
        fullCart = new Cart(evt.target, 'cart-block').addProduct();
    }
})
*/
