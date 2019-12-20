Vue.component('basket-item', {
    template: `
        <div class="cart-item">
            <div class="product-bio">
                <img :src="prod.img" alt="Some image">
                <div class="product-desc">
                    <p class="product-title">{{ prod.product_name }}</p>
                    <p class="product-quantity">Quantity: {{ prod.quantity }}</p>
                    <p class="product-single-price">{{ prod.price }} each</p>
                </div>
            </div>
            <div class="right-block">
                <p class="product-price">{{ prod.quantity * prod.price }}</p>
                <button class="del-btn" @click="$root.$refs.basket.deleteItemFromBasket(prod.id_product)">&times;</button>
            </div>
        </div>
    `,
    props: ['prod']
});