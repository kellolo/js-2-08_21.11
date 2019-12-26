
let app = new Vue ({
    el: '#app',
    data: {
        //API: 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses'
        
    },
    methods: {
        getJson (url) {
            return fetch (url)
            .then (result => result.json())
            .catch (err => {
                console.log (err)
            })
        },
        changeData (url, reqBody) {
            let options = {
                method: 'POST',
                headers: {'Content-Type': 'application/json; charset=utf-8'},
                body: JSON.stringify(reqBody)
            }
            return fetch (url, options)
                    .then (dataJSON => dataJSON.json())
                    .catch (error => console.log(`Не удалось изменить данные: ${error}`))
        }

        // getJsonM (url) {
        //     return fetch (url)
        //             .then (dataJSON => dataJSON.json())
        // },

    },
    
})