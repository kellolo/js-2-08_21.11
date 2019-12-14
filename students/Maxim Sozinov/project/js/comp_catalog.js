Vue.component ('catalog', {
    data () {
        return {
            FAKE_API_CATALOG: 'https://raw.githubusercontent.com/havkin/js-2-08_21.11/master/students/Maxim%20Sozinov/fake-server/catalogData.json',
            items: []
        };
    },
    mounted () {
        this.$parent.getJson (this.FAKE_API_CATALOG)
            .then (data => this.items = data);
    },
    template: `
        <div class="products">
            <catalog-item v-for="product in items" :item="product" :key="product.id"></catalog-item>
        </div>
    `
});