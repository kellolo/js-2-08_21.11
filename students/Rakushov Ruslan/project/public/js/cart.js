Vue.component("cart", {
  data: function() {
    return {
      urlBasketData: "/getBasket.json",
      urlBasketAdd: "/addToBasket.json",
      imageCart: "https://placehold.it/100x80",
      isVisible: false,
      vItems: [],
      totalSum: 0,
    };
  },
  methods: {
    toggleCartVisibility() {
      this.isVisible = !this.isVisible;
    },
    fetchDataToCart() {
      this.$root.getJson(this.urlBasketData)
        .then(data => {
          this.vItems = data.contents;
        });
    },
    addItemToCart(event) {
      this.$root.postReq(this.urlBasketAdd, event.target)
        .then(
          data => console.log(data),
          error => console.log(error)
        );

      let id = +event.target.dataset["id"];
      let find = this.getItemInCartById(id);
      if (find) {
        find.quantity++;
      } else {
        this.vItems.push({
          id: +event.target.dataset["id"],
          title: `${event.target.dataset["name"]}`,
          price: `${event.target.dataset["price"]}`,
          quantity: 1,
        });
      }
    },
    delItemFromCart(event) {
      let id = +event.target.dataset["id"];
      let find = this.getItemInCartById(id);
      if (--find.quantity < 1) {
        this.vItems.splice(this.vItems.indexOf(find), 1);
      }
    },
    getItemInCartById(id) {
      let find = this.vItems.find(item => +item.id === id);
      return find;
    },
  },
  mounted() {
    this.fetchDataToCart();
  },
  template: `
  <div class="cart">
    <search></search>
    <button class="btn-cart" type="button" @click="toggleCartVisibility">Корзина</button>
    <div class="cart-block" v-show="this.isVisible">
        <cart-item class="cart-item" v-for="item in vItems" :item="item" :img="imageCart" :key="item.id">
        </cart-item>
    </div>
  </div>
  `,
});
