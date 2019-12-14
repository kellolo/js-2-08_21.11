Vue.component ('filter-comp', {
    data() {
        return {
            search: '',
        }
    },
    template: 
        `
        <form action="#" class="search-form">
            <input type="text" class="search-field" v-model="search">
            <button class="btn-search" type="submit" @click="$root.$refs.cat.filterProducts(search)">
                <i class="fas fa-search"></i>
            </button>
        </form>
        `,
    //props: ['value']

    

})