Vue.component ('cart', {

  data () {
    return {
      imgSrc: 'https://placehold.it/100x80',
      cart: {
        amount:     0,
        countGoods: 0,
        contents:   []
      },
      isVisibleContents: false
    }
  },

  methods: {
    addGood(good) {
      let founded = this.cart.contents.find(g => g.id_product === good.id_product);
      
      if(!founded) {
        let newGood = Object.assign({}, good, {quantity: 1})
        this.$parent.requestData(`${query.basket.add}`, 'POST', newGood)
          .then(data => {
            if(this.$parent.error)
              this.$root.$refs.error.log(`Ошибка при добавлении товара.`)
            else {
              if(!data.result) {
                this.$root.$refs.error.log('Извините, этого товара больше нет в наличии.')
              } else { // success!
                this.cart.contents.push(newGood);
                this.cart.countGoods++;
                this.cart.amount += newGood.price;
              };
            };
          });
          
      } else { // founded
      
        this.$parent.requestData(`${query.basket.add}`, 'PUT', {id: good.id_product, quantity: 1})
          .then(data => {
            if(this.$parent.error)
              this.$root.$refs.error.log(`Ошибка при добавлении товара.`)
            else {
              if(!data.result) {
                this.$root.$refs.error.log('Извините, этого товара больше нет в наличии.')
              } else { // success!
              
                founded.quantity++;
                this.cart.countGoods++;
                this.cart.amount += good.price;
              };
            };
          });
      };
    },
    
    removeGood(good) {
      let founded = this.cart.contents.find(g => g.id_product === good.id_product);
      
      if(good.quantity > 1) { // single remove
        this.$parent.requestData(`${query.basket.remove}`, 'PUT', {id: good.id_product, quantity: 1})
          .then(data => {
            if(this.$parent.error)
              this.$root.$refs.error.log(`Ошибка при удалении товара.`)
            else {
              if(!data.result) {
               this.$root.$refs.error.log('Извините, что-то пошло не так. Попробуйте еще раз, или обратитесь в техподдержку.')
              } else { // success!
                founded.quantity--;
                this.cart.countGoods--;
                this.cart.amount -= good.price;
              };
            };
          });
      } else { // full remove
        this.$parent.requestData(`${query.basket.remove}`, 'DELETE', good)
          .then(data => {
            if(this.$parent.error)
              this.$root.$refs.error.log(`Ошибка при удалении товара.`)
            else {
              if(!data.result) {
               this.$root.$refs.error.log('Извините, что-то пошло не так. Попробуйте еще раз, или обратитесь в техподдержку.')
              } else { // success!
                this.cart.contents.splice(this.cart.contents.indexOf(founded), 1);
                this.cart.countGoods--;
                this.cart.amount -= good.price;
              };
            };
          });
      };
    },
    
    total() {
      this.cart.countGoods = this.cart.contents.reduce((total, g) => total + g.quantity, 0);
      if(!this.cart.countGoods)
        return  'При покупке двух товаров, третий — бесплатно!';
      this.cart.amount = this.cart.contents.reduce((total, g) => total + g.quantity * g.price, 0);
      return `<hr>всего товаров: <strong>${this.cart.countGoods}</strong>,<br>на сумму: <strong>${this.cart.amount}</strong> руб.`;
    }
  },

  mounted () {
    this.$parent.loadData(`${query.basket.get}`)
      .then(data => {
        if(this.$parent.error)
          this.$root.$refs.error.log(`Ошибка при загрузке товаров корзины.`)
        else {
          this.cart = data;
          this.cart.contents.forEach(g => g.img = this.imgSrc);
        };
      });
  },

  template: `
    <div class="cart-wrapper">
      <button class="btn-cart" type="button" @click="isVisibleContents = !isVisibleContents">Корзина</button>
      <div class="cart-block" v-if="isVisibleContents">
        <div v-if="cart.countGoods === 0">Ваша корзина пуста.</div>
        <cart-item v-else v-for="good in cart.contents" :good="good" :key="good.id_product" class="cart-item"></cart-item>
        <div class="cart-total" v-html="total()"></div>
      </div>
    </div>`
  
});
