Vue.component('cart', {
    data() {
        return {
            cartItems: [],
            aaa: 10
        }
    },
    methods: {
        removeItemFromCart: function (id) {
            let index = this.cartItems.findIndex(el => el.id === id)
            this.cartItems.splice(index, 1)
        },
        Console(n) {
            console.log(n)
        }
    },
    created() {
        eventBus.$on("add-item-to-cart", (prod) => {
            let product = this.cartItems.find(x => x.id === prod.id)
            if (product) product.quantity++
            else {
                Vue.set(prod, "quantity", 1)
                this.cartItems.push(prod)
            }
        })
    },
    template: `<div class="cartWrap">
                    <cart-item 
                        v-for="item in cartItems" 
                        v-bind:product="item" 
                        v-on:remove-from-cart="removeItemFromCart">
                    </cart-item>
                </div>
                `
})