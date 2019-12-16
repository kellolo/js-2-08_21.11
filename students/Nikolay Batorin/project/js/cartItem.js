Vue.component('cartItem', {
    props: {
        cartItem: {
            id: Number,
            title: String,
            price: Number,
            quantity: Number,
            image: String
        },
    },
    template: `<div class="cart-item">
                    <div class="product-bio">
                        <img :src="cartItem.smallImage" alt="Some image">
                        <div class="product-desc">
                            <p class="product-title">{{ cartItem.title }}</p>
                            <p class="product-quantity">Quantity: {{ cartItem.quantity }}</p>
                            <p class="product-single-price">$ {{ cartItem.price }} each</p>
                        </div>
                    </div>
                    <div class="right-block">
                        <p class="product-price">{{ cartItem.quantity * cartItem.price }} $</p>
                        <button class="del-btn" data-id="{{ cartItem.id }}">&times;</button>
                    </div>
                </div>
                <hr class="separator"/>`,
})