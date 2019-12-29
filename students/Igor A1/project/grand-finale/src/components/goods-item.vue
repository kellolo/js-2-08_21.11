<template>
  <div class="product-item" >
    <img :src="good.img" alt="Some goods img">
    <div class="desc">
      <h3> {{good.product_name}} </h3>
      <p>{{good.price}} руб.</p>
      <button class="buy-btn" @click="$root.$children[0].$refs.cart.addGood(good)">Купить</button>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['good']
  }
</script>
