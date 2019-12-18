var eventBus = new Vue();
const app = new Vue({
    el: "#app",
    data: {
        products: [],
        cart: []
    },
    methods: {
        /*Получение данных с API*/
        getJSON(url) {
            return fetch(url).then(data => data.json());
        },
        putItem(url, product) {
            fetch(`${url}/${product.id}`)
                .then(() => this.getJSON("/cart"))
                .then(data => {
                    let obj = data
                    this.cart = obj[0].contents;
                })
                .then(() => {
                    this.getJSON("/cart")
                })
                .then(() => {
                    eventBus.$emit("clear-cart")
                    this.cart.forEach(item => {
                        eventBus.$emit("put-to-cart", item)
                    })
                })
        },
        removeItem(url, product) {
            fetch(`${url}/${product.id}`)
                .then(() => this.getJSON("/cart"))
                .then(data => {
                    let obj = data
                    this.cart = obj[0].contents;
                })
                .then(() => {
                    this.getJSON("/cart")
                })
                .then(() => {
                    eventBus.$emit("clear-cart")
                    this.cart.forEach(item => {
                        eventBus.$emit("put-to-cart", item)
                    })
                })
        },
        /*Расширяем поля продукта*/
        parseProducts() {
            this.products.forEach(product => {
                this._parseDescription(product);
                Vue.set(product, "hidden", false);
            });
        },
        _parseDescription(product) {
            let descr = product.description;
            let summary = descr.slice(
                0,
                descr.indexOf(".", 50) + 1
            ); /* Ищем конец предложения после 50 символа (краткое описание)*/
            let details = descr.slice(descr.indexOf(".", 50) + 2); // Пропускаем пробел после точки
            Vue.set(product, "summary", summary);
            Vue.set(product, "details", details);
        }
    },
    mounted() {
        this.getJSON("/catalog")
            .then(data => {
                this.products = data;
            })
            .then(() => {
                this.parseProducts();
            });
        this.getJSON("/cart")
            .then(data => {
                let obj = data
                obj[0].contents.forEach(item => {
                    eventBus.$emit("put-to-cart", item)
                })
            });
        eventBus.$on("add-item-to-cart", prod => {
            this.putItem("/add", prod)
        })
        eventBus.$on('remove-from-cart', prod => {
            this.removeItem("/remove", prod)
        })


    }
});