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
/***/ (function(module, exports, __webpack_require__) {

eval("const fs = __webpack_require__(/*! fs */ \"fs\");\r\n\r\nfunction rewriteCart (cart, file) {\r\n    let newCart = {\r\n        \"amount\": '',\r\n        \"countGoods\": '',\r\n        \"contents\": cart\r\n    };\r\n    fs.writeFile(file, JSON.stringify(newCart, null, 2), (err) => {\r\n        if (err) {\r\n            throw err;\r\n        }\r\n    });\r\n    return (JSON.stringify(newCart));\r\n}  \r\n\r\nconst changeCart = {\r\n    add (data, item, file) {\r\n        let cart = JSON.parse(data).contents;\r\n        let findItem = cart.find(el => el.id === item.id);\r\n    \r\n        if (!findItem) {\r\n            item.quantity = 1;\r\n            item.img = \"https://placehold.it/100x80\";\r\n            cart.push(item);                        \r\n        } else {\r\n            findItem.quantity++;\r\n        }\r\n        return rewriteCart (cart, file);\r\n    },\r\n\r\n    delete (data, item, file) {\r\n        let cart = JSON.parse(data).contents;\r\n        let findItem = cart.find(el => el.id === item.id);\r\n\r\n        if (findItem.quantity > 1) {\r\n            findItem.quantity--;\r\n        } else {\r\n            cart.splice(cart.indexOf(findItem), 1);\r\n        }\r\n        return rewriteCart (cart, file);\r\n    }\r\n};\r\n\r\n\r\nmodule.exports = changeCart;\n\n//# sourceURL=webpack:///./src/server/cartCore.js?");

/***/ }),

/***/ "./src/server/handler.js":
/*!*******************************!*\
  !*** ./src/server/handler.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const fs = __webpack_require__(/*! fs */ \"fs\");\r\nconst changeCart = __webpack_require__(/*! ./cartCore */ \"./src/server/cartCore.js\");\r\n  \r\n\r\nfunction logActions (action, item) {\r\n    let data = `action: ${action}, product: ${item.title}, time: ${(new Date(Date.now())).toString ()} \\n`;\r\n   \r\n    fs.appendFile('../db/stat.txt', data, (err) => {\r\n        if (err) {\r\n            throw err;\r\n        }\r\n        console.log('The \"data to append\" was appended to file!');\r\n      });\r\n}\r\n\r\nfunction handler (item, res, file, action) {\r\n\r\n    fs.readFile(file, 'utf8', (err, data) => {\r\n        if (err) {\r\n            res.sendStatus(404);\r\n        } else {\r\n            let newCart = changeCart[action] (data, item, file);\r\n            logActions(action, item);\r\n            res.send(newCart);\r\n        }\r\n    });\r\n}\r\n\r\nmodule.exports = handler;\n\n//# sourceURL=webpack:///./src/server/handler.js?");

/***/ }),

/***/ "./src/server/server.js":
/*!******************************!*\
  !*** ./src/server/server.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const express = __webpack_require__(/*! express */ \"express\");\r\nconst fs = __webpack_require__(/*! fs */ \"fs\");\r\nconst handler = __webpack_require__(/*! ./handler */ \"./src/server/handler.js\");\r\n\r\nconst app = express();\r\n\r\napp.use(express.json());\r\n\r\napp.use('/', express.static('../../public'));\r\n\r\napp.get('/catalog', (req, res) => {\r\n\r\n    fs.readFile('../db/catalogData.json', 'utf8', (err, data) => {\r\n        if (err) {\r\n            res.sendStatus(404);\r\n        } else {\r\n            res.send(data);\r\n        }\r\n    });\r\n\r\n});\r\n\r\napp.get('/cart', (req, res) => {\r\n\r\n    fs.readFile('../db/getBasket.json', 'utf8', (err, data) => {\r\n        if (err) {\r\n            res.sendStatus(404);\r\n        } else {\r\n            res.send(data);\r\n        }\r\n    });\r\n\r\n});\r\n\r\napp.post('/cart', (req, res) => {\r\n\r\n    handler(req.body, res, '../db/getBasket.json', 'add');\r\n\r\n});\r\n\r\napp.delete('/cart', (req, res) => {\r\n\r\n    handler(req.body, res, '../db/getBasket.json', 'delete');\r\n\r\n});\r\n\r\napp.listen(3000, () => {\r\n    console.log('Example app listening on port 3000!');\r\n});\n\n//# sourceURL=webpack:///./src/server/server.js?");

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