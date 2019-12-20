const image = 'https://fainaidea.com/wp-content/uploads/2015/11/buy.jpg';
const cartImage = 'https://placehold.it/100x80';
const API_URL = 'https://raw.githubusercontent.com/izumpazik/js-2-08_21.11/master/students/Valeria%20Manannikova/project/catalog.json';
const GB_Fake_Api = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses'

class List {
constructor (url, container) {
    this.container = container
    this.url = url
    this.items = []
    this._init ()
}
     _init () {
        return false
     }
     getJSON (url) {
         return fetch (url)
                .then (d => d.json ())
     }
     handleData (arr) {
                arr.forEach(el => {
                    this.items.push (new lists [this.constructor.name] (el))
                }) 
     }
     _render () {
        let trg = document.querySelector(this.container);
        let str = '';
        this.items.forEach (item => {
            str += item.render()
        });
        trg.innerHTML = str;
     }
}
class Catalog extends List {
     constructor (cart, url = API_URL, container = '.products') {
              super (url, container)
              this.cart = cart
           }
     _init () {
        this.getJSON (this.url)
        .then (data => this.handleData (data))
        .then (() => this._render())
     }
    }

class Cart extends List {
    constructor (url, container= '.cart-block') {
        super (url, container)
        }
  _init () {
      this.getJSON (this.url)
      .then (data => this.handleData (data.contents))
      .then (() => this._render())
  }
  
addProduct (product) {
    this.getJSON (`${GB_Fake_Api}/addToBasket.json`)
        .then (data => {
            if (data.result) {
                let selectedProduct = {
                    'id_product': +product.dataset['id'],
                    'product_name': product.dataset['name'],
                    'price': +product.dataset['price'],
                    'quantity': 1
                }
                let find = this.items.find (element => element.id_product === selectedProduct.id_product)
                if (!find) {
                    this.items.push (new cartItem (selectedProduct))
                }  else {
                    find.quantity++
                }
                this._render();
            } 
            else {
                alert("Что-то пошло не так!")
            }
        })       
}
removeProduct (product) {
    this.getJSON (`${GB_Fake_Api}/deleteFromBasket.json`)
        .then (data => {
            if (data.result) {
                let productId = +product.dataset['id'];
                let find = this.items.find (element => element.id_product === productId);
                if (find.quantity > 1) {
                    find.quantity--;
                } else {
                    this.items.splice(this.items.indexOf(find), 1);
                    document.querySelector(`.cart-item[data-id="${productId}"]`).remove()
                }
                this._render();
            } else {
                alert("Что-то пошло не так!")
            }
        }) 
}
}

class Item {
    constructor (product, img = image) {
        this.id_product = product.id_product
        this.product_name = product.product_name
        this.price = product.price
        this.img = img
    }
    render () {
                return false
            }
}

class Product extends Item {
    constructor (product, img = image) {
        super (product, img)
    }
    render () {
        return `<div class="product-item" data-id="${this.id_product}">
                    <img src="${this.img}" alt="Some img">
                    <div class="desc">
                        <h3>${this.product_name}</h3>
                        <p>${this.price} rub.</p>
                        <button class="buy-btn" 
                        data-id="${this.id_product}"
                        data-name="${this.product_name}"
                        data-image="${this.img}"
                        data-price="${this.price}">Купить</button>
                    </div>
                </div>`
}}

class cartItem extends Item {
    constructor (product, img = cartImage) {
        super (product, img)
        this.quantity = product.quantity
        this.render()
    }
   render () {
       return `<div class="cart-item" data-id="${this.id_product}">
        <div class="product-bio">
            <img src="${this.img}" alt="image">
           <div class="product-desc">
               <p class="product-title">${this.product_name}</p>
                <p class="product-quantity">Quantity: ${this.quantity}</p>
                 <p class="product-single-price">${this.price} each</p>
             </div>
        </div>
       <div class="right-block">
           <p class="product-price">${this.quantity * this.price}</p>
           <button class="del-btn" data-id="${this.id_product}">&times;</button>
       </div>
    </div>`
    }
}

let lists = {
    Catalog: Product,
    Cart: cartItem
}

let catalog = new Catalog();

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

const app = new Vue({
    el: '#app',
    data: {
    },
    methods: {
      }
  })