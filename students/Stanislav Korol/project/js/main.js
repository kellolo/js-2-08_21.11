const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses'


let app = new Vue ({
    el: '#app',
    data: {
        cartImage: 'https://placehold.it/100x80',
        cartUrl: '/getBasket.json'
    },
    methods: {
        getJson (url) {
            return fetch (`${API + url}`)
            .then (result => result.json())
            .catch (err => {
                console.log (err)
            })
        },
    }
})