Vue.component ('catalog', {
    data () {
        return {
            catalogUrl: 'https://raw.githubusercontent.com/izumpazik/js-2-08_21.11/master/students/Valeria%20Manannikova/project/catalog.json',
            imgCatalog: 'https://fainaidea.com/wp-content/uploads/2015/11/buy.jpg',
            items: []
        }
    },
    
    mounted () {
        this.$parent.getJson ('/catalog')
            .then (data => this.items = data)
    },
    template: `
            <div class="products">
                <catalog-item v-for="product of items" :item="product" :imgProp="imgCatalog"></catalog-item>
            </div>
    `
})