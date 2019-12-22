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
            url: `/getBasket.json`,
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
            this.$parent.fetchData(`/addToBasket.json`)
                .then (data => {
                    if (data.result == 1) {
                        let find = this.cartItems.find (element => element.id_product === selectedItem.id_product)
                        if (!find) {
                            // selectedItem['quantity'] = 1                 // не работает
                            // this.cartItems.push (selectedItem)

                            // let selectedProduct = selectedItem           // не работает
                            // selectedProduct.quantity = 1

                            let selectedProduct = {
                                'id_product': selectedItem.id_product,
                                'product_name': selectedItem.product_name,
                                'price': selectedItem.price,
                                'quantity': 1
                            }
                            this.cartItems.push (selectedProduct)        
                        }  else {
                            find.quantity++
                        }
                    } else {
                        alert ("В процессе добавления товара возникла ошибка, попробуйте еще раз.")
                    }
                })
                .catch (error => console.log(`Не удалось выполнить запрос к серверу: ${error}`))
        },
        removeProduct (selectedItem) {
            this.$parent.fetchData (`/deleteFromBasket.json`)
                .then (data => {
                    if (data.result == 1) {
                        let find = this.cartItems.find (element => element.id_product === selectedItem);
                        if (find.quantity > 1) {
                            find.quantity--;
                        } else {
                            this.cartItems.splice(this.cartItems.indexOf(find), 1);
                        }
                    } else {
                        alert ("Не удалось удалить товар, попробуйте еще раз.")
                    }
                })
                .catch (error => console.log(`Не удалось выполнить запрос к серверу: ${error}`))
        }
    }
})