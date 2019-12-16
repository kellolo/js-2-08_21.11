Vue.component ('catalog', {
    data () {
        return {
            catalogUrl: '/catalogData.json',
            imgCatalog: 'https://placehold.it/200x150',
            items: [],
            itemsFilter: []
        }
    },    
    mounted () {
        this.$parent.getJson (this.catalogUrl)
            .then (data => this.itemsFilter = data)
            .then (data => this.items = data)
    },
    template: `
            <div class="products">
                <catalog-item v-for="product of itemsFilter" :item="product" :imgProp="imgCatalog"></catalog-item>
            </div>
    `,
    methods: {
        filterProducts(searchLine) {
            if (searchLine.length == 0) {
                return this.itemsFilter = this.items
            } else {
                let searchRequest = new RegExp (searchLine, 'i')
                return this.itemsFilter = this.items.filter(item => {
                    return searchRequest.test(item.product_name)
                })
            }
        }
    },
})