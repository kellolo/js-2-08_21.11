Vue.component("search", {
    data() {
        return {
            filter: String
        }
    },
    methods: {
        filterCatalog() {
            eventBus.$emit("search", this.filter)
        }
    },
    template: `<form action="#" class="search">
                    <input type="text" class="search__filter" v-model="filter">
                    <button class="search__btnSearch" type="submit" @click="filterCatalog">
                        <i class="fas fa-search"></i>
                    </button>
                </form>`,
    created() {
        this.filter = ""
    }
})