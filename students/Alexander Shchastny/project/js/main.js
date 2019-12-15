let app = new Vue({
    el: '#app',
    data: {
        url: 'https://raw.githubusercontent.com/shchastny/js-2-08_21.11/master/students/Alexander%20Shchastny/project/json/catalog.json',
        catalog: [],
        isActiveBasket: false,
        basket: []
    },
    methods: {
        getJSON(url) {
            return fetch(url)
                .then(d => d.json());
        },
        toggleBasket() {
            this.isActiveBasket = !this.isActiveBasket;
            //console.log(this.isActiveBasket);
        },
        content(id_product, product_name, price) {
            for (let item of this.basket) {
                if (item.id_product === id_product) {
                    return item.quantity++;
                }
            }
            return this.basket.push({
                id_product: id_product,
                product_name: product_name,
                price: price,
                quantity: 1
            });
        }
    },
    computed: {

    },
    mounted() {
        this.getJSON(this.url)
            .then(data => { this.catalog = data })
            .then(() => console.log(this.catalog));
    },
    created() {

    }
});