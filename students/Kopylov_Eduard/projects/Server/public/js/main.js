
MY_API = 'https://raw.githubusercontent.com/KPEKZ/DataBase/master/responses/'


let app = new Vue ({
    el: '#app',
    data: {
        image : 'https://placehold.it/200x150',
        cartImage : 'https://placehold.it/100x80',  
        show : false,
    },
    methods: {
        getJson (url) {
            return fetch (`${MY_API + url}`)
            .then (result => result.json())
            .catch (err => {
                console.log (err)
            })
        },

       
    },
    
})
