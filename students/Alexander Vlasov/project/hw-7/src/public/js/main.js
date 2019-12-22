import cart from './Cart'
import catalog from './Catalog'
import filterComp from './FilterComp'
import errorComp from './Error'

let main = {
    el: '#app',
    data: {
        showCart: false
    },
    methods: {
        getFetch(url, params = {method: 'GET'}) {
            return fetch (url, params)
            .then (result => result.json())
            .catch (err => {
                this.$root.$refs.errorComp.error(err)
            })
        },
        getJson (url) {
            return this.getFetch(url)
        },
        postJson (url, data) {
            const params = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }
            return this.getFetch(url, params)
        },
        putJson (url, data) {
            const params = {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }
            return this.getFetch(url, params)
        },
        deleteJson (url) {
            const params = {
                method: 'DELETE'
            }
            return this.getFetch(url, params)
        }
    },
    components: {
        cart,
        catalog,
        filterComp,
        errorComp
    }
}

export default main