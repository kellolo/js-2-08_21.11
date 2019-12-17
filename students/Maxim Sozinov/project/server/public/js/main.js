let app = new Vue ({
    el: '#app',
    data: {
        smthWrong: false
    },
    methods: {
        getJson (url) {
            return fetch (url)
            .then (result => result.json())
            .catch (err => {
                this.smthWrong = true;
                console.log (err);
            });
        },
    }
});