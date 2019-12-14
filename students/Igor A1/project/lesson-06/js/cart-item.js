Vue.component ('cart-item', {
  
  props: ['good'],
  
  template: `
    <div class="item-wrapper">
      <div class="product-bio">
        <img :src="good.img" alt="Some cart image">
        <div class="product-desc">
          <p class="product-title">{{good.product_name}}</p>
          <p class="product-quantity">Кол-во: {{good.quantity}}</p>
          <p class="product-single-price">по {{good.price}} руб.</p>
        </div>
      </div>
      <div class="right-block">
        <p class="product-price">{{good.quantity * good.price}}&nbsp;руб.</p>
        <button class="del-btn" @click="$parent.removeGood(good)"><i class="fa fa-times-circle remove"></i></button>
      </div>
    </div>`
    
});
