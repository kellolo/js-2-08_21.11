//заглушки (имитация базы данных)
const image = 'https://placehold.it/200x150';
const cartImage = 'https://placehold.it/100x80';
const items = ['Notebook', 'Display', 'Keyboard', 'Mouse', 'Phones', 'Router', 'USB-camera', 'Gamepad'];
const prices = [1000, 200, 20, 10, 25, 30, 18, 24];
const ids = [1, 2, 3, 4, 5, 6, 7, 8];
const API_URL = 'https://raw.githubusercontent.com/izumpazik/js-2-08_21.11/master/students/Valeria%20Manannikova/project';


//глобальные сущности корзины и каталога (ИМИТАЦИЯ! НЕЛЬЗЯ ТАК ДЕЛАТЬ!)
//var userCart = [];
//var list = fetchData ();

function makeGETRequest(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        callback(xhr.responseText);
      }
    }
    xhr.open('GET', url, true);
    xhr.send();
  }


class Catalog {
constructor () {
    this.products = []
    this.fetchData ()
}
    fetchData(cb) {
    makeGETRequest(`${API_URL}/catalog.json`, (prod) => {
      this.products = JSON.parse(prod)
      cb()
    })
  }
    render() {
    let listHtml = ''
    this.products.forEach(prod => {
      const prodItem = new Product (prod)
      listHtml += prodItem.render()
    })
    document.querySelector('.products').innerHTML = listHtml
  }
}

class Product {
    constructor (prod) {
        this.id = prod.id
        this.product_name = prod.product_name
        this.price = prod.price
        this.img = prod.img
    }
    render () {
                return `<div class="product-item" data-id="${this.id}">
                        <img src="http://eurofinance.com.ua/wp-content/uploads/2015/11/tech-01.png" alt="Someimg">
                        <div class="desc">
                            <h3>${this.product_name}</h3>
                            <p>${this.price} $</p>
                            <button class="buy-btn" 
                            data-id="${this.id}"
                            data-name="${this.product_name}"
                            data-image="${this.img}"
                            data-price="${this.price}">Купить</button>
                        </div>
                    </div>`
            }
    }

class Cart {
    constructor () {
                this.userCart = []
                this.container = '.cart-block invisible'
                this._init ()
                this.addProd ()
                this.removeProd ()
           }
        _init () {
            list.forEach(el => {
                this.userCart.push (new CartItem (el))
            })
            this.render()
        }
        render () {
            let trg = document.querySelector(this.container)
            let str = ''
            userCart.forEach(prod => {
                str += prod.render ()
          })
          trg.innerHTML = str
          }
         addProd (product) {
            let productId = +product.dataset['id'];
            let find = this.userCart.find (element => element.id === productId);
                if (!find) {
                     this.userCart.push ({
                         name: product.dataset ['name'],
                         id: productId,
                         img: cartImage,
                         price: +product.dataset['price'],
                         quantity: 1
                         })
                    }  else {
        find.quantity++
    }
    render ()
         }
         removeProd (product) {
            let productId = +product.dataset['id'];
            let find = this.userCart.find (element => element.id === productId);
                if (find.quantity > 1) {
                    find.quantity--;
                } else {
                    this.userCart.splice(userCart.indexOf(find), 1);
                    document.querySelector(`.cart-item[data-id="${productId}"]`).remove()
                }
                render ();
            }
}

class  CartItem {
    constructor (item) {
        this.id = item.id
        this.title = item.title
        this.price = item.price
        this.img = item.img
        this.quantity = item.quantity
    }
render () {
    return `<div class="cart-item" data-id="${el.id}">
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
}

const catalog = new Catalog();
catalog.fetchData(() => {
    catalog.render();
});

const cart = new Cart ();

//кнопка скрытия и показа корзины
document.querySelector('.btn-cart').addEventListener('click', () => {
    document.querySelector('.cart-block').classList.toggle('invisible');
})
//кнопки удаления товара (добавляется один раз)
document.querySelector('.cart-block').addEventListener ('click', (evt) => {
    if (evt.target.classList.contains ('del-btn')) {
        Cart.removeProd (evt.target);
    }
})
//кнопки покупки товара (добавляется один раз)
document.querySelector('.products').addEventListener ('click', (evt) => {
    if (evt.target.classList.contains ('buy-btn')) {
        cart.addProd (evt.target);
    }
})



//рендер списка товаров (каталога)

//CART

// Добавление продуктов в корзину
// function addProduct (product) {
    // let productId = +product.dataset['id'];
    // let find = userCart.find (element => element.id === productId);
    // if (!find) {
    //     userCart.push ({
    //         name: product.dataset ['name'],
    //         id: productId,
    //         img: cartImage,
    //         price: +product.dataset['price'],
    //         quantity: 1
    //     })
    // }  else {
    //     find.quantity++
    // }
    // renderCart ()
// }

//удаление товаров
// function removeProduct (product) {
//     let productId = +product.dataset['id'];
//     let find = userCart.find (element => element.id === productId);
//     if (find.quantity > 1) {
//         find.quantity--;
//     } else {
//         userCart.splice(userCart.indexOf(find), 1);
//         document.querySelector(`.cart-item[data-id="${productId}"]`).remove()
//     }
//     renderCart ();
// }

//перерендер корзины
// function renderCart () {
//     let allProducts = '';
//     for (el of userCart) {
//         allProducts += `<div class="cart-item" data-id="${el.id}">
//                             <div class="product-bio">
//                                 <img src="${el.img}" alt="Some image">
//                                <div class="product-desc">
//                                    <p class="product-title">${el.name}</p>
//                                     <p class="product-quantity">Quantity: ${el.quantity}</p>
//                                      <p class="product-single-price">$${el.price} each</p>
//                                  </div>
//                      </div>
//                            <div class="right-block">
//                                <p class="product-price">${el.quantity * el.price}</p>
//                                <button class="del-btn" data-id="${el.id}">&times;</button>
//                            </div>
//                         </div>`
//      }

//     document.querySelector(`.cart-block`).innerHTML = allProducts;
// }


  

