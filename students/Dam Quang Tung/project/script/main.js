const image = 'https://placehold.it/200x200'
const cartImage = 'https://placehold.it/100x80'

const items = ['AMD Ryzen 3', 'Intel Core i3', 'AMD Ryzen 5', 'Intel Core i5', 'AMD Ryzen 7', 'Intel Core i7', 'AMD Ryzen 9', 'Intel Core i9 Coffee Lake R.', 'Intel Core i9 Skylake-X Refresh']
const prices = [6000, 11600, 13500, 17500, 25000, 27000, 46800, 36000, 145000]
const ids = [1, 2, 3, 4, 5, 6, 7, 8, 9]


/*let btnCart = document.querySelector ('.btn-cart')
btnCart.addEventListener ('click', showCart)

function showCart () {
    document.querySelector ('.cart-block').classList.toggle ('invisible')
}


let store = {
    catalog: [],
    cart: [],
    sum: 0,
    _init: function() {
        this.createDTO()
        this.renderCatalog()
    },
    createDTO: function() {
        for (let i = 0; i < ITEMS.length; i++) {
            this.catalog.push(this._createProduct(ITEMS[i], PRICES[i], IDS[i]))
        }
    },
    _createProduct: function(name, price, id) {
        return {
            name: name,
            id: id,
            price: price,
            img: image,
            createTemplate: function() {
                return `
                <div class="product-item">
                    <img src="${this.img}" alt="">
                    <div class="desc">
                        <h3>${this.name}</h3>
                        <p>${this.price} $</p>
                        <button class="buy-btn"
                        data-id="${this.id}"
                        data-name="${this.name}"
                        data-price="${this.price}"
                        >Купить</button>
                    </div>
                </div>
                `
            }
        }
    },
    calcSum: function() {
        for (let el of this.catalog) {
            this.sum += el.price
        }
    },
    renderCatalog: function() {
        let htmlStr = ''

        this.catalog.forEach(el => {
            htmlStr += el.createTemplate()
        })
        document.querySelector('.products').innerHTML = htmlStr
    },
    renderCart: function() {
        let htmlStr = ''
        this.cart.forEach(el => {
            htmlStr += `
                    <div class="cart-item">
                        <div class="product-bio">
                            <img src="${cartImage}" alt="">
                            <div class="product-desc">
                                <p class="product-title">${el.name}</p>
                                <p class="product-quantity">${el.quantity}</p>
                                <p class="product-single-price">${el.price} $</p>
                            </div>
                        </div>
                        <div class="right-block">
                            <p class="product-price">${el.quantity * el.price} $</p>
                            <button class="del-btn" data-id="${el.id}">&times;</button>
                        </div>
                    </div>
                `
        })

        document.querySelector('.cart-block').innerHTML = htmlStr
    },

    addProduct: function(prod) {
        let find = this.cart.find(el => {
            return el.id === +prod.dataset['id']
        })
        if (find) {
            find.quantity++
        } else {
            this.cart.push({
                name: prod.dataset['name'],
                price: +prod.dataset['price'],
                id: +prod.dataset['id'],
                quantity: 1
            })
        }
        this.renderCart()
    },
    removeProduct: function (prod) {
        let find = this.cart.find(el => {
        return el.id === +prod.dataset['id']
    })
    if (find.quantity > 1) {
        find.quantity--
    } else {
        this.cart.splice(this.cart.indexOf(find), 1)
    }
    this.renderCart()
    }

}


store._init() //создание товаров + рендер из объекта

document.querySelector('.products').addEventListener('click', function(evt) {
    if (evt.target.classList.contains('buy-btn')) {
        store.addProduct(evt.target)
    }
})

document.querySelector('.cart-block').addEventListener('click', function(evt) {
    if (evt.target.classList.contains('del-btn')) {
        store.removeProduct(evt.target)
    }
})
*/

//глобальные сущности корзины и каталога (ИМИТАЦИЯ! НЕЛЬЗЯ ТАК ДЕЛАТЬ!)

var list = fetchData ();


class Catalog {
    constructor () {
        this.products = []
        this.container = '.products'
        this._init ()
    }
    _init () {
        list.forEach (el => {
            this.products.push (new Product (el))
        })
        this.render ()
    }
    render () {
        let trg = document.querySelector (this.container)
        let str = ''
        this.products.forEach (prod => {
            str += prod.render ()
        })
        trg.innerHTML = str
    }
}

class Product {
    constructor (prod) {
        this.id = prod.id
        this.title = prod.title
        this.price = prod.price
        this.img = prod.img
    }
    render () {
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
                </div>`
    }
}

class Cart {
   
}

class CartItem {
    
}

let catalog = new Catalog ()
let cart = new Cart()
// кнопка скрытия и показа корзины
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
function fetchData () {
    let arr = [];
    for (let i = 0; i < items.length; i++) {
        arr.push (createProduct (i));
    }
    return arr
};

//создание товара
function createProduct (i) {
    return {
        id: ids[i],
        title: items[i],
        price: prices[i],
        img: image,
    }
};

//рендер списка товаров (каталога) - выпилено


//CART

// Добавление продуктов в корзину
/*function addProduct (product) {
    let productId = +product.dataset['id']; //data-id="1"
    let find = userCart.find (element => element.id === productId); //товар или false
    if (!find) {
        userCart.push ({
            name: product.dataset ['name'],
            id: productId,
            img: cartImage,
            price: +product.dataset['price'],
            quantity: 1
        })
    }  else {
        find.quantity++
    }
    renderCart ()
}

//удаление товаров
function removeProduct (product) {
    let productId = +product.dataset['id'];
    let find = userCart.find (element => element.id === productId);
    if (find.quantity > 1) {
        find.quantity--;
    } else {
        userCart.splice(userCart.indexOf(find), 1);
        document.querySelector(`.cart-item[data-id="${productId}"]`).remove()
    }
    renderCart ();
}

//перерендер корзины
function renderCart () {
    let allProducts = '';
    for (el of userCart) {
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
                        </div>`
    }

    document.querySelector(`.cart-block`).innerHTML = allProducts;
}
*/