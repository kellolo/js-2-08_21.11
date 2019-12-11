Vue.component('product', {
    props: {
        product: {
            id: Number,
            title: String,
            price: Number,
            image: String
        },
    },
    template: '<div class="product-item">\
                    <img :src="product.image" alt="Some img">\
                    <div class="desc">\
                        <h3>{{ product.title }}</h3>\
                        <p>{{ product.price}} $</p>\
                        <button class="buy-btn" data-id="{{ product.id }}">Купить</button>\
                    </div>\
                </div>',

})