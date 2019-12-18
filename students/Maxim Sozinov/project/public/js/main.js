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
        putJson (url, data) {
            return fetch(url, {
                method: 'POST',
                // mode: 'cors', // no-cors, cors, *same-origin
                // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                // credentials: 'same-origin', // include, *same-origin, omit
                headers: {
                    'Content-Type': 'application/json',
                },
                // redirect: 'follow', // manual, *follow, error
                // referrer: 'no-referrer', // no-referrer, *client
                body: JSON.stringify(data), // тип данных в body должен соответствовать значению заголовка "Content-Type"
            })
            .then(response => response.json())
            .catch (err => {
                this.smthWrong = true;
                console.log (err);
            }); 
        }
    }
});