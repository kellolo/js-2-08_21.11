import cartItem from "./CartItem";

let cart = {
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
                console.log(data);
                
                this.cartItems = data.contents;
                this.amount = data.amount;
                this.count = data.countGoods;
            });
    },
    methods: {
        quaryToAdd(product) {
            let findProd = this.cartItems.find(item => item.id_product === product.id_product);
            if (findProd) {
                this.$parent.getJsonPut(this.basketUrl+'/'+ product.id_product,{op:1})
                    .then (data => {
                        if (data) {
                            findProd.quantity++;
                        }
                    })
            } else {
                this.$parent.getJsonPost(this.basketUrl,product)
                    .then (data => {
                        if (data) {
                            this.cartItems.push(Object.assign({},product,{quantity:1}));
                        }
                    })
            }
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
            let findProd = this.cartItems.find(item => item.id_product === product.id_product);
            if (findProd.quantity > 1) {
                this.$parent.getJsonPut(this.basketUrl+'/'+ product.id_product,{op:-1})
                    .then (data => {
                        if (data) {
                            findProd.quantity--;
                        }
                    })
            } else {
                this.$parent.getJsonDelete(this.basketUrl+'/'+ product.id_product)
                    .then (data => {
                        if (data) {
                            this.cartItems.splice(this.cartItems.indexOf(product),1);
                        }
                    })
            }
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
        <p v-if = "this.emptyCart">Корзина пустая</p>
            <cart-item v-for = "cartItem of cartItems" :item = "cartItem" :img = "imgCart"></cart-item>
        </div>
    `,
    comonents: {
        'cart-item': cartItem
    }
}

export default cart;