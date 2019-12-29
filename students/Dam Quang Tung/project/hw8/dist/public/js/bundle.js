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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _public_js_main__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./public/js/main */ \"./src/public/js/main.js\");\n/* harmony import */ var _public_style_normalize_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./public/style/normalize.css */ \"./src/public/style/normalize.css\");\n/* harmony import */ var _public_style_normalize_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_public_style_normalize_css__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _public_style_style_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./public/style/style.css */ \"./src/public/style/style.css\");\n/* harmony import */ var _public_style_style_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_public_style_style_css__WEBPACK_IMPORTED_MODULE_2__);\n\r\n\r\n\r\n\r\nconst app = new Vue(_public_js_main__WEBPACK_IMPORTED_MODULE_0__[\"default\"]);\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/public/js/comp_cart.js":
/*!************************************!*\
  !*** ./src/public/js/comp_cart.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _comp_cartItem__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./comp_cartItem */ \"./src/public/js/comp_cartItem.js\");\n\r\n\r\nlet cart = {\r\n    data () {\r\n        return {\r\n            items: [],\r\n            show_up: false,\r\n        };\r\n    },\r\n    mounted () {\r\n        this.$parent.getJson ('/cart')\r\n            .then (data => this.items = data.contents);\r\n            \r\n    },\r\n    methods: {\r\n        showUp () {\r\n            this.show_up = !this.show_up;\r\n        },\r\n \r\n        removeItemfromDB(item) {\r\n            this.$parent.deleteJson('/cart', item)\r\n                .then (data => this.items = data.contents)\r\n                .catch((errStatus) => {\r\n                    this.$root.smthWrong = true;\r\n                    console.log(`Ошибка ${errStatus}`);\r\n                });\r\n            \r\n        },\r\n     \r\n        addItemToDB(item) {\r\n            this.$parent.putJson('/cart', item)\r\n                .then (data => this.items = data.contents)\r\n                .catch((errStatus) => {\r\n                    this.$root.smthWrong = true;\r\n                    console.log(`Ошибка ${errStatus}`);\r\n                });\r\n            \r\n        },\r\n    },\r\n    template: `\r\n        <div class=\"cart-block\" v-show=\"show_up\">\r\n            <div v-if=\"items.length === 0\">Ваша корзина пуста</div>\r\n            <cart-item v-for=\"product in items\" :item='product' :key='product.id'></cart-item>      \r\n        </div>\r\n    `,\r\n    components: {\r\n        'cart-item' : _comp_cartItem__WEBPACK_IMPORTED_MODULE_0__[\"default\"]\r\n    }\r\n};\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (cart);\n\n//# sourceURL=webpack:///./src/public/js/comp_cart.js?");

/***/ }),

/***/ "./src/public/js/comp_cartItem.js":
/*!****************************************!*\
  !*** ./src/public/js/comp_cartItem.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nlet cartItem = {\r\n    props: ['item'],\r\n    template: `\r\n        <div class=\"cart-item\">\r\n            <div class=\"product-bio\">\r\n                <img v-bind:src=\"item.img\" alt=\"some image\">\r\n                <div class=\"product-desc\">\r\n                    <p class=\"product-title\">{{ item.title }}</p>\r\n                    <p class=\"product-quantity\">Quantity: {{ item.quantity }}</p>\r\n                    <p class=\"product-single-price\">\\${{ item.price }} each</p>\r\n                </div>\r\n            </div>\r\n            <div class=\"right-block\">\r\n                <p class=\"product-price\">\\${{ item.quantity * item.price }}</p>\r\n                <button class=\"del-btn\" v-on:click=\"$root.$refs.cart.removeItemfromDB(item)\">&times;</button>\r\n            </div>\r\n        </div>\r\n    `\r\n};\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (cartItem);\n\n//# sourceURL=webpack:///./src/public/js/comp_cartItem.js?");

/***/ }),

/***/ "./src/public/js/comp_catalog.js":
/*!***************************************!*\
  !*** ./src/public/js/comp_catalog.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _comp_catalogItem__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./comp_catalogItem */ \"./src/public/js/comp_catalogItem.js\");\n\r\n\r\nlet catalog = {\r\n    data () {\r\n        return {\r\n            items: [],\r\n            filteredItems: []\r\n        };\r\n    },\r\n    mounted () {\r\n        this.$parent.getJson ('/catalog')\r\n            .then (data => {\r\n                this.items = data;\r\n                this.filteredItems = this.items.slice();\r\n            });\r\n    },\r\n    methods: {\r\n        filterList(str) {\r\n            const regexp = new RegExp(str, 'i');\r\n            this.filteredItems = this.items.filter(item =>\r\n                regexp.test(item.title));\r\n        }\r\n    },\r\n\r\n    template: `\r\n        <div class=\"products\">\r\n            <catalog-item v-for=\"product in filteredItems\" :item=\"product\" :key=\"product.id\"></catalog-item>\r\n        </div>\r\n    `,\r\n    components: {\r\n        'catalog-item' : _comp_catalogItem__WEBPACK_IMPORTED_MODULE_0__[\"default\"]\r\n    }\r\n}; \r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (catalog);\n\n//# sourceURL=webpack:///./src/public/js/comp_catalog.js?");

/***/ }),

/***/ "./src/public/js/comp_catalogItem.js":
/*!*******************************************!*\
  !*** ./src/public/js/comp_catalogItem.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nlet catalogItem = {\r\n    props: ['item'],\r\n    template: `\r\n    <div class=\"product-item\">\r\n        <img v-bind:src=\"item.img\" alt=\"some image\">\r\n        <div class=\"desc\">\r\n            <h3>{{ item.title}}</h3>\r\n            <p>{{ item.price}}  $</p>\r\n            <button class=\"buy-btn\" v-on:click=\"$root.$refs.cart.addItemToDB(item)\">Купить</button>\r\n        </div>\r\n    </div>\r\n    `\r\n};\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (catalogItem);\n\n//# sourceURL=webpack:///./src/public/js/comp_catalogItem.js?");

/***/ }),

/***/ "./src/public/js/comp_error.js":
/*!*************************************!*\
  !*** ./src/public/js/comp_error.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nlet serverError = {\r\n    template: `\r\n        <div class=\"server-error\" v-if=\"$root.smthWrong\">\r\n            We are sorry! Server is not responsible.\r\n        </div>\r\n    `\r\n};\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (serverError);\n\n//# sourceURL=webpack:///./src/public/js/comp_error.js?");

/***/ }),

/***/ "./src/public/js/comp_filter.js":
/*!**************************************!*\
  !*** ./src/public/js/comp_filter.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nlet searchFilter = {\r\n    data () {\r\n        return {\r\n            value: ''\r\n        };\r\n    },\r\n    template: `\r\n        <form action=\"#\" class=\"search-form\">\r\n            <input type=\"text\" class=\"search-field\" v-model.trim=\"value\">\r\n            <button class=\"btn-search\" type=\"submit\" v-on:click=\"$root.$refs.catalog.filterList(value)\">\r\n                <i class=\"fas fa-search\"></i>\r\n            </button>\r\n        </form>\r\n    `\r\n};\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (searchFilter);\n\n//# sourceURL=webpack:///./src/public/js/comp_filter.js?");

/***/ }),

/***/ "./src/public/js/main.js":
/*!*******************************!*\
  !*** ./src/public/js/main.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _comp_cart__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./comp_cart */ \"./src/public/js/comp_cart.js\");\n/* harmony import */ var _comp_catalog__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./comp_catalog */ \"./src/public/js/comp_catalog.js\");\n/* harmony import */ var _comp_error__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./comp_error */ \"./src/public/js/comp_error.js\");\n/* harmony import */ var _comp_filter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./comp_filter */ \"./src/public/js/comp_filter.js\");\n\r\n\r\n\r\n\r\n\r\nlet app = {\r\n    el: '#app',\r\n    data: {\r\n        smthWrong: false\r\n    },\r\n    methods: {\r\n        getJson (url) {\r\n            return fetch (url)\r\n            .then (result => result.json())\r\n            .catch (err => {\r\n                this.smthWrong = true;\r\n                console.log (err);\r\n            });\r\n        },\r\n        putJson (url, data) {\r\n            return fetch(url, {\r\n                method: 'POST',\r\n                headers: {\r\n                    'Content-Type': 'application/json',\r\n                },\r\n                body: JSON.stringify(data), \r\n            })\r\n            .then(response => response.json())\r\n            .catch (err => {\r\n                this.smthWrong = true;\r\n                console.log (err);\r\n            }); \r\n        },\r\n        deleteJson (url, data) {\r\n            return fetch(url, {\r\n                method: 'DELETE',\r\n                headers: {\r\n                    'Content-Type': 'application/json',\r\n                },\r\n                body: JSON.stringify(data), \r\n            })\r\n            .then(response => response.json())\r\n            .catch (err => {\r\n                this.smthWrong = true;\r\n                console.log (err);\r\n            }); \r\n        },\r\n    },\r\n    components: {\r\n        cart: _comp_cart__WEBPACK_IMPORTED_MODULE_0__[\"default\"],\r\n        catalog: _comp_catalog__WEBPACK_IMPORTED_MODULE_1__[\"default\"],\r\n        'server-error': _comp_error__WEBPACK_IMPORTED_MODULE_2__[\"default\"],\r\n        'search-filter': _comp_filter__WEBPACK_IMPORTED_MODULE_3__[\"default\"]\r\n    }\r\n};\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (app);\n\n//# sourceURL=webpack:///./src/public/js/main.js?");

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