const app = new Vue({
    el: '#app',
    data: {
        catalogURL: 'https://raw.githubusercontent.com/Konstantin-Buzuev/online-store-api/master/OnlineShop/catalog.json',
        imgURL: 'img/',
        /*Прикрутить к проекту загрузку картинок с сервака!*/
        /*'https: //github.com/Konstantin-Buzuev/online-store-api/tree/master/OnlineShop/img/',*/
        products: [],
        cart: [],
        msg: ""
    },
    methods: {
        getJSON(url) {
            return fetch(url)
                .then(data => data.json())
        },
        _parseDescription(product) {
            let descr = product.description
            let summary = descr.slice(0, descr.indexOf(".", 50) + 1) // Ищем конец предложения после 50 символа
            let details = descr.slice(descr.indexOf(".", 50) + 2) // Пропускаем пробел после точки
            Vue.set(product, "summary", summary)
            Vue.set(product, "details", details)
        },
        _parseImage(product) {
            Vue.set(product, "imageURL", this.imgURL + "product-" + product.id + ".jpg")
            Vue.set(product, "fullImageURL", this.imgURL + "product-" + product.id + "-full" + ".jpg")
        },
        parseProducts() {
            this.products.forEach(product => {
                this._parseDescription(product)
                this._parseImage(product)
            })
        },
        addToCart: function (event) {
            let id = event.target.dataset.id
        }
    },
    mounted() {
        this.getJSON(this.catalogURL)
            .then(data => {
                this.products = data
            })
            .then(() => {
                this.parseProducts()
            })


    }
})

/*
product fields by JSON:
id
title
color
description
price
characteristics:{
    OS
    display
    processor
    RAM
    Video
    HDD
    SSD
    }
computed product fields:
summary
details
imageURL
fullImageURL
*/