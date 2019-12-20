import item from './CatalogItem'

let catalog = {
    data () {
        return {
            catalogUrl: '/catalogData.json',
            imgCatalog: 'https://placehold.it/200x150',
            items: []
        }
    },
    
    mounted () {
        this.$parent.getJson ('/catalog')
            .then (data => this.items = data)
    },
    template: `
            <div class="products">
                <item v-for="product of items" :item="product" :imgProp="imgCatalog"></item>
            </div>
    `,
    components: {
        item
    }
}

export default catalog