import catalogItem from "./catalogItem"
import dataEmpty from "./dataEmpty"
import dataLoading from "./dataLoading"

let catalog = {
  data: function() {
    return {
      urlCatalogData: "./catalogData.json",
      image: "https://placehold.it/200x150",
      vItems: [],
      vSearchString: "",
      isDataLoading: false,
      isDataEmpty: false,
      isDataEmptyError: undefined,
    }
  },
  methods: {
    fetchDataToCatalog() {
      this.isDataLoading = true;
      this.$root.getJson(this.urlCatalogData)
        .then(data => {
          this.vItems = data;
          this.isDataLoading = false;
        },
          (error) => {
            console.log(`Request status: ${error}`);
            this.isDataLoading = false;
            this.isDataEmpty = true;
            this.isDataEmptyError = error;
          }
        )
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
    <data-loading v-if="isDataLoading"></data-loading>
    <data-empty v-if="isDataEmpty" :error="isDataEmptyError"></data-empty>
  </div>
  `,
  components: {
    "catalog-item": catalogItem,
    "data-empty": dataEmpty,
    "data-loading": dataLoading
  }
};

export default catalog;