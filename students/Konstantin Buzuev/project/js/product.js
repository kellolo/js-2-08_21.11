Vue.component("product", {
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
            hidden: Boolean
        }
    },
    template: `<div class="card product" v-bind:class="{ product_hidden: product.hidden }">
                    <img :src="product.imageURL" class="product__image card-img-top" alt="product.id">
                    <div class="product__body card-body">
                    <h5 class="product__title card-title">{{ product.characteristics.display }}" {{ product.title }}</h5>
                    <p class="product__price card-text">{{ product.price }}  руб.</p>
                    <button class='product__buy-btn' v-on:click="AddItem">Купить</button>
                    </div>
                </div>`,
    methods: {
        AddItem: function () {
            eventBus.$emit("add-item-to-cart", this.product)
        }
    }
})

/*

                <div class='product' v-bind:class="{ product_hidden: product.hidden }">
                    <h1 class='product__title'>{{ product.characteristics.display }}" {{ product.title }}</h1>
                    <a :href='product.fullImageURL' class='product__link' target='_blank'>
                        <img :src='product.imageURL' :alt='product.id' class='product__image'></a>
                    <p class='product__price'>{{ product.price}} руб.</p>
                    <button class='product__buy-btn' v-on:click="AddItem">Купить</button>
                </div>
*/