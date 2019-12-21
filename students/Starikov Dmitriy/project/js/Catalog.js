Vue.component ('catalog', {
    data () {
        return {
            catalogUrl: '/catalogData.json',
            Manarox: 'https://raw.githubusercontent.com/Manarox/css3-html5/master/Cat.json',
            items: [],
        }
    },

    mounted () {
        this.$parent.getJsonM (this.Manarox)
            .then (data => this.items = data)
    },


    template: `
    <div class="products">
        <catalog-item v-for="product of items" :item="product" :imgProp="product.img"></catalog-item>
    </div>
    `
})