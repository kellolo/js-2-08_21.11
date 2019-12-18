Vue.component ('cart', {
    data () {
        return {
            items: [],
            show_up: false,
            removeItem_url: "https://raw.githubusercontent.com/havkin/js-2-08_21.11/master/students/Maxim%20Sozinov/fake-server/removeFromCart.json",
            addItem_url: "https://raw.githubusercontent.com/havkin/js-2-08_21.11/master/students/Maxim%20Sozinov/fake-server/addToCart.json"
        };
    },
    mounted () {
        this.$parent.getJson ('/cart')
            .then (data => this.items = data.contents);
            
    },
    methods: {
        showUp () {
            this.show_up = !this.show_up;
        },
        // removeItem(item) {
        //     this.$parent.getJson (this.removeItem_url)
        //         .then((data) => {
        //             if (data.result === 1) {
        //                 let findItem = this.items.find(el => el.id === +item.id);
        //                 if (findItem.quantity > 1) {
        //                     findItem.quantity--;
        //                 } else {
        //                     this.items.splice(this.items.indexOf(findItem), 1);
        //                 }
        //             } else {
        //                 this.$root.smthWrong = true;
        //                 console.log(`Ошибка ${data.result}`);
        //             }
        //         })
        //         .catch((errStatus) => {
        //             this.$root.smthWrong = true;
        //             console.log(`Ошибка ${errStatus}`);
        //         });
        // },
        removeItemfromDB(item) {
            this.$parent.deleteJson('/cart', item)
                .then (data => this.items = data.contents)
                .catch((errStatus) => {
                    this.$root.smthWrong = true;
                    console.log(`Ошибка ${errStatus}`);
                });
            
        },
        // addItem(item) {
        //     this.$parent.getJson(this.addItem_url)
        //         .then((data) => {
        //             if (data.result === 1) {
        //                 let findItem = this.items.find(el => el.id === +item.id);
        //                 if (!findItem) {
        //                     //заглушка для БД
        //                     let addedItem = {
        //                         id: +item.id,
        //                         title: item.title,
        //                         price: +item.price,
        //                         img: "https://placehold.it/100x80",
        //                         quantity: 1
        //                     };
        //                     //                        
        //                     this.items.push(addedItem);
        //                 } else {
        //                     findItem.quantity++;
        //                 }
        //             } else {
        //                 this.$root.smthWrong = true;
        //                 console.log(`Ошибка ${data.result}`);
        //             }
        //         })
        //         .catch((errStatus) => {
        //             this.$root.smthWrong = true;
        //             console.log(`Ошибка ${errStatus}`);
        //         });
        // },
        addItemToDB(item) {
            this.$parent.putJson('/cart', item)
                .then (data => this.items = data.contents)
                .catch((errStatus) => {
                    this.$root.smthWrong = true;
                    console.log(`Ошибка ${errStatus}`);
                });
            
        },
    },
    template: `
        <div class="cart-block" v-show="show_up">
            <div v-if="items.length === 0">Ваша корзина пуста</div>
            <cart-item v-for="product in items" :item='product' :key='product.id'></cart-item>      
        </div>
    `
});