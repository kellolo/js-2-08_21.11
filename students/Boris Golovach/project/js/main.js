let app = new Vue ({
    el: '#app',
    data: {
        url: 'https://raw.githubusercontent.com/Discipulus101/online-store-api/master/responses/catalogData.json',
        items: [],
        userCart: [],
        search: ""
    },
    methods: {
        getJSON (url) {
            return fetch (url)
                .then (d => d.json ())
        },
        //Функция поиска по наименовнию товара, работает только при полном совпадении символов
        filteredProducts(){
            if (this.search) {
                this.getJSON (this.url)
                    .then(data => {this.items = data})
                    .then(items => {this.items = this.items.filter(item => item.product_name == this.search)})
            } else {
                this.getJSON (this.url)
                    .then(data => {this.items = data})
                    .finally (() => {console.log(this.items)})
            }
        },
        clickHandler() {
            console.log('click');
        }
    },
    computed: {

    },
    mounted () {
        this.getJSON (this.url)
            .then(data => {this.items = data})
            .finally (() => {console.log(this.items)})
    },
})