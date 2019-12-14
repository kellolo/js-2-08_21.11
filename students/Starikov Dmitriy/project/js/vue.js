let app = new Vue ({
    el: '#app',
    data: {
        image: 'https://placehold.it/200x150',
        cartImage: 'https://placehold.it/100x80',
        Manarox: 'https://raw.githubusercontent.com/Manarox/css3-html5/master/Cat.json',
        GB_FAKE_API: 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses',
        items: [],
        filteredItems: [],
        cartItems: [],
        visibility: false,
        count: 0,
        searchLine: ''
    },
    methods: {
        fetchData (url) {
            return fetch (url)
                    .then (dataJSON => dataJSON.json())
        },
        showCart () {
            this.visibility = !this.visibility
        },
        addProduct (event) {
            this.fetchData(`${this.GB_FAKE_API}/addToBasket.json`)
                .then (data => {
                    if (data.result == 1) {
                        this.count++
                        let selectedProduct = {
                            'id_product': +event.target.dataset['id'],
                            'product_name': event.target.dataset['name'],
                            'price': event.target.dataset['price'],
                            'quantity': 1
                        }
                        let find = this.cartItems.find (element => element.id_product === selectedProduct.id_product)
                        if (!find) {
                            this.cartItems.push (selectedProduct)
                        }  else {
                            find.quantity++
                        }
                    } else {
                        alert("Ошибка")
                    }
                })
        },
        removeProduct (event) {
            this.fetchData (`${this.GB_FAKE_API}/deleteFromBasket.json`)
                .then (data => {
                    if (data.result == 1) {
                        this.count--
                        let productId = +event.target.dataset['id'];
                        let find = this.cartItems.find (element => element.id_product === productId);
                        if (find.quantity > 1) {
                            find.quantity--;
                        } else {
                            this.cartItems.splice(this.cartItems.indexOf(find), 1);
                        }
                    } else {
                        alert("Ошибка")
                    }
            })
        },

    },
    computed: {
    

    noCartItems () {
            return this.cartItems.length == 0 
        }
    },
    mounted () {
        this.fetchData(`${this.Manarox}`)
            .then (data => {
                this.items = data
            })
        this.fetchData(`${this.GB_FAKE_API}/getBasket.json`)   
            .then (data => {
                this.cartItems = data.contents
                this.cartItems.forEach(item => {
                    this.count++
                })
            })
    }
})