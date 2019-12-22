let shop = new Vue ({
    el: '#shop',
    methods: {
        fetchData (url) {
            return fetch (url)
                    .then (dataJSON => dataJSON.json())
                    .catch (error => console.log(`Не удалось выполнить запрос к серверу: ${error}`))
        },
        postData (url, reqBody) {
            return fetch (url, {
                method: 'POST',
                headers: {'Content-Type': 'application/json; charset=utf-8'},
                body: JSON.stringify(reqBody)
            })
                    .then (dataJSON => dataJSON.json())
                    .catch (error => console.log(`Не удалось изменить данные: ${error}`))
        },
        putData (url, reqBody) {
            return fetch (url, {
                method: 'PUT',
                headers: {'Content-Type': 'application/json; charset=utf-8'},
                body: JSON.stringify(reqBody)
            })
                    .then (dataJSON => dataJSON.json())
                    .catch (error => console.log(`Не удалось изменить данные: ${error}`))
        },
        delData (url){
            return fetch (url, {
                method: 'DELETE',
                headers: {'Content-Type': 'application/json; charset=utf-8'}
            })
                    .then (dataJSON => dataJSON.json())
                    .catch (error => console.log(`Не удалось изменить данные: ${error}`))
        }
    }
})
