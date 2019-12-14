Vue.component ('cart', {
    data () {
        return {
            FAKE_API_CART: 'https://raw.githubusercontent.com/havkin/js-2-08_21.11/master/students/Maxim%20Sozinov/fake-server/getBasket.json',
            items: [],
            show_up: false,
            removeItem_url: "https://raw.githubusercontent.com/havkin/js-2-08_21.11/master/students/Maxim%20Sozinov/fake-server/removeFromCart.json",
        }
    },
    mounted () {
        this.$parent.getJson (this.FAKE_API_CART)
            .then (data => this.items = data.contents);
            
    },
    methods: {
        showUp () {
            this.show_up = !this.show_up;
        },
        removeItem(item) {
            this._fetchData(this.removeItem_url)
                .then((data) => {
                    if (data.result === 1) {
                        let itemId = +item.id;
                        let findItem = this.items.find(el => el.id === itemId);
                        if (findItem.quantity > 1) {
                            findItem.quantity--;
                        } else {
                            this.items.splice(this.items.indexOf(findItem), 1);
                        }
                    } else {
                        console.log(`Ошибка ${data.result}`);
                    }
                })
                .catch((errStatus) => {
                    console.log(`Ошибка ${errStatus}`);
                });
        },
        _fetchData(url) {
            return fetch(url).then(dataJSON => dataJSON.json());
        }
    },
    template: `
        <div class="cart-block" v-show="show_up">
             <cart-item v-for="product in items" :item='product' :key='product.id'></cart-item>      
        </div>
    `
});