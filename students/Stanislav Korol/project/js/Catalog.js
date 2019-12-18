Vue.component ('catalog', {
    data () {
        return {
            catalogUrl: '/catalogData.json',
            imgCatalog: 'https://placehold.it/200x150',
            items: [],
            query: ''
        }
    },
    computed: {
        filteredList() {
            return (this.query == "") ? this.items : this.items.filter(el => el.product_name.match(new RegExp(this.query, "gi")) !== null)
        }
    },
    methods:{
        filterList(query){
            this.query = query
        }
    },
    mounted () {
        this.$parent.getJson (this.catalogUrl)
            .then (data => this.items = data)
    },
    template: `
        <div class="products">
            <p v-if="filteredList.length == 0">Нет данных</p>
            <catalog-item v-for="product of filteredList" :item="product" :imgProp="imgCatalog"></catalog-item>
        </div>
    `
})