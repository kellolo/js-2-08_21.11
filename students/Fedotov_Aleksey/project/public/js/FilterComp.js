Vue.component('product-search',{
    data() {
        return {
            regSearch: undefined
        }
    },
    methods: {
        toSearch() {
            // this.$root.$refs.cat.filterProduct(this.regStr);
            this.$root.$refs.cat.filterProduct(this.regSearch);
        }
    },
    computed: {
        // regStr: function() {
        //     return new RegExp(this.regSearch,"i");
        // }
    },
    mounted() {
    },
    template: `
        <form action="#" class="search-form">
            <input v-model.lazy = "regSearch" id = "search" type="text" class="search-field" placeholder = "Поиск">
            <button @click = "toSearch" class="btn-search" type="submit">
                <i class="fas fa-search"></i>
            </button>
        </form>
    `
})