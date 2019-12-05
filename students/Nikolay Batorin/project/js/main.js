class CatalogView {
    constructor(products) {
        this.products = products;
    }
    render() {
        const str = this.products.map(this._renderProduct).join('');
        document.getElementById('products').innerHTML = str;
    }
    _renderProduct(product) {
        return `<div class="product-item">
                    <img src="${product.image}" alt="Some img">
                    <div class="desc">
                        <h3>${product.title}</h3>
                        <p>${product.price} $</p>
                        <button 
                            class="buy-btn" 
                            data-id="${product.id}"
                        >
                            Купить
                        </button>
                    </div>
                </div>`;
    }
}

class CartView {
    constructor(cart) {
        this.cart = cart;
    }
    render() {
        let markup = '';
        const cartElement = document.getElementById('cart');
        if (this.cart.isOpen) {
            markup = this.cart.items.map(this._renderCartItem).join('');
        }

        cartElement.innerHTML = `
            <button id="cart-btn" class="cart-btn" type="button">${this.getCartLabel()}</button>
            <div class="cart-block ${this.cart.isOpen ? "" : "invisible"}">${markup}</div>
        `;
    }
    getCartLabel() {
        return `Корзина - ${this.cart.getTotal()} $`;
    }
    _renderCartItem(cartItem) {
        return `<div class="cart-item">
                    <div class="product-bio">
                        <img src="${cartItem.product.smallImage}" alt="Some image">
                        <div class="product-desc">
                            <p class="product-title">${cartItem.product.title}</p>
                            <p class="product-quantity">Quantity: ${cartItem.quantity}</p>
                            <p class="product-single-price">$${cartItem.product.price} each</p>
                        </div>
                    </div>
                    <div class="right-block">
                        <p class="product-price">${cartItem.quantity * cartItem.product.price} $</p>
                        <button class="del-btn" data-id="${cartItem.product.id}">&times;</button>
                    </div>
                </div>
                <hr class="separator"/>`;
    }
}

class CartModel {
    constructor() {
        this.items = [];
        this.isOpen = false;
    }
    addItem(product) {
        const foundCartItem = this.items.find(item => item.product.id === product.id);
        if (foundCartItem) {
            foundCartItem.quantity++;
        } else {
            this.items.push(new CartItem(product));
        }
    }
    deleteItem(productId) {
        const foundCartItemIndex = this.items.findIndex(item => item.product.id === productId);
        if (--this.items[foundCartItemIndex].quantity === 0) {
            this.items.splice(foundCartItemIndex, 1);
        }
        if (this.items.length === 0) {
            this.isOpen = false;
        }
    }
    toggle() {
        if (this.items.length === 0) {
            return;
        }
        this.isOpen = !this.isOpen;
    }
    getTotal() {
        return this.items.reduce((total, nextCartItem) => total + nextCartItem.getCost(), 0);
    }
}

class CartItem {
    constructor(product) {
        this.product = product;
        this.quantity = 1;
    }

    getCost() {
        return this.product.price * this.quantity;
    }
}

class AppController {
    constructor() {
        this.productService = new ProductService();
        this.cart = new CartModel();
        /*
        this.cart = new CartService();   --- если корзину будем рисовать с бэка
        */
        document.getElementById("products").addEventListener("click", this.onBuyButtonClick);
        document.getElementById("cart").addEventListener("click", this.onCartButtonClick);
        document.getElementById("cart").addEventListener("click", this.onDeleteButtonClick);
        document.querySelector(".search-form").addEventListener("submit", this.onSearch);
    }
    showCatalog() {
        this.productService.getProducts()
            .then(products => new CatalogView(products).render());
    }
    onBuyButtonClick = (event) => {
        const element = event.target;
        if (element.classList.contains('buy-btn')) {
            const productId = +element.dataset.id;
            this.productService.getProductById(productId)
                .then(product => {
                    const result = new CartService().postBuyItemId(productId);
                    /* if (result) {      - если сервак принимает данные, то исполняем на фронте          */
                    this.cart.addItem(product);
                    this.showCart();
                    /* } */
                });
        }
    }
    onDeleteButtonClick = (event) => {
        const element = event.target;
        if (element.classList.contains('del-btn')) {
            const productId = +element.dataset.id;
            const result = new CartService().postDeteteItemId(productId);
            /* if (result) {      - если сервак принимает данные, то исполняем на фронте          */
            this.cart.deleteItem(productId);
            this.showCart();
            /* } */
        }
    }
    onCartButtonClick = (event) => {
        const element = event.target;
        if (element.classList.contains('cart-btn')) {
            this.cart.toggle();
            this.showCart();
        }
    }
    onSearch = () => {
        const searchText = document.querySelector(".search-field").value;
        if ((searchText || "").trim()) {
            this.productService.getProductsByName(searchText)
                .then(products => new CatalogView(products).render());
        } else {
            this.showCatalog();
        }

        return false;
    }
    showCart() {
        new CartView(this.cart).render();
        /*  
        отрисовка, если получаем корзину с бэка
        this.cart.getCart()
            .then(products => new CartView(products).render());
        */
    }

}

class ProductService {
    getProducts() {
        return fetch('https://raw.githubusercontent.com/batoxa/archive/master/js-2/json/goods.json')
            .then(response => response.json());
    }
    getProductById(id) {
        return this.getProducts()
            .then(products => products.find(product => product.id === id));
    }
    getProductsByName(name) {
        return this.getProducts()
            .then(products => products.filter(product => product.title.toLowerCase().includes(name.toLowerCase())));
    }
}
class CartService {
    getCart() {
        return fetch('http://JSON корзины')
            .then(response => response.json());
    }
    postBuyItemId(id) {
        const buyOrder = [id, "buy"];
        const result = false;
        let request = new XMLHttpRequest();
        request.open("POST", "http://JSON корзины");
        request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
        request.onreadystatechange = function() {
            console.log("request.readyState = ", request.readyState);
            if (request.readyState == 4 && request.status == 200) {
                request.send(buyOrder);
                result = true;
            }
        }
        console.log(buyOrder);
        return result;
    }
    postDeteteItemId(id) {
        const deleteOrder = [id, "delete"];
        let request = new XMLHttpRequest();
        request.open("POST", "http://JSON корзины");
        request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
        request.onreadystatechange = function() {
            if (request.readyState == 4 && request.status == 200) {
                request.send(deleteOrder);
                result = true;
            }
        }
        console.log(deleteOrder);
    }

}
const appController = new AppController();
document.addEventListener('DOMContentLoaded', () => {
    appController.showCatalog();
    appController.showCart();
});