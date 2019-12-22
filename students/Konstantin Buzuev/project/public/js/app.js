var eventBus = new Vue();
const app = new Vue({
    el: "#app",
    data: {
        products: [],
        cart: []
    },
    methods: {
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
        },
        _refreshCart() {
            this.getJSON('/cart')
                .then(data => {
                    this.cart = data.contents
                })

        },
        /*Получение данных с сервера*/
        getJSON(url) {
            return fetch(url)
                .then(data => data.json())
                .catch(err => {
                    console.log(err)
                });
        },
        postJSON(url, data) {
            return fetch(url, {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data)
                })
                .catch(err => {
                    console.log(err)
                })
        },
        putJSON(url, data) {
            return fetch(url, {
                    method: 'PUT',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data)
                })
                .catch(err => {
                    console.log(err)
                })
        },
        deleteJSON(url) {
            return fetch(url, {
                    method: 'DELETE',
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        },
    },
    created() {
        eventBus.$on("get-catalog", () => {
            this.getJSON("/catalog")
                .then(data => {
                    this.products = data;
                })
                .then(() => {
                    this.parseProducts();
                });
        })
        eventBus.$on("get-cart", () => {
            this._refreshCart()
        })
        eventBus.$on('put', (id, modifer) => {
            this.putJSON("/cart/" + id, {
                    op: modifer
                })
                .then(() => {
                    this._refreshCart()
                })
        })
        eventBus.$on('post', (id) => {
            this.postJSON('/cart/', id)
                .then(() => {
                    this._refreshCart()
                })
        })
        eventBus.$on('delete', (id) => {
            this.deleteJSON('/cart/' + id)
                .then(() => {
                    this._refreshCart()
                })
        })
    }
});