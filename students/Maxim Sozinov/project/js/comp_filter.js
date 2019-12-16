Vue.component ('search-filter', {
    data () {
        return {
            value: ''
        };
    },
    template: `
        <form action="#" class="search-form">
            <input type="text" class="search-field" v-model.trim="value">
            <button class="btn-search" type="submit" v-on:click="$root.$refs.catalog.filterList(value)">
                <i class="fas fa-search"></i>
            </button>
        </form>
    `
});