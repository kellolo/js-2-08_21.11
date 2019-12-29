Vue.component ('catalog', {
    data () {
        return {
            catalogUrl: '/catalogData.json',
            Manarox: '/Manarox',
            items: [],
            filteredItems: []
        }
    },

    mounted () {
        this.$parent.getJson (this.Manarox)
            .then (data => this.items = this.filteredItems = data )
    },
    methods: {
        searchProducts(searchLine) {
            if (searchLine.length == 0) {
                return this.filteredItems = this.items
            } else {
                let searchRequest = new RegExp (searchLine, 'gi')
                return this.filteredItems = this.items.filter(item => {
                    return searchRequest.test(item.product_name)
                })
            }
        }
    },
    template: `
    <div class="products">
        <div class="empty" v-if="filteredItems.length == 0">Товары не найдены</div>
        <catalog-item v-else v-for="item in filteredItems" :item="item" :imgProp="item.img"></catalog-item>
    </div>
    `
})

// <div class="products">
// <catalog-item v-for="product of items" :item="product" :imgProp="product.img"></catalog-item>
// </div>