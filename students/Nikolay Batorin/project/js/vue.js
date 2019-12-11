const app = new Vue({
    el: '#app',
    data: {
        url: 'https://raw.githubusercontent.com/batoxa/archive/master/js-2/json/goods.json',
        products: [],
        cart: []
    },
    methods: {
        getProducts(url) {
            return fetch(url)
                .then(response => response.json());
        }
    },
    mounted() {
        this.getProducts(this.url)
            .then(data => { this.products = data })
    },
    updated() {
        console.log(this.products)

    }

})