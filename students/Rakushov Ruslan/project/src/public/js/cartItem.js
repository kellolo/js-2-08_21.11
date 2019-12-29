let cartItem = {
  props: ["item", "img"],
  template: `
  <div class="cart-item" :data-id="item.id">
    <div class="product-bio">
      <img :src="img" alt="Some image">
      <div class="product-desc">
        <p class="product-title">{{item.title}}</p>
        <p class="product-quantity">Quantity: {{item.quantity}}</p>
        <p class="product-single-price">{{item.price}} руб. each</p>
      </div>
    </div>
    <div class="right-block">
      <p class="product-price">{{item.quantity * item.price}}</p>
      <button class="del-btn" :data-id="item.id" @click="$parent.delItemFromCart">&times;</button>
    </div>
  </div>
  `
};

export default cartItem;