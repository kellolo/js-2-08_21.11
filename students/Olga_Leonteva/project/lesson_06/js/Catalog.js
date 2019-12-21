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
        filterProducts (searchLine) {
            const regexp = new RegExp(searchLine, 'i')
            this.itemsFilter = this.items.filter(good => regexp.test(good.product_name))
    }
    },
})