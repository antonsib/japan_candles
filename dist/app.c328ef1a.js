// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"utils.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addFirst = addFirst;
exports.addLast = addLast;
exports.deleteFirst = deleteFirst;
exports.deleteLast = deleteLast;
exports.findMinMax = findMinMax;
exports.toDate = toDate;
function findMinMax(data) {
  var min = 1000000;
  var max = -1;
  for (var i = 0; i < data.data.h.length; i++) {
    if (data.data.l[i] !== 0) {
      if (max < data.data.h[i]) max = data.data.h[i];
      if (min > data.data.l[i]) min = data.data.l[i];
    }
  }
  return [min, max];
}
function toDate(timestamp) {
  var shortMonth = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  var date = new Date(timestamp);
  return "".concat(shortMonth[date.getMonth()], " ").concat(date.getDate(), " ").concat(date.getHours() + ":" + date.getMinutes() + "0", " ");
}
function deleteLast(datad) {
  datad.data.o.pop();
  datad.data.h.pop();
  datad.data.l.pop();
  datad.data.c.pop();
  datad.data.t.pop();
}
function deleteFirst(datad) {
  datad.data.o.shift();
  datad.data.h.shift();
  datad.data.l.shift();
  datad.data.c.shift();
  datad.data.t.shift();
}
function addLast(data1, datad, index, isNum) {
  if (isNum === true) {
    datad.data.o.push(data1.data.o[index]);
    datad.data.h.push(data1.data.h[index]);
    datad.data.l.push(data1.data.l[index]);
    datad.data.c.push(data1.data.c[index]);
    datad.data.t.push(data1.data.t[index]);
  } else if (isNum === false) {
    datad.data.o.push(0);
    datad.data.h.push(0);
    datad.data.l.push(0);
    datad.data.c.push(0);
    datad.data.t.push(0);
  }
}
function addFirst(data1, datad, index, isNum) {
  if (isNum === true) {
    datad.data.o.unshift(data1.data.o[index]);
    datad.data.h.unshift(data1.data.h[index]);
    datad.data.l.unshift(data1.data.l[index]);
    datad.data.c.unshift(data1.data.c[index]);
    datad.data.t.unshift(data1.data.t[index]);
  } else if (isNum === false) {
    datad.data.o.unshift(0);
    datad.data.h.unshift(0);
    datad.data.l.unshift(0);
    datad.data.c.unshift(0);
    datad.data.t.unshift(0);
  }
}
},{}],"../data/fl-data-test1.json":[function(require,module,exports) {
module.exports = {
  "status": "success",
  "data": {
    "o": [63170.86, 63300.09, 63112.96, 63262.93, 63459.98, 63419.99, 63254.73, 63148, 63401.55, 62956, 62486.18, 62700.41, 63195.12, 63516.18, 63288.48, 63242.18, 62559.22, 63094.76, 63047.88, 62687.12, 62092.12, 61762.19, 62730.89, 62490.36, 63003.92, 62721.42, 63019.72, 64017.46, 63782.56, 63793.39],
    "h": [63632.49, 63633.01, 63473.51, 63527.3, 63557.99, 63719.97, 63899.68, 63498.04, 63554.98, 63029.12, 62887.99, 63254.87, 63799.99, 63659.99, 63578.33, 63340.65, 63269.95, 63422.96, 63342.51, 63099.99, 62414.99, 62721.01, 63280.74, 63041.84, 63094.79, 63047.25, 64364.99, 64079.99, 63876.63, 64239.66],
    "l": [62274.4, 62942.81, 62638, 62747.17, 63179.21, 62933.33, 63089, 62750, 62799.99, 61680, 62366.44, 62636.73, 63104.4, 63077.02, 63198.67, 61600, 62366.44, 62811.87, 62136.28, 62023.17, 61735.42, 61694.9, 62282.01, 62430.41, 62650.55, 62555, 62973.83, 63613.71, 63623.32, 63581.16],
    "c": [63300.09, 63112.96, 63262.93, 63459.98, 63419.99, 63254.73, 63148, 63401.55, 62956, 62486.18, 62700.41, 63195.12, 63516.18, 63288.48, 63242.18, 62559.22, 63094.76, 63047.88, 62687.12, 62092.12, 61762.19, 62721.01, 62490.36, 63003.92, 62721.42, 63019.72, 64017.46, 63782.56, 63793.39, 64022.59],
    "t": [1713207600, 1713211200, 1713214800, 1713218400, 1713222000, 1713225600, 1713229200, 1713232800, 1713236400, 1713240000, 1713243600, 1713247200, 1713250800, 1713254400, 1713258000, 1713261600, 1713265200, 1713268800, 1713272400, 1713276000, 1713279600, 1713283200, 1713286800, 1713290400, 1713294000, 1713297600, 1713301200, 1713304800, 1713308400, 1713312000]
  }
};
},{}],"graphing.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.graphing = graphing;
var _utils = require("./utils");
var _flDataTest = _interopRequireDefault(require("../data/fl-data-test1.json"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; } //import data1 from "../data/fl-data-test3.json" //1 свечa
//import data1 from "../data/fl-data-test2.json" //2 свечи
//import data1 from "../data/fl-data-test.json" // 10 свечей
//30 свечей
//import data1 from "../data/fl-data-test4.json" //50 свечей
//import data1 from "../data/fl-data-test5.json" //2 свечи и одна пустая
//import data1 from "../data/fl-data-test6.json" //3
//import data1 from "../data/fl-data.json"  // 1001 свеча0

var WIDTH = 1300;
var HEIGHT = 450;
var DPI_WIDTH = WIDTH * 2;
var DPI_HEIGHT = HEIGHT * 2;
var PADDING = 40;
var VIEW_HEIGHT = DPI_HEIGHT - PADDING * 2;
var ROWS_COUNT = 10;
function graphing(canvas) {
  var ctx = canvas.getContext('2d');
  canvas.style.width = WIDTH + 'px';
  canvas.style.height = HEIGHT + 'px';
  canvas.width = DPI_WIDTH;
  canvas.height = DPI_HEIGHT;
  var paddingY = 80;
  var xWidth = DPI_WIDTH - paddingY;
  var LENGTH = _flDataTest.default.data.o.length;
  var curPos = 0;
  var step = Math.round(xWidth / LENGTH);
  var padding = Math.round(step / 4);
  var widthCandle = 2 * padding;
  var copiedData = structuredClone(_flDataTest.default);
  var raf;
  var action;
  var xPrev, xPos;
  var proxy = new Proxy({}, {
    set: function set() {
      var result = Reflect.set.apply(Reflect, arguments);
      raf = requestAnimationFrame(paint);
      return result;
    }
  });
  proxy.scroll = 0;
  document.addEventListener("wheel", function (e) {
    e.preventDefault();
    if (e.deltaY < 0) {
      proxy.scroll = 10;
      action = "scroll";
    } else {
      proxy.scroll = -10;
      action = "scroll";
    }
  }, {
    passive: false
  });
  document.getElementById("canvas").addEventListener("mousemove", function (event) {
    curPos = event.clientX;
  });
  document.getElementById("canvas").addEventListener("mousedown", function (event) {
    xPrev = event.clientX;
  });
  document.getElementById("canvas").addEventListener("mouseup", function (event) {
    xPos = event.clientX;
    if (xPos - xPrev >= 0) {
      action = "mouseLeft";
      proxy.action = "mouseLeft";
    } else {
      action = "mouseRight";
      proxy.action = "mouseRight";
    }
  });
  document.getElementById("zoomUp").addEventListener("click", function (e) {
    curPos = DPI_HEIGHT / 2;
    proxy.scroll = 10;
    action = "scroll";
  });
  document.getElementById("zoomDown").addEventListener("click", function (e) {
    curPos = DPI_HEIGHT / 2;
    action = "scroll";
    proxy.scroll = -10;
  });
  document.getElementById("buttonRight").addEventListener("click", function (e) {
    curPos = DPI_HEIGHT / 2;
    action = "right";
    proxy.action = "right";
  });
  document.getElementById("buttonLeft").addEventListener("click", function (e) {
    curPos = DPI_HEIGHT / 2;
    action = "left";
    proxy.action = "left";
  });
  function clear() {
    ctx.clearRect(0, 0, DPI_WIDTH, DPI_HEIGHT);
  }
  function moveToLeft(datad) {
    var indexd2 = _flDataTest.default.data.o.indexOf(datad.data.o[0]);
    if (_flDataTest.default.data.o.indexOf(datad.data.o[datad.data.o.length - 1]) === 0) return;
    (0, _utils.deleteLast)(datad);
    if (indexd2 !== -1) {
      if (_flDataTest.default.data.o[indexd2 - 1] !== undefined) {
        (0, _utils.addFirst)(_flDataTest.default, datad, indexd2 - 1, true);
      } else if (_flDataTest.default.data.o[indexd2 - 1] === undefined) {
        (0, _utils.addFirst)(_flDataTest.default, datad, indexd2 - 1, false);
      }
    } else if (indexd2 === -1) (0, _utils.addFirst)(_flDataTest.default, datad, indexd2 - 1, false);
  }
  function moveToRight(datad) {
    var indexd1 = _flDataTest.default.data.o.indexOf(datad.data.o[datad.data.o.length - 1]);
    if (_flDataTest.default.data.o.indexOf(datad.data.o[0]) === _flDataTest.default.data.o.length - 1) return;
    (0, _utils.deleteFirst)(datad);
    if (indexd1 !== -1) {
      if (_flDataTest.default.data.o[indexd1 + 1] !== undefined) {
        (0, _utils.addLast)(_flDataTest.default, datad, indexd1 + 1, true);
      } else if (_flDataTest.default.data.o[indexd1 + 1] === undefined) {
        (0, _utils.addLast)(_flDataTest.default, datad, indexd1 + 1, false);
      }
    } else if (indexd1 === -1) (0, _utils.addLast)(_flDataTest.default, datad, indexd1 + 1, false);
  }
  function getNewDate(datad, scroll, index) {
    var indexd1 = _flDataTest.default.data.o.indexOf(datad.data.o[datad.data.o.length - 1]);
    var indexd2 = _flDataTest.default.data.o.indexOf(datad.data.o[0]);
    if (action === "scroll") {
      if (scroll === 10) {
        if (datad.data.o[index + 1] !== undefined) {
          (0, _utils.deleteLast)(datad);
        }
        if (datad.data.o[index - 1] !== undefined) {
          (0, _utils.deleteFirst)(datad);
        }
      } else if (scroll === -10) {
        if (_flDataTest.default.data.o[indexd1 + 1] !== undefined && indexd1 !== -1) {
          (0, _utils.addLast)(_flDataTest.default, datad, indexd1 + 1, true);
        }
        if (_flDataTest.default.data.o[indexd2 - 1] !== undefined && indexd2 !== -1) {
          (0, _utils.addFirst)(_flDataTest.default, datad, indexd2 - 1, true);
        }
      }
    } else if (action === "right") {
      moveToRight(datad);
    } else if (action === "left") {
      moveToLeft(datad);
    } else if (action === "mouseRight") {
      var pos1 = Math.trunc((xPrev * 2 - paddingY) / step);
      var pos2 = Math.trunc((xPos * 2 - paddingY) / step);
      for (var i = 0; i < pos1 - pos2; i++) moveToRight(datad);
    } else if (action === "mouseLeft") {
      var _pos = Math.trunc((xPrev * 2 - paddingY) / step);
      var _pos2 = Math.trunc((xPos * 2 - paddingY) / step);
      for (var _i = 0; _i < _pos2 - _pos; _i++) moveToLeft(datad);
    }
  }
  function paint() {
    clear();
    var pos = Math.trunc((curPos * 2 - paddingY) / step);
    getNewDate(copiedData, proxy.scroll, pos);
    var newLength = copiedData.data.o.length;
    step = Math.round(xWidth / newLength);
    padding = Math.round(step / 4);
    widthCandle = 2 * padding;
    var _findMinMax = (0, _utils.findMinMax)(copiedData),
      _findMinMax2 = _slicedToArray(_findMinMax, 2),
      yMin = _findMinMax2[0],
      yMax = _findMinMax2[1];
    var yKof = (yMax - yMin) / VIEW_HEIGHT;
    var yStep = Math.round((yMax - yMin) / ROWS_COUNT);
    drawX(copiedData, newLength);
    drawY(yMin, yStep);
    draw(copiedData, newLength, yKof, yMin);
  }
  function drawY(yMin, yStep) {
    var step = VIEW_HEIGHT / ROWS_COUNT;
    ctx.beginPath();
    ctx.lineWidth = 2;
    for (var i = 0; i < ROWS_COUNT; i++) {
      ctx.strokeStyle = '#bbb';
      ctx.font = 'normal 20px Helvetica, sans-serif';
      ctx.fillStyle = '#96a2aa';
      ctx.moveTo(0, VIEW_HEIGHT - step * i);
      ctx.fillText(yMin + i * yStep, 0, VIEW_HEIGHT - step * i);
    }
    ctx.stroke();
    ctx.closePath();
  }
  function drawX(copiedData, newLength) {
    var stepValue = (newLength / ROWS_COUNT).toFixed();
    if (stepValue == 0) stepValue = 1;
    ctx.beginPath();
    ctx.font = 'normal 20px Helvetica, sans-serif';
    ctx.fillStyle = '#96a2aa';
    for (var i = 0, j = 1; i < newLength; i++, j += 2) {
      if ((i - 1) % stepValue === 0 && copiedData.data.t[i] !== 0) {
        ctx.moveTo(paddingY + widthCandle * j - padding, DPI_HEIGHT - PADDING);
        var time = new Date(copiedData.data.t[i] * 1000);
        ctx.fillText((0, _utils.toDate)(time), paddingY + j * widthCandle, DPI_HEIGHT - PADDING);
      }
    }
    ctx.stroke();
    ctx.closePath();
  }
  function draw(copiedData, newLength, yKof, yMin) {
    for (var i = 0, j = 1; i < newLength; i++, j += 2) {
      if (copiedData.data.o[i] !== 0) {
        if (copiedData.data.o[i] <= copiedData.data.c[i]) {
          ctx.beginPath();
          ctx.lineWidth = 2;
          ctx.strokeStyle = "green";
          ctx.moveTo(paddingY + j * widthCandle, VIEW_HEIGHT - (copiedData.data.l[i] - yMin) / yKof);
          ctx.lineTo(paddingY + j * widthCandle, VIEW_HEIGHT - (copiedData.data.o[i] - yMin) / yKof);
          ctx.rect(paddingY + j * widthCandle - padding, VIEW_HEIGHT - (copiedData.data.c[i] - yMin) / yKof, padding * 2, (copiedData.data.c[i] - copiedData.data.o[i]) / yKof);
          ctx.fillStyle = 'green';
          ctx.fill();
          ctx.moveTo(paddingY + j * widthCandle, VIEW_HEIGHT - (copiedData.data.c[i] - yMin) / yKof);
          ctx.lineTo(paddingY + j * widthCandle, VIEW_HEIGHT - (copiedData.data.h[i] - yMin) / yKof);
          ctx.stroke();
          ctx.closePath();
        } else if (copiedData.data.o[i] > copiedData.data.c[i]) {
          ctx.beginPath();
          ctx.lineWidth = 2;
          ctx.strokeStyle = "red";
          ctx.moveTo(paddingY + j * widthCandle, VIEW_HEIGHT - (copiedData.data.l[i] - yMin) / yKof);
          ctx.lineTo(paddingY + j * widthCandle, VIEW_HEIGHT - (copiedData.data.c[i] - yMin) / yKof);
          ctx.rect(paddingY + j * widthCandle - padding, VIEW_HEIGHT - (copiedData.data.o[i] - yMin) / yKof, padding * 2, (copiedData.data.o[i] - copiedData.data.c[i]) / yKof);
          ctx.fillStyle = 'red';
          ctx.fill();
          ctx.moveTo(paddingY + j * widthCandle, VIEW_HEIGHT - (copiedData.data.o[i] - yMin) / yKof);
          ctx.lineTo(paddingY + j * widthCandle, VIEW_HEIGHT - (copiedData.data.h[i] - yMin) / yKof);
          ctx.stroke();
          ctx.closePath();
        }
      }
    }
  }
}
},{"./utils":"utils.js","../data/fl-data-test1.json":"../data/fl-data-test1.json"}],"../node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;
function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }
  return bundleURL;
}
function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);
    if (matches) {
      return getBaseURL(matches[0]);
    }
  }
  return '/';
}
function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)?\/[^/]+(?:\?.*)?$/, '$1') + '/';
}
exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"../node_modules/parcel-bundler/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');
function updateLink(link) {
  var newLink = link.cloneNode();
  newLink.onload = function () {
    link.remove();
  };
  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
  if (cssTimeout) {
    return;
  }
  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');
    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }
    cssTimeout = null;
  }, 50);
}
module.exports = reloadCSS;
},{"./bundle-url":"../node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"styles.scss":[function(require,module,exports) {
var reloadCSS = require('_css_loader');
module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"../node_modules/parcel-bundler/src/builtins/css-loader.js"}],"app.js":[function(require,module,exports) {
"use strict";

var _graphing = require("./graphing.js");
require("./styles.scss");
var app = (0, _graphing.graphing)(document.getElementById('canvas'));
},{"./graphing.js":"graphing.js","./styles.scss":"styles.scss"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}
module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "57710" + '/');
  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);
    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);
          if (didAccept) {
            handled = true;
          }
        }
      });

      // Enable HMR for CSS by default.
      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });
      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }
    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }
    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }
    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}
function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}
function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}
function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }
  var parents = [];
  var k, d, dep;
  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }
  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }
  return parents;
}
function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}
function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }
  if (checkedAssets[id]) {
    return;
  }
  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }
  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}
function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }
  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }
  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","app.js"], null)
//# sourceMappingURL=/app.c328ef1a.js.map