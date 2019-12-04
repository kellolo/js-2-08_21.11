//TODO Заменить заглушки изображений
//TODO Дописать makeGetRequestLong() как async (done), promise (done), fetch
//TODO Catalog.render() - обработка пустого каталога
//TODO Обработка ошибок получения данных в функциях makeGetRequest...

//заглушки (имитация базы данных)
const image = "https://placehold.it/200x150";
const imageCart = "https://placehold.it/100x80";

//Адрес api сервера (заглушки)
url = "https://raw.githubusercontent.com/rri9/js-2-08_21.11/" + "master/students/Rakushov%20Ruslan/Others/responses/";
// urlCatalogData =
//   "https://raw.githubusercontent.com/rri9/js-2-08_21.11/" +
//   "master/students/Rakushov%20Ruslan/Others/responses/catalogData.json";

class Catalog {
  constructor() {
    this.products = [];
    this.container = ".products";
    this.init();
  }
  init() {
    //this.getCatalogData();
    // makeGetRequest("catalogData.json").forEach(prod => {
    //   this.products.push(new Product(prod));
    // });

    // makeGetRequestLong("catalogData1.json", data => {
    //   if (data) {
    //     data.forEach(prod => this.products.push(new Product(prod)));
    //     this.render();
    //   }
    // });

    // makeGetRequestPromiseLong("catalogData.json")
    //   .then((data) => {
    //     if (data) {
    //       data.forEach(prod => this.products.push(new Product(prod)));
    //       this.render();
    //     }
    //   });

    makeGetRequestFetch("catalogData.json")
      .then(response => response.json())
      .then(data => {
        data.forEach(prod => this.products.push(new Product(prod)));
        this.render()
      })
  }
  // getCatalogData() {
  //   let xhr = new XMLHttpRequest();
  //   xhr.open("GET", urlCatalogData, false);
  //   xhr.send();
  //   if (xhr.readyState == 4 && xhr.status == 200) {
  //     JSON.parse(xhr.responseText).forEach(prod => {
  //       this.products.push(new Product(prod));
  //     });
  //   }
  // }
  render() {
    let trg = document.querySelector(this.container);
    if (this.products.length > 0) {
      let str = "";
      this.products.forEach(prod => {
        str += prod.render();
      });
      trg.innerHTML = str;
      this._listenToBuyBtnClick();
    } else {
      trg.innerHTML = '<div class="error-msg">There is no data on server</div>';
    }
  }
  _listenToBuyBtnClick() {
    document.querySelector(".products").addEventListener("click", evt => {
      if (evt.target.classList.contains("buy-btn")) {
        cart.addCartItem(evt.target); //TODO Вызывать через cart видимо не правильно!
      }
    });
  }
}

class Product {
  constructor(prod) {
    this.id = prod.id;
    this.title = prod.title;
    this.price = prod.price;
    // this.img = prod.img;
  }
  render() {
    return `<div class="product-item" data-id="${this.id}">
                    <img src="${image}" alt="Some img">
                    <div class="desc">
                        <h3>${this.title}</h3>
                        <p>${this.price} руб.</p>
                        <button class="buy-btn" 
                        data-id="${this.id}"
                        data-name="${this.title}"
                        data-image="${image}"
                        data-price="${this.price}">Купить</button>
                    </div>
                </div>`;
  }
}

class Cart {
  constructor() {
    this.products = [];
    this._listenToCartBtnClick();
    this._listenToCartDelBtnClick();
    this.render();
  }
  addCartItem(item) {
    let id = +item.dataset["id"];
    let curProd = this.getIteminCartById(id);
    if (!curProd) {
      let cartItem = new CartItem(item);
      this.products.push(cartItem);
      cartItem.quantity = 1;
      this.render();
    } else {
      curProd.quantity++;
    }
    this.render();
  }
  delCartItem(item) {
    let id = +item.dataset["id"];
    let curProd = this.getIteminCartById(id);
    if (curProd) {
      curProd.quantity--;
    }
    if (curProd.quantity < 1) {
      let curNode = document.querySelector(`.cart-item[data-id="${curProd.id}"]`);
      curNode.parentNode.removeChild(curNode);
      this.products.splice(this.products.indexOf(curProd), 1);
    }
    this.render();
  }
  render() {
    let strProducts = "";
    this.products.forEach(prod => {
      strProducts += `
      <div class="cart-item" data-id="${prod.id}">
        <div class="product-bio">
          <img src="${imageCart}" alt="Some image">
          <div class="product-desc">
            <p class="product-title">${prod.title}</p>
            <p class="product-quantity">Quantity: ${prod.quantity}</p>
            <p class="product-single-price">${prod.price} руб. each</p>
          </div>
        </div>
        <div class="right-block">
          <p class="product-price">${prod.quantity * prod.price}</p>
          <button class="del-btn" data-id="${prod.id}">&times;</button>
        </div>
      </div>`;
    });
    if (strProducts === "") {
      strProducts = "Cart is empty. Add some goods first!";
    }
    document.querySelector(".cart-block").innerHTML = strProducts;
  }
  getIteminCartById(id) {
    let find = this.products.find(prod => parseInt(prod.id) === id);
    return find;
  }
  _listenToCartBtnClick() {
    document.querySelector(".btn-cart").addEventListener("click", () => {
      document.querySelector(".cart-block").classList.toggle("invisible");
    });
  }
  _listenToCartDelBtnClick() {
    document.querySelector(".cart-block").addEventListener("click", evt => {
      if (evt.target.classList.contains("del-btn")) {
        cart.delCartItem(evt.target); //TODO Вызывать через cart видимо не правильно!
      }
    });
  }
}

class CartItem {
  constructor(prod) {
    this.id = prod.dataset["id"];
    this.title = prod.dataset["name"];
    this.price = prod.dataset["price"];
    // this.img = prod.img;
    this.quantity = 0;
  }
}

// //Try sync method
// function makeGetRequest(urlPostFix) {
//   let xhr = new XMLHttpRequest();
//   xhr.open("GET", url + urlPostFix, false);
//   xhr.send();
//   if (xhr.readyState == 4 && xhr.status == 200) {
//     return JSON.parse(xhr.responseText);
//   }
// }
// //Try async. setTimeout emulates long data downloading
// function makeGetRequestLong(urlPostFix, cb) {
//   setTimeout(function() {
//     let xhr = new XMLHttpRequest();
//     xhr.onreadystatechange = function() {
//       if (xhr.readyState == 4 && xhr.status == 200) {
//         cb(JSON.parse(xhr.responseText));
//       }
//     };
//     xhr.open("GET", url + urlPostFix, true);
//     xhr.send();
//   }, 1500);
// }
// //Try promise. setTimeout emulates long data downloading
// function makeGetRequestPromiseLong(urlPostFix) {
//   return new Promise((resolve, reject) => {
//     setTimeout(function() {
//       let xhr = new XMLHttpRequest();
//       xhr.onreadystatechange = function() {
//         if (xhr.readyState == 4 && xhr.status == 200) {
//           resolve(JSON.parse(xhr.responseText));
//         }
//       };
//       xhr.open("GET", url + urlPostFix, true);
//       xhr.send();
//     }, 3500);
//   });
// }
//Try fetch. //TODO Is it sync again (without await)?
// function makeGetRequestFetch(urlPostFix) {
//   return fetch(url + urlPostFix);
// }
function makeGetRequestFetch(urlPostFix) {
  setTimeout(function() {
    return fetch(url + urlPostFix);
  },3000);
}

//-----Start-----
let catalog = new Catalog();
let cart = new Cart();
