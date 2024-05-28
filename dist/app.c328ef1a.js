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
})({"data.json":[function(require,module,exports) {
module.exports = [{
  "time": "2024-05-27 09:00",
  "max": "100",
  "min": "40",
  "start": "90",
  "end": "80"
}, {
  "time": "2024-05-27 10:00",
  "max": "50",
  "min": "10",
  "start": "40",
  "end": "20"
}, {
  "time": "2024-05-27 11:00",
  "max": "70",
  "min": "50",
  "start": "60",
  "end": "60"
}, {
  "time": "2024-05-27 12:00",
  "max": "55",
  "min": "25",
  "start": "25",
  "end": "40"
}, {
  "time": "2024-05-27 13:00",
  "max": "85",
  "min": "40",
  "start": "50",
  "end": "85"
}, {
  "time": "2024-05-27 14:00",
  "max": "70",
  "min": "30",
  "start": "40",
  "end": "60"
}, {
  "time": "2024-05-27 15:00",
  "max": "60",
  "min": "20",
  "start": "30",
  "end": "40"
}, {
  "time": "2024-05-27 16:00",
  "max": "90",
  "min": "70",
  "start": "75",
  "end": "85"
}, {
  "time": "2024-05-27 17:00",
  "max": "50",
  "min": "10",
  "start": "20",
  "end": "40"
}, {
  "time": "2024-05-27 18:00",
  "max": "50",
  "min": "10",
  "start": "50",
  "end": "20"
}];
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
var _data = _interopRequireDefault(require("./data.json"));
var _flDataTest = _interopRequireDefault(require("./fl-data-test.json"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
var WIDTH = 1400;
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
  var _findMinMax = findMinMax(_flDataTest.default),
    _findMinMax2 = _slicedToArray(_findMinMax, 2),
    yMin = _findMinMax2[0],
    yMax = _findMinMax2[1];
  var yKof = ((yMax - yMin) / VIEW_HEIGHT).toFixed(2);
  var xStep = DPI_WIDTH / _flDataTest.default.data.o.length;
  var paddingCandle = DPI_WIDTH / _flDataTest.default.data.o.length / 4;
  var yStep = ((yMax - yMin) / ROWS_COUNT).toFixed();
  draw(_flDataTest.default);
  drawX();
  drawY();
  function drawY() {
    var step = VIEW_HEIGHT / ROWS_COUNT;
    for (var i = 0; i < ROWS_COUNT; i++) {
      ctx.beginPath();
      ctx.lineWidth = 2;
      ctx.strokeStyle = '#bbb';
      ctx.font = 'normal 20px Helvetica, sans-serif';
      ctx.fillStyle = '#96a2aa';
      ctx.moveTo(0, VIEW_HEIGHT - step * i);
      ctx.fillText(yMin + i * yStep, 0, VIEW_HEIGHT - step * i);
      ctx.stroke();
      ctx.closePath();
    }
  }
  function drawX() {
    for (var i = 0; i < _flDataTest.default.data.t.length; i++) {
      ctx.beginPath();
      ctx.font = 'normal 20px Helvetica, sans-serif';
      ctx.fillStyle = '#96a2aa';
      ctx.moveTo(xStep * i + paddingCandle, DPI_HEIGHT - PADDING);
      var time = new Date(_flDataTest.default.data.t[i] * 1000);
      ctx.fillText(toDate(time), xStep * i + paddingCandle, DPI_HEIGHT - PADDING);
      ctx.stroke();
      ctx.closePath();
    }
  }
  function draw(data1) {
    for (var i = 0; i < data1.data.o.length; i++) {
      if (data1.data.o[i] <= data1.data.c[i]) {
        ctx.beginPath();
        ctx.lineWidth = 2;
        ctx.strokeStyle = "green";
        ctx.moveTo(xStep * i + paddingCandle * 2, VIEW_HEIGHT - (data1.data.l[i] - yMin) / yKof);
        ctx.lineTo(xStep * i + paddingCandle * 2, VIEW_HEIGHT - (data1.data.o[i] - yMin) / yKof);
        ctx.rect(xStep * i + paddingCandle, VIEW_HEIGHT - (data1.data.c[i] - yMin) / yKof, paddingCandle * 2, (data1.data.c[i] - data1.data.o[i]) / yKof);
        ctx.fillStyle = 'green';
        ctx.fill();
        ctx.moveTo(xStep * i + paddingCandle * 2, VIEW_HEIGHT - (data1.data.c[i] - yMin) / yKof);
        ctx.lineTo(xStep * i + paddingCandle * 2, VIEW_HEIGHT - (data1.data.h[i] - yMin) / yKof);
        ctx.stroke();
        ctx.closePath();
      } else if (data1.data.o[i] > data1.data.c[i]) {
        ctx.beginPath();
        ctx.lineWidth = 2;
        ctx.strokeStyle = "red";
        ctx.moveTo(xStep * i + paddingCandle * 2, VIEW_HEIGHT - (data1.data.l[i] - yMin) / yKof);
        ctx.lineTo(xStep * i + paddingCandle * 2, VIEW_HEIGHT - (data1.data.c[i] - yMin) / yKof);
        ctx.rect(xStep * i + paddingCandle, VIEW_HEIGHT - (data1.data.o[i] - yMin) / yKof, paddingCandle * 2, (data1.data.o[i] - data1.data.c[i]) / yKof);
        ctx.fillStyle = 'red';
        ctx.fill();
        ctx.moveTo(xStep * i + paddingCandle * 2, VIEW_HEIGHT - (data1.data.o[i] - yMin) / yKof);
        ctx.lineTo(xStep * i + paddingCandle * 2, VIEW_HEIGHT - (data1.data.h[i] - yMin) / yKof);
        ctx.stroke();
        ctx.closePath();
      }
    }
  }
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
}
},{"./data.json":"data.json","./fl-data-test.json":"fl-data-test.json"}],"app.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "65478" + '/');
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