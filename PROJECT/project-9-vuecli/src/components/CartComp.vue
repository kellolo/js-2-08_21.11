<template>
  <div>
        <button class="btn-cart" type="button" @click="showCart = !showCart">Корзина</button>
        <div class="cart-block" v-show="showCart">
            <p v-if="!cartItems.length">Cart is empty</p>
            <cart-item 
            v-for="product of cartItems"  
            :key="product.id_product"
            :img="imgCart"
            :cart-item="product"></cart-item>
        </div>
    </div>
</template>

<script>
import cartItem from './CartItem.vue'
export default {
    data: function () {
        return {
            cartItems: [],
            imgCart: 'https://placehold.it/50x100',
            cartUrl: '/getBasket.json',
            showCart: false
        }
    },
    components: {
        'cart-item': cartItem
    },
    mounted () {
        this.$parent.getJson(`api/cart`)
            .then(data => {
                for(let el of data.contents){
                    this.cartItems.push(el);
                }
            })
    },
    methods: {
        addProduct(product){
            let find = this.cartItems.find(el => el.id_product === product.id_product)

            if (find) {
                //put
                this.$parent.putJson (`/api/cart/${find.id_product}`, {quantity: 1})
                    .then (data => {
                        if (data.result) {
                            find.quantity++
                        }
                    })
            } else {
                //post
                let prod = Object.assign({quantity: 1}, product)
                this.$parent.postJson ('/api/cart', prod)
                    .then (data => {
                        if (data.result) {
                            this.cartItems.push (prod)
                        }
                    })
            }
        },

        remove (product) {
            let find = this.cartItems.find(el => el.id_product === product.id_product)

            if (find.quantity > 1) {
                //put
                this.$parent.putJson (`/api/cart/${find.id_product}`, {quantity: -1})
                    .then (data => {
                        if (data.result) {
                            find.quantity--
                        }
                    })
            } else {
                //delete
                this.$parent.deleteJson (`/api/cart/${product.id_product}`)
                    .then (data => {
                        if (data.result) {
                            this.cartItems.splice(this.cartItems.indexOf(product), 1);
                        }
                    })
            }
        }
    }
}
</script>

<style>

</style>