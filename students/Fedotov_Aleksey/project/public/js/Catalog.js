Vue.component ('catalog', {
    data () {
        return {
            catalogUrl: 'catalog',
            imgCatalog: 'https://placehold.it/200x150',
            items: []
        }
    },
    methods: {
        filterProduct(reg) {
            if (reg) {
                this.items = [];
                this.$parent.getJson(this.catalogUrl)
                .then(data => {
                    data.forEach(element => {
                        if (reg.test(element.product_name)) {
                            this.items.push(element);
                        }
                    })
                })
            }
        }
    },
    mounted () {
        this.$parent.getJson (this.catalogUrl)
            .then (data => this.items = data);
    },
    template: `
            <div class="products">
                <catalog-item v-for="product of items" :item="product" :imgProp="imgCatalog"></catalog-item>
            </div>
    `
})