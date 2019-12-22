const search = {
  
  data() {
    return {searchLine: ''};
  },
  
  template: `
    <form action="#" class="search-form"
    @submit.prevent="$root.$refs.goods.filter(searchLine)">
      <input type="text" class="search-field" v-model="searchLine">
      <button class="btn-search" type="submit">
        <i class="fas fa-search"></i>
      </button>
    </form>`
    
};

export default search
      