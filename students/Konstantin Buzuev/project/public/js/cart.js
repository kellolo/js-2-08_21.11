Vue.component('cart', {
    data() {
        return {
            cartItems: [],
            isHidden: true
        }
    },
    methods: {
        toggleCartShow: function () {
            if (!this.isFilled) this.isHidden = true
            else this.isHidden = !this.isHidden
        }
    },
    computed: {
        totalCost: function () {
            let sum = 0
            this.cartItems.forEach(item => {
                sum += item.price * item.quantity
            })
            return sum
        },
        isFilled: function () {
            if (this.cartItems.length === 0) this.isHidden = true
            return (this.cartItems.length === 0) ? false : true
        }
    },
    created() {
        eventBus.$on("put-to-cart", (prod) => {
            this.cartItems.push(prod)
        })
        eventBus.$on("clear-cart", () => {
            this.cartItems = []
        })
    },
    template: `<div class="cart">
           <button class="cart__button cart_empty" 
               v-bind:class="{ cart_filled: isFilled }"
               @click="toggleCartShow">
               <i class="fa fa-shopping-cart" aria-hidden="true"></i>
           </button>
           <div class="cart__wrap"
           v-bind:class="{ cart_hidden: isHidden}">
               <cart-item 
                   v-for="item in cartItems" 
                   v-bind:product="item">
               </cart-item>
               <hr>
               <div class="cart__total"
               v-bind:class="{ cart_hidden: isHidden}">ИТОГО: {{totalCost}}</div>
           </div>
       </div>
       `
})