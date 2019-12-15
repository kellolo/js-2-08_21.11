var eventBus = new Vue();
const app = new Vue({
    el: "#app",
    data: {
        catalogURL: "https://raw.githubusercontent.com/Konstantin-Buzuev/online-store-api/master/OnlineShop/catalog.json",
        products: [],
    },
    methods: {
        /*Получение данных с API*/
        getJSON(url) {
            return fetch(url).then(data => data.json());
        },
        /*Расширяем поля продукта*/
        parseProducts() {
            this.products.forEach(product => {
                this._parseDescription(product);
                Vue.set(product, "hidden", false)
            });
        },
        _parseDescription(product) {
            let descr = product.description;
            let summary = descr.slice(0, descr.indexOf(".", 50) + 1); /* Ищем конец предложения после 50 символа (краткое описание)*/
            let details = descr.slice(descr.indexOf(".", 50) + 2); // Пропускаем пробел после точки
            Vue.set(product, "summary", summary);
            Vue.set(product, "details", details);
        }
    },
    mounted() {
        this.getJSON(this.catalogURL)
            .then(data => {
                this.products = data;
            })
            .then(() => {
                this.parseProducts();
            });
    }
})