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
        //Simulate long data downloading
        setTimeout(() => {
          let xhr;
          if (window.XMLHttpRequest) {
            xhr = new XMLHttpRequest();
          } else if (window.ActiveXObject) {
            xhr = new ActiveXObject("Microsoft.XMLHTTP");
          }
          xhr.onreadystatechange = function() {
            if (xhr.readyState == 4 && xhr.status == 200) {
              resolve(JSON.parse(xhr.responseText));
            }
            if (xhr.readyState == 4 && xhr.status != 200)
            {
              reject(xhr.status);
            }
          };
          xhr.timeout = 10000;
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
