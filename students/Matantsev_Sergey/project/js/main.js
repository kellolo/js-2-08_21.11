let app = new Vue ({
  el: '#app',
  data: {
  },
  methods: {
      getJSON (url) {
          return fetch (url)
              .then (d => d.json ())
              .catch (err => {
                  console.log (err);
              });
      },
  }
});
//const log = console.log;
/******************************************************************************/
//const server = {
//  url:            'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses',
//  method:         'GET'
//};

//const query = {
//    catalog:      'catalogData.json',
//    basket: {
//      get:        'getBasket.json',
//      add:        'addToBasket.json',
//      remove:     'deleteFromBasket.json'
//    }
//  };
/******************************************************************************/
//const app = new Vue ({
//  el:   '#app',
//  data: {
//    imgSrc:         {good: 'https://placehold.it/200x150', cart: 'https://placehold.it/100x80'},
//    goods:          [],
//    filteredGoods:  [],
//    error:          false,
//    searchLine:     '',
//    cart:           {amount: 0, countGoods: 0, contents: []},
//    isVisibleCart:  false
//  },
//  methods: {
//    filter() {
//      const regExp = new RegExp(this.searchLine, 'i');
//      this.filteredGoods = this.goods.filter(g => regExp.test(g.product_name));
//    },
//    newFilter(e) {
//      e.preventDefault();
//      this.filter();
//   },
//    async loadData(url) {
//      try {
//        let response = await fetch(url);
//        return await response.json();
//      } catch(e) {this.error = e;};
//    },
//    addGood(good) {
//      this.loadData(`${server.url}/${query.basket.add}`)
//        .then(data => {
//          if(this.error)
//           console.error(`Ошибка при добавлении товара.`)
//          else {
//            if(!data.result) {
//             alert('Извините, этого товара нет в наличии.')
//            } else {
//              let founded = this.cart.contents.find(g => g.id_product === good.id_product);
//              if(!founded) {
//                good.quantity = 1;
//                this.cart.contents.push(good);
//              } else
//                founded.quantity++;
//              this.cart.countGoods++;
//              this.cart.amount += good.price;
//            };
//          };
//        });
//    },
//    removeGood(good) {
//      this.loadData(`${server.url}/${query.basket.remove}`)
//        .then(data => {
//          if(this.error)
//            console.error(`Ошибка при удалении товара.`)
//          else {
//            if(!data.result) {
//             alert('Извините, что-то пошло не так. Попробуйте еще раз, или обратитесь в техподдержку.')
//            } else {
//              let founded = this.cart.contents.find(g => g.id_product === good.id_product);
//              if(founded.quantity === 1) {
//                this.cart.contents.splice(this.cart.contents.indexOf(founded), 1);
//              } else
//                founded.quantity--;
//              this.cart.countGoods--;
//              this.cart.amount -= good.price;
//            };
//          };
//        });
//    },
//    cartTotal() {
//      this.cart.countGoods = this.cart.contents.reduce((total, g) => total + g.quantity, 0);
//      if(!this.cart.countGoods)
//        return  'Покупайте фирменные товары в нашем магазине';
//     this.cart.amount = this.cart.contents.reduce((total, g) => total + g.quantity * g.price, 0);
//      return `<hr>всего товаров: <strong>${this.cart.countGoods}</strong>,<br>на сумму: <strong>${this.cart.amount}</strong> руб.`;
//   }
//
//  },
//  mounted() {
//   this.loadData(`${server.url}/${query.catalog}`)
//      .then(data => {
//        if(this.error)
//          console.error(`Ошибка при загрузке товаров.`)
//        else {
//          data.forEach(d => {
//            d.img = this.imgSrc.good;
//            this.goods.push(d);
//          });
//          this.filter();
//        };
//      });
//    
//    this.loadData(`${server.url}/${query.basket.get}`)
//      .then(data => {
//        if(this.error)
//          console.error(`Ошибка при загрузке корзины.`)
//        else {
//          this.cart.amount = data.amount;
//          this.cart.countGoods = data.countGoods;
//          data.contents.forEach(d => {
//            d.img = this.imgSrc.cart;
//            this.cart.contents.push(d);
//          });
//        };
//      });
//}
//});