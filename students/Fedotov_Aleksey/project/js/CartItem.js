Vue.component ('cart-item', {
    template: `
        <div class="product-bio">
        <img :src="img" alt="Some image">
            <div class="product-desc">
                <p class="product-title">{{item.product_name}}</p>
                <p class="product-quantity">Quantity: {{item.quantity}}</p>
                <p class="product-single-price">{{item.price}} each</p>
            </div>
            <div class="right-block">
            <p class="product-price">{{item.quantity*item.price}}</p>
            <button @click = "$parent.removeProductFromCart(item)">&times;</button>
        </div>
        </div>
    `,
    props: ['item', 'img']
})