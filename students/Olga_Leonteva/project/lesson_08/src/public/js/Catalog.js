import catalogItem from "./CatalogItem"
import filterComp from "./FilterComp"

let catalog = {
    data () {
        return {
            imgCatalog: 'https://placehold.it/200x150',
            items: [],
            itemsFilter: []
        }
    },    
    mounted () {
        this.$parent.getJson ('/catalog')
            .then (data => this.itemsFilter = data)
            .then (data => this.items = data)
    },
    template: `
            <div class="products">
                <catalog-item v-for="product of itemsFilter" :item="product" :imgProp="imgCatalog"></catalog-item>
            </div>
    `,
    methods: {
        filterProducts (searchLine) {
            const regexp = new RegExp(searchLine, 'i')
            this.itemsFilter = this.items.filter(good => regexp.test(good.product_name))
    }
    },
    components: {
        'catalog-item': catalogItem,
        'filter-comp': filterComp

    }
}
export default catalog