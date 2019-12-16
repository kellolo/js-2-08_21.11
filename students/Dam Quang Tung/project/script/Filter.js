Vue.component ('filter-comp', {
    data() {
        return {
            searchLine: '',
        }
    },
    template: 
        `
        <form action="#" class="search-form">
            <input type="text" class="search-field" v-model="searchLine">
            <button class="btn-search" type="submit" @click="$root.$refs.cat.filterProducts(searchLine)">
                <i class="fas fa-search"></i>
            </button>
        </form>
        `,
})