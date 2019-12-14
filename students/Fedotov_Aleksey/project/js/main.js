const API = 'https://raw.githubusercontent.com/WebAlex-coder/json_files/master'


let app = new Vue ({
    el: '#app',
    data: {
        cartImage: 'https://placehold.it/100x80',
        cartUrl: '/getBasket.json',
        showCart : true
    },
    methods: {
        getJson (url) {
            return fetch (`${API + url}`)
            .then (result => result.json())
            .catch (err => {
                console.log (err)
            })
        },
        toShowCart() {
            this.showCart = !this.showCart;
        }
    },
})