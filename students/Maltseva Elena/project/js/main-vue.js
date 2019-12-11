let shop = new Vue ({
    el: '#shop',
    data: {
        image: 'https://placehold.it/200x150',
        cartImage: 'https://placehold.it/100x80',
        APIs: 'https://raw.githubusercontent.com/LenaMaltseva/online-store-api/master/responses',
        items: [],
        filteredItems: [],
        cartItems: [],
        visibility: false,
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
            this.fetchData(`${this.APIs}/addToBasket.json`)
                .then (data => {
                    if (data.result == 1) {
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
                        alert("В процессе добавления товара возникла ошибка")
                    }
                })
        },
        removeProduct (event) {
            this.fetchData (`${this.APIs}/deleteFromBasket.json`)
                .then (data => {
                    if (data.result == 1) {
                        let productId = +event.target.dataset['id'];
                        let find = this.cartItems.find (element => element.id_product === productId);
                        if (find.quantity > 1) {
                            find.quantity--;
                        } else {
                            this.cartItems.splice(this.cartItems.indexOf(find), 1);
                        }
                    } else {
                        alert("В процессе удаления товара возникла ошибка")
                    }
            })
        },
        searchProducts(items) {
            if (this.searchLine.length < 1) {
                return this.items
            } else {
                let searchRequest = new RegExp (this.searchLine, 'gi')
                return this.filteredItems = items.filter(item => {
                    return searchRequest.test(item.product_name)
                })
            }
        }
    },
    computed: {
        noCartItems () {
            return this.cartItems.length == 0 
        }
    },
    mounted () {
        this.fetchData(`${this.APIs}/catalogData.json`)
            .then (dataArr => {
                this.items = dataArr
                this.filteredItems = dataArr
            })

        this.fetchData(`${this.APIs}/getBasket.json`)
            .then (dataArr => (this.cartItems = dataArr.contents))
    }
})