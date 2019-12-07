//заглушки (имитация базы данных)
const image = 'https://placehold.it/200x150';
const cartImage = 'https://placehold.it/100x80';
const items = ['Notebook', 'Display', 'Keyboard', 'Mouse', 'Phones', 'Router', 'USB-camera', 'Gamepad'];
const prices = [1000, 200, 20, 10, 25, 30, 18, 24];
const ids = [1, 2, 3, 4, 5, 6, 7, 8];

const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/catalogData.json';
const MY_API = 'https://raw.githubusercontent.com/KPEKZ/DataBase/master/responses/catalogData.json'

// клонировал репозиторий, добавил товары, но если вставлю ссылку, то не работет https://github.com/KPEKZ/DataBase/blob/master/responses/catalogData.json
//глобальные сущности корзины и каталога (ИМИТАЦИЯ! НЕЛЬЗЯ ТАК ДЕЛАТЬ!)
var userCart = []; //товары в корзине
var list = fetchData();

    async function makeGETRequest(url, callback) {
        var xhr;
    
        if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
        } else if (window.ActiveXObject) { 
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
        }
    
        xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            return callback(JSON.parse(xhr.responseText));
        }
        }
    
        xhr.open('GET', url, true);
        xhr.send();
        
    }

    function callb(data)
    {
        let arr = [];

        for(let i =0; i< data.length;i++)
        {
            arr.push(data[i])
        }
        
    
        return arr;
    }

    makeGETRequest(API_URL, callb);
   
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
    //HW
    constructor ()
    {
        this.cartProducts = [];
        this.cartMain = '.cart-block';
        this._init();
       
    }

    _init()
    {
        userCart.forEach (el => {
            this.cartProducts.push (new CartItem (el))
        })
        this.render ()
    }

    render () {
        let trg = document.querySelector (this.cartMain)
        let str = ''
        this.cartProducts.forEach ( cartprod => {
            str += cartprod.render ()
        })
        trg.innerHTML = str
    }

}

class CartItem {
    //HW

    constructor(cartProd)
    {
        this.id = cartProd.id
        this.title = cartProd.title
        this.price = cartProd.price
        this.img = cartProd.img
    }

    render()
    {
        let allProducts = '';
           
                allProducts += `<div class="cart-item" data-id="${this.id}">
                                    <div class="product-bio">
                                        <img src="${this.img}" alt="Some image">
                                        <div class="product-desc">
                                            <p class="product-title">${this.name}</p>
                                            <p class="product-quantity">Quantity: ${this.quantity}</p>
                                         <p class="product-single-price">$${this.price} each</p>
                                        </div>
                                    </div>
                                    <div class="right-block">
                                        <p class="product-price">${this.quantity * this.price}</p>
                                        <button class="del-btn" data-id="${this.id}">&times;</button>
                                    </div>
                                </div>`
    

        return document.querySelector(`.cart-block`).innerHTML = allProducts;
    }

}

let catalog = new Catalog ()
let carts = new Cart();
//кнопка скрытия и показа корзины
document.querySelector('.btn-cart').addEventListener('click', () => {
    document.querySelector('.cart-block').classList.toggle('invisible');
});
// //кнопки удаления товара (добавляется один раз)
document.querySelector('.cart-block').addEventListener ('click', (evt) => {
    if (evt.target.classList.contains ('del-btn')) {
        removeProduct (evt.target);
    }
})
// //кнопки покупки товара (добавляется один раз)
document.querySelector('.products').addEventListener ('click', (evt) => {
    if (evt.target.classList.contains ('buy-btn')) {
        addProduct (evt.target);
    }
})



//рендер списка товаров (каталога) - выпилено


//CART

// Добавление продуктов в корзину
function addProduct (product) {
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



