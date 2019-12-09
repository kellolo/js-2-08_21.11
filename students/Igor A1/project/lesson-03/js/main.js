/******************************************************************************/
const server = {
  url:            'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses',
  //url:            'http://localhost:8080',
  method:         'GET'
};

const query = {
    catalog:      'catalogData.json',
    basket: {
      get:        'getBasket.json',
      add:        'addToBasket.json',
      remove:     'deleteFromBasket.json'
    }
  };
/******************************************************************************/
const log = console.log;

class GoodsItem {
    constructor (item, imgSrc) {
        this.id     = item.id_product;
        this.title  = item.product_name;
        this.price  = item.price;
        this.img    = imgSrc;
    };
    
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
                </div>`;
    };
};
//----------------------------------------------------------------------------//
class GoodsList {
    constructor (queryStr, imgSrc, container) {
      this.url = `${server.url}/${queryStr}`;
      this.imgSrc = imgSrc;
      this.container = container;
      this.goods = [];
      this._init();
    };
    
    async _init() {
      try {
        let data = await this.fetchData(this.url);
        data.forEach(d => this.goods.push(new GoodsItem(d, this.imgSrc)));
      } catch(e) {
        console.error('Ошибка при выполнении GoodsList._init', e);
      };
      this.render();
    };
    
    async fetchData(s) {
      try {
        let response = await fetch(s);
        return await response.json();
      } catch(e) {
        console.error('Ошибка при выполнении GoodsList.fetchData', e);
      };
    };
      
    render () {
        let s = '';
        let trg = document.querySelector (this.container);
        if(this.goods.length === 0)
          s = '<p style="font-size:18px;color:red;">' +
              'Не удалось загрузить список товаров.<br>' +
              'Зайдите позднее...</p>'
        else
          this.goods.forEach(g => s += g.render());
        trg.innerHTML = s;
    };
};
/******************************************************************************/
class CartItem {
    constructor (item, imgSrc) {
        this.id       = item.id_product;
        this.title    = item.product_name;
        this.price    = item.price;
        this.img      = imgSrc;
        this.quantity = item.quantity;
    };
    
    render() {
      return `<div class="cart-item" data-id="${this.id}">
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
              </div>`;
    };
};
//----------------------------------------------------------------------------//
class CartList {
    constructor (queryStr, imgSrc, container) {
      this.url = `${server.url}/${queryStr}`;
      this.imgSrc = imgSrc;
      this.container = document.querySelector(container);
      this.goods = [];
      this._init();
    };
    
    async _init() {
      try {
        let data = await this.fetchData(this.url);
        if(data.hasOwnProperty('contents'))
          data.contents.forEach(d => this.goods.push(new CartItem(d, this.imgSrc)));
      } catch(e) {
        console.error('Ошибка при выполнении CartList._init', e);
      };
      this.render();
      this._setupBtnClicks();
    };
    
    async fetchData(s) {
      try {
        let response = await fetch(s);
        return await response.json();
      } catch(e) {
        console.error('Ошибка при выполнении CartList.fetchData', e);
      };
    };
      
    _setupBtnClicks() {
      // кнопка скрытия и показа корзины
      document.querySelector('.btn-cart').addEventListener('click', 
        () => this.container.classList.toggle('invisible'));
      // кнопки покупки товара
      document.querySelector('.products').addEventListener ('click', 
        e => {
          if (e.target.classList.contains('buy-btn'))
            this.addItem(e.target);
        });
      // кнопки удаления товара
      this.container.addEventListener ('click', 
        e => {
          if (e.target.classList.contains('del-btn'))
            this.removeItem(+e.target.dataset['id']);
        });
    };
    
    render () {
        let s = '';
        if(this.goods.length > 0)
          this.goods.forEach(g => s += g.render());
        this.container.innerHTML = s;
    };
    
    _targetItem(elDOM) {
      return {
        id_product:     +elDOM.dataset['id'],
        product_name:   elDOM.dataset['name'],
        price:          +elDOM.dataset['price'],
        quantity:       1
      }
    };
    
    async addItem(elDOM) {
      let id = +elDOM.dataset['id'];
      try {
        let data = await this.fetchData(`${server.url}/${query.basket.add}`);
        if(data.result) {
          let founded = this.goods.find(item => item.id === id);
          if(!founded) {
            this.goods.push(new CartItem(this._targetItem(elDOM), this.imgSrc));
          } else
            founded.quantity++;
          this.render();
        };
      } catch(e) {
        console.error('Ошибка при выполнении CartList.addItem', e);
      };
        
    };
    
    async removeItem(id) {
      try {
        let data = await this.fetchData(`${server.url}/${query.basket.remove}`);
        if(data.result) {
          let founded = this.goods.find(item => item.id === id);
          if(founded.quantity > 1)
            founded.quantity--;
          else
            this.goods.splice(this.goods.indexOf(founded), 1);
          this.render();
        };
      } catch(e) {
        console.error('Ошибка при выполнении CartList.addItem', e);
      };
    };
};
////////////////////////////////////////////////////////////////////////////////
const catalog = new GoodsList(
        query.catalog, 
        'https://placehold.it/200x150', 
        '.products'
      ),
      cart = new CartList(
        query.basket.get, 
        'https://placehold.it/100x80', 
        '.cart-block'
      );
////////////////////////////////////////////////////////////////////////////////