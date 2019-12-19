Vue.component('products', {
    data() {
        return {
            jsonCatalog: 'https://raw.githubusercontent.com/matantsevs/html-geekbrains-work/master/catalog.json',
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