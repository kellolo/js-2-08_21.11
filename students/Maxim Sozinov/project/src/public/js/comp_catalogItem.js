let catalogItem = {
    props: ['item'],
    template: `
    <div class="product-item">
        <img v-bind:src="item.img" alt="some image">
        <div class="desc">
            <h3>{{ item.title}}</h3>
            <p>{{ item.price}}  $</p>
            <button class="buy-btn" v-on:click="$root.$refs.cart.addItemToDB(item)">Купить</button>
        </div>
    </div>
    `
};

export default catalogItem;