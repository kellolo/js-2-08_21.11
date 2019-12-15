Vue.component ('cart', {
    data () {
        return {
            items: [],
            cartUrl: '/getBasket.json',
            imgCart: 'https://placehold.it/100x80',
            addUrl: '/addToBasket.json',
            delUrl: '/deleteFromBasket.json'
        }
    },
    methods: {
        addProduct (product) {
            this.$parent.getJson (this.addUrl)
                .then (answer => {
                    if (answer.result) {
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
            .then (data => this.items = data.contents)
    },
    template: `
    <div class="cart-block">
        <cart-item v-for="item of items" :img="imgCart" :item="item"></cart-item>
    </div>
    `
})