const image = 'https://placehold.it/200x150';
const cartImage = 'https://placehold.it/100x80';

let userCart = [] // Корзина
let productsDTO = [] // массив полученных с сервера данных

class Catalog {
    constructor() {
        this.products = []
        this.container = '.products'
        this._init ()
    }
    _init () {
        let url = 'https://raw.githubusercontent.com/Discipulus101/online-store-api/master/responses/catalogData.json'
        let urlErr = 'https://lol.org'

        function promiseRequest (url) {
            return new Promise ((resolve, reject) => {
                let xhr = new XMLHttpRequest()
                xhr.onreadystatechange = function () {
                    if (xhr.readyState === 4) {
                        if (xhr.status == 200) {
                            resolve (xhr.responseText)
                        } else {
                            reject (xhr.status)
                        }
                    }
                }
                xhr.open('GET', url, true) 
                xhr.send()
            })
        }

        promiseRequest (url)
            .then ((data) => {
                productsDTO = JSON.parse(data);

                productsDTO.forEach (el => {
                    this.products.push (new Product (el))
                })
                this.render ()
            })
            .catch ((errStatus) => {
                console.log (`Ошибка ${errStatus}`)
            })
    }
    render () {
        let trg = document.querySelector(this.container)
        let str = ''
        this.products.forEach (prod => {
            str += prod.render ()
        })
        trg.innerHTML = str
    }
}

class Product {
    constructor (prod) {
        this.id = prod.id_product
        this.title = prod.product_name
        this.price = prod.price
        this.img = image
    }
    render () {
            return `
            <div class="product-item" data-id="${this.id}">
                <img src="${this.img}" alt="img">
                <div class="desc">
                    <h3>${this.title}</h3>
                    <p>${this.price}</p>
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

let catalog = new Catalog () // Построение каталога

//кнопка скрытия и показа корзины
let btnCart = document.querySelector ('.btn-cart')

btnCart.addEventListener ('click', showCart)

function showCart () {
    document.querySelector ('.cart-block').classList.toggle ('invisible')
}

//кнопки покупки товара (добавляется один раз)
document.querySelector('.products').addEventListener('click', function (evt) {
    if (evt.target.classList.contains ('buy-btn')) {
        addProduct(evt.target);
    }
})

//кнопки удаления товара (добавляется один раз)
document.querySelector('.cart-block').addEventListener('click', function (evt) {
    if (evt.target.classList.contains ('del-btn')) {
        removeProduct(evt.target);
    }
})

//CART

// добавление  товара в корзину
function addProduct (prod){
    let find = userCart.find (el => {
        return el.id === +prod.dataset ['id']
    })
    console.log (find)
    if (find){
        find.quantity ++
    } else {
        userCart.push ({
            title: prod.dataset ['title'],
            price: +prod.dataset['price'],
            id: +prod.dataset['id'],
            quantity: 1
        })
    }
    renderCart()
}

// удаление товра из корзины
function removeProduct (prod){
    let find = userCart.find (el => {
        return el.id === +prod.dataset ['id']
    })
    console.log (find)
    if (find.quantity > 1){
        find.quantity --
    } else {
        userCart.splice(userCart.indexOf (find), 1)
    }
    renderCart()
}

//перерендер корзины
function renderCart () {
    let htmlStr = ''
    userCart.forEach (el => {
        htmlStr += `
            <div class="cart-item"">
                <div class="product-bio">
                    <img src="${cartImage}" alt="Some image">
                    <div class="product-desc">
                        <p class="product-title">${el.title}</p>
                        <p class="product-quantity">${el.quantity}</p>
                        <p class="product-single-price">${el.price} $</p>
                    </div>
                </div>
                <div class="right-block">
                    <p class="product-price">${el.quantity * el.price}</p>
                    <button class="del-btn" data-id="${el.id}">&times;</button>
                </div>
            </div>
        `
    })
    document.querySelector('.cart-block').innerHTML = htmlStr
}