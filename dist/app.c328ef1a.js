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
exports.findMinMax = findMinMax;
exports.toDate = toDate;
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function findMinMax(data) {
  var min = Math.min.apply(Math, _toConsumableArray(data.data.l));
  var max = Math.max.apply(Math, _toConsumableArray(data.data.h));
  return [min, max];
}
function toDate(timestamp) {
  var shortMonth = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  var date = new Date(timestamp);
  return "".concat(shortMonth[date.getMonth()], " ").concat(date.getDate(), " ").concat(date.getHours() + ":" + date.getMinutes() + "0", " ");
}
},{}],"fl-data-test.json":[function(require,module,exports) {
module.exports = {
  "status": "success",
  "data": {
    "o": [63170.86, 63300.09, 63112.96, 63262.93, 63459.98, 63419.99, 63254.73, 63148, 63401.55, 62956],
    "h": [63632.49, 63633.01, 63473.51, 63527.3, 63557.99, 63719.97, 63899.68, 63498.04, 63554.98, 63029.12],
    "l": [62274.4, 62942.81, 62638, 62747.17, 63179.21, 62933.33, 63089, 62750, 62799.99, 61680],
    "c": [63300.09, 63112.96, 63262.93, 63459.98, 63419.99, 63254.73, 63148, 63401.55, 62956, 62486.18],
    "t": [1713207600, 1713211200, 1713214800, 1713218400, 1713222000, 1713225600, 1713229200, 1713232800, 1713236400, 1713240000]
  }
};
},{}],"graphing.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.graphing = graphing;
var _utils = require("./utils");
var _flDataTest = _interopRequireDefault(require("./fl-data-test.json"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; } //import data1 from "./fl-data-test3.json" //1 свечa
//import data1 from "./fl-data-test2.json" //2 свечи
// 10 свечей
//import data1 from "./fl-data-test1.json" //30 свечей
//import data1 from "./fl-data-test4.json" //50 свечей
//import data1 from "./fl-data.json"  // 1001 свеча

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
  var raf;
  var proxy = new Proxy({}, {
    set: function set() {
      var result = Reflect.set.apply(Reflect, arguments);
      raf = requestAnimationFrame(paint);
      return result;
    }
  });
  proxy.scroll = 0;
  proxy.pr = 10;
  document.addEventListener("wheel", function (e) {
    e.preventDefault();
    if (e.deltaY < 0) {
      proxy.scroll += 10;
    } else {
      proxy.scroll -= 10;
    }
  }, {
    passive: false
  });
  document.getElementById("canvas").addEventListener("mousemove", function (event) {
    var x = event.clientX; // получаем координату X мыши
    curPos = x;
  });
  function filterDate(datad, index1, index2) {
    datad.data.o = datad.data.o.slice(index1, index2);
    datad.data.h = datad.data.h.slice(index1, index2);
    datad.data.l = datad.data.l.slice(index1, index2);
    datad.data.c = datad.data.c.slice(index1, index2);
    datad.data.t = datad.data.t.slice(index1, index2);
    return datad;
  }
  function compareDate(datad, index, length, pr) {
    //verno
    if (function (pr) {
      return 0 && pr <= 100;
    }) {
      var len1 = index;
      var len2 = length - index - 1;
      var len1_1 = Math.round(len1 - pr * len1 / 100);
      var len2_1 = Math.round(len2 - pr * len2 / 100);
      var index1 = index - len1_1;
      var index2 = index + len2_1;
      if (index2 === index1 + 1) {
        var res = filterDate(datad, index1, index2 + 1);
      } else if (index2 === index1) {
        var _res = filterDate(datad, index1, index2 + 1);
      } else if (index2 < index1) {
        var _res2 = filterDate(datad, index2, index1 + 1);
      } else {
        var _res3 = filterDate(datad, index1, index2 + 1);
      }
    }
  }
  function clear() {
    ctx.clearRect(0, 0, DPI_WIDTH, DPI_HEIGHT);
  }
  function paint() {
    clear();
    if (proxy.scroll > 100) proxy.scroll = 100;
    if (proxy.scroll < 0) proxy.scroll = 0;
    var pos = Math.trunc((curPos * 2 - paddingY) / step);
    var copiedData = structuredClone(_flDataTest.default);
    compareDate(copiedData, pos, LENGTH, proxy.scroll);
    //console.log(copiedData.data)
    console.log(proxy.scroll);
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
      if ((i - 1) % stepValue === 0) {
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

  //paint()
}
},{"./utils":"utils.js","./fl-data-test.json":"fl-data-test.json"}],"app.js":[function(require,module,exports) {
"use strict";

var _graphing = require("./graphing.js");
var app = (0, _graphing.graphing)(document.getElementById('canvas'));
},{"./graphing.js":"graphing.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "63506" + '/');
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