//заглушки (имитация базы данных)
const image = 'https://placehold.it/200x150';
const cartImage = 'https://placehold.it/100x80';
const items = ['Notebook', 'Display', 'Keyboard', 'Mouse', 'Phones', 'Router', 'USB-camera', 'Gamepad'];
const prices = [1000, 200, 20, 10, 25, 30, 18, 24];
const ids = [1, 2, 3, 4, 5, 6, 7, 8];

//создание товара
function createProduct (i) {
    return {
        id: ids[i],
        title: items[i],
        price: prices[i],
        img: image,
    }
};

//создание массива объектов - имитация загрузки данных с сервера
function fetchData () {
    let arr = [];
    for (let i = 0; i < items.length; i++) {
        arr.push (createProduct (i));
    }
    return arr
};

/******************************************************************************/
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
//----------------------------------------------------------------------------//
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

/******************************************************************************/
class Cart {
    constructor() {
      this.items = [];
      this.container = document.querySelector('.cart-block');
      this._init();
    };
    
    _init() {
      // кнопка скрытия и показа корзины
      document.querySelector('.btn-cart').addEventListener('click', 
        () => this.container.classList.toggle('invisible'));
      // кнопки покупки товара
      document.querySelector('.products').addEventListener ('click', 
        e => {
          if (e.target.classList.contains('buy-btn'))
            this.addItem(+e.target.dataset['id']);
        });
      // кнопки удаления товара
      this.container.addEventListener ('click', 
        e => {
          if (e.target.classList.contains('del-btn'))
            this.removeItem(+e.target.dataset['id']);
        });
    };
    
    render() {
      let str = '';
      this.items.forEach(item => str += item.render());
      this.container.innerHTML = str
    };
    
    addItem(id) {
      let founded = this.items.find(item => item.product.id === id);
      if(!founded)
        this.items.push(new CartItem(id))
      else
        founded.quantity++;
      this.render();
    };
    
    removeItem(id) {
      let founded = this.items.find(item => item.product.id === id);
      if(founded.quantity > 1)
        founded.quantity--;
      else
        this.items.splice(this.items.indexOf(founded), 1);
      this.render();
    };
    
};
//----------------------------------------------------------------------------//
class CartItem {
    constructor(id) {
      this.product = catalog.products.find(p => p.id === id);
      this.quantity = 1;
    };
    
    render() {
      return `<div class="cart-item" data-id="${this.product.id}">
                <div class="product-bio">
                  <img src="${this.product.img}" alt="Some image">
                  <div class="product-desc">
                    <p class="product-title">${this.product.title}</p>
                    <p class="product-quantity">Quantity: ${this.quantity}</p>
                    <p class="product-single-price">$${this.product.price} each</p>
                  </div>
                </div>
                <div class="right-block">
                  <p class="product-price">${this.quantity * this.product.price}</p>
                  <button class="del-btn" data-id="${this.product.id}">&times;</button>
                </div>
              </div>`;
    };
};

////////////////////////////////////////////////////////////////////////////////
const list = fetchData();

const catalog = new Catalog(),
  cart = new Cart();
////////////////////////////////////////////////////////////////////////////////