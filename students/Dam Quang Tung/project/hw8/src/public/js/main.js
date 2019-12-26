import cart from './comp_cart';
import catalog from './comp_catalog';
import serverError from './comp_error';
import searchFilter from './comp_filter';

let app = {
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
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data), 
            })
            .then(response => response.json())
            .catch (err => {
                this.smthWrong = true;
                console.log (err);
            }); 
        },
        deleteJson (url, data) {
            return fetch(url, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data), 
            })
            .then(response => response.json())
            .catch (err => {
                this.smthWrong = true;
                console.log (err);
            }); 
        },
    },
    components: {
        cart,
        catalog,
        'server-error': serverError,
        'search-filter': searchFilter
    }
};

export default app;