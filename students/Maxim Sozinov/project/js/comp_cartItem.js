Vue.component ('cart-item', {
    props: ['item'],
    template: `
        <div class="cart-item">
            <div class="product-bio">
                <img v-bind:src="item.img" alt="some image">
                <div class="product-desc">
                    <p class="product-title">{{ item.title }}</p>
                    <p class="product-quantity">Quantity: {{ item.quantity }}</p>
                    <p class="product-single-price">\${{ item.price }} each</p>
                </div>
            </div>
            <div class="right-block">
                <p class="product-price">\${{ item.quantity * item.price }}</p>
                <button class="del-btn" v-on:click="$root.$refs.cart.removeItem(item)">&times;</button>
            </div>
        </div>
    `
});