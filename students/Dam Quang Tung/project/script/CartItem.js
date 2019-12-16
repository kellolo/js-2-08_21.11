Vue.component ('cart-item', {
    data(){
        return {
            name: '',
            price: null,
            quantity: null,

        }

    },
    template: `
    <div class="cart-item">
                    <div class="product-bio">
                     <img :src="imgProp" alt="Some image">
                     <div class="product-desc">
                         <p class="product-title">{{item.product_name}}</p>
                         <p class="product-quantity">Quantity: {{item.quantity}}</p>
                         <p class="product-single-price">{{item.price}} rub. each</p>
                     </div>
                 </div>
                 <div class="right-block">
                     <p class="product-price">{{calc()}}</p>
                     <button class="del-btn" @click="$parent.delProduct(item)">&times;</button>
                 </div>
             </div>
    `,
    props: ['item', 'imgProp'],
    methods: {
        calc() {
            return this.price * this.item.quantity
        }

    },
    mounted() {
        this.name = this.item.product_name
        this.price = this.item.price
        this.quantity = this.item.quantity

    }
})