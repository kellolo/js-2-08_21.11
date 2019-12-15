Vue.component ('cart', {
    data() {
        return {
            basketUrl: '/getUserBasket.json',
            addUrl: '/addResponse.json',
            removeUrl: '/deleteFromUserBasket.json',
            amount: 0,
            count: 0,
            imgCart: 'https://placehold.it/100x80',
            cartItems: [],
            elementIdToFindInCart: undefined
        }
    },
    mounted() {
        this.$parent.getJson (this.basketUrl)
            .then (data => {
                this.cartItems = data.contents;
                this.amount = data.amount;
                this.count = data.countGoods;
            });
    },
    methods: {
        quaryToAdd(product) {
            this.$parent.getJson (this.addUrl)
            .then (data => {
                if (data.result === 1)
                this.addProduct(product)})
            .catch( error => {alert("Невозможно установить соединению с сетью")});
        },
        addProduct (product) {
            this.elementIdToFindInCart = product.id_product;
            const indexProduct = this.inCart;
            if (indexProduct != -1) {
                this.cartItems[indexProduct].quantity++;
            } else {
                this.generateNewProductInCart(product);
            }
            this.amount +=product.price;
            this.count++;
        },
        generateNewProductInCart(product) {
            let newProductToCart = {
                product_name: product.product_name,
                price: product.price,
                id_product: product.id_product,
                quantity: 1
            }
            this.cartItems.push(newProductToCart);
        },
        queryRemoveProduct(product){
            this.$parent.getJson (this.removeUrl)
            .then (data => {
                if (data.result === 1)
                this.removeProductFromCart(product)})
            .catch( error => {alert("Невозможно установить соединению с сетью")});
        },
        removeProductFromCart(product) {
            if (product.quantity > 1) {
                product.quantity--;
            } else {
                this.elementIdToFindInCart = product.id_product;
                let indexToRemove = this.inCart;
                this.cartItems.splice(indexToRemove,1);
            }
            this.amount -=product.price;
            this.count--;
        }
    },
    computed: {
        inCart() {
            return this.cartItems.findIndex(el =>this.elementIdToFindInCart == el.id_product)
        },
        isEmptyCart() {
            return this.cartItems.length>0?false:true;
        }
    },
    template: `
        <div class="cart-block" >
        <p v-if = "this.isEmptyCart">Корзина пустая</p>
            <cart-item v-for = "cartItem of cartItems" :item = "cartItem" :img = "imgCart"></cart-item>
        </div>
    `
})