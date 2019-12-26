const API = 'https://raw.githubusercontent.com/Archtung/js-2-08_21.11/master/students/Dam%20Quang%20Tung/project/json'
// const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses'


let app = new Vue ({
    el: '#app',
    data: {
        
        
    },
    methods: {
        getJson (url) {
            return fetch (`${API + url}`)
            .then (result => result.json())
            .catch (err => {
                console.log (err)
            })
        },
    },
    
})