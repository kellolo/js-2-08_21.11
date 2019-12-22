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
            this.$parent.getJson(this.addBasket)
                .then (data => {
                    if (data.result == 1) {
                        let find = this.cartFilter.find (element => element.id_product === product.id_product)
                        if (!find) {
                            let selectedProduct = {
                                'id_product': product.id_product,
                                'product_name': product.product_name,
                                'price': product.price,
                                'quantity': 1
                            }
                            this.cartFilter.push (selectedProduct)        
                        }  else {
                            find.quantity++
                        }
                    } 
                })
                .catch (error => console.log(`Не удалось выполнить запрос к серверу: ${error}`))
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