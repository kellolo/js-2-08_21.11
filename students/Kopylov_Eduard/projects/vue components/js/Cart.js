Vue.component ('cart', {
    data () {
        return {
            GetBasket: '/getBasket.json',
            cartImage : 'https://placehold.it/100x80',
            items: [],
            addBasket: 'f',
            removeBasket: '',
        }
    },

    mounted () {
        this.$parent.getJson (this.GetBasket)
            .then (data => 
                {this.items = data})
            
    },
    methods: {
        addProduct (product) {
            console.log (`Куплен ${product.product_name}`)
           
        }
    },
    template: `
    <div class="cart-block invisible">
      <cart-item v-for="product of items" :item="product" :imgProp="cartImage"></cart-item>
    </div>
    `
})