//заглушки (имитация базы данных)
const image = 'https://placehold.it/200x150';
const cartImage = 'https://placehold.it/100x80';
const items = ['Notebook', 'Display', 'Keyboard', 'Mouse', 'Phones', 'Router', 'USB-camera', 'Gamepad', 'GraphCard', 'Stylus'];
const prices = [1000, 200, 20, 10, 25, 30, 18, 24, 350, 20];
const ids = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const API = 'https://raw.githubusercontent.com/alexferdinand/js-2-08_21.11/master/students/Alexander Fomin/project'
const urlCatalog = '/catalog.json'


//глобальные сущности корзины и каталога (ИМИТАЦИЯ! НЕЛЬЗЯ ТАК ДЕЛАТЬ!)

class List {
    constructor() {
        this.list = null
        this._init()
    }


    _init() {
        this.list = this.getProductList()
    }

    _getXHR() {
        let xhr
        try {
            xhr = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {
            try {
                xhr = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (E) {
                xhr = false;
            }
        }
        if (typeof XMLHttpRequest != 'undefined') {
            xhr = new XMLHttpRequest();
        }
        return xhr
    }

    makeGETrequest() {
       return new Promise((resolve, reject) => {
            let xhr = this._getXHR()
            xhr.onload = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status == 200)
                        resolve(xhr.responseText)
                } else {
                    reject(xhr.status)
                }
            }
            xhr.open('GET', API + urlCatalog, true)
            xhr.send()
        })
    }

    getProductList() {
        this.makeGETrequest()
            .then(responseText => {
                return responseText
            })
            .catch(error => {
                return 'Ошибка'
            })

    }
}

class Catalog {
    constructor() {
        this.products = []
        this.container = '.products'
        this._init()
    }
    _init() {

        this.render()
    }

    render() {
        let trg = document.querySelector(this.container)
        let str = ''
        this.products.forEach(prod => {
            str += prod.render()
        })
        trg.innerHTML = str
    }
}



class Product {
    constructor(prod) {
        this.id = prod.id
        this.title = prod.title
        this.price = prod.price
        this.img = prod.img
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
                </div>`
    }
}


class Cart {
    constructor() {
        this.container = '.btn-cart'
        this.elements = []
        this._init()
    }
    _init(product) {
        this._setVisible()
        this._setBuyButton()
        this._setDelButton()
    }

    _setVisible() {
        document.querySelector('.btn-cart').addEventListener('click', () => {
            document.querySelector('.cart-block').classList.toggle('invisible');
        });
    }

    _setBuyButton() {
        document.querySelector('.products').addEventListener('click', (evt) => {
            if (evt.target.classList.contains('buy-btn')) {
                this.addItem(evt.target.dataset);
            }
        })
    }

    _setDelButton() {
        document.querySelector('.cart-block').addEventListener('click', (evt) => {
            if (evt.target.classList.contains('del-btn')) {
                this.removeItem(evt.target.dataset);
            }
        })
    }

    _render() {
        let html = ''
        for (let el of this.elements) {
            html += el.render()
        }
        document.querySelector(`.cart-block`).innerHTML = html;
    }

    addItem(productDataset) {
        let find = this.elements.find(element => element.id === productDataset['id']);
        if (!find) {
            let cartItem = new CartItem(productDataset['id'])
            this.elements.push(cartItem)
        } else {
            find.count++
        }
        this._render()
    }


    removeItem(productDataset) {
        let find = this.elements.find(element => element.id === productDataset['id']);
        console.log(this.elements)
        let indexOfEl = this.elements.indexOf(find)
        if (+find.count == 1) {
            this.elements.splice(indexOfEl, 1);
            document.querySelector(`.cart-item[data-id="${find['id']}"]`).remove()
            console.log(this.elements)
        } else {
            this.elements[indexOfEl].count--
            this._render()

        }

    }

}

class CartItem {
    constructor(id) {
        this.id = null
        this.title = ''
        this.price = null
        this.count = null
        this.img = ''
        this._init(id)
    }

    _init(id) {
        let find = catalog.products.find(el => el.id == id);
        this.id = id
        this.title = find.title
        this.price = find.price
        this.img = find.img
        this.count = 1
    }

    render() {
        let html = `<div class="cart-item" data-id="${this.id}">
            <div class="product-bio">
                <img src="${this.img}" alt="Some image">
                <div class="product-desc">
                    <p class="product-title">${this.title}</p>
                    <p class="product-quantity">Quantity: ${this.count}</p>
                    <p class="product-single-price">$${this.price} each</p>
                </div>
            </div>
            <div class="right-block">
                <p class="product-price">${this.count * this.price}</p>
                <button class="del-btn" data-id="${this.id}">&times;</button>
            </div>
        </div>`
        return html
    }
}


let a = new List()

console.log(a)
let catalog = new Catalog()
let cart = new Cart()


//создание массива объектов - имитация загрузки данных с сервера
function fetchData() {
    let arr = [];
    for (let i = 0; i < items.length; i++) {
        arr.push(createProduct(i));
    }
    return arr
};

//создание товара
function createProduct(i) {
    return {
        id: ids[i],
        title: items[i],
        price: prices[i],
        img: image,
    }
};