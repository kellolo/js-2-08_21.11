let app = new Vue({
    el: '#app',
    data: {
        showCart: false

    },
    methods: {
        getJson(url) {
            return fetch(url)
                .then(result => result.json())
                .catch(err => {
                    console.log(err)
                })
        },
    },

})