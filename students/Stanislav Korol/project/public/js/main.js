//const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses'


let app = new Vue ({
    el: '#app',
    data: {
        cartImage: 'https://placehold.it/100x80',
        cartUrl: '/getBasket.json'
    },
    methods: {
        getJson (url) {
            return fetch (`${url}`)
            .then (result => result.json())
            .catch (err => {
                console.log (err)
            })
        },
        postJson (url, data) {
            return promisePostRequest (`${url}`, data)
            .then (result => result)
            .catch (err => {
                console.log (err)
            })
        }
    }
})



function promisePostRequest (url, params) {
    return new Promise ((resolve, reject) => {
        let xhr = new XMLHttpRequest()
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status == 200) {
                    resolve (xhr.responseText)
                } else {
                    reject (xhr.status)
                }
            }
        }
        xhr.open('POST', url, true) 
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
        xhr.send(params)
    })
}