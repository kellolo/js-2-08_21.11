Vue.component ('filter-comp', {
    template: `
    <form action="#" class="search-form">
        <input type="text" class="search-field" v-model="searchText">
        <button class="btn-search" type="submit">
            <i class="fas fa-search"></i>
        </button>
    </form>
    `,
    data () {
        return {
            searchText: ''
        }
    }
})