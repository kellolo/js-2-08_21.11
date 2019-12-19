let shop = new Vue ({
    el: '#shop',
    methods: {
        fetchData (url) {
            return fetch (url)
                    .then (dataJSON => dataJSON.json())
                    .catch (error => console.log(`Не удалось выполнить запрос к серверу: ${error}`))
        },
        changeData (url, options) {
            return fetch (url, options)
                    .then (dataJSON => dataJSON.json())
                    .catch (error => console.log(`Не удалось изменить данные: ${error}`))
        }
    }
})
