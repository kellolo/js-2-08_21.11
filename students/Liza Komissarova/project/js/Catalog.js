Vue.component ('catalog', {
    data () {
        return {
            catalogUrl: '/catalogData.json',
            imgCatalog: 'https://placehold.it/200x150',
            items: []
        }
    },
    
    mounted () {
        this.$parent.getJson (this.catalogUrl)
            .then (data => this.items = data)
    },
    template: `
            <div class="products">
                <catalog-item v-for="product of items" :item="product" :imgProp="imgCatalog"></catalog-item>
            </div>
    `
})