const app = new Vue({
    el: '#app',
    data: {
        urlCatalog: 'https://raw.githubusercontent.com/batoxa/archive/master/js-2/json/getCatalog.json',
        urlCart: 'https://raw.githubusercontent.com/batoxa/archive/master/js-2/json/getBasket.json',
        products: [],
        cart: []
    },
    methods: {
        getProducts(urlCatalog) {
            return fetch(urlCatalog)
                .then(response => response.json());
        },
        getCart(urlCart) {
            return fetch(urlCart)
                .then(response => response.json());
        }
    },
    mounted() {
        this.getProducts(this.urlCatalog)
            .then(data => { this.products = data })

        this.getCart(this.urlCart)
            .then(data => { this.cart = data })
    },
    updated() {
        console.log(this.cart)
        console.log(this.products)
    }

})