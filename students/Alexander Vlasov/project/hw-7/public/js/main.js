
let app = new Vue ({
    el: '#app',
    data: {
        showCart: false
    },
    methods: {
        getJson (url, params) {
            params = Object.assign({}, params, {
                headers: {
                    'Content-Type': 'application/json'
                }})
            return fetch (url, params)
            .then (result => result.json())
            .catch (err => {
                this.$root.$refs.errorComp.error(err)
            })
        },
    },
    
})