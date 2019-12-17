Vue.component ('cart', {
    data () {
        return {
            items: [],
            api: '/cart',
            imgCart: 'https://placehold.it/100x80'
        }
    },
    methods: {
        addProduct (product) {
            let params = {
                method: 'put',
                body: JSON.stringify(product)
            }
            this.$parent.getJson (this.api, params)
                .then (answer => {
                    if (answer.result) {
                        let find = this.items.find (item => item.id_product === product.id_product)
                        if (find) {
                            find.quantity ++
                        } else {
                            this.items.push (Object.assign ({}, product, {quantity: 1}))
                        }
                    } else {
                        this.$root.$refs.errorComp.error('Не удалось добавить товар в корзину')
                    }
                })  
        },
        delProduct (product) {
            let params = {
                method: 'delete',
                body: JSON.stringify(product)
            }
            this.$parent.getJson (this.api, params)
                .then (answer => {
                    if (answer.result) {
                        let find = this.items.find (item => item.id_product === product.id_product)
                        if (find.quantity > 1) {
                            find.quantity --
                        } else {
                            let arr = this.items
                            arr.splice (arr.indexOf (product), 1)
                        }
                    } else {
                        this.$root.$refs.errorComp.error('Не удалось удалить товар из корзины')
                    }
                })  
        },
    },
    mounted () {
        this.$parent.getJson (this.api)
            .then (data => this.items = data.contents)
    },
    template: `
    <div class="cart-block">
        <cart-item v-for="item of items" :img="imgCart" :item="item"></cart-item>
    </div>
    `
})