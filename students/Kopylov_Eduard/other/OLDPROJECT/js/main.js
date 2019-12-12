//заглушки (имитация базы данных)
const image = 'https://placehold.it/200x150';
const cartImage = 'https://placehold.it/100x80';

const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/catalogData.json';
const MY_API = 'https://raw.githubusercontent.com/KPEKZ/DataBase/master/responses/catalogData.json'



     async function fetchRequest (url) {
            return fetch (url)
        }

        

class Catalog {
    constructor () {
        this.products = []
        this.container = '.products'
        this._init ()
    }
    _init () {


        fetchRequest (MY_API) 
            .then (dataJSON => dataJSON.json())
            .then (data => {

               data.forEach(el =>
                {
                    this.products.push(new Product(el))
                })
            })
            .then( (data) => this.render ())
            .catch (err => {
                console.log (err)
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
    //HW
    constructor ()
    {
        this.cartProducts = [];
        this.cartMain = '.cart-block';
        //this._init();
        
       
    }


        // Добавление продуктов в корзину
     addProduct (product) {
        let productId = +product.dataset['id']; //data-id="1"
        let find = this.cartProducts.find (element => element.id === productId); //товар или false
        if (!find) {
            this.cartProducts.push (new CartItem (product))
        }  else {
            find.quantity++
        }
        this.render()
        }


        //удаление товаров
        removeProduct (product) {
            let productId = +product.dataset['id'];
            let find = this.cartProducts.find (element => element.id === productId);
            if (find.quantity > 1) {
                find.quantity--;
            } else {
                this.cartProducts.splice(this.cartProducts.indexOf(find), 1);
                document.querySelector(`.cart-item[data-id="${productId}"]`).remove()
            }
            this.render();
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
        this.id = +cartProd.dataset['id']
        this.title = cartProd.dataset['name']
        this.price = +cartProd.dataset['price']
        this.img = cartImage
        this.quantity =1;
    }

    render()
    {
        let allProducts = '';
           
                allProducts += `<div class="cart-item" data-id="${this.id}">
                                    <div class="product-bio">
                                        <img src="${this.img}" alt="Some image">
                                        <div class="product-desc">
                                            <p class="product-title">${this.title}</p>
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
       carts.removeProduct (evt.target);
    }
})
// //кнопки покупки товара (добавляется один раз)
document.querySelector('.products').addEventListener ('click', (evt) => {
    if (evt.target.classList.contains ('buy-btn')) {
        carts.addProduct (evt.target);
    }
})




