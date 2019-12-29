<template>
    <span>
        <button class="btn-cart" type="button" @click="showCart">Корзина</button>
        <div class="cart-block" v-show="visibility">
            <div class="empty" v-if="noCartItems">В корзине пока нет товаров :(</div>
            <cart-item v-else v-for="item of cartItems" :key="item.id_product" :item="item" :cartImage="image">
            </cart-item>
        </div>
    </span>
</template>

<script>
import cartItem from './CartItem'
export default {
    data () {
        return {
            url: `/api/cart`,
            image: 'https://placehold.it/100x80',
            cartItems: [],
            visibility: false
        }
    },
    mounted () {
        this.$parent.fetchData(this.url)
        .then (dataArr => this.cartItems = dataArr.contents)
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
            let find = this.cartItems.find(item => item.id_product === selectedItem.id_product)
            if (!find) {
                this.$parent.postData(this.url, selectedItem)
                    .then (dataArr => this.cartItems = dataArr.contents)
                    .catch (error => console.log(`Не удалось выполнить запрос к серверу: ${error}`))
            } else {
                this.$parent.putData(`${this.url}/${selectedItem.id_product}`, {act: 1})
                    .then (dataArr => this.cartItems = dataArr.contents)
                    .catch (error => console.log(`Не удалось выполнить запрос к серверу: ${error}`))
            }
        },
        removeProduct (selectedItem) {
            let find = this.cartItems.find(item => item.id_product === selectedItem.id_product)
            if (find.quantity > 1) {
                this.$parent.putData(`${this.url}/${selectedItem.id_product}`, {act: -1})
                    .then (dataArr => this.cartItems = dataArr.contents)
                    .catch (error => console.log(`Не удалось выполнить запрос к серверу: ${error}`))
            } else {
                this.$parent.delData(`${this.url}/${selectedItem.id_product}`)
                    .then (dataArr => this.cartItems = dataArr.contents)
                    .catch (error => console.log(`Не удалось выполнить запрос к серверу: ${error}`))
            }
            
        }
    },
    components: {
        'cart-item': cartItem
    }
}
</script>

<style>

</style>