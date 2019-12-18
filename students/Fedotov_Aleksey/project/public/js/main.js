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
            return fetch (`${url}`)
            .then (result => result.json())
            .catch (err => {
                console.log (err)
            })
        },
        getJsonPost(url, d) {
            console.log(JSON.stringify({data:d}));
            return fetch(`${url}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({data:d})
            })
        },
        toShowCart() {
            this.showCart = !this.showCart;
        }
    },
})