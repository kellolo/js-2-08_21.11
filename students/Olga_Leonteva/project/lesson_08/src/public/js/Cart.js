import cartItem from "./CartItem"

let cart = {
    data () {
        return {
            cartImage: 'https://placehold.it/100x80',
            //cartUrl: '/getBasket.json',
            addBasket: '/addToBasket.json',
            delBasket: '/deleteFromBasket.json',
            items: [],
            //cartFilter: [],
            isVisible: false
        }
    },
    mounted () {
        this.$parent.getJson ('/cart')
            .then (data => this.items = data.contents)
    },
    methods: {
        addProduct (product) {
            let find = this.items.find (item => item.id_product === product.id_product)
            if (find) {
                this.$parent.putJson ('/cart/' + product.id_product, {op: 1})
                .then (answer => {
                    if (answer) {
                        find.quantity ++
                    }
                })
            } else {
                 this.$parent.postJson ('/cart', product)
                    .then (answer => {
                        if (answer) {
                            this.items.push (Object.assign ({}, product, {quantity: 1}))
                        }
                    })
            }
         },
       delProduct (product) {
        let find = this.items.find (item => item.id_product === product.id_product)
        if (find.quantity > 1) {
            this.$parent.putJson ('/cart/' + product.id_product, {op: -1})
            .then (answer => {
                if (answer) {
                    find.quantity --
                }
            })
        } else {
             this.$parent.delJson ('/cart/' + product.id_product)
                .then (answer => {
                    if (answer) {
                        this.items.splice (this.items.indexOf(product), 1)
                    }
                })
        }
            },
        visible () {
            this.isVisible = !this.isVisible
        },

   },
    template: `
    <div class="cart">
    <button class="btn-cart" type="button" @click="visible">Корзина</button>
    <div class="cart-block" v-show="isVisible">
    
    <cart-item v-for="product of items" :item="product" :imgProp="cartImage"></cart-item>
    </div>
    </div>
`,
components: {
'cart-item': cartItem
}
}

export default cart