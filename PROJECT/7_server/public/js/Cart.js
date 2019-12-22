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
            let find = this.items.find (item => item.id_product === product.id_product)

            if (find) {
                this.$parent.putJson ('/cart/' + product.id_product, {op: 1})
                    .then (answ => {
                        if (answ) {
                            find.quantity++
                        }
                    })
            } else {
                this.$parent.postJson ('/cart', product)
                    .then (answ => {
                        if (answ) {
                            this.items.push (Object.assign ({}, product, {quantity: 1}))
                        }
                    })
            }
            
                // .then (answer => {
                //     if (answer.result) {
                        
                //         if (find) {
                //             find.quantity ++
                //         } else {
                            
                //         }
                //     }
                // })  
        },
        delProduct (product) {
            let find = this.items.find (item => item.id_product === product.id_product)

            if (find.quantity > 1) {
                this.$parent.putJson ('/cart/' + product.id_product, {op: -1})
                    .then (answ => {
                        if (answ) {
                            find.quantity--
                        }
                    })
            } else {
                this.$parent.deleteJson ('/cart/' + product.id_product)
                    .then (answ => {
                        if (answ) {
                            let arr = this.items
                            arr.splice (arr.indexOf (product), 1)
                        }
                    })
            }
            // this.$parent.getJson (this.delUrl)
            //     .then (answer => {
            //         if (answer.result) {
            //             let find = this.items.find (item => item.id_product === product.id_product)
            //             if (find.quantity > 1) {
            //                 this.$parent.putJson ('/cart/' + product.id_product, {op: -1})
            //                     .then (answ => {
            //                         if (answ) {
            //                             find.quantity--
            //                         }
            //                     })
            //             } else {
            //                 let arr = this.items
            //                 arr.splice (arr.indexOf (product), 1)
            //             }
            //         }
            //     })  
        },
    },
    mounted () {
        this.$parent.getJson ('/cart')
            .then (data => this.items = data.contents)
    },
    template: `
    <div class="cart-block">
        <cart-item v-for="item of items" :img="imgCart" :item="item"></cart-item>
    </div>
    `
})