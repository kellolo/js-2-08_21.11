Vue.component ('cart', {
    data() {
        return {
            basketUrl: 'cart',
            addUrl: 'addToCart',
            removeUrl: 'removeFromCart',
            amount: 0,
            count: 0,
            imgCart: 'https://placehold.it/100x80',
            cartItems: [],
            elementIdToFindInCart: undefined,
            emptyCart: true
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
            this.$parent.getJsonPost(this.addUrl,product)
                .then(resolve => {
                    if (resolve.status !== 200) {
                        return Promise.reject(new Error(resolve.statusText))
                    }
                    return resolve.json();
                })
                .then(data => {
                    if (data.result !== 1) {
                        return Promise.reject(new Error("Не удалось добавить товар в корзину"))
                    }
                    this.cartItems = data.cart.contents;
                    this.amount = data.cart.amount;
                    this.count = data.cart.countGoods;
                    this.emptyCart = false;
                    // this.addProduct(product);
                })
            .catch( error => console.log("error", error))
        },
        // addProduct (product) {
        //     this.elementIdToFindInCart = product.id_product;
        //     const indexProduct = this.inCart;
        //     if (indexProduct != -1) {
        //         this.cartItems[indexProduct].quantity++;
        //     } else {
        //         this.generateNewProductInCart(product);
        //     }
        //     this.amount +=product.price;
        //     this.count++;
        // },
        // generateNewProductInCart(product) {
        //     let newProductToCart = {
        //         product_name: product.product_name,
        //         price: product.price,
        //         id_product: product.id_product,
        //         quantity: 1
        //     }
        //     this.cartItems.push(newProductToCart);
        // },
        queryRemoveProduct(product){
            this.elementIdToFindInCart = product.id_product;
            let indexToRemove = this.inCart;
            this.$parent.getJsonPost(this.removeUrl, indexToRemove)
            .then(resolve => {
                if (resolve.status !== 200) {
                    return Promise.reject(new Error(resolve.statusText))
                }
                return resolve.json();
            })
            .then(data => {
                console.log(data);
                if (data.result !== 1) {
                    return Promise.reject(new Error("Не удалось добавить товар в корзину"))
                }
                //this.removeProductFromCart(indexToRemove);
                this.cartItems = data.cart.contents;
                this.amount = data.cart.amount;
                this.count = data.cart.countGoods;
                this.emptyCart = data.empty;
                console.log(this.emptyCart);
                
            })
            .catch( error => console.log("error", error));
        },
        // removeProductFromCart(indexToRemove) {
        //     this.amount -=this.cartItems[indexToRemove].price;
        //     this.count--;
        //     if (this.cartItems[indexToRemove].quantity > 1) {
        //         this.cartItems[indexToRemove].quantity--;
        //     } else {
        //         // this.elementIdToFindInCart = product.id_product;
        //         // let indexToRemove = this.inCart;
        //         this.cartItems.splice(indexToRemove,1);
        //     }
        // }
    },
    computed: {
        inCart() {
            return this.cartItems.findIndex(el =>this.elementIdToFindInCart == el.id_product)
        },
        // isEmptyCart() {
        //     return this.cartItems.length>0?false:true;
        // }
    },
    template: `
        <div class="cart-block" >
        <p v-if = "this.emptyCart">Корзина пустая</p>
            <cart-item v-for = "cartItem of cartItems" :item = "cartItem" :img = "imgCart"></cart-item>
        </div>
    `
})