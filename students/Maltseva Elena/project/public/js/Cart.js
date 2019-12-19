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
            let options = {
                method: 'POST',
                headers: {'Content-Type': 'application/json; charset=utf-8'},
                body: JSON.stringify(selectedItem)
            }
            this.$parent.changeData(`/add-to-cart`, options)
                .then (dataArr => this.cartItems = dataArr)
            // this.$parent.fetchData (`https://raw.githubusercontent.com/LenaMaltseva/online-store-api/master/responses/addToBasket.json`)
            //     .then (data => {
            //         if (data.result == 1) {
            //             let find = this.cartItems.find (element => element.id_product === selectedItem.id_product)
            //             if (!find) {
            //                 this.cartItems.push (Object.assign({}, selectedItem, {quantity: 1}))
            //             }  else {
            //                 find.quantity++
            //             }
            //         } else {
            //             alert ("В процессе добавления товара возникла ошибка, попробуйте еще раз.")
            //         }
            //     })
                .catch (error => console.log(`Не удалось выполнить запрос к серверу: ${error}`))
        },
        removeProduct (selectedItem) {
            this.$parent.fetchData (`https://raw.githubusercontent.com/LenaMaltseva/online-store-api/master/responses/deleteFromBasket.json`)
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