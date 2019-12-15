Vue.component('basket', {
    data() {
        return {
            isActiveBasket: false,
            basket: []
        };
    },
    methods: {
        toggleBasket () {
            this.isActiveBasket = !this.isActiveBasket;
        },
        content (id_product, product_name, price) {
            for (let item of this.basket) {
                if (item.id_product === id_product){
                    return item.quantity++;
                }
            }
            return this.basket.push({
                id_product: id_product,
                product_name: product_name,
                price: price,
                img: 'https://placehold.it/100x80',
                quantity: 1
            });
        },
        deleteItemFromBasket (id_product) {
            for (let i = 0; i < this.basket.length; i++) {
                if (this.basket[i].id_product === id_product){
                    this.basket[i].quantity--;
                    if (this.basket[i].quantity === 0) this.basket.splice(i, 1);
                }
            }
        }
    },
    template: `
        <div class="cart">
            <form action="#" class="search-form">
                <input type="text" class="search-field">
                <button class="btn-search" type="submit">
                    <i class="fas fa-search"></i>
                </button>
            </form>
            <button class="btn-cart" type="button" @click="toggleBasket">Корзина</button>
            <div class="cart-block" v-if="isActiveBasket">
                <basket-item v-for="product of basket" :prod="product"></basket-item>
            </div>
        </div>
    `
});