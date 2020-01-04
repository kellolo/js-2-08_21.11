import cart from './Cart'
import catalog from './Catalog'

let app = {
    el: '#app',
    data: {
        cartImage: 'https://placehold.it/100x80',
        cartUrl: '/getBasket.json',
        cartShown: false,
        // url: 'https://raw.githubusercontent.com/mary4erry/js-2-08_21.11/master/students/Maria%20V/project/JSON/catalog.json',
    },
    methods: {
        getJSON (url) {
            return fetch (url)
                .then ( result => result.json())
                .catch (err => {
                    console.log (err)
                })
            },
        postJSON (url, data) {
            return fetch (url, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify (data)
            }) 
            .then ( result => result.json())
            .catch (err => {
                console.log (err)
            })
        },
        putJSON (url, data) {
            return fetch (url, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify (data)
            }) 
            .then ( result => result.json())
            .catch (err => {
                console.log (err)
            })
        },
        deleteJSON (url) {
            return fetch (url, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json"
                }
            }) 
            .then ( result => result.json())
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