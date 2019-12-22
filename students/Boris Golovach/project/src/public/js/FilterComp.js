let filterComp = {
    data() {
        return {
            searchData: ""
        }
    },
    template: `
        <form action="#" class="search-form">
            <input type="text" class="search-field" v-model="searchData">
            <button @click="$root.$refs.cat.productFiltering(searchData)" class="btn-search" type="submit">
                <i class="fas fa-search"></i>
            </button>
        </form>
    `
}

export default filterComp