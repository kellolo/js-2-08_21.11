let item = {
    template: `
    <div class="product-item" >
        <img :src="imgProp" alt="Some img">
        <div class="desc">
            <h3> {{item.product_name}} </h3>
            <p>{{item.price}} $</p>
            <button class="buy-btn" @click="$root.$refs.cart.addProduct(item)">Купить</button>
        </div>
    </div>
    `,
    props: ['item', 'imgProp']
}

export default item