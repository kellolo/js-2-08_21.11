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

eval("function findItem(id, oldCart) {\n  return oldCart.contents.find(function (pr) {\n    return pr.id_product === id;\n  });\n}\n\nvar cart = {\n  change: function change(req, obj) {\n    var find = find(+req.params.id, obj);\n    find.quantity += req.body.op;\n    return {\n      newCart: JSON.stringify(obj, null, '\\t'),\n      name: find.product_name\n    };\n  },\n  add: function add(req, obj) {\n    obj.contents.push(Object.assign({}, req.body, {\n      quantity: 1\n    }));\n    return {\n      newCart: JSON.stringify(obj, null, '\\t'),\n      name: req.body.product_name\n    };\n  },\n  del: function del(req, obj) {\n    var find = findItem(+req.params.id, obj);\n    obj.contents.splice(obj.contents.indexOf(find), 1);\n    return {\n      newCart: JSON.stringify(obj, null, '\\t'),\n      name: find.product_name\n    };\n  }\n};\nmodule.exports = cart;\n\n//# sourceURL=webpack:///./src/server/cartCore.js?");

/***/ }),

/***/ "./src/server/handler.js":
/*!*******************************!*\
  !*** ./src/server/handler.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var fs = __webpack_require__(/*! fs */ \"fs\");\n\nvar cart = __webpack_require__(/*! ./cartCore */ \"./src/server/cartCore.js\");\n\nvar stat = __webpack_require__(/*! ./stat */ \"./src/server/stat.js\");\n\nfunction handler(req, res, file, action) {\n  fs.readFile(file, 'utf-8', function (err, data) {\n    if (err) {\n      res.sendStatus(404, JSON.stringify({\n        result: 0\n      }));\n    } else {\n      data = JSON.parse(data);\n\n      var _cart$action = cart[action](req, data),\n          newCart = _cart$action.newCart,\n          name = _cart$action.name;\n\n      fs.writeFile(file, newCart, function (err) {\n        if (!err) {\n          res.send(JSON.stringify({\n            result: 1\n          }));\n          stat(action, name);\n        } else {\n          res.sendStatus(500, JSON.stringify({\n            result: 0\n          }));\n        }\n      });\n    }\n  });\n}\n\nmodule.exports = handler;\n\n//# sourceURL=webpack:///./src/server/handler.js?");

/***/ }),

/***/ "./src/server/server.js":
/*!******************************!*\
  !*** ./src/server/server.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var express = __webpack_require__(/*! express */ \"express\"); //for npm mods\n// const mod = require ('./mod') //for custom mods\n\n\nvar fs = __webpack_require__(/*! fs */ \"fs\"); //file system (docs NODE)\n\n\nvar app = express();\n\nvar handler = __webpack_require__(/*! ./handler */ \"./src/server/handler.js\");\n\napp.use(express.json());\napp.use('/', express[\"static\"]('public')); //localhost:3030/\n\napp.get('/catalog', function (req, res) {\n  fs.readFile('server/db/catalog.json', 'utf-8', function (err, data) {\n    if (err) {\n      res.sendStatus(404, JSON.stringify({\n        result: 0\n      }));\n    } else {\n      res.send(data);\n    }\n  });\n});\napp.get('/cart', function (req, res) {\n  fs.readFile('server/db/userCart.json', 'utf-8', function (err, data) {\n    if (err) {\n      res.sendStatus(404, JSON.stringify({\n        result: 0\n      }));\n    } else {\n      res.send(data);\n    }\n  });\n});\napp.post('/cart', function (req, res) {\n  handler(req, res, 'server/db/userCart.json', 'add');\n});\napp[\"delete\"]('/cart/:id', function (req, res) {\n  handler(req, res, 'server/db/userCart.json', 'del');\n});\napp.put('/cart/:id', function (req, res) {\n  handler(req, res, 'server/db/userCart.json', 'change');\n});\napp.listen(3030, function () {\n  console.log('Server listening at port 3030...');\n});\n\n//# sourceURL=webpack:///./src/server/server.js?");

/***/ }),

/***/ "./src/server/stat.js":
/*!****************************!*\
  !*** ./src/server/stat.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var fs = __webpack_require__(/*! fs */ \"fs\");\n\nvar moment = __webpack_require__(/*! moment */ \"moment\");\n\nvar stat = function stat(action, name) {\n  fs.readFile('./server/db/logs.json', 'utf-8', function (err, data) {\n    if (err) {\n      console.log('Can not read logs...');\n    } else {\n      var d = JSON.parse(data);\n      var newLog = {\n        prod_name: name,\n        user_action: action,\n        time: moment().format('DD MM YYYY, h:mm:ss')\n      };\n      console.log(newLog);\n      d.push(newLog);\n      fs.writeFile('./server/db/logs.json', JSON.stringify(d, null, '\\t'), function (err) {\n        if (err) {\n          console.log('Can not write...');\n        }\n      });\n    }\n  });\n};\n\nmodule.exports = stat;\n\n//# sourceURL=webpack:///./src/server/stat.js?");

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

/***/ }),

/***/ "moment":
/*!*************************!*\
  !*** external "moment" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"moment\");\n\n//# sourceURL=webpack:///external_%22moment%22?");

/***/ })

/******/ });