Vue.component("cart", {
  data() {
    return {
      urlBasketData: "getBasket.json",
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
      this.$root.getJson(this.urlBasketData).then(data => {
        this.vItems = data.contents;
      });
    },
    addItemToCart(event) {
      let id = +event.target.dataset["id"];
      let find = this.getItemInCartById(id);
      if (find) {
        find.quantity++;
      } else {
        this.cart.vItems.push(
          new CartItem({
            id: +event.target.dataset["id"],
            title: `${event.target.dataset["name"]}`,
            price: `${event.target.dataset["price"]}`,
            quantity: 1,
          })
        );
      }
    },
    delItemFromCart(event) {
      let id = +event.target.dataset["id"];
      let find = this.getItemInCartById(id);
      if (--find.quantity < 1) {
        this.cart.vItems.splice(this.cart.vItems.indexOf(find), 1);
      }
    },
    getItemInCartById(id) {
      let find = this.cart.vItems.find(item => +item.id === id);
      return find;
    },
  },
  mounted() {
    this.fetchDataToCart();
  },
  template: `
  <div class="cart">
    <button class="btn-cart" type="button" @click="toggleCartVisibility">Корзина</button>
    <div class="cart-block" v-show="this.isVisible">
        <cart-item class="cart-item" v-for="item in vItems" :item="item" :img="imageCart">
        </cart-item>
    </div>
  </div>
  `
});

// template: `
//   <div class="cart">
//     <form action="#" class="search-form">
//       <button class="btn-search" type="submit">
//         <i class="fas fa-search"></i>
//       </button>
//     </form>
//     <button class="btn-cart" type="button" @click="toggleCartVisibility">Корзина</button>
//     <div class="cart-block" v-show="$root.$refs.cart.isVisible">
//       <template v-if="cart.vItems.length > 0">
//         <div class="cart-item" v-for="item in $root.$refs.cart.vItems" :item:"item" :img="imageCart">
//         </div>
//       </template>
//       <div class="cart-empty" v-else>Cart is empty</div>
//     </div>
//   </div>
//   `