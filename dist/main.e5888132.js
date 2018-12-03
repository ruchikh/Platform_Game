// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
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

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
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
  return newRequire;
})({"../../../../../../../usr/local/lib/node_modules/parcel/src/builtins/bundle-url.js":[function(require,module,exports) {
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
    var matches = ('' + err.stack).match(/(https?|file|ftp):\/\/[^)\n]+/g);

    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp):\/\/.+)\/[^/]+$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"../../../../../../../usr/local/lib/node_modules/parcel/src/builtins/css-loader.js":[function(require,module,exports) {
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
},{"./bundle-url":"../../../../../../../usr/local/lib/node_modules/parcel/src/builtins/bundle-url.js"}],"assets/CSS/main.scss":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"../../../../../../../usr/local/lib/node_modules/parcel/src/builtins/css-loader.js"}],"assets/JS/main.js":[function(require,module,exports) {
"use strict";

require("../CSS/main.scss");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

console.log('plateform Game');
var simpleLevelPlan = "\n......................\n..#................#..\n..#..............=.#..\n..#.........o.o....#..\n..#.@......#####...#..\n..#####............#..\n......#++++++++++++#..\n......##############..\n......................";
console.log(simpleLevelPlan);

var Vec =
/*#__PURE__*/
function () {
  function Vec(x, y) {
    _classCallCheck(this, Vec);

    this.x = x;
    this.y = y;
  }

  _createClass(Vec, [{
    key: "plus",
    value: function plus(other) {
      return new Vec(this.x + other.x, this.y + this.y);
    }
  }, {
    key: "times",
    value: function times(factor) {
      return new Vec(this.x * factor, this.y * factor);
    }
  }]);

  return Vec;
}();

var Player =
/*#__PURE__*/
function () {
  function Player(pos, speed) {
    _classCallCheck(this, Player);

    this.pos = pos;
    this.speed = speed;
  }

  _createClass(Player, [{
    key: "type",
    get: function get() {
      return "player";
    }
  }], [{
    key: "create",
    value: function create(pos) {
      return new Player(pos.plus(new Vec(0, -0.5)), new Vec(0, 0));
    }
  }]);

  return Player;
}();

Player.prototype.size = new Vec(0.8, 1.5);

var Coin =
/*#__PURE__*/
function () {
  function Coin(pos, basePos, wobble) {
    _classCallCheck(this, Coin);

    this.pos = pos;
    this.basePos = basePos;
    this.wobble = wobble;
  }

  _createClass(Coin, [{
    key: "type",
    get: function get() {
      return "Coin";
    }
  }], [{
    key: "create",
    value: function create(pos) {
      var basePos = pos.plus(new Vec(0.2, 0.1));
      return new Coin(basePos, basePos, Math.random() * Math.PI * 2);
    }
  }]);

  return Coin;
}();

Coin.prototype.size = new Vec(0.6, 0.6);

var Lava =
/*#__PURE__*/
function () {
  function Lava(pos, speed, reset) {
    _classCallCheck(this, Lava);

    this.pos = pos;
    this.speed = speed;
    this.reset = reset;
  }

  _createClass(Lava, [{
    key: "type",
    get: function get() {
      return "Lava";
    }
  }], [{
    key: "create",
    value: function create(pos, ch) {
      if (ch == "=") {
        return new Lava(pos, new Vec(2, 0));
      } else if (ch == "|") {
        return new Lava(pos, new Vec(0, 2));
      } else if (ch == "v") {
        return new Lava(pos, new Vec(0, 3), pos);
      }
    }
  }]);

  return Lava;
}();

Lava.prototype.size = new Vec(1, 1);
var levelChars = {
  ".": "empty",
  "#": "wall",
  "+": "lava",
  "@": Player,
  "o": Coin,
  "=": Lava,
  "|": Lava,
  "v": Lava
};

var Level = function Level(plan) {
  var _this = this;

  _classCallCheck(this, Level);

  var rows = plan.trim().split('\n').map(function (l) {
    return _toConsumableArray(l);
  });
  this.height = rows.length;
  this.width = rows[0].length;
  this.startActors = [];
  this.rows = rows.map(function (row, y) {
    return row.map(function (ch, x) {
      var type = levelChars[ch];
      if (typeof type == "string") return type;

      _this.startActors.push(type.create(new Vec(x, y), ch));

      return "empty";
      console.log(type);
    });
  });
  console.log(rows);
  console.log(rows[0]);
};

var simpleLevel = new Level(simpleLevelPlan);
console.log("".concat(simpleLevel.width, " by ").concat(simpleLevel.height)); // console.log(level1)

var newPlayer = new Player(2, 5);
console.log(newPlayer);
var newCoin = new Coin(2, 0, 0);
console.log(newCoin);

var State =
/*#__PURE__*/
function () {
  function State(level, actors, status) {
    _classCallCheck(this, State);

    this.level = level;
    this.actors = actors;
    this.status = status;
  }

  _createClass(State, [{
    key: "player",
    get: function get() {
      return this.actors.find(function (a) {
        return a.type == "player";
      });
    }
  }], [{
    key: "start",
    value: function start(level) {
      return new State(level, level.startActors, "playing");
    }
  }]);

  return State;
}();

var state = new State(1, "player", "lost");
console.log(State.start(1));

function elt(name, attrs) {
  var dom = document.createElement(name);

  var _arr = Object.keys(attrs);

  for (var _i = 0; _i < _arr.length; _i++) {
    var attr = _arr[_i];
    dom.setAttribute(attr, attrs[attr]);
  }

  for (var _len = arguments.length, children = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    children[_key - 2] = arguments[_key];
  }

  for (var _i2 = 0; _i2 < children.length; _i2++) {
    var child = children[_i2];
    dom.appendChild(child);
  }

  return dom;
}

function drawGrid(level) {
  return elt.apply(void 0, ["table", {
    class: "background",
    style: "width: ".concat(level.width * scale, "px")
  }].concat(_toConsumableArray(level.rows.map(function (row) {
    return elt.apply(void 0, ["tr", {
      style: "height: ".concat(scale, "px")
    }].concat(_toConsumableArray(row.map(function (type) {
      return elt("td", {
        class: type
      });
    }))));
  }))));
}

var DomDisplay =
/*#__PURE__*/
function () {
  function DomDisplay(parent, level) {
    _classCallCheck(this, DomDisplay);

    this.dom = elt("div", {
      class: "game"
    }, drawGrid(level));
    this.actorLayer = null;
    parent.appendChild(this.dom);
  }

  _createClass(DomDisplay, [{
    key: "clear",
    value: function clear() {
      this.dom.remove();
    }
  }]);

  return DomDisplay;
}();

DomDisplay.prototype.syncState = function (state) {
  if (this.actorLayer) this.actorLayer.remove();
  this.actorLayer = drawActors(state.actors);
  this.dom.appendChild(this.actorLayer);
  this.dom.className = "game ".concat(state.status);
  this.scrollPlayerIntoView(state);
};

var scale = 20;

function drawActors(actors) {
  return elt.apply(void 0, ["div", {}].concat(_toConsumableArray(actors.map(function (actor) {
    var rect = elt("div", {
      class: "actor ".concat(actor.type)
    });
    rect.style.width = "".concat(actor.size.x * scale, "px");
    rect.style.height = "".concat(actor.size.y * scale, "px");
    rect.style.left = "".concat(actor.pos.x * scale, "px");
    rect.style.top = "".concat(actor.pos.y * scale, "px");
    return rect;
  }))));
}

DomDisplay.prototype.scrollPlayerIntoView = function (state) {
  var width = this.dom.clientWidth;
  var height = this.dom.clientHeight;
  var margin = width / 3; // The viewport

  var left = this.dom.scrollLeft,
      right = left + width;
  var top = this.dom.scrollTop,
      bottom = top + height;
  var player = state.player;
  var center = player.pos.plus(player.size.times(0.5)).times(scale);

  if (center.x < left + margin) {
    this.dom.scrollLeft = center.x - margin;
  } else if (center.x > right - margin) {
    this.dom.scrollLeft = center.x + margin - width;
  }

  if (center.y < top + margin) {
    this.dom.scrollTop = center.y - margin;
  } else if (center.y > bottom - margin) {
    this.dom.scrollTop = center.y + margin - height;
  }
};

Level.prototype.touches = function (pos, size, type) {
  var xStart = Math.floor(pos.x);
  var xEnd = Math.ceil(pos.x + size.x);
  var yStart = Math.floor(pos.y);
  var yEnd = Math.ceil(pos.y + size.y);

  for (var y = yStart; y < yEnd; y++) {
    for (var x = xStart; x < xEnd; x++) {
      var isOutside = x < 0 || x >= this.width || y < 0 || y >= this.height;
      var here = isOutside ? "wall" : this.rows[y][x];
      if (here == type) return true;
    }
  }

  return false;
};

State.prototype.update = function (time, keys) {
  var _this2 = this;

  var actors = this.actors.map(function (actor) {
    return actor.update(time, _this2, keys);
  });
  var newState = new State(this.level, actors, this.status);
  if (newState.status != "playing") return newState;
  var player = newState.player;

  if (this.level.touches(player.pos, player.size, "lava")) {
    return new State(this.level, actors, "lost");
  }

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = actors[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var actor = _step.value;

      if (actor != player && overlap(actor, player)) {
        newState = actor.collide(newState);
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return != null) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return newState;
};

function overlap(actor1, actor2) {
  return actor1.pos.x + actor1.size.x > actor2.pos.x && actor1.pos.x < actor2.pos.x + actor2.size.x && actor1.pos.y + actor1.size.y > actor2.pos.y && actor1.pos.y < actor2.pos.y + actor2.size.y;
}

var d1 = new DomDisplay("div", 1);
console.log(d1);
console.log(state);
},{"../CSS/main.scss":"assets/CSS/main.scss"}],"../../../../../../../usr/local/lib/node_modules/parcel/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "39715" + '/');

  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      console.clear();
      data.assets.forEach(function (asset) {
        hmrApply(global.parcelRequire, asset);
      });
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.parcelRequire, asset.id);
        }
      });
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
  overlay.id = OVERLAY_ID; // html encode message and stack trace

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

function hmrAccept(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

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

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAccept(global.parcelRequire, id);
  });
}
},{}]},{},["../../../../../../../usr/local/lib/node_modules/parcel/src/builtins/hmr-runtime.js","assets/JS/main.js"], null)
//# sourceMappingURL=/main.e5888132.map