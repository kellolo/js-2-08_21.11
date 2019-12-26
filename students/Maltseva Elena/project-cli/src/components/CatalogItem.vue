<template>
    <div class="product-item" >
        <img :src="image" alt="Some img">
        <div class="desc">
            <h3>{{ item.product_name }}</h3>
            <p>{{ item.price }} rub.</p>
            <button class="buy-btn" @click="$root.$children[0].$refs.cart.addProduct(item)">Купить</button>
        </div>
    </div>
</template>

<script>
export default {
    props: ['item', 'image']
}
</script>

<style>

</style>