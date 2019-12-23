import cartItem from './comp_cartItem';

let cart = {
    data () {
        return {
            items: [],
            show_up: false,
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
 
        removeItemfromDB(item) {
            this.$parent.deleteJson('/cart', item)
                .then (data => this.items = data.contents)
                .catch((errStatus) => {
                    this.$root.smthWrong = true;
                    console.log(`Ошибка ${errStatus}`);
                });
            
        },
     
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
    `,
    components: {
        'cart-item' : cartItem
    }
};

export default cart;