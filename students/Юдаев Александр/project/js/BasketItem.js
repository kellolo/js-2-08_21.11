Vue.component('basket-item', {
    template: `
        <div class="cart-item">
            <div class="product-bio">
                <img :src="prod.img" :alt="prod.product_name">
                <div class="product-desc">
                    <span class="product-title">{{ prod.product_name }}</span>
                    <span class="product-single-price">{{ '$' + prod.price }}</span>
                    <span class="product-quantity">&times;{{ prod.quantity }}</span>
                    <span>=</span>
                    <span class="product-price">{{ '$' + prod.quantity * prod.price }}</span>
                </div>
            </div>
            <div class="right-block">
                <button class="del-btn" @click="$root.$refs.basket.deleteItemFromBasket(prod.id_product)"><span class="icon icon-Delete"></span></button>
            </div>
        </div>
    `,
    props: ['prod']
});