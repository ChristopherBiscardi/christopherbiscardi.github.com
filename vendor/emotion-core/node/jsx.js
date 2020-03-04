"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.jsx = void 0;

var _preact = require("preact");

var _context = require("./context");

var _utils = require("@emotion/utils");

var _utils2 = require("./utils");

var _serialize = require("@emotion/serialize");

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

// those identifiers come from error stacks, so they have to be valid JS identifiers
// thus we only need to replace what is a valid character for JS, but not for CSS
var sanitizeIdentifier = function sanitizeIdentifier(identifier) {
  return identifier.replace(/\$/g, "-");
};

var typePropName = "__EMOTION_TYPE_PLEASE_DO_NOT_USE__";
var labelPropName = "__EMOTION_LABEL_PLEASE_DO_NOT_USE__";
var hasOwnProperty = Object.prototype.hasOwnProperty;

var render = function render(cache, props, theme, ref) {
  var cssProp = theme === null ? props.css : props.css(theme); // so that using `css` from `emotion` and passing the result to the css prop works
  // not passing the registered cache to serializeStyles because it would
  // make certain babel optimisations not possible

  if (typeof cssProp === "string" && cache.registered[cssProp] !== undefined) {
    cssProp = cache.registered[cssProp];
  }

  var type = props[typePropName];
  var registeredStyles = [cssProp];
  var className = "";

  if (typeof props.className === "string") {
    className = (0, _utils.getRegisteredStyles)(
      cache.registered,
      registeredStyles,
      props.className
    );
  } else if (props.className != null) {
    className = "".concat(props.className, " ");
  }

  var serialized = (0, _serialize.serializeStyles)(registeredStyles);

  if (
    process.env.NODE_ENV !== "production" &&
    serialized.name.indexOf("-") === -1
  ) {
    var labelFromStack = props[labelPropName];

    if (labelFromStack) {
      serialized = (0, _serialize.serializeStyles)([
        serialized,
        "label:" + labelFromStack + ";"
      ]);
    }
  }

  var rules = (0, _utils.insertStyles)(
    cache,
    serialized,
    typeof type === "string"
  );
  className += "".concat(cache.key, "-").concat(serialized.name);
  var newProps = {};

  for (var key in props) {
    if (
      hasOwnProperty.call(props, key) &&
      key !== "css" &&
      key !== typePropName &&
      (process.env.NODE_ENV === "production" || key !== labelPropName)
    ) {
      newProps[key] = props[key];
    }
  }

  newProps.ref = ref;
  newProps.className = className;
  var ele = (0, _preact.h)(type, newProps);

  if (!_utils2.isBrowser && rules !== undefined) {
    var _ref;

    var serializedNames = serialized.name;
    var next = serialized.next;

    while (next !== undefined) {
      serializedNames += " " + next.name;
      next = next.next;
    }

    return (0, _preact.h)(
      _preact.Fragment,
      null,
      (0, _preact.h)(
        "style",
        ((_ref = {}),
        _defineProperty(
          _ref,
          "data-emotion-".concat(cache.key),
          serializedNames
        ),
        _defineProperty(_ref, "dangerouslySetInnerHTML", {
          __html: rules
        }),
        _defineProperty(_ref, "nonce", cache.sheet.nonce),
        _ref)
      ),
      ele
    );
  }

  return ele;
};

var Emotion =
  /* #__PURE__ */
  (0, _context.withEmotionCache)(function(props, cache, ref) {
    // use Context.read for the theme when it's stable
    if (typeof props.css === "function") {
      return (0, _preact.h)(_context.ThemeContext.Consumer, null, function(
        theme
      ) {
        return render(cache, props, theme, ref);
      });
    }

    return render(cache, props, null, ref);
  });

if (process.env.NODE_ENV !== "production") {
  Emotion.displayName = "EmotionCssPropInternal";
} // $FlowFixMe

var jsx = function jsx(type, props) {
  var args = arguments;

  if (props == null || !hasOwnProperty.call(props, "css")) {
    // $FlowFixMe
    return _preact.h.apply(undefined, args);
  }

  if (
    process.env.NODE_ENV !== "production" &&
    typeof props.css === "string" && // check if there is a css declaration
    props.css.indexOf(":") !== -1
  ) {
    throw new Error(
      "Strings are not allowed as css prop values, please wrap it in a css template literal from '@emotion/css' like this: css`".concat(
        props.css,
        "`"
      )
    );
  }

  var argsLength = args.length;
  var createElementArgArray = new Array(argsLength);
  createElementArgArray[0] = Emotion;
  var newProps = {};

  for (var key in props) {
    if (hasOwnProperty.call(props, key)) {
      newProps[key] = props[key];
    }
  }

  newProps[typePropName] = type;

  if (process.env.NODE_ENV !== "production") {
    var error = new Error();

    if (error.stack) {
      // chrome
      var match = error.stack.match(
        /at (?:Object\.|)jsx.*\n\s+at ([A-Z][A-Za-z$]+) /
      );

      if (!match) {
        // safari and firefox
        match = error.stack.match(/.*\n([A-Z][A-Za-z$]+)@/);
      }

      if (match) {
        newProps[labelPropName] = sanitizeIdentifier(match[1]);
      }
    }
  }

  createElementArgArray[1] = newProps;

  for (var i = 2; i < argsLength; i++) {
    createElementArgArray[i] = args[i];
  } // $FlowFixMe

  return _preact.h.apply(null, createElementArgArray);
};

exports.jsx = jsx;
