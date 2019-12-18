Vue.component('product', {
    template: `
        <div class="product-item">
            <img :src="item.img" alt="Some img">
            <div class="desc">
                <h3>{{ item.product_name }}</h3>
                <p>{{ item.price }} </p>
                <button class="btn-cart" type="button" @click="$root.$refs.basket.content (item.id_product, item.product_name, item.price)">Купить</button>
            </div>
        </div>
    `,
    props: ['item']
});