//TODO Add amount & countGoods in Cart (for add & del methods)
//TODO При добавлении товара в корзину брать данные по id из каталога, а не из объекта клика "купить"

const app = new Vue({
  el: "#app",
  data: {
    shopName: "E-SHOP. developed with Vue",
    // urlAPI:
    // "https://raw.githubusercontent.com/rri9/js-2-08_21.11/" +
    // "master/students/Rakushov%20Ruslan/Others/responses/",
    // "http://localhost:3000",
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
            if (xhr.readyState == 4 && xhr.status != 200) {
              reject(xhr.status);
            }
          };
          xhr.timeout = 10000;
          // xhr.open("GET", this.urlAPI + url, true);  //same server - don't need full address
          xhr.open("GET", url, true);
          xhr.send();
        }, 1500);
      });
    },
    postReq(url, data) {
      return new Promise((resolve, reject) => {
        let xhr;
        if (window.XMLHttpRequest) {
          xhr = new XMLHttpRequest();
        } else if (window.ActiveXObject) {
          xhr = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xhr.onreadystatechange = function () {
          if (xhr.readyState == 4) {
            if (xhr.status == 200) {
              resolve(JSON.parse(xhr.responseText));
            } else {
              console.log(xhr.status);
              reject(xhr.status);
            }
          }
        };
        xhr.timeout = 10000;
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
        let newItemStr = `{"id": ${data.dataset["id"]}, "title": "${data.dataset["title"]}", "price": ${data.dataset["price"]}}`;
        //debug
        console.log(newItemStr);
        xhr.send(newItemStr);
      });
    },
    mounted() {
      //Removed to components
      // this.$refs.catalog.fetchDataToCatalog();
      // this.fetchDataToCart();
    },
  },
});
