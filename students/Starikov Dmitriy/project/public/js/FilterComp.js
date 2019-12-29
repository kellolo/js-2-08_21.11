Vue.component ('filter-comp', {
    template: `
        <form action="#" class="search-form">
            <input type="text" class="search-field" v-model="searchLine" @input="$root.$refs.cat.searchProducts(searchLine)">
            <button class="btn-search" type="submit">
                <i class="fas fa-search"></i>
            </button>
        </form>
    `,
    data () {
        return {
            searchLine: ''
        }
    }
})




// Vue.component ('filter-comp', {
//     template: `
//     <form action="#" class="search-form">
//         <input type="text" class="search-field">
//         <button class="btn-search" type="submit">
//             <i class="fas fa-search"></i>
//         </button>
//     </form>
//     `,
//     props: ['item', 'imgProp']
// })