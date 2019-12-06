//заглушки (имитация базы данных)
const image = 'https://placehold.it/200x150';
const cartImage = 'https://placehold.it/100x80';
const items = ['Notebook', 'Display', 'Keyboard', 'Mouse', 'Phones', 'Router', 'USB-camera', 'Gamepad'];
const prices = [1000, 200, 20, 10, 25, 30, 18, 24];
const ids = [1, 2, 3, 4, 5, 6, 7, 8];


//глобальные сущности корзины и каталога (ИМИТАЦИЯ! НЕЛЬЗЯ ТАК ДЕЛАТЬ!)
var list = fetchData();


class Catalog {
    constructor() {
        this.products = []
        this.container = '.products'
        this._init()
    }
    _init() {
        list.forEach(el => {
            this.products.push(new Product(el))
        })
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
        this.id = prod.id;
        this.title = prod.title;
        this.price = prod.price;
        this.img = prod.img;
    }
    render() {
        return `<div class="product-item">
                    <img src="${this.img}" alt="Some img">
                    <div class="desc">
                        <h3>${this.title}</h3>
                        <p>${this.price} $</p>
                        <button 
                            class="buy-btn" 
                            data-id="${this.id}"
                        >
                            Купить
                        </button>
                    </div>
                </div>`
    }
}

class Cart {
    userCart = [];
    //HW
    addProduct(productId) {
        const product = list.find(product => product.id === productId);
        const foundCartItem = this.userCart.find(cartItem => cartItem.product.id === productId);
        if (!foundCartItem) {
            this.userCart.push(new CartItem(product, 1));
        } else {
            foundCartItem.quantity++;
        }
        this.renderCart()
    }

    //удаление товаров
    removeProduct(productId) {
        const foundCartItem = this.userCart.find(cartItem => cartItem.product.id === productId);
        if (foundCartItem.quantity > 1) {
            foundCartItem.quantity--;
        } else {
            this.userCart.splice(this.userCart.indexOf(foundCartItem), 1);
        }
        this.renderCart();
    }

    //перерендер корзины
    renderCart() {
        let allProducts = '';
        for (let cartItem of this.userCart) {
            allProducts += cartItem.render();
        }
        document.querySelector(`.cart-block`).innerHTML = allProducts;
    }
}

class CartItem {
    //HW
    constructor(product, quantity) {
        this.product = product;
        this.quantity = quantity;
    }
    render() {
        return `<div class="cart-item">
                    <div class="product-bio">
                        <img src="${cartImage}" alt="Some image">
                        <div class="product-desc">
                            <p class="product-title">${this.product.title}</p>
                            <p class="product-quantity">Quantity: ${this.quantity}</p>
                            <p class="product-single-price">$${this.product.price} each</p>
                        </div>
                    </div>
                    <div class="right-block">
                        <p class="product-price">${this.quantity * this.product.price} $</p>
                        <button class="del-btn" data-id="${this.product.id}">&times;</button>
                    </div>
                </div>`;
    }
}

let catalog = new Catalog();
const cart = new Cart();

// кнопка скрытия и показа корзины
document.querySelector('.btn-cart').addEventListener('click', () => {
    document.querySelector('.cart-block').classList.toggle('invisible');
});
//кнопки удаления товара (добавляется один раз)
document.querySelector('.cart-block').addEventListener('click', (evt) => {
        if (evt.target.classList.contains('del-btn')) {
            cart.removeProduct(+evt.target.dataset.id);
        }
    })
    //кнопки покупки товара (добавляется один раз)
document.querySelector('.products').addEventListener('click', (evt) => {
    if (evt.target.classList.contains('buy-btn')) {
        cart.addProduct(+evt.target.dataset.id);
    }
})

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