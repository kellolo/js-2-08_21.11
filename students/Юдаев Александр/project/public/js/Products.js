Vue.component('products', {
    data() {
        return {
            jsonCatalog: '/catalog',
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