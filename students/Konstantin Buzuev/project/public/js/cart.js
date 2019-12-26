Vue.component('cart', {
    props: {
        items: Array
    },
    data() {
        return {
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
            this.items.forEach(item => {
                sum += item.price * item.quantity
            })
            return sum
        },
        isFilled: function () {
            if (this.items.length === 0) this.isHidden = true
            return (this.items.length === 0) ? false : true
        }
    },
    created() {
        eventBus.$on("put-to-cart", (prod) => {
            let inputProduct = this.items.find(item => item.id === prod.id)
            if (inputProduct !== undefined) {
                eventBus.$emit("put", prod.id, 1)
            } else eventBus.$emit("post", prod)
        })
        eventBus.$on("remove-from-cart", (prod) => {
            let inputProduct = this.items.find(item => item.id === prod.id)
            if (inputProduct.quantity > 1) {
                eventBus.$emit("put", prod.id, -1)
            } else eventBus.$emit("delete", prod.id)
        })
    },
    mounted() {
        eventBus.$emit("get-cart")
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
                   v-for="item in items" 
                   v-bind:product="item">
               </cart-item>
               <hr>
               <div class="cart__total"
               v-bind:class="{ cart_hidden: isHidden}">ИТОГО: {{totalCost}}</div>
           </div>
       </div>
       `
})