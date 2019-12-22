Vue.component ('cart-item', {
    template: `
        <div class="cart-item" :data-id="item.id_product">
            <div class="product-bio">
                <img :src="imgProp" alt="Some image">
                <div class="product-desc">
                    <p class="product-title">{{ item.product_name }}</p>
                    <p class="product-price">{{ item.quantity * item.price }}</p>
                    <p class="product-quantity">Quantity: {{ item.quantity }}</p>
                    <p class="product-single-price">$ {{ item.price }} each</p>
                </div>
            </div>
            <div class="right-block">
                <button class="del-btn" @click="$parent.deleteProduct(item)">&times;</button>
            </div>   
        </div>
    `,
    props: ['item', 'imgProp']
})