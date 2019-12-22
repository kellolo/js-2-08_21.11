Vue.component("data-empty", {
  props: ["error"],
  template: `
  <div class="catalog-error">Error loading products (status: {{error}})</div>
  `
})