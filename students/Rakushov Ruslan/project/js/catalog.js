Vue.component("catalog", {
  data() {
    return {
      urlCatalogData: "catalogData.json",
      image: "https://placehold.it/200x150",
      vItems: [],
      vSearchString: "",
    }
  },
  methods: {
    fetchDataToCatalog() {
      this.$root.getJson(this.urlCatalogData)
        .then(data => {
          this.vItems = data;
        });
    },
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
      <catalog-item class="product-item" v-for="prod in filteredItems" :item="prod" :img="image">
      </catalog-item>
    </template>
    <div class="catalog-empty" v-else>No products</div>
  </div>
  `,
});
