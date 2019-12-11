var eventBus = new Vue();
const app = new Vue({
    el: "#app",
    data: {
        catalogURL: "https://raw.githubusercontent.com/Konstantin-Buzuev/online-store-api/master/OnlineShop/catalog.json",
        imgURL: "img/",
        /*Прикрутить к проекту загрузку картинок с сервака!*/
        /*'https: //github.com/Konstantin-Buzuev/online-store-api/tree/master/OnlineShop/img/',*/
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
                this._parseImage(product);
                Vue.set(product, "visible", true)
            });
        },
        _parseDescription(product) {
            let descr = product.description;
            let summary = descr.slice(0, descr.indexOf(".", 50) + 1); /* Ищем конец предложения после 50 символа (краткое описание)*/
            let details = descr.slice(descr.indexOf(".", 50) + 2); // Пропускаем пробел после точки
            Vue.set(product, "summary", summary);
            Vue.set(product, "details", details);
        },
        _parseImage(product) {
            Vue.set(
                product,
                "imageURL",
                this.imgURL + "product-" + product.id + ".jpg"
            );
            Vue.set(
                product,
                "fullImageURL",
                this.imgURL + "product-" + product.id + "-full" + ".jpg"
            );
        },
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