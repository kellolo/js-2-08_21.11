import cart from './Cart'
import catalog from './Catalog'

let app = {
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
        postJson (url, data) {
            return fetch (url, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify (data)
            })
            .then (result => result.json())
            .catch (err => {
                console.log (err)
            })
        },
        putJson (url, data) {
            return fetch (url, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify (data)
            })
            .then (result => result.json())
            .catch (err => {
                console.log (err)
            })
        },
        deleteJson (url) {
            return fetch (url, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then (result => result.json())
            .catch (err => {
                console.log (err)
            })
        },
    },
    components: {
        cart, catalog
    }
    
}

export default app
