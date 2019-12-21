Vue.component ('cart', {
    template: `
        <span>
            <button class="btn-cart" type="button" @click="showCart">Корзина</button>
            <div class="cart-block" v-show="visibility">
                <div class="empty" v-if="noCartItems">В корзине пока нет товаров :(</div>
                <cart-item v-else v-for="item of cartItems" :data-id="item.id_product" :item="item" :cartImage="image">
                </cart-item>
            </div>
        </span>
    `,
    data () {
        return {
            url: `/cart`,
            image: 'https://placehold.it/100x80',
            cartItems: [],
            visibility: false
        }
    },
    mounted () {
        this.$parent.fetchData(this.url)
        .then (dataArr => this.cartItems = dataArr)
    },
    computed: {
        noCartItems () {
            return this.cartItems.length == 0 
        }
    },
    methods: {
        showCart () {
            this.visibility = !this.visibility
        },
        addProduct (selectedItem) {
            this.$parent.changeData(`/add-to-cart`, selectedItem)
                .then (dataArr => this.cartItems = dataArr)
                .catch (error => console.log(`Не удалось выполнить запрос к серверу: ${error}`))
        },
        removeProduct (selectedItem) {
            this.$parent.changeData(`/delete-from-cart`, selectedItem)
                .then (dataArr => this.cartItems = dataArr)
                .catch (error => console.log(`Не удалось выполнить запрос к серверу: ${error}`))
        }
    }
})