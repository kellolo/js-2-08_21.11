import catalogItem from "./CatalogItem";

let catalog = {
    data () {
        return {
            catalogUrl: 'catalog',
            imgCatalog: 'https://placehold.it/200x150',
            filterUrl: 'filter',
            items: []
        }
    },
    methods: {
        filterProduct(reg) {
            if (reg) {
                console.log(reg);
                this.$parent.getJsonPost(this.filterUrl, reg)
                .then(resolve => {
                    if (resolve.status !== 200) {
                        return Promise.reject(new Error(resolve.statusText))
                    }
                    return resolve.json();
                })
                .then(data => {
                    console.log(data);
                    if (data.result !== 1) {
                        return Promise.reject(new Error("Не удалось добавить товар в корзину"))
                    } else {
                        this.items = data.filter;
                    }
                })
                .catch( error => console.log("error", error));
            }
        }
    },
    mounted () {
        this.$parent.getJson (this.catalogUrl)
            .then (data => this.items = data)
            .then (() => {console.log('хрень',data)});
    },
    template: `
            <div class="products">
                <catalog-item v-for="product of items" :item="product" :imgProp="imgCatalog"></catalog-item>
            </div>
    `,
    components: {
        'catalog-item': catalogItem
    }
}

export default catalog;