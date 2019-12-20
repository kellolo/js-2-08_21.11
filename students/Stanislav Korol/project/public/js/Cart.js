Vue.component ('cart', {
    data () {
        return {
            cartUrl: '/cart',
            imgCart: 'https://placehold.it/100x80',
            isVisibleCart: false,
            items: []
        }
    },
    methods: {
        switchCart(){
            this.isVisibleCart = !this.isVisibleCart
        },
        addProduct(prod){
            let prodData = `id_product=${encodeURIComponent(prod.id_product)}&product_name=${encodeURIComponent(prod.product_name)}&price=${encodeURIComponent(prod.price)}`

            this.$parent.postJson("/addToCart", prodData)
                .then((data) => {
                    if (data === "OK") {
                        const targetCartItem = this._getItemById(prod.id_product)
                
                        if (targetCartItem) targetCartItem.quantity++
                        else {
                            let newItem = Object.assign({}, prod)
                            newItem.quantity = 1
                            this.items.push(newItem)
                        };
                    }
                })
                .catch((errStatus) => {
                    console.log (`Не удалось добавить товар в корзину по причине: ${errStatus}`)
                })
        },
        deleteProduct(prod){
            let prodData = `id_product=${encodeURIComponent(prod.id_product)}`

            this.$parent.postJson("/deleteFromCart", prodData)
                .then((data) => {
                    if (data === "OK") {
                        if (prod.quantity === 1) this.items = this.items.filter(item => item.id_product !== prod.id_product)
                        else prod.quantity--
                    }
                })
                .catch((errStatus) => {
                    console.log (`Не удалось удалить товар из корзины по причине: ${errStatus}`)
                })
        },
        _getItemById(id){
            try{
                return this.items.filter(item => item.id_product === id)[0];
            } catch {
                return undefined;
            }
        }
    },
    mounted () {
        this.$parent.getJson (this.cartUrl)
            .then (data => this.items = data.contents)
    },
    template: `
        <div v-show="isVisibleCart" class="cart-block">
            <p v-if="items.length == 0">Корзина пуста</p>
            <cart-item v-for="product of items" :item="product" :imgProp="imgCart"></cart-item>
        </div>
    `
})