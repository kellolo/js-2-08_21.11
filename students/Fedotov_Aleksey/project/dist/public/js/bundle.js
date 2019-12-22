/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _public_js_main__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./public/js/main */ \"./src/public/js/main.js\");\n/* harmony import */ var _public_style_normalize_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./public/style/normalize.css */ \"./src/public/style/normalize.css\");\n/* harmony import */ var _public_style_normalize_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_public_style_normalize_css__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _public_style_style_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./public/style/style.css */ \"./src/public/style/style.css\");\n/* harmony import */ var _public_style_style_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_public_style_style_css__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\nvar app = new Vue(_public_js_main__WEBPACK_IMPORTED_MODULE_0__[\"default\"]);\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/public/js/Cart.js":
/*!*******************************!*\
  !*** ./src/public/js/Cart.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _CartItem__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CartItem */ \"./src/public/js/CartItem.js\");\n\nvar cart = {\n  data: function data() {\n    return {\n      basketUrl: 'cart',\n      addUrl: 'addToCart',\n      removeUrl: 'removeFromCart',\n      amount: 0,\n      count: 0,\n      imgCart: 'https://placehold.it/100x80',\n      cartItems: [],\n      elementIdToFindInCart: undefined,\n      emptyCart: true\n    };\n  },\n  mounted: function mounted() {\n    var _this = this;\n\n    this.$parent.getJson(this.basketUrl).then(function (data) {\n      console.log(data);\n      _this.cartItems = data.contents;\n      _this.amount = data.amount;\n      _this.count = data.countGoods;\n    });\n  },\n  methods: {\n    quaryToAdd: function quaryToAdd(product) {\n      var _this2 = this;\n\n      var findProd = this.cartItems.find(function (item) {\n        return item.id_product === product.id_product;\n      });\n\n      if (findProd) {\n        this.$parent.getJsonPut(this.basketUrl + '/' + product.id_product, {\n          op: 1\n        }).then(function (data) {\n          if (data) {\n            findProd.quantity++;\n          }\n        });\n      } else {\n        this.$parent.getJsonPost(this.basketUrl, product).then(function (data) {\n          if (data) {\n            _this2.cartItems.push(Object.assign({}, product, {\n              quantity: 1\n            }));\n          }\n        });\n      }\n    },\n    generateNewProductInCart: function generateNewProductInCart(product) {\n      var newProductToCart = {\n        product_name: product.product_name,\n        price: product.price,\n        id_product: product.id_product,\n        quantity: 1\n      };\n      this.cartItems.push(newProductToCart);\n    },\n    queryRemoveProduct: function queryRemoveProduct(product) {\n      var _this3 = this;\n\n      var findProd = this.cartItems.find(function (item) {\n        return item.id_product === product.id_product;\n      });\n\n      if (findProd.quantity > 1) {\n        this.$parent.getJsonPut(this.basketUrl + '/' + product.id_product, {\n          op: -1\n        }).then(function (data) {\n          if (data) {\n            findProd.quantity--;\n          }\n        });\n      } else {\n        this.$parent.getJsonDelete(this.basketUrl + '/' + product.id_product).then(function (data) {\n          if (data) {\n            _this3.cartItems.splice(_this3.cartItems.indexOf(product), 1);\n          }\n        });\n      }\n    }\n  },\n  computed: {\n    inCart: function inCart() {\n      var _this4 = this;\n\n      return this.cartItems.findIndex(function (el) {\n        return _this4.elementIdToFindInCart == el.id_product;\n      });\n    },\n    isEmptyCart: function isEmptyCart() {\n      return this.cartItems.length > 0 ? false : true;\n    }\n  },\n  template: \"\\n        <div class=\\\"cart-block\\\" >\\n        <p v-if = \\\"this.emptyCart\\\">\\u041A\\u043E\\u0440\\u0437\\u0438\\u043D\\u0430 \\u043F\\u0443\\u0441\\u0442\\u0430\\u044F</p>\\n            <cart-item v-for = \\\"cartItem of cartItems\\\" :item = \\\"cartItem\\\" :img = \\\"imgCart\\\"></cart-item>\\n        </div>\\n    \",\n  comonents: {\n    'cart-item': _CartItem__WEBPACK_IMPORTED_MODULE_0__[\"default\"]\n  }\n};\n/* harmony default export */ __webpack_exports__[\"default\"] = (cart);\n\n//# sourceURL=webpack:///./src/public/js/Cart.js?");

/***/ }),

/***/ "./src/public/js/CartItem.js":
/*!***********************************!*\
  !*** ./src/public/js/CartItem.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nvar cartItem = {\n  template: \"\\n        <div class=\\\"product-bio\\\">\\n        <img :src=\\\"img\\\" alt=\\\"Some image\\\">\\n            <div class=\\\"product-desc\\\">\\n                <p class=\\\"product-title\\\">{{item.product_name}}</p>\\n                <p class=\\\"product-quantity\\\">Quantity: {{item.quantity}}</p>\\n                <p class=\\\"product-single-price\\\">{{item.price}} each</p>\\n            </div>\\n            <div class=\\\"right-block\\\">\\n            <p class=\\\"product-price\\\">{{item.quantity*item.price}}</p>\\n            <button @click = \\\"$parent.queryRemoveProduct(item)\\\">&times;</button>\\n        </div>\\n        </div>\\n    \",\n  props: ['item', 'img']\n};\n/* harmony default export */ __webpack_exports__[\"default\"] = (cartItem);\n\n//# sourceURL=webpack:///./src/public/js/CartItem.js?");

/***/ }),

/***/ "./src/public/js/Catalog.js":
/*!**********************************!*\
  !*** ./src/public/js/Catalog.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _CatalogItem__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CatalogItem */ \"./src/public/js/CatalogItem.js\");\n\nvar catalog = {\n  data: function data() {\n    return {\n      catalogUrl: 'catalog',\n      imgCatalog: 'https://placehold.it/200x150',\n      filterUrl: 'filter',\n      items: []\n    };\n  },\n  methods: {\n    filterProduct: function filterProduct(reg) {\n      var _this = this;\n\n      if (reg) {\n        console.log(reg);\n        this.$parent.getJsonPost(this.filterUrl, reg).then(function (resolve) {\n          if (resolve.status !== 200) {\n            return Promise.reject(new Error(resolve.statusText));\n          }\n\n          return resolve.json();\n        }).then(function (data) {\n          console.log(data);\n\n          if (data.result !== 1) {\n            return Promise.reject(new Error(\"Не удалось добавить товар в корзину\"));\n          } else {\n            _this.items = data.filter;\n          }\n        })[\"catch\"](function (error) {\n          return console.log(\"error\", error);\n        });\n      }\n    }\n  },\n  mounted: function mounted() {\n    var _this2 = this;\n\n    this.$parent.getJson(this.catalogUrl).then(function (data) {\n      return _this2.items = data;\n    }).then(function () {\n      console.log('хрень', data);\n    });\n  },\n  template: \"\\n            <div class=\\\"products\\\">\\n                <catalog-item v-for=\\\"product of items\\\" :item=\\\"product\\\" :imgProp=\\\"imgCatalog\\\"></catalog-item>\\n            </div>\\n    \",\n  components: {\n    'catalog-item': _CatalogItem__WEBPACK_IMPORTED_MODULE_0__[\"default\"]\n  }\n};\n/* harmony default export */ __webpack_exports__[\"default\"] = (catalog);\n\n//# sourceURL=webpack:///./src/public/js/Catalog.js?");

/***/ }),

/***/ "./src/public/js/CatalogItem.js":
/*!**************************************!*\
  !*** ./src/public/js/CatalogItem.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nvar catalogItem = {\n  template: \"\\n    <div class=\\\"product-item\\\" >\\n        <img :src=\\\"imgProp\\\" alt=\\\"Some img\\\">\\n        <div class=\\\"desc\\\">\\n            <h3> {{item.product_name}} </h3>\\n            <p>{{item.price}} $</p>\\n            <button class=\\\"buy-btn\\\" @click=\\\"$root.$refs.cart.quaryToAdd(item)\\\">\\u041A\\u0443\\u043F\\u0438\\u0442\\u044C</button>\\n        </div>\\n    </div>\\n    \",\n  props: ['item', 'imgProp']\n};\n/* harmony default export */ __webpack_exports__[\"default\"] = (catalogItem);\n\n//# sourceURL=webpack:///./src/public/js/CatalogItem.js?");

/***/ }),

/***/ "./src/public/js/FilterComp.js":
/*!*************************************!*\
  !*** ./src/public/js/FilterComp.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nvar productSearch = {\n  data: function data() {\n    return {\n      regSearch: undefined\n    };\n  },\n  methods: {\n    toSearch: function toSearch() {\n      // this.$root.$refs.cat.filterProduct(this.regStr);\n      this.$root.$refs.cat.filterProduct(this.regSearch);\n    }\n  },\n  computed: {},\n  mounted: function mounted() {},\n  template: \"\\n        <form action=\\\"#\\\" class=\\\"search-form\\\">\\n            <input v-model.lazy = \\\"regSearch\\\" id = \\\"search\\\" type=\\\"text\\\" class=\\\"search-field\\\" placeholder = \\\"\\u041F\\u043E\\u0438\\u0441\\u043A\\\">\\n            <button @click = \\\"toSearch\\\" class=\\\"btn-search\\\" type=\\\"submit\\\">\\n                <i class=\\\"fas fa-search\\\"></i>\\n            </button>\\n        </form>\\n    \"\n};\n/* harmony default export */ __webpack_exports__[\"default\"] = (productSearch);\n\n//# sourceURL=webpack:///./src/public/js/FilterComp.js?");

/***/ }),

/***/ "./src/public/js/main.js":
/*!*******************************!*\
  !*** ./src/public/js/main.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Cart__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Cart */ \"./src/public/js/Cart.js\");\n/* harmony import */ var _Catalog__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Catalog */ \"./src/public/js/Catalog.js\");\n/* harmony import */ var _FilterComp__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./FilterComp */ \"./src/public/js/FilterComp.js\");\n\n\n\nvar API = 'https://raw.githubusercontent.com/WebAlex-coder/json_files/master';\nvar app = {\n  el: '#app',\n  data: {\n    cartImage: 'https://placehold.it/100x80',\n    showCart: true\n  },\n  methods: {\n    getJson: function getJson(url) {\n      console.log(\"Отправляю запрос\");\n      return fetch(\"\".concat(url)).then(function (result) {\n        return result.json();\n      })[\"catch\"](function (err) {//console.log (err)\n      });\n    },\n    getJsonPost: function getJsonPost(url, data) {\n      return fetch(\"\".concat(url), {\n        method: 'POST',\n        headers: {\n          'Content-Type': 'application/json'\n        },\n        body: JSON.stringify(data)\n      }).then(function (result) {\n        return result.json();\n      })[\"catch\"](function (err) {\n        console.log(err);\n      });\n    },\n    getJsonPut: function getJsonPut(url, data) {\n      return fetch(\"\".concat(url), {\n        method: 'PUT',\n        headers: {\n          'Content-Type': 'application/json'\n        },\n        body: JSON.stringify(data)\n      }).then(function (result) {\n        return result.json();\n      })[\"catch\"](function (err) {\n        console.log(err);\n      });\n    },\n    getJsonDelete: function getJsonDelete(url) {\n      return fetch(\"\".concat(url), {\n        method: 'DELETE',\n        headers: {\n          'Content-Type': 'application/json'\n        }\n      }).then(function (result) {\n        return result.json();\n      })[\"catch\"](function (err) {\n        console.log(err);\n      });\n    },\n    toShowCart: function toShowCart() {\n      this.showCart = !this.showCart;\n    }\n  },\n  components: {\n    cart: _Cart__WEBPACK_IMPORTED_MODULE_0__[\"default\"],\n    catalog: _Catalog__WEBPACK_IMPORTED_MODULE_1__[\"default\"],\n    'product-search': _FilterComp__WEBPACK_IMPORTED_MODULE_2__[\"default\"]\n  }\n};\n/* harmony default export */ __webpack_exports__[\"default\"] = (app);\n\n//# sourceURL=webpack:///./src/public/js/main.js?");

/***/ }),

/***/ "./src/public/style/normalize.css":
/*!****************************************!*\
  !*** ./src/public/style/normalize.css ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin\n\n//# sourceURL=webpack:///./src/public/style/normalize.css?");

/***/ }),

/***/ "./src/public/style/style.css":
/*!************************************!*\
  !*** ./src/public/style/style.css ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin\n\n//# sourceURL=webpack:///./src/public/style/style.css?");

/***/ })

/******/ });