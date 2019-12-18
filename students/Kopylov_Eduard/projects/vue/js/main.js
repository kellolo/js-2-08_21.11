
let app = new Vue ({
    el: '#app',
    data: {

        //данные, формируемые/изменяемые внутри компонента
         image : 'https://placehold.it/200x150',
         cartImage : 'https://placehold.it/100x80',
         MY_API : 'https://raw.githubusercontent.com/KPEKZ/DataBase/master/responses/',
         GetBasket: 'getBasket.json',
         getCatalog: 'catalogData.json',
         Catalog: [],
         Cart: [],
        

    },
    methods: {
        // а ля "функции"

        getJSON (url) {
            return fetch (url)
                    .then (d => d.json ())
        },
        
        addProduct (product) {
                    let productId = +product.dataset['id']; //data-id="1"
                    let find = this.Cart.find (element => element.id_product === productId); //товар или false
                    if (!find) {
                        
                        let cartItem = ({
                            id_product: +product.dataset["id"],
                            product_name: product.dataset["name"],
                            price: product.dataset["price"],
                            quantity: 1,
                            img : 'https://placehold.it/100x80'

                          });
                          
                        this.Cart.push (cartItem)
                      
                    }  else {
                        find.quantity++
                    }
                    this.render()
                    },


                    removeProduct (product) {
                                let productId = +product.dataset['id'];
                                let find = this.Cart.find (element => element.id_product === productId);
                                if (find.quantity > 1) {
                                    find.quantity--;
                                } else {
                                    this.Cart.splice(this.Cart.indexOf(find), 1);
                                    document.querySelector(`.cart-item[data-id="${productId}"]`).remove()
                                }
                                this.render()
                            },
                        
            
                
                    render()
                    {
                        let trg = document.querySelector ('.cart-block')
                        let str = ''
                        this.Cart.forEach ( cartprod => {
                            str += this.Cartrender (cartprod)
                        })
                        trg.innerHTML = str
                    },

         

         Cartrender (cartprod) {
                    return `<div class="cart-item" data-id="${cartprod.id_product}">
                                <div class="product-bio">
                                    <img src="${cartprod.img}" alt="Some image">
                                    <div class="product-desc">
                                        <p class="product-title">${cartprod.product_name}</p>
                                        <p class="product-quantity">Quantity: ${cartprod.quantity}</p>
                                        <p class="product-single-price">$${cartprod.price} each</p>
                                    </div>
                                </div>
                                <div class="right-block">
                                    <p class="product-price">${cartprod.quantity *cartprod.price}</p>
                                    <button class="del-btn" data-id="${cartprod.id_product}">&times;</button>
                                </div>
                            </div>`
                }
        
            }, 
    computed: {
       
       
        
        // вычисляемые значения (а ля ф-ции, возвращающие рез-т)
    },
    // "хуки жизненного цикла" (а ля события, но касающиеся вью-компонента)
    mounted () {
       
            this.getJSON(this.MY_API+this.getCatalog)
            .then(data =>{this.Catalog = data} ),

            document.querySelector('.btn-cart').addEventListener('click', () => {
                    document.querySelector('.cart-block').classList.toggle('invisible');
                }),

            document.querySelector('.products').addEventListener ('click', (evt) => {
                    if (evt.target.classList.contains ('buy-btn')) {
                            this.addProduct (evt.target);
                     }
                 }),


                document.querySelector('.cart-block').addEventListener ('click', (evt) => {
                            if (evt.target.classList.contains ('del-btn')) {
                                 this.removeProduct (evt.target);
                            }
                        })
           
    },
    created () {
        
        
    }
})
