Vue.component ('cart', {
    data () {
        return {
            items: [],
            cartUrl: '/getBasket.json',
            imgCart: 'https://placehold.it/100x80',
            addUrl: '/addToBasket.json',
            delUrl: '/deleteFromBasket.json',
            count: 0,
            visibil: false
        }
    },
    methods: {
        showCart () {
            this.visibil = !this.visibil
        },
        addProduct (product) {
            this.$parent.getJson (this.addUrl)
                .then (answer => {
                    if (answer.result) {
                        this.count++
                        let find = this.items.find (item => item.id_product === product.id_product)
                        if (find) {
                            find.quantity ++
                        } else {
                            this.items.push (Object.assign ({}, product, {quantity: 1}))
                        }
                    }
                })  
        },
        delProduct (product) {
            this.$parent.getJson (this.delUrl)
                .then (answer => {
                    if (answer.result) {
                        this.count--
                        let find = this.items.find (item => item.id_product === product.id_product)
                        if (find.quantity > 1) {
                            find.quantity --
                        } else {
                            let arr = this.items
                            arr.splice (arr.indexOf (product), 1)
                        }
                    }
                })  
        },
    },
    mounted () {
        this.$parent.getJson (this.cartUrl)
            .then (data => {
                this.items = data.contents
                this.items.forEach(item => {
                    this.count++
                })
            })
    },
    computed: {
        noCartItems () {
            return this.items.length == 0 
        }
    },
    template: `
    <span>
        <button class="btn-cart" type="button" @click="showCart">Корзина {{ count }} шт.</button>
        <div class="cart-block" v-show="visibil">
            <div class="empty" v-if="noCartItems">В корзине пусто</div>
            <cart-item v-for="item of items" :img="imgCart" :item="item"></cart-item>
        </div>
    </span>
    `
})