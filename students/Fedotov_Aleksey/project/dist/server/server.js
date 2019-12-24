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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/server/server.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/server/cartCore.js":
/*!********************************!*\
  !*** ./src/server/cartCore.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function findProduct(id, oldCart) {\n  return oldCart.contents.find(function (item) {\n    return item.id_product === id;\n  });\n}\n\nvar cart = {\n  add: function add(req, oldCart) {\n    oldCart.contents.push(Object.assign({}, req.body, {\n      quantity: 1\n    }));\n    oldCart.amount += req.body.price;\n    oldCart.countGoods++;\n    return oldCart;\n  },\n  change: function change(req, oldCart) {\n    var findProd = findProduct(+req.params.id, oldCart);\n    findProd.quantity += req.body.op;\n    oldCart.amount += findProd.price * req.body.op;\n    oldCart.countGoods += req.body.op;\n    return oldCart;\n  },\n  del: function del(req, oldCart) {\n    var findProd = findProduct(+req.params.id, oldCart);\n    oldCart.contents.splice(oldCart.contents.indexOf(findProd), 1);\n    oldCart.amount -= findProd.price;\n    oldCart.countGoods--;\n    return oldCart;\n  }\n};\nmodule.exports = cart;\n\n//# sourceURL=webpack:///./src/server/cartCore.js?");

/***/ }),

/***/ "./src/server/handler.js":
/*!*******************************!*\
  !*** ./src/server/handler.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var fs = __webpack_require__(/*! fs */ \"fs\");\n\nvar actionCart = __webpack_require__(/*! ./cartCore */ \"./src/server/cartCore.js\");\n\nfunction handler(req, res, file, action) {\n  fs.readFile(file, 'utf-8', function (err, data) {\n    if (err) {\n      res.sendStatus(404, JSON.stringify({\n        result: 0\n      }));\n    } else {\n      var newCart = actionCart[action](req, JSON.parse(data));\n      fs.writeFile(file, JSON.stringify(newCart, null, 2), function (err) {\n        if (!err) {\n          res.send(JSON.stringify({\n            result: 1\n          }));\n        } else {\n          res.sendStatus(500, JSON.stringify({\n            result: 0\n          }));\n        }\n      });\n    }\n  });\n}\n\nmodule.exports = handler;\n\n//# sourceURL=webpack:///./src/server/handler.js?");

/***/ }),

/***/ "./src/server/server.js":
/*!******************************!*\
  !*** ./src/server/server.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var express = __webpack_require__(/*! express */ \"express\");\n\nvar fs = __webpack_require__(/*! fs */ \"fs\");\n\nvar bodyParser = __webpack_require__(/*! body-parser */ \"body-parser\");\n\nvar handler = __webpack_require__(/*! ./handler */ \"./src/server/handler.js\");\n\nvar app = express();\nvar urlencodedParser = bodyParser.urlencoded({\n  extended: false\n});\napp.use(express.json());\napp.use('/', express[\"static\"]('public'));\napp.get('/catalog', function (req, res) {\n  //res.sendStatus(404, JSON.stringify({result:0}))\n  fs.readFile('db/catalog.json', 'utf-8', function (err, data) {\n    if (err) {\n      res.sendStatus(404, JSON.stringify({\n        result: 0\n      }));\n    } else {\n      res.send(data);\n    }\n  });\n});\napp.get('/cart', function (req, res) {\n  fs.readFile('db/userCart.json', 'utf-8', function (err, data) {\n    if (err) {\n      res.sendStatus(404, JSON.stringify({\n        result: 0\n      }));\n    } else {\n      res.send(data);\n    }\n  });\n});\napp.post('/cart', urlencodedParser, function (req, res) {\n  if (!req.body) {\n    res.sendStatus(400);\n  } else {\n    console.log('server is working');\n    handler(req, res, 'server/db/userCart.json', 'add');\n  }\n});\napp.put('/cart/:id', urlencodedParser, function (req, res) {\n  console.log(\"Зашел в PUT\");\n  handler(req, res, 'server/db/userCart.json', 'change');\n});\napp[\"delete\"]('/cart/:id', urlencodedParser, function (req, res) {\n  console.log(\"Зашел в delete\");\n  handler(req, res, 'server/db/userCart.json', 'del');\n});\napp.post('/filter', urlencodedParser, function (req, res) {\n  var regFilter = new RegExp(req.body.data, 'i');\n\n  if (!req.body) {\n    res.sendStatus(400);\n  } else {\n    fs.readFile('server/db/catalog.json', 'utf-8', function (err, data) {\n      if (err) {\n        res.json({\n          result: err\n        });\n      } else {\n        var filterArr = [];\n        var catalog = JSON.parse(data);\n        filterArr = catalog.filter(function (product) {\n          return regFilter.test(product.product_name);\n        });\n        res.json({\n          filter: filterArr,\n          result: 1\n        });\n      }\n    });\n  }\n});\napp.listen(3030, function () {\n  console.log('Server starting...');\n});\n\n//# sourceURL=webpack:///./src/server/server.js?");

/***/ }),

/***/ "body-parser":
/*!******************************!*\
  !*** external "body-parser" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"body-parser\");\n\n//# sourceURL=webpack:///external_%22body-parser%22?");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"express\");\n\n//# sourceURL=webpack:///external_%22express%22?");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"fs\");\n\n//# sourceURL=webpack:///external_%22fs%22?");

/***/ })

/******/ });