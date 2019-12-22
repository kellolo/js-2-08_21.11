
const API = 'https://raw.githubusercontent.com/ASVVlasov/online-store-api/master/responses/'

let app = new Vue ({
    el: '#app',
    data: {
        showCart: false
    },
    methods: {
        getJson (url) {
            return fetch (`${API + url}`)
            .then (result => result.json())
            .catch (err => {
                this.$root.$refs.errorComp.error(err)
            })
        },
    },
    
})