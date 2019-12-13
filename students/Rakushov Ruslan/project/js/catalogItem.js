Vue.component("catalog-item", {
  props: ["item", "img"],
  template: `
  <div class="product-item" :data-id="item.id">
    <img :src="img" alt="Some img">
    <div class="desc">
        <h3>{{item.title}}</h3>
        <p>{{item.price}} руб.</p>
        <button class="buy-btn" 
          :data-id="item.id"
          :data-name="item.title"
          :data-image="img"
          :data-price="item.price"
        >
          Купить
        </button>
    </div>
</div>
  `
})