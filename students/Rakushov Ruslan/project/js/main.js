//TODO Заменить заглушки изображений
//DONE Дописать makeGetRequestLong() как async (done), promise (done), fetch (done)
//DONE Catalog.render() - обработка пустого каталога
//TODO Обработка ошибок получения данных в функциях makeGetRequest...

//заглушки (имитация базы данных)
// const image = "https://placehold.it/200x150";
// const imageCart = "https://placehold.it/100x80";

//Адрес api сервера (заглушки)
// urlAPI =
//   "https://raw.githubusercontent.com/rri9/js-2-08_21.11/" +
//   "master/students/Rakushov%20Ruslan/Others/responses/";

class List {
  constructor(url, container) {
    this.url = urlAPI + url;
    this.container = container;
    this.items = [];
    this._init();
  }
  _init() {
    return false; //"Виртуальный" метод - переопределим в дочерних классах
  }
  getJson() {
    // return fetch(this.url).then(data => data.json());
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        //Simulate long data downloading
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
          if (xhr.readyState == 4 && xhr.status == 200) {
            resolve(JSON.parse(xhr.responseText));
          }
        };
        xhr.open("GET", this.url, true);
        xhr.send();
      }, 1500);
    });
  }
  render() {
    const block = document.querySelector(this.container);
    let str = "";
    let curProdList = this.filteredItems ? this.filteredItems : this.items;
    if (curProdList.length > 0) {
      str = curProdList.map(prod => prod.render()).join("");
    } else {
      str = '<div class="error-msg">There is no data</div>';
    }
    block.innerHTML = str;
  }
}

class Catalog extends List {
  constructor(url, container) {
    super(url, container);
    this.filteredItems = [];
  }
  _init() {
    this.getJson()
      .then(data =>
        data.forEach(item => {
          this.items.push(new Product(item));
        })
      )
      .then(() => {
        this.filteredItems = this.items;
        this.render();
        this._listenToBuyBtnClick();
        this._listenToSearchBtnClick();
      });
  }
  filterItems(searchString) {
    if (!searchString) {
      this.filteredItems = this.items;
    } else {
      let searchRegexp = new RegExp(`${searchString}+`, "gi");
      this.filteredItems = this.items.filter(item => searchRegexp.test(item.title));
    }
    this.render();
  }
  _listenToBuyBtnClick() {
    document.querySelector(".products").addEventListener("click", evt => {
      if (evt.target.classList.contains("buy-btn")) {
        cart.addCartItem(evt.target); //TODO Вызывать через cart видимо не правильно!
      }
    });
  }
  _listenToSearchBtnClick() {
    document.querySelector(".btn-search").addEventListener("click", evt => {
      let searchString = document.querySelector(".search-field").value;
      catalog.filterItems(searchString); //TODO Вызывать через catalog видимо не правильно!
    });
  }
}

class Cart extends List {
  _init() {
    this.getJson()
      .then(data =>
        data.contents.forEach(item => {
          this.items.push(new CartItem(item));
        })
      )
      .then(() => {
        this.render();
        this._listenToCartBtnClick();
        this._listenToCartDelBtnClick();
      });
  }
  _listenToCartBtnClick() {
    document.querySelector(".btn-cart").addEventListener("click", () => {
      document.querySelector(".cart-block").classList.toggle("invisible");
    });
  }
  _listenToCartDelBtnClick() {
    document.querySelector(".cart-block").addEventListener("click", evt => {
      if (evt.target.classList.contains("del-btn")) {
        cart.delCartItem(evt.target); //TODO Вызывать через cart видимо не правильно! В контроллер?
      }
    });
  }
  addCartItem(item) {
    let id = +item.dataset["id"];
    let curProd = this.getItemInCartById(id);
    if (!curProd) {
      let cartItem = new CartItem({
        id: `${item.dataset["id"]}`,
        title: `${item.dataset["name"]}`,
        price: `${item.dataset["price"]}`,
      });
      this.quantity = 0;
      this.items.push(cartItem);
      cartItem.quantity = 1;
      this.render();
    } else {
      curProd.quantity++;
    }
    this.render();
  }
  delCartItem(item) {
    let id = +item.dataset["id"];
    let curProd = this.getItemInCartById(id);
    if (curProd) {
      if (--curProd.quantity < 1) {
        let curNode = document.querySelector(`.cart-item[data-id="${curProd.id}"]`);
        curNode.parentNode.removeChild(curNode);
        this.items.splice(this.items.indexOf(curProd), 1);
      }
      this.render();
    }
  }
  getItemInCartById(id) {
    let find = this.items.find(prod => parseInt(prod.id) === id);
    return find;
  }
}

class Item {
  constructor(item) {
    this.id = item.id;
    this.title = item.title;
    this.price = item.price;
  }
  render() {
    return false;
  }
}

class Product extends Item {
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

class CartItem extends Item {
  constructor(item) {
    super(item);
    this.quantity = item.quantity;
  }
  render() {
    return `
      <div class="cart-item" data-id="${this.id}">
        <div class="product-bio">
          <img src="${imageCart}" alt="Some image">
          <div class="product-desc">
            <p class="product-title">${this.title}</p>
            <p class="product-quantity">Quantity: ${this.quantity}</p>
            <p class="product-single-price">${this.price} руб. each</p>
          </div>
        </div>
        <div class="right-block">
          <p class="product-price">${this.quantity * this.price}</p>
          <button class="del-btn" data-id="${this.id}">&times;</button>
        </div>
      </div>`;
  }
}

// class Catalog {
//   constructor() {
//     this.products = [];
//     this.container = ".products";
//     this.init();
//   }
//   init() {
//     //this.getCatalogData();
//     // makeGetRequest("catalogData.json").forEach(prod => {
//     //   this.products.push(new Product(prod));
//     // });

//     // makeGetRequestLong("catalogData1.json", data => {
//     //   if (data) {
//     //     data.forEach(prod => this.products.push(new Product(prod)));
//     //     this.render();
//     //   }
//     // });

//     makeGetRequestPromiseLong("catalogData.json")
//       .then(data => {
//         if (data) {
//           data.forEach(prod => this.products.push(new Product(prod)));
//           // this.render(); //TODO Где лучше вызывать рендер: тут или в новом .then?
//         }
//       })
//       .then(() => this.render());

//     // makeGetRequestFetch("catalogData.json")
//     //   .then(response => response.json())
//     //   .then(data => {
//     //     data.forEach(prod => this.products.push(new Product(prod)));
//     //     this.render()
//     //   })
//   }
//   //Try sync
//   // getCatalogData() {
//   //   let xhr = new XMLHttpRequest();
//   //   xhr.open("GET", urlCatalogData, false);
//   //   xhr.send();
//   //   if (xhr.readyState == 4 && xhr.status == 200) {
//   //     JSON.parse(xhr.responseText).forEach(prod => {
//   //       this.products.push(new Product(prod));
//   //     });
//   //   }
//   // }
//   render() {
//     let trg = document.querySelector(this.container);
//     if (this.products.length > 0) {
//       // let str = "";
//       // this.products.forEach(prod => {
//       //   str += prod.render();
//       // });
//       let str = this.products.map(prod => prod.render()).join("");
//       trg.innerHTML = str;
//       this._listenToBuyBtnClick();
//     } else {
//       trg.innerHTML = '<div class="error-msg">There is no data on server</div>';
//     }
//   }
//   _listenToBuyBtnClick() {
//     document.querySelector(".products").addEventListener("click", evt => {
//       if (evt.target.classList.contains("buy-btn")) {
//         cart.addCartItem(evt.target); //TODO Вызывать через cart видимо не правильно!
//       }
//     });
//   }
// }

// class Cart {
//   constructor() {
//     this.products = [];
//     this._listenToCartBtnClick();
//     this._listenToCartDelBtnClick();
//     this.render();
//   }
//   addCartItem(item) {
//     let id = +item.dataset["id"];
//     let curProd = this.getIteminCartById(id);
//     if (!curProd) {
//       let cartItem = new CartItem(item);
//       this.products.push(cartItem);
//       cartItem.quantity = 1;
//       this.render();
//     } else {
//       curProd.quantity++;
//     }
//     this.render();
//   }
//   delCartItem(item) {
//     let id = +item.dataset["id"];
//     let curProd = this.getIteminCartById(id);
//     if (curProd) {
//       //   curProd.quantity--;
//       // }
//       if (--curProd.quantity < 1) {
//         let curNode = document.querySelector(`.cart-item[data-id="${curProd.id}"]`);
//         curNode.parentNode.removeChild(curNode);
//         this.products.splice(this.products.indexOf(curProd), 1);
//       }
//       this.render();
//     }
//   }
//   render() {
//     // let strProducts = "";
//     // this.products.forEach(prod => {
//     //   strProducts += prod.render();
//     // });
//     let strProducts = this.products.map(prod => prod.render()).join("");
//     if (strProducts === "") {
//       strProducts = "Cart is empty. Add some goods first!";
//     }
//     document.querySelector(".cart-block").innerHTML = strProducts;
//   }
//   getIteminCartById(id) {
//     let find = this.products.find(prod => parseInt(prod.id) === id);
//     return find;
//   }
//   _listenToCartBtnClick() {
//     document.querySelector(".btn-cart").addEventListener("click", () => {
//       document.querySelector(".cart-block").classList.toggle("invisible");
//     });
//   }
//   _listenToCartDelBtnClick() {
//     document.querySelector(".cart-block").addEventListener("click", evt => {
//       if (evt.target.classList.contains("del-btn")) {
//         cart.delCartItem(evt.target); //TODO Вызывать через cart видимо не правильно! В контроллер?
//       }
//     });
//   }
// }

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

// // //Try promise. setTimeout emulates long data downloading
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

// //Try fetch. //TODO Is it sync again (without await)?
// function makeGetRequestFetch(urlPostFix) {
//   return fetch(url + urlPostFix);
// }
// function makeGetRequestFetch(urlPostFix) {
//   setTimeout(function() {
//     return fetch(url + urlPostFix);
//   },3000);
// }

//-----Start-----
// let catalog = new Catalog("catalogData.json", ".products");
// let cart = new Cart("getBasket.json", ".cart-block");
//TODO Add Controller class with Start and listeners adding functions (???)

//------------------------------------------------------------
//|--                          Vue                         --|
//------------------------------------------------------------

const app = new Vue({
  el: "#app",
  data: {
    shopName: "E-SHOP. developed with Vue",
    urlAPI:
      "https://raw.githubusercontent.com/rri9/js-2-08_21.11/" +
      "master/students/Rakushov%20Ruslan/Others/responses/",
    urlCatalogData: "catalogData.json",
    urlBasketData: "getBasket.json",
    image: "https://placehold.it/200x150",
    imageCart: "https://placehold.it/100x80",
    catalog: {
      vItems: [],
      vFilteredItems: [],
      vSearchString: "",
    },
    cart: {
      vItems: [],
      totalSum: 0,
    },
  },
  methods: {
    getJson(url) {
      // return fetch(this.url).then(data => data.json());
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          //Simulate long data downloading
          let xhr = new XMLHttpRequest();
          xhr.onreadystatechange = function() {
            if (xhr.readyState == 4 && xhr.status == 200) {
              resolve(JSON.parse(xhr.responseText));
            }
          };
          xhr.open("GET", url, true);
          xhr.send();
        }, 1500);
      });
    },
    filterItems() {
      let searchString = this.catalog.vSearchString;
      if (!searchString) {
        this.catalog.vFilteredItems = this.catalog.vItems;
      } else {
        let searchRegexp = new RegExp(`${searchString}+`, "gi");
        this.catalog.vFilteredItems = this.catalog.vItems.filter(item => searchRegexp.test(item.title));
      }
      
    }
  },
  computed: {},
  mounted() {
    this.getJson(this.urlAPI + this.urlCatalogData).then(data => {
      data.forEach(item => this.catalog.vItems.push(new Product(item)));
      this.catalog.vFilteredItems = this.catalog.vItems;
    });
  },
});
