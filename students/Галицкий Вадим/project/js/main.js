//заглушки (имитация базы данных)
const image = 'https://placehold.it/200x150';
const cartImage = 'https://placehold.it/100x80';

class Catalog {
    constructor () {
        this.products = []
        this.container = '.products'
        this._init ()
    }
    _init () {
        fetchData(this)
        
        //кнопки покупки товара (добавляется один раз)
        document.querySelector(this.container).addEventListener ('click', (evt) => {
            if (evt.target.classList.contains ('buy-btn')) {
                cart.addProduct (evt.target);
            }
        })
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
        this.id = prod.id_product
        this.title = prod.product_name
        this.price = prod.price
        this.img = image
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
    constructor(){
        this.opened = false;
        this.container = ".cart-block";
        this.switcher = ".btn-cart";
        this.productList = [];
        this._init();
    }

    _init(){
        promiseRequest("https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/getBasket.json")
            .then((data) => {
                JSON.parse(data).contents.forEach((el) => {
                    const dataset = {
                        "id": el.id_product,
                        "name": el.product_name,
                        "price": el.price,
                        "quantity": el.quantity
                    }
                    this.productList.push(new CartItem(dataset));
                });
                this._render()
            })
            .catch((errStatus) => {
                console.log (`Запрос списка товаров в корзине завершился ошибкой: ${errStatus}`)
            })

        //кнопка скрытия и показа корзины
        document.querySelector(this.switcher).addEventListener('click', () => {
            this._switchCart();
        });
        //кнопки удаления товара (добавляется один раз)
        document.querySelector(this.container).addEventListener ('click', (evt) => {
            if (evt.target.classList.contains ('del-btn')) {
                this.deleteProduct(evt.target);
            }
        })
    }

    addProduct(prod){
        promiseRequest("https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/addToBasket.json")
            .then((data) => {
                if (JSON.parse(data).result === 1) {
                    const targetCartItem = this._getItemById(prod.dataset["id"]);
            
                    if (targetCartItem) targetCartItem.increaseQuantity();
                    else this.productList.push(new CartItem(prod.dataset));
                        
                    if (this.opened) this._render();
                }
            })
            .catch((errStatus) => {
                console.log (`Не удалось добавить товар в корзину по причине: ${errStatus}`)
            })
    }
    
    deleteProduct(prod){
        promiseRequest("https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/deleteFromBasket.json")
            .then((data) => {
                if (JSON.parse(data).result === 1) {
                    const targetCartItem = this._getItemById(prod.dataset["id"]);

                    if (targetCartItem){
                        if (targetCartItem.quantity === 1) this.productList = this.productList.filter(item => item.id !== prod.dataset["id"]);
                        else targetCartItem.decreaseQuantity();

                        if (this.opened) this._render();
                    }
                }
            })
            .catch((errStatus) => {
                console.log (`Не удалось удалить товар из корзины по причине: ${errStatus}`)
            })
    }

    _getItemById(id){
        try{
            return this.productList.filter(item => item.id === id)[0];
        } catch {
            return undefined;
        }
    }

    _switchCart(){
        if (this.opened) {
            document.querySelector(this.container).classList.add("invisible");
            this.opened = false;
        }
        else {
            this._render();
            document.querySelector(this.container).classList.remove("invisible");
            this.opened = true;
        }
    }

    _render(){
        let cartPlot = '';
        
        this.productList.forEach(el => {
            cartPlot += el.render();
        });

        document.querySelector(this.container).innerHTML = cartPlot;
    }
}

class CartItem {
    constructor(prod){
        this.id = prod.id.toString();
        this.image = cartImage;
        this.name = prod.name;
        this.quantity = prod.hasOwnProperty("quantity") ? prod.quantity : 1;
        this.price = prod.price;
    }

    increaseQuantity(){
        this.quantity++;
    }

    decreaseQuantity(){
        this.quantity--;
    }

    render(){
        return `<div class="cart-item" data-id="${this.id}">
                    <div class="product-bio">
                        <img src="${this.image}" alt="Some image">
                        <div class="product-desc">
                            <p class="product-title">${this.name}</p>
                            <p class="product-price">${this.quantity * this.price}</p>
                            <p class="product-quantity">Quantity: ${this.quantity}</p>
                            <p class="product-single-price">$${this.price} each</p>
                        </div>
                    </div>
                    <div class="right-block">
                        <button class="del-btn" data-id="${this.id}">&times;</button>
                    </div>
                </div>`
    }
}

let catalog = new Catalog ()
let cart = new Cart ()


//создание массива объектов - имитация загрузки данных с сервера
function fetchData (catalog) {
    promiseRequest("https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/catalogData.json")
        .then((data) => {
            JSON.parse(data).forEach (el => {
                catalog.products.push (new Product (el))
            })
            catalog.render ()
        })
        .catch((errStatus) => {
            console.log (`Запрос списка товаров завершился ошибкой: ${errStatus}`)
        });
};

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