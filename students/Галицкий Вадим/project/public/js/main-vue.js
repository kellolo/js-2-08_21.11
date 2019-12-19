let shop = new Vue ({
    el: '#shop',
    data: {
        APIs: 'https://raw.githubusercontent.com/LenaMaltseva/online-store-api/master/responses',
    },
    methods: {
        fetchData (url) {
            return fetch (`${this.APIs + url}`)
                    .then (dataJSON => dataJSON.json())
                    .catch (error => console.log(`Не удалось выполнить запрос к серверу: ${error}`))
        }
    }
})