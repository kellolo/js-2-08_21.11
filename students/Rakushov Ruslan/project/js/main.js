const app = new Vue({
  el: "#app",
  data: {
    shopName: "E-SHOP. developed with Vue",
    urlAPI:
      "https://raw.githubusercontent.com/rri9/js-2-08_21.11/" +
      "master/students/Rakushov%20Ruslan/Others/responses/",
  },
  methods: {
    getJson(url) {
      // return fetch(this.url).then(data => data.json());
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          //Simulate long data downloading
          let xhr = new XMLHttpRequest();
          xhr.onreadystatechange = function() {
            if (xhr.readyState == 4 && xhr.status == 200) {
              resolve(JSON.parse(xhr.responseText));
            }
          };
          xhr.open("GET", this.urlAPI + url, true);
          xhr.send();
        }, 1500);
      });
    },
    mounted() {
      //Removed to components
      // this.$refs.catalog.fetchDataToCatalog();
      // this.fetchDataToCart();
    },
  },
});
