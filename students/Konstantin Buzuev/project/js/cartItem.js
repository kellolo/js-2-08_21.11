Vue.component("cart-item", {
    props: {
        product: {
            id: Number,
            title: String,
            color: String,
            description: String,
            price: Number,
            characteristics: {
                "OS": String,
                "display": Number,
                "processor": String,
                "RAM": Number,
                "Video": String,
                "HDD": Number,
                "SSD": Number
            },
            imageURL: String,
            fullImageURL: String,
            summary: String,
            details: String,
            visible: Boolean,
            quantity: Number
        },
    },
    template: `<div class="cart-item">
                    <img :src="product.imageURL" alt="product.id" class="cart-item__icon">
                    <h2 class="cart-item__title">{{ product.characteristics.display }}" {{ product.title }}</h2>
                    <label class="cart-item__price">{{product.price}} руб.</label>
                    <label class = "cart-item__quantity"> {{product.quantity}} </label>
                    <button class="cart-item__delete-btn" @click="RemoveFromCart">
                        <i class="fa fa-trash" aria-hidden="true"></i>
                    </button>
                </div>`,
    methods: {
        RemoveFromCart: function () {
            this.$emit('remove-from-cart', this.product)
        }
    }
})
/*
Выпилено по замечанию SerT:
        methods:{
            AddtoCart() {
                this.product.quantity++
            },
            RemoveItem: function () {
                if (--this.product.quantity === 0) this.RemoveFromCart()

            },
        }
        template:  `<button class="cart-item__add-btn" v-on:click="AddtoCart">
                        <i class="fa fa-plus" aria-hidden="true"></i>
                    </button>
                    <button class="cart-item__remove-btn" @click="RemoveItem">
                        <i class="fa fa-minus" aria-hidden="true"></i>
                    </button>`
*/