import cartItem from './CartItem'

let cart = {
    data () {
        return {
            items: [],
            api: '/cart',
            imgCart: 'https://placehold.it/100x80'
        }
    },
    methods: {
        addProduct (product) {
            let find = this.items.find (item => item.id_product === product.id_product)
            if (!find) {
                this.$parent.postJson(this.api, product)
                    .then(answer => {
                        if (answer.result) {
                            this.items.push (Object.assign ({}, product, {quantity: 1}))
                        } else {
                            this.$root.$refs.errorComp.error('Не удалось добавить товар в корзину')
                        }
                    })
            } else {
                this.$parent.putJson(`${this.api}/${product.id_product}`, {operation: 1})
                    .then(answer => {
                        if (answer.result) {
                            find.quantity ++
                        } else {
                            this.$root.$refs.errorComp.error('Не удалось добавить товар в корзину')
                        }
                    })
            }
        },
        delProduct (product) {
            let find = this.items.find (item => item.id_product === product.id_product)
            if (find.quantity === 1) {
                this.$parent.deleteJson(`${this.api}/${product.id_product}`)
                    .then(answer => {
                        if (answer.result) {
                            this.items.splice (this.items.indexOf (product), 1)
                        } else {
                            this.$root.$refs.errorComp.error('Не удалось удалить товар из корзины')
                        }
                    })
            } else {
                this.$parent.putJson(`${this.api}/${product.id_product}`, {operation: -1})
                    .then(answer => {
                        if (answer.result) {
                            find.quantity --
                        } else {
                            this.$root.$refs.errorComp.error('Не удалось удалить товар из корзины')
                        }
                    })
            }
        }
    },
    mounted () {
        this.$parent.getJson (this.api)
            .then (data => this.items = data.contents)
    },
    template: `
    <div class="cart-block">
        <cart-item v-for="item of items" :key="item.id_product" :img="imgCart" :item="item"></cart-item>
    </div>
    `,
    components: {
        'cart-item': cartItem
    }
}

export default cart