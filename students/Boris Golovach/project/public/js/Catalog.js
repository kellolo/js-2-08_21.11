Vue.component ('catalog', {
    data () {
        return {
            catalogUrl: '/catalogData.json',
            imgCatalog: 'https://placehold.it/200x150',
            items: [],
            filteredProducts: [],
        }
    },
    mounted () {
        this.$parent.getJson ('/catalog')
            .then (data => this.items = data)
            .then (data => this.filteredProducts = data)
    },
    methods: {
        productFiltering(searchData) {
            const regexp1 = new RegExp(searchData, 'i');
            if (searchData) {
                this.$parent.getJson ('/catalog')
                    .then(data => {this.filteredProducts = data})
                    .then(filteredProducts => {this.filteredProducts = this.filteredProducts.filter(item => regexp1.test(item.product_name))})   
            } 
            else {
                this.$parent.getJson ('/catalog')
                    .then(data => {this.filteredProducts = data})
                    .finally (() => {console.log(this.filteredProducts)})
            }
        },
    },
    template: `
            <div class="products">
                <catalog-item v-for="product of filteredProducts" :item="product" :imgProp="imgCatalog"></catalog-item>
            </div>
    `,
})