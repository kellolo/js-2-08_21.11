import catalogItem from './comp_catalogItem';

let catalog = {
    data () {
        return {
            items: [],
            filteredItems: []
        };
    },
    mounted () {
        this.$parent.getJson ('/catalog')
            .then (data => {
                this.items = data;
                this.filteredItems = this.items.slice();
            });
    },
    methods: {
        filterList(str) {
            const regexp = new RegExp(str, 'i');
            this.filteredItems = this.items.filter(item =>
                regexp.test(item.title));
        }
    },

    template: `
        <div class="products">
            <catalog-item v-for="product in filteredItems" :item="product" :key="product.id"></catalog-item>
        </div>
    `,
    components: {
        'catalog-item' : catalogItem
    }
}; 

export default catalog;