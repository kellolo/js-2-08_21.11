import cart from "./Cart";
import catalog from "./Catalog";
import productSearch from "./FilterComp";

const API = 'https://raw.githubusercontent.com/WebAlex-coder/json_files/master'


let app = {
    el: '#app',
    data: {
        cartImage: 'https://placehold.it/100x80',
        showCart : true
    },
    methods: {
        getJson (url) {
            console.log("Отправляю запрос");
            
            return fetch (`${url}`)
            .then (result => result.json())
            .catch (err => {
                //console.log (err)
            })
        },
        getJsonPost(url, data) {
            return fetch(`${url}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then (result => result.json())
            .catch (err => {
                console.log (err)
            })
        },
        getJsonPut(url, data) {
            return fetch(`${url}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then (result => result.json())
            .catch (err => {
                console.log (err)
            })
        },
        getJsonDelete(url) {
            return fetch(`${url}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then (result => result.json())
            .catch (err => {
                console.log (err)
            })
        },
        toShowCart() {
            this.showCart = !this.showCart;
        }
    },
    components: {
        cart, catalog,
        'product-search': productSearch
    }
}

export default app;