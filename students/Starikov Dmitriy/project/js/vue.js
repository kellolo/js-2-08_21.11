
let app = new Vue ({
    el: '#app',
    data: {
        API: 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses'
        
    },
    methods: {
        getJson (url) {
            return fetch (`${this.API + url}`)
            .then (result => result.json())
            .catch (err => {
                console.log (err)
            })
        },

        getJsonM (url) {
            return fetch (url)
                    .then (dataJSON => dataJSON.json())
        },

    },
    
})