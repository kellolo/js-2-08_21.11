Vue.component('catalog', {
    data () {
        return {
            imgCatalog: 'https://placehold.it/200x150',
            catalogUrl: '/catalogData.json',
            items: []
        }
    }, 
    
    mounted () {
        this.$parent.getJSON ('/catalog')
            .then (data => this.items = data)
    }, 
    template: `
        <div class="products">
            <catalog-item v-for="product of items" :item="product" :imgProp="imgCatalog"></catalog-item>
        </div>
        `
})

