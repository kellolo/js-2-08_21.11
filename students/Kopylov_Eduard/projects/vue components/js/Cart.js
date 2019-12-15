Vue.component ('cart', {
    data () {
        return {
            GetBasket: '/getBasket.json',
            cartImage : 'https://placehold.it/100x80',
            items: [],
            addBasket: '/addToBasket.json',
            removeBasket: '/deleteFromBasket.json',
        }
    },

    mounted () {
        this.$parent.getJson (this.GetBasket)
            .then (data => 
                {this.items = data})
            
    },
    methods: {
        addProduct (product) {
            this.$parent.getJson (this.addBasket)
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
            this.$parent.getJson (this.removeBasket)
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
    template: `
    <div class="cart-block">
      <cart-item v-for="product of items" :item="product" :imgProp="cartImage"></cart-item>
    </div>
    `
})