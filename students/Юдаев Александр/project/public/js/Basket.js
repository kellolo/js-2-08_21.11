Vue.component('basket', {
    data() {
        return {
            isActiveBasket: false,
            basket: [],
            totalPrice: 0,
            totalQuantity: 0,
            jsonBasket: '/basket'
        };
    },
    mounted() {
        this.$parent.getJSON(this.jsonBasket)
            .then (data => {
                this.basket = data.contents;
                this.totalPrice = data.amount;
                this.totalQuantity = data.countGoods;
            });
    },
    methods: {
        toggleBasket () {
            this.isActiveBasket = !this.isActiveBasket;
        },
        content (id_product, product_name, price, img) {
            for (let item of this.basket) {
                if (item.id_product === id_product){
                    this.totalPrice += price;
                    this.totalQuantity++;
                    return item.quantity++;
                }
            }
            this.basket.push({
                id_product: id_product,
                product_name: product_name,
                price: price,
                img: img,
                quantity: 1
            });

            this.totalPrice += price;
            this.totalQuantity++;
        },
        deleteItemFromBasket (id_product) {
            for (let i = 0; i < this.basket.length; i++) {
                if (this.basket[i].id_product === id_product){
                    this.basket[i].quantity--;
                    this.totalQuantity--;
                    this.totalPrice -= this.basket[i].price;
                    if (this.basket[i].quantity === 0) this.basket.splice(i, 1);
                }
            }
        }
    },
    template: `
        <div class="basket">
            <a href="#" @click="toggleBasket">
                <i class="icon icon-FullShoppingCart"></i>
                <span>{{ totalQuantity }}</span>
            </a>
            <div class="basket-screen" v-if="isActiveBasket">
                <div class="cart-items" id="scrollbar">
                    <div v-if="basket.length == 0" class="empty">Basket is empty</div>
                    <basket-item v-for="product of basket" :prod="product" v-else></basket-item>
                </div>
                <div class="total">
                    <span>Basket total:</span>
                    <span>{{ '$' + totalPrice }}</span>
                </div>
            </div>
        </div>
    `
});