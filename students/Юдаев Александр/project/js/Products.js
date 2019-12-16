Vue.component('products', {
    data() {
        return {
            jsonCatalog: 'https://raw.githubusercontent.com/Yudaev/js-2-08_21.11/master/students/%D0%AE%D0%B4%D0%B0%D0%B5%D0%B2%20%D0%90%D0%BB%D0%B5%D0%BA%D1%81%D0%B0%D0%BD%D0%B4%D1%80/project/JSON/catalog.json',
            items: []
        };
    },
    mounted(){
        this.$parent.getJSON(this.jsonCatalog)
            .then (data => {this.items = data;});
    },
    template: `
        <div class="products">
            <product v-for="product of items" :item="product"></product>
        </div>
    `
});