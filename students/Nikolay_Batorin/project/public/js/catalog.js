Vue.component('catalog', {
    data() {
        return {
            items: []
        }
    },

    mounted() {
        this.$parent.getJson('/catalog')
            .then(data => this.items = data)
    },
    template: `
            <div class="products">
                <catalog-item v-for="product of items" :item="product"></catalog-item>
            </div>
    `
})