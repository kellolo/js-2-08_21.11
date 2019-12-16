Vue.component ('cart', {
    data () {
        return {
            cartImage: 'https://placehold.it/100x80',
            cartUrl: '/getBasket.json',
            addBasket: '/addToBasket.json',
            delBasket: '/deleteFromBasket.json',
            cart: [],
            cartFilter: [],
            isVisible: false
        }
    },
    mounted () {
        this.$parent.getJson (this.cartUrl)
            .then (data => this.cart = data.contents)
    },
    methods: {
        addProduct (product) {
            this.$parent.getJson (this.addBasket)
                .then (data => {
                    if(data.result) {
                        let find = this.cartFilter.find (element => element.id_product === product.id_product);
                        if (!find) {
                            let el = this.cart.find(good => good.id_product === product.id_product)
                            this.cartFilter.push(el)
                        } else {                          
                            find.quantity++
                        }
                    }
                })
         },
        delProduct (product) {
            this.$parent.getJson (this.delBasket)
                .then (data => {
                    if(data.result) {
                            let find = this.cartFilter.find (element => element.id_product === product.id_product);
                                if (find.quantity > 1) {
                                    find.quantity--;
                                    } else {
                                        this.cartFilter.splice(this.cartFilter.indexOf(find), 1);
                                    }
                        }
                })
            },
        visible () {
            this.isVisible = !this.isVisible
        },

   },
    template: `
    <div class="cart">
    <button class="btn-cart" type="button" @click="visible">Корзина</button>
    <div class="cart-block" v-show="isVisible">
    
    <cart-item v-for="product of cartFilter" :item="product" :imgProp="cartImage"></cart-item>
    </div>
    </div>
`

})