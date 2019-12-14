Vue.component("catalog", {
  data: function() {
    return {
      urlCatalogData: "catalogData.json",
      image: "https://placehold.it/200x150",
      vItems: [],
      vSearchString: "",
      isDataLoading: false,
    }
  },
  methods: {
    fetchDataToCatalog() {
      this.isDataLoading = true;
      this.$root.getJson(this.urlCatalogData)
        .then(data => {
          this.vItems = data;
          this.isDataLoading = false;
        });
    },
    setSearchString(str) {
      this.vSearchString = str;
    }
  },
  computed: {
    filteredItems: function () {
    let searchString = this.vSearchString;
      if (!searchString) {
        return this.vItems;
      } else {
        let searchRegexp = new RegExp(`${searchString}+`, "gi");
        return this.vItems.filter(item =>
          searchRegexp.test(item.title)
        );
      }
    }
  },
  mounted() {
    this.fetchDataToCatalog(this.urlCatalogData);
  },
  template: `
  <div class="products">
    <template v-if="filteredItems.length > 0">
      <catalog-item class="product-item" v-for="prod in filteredItems" :item="prod" :img="image" :key="prod.id">
      </catalog-item>
    </template>
    <data-loading class="catalog-empty" v-if="isDataLoading">No products</data-loading>
  </div>
  `,
});
