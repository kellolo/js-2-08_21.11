Vue.component("search", {
  data: function() {
    return {
      searchString: "",
    }
  },
  methods: {
    setSearchString() {
      this.$root.$refs.catalog.setSearchString(this.searchString);
    }
  },
  computed: {},
  template: `
  <form action="#" class="search-form">
    <input type="text" class="search-field" v-model="searchString" @keyup="setSearchString"/>
    <button class="btn-search" type="submit">
      <i class="fas fa-search"></i>
    </button>
  </form>
  `,
});
