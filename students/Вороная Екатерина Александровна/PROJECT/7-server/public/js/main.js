let app = new Vue ({
    el: '#app',
    data: {
        cartImage: 'https://placehold.it/100x80',
        cartUrl: '/getBasket.json',
        showCart: false

    },
    methods: {
        getJson (url) {
            return fetch (url)
                .then (result => result.json())
                .catch (err => {
                    console.log (err)
                })
        },
    },

})