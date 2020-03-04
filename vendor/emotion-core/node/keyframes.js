"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.keyframes = void 0;

var _css = _interopRequireDefault(require("@emotion/css"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var keyframes = function keyframes() {
  var insertable = _css["default"].apply(void 0, arguments);

  var name = "animation-".concat(insertable.name); // $FlowFixMe

  return {
    name: name,
    styles: "@keyframes ".concat(name, "{").concat(insertable.styles, "}"),
    anim: 1,
    toString: function toString() {
      return "_EMO_".concat(this.name, "_").concat(this.styles, "_EMO_");
    }
  };
};

exports.keyframes = keyframes;
