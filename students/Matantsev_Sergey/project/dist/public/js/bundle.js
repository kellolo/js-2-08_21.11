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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _public_js_main__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./public/js/main */ \"./src/public/js/main.js\");\n/* harmony import */ var _public_style_style_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./public/style/style.css */ \"./src/public/style/style.css\");\n/* harmony import */ var _public_style_style_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_public_style_style_css__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _public_style_normalize_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./public/style/normalize.css */ \"./src/public/style/normalize.css\");\n/* harmony import */ var _public_style_normalize_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_public_style_normalize_css__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\nvar app = new Vue(_public_js_main__WEBPACK_IMPORTED_MODULE_0__[\"default\"]);\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/public/js/Cart.js":
/*!*******************************!*\
  !*** ./src/public/js/Cart.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _CartItem__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CartItem */ \"./src/public/js/CartItem.js\");\n\nvar cart = {\n  data: function data() {\n    return {\n      items: [],\n      cartUrl: '/getBasket.json',\n      imgCart: 'https://placehold.it/100x80',\n      addUrl: '/addToBasket.json',\n      delUrl: '/deleteFromBasket.json'\n    };\n  },\n  methods: {\n    addProduct: function addProduct(product) {\n      var _this = this;\n\n      var find = this.items.find(function (item) {\n        return item.id_product === product.id_product;\n      });\n\n      if (find) {\n        this.$parent.putJson('/cart/' + product.id_product, {\n          op: 1\n        }).then(function (answ) {\n          if (answ) {\n            find.quantity++;\n          }\n        });\n      } else {\n        this.$parent.postJson('/cart', product).then(function (answ) {\n          if (answ) {\n            _this.items.push(Object.assign({}, product, {\n              quantity: 1\n            }));\n          }\n        });\n      }\n    },\n    delProduct: function delProduct(product) {\n      var _this2 = this;\n\n      var find = this.items.find(function (item) {\n        return item.id_product === product.id_product;\n      });\n\n      if (find.quantity > 1) {\n        this.$parent.putJson('/cart/' + product.id_product, {\n          op: -1\n        }).then(function (answ) {\n          if (answ) {\n            find.quantity--;\n          }\n        });\n      } else {\n        this.$parent.deleteJson('/cart/' + product.id_product).then(function (answ) {\n          if (answ) {\n            var arr = _this2.items;\n            arr.splice(arr.indexOf(product), 1);\n          }\n        });\n      }\n    }\n  },\n  mounted: function mounted() {\n    var _this3 = this;\n\n    this.$parent.getJson('/cart').then(function (data) {\n      return _this3.items = data.contents;\n    });\n  },\n  template: \"\\n    <div class=\\\"cart-block\\\">\\n        <cart-item v-for=\\\"item of items\\\" :img=\\\"imgCart\\\" :item=\\\"item\\\"></cart-item>\\n    </div>\\n    \",\n  components: {\n    'cart-item': _CartItem__WEBPACK_IMPORTED_MODULE_0__[\"default\"]\n  }\n};\n/* harmony default export */ __webpack_exports__[\"default\"] = (cart);\n\n//# sourceURL=webpack:///./src/public/js/Cart.js?");

/***/ }),

/***/ "./src/public/js/CartItem.js":
/*!***********************************!*\
  !*** ./src/public/js/CartItem.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nvar cartItem = {\n  props: ['img', 'item'],\n  template: \"\\n    <div class=\\\"cart-item\\\">\\n        <div class=\\\"product-bio\\\">\\n            <img :src=\\\"img\\\" alt=\\\"Some image\\\">\\n            <div class=\\\"product-desc\\\">\\n                <p class=\\\"product-title\\\">{{ item.product_name }}</p>\\n                <p class=\\\"product-quantity\\\">Quantity: {{ item.quantity }}</p>\\n                <p class=\\\"product-single-price\\\">$ {{ item.price }} each</p>\\n            </div>\\n        </div>\\n        <div class=\\\"right-block\\\">\\n            <p class=\\\"product-price\\\">{{ item.price * item.quantity }}</p>\\n            <button class=\\\"del-btn\\\" @click=\\\"$parent.delProduct (item)\\\">&times;</button>\\n        </div>\\n    </div>\\n    \"\n};\n/* harmony default export */ __webpack_exports__[\"default\"] = (cartItem);\n\n//# sourceURL=webpack:///./src/public/js/CartItem.js?");

/***/ }),

/***/ "./src/public/js/Catalog.js":
/*!**********************************!*\
  !*** ./src/public/js/Catalog.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _CatalogItem__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CatalogItem */ \"./src/public/js/CatalogItem.js\");\n\nvar catalog = {\n  data: function data() {\n    return {\n      catalogUrl: '/catalogData.json',\n      imgCatalog: 'https://placehold.it/200x150',\n      items: []\n    };\n  },\n  mounted: function mounted() {\n    var _this = this;\n\n    this.$parent.getJson('/catalog').then(function (data) {\n      return _this.items = data;\n    });\n  },\n  template: \"\\n            <div class=\\\"products\\\">\\n                <item v-for=\\\"product of items\\\" :item=\\\"product\\\" :imgProp=\\\"imgCatalog\\\"></item>\\n            </div>\\n    \",\n  components: {\n    item: _CatalogItem__WEBPACK_IMPORTED_MODULE_0__[\"default\"]\n  }\n};\n/* harmony default export */ __webpack_exports__[\"default\"] = (catalog);\n\n//# sourceURL=webpack:///./src/public/js/Catalog.js?");

/***/ }),

/***/ "./src/public/js/CatalogItem.js":
/*!**************************************!*\
  !*** ./src/public/js/CatalogItem.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nvar item = {\n  template: \"\\n    <div class=\\\"product-item\\\" >\\n        <img :src=\\\"imgProp\\\" alt=\\\"Some img\\\">\\n        <div class=\\\"desc\\\">\\n            <h3> {{item.product_name}} </h3>\\n            <p>{{item.price}} $</p>\\n            <button class=\\\"buy-btn\\\" @click=\\\"$root.$refs.cart.addProduct(item)\\\">\\u041A\\u0443\\u043F\\u0438\\u0442\\u044C</button>\\n        </div>\\n    </div>\\n    \",\n  props: ['item', 'imgProp']\n};\n/* harmony default export */ __webpack_exports__[\"default\"] = (item);\n\n//# sourceURL=webpack:///./src/public/js/CatalogItem.js?");

/***/ }),

/***/ "./src/public/js/main.js":
/*!*******************************!*\
  !*** ./src/public/js/main.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Cart__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Cart */ \"./src/public/js/Cart.js\");\n/* harmony import */ var _Catalog__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Catalog */ \"./src/public/js/Catalog.js\");\n\n\nvar app = {\n  el: '#app',\n  data: {\n    cartImage: 'https://placehold.it/100x80',\n    cartUrl: '/getBasket.json',\n    showCart: false\n  },\n  methods: {\n    getJson: function getJson(url) {\n      return fetch(url).then(function (result) {\n        return result.json();\n      })[\"catch\"](function (err) {\n        console.log(err);\n      });\n    },\n    postJson: function postJson(url, data) {\n      return fetch(url, {\n        method: 'POST',\n        headers: {\n          \"Content-Type\": \"application/json\"\n        },\n        body: JSON.stringify(data)\n      }).then(function (result) {\n        return result.json();\n      })[\"catch\"](function (err) {\n        console.log(err);\n      });\n    },\n    putJson: function putJson(url, data) {\n      return fetch(url, {\n        method: 'PUT',\n        headers: {\n          \"Content-Type\": \"application/json\"\n        },\n        body: JSON.stringify(data)\n      }).then(function (result) {\n        return result.json();\n      })[\"catch\"](function (err) {\n        console.log(err);\n      });\n    },\n    deleteJson: function deleteJson(url) {\n      return fetch(url, {\n        method: 'DELETE',\n        headers: {\n          \"Content-Type\": \"application/json\"\n        }\n      }).then(function (result) {\n        return result.json();\n      })[\"catch\"](function (err) {\n        console.log(err);\n      });\n    }\n  },\n  components: {\n    cart: _Cart__WEBPACK_IMPORTED_MODULE_0__[\"default\"],\n    catalog: _Catalog__WEBPACK_IMPORTED_MODULE_1__[\"default\"]\n  }\n};\n/* harmony default export */ __webpack_exports__[\"default\"] = (app);\n\n//# sourceURL=webpack:///./src/public/js/main.js?");

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