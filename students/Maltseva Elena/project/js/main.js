//заглушки (имитация базы данных)
const image = 'https://placehold.it/200x150';
const cartImage = 'https://placehold.it/100x80';
const catalogData = 'https://raw.githubusercontent.com/LenaMaltseva/online-store-api/master/responses/catalogData.json';


class Catalog {
    constructor () {
        this.products = [];
        this.container = '.products'
        this._init ();
    }
    _init () {
        fetchData (catalogData)
            .then(dataJSON => JSON.parse(dataJSON))     // будет выпелено вместе с Promise
        //  .then(dataJSON => dataJSON.json())          // будет использоваться при получении данных через Fetch 
            .then(data => {
                data.forEach (el => {
                this.products.push (new Product (el))
                this.render ()
                })
            })
            .catch(err => {document.querySelector(this.container).innerText = `Ошибка загрузки данных ${err}`})
    }
    render () {
        let trg = document.querySelector(this.container);
        let str = '';
        this.products.forEach (prod => {
            str += prod.render()
        });
        trg.innerHTML = str;
    }
}

class Product {
    constructor (product) {
        this.id = product.id_product;
        this.title = product.product_name;
        this.price = product.price;
        this.img = image;
    }
    render () {
        return `<div class="product-item" data-id="${this.id}">
                    <img src="${this.img}" alt="Some img">
                    <div class="desc">
                        <h3>${this.title}</h3>
                        <p>${this.price} rub.</p>
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
    constructor (){
        this.products = [];
        this.container = '.cart-block';
    }
    render () {
        let trg = document.querySelector(this.container);
        let str = '';
        this.products.forEach (prod => {
            str += prod.render()
        });
        trg.innerHTML = str;
    }
    addProduct (product) {
        let productId = +product.dataset['id'];
        let find = this.products.find (element => element.id === productId);
        if (!find) {
            this.products.push (new CartItem (product))
        }  else {
            find.quantity++
        }
        this.render();
    }
    removeProduct (product) {
        let productId = +product.dataset['id'];
        let find = this.products.find (element => element.id === productId);
        if (find.quantity > 1) {
            find.quantity--;
        } else {
            this.products.splice(this.products.indexOf(find), 1);
            document.querySelector(`.cart-item[data-id="${productId}"]`).remove()
        }
        this.render();
    }
}

class CartItem {
    constructor (product) {
        this.title = product.dataset['name'];
        this.id = +product.dataset['id'];
        this.img = cartImage;
        this.price = +product.dataset['price'];
        this.quantity = 1;
    }
    render () {
        return `<div class="cart-item" data-id="${this.id}">
                    <div class="product-bio">
                        <img src="${this.img}" alt="Some image">
                        <div class="product-desc">
                            <p class="product-title">${this.title}</p>
                            <p class="product-quantity">Quantity: ${this.quantity}</p>
                            <p class="product-single-price">${this.price} rub. each</p>
                        </div>
                    </div>
                    <div class="right-block">
                        <p class="product-price">${this.quantity * this.price}</p>
                        <button class="del-btn" data-id="${this.id}">&times;</button>
                    </div>
                </div>`
    }
}

let catalog = new Catalog ();
let cart = new Cart ();

//кнопка скрытия и показа корзины
document.querySelector('.btn-cart').addEventListener('click', () => {
    document.querySelector('.cart-block').classList.toggle('invisible');
});
//кнопки удаления товара (добавляется один раз)
document.querySelector('.cart-block').addEventListener ('click', (evt) => {
    if (evt.target.classList.contains ('del-btn')) {
        cart.removeProduct(evt.target);
    }
})
//кнопки покупки товара (добавляется один раз)
document.querySelector('.products').addEventListener ('click', (evt) => {
    if (evt.target.classList.contains ('buy-btn')) {
        cart.addProduct(evt.target);
    }
})

//имитация загрузки данных с сервера
function fetchData (url) {
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
// по п.3 из ДЗ сделала получение данных через Promise, потом поменяю на Fetch
// function fetchData (url) {
//     return fetch (url)
// }