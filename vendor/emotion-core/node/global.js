"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Global = void 0;

var _preact = require("preact");

var _context = require("./context");

var _utils = require("@emotion/utils");

var _utils2 = require("./utils");

var _sheet = require("@emotion/sheet");

var _serialize = require("@emotion/serialize");

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

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called"
    );
  }
  return self;
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf
    ? Object.getPrototypeOf
    : function _getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o);
      };
  return _getPrototypeOf(o);
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

var warnedAboutCssPropForGlobal = false;
var Global =
  /* #__PURE__ */
  (0, _context.withEmotionCache)(function(props, cache) {
    if (
      process.env.NODE_ENV !== "production" &&
      !warnedAboutCssPropForGlobal && // check for className as well since the user is
      // probably using the custom createElement which
      // means it will be turned into a className prop
      // $FlowFixMe I don't really want to add it to the type since it shouldn't be used
      (props.className || props.css)
    ) {
      console.error(
        "It looks like you're using the css prop on Global, did you mean to use the styles prop instead?"
      );
      warnedAboutCssPropForGlobal = true;
    }

    var styles = props.styles;

    if (typeof styles === "function") {
      return (0, _preact.h)(_context.ThemeContext.Consumer, null, function(
        theme
      ) {
        var serialized = (0, _serialize.serializeStyles)([styles(theme)]);
        return (0, _preact.h)(InnerGlobal, {
          serialized: serialized,
          cache: cache
        });
      });
    }

    var serialized = (0, _serialize.serializeStyles)([styles]);
    return (0, _preact.h)(InnerGlobal, {
      serialized: serialized,
      cache: cache
    });
  }); // maintain place over rerenders.
// initial render from browser, insertBefore context.sheet.tags[0] or if a style hasn't been inserted there yet, appendChild
// initial client-side render from SSR, use place of hydrating tag

exports.Global = Global;

var InnerGlobal =
  /*#__PURE__*/
  (function(_Component) {
    _inherits(InnerGlobal, _Component);

    function InnerGlobal() {
      _classCallCheck(this, InnerGlobal);

      return _possibleConstructorReturn(
        this,
        _getPrototypeOf(InnerGlobal).apply(this, arguments)
      );
    }

    _createClass(InnerGlobal, [
      {
        key: "componentDidMount",
        value: function componentDidMount() {
          this.sheet = new _sheet.StyleSheet({
            key: "".concat(this.props.cache.key, "-global"),
            nonce: this.props.cache.sheet.nonce,
            container: this.props.cache.sheet.container
          });
          var node = document.querySelector(
            "style[data-emotion-"
              .concat(this.props.cache.key, '="')
              .concat(this.props.serialized.name, '"]')
          );

          if (node !== null) {
            this.sheet.tags.push(node);
          }

          if (this.props.cache.sheet.tags.length) {
            this.sheet.before = this.props.cache.sheet.tags[0];
          }

          this.insertStyles();
        }
      },
      {
        key: "componentDidUpdate",
        value: function componentDidUpdate(prevProps) {
          if (prevProps.serialized.name !== this.props.serialized.name) {
            this.insertStyles();
          }
        }
      },
      {
        key: "insertStyles",
        value: function insertStyles() {
          if (this.props.serialized.next !== undefined) {
            // insert keyframes
            (0, _utils.insertStyles)(
              this.props.cache,
              this.props.serialized.next,
              true
            );
          }

          if (this.sheet.tags.length) {
            // if this doesn't exist then it will be null so the style element will be appended
            var element = this.sheet.tags[this.sheet.tags.length - 1]
              .nextElementSibling;
            this.sheet.before = element;
            this.sheet.flush();
          }

          this.props.cache.insert("", this.props.serialized, this.sheet, false);
        }
      },
      {
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
          this.sheet.flush();
        }
      },
      {
        key: "render",
        value: function render() {
          if (!_utils2.isBrowser) {
            var serialized = this.props.serialized;
            var serializedNames = serialized.name;
            var serializedStyles = serialized.styles;
            var next = serialized.next;

            while (next !== undefined) {
              serializedNames += " " + next.name;
              serializedStyles += next.styles;
              next = next.next;
            }

            var shouldCache = this.props.cache.compat === true;
            var rules = this.props.cache.insert(
              "",
              {
                name: serializedNames,
                styles: serializedStyles
              },
              this.sheet,
              shouldCache
            );

            if (!shouldCache) {
              var _ref;

              return (0, _preact.h)(
                "style",
                ((_ref = {}),
                _defineProperty(
                  _ref,
                  "data-emotion-".concat(this.props.cache.key),
                  serializedNames
                ),
                _defineProperty(_ref, "dangerouslySetInnerHTML", {
                  __html: rules
                }),
                _defineProperty(_ref, "nonce", this.props.cache.sheet.nonce),
                _ref)
              );
            }
          }

          return null;
        }
      }
    ]);

    return InnerGlobal;
  })(_preact.Component);
