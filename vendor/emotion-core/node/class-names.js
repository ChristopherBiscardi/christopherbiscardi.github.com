"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ClassNames = void 0;

var _preact = require("preact");

var _utils = require("@emotion/utils");

var _serialize = require("@emotion/serialize");

var _context = require("./context");

var _utils2 = require("./utils");

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

var classnames = function classnames(args) {
  var len = args.length;
  var i = 0;
  var cls = "";

  for (; i < len; i++) {
    var arg = args[i];
    if (arg == null) continue;
    var toAdd = void 0;

    switch (_typeof(arg)) {
      case "boolean":
        break;

      case "object": {
        if (Array.isArray(arg)) {
          toAdd = classnames(arg);
        } else {
          toAdd = "";

          for (var k in arg) {
            if (arg[k] && k) {
              toAdd && (toAdd += " ");
              toAdd += k;
            }
          }
        }

        break;
      }

      default: {
        toAdd = arg;
      }
    }

    if (toAdd) {
      cls && (cls += " ");
      cls += toAdd;
    }
  }

  return cls;
};

function merge(registered, css, className) {
  var registeredStyles = [];
  var rawClassName = (0, _utils.getRegisteredStyles)(
    registered,
    registeredStyles,
    className
  );

  if (registeredStyles.length < 2) {
    return className;
  }

  return rawClassName + css(registeredStyles);
}

var ClassNames = (0, _context.withEmotionCache)(function(props, context) {
  return React.createElement(_context.ThemeContext.Consumer, null, function(
    theme
  ) {
    var rules = "";
    var serializedHashes = "";
    var hasRendered = false;

    var css = function css() {
      if (hasRendered && process.env.NODE_ENV !== "production") {
        throw new Error("css can only be used during render");
      }

      for (
        var _len = arguments.length, args = new Array(_len), _key = 0;
        _key < _len;
        _key++
      ) {
        args[_key] = arguments[_key];
      }

      var serialized = (0, _serialize.serializeStyles)(
        args,
        context.registered
      );

      if (_utils2.isBrowser) {
        (0, _utils.insertStyles)(context, serialized, false);
      } else {
        var res = (0, _utils.insertStyles)(context, serialized, false);

        if (res !== undefined) {
          rules += res;
        }
      }

      if (!_utils2.isBrowser) {
        serializedHashes += " ".concat(serialized.name);
      }

      return "".concat(context.key, "-").concat(serialized.name);
    };

    var cx = function cx() {
      if (hasRendered && process.env.NODE_ENV !== "production") {
        throw new Error("cx can only be used during render");
      }

      for (
        var _len2 = arguments.length, args = new Array(_len2), _key2 = 0;
        _key2 < _len2;
        _key2++
      ) {
        args[_key2] = arguments[_key2];
      }

      return merge(context.registered, css, classnames(args));
    };

    var content = {
      css: css,
      cx: cx,
      theme: theme
    };
    var ele = props.children(content);
    hasRendered = true;

    if (!_utils2.isBrowser && rules.length !== 0) {
      var _ref;

      return React.createElement(
        _preact.Fragment,
        null,
        React.createElement(
          "style",
          ((_ref = {}),
          _defineProperty(
            _ref,
            "data-emotion-".concat(context.key),
            serializedHashes.substring(1)
          ),
          _defineProperty(_ref, "dangerouslySetInnerHTML", {
            __html: rules
          }),
          _defineProperty(_ref, "nonce", context.sheet.nonce),
          _ref)
        ),
        ele
      );
    }

    return ele;
  });
});
exports.ClassNames = ClassNames;
