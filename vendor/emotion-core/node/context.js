"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.withEmotionCache = exports.CacheProvider = exports.ThemeContext = void 0;

var _preact = require("preact");

var _compat = require("preact/compat");

var _cache = _interopRequireDefault(require("@emotion/cache"));

var _utils = require("./utils");

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _typeof(obj) {
  "@babel/helpers - typeof";
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj &&
        typeof Symbol === "function" &&
        obj.constructor === Symbol &&
        obj !== Symbol.prototype
        ? "symbol"
        : typeof obj;
    };
  }
  return _typeof(obj);
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  }
  return _assertThisInitialized(self);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf
    ? Object.getPrototypeOf
    : function _getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o);
      };
  return _getPrototypeOf(o);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called"
    );
  }
  return self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: { value: subClass, writable: true, configurable: true }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf =
    Object.setPrototypeOf ||
    function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };
  return _setPrototypeOf(o, p);
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

var EmotionCacheContext = (0, _preact.createContext)(
  // we're doing this to avoid preconstruct's dead code elimination in this one case
  // because this module is primarily intended for the browser and node
  // but it's also required in react native and similar environments sometimes
  // and we could have a special build just for that
  // but this is much easier and the native packages
  // might use a different theme context in the future anyway
  typeof HTMLElement !== "undefined" ? (0, _cache["default"])() : null
);
var ThemeContext = (0, _preact.createContext)({});
exports.ThemeContext = ThemeContext;
var CacheProvider = EmotionCacheContext.Provider;
exports.CacheProvider = CacheProvider;

var withEmotionCache = function withEmotionCache(func) {
  var render = function render(props, ref) {
    return (0, _preact.h)(EmotionCacheContext.Consumer, null, function(cache) {
      return func(props, cache, ref);
    });
  };

  return (0, _compat.forwardRef)(render);
};

exports.withEmotionCache = withEmotionCache;

if (!_utils.isBrowser) {
  var BasicProvider =
    /*#__PURE__*/
    (function(_Component) {
      _inherits(BasicProvider, _Component);

      function BasicProvider() {
        var _getPrototypeOf2;

        var _this;

        _classCallCheck(this, BasicProvider);

        for (
          var _len = arguments.length, args = new Array(_len), _key = 0;
          _key < _len;
          _key++
        ) {
          args[_key] = arguments[_key];
        }

        _this = _possibleConstructorReturn(
          this,
          (_getPrototypeOf2 = _getPrototypeOf(BasicProvider)).call.apply(
            _getPrototypeOf2,
            [this].concat(args)
          )
        );

        _defineProperty(_assertThisInitialized(_this), "state", {
          value: (0, _cache["default"])()
        });

        return _this;
      }

      _createClass(BasicProvider, [
        {
          key: "render",
          value: function render() {
            return (0, _preact.h)(
              EmotionCacheContext.Provider,
              this.state,
              this.props.children(this.state.value)
            );
          }
        }
      ]);

      return BasicProvider;
    })(_preact.Component);

  exports.withEmotionCache = withEmotionCache = function withEmotionCache(
    func
  ) {
    return function(props) {
      return (0, _preact.h)(EmotionCacheContext.Consumer, null, function(
        context
      ) {
        if (context === null) {
          return (0, _preact.h)(BasicProvider, null, function(newContext) {
            return func(props, newContext);
          });
        } else {
          return func(props, context);
        }
      });
    };
  };
}
