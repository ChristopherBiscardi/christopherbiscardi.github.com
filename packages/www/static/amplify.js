!(function(e, t) {
  "object" == typeof exports && "object" == typeof module
    ? (module.exports = t())
    : "function" == typeof define && define.amd
    ? define([], t)
    : "object" == typeof exports
    ? (exports.AMPLIFY = t())
    : (e.AMPLIFY = t());
})(this, function() {
  return (function(e) {
    var t = {};
    function n(r) {
      if (t[r]) return t[r].exports;
      var i = (t[r] = { i: r, l: !1, exports: {} });
      return e[r].call(i.exports, i, i.exports, n), (i.l = !0), i.exports;
    }
    return (
      (n.m = e),
      (n.c = t),
      (n.d = function(e, t, r) {
        n.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: r });
      }),
      (n.r = function(e) {
        "undefined" != typeof Symbol &&
          Symbol.toStringTag &&
          Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
          Object.defineProperty(e, "__esModule", { value: !0 });
      }),
      (n.t = function(e, t) {
        if ((1 & t && (e = n(e)), 8 & t)) return e;
        if (4 & t && "object" == typeof e && e && e.__esModule) return e;
        var r = Object.create(null);
        if (
          (n.r(r),
          Object.defineProperty(r, "default", { enumerable: !0, value: e }),
          2 & t && "string" != typeof e)
        )
          for (var i in e)
            n.d(
              r,
              i,
              function(t) {
                return e[t];
              }.bind(null, i)
            );
        return r;
      }),
      (n.n = function(e) {
        var t =
          e && e.__esModule
            ? function() {
                return e.default;
              }
            : function() {
                return e;
              };
        return n.d(t, "a", t), t;
      }),
      (n.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t);
      }),
      (n.p = ""),
      n((n.s = 98))
    );
  })([
    function(e, t, n) {
      "use strict";
      (function(e) {
        /*!
         * The buffer module from node.js, for the browser.
         *
         * @author   Feross Aboukhadijeh <http://feross.org>
         * @license  MIT
         */
        var r = n(53),
          i = n(54),
          o = n(55);
        function s() {
          return u.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823;
        }
        function a(e, t) {
          if (s() < t) throw new RangeError("Invalid typed array length");
          return (
            u.TYPED_ARRAY_SUPPORT
              ? ((e = new Uint8Array(t)).__proto__ = u.prototype)
              : (null === e && (e = new u(t)), (e.length = t)),
            e
          );
        }
        function u(e, t, n) {
          if (!(u.TYPED_ARRAY_SUPPORT || this instanceof u))
            return new u(e, t, n);
          if ("number" == typeof e) {
            if ("string" == typeof t)
              throw new Error(
                "If encoding is specified then the first argument must be a string"
              );
            return l(this, e);
          }
          return c(this, e, t, n);
        }
        function c(e, t, n, r) {
          if ("number" == typeof t)
            throw new TypeError('"value" argument must not be a number');
          return "undefined" != typeof ArrayBuffer && t instanceof ArrayBuffer
            ? (function(e, t, n, r) {
                if ((t.byteLength, n < 0 || t.byteLength < n))
                  throw new RangeError("'offset' is out of bounds");
                if (t.byteLength < n + (r || 0))
                  throw new RangeError("'length' is out of bounds");
                t =
                  void 0 === n && void 0 === r
                    ? new Uint8Array(t)
                    : void 0 === r
                    ? new Uint8Array(t, n)
                    : new Uint8Array(t, n, r);
                u.TYPED_ARRAY_SUPPORT
                  ? ((e = t).__proto__ = u.prototype)
                  : (e = h(e, t));
                return e;
              })(e, t, n, r)
            : "string" == typeof t
            ? (function(e, t, n) {
                ("string" == typeof n && "" !== n) || (n = "utf8");
                if (!u.isEncoding(n))
                  throw new TypeError(
                    '"encoding" must be a valid string encoding'
                  );
                var r = 0 | p(t, n),
                  i = (e = a(e, r)).write(t, n);
                i !== r && (e = e.slice(0, i));
                return e;
              })(e, t, n)
            : (function(e, t) {
                if (u.isBuffer(t)) {
                  var n = 0 | d(t.length);
                  return 0 === (e = a(e, n)).length || t.copy(e, 0, 0, n), e;
                }
                if (t) {
                  if (
                    ("undefined" != typeof ArrayBuffer &&
                      t.buffer instanceof ArrayBuffer) ||
                    "length" in t
                  )
                    return "number" != typeof t.length || (r = t.length) != r
                      ? a(e, 0)
                      : h(e, t);
                  if ("Buffer" === t.type && o(t.data)) return h(e, t.data);
                }
                var r;
                throw new TypeError(
                  "First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object."
                );
              })(e, t);
        }
        function f(e) {
          if ("number" != typeof e)
            throw new TypeError('"size" argument must be a number');
          if (e < 0)
            throw new RangeError('"size" argument must not be negative');
        }
        function l(e, t) {
          if ((f(t), (e = a(e, t < 0 ? 0 : 0 | d(t))), !u.TYPED_ARRAY_SUPPORT))
            for (var n = 0; n < t; ++n) e[n] = 0;
          return e;
        }
        function h(e, t) {
          var n = t.length < 0 ? 0 : 0 | d(t.length);
          e = a(e, n);
          for (var r = 0; r < n; r += 1) e[r] = 255 & t[r];
          return e;
        }
        function d(e) {
          if (e >= s())
            throw new RangeError(
              "Attempt to allocate Buffer larger than maximum size: 0x" +
                s().toString(16) +
                " bytes"
            );
          return 0 | e;
        }
        function p(e, t) {
          if (u.isBuffer(e)) return e.length;
          if (
            "undefined" != typeof ArrayBuffer &&
            "function" == typeof ArrayBuffer.isView &&
            (ArrayBuffer.isView(e) || e instanceof ArrayBuffer)
          )
            return e.byteLength;
          "string" != typeof e && (e = "" + e);
          var n = e.length;
          if (0 === n) return 0;
          for (var r = !1; ; )
            switch (t) {
              case "ascii":
              case "latin1":
              case "binary":
                return n;
              case "utf8":
              case "utf-8":
              case void 0:
                return B(e).length;
              case "ucs2":
              case "ucs-2":
              case "utf16le":
              case "utf-16le":
                return 2 * n;
              case "hex":
                return n >>> 1;
              case "base64":
                return q(e).length;
              default:
                if (r) return B(e).length;
                (t = ("" + t).toLowerCase()), (r = !0);
            }
        }
        function g(e, t, n) {
          var r = !1;
          if (((void 0 === t || t < 0) && (t = 0), t > this.length)) return "";
          if (((void 0 === n || n > this.length) && (n = this.length), n <= 0))
            return "";
          if ((n >>>= 0) <= (t >>>= 0)) return "";
          for (e || (e = "utf8"); ; )
            switch (e) {
              case "hex":
                return P(this, t, n);
              case "utf8":
              case "utf-8":
                return T(this, t, n);
              case "ascii":
                return C(this, t, n);
              case "latin1":
              case "binary":
                return O(this, t, n);
              case "base64":
                return I(this, t, n);
              case "ucs2":
              case "ucs-2":
              case "utf16le":
              case "utf-16le":
                return k(this, t, n);
              default:
                if (r) throw new TypeError("Unknown encoding: " + e);
                (e = (e + "").toLowerCase()), (r = !0);
            }
        }
        function y(e, t, n) {
          var r = e[t];
          (e[t] = e[n]), (e[n] = r);
        }
        function v(e, t, n, r, i) {
          if (0 === e.length) return -1;
          if (
            ("string" == typeof n
              ? ((r = n), (n = 0))
              : n > 2147483647
              ? (n = 2147483647)
              : n < -2147483648 && (n = -2147483648),
            (n = +n),
            isNaN(n) && (n = i ? 0 : e.length - 1),
            n < 0 && (n = e.length + n),
            n >= e.length)
          ) {
            if (i) return -1;
            n = e.length - 1;
          } else if (n < 0) {
            if (!i) return -1;
            n = 0;
          }
          if (("string" == typeof t && (t = u.from(t, r)), u.isBuffer(t)))
            return 0 === t.length ? -1 : m(e, t, n, r, i);
          if ("number" == typeof t)
            return (
              (t &= 255),
              u.TYPED_ARRAY_SUPPORT &&
              "function" == typeof Uint8Array.prototype.indexOf
                ? i
                  ? Uint8Array.prototype.indexOf.call(e, t, n)
                  : Uint8Array.prototype.lastIndexOf.call(e, t, n)
                : m(e, [t], n, r, i)
            );
          throw new TypeError("val must be string, number or Buffer");
        }
        function m(e, t, n, r, i) {
          var o,
            s = 1,
            a = e.length,
            u = t.length;
          if (
            void 0 !== r &&
            ("ucs2" === (r = String(r).toLowerCase()) ||
              "ucs-2" === r ||
              "utf16le" === r ||
              "utf-16le" === r)
          ) {
            if (e.length < 2 || t.length < 2) return -1;
            (s = 2), (a /= 2), (u /= 2), (n /= 2);
          }
          function c(e, t) {
            return 1 === s ? e[t] : e.readUInt16BE(t * s);
          }
          if (i) {
            var f = -1;
            for (o = n; o < a; o++)
              if (c(e, o) === c(t, -1 === f ? 0 : o - f)) {
                if ((-1 === f && (f = o), o - f + 1 === u)) return f * s;
              } else -1 !== f && (o -= o - f), (f = -1);
          } else
            for (n + u > a && (n = a - u), o = n; o >= 0; o--) {
              for (var l = !0, h = 0; h < u; h++)
                if (c(e, o + h) !== c(t, h)) {
                  l = !1;
                  break;
                }
              if (l) return o;
            }
          return -1;
        }
        function b(e, t, n, r) {
          n = Number(n) || 0;
          var i = e.length - n;
          r ? (r = Number(r)) > i && (r = i) : (r = i);
          var o = t.length;
          if (o % 2 != 0) throw new TypeError("Invalid hex string");
          r > o / 2 && (r = o / 2);
          for (var s = 0; s < r; ++s) {
            var a = parseInt(t.substr(2 * s, 2), 16);
            if (isNaN(a)) return s;
            e[n + s] = a;
          }
          return s;
        }
        function w(e, t, n, r) {
          return V(B(t, e.length - n), e, n, r);
        }
        function _(e, t, n, r) {
          return V(
            (function(e) {
              for (var t = [], n = 0; n < e.length; ++n)
                t.push(255 & e.charCodeAt(n));
              return t;
            })(t),
            e,
            n,
            r
          );
        }
        function S(e, t, n, r) {
          return _(e, t, n, r);
        }
        function E(e, t, n, r) {
          return V(q(t), e, n, r);
        }
        function A(e, t, n, r) {
          return V(
            (function(e, t) {
              for (
                var n, r, i, o = [], s = 0;
                s < e.length && !((t -= 2) < 0);
                ++s
              )
                (n = e.charCodeAt(s)),
                  (r = n >> 8),
                  (i = n % 256),
                  o.push(i),
                  o.push(r);
              return o;
            })(t, e.length - n),
            e,
            n,
            r
          );
        }
        function I(e, t, n) {
          return 0 === t && n === e.length
            ? r.fromByteArray(e)
            : r.fromByteArray(e.slice(t, n));
        }
        function T(e, t, n) {
          n = Math.min(e.length, n);
          for (var r = [], i = t; i < n; ) {
            var o,
              s,
              a,
              u,
              c = e[i],
              f = null,
              l = c > 239 ? 4 : c > 223 ? 3 : c > 191 ? 2 : 1;
            if (i + l <= n)
              switch (l) {
                case 1:
                  c < 128 && (f = c);
                  break;
                case 2:
                  128 == (192 & (o = e[i + 1])) &&
                    (u = ((31 & c) << 6) | (63 & o)) > 127 &&
                    (f = u);
                  break;
                case 3:
                  (o = e[i + 1]),
                    (s = e[i + 2]),
                    128 == (192 & o) &&
                      128 == (192 & s) &&
                      (u = ((15 & c) << 12) | ((63 & o) << 6) | (63 & s)) >
                        2047 &&
                      (u < 55296 || u > 57343) &&
                      (f = u);
                  break;
                case 4:
                  (o = e[i + 1]),
                    (s = e[i + 2]),
                    (a = e[i + 3]),
                    128 == (192 & o) &&
                      128 == (192 & s) &&
                      128 == (192 & a) &&
                      (u =
                        ((15 & c) << 18) |
                        ((63 & o) << 12) |
                        ((63 & s) << 6) |
                        (63 & a)) > 65535 &&
                      u < 1114112 &&
                      (f = u);
              }
            null === f
              ? ((f = 65533), (l = 1))
              : f > 65535 &&
                ((f -= 65536),
                r.push(((f >>> 10) & 1023) | 55296),
                (f = 56320 | (1023 & f))),
              r.push(f),
              (i += l);
          }
          return (function(e) {
            var t = e.length;
            if (t <= 4096) return String.fromCharCode.apply(String, e);
            var n = "",
              r = 0;
            for (; r < t; )
              n += String.fromCharCode.apply(String, e.slice(r, (r += 4096)));
            return n;
          })(r);
        }
        (t.Buffer = u),
          (t.SlowBuffer = function(e) {
            +e != e && (e = 0);
            return u.alloc(+e);
          }),
          (t.INSPECT_MAX_BYTES = 50),
          (u.TYPED_ARRAY_SUPPORT =
            void 0 !== e.TYPED_ARRAY_SUPPORT
              ? e.TYPED_ARRAY_SUPPORT
              : (function() {
                  try {
                    var e = new Uint8Array(1);
                    return (
                      (e.__proto__ = {
                        __proto__: Uint8Array.prototype,
                        foo: function() {
                          return 42;
                        }
                      }),
                      42 === e.foo() &&
                        "function" == typeof e.subarray &&
                        0 === e.subarray(1, 1).byteLength
                    );
                  } catch (e) {
                    return !1;
                  }
                })()),
          (t.kMaxLength = s()),
          (u.poolSize = 8192),
          (u._augment = function(e) {
            return (e.__proto__ = u.prototype), e;
          }),
          (u.from = function(e, t, n) {
            return c(null, e, t, n);
          }),
          u.TYPED_ARRAY_SUPPORT &&
            ((u.prototype.__proto__ = Uint8Array.prototype),
            (u.__proto__ = Uint8Array),
            "undefined" != typeof Symbol &&
              Symbol.species &&
              u[Symbol.species] === u &&
              Object.defineProperty(u, Symbol.species, {
                value: null,
                configurable: !0
              })),
          (u.alloc = function(e, t, n) {
            return (function(e, t, n, r) {
              return (
                f(t),
                t <= 0
                  ? a(e, t)
                  : void 0 !== n
                  ? "string" == typeof r
                    ? a(e, t).fill(n, r)
                    : a(e, t).fill(n)
                  : a(e, t)
              );
            })(null, e, t, n);
          }),
          (u.allocUnsafe = function(e) {
            return l(null, e);
          }),
          (u.allocUnsafeSlow = function(e) {
            return l(null, e);
          }),
          (u.isBuffer = function(e) {
            return !(null == e || !e._isBuffer);
          }),
          (u.compare = function(e, t) {
            if (!u.isBuffer(e) || !u.isBuffer(t))
              throw new TypeError("Arguments must be Buffers");
            if (e === t) return 0;
            for (
              var n = e.length, r = t.length, i = 0, o = Math.min(n, r);
              i < o;
              ++i
            )
              if (e[i] !== t[i]) {
                (n = e[i]), (r = t[i]);
                break;
              }
            return n < r ? -1 : r < n ? 1 : 0;
          }),
          (u.isEncoding = function(e) {
            switch (String(e).toLowerCase()) {
              case "hex":
              case "utf8":
              case "utf-8":
              case "ascii":
              case "latin1":
              case "binary":
              case "base64":
              case "ucs2":
              case "ucs-2":
              case "utf16le":
              case "utf-16le":
                return !0;
              default:
                return !1;
            }
          }),
          (u.concat = function(e, t) {
            if (!o(e))
              throw new TypeError(
                '"list" argument must be an Array of Buffers'
              );
            if (0 === e.length) return u.alloc(0);
            var n;
            if (void 0 === t)
              for (t = 0, n = 0; n < e.length; ++n) t += e[n].length;
            var r = u.allocUnsafe(t),
              i = 0;
            for (n = 0; n < e.length; ++n) {
              var s = e[n];
              if (!u.isBuffer(s))
                throw new TypeError(
                  '"list" argument must be an Array of Buffers'
                );
              s.copy(r, i), (i += s.length);
            }
            return r;
          }),
          (u.byteLength = p),
          (u.prototype._isBuffer = !0),
          (u.prototype.swap16 = function() {
            var e = this.length;
            if (e % 2 != 0)
              throw new RangeError("Buffer size must be a multiple of 16-bits");
            for (var t = 0; t < e; t += 2) y(this, t, t + 1);
            return this;
          }),
          (u.prototype.swap32 = function() {
            var e = this.length;
            if (e % 4 != 0)
              throw new RangeError("Buffer size must be a multiple of 32-bits");
            for (var t = 0; t < e; t += 4)
              y(this, t, t + 3), y(this, t + 1, t + 2);
            return this;
          }),
          (u.prototype.swap64 = function() {
            var e = this.length;
            if (e % 8 != 0)
              throw new RangeError("Buffer size must be a multiple of 64-bits");
            for (var t = 0; t < e; t += 8)
              y(this, t, t + 7),
                y(this, t + 1, t + 6),
                y(this, t + 2, t + 5),
                y(this, t + 3, t + 4);
            return this;
          }),
          (u.prototype.toString = function() {
            var e = 0 | this.length;
            return 0 === e
              ? ""
              : 0 === arguments.length
              ? T(this, 0, e)
              : g.apply(this, arguments);
          }),
          (u.prototype.equals = function(e) {
            if (!u.isBuffer(e))
              throw new TypeError("Argument must be a Buffer");
            return this === e || 0 === u.compare(this, e);
          }),
          (u.prototype.inspect = function() {
            var e = "",
              n = t.INSPECT_MAX_BYTES;
            return (
              this.length > 0 &&
                ((e = this.toString("hex", 0, n)
                  .match(/.{2}/g)
                  .join(" ")),
                this.length > n && (e += " ... ")),
              "<Buffer " + e + ">"
            );
          }),
          (u.prototype.compare = function(e, t, n, r, i) {
            if (!u.isBuffer(e))
              throw new TypeError("Argument must be a Buffer");
            if (
              (void 0 === t && (t = 0),
              void 0 === n && (n = e ? e.length : 0),
              void 0 === r && (r = 0),
              void 0 === i && (i = this.length),
              t < 0 || n > e.length || r < 0 || i > this.length)
            )
              throw new RangeError("out of range index");
            if (r >= i && t >= n) return 0;
            if (r >= i) return -1;
            if (t >= n) return 1;
            if (this === e) return 0;
            for (
              var o = (i >>>= 0) - (r >>>= 0),
                s = (n >>>= 0) - (t >>>= 0),
                a = Math.min(o, s),
                c = this.slice(r, i),
                f = e.slice(t, n),
                l = 0;
              l < a;
              ++l
            )
              if (c[l] !== f[l]) {
                (o = c[l]), (s = f[l]);
                break;
              }
            return o < s ? -1 : s < o ? 1 : 0;
          }),
          (u.prototype.includes = function(e, t, n) {
            return -1 !== this.indexOf(e, t, n);
          }),
          (u.prototype.indexOf = function(e, t, n) {
            return v(this, e, t, n, !0);
          }),
          (u.prototype.lastIndexOf = function(e, t, n) {
            return v(this, e, t, n, !1);
          }),
          (u.prototype.write = function(e, t, n, r) {
            if (void 0 === t) (r = "utf8"), (n = this.length), (t = 0);
            else if (void 0 === n && "string" == typeof t)
              (r = t), (n = this.length), (t = 0);
            else {
              if (!isFinite(t))
                throw new Error(
                  "Buffer.write(string, encoding, offset[, length]) is no longer supported"
                );
              (t |= 0),
                isFinite(n)
                  ? ((n |= 0), void 0 === r && (r = "utf8"))
                  : ((r = n), (n = void 0));
            }
            var i = this.length - t;
            if (
              ((void 0 === n || n > i) && (n = i),
              (e.length > 0 && (n < 0 || t < 0)) || t > this.length)
            )
              throw new RangeError("Attempt to write outside buffer bounds");
            r || (r = "utf8");
            for (var o = !1; ; )
              switch (r) {
                case "hex":
                  return b(this, e, t, n);
                case "utf8":
                case "utf-8":
                  return w(this, e, t, n);
                case "ascii":
                  return _(this, e, t, n);
                case "latin1":
                case "binary":
                  return S(this, e, t, n);
                case "base64":
                  return E(this, e, t, n);
                case "ucs2":
                case "ucs-2":
                case "utf16le":
                case "utf-16le":
                  return A(this, e, t, n);
                default:
                  if (o) throw new TypeError("Unknown encoding: " + r);
                  (r = ("" + r).toLowerCase()), (o = !0);
              }
          }),
          (u.prototype.toJSON = function() {
            return {
              type: "Buffer",
              data: Array.prototype.slice.call(this._arr || this, 0)
            };
          });
        function C(e, t, n) {
          var r = "";
          n = Math.min(e.length, n);
          for (var i = t; i < n; ++i) r += String.fromCharCode(127 & e[i]);
          return r;
        }
        function O(e, t, n) {
          var r = "";
          n = Math.min(e.length, n);
          for (var i = t; i < n; ++i) r += String.fromCharCode(e[i]);
          return r;
        }
        function P(e, t, n) {
          var r = e.length;
          (!t || t < 0) && (t = 0), (!n || n < 0 || n > r) && (n = r);
          for (var i = "", o = t; o < n; ++o) i += F(e[o]);
          return i;
        }
        function k(e, t, n) {
          for (var r = e.slice(t, n), i = "", o = 0; o < r.length; o += 2)
            i += String.fromCharCode(r[o] + 256 * r[o + 1]);
          return i;
        }
        function N(e, t, n) {
          if (e % 1 != 0 || e < 0) throw new RangeError("offset is not uint");
          if (e + t > n)
            throw new RangeError("Trying to access beyond buffer length");
        }
        function R(e, t, n, r, i, o) {
          if (!u.isBuffer(e))
            throw new TypeError('"buffer" argument must be a Buffer instance');
          if (t > i || t < o)
            throw new RangeError('"value" argument is out of bounds');
          if (n + r > e.length) throw new RangeError("Index out of range");
        }
        function x(e, t, n, r) {
          t < 0 && (t = 65535 + t + 1);
          for (var i = 0, o = Math.min(e.length - n, 2); i < o; ++i)
            e[n + i] =
              (t & (255 << (8 * (r ? i : 1 - i)))) >>> (8 * (r ? i : 1 - i));
        }
        function U(e, t, n, r) {
          t < 0 && (t = 4294967295 + t + 1);
          for (var i = 0, o = Math.min(e.length - n, 4); i < o; ++i)
            e[n + i] = (t >>> (8 * (r ? i : 3 - i))) & 255;
        }
        function D(e, t, n, r, i, o) {
          if (n + r > e.length) throw new RangeError("Index out of range");
          if (n < 0) throw new RangeError("Index out of range");
        }
        function M(e, t, n, r, o) {
          return o || D(e, 0, n, 4), i.write(e, t, n, r, 23, 4), n + 4;
        }
        function j(e, t, n, r, o) {
          return o || D(e, 0, n, 8), i.write(e, t, n, r, 52, 8), n + 8;
        }
        (u.prototype.slice = function(e, t) {
          var n,
            r = this.length;
          if (
            ((e = ~~e) < 0 ? (e += r) < 0 && (e = 0) : e > r && (e = r),
            (t = void 0 === t ? r : ~~t) < 0
              ? (t += r) < 0 && (t = 0)
              : t > r && (t = r),
            t < e && (t = e),
            u.TYPED_ARRAY_SUPPORT)
          )
            (n = this.subarray(e, t)).__proto__ = u.prototype;
          else {
            var i = t - e;
            n = new u(i, void 0);
            for (var o = 0; o < i; ++o) n[o] = this[o + e];
          }
          return n;
        }),
          (u.prototype.readUIntLE = function(e, t, n) {
            (e |= 0), (t |= 0), n || N(e, t, this.length);
            for (var r = this[e], i = 1, o = 0; ++o < t && (i *= 256); )
              r += this[e + o] * i;
            return r;
          }),
          (u.prototype.readUIntBE = function(e, t, n) {
            (e |= 0), (t |= 0), n || N(e, t, this.length);
            for (var r = this[e + --t], i = 1; t > 0 && (i *= 256); )
              r += this[e + --t] * i;
            return r;
          }),
          (u.prototype.readUInt8 = function(e, t) {
            return t || N(e, 1, this.length), this[e];
          }),
          (u.prototype.readUInt16LE = function(e, t) {
            return t || N(e, 2, this.length), this[e] | (this[e + 1] << 8);
          }),
          (u.prototype.readUInt16BE = function(e, t) {
            return t || N(e, 2, this.length), (this[e] << 8) | this[e + 1];
          }),
          (u.prototype.readUInt32LE = function(e, t) {
            return (
              t || N(e, 4, this.length),
              (this[e] | (this[e + 1] << 8) | (this[e + 2] << 16)) +
                16777216 * this[e + 3]
            );
          }),
          (u.prototype.readUInt32BE = function(e, t) {
            return (
              t || N(e, 4, this.length),
              16777216 * this[e] +
                ((this[e + 1] << 16) | (this[e + 2] << 8) | this[e + 3])
            );
          }),
          (u.prototype.readIntLE = function(e, t, n) {
            (e |= 0), (t |= 0), n || N(e, t, this.length);
            for (var r = this[e], i = 1, o = 0; ++o < t && (i *= 256); )
              r += this[e + o] * i;
            return r >= (i *= 128) && (r -= Math.pow(2, 8 * t)), r;
          }),
          (u.prototype.readIntBE = function(e, t, n) {
            (e |= 0), (t |= 0), n || N(e, t, this.length);
            for (var r = t, i = 1, o = this[e + --r]; r > 0 && (i *= 256); )
              o += this[e + --r] * i;
            return o >= (i *= 128) && (o -= Math.pow(2, 8 * t)), o;
          }),
          (u.prototype.readInt8 = function(e, t) {
            return (
              t || N(e, 1, this.length),
              128 & this[e] ? -1 * (255 - this[e] + 1) : this[e]
            );
          }),
          (u.prototype.readInt16LE = function(e, t) {
            t || N(e, 2, this.length);
            var n = this[e] | (this[e + 1] << 8);
            return 32768 & n ? 4294901760 | n : n;
          }),
          (u.prototype.readInt16BE = function(e, t) {
            t || N(e, 2, this.length);
            var n = this[e + 1] | (this[e] << 8);
            return 32768 & n ? 4294901760 | n : n;
          }),
          (u.prototype.readInt32LE = function(e, t) {
            return (
              t || N(e, 4, this.length),
              this[e] |
                (this[e + 1] << 8) |
                (this[e + 2] << 16) |
                (this[e + 3] << 24)
            );
          }),
          (u.prototype.readInt32BE = function(e, t) {
            return (
              t || N(e, 4, this.length),
              (this[e] << 24) |
                (this[e + 1] << 16) |
                (this[e + 2] << 8) |
                this[e + 3]
            );
          }),
          (u.prototype.readFloatLE = function(e, t) {
            return t || N(e, 4, this.length), i.read(this, e, !0, 23, 4);
          }),
          (u.prototype.readFloatBE = function(e, t) {
            return t || N(e, 4, this.length), i.read(this, e, !1, 23, 4);
          }),
          (u.prototype.readDoubleLE = function(e, t) {
            return t || N(e, 8, this.length), i.read(this, e, !0, 52, 8);
          }),
          (u.prototype.readDoubleBE = function(e, t) {
            return t || N(e, 8, this.length), i.read(this, e, !1, 52, 8);
          }),
          (u.prototype.writeUIntLE = function(e, t, n, r) {
            ((e = +e), (t |= 0), (n |= 0), r) ||
              R(this, e, t, n, Math.pow(2, 8 * n) - 1, 0);
            var i = 1,
              o = 0;
            for (this[t] = 255 & e; ++o < n && (i *= 256); )
              this[t + o] = (e / i) & 255;
            return t + n;
          }),
          (u.prototype.writeUIntBE = function(e, t, n, r) {
            ((e = +e), (t |= 0), (n |= 0), r) ||
              R(this, e, t, n, Math.pow(2, 8 * n) - 1, 0);
            var i = n - 1,
              o = 1;
            for (this[t + i] = 255 & e; --i >= 0 && (o *= 256); )
              this[t + i] = (e / o) & 255;
            return t + n;
          }),
          (u.prototype.writeUInt8 = function(e, t, n) {
            return (
              (e = +e),
              (t |= 0),
              n || R(this, e, t, 1, 255, 0),
              u.TYPED_ARRAY_SUPPORT || (e = Math.floor(e)),
              (this[t] = 255 & e),
              t + 1
            );
          }),
          (u.prototype.writeUInt16LE = function(e, t, n) {
            return (
              (e = +e),
              (t |= 0),
              n || R(this, e, t, 2, 65535, 0),
              u.TYPED_ARRAY_SUPPORT
                ? ((this[t] = 255 & e), (this[t + 1] = e >>> 8))
                : x(this, e, t, !0),
              t + 2
            );
          }),
          (u.prototype.writeUInt16BE = function(e, t, n) {
            return (
              (e = +e),
              (t |= 0),
              n || R(this, e, t, 2, 65535, 0),
              u.TYPED_ARRAY_SUPPORT
                ? ((this[t] = e >>> 8), (this[t + 1] = 255 & e))
                : x(this, e, t, !1),
              t + 2
            );
          }),
          (u.prototype.writeUInt32LE = function(e, t, n) {
            return (
              (e = +e),
              (t |= 0),
              n || R(this, e, t, 4, 4294967295, 0),
              u.TYPED_ARRAY_SUPPORT
                ? ((this[t + 3] = e >>> 24),
                  (this[t + 2] = e >>> 16),
                  (this[t + 1] = e >>> 8),
                  (this[t] = 255 & e))
                : U(this, e, t, !0),
              t + 4
            );
          }),
          (u.prototype.writeUInt32BE = function(e, t, n) {
            return (
              (e = +e),
              (t |= 0),
              n || R(this, e, t, 4, 4294967295, 0),
              u.TYPED_ARRAY_SUPPORT
                ? ((this[t] = e >>> 24),
                  (this[t + 1] = e >>> 16),
                  (this[t + 2] = e >>> 8),
                  (this[t + 3] = 255 & e))
                : U(this, e, t, !1),
              t + 4
            );
          }),
          (u.prototype.writeIntLE = function(e, t, n, r) {
            if (((e = +e), (t |= 0), !r)) {
              var i = Math.pow(2, 8 * n - 1);
              R(this, e, t, n, i - 1, -i);
            }
            var o = 0,
              s = 1,
              a = 0;
            for (this[t] = 255 & e; ++o < n && (s *= 256); )
              e < 0 && 0 === a && 0 !== this[t + o - 1] && (a = 1),
                (this[t + o] = (((e / s) >> 0) - a) & 255);
            return t + n;
          }),
          (u.prototype.writeIntBE = function(e, t, n, r) {
            if (((e = +e), (t |= 0), !r)) {
              var i = Math.pow(2, 8 * n - 1);
              R(this, e, t, n, i - 1, -i);
            }
            var o = n - 1,
              s = 1,
              a = 0;
            for (this[t + o] = 255 & e; --o >= 0 && (s *= 256); )
              e < 0 && 0 === a && 0 !== this[t + o + 1] && (a = 1),
                (this[t + o] = (((e / s) >> 0) - a) & 255);
            return t + n;
          }),
          (u.prototype.writeInt8 = function(e, t, n) {
            return (
              (e = +e),
              (t |= 0),
              n || R(this, e, t, 1, 127, -128),
              u.TYPED_ARRAY_SUPPORT || (e = Math.floor(e)),
              e < 0 && (e = 255 + e + 1),
              (this[t] = 255 & e),
              t + 1
            );
          }),
          (u.prototype.writeInt16LE = function(e, t, n) {
            return (
              (e = +e),
              (t |= 0),
              n || R(this, e, t, 2, 32767, -32768),
              u.TYPED_ARRAY_SUPPORT
                ? ((this[t] = 255 & e), (this[t + 1] = e >>> 8))
                : x(this, e, t, !0),
              t + 2
            );
          }),
          (u.prototype.writeInt16BE = function(e, t, n) {
            return (
              (e = +e),
              (t |= 0),
              n || R(this, e, t, 2, 32767, -32768),
              u.TYPED_ARRAY_SUPPORT
                ? ((this[t] = e >>> 8), (this[t + 1] = 255 & e))
                : x(this, e, t, !1),
              t + 2
            );
          }),
          (u.prototype.writeInt32LE = function(e, t, n) {
            return (
              (e = +e),
              (t |= 0),
              n || R(this, e, t, 4, 2147483647, -2147483648),
              u.TYPED_ARRAY_SUPPORT
                ? ((this[t] = 255 & e),
                  (this[t + 1] = e >>> 8),
                  (this[t + 2] = e >>> 16),
                  (this[t + 3] = e >>> 24))
                : U(this, e, t, !0),
              t + 4
            );
          }),
          (u.prototype.writeInt32BE = function(e, t, n) {
            return (
              (e = +e),
              (t |= 0),
              n || R(this, e, t, 4, 2147483647, -2147483648),
              e < 0 && (e = 4294967295 + e + 1),
              u.TYPED_ARRAY_SUPPORT
                ? ((this[t] = e >>> 24),
                  (this[t + 1] = e >>> 16),
                  (this[t + 2] = e >>> 8),
                  (this[t + 3] = 255 & e))
                : U(this, e, t, !1),
              t + 4
            );
          }),
          (u.prototype.writeFloatLE = function(e, t, n) {
            return M(this, e, t, !0, n);
          }),
          (u.prototype.writeFloatBE = function(e, t, n) {
            return M(this, e, t, !1, n);
          }),
          (u.prototype.writeDoubleLE = function(e, t, n) {
            return j(this, e, t, !0, n);
          }),
          (u.prototype.writeDoubleBE = function(e, t, n) {
            return j(this, e, t, !1, n);
          }),
          (u.prototype.copy = function(e, t, n, r) {
            if (
              (n || (n = 0),
              r || 0 === r || (r = this.length),
              t >= e.length && (t = e.length),
              t || (t = 0),
              r > 0 && r < n && (r = n),
              r === n)
            )
              return 0;
            if (0 === e.length || 0 === this.length) return 0;
            if (t < 0) throw new RangeError("targetStart out of bounds");
            if (n < 0 || n >= this.length)
              throw new RangeError("sourceStart out of bounds");
            if (r < 0) throw new RangeError("sourceEnd out of bounds");
            r > this.length && (r = this.length),
              e.length - t < r - n && (r = e.length - t + n);
            var i,
              o = r - n;
            if (this === e && n < t && t < r)
              for (i = o - 1; i >= 0; --i) e[i + t] = this[i + n];
            else if (o < 1e3 || !u.TYPED_ARRAY_SUPPORT)
              for (i = 0; i < o; ++i) e[i + t] = this[i + n];
            else Uint8Array.prototype.set.call(e, this.subarray(n, n + o), t);
            return o;
          }),
          (u.prototype.fill = function(e, t, n, r) {
            if ("string" == typeof e) {
              if (
                ("string" == typeof t
                  ? ((r = t), (t = 0), (n = this.length))
                  : "string" == typeof n && ((r = n), (n = this.length)),
                1 === e.length)
              ) {
                var i = e.charCodeAt(0);
                i < 256 && (e = i);
              }
              if (void 0 !== r && "string" != typeof r)
                throw new TypeError("encoding must be a string");
              if ("string" == typeof r && !u.isEncoding(r))
                throw new TypeError("Unknown encoding: " + r);
            } else "number" == typeof e && (e &= 255);
            if (t < 0 || this.length < t || this.length < n)
              throw new RangeError("Out of range index");
            if (n <= t) return this;
            var o;
            if (
              ((t >>>= 0),
              (n = void 0 === n ? this.length : n >>> 0),
              e || (e = 0),
              "number" == typeof e)
            )
              for (o = t; o < n; ++o) this[o] = e;
            else {
              var s = u.isBuffer(e) ? e : B(new u(e, r).toString()),
                a = s.length;
              for (o = 0; o < n - t; ++o) this[o + t] = s[o % a];
            }
            return this;
          });
        var L = /[^+\/0-9A-Za-z-_]/g;
        function F(e) {
          return e < 16 ? "0" + e.toString(16) : e.toString(16);
        }
        function B(e, t) {
          var n;
          t = t || 1 / 0;
          for (var r = e.length, i = null, o = [], s = 0; s < r; ++s) {
            if ((n = e.charCodeAt(s)) > 55295 && n < 57344) {
              if (!i) {
                if (n > 56319) {
                  (t -= 3) > -1 && o.push(239, 191, 189);
                  continue;
                }
                if (s + 1 === r) {
                  (t -= 3) > -1 && o.push(239, 191, 189);
                  continue;
                }
                i = n;
                continue;
              }
              if (n < 56320) {
                (t -= 3) > -1 && o.push(239, 191, 189), (i = n);
                continue;
              }
              n = 65536 + (((i - 55296) << 10) | (n - 56320));
            } else i && (t -= 3) > -1 && o.push(239, 191, 189);
            if (((i = null), n < 128)) {
              if ((t -= 1) < 0) break;
              o.push(n);
            } else if (n < 2048) {
              if ((t -= 2) < 0) break;
              o.push((n >> 6) | 192, (63 & n) | 128);
            } else if (n < 65536) {
              if ((t -= 3) < 0) break;
              o.push((n >> 12) | 224, ((n >> 6) & 63) | 128, (63 & n) | 128);
            } else {
              if (!(n < 1114112)) throw new Error("Invalid code point");
              if ((t -= 4) < 0) break;
              o.push(
                (n >> 18) | 240,
                ((n >> 12) & 63) | 128,
                ((n >> 6) & 63) | 128,
                (63 & n) | 128
              );
            }
          }
          return o;
        }
        function q(e) {
          return r.toByteArray(
            (function(e) {
              if (
                (e = (function(e) {
                  return e.trim ? e.trim() : e.replace(/^\s+|\s+$/g, "");
                })(e).replace(L, "")).length < 2
              )
                return "";
              for (; e.length % 4 != 0; ) e += "=";
              return e;
            })(e)
          );
        }
        function V(e, t, n, r) {
          for (var i = 0; i < r && !(i + n >= t.length || i >= e.length); ++i)
            t[i + n] = e[i];
          return i;
        }
      }.call(this, n(15)));
    },
    function(e, t, n) {
      "use strict";
      var r = n(58),
        i = n(60);
      function o() {
        (this.protocol = null),
          (this.slashes = null),
          (this.auth = null),
          (this.host = null),
          (this.port = null),
          (this.hostname = null),
          (this.hash = null),
          (this.search = null),
          (this.query = null),
          (this.pathname = null),
          (this.path = null),
          (this.href = null);
      }
      (t.parse = b),
        (t.resolve = function(e, t) {
          return b(e, !1, !0).resolve(t);
        }),
        (t.resolveObject = function(e, t) {
          return e ? b(e, !1, !0).resolveObject(t) : t;
        }),
        (t.format = function(e) {
          i.isString(e) && (e = b(e));
          return e instanceof o ? e.format() : o.prototype.format.call(e);
        }),
        (t.Url = o);
      var s = /^([a-z0-9.+-]+:)/i,
        a = /:[0-9]*$/,
        u = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/,
        c = ["{", "}", "|", "\\", "^", "`"].concat([
          "<",
          ">",
          '"',
          "`",
          " ",
          "\r",
          "\n",
          "\t"
        ]),
        f = ["'"].concat(c),
        l = ["%", "/", "?", ";", "#"].concat(f),
        h = ["/", "?", "#"],
        d = /^[+a-z0-9A-Z_-]{0,63}$/,
        p = /^([+a-z0-9A-Z_-]{0,63})(.*)$/,
        g = { javascript: !0, "javascript:": !0 },
        y = { javascript: !0, "javascript:": !0 },
        v = {
          http: !0,
          https: !0,
          ftp: !0,
          gopher: !0,
          file: !0,
          "http:": !0,
          "https:": !0,
          "ftp:": !0,
          "gopher:": !0,
          "file:": !0
        },
        m = n(61);
      function b(e, t, n) {
        if (e && i.isObject(e) && e instanceof o) return e;
        var r = new o();
        return r.parse(e, t, n), r;
      }
      (o.prototype.parse = function(e, t, n) {
        if (!i.isString(e))
          throw new TypeError(
            "Parameter 'url' must be a string, not " + typeof e
          );
        var o = e.indexOf("?"),
          a = -1 !== o && o < e.indexOf("#") ? "?" : "#",
          c = e.split(a);
        c[0] = c[0].replace(/\\/g, "/");
        var b = (e = c.join(a));
        if (((b = b.trim()), !n && 1 === e.split("#").length)) {
          var w = u.exec(b);
          if (w)
            return (
              (this.path = b),
              (this.href = b),
              (this.pathname = w[1]),
              w[2]
                ? ((this.search = w[2]),
                  (this.query = t
                    ? m.parse(this.search.substr(1))
                    : this.search.substr(1)))
                : t && ((this.search = ""), (this.query = {})),
              this
            );
        }
        var _ = s.exec(b);
        if (_) {
          var S = (_ = _[0]).toLowerCase();
          (this.protocol = S), (b = b.substr(_.length));
        }
        if (n || _ || b.match(/^\/\/[^@\/]+@[^@\/]+/)) {
          var E = "//" === b.substr(0, 2);
          !E || (_ && y[_]) || ((b = b.substr(2)), (this.slashes = !0));
        }
        if (!y[_] && (E || (_ && !v[_]))) {
          for (var A, I, T = -1, C = 0; C < h.length; C++) {
            -1 !== (O = b.indexOf(h[C])) && (-1 === T || O < T) && (T = O);
          }
          -1 !== (I = -1 === T ? b.lastIndexOf("@") : b.lastIndexOf("@", T)) &&
            ((A = b.slice(0, I)),
            (b = b.slice(I + 1)),
            (this.auth = decodeURIComponent(A))),
            (T = -1);
          for (C = 0; C < l.length; C++) {
            var O;
            -1 !== (O = b.indexOf(l[C])) && (-1 === T || O < T) && (T = O);
          }
          -1 === T && (T = b.length),
            (this.host = b.slice(0, T)),
            (b = b.slice(T)),
            this.parseHost(),
            (this.hostname = this.hostname || "");
          var P =
            "[" === this.hostname[0] &&
            "]" === this.hostname[this.hostname.length - 1];
          if (!P)
            for (
              var k = this.hostname.split(/\./), N = ((C = 0), k.length);
              C < N;
              C++
            ) {
              var R = k[C];
              if (R && !R.match(d)) {
                for (var x = "", U = 0, D = R.length; U < D; U++)
                  R.charCodeAt(U) > 127 ? (x += "x") : (x += R[U]);
                if (!x.match(d)) {
                  var M = k.slice(0, C),
                    j = k.slice(C + 1),
                    L = R.match(p);
                  L && (M.push(L[1]), j.unshift(L[2])),
                    j.length && (b = "/" + j.join(".") + b),
                    (this.hostname = M.join("."));
                  break;
                }
              }
            }
          this.hostname.length > 255
            ? (this.hostname = "")
            : (this.hostname = this.hostname.toLowerCase()),
            P || (this.hostname = r.toASCII(this.hostname));
          var F = this.port ? ":" + this.port : "",
            B = this.hostname || "";
          (this.host = B + F),
            (this.href += this.host),
            P &&
              ((this.hostname = this.hostname.substr(
                1,
                this.hostname.length - 2
              )),
              "/" !== b[0] && (b = "/" + b));
        }
        if (!g[S])
          for (C = 0, N = f.length; C < N; C++) {
            var q = f[C];
            if (-1 !== b.indexOf(q)) {
              var V = encodeURIComponent(q);
              V === q && (V = escape(q)), (b = b.split(q).join(V));
            }
          }
        var z = b.indexOf("#");
        -1 !== z && ((this.hash = b.substr(z)), (b = b.slice(0, z)));
        var K = b.indexOf("?");
        if (
          (-1 !== K
            ? ((this.search = b.substr(K)),
              (this.query = b.substr(K + 1)),
              t && (this.query = m.parse(this.query)),
              (b = b.slice(0, K)))
            : t && ((this.search = ""), (this.query = {})),
          b && (this.pathname = b),
          v[S] && this.hostname && !this.pathname && (this.pathname = "/"),
          this.pathname || this.search)
        ) {
          F = this.pathname || "";
          var G = this.search || "";
          this.path = F + G;
        }
        return (this.href = this.format()), this;
      }),
        (o.prototype.format = function() {
          var e = this.auth || "";
          e &&
            ((e = (e = encodeURIComponent(e)).replace(/%3A/i, ":")),
            (e += "@"));
          var t = this.protocol || "",
            n = this.pathname || "",
            r = this.hash || "",
            o = !1,
            s = "";
          this.host
            ? (o = e + this.host)
            : this.hostname &&
              ((o =
                e +
                (-1 === this.hostname.indexOf(":")
                  ? this.hostname
                  : "[" + this.hostname + "]")),
              this.port && (o += ":" + this.port)),
            this.query &&
              i.isObject(this.query) &&
              Object.keys(this.query).length &&
              (s = m.stringify(this.query));
          var a = this.search || (s && "?" + s) || "";
          return (
            t && ":" !== t.substr(-1) && (t += ":"),
            this.slashes || ((!t || v[t]) && !1 !== o)
              ? ((o = "//" + (o || "")),
                n && "/" !== n.charAt(0) && (n = "/" + n))
              : o || (o = ""),
            r && "#" !== r.charAt(0) && (r = "#" + r),
            a && "?" !== a.charAt(0) && (a = "?" + a),
            t +
              o +
              (n = n.replace(/[?#]/g, function(e) {
                return encodeURIComponent(e);
              })) +
              (a = a.replace("#", "%23")) +
              r
          );
        }),
        (o.prototype.resolve = function(e) {
          return this.resolveObject(b(e, !1, !0)).format();
        }),
        (o.prototype.resolveObject = function(e) {
          if (i.isString(e)) {
            var t = new o();
            t.parse(e, !1, !0), (e = t);
          }
          for (
            var n = new o(), r = Object.keys(this), s = 0;
            s < r.length;
            s++
          ) {
            var a = r[s];
            n[a] = this[a];
          }
          if (((n.hash = e.hash), "" === e.href))
            return (n.href = n.format()), n;
          if (e.slashes && !e.protocol) {
            for (var u = Object.keys(e), c = 0; c < u.length; c++) {
              var f = u[c];
              "protocol" !== f && (n[f] = e[f]);
            }
            return (
              v[n.protocol] &&
                n.hostname &&
                !n.pathname &&
                (n.path = n.pathname = "/"),
              (n.href = n.format()),
              n
            );
          }
          if (e.protocol && e.protocol !== n.protocol) {
            if (!v[e.protocol]) {
              for (var l = Object.keys(e), h = 0; h < l.length; h++) {
                var d = l[h];
                n[d] = e[d];
              }
              return (n.href = n.format()), n;
            }
            if (((n.protocol = e.protocol), e.host || y[e.protocol]))
              n.pathname = e.pathname;
            else {
              for (
                var p = (e.pathname || "").split("/");
                p.length && !(e.host = p.shift());

              );
              e.host || (e.host = ""),
                e.hostname || (e.hostname = ""),
                "" !== p[0] && p.unshift(""),
                p.length < 2 && p.unshift(""),
                (n.pathname = p.join("/"));
            }
            if (
              ((n.search = e.search),
              (n.query = e.query),
              (n.host = e.host || ""),
              (n.auth = e.auth),
              (n.hostname = e.hostname || e.host),
              (n.port = e.port),
              n.pathname || n.search)
            ) {
              var g = n.pathname || "",
                m = n.search || "";
              n.path = g + m;
            }
            return (
              (n.slashes = n.slashes || e.slashes), (n.href = n.format()), n
            );
          }
          var b = n.pathname && "/" === n.pathname.charAt(0),
            w = e.host || (e.pathname && "/" === e.pathname.charAt(0)),
            _ = w || b || (n.host && e.pathname),
            S = _,
            E = (n.pathname && n.pathname.split("/")) || [],
            A =
              ((p = (e.pathname && e.pathname.split("/")) || []),
              n.protocol && !v[n.protocol]);
          if (
            (A &&
              ((n.hostname = ""),
              (n.port = null),
              n.host && ("" === E[0] ? (E[0] = n.host) : E.unshift(n.host)),
              (n.host = ""),
              e.protocol &&
                ((e.hostname = null),
                (e.port = null),
                e.host && ("" === p[0] ? (p[0] = e.host) : p.unshift(e.host)),
                (e.host = null)),
              (_ = _ && ("" === p[0] || "" === E[0]))),
            w)
          )
            (n.host = e.host || "" === e.host ? e.host : n.host),
              (n.hostname =
                e.hostname || "" === e.hostname ? e.hostname : n.hostname),
              (n.search = e.search),
              (n.query = e.query),
              (E = p);
          else if (p.length)
            E || (E = []),
              E.pop(),
              (E = E.concat(p)),
              (n.search = e.search),
              (n.query = e.query);
          else if (!i.isNullOrUndefined(e.search)) {
            if (A)
              (n.hostname = n.host = E.shift()),
                (P =
                  !!(n.host && n.host.indexOf("@") > 0) && n.host.split("@")) &&
                  ((n.auth = P.shift()), (n.host = n.hostname = P.shift()));
            return (
              (n.search = e.search),
              (n.query = e.query),
              (i.isNull(n.pathname) && i.isNull(n.search)) ||
                (n.path =
                  (n.pathname ? n.pathname : "") + (n.search ? n.search : "")),
              (n.href = n.format()),
              n
            );
          }
          if (!E.length)
            return (
              (n.pathname = null),
              n.search ? (n.path = "/" + n.search) : (n.path = null),
              (n.href = n.format()),
              n
            );
          for (
            var I = E.slice(-1)[0],
              T =
                ((n.host || e.host || E.length > 1) &&
                  ("." === I || ".." === I)) ||
                "" === I,
              C = 0,
              O = E.length;
            O >= 0;
            O--
          )
            "." === (I = E[O])
              ? E.splice(O, 1)
              : ".." === I
              ? (E.splice(O, 1), C++)
              : C && (E.splice(O, 1), C--);
          if (!_ && !S) for (; C--; C) E.unshift("..");
          !_ ||
            "" === E[0] ||
            (E[0] && "/" === E[0].charAt(0)) ||
            E.unshift(""),
            T && "/" !== E.join("/").substr(-1) && E.push("");
          var P,
            k = "" === E[0] || (E[0] && "/" === E[0].charAt(0));
          A &&
            ((n.hostname = n.host = k ? "" : E.length ? E.shift() : ""),
            (P = !!(n.host && n.host.indexOf("@") > 0) && n.host.split("@")) &&
              ((n.auth = P.shift()), (n.host = n.hostname = P.shift())));
          return (
            (_ = _ || (n.host && E.length)) && !k && E.unshift(""),
            E.length
              ? (n.pathname = E.join("/"))
              : ((n.pathname = null), (n.path = null)),
            (i.isNull(n.pathname) && i.isNull(n.search)) ||
              (n.path =
                (n.pathname ? n.pathname : "") + (n.search ? n.search : "")),
            (n.auth = e.auth || n.auth),
            (n.slashes = n.slashes || e.slashes),
            (n.href = n.format()),
            n
          );
        }),
        (o.prototype.parseHost = function() {
          var e = this.host,
            t = a.exec(e);
          t &&
            (":" !== (t = t[0]) && (this.port = t.substr(1)),
            (e = e.substr(0, e.length - t.length))),
            e && (this.hostname = e);
        });
    },
    function(e, t, n) {
      var r;
      e.exports =
        ((r =
          r ||
          (function(e, t) {
            var n =
                Object.create ||
                (function() {
                  function e() {}
                  return function(t) {
                    var n;
                    return (
                      (e.prototype = t), (n = new e()), (e.prototype = null), n
                    );
                  };
                })(),
              r = {},
              i = (r.lib = {}),
              o = (i.Base = {
                extend: function(e) {
                  var t = n(this);
                  return (
                    e && t.mixIn(e),
                    (t.hasOwnProperty("init") && this.init !== t.init) ||
                      (t.init = function() {
                        t.$super.init.apply(this, arguments);
                      }),
                    (t.init.prototype = t),
                    (t.$super = this),
                    t
                  );
                },
                create: function() {
                  var e = this.extend();
                  return e.init.apply(e, arguments), e;
                },
                init: function() {},
                mixIn: function(e) {
                  for (var t in e) e.hasOwnProperty(t) && (this[t] = e[t]);
                  e.hasOwnProperty("toString") && (this.toString = e.toString);
                },
                clone: function() {
                  return this.init.prototype.extend(this);
                }
              }),
              s = (i.WordArray = o.extend({
                init: function(e, t) {
                  (e = this.words = e || []),
                    (this.sigBytes = null != t ? t : 4 * e.length);
                },
                toString: function(e) {
                  return (e || u).stringify(this);
                },
                concat: function(e) {
                  var t = this.words,
                    n = e.words,
                    r = this.sigBytes,
                    i = e.sigBytes;
                  if ((this.clamp(), r % 4))
                    for (var o = 0; o < i; o++) {
                      var s = (n[o >>> 2] >>> (24 - (o % 4) * 8)) & 255;
                      t[(r + o) >>> 2] |= s << (24 - ((r + o) % 4) * 8);
                    }
                  else for (o = 0; o < i; o += 4) t[(r + o) >>> 2] = n[o >>> 2];
                  return (this.sigBytes += i), this;
                },
                clamp: function() {
                  var t = this.words,
                    n = this.sigBytes;
                  (t[n >>> 2] &= 4294967295 << (32 - (n % 4) * 8)),
                    (t.length = e.ceil(n / 4));
                },
                clone: function() {
                  var e = o.clone.call(this);
                  return (e.words = this.words.slice(0)), e;
                },
                random: function(t) {
                  for (
                    var n,
                      r = [],
                      i = function(t) {
                        t = t;
                        var n = 987654321,
                          r = 4294967295;
                        return function() {
                          var i =
                            (((n = (36969 * (65535 & n) + (n >> 16)) & r) <<
                              16) +
                              (t = (18e3 * (65535 & t) + (t >> 16)) & r)) &
                            r;
                          return (
                            (i /= 4294967296),
                            (i += 0.5) * (e.random() > 0.5 ? 1 : -1)
                          );
                        };
                      },
                      o = 0;
                    o < t;
                    o += 4
                  ) {
                    var a = i(4294967296 * (n || e.random()));
                    (n = 987654071 * a()), r.push((4294967296 * a()) | 0);
                  }
                  return new s.init(r, t);
                }
              })),
              a = (r.enc = {}),
              u = (a.Hex = {
                stringify: function(e) {
                  for (
                    var t = e.words, n = e.sigBytes, r = [], i = 0;
                    i < n;
                    i++
                  ) {
                    var o = (t[i >>> 2] >>> (24 - (i % 4) * 8)) & 255;
                    r.push((o >>> 4).toString(16)),
                      r.push((15 & o).toString(16));
                  }
                  return r.join("");
                },
                parse: function(e) {
                  for (var t = e.length, n = [], r = 0; r < t; r += 2)
                    n[r >>> 3] |=
                      parseInt(e.substr(r, 2), 16) << (24 - (r % 8) * 4);
                  return new s.init(n, t / 2);
                }
              }),
              c = (a.Latin1 = {
                stringify: function(e) {
                  for (
                    var t = e.words, n = e.sigBytes, r = [], i = 0;
                    i < n;
                    i++
                  ) {
                    var o = (t[i >>> 2] >>> (24 - (i % 4) * 8)) & 255;
                    r.push(String.fromCharCode(o));
                  }
                  return r.join("");
                },
                parse: function(e) {
                  for (var t = e.length, n = [], r = 0; r < t; r++)
                    n[r >>> 2] |= (255 & e.charCodeAt(r)) << (24 - (r % 4) * 8);
                  return new s.init(n, t);
                }
              }),
              f = (a.Utf8 = {
                stringify: function(e) {
                  try {
                    return decodeURIComponent(escape(c.stringify(e)));
                  } catch (e) {
                    throw new Error("Malformed UTF-8 data");
                  }
                },
                parse: function(e) {
                  return c.parse(unescape(encodeURIComponent(e)));
                }
              }),
              l = (i.BufferedBlockAlgorithm = o.extend({
                reset: function() {
                  (this._data = new s.init()), (this._nDataBytes = 0);
                },
                _append: function(e) {
                  "string" == typeof e && (e = f.parse(e)),
                    this._data.concat(e),
                    (this._nDataBytes += e.sigBytes);
                },
                _process: function(t) {
                  var n = this._data,
                    r = n.words,
                    i = n.sigBytes,
                    o = this.blockSize,
                    a = i / (4 * o),
                    u =
                      (a = t
                        ? e.ceil(a)
                        : e.max((0 | a) - this._minBufferSize, 0)) * o,
                    c = e.min(4 * u, i);
                  if (u) {
                    for (var f = 0; f < u; f += o) this._doProcessBlock(r, f);
                    var l = r.splice(0, u);
                    n.sigBytes -= c;
                  }
                  return new s.init(l, c);
                },
                clone: function() {
                  var e = o.clone.call(this);
                  return (e._data = this._data.clone()), e;
                },
                _minBufferSize: 0
              })),
              h =
                ((i.Hasher = l.extend({
                  cfg: o.extend(),
                  init: function(e) {
                    (this.cfg = this.cfg.extend(e)), this.reset();
                  },
                  reset: function() {
                    l.reset.call(this), this._doReset();
                  },
                  update: function(e) {
                    return this._append(e), this._process(), this;
                  },
                  finalize: function(e) {
                    return e && this._append(e), this._doFinalize();
                  },
                  blockSize: 16,
                  _createHelper: function(e) {
                    return function(t, n) {
                      return new e.init(n).finalize(t);
                    };
                  },
                  _createHmacHelper: function(e) {
                    return function(t, n) {
                      return new h.HMAC.init(e, n).finalize(t);
                    };
                  }
                })),
                (r.algo = {}));
            return r;
          })(Math)),
        r);
    },
    function(e, t, n) {
      "use strict";
      var r = n(33),
        i = n(82),
        o = Object.prototype.toString;
      function s(e) {
        return "[object Array]" === o.call(e);
      }
      function a(e) {
        return null !== e && "object" == typeof e;
      }
      function u(e) {
        return "[object Function]" === o.call(e);
      }
      function c(e, t) {
        if (null != e)
          if (("object" != typeof e && (e = [e]), s(e)))
            for (var n = 0, r = e.length; n < r; n++) t.call(null, e[n], n, e);
          else
            for (var i in e)
              Object.prototype.hasOwnProperty.call(e, i) &&
                t.call(null, e[i], i, e);
      }
      e.exports = {
        isArray: s,
        isArrayBuffer: function(e) {
          return "[object ArrayBuffer]" === o.call(e);
        },
        isBuffer: i,
        isFormData: function(e) {
          return "undefined" != typeof FormData && e instanceof FormData;
        },
        isArrayBufferView: function(e) {
          return "undefined" != typeof ArrayBuffer && ArrayBuffer.isView
            ? ArrayBuffer.isView(e)
            : e && e.buffer && e.buffer instanceof ArrayBuffer;
        },
        isString: function(e) {
          return "string" == typeof e;
        },
        isNumber: function(e) {
          return "number" == typeof e;
        },
        isObject: a,
        isUndefined: function(e) {
          return void 0 === e;
        },
        isDate: function(e) {
          return "[object Date]" === o.call(e);
        },
        isFile: function(e) {
          return "[object File]" === o.call(e);
        },
        isBlob: function(e) {
          return "[object Blob]" === o.call(e);
        },
        isFunction: u,
        isStream: function(e) {
          return a(e) && u(e.pipe);
        },
        isURLSearchParams: function(e) {
          return (
            "undefined" != typeof URLSearchParams &&
            e instanceof URLSearchParams
          );
        },
        isStandardBrowserEnv: function() {
          return (
            ("undefined" == typeof navigator ||
              ("ReactNative" !== navigator.product &&
                "NativeScript" !== navigator.product &&
                "NS" !== navigator.product)) &&
            ("undefined" != typeof window && "undefined" != typeof document)
          );
        },
        forEach: c,
        merge: function e() {
          var t = {};
          function n(n, r) {
            "object" == typeof t[r] && "object" == typeof n
              ? (t[r] = e(t[r], n))
              : (t[r] = n);
          }
          for (var r = 0, i = arguments.length; r < i; r++) c(arguments[r], n);
          return t;
        },
        deepMerge: function e() {
          var t = {};
          function n(n, r) {
            "object" == typeof t[r] && "object" == typeof n
              ? (t[r] = e(t[r], n))
              : (t[r] = "object" == typeof n ? e({}, n) : n);
          }
          for (var r = 0, i = arguments.length; r < i; r++) c(arguments[r], n);
          return t;
        },
        extend: function(e, t, n) {
          return (
            c(t, function(t, i) {
              e[i] = n && "function" == typeof t ? r(t, n) : t;
            }),
            e
          );
        },
        trim: function(e) {
          return e.replace(/^\s*/, "").replace(/\s*$/, "");
        }
      };
    },
    function(e, t, n) {
      "use strict";
      (function(e) {
        n.d(t, "c", function() {
          return f;
        }),
          n.d(t, "b", function() {
            return l;
          }),
          n.d(t, "a", function() {
            return g;
          });
        var r = [
            { type: "text/plain", ext: "txt" },
            { type: "text/html", ext: "html" },
            { type: "text/javascript", ext: "js" },
            { type: "text/css", ext: "css" },
            { type: "text/csv", ext: "csv" },
            { type: "text/yaml", ext: "yml" },
            { type: "text/yaml", ext: "yaml" },
            { type: "text/calendar", ext: "ics" },
            { type: "text/calendar", ext: "ical" },
            { type: "image/apng", ext: "apng" },
            { type: "image/bmp", ext: "bmp" },
            { type: "image/gif", ext: "gif" },
            { type: "image/x-icon", ext: "ico" },
            { type: "image/x-icon", ext: "cur" },
            { type: "image/jpeg", ext: "jpg" },
            { type: "image/jpeg", ext: "jpeg" },
            { type: "image/jpeg", ext: "jfif" },
            { type: "image/jpeg", ext: "pjp" },
            { type: "image/jpeg", ext: "pjpeg" },
            { type: "image/png", ext: "png" },
            { type: "image/svg+xml", ext: "svg" },
            { type: "image/tiff", ext: "tif" },
            { type: "image/tiff", ext: "tiff" },
            { type: "image/webp", ext: "webp" },
            { type: "application/json", ext: "json" },
            { type: "application/xml", ext: "xml" },
            { type: "application/x-sh", ext: "sh" },
            { type: "application/zip", ext: "zip" },
            { type: "application/x-rar-compressed", ext: "rar" },
            { type: "application/x-tar", ext: "tar" },
            { type: "application/x-bzip", ext: "bz" },
            { type: "application/x-bzip2", ext: "bz2" },
            { type: "application/pdf", ext: "pdf" },
            { type: "application/java-archive", ext: "jar" },
            { type: "application/msword", ext: "doc" },
            { type: "application/vnd.ms-excel", ext: "xls" },
            { type: "application/vnd.ms-excel", ext: "xlsx" },
            { type: "message/rfc822", ext: "eml" }
          ],
          i = function(e) {
            return void 0 === e && (e = {}), 0 === Object.keys(e).length;
          },
          o = function(e, t, n) {
            if (!e || !e.sort) return !1;
            var r = n && "desc" === n ? -1 : 1;
            return (
              e.sort(function(e, n) {
                var i = e[t],
                  o = n[t];
                return void 0 === o
                  ? void 0 === i
                    ? 0
                    : 1 * r
                  : void 0 === i || i < o
                  ? -1 * r
                  : i > o
                  ? 1 * r
                  : 0;
              }),
              !0
            );
          },
          s = function(e, t) {
            var n = Object.assign({}, e);
            return (
              t &&
                ("string" == typeof t
                  ? delete n[t]
                  : t.forEach(function(e) {
                      delete n[e];
                    })),
              n
            );
          },
          a = function(e, t) {
            void 0 === t && (t = "application/octet-stream");
            var n = e.toLowerCase(),
              i = r.filter(function(e) {
                return n.endsWith("." + e.ext);
              });
            return i.length > 0 ? i[0].type : t;
          },
          u = function(e) {
            var t = e.toLowerCase();
            return (
              !!t.startsWith("text/") ||
              ("application/json" === t ||
                "application/xml" === t ||
                "application/sh" === t)
            );
          },
          c = function() {
            for (
              var e = "",
                t =
                  "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
                n = 32;
              n > 0;
              n -= 1
            )
              e += t[Math.floor(Math.random() * t.length)];
            return e;
          },
          f = function(e) {
            if (e.isResolved) return e;
            var t = !0,
              n = !1,
              r = !1,
              i = e.then(
                function(e) {
                  return (r = !0), (t = !1), e;
                },
                function(e) {
                  throw ((n = !0), (t = !1), e);
                }
              );
            return (
              (i.isFullfilled = function() {
                return r;
              }),
              (i.isPending = function() {
                return t;
              }),
              (i.isRejected = function() {
                return n;
              }),
              i
            );
          },
          l = function() {
            return {
              isBrowser:
                "undefined" != typeof window && void 0 !== window.document,
              isNode:
                void 0 !== e && null != e.versions && null != e.versions.node
            };
          },
          h = function(e, t, n) {
            if ((void 0 === t && (t = []), void 0 === n && (n = []), !p(e)))
              return e;
            var r = {};
            for (var i in e) {
              if (e.hasOwnProperty(i))
                r[
                  t.includes(i) ? i : i[0].toLowerCase() + i.slice(1)
                ] = n.includes(i) ? e[i] : h(e[i], t, n);
            }
            return r;
          },
          d = function(e, t, n) {
            if ((void 0 === t && (t = []), void 0 === n && (n = []), !p(e)))
              return e;
            var r = {};
            for (var i in e) {
              if (e.hasOwnProperty(i))
                r[
                  t.includes(i) ? i : i[0].toUpperCase() + i.slice(1)
                ] = n.includes(i) ? e[i] : d(e[i], t, n);
            }
            return r;
          },
          p = function(e) {
            return !(
              !(e instanceof Object) ||
              e instanceof Array ||
              e instanceof Function ||
              e instanceof Number ||
              e instanceof String ||
              e instanceof Boolean
            );
          },
          g = (function() {
            function e() {}
            return (
              (e.isEmpty = i),
              (e.sortByField = o),
              (e.objectLessAttributes = s),
              (e.filenameToContentType = a),
              (e.isTextFile = u),
              (e.generateRandomString = c),
              (e.makeQuerablePromise = f),
              (e.browserOrNode = l),
              (e.transferKeyToLowerCase = h),
              (e.transferKeyToUpperCase = d),
              (e.isStrictObject = p),
              e
            );
          })();
      }.call(this, n(22)));
    },
    ,
    function(e, t, n) {
      var r, i;
      /*!
       * JavaScript Cookie v2.2.1
       * https://github.com/js-cookie/js-cookie
       *
       * Copyright 2006, 2015 Klaus Hartl & Fagner Brack
       * Released under the MIT license
       */ !(function(o) {
        if (
          (void 0 ===
            (i = "function" == typeof (r = o) ? r.call(t, n, t, e) : r) ||
            (e.exports = i),
          !0,
          (e.exports = o()),
          !!0)
        ) {
          var s = window.Cookies,
            a = (window.Cookies = o());
          a.noConflict = function() {
            return (window.Cookies = s), a;
          };
        }
      })(function() {
        function e() {
          for (var e = 0, t = {}; e < arguments.length; e++) {
            var n = arguments[e];
            for (var r in n) t[r] = n[r];
          }
          return t;
        }
        function t(e) {
          return e.replace(/(%[0-9A-Z]{2})+/g, decodeURIComponent);
        }
        return (function n(r) {
          function i() {}
          function o(t, n, o) {
            if ("undefined" != typeof document) {
              "number" ==
                typeof (o = e({ path: "/" }, i.defaults, o)).expires &&
                (o.expires = new Date(1 * new Date() + 864e5 * o.expires)),
                (o.expires = o.expires ? o.expires.toUTCString() : "");
              try {
                var s = JSON.stringify(n);
                /^[\{\[]/.test(s) && (n = s);
              } catch (e) {}
              (n = r.write
                ? r.write(n, t)
                : encodeURIComponent(String(n)).replace(
                    /%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g,
                    decodeURIComponent
                  )),
                (t = encodeURIComponent(String(t))
                  .replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent)
                  .replace(/[\(\)]/g, escape));
              var a = "";
              for (var u in o)
                o[u] &&
                  ((a += "; " + u),
                  !0 !== o[u] && (a += "=" + o[u].split(";")[0]));
              return (document.cookie = t + "=" + n + a);
            }
          }
          function s(e, n) {
            if ("undefined" != typeof document) {
              for (
                var i = {},
                  o = document.cookie ? document.cookie.split("; ") : [],
                  s = 0;
                s < o.length;
                s++
              ) {
                var a = o[s].split("="),
                  u = a.slice(1).join("=");
                n || '"' !== u.charAt(0) || (u = u.slice(1, -1));
                try {
                  var c = t(a[0]);
                  if (((u = (r.read || r)(u, c) || t(u)), n))
                    try {
                      u = JSON.parse(u);
                    } catch (e) {}
                  if (((i[c] = u), e === c)) break;
                } catch (e) {}
              }
              return e ? i[e] : i;
            }
          }
          return (
            (i.set = o),
            (i.get = function(e) {
              return s(e, !1);
            }),
            (i.getJSON = function(e) {
              return s(e, !0);
            }),
            (i.remove = function(t, n) {
              o(t, "", e(n, { expires: -1 }));
            }),
            (i.defaults = {}),
            (i.withConverter = n),
            i
          );
        })(function() {});
      });
    },
    function(e, t, n) {
      var r = n(64),
        i = n(65),
        o = i;
      (o.v1 = r), (o.v4 = i), (e.exports = o);
    },
    function(e, t, n) {
      var r;
      e.exports = ((r = n(2)), n(11), n(56), r.HmacSHA256);
    },
    function(e, t, n) {
      "use strict";
      /*!
       * cookie
       * Copyright(c) 2012-2014 Roman Shtylman
       * Copyright(c) 2015 Douglas Christopher Wilson
       * MIT Licensed
       */ (t.parse = function(e, t) {
        if ("string" != typeof e)
          throw new TypeError("argument str must be a string");
        for (
          var n = {}, i = t || {}, s = e.split(o), u = i.decode || r, c = 0;
          c < s.length;
          c++
        ) {
          var f = s[c],
            l = f.indexOf("=");
          if (!(l < 0)) {
            var h = f.substr(0, l).trim(),
              d = f.substr(++l, f.length).trim();
            '"' == d[0] && (d = d.slice(1, -1)),
              null == n[h] && (n[h] = a(d, u));
          }
        }
        return n;
      }),
        (t.serialize = function(e, t, n) {
          var r = n || {},
            o = r.encode || i;
          if ("function" != typeof o)
            throw new TypeError("option encode is invalid");
          if (!s.test(e)) throw new TypeError("argument name is invalid");
          var a = o(t);
          if (a && !s.test(a)) throw new TypeError("argument val is invalid");
          var u = e + "=" + a;
          if (null != r.maxAge) {
            var c = r.maxAge - 0;
            if (isNaN(c) || !isFinite(c))
              throw new TypeError("option maxAge is invalid");
            u += "; Max-Age=" + Math.floor(c);
          }
          if (r.domain) {
            if (!s.test(r.domain))
              throw new TypeError("option domain is invalid");
            u += "; Domain=" + r.domain;
          }
          if (r.path) {
            if (!s.test(r.path)) throw new TypeError("option path is invalid");
            u += "; Path=" + r.path;
          }
          if (r.expires) {
            if ("function" != typeof r.expires.toUTCString)
              throw new TypeError("option expires is invalid");
            u += "; Expires=" + r.expires.toUTCString();
          }
          r.httpOnly && (u += "; HttpOnly");
          r.secure && (u += "; Secure");
          if (r.sameSite) {
            switch (
              "string" == typeof r.sameSite
                ? r.sameSite.toLowerCase()
                : r.sameSite
            ) {
              case !0:
                u += "; SameSite=Strict";
                break;
              case "lax":
                u += "; SameSite=Lax";
                break;
              case "strict":
                u += "; SameSite=Strict";
                break;
              case "none":
                u += "; SameSite=None";
                break;
              default:
                throw new TypeError("option sameSite is invalid");
            }
          }
          return u;
        });
      var r = decodeURIComponent,
        i = encodeURIComponent,
        o = /; */,
        s = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;
      function a(e, t) {
        try {
          return t(e);
        } catch (t) {
          return e;
        }
      }
    },
    ,
    function(e, t, n) {
      var r;
      e.exports =
        ((r = n(2)),
        (function(e) {
          var t = r,
            n = t.lib,
            i = n.WordArray,
            o = n.Hasher,
            s = t.algo,
            a = [],
            u = [];
          !(function() {
            function t(t) {
              for (var n = e.sqrt(t), r = 2; r <= n; r++)
                if (!(t % r)) return !1;
              return !0;
            }
            function n(e) {
              return (4294967296 * (e - (0 | e))) | 0;
            }
            for (var r = 2, i = 0; i < 64; )
              t(r) &&
                (i < 8 && (a[i] = n(e.pow(r, 0.5))),
                (u[i] = n(e.pow(r, 1 / 3))),
                i++),
                r++;
          })();
          var c = [],
            f = (s.SHA256 = o.extend({
              _doReset: function() {
                this._hash = new i.init(a.slice(0));
              },
              _doProcessBlock: function(e, t) {
                for (
                  var n = this._hash.words,
                    r = n[0],
                    i = n[1],
                    o = n[2],
                    s = n[3],
                    a = n[4],
                    f = n[5],
                    l = n[6],
                    h = n[7],
                    d = 0;
                  d < 64;
                  d++
                ) {
                  if (d < 16) c[d] = 0 | e[t + d];
                  else {
                    var p = c[d - 15],
                      g =
                        ((p << 25) | (p >>> 7)) ^
                        ((p << 14) | (p >>> 18)) ^
                        (p >>> 3),
                      y = c[d - 2],
                      v =
                        ((y << 15) | (y >>> 17)) ^
                        ((y << 13) | (y >>> 19)) ^
                        (y >>> 10);
                    c[d] = g + c[d - 7] + v + c[d - 16];
                  }
                  var m = (r & i) ^ (r & o) ^ (i & o),
                    b =
                      ((r << 30) | (r >>> 2)) ^
                      ((r << 19) | (r >>> 13)) ^
                      ((r << 10) | (r >>> 22)),
                    w =
                      h +
                      (((a << 26) | (a >>> 6)) ^
                        ((a << 21) | (a >>> 11)) ^
                        ((a << 7) | (a >>> 25))) +
                      ((a & f) ^ (~a & l)) +
                      u[d] +
                      c[d];
                  (h = l),
                    (l = f),
                    (f = a),
                    (a = (s + w) | 0),
                    (s = o),
                    (o = i),
                    (i = r),
                    (r = (w + (b + m)) | 0);
                }
                (n[0] = (n[0] + r) | 0),
                  (n[1] = (n[1] + i) | 0),
                  (n[2] = (n[2] + o) | 0),
                  (n[3] = (n[3] + s) | 0),
                  (n[4] = (n[4] + a) | 0),
                  (n[5] = (n[5] + f) | 0),
                  (n[6] = (n[6] + l) | 0),
                  (n[7] = (n[7] + h) | 0);
              },
              _doFinalize: function() {
                var t = this._data,
                  n = t.words,
                  r = 8 * this._nDataBytes,
                  i = 8 * t.sigBytes;
                return (
                  (n[i >>> 5] |= 128 << (24 - (i % 32))),
                  (n[14 + (((i + 64) >>> 9) << 4)] = e.floor(r / 4294967296)),
                  (n[15 + (((i + 64) >>> 9) << 4)] = r),
                  (t.sigBytes = 4 * n.length),
                  this._process(),
                  this._hash
                );
              },
              clone: function() {
                var e = o.clone.call(this);
                return (e._hash = this._hash.clone()), e;
              }
            }));
          (t.SHA256 = o._createHelper(f)),
            (t.HmacSHA256 = o._createHmacHelper(f));
        })(Math),
        r.SHA256);
    },
    function(e, t, n) {
      var r, i, o;
      e.exports =
        ((o = n(2)),
        (i = (r = o).lib.WordArray),
        (r.enc.Base64 = {
          stringify: function(e) {
            var t = e.words,
              n = e.sigBytes,
              r = this._map;
            e.clamp();
            for (var i = [], o = 0; o < n; o += 3)
              for (
                var s =
                    (((t[o >>> 2] >>> (24 - (o % 4) * 8)) & 255) << 16) |
                    (((t[(o + 1) >>> 2] >>> (24 - ((o + 1) % 4) * 8)) & 255) <<
                      8) |
                    ((t[(o + 2) >>> 2] >>> (24 - ((o + 2) % 4) * 8)) & 255),
                  a = 0;
                a < 4 && o + 0.75 * a < n;
                a++
              )
                i.push(r.charAt((s >>> (6 * (3 - a))) & 63));
            var u = r.charAt(64);
            if (u) for (; i.length % 4; ) i.push(u);
            return i.join("");
          },
          parse: function(e) {
            var t = e.length,
              n = this._map,
              r = this._reverseMap;
            if (!r) {
              r = this._reverseMap = [];
              for (var o = 0; o < n.length; o++) r[n.charCodeAt(o)] = o;
            }
            var s = n.charAt(64);
            if (s) {
              var a = e.indexOf(s);
              -1 !== a && (t = a);
            }
            return (function(e, t, n) {
              for (var r = [], o = 0, s = 0; s < t; s++)
                if (s % 4) {
                  var a = n[e.charCodeAt(s - 1)] << ((s % 4) * 2),
                    u = n[e.charCodeAt(s)] >>> (6 - (s % 4) * 2);
                  (r[o >>> 2] |= (a | u) << (24 - (o % 4) * 8)), o++;
                }
              return i.create(r, o);
            })(e, t, r);
          },
          _map:
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="
        }),
        o.enc.Base64);
    },
    function(e, t, n) {
      e.exports = n(81);
    },
    function(e, t, n) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        n(30).__exportStar(n(70), t);
    },
    function(e, t) {
      var n;
      n = (function() {
        return this;
      })();
      try {
        n = n || new Function("return this")();
      } catch (e) {
        "object" == typeof window && (n = window);
      }
      e.exports = n;
    },
    function(e, t) {
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.locateWindow = void 0);
      var n = {};
      t.locateWindow = function() {
        return "undefined" != typeof window
          ? window
          : "undefined" != typeof self
          ? self
          : n;
      };
    },
    function(e) {
      e.exports = JSON.parse(
        '{"a":"@aws-sdk/client-cognito-identity","b":"1.0.0-gamma.8"}'
      );
    },
    ,
    ,
    function(e, t, n) {
      var r;
      e.exports =
        ((r = n(2)),
        (function() {
          if ("function" == typeof ArrayBuffer) {
            var e = r.lib.WordArray,
              t = e.init;
            (e.init = function(e) {
              if (
                (e instanceof ArrayBuffer && (e = new Uint8Array(e)),
                (e instanceof Int8Array ||
                  ("undefined" != typeof Uint8ClampedArray &&
                    e instanceof Uint8ClampedArray) ||
                  e instanceof Int16Array ||
                  e instanceof Uint16Array ||
                  e instanceof Int32Array ||
                  e instanceof Uint32Array ||
                  e instanceof Float32Array ||
                  e instanceof Float64Array) &&
                  (e = new Uint8Array(e.buffer, e.byteOffset, e.byteLength)),
                e instanceof Uint8Array)
              ) {
                for (var n = e.byteLength, r = [], i = 0; i < n; i++)
                  r[i >>> 2] |= e[i] << (24 - (i % 4) * 8);
                t.call(this, r, n);
              } else t.apply(this, arguments);
            }).prototype = e;
          }
        })(),
        r.lib.WordArray);
    },
    function(e, t, n) {
      "use strict";
      n.r(t),
        (t.default = function(e, t) {
          return (
            (t = t || {}),
            new Promise(function(n, r) {
              var i = new XMLHttpRequest(),
                o = [],
                s = [],
                a = {},
                u = function() {
                  return {
                    ok: 2 == ((i.status / 100) | 0),
                    statusText: i.statusText,
                    status: i.status,
                    url: i.responseURL,
                    text: function() {
                      return Promise.resolve(i.responseText);
                    },
                    json: function() {
                      return Promise.resolve(JSON.parse(i.responseText));
                    },
                    blob: function() {
                      return Promise.resolve(new Blob([i.response]));
                    },
                    clone: u,
                    headers: {
                      keys: function() {
                        return o;
                      },
                      entries: function() {
                        return s;
                      },
                      get: function(e) {
                        return a[e.toLowerCase()];
                      },
                      has: function(e) {
                        return e.toLowerCase() in a;
                      }
                    }
                  };
                };
              for (var c in (i.open(t.method || "get", e, !0),
              (i.onload = function() {
                i
                  .getAllResponseHeaders()
                  .replace(/^(.*?):[^\S\n]*([\s\S]*?)$/gm, function(e, t, n) {
                    o.push((t = t.toLowerCase())),
                      s.push([t, n]),
                      (a[t] = a[t] ? a[t] + "," + n : n);
                  }),
                  n(u());
              }),
              (i.onerror = r),
              (i.withCredentials = "include" == t.credentials),
              t.headers))
                i.setRequestHeader(c, t.headers[c]);
              i.send(t.body || null);
            })
          );
        });
    },
    function(e, t) {
      var n,
        r,
        i = (e.exports = {});
      function o() {
        throw new Error("setTimeout has not been defined");
      }
      function s() {
        throw new Error("clearTimeout has not been defined");
      }
      function a(e) {
        if (n === setTimeout) return setTimeout(e, 0);
        if ((n === o || !n) && setTimeout)
          return (n = setTimeout), setTimeout(e, 0);
        try {
          return n(e, 0);
        } catch (t) {
          try {
            return n.call(null, e, 0);
          } catch (t) {
            return n.call(this, e, 0);
          }
        }
      }
      !(function() {
        try {
          n = "function" == typeof setTimeout ? setTimeout : o;
        } catch (e) {
          n = o;
        }
        try {
          r = "function" == typeof clearTimeout ? clearTimeout : s;
        } catch (e) {
          r = s;
        }
      })();
      var u,
        c = [],
        f = !1,
        l = -1;
      function h() {
        f &&
          u &&
          ((f = !1), u.length ? (c = u.concat(c)) : (l = -1), c.length && d());
      }
      function d() {
        if (!f) {
          var e = a(h);
          f = !0;
          for (var t = c.length; t; ) {
            for (u = c, c = []; ++l < t; ) u && u[l].run();
            (l = -1), (t = c.length);
          }
          (u = null),
            (f = !1),
            (function(e) {
              if (r === clearTimeout) return clearTimeout(e);
              if ((r === s || !r) && clearTimeout)
                return (r = clearTimeout), clearTimeout(e);
              try {
                r(e);
              } catch (t) {
                try {
                  return r.call(null, e);
                } catch (t) {
                  return r.call(this, e);
                }
              }
            })(e);
        }
      }
      function p(e, t) {
        (this.fun = e), (this.array = t);
      }
      function g() {}
      (i.nextTick = function(e) {
        var t = new Array(arguments.length - 1);
        if (arguments.length > 1)
          for (var n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
        c.push(new p(e, t)), 1 !== c.length || f || a(d);
      }),
        (p.prototype.run = function() {
          this.fun.apply(null, this.array);
        }),
        (i.title = "browser"),
        (i.browser = !0),
        (i.env = {}),
        (i.argv = []),
        (i.version = ""),
        (i.versions = {}),
        (i.on = g),
        (i.addListener = g),
        (i.once = g),
        (i.off = g),
        (i.removeListener = g),
        (i.removeAllListeners = g),
        (i.emit = g),
        (i.prependListener = g),
        (i.prependOnceListener = g),
        (i.listeners = function(e) {
          return [];
        }),
        (i.binding = function(e) {
          throw new Error("process.binding is not supported");
        }),
        (i.cwd = function() {
          return "/";
        }),
        (i.chdir = function(e) {
          throw new Error("process.chdir is not supported");
        }),
        (i.umask = function() {
          return 0;
        });
    },
    function(e, t) {
      var n =
        ("undefined" != typeof crypto &&
          crypto.getRandomValues &&
          crypto.getRandomValues.bind(crypto)) ||
        ("undefined" != typeof msCrypto &&
          "function" == typeof window.msCrypto.getRandomValues &&
          msCrypto.getRandomValues.bind(msCrypto));
      if (n) {
        var r = new Uint8Array(16);
        e.exports = function() {
          return n(r), r;
        };
      } else {
        var i = new Array(16);
        e.exports = function() {
          for (var e, t = 0; t < 16; t++)
            0 == (3 & t) && (e = 4294967296 * Math.random()),
              (i[t] = (e >>> ((3 & t) << 3)) & 255);
          return i;
        };
      }
    },
    function(e, t) {
      for (var n = [], r = 0; r < 256; ++r)
        n[r] = (r + 256).toString(16).substr(1);
      e.exports = function(e, t) {
        var r = t || 0,
          i = n;
        return [
          i[e[r++]],
          i[e[r++]],
          i[e[r++]],
          i[e[r++]],
          "-",
          i[e[r++]],
          i[e[r++]],
          "-",
          i[e[r++]],
          i[e[r++]],
          "-",
          i[e[r++]],
          i[e[r++]],
          "-",
          i[e[r++]],
          i[e[r++]],
          i[e[r++]],
          i[e[r++]],
          i[e[r++]],
          i[e[r++]]
        ].join("");
      };
    },
    function(e, t, n) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var r = n(26),
        i = n(27),
        o = n(28),
        s = n(16),
        a = (function() {
          function e(e) {
            e
              ? ((this.operation = (function(e) {
                  return new Promise(function(t, n) {
                    var r = s
                      .locateWindow()
                      .msCrypto.subtle.importKey(
                        "raw",
                        u(e),
                        i.SHA_256_HMAC_ALGO,
                        !1,
                        ["sign"]
                      );
                    (r.oncomplete = function() {
                      r.result && t(r.result),
                        n("ImportKey completed without importing key.");
                    }),
                      (r.onerror = function() {
                        n("ImportKey failed to import key.");
                      });
                  });
                })(e).then(function(e) {
                  return s
                    .locateWindow()
                    .msCrypto.subtle.sign(i.SHA_256_HMAC_ALGO, e);
                })),
                this.operation.catch(function() {}))
              : (this.operation = Promise.resolve(
                  s.locateWindow().msCrypto.subtle.digest("SHA-256")
                ));
          }
          return (
            (e.prototype.update = function(e) {
              var t = this;
              r.isEmptyData(e) ||
                ((this.operation = this.operation.then(function(n) {
                  return (
                    (n.onerror = function() {
                      t.operation = Promise.reject(
                        new Error("Error encountered updating hash")
                      );
                    }),
                    n.process(u(e)),
                    n
                  );
                })),
                this.operation.catch(function() {}));
            }),
            (e.prototype.digest = function() {
              return this.operation.then(function(e) {
                return new Promise(function(t, n) {
                  (e.onerror = function() {
                    n("Error encountered finalizing hash");
                  }),
                    (e.oncomplete = function() {
                      e.result && t(new Uint8Array(e.result)),
                        n("Error encountered finalizing hash");
                    }),
                    e.finish();
                });
              });
            }),
            e
          );
        })();
      function u(e) {
        return "string" == typeof e
          ? o.fromUtf8(e)
          : ArrayBuffer.isView(e)
          ? new Uint8Array(
              e.buffer,
              e.byteOffset,
              e.byteLength / Uint8Array.BYTES_PER_ELEMENT
            )
          : new Uint8Array(e);
      }
      t.Sha256 = a;
    },
    function(e, t, n) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.isEmptyData = function(e) {
          return "string" == typeof e ? 0 === e.length : 0 === e.byteLength;
        });
    },
    function(e, t, n) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.SHA_256_HASH = { name: "SHA-256" }),
        (t.SHA_256_HMAC_ALGO = { name: "HMAC", hash: t.SHA_256_HASH }),
        (t.EMPTY_DATA_SHA_256 = new Uint8Array([
          227,
          176,
          196,
          66,
          152,
          252,
          28,
          20,
          154,
          251,
          244,
          200,
          153,
          111,
          185,
          36,
          39,
          174,
          65,
          228,
          100,
          155,
          147,
          76,
          164,
          149,
          153,
          27,
          120,
          82,
          184,
          85
        ]));
    },
    function(e, t, n) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.toUtf8 = t.fromUtf8 = void 0);
      var r = n(68),
        i = n(69);
      (t.fromUtf8 = function(e) {
        return "function" == typeof TextEncoder ? i.fromUtf8(e) : r.fromUtf8(e);
      }),
        (t.toUtf8 = function(e) {
          return "function" == typeof TextDecoder ? i.toUtf8(e) : r.toUtf8(e);
        });
    },
    function(e, t, n) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var r = n(28),
        i = n(26),
        o = n(27),
        s = n(16),
        a = (function() {
          function e(e) {
            (this.toHash = new Uint8Array(0)),
              void 0 !== e &&
                ((this.key = new Promise(function(t, n) {
                  s.locateWindow()
                    .crypto.subtle.importKey(
                      "raw",
                      u(e),
                      o.SHA_256_HMAC_ALGO,
                      !1,
                      ["sign"]
                    )
                    .then(t, n);
                })),
                this.key.catch(function() {}));
          }
          return (
            (e.prototype.update = function(e) {
              if (!i.isEmptyData(e)) {
                var t = u(e),
                  n = new Uint8Array(this.toHash.byteLength + t.byteLength);
                n.set(this.toHash, 0),
                  n.set(t, this.toHash.byteLength),
                  (this.toHash = n);
              }
            }),
            (e.prototype.digest = function() {
              var e = this;
              return this.key
                ? this.key.then(function(t) {
                    return s
                      .locateWindow()
                      .crypto.subtle.sign(o.SHA_256_HMAC_ALGO, t, e.toHash)
                      .then(function(e) {
                        return new Uint8Array(e);
                      });
                  })
                : i.isEmptyData(this.toHash)
                ? Promise.resolve(o.EMPTY_DATA_SHA_256)
                : Promise.resolve()
                    .then(function() {
                      return s
                        .locateWindow()
                        .crypto.subtle.digest(o.SHA_256_HASH, e.toHash);
                    })
                    .then(function(e) {
                      return Promise.resolve(new Uint8Array(e));
                    });
            }),
            e
          );
        })();
      function u(e) {
        return "string" == typeof e
          ? r.fromUtf8(e)
          : ArrayBuffer.isView(e)
          ? new Uint8Array(
              e.buffer,
              e.byteOffset,
              e.byteLength / Uint8Array.BYTES_PER_ELEMENT
            )
          : new Uint8Array(e);
      }
      t.Sha256 = a;
    },
    function(e, t, n) {
      "use strict";
      n.r(t),
        n.d(t, "__extends", function() {
          return i;
        }),
        n.d(t, "__assign", function() {
          return o;
        }),
        n.d(t, "__rest", function() {
          return s;
        }),
        n.d(t, "__decorate", function() {
          return a;
        }),
        n.d(t, "__param", function() {
          return u;
        }),
        n.d(t, "__metadata", function() {
          return c;
        }),
        n.d(t, "__awaiter", function() {
          return f;
        }),
        n.d(t, "__generator", function() {
          return l;
        }),
        n.d(t, "__exportStar", function() {
          return h;
        }),
        n.d(t, "__values", function() {
          return d;
        }),
        n.d(t, "__read", function() {
          return p;
        }),
        n.d(t, "__spread", function() {
          return g;
        }),
        n.d(t, "__spreadArrays", function() {
          return y;
        }),
        n.d(t, "__await", function() {
          return v;
        }),
        n.d(t, "__asyncGenerator", function() {
          return m;
        }),
        n.d(t, "__asyncDelegator", function() {
          return b;
        }),
        n.d(t, "__asyncValues", function() {
          return w;
        }),
        n.d(t, "__makeTemplateObject", function() {
          return _;
        }),
        n.d(t, "__importStar", function() {
          return S;
        }),
        n.d(t, "__importDefault", function() {
          return E;
        }),
        n.d(t, "__classPrivateFieldGet", function() {
          return A;
        }),
        n.d(t, "__classPrivateFieldSet", function() {
          return I;
        });
      /*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
      var r = function(e, t) {
        return (r =
          Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array &&
            function(e, t) {
              e.__proto__ = t;
            }) ||
          function(e, t) {
            for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
          })(e, t);
      };
      function i(e, t) {
        function n() {
          this.constructor = e;
        }
        r(e, t),
          (e.prototype =
            null === t
              ? Object.create(t)
              : ((n.prototype = t.prototype), new n()));
      }
      var o = function() {
        return (o =
          Object.assign ||
          function(e) {
            for (var t, n = 1, r = arguments.length; n < r; n++)
              for (var i in (t = arguments[n]))
                Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
            return e;
          }).apply(this, arguments);
      };
      function s(e, t) {
        var n = {};
        for (var r in e)
          Object.prototype.hasOwnProperty.call(e, r) &&
            t.indexOf(r) < 0 &&
            (n[r] = e[r]);
        if (null != e && "function" == typeof Object.getOwnPropertySymbols) {
          var i = 0;
          for (r = Object.getOwnPropertySymbols(e); i < r.length; i++)
            t.indexOf(r[i]) < 0 &&
              Object.prototype.propertyIsEnumerable.call(e, r[i]) &&
              (n[r[i]] = e[r[i]]);
        }
        return n;
      }
      function a(e, t, n, r) {
        var i,
          o = arguments.length,
          s =
            o < 3
              ? t
              : null === r
              ? (r = Object.getOwnPropertyDescriptor(t, n))
              : r;
        if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
          s = Reflect.decorate(e, t, n, r);
        else
          for (var a = e.length - 1; a >= 0; a--)
            (i = e[a]) &&
              (s = (o < 3 ? i(s) : o > 3 ? i(t, n, s) : i(t, n)) || s);
        return o > 3 && s && Object.defineProperty(t, n, s), s;
      }
      function u(e, t) {
        return function(n, r) {
          t(n, r, e);
        };
      }
      function c(e, t) {
        if ("object" == typeof Reflect && "function" == typeof Reflect.metadata)
          return Reflect.metadata(e, t);
      }
      function f(e, t, n, r) {
        return new (n || (n = Promise))(function(i, o) {
          function s(e) {
            try {
              u(r.next(e));
            } catch (e) {
              o(e);
            }
          }
          function a(e) {
            try {
              u(r.throw(e));
            } catch (e) {
              o(e);
            }
          }
          function u(e) {
            var t;
            e.done
              ? i(e.value)
              : ((t = e.value),
                t instanceof n
                  ? t
                  : new n(function(e) {
                      e(t);
                    })).then(s, a);
          }
          u((r = r.apply(e, t || [])).next());
        });
      }
      function l(e, t) {
        var n,
          r,
          i,
          o,
          s = {
            label: 0,
            sent: function() {
              if (1 & i[0]) throw i[1];
              return i[1];
            },
            trys: [],
            ops: []
          };
        return (
          (o = { next: a(0), throw: a(1), return: a(2) }),
          "function" == typeof Symbol &&
            (o[Symbol.iterator] = function() {
              return this;
            }),
          o
        );
        function a(o) {
          return function(a) {
            return (function(o) {
              if (n) throw new TypeError("Generator is already executing.");
              for (; s; )
                try {
                  if (
                    ((n = 1),
                    r &&
                      (i =
                        2 & o[0]
                          ? r.return
                          : o[0]
                          ? r.throw || ((i = r.return) && i.call(r), 0)
                          : r.next) &&
                      !(i = i.call(r, o[1])).done)
                  )
                    return i;
                  switch (((r = 0), i && (o = [2 & o[0], i.value]), o[0])) {
                    case 0:
                    case 1:
                      i = o;
                      break;
                    case 4:
                      return s.label++, { value: o[1], done: !1 };
                    case 5:
                      s.label++, (r = o[1]), (o = [0]);
                      continue;
                    case 7:
                      (o = s.ops.pop()), s.trys.pop();
                      continue;
                    default:
                      if (
                        !((i = s.trys),
                        (i = i.length > 0 && i[i.length - 1]) ||
                          (6 !== o[0] && 2 !== o[0]))
                      ) {
                        s = 0;
                        continue;
                      }
                      if (3 === o[0] && (!i || (o[1] > i[0] && o[1] < i[3]))) {
                        s.label = o[1];
                        break;
                      }
                      if (6 === o[0] && s.label < i[1]) {
                        (s.label = i[1]), (i = o);
                        break;
                      }
                      if (i && s.label < i[2]) {
                        (s.label = i[2]), s.ops.push(o);
                        break;
                      }
                      i[2] && s.ops.pop(), s.trys.pop();
                      continue;
                  }
                  o = t.call(e, s);
                } catch (e) {
                  (o = [6, e]), (r = 0);
                } finally {
                  n = i = 0;
                }
              if (5 & o[0]) throw o[1];
              return { value: o[0] ? o[1] : void 0, done: !0 };
            })([o, a]);
          };
        }
      }
      function h(e, t) {
        for (var n in e) t.hasOwnProperty(n) || (t[n] = e[n]);
      }
      function d(e) {
        var t = "function" == typeof Symbol && Symbol.iterator,
          n = t && e[t],
          r = 0;
        if (n) return n.call(e);
        if (e && "number" == typeof e.length)
          return {
            next: function() {
              return (
                e && r >= e.length && (e = void 0),
                { value: e && e[r++], done: !e }
              );
            }
          };
        throw new TypeError(
          t ? "Object is not iterable." : "Symbol.iterator is not defined."
        );
      }
      function p(e, t) {
        var n = "function" == typeof Symbol && e[Symbol.iterator];
        if (!n) return e;
        var r,
          i,
          o = n.call(e),
          s = [];
        try {
          for (; (void 0 === t || t-- > 0) && !(r = o.next()).done; )
            s.push(r.value);
        } catch (e) {
          i = { error: e };
        } finally {
          try {
            r && !r.done && (n = o.return) && n.call(o);
          } finally {
            if (i) throw i.error;
          }
        }
        return s;
      }
      function g() {
        for (var e = [], t = 0; t < arguments.length; t++)
          e = e.concat(p(arguments[t]));
        return e;
      }
      function y() {
        for (var e = 0, t = 0, n = arguments.length; t < n; t++)
          e += arguments[t].length;
        var r = Array(e),
          i = 0;
        for (t = 0; t < n; t++)
          for (var o = arguments[t], s = 0, a = o.length; s < a; s++, i++)
            r[i] = o[s];
        return r;
      }
      function v(e) {
        return this instanceof v ? ((this.v = e), this) : new v(e);
      }
      function m(e, t, n) {
        if (!Symbol.asyncIterator)
          throw new TypeError("Symbol.asyncIterator is not defined.");
        var r,
          i = n.apply(e, t || []),
          o = [];
        return (
          (r = {}),
          s("next"),
          s("throw"),
          s("return"),
          (r[Symbol.asyncIterator] = function() {
            return this;
          }),
          r
        );
        function s(e) {
          i[e] &&
            (r[e] = function(t) {
              return new Promise(function(n, r) {
                o.push([e, t, n, r]) > 1 || a(e, t);
              });
            });
        }
        function a(e, t) {
          try {
            (n = i[e](t)).value instanceof v
              ? Promise.resolve(n.value.v).then(u, c)
              : f(o[0][2], n);
          } catch (e) {
            f(o[0][3], e);
          }
          var n;
        }
        function u(e) {
          a("next", e);
        }
        function c(e) {
          a("throw", e);
        }
        function f(e, t) {
          e(t), o.shift(), o.length && a(o[0][0], o[0][1]);
        }
      }
      function b(e) {
        var t, n;
        return (
          (t = {}),
          r("next"),
          r("throw", function(e) {
            throw e;
          }),
          r("return"),
          (t[Symbol.iterator] = function() {
            return this;
          }),
          t
        );
        function r(r, i) {
          t[r] = e[r]
            ? function(t) {
                return (n = !n)
                  ? { value: v(e[r](t)), done: "return" === r }
                  : i
                  ? i(t)
                  : t;
              }
            : i;
        }
      }
      function w(e) {
        if (!Symbol.asyncIterator)
          throw new TypeError("Symbol.asyncIterator is not defined.");
        var t,
          n = e[Symbol.asyncIterator];
        return n
          ? n.call(e)
          : ((e = d(e)),
            (t = {}),
            r("next"),
            r("throw"),
            r("return"),
            (t[Symbol.asyncIterator] = function() {
              return this;
            }),
            t);
        function r(n) {
          t[n] =
            e[n] &&
            function(t) {
              return new Promise(function(r, i) {
                (function(e, t, n, r) {
                  Promise.resolve(r).then(function(t) {
                    e({ value: t, done: n });
                  }, t);
                })(r, i, (t = e[n](t)).done, t.value);
              });
            };
        }
      }
      function _(e, t) {
        return (
          Object.defineProperty
            ? Object.defineProperty(e, "raw", { value: t })
            : (e.raw = t),
          e
        );
      }
      function S(e) {
        if (e && e.__esModule) return e;
        var t = {};
        if (null != e)
          for (var n in e) Object.hasOwnProperty.call(e, n) && (t[n] = e[n]);
        return (t.default = e), t;
      }
      function E(e) {
        return e && e.__esModule ? e : { default: e };
      }
      function A(e, t) {
        if (!t.has(e))
          throw new TypeError("attempted to get private field on non-instance");
        return t.get(e);
      }
      function I(e, t, n) {
        if (!t.has(e))
          throw new TypeError("attempted to set private field on non-instance");
        return t.set(e, n), n;
      }
    },
    function(e, t, n) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.BLOCK_SIZE = 64),
        (t.DIGEST_LENGTH = 32),
        (t.KEY = new Uint32Array([
          1116352408,
          1899447441,
          3049323471,
          3921009573,
          961987163,
          1508970993,
          2453635748,
          2870763221,
          3624381080,
          310598401,
          607225278,
          1426881987,
          1925078388,
          2162078206,
          2614888103,
          3248222580,
          3835390401,
          4022224774,
          264347078,
          604807628,
          770255983,
          1249150122,
          1555081692,
          1996064986,
          2554220882,
          2821834349,
          2952996808,
          3210313671,
          3336571891,
          3584528711,
          113926993,
          338241895,
          666307205,
          773529912,
          1294757372,
          1396182291,
          1695183700,
          1986661051,
          2177026350,
          2456956037,
          2730485921,
          2820302411,
          3259730800,
          3345764771,
          3516065817,
          3600352804,
          4094571909,
          275423344,
          430227734,
          506948616,
          659060556,
          883997877,
          958139571,
          1322822218,
          1537002063,
          1747873779,
          1955562222,
          2024104815,
          2227730452,
          2361852424,
          2428436474,
          2756734187,
          3204031479,
          3329325298
        ])),
        (t.INIT = [
          1779033703,
          3144134277,
          1013904242,
          2773480762,
          1359893119,
          2600822924,
          528734635,
          1541459225
        ]),
        (t.MAX_HASHABLE_LENGTH = Math.pow(2, 53) - 1);
    },
    function(e, t, n) {
      "use strict";
      n.r(t),
        n.d(t, "__extends", function() {
          return i;
        }),
        n.d(t, "__assign", function() {
          return o;
        }),
        n.d(t, "__rest", function() {
          return s;
        }),
        n.d(t, "__decorate", function() {
          return a;
        }),
        n.d(t, "__param", function() {
          return u;
        }),
        n.d(t, "__metadata", function() {
          return c;
        }),
        n.d(t, "__awaiter", function() {
          return f;
        }),
        n.d(t, "__generator", function() {
          return l;
        }),
        n.d(t, "__exportStar", function() {
          return h;
        }),
        n.d(t, "__values", function() {
          return d;
        }),
        n.d(t, "__read", function() {
          return p;
        }),
        n.d(t, "__spread", function() {
          return g;
        }),
        n.d(t, "__spreadArrays", function() {
          return y;
        }),
        n.d(t, "__await", function() {
          return v;
        }),
        n.d(t, "__asyncGenerator", function() {
          return m;
        }),
        n.d(t, "__asyncDelegator", function() {
          return b;
        }),
        n.d(t, "__asyncValues", function() {
          return w;
        }),
        n.d(t, "__makeTemplateObject", function() {
          return _;
        }),
        n.d(t, "__importStar", function() {
          return S;
        }),
        n.d(t, "__importDefault", function() {
          return E;
        }),
        n.d(t, "__classPrivateFieldGet", function() {
          return A;
        }),
        n.d(t, "__classPrivateFieldSet", function() {
          return I;
        });
      /*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
      var r = function(e, t) {
        return (r =
          Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array &&
            function(e, t) {
              e.__proto__ = t;
            }) ||
          function(e, t) {
            for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
          })(e, t);
      };
      function i(e, t) {
        function n() {
          this.constructor = e;
        }
        r(e, t),
          (e.prototype =
            null === t
              ? Object.create(t)
              : ((n.prototype = t.prototype), new n()));
      }
      var o = function() {
        return (o =
          Object.assign ||
          function(e) {
            for (var t, n = 1, r = arguments.length; n < r; n++)
              for (var i in (t = arguments[n]))
                Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
            return e;
          }).apply(this, arguments);
      };
      function s(e, t) {
        var n = {};
        for (var r in e)
          Object.prototype.hasOwnProperty.call(e, r) &&
            t.indexOf(r) < 0 &&
            (n[r] = e[r]);
        if (null != e && "function" == typeof Object.getOwnPropertySymbols) {
          var i = 0;
          for (r = Object.getOwnPropertySymbols(e); i < r.length; i++)
            t.indexOf(r[i]) < 0 &&
              Object.prototype.propertyIsEnumerable.call(e, r[i]) &&
              (n[r[i]] = e[r[i]]);
        }
        return n;
      }
      function a(e, t, n, r) {
        var i,
          o = arguments.length,
          s =
            o < 3
              ? t
              : null === r
              ? (r = Object.getOwnPropertyDescriptor(t, n))
              : r;
        if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
          s = Reflect.decorate(e, t, n, r);
        else
          for (var a = e.length - 1; a >= 0; a--)
            (i = e[a]) &&
              (s = (o < 3 ? i(s) : o > 3 ? i(t, n, s) : i(t, n)) || s);
        return o > 3 && s && Object.defineProperty(t, n, s), s;
      }
      function u(e, t) {
        return function(n, r) {
          t(n, r, e);
        };
      }
      function c(e, t) {
        if ("object" == typeof Reflect && "function" == typeof Reflect.metadata)
          return Reflect.metadata(e, t);
      }
      function f(e, t, n, r) {
        return new (n || (n = Promise))(function(i, o) {
          function s(e) {
            try {
              u(r.next(e));
            } catch (e) {
              o(e);
            }
          }
          function a(e) {
            try {
              u(r.throw(e));
            } catch (e) {
              o(e);
            }
          }
          function u(e) {
            var t;
            e.done
              ? i(e.value)
              : ((t = e.value),
                t instanceof n
                  ? t
                  : new n(function(e) {
                      e(t);
                    })).then(s, a);
          }
          u((r = r.apply(e, t || [])).next());
        });
      }
      function l(e, t) {
        var n,
          r,
          i,
          o,
          s = {
            label: 0,
            sent: function() {
              if (1 & i[0]) throw i[1];
              return i[1];
            },
            trys: [],
            ops: []
          };
        return (
          (o = { next: a(0), throw: a(1), return: a(2) }),
          "function" == typeof Symbol &&
            (o[Symbol.iterator] = function() {
              return this;
            }),
          o
        );
        function a(o) {
          return function(a) {
            return (function(o) {
              if (n) throw new TypeError("Generator is already executing.");
              for (; s; )
                try {
                  if (
                    ((n = 1),
                    r &&
                      (i =
                        2 & o[0]
                          ? r.return
                          : o[0]
                          ? r.throw || ((i = r.return) && i.call(r), 0)
                          : r.next) &&
                      !(i = i.call(r, o[1])).done)
                  )
                    return i;
                  switch (((r = 0), i && (o = [2 & o[0], i.value]), o[0])) {
                    case 0:
                    case 1:
                      i = o;
                      break;
                    case 4:
                      return s.label++, { value: o[1], done: !1 };
                    case 5:
                      s.label++, (r = o[1]), (o = [0]);
                      continue;
                    case 7:
                      (o = s.ops.pop()), s.trys.pop();
                      continue;
                    default:
                      if (
                        !((i = s.trys),
                        (i = i.length > 0 && i[i.length - 1]) ||
                          (6 !== o[0] && 2 !== o[0]))
                      ) {
                        s = 0;
                        continue;
                      }
                      if (3 === o[0] && (!i || (o[1] > i[0] && o[1] < i[3]))) {
                        s.label = o[1];
                        break;
                      }
                      if (6 === o[0] && s.label < i[1]) {
                        (s.label = i[1]), (i = o);
                        break;
                      }
                      if (i && s.label < i[2]) {
                        (s.label = i[2]), s.ops.push(o);
                        break;
                      }
                      i[2] && s.ops.pop(), s.trys.pop();
                      continue;
                  }
                  o = t.call(e, s);
                } catch (e) {
                  (o = [6, e]), (r = 0);
                } finally {
                  n = i = 0;
                }
              if (5 & o[0]) throw o[1];
              return { value: o[0] ? o[1] : void 0, done: !0 };
            })([o, a]);
          };
        }
      }
      function h(e, t) {
        for (var n in e) t.hasOwnProperty(n) || (t[n] = e[n]);
      }
      function d(e) {
        var t = "function" == typeof Symbol && Symbol.iterator,
          n = t && e[t],
          r = 0;
        if (n) return n.call(e);
        if (e && "number" == typeof e.length)
          return {
            next: function() {
              return (
                e && r >= e.length && (e = void 0),
                { value: e && e[r++], done: !e }
              );
            }
          };
        throw new TypeError(
          t ? "Object is not iterable." : "Symbol.iterator is not defined."
        );
      }
      function p(e, t) {
        var n = "function" == typeof Symbol && e[Symbol.iterator];
        if (!n) return e;
        var r,
          i,
          o = n.call(e),
          s = [];
        try {
          for (; (void 0 === t || t-- > 0) && !(r = o.next()).done; )
            s.push(r.value);
        } catch (e) {
          i = { error: e };
        } finally {
          try {
            r && !r.done && (n = o.return) && n.call(o);
          } finally {
            if (i) throw i.error;
          }
        }
        return s;
      }
      function g() {
        for (var e = [], t = 0; t < arguments.length; t++)
          e = e.concat(p(arguments[t]));
        return e;
      }
      function y() {
        for (var e = 0, t = 0, n = arguments.length; t < n; t++)
          e += arguments[t].length;
        var r = Array(e),
          i = 0;
        for (t = 0; t < n; t++)
          for (var o = arguments[t], s = 0, a = o.length; s < a; s++, i++)
            r[i] = o[s];
        return r;
      }
      function v(e) {
        return this instanceof v ? ((this.v = e), this) : new v(e);
      }
      function m(e, t, n) {
        if (!Symbol.asyncIterator)
          throw new TypeError("Symbol.asyncIterator is not defined.");
        var r,
          i = n.apply(e, t || []),
          o = [];
        return (
          (r = {}),
          s("next"),
          s("throw"),
          s("return"),
          (r[Symbol.asyncIterator] = function() {
            return this;
          }),
          r
        );
        function s(e) {
          i[e] &&
            (r[e] = function(t) {
              return new Promise(function(n, r) {
                o.push([e, t, n, r]) > 1 || a(e, t);
              });
            });
        }
        function a(e, t) {
          try {
            (n = i[e](t)).value instanceof v
              ? Promise.resolve(n.value.v).then(u, c)
              : f(o[0][2], n);
          } catch (e) {
            f(o[0][3], e);
          }
          var n;
        }
        function u(e) {
          a("next", e);
        }
        function c(e) {
          a("throw", e);
        }
        function f(e, t) {
          e(t), o.shift(), o.length && a(o[0][0], o[0][1]);
        }
      }
      function b(e) {
        var t, n;
        return (
          (t = {}),
          r("next"),
          r("throw", function(e) {
            throw e;
          }),
          r("return"),
          (t[Symbol.iterator] = function() {
            return this;
          }),
          t
        );
        function r(r, i) {
          t[r] = e[r]
            ? function(t) {
                return (n = !n)
                  ? { value: v(e[r](t)), done: "return" === r }
                  : i
                  ? i(t)
                  : t;
              }
            : i;
        }
      }
      function w(e) {
        if (!Symbol.asyncIterator)
          throw new TypeError("Symbol.asyncIterator is not defined.");
        var t,
          n = e[Symbol.asyncIterator];
        return n
          ? n.call(e)
          : ((e = d(e)),
            (t = {}),
            r("next"),
            r("throw"),
            r("return"),
            (t[Symbol.asyncIterator] = function() {
              return this;
            }),
            t);
        function r(n) {
          t[n] =
            e[n] &&
            function(t) {
              return new Promise(function(r, i) {
                (function(e, t, n, r) {
                  Promise.resolve(r).then(function(t) {
                    e({ value: t, done: n });
                  }, t);
                })(r, i, (t = e[n](t)).done, t.value);
              });
            };
        }
      }
      function _(e, t) {
        return (
          Object.defineProperty
            ? Object.defineProperty(e, "raw", { value: t })
            : (e.raw = t),
          e
        );
      }
      function S(e) {
        if (e && e.__esModule) return e;
        var t = {};
        if (null != e)
          for (var n in e) Object.hasOwnProperty.call(e, n) && (t[n] = e[n]);
        return (t.default = e), t;
      }
      function E(e) {
        return e && e.__esModule ? e : { default: e };
      }
      function A(e, t) {
        if (!t.has(e))
          throw new TypeError("attempted to get private field on non-instance");
        return t.get(e);
      }
      function I(e, t, n) {
        if (!t.has(e))
          throw new TypeError("attempted to set private field on non-instance");
        return t.set(e, n), n;
      }
    },
    function(e, t, n) {
      "use strict";
      e.exports = function(e, t) {
        return function() {
          for (var n = new Array(arguments.length), r = 0; r < n.length; r++)
            n[r] = arguments[r];
          return e.apply(t, n);
        };
      };
    },
    function(e, t, n) {
      "use strict";
      var r = n(3);
      function i(e) {
        return encodeURIComponent(e)
          .replace(/%40/gi, "@")
          .replace(/%3A/gi, ":")
          .replace(/%24/g, "$")
          .replace(/%2C/gi, ",")
          .replace(/%20/g, "+")
          .replace(/%5B/gi, "[")
          .replace(/%5D/gi, "]");
      }
      e.exports = function(e, t, n) {
        if (!t) return e;
        var o;
        if (n) o = n(t);
        else if (r.isURLSearchParams(t)) o = t.toString();
        else {
          var s = [];
          r.forEach(t, function(e, t) {
            null != e &&
              (r.isArray(e) ? (t += "[]") : (e = [e]),
              r.forEach(e, function(e) {
                r.isDate(e)
                  ? (e = e.toISOString())
                  : r.isObject(e) && (e = JSON.stringify(e)),
                  s.push(i(t) + "=" + i(e));
              }));
          }),
            (o = s.join("&"));
        }
        if (o) {
          var a = e.indexOf("#");
          -1 !== a && (e = e.slice(0, a)),
            (e += (-1 === e.indexOf("?") ? "?" : "&") + o);
        }
        return e;
      };
    },
    function(e, t, n) {
      "use strict";
      e.exports = function(e) {
        return !(!e || !e.__CANCEL__);
      };
    },
    function(e, t, n) {
      "use strict";
      (function(t) {
        var r = n(3),
          i = n(87),
          o = { "Content-Type": "application/x-www-form-urlencoded" };
        function s(e, t) {
          !r.isUndefined(e) &&
            r.isUndefined(e["Content-Type"]) &&
            (e["Content-Type"] = t);
        }
        var a,
          u = {
            adapter:
              (((void 0 !== t &&
                "[object process]" === Object.prototype.toString.call(t)) ||
                "undefined" != typeof XMLHttpRequest) &&
                (a = n(37)),
              a),
            transformRequest: [
              function(e, t) {
                return (
                  i(t, "Accept"),
                  i(t, "Content-Type"),
                  r.isFormData(e) ||
                  r.isArrayBuffer(e) ||
                  r.isBuffer(e) ||
                  r.isStream(e) ||
                  r.isFile(e) ||
                  r.isBlob(e)
                    ? e
                    : r.isArrayBufferView(e)
                    ? e.buffer
                    : r.isURLSearchParams(e)
                    ? (s(t, "application/x-www-form-urlencoded;charset=utf-8"),
                      e.toString())
                    : r.isObject(e)
                    ? (s(t, "application/json;charset=utf-8"),
                      JSON.stringify(e))
                    : e
                );
              }
            ],
            transformResponse: [
              function(e) {
                if ("string" == typeof e)
                  try {
                    e = JSON.parse(e);
                  } catch (e) {}
                return e;
              }
            ],
            timeout: 0,
            xsrfCookieName: "XSRF-TOKEN",
            xsrfHeaderName: "X-XSRF-TOKEN",
            maxContentLength: -1,
            validateStatus: function(e) {
              return e >= 200 && e < 300;
            }
          };
        (u.headers = {
          common: { Accept: "application/json, text/plain, */*" }
        }),
          r.forEach(["delete", "get", "head"], function(e) {
            u.headers[e] = {};
          }),
          r.forEach(["post", "put", "patch"], function(e) {
            u.headers[e] = r.merge(o);
          }),
          (e.exports = u);
      }.call(this, n(22)));
    },
    function(e, t, n) {
      "use strict";
      var r = n(3),
        i = n(88),
        o = n(34),
        s = n(90),
        a = n(91),
        u = n(38);
      e.exports = function(e) {
        return new Promise(function(t, c) {
          var f = e.data,
            l = e.headers;
          r.isFormData(f) && delete l["Content-Type"];
          var h = new XMLHttpRequest();
          if (e.auth) {
            var d = e.auth.username || "",
              p = e.auth.password || "";
            l.Authorization = "Basic " + btoa(d + ":" + p);
          }
          if (
            (h.open(
              e.method.toUpperCase(),
              o(e.url, e.params, e.paramsSerializer),
              !0
            ),
            (h.timeout = e.timeout),
            (h.onreadystatechange = function() {
              if (
                h &&
                4 === h.readyState &&
                (0 !== h.status ||
                  (h.responseURL && 0 === h.responseURL.indexOf("file:")))
              ) {
                var n =
                    "getAllResponseHeaders" in h
                      ? s(h.getAllResponseHeaders())
                      : null,
                  r = {
                    data:
                      e.responseType && "text" !== e.responseType
                        ? h.response
                        : h.responseText,
                    status: h.status,
                    statusText: h.statusText,
                    headers: n,
                    config: e,
                    request: h
                  };
                i(t, c, r), (h = null);
              }
            }),
            (h.onabort = function() {
              h && (c(u("Request aborted", e, "ECONNABORTED", h)), (h = null));
            }),
            (h.onerror = function() {
              c(u("Network Error", e, null, h)), (h = null);
            }),
            (h.ontimeout = function() {
              c(
                u(
                  "timeout of " + e.timeout + "ms exceeded",
                  e,
                  "ECONNABORTED",
                  h
                )
              ),
                (h = null);
            }),
            r.isStandardBrowserEnv())
          ) {
            var g = n(92),
              y =
                (e.withCredentials || a(e.url)) && e.xsrfCookieName
                  ? g.read(e.xsrfCookieName)
                  : void 0;
            y && (l[e.xsrfHeaderName] = y);
          }
          if (
            ("setRequestHeader" in h &&
              r.forEach(l, function(e, t) {
                void 0 === f && "content-type" === t.toLowerCase()
                  ? delete l[t]
                  : h.setRequestHeader(t, e);
              }),
            e.withCredentials && (h.withCredentials = !0),
            e.responseType)
          )
            try {
              h.responseType = e.responseType;
            } catch (t) {
              if ("json" !== e.responseType) throw t;
            }
          "function" == typeof e.onDownloadProgress &&
            h.addEventListener("progress", e.onDownloadProgress),
            "function" == typeof e.onUploadProgress &&
              h.upload &&
              h.upload.addEventListener("progress", e.onUploadProgress),
            e.cancelToken &&
              e.cancelToken.promise.then(function(e) {
                h && (h.abort(), c(e), (h = null));
              }),
            void 0 === f && (f = null),
            h.send(f);
        });
      };
    },
    function(e, t, n) {
      "use strict";
      var r = n(89);
      e.exports = function(e, t, n, i, o) {
        var s = new Error(e);
        return r(s, t, n, i, o);
      };
    },
    function(e, t, n) {
      "use strict";
      var r = n(3);
      e.exports = function(e, t) {
        t = t || {};
        var n = {};
        return (
          r.forEach(["url", "method", "params", "data"], function(e) {
            void 0 !== t[e] && (n[e] = t[e]);
          }),
          r.forEach(["headers", "auth", "proxy"], function(i) {
            r.isObject(t[i])
              ? (n[i] = r.deepMerge(e[i], t[i]))
              : void 0 !== t[i]
              ? (n[i] = t[i])
              : r.isObject(e[i])
              ? (n[i] = r.deepMerge(e[i]))
              : void 0 !== e[i] && (n[i] = e[i]);
          }),
          r.forEach(
            [
              "baseURL",
              "transformRequest",
              "transformResponse",
              "paramsSerializer",
              "timeout",
              "withCredentials",
              "adapter",
              "responseType",
              "xsrfCookieName",
              "xsrfHeaderName",
              "onUploadProgress",
              "onDownloadProgress",
              "maxContentLength",
              "validateStatus",
              "maxRedirects",
              "httpAgent",
              "httpsAgent",
              "cancelToken",
              "socketPath"
            ],
            function(r) {
              void 0 !== t[r]
                ? (n[r] = t[r])
                : void 0 !== e[r] && (n[r] = e[r]);
            }
          ),
          n
        );
      };
    },
    function(e, t, n) {
      "use strict";
      function r(e) {
        this.message = e;
      }
      (r.prototype.toString = function() {
        return "Cancel" + (this.message ? ": " + this.message : "");
      }),
        (r.prototype.__CANCEL__ = !0),
        (e.exports = r);
    },
    function(e, t, n) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        n(66).__exportStar(n(67), t);
      var r = n(25);
      t.Ie11Sha256 = r.Sha256;
      var i = n(29);
      t.WebCryptoSha256 = i.Sha256;
    },
    function(e, t, n) {
      e.exports = n(97).Observable;
    },
    function(e, t, n) {
      (function(t) {
        var n;
        (n = function() {
          return (function(e) {
            var t,
              n =
                e.localStorage ||
                ((t = {}),
                {
                  setItem: function(e, n) {
                    t[e] = n;
                  },
                  getItem: function(e) {
                    return t[e];
                  },
                  removeItem: function(e) {
                    delete t[e];
                  }
                }),
              r = 1,
              i = 2,
              o = 3,
              s = 4,
              a = 5,
              u = 6,
              c = 7,
              f = 8,
              l = 9,
              h = 10,
              d = 11,
              p = 12,
              g = 13,
              y = 14,
              v = function(e, t) {
                for (var n in e)
                  if (e.hasOwnProperty(n)) {
                    if (!t.hasOwnProperty(n)) {
                      var r =
                        "Unknown property, " + n + ". Valid properties are:";
                      for (var i in t) t.hasOwnProperty(i) && (r = r + " " + i);
                      throw new Error(r);
                    }
                    if (typeof e[n] !== t[n])
                      throw new Error(_(b.INVALID_TYPE, [typeof e[n], n]));
                  }
              },
              m = function(e, t) {
                return function() {
                  return e.apply(t, arguments);
                };
              },
              b = {
                OK: { code: 0, text: "AMQJSC0000I OK." },
                CONNECT_TIMEOUT: {
                  code: 1,
                  text: "AMQJSC0001E Connect timed out."
                },
                SUBSCRIBE_TIMEOUT: {
                  code: 2,
                  text: "AMQJS0002E Subscribe timed out."
                },
                UNSUBSCRIBE_TIMEOUT: {
                  code: 3,
                  text: "AMQJS0003E Unsubscribe timed out."
                },
                PING_TIMEOUT: { code: 4, text: "AMQJS0004E Ping timed out." },
                INTERNAL_ERROR: {
                  code: 5,
                  text:
                    "AMQJS0005E Internal error. Error Message: {0}, Stack trace: {1}"
                },
                CONNACK_RETURNCODE: {
                  code: 6,
                  text: "AMQJS0006E Bad Connack return code:{0} {1}."
                },
                SOCKET_ERROR: { code: 7, text: "AMQJS0007E Socket error:{0}." },
                SOCKET_CLOSE: { code: 8, text: "AMQJS0008I Socket closed." },
                MALFORMED_UTF: {
                  code: 9,
                  text: "AMQJS0009E Malformed UTF data:{0} {1} {2}."
                },
                UNSUPPORTED: {
                  code: 10,
                  text: "AMQJS0010E {0} is not supported by this browser."
                },
                INVALID_STATE: {
                  code: 11,
                  text: "AMQJS0011E Invalid state {0}."
                },
                INVALID_TYPE: {
                  code: 12,
                  text: "AMQJS0012E Invalid type {0} for {1}."
                },
                INVALID_ARGUMENT: {
                  code: 13,
                  text: "AMQJS0013E Invalid argument {0} for {1}."
                },
                UNSUPPORTED_OPERATION: {
                  code: 14,
                  text: "AMQJS0014E Unsupported operation."
                },
                INVALID_STORED_DATA: {
                  code: 15,
                  text:
                    "AMQJS0015E Invalid data in local storage key={0} value={1}."
                },
                INVALID_MQTT_MESSAGE_TYPE: {
                  code: 16,
                  text: "AMQJS0016E Invalid MQTT message type {0}."
                },
                MALFORMED_UNICODE: {
                  code: 17,
                  text: "AMQJS0017E Malformed Unicode string:{0} {1}."
                },
                BUFFER_FULL: {
                  code: 18,
                  text:
                    "AMQJS0018E Message buffer is full, maximum buffer size: {0}."
                }
              },
              w = {
                0: "Connection Accepted",
                1: "Connection Refused: unacceptable protocol version",
                2: "Connection Refused: identifier rejected",
                3: "Connection Refused: server unavailable",
                4: "Connection Refused: bad user name or password",
                5: "Connection Refused: not authorized"
              },
              _ = function(e, t) {
                var n = e.text;
                if (t)
                  for (var r, i, o = 0; o < t.length; o++)
                    if (((r = "{" + o + "}"), (i = n.indexOf(r)) > 0)) {
                      var s = n.substring(0, i),
                        a = n.substring(i + r.length);
                      n = s + t[o] + a;
                    }
                return n;
              },
              S = [0, 6, 77, 81, 73, 115, 100, 112, 3],
              E = [0, 4, 77, 81, 84, 84, 4],
              A = function(e, t) {
                for (var n in ((this.type = e), t))
                  t.hasOwnProperty(n) && (this[n] = t[n]);
              };
            function I(e, t) {
              var n,
                r = t,
                f = e[t],
                h = f >> 4,
                p = (f &= 15);
              t += 1;
              var g = 0,
                y = 1;
              do {
                if (t == e.length) return [null, r];
                (g += (127 & (n = e[t++])) * y), (y *= 128);
              } while (0 != (128 & n));
              var v = t + g;
              if (v > e.length) return [null, r];
              var m = new A(h);
              switch (h) {
                case i:
                  1 & e[t++] && (m.sessionPresent = !0),
                    (m.returnCode = e[t++]);
                  break;
                case o:
                  var b = (p >> 1) & 3,
                    w = O(e, t),
                    _ = N(e, (t += 2), w);
                  (t += w),
                    b > 0 && ((m.messageIdentifier = O(e, t)), (t += 2));
                  var S = new D(e.subarray(t, v));
                  1 == (1 & p) && (S.retained = !0),
                    8 == (8 & p) && (S.duplicate = !0),
                    (S.qos = b),
                    (S.destinationName = _),
                    (m.payloadMessage = S);
                  break;
                case s:
                case a:
                case u:
                case c:
                case d:
                  m.messageIdentifier = O(e, t);
                  break;
                case l:
                  (m.messageIdentifier = O(e, t)),
                    (t += 2),
                    (m.returnCode = e.subarray(t, v));
              }
              return [m, v];
            }
            function T(e, t, n) {
              return (t[n++] = e >> 8), (t[n++] = e % 256), n;
            }
            function C(e, t, n, r) {
              return k(e, n, (r = T(t, n, r))), r + t;
            }
            function O(e, t) {
              return 256 * e[t] + e[t + 1];
            }
            function P(e) {
              for (var t = 0, n = 0; n < e.length; n++) {
                var r = e.charCodeAt(n);
                r > 2047
                  ? (55296 <= r && r <= 56319 && (n++, t++), (t += 3))
                  : r > 127
                  ? (t += 2)
                  : t++;
              }
              return t;
            }
            function k(e, t, n) {
              for (var r = n, i = 0; i < e.length; i++) {
                var o = e.charCodeAt(i);
                if (55296 <= o && o <= 56319) {
                  var s = e.charCodeAt(++i);
                  if (isNaN(s)) throw new Error(_(b.MALFORMED_UNICODE, [o, s]));
                  o = s - 56320 + ((o - 55296) << 10) + 65536;
                }
                o <= 127
                  ? (t[r++] = o)
                  : o <= 2047
                  ? ((t[r++] = ((o >> 6) & 31) | 192),
                    (t[r++] = (63 & o) | 128))
                  : o <= 65535
                  ? ((t[r++] = ((o >> 12) & 15) | 224),
                    (t[r++] = ((o >> 6) & 63) | 128),
                    (t[r++] = (63 & o) | 128))
                  : ((t[r++] = ((o >> 18) & 7) | 240),
                    (t[r++] = ((o >> 12) & 63) | 128),
                    (t[r++] = ((o >> 6) & 63) | 128),
                    (t[r++] = (63 & o) | 128));
              }
              return t;
            }
            function N(e, t, n) {
              for (var r, i = "", o = t; o < t + n; ) {
                var s = e[o++];
                if (s < 128) r = s;
                else {
                  var a = e[o++] - 128;
                  if (a < 0)
                    throw new Error(
                      _(b.MALFORMED_UTF, [s.toString(16), a.toString(16), ""])
                    );
                  if (s < 224) r = 64 * (s - 192) + a;
                  else {
                    var u = e[o++] - 128;
                    if (u < 0)
                      throw new Error(
                        _(b.MALFORMED_UTF, [
                          s.toString(16),
                          a.toString(16),
                          u.toString(16)
                        ])
                      );
                    if (s < 240) r = 4096 * (s - 224) + 64 * a + u;
                    else {
                      var c = e[o++] - 128;
                      if (c < 0)
                        throw new Error(
                          _(b.MALFORMED_UTF, [
                            s.toString(16),
                            a.toString(16),
                            u.toString(16),
                            c.toString(16)
                          ])
                        );
                      if (!(s < 248))
                        throw new Error(
                          _(b.MALFORMED_UTF, [
                            s.toString(16),
                            a.toString(16),
                            u.toString(16),
                            c.toString(16)
                          ])
                        );
                      r = 262144 * (s - 240) + 4096 * a + 64 * u + c;
                    }
                  }
                }
                r > 65535 &&
                  ((r -= 65536),
                  (i += String.fromCharCode(55296 + (r >> 10))),
                  (r = 56320 + (1023 & r))),
                  (i += String.fromCharCode(r));
              }
              return i;
            }
            A.prototype.encode = function() {
              var e,
                t = (15 & this.type) << 4,
                n = 0,
                i = [],
                s = 0;
              switch (
                (void 0 !== this.messageIdentifier && (n += 2), this.type)
              ) {
                case r:
                  switch (this.mqttVersion) {
                    case 3:
                      n += S.length + 3;
                      break;
                    case 4:
                      n += E.length + 3;
                  }
                  (n += P(this.clientId) + 2),
                    void 0 !== this.willMessage &&
                      ((n += P(this.willMessage.destinationName) + 2),
                      (e = this.willMessage.payloadBytes) instanceof
                        Uint8Array || (e = new Uint8Array(c)),
                      (n += e.byteLength + 2)),
                    void 0 !== this.userName && (n += P(this.userName) + 2),
                    void 0 !== this.password && (n += P(this.password) + 2);
                  break;
                case f:
                  t |= 2;
                  for (var a = 0; a < this.topics.length; a++)
                    (i[a] = P(this.topics[a])), (n += i[a] + 2);
                  n += this.requestedQos.length;
                  break;
                case h:
                  for (t |= 2, a = 0; a < this.topics.length; a++)
                    (i[a] = P(this.topics[a])), (n += i[a] + 2);
                  break;
                case u:
                  t |= 2;
                  break;
                case o:
                  this.payloadMessage.duplicate && (t |= 8),
                    (t = t |= this.payloadMessage.qos << 1),
                    this.payloadMessage.retained && (t |= 1),
                    (n += (s = P(this.payloadMessage.destinationName)) + 2);
                  var c = this.payloadMessage.payloadBytes;
                  (n += c.byteLength),
                    c instanceof ArrayBuffer
                      ? (c = new Uint8Array(c))
                      : c instanceof Uint8Array ||
                        (c = new Uint8Array(c.buffer));
              }
              var l = (function(e) {
                  var t = new Array(1),
                    n = 0;
                  do {
                    var r = e % 128;
                    (e >>= 7) > 0 && (r |= 128), (t[n++] = r);
                  } while (e > 0 && n < 4);
                  return t;
                })(n),
                d = l.length + 1,
                p = new ArrayBuffer(n + d),
                g = new Uint8Array(p);
              if (((g[0] = t), g.set(l, 1), this.type == o))
                d = C(this.payloadMessage.destinationName, s, g, d);
              else if (this.type == r) {
                switch (this.mqttVersion) {
                  case 3:
                    g.set(S, d), (d += S.length);
                    break;
                  case 4:
                    g.set(E, d), (d += E.length);
                }
                var y = 0;
                this.cleanSession && (y = 2),
                  void 0 !== this.willMessage &&
                    ((y |= 4),
                    (y |= this.willMessage.qos << 3),
                    this.willMessage.retained && (y |= 32)),
                  void 0 !== this.userName && (y |= 128),
                  void 0 !== this.password && (y |= 64),
                  (g[d++] = y),
                  (d = T(this.keepAliveInterval, g, d));
              }
              switch (
                (void 0 !== this.messageIdentifier &&
                  (d = T(this.messageIdentifier, g, d)),
                this.type)
              ) {
                case r:
                  (d = C(this.clientId, P(this.clientId), g, d)),
                    void 0 !== this.willMessage &&
                      ((d = C(
                        this.willMessage.destinationName,
                        P(this.willMessage.destinationName),
                        g,
                        d
                      )),
                      (d = T(e.byteLength, g, d)),
                      g.set(e, d),
                      (d += e.byteLength)),
                    void 0 !== this.userName &&
                      (d = C(this.userName, P(this.userName), g, d)),
                    void 0 !== this.password &&
                      (d = C(this.password, P(this.password), g, d));
                  break;
                case o:
                  g.set(c, d);
                  break;
                case f:
                  for (a = 0; a < this.topics.length; a++)
                    (d = C(this.topics[a], i[a], g, d)),
                      (g[d++] = this.requestedQos[a]);
                  break;
                case h:
                  for (a = 0; a < this.topics.length; a++)
                    d = C(this.topics[a], i[a], g, d);
              }
              return p;
            };
            var R = function(e, t) {
                (this._client = e),
                  (this._keepAliveInterval = 1e3 * t),
                  (this.isReset = !1);
                var n = new A(p).encode(),
                  r = function(e) {
                    return function() {
                      return i.apply(e);
                    };
                  },
                  i = function() {
                    this.isReset
                      ? ((this.isReset = !1),
                        this._client._trace("Pinger.doPing", "send PINGREQ"),
                        this._client.socket.send(n),
                        (this.timeout = setTimeout(
                          r(this),
                          this._keepAliveInterval
                        )))
                      : (this._client._trace("Pinger.doPing", "Timed out"),
                        this._client._disconnected(
                          b.PING_TIMEOUT.code,
                          _(b.PING_TIMEOUT)
                        ));
                  };
                (this.reset = function() {
                  (this.isReset = !0),
                    clearTimeout(this.timeout),
                    this._keepAliveInterval > 0 &&
                      (this.timeout = setTimeout(
                        r(this),
                        this._keepAliveInterval
                      ));
                }),
                  (this.cancel = function() {
                    clearTimeout(this.timeout);
                  });
              },
              x = function(e, t, n, r) {
                t || (t = 30),
                  (this.timeout = setTimeout(
                    (function(e, t, n) {
                      return function() {
                        return e.apply(t, n);
                      };
                    })(n, e, r),
                    1e3 * t
                  )),
                  (this.cancel = function() {
                    clearTimeout(this.timeout);
                  });
              },
              U = function(t, r, i, o, s) {
                if (!("WebSocket" in e) || null === e.WebSocket)
                  throw new Error(_(b.UNSUPPORTED, ["WebSocket"]));
                if (!("ArrayBuffer" in e) || null === e.ArrayBuffer)
                  throw new Error(_(b.UNSUPPORTED, ["ArrayBuffer"]));
                for (var a in (this._trace("Paho.Client", t, r, i, o, s),
                (this.host = r),
                (this.port = i),
                (this.path = o),
                (this.uri = t),
                (this.clientId = s),
                (this._wsuri = null),
                (this._localKey =
                  r + ":" + i + ("/mqtt" != o ? ":" + o : "") + ":" + s + ":"),
                (this._msg_queue = []),
                (this._buffered_msg_queue = []),
                (this._sentMessages = {}),
                (this._receivedMessages = {}),
                (this._notify_msg_sent = {}),
                (this._message_identifier = 1),
                (this._sequence = 0),
                n))
                  (0 !== a.indexOf("Sent:" + this._localKey) &&
                    0 !== a.indexOf("Received:" + this._localKey)) ||
                    this.restore(a);
              };
            (U.prototype.host = null),
              (U.prototype.port = null),
              (U.prototype.path = null),
              (U.prototype.uri = null),
              (U.prototype.clientId = null),
              (U.prototype.socket = null),
              (U.prototype.connected = !1),
              (U.prototype.maxMessageIdentifier = 65536),
              (U.prototype.connectOptions = null),
              (U.prototype.hostIndex = null),
              (U.prototype.onConnected = null),
              (U.prototype.onConnectionLost = null),
              (U.prototype.onMessageDelivered = null),
              (U.prototype.onMessageArrived = null),
              (U.prototype.traceFunction = null),
              (U.prototype._msg_queue = null),
              (U.prototype._buffered_msg_queue = null),
              (U.prototype._connectTimeout = null),
              (U.prototype.sendPinger = null),
              (U.prototype.receivePinger = null),
              (U.prototype._reconnectInterval = 1),
              (U.prototype._reconnecting = !1),
              (U.prototype._reconnectTimeout = null),
              (U.prototype.disconnectedPublishing = !1),
              (U.prototype.disconnectedBufferSize = 5e3),
              (U.prototype.receiveBuffer = null),
              (U.prototype._traceBuffer = null),
              (U.prototype._MAX_TRACE_ENTRIES = 100),
              (U.prototype.connect = function(e) {
                var t = this._traceMask(e, "password");
                if (
                  (this._trace(
                    "Client.connect",
                    t,
                    this.socket,
                    this.connected
                  ),
                  this.connected)
                )
                  throw new Error(_(b.INVALID_STATE, ["already connected"]));
                if (this.socket)
                  throw new Error(_(b.INVALID_STATE, ["already connected"]));
                this._reconnecting &&
                  (this._reconnectTimeout.cancel(),
                  (this._reconnectTimeout = null),
                  (this._reconnecting = !1)),
                  (this.connectOptions = e),
                  (this._reconnectInterval = 1),
                  (this._reconnecting = !1),
                  e.uris
                    ? ((this.hostIndex = 0), this._doConnect(e.uris[0]))
                    : this._doConnect(this.uri);
              }),
              (U.prototype.subscribe = function(e, t) {
                if ((this._trace("Client.subscribe", e, t), !this.connected))
                  throw new Error(_(b.INVALID_STATE, ["not connected"]));
                var n = new A(f);
                (n.topics = e.constructor === Array ? e : [e]),
                  void 0 === t.qos && (t.qos = 0),
                  (n.requestedQos = []);
                for (var r = 0; r < n.topics.length; r++)
                  n.requestedQos[r] = t.qos;
                t.onSuccess &&
                  (n.onSuccess = function(e) {
                    t.onSuccess({
                      invocationContext: t.invocationContext,
                      grantedQos: e
                    });
                  }),
                  t.onFailure &&
                    (n.onFailure = function(e) {
                      t.onFailure({
                        invocationContext: t.invocationContext,
                        errorCode: e,
                        errorMessage: _(e)
                      });
                    }),
                  t.timeout &&
                    (n.timeOut = new x(this, t.timeout, t.onFailure, [
                      {
                        invocationContext: t.invocationContext,
                        errorCode: b.SUBSCRIBE_TIMEOUT.code,
                        errorMessage: _(b.SUBSCRIBE_TIMEOUT)
                      }
                    ])),
                  this._requires_ack(n),
                  this._schedule_message(n);
              }),
              (U.prototype.unsubscribe = function(e, t) {
                if ((this._trace("Client.unsubscribe", e, t), !this.connected))
                  throw new Error(_(b.INVALID_STATE, ["not connected"]));
                var n = new A(h);
                (n.topics = e.constructor === Array ? e : [e]),
                  t.onSuccess &&
                    (n.callback = function() {
                      t.onSuccess({ invocationContext: t.invocationContext });
                    }),
                  t.timeout &&
                    (n.timeOut = new x(this, t.timeout, t.onFailure, [
                      {
                        invocationContext: t.invocationContext,
                        errorCode: b.UNSUBSCRIBE_TIMEOUT.code,
                        errorMessage: _(b.UNSUBSCRIBE_TIMEOUT)
                      }
                    ])),
                  this._requires_ack(n),
                  this._schedule_message(n);
              }),
              (U.prototype.send = function(e) {
                this._trace("Client.send", e);
                var t = new A(o);
                if (((t.payloadMessage = e), this.connected))
                  e.qos > 0
                    ? this._requires_ack(t)
                    : this.onMessageDelivered &&
                      (this._notify_msg_sent[t] = this.onMessageDelivered(
                        t.payloadMessage
                      )),
                    this._schedule_message(t);
                else {
                  if (!this._reconnecting || !this.disconnectedPublishing)
                    throw new Error(_(b.INVALID_STATE, ["not connected"]));
                  if (
                    Object.keys(this._sentMessages).length +
                      this._buffered_msg_queue.length >
                    this.disconnectedBufferSize
                  )
                    throw new Error(
                      _(b.BUFFER_FULL, [this.disconnectedBufferSize])
                    );
                  e.qos > 0
                    ? this._requires_ack(t)
                    : ((t.sequence = ++this._sequence),
                      this._buffered_msg_queue.unshift(t));
                }
              }),
              (U.prototype.disconnect = function() {
                if (
                  (this._trace("Client.disconnect"),
                  this._reconnecting &&
                    (this._reconnectTimeout.cancel(),
                    (this._reconnectTimeout = null),
                    (this._reconnecting = !1)),
                  !this.socket)
                )
                  throw new Error(
                    _(b.INVALID_STATE, ["not connecting or connected"])
                  );
                var e = new A(y);
                (this._notify_msg_sent[e] = m(this._disconnected, this)),
                  this._schedule_message(e);
              }),
              (U.prototype.getTraceLog = function() {
                if (null !== this._traceBuffer) {
                  for (var e in (this._trace("Client.getTraceLog", new Date()),
                  this._trace(
                    "Client.getTraceLog in flight messages",
                    this._sentMessages.length
                  ),
                  this._sentMessages))
                    this._trace("_sentMessages ", e, this._sentMessages[e]);
                  for (var e in this._receivedMessages)
                    this._trace(
                      "_receivedMessages ",
                      e,
                      this._receivedMessages[e]
                    );
                  return this._traceBuffer;
                }
              }),
              (U.prototype.startTrace = function() {
                null === this._traceBuffer && (this._traceBuffer = []),
                  this._trace(
                    "Client.startTrace",
                    new Date(),
                    "@VERSION@-@BUILDLEVEL@"
                  );
              }),
              (U.prototype.stopTrace = function() {
                delete this._traceBuffer;
              }),
              (U.prototype._doConnect = function(e) {
                if (this.connectOptions.useSSL) {
                  var t = e.split(":");
                  (t[0] = "wss"), (e = t.join(":"));
                }
                (this._wsuri = e),
                  (this.connected = !1),
                  this.connectOptions.mqttVersion < 4
                    ? (this.socket = new WebSocket(e, ["mqttv3.1"]))
                    : (this.socket = new WebSocket(e, ["mqtt"])),
                  (this.socket.binaryType = "arraybuffer"),
                  (this.socket.onopen = m(this._on_socket_open, this)),
                  (this.socket.onmessage = m(this._on_socket_message, this)),
                  (this.socket.onerror = m(this._on_socket_error, this)),
                  (this.socket.onclose = m(this._on_socket_close, this)),
                  (this.sendPinger = new R(
                    this,
                    this.connectOptions.keepAliveInterval
                  )),
                  (this.receivePinger = new R(
                    this,
                    this.connectOptions.keepAliveInterval
                  )),
                  this._connectTimeout &&
                    (this._connectTimeout.cancel(),
                    (this._connectTimeout = null)),
                  (this._connectTimeout = new x(
                    this,
                    this.connectOptions.timeout,
                    this._disconnected,
                    [b.CONNECT_TIMEOUT.code, _(b.CONNECT_TIMEOUT)]
                  ));
              }),
              (U.prototype._schedule_message = function(e) {
                this._msg_queue.unshift(e),
                  this.connected && this._process_queue();
              }),
              (U.prototype.store = function(e, t) {
                var r = {
                  type: t.type,
                  messageIdentifier: t.messageIdentifier,
                  version: 1
                };
                switch (t.type) {
                  case o:
                    t.pubRecReceived && (r.pubRecReceived = !0),
                      (r.payloadMessage = {});
                    for (
                      var i = "", s = t.payloadMessage.payloadBytes, a = 0;
                      a < s.length;
                      a++
                    )
                      s[a] <= 15
                        ? (i = i + "0" + s[a].toString(16))
                        : (i += s[a].toString(16));
                    (r.payloadMessage.payloadHex = i),
                      (r.payloadMessage.qos = t.payloadMessage.qos),
                      (r.payloadMessage.destinationName =
                        t.payloadMessage.destinationName),
                      t.payloadMessage.duplicate &&
                        (r.payloadMessage.duplicate = !0),
                      t.payloadMessage.retained &&
                        (r.payloadMessage.retained = !0),
                      0 === e.indexOf("Sent:") &&
                        (void 0 === t.sequence &&
                          (t.sequence = ++this._sequence),
                        (r.sequence = t.sequence));
                    break;
                  default:
                    throw Error(
                      _(b.INVALID_STORED_DATA, [
                        e + this._localKey + t.messageIdentifier,
                        r
                      ])
                    );
                }
                n.setItem(
                  e + this._localKey + t.messageIdentifier,
                  JSON.stringify(r)
                );
              }),
              (U.prototype.restore = function(e) {
                var t = n.getItem(e),
                  r = JSON.parse(t),
                  i = new A(r.type, r);
                switch (r.type) {
                  case o:
                    for (
                      var s = r.payloadMessage.payloadHex,
                        a = new ArrayBuffer(s.length / 2),
                        u = new Uint8Array(a),
                        c = 0;
                      s.length >= 2;

                    ) {
                      var f = parseInt(s.substring(0, 2), 16);
                      (s = s.substring(2, s.length)), (u[c++] = f);
                    }
                    var l = new D(u);
                    (l.qos = r.payloadMessage.qos),
                      (l.destinationName = r.payloadMessage.destinationName),
                      r.payloadMessage.duplicate && (l.duplicate = !0),
                      r.payloadMessage.retained && (l.retained = !0),
                      (i.payloadMessage = l);
                    break;
                  default:
                    throw Error(_(b.INVALID_STORED_DATA, [e, t]));
                }
                0 === e.indexOf("Sent:" + this._localKey)
                  ? ((i.payloadMessage.duplicate = !0),
                    (this._sentMessages[i.messageIdentifier] = i))
                  : 0 === e.indexOf("Received:" + this._localKey) &&
                    (this._receivedMessages[i.messageIdentifier] = i);
              }),
              (U.prototype._process_queue = function() {
                for (var e = null; (e = this._msg_queue.pop()); )
                  this._socket_send(e),
                    this._notify_msg_sent[e] &&
                      (this._notify_msg_sent[e](),
                      delete this._notify_msg_sent[e]);
              }),
              (U.prototype._requires_ack = function(e) {
                var t = Object.keys(this._sentMessages).length;
                if (t > this.maxMessageIdentifier)
                  throw Error("Too many messages:" + t);
                for (
                  ;
                  void 0 !== this._sentMessages[this._message_identifier];

                )
                  this._message_identifier++;
                (e.messageIdentifier = this._message_identifier),
                  (this._sentMessages[e.messageIdentifier] = e),
                  e.type === o && this.store("Sent:", e),
                  this._message_identifier === this.maxMessageIdentifier &&
                    (this._message_identifier = 1);
              }),
              (U.prototype._on_socket_open = function() {
                var e = new A(r, this.connectOptions);
                (e.clientId = this.clientId), this._socket_send(e);
              }),
              (U.prototype._on_socket_message = function(e) {
                this._trace("Client._on_socket_message", e.data);
                for (
                  var t = this._deframeMessages(e.data), n = 0;
                  n < t.length;
                  n += 1
                )
                  this._handleMessage(t[n]);
              }),
              (U.prototype._deframeMessages = function(e) {
                var t = new Uint8Array(e),
                  n = [];
                if (this.receiveBuffer) {
                  var r = new Uint8Array(this.receiveBuffer.length + t.length);
                  r.set(this.receiveBuffer),
                    r.set(t, this.receiveBuffer.length),
                    (t = r),
                    delete this.receiveBuffer;
                }
                try {
                  for (var i = 0; i < t.length; ) {
                    var o = I(t, i),
                      s = o[0];
                    if (((i = o[1]), null === s)) break;
                    n.push(s);
                  }
                  i < t.length && (this.receiveBuffer = t.subarray(i));
                } catch (e) {
                  var a =
                    "undefined" == e.hasOwnProperty("stack")
                      ? e.stack.toString()
                      : "No Error Stack Available";
                  return void this._disconnected(
                    b.INTERNAL_ERROR.code,
                    _(b.INTERNAL_ERROR, [e.message, a])
                  );
                }
                return n;
              }),
              (U.prototype._handleMessage = function(e) {
                this._trace("Client._handleMessage", e);
                try {
                  switch (e.type) {
                    case i:
                      if (
                        (this._connectTimeout.cancel(),
                        this._reconnectTimeout &&
                          this._reconnectTimeout.cancel(),
                        this.connectOptions.cleanSession)
                      ) {
                        for (var t in this._sentMessages) {
                          var r = this._sentMessages[t];
                          n.removeItem(
                            "Sent:" + this._localKey + r.messageIdentifier
                          );
                        }
                        for (var t in ((this._sentMessages = {}),
                        this._receivedMessages)) {
                          var f = this._receivedMessages[t];
                          n.removeItem(
                            "Received:" + this._localKey + f.messageIdentifier
                          );
                        }
                        this._receivedMessages = {};
                      }
                      if (0 !== e.returnCode) {
                        this._disconnected(
                          b.CONNACK_RETURNCODE.code,
                          _(b.CONNACK_RETURNCODE, [
                            e.returnCode,
                            w[e.returnCode]
                          ])
                        );
                        break;
                      }
                      (this.connected = !0),
                        this.connectOptions.uris &&
                          (this.hostIndex = this.connectOptions.uris.length);
                      var h = [];
                      for (var p in this._sentMessages)
                        this._sentMessages.hasOwnProperty(p) &&
                          h.push(this._sentMessages[p]);
                      if (this._buffered_msg_queue.length > 0)
                        for (
                          var v = null;
                          (v = this._buffered_msg_queue.pop());

                        )
                          h.push(v),
                            this.onMessageDelivered &&
                              (this._notify_msg_sent[
                                v
                              ] = this.onMessageDelivered(v.payloadMessage));
                      h = h.sort(function(e, t) {
                        return e.sequence - t.sequence;
                      });
                      for (var m = 0, S = h.length; m < S; m++)
                        if ((r = h[m]).type == o && r.pubRecReceived) {
                          var E = new A(u, {
                            messageIdentifier: r.messageIdentifier
                          });
                          this._schedule_message(E);
                        } else this._schedule_message(r);
                      this.connectOptions.onSuccess &&
                        this.connectOptions.onSuccess({
                          invocationContext: this.connectOptions
                            .invocationContext
                        });
                      var I = !1;
                      this._reconnecting &&
                        ((I = !0),
                        (this._reconnectInterval = 1),
                        (this._reconnecting = !1)),
                        this._connected(I, this._wsuri),
                        this._process_queue();
                      break;
                    case o:
                      this._receivePublish(e);
                      break;
                    case s:
                      (r = this._sentMessages[e.messageIdentifier]) &&
                        (delete this._sentMessages[e.messageIdentifier],
                        n.removeItem(
                          "Sent:" + this._localKey + e.messageIdentifier
                        ),
                        this.onMessageDelivered &&
                          this.onMessageDelivered(r.payloadMessage));
                      break;
                    case a:
                      (r = this._sentMessages[e.messageIdentifier]) &&
                        ((r.pubRecReceived = !0),
                        (E = new A(u, {
                          messageIdentifier: e.messageIdentifier
                        })),
                        this.store("Sent:", r),
                        this._schedule_message(E));
                      break;
                    case u:
                      (f = this._receivedMessages[e.messageIdentifier]),
                        n.removeItem(
                          "Received:" + this._localKey + e.messageIdentifier
                        ),
                        f &&
                          (this._receiveMessage(f),
                          delete this._receivedMessages[e.messageIdentifier]);
                      var T = new A(c, {
                        messageIdentifier: e.messageIdentifier
                      });
                      this._schedule_message(T);
                      break;
                    case c:
                      (r = this._sentMessages[e.messageIdentifier]),
                        delete this._sentMessages[e.messageIdentifier],
                        n.removeItem(
                          "Sent:" + this._localKey + e.messageIdentifier
                        ),
                        this.onMessageDelivered &&
                          this.onMessageDelivered(r.payloadMessage);
                      break;
                    case l:
                      (r = this._sentMessages[e.messageIdentifier]) &&
                        (r.timeOut && r.timeOut.cancel(),
                        128 === e.returnCode[0]
                          ? r.onFailure && r.onFailure(e.returnCode)
                          : r.onSuccess && r.onSuccess(e.returnCode),
                        delete this._sentMessages[e.messageIdentifier]);
                      break;
                    case d:
                      (r = this._sentMessages[e.messageIdentifier]) &&
                        (r.timeOut && r.timeOut.cancel(),
                        r.callback && r.callback(),
                        delete this._sentMessages[e.messageIdentifier]);
                      break;
                    case g:
                      this.sendPinger.reset();
                      break;
                    case y:
                      this._disconnected(
                        b.INVALID_MQTT_MESSAGE_TYPE.code,
                        _(b.INVALID_MQTT_MESSAGE_TYPE, [e.type])
                      );
                      break;
                    default:
                      this._disconnected(
                        b.INVALID_MQTT_MESSAGE_TYPE.code,
                        _(b.INVALID_MQTT_MESSAGE_TYPE, [e.type])
                      );
                  }
                } catch (e) {
                  var C =
                    "undefined" == e.hasOwnProperty("stack")
                      ? e.stack.toString()
                      : "No Error Stack Available";
                  return void this._disconnected(
                    b.INTERNAL_ERROR.code,
                    _(b.INTERNAL_ERROR, [e.message, C])
                  );
                }
              }),
              (U.prototype._on_socket_error = function(e) {
                this._reconnecting ||
                  this._disconnected(
                    b.SOCKET_ERROR.code,
                    _(b.SOCKET_ERROR, [e.data])
                  );
              }),
              (U.prototype._on_socket_close = function() {
                this._reconnecting ||
                  this._disconnected(b.SOCKET_CLOSE.code, _(b.SOCKET_CLOSE));
              }),
              (U.prototype._socket_send = function(e) {
                if (1 == e.type) {
                  var t = this._traceMask(e, "password");
                  this._trace("Client._socket_send", t);
                } else this._trace("Client._socket_send", e);
                this.socket.send(e.encode()), this.sendPinger.reset();
              }),
              (U.prototype._receivePublish = function(e) {
                switch (e.payloadMessage.qos) {
                  case "undefined":
                  case 0:
                    this._receiveMessage(e);
                    break;
                  case 1:
                    var t = new A(s, {
                      messageIdentifier: e.messageIdentifier
                    });
                    this._schedule_message(t), this._receiveMessage(e);
                    break;
                  case 2:
                    (this._receivedMessages[e.messageIdentifier] = e),
                      this.store("Received:", e);
                    var n = new A(a, {
                      messageIdentifier: e.messageIdentifier
                    });
                    this._schedule_message(n);
                    break;
                  default:
                    throw Error("Invaild qos=" + e.payloadMessage.qos);
                }
              }),
              (U.prototype._receiveMessage = function(e) {
                this.onMessageArrived &&
                  this.onMessageArrived(e.payloadMessage);
              }),
              (U.prototype._connected = function(e, t) {
                this.onConnected && this.onConnected(e, t);
              }),
              (U.prototype._reconnect = function() {
                this._trace("Client._reconnect"),
                  this.connected ||
                    ((this._reconnecting = !0),
                    this.sendPinger.cancel(),
                    this.receivePinger.cancel(),
                    this._reconnectInterval < 128 &&
                      (this._reconnectInterval = 2 * this._reconnectInterval),
                    this.connectOptions.uris
                      ? ((this.hostIndex = 0),
                        this._doConnect(this.connectOptions.uris[0]))
                      : this._doConnect(this.uri));
              }),
              (U.prototype._disconnected = function(e, t) {
                if (
                  (this._trace("Client._disconnected", e, t),
                  void 0 !== e && this._reconnecting)
                )
                  this._reconnectTimeout = new x(
                    this,
                    this._reconnectInterval,
                    this._reconnect
                  );
                else if (
                  (this.sendPinger.cancel(),
                  this.receivePinger.cancel(),
                  this._connectTimeout &&
                    (this._connectTimeout.cancel(),
                    (this._connectTimeout = null)),
                  (this._msg_queue = []),
                  (this._buffered_msg_queue = []),
                  (this._notify_msg_sent = {}),
                  this.socket &&
                    ((this.socket.onopen = null),
                    (this.socket.onmessage = null),
                    (this.socket.onerror = null),
                    (this.socket.onclose = null),
                    1 === this.socket.readyState && this.socket.close(),
                    delete this.socket),
                  this.connectOptions.uris &&
                    this.hostIndex < this.connectOptions.uris.length - 1)
                )
                  this.hostIndex++,
                    this._doConnect(this.connectOptions.uris[this.hostIndex]);
                else if (
                  (void 0 === e && ((e = b.OK.code), (t = _(b.OK))),
                  this.connected)
                ) {
                  if (
                    ((this.connected = !1),
                    this.onConnectionLost &&
                      this.onConnectionLost({
                        errorCode: e,
                        errorMessage: t,
                        reconnect: this.connectOptions.reconnect,
                        uri: this._wsuri
                      }),
                    e !== b.OK.code && this.connectOptions.reconnect)
                  )
                    return (
                      (this._reconnectInterval = 1), void this._reconnect()
                    );
                } else
                  4 === this.connectOptions.mqttVersion &&
                  !1 === this.connectOptions.mqttVersionExplicit
                    ? (this._trace("Failed to connect V4, dropping back to V3"),
                      (this.connectOptions.mqttVersion = 3),
                      this.connectOptions.uris
                        ? ((this.hostIndex = 0),
                          this._doConnect(this.connectOptions.uris[0]))
                        : this._doConnect(this.uri))
                    : this.connectOptions.onFailure &&
                      this.connectOptions.onFailure({
                        invocationContext: this.connectOptions
                          .invocationContext,
                        errorCode: e,
                        errorMessage: t
                      });
              }),
              (U.prototype._trace = function() {
                if (this.traceFunction) {
                  var e = Array.prototype.slice.call(arguments);
                  for (var t in e)
                    void 0 !== e[t] && e.splice(t, 1, JSON.stringify(e[t]));
                  var n = e.join("");
                  this.traceFunction({ severity: "Debug", message: n });
                }
                if (null !== this._traceBuffer) {
                  t = 0;
                  for (var r = arguments.length; t < r; t++)
                    this._traceBuffer.length == this._MAX_TRACE_ENTRIES &&
                      this._traceBuffer.shift(),
                      0 === t || void 0 === arguments[t]
                        ? this._traceBuffer.push(arguments[t])
                        : this._traceBuffer.push(
                            "  " + JSON.stringify(arguments[t])
                          );
                }
              }),
              (U.prototype._traceMask = function(e, t) {
                var n = {};
                for (var r in e)
                  e.hasOwnProperty(r) && (n[r] = r == t ? "******" : e[r]);
                return n;
              });
            var D = function(e) {
              var t, n;
              if (
                !(
                  "string" == typeof e ||
                  e instanceof ArrayBuffer ||
                  (ArrayBuffer.isView(e) && !(e instanceof DataView))
                )
              )
                throw _(b.INVALID_ARGUMENT, [e, "newPayload"]);
              t = e;
              var r = 0,
                i = !1,
                o = !1;
              Object.defineProperties(this, {
                payloadString: {
                  enumerable: !0,
                  get: function() {
                    return "string" == typeof t ? t : N(t, 0, t.length);
                  }
                },
                payloadBytes: {
                  enumerable: !0,
                  get: function() {
                    if ("string" == typeof t) {
                      var e = new ArrayBuffer(P(t)),
                        n = new Uint8Array(e);
                      return k(t, n, 0), n;
                    }
                    return t;
                  }
                },
                destinationName: {
                  enumerable: !0,
                  get: function() {
                    return n;
                  },
                  set: function(e) {
                    if ("string" != typeof e)
                      throw new Error(
                        _(b.INVALID_ARGUMENT, [e, "newDestinationName"])
                      );
                    n = e;
                  }
                },
                qos: {
                  enumerable: !0,
                  get: function() {
                    return r;
                  },
                  set: function(e) {
                    if (0 !== e && 1 !== e && 2 !== e)
                      throw new Error("Invalid argument:" + e);
                    r = e;
                  }
                },
                retained: {
                  enumerable: !0,
                  get: function() {
                    return i;
                  },
                  set: function(e) {
                    if ("boolean" != typeof e)
                      throw new Error(
                        _(b.INVALID_ARGUMENT, [e, "newRetained"])
                      );
                    i = e;
                  }
                },
                topic: {
                  enumerable: !0,
                  get: function() {
                    return n;
                  },
                  set: function(e) {
                    n = e;
                  }
                },
                duplicate: {
                  enumerable: !0,
                  get: function() {
                    return o;
                  },
                  set: function(e) {
                    o = e;
                  }
                }
              });
            };
            return {
              Client: function(e, t, n, r) {
                var i;
                if ("string" != typeof e)
                  throw new Error(_(b.INVALID_TYPE, [typeof e, "host"]));
                if (2 == arguments.length) {
                  r = t;
                  var o = (i = e).match(
                    /^(wss?):\/\/((\[(.+)\])|([^\/]+?))(:(\d+))?(\/.*)$/
                  );
                  if (!o) throw new Error(_(b.INVALID_ARGUMENT, [e, "host"]));
                  (e = o[4] || o[2]), (t = parseInt(o[7])), (n = o[8]);
                } else {
                  if (
                    (3 == arguments.length && ((r = n), (n = "/mqtt")),
                    "number" != typeof t || t < 0)
                  )
                    throw new Error(_(b.INVALID_TYPE, [typeof t, "port"]));
                  if ("string" != typeof n)
                    throw new Error(_(b.INVALID_TYPE, [typeof n, "path"]));
                  var s =
                    -1 !== e.indexOf(":") &&
                    "[" !== e.slice(0, 1) &&
                    "]" !== e.slice(-1);
                  i = "ws://" + (s ? "[" + e + "]" : e) + ":" + t + n;
                }
                for (var a = 0, u = 0; u < r.length; u++) {
                  var c = r.charCodeAt(u);
                  55296 <= c && c <= 56319 && u++, a++;
                }
                if ("string" != typeof r || a > 65535)
                  throw new Error(_(b.INVALID_ARGUMENT, [r, "clientId"]));
                var f = new U(i, e, t, n, r);
                Object.defineProperties(this, {
                  host: {
                    get: function() {
                      return e;
                    },
                    set: function() {
                      throw new Error(_(b.UNSUPPORTED_OPERATION));
                    }
                  },
                  port: {
                    get: function() {
                      return t;
                    },
                    set: function() {
                      throw new Error(_(b.UNSUPPORTED_OPERATION));
                    }
                  },
                  path: {
                    get: function() {
                      return n;
                    },
                    set: function() {
                      throw new Error(_(b.UNSUPPORTED_OPERATION));
                    }
                  },
                  uri: {
                    get: function() {
                      return i;
                    },
                    set: function() {
                      throw new Error(_(b.UNSUPPORTED_OPERATION));
                    }
                  },
                  clientId: {
                    get: function() {
                      return f.clientId;
                    },
                    set: function() {
                      throw new Error(_(b.UNSUPPORTED_OPERATION));
                    }
                  },
                  onConnected: {
                    get: function() {
                      return f.onConnected;
                    },
                    set: function(e) {
                      if ("function" != typeof e)
                        throw new Error(
                          _(b.INVALID_TYPE, [typeof e, "onConnected"])
                        );
                      f.onConnected = e;
                    }
                  },
                  disconnectedPublishing: {
                    get: function() {
                      return f.disconnectedPublishing;
                    },
                    set: function(e) {
                      f.disconnectedPublishing = e;
                    }
                  },
                  disconnectedBufferSize: {
                    get: function() {
                      return f.disconnectedBufferSize;
                    },
                    set: function(e) {
                      f.disconnectedBufferSize = e;
                    }
                  },
                  onConnectionLost: {
                    get: function() {
                      return f.onConnectionLost;
                    },
                    set: function(e) {
                      if ("function" != typeof e)
                        throw new Error(
                          _(b.INVALID_TYPE, [typeof e, "onConnectionLost"])
                        );
                      f.onConnectionLost = e;
                    }
                  },
                  onMessageDelivered: {
                    get: function() {
                      return f.onMessageDelivered;
                    },
                    set: function(e) {
                      if ("function" != typeof e)
                        throw new Error(
                          _(b.INVALID_TYPE, [typeof e, "onMessageDelivered"])
                        );
                      f.onMessageDelivered = e;
                    }
                  },
                  onMessageArrived: {
                    get: function() {
                      return f.onMessageArrived;
                    },
                    set: function(e) {
                      if ("function" != typeof e)
                        throw new Error(
                          _(b.INVALID_TYPE, [typeof e, "onMessageArrived"])
                        );
                      f.onMessageArrived = e;
                    }
                  },
                  trace: {
                    get: function() {
                      return f.traceFunction;
                    },
                    set: function(e) {
                      if ("function" != typeof e)
                        throw new Error(
                          _(b.INVALID_TYPE, [typeof e, "onTrace"])
                        );
                      f.traceFunction = e;
                    }
                  }
                }),
                  (this.connect = function(e) {
                    if (
                      (v((e = e || {}), {
                        timeout: "number",
                        userName: "string",
                        password: "string",
                        willMessage: "object",
                        keepAliveInterval: "number",
                        cleanSession: "boolean",
                        useSSL: "boolean",
                        invocationContext: "object",
                        onSuccess: "function",
                        onFailure: "function",
                        hosts: "object",
                        ports: "object",
                        reconnect: "boolean",
                        mqttVersion: "number",
                        mqttVersionExplicit: "boolean",
                        uris: "object"
                      }),
                      void 0 === e.keepAliveInterval &&
                        (e.keepAliveInterval = 60),
                      e.mqttVersion > 4 || e.mqttVersion < 3)
                    )
                      throw new Error(
                        _(b.INVALID_ARGUMENT, [
                          e.mqttVersion,
                          "connectOptions.mqttVersion"
                        ])
                      );
                    if (
                      (void 0 === e.mqttVersion
                        ? ((e.mqttVersionExplicit = !1), (e.mqttVersion = 4))
                        : (e.mqttVersionExplicit = !0),
                      void 0 !== e.password && void 0 === e.userName)
                    )
                      throw new Error(
                        _(b.INVALID_ARGUMENT, [
                          e.password,
                          "connectOptions.password"
                        ])
                      );
                    if (e.willMessage) {
                      if (!(e.willMessage instanceof D))
                        throw new Error(
                          _(b.INVALID_TYPE, [
                            e.willMessage,
                            "connectOptions.willMessage"
                          ])
                        );
                      if (
                        ((e.willMessage.stringPayload = null),
                        void 0 === e.willMessage.destinationName)
                      )
                        throw new Error(
                          _(b.INVALID_TYPE, [
                            typeof e.willMessage.destinationName,
                            "connectOptions.willMessage.destinationName"
                          ])
                        );
                    }
                    if (
                      (void 0 === e.cleanSession && (e.cleanSession = !0),
                      e.hosts)
                    ) {
                      if (!(e.hosts instanceof Array))
                        throw new Error(
                          _(b.INVALID_ARGUMENT, [
                            e.hosts,
                            "connectOptions.hosts"
                          ])
                        );
                      if (e.hosts.length < 1)
                        throw new Error(
                          _(b.INVALID_ARGUMENT, [
                            e.hosts,
                            "connectOptions.hosts"
                          ])
                        );
                      for (var t = !1, r = 0; r < e.hosts.length; r++) {
                        if ("string" != typeof e.hosts[r])
                          throw new Error(
                            _(b.INVALID_TYPE, [
                              typeof e.hosts[r],
                              "connectOptions.hosts[" + r + "]"
                            ])
                          );
                        if (
                          /^(wss?):\/\/((\[(.+)\])|([^\/]+?))(:(\d+))?(\/.*)$/.test(
                            e.hosts[r]
                          )
                        ) {
                          if (0 === r) t = !0;
                          else if (!t)
                            throw new Error(
                              _(b.INVALID_ARGUMENT, [
                                e.hosts[r],
                                "connectOptions.hosts[" + r + "]"
                              ])
                            );
                        } else if (t)
                          throw new Error(
                            _(b.INVALID_ARGUMENT, [
                              e.hosts[r],
                              "connectOptions.hosts[" + r + "]"
                            ])
                          );
                      }
                      if (t) e.uris = e.hosts;
                      else {
                        if (!e.ports)
                          throw new Error(
                            _(b.INVALID_ARGUMENT, [
                              e.ports,
                              "connectOptions.ports"
                            ])
                          );
                        if (!(e.ports instanceof Array))
                          throw new Error(
                            _(b.INVALID_ARGUMENT, [
                              e.ports,
                              "connectOptions.ports"
                            ])
                          );
                        if (e.hosts.length !== e.ports.length)
                          throw new Error(
                            _(b.INVALID_ARGUMENT, [
                              e.ports,
                              "connectOptions.ports"
                            ])
                          );
                        for (e.uris = [], r = 0; r < e.hosts.length; r++) {
                          if ("number" != typeof e.ports[r] || e.ports[r] < 0)
                            throw new Error(
                              _(b.INVALID_TYPE, [
                                typeof e.ports[r],
                                "connectOptions.ports[" + r + "]"
                              ])
                            );
                          var o = e.hosts[r],
                            s = e.ports[r],
                            a = -1 !== o.indexOf(":");
                          (i = "ws://" + (a ? "[" + o + "]" : o) + ":" + s + n),
                            e.uris.push(i);
                        }
                      }
                    }
                    f.connect(e);
                  }),
                  (this.subscribe = function(e, t) {
                    if ("string" != typeof e && e.constructor !== Array)
                      throw new Error("Invalid argument:" + e);
                    if (
                      (v((t = t || {}), {
                        qos: "number",
                        invocationContext: "object",
                        onSuccess: "function",
                        onFailure: "function",
                        timeout: "number"
                      }),
                      t.timeout && !t.onFailure)
                    )
                      throw new Error(
                        "subscribeOptions.timeout specified with no onFailure callback."
                      );
                    if (
                      void 0 !== t.qos &&
                      0 !== t.qos &&
                      1 !== t.qos &&
                      2 !== t.qos
                    )
                      throw new Error(
                        _(b.INVALID_ARGUMENT, [t.qos, "subscribeOptions.qos"])
                      );
                    f.subscribe(e, t);
                  }),
                  (this.unsubscribe = function(e, t) {
                    if ("string" != typeof e && e.constructor !== Array)
                      throw new Error("Invalid argument:" + e);
                    if (
                      (v((t = t || {}), {
                        invocationContext: "object",
                        onSuccess: "function",
                        onFailure: "function",
                        timeout: "number"
                      }),
                      t.timeout && !t.onFailure)
                    )
                      throw new Error(
                        "unsubscribeOptions.timeout specified with no onFailure callback."
                      );
                    f.unsubscribe(e, t);
                  }),
                  (this.send = function(e, t, n, r) {
                    var i;
                    if (0 === arguments.length)
                      throw new Error("Invalid argument.length");
                    if (1 == arguments.length) {
                      if (!(e instanceof D) && "string" != typeof e)
                        throw new Error("Invalid argument:" + typeof e);
                      if (void 0 === (i = e).destinationName)
                        throw new Error(
                          _(b.INVALID_ARGUMENT, [
                            i.destinationName,
                            "Message.destinationName"
                          ])
                        );
                      f.send(i);
                    } else
                      ((i = new D(t)).destinationName = e),
                        arguments.length >= 3 && (i.qos = n),
                        arguments.length >= 4 && (i.retained = r),
                        f.send(i);
                  }),
                  (this.publish = function(e, t, n, r) {
                    var i;
                    if (0 === arguments.length)
                      throw new Error("Invalid argument.length");
                    if (1 == arguments.length) {
                      if (!(e instanceof D) && "string" != typeof e)
                        throw new Error("Invalid argument:" + typeof e);
                      if (void 0 === (i = e).destinationName)
                        throw new Error(
                          _(b.INVALID_ARGUMENT, [
                            i.destinationName,
                            "Message.destinationName"
                          ])
                        );
                      f.send(i);
                    } else
                      ((i = new D(t)).destinationName = e),
                        arguments.length >= 3 && (i.qos = n),
                        arguments.length >= 4 && (i.retained = r),
                        f.send(i);
                  }),
                  (this.disconnect = function() {
                    f.disconnect();
                  }),
                  (this.getTraceLog = function() {
                    return f.getTraceLog();
                  }),
                  (this.startTrace = function() {
                    f.startTrace();
                  }),
                  (this.stopTrace = function() {
                    f.stopTrace();
                  }),
                  (this.isConnected = function() {
                    return f.connected;
                  });
              },
              Message: D
            };
          })(
            void 0 !== t
              ? t
              : "undefined" != typeof self
              ? self
              : "undefined" != typeof window
              ? window
              : {}
          );
        }),
          (e.exports = n());
      }.call(this, n(15)));
    },
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    function(e, t, n) {
      "use strict";
      (t.byteLength = function(e) {
        var t = c(e),
          n = t[0],
          r = t[1];
        return (3 * (n + r)) / 4 - r;
      }),
        (t.toByteArray = function(e) {
          var t,
            n,
            r = c(e),
            s = r[0],
            a = r[1],
            u = new o(
              (function(e, t, n) {
                return (3 * (t + n)) / 4 - n;
              })(0, s, a)
            ),
            f = 0,
            l = a > 0 ? s - 4 : s;
          for (n = 0; n < l; n += 4)
            (t =
              (i[e.charCodeAt(n)] << 18) |
              (i[e.charCodeAt(n + 1)] << 12) |
              (i[e.charCodeAt(n + 2)] << 6) |
              i[e.charCodeAt(n + 3)]),
              (u[f++] = (t >> 16) & 255),
              (u[f++] = (t >> 8) & 255),
              (u[f++] = 255 & t);
          2 === a &&
            ((t = (i[e.charCodeAt(n)] << 2) | (i[e.charCodeAt(n + 1)] >> 4)),
            (u[f++] = 255 & t));
          1 === a &&
            ((t =
              (i[e.charCodeAt(n)] << 10) |
              (i[e.charCodeAt(n + 1)] << 4) |
              (i[e.charCodeAt(n + 2)] >> 2)),
            (u[f++] = (t >> 8) & 255),
            (u[f++] = 255 & t));
          return u;
        }),
        (t.fromByteArray = function(e) {
          for (
            var t, n = e.length, i = n % 3, o = [], s = 0, a = n - i;
            s < a;
            s += 16383
          )
            o.push(f(e, s, s + 16383 > a ? a : s + 16383));
          1 === i
            ? ((t = e[n - 1]), o.push(r[t >> 2] + r[(t << 4) & 63] + "=="))
            : 2 === i &&
              ((t = (e[n - 2] << 8) + e[n - 1]),
              o.push(r[t >> 10] + r[(t >> 4) & 63] + r[(t << 2) & 63] + "="));
          return o.join("");
        });
      for (
        var r = [],
          i = [],
          o = "undefined" != typeof Uint8Array ? Uint8Array : Array,
          s =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
          a = 0,
          u = s.length;
        a < u;
        ++a
      )
        (r[a] = s[a]), (i[s.charCodeAt(a)] = a);
      function c(e) {
        var t = e.length;
        if (t % 4 > 0)
          throw new Error("Invalid string. Length must be a multiple of 4");
        var n = e.indexOf("=");
        return -1 === n && (n = t), [n, n === t ? 0 : 4 - (n % 4)];
      }
      function f(e, t, n) {
        for (var i, o, s = [], a = t; a < n; a += 3)
          (i =
            ((e[a] << 16) & 16711680) +
            ((e[a + 1] << 8) & 65280) +
            (255 & e[a + 2])),
            s.push(
              r[((o = i) >> 18) & 63] +
                r[(o >> 12) & 63] +
                r[(o >> 6) & 63] +
                r[63 & o]
            );
        return s.join("");
      }
      (i["-".charCodeAt(0)] = 62), (i["_".charCodeAt(0)] = 63);
    },
    function(e, t) {
      (t.read = function(e, t, n, r, i) {
        var o,
          s,
          a = 8 * i - r - 1,
          u = (1 << a) - 1,
          c = u >> 1,
          f = -7,
          l = n ? i - 1 : 0,
          h = n ? -1 : 1,
          d = e[t + l];
        for (
          l += h, o = d & ((1 << -f) - 1), d >>= -f, f += a;
          f > 0;
          o = 256 * o + e[t + l], l += h, f -= 8
        );
        for (
          s = o & ((1 << -f) - 1), o >>= -f, f += r;
          f > 0;
          s = 256 * s + e[t + l], l += h, f -= 8
        );
        if (0 === o) o = 1 - c;
        else {
          if (o === u) return s ? NaN : (1 / 0) * (d ? -1 : 1);
          (s += Math.pow(2, r)), (o -= c);
        }
        return (d ? -1 : 1) * s * Math.pow(2, o - r);
      }),
        (t.write = function(e, t, n, r, i, o) {
          var s,
            a,
            u,
            c = 8 * o - i - 1,
            f = (1 << c) - 1,
            l = f >> 1,
            h = 23 === i ? Math.pow(2, -24) - Math.pow(2, -77) : 0,
            d = r ? 0 : o - 1,
            p = r ? 1 : -1,
            g = t < 0 || (0 === t && 1 / t < 0) ? 1 : 0;
          for (
            t = Math.abs(t),
              isNaN(t) || t === 1 / 0
                ? ((a = isNaN(t) ? 1 : 0), (s = f))
                : ((s = Math.floor(Math.log(t) / Math.LN2)),
                  t * (u = Math.pow(2, -s)) < 1 && (s--, (u *= 2)),
                  (t += s + l >= 1 ? h / u : h * Math.pow(2, 1 - l)) * u >= 2 &&
                    (s++, (u /= 2)),
                  s + l >= f
                    ? ((a = 0), (s = f))
                    : s + l >= 1
                    ? ((a = (t * u - 1) * Math.pow(2, i)), (s += l))
                    : ((a = t * Math.pow(2, l - 1) * Math.pow(2, i)), (s = 0)));
            i >= 8;
            e[n + d] = 255 & a, d += p, a /= 256, i -= 8
          );
          for (
            s = (s << i) | a, c += i;
            c > 0;
            e[n + d] = 255 & s, d += p, s /= 256, c -= 8
          );
          e[n + d - p] |= 128 * g;
        });
    },
    function(e, t) {
      var n = {}.toString;
      e.exports =
        Array.isArray ||
        function(e) {
          return "[object Array]" == n.call(e);
        };
    },
    function(e, t, n) {
      var r, i, o, s;
      e.exports =
        ((r = n(2)),
        (o = (i = r).lib.Base),
        (s = i.enc.Utf8),
        void (i.algo.HMAC = o.extend({
          init: function(e, t) {
            (e = this._hasher = new e.init()),
              "string" == typeof t && (t = s.parse(t));
            var n = e.blockSize,
              r = 4 * n;
            t.sigBytes > r && (t = e.finalize(t)), t.clamp();
            for (
              var i = (this._oKey = t.clone()),
                o = (this._iKey = t.clone()),
                a = i.words,
                u = o.words,
                c = 0;
              c < n;
              c++
            )
              (a[c] ^= 1549556828), (u[c] ^= 909522486);
            (i.sigBytes = o.sigBytes = r), this.reset();
          },
          reset: function() {
            var e = this._hasher;
            e.reset(), e.update(this._iKey);
          },
          update: function(e) {
            return this._hasher.update(e), this;
          },
          finalize: function(e) {
            var t = this._hasher,
              n = t.finalize(e);
            return t.reset(), t.finalize(this._oKey.clone().concat(n));
          }
        })));
    },
    function(e, t, n) {
      e.exports = window.fetch || (window.fetch = n(21).default || n(21));
    },
    function(e, t, n) {
      (function(e, r) {
        var i;
        /*! https://mths.be/punycode v1.4.1 by @mathias */ !(function(o) {
          t && t.nodeType, e && e.nodeType;
          var s = "object" == typeof r && r;
          s.global !== s && s.window !== s && s.self;
          var a,
            u = 2147483647,
            c = /^xn--/,
            f = /[^\x20-\x7E]/,
            l = /[\x2E\u3002\uFF0E\uFF61]/g,
            h = {
              overflow: "Overflow: input needs wider integers to process",
              "not-basic": "Illegal input >= 0x80 (not a basic code point)",
              "invalid-input": "Invalid input"
            },
            d = Math.floor,
            p = String.fromCharCode;
          function g(e) {
            throw new RangeError(h[e]);
          }
          function y(e, t) {
            for (var n = e.length, r = []; n--; ) r[n] = t(e[n]);
            return r;
          }
          function v(e, t) {
            var n = e.split("@"),
              r = "";
            return (
              n.length > 1 && ((r = n[0] + "@"), (e = n[1])),
              r + y((e = e.replace(l, ".")).split("."), t).join(".")
            );
          }
          function m(e) {
            for (var t, n, r = [], i = 0, o = e.length; i < o; )
              (t = e.charCodeAt(i++)) >= 55296 && t <= 56319 && i < o
                ? 56320 == (64512 & (n = e.charCodeAt(i++)))
                  ? r.push(((1023 & t) << 10) + (1023 & n) + 65536)
                  : (r.push(t), i--)
                : r.push(t);
            return r;
          }
          function b(e) {
            return y(e, function(e) {
              var t = "";
              return (
                e > 65535 &&
                  ((t += p((((e -= 65536) >>> 10) & 1023) | 55296)),
                  (e = 56320 | (1023 & e))),
                (t += p(e))
              );
            }).join("");
          }
          function w(e, t) {
            return e + 22 + 75 * (e < 26) - ((0 != t) << 5);
          }
          function _(e, t, n) {
            var r = 0;
            for (e = n ? d(e / 700) : e >> 1, e += d(e / t); e > 455; r += 36)
              e = d(e / 35);
            return d(r + (36 * e) / (e + 38));
          }
          function S(e) {
            var t,
              n,
              r,
              i,
              o,
              s,
              a,
              c,
              f,
              l,
              h,
              p = [],
              y = e.length,
              v = 0,
              m = 128,
              w = 72;
            for ((n = e.lastIndexOf("-")) < 0 && (n = 0), r = 0; r < n; ++r)
              e.charCodeAt(r) >= 128 && g("not-basic"), p.push(e.charCodeAt(r));
            for (i = n > 0 ? n + 1 : 0; i < y; ) {
              for (
                o = v, s = 1, a = 36;
                i >= y && g("invalid-input"),
                  ((c =
                    (h = e.charCodeAt(i++)) - 48 < 10
                      ? h - 22
                      : h - 65 < 26
                      ? h - 65
                      : h - 97 < 26
                      ? h - 97
                      : 36) >= 36 ||
                    c > d((u - v) / s)) &&
                    g("overflow"),
                  (v += c * s),
                  !(c < (f = a <= w ? 1 : a >= w + 26 ? 26 : a - w));
                a += 36
              )
                s > d(u / (l = 36 - f)) && g("overflow"), (s *= l);
              (w = _(v - o, (t = p.length + 1), 0 == o)),
                d(v / t) > u - m && g("overflow"),
                (m += d(v / t)),
                (v %= t),
                p.splice(v++, 0, m);
            }
            return b(p);
          }
          function E(e) {
            var t,
              n,
              r,
              i,
              o,
              s,
              a,
              c,
              f,
              l,
              h,
              y,
              v,
              b,
              S,
              E = [];
            for (
              y = (e = m(e)).length, t = 128, n = 0, o = 72, s = 0;
              s < y;
              ++s
            )
              (h = e[s]) < 128 && E.push(p(h));
            for (r = i = E.length, i && E.push("-"); r < y; ) {
              for (a = u, s = 0; s < y; ++s)
                (h = e[s]) >= t && h < a && (a = h);
              for (
                a - t > d((u - n) / (v = r + 1)) && g("overflow"),
                  n += (a - t) * v,
                  t = a,
                  s = 0;
                s < y;
                ++s
              )
                if (((h = e[s]) < t && ++n > u && g("overflow"), h == t)) {
                  for (
                    c = n, f = 36;
                    !(c < (l = f <= o ? 1 : f >= o + 26 ? 26 : f - o));
                    f += 36
                  )
                    (S = c - l),
                      (b = 36 - l),
                      E.push(p(w(l + (S % b), 0))),
                      (c = d(S / b));
                  E.push(p(w(c, 0))), (o = _(n, v, r == i)), (n = 0), ++r;
                }
              ++n, ++t;
            }
            return E.join("");
          }
          (a = {
            version: "1.4.1",
            ucs2: { decode: m, encode: b },
            decode: S,
            encode: E,
            toASCII: function(e) {
              return v(e, function(e) {
                return f.test(e) ? "xn--" + E(e) : e;
              });
            },
            toUnicode: function(e) {
              return v(e, function(e) {
                return c.test(e) ? S(e.slice(4).toLowerCase()) : e;
              });
            }
          }),
            void 0 ===
              (i = function() {
                return a;
              }.call(t, n, t, e)) || (e.exports = i);
        })();
      }.call(this, n(59)(e), n(15)));
    },
    function(e, t) {
      e.exports = function(e) {
        return (
          e.webpackPolyfill ||
            ((e.deprecate = function() {}),
            (e.paths = []),
            e.children || (e.children = []),
            Object.defineProperty(e, "loaded", {
              enumerable: !0,
              get: function() {
                return e.l;
              }
            }),
            Object.defineProperty(e, "id", {
              enumerable: !0,
              get: function() {
                return e.i;
              }
            }),
            (e.webpackPolyfill = 1)),
          e
        );
      };
    },
    function(e, t, n) {
      "use strict";
      e.exports = {
        isString: function(e) {
          return "string" == typeof e;
        },
        isObject: function(e) {
          return "object" == typeof e && null !== e;
        },
        isNull: function(e) {
          return null === e;
        },
        isNullOrUndefined: function(e) {
          return null == e;
        }
      };
    },
    function(e, t, n) {
      "use strict";
      (t.decode = t.parse = n(62)), (t.encode = t.stringify = n(63));
    },
    function(e, t, n) {
      "use strict";
      function r(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t);
      }
      e.exports = function(e, t, n, o) {
        (t = t || "&"), (n = n || "=");
        var s = {};
        if ("string" != typeof e || 0 === e.length) return s;
        var a = /\+/g;
        e = e.split(t);
        var u = 1e3;
        o && "number" == typeof o.maxKeys && (u = o.maxKeys);
        var c = e.length;
        u > 0 && c > u && (c = u);
        for (var f = 0; f < c; ++f) {
          var l,
            h,
            d,
            p,
            g = e[f].replace(a, "%20"),
            y = g.indexOf(n);
          y >= 0
            ? ((l = g.substr(0, y)), (h = g.substr(y + 1)))
            : ((l = g), (h = "")),
            (d = decodeURIComponent(l)),
            (p = decodeURIComponent(h)),
            r(s, d)
              ? i(s[d])
                ? s[d].push(p)
                : (s[d] = [s[d], p])
              : (s[d] = p);
        }
        return s;
      };
      var i =
        Array.isArray ||
        function(e) {
          return "[object Array]" === Object.prototype.toString.call(e);
        };
    },
    function(e, t, n) {
      "use strict";
      var r = function(e) {
        switch (typeof e) {
          case "string":
            return e;
          case "boolean":
            return e ? "true" : "false";
          case "number":
            return isFinite(e) ? e : "";
          default:
            return "";
        }
      };
      e.exports = function(e, t, n, a) {
        return (
          (t = t || "&"),
          (n = n || "="),
          null === e && (e = void 0),
          "object" == typeof e
            ? o(s(e), function(s) {
                var a = encodeURIComponent(r(s)) + n;
                return i(e[s])
                  ? o(e[s], function(e) {
                      return a + encodeURIComponent(r(e));
                    }).join(t)
                  : a + encodeURIComponent(r(e[s]));
              }).join(t)
            : a
            ? encodeURIComponent(r(a)) + n + encodeURIComponent(r(e))
            : ""
        );
      };
      var i =
        Array.isArray ||
        function(e) {
          return "[object Array]" === Object.prototype.toString.call(e);
        };
      function o(e, t) {
        if (e.map) return e.map(t);
        for (var n = [], r = 0; r < e.length; r++) n.push(t(e[r], r));
        return n;
      }
      var s =
        Object.keys ||
        function(e) {
          var t = [];
          for (var n in e)
            Object.prototype.hasOwnProperty.call(e, n) && t.push(n);
          return t;
        };
    },
    function(e, t, n) {
      var r,
        i,
        o = n(23),
        s = n(24),
        a = 0,
        u = 0;
      e.exports = function(e, t, n) {
        var c = (t && n) || 0,
          f = t || [],
          l = (e = e || {}).node || r,
          h = void 0 !== e.clockseq ? e.clockseq : i;
        if (null == l || null == h) {
          var d = o();
          null == l && (l = r = [1 | d[0], d[1], d[2], d[3], d[4], d[5]]),
            null == h && (h = i = 16383 & ((d[6] << 8) | d[7]));
        }
        var p = void 0 !== e.msecs ? e.msecs : new Date().getTime(),
          g = void 0 !== e.nsecs ? e.nsecs : u + 1,
          y = p - a + (g - u) / 1e4;
        if (
          (y < 0 && void 0 === e.clockseq && (h = (h + 1) & 16383),
          (y < 0 || p > a) && void 0 === e.nsecs && (g = 0),
          g >= 1e4)
        )
          throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");
        (a = p), (u = g), (i = h);
        var v = (1e4 * (268435455 & (p += 122192928e5)) + g) % 4294967296;
        (f[c++] = (v >>> 24) & 255),
          (f[c++] = (v >>> 16) & 255),
          (f[c++] = (v >>> 8) & 255),
          (f[c++] = 255 & v);
        var m = ((p / 4294967296) * 1e4) & 268435455;
        (f[c++] = (m >>> 8) & 255),
          (f[c++] = 255 & m),
          (f[c++] = ((m >>> 24) & 15) | 16),
          (f[c++] = (m >>> 16) & 255),
          (f[c++] = (h >>> 8) | 128),
          (f[c++] = 255 & h);
        for (var b = 0; b < 6; ++b) f[c + b] = l[b];
        return t || s(f);
      };
    },
    function(e, t, n) {
      var r = n(23),
        i = n(24);
      e.exports = function(e, t, n) {
        var o = (t && n) || 0;
        "string" == typeof e &&
          ((t = "binary" === e ? new Array(16) : null), (e = null));
        var s = (e = e || {}).random || (e.rng || r)();
        if (((s[6] = (15 & s[6]) | 64), (s[8] = (63 & s[8]) | 128), t))
          for (var a = 0; a < 16; ++a) t[o + a] = s[a];
        return t || i(s);
      };
    },
    function(e, t, n) {
      "use strict";
      n.r(t),
        n.d(t, "__extends", function() {
          return i;
        }),
        n.d(t, "__assign", function() {
          return o;
        }),
        n.d(t, "__rest", function() {
          return s;
        }),
        n.d(t, "__decorate", function() {
          return a;
        }),
        n.d(t, "__param", function() {
          return u;
        }),
        n.d(t, "__metadata", function() {
          return c;
        }),
        n.d(t, "__awaiter", function() {
          return f;
        }),
        n.d(t, "__generator", function() {
          return l;
        }),
        n.d(t, "__exportStar", function() {
          return h;
        }),
        n.d(t, "__values", function() {
          return d;
        }),
        n.d(t, "__read", function() {
          return p;
        }),
        n.d(t, "__spread", function() {
          return g;
        }),
        n.d(t, "__spreadArrays", function() {
          return y;
        }),
        n.d(t, "__await", function() {
          return v;
        }),
        n.d(t, "__asyncGenerator", function() {
          return m;
        }),
        n.d(t, "__asyncDelegator", function() {
          return b;
        }),
        n.d(t, "__asyncValues", function() {
          return w;
        }),
        n.d(t, "__makeTemplateObject", function() {
          return _;
        }),
        n.d(t, "__importStar", function() {
          return S;
        }),
        n.d(t, "__importDefault", function() {
          return E;
        }),
        n.d(t, "__classPrivateFieldGet", function() {
          return A;
        }),
        n.d(t, "__classPrivateFieldSet", function() {
          return I;
        });
      /*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
      var r = function(e, t) {
        return (r =
          Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array &&
            function(e, t) {
              e.__proto__ = t;
            }) ||
          function(e, t) {
            for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
          })(e, t);
      };
      function i(e, t) {
        function n() {
          this.constructor = e;
        }
        r(e, t),
          (e.prototype =
            null === t
              ? Object.create(t)
              : ((n.prototype = t.prototype), new n()));
      }
      var o = function() {
        return (o =
          Object.assign ||
          function(e) {
            for (var t, n = 1, r = arguments.length; n < r; n++)
              for (var i in (t = arguments[n]))
                Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
            return e;
          }).apply(this, arguments);
      };
      function s(e, t) {
        var n = {};
        for (var r in e)
          Object.prototype.hasOwnProperty.call(e, r) &&
            t.indexOf(r) < 0 &&
            (n[r] = e[r]);
        if (null != e && "function" == typeof Object.getOwnPropertySymbols) {
          var i = 0;
          for (r = Object.getOwnPropertySymbols(e); i < r.length; i++)
            t.indexOf(r[i]) < 0 &&
              Object.prototype.propertyIsEnumerable.call(e, r[i]) &&
              (n[r[i]] = e[r[i]]);
        }
        return n;
      }
      function a(e, t, n, r) {
        var i,
          o = arguments.length,
          s =
            o < 3
              ? t
              : null === r
              ? (r = Object.getOwnPropertyDescriptor(t, n))
              : r;
        if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
          s = Reflect.decorate(e, t, n, r);
        else
          for (var a = e.length - 1; a >= 0; a--)
            (i = e[a]) &&
              (s = (o < 3 ? i(s) : o > 3 ? i(t, n, s) : i(t, n)) || s);
        return o > 3 && s && Object.defineProperty(t, n, s), s;
      }
      function u(e, t) {
        return function(n, r) {
          t(n, r, e);
        };
      }
      function c(e, t) {
        if ("object" == typeof Reflect && "function" == typeof Reflect.metadata)
          return Reflect.metadata(e, t);
      }
      function f(e, t, n, r) {
        return new (n || (n = Promise))(function(i, o) {
          function s(e) {
            try {
              u(r.next(e));
            } catch (e) {
              o(e);
            }
          }
          function a(e) {
            try {
              u(r.throw(e));
            } catch (e) {
              o(e);
            }
          }
          function u(e) {
            var t;
            e.done
              ? i(e.value)
              : ((t = e.value),
                t instanceof n
                  ? t
                  : new n(function(e) {
                      e(t);
                    })).then(s, a);
          }
          u((r = r.apply(e, t || [])).next());
        });
      }
      function l(e, t) {
        var n,
          r,
          i,
          o,
          s = {
            label: 0,
            sent: function() {
              if (1 & i[0]) throw i[1];
              return i[1];
            },
            trys: [],
            ops: []
          };
        return (
          (o = { next: a(0), throw: a(1), return: a(2) }),
          "function" == typeof Symbol &&
            (o[Symbol.iterator] = function() {
              return this;
            }),
          o
        );
        function a(o) {
          return function(a) {
            return (function(o) {
              if (n) throw new TypeError("Generator is already executing.");
              for (; s; )
                try {
                  if (
                    ((n = 1),
                    r &&
                      (i =
                        2 & o[0]
                          ? r.return
                          : o[0]
                          ? r.throw || ((i = r.return) && i.call(r), 0)
                          : r.next) &&
                      !(i = i.call(r, o[1])).done)
                  )
                    return i;
                  switch (((r = 0), i && (o = [2 & o[0], i.value]), o[0])) {
                    case 0:
                    case 1:
                      i = o;
                      break;
                    case 4:
                      return s.label++, { value: o[1], done: !1 };
                    case 5:
                      s.label++, (r = o[1]), (o = [0]);
                      continue;
                    case 7:
                      (o = s.ops.pop()), s.trys.pop();
                      continue;
                    default:
                      if (
                        !((i = s.trys),
                        (i = i.length > 0 && i[i.length - 1]) ||
                          (6 !== o[0] && 2 !== o[0]))
                      ) {
                        s = 0;
                        continue;
                      }
                      if (3 === o[0] && (!i || (o[1] > i[0] && o[1] < i[3]))) {
                        s.label = o[1];
                        break;
                      }
                      if (6 === o[0] && s.label < i[1]) {
                        (s.label = i[1]), (i = o);
                        break;
                      }
                      if (i && s.label < i[2]) {
                        (s.label = i[2]), s.ops.push(o);
                        break;
                      }
                      i[2] && s.ops.pop(), s.trys.pop();
                      continue;
                  }
                  o = t.call(e, s);
                } catch (e) {
                  (o = [6, e]), (r = 0);
                } finally {
                  n = i = 0;
                }
              if (5 & o[0]) throw o[1];
              return { value: o[0] ? o[1] : void 0, done: !0 };
            })([o, a]);
          };
        }
      }
      function h(e, t) {
        for (var n in e) t.hasOwnProperty(n) || (t[n] = e[n]);
      }
      function d(e) {
        var t = "function" == typeof Symbol && Symbol.iterator,
          n = t && e[t],
          r = 0;
        if (n) return n.call(e);
        if (e && "number" == typeof e.length)
          return {
            next: function() {
              return (
                e && r >= e.length && (e = void 0),
                { value: e && e[r++], done: !e }
              );
            }
          };
        throw new TypeError(
          t ? "Object is not iterable." : "Symbol.iterator is not defined."
        );
      }
      function p(e, t) {
        var n = "function" == typeof Symbol && e[Symbol.iterator];
        if (!n) return e;
        var r,
          i,
          o = n.call(e),
          s = [];
        try {
          for (; (void 0 === t || t-- > 0) && !(r = o.next()).done; )
            s.push(r.value);
        } catch (e) {
          i = { error: e };
        } finally {
          try {
            r && !r.done && (n = o.return) && n.call(o);
          } finally {
            if (i) throw i.error;
          }
        }
        return s;
      }
      function g() {
        for (var e = [], t = 0; t < arguments.length; t++)
          e = e.concat(p(arguments[t]));
        return e;
      }
      function y() {
        for (var e = 0, t = 0, n = arguments.length; t < n; t++)
          e += arguments[t].length;
        var r = Array(e),
          i = 0;
        for (t = 0; t < n; t++)
          for (var o = arguments[t], s = 0, a = o.length; s < a; s++, i++)
            r[i] = o[s];
        return r;
      }
      function v(e) {
        return this instanceof v ? ((this.v = e), this) : new v(e);
      }
      function m(e, t, n) {
        if (!Symbol.asyncIterator)
          throw new TypeError("Symbol.asyncIterator is not defined.");
        var r,
          i = n.apply(e, t || []),
          o = [];
        return (
          (r = {}),
          s("next"),
          s("throw"),
          s("return"),
          (r[Symbol.asyncIterator] = function() {
            return this;
          }),
          r
        );
        function s(e) {
          i[e] &&
            (r[e] = function(t) {
              return new Promise(function(n, r) {
                o.push([e, t, n, r]) > 1 || a(e, t);
              });
            });
        }
        function a(e, t) {
          try {
            (n = i[e](t)).value instanceof v
              ? Promise.resolve(n.value.v).then(u, c)
              : f(o[0][2], n);
          } catch (e) {
            f(o[0][3], e);
          }
          var n;
        }
        function u(e) {
          a("next", e);
        }
        function c(e) {
          a("throw", e);
        }
        function f(e, t) {
          e(t), o.shift(), o.length && a(o[0][0], o[0][1]);
        }
      }
      function b(e) {
        var t, n;
        return (
          (t = {}),
          r("next"),
          r("throw", function(e) {
            throw e;
          }),
          r("return"),
          (t[Symbol.iterator] = function() {
            return this;
          }),
          t
        );
        function r(r, i) {
          t[r] = e[r]
            ? function(t) {
                return (n = !n)
                  ? { value: v(e[r](t)), done: "return" === r }
                  : i
                  ? i(t)
                  : t;
              }
            : i;
        }
      }
      function w(e) {
        if (!Symbol.asyncIterator)
          throw new TypeError("Symbol.asyncIterator is not defined.");
        var t,
          n = e[Symbol.asyncIterator];
        return n
          ? n.call(e)
          : ((e = d(e)),
            (t = {}),
            r("next"),
            r("throw"),
            r("return"),
            (t[Symbol.asyncIterator] = function() {
              return this;
            }),
            t);
        function r(n) {
          t[n] =
            e[n] &&
            function(t) {
              return new Promise(function(r, i) {
                (function(e, t, n, r) {
                  Promise.resolve(r).then(function(t) {
                    e({ value: t, done: n });
                  }, t);
                })(r, i, (t = e[n](t)).done, t.value);
              });
            };
        }
      }
      function _(e, t) {
        return (
          Object.defineProperty
            ? Object.defineProperty(e, "raw", { value: t })
            : (e.raw = t),
          e
        );
      }
      function S(e) {
        if (e && e.__esModule) return e;
        var t = {};
        if (null != e)
          for (var n in e) Object.hasOwnProperty.call(e, n) && (t[n] = e[n]);
        return (t.default = e), t;
      }
      function E(e) {
        return e && e.__esModule ? e : { default: e };
      }
      function A(e, t) {
        if (!t.has(e))
          throw new TypeError("attempted to get private field on non-instance");
        return t.get(e);
      }
      function I(e, t, n) {
        if (!t.has(e))
          throw new TypeError("attempted to set private field on non-instance");
        return t.set(e, n), n;
      }
    },
    function(e, t, n) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var r = n(25),
        i = n(29),
        o = n(14),
        s = n(75),
        a = n(77),
        u = n(16),
        c = (function() {
          function e(e) {
            s.supportsWebCrypto(u.locateWindow())
              ? (this.hash = new i.Sha256(e))
              : a.isMsWindow(u.locateWindow())
              ? (this.hash = new r.Sha256(e))
              : (this.hash = new o.Sha256(e));
          }
          return (
            (e.prototype.update = function(e, t) {
              this.hash.update(e, t);
            }),
            (e.prototype.digest = function() {
              return this.hash.digest();
            }),
            e
          );
        })();
      t.Sha256 = c;
    },
    function(e, t, n) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.toUtf8 = t.fromUtf8 = void 0),
        (t.fromUtf8 = function(e) {
          for (var t = [], n = 0, r = e.length; n < r; n++) {
            var i = e.charCodeAt(n);
            if (i < 128) t.push(i);
            else if (i < 2048) t.push((i >> 6) | 192, (63 & i) | 128);
            else if (
              n + 1 < e.length &&
              55296 == (64512 & i) &&
              56320 == (64512 & e.charCodeAt(n + 1))
            ) {
              var o = 65536 + ((1023 & i) << 10) + (1023 & e.charCodeAt(++n));
              t.push(
                (o >> 18) | 240,
                ((o >> 12) & 63) | 128,
                ((o >> 6) & 63) | 128,
                (63 & o) | 128
              );
            } else
              t.push((i >> 12) | 224, ((i >> 6) & 63) | 128, (63 & i) | 128);
          }
          return Uint8Array.from(t);
        }),
        (t.toUtf8 = function(e) {
          for (var t = "", n = 0, r = e.length; n < r; n++) {
            var i = e[n];
            if (i < 128) t += String.fromCharCode(i);
            else if (192 <= i && i < 224) {
              var o = e[++n];
              t += String.fromCharCode(((31 & i) << 6) | (63 & o));
            } else if (240 <= i && i < 365) {
              var s =
                "%" +
                [i, e[++n], e[++n], e[++n]]
                  .map(function(e) {
                    return e.toString(16);
                  })
                  .join("%");
              t += decodeURIComponent(s);
            } else
              t += String.fromCharCode(
                ((15 & i) << 12) | ((63 & e[++n]) << 6) | (63 & e[++n])
              );
          }
          return t;
        });
    },
    function(e, t, n) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.toUtf8 = t.fromUtf8 = void 0),
        (t.fromUtf8 = function(e) {
          return new TextEncoder().encode(e);
        }),
        (t.toUtf8 = function(e) {
          return new TextDecoder("utf-8").decode(e);
        });
    },
    function(e, t, n) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var r = n(30),
        i = n(31),
        o = n(71),
        s = n(72),
        a = (function() {
          function e(e) {
            if (((this.hash = new o.RawSha256()), e)) {
              this.outer = new o.RawSha256();
              var t = (function(e) {
                  var t = u(e);
                  if (t.byteLength > i.BLOCK_SIZE) {
                    var n = new o.RawSha256();
                    n.update(t), (t = n.digest());
                  }
                  var r = new Uint8Array(i.BLOCK_SIZE);
                  return r.set(t), r;
                })(e),
                n = new Uint8Array(i.BLOCK_SIZE);
              n.set(t);
              for (var r = 0; r < i.BLOCK_SIZE; r++) (t[r] ^= 54), (n[r] ^= 92);
              this.hash.update(t), this.outer.update(n);
              for (r = 0; r < t.byteLength; r++) t[r] = 0;
            }
          }
          return (
            (e.prototype.update = function(e) {
              if (
                !(function(e) {
                  if ("string" == typeof e) return 0 === e.length;
                  return 0 === e.byteLength;
                })(e) &&
                !this.error
              )
                try {
                  this.hash.update(u(e));
                } catch (e) {
                  this.error = e;
                }
            }),
            (e.prototype.digestSync = function() {
              if (this.error) throw this.error;
              return this.outer
                ? (this.outer.finished || this.outer.update(this.hash.digest()),
                  this.outer.digest())
                : this.hash.digest();
            }),
            (e.prototype.digest = function() {
              return r.__awaiter(this, void 0, void 0, function() {
                return r.__generator(this, function(e) {
                  return [2, this.digestSync()];
                });
              });
            }),
            e
          );
        })();
      function u(e) {
        return "string" == typeof e
          ? s.fromUtf8(e)
          : ArrayBuffer.isView(e)
          ? new Uint8Array(
              e.buffer,
              e.byteOffset,
              e.byteLength / Uint8Array.BYTES_PER_ELEMENT
            )
          : new Uint8Array(e);
      }
      t.Sha256 = a;
    },
    function(e, t, n) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var r = n(31),
        i = (function() {
          function e() {
            (this.state = Int32Array.from(r.INIT)),
              (this.temp = new Int32Array(64)),
              (this.buffer = new Uint8Array(64)),
              (this.bufferLength = 0),
              (this.bytesHashed = 0),
              (this.finished = !1);
          }
          return (
            (e.prototype.update = function(e) {
              if (this.finished)
                throw new Error(
                  "Attempted to update an already finished hash."
                );
              var t = 0,
                n = e.byteLength;
              if (
                ((this.bytesHashed += n),
                8 * this.bytesHashed > r.MAX_HASHABLE_LENGTH)
              )
                throw new Error("Cannot hash more than 2^53 - 1 bits");
              for (; n > 0; )
                (this.buffer[this.bufferLength++] = e[t++]),
                  n--,
                  this.bufferLength === r.BLOCK_SIZE &&
                    (this.hashBuffer(), (this.bufferLength = 0));
            }),
            (e.prototype.digest = function() {
              if (!this.finished) {
                var e = 8 * this.bytesHashed,
                  t = new DataView(
                    this.buffer.buffer,
                    this.buffer.byteOffset,
                    this.buffer.byteLength
                  ),
                  n = this.bufferLength;
                if (
                  (t.setUint8(this.bufferLength++, 128),
                  n % r.BLOCK_SIZE >= r.BLOCK_SIZE - 8)
                ) {
                  for (var i = this.bufferLength; i < r.BLOCK_SIZE; i++)
                    t.setUint8(i, 0);
                  this.hashBuffer(), (this.bufferLength = 0);
                }
                for (i = this.bufferLength; i < r.BLOCK_SIZE - 8; i++)
                  t.setUint8(i, 0);
                t.setUint32(r.BLOCK_SIZE - 8, Math.floor(e / 4294967296), !0),
                  t.setUint32(r.BLOCK_SIZE - 4, e),
                  this.hashBuffer(),
                  (this.finished = !0);
              }
              var o = new Uint8Array(r.DIGEST_LENGTH);
              for (i = 0; i < 8; i++)
                (o[4 * i] = (this.state[i] >>> 24) & 255),
                  (o[4 * i + 1] = (this.state[i] >>> 16) & 255),
                  (o[4 * i + 2] = (this.state[i] >>> 8) & 255),
                  (o[4 * i + 3] = (this.state[i] >>> 0) & 255);
              return o;
            }),
            (e.prototype.hashBuffer = function() {
              for (
                var e = this.buffer,
                  t = this.state,
                  n = t[0],
                  i = t[1],
                  o = t[2],
                  s = t[3],
                  a = t[4],
                  u = t[5],
                  c = t[6],
                  f = t[7],
                  l = 0;
                l < r.BLOCK_SIZE;
                l++
              ) {
                if (l < 16)
                  this.temp[l] =
                    ((255 & e[4 * l]) << 24) |
                    ((255 & e[4 * l + 1]) << 16) |
                    ((255 & e[4 * l + 2]) << 8) |
                    (255 & e[4 * l + 3]);
                else {
                  var h = this.temp[l - 2],
                    d =
                      ((h >>> 17) | (h << 15)) ^
                      ((h >>> 19) | (h << 13)) ^
                      (h >>> 10),
                    p =
                      (((h = this.temp[l - 15]) >>> 7) | (h << 25)) ^
                      ((h >>> 18) | (h << 14)) ^
                      (h >>> 3);
                  this.temp[l] =
                    ((d + this.temp[l - 7]) | 0) +
                    ((p + this.temp[l - 16]) | 0);
                }
                var g =
                    ((((((a >>> 6) | (a << 26)) ^
                      ((a >>> 11) | (a << 21)) ^
                      ((a >>> 25) | (a << 7))) +
                      ((a & u) ^ (~a & c))) |
                      0) +
                      ((f + ((r.KEY[l] + this.temp[l]) | 0)) | 0)) |
                    0,
                  y =
                    ((((n >>> 2) | (n << 30)) ^
                      ((n >>> 13) | (n << 19)) ^
                      ((n >>> 22) | (n << 10))) +
                      ((n & i) ^ (n & o) ^ (i & o))) |
                    0;
                (f = c),
                  (c = u),
                  (u = a),
                  (a = (s + g) | 0),
                  (s = o),
                  (o = i),
                  (i = n),
                  (n = (g + y) | 0);
              }
              (t[0] += n),
                (t[1] += i),
                (t[2] += o),
                (t[3] += s),
                (t[4] += a),
                (t[5] += u),
                (t[6] += c),
                (t[7] += f);
            }),
            e
          );
        })();
      t.RawSha256 = i;
    },
    function(e, t, n) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.toUtf8 = t.fromUtf8 = void 0);
      var r = n(73),
        i = n(74);
      (t.fromUtf8 = function(e) {
        return "function" == typeof TextEncoder ? i.fromUtf8(e) : r.fromUtf8(e);
      }),
        (t.toUtf8 = function(e) {
          return "function" == typeof TextDecoder ? i.toUtf8(e) : r.toUtf8(e);
        });
    },
    function(e, t, n) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.toUtf8 = t.fromUtf8 = void 0),
        (t.fromUtf8 = function(e) {
          for (var t = [], n = 0, r = e.length; n < r; n++) {
            var i = e.charCodeAt(n);
            if (i < 128) t.push(i);
            else if (i < 2048) t.push((i >> 6) | 192, (63 & i) | 128);
            else if (
              n + 1 < e.length &&
              55296 == (64512 & i) &&
              56320 == (64512 & e.charCodeAt(n + 1))
            ) {
              var o = 65536 + ((1023 & i) << 10) + (1023 & e.charCodeAt(++n));
              t.push(
                (o >> 18) | 240,
                ((o >> 12) & 63) | 128,
                ((o >> 6) & 63) | 128,
                (63 & o) | 128
              );
            } else
              t.push((i >> 12) | 224, ((i >> 6) & 63) | 128, (63 & i) | 128);
          }
          return Uint8Array.from(t);
        }),
        (t.toUtf8 = function(e) {
          for (var t = "", n = 0, r = e.length; n < r; n++) {
            var i = e[n];
            if (i < 128) t += String.fromCharCode(i);
            else if (192 <= i && i < 224) {
              var o = e[++n];
              t += String.fromCharCode(((31 & i) << 6) | (63 & o));
            } else if (240 <= i && i < 365) {
              var s =
                "%" +
                [i, e[++n], e[++n], e[++n]]
                  .map(function(e) {
                    return e.toString(16);
                  })
                  .join("%");
              t += decodeURIComponent(s);
            } else
              t += String.fromCharCode(
                ((15 & i) << 12) | ((63 & e[++n]) << 6) | (63 & e[++n])
              );
          }
          return t;
        });
    },
    function(e, t, n) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.toUtf8 = t.fromUtf8 = void 0),
        (t.fromUtf8 = function(e) {
          return new TextEncoder().encode(e);
        }),
        (t.toUtf8 = function(e) {
          return new TextDecoder("utf-8").decode(e);
        });
    },
    function(e, t, n) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        n(32).__exportStar(n(76), t);
    },
    function(e, t, n) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var r = n(32),
        i = [
          "decrypt",
          "digest",
          "encrypt",
          "exportKey",
          "generateKey",
          "importKey",
          "sign",
          "verify"
        ];
      function o(e) {
        return (
          "object" == typeof e &&
          "object" == typeof e.crypto &&
          "function" == typeof e.crypto.getRandomValues
        );
      }
      function s(e) {
        return (
          e &&
          i.every(function(t) {
            return "function" == typeof e[t];
          })
        );
      }
      (t.supportsWebCrypto = function(e) {
        return (
          !(!o(e) || "object" != typeof e.crypto.subtle) && s(e.crypto.subtle)
        );
      }),
        (t.supportsSecureRandom = o),
        (t.supportsSubtleCrypto = s),
        (t.supportsZeroByteGCM = function(e) {
          return r.__awaiter(this, void 0, void 0, function() {
            var t;
            return r.__generator(this, function(n) {
              switch (n.label) {
                case 0:
                  if (!s(e)) return [2, !1];
                  n.label = 1;
                case 1:
                  return (
                    n.trys.push([1, 4, , 5]),
                    [
                      4,
                      e.generateKey({ name: "AES-GCM", length: 128 }, !1, [
                        "encrypt"
                      ])
                    ]
                  );
                case 2:
                  return (
                    (t = n.sent()),
                    [
                      4,
                      e.encrypt(
                        {
                          name: "AES-GCM",
                          iv: new Uint8Array(Array(12)),
                          additionalData: new Uint8Array(Array(16)),
                          tagLength: 128
                        },
                        t,
                        new Uint8Array(0)
                      )
                    ]
                  );
                case 3:
                  return [2, 16 === n.sent().byteLength];
                case 4:
                  return n.sent(), [2, !1];
                case 5:
                  return [2];
              }
            });
          });
        });
    },
    function(e, t, n) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        n(78).__exportStar(n(79), t);
    },
    function(e, t, n) {
      "use strict";
      n.r(t),
        n.d(t, "__extends", function() {
          return i;
        }),
        n.d(t, "__assign", function() {
          return o;
        }),
        n.d(t, "__rest", function() {
          return s;
        }),
        n.d(t, "__decorate", function() {
          return a;
        }),
        n.d(t, "__param", function() {
          return u;
        }),
        n.d(t, "__metadata", function() {
          return c;
        }),
        n.d(t, "__awaiter", function() {
          return f;
        }),
        n.d(t, "__generator", function() {
          return l;
        }),
        n.d(t, "__exportStar", function() {
          return h;
        }),
        n.d(t, "__values", function() {
          return d;
        }),
        n.d(t, "__read", function() {
          return p;
        }),
        n.d(t, "__spread", function() {
          return g;
        }),
        n.d(t, "__spreadArrays", function() {
          return y;
        }),
        n.d(t, "__await", function() {
          return v;
        }),
        n.d(t, "__asyncGenerator", function() {
          return m;
        }),
        n.d(t, "__asyncDelegator", function() {
          return b;
        }),
        n.d(t, "__asyncValues", function() {
          return w;
        }),
        n.d(t, "__makeTemplateObject", function() {
          return _;
        }),
        n.d(t, "__importStar", function() {
          return S;
        }),
        n.d(t, "__importDefault", function() {
          return E;
        }),
        n.d(t, "__classPrivateFieldGet", function() {
          return A;
        }),
        n.d(t, "__classPrivateFieldSet", function() {
          return I;
        });
      /*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
      var r = function(e, t) {
        return (r =
          Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array &&
            function(e, t) {
              e.__proto__ = t;
            }) ||
          function(e, t) {
            for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
          })(e, t);
      };
      function i(e, t) {
        function n() {
          this.constructor = e;
        }
        r(e, t),
          (e.prototype =
            null === t
              ? Object.create(t)
              : ((n.prototype = t.prototype), new n()));
      }
      var o = function() {
        return (o =
          Object.assign ||
          function(e) {
            for (var t, n = 1, r = arguments.length; n < r; n++)
              for (var i in (t = arguments[n]))
                Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
            return e;
          }).apply(this, arguments);
      };
      function s(e, t) {
        var n = {};
        for (var r in e)
          Object.prototype.hasOwnProperty.call(e, r) &&
            t.indexOf(r) < 0 &&
            (n[r] = e[r]);
        if (null != e && "function" == typeof Object.getOwnPropertySymbols) {
          var i = 0;
          for (r = Object.getOwnPropertySymbols(e); i < r.length; i++)
            t.indexOf(r[i]) < 0 &&
              Object.prototype.propertyIsEnumerable.call(e, r[i]) &&
              (n[r[i]] = e[r[i]]);
        }
        return n;
      }
      function a(e, t, n, r) {
        var i,
          o = arguments.length,
          s =
            o < 3
              ? t
              : null === r
              ? (r = Object.getOwnPropertyDescriptor(t, n))
              : r;
        if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
          s = Reflect.decorate(e, t, n, r);
        else
          for (var a = e.length - 1; a >= 0; a--)
            (i = e[a]) &&
              (s = (o < 3 ? i(s) : o > 3 ? i(t, n, s) : i(t, n)) || s);
        return o > 3 && s && Object.defineProperty(t, n, s), s;
      }
      function u(e, t) {
        return function(n, r) {
          t(n, r, e);
        };
      }
      function c(e, t) {
        if ("object" == typeof Reflect && "function" == typeof Reflect.metadata)
          return Reflect.metadata(e, t);
      }
      function f(e, t, n, r) {
        return new (n || (n = Promise))(function(i, o) {
          function s(e) {
            try {
              u(r.next(e));
            } catch (e) {
              o(e);
            }
          }
          function a(e) {
            try {
              u(r.throw(e));
            } catch (e) {
              o(e);
            }
          }
          function u(e) {
            var t;
            e.done
              ? i(e.value)
              : ((t = e.value),
                t instanceof n
                  ? t
                  : new n(function(e) {
                      e(t);
                    })).then(s, a);
          }
          u((r = r.apply(e, t || [])).next());
        });
      }
      function l(e, t) {
        var n,
          r,
          i,
          o,
          s = {
            label: 0,
            sent: function() {
              if (1 & i[0]) throw i[1];
              return i[1];
            },
            trys: [],
            ops: []
          };
        return (
          (o = { next: a(0), throw: a(1), return: a(2) }),
          "function" == typeof Symbol &&
            (o[Symbol.iterator] = function() {
              return this;
            }),
          o
        );
        function a(o) {
          return function(a) {
            return (function(o) {
              if (n) throw new TypeError("Generator is already executing.");
              for (; s; )
                try {
                  if (
                    ((n = 1),
                    r &&
                      (i =
                        2 & o[0]
                          ? r.return
                          : o[0]
                          ? r.throw || ((i = r.return) && i.call(r), 0)
                          : r.next) &&
                      !(i = i.call(r, o[1])).done)
                  )
                    return i;
                  switch (((r = 0), i && (o = [2 & o[0], i.value]), o[0])) {
                    case 0:
                    case 1:
                      i = o;
                      break;
                    case 4:
                      return s.label++, { value: o[1], done: !1 };
                    case 5:
                      s.label++, (r = o[1]), (o = [0]);
                      continue;
                    case 7:
                      (o = s.ops.pop()), s.trys.pop();
                      continue;
                    default:
                      if (
                        !((i = s.trys),
                        (i = i.length > 0 && i[i.length - 1]) ||
                          (6 !== o[0] && 2 !== o[0]))
                      ) {
                        s = 0;
                        continue;
                      }
                      if (3 === o[0] && (!i || (o[1] > i[0] && o[1] < i[3]))) {
                        s.label = o[1];
                        break;
                      }
                      if (6 === o[0] && s.label < i[1]) {
                        (s.label = i[1]), (i = o);
                        break;
                      }
                      if (i && s.label < i[2]) {
                        (s.label = i[2]), s.ops.push(o);
                        break;
                      }
                      i[2] && s.ops.pop(), s.trys.pop();
                      continue;
                  }
                  o = t.call(e, s);
                } catch (e) {
                  (o = [6, e]), (r = 0);
                } finally {
                  n = i = 0;
                }
              if (5 & o[0]) throw o[1];
              return { value: o[0] ? o[1] : void 0, done: !0 };
            })([o, a]);
          };
        }
      }
      function h(e, t) {
        for (var n in e) t.hasOwnProperty(n) || (t[n] = e[n]);
      }
      function d(e) {
        var t = "function" == typeof Symbol && Symbol.iterator,
          n = t && e[t],
          r = 0;
        if (n) return n.call(e);
        if (e && "number" == typeof e.length)
          return {
            next: function() {
              return (
                e && r >= e.length && (e = void 0),
                { value: e && e[r++], done: !e }
              );
            }
          };
        throw new TypeError(
          t ? "Object is not iterable." : "Symbol.iterator is not defined."
        );
      }
      function p(e, t) {
        var n = "function" == typeof Symbol && e[Symbol.iterator];
        if (!n) return e;
        var r,
          i,
          o = n.call(e),
          s = [];
        try {
          for (; (void 0 === t || t-- > 0) && !(r = o.next()).done; )
            s.push(r.value);
        } catch (e) {
          i = { error: e };
        } finally {
          try {
            r && !r.done && (n = o.return) && n.call(o);
          } finally {
            if (i) throw i.error;
          }
        }
        return s;
      }
      function g() {
        for (var e = [], t = 0; t < arguments.length; t++)
          e = e.concat(p(arguments[t]));
        return e;
      }
      function y() {
        for (var e = 0, t = 0, n = arguments.length; t < n; t++)
          e += arguments[t].length;
        var r = Array(e),
          i = 0;
        for (t = 0; t < n; t++)
          for (var o = arguments[t], s = 0, a = o.length; s < a; s++, i++)
            r[i] = o[s];
        return r;
      }
      function v(e) {
        return this instanceof v ? ((this.v = e), this) : new v(e);
      }
      function m(e, t, n) {
        if (!Symbol.asyncIterator)
          throw new TypeError("Symbol.asyncIterator is not defined.");
        var r,
          i = n.apply(e, t || []),
          o = [];
        return (
          (r = {}),
          s("next"),
          s("throw"),
          s("return"),
          (r[Symbol.asyncIterator] = function() {
            return this;
          }),
          r
        );
        function s(e) {
          i[e] &&
            (r[e] = function(t) {
              return new Promise(function(n, r) {
                o.push([e, t, n, r]) > 1 || a(e, t);
              });
            });
        }
        function a(e, t) {
          try {
            (n = i[e](t)).value instanceof v
              ? Promise.resolve(n.value.v).then(u, c)
              : f(o[0][2], n);
          } catch (e) {
            f(o[0][3], e);
          }
          var n;
        }
        function u(e) {
          a("next", e);
        }
        function c(e) {
          a("throw", e);
        }
        function f(e, t) {
          e(t), o.shift(), o.length && a(o[0][0], o[0][1]);
        }
      }
      function b(e) {
        var t, n;
        return (
          (t = {}),
          r("next"),
          r("throw", function(e) {
            throw e;
          }),
          r("return"),
          (t[Symbol.iterator] = function() {
            return this;
          }),
          t
        );
        function r(r, i) {
          t[r] = e[r]
            ? function(t) {
                return (n = !n)
                  ? { value: v(e[r](t)), done: "return" === r }
                  : i
                  ? i(t)
                  : t;
              }
            : i;
        }
      }
      function w(e) {
        if (!Symbol.asyncIterator)
          throw new TypeError("Symbol.asyncIterator is not defined.");
        var t,
          n = e[Symbol.asyncIterator];
        return n
          ? n.call(e)
          : ((e = d(e)),
            (t = {}),
            r("next"),
            r("throw"),
            r("return"),
            (t[Symbol.asyncIterator] = function() {
              return this;
            }),
            t);
        function r(n) {
          t[n] =
            e[n] &&
            function(t) {
              return new Promise(function(r, i) {
                (function(e, t, n, r) {
                  Promise.resolve(r).then(function(t) {
                    e({ value: t, done: n });
                  }, t);
                })(r, i, (t = e[n](t)).done, t.value);
              });
            };
        }
      }
      function _(e, t) {
        return (
          Object.defineProperty
            ? Object.defineProperty(e, "raw", { value: t })
            : (e.raw = t),
          e
        );
      }
      function S(e) {
        if (e && e.__esModule) return e;
        var t = {};
        if (null != e)
          for (var n in e) Object.hasOwnProperty.call(e, n) && (t[n] = e[n]);
        return (t.default = e), t;
      }
      function E(e) {
        return e && e.__esModule ? e : { default: e };
      }
      function A(e, t) {
        if (!t.has(e))
          throw new TypeError("attempted to get private field on non-instance");
        return t.get(e);
      }
      function I(e, t, n) {
        if (!t.has(e))
          throw new TypeError("attempted to set private field on non-instance");
        return t.set(e, n), n;
      }
    },
    function(e, t, n) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var r = [
        "decrypt",
        "digest",
        "encrypt",
        "exportKey",
        "generateKey",
        "importKey",
        "sign",
        "verify"
      ];
      t.isMsWindow = function(e) {
        if (
          (function(e) {
            return "MSInputMethodContext" in e && "msCrypto" in e;
          })(e) &&
          void 0 !== e.msCrypto.subtle
        ) {
          var t = e.msCrypto,
            n = t.getRandomValues,
            i = t.subtle;
          return r
            .map(function(e) {
              return i[e];
            })
            .concat(n)
            .every(function(e) {
              return "function" == typeof e;
            });
        }
        return !1;
      };
    },
    function(e, t, n) {
      "use strict";
      /*
object-assign
(c) Sindre Sorhus
@license MIT
*/ var r =
          Object.getOwnPropertySymbols,
        i = Object.prototype.hasOwnProperty,
        o = Object.prototype.propertyIsEnumerable;
      function s(e) {
        if (null == e)
          throw new TypeError(
            "Object.assign cannot be called with null or undefined"
          );
        return Object(e);
      }
      e.exports = (function() {
        try {
          if (!Object.assign) return !1;
          var e = new String("abc");
          if (((e[5] = "de"), "5" === Object.getOwnPropertyNames(e)[0]))
            return !1;
          for (var t = {}, n = 0; n < 10; n++)
            t["_" + String.fromCharCode(n)] = n;
          if (
            "0123456789" !==
            Object.getOwnPropertyNames(t)
              .map(function(e) {
                return t[e];
              })
              .join("")
          )
            return !1;
          var r = {};
          return (
            "abcdefghijklmnopqrst".split("").forEach(function(e) {
              r[e] = e;
            }),
            "abcdefghijklmnopqrst" ===
              Object.keys(Object.assign({}, r)).join("")
          );
        } catch (e) {
          return !1;
        }
      })()
        ? Object.assign
        : function(e, t) {
            for (var n, a, u = s(e), c = 1; c < arguments.length; c++) {
              for (var f in (n = Object(arguments[c])))
                i.call(n, f) && (u[f] = n[f]);
              if (r) {
                a = r(n);
                for (var l = 0; l < a.length; l++)
                  o.call(n, a[l]) && (u[a[l]] = n[a[l]]);
              }
            }
            return u;
          };
    },
    function(e, t, n) {
      "use strict";
      var r = n(3),
        i = n(33),
        o = n(83),
        s = n(39);
      function a(e) {
        var t = new o(e),
          n = i(o.prototype.request, t);
        return r.extend(n, o.prototype, t), r.extend(n, t), n;
      }
      var u = a(n(36));
      (u.Axios = o),
        (u.create = function(e) {
          return a(s(u.defaults, e));
        }),
        (u.Cancel = n(40)),
        (u.CancelToken = n(95)),
        (u.isCancel = n(35)),
        (u.all = function(e) {
          return Promise.all(e);
        }),
        (u.spread = n(96)),
        (e.exports = u),
        (e.exports.default = u);
    },
    function(e, t) {
      /*!
       * Determine if an object is a Buffer
       *
       * @author   Feross Aboukhadijeh <https://feross.org>
       * @license  MIT
       */
      e.exports = function(e) {
        return (
          null != e &&
          null != e.constructor &&
          "function" == typeof e.constructor.isBuffer &&
          e.constructor.isBuffer(e)
        );
      };
    },
    function(e, t, n) {
      "use strict";
      var r = n(3),
        i = n(34),
        o = n(84),
        s = n(85),
        a = n(39);
      function u(e) {
        (this.defaults = e),
          (this.interceptors = { request: new o(), response: new o() });
      }
      (u.prototype.request = function(e) {
        "string" == typeof e
          ? ((e = arguments[1] || {}).url = arguments[0])
          : (e = e || {}),
          ((e = a(this.defaults, e)).method = e.method
            ? e.method.toLowerCase()
            : "get");
        var t = [s, void 0],
          n = Promise.resolve(e);
        for (
          this.interceptors.request.forEach(function(e) {
            t.unshift(e.fulfilled, e.rejected);
          }),
            this.interceptors.response.forEach(function(e) {
              t.push(e.fulfilled, e.rejected);
            });
          t.length;

        )
          n = n.then(t.shift(), t.shift());
        return n;
      }),
        (u.prototype.getUri = function(e) {
          return (
            (e = a(this.defaults, e)),
            i(e.url, e.params, e.paramsSerializer).replace(/^\?/, "")
          );
        }),
        r.forEach(["delete", "get", "head", "options"], function(e) {
          u.prototype[e] = function(t, n) {
            return this.request(r.merge(n || {}, { method: e, url: t }));
          };
        }),
        r.forEach(["post", "put", "patch"], function(e) {
          u.prototype[e] = function(t, n, i) {
            return this.request(
              r.merge(i || {}, { method: e, url: t, data: n })
            );
          };
        }),
        (e.exports = u);
    },
    function(e, t, n) {
      "use strict";
      var r = n(3);
      function i() {
        this.handlers = [];
      }
      (i.prototype.use = function(e, t) {
        return (
          this.handlers.push({ fulfilled: e, rejected: t }),
          this.handlers.length - 1
        );
      }),
        (i.prototype.eject = function(e) {
          this.handlers[e] && (this.handlers[e] = null);
        }),
        (i.prototype.forEach = function(e) {
          r.forEach(this.handlers, function(t) {
            null !== t && e(t);
          });
        }),
        (e.exports = i);
    },
    function(e, t, n) {
      "use strict";
      var r = n(3),
        i = n(86),
        o = n(35),
        s = n(36),
        a = n(93),
        u = n(94);
      function c(e) {
        e.cancelToken && e.cancelToken.throwIfRequested();
      }
      e.exports = function(e) {
        return (
          c(e),
          e.baseURL && !a(e.url) && (e.url = u(e.baseURL, e.url)),
          (e.headers = e.headers || {}),
          (e.data = i(e.data, e.headers, e.transformRequest)),
          (e.headers = r.merge(
            e.headers.common || {},
            e.headers[e.method] || {},
            e.headers || {}
          )),
          r.forEach(
            ["delete", "get", "head", "post", "put", "patch", "common"],
            function(t) {
              delete e.headers[t];
            }
          ),
          (e.adapter || s.adapter)(e).then(
            function(t) {
              return (
                c(e), (t.data = i(t.data, t.headers, e.transformResponse)), t
              );
            },
            function(t) {
              return (
                o(t) ||
                  (c(e),
                  t &&
                    t.response &&
                    (t.response.data = i(
                      t.response.data,
                      t.response.headers,
                      e.transformResponse
                    ))),
                Promise.reject(t)
              );
            }
          )
        );
      };
    },
    function(e, t, n) {
      "use strict";
      var r = n(3);
      e.exports = function(e, t, n) {
        return (
          r.forEach(n, function(n) {
            e = n(e, t);
          }),
          e
        );
      };
    },
    function(e, t, n) {
      "use strict";
      var r = n(3);
      e.exports = function(e, t) {
        r.forEach(e, function(n, r) {
          r !== t &&
            r.toUpperCase() === t.toUpperCase() &&
            ((e[t] = n), delete e[r]);
        });
      };
    },
    function(e, t, n) {
      "use strict";
      var r = n(38);
      e.exports = function(e, t, n) {
        var i = n.config.validateStatus;
        !i || i(n.status)
          ? e(n)
          : t(
              r(
                "Request failed with status code " + n.status,
                n.config,
                null,
                n.request,
                n
              )
            );
      };
    },
    function(e, t, n) {
      "use strict";
      e.exports = function(e, t, n, r, i) {
        return (
          (e.config = t),
          n && (e.code = n),
          (e.request = r),
          (e.response = i),
          (e.isAxiosError = !0),
          (e.toJSON = function() {
            return {
              message: this.message,
              name: this.name,
              description: this.description,
              number: this.number,
              fileName: this.fileName,
              lineNumber: this.lineNumber,
              columnNumber: this.columnNumber,
              stack: this.stack,
              config: this.config,
              code: this.code
            };
          }),
          e
        );
      };
    },
    function(e, t, n) {
      "use strict";
      var r = n(3),
        i = [
          "age",
          "authorization",
          "content-length",
          "content-type",
          "etag",
          "expires",
          "from",
          "host",
          "if-modified-since",
          "if-unmodified-since",
          "last-modified",
          "location",
          "max-forwards",
          "proxy-authorization",
          "referer",
          "retry-after",
          "user-agent"
        ];
      e.exports = function(e) {
        var t,
          n,
          o,
          s = {};
        return e
          ? (r.forEach(e.split("\n"), function(e) {
              if (
                ((o = e.indexOf(":")),
                (t = r.trim(e.substr(0, o)).toLowerCase()),
                (n = r.trim(e.substr(o + 1))),
                t)
              ) {
                if (s[t] && i.indexOf(t) >= 0) return;
                s[t] =
                  "set-cookie" === t
                    ? (s[t] ? s[t] : []).concat([n])
                    : s[t]
                    ? s[t] + ", " + n
                    : n;
              }
            }),
            s)
          : s;
      };
    },
    function(e, t, n) {
      "use strict";
      var r = n(3);
      e.exports = r.isStandardBrowserEnv()
        ? (function() {
            var e,
              t = /(msie|trident)/i.test(navigator.userAgent),
              n = document.createElement("a");
            function i(e) {
              var r = e;
              return (
                t && (n.setAttribute("href", r), (r = n.href)),
                n.setAttribute("href", r),
                {
                  href: n.href,
                  protocol: n.protocol ? n.protocol.replace(/:$/, "") : "",
                  host: n.host,
                  search: n.search ? n.search.replace(/^\?/, "") : "",
                  hash: n.hash ? n.hash.replace(/^#/, "") : "",
                  hostname: n.hostname,
                  port: n.port,
                  pathname:
                    "/" === n.pathname.charAt(0) ? n.pathname : "/" + n.pathname
                }
              );
            }
            return (
              (e = i(window.location.href)),
              function(t) {
                var n = r.isString(t) ? i(t) : t;
                return n.protocol === e.protocol && n.host === e.host;
              }
            );
          })()
        : function() {
            return !0;
          };
    },
    function(e, t, n) {
      "use strict";
      var r = n(3);
      e.exports = r.isStandardBrowserEnv()
        ? {
            write: function(e, t, n, i, o, s) {
              var a = [];
              a.push(e + "=" + encodeURIComponent(t)),
                r.isNumber(n) && a.push("expires=" + new Date(n).toGMTString()),
                r.isString(i) && a.push("path=" + i),
                r.isString(o) && a.push("domain=" + o),
                !0 === s && a.push("secure"),
                (document.cookie = a.join("; "));
            },
            read: function(e) {
              var t = document.cookie.match(
                new RegExp("(^|;\\s*)(" + e + ")=([^;]*)")
              );
              return t ? decodeURIComponent(t[3]) : null;
            },
            remove: function(e) {
              this.write(e, "", Date.now() - 864e5);
            }
          }
        : {
            write: function() {},
            read: function() {
              return null;
            },
            remove: function() {}
          };
    },
    function(e, t, n) {
      "use strict";
      e.exports = function(e) {
        return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(e);
      };
    },
    function(e, t, n) {
      "use strict";
      e.exports = function(e, t) {
        return t ? e.replace(/\/+$/, "") + "/" + t.replace(/^\/+/, "") : e;
      };
    },
    function(e, t, n) {
      "use strict";
      var r = n(40);
      function i(e) {
        if ("function" != typeof e)
          throw new TypeError("executor must be a function.");
        var t;
        this.promise = new Promise(function(e) {
          t = e;
        });
        var n = this;
        e(function(e) {
          n.reason || ((n.reason = new r(e)), t(n.reason));
        });
      }
      (i.prototype.throwIfRequested = function() {
        if (this.reason) throw this.reason;
      }),
        (i.source = function() {
          var e;
          return {
            token: new i(function(t) {
              e = t;
            }),
            cancel: e
          };
        }),
        (e.exports = i);
    },
    function(e, t, n) {
      "use strict";
      e.exports = function(e) {
        return function(t) {
          return e.apply(null, t);
        };
      };
    },
    function(e, t, n) {
      "use strict";
      function r(e, t) {
        if (!(e instanceof t))
          throw new TypeError("Cannot call a class as a function");
      }
      function i(e, t) {
        for (var n = 0; n < t.length; n++) {
          var r = t[n];
          (r.enumerable = r.enumerable || !1),
            (r.configurable = !0),
            "value" in r && (r.writable = !0),
            Object.defineProperty(e, r.key, r);
        }
      }
      function o(e, t, n) {
        return t && i(e.prototype, t), n && i(e, n), e;
      }
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.Observable = void 0);
      var s = function() {
          return "function" == typeof Symbol;
        },
        a = function(e) {
          return s() && Boolean(Symbol[e]);
        },
        u = function(e) {
          return a(e) ? Symbol[e] : "@@" + e;
        };
      s() && !a("observable") && (Symbol.observable = Symbol("observable"));
      var c = u("iterator"),
        f = u("observable"),
        l = u("species");
      function h(e, t) {
        var n = e[t];
        if (null != n) {
          if ("function" != typeof n)
            throw new TypeError(n + " is not a function");
          return n;
        }
      }
      function d(e) {
        var t = e.constructor;
        return (
          void 0 !== t && null === (t = t[l]) && (t = void 0),
          void 0 !== t ? t : E
        );
      }
      function p(e) {
        return e instanceof E;
      }
      function g(e) {
        g.log
          ? g.log(e)
          : setTimeout(function() {
              throw e;
            });
      }
      function y(e) {
        Promise.resolve().then(function() {
          try {
            e();
          } catch (e) {
            g(e);
          }
        });
      }
      function v(e) {
        var t = e._cleanup;
        if (void 0 !== t && ((e._cleanup = void 0), t))
          try {
            if ("function" == typeof t) t();
            else {
              var n = h(t, "unsubscribe");
              n && n.call(t);
            }
          } catch (e) {
            g(e);
          }
      }
      function m(e) {
        (e._observer = void 0), (e._queue = void 0), (e._state = "closed");
      }
      function b(e, t, n) {
        e._state = "running";
        var r = e._observer;
        try {
          var i = h(r, t);
          switch (t) {
            case "next":
              i && i.call(r, n);
              break;
            case "error":
              if ((m(e), !i)) throw n;
              i.call(r, n);
              break;
            case "complete":
              m(e), i && i.call(r);
          }
        } catch (e) {
          g(e);
        }
        "closed" === e._state
          ? v(e)
          : "running" === e._state && (e._state = "ready");
      }
      function w(e, t, n) {
        if ("closed" !== e._state) {
          if ("buffering" !== e._state)
            return "ready" !== e._state
              ? ((e._state = "buffering"),
                (e._queue = [{ type: t, value: n }]),
                void y(function() {
                  return (function(e) {
                    var t = e._queue;
                    if (t) {
                      (e._queue = void 0), (e._state = "ready");
                      for (
                        var n = 0;
                        n < t.length &&
                        (b(e, t[n].type, t[n].value), "closed" !== e._state);
                        ++n
                      );
                    }
                  })(e);
                }))
              : void b(e, t, n);
          e._queue.push({ type: t, value: n });
        }
      }
      var _ = (function() {
          function e(t, n) {
            r(this, e),
              (this._cleanup = void 0),
              (this._observer = t),
              (this._queue = void 0),
              (this._state = "initializing");
            var i = new S(this);
            try {
              this._cleanup = n.call(void 0, i);
            } catch (e) {
              i.error(e);
            }
            "initializing" === this._state && (this._state = "ready");
          }
          return (
            o(e, [
              {
                key: "unsubscribe",
                value: function() {
                  "closed" !== this._state && (m(this), v(this));
                }
              },
              {
                key: "closed",
                get: function() {
                  return "closed" === this._state;
                }
              }
            ]),
            e
          );
        })(),
        S = (function() {
          function e(t) {
            r(this, e), (this._subscription = t);
          }
          return (
            o(e, [
              {
                key: "next",
                value: function(e) {
                  w(this._subscription, "next", e);
                }
              },
              {
                key: "error",
                value: function(e) {
                  w(this._subscription, "error", e);
                }
              },
              {
                key: "complete",
                value: function() {
                  w(this._subscription, "complete");
                }
              },
              {
                key: "closed",
                get: function() {
                  return "closed" === this._subscription._state;
                }
              }
            ]),
            e
          );
        })(),
        E = (function() {
          function e(t) {
            if ((r(this, e), !(this instanceof e)))
              throw new TypeError("Observable cannot be called as a function");
            if ("function" != typeof t)
              throw new TypeError("Observable initializer must be a function");
            this._subscriber = t;
          }
          return (
            o(
              e,
              [
                {
                  key: "subscribe",
                  value: function(e) {
                    return (
                      ("object" == typeof e && null !== e) ||
                        (e = {
                          next: e,
                          error: arguments[1],
                          complete: arguments[2]
                        }),
                      new _(e, this._subscriber)
                    );
                  }
                },
                {
                  key: "forEach",
                  value: function(e) {
                    var t = this;
                    return new Promise(function(n, r) {
                      if ("function" == typeof e)
                        var i = t.subscribe({
                          next: function(t) {
                            try {
                              e(t, o);
                            } catch (e) {
                              r(e), i.unsubscribe();
                            }
                          },
                          error: r,
                          complete: n
                        });
                      else r(new TypeError(e + " is not a function"));
                      function o() {
                        i.unsubscribe(), n();
                      }
                    });
                  }
                },
                {
                  key: "map",
                  value: function(e) {
                    var t = this;
                    if ("function" != typeof e)
                      throw new TypeError(e + " is not a function");
                    return new (d(this))(function(n) {
                      return t.subscribe({
                        next: function(t) {
                          try {
                            t = e(t);
                          } catch (e) {
                            return n.error(e);
                          }
                          n.next(t);
                        },
                        error: function(e) {
                          n.error(e);
                        },
                        complete: function() {
                          n.complete();
                        }
                      });
                    });
                  }
                },
                {
                  key: "filter",
                  value: function(e) {
                    var t = this;
                    if ("function" != typeof e)
                      throw new TypeError(e + " is not a function");
                    return new (d(this))(function(n) {
                      return t.subscribe({
                        next: function(t) {
                          try {
                            if (!e(t)) return;
                          } catch (e) {
                            return n.error(e);
                          }
                          n.next(t);
                        },
                        error: function(e) {
                          n.error(e);
                        },
                        complete: function() {
                          n.complete();
                        }
                      });
                    });
                  }
                },
                {
                  key: "reduce",
                  value: function(e) {
                    var t = this;
                    if ("function" != typeof e)
                      throw new TypeError(e + " is not a function");
                    var n = d(this),
                      r = arguments.length > 1,
                      i = !1,
                      o = arguments[1],
                      s = o;
                    return new n(function(n) {
                      return t.subscribe({
                        next: function(t) {
                          var o = !i;
                          if (((i = !0), !o || r))
                            try {
                              s = e(s, t);
                            } catch (e) {
                              return n.error(e);
                            }
                          else s = t;
                        },
                        error: function(e) {
                          n.error(e);
                        },
                        complete: function() {
                          if (!i && !r)
                            return n.error(
                              new TypeError("Cannot reduce an empty sequence")
                            );
                          n.next(s), n.complete();
                        }
                      });
                    });
                  }
                },
                {
                  key: "concat",
                  value: function() {
                    for (
                      var e = this,
                        t = arguments.length,
                        n = new Array(t),
                        r = 0;
                      r < t;
                      r++
                    )
                      n[r] = arguments[r];
                    var i = d(this);
                    return new i(function(t) {
                      var r,
                        o = 0;
                      return (
                        (function e(s) {
                          r = s.subscribe({
                            next: function(e) {
                              t.next(e);
                            },
                            error: function(e) {
                              t.error(e);
                            },
                            complete: function() {
                              o === n.length
                                ? ((r = void 0), t.complete())
                                : e(i.from(n[o++]));
                            }
                          });
                        })(e),
                        function() {
                          r && (r.unsubscribe(), (r = void 0));
                        }
                      );
                    });
                  }
                },
                {
                  key: "flatMap",
                  value: function(e) {
                    var t = this;
                    if ("function" != typeof e)
                      throw new TypeError(e + " is not a function");
                    var n = d(this);
                    return new n(function(r) {
                      var i = [],
                        o = t.subscribe({
                          next: function(t) {
                            if (e)
                              try {
                                t = e(t);
                              } catch (e) {
                                return r.error(e);
                              }
                            var o = n.from(t).subscribe({
                              next: function(e) {
                                r.next(e);
                              },
                              error: function(e) {
                                r.error(e);
                              },
                              complete: function() {
                                var e = i.indexOf(o);
                                e >= 0 && i.splice(e, 1), s();
                              }
                            });
                            i.push(o);
                          },
                          error: function(e) {
                            r.error(e);
                          },
                          complete: function() {
                            s();
                          }
                        });
                      function s() {
                        o.closed && 0 === i.length && r.complete();
                      }
                      return function() {
                        i.forEach(function(e) {
                          return e.unsubscribe();
                        }),
                          o.unsubscribe();
                      };
                    });
                  }
                },
                {
                  key: f,
                  value: function() {
                    return this;
                  }
                }
              ],
              [
                {
                  key: "from",
                  value: function(t) {
                    var n = "function" == typeof this ? this : e;
                    if (null == t) throw new TypeError(t + " is not an object");
                    var r = h(t, f);
                    if (r) {
                      var i = r.call(t);
                      if (Object(i) !== i)
                        throw new TypeError(i + " is not an object");
                      return p(i) && i.constructor === n
                        ? i
                        : new n(function(e) {
                            return i.subscribe(e);
                          });
                    }
                    if (a("iterator") && (r = h(t, c)))
                      return new n(function(e) {
                        y(function() {
                          if (!e.closed) {
                            var n = !0,
                              i = !1,
                              o = void 0;
                            try {
                              for (
                                var s, a = r.call(t)[Symbol.iterator]();
                                !(n = (s = a.next()).done);
                                n = !0
                              ) {
                                var u = s.value;
                                if ((e.next(u), e.closed)) return;
                              }
                            } catch (e) {
                              (i = !0), (o = e);
                            } finally {
                              try {
                                n || null == a.return || a.return();
                              } finally {
                                if (i) throw o;
                              }
                            }
                            e.complete();
                          }
                        });
                      });
                    if (Array.isArray(t))
                      return new n(function(e) {
                        y(function() {
                          if (!e.closed) {
                            for (var n = 0; n < t.length; ++n)
                              if ((e.next(t[n]), e.closed)) return;
                            e.complete();
                          }
                        });
                      });
                    throw new TypeError(t + " is not observable");
                  }
                },
                {
                  key: "of",
                  value: function() {
                    for (
                      var t = arguments.length, n = new Array(t), r = 0;
                      r < t;
                      r++
                    )
                      n[r] = arguments[r];
                    var i = "function" == typeof this ? this : e;
                    return new i(function(e) {
                      y(function() {
                        if (!e.closed) {
                          for (var t = 0; t < n.length; ++t)
                            if ((e.next(n[t]), e.closed)) return;
                          e.complete();
                        }
                      });
                    });
                  }
                },
                {
                  key: l,
                  get: function() {
                    return this;
                  }
                }
              ]
            ),
            e
          );
        })();
      (t.Observable = E),
        s() &&
          Object.defineProperty(E, Symbol("extensions"), {
            value: { symbol: f, hostReportError: g },
            configurable: !0
          });
    },
    function(e, t, n) {
      "use strict";
      var r, i;
      function o(e) {
        return (
          e &&
          !!["provider"].find(function(t) {
            return e.hasOwnProperty(t);
          })
        );
      }
      function s(e) {
        return void 0 !== e.redirectSignIn;
      }
      n.r(t),
        n.d(t, "Auth", function() {
          return cs;
        }),
        n.d(t, "API", function() {
          return jc;
        }),
        n.d(t, "graphqlOperation", function() {
          return Pc;
        }),
        (function(e) {
          (e.Cognito = "COGNITO"),
            (e.Google = "Google"),
            (e.Facebook = "Facebook"),
            (e.Amazon = "LoginWithAmazon"),
            (e.Apple = "SignInWithApple");
        })(r || (r = {})),
        (function(e) {
          (e.NoConfig = "noConfig"),
            (e.MissingAuthConfig = "missingAuthConfig"),
            (e.EmptyUsername = "emptyUsername"),
            (e.InvalidUsername = "invalidUsername"),
            (e.EmptyPassword = "emptyPassword"),
            (e.EmptyCode = "emptyCode"),
            (e.SignUpError = "signUpError"),
            (e.NoMFA = "noMFA"),
            (e.InvalidMFA = "invalidMFA"),
            (e.EmptyChallengeResponse = "emptyChallengeResponse"),
            (e.NoUserSession = "noUserSession"),
            (e.Default = "default");
        })(i || (i = {}));
      var a = function(e, t) {
          var n = "function" == typeof Symbol && e[Symbol.iterator];
          if (!n) return e;
          var r,
            i,
            o = n.call(e),
            s = [];
          try {
            for (; (void 0 === t || t-- > 0) && !(r = o.next()).done; )
              s.push(r.value);
          } catch (e) {
            i = { error: e };
          } finally {
            try {
              r && !r.done && (n = o.return) && n.call(o);
            } finally {
              if (i) throw i.error;
            }
          }
          return s;
        },
        u = function() {
          for (var e = [], t = 0; t < arguments.length; t++)
            e = e.concat(a(arguments[t]));
          return e;
        },
        c = { VERBOSE: 1, DEBUG: 2, INFO: 3, WARN: 4, ERROR: 5 },
        f = (function() {
          function e(e, t) {
            void 0 === t && (t = "WARN"), (this.name = e), (this.level = t);
          }
          return (
            (e.prototype._padding = function(e) {
              return e < 10 ? "0" + e : "" + e;
            }),
            (e.prototype._ts = function() {
              var e = new Date();
              return (
                [
                  this._padding(e.getMinutes()),
                  this._padding(e.getSeconds())
                ].join(":") +
                "." +
                e.getMilliseconds()
              );
            }),
            (e.prototype._log = function(t) {
              for (var n = [], r = 1; r < arguments.length; r++)
                n[r - 1] = arguments[r];
              var i = this.level;
              e.LOG_LEVEL && (i = e.LOG_LEVEL),
                "undefined" != typeof window &&
                  window.LOG_LEVEL &&
                  (i = window.LOG_LEVEL);
              var o = c[i],
                s = c[t];
              if (s >= o) {
                var a = console.log.bind(console);
                "ERROR" === t &&
                  console.error &&
                  (a = console.error.bind(console)),
                  "WARN" === t &&
                    console.warn &&
                    (a = console.warn.bind(console));
                var u = "[" + t + "] " + this._ts() + " " + this.name;
                if (1 === n.length && "string" == typeof n[0])
                  a(u + " - " + n[0]);
                else if (1 === n.length) a(u, n[0]);
                else if ("string" == typeof n[0]) {
                  var f = n.slice(1);
                  1 === f.length && (f = f[0]), a(u + " - " + n[0], f);
                } else a(u, n);
              }
            }),
            (e.prototype.log = function() {
              for (var e = [], t = 0; t < arguments.length; t++)
                e[t] = arguments[t];
              this._log.apply(this, u(["INFO"], e));
            }),
            (e.prototype.info = function() {
              for (var e = [], t = 0; t < arguments.length; t++)
                e[t] = arguments[t];
              this._log.apply(this, u(["INFO"], e));
            }),
            (e.prototype.warn = function() {
              for (var e = [], t = 0; t < arguments.length; t++)
                e[t] = arguments[t];
              this._log.apply(this, u(["WARN"], e));
            }),
            (e.prototype.error = function() {
              for (var e = [], t = 0; t < arguments.length; t++)
                e[t] = arguments[t];
              this._log.apply(this, u(["ERROR"], e));
            }),
            (e.prototype.debug = function() {
              for (var e = [], t = 0; t < arguments.length; t++)
                e[t] = arguments[t];
              this._log.apply(this, u(["DEBUG"], e));
            }),
            (e.prototype.verbose = function() {
              for (var e = [], t = 0; t < arguments.length; t++)
                e[t] = arguments[t];
              this._log.apply(this, u(["VERBOSE"], e));
            }),
            (e.LOG_LEVEL = null),
            e
          );
        })(),
        l = function() {
          return (l =
            Object.assign ||
            function(e) {
              for (var t, n = 1, r = arguments.length; n < r; n++)
                for (var i in (t = arguments[n]))
                  Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
              return e;
            }).apply(this, arguments);
        },
        h = function(e, t) {
          var n = "function" == typeof Symbol && e[Symbol.iterator];
          if (!n) return e;
          var r,
            i,
            o = n.call(e),
            s = [];
          try {
            for (; (void 0 === t || t-- > 0) && !(r = o.next()).done; )
              s.push(r.value);
          } catch (e) {
            i = { error: e };
          } finally {
            try {
              r && !r.done && (n = o.return) && n.call(o);
            } finally {
              if (i) throw i.error;
            }
          }
          return s;
        },
        d = function() {
          for (var e = [], t = 0; t < arguments.length; t++)
            e = e.concat(h(arguments[t]));
          return e;
        },
        p = new f("Hub"),
        g =
          "undefined" != typeof Symbol && "function" == typeof Symbol.for
            ? Symbol.for("amplify_default")
            : "@@amplify_default";
      var y = new ((function() {
          function e(e) {
            (this.listeners = []),
              (this.patterns = []),
              (this.protectedChannels = [
                "core",
                "auth",
                "api",
                "analytics",
                "interactions",
                "pubsub",
                "storage",
                "xr"
              ]),
              (this.name = e);
          }
          return (
            (e.prototype.remove = function(e, t) {
              if (e instanceof RegExp) {
                var n = this.patterns.find(function(t) {
                  return t.pattern.source === e.source;
                });
                if (!n) return void p.warn("No listeners for " + e);
                this.patterns = d(
                  this.patterns.filter(function(e) {
                    return e !== n;
                  })
                );
              } else {
                var r = this.listeners[e];
                if (!r) return void p.warn("No listeners for " + e);
                this.listeners[e] = d(
                  r.filter(function(e) {
                    return e.callback !== t;
                  })
                );
              }
            }),
            (e.prototype.dispatch = function(e, t, n, r) {
              (void 0 === n && (n = ""),
              this.protectedChannels.indexOf(e) > -1) &&
                (r === g ||
                  p.warn(
                    "WARNING: " +
                      e +
                      " is protected and dispatching on it can have unintended consequences"
                  ));
              var i = {
                channel: e,
                payload: l({}, t),
                source: n,
                patternInfo: []
              };
              try {
                this._toListeners(i);
              } catch (e) {
                p.error(e);
              }
            }),
            (e.prototype.listen = function(e, t, n) {
              var r,
                i = this;
              if (
                (void 0 === n && (n = "noname"),
                (function(e) {
                  return void 0 !== e.onHubCapsule;
                })(t))
              )
                p.warn(
                  "WARNING onHubCapsule is Deprecated. Please pass in a callback."
                ),
                  (r = t.onHubCapsule.bind(t));
              else {
                if ("function" != typeof t)
                  throw new Error("No callback supplied to Hub");
                r = t;
              }
              if (e instanceof RegExp)
                this.patterns.push({ pattern: e, callback: r });
              else {
                var o = this.listeners[e];
                o || ((o = []), (this.listeners[e] = o)),
                  o.push({ name: n, callback: r });
              }
              return function() {
                i.remove(e, r);
              };
            }),
            (e.prototype._toListeners = function(e) {
              var t = e.channel,
                n = e.payload,
                r = this.listeners[t];
              if (
                (r &&
                  r.forEach(function(r) {
                    p.debug("Dispatching to " + t + " with ", n);
                    try {
                      r.callback(e);
                    } catch (e) {
                      p.error(e);
                    }
                  }),
                this.patterns.length > 0)
              ) {
                if (!n.message)
                  return void p.warn(
                    "Cannot perform pattern matching without a message key"
                  );
                var i = n.message;
                this.patterns.forEach(function(t) {
                  var n = i.match(t.pattern);
                  if (n) {
                    var r = h(n).slice(1),
                      o = l(l({}, e), { patternInfo: r });
                    try {
                      t.callback(o);
                    } catch (e) {
                      p.error(e);
                    }
                  }
                });
              }
            }),
            e
          );
        })())("__default__"),
        v = {},
        m = (function() {
          function e() {}
          return (
            (e.setItem = function(e, t) {
              return (v[e] = t), v[e];
            }),
            (e.getItem = function(e) {
              return Object.prototype.hasOwnProperty.call(v, e) ? v[e] : void 0;
            }),
            (e.removeItem = function(e) {
              return delete v[e];
            }),
            (e.clear = function() {
              return (v = {});
            }),
            e
          );
        })(),
        b = (function() {
          function e() {
            try {
              (this.storageWindow = window.localStorage),
                this.storageWindow.setItem("aws.amplify.test-ls", 1),
                this.storageWindow.removeItem("aws.amplify.test-ls");
            } catch (e) {
              this.storageWindow = m;
            }
          }
          return (
            (e.prototype.getStorage = function() {
              return this.storageWindow;
            }),
            e
          );
        })(),
        w = n(4),
        _ = (function() {
          var e = function(t, n) {
            return (e =
              Object.setPrototypeOf ||
              ({ __proto__: [] } instanceof Array &&
                function(e, t) {
                  e.__proto__ = t;
                }) ||
              function(e, t) {
                for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
              })(t, n);
          };
          return function(t, n) {
            function r() {
              this.constructor = t;
            }
            e(t, n),
              (t.prototype =
                null === n
                  ? Object.create(n)
                  : ((r.prototype = n.prototype), new r()));
          };
        })(),
        S = function(e, t, n, r) {
          return new (n || (n = Promise))(function(i, o) {
            function s(e) {
              try {
                u(r.next(e));
              } catch (e) {
                o(e);
              }
            }
            function a(e) {
              try {
                u(r.throw(e));
              } catch (e) {
                o(e);
              }
            }
            function u(e) {
              var t;
              e.done
                ? i(e.value)
                : ((t = e.value),
                  t instanceof n
                    ? t
                    : new n(function(e) {
                        e(t);
                      })).then(s, a);
            }
            u((r = r.apply(e, t || [])).next());
          });
        },
        E = function(e, t) {
          var n,
            r,
            i,
            o,
            s = {
              label: 0,
              sent: function() {
                if (1 & i[0]) throw i[1];
                return i[1];
              },
              trys: [],
              ops: []
            };
          return (
            (o = { next: a(0), throw: a(1), return: a(2) }),
            "function" == typeof Symbol &&
              (o[Symbol.iterator] = function() {
                return this;
              }),
            o
          );
          function a(o) {
            return function(a) {
              return (function(o) {
                if (n) throw new TypeError("Generator is already executing.");
                for (; s; )
                  try {
                    if (
                      ((n = 1),
                      r &&
                        (i =
                          2 & o[0]
                            ? r.return
                            : o[0]
                            ? r.throw || ((i = r.return) && i.call(r), 0)
                            : r.next) &&
                        !(i = i.call(r, o[1])).done)
                    )
                      return i;
                    switch (((r = 0), i && (o = [2 & o[0], i.value]), o[0])) {
                      case 0:
                      case 1:
                        i = o;
                        break;
                      case 4:
                        return s.label++, { value: o[1], done: !1 };
                      case 5:
                        s.label++, (r = o[1]), (o = [0]);
                        continue;
                      case 7:
                        (o = s.ops.pop()), s.trys.pop();
                        continue;
                      default:
                        if (
                          !((i = s.trys),
                          (i = i.length > 0 && i[i.length - 1]) ||
                            (6 !== o[0] && 2 !== o[0]))
                        ) {
                          s = 0;
                          continue;
                        }
                        if (
                          3 === o[0] &&
                          (!i || (o[1] > i[0] && o[1] < i[3]))
                        ) {
                          s.label = o[1];
                          break;
                        }
                        if (6 === o[0] && s.label < i[1]) {
                          (s.label = i[1]), (i = o);
                          break;
                        }
                        if (i && s.label < i[2]) {
                          (s.label = i[2]), s.ops.push(o);
                          break;
                        }
                        i[2] && s.ops.pop(), s.trys.pop();
                        continue;
                    }
                    o = t.call(e, s);
                  } catch (e) {
                    (o = [6, e]), (r = 0);
                  } finally {
                    n = i = 0;
                  }
                if (5 & o[0]) throw o[1];
                return { value: o[0] ? o[1] : void 0, done: !0 };
              })([o, a]);
            };
          }
        },
        A = function(e, t) {
          var n = "function" == typeof Symbol && e[Symbol.iterator];
          if (!n) return e;
          var r,
            i,
            o = n.call(e),
            s = [];
          try {
            for (; (void 0 === t || t-- > 0) && !(r = o.next()).done; )
              s.push(r.value);
          } catch (e) {
            i = { error: e };
          } finally {
            try {
              r && !r.done && (n = o.return) && n.call(o);
            } finally {
              if (i) throw i.error;
            }
          }
          return s;
        },
        I = function() {
          for (var e = [], t = 0; t < arguments.length; t++)
            e = e.concat(A(arguments[t]));
          return e;
        },
        T = new f("Util"),
        C = (function(e) {
          function t(t) {
            var n = e.call(this, t) || this;
            return (n.nonRetryable = !0), n;
          }
          return _(t, e), t;
        })(Error);
      var O = function(e, t, n) {
          return (
            void 0 === n && (n = 3e5),
            (function e(t, n, r, i) {
              return (
                void 0 === i && (i = 1),
                S(this, void 0, void 0, function() {
                  var o, s;
                  return E(this, function(a) {
                    switch (a.label) {
                      case 0:
                        if ("function" != typeof t)
                          throw Error("functionToRetry must be a function");
                        T.debug(
                          t.name +
                            " attempt #" +
                            i +
                            " with this vars: " +
                            JSON.stringify(n)
                        ),
                          (a.label = 1);
                      case 1:
                        return (
                          a.trys.push([1, 3, , 8]), [4, t.apply(void 0, I(n))]
                        );
                      case 2:
                        return [2, a.sent()];
                      case 3:
                        if (
                          ((o = a.sent()),
                          T.debug("error on " + t.name, o),
                          (u = o) && u.nonRetryable)
                        )
                          throw (T.debug(t.name + " non retryable error", o),
                          o);
                        return (
                          (s = r(i, n, o)),
                          T.debug(t.name + " retrying in " + s + " ms"),
                          !1 === s
                            ? [3, 6]
                            : [
                                4,
                                new Promise(function(e) {
                                  return setTimeout(e, s);
                                })
                              ]
                        );
                      case 4:
                        return a.sent(), [4, e(t, n, r, i + 1)];
                      case 5:
                        return [2, a.sent()];
                      case 6:
                        throw o;
                      case 7:
                        return [3, 8];
                      case 8:
                        return [2];
                    }
                    var u;
                  });
                })
              );
            })(
              e,
              t,
              (function(e) {
                return function(t) {
                  var n = 100 * Math.pow(2, t) + 100 * Math.random();
                  return !(n > e) && n;
                };
              })(n)
            )
          );
        },
        P = function(e, t, n, r) {
          return new (n || (n = Promise))(function(i, o) {
            function s(e) {
              try {
                u(r.next(e));
              } catch (e) {
                o(e);
              }
            }
            function a(e) {
              try {
                u(r.throw(e));
              } catch (e) {
                o(e);
              }
            }
            function u(e) {
              var t;
              e.done
                ? i(e.value)
                : ((t = e.value),
                  t instanceof n
                    ? t
                    : new n(function(e) {
                        e(t);
                      })).then(s, a);
            }
            u((r = r.apply(e, t || [])).next());
          });
        },
        k = function(e, t) {
          var n,
            r,
            i,
            o,
            s = {
              label: 0,
              sent: function() {
                if (1 & i[0]) throw i[1];
                return i[1];
              },
              trys: [],
              ops: []
            };
          return (
            (o = { next: a(0), throw: a(1), return: a(2) }),
            "function" == typeof Symbol &&
              (o[Symbol.iterator] = function() {
                return this;
              }),
            o
          );
          function a(o) {
            return function(a) {
              return (function(o) {
                if (n) throw new TypeError("Generator is already executing.");
                for (; s; )
                  try {
                    if (
                      ((n = 1),
                      r &&
                        (i =
                          2 & o[0]
                            ? r.return
                            : o[0]
                            ? r.throw || ((i = r.return) && i.call(r), 0)
                            : r.next) &&
                        !(i = i.call(r, o[1])).done)
                    )
                      return i;
                    switch (((r = 0), i && (o = [2 & o[0], i.value]), o[0])) {
                      case 0:
                      case 1:
                        i = o;
                        break;
                      case 4:
                        return s.label++, { value: o[1], done: !1 };
                      case 5:
                        s.label++, (r = o[1]), (o = [0]);
                        continue;
                      case 7:
                        (o = s.ops.pop()), s.trys.pop();
                        continue;
                      default:
                        if (
                          !((i = s.trys),
                          (i = i.length > 0 && i[i.length - 1]) ||
                            (6 !== o[0] && 2 !== o[0]))
                        ) {
                          s = 0;
                          continue;
                        }
                        if (
                          3 === o[0] &&
                          (!i || (o[1] > i[0] && o[1] < i[3]))
                        ) {
                          s.label = o[1];
                          break;
                        }
                        if (6 === o[0] && s.label < i[1]) {
                          (s.label = i[1]), (i = o);
                          break;
                        }
                        if (i && s.label < i[2]) {
                          (s.label = i[2]), s.ops.push(o);
                          break;
                        }
                        i[2] && s.ops.pop(), s.trys.pop();
                        continue;
                    }
                    o = t.call(e, s);
                  } catch (e) {
                    (o = [6, e]), (r = 0);
                  } finally {
                    n = i = 0;
                  }
                if (5 & o[0]) throw o[1];
                return { value: o[0] ? o[1] : void 0, done: !0 };
              })([o, a]);
            };
          }
        },
        N = new f("CognitoCredentials"),
        R = new Promise(function(e, t) {
          return Object(w.b)().isBrowser
            ? (window.gapi && window.gapi.auth2
              ? window.gapi.auth2
              : null)
              ? (N.debug("google api already loaded"), e())
              : void setTimeout(function() {
                  return e();
                }, 2e3)
            : (N.debug("not in the browser, directly resolved"), e());
        }),
        x = (function() {
          function e() {
            (this.initialized = !1),
              (this.refreshGoogleToken = this.refreshGoogleToken.bind(this)),
              (this._refreshGoogleTokenImpl = this._refreshGoogleTokenImpl.bind(
                this
              ));
          }
          return (
            (e.prototype.refreshGoogleToken = function() {
              return P(this, void 0, void 0, function() {
                return k(this, function(e) {
                  switch (e.label) {
                    case 0:
                      return this.initialized
                        ? [3, 2]
                        : (N.debug("need to wait for the Google SDK loaded"),
                          [4, R]);
                    case 1:
                      e.sent(),
                        (this.initialized = !0),
                        N.debug("finish waiting"),
                        (e.label = 2);
                    case 2:
                      return [2, this._refreshGoogleTokenImpl()];
                  }
                });
              });
            }),
            (e.prototype._refreshGoogleTokenImpl = function() {
              var e = null;
              return (
                Object(w.b)().isBrowser &&
                  (e =
                    window.gapi && window.gapi.auth2
                      ? window.gapi.auth2
                      : null),
                e
                  ? new Promise(function(t, n) {
                      e.getAuthInstance()
                        .then(function(e) {
                          e ||
                            (N.debug("google Auth undefined"),
                            n(new C("google Auth undefined")));
                          var r = e.currentUser.get();
                          r.isSignedIn()
                            ? (N.debug("refreshing the google access token"),
                              r
                                .reloadAuthResponse()
                                .then(function(e) {
                                  var n = e.id_token,
                                    r = e.expires_at;
                                  t({ token: n, expires_at: r });
                                })
                                .catch(function(e) {
                                  e && "network_error" === e.error
                                    ? n(
                                        "Network error reloading google auth response"
                                      )
                                    : n(
                                        new C(
                                          "Failed to reload google auth response"
                                        )
                                      );
                                }))
                            : n(new C("User is not signed in with Google"));
                        })
                        .catch(function(e) {
                          N.debug("Failed to refresh google token", e),
                            n(new C("Failed to refresh google token"));
                        });
                    })
                  : (N.debug("no gapi auth2 available"),
                    Promise.reject("no gapi auth2 available"))
              );
            }),
            e
          );
        })(),
        U = function(e, t, n, r) {
          return new (n || (n = Promise))(function(i, o) {
            function s(e) {
              try {
                u(r.next(e));
              } catch (e) {
                o(e);
              }
            }
            function a(e) {
              try {
                u(r.throw(e));
              } catch (e) {
                o(e);
              }
            }
            function u(e) {
              var t;
              e.done
                ? i(e.value)
                : ((t = e.value),
                  t instanceof n
                    ? t
                    : new n(function(e) {
                        e(t);
                      })).then(s, a);
            }
            u((r = r.apply(e, t || [])).next());
          });
        },
        D = function(e, t) {
          var n,
            r,
            i,
            o,
            s = {
              label: 0,
              sent: function() {
                if (1 & i[0]) throw i[1];
                return i[1];
              },
              trys: [],
              ops: []
            };
          return (
            (o = { next: a(0), throw: a(1), return: a(2) }),
            "function" == typeof Symbol &&
              (o[Symbol.iterator] = function() {
                return this;
              }),
            o
          );
          function a(o) {
            return function(a) {
              return (function(o) {
                if (n) throw new TypeError("Generator is already executing.");
                for (; s; )
                  try {
                    if (
                      ((n = 1),
                      r &&
                        (i =
                          2 & o[0]
                            ? r.return
                            : o[0]
                            ? r.throw || ((i = r.return) && i.call(r), 0)
                            : r.next) &&
                        !(i = i.call(r, o[1])).done)
                    )
                      return i;
                    switch (((r = 0), i && (o = [2 & o[0], i.value]), o[0])) {
                      case 0:
                      case 1:
                        i = o;
                        break;
                      case 4:
                        return s.label++, { value: o[1], done: !1 };
                      case 5:
                        s.label++, (r = o[1]), (o = [0]);
                        continue;
                      case 7:
                        (o = s.ops.pop()), s.trys.pop();
                        continue;
                      default:
                        if (
                          !((i = s.trys),
                          (i = i.length > 0 && i[i.length - 1]) ||
                            (6 !== o[0] && 2 !== o[0]))
                        ) {
                          s = 0;
                          continue;
                        }
                        if (
                          3 === o[0] &&
                          (!i || (o[1] > i[0] && o[1] < i[3]))
                        ) {
                          s.label = o[1];
                          break;
                        }
                        if (6 === o[0] && s.label < i[1]) {
                          (s.label = i[1]), (i = o);
                          break;
                        }
                        if (i && s.label < i[2]) {
                          (s.label = i[2]), s.ops.push(o);
                          break;
                        }
                        i[2] && s.ops.pop(), s.trys.pop();
                        continue;
                    }
                    o = t.call(e, s);
                  } catch (e) {
                    (o = [6, e]), (r = 0);
                  } finally {
                    n = i = 0;
                  }
                if (5 & o[0]) throw o[1];
                return { value: o[0] ? o[1] : void 0, done: !0 };
              })([o, a]);
            };
          }
        },
        M = new f("CognitoCredentials"),
        j = new Promise(function(e, t) {
          return Object(w.b)().isBrowser
            ? window.FB
              ? (M.debug("FB SDK already loaded"), e())
              : void setTimeout(function() {
                  return e();
                }, 2e3)
            : (M.debug("not in the browser, directly resolved"), e());
        }),
        L = (function() {
          function e() {
            (this.initialized = !1),
              (this.refreshFacebookToken = this.refreshFacebookToken.bind(
                this
              )),
              (this._refreshFacebookTokenImpl = this._refreshFacebookTokenImpl.bind(
                this
              ));
          }
          return (
            (e.prototype.refreshFacebookToken = function() {
              return U(this, void 0, void 0, function() {
                return D(this, function(e) {
                  switch (e.label) {
                    case 0:
                      return this.initialized
                        ? [3, 2]
                        : (M.debug("need to wait for the Facebook SDK loaded"),
                          [4, j]);
                    case 1:
                      e.sent(),
                        (this.initialized = !0),
                        M.debug("finish waiting"),
                        (e.label = 2);
                    case 2:
                      return [2, this._refreshFacebookTokenImpl()];
                  }
                });
              });
            }),
            (e.prototype._refreshFacebookTokenImpl = function() {
              var e = null;
              if ((Object(w.b)().isBrowser && (e = window.FB), !e)) {
                return (
                  M.debug("no fb sdk available"),
                  Promise.reject(new C("no fb sdk available"))
                );
              }
              return new Promise(function(t, n) {
                e.getLoginStatus(
                  function(e) {
                    if (e && e.authResponse) {
                      var r = e.authResponse,
                        i = r.accessToken,
                        o = 1e3 * r.expiresIn + new Date().getTime();
                      if (!i) {
                        s = "the jwtToken is undefined";
                        M.debug(s), n(new C(s));
                      }
                      t({ token: i, expires_at: o });
                    } else {
                      var s =
                        "no response from facebook when refreshing the jwt token";
                      M.debug(s), n(new C(s));
                    }
                  },
                  { scope: "public_profile,email" }
                );
              });
            }),
            e
          );
        })(),
        F = new x(),
        B = new L(),
        q = {
          userAgent: "aws-amplify/3.5.2 js",
          product: "",
          navigator: null,
          isReactNative: !1
        };
      if ("undefined" != typeof navigator && navigator.product)
        switch (
          ((q.product = navigator.product || ""),
          (q.navigator = navigator || null),
          navigator.product)
        ) {
          case "ReactNative":
            (q.userAgent = "aws-amplify/3.5.2 react-native"),
              (q.isReactNative = !0);
            break;
          default:
            (q.userAgent = "aws-amplify/3.5.2 js"), (q.isReactNative = !1);
        }
      var V = function() {
          return q.userAgent;
        },
        z = function(e, t) {
          var n = "function" == typeof Symbol && e[Symbol.iterator];
          if (!n) return e;
          var r,
            i,
            o = n.call(e),
            s = [];
          try {
            for (; (void 0 === t || t-- > 0) && !(r = o.next()).done; )
              s.push(r.value);
          } catch (e) {
            i = { error: e };
          } finally {
            try {
              r && !r.done && (n = o.return) && n.call(o);
            } finally {
              if (i) throw i.error;
            }
          }
          return s;
        },
        K = new f("Amplify"),
        G = new ((function() {
          function e() {
            (this._components = []),
              (this._config = {}),
              (this._modules = {}),
              (this.Auth = null),
              (this.Analytics = null),
              (this.API = null),
              (this.Credentials = null),
              (this.Storage = null),
              (this.I18n = null),
              (this.Cache = null),
              (this.PubSub = null),
              (this.Interactions = null),
              (this.Pushnotification = null),
              (this.UI = null),
              (this.XR = null),
              (this.Predictions = null),
              (this.DataStore = null),
              (this.Logger = f),
              (this.ServiceWorker = null);
          }
          return (
            (e.prototype.register = function(e) {
              K.debug("component registered in amplify", e),
                this._components.push(e),
                "function" == typeof e.getModuleName
                  ? ((this._modules[e.getModuleName()] = e),
                    (this[e.getModuleName()] = e))
                  : K.debug("no getModuleName method for component", e),
                e.configure(this._config);
            }),
            (e.prototype.configure = function(e) {
              var t = this;
              return e
                ? ((this._config = Object.assign(this._config, e)),
                  K.debug("amplify config", this._config),
                  Object.entries(this._modules).forEach(function(e) {
                    var n = z(e, 2),
                      r = (n[0], n[1]);
                    Object.keys(r).forEach(function(e) {
                      t._modules[e] && (r[e] = t._modules[e]);
                    });
                  }),
                  this._components.map(function(e) {
                    e.configure(t._config);
                  }),
                  this._config)
                : this._config;
            }),
            (e.prototype.addPluggable = function(e) {
              e &&
                e.getCategory &&
                "function" == typeof e.getCategory &&
                this._components.map(function(t) {
                  t.addPluggable &&
                    "function" == typeof t.addPluggable &&
                    t.addPluggable(e);
                });
            }),
            e
          );
        })())(),
        H = function(e, t) {
          return (H =
            Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array &&
              function(e, t) {
                e.__proto__ = t;
              }) ||
            function(e, t) {
              for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
            })(e, t);
        };
      function W(e, t) {
        function n() {
          this.constructor = e;
        }
        H(e, t),
          (e.prototype =
            null === t
              ? Object.create(t)
              : ((n.prototype = t.prototype), new n()));
      }
      var Y = function() {
        return (Y =
          Object.assign ||
          function(e) {
            for (var t, n = 1, r = arguments.length; n < r; n++)
              for (var i in (t = arguments[n]))
                Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
            return e;
          }).apply(this, arguments);
      };
      function J(e, t) {
        var n = {};
        for (var r in e)
          Object.prototype.hasOwnProperty.call(e, r) &&
            t.indexOf(r) < 0 &&
            (n[r] = e[r]);
        if (null != e && "function" == typeof Object.getOwnPropertySymbols) {
          var i = 0;
          for (r = Object.getOwnPropertySymbols(e); i < r.length; i++)
            t.indexOf(r[i]) < 0 &&
              Object.prototype.propertyIsEnumerable.call(e, r[i]) &&
              (n[r[i]] = e[r[i]]);
        }
        return n;
      }
      function Q(e, t, n, r) {
        return new (n || (n = Promise))(function(i, o) {
          function s(e) {
            try {
              u(r.next(e));
            } catch (e) {
              o(e);
            }
          }
          function a(e) {
            try {
              u(r.throw(e));
            } catch (e) {
              o(e);
            }
          }
          function u(e) {
            var t;
            e.done
              ? i(e.value)
              : ((t = e.value),
                t instanceof n
                  ? t
                  : new n(function(e) {
                      e(t);
                    })).then(s, a);
          }
          u((r = r.apply(e, t || [])).next());
        });
      }
      function $(e, t) {
        var n,
          r,
          i,
          o,
          s = {
            label: 0,
            sent: function() {
              if (1 & i[0]) throw i[1];
              return i[1];
            },
            trys: [],
            ops: []
          };
        return (
          (o = { next: a(0), throw: a(1), return: a(2) }),
          "function" == typeof Symbol &&
            (o[Symbol.iterator] = function() {
              return this;
            }),
          o
        );
        function a(o) {
          return function(a) {
            return (function(o) {
              if (n) throw new TypeError("Generator is already executing.");
              for (; s; )
                try {
                  if (
                    ((n = 1),
                    r &&
                      (i =
                        2 & o[0]
                          ? r.return
                          : o[0]
                          ? r.throw || ((i = r.return) && i.call(r), 0)
                          : r.next) &&
                      !(i = i.call(r, o[1])).done)
                  )
                    return i;
                  switch (((r = 0), i && (o = [2 & o[0], i.value]), o[0])) {
                    case 0:
                    case 1:
                      i = o;
                      break;
                    case 4:
                      return s.label++, { value: o[1], done: !1 };
                    case 5:
                      s.label++, (r = o[1]), (o = [0]);
                      continue;
                    case 7:
                      (o = s.ops.pop()), s.trys.pop();
                      continue;
                    default:
                      if (
                        !((i = s.trys),
                        (i = i.length > 0 && i[i.length - 1]) ||
                          (6 !== o[0] && 2 !== o[0]))
                      ) {
                        s = 0;
                        continue;
                      }
                      if (3 === o[0] && (!i || (o[1] > i[0] && o[1] < i[3]))) {
                        s.label = o[1];
                        break;
                      }
                      if (6 === o[0] && s.label < i[1]) {
                        (s.label = i[1]), (i = o);
                        break;
                      }
                      if (i && s.label < i[2]) {
                        (s.label = i[2]), s.ops.push(o);
                        break;
                      }
                      i[2] && s.ops.pop(), s.trys.pop();
                      continue;
                  }
                  o = t.call(e, s);
                } catch (e) {
                  (o = [6, e]), (r = 0);
                } finally {
                  n = i = 0;
                }
              if (5 & o[0]) throw o[1];
              return { value: o[0] ? o[1] : void 0, done: !0 };
            })([o, a]);
          };
        }
      }
      function X(e) {
        var t = "function" == typeof Symbol && Symbol.iterator,
          n = t && e[t],
          r = 0;
        if (n) return n.call(e);
        if (e && "number" == typeof e.length)
          return {
            next: function() {
              return (
                e && r >= e.length && (e = void 0),
                { value: e && e[r++], done: !e }
              );
            }
          };
        throw new TypeError(
          t ? "Object is not iterable." : "Symbol.iterator is not defined."
        );
      }
      function Z(e, t) {
        var n = "function" == typeof Symbol && e[Symbol.iterator];
        if (!n) return e;
        var r,
          i,
          o = n.call(e),
          s = [];
        try {
          for (; (void 0 === t || t-- > 0) && !(r = o.next()).done; )
            s.push(r.value);
        } catch (e) {
          i = { error: e };
        } finally {
          try {
            r && !r.done && (n = o.return) && n.call(o);
          } finally {
            if (i) throw i.error;
          }
        }
        return s;
      }
      function ee() {
        for (var e = [], t = 0; t < arguments.length; t++)
          e = e.concat(Z(arguments[t]));
        return e;
      }
      /*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
      var te = function(e, t) {
        return (te =
          Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array &&
            function(e, t) {
              e.__proto__ = t;
            }) ||
          function(e, t) {
            for (var n in t)
              Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
          })(e, t);
      };
      function ne(e, t) {
        function n() {
          this.constructor = e;
        }
        te(e, t),
          (e.prototype =
            null === t
              ? Object.create(t)
              : ((n.prototype = t.prototype), new n()));
      }
      var re = function() {
        return (re =
          Object.assign ||
          function(e) {
            for (var t, n = 1, r = arguments.length; n < r; n++)
              for (var i in (t = arguments[n]))
                Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
            return e;
          }).apply(this, arguments);
      };
      function ie(e, t, n, r) {
        return new (n || (n = Promise))(function(i, o) {
          function s(e) {
            try {
              u(r.next(e));
            } catch (e) {
              o(e);
            }
          }
          function a(e) {
            try {
              u(r.throw(e));
            } catch (e) {
              o(e);
            }
          }
          function u(e) {
            var t;
            e.done
              ? i(e.value)
              : ((t = e.value),
                t instanceof n
                  ? t
                  : new n(function(e) {
                      e(t);
                    })).then(s, a);
          }
          u((r = r.apply(e, t || [])).next());
        });
      }
      function oe(e, t) {
        var n,
          r,
          i,
          o,
          s = {
            label: 0,
            sent: function() {
              if (1 & i[0]) throw i[1];
              return i[1];
            },
            trys: [],
            ops: []
          };
        return (
          (o = { next: a(0), throw: a(1), return: a(2) }),
          "function" == typeof Symbol &&
            (o[Symbol.iterator] = function() {
              return this;
            }),
          o
        );
        function a(o) {
          return function(a) {
            return (function(o) {
              if (n) throw new TypeError("Generator is already executing.");
              for (; s; )
                try {
                  if (
                    ((n = 1),
                    r &&
                      (i =
                        2 & o[0]
                          ? r.return
                          : o[0]
                          ? r.throw || ((i = r.return) && i.call(r), 0)
                          : r.next) &&
                      !(i = i.call(r, o[1])).done)
                  )
                    return i;
                  switch (((r = 0), i && (o = [2 & o[0], i.value]), o[0])) {
                    case 0:
                    case 1:
                      i = o;
                      break;
                    case 4:
                      return s.label++, { value: o[1], done: !1 };
                    case 5:
                      s.label++, (r = o[1]), (o = [0]);
                      continue;
                    case 7:
                      (o = s.ops.pop()), s.trys.pop();
                      continue;
                    default:
                      if (
                        !((i = s.trys),
                        (i = i.length > 0 && i[i.length - 1]) ||
                          (6 !== o[0] && 2 !== o[0]))
                      ) {
                        s = 0;
                        continue;
                      }
                      if (3 === o[0] && (!i || (o[1] > i[0] && o[1] < i[3]))) {
                        s.label = o[1];
                        break;
                      }
                      if (6 === o[0] && s.label < i[1]) {
                        (s.label = i[1]), (i = o);
                        break;
                      }
                      if (i && s.label < i[2]) {
                        (s.label = i[2]), s.ops.push(o);
                        break;
                      }
                      i[2] && s.ops.pop(), s.trys.pop();
                      continue;
                  }
                  o = t.call(e, s);
                } catch (e) {
                  (o = [6, e]), (r = 0);
                } finally {
                  n = i = 0;
                }
              if (5 & o[0]) throw o[1];
              return { value: o[0] ? o[1] : void 0, done: !0 };
            })([o, a]);
          };
        }
      }
      Object.create;
      function se(e, t) {
        var n = "function" == typeof Symbol && e[Symbol.iterator];
        if (!n) return e;
        var r,
          i,
          o = n.call(e),
          s = [];
        try {
          for (; (void 0 === t || t-- > 0) && !(r = o.next()).done; )
            s.push(r.value);
        } catch (e) {
          i = { error: e };
        } finally {
          try {
            r && !r.done && (n = o.return) && n.call(o);
          } finally {
            if (i) throw i.error;
          }
        }
        return s;
      }
      Object.create;
      var ae = function() {
          var e = [],
            t = [],
            n = new Set(),
            r = function(n) {
              return (
                e.forEach(function(e) {
                  n.add(e.middleware, Y({}, e));
                }),
                t.forEach(function(e) {
                  n.addRelativeTo(e.middleware, Y({}, e));
                }),
                n
              );
            },
            i = function(e) {
              var t = [];
              return (
                e.before.forEach(function(e) {
                  0 === e.before.length && 0 === e.after.length
                    ? t.push(e)
                    : t.push.apply(t, ee(i(e)));
                }),
                t.push(e),
                e.after.reverse().forEach(function(e) {
                  0 === e.before.length && 0 === e.after.length
                    ? t.push(e)
                    : t.push.apply(t, ee(i(e)));
                }),
                t
              );
            },
            o = function() {
              var n,
                r = [],
                o = [],
                s = {};
              return (
                e.forEach(function(e) {
                  var t = Y(Y({}, e), { before: [], after: [] });
                  t.name && (s[t.name] = t), r.push(t);
                }),
                t.forEach(function(e) {
                  var t = Y(Y({}, e), { before: [], after: [] });
                  t.name && (s[t.name] = t), o.push(t);
                }),
                o.forEach(function(e) {
                  if (e.toMiddleware) {
                    var t = s[e.toMiddleware];
                    if (void 0 === t)
                      throw new Error(
                        e.toMiddleware +
                          " is not found when adding " +
                          (e.name || "anonymous") +
                          " middleware " +
                          e.relation +
                          " " +
                          e.toMiddleware
                      );
                    "after" === e.relation && t.after.push(e),
                      "before" === e.relation && t.before.push(e);
                  }
                }),
                ((n = r),
                n.sort(function(e, t) {
                  return (
                    ue[t.step] - ue[e.step] ||
                    ce[t.priority || "normal"] - ce[e.priority || "normal"]
                  );
                }))
                  .map(i)
                  .reduce(function(e, t) {
                    return e.push.apply(e, ee(t)), e;
                  }, [])
                  .map(function(e) {
                    return e.middleware;
                  })
              );
            },
            s = {
              add: function(t, r) {
                void 0 === r && (r = {});
                var i = r.name,
                  o = Y(
                    { step: "initialize", priority: "normal", middleware: t },
                    r
                  );
                if (i) {
                  if (n.has(i))
                    throw new Error("Duplicate middleware name '" + i + "'");
                  n.add(i);
                }
                e.push(o);
              },
              addRelativeTo: function(e, r) {
                var i = r.name,
                  o = Y({ middleware: e }, r);
                if (i) {
                  if (n.has(i))
                    throw new Error("Duplicated middleware name '" + i + "'");
                  n.add(i);
                }
                t.push(o);
              },
              clone: function() {
                return r(ae());
              },
              use: function(e) {
                e.applyToStack(s);
              },
              remove: function(r) {
                return "string" == typeof r
                  ? (function(r) {
                      var i = !1,
                        o = function(e) {
                          return (
                            !e.name ||
                            e.name !== r ||
                            ((i = !0), n.delete(r), !1)
                          );
                        };
                      return (e = e.filter(o)), (t = t.filter(o)), i;
                    })(r)
                  : (function(r) {
                      var i = !1,
                        o = function(e) {
                          return (
                            e.middleware !== r ||
                            ((i = !0), e.name && n.delete(e.name), !1)
                          );
                        };
                      return (e = e.filter(o)), (t = t.filter(o)), i;
                    })(r);
              },
              removeByTag: function(r) {
                var i = !1,
                  o = function(e) {
                    var t = e.tags,
                      o = e.name;
                    return (
                      !t || !t.includes(r) || (o && n.delete(o), (i = !0), !1)
                    );
                  };
                return (e = e.filter(o)), (t = t.filter(o)), i;
              },
              concat: function(e) {
                var t = r(ae());
                return t.use(e), t;
              },
              applyToStack: r,
              resolve: function(e, t) {
                var n, r;
                try {
                  for (
                    var i = X(o().reverse()), s = i.next();
                    !s.done;
                    s = i.next()
                  ) {
                    e = (0, s.value)(e, t);
                  }
                } catch (e) {
                  n = { error: e };
                } finally {
                  try {
                    s && !s.done && (r = i.return) && r.call(i);
                  } finally {
                    if (n) throw n.error;
                  }
                }
                return e;
              }
            };
          return s;
        },
        ue = {
          initialize: 5,
          serialize: 4,
          build: 3,
          finalizeRequest: 2,
          deserialize: 1
        },
        ce = { high: 3, normal: 2, low: 1 },
        fe = (function() {
          function e(e) {
            (this.middlewareStack = ae()), (this.config = e);
          }
          return (
            (e.prototype.send = function(e, t, n) {
              var r = "function" != typeof t ? t : void 0,
                i = "function" == typeof t ? t : n,
                o = e.resolveMiddleware(this.middlewareStack, this.config, r);
              if (!i)
                return o(e).then(function(e) {
                  return e.output;
                });
              o(e)
                .then(
                  function(e) {
                    return i(null, e.output);
                  },
                  function(e) {
                    return i(e);
                  }
                )
                .catch(function() {});
            }),
            (e.prototype.destroy = function() {
              this.config.requestHandler.destroy &&
                this.config.requestHandler.destroy();
            }),
            e
          );
        })(),
        le = function() {
          this.middlewareStack = ae();
        };
      function he(e) {
        for (var t = [], n = 1; n < arguments.length; n++)
          t[n - 1] = arguments[n];
        return (
          "object" == typeof e &&
          (("__type" in e && t.indexOf(e.__type) > -1) ||
            ("name" in e && t.indexOf(e.name) > -1))
        );
      }
      var de = function() {
        var e = Object.getPrototypeOf(this).constructor,
          t = Function.bind.apply(String, ee([null], arguments)),
          n = new t();
        return Object.setPrototypeOf(n, e.prototype), n;
      };
      (de.prototype = Object.create(String.prototype, {
        constructor: {
          value: de,
          enumerable: !1,
          writable: !0,
          configurable: !0
        }
      })),
        Object.setPrototypeOf(de, String);
      !(function(e) {
        function t() {
          return (null !== e && e.apply(this, arguments)) || this;
        }
        W(t, e),
          (t.prototype.deserializeJSON = function() {
            return JSON.parse(e.prototype.toString.call(this));
          }),
          (t.prototype.toJSON = function() {
            return e.prototype.toString.call(this);
          }),
          (t.fromObject = function(e) {
            return e instanceof t
              ? e
              : new t(
                  e instanceof String || "string" == typeof e
                    ? e
                    : JSON.stringify(e)
                );
          });
      })(de);
      var pe,
        ge,
        ye,
        ve,
        me,
        be,
        we,
        _e,
        Se,
        Ee,
        Ae,
        Ie,
        Te,
        Ce,
        Oe,
        Pe,
        ke,
        Ne,
        Re,
        xe,
        Ue,
        De,
        Me,
        je,
        Le,
        Fe,
        Be,
        qe,
        Ve,
        ze,
        Ke,
        Ge,
        He,
        We,
        Ye,
        Je,
        Qe,
        $e,
        Xe,
        Ze,
        et,
        tt,
        nt,
        rt,
        it,
        ot,
        st,
        at,
        ut,
        ct,
        ft,
        lt,
        ht,
        dt,
        pt,
        gt,
        yt,
        vt,
        mt,
        bt,
        wt,
        _t,
        St,
        Et,
        At,
        It,
        Tt,
        Ct,
        Ot,
        Pt,
        kt,
        Nt,
        Rt,
        xt,
        Ut,
        Dt,
        Mt,
        jt,
        Lt,
        Ft,
        Bt,
        qt,
        Vt,
        zt,
        Kt,
        Gt,
        Ht,
        Wt,
        Yt,
        Jt,
        Qt,
        $t,
        Xt,
        Zt,
        en,
        tn,
        nn,
        rn,
        on,
        sn,
        an,
        un,
        cn,
        fn,
        ln,
        hn,
        dn,
        pn,
        gn,
        yn;
      !(function(e) {
        (e.AUTHENTICATED_ROLE = "AuthenticatedRole"), (e.DENY = "Deny");
      })(pe || (pe = {})),
        ((ye = ge || (ge = {})).filterSensitiveLog = function(e) {
          return re({}, e);
        }),
        (ye.isa = function(e) {
          return he(e, "CognitoIdentityProvider");
        }),
        ((me = ve || (ve = {})).filterSensitiveLog = function(e) {
          return re({}, e);
        }),
        (me.isa = function(e) {
          return he(e, "ConcurrentModificationException");
        }),
        ((we = be || (be = {})).filterSensitiveLog = function(e) {
          return re({}, e);
        }),
        (we.isa = function(e) {
          return he(e, "CreateIdentityPoolInput");
        }),
        ((Se = _e || (_e = {})).filterSensitiveLog = function(e) {
          return re({}, e);
        }),
        (Se.isa = function(e) {
          return he(e, "Credentials");
        }),
        ((Ae = Ee || (Ee = {})).filterSensitiveLog = function(e) {
          return re({}, e);
        }),
        (Ae.isa = function(e) {
          return he(e, "DeleteIdentitiesInput");
        }),
        ((Te = Ie || (Ie = {})).filterSensitiveLog = function(e) {
          return re({}, e);
        }),
        (Te.isa = function(e) {
          return he(e, "DeleteIdentitiesResponse");
        }),
        ((Oe = Ce || (Ce = {})).filterSensitiveLog = function(e) {
          return re({}, e);
        }),
        (Oe.isa = function(e) {
          return he(e, "DeleteIdentityPoolInput");
        }),
        ((ke = Pe || (Pe = {})).filterSensitiveLog = function(e) {
          return re({}, e);
        }),
        (ke.isa = function(e) {
          return he(e, "DescribeIdentityInput");
        }),
        ((Re = Ne || (Ne = {})).filterSensitiveLog = function(e) {
          return re({}, e);
        }),
        (Re.isa = function(e) {
          return he(e, "DescribeIdentityPoolInput");
        }),
        ((Ue = xe || (xe = {})).filterSensitiveLog = function(e) {
          return re({}, e);
        }),
        (Ue.isa = function(e) {
          return he(e, "DeveloperUserAlreadyRegisteredException");
        }),
        (function(e) {
          (e.ACCESS_DENIED = "AccessDenied"),
            (e.INTERNAL_SERVER_ERROR = "InternalServerError");
        })(De || (De = {})),
        ((je = Me || (Me = {})).filterSensitiveLog = function(e) {
          return re({}, e);
        }),
        (je.isa = function(e) {
          return he(e, "ExternalServiceException");
        }),
        ((Fe = Le || (Le = {})).filterSensitiveLog = function(e) {
          return re({}, e);
        }),
        (Fe.isa = function(e) {
          return he(e, "GetCredentialsForIdentityInput");
        }),
        ((qe = Be || (Be = {})).filterSensitiveLog = function(e) {
          return re({}, e);
        }),
        (qe.isa = function(e) {
          return he(e, "GetCredentialsForIdentityResponse");
        }),
        ((ze = Ve || (Ve = {})).filterSensitiveLog = function(e) {
          return re({}, e);
        }),
        (ze.isa = function(e) {
          return he(e, "GetIdentityPoolRolesInput");
        }),
        ((Ge = Ke || (Ke = {})).filterSensitiveLog = function(e) {
          return re({}, e);
        }),
        (Ge.isa = function(e) {
          return he(e, "GetIdentityPoolRolesResponse");
        }),
        ((We = He || (He = {})).filterSensitiveLog = function(e) {
          return re({}, e);
        }),
        (We.isa = function(e) {
          return he(e, "GetIdInput");
        }),
        ((Je = Ye || (Ye = {})).filterSensitiveLog = function(e) {
          return re({}, e);
        }),
        (Je.isa = function(e) {
          return he(e, "GetIdResponse");
        }),
        (($e = Qe || (Qe = {})).filterSensitiveLog = function(e) {
          return re({}, e);
        }),
        ($e.isa = function(e) {
          return he(e, "GetOpenIdTokenForDeveloperIdentityInput");
        }),
        ((Ze = Xe || (Xe = {})).filterSensitiveLog = function(e) {
          return re({}, e);
        }),
        (Ze.isa = function(e) {
          return he(e, "GetOpenIdTokenForDeveloperIdentityResponse");
        }),
        ((tt = et || (et = {})).filterSensitiveLog = function(e) {
          return re({}, e);
        }),
        (tt.isa = function(e) {
          return he(e, "GetOpenIdTokenInput");
        }),
        ((rt = nt || (nt = {})).filterSensitiveLog = function(e) {
          return re({}, e);
        }),
        (rt.isa = function(e) {
          return he(e, "GetOpenIdTokenResponse");
        }),
        ((ot = it || (it = {})).filterSensitiveLog = function(e) {
          return re({}, e);
        }),
        (ot.isa = function(e) {
          return he(e, "IdentityDescription");
        }),
        ((at = st || (st = {})).filterSensitiveLog = function(e) {
          return re({}, e);
        }),
        (at.isa = function(e) {
          return he(e, "IdentityPool");
        }),
        ((ct = ut || (ut = {})).filterSensitiveLog = function(e) {
          return re({}, e);
        }),
        (ct.isa = function(e) {
          return he(e, "IdentityPoolShortDescription");
        }),
        ((lt = ft || (ft = {})).filterSensitiveLog = function(e) {
          return re({}, e);
        }),
        (lt.isa = function(e) {
          return he(e, "InternalErrorException");
        }),
        ((dt = ht || (ht = {})).filterSensitiveLog = function(e) {
          return re({}, e);
        }),
        (dt.isa = function(e) {
          return he(e, "InvalidIdentityPoolConfigurationException");
        }),
        ((gt = pt || (pt = {})).filterSensitiveLog = function(e) {
          return re({}, e);
        }),
        (gt.isa = function(e) {
          return he(e, "InvalidParameterException");
        }),
        ((vt = yt || (yt = {})).filterSensitiveLog = function(e) {
          return re({}, e);
        }),
        (vt.isa = function(e) {
          return he(e, "LimitExceededException");
        }),
        ((bt = mt || (mt = {})).filterSensitiveLog = function(e) {
          return re({}, e);
        }),
        (bt.isa = function(e) {
          return he(e, "ListIdentitiesInput");
        }),
        ((_t = wt || (wt = {})).filterSensitiveLog = function(e) {
          return re({}, e);
        }),
        (_t.isa = function(e) {
          return he(e, "ListIdentitiesResponse");
        }),
        ((Et = St || (St = {})).filterSensitiveLog = function(e) {
          return re({}, e);
        }),
        (Et.isa = function(e) {
          return he(e, "ListIdentityPoolsInput");
        }),
        ((It = At || (At = {})).filterSensitiveLog = function(e) {
          return re({}, e);
        }),
        (It.isa = function(e) {
          return he(e, "ListIdentityPoolsResponse");
        }),
        ((Ct = Tt || (Tt = {})).filterSensitiveLog = function(e) {
          return re({}, e);
        }),
        (Ct.isa = function(e) {
          return he(e, "ListTagsForResourceInput");
        }),
        ((Pt = Ot || (Ot = {})).filterSensitiveLog = function(e) {
          return re({}, e);
        }),
        (Pt.isa = function(e) {
          return he(e, "ListTagsForResourceResponse");
        }),
        ((Nt = kt || (kt = {})).filterSensitiveLog = function(e) {
          return re({}, e);
        }),
        (Nt.isa = function(e) {
          return he(e, "LookupDeveloperIdentityInput");
        }),
        ((xt = Rt || (Rt = {})).filterSensitiveLog = function(e) {
          return re({}, e);
        }),
        (xt.isa = function(e) {
          return he(e, "LookupDeveloperIdentityResponse");
        }),
        ((Dt = Ut || (Ut = {})).filterSensitiveLog = function(e) {
          return re({}, e);
        }),
        (Dt.isa = function(e) {
          return he(e, "MappingRule");
        }),
        (function(e) {
          (e.CONTAINS = "Contains"),
            (e.EQUALS = "Equals"),
            (e.NOT_EQUAL = "NotEqual"),
            (e.STARTS_WITH = "StartsWith");
        })(Mt || (Mt = {})),
        ((Lt = jt || (jt = {})).filterSensitiveLog = function(e) {
          return re({}, e);
        }),
        (Lt.isa = function(e) {
          return he(e, "MergeDeveloperIdentitiesInput");
        }),
        ((Bt = Ft || (Ft = {})).filterSensitiveLog = function(e) {
          return re({}, e);
        }),
        (Bt.isa = function(e) {
          return he(e, "MergeDeveloperIdentitiesResponse");
        }),
        ((Vt = qt || (qt = {})).filterSensitiveLog = function(e) {
          return re({}, e);
        }),
        (Vt.isa = function(e) {
          return he(e, "NotAuthorizedException");
        }),
        ((Kt = zt || (zt = {})).filterSensitiveLog = function(e) {
          return re({}, e);
        }),
        (Kt.isa = function(e) {
          return he(e, "ResourceConflictException");
        }),
        ((Ht = Gt || (Gt = {})).filterSensitiveLog = function(e) {
          return re({}, e);
        }),
        (Ht.isa = function(e) {
          return he(e, "ResourceNotFoundException");
        }),
        ((Yt = Wt || (Wt = {})).filterSensitiveLog = function(e) {
          return re({}, e);
        }),
        (Yt.isa = function(e) {
          return he(e, "RoleMapping");
        }),
        (function(e) {
          (e.RULES = "Rules"), (e.TOKEN = "Token");
        })(Jt || (Jt = {})),
        (($t = Qt || (Qt = {})).filterSensitiveLog = function(e) {
          return re({}, e);
        }),
        ($t.isa = function(e) {
          return he(e, "RulesConfigurationType");
        }),
        ((Zt = Xt || (Xt = {})).filterSensitiveLog = function(e) {
          return re({}, e);
        }),
        (Zt.isa = function(e) {
          return he(e, "SetIdentityPoolRolesInput");
        }),
        ((tn = en || (en = {})).filterSensitiveLog = function(e) {
          return re({}, e);
        }),
        (tn.isa = function(e) {
          return he(e, "TagResourceInput");
        }),
        ((rn = nn || (nn = {})).filterSensitiveLog = function(e) {
          return re({}, e);
        }),
        (rn.isa = function(e) {
          return he(e, "TagResourceResponse");
        }),
        ((sn = on || (on = {})).filterSensitiveLog = function(e) {
          return re({}, e);
        }),
        (sn.isa = function(e) {
          return he(e, "TooManyRequestsException");
        }),
        ((un = an || (an = {})).filterSensitiveLog = function(e) {
          return re({}, e);
        }),
        (un.isa = function(e) {
          return he(e, "UnlinkDeveloperIdentityInput");
        }),
        ((fn = cn || (cn = {})).filterSensitiveLog = function(e) {
          return re({}, e);
        }),
        (fn.isa = function(e) {
          return he(e, "UnlinkIdentityInput");
        }),
        ((hn = ln || (ln = {})).filterSensitiveLog = function(e) {
          return re({}, e);
        }),
        (hn.isa = function(e) {
          return he(e, "UnprocessedIdentityId");
        }),
        ((pn = dn || (dn = {})).filterSensitiveLog = function(e) {
          return re({}, e);
        }),
        (pn.isa = function(e) {
          return he(e, "UntagResourceInput");
        }),
        ((yn = gn || (gn = {})).filterSensitiveLog = function(e) {
          return re({}, e);
        }),
        (yn.isa = function(e) {
          return he(e, "UntagResourceResponse");
        });
      var vn = (function() {
          function e(e) {
            (this.statusCode = e.statusCode),
              (this.headers = e.headers || {}),
              (this.body = e.body);
          }
          return (
            (e.isInstance = function(e) {
              if (!e) return !1;
              var t = e;
              return (
                "number" == typeof t.statusCode && "object" == typeof t.headers
              );
            }),
            e
          );
        })(),
        mn = (function() {
          function e(e) {
            (this.method = e.method || "GET"),
              (this.hostname = e.hostname || "localhost"),
              (this.port = e.port),
              (this.query = e.query || {}),
              (this.headers = e.headers || {}),
              (this.body = e.body),
              (this.protocol = e.protocol
                ? ":" !== e.protocol.substr(-1)
                  ? e.protocol + ":"
                  : e.protocol
                : "https:"),
              (this.path = e.path
                ? "/" !== e.path.charAt(0)
                  ? "/" + e.path
                  : e.path
                : "/");
          }
          return (
            (e.isInstance = function(e) {
              if (!e) return !1;
              var t = e;
              return (
                "method" in t &&
                "protocol" in t &&
                "hostname" in t &&
                "path" in t &&
                "object" == typeof t.query &&
                "object" == typeof t.headers
              );
            }),
            (e.prototype.clone = function() {
              var t,
                n = new e(Y(Y({}, this), { headers: Y({}, this.headers) }));
              return (
                n.query &&
                  (n.query =
                    ((t = n.query),
                    Object.keys(t).reduce(function(e, n) {
                      var r,
                        i = t[n];
                      return Y(
                        Y({}, e),
                        (((r = {})[n] = Array.isArray(i) ? ee(i) : i), r)
                      );
                    }, {}))),
                n
              );
            }),
            e
          );
        })();
      var bn = function(e, t) {
          return ie(void 0, void 0, void 0, function() {
            var n, r, i, o, s, a, u, c, f, l, h, d, p, g, y, v;
            return oe(this, function(m) {
              switch (m.label) {
                case 0:
                  return (r = [re({}, e)]), (v = {}), [4, Yn(e.body, t)];
                case 1:
                  switch (
                    ((n = re.apply(
                      void 0,
                      r.concat([((v.body = m.sent()), v)])
                    )),
                    (o = "UnknownError"),
                    (s = n.body.__type.split("#")),
                    (o = void 0 === s[1] ? s[0] : s[1]),
                    o)
                  ) {
                    case "ExternalServiceException":
                    case "com.amazonaws.cognitoidentity#ExternalServiceException":
                      return [3, 2];
                    case "InternalErrorException":
                    case "com.amazonaws.cognitoidentity#InternalErrorException":
                      return [3, 4];
                    case "InvalidIdentityPoolConfigurationException":
                    case "com.amazonaws.cognitoidentity#InvalidIdentityPoolConfigurationException":
                      return [3, 6];
                    case "InvalidParameterException":
                    case "com.amazonaws.cognitoidentity#InvalidParameterException":
                      return [3, 8];
                    case "NotAuthorizedException":
                    case "com.amazonaws.cognitoidentity#NotAuthorizedException":
                      return [3, 10];
                    case "ResourceConflictException":
                    case "com.amazonaws.cognitoidentity#ResourceConflictException":
                      return [3, 12];
                    case "ResourceNotFoundException":
                    case "com.amazonaws.cognitoidentity#ResourceNotFoundException":
                      return [3, 14];
                    case "TooManyRequestsException":
                    case "com.amazonaws.cognitoidentity#TooManyRequestsException":
                      return [3, 16];
                  }
                  return [3, 18];
                case 2:
                  return (a = [{}]), [4, _n(n, t)];
                case 3:
                  return (
                    (i = re.apply(void 0, [
                      re.apply(void 0, a.concat([m.sent()])),
                      { name: o, $metadata: Gn(e) }
                    ])),
                    [3, 19]
                  );
                case 4:
                  return (u = [{}]), [4, Sn(n, t)];
                case 5:
                  return (
                    (i = re.apply(void 0, [
                      re.apply(void 0, u.concat([m.sent()])),
                      { name: o, $metadata: Gn(e) }
                    ])),
                    [3, 19]
                  );
                case 6:
                  return (c = [{}]), [4, En(n, t)];
                case 7:
                  return (
                    (i = re.apply(void 0, [
                      re.apply(void 0, c.concat([m.sent()])),
                      { name: o, $metadata: Gn(e) }
                    ])),
                    [3, 19]
                  );
                case 8:
                  return (f = [{}]), [4, An(n, t)];
                case 9:
                  return (
                    (i = re.apply(void 0, [
                      re.apply(void 0, f.concat([m.sent()])),
                      { name: o, $metadata: Gn(e) }
                    ])),
                    [3, 19]
                  );
                case 10:
                  return (l = [{}]), [4, Tn(n, t)];
                case 11:
                  return (
                    (i = re.apply(void 0, [
                      re.apply(void 0, l.concat([m.sent()])),
                      { name: o, $metadata: Gn(e) }
                    ])),
                    [3, 19]
                  );
                case 12:
                  return (h = [{}]), [4, Cn(n, t)];
                case 13:
                  return (
                    (i = re.apply(void 0, [
                      re.apply(void 0, h.concat([m.sent()])),
                      { name: o, $metadata: Gn(e) }
                    ])),
                    [3, 19]
                  );
                case 14:
                  return (d = [{}]), [4, On(n, t)];
                case 15:
                  return (
                    (i = re.apply(void 0, [
                      re.apply(void 0, d.concat([m.sent()])),
                      { name: o, $metadata: Gn(e) }
                    ])),
                    [3, 19]
                  );
                case 16:
                  return (p = [{}]), [4, Pn(n, t)];
                case 17:
                  return (
                    (i = re.apply(void 0, [
                      re.apply(void 0, p.concat([m.sent()])),
                      { name: o, $metadata: Gn(e) }
                    ])),
                    [3, 19]
                  );
                case 18:
                  (g = n.body),
                    (o = g.code || g.Code || o),
                    (i = re(re({}, g), {
                      name: "" + o,
                      message: g.message || g.Message || o,
                      $fault: "client",
                      $metadata: Gn(e)
                    })),
                    (m.label = 19);
                case 19:
                  return (
                    (y = i.message || i.Message || o),
                    (i.message = y),
                    delete i.Message,
                    [2, Promise.reject(Object.assign(new Error(y), i))]
                  );
              }
            });
          });
        },
        wn = function(e, t) {
          return ie(void 0, void 0, void 0, function() {
            var n, r, i, o, s, a, u, c, f, l, h, d, p, g, y, v;
            return oe(this, function(m) {
              switch (m.label) {
                case 0:
                  return (r = [re({}, e)]), (v = {}), [4, Yn(e.body, t)];
                case 1:
                  switch (
                    ((n = re.apply(
                      void 0,
                      r.concat([((v.body = m.sent()), v)])
                    )),
                    (o = "UnknownError"),
                    (s = n.body.__type.split("#")),
                    (o = void 0 === s[1] ? s[0] : s[1]),
                    o)
                  ) {
                    case "ExternalServiceException":
                    case "com.amazonaws.cognitoidentity#ExternalServiceException":
                      return [3, 2];
                    case "InternalErrorException":
                    case "com.amazonaws.cognitoidentity#InternalErrorException":
                      return [3, 4];
                    case "InvalidParameterException":
                    case "com.amazonaws.cognitoidentity#InvalidParameterException":
                      return [3, 6];
                    case "LimitExceededException":
                    case "com.amazonaws.cognitoidentity#LimitExceededException":
                      return [3, 8];
                    case "NotAuthorizedException":
                    case "com.amazonaws.cognitoidentity#NotAuthorizedException":
                      return [3, 10];
                    case "ResourceConflictException":
                    case "com.amazonaws.cognitoidentity#ResourceConflictException":
                      return [3, 12];
                    case "ResourceNotFoundException":
                    case "com.amazonaws.cognitoidentity#ResourceNotFoundException":
                      return [3, 14];
                    case "TooManyRequestsException":
                    case "com.amazonaws.cognitoidentity#TooManyRequestsException":
                      return [3, 16];
                  }
                  return [3, 18];
                case 2:
                  return (a = [{}]), [4, _n(n, t)];
                case 3:
                  return (
                    (i = re.apply(void 0, [
                      re.apply(void 0, a.concat([m.sent()])),
                      { name: o, $metadata: Gn(e) }
                    ])),
                    [3, 19]
                  );
                case 4:
                  return (u = [{}]), [4, Sn(n, t)];
                case 5:
                  return (
                    (i = re.apply(void 0, [
                      re.apply(void 0, u.concat([m.sent()])),
                      { name: o, $metadata: Gn(e) }
                    ])),
                    [3, 19]
                  );
                case 6:
                  return (c = [{}]), [4, An(n, t)];
                case 7:
                  return (
                    (i = re.apply(void 0, [
                      re.apply(void 0, c.concat([m.sent()])),
                      { name: o, $metadata: Gn(e) }
                    ])),
                    [3, 19]
                  );
                case 8:
                  return (f = [{}]), [4, In(n, t)];
                case 9:
                  return (
                    (i = re.apply(void 0, [
                      re.apply(void 0, f.concat([m.sent()])),
                      { name: o, $metadata: Gn(e) }
                    ])),
                    [3, 19]
                  );
                case 10:
                  return (l = [{}]), [4, Tn(n, t)];
                case 11:
                  return (
                    (i = re.apply(void 0, [
                      re.apply(void 0, l.concat([m.sent()])),
                      { name: o, $metadata: Gn(e) }
                    ])),
                    [3, 19]
                  );
                case 12:
                  return (h = [{}]), [4, Cn(n, t)];
                case 13:
                  return (
                    (i = re.apply(void 0, [
                      re.apply(void 0, h.concat([m.sent()])),
                      { name: o, $metadata: Gn(e) }
                    ])),
                    [3, 19]
                  );
                case 14:
                  return (d = [{}]), [4, On(n, t)];
                case 15:
                  return (
                    (i = re.apply(void 0, [
                      re.apply(void 0, d.concat([m.sent()])),
                      { name: o, $metadata: Gn(e) }
                    ])),
                    [3, 19]
                  );
                case 16:
                  return (p = [{}]), [4, Pn(n, t)];
                case 17:
                  return (
                    (i = re.apply(void 0, [
                      re.apply(void 0, p.concat([m.sent()])),
                      { name: o, $metadata: Gn(e) }
                    ])),
                    [3, 19]
                  );
                case 18:
                  (g = n.body),
                    (o = g.code || g.Code || o),
                    (i = re(re({}, g), {
                      name: "" + o,
                      message: g.message || g.Message || o,
                      $fault: "client",
                      $metadata: Gn(e)
                    })),
                    (m.label = 19);
                case 19:
                  return (
                    (y = i.message || i.Message || o),
                    (i.message = y),
                    delete i.Message,
                    [2, Promise.reject(Object.assign(new Error(y), i))]
                  );
              }
            });
          });
        },
        _n = function(e, t) {
          return ie(void 0, void 0, void 0, function() {
            var n, r;
            return oe(this, function(i) {
              return (
                (n = e.body),
                (r = Un(n, t)),
                [
                  2,
                  re(
                    {
                      name: "ExternalServiceException",
                      $fault: "client",
                      $metadata: Gn(e)
                    },
                    r
                  )
                ]
              );
            });
          });
        },
        Sn = function(e, t) {
          return ie(void 0, void 0, void 0, function() {
            var n, r;
            return oe(this, function(i) {
              return (
                (n = e.body),
                (r = jn(n, t)),
                [
                  2,
                  re(
                    {
                      name: "InternalErrorException",
                      $fault: "server",
                      $metadata: Gn(e)
                    },
                    r
                  )
                ]
              );
            });
          });
        },
        En = function(e, t) {
          return ie(void 0, void 0, void 0, function() {
            var n, r;
            return oe(this, function(i) {
              return (
                (n = e.body),
                (r = Ln(n, t)),
                [
                  2,
                  re(
                    {
                      name: "InvalidIdentityPoolConfigurationException",
                      $fault: "client",
                      $metadata: Gn(e)
                    },
                    r
                  )
                ]
              );
            });
          });
        },
        An = function(e, t) {
          return ie(void 0, void 0, void 0, function() {
            var n, r;
            return oe(this, function(i) {
              return (
                (n = e.body),
                (r = Fn(n, t)),
                [
                  2,
                  re(
                    {
                      name: "InvalidParameterException",
                      $fault: "client",
                      $metadata: Gn(e)
                    },
                    r
                  )
                ]
              );
            });
          });
        },
        In = function(e, t) {
          return ie(void 0, void 0, void 0, function() {
            var n, r;
            return oe(this, function(i) {
              return (
                (n = e.body),
                (r = Bn(n, t)),
                [
                  2,
                  re(
                    {
                      name: "LimitExceededException",
                      $fault: "client",
                      $metadata: Gn(e)
                    },
                    r
                  )
                ]
              );
            });
          });
        },
        Tn = function(e, t) {
          return ie(void 0, void 0, void 0, function() {
            var n, r;
            return oe(this, function(i) {
              return (
                (n = e.body),
                (r = qn(n, t)),
                [
                  2,
                  re(
                    {
                      name: "NotAuthorizedException",
                      $fault: "client",
                      $metadata: Gn(e)
                    },
                    r
                  )
                ]
              );
            });
          });
        },
        Cn = function(e, t) {
          return ie(void 0, void 0, void 0, function() {
            var n, r;
            return oe(this, function(i) {
              return (
                (n = e.body),
                (r = Vn(n, t)),
                [
                  2,
                  re(
                    {
                      name: "ResourceConflictException",
                      $fault: "client",
                      $metadata: Gn(e)
                    },
                    r
                  )
                ]
              );
            });
          });
        },
        On = function(e, t) {
          return ie(void 0, void 0, void 0, function() {
            var n, r;
            return oe(this, function(i) {
              return (
                (n = e.body),
                (r = zn(n, t)),
                [
                  2,
                  re(
                    {
                      name: "ResourceNotFoundException",
                      $fault: "client",
                      $metadata: Gn(e)
                    },
                    r
                  )
                ]
              );
            });
          });
        },
        Pn = function(e, t) {
          return ie(void 0, void 0, void 0, function() {
            var n, r;
            return oe(this, function(i) {
              return (
                (n = e.body),
                (r = Kn(n, t)),
                [
                  2,
                  re(
                    {
                      name: "TooManyRequestsException",
                      $fault: "client",
                      $metadata: Gn(e)
                    },
                    r
                  )
                ]
              );
            });
          });
        },
        kn = function(e, t) {
          return re(
            re(
              re(
                {},
                void 0 !== e.CustomRoleArn && { CustomRoleArn: e.CustomRoleArn }
              ),
              void 0 !== e.IdentityId && { IdentityId: e.IdentityId }
            ),
            void 0 !== e.Logins && { Logins: Rn(e.Logins, t) }
          );
        },
        Nn = function(e, t) {
          return re(
            re(
              re({}, void 0 !== e.AccountId && { AccountId: e.AccountId }),
              void 0 !== e.IdentityPoolId && {
                IdentityPoolId: e.IdentityPoolId
              }
            ),
            void 0 !== e.Logins && { Logins: Rn(e.Logins, t) }
          );
        },
        Rn = function(e, t) {
          return Object.entries(e).reduce(function(e, t) {
            var n,
              r = se(t, 2),
              i = r[0],
              o = r[1];
            return re(re({}, e), (((n = {})[i] = o), n));
          }, {});
        },
        xn = function(e, t) {
          return {
            __type: "Credentials",
            AccessKeyId:
              void 0 !== e.AccessKeyId && null !== e.AccessKeyId
                ? e.AccessKeyId
                : void 0,
            Expiration:
              void 0 !== e.Expiration && null !== e.Expiration
                ? new Date(Math.round(1e3 * e.Expiration))
                : void 0,
            SecretKey:
              void 0 !== e.SecretKey && null !== e.SecretKey
                ? e.SecretKey
                : void 0,
            SessionToken:
              void 0 !== e.SessionToken && null !== e.SessionToken
                ? e.SessionToken
                : void 0
          };
        },
        Un = function(e, t) {
          return {
            __type: "ExternalServiceException",
            message:
              void 0 !== e.message && null !== e.message ? e.message : void 0
          };
        },
        Dn = function(e, t) {
          return {
            __type: "GetCredentialsForIdentityResponse",
            Credentials:
              void 0 !== e.Credentials && null !== e.Credentials
                ? xn(e.Credentials)
                : void 0,
            IdentityId:
              void 0 !== e.IdentityId && null !== e.IdentityId
                ? e.IdentityId
                : void 0
          };
        },
        Mn = function(e, t) {
          return {
            __type: "GetIdResponse",
            IdentityId:
              void 0 !== e.IdentityId && null !== e.IdentityId
                ? e.IdentityId
                : void 0
          };
        },
        jn = function(e, t) {
          return {
            __type: "InternalErrorException",
            message:
              void 0 !== e.message && null !== e.message ? e.message : void 0
          };
        },
        Ln = function(e, t) {
          return {
            __type: "InvalidIdentityPoolConfigurationException",
            message:
              void 0 !== e.message && null !== e.message ? e.message : void 0
          };
        },
        Fn = function(e, t) {
          return {
            __type: "InvalidParameterException",
            message:
              void 0 !== e.message && null !== e.message ? e.message : void 0
          };
        },
        Bn = function(e, t) {
          return {
            __type: "LimitExceededException",
            message:
              void 0 !== e.message && null !== e.message ? e.message : void 0
          };
        },
        qn = function(e, t) {
          return {
            __type: "NotAuthorizedException",
            message:
              void 0 !== e.message && null !== e.message ? e.message : void 0
          };
        },
        Vn = function(e, t) {
          return {
            __type: "ResourceConflictException",
            message:
              void 0 !== e.message && null !== e.message ? e.message : void 0
          };
        },
        zn = function(e, t) {
          return {
            __type: "ResourceNotFoundException",
            message:
              void 0 !== e.message && null !== e.message ? e.message : void 0
          };
        },
        Kn = function(e, t) {
          return {
            __type: "TooManyRequestsException",
            message:
              void 0 !== e.message && null !== e.message ? e.message : void 0
          };
        },
        Gn = function(e) {
          return {
            httpStatusCode: e.statusCode,
            httpHeaders: e.headers,
            requestId: e.headers["x-amzn-requestid"]
          };
        },
        Hn = function(e, t) {
          return (
            void 0 === e && (e = new Uint8Array()),
            e instanceof Uint8Array
              ? Promise.resolve(e)
              : t.streamCollector(e) || Promise.resolve(new Uint8Array())
          );
        },
        Wn = function(e, t, n, r, i) {
          return ie(void 0, void 0, void 0, function() {
            var o, s, a, u, c, f;
            return oe(this, function(l) {
              switch (l.label) {
                case 0:
                  return [4, e.endpoint()];
                case 1:
                  return (
                    (o = l.sent()),
                    (s = o.hostname),
                    (a = o.protocol),
                    (u = void 0 === a ? "https" : a),
                    (c = o.port),
                    (f = {
                      protocol: u,
                      hostname: s,
                      port: c,
                      method: "POST",
                      path: n,
                      headers: t
                    }),
                    void 0 !== r && (f.hostname = r),
                    void 0 !== i && (f.body = i),
                    [2, new mn(f)]
                  );
              }
            });
          });
        },
        Yn = function(e, t) {
          return (function(e, t) {
            return Hn(e, t).then(function(e) {
              return t.utf8Encoder(e);
            });
          })(e, t).then(function(e) {
            return e.length ? JSON.parse(e) : {};
          });
        };
      var Jn = {
          name: "deserializerMiddleware",
          step: "deserialize",
          tags: ["DESERIALIZER"]
        },
        Qn = {
          name: "serializerMiddleware",
          step: "serialize",
          tags: ["SERIALIZER"]
        };
      function $n(e, t, n) {
        return {
          applyToStack: function(r) {
            r.add(
              (function(e, t) {
                var n = this;
                return function(r) {
                  return function(i) {
                    return Q(n, void 0, void 0, function() {
                      var n, o;
                      return $(this, function(s) {
                        switch (s.label) {
                          case 0:
                            return [4, r(i)];
                          case 1:
                            return (n = s.sent().response), [4, t(n, e)];
                          case 2:
                            return (
                              (o = s.sent()), [2, { response: n, output: o }]
                            );
                        }
                      });
                    });
                  };
                };
              })(e, n),
              Jn
            ),
              r.add(
                (function(e, t) {
                  var n = this;
                  return function(r) {
                    return function(i) {
                      return Q(n, void 0, void 0, function() {
                        var n;
                        return $(this, function(o) {
                          switch (o.label) {
                            case 0:
                              return [4, t(i.input, e)];
                            case 1:
                              return (
                                (n = o.sent()),
                                [2, r(Y(Y({}, i), { request: n }))]
                              );
                          }
                        });
                      });
                    };
                  };
                })(e, t),
                Qn
              );
          }
        };
      }
      var Xn = (function(e) {
          function t(t) {
            var n = e.call(this) || this;
            return (n.input = t), n;
          }
          return (
            ne(t, e),
            (t.prototype.resolveMiddleware = function(e, t, n) {
              this.middlewareStack.use($n(t, this.serialize, this.deserialize));
              var r = e.concat(this.middlewareStack),
                i = {
                  logger: t.logger,
                  inputFilterSensitiveLog: Le.filterSensitiveLog,
                  outputFilterSensitiveLog: Be.filterSensitiveLog
                },
                o = t.requestHandler;
              return r.resolve(function(e) {
                return o.handle(e.request, n || {});
              }, i);
            }),
            (t.prototype.serialize = function(e, t) {
              return (function(e, t) {
                return ie(void 0, void 0, void 0, function() {
                  var n, r;
                  return oe(this, function(i) {
                    return (
                      (n = {
                        "Content-Type": "application/x-amz-json-1.1",
                        "X-Amz-Target":
                          "AWSCognitoIdentityService.GetCredentialsForIdentity"
                      }),
                      (r = JSON.stringify(kn(e, t))),
                      [2, Wn(t, n, "/", void 0, r)]
                    );
                  });
                });
              })(e, t);
            }),
            (t.prototype.deserialize = function(e, t) {
              return (function(e, t) {
                return ie(void 0, void 0, void 0, function() {
                  var n, r, i;
                  return oe(this, function(o) {
                    switch (o.label) {
                      case 0:
                        return e.statusCode >= 400
                          ? [2, bn(e, t)]
                          : [4, Yn(e.body, t)];
                      case 1:
                        return (
                          (n = o.sent()),
                          {},
                          (r = Dn(n, t)),
                          (i = re(
                            {
                              $metadata: Gn(e),
                              __type: "GetCredentialsForIdentityResponse"
                            },
                            r
                          )),
                          [2, Promise.resolve(i)]
                        );
                    }
                  });
                });
              })(e, t);
            }),
            t
          );
        })(le),
        Zn = (function(e) {
          function t(t, n) {
            void 0 === n && (n = !0);
            var r = e.call(this, t) || this;
            return (r.tryNextLink = n), r;
          }
          return W(t, e), t;
        })(Error);
      function er(e) {
        return Promise.all(
          Object.keys(e).reduce(function(t, n) {
            var r = e[n];
            return (
              "string" == typeof r
                ? t.push([n, r])
                : t.push(
                    r().then(function(e) {
                      return [n, e];
                    })
                  ),
              t
            );
          }, [])
        ).then(function(e) {
          return e.reduce(function(e, t) {
            var n = Z(t, 2),
              r = n[0],
              i = n[1];
            return (e[r] = i), e;
          }, {});
        });
      }
      function tr(e) {
        var t = this;
        return function() {
          return Q(t, void 0, void 0, function() {
            var t, n, r, i, o, s, a, u, c, f, l, h, d;
            return $(this, function(p) {
              switch (p.label) {
                case 0:
                  return (
                    (f = (c = e.client).send),
                    (l = Xn.bind),
                    (d = {
                      CustomRoleArn: e.customRoleArn,
                      IdentityId: e.identityId
                    }),
                    e.logins ? [4, er(e.logins)] : [3, 2]
                  );
                case 1:
                  return (h = p.sent()), [3, 3];
                case 2:
                  (h = void 0), (p.label = 3);
                case 3:
                  return [
                    4,
                    f.apply(c, [
                      new (l.apply(Xn, [void 0, ((d.Logins = h), d)]))()
                    ])
                  ];
                case 4:
                  return (
                    (t = p.sent().Credentials),
                    (n =
                      void 0 === t
                        ? (function() {
                            throw new Zn(
                              "Response from Amazon Cognito contained no credentials"
                            );
                          })()
                        : t),
                    (r = n.AccessKeyId),
                    (i =
                      void 0 === r
                        ? (function() {
                            throw new Zn(
                              "Response from Amazon Cognito contained no access key ID"
                            );
                          })()
                        : r),
                    (o = n.Expiration),
                    (s = n.SecretKey),
                    (a =
                      void 0 === s
                        ? (function() {
                            throw new Zn(
                              "Response from Amazon Cognito contained no secret key"
                            );
                          })()
                        : s),
                    (u = n.SessionToken),
                    [
                      2,
                      {
                        accessKeyId: i,
                        secretAccessKey: a,
                        sessionToken: u,
                        expiration: o
                      }
                    ]
                  );
              }
            });
          });
        };
      }
      var nr = (function(e) {
          function t(t) {
            var n = e.call(this) || this;
            return (n.input = t), n;
          }
          return (
            ne(t, e),
            (t.prototype.resolveMiddleware = function(e, t, n) {
              this.middlewareStack.use($n(t, this.serialize, this.deserialize));
              var r = e.concat(this.middlewareStack),
                i = {
                  logger: t.logger,
                  inputFilterSensitiveLog: He.filterSensitiveLog,
                  outputFilterSensitiveLog: Ye.filterSensitiveLog
                },
                o = t.requestHandler;
              return r.resolve(function(e) {
                return o.handle(e.request, n || {});
              }, i);
            }),
            (t.prototype.serialize = function(e, t) {
              return (function(e, t) {
                return ie(void 0, void 0, void 0, function() {
                  var n, r;
                  return oe(this, function(i) {
                    return (
                      (n = {
                        "Content-Type": "application/x-amz-json-1.1",
                        "X-Amz-Target": "AWSCognitoIdentityService.GetId"
                      }),
                      (r = JSON.stringify(Nn(e, t))),
                      [2, Wn(t, n, "/", void 0, r)]
                    );
                  });
                });
              })(e, t);
            }),
            (t.prototype.deserialize = function(e, t) {
              return (function(e, t) {
                return ie(void 0, void 0, void 0, function() {
                  var n, r, i;
                  return oe(this, function(o) {
                    switch (o.label) {
                      case 0:
                        return e.statusCode >= 400
                          ? [2, wn(e, t)]
                          : [4, Yn(e.body, t)];
                      case 1:
                        return (
                          (n = o.sent()),
                          {},
                          (r = Mn(n, t)),
                          (i = re(
                            { $metadata: Gn(e), __type: "GetIdResponse" },
                            r
                          )),
                          [2, Promise.resolve(i)]
                        );
                    }
                  });
                });
              })(e, t);
            }),
            t
          );
        })(le),
        rr = (function() {
          function e(e) {
            void 0 === e && (e = "aws:cognito-identity-ids"), (this.dbName = e);
          }
          return (
            (e.prototype.getItem = function(e) {
              return this.withObjectStore("readonly", function(t) {
                var n = t.get(e);
                return new Promise(function(e) {
                  (n.onerror = function() {
                    return e(null);
                  }),
                    (n.onsuccess = function() {
                      return e(n.result ? n.result.value : null);
                    });
                });
              }).catch(function() {
                return null;
              });
            }),
            (e.prototype.removeItem = function(e) {
              return this.withObjectStore("readwrite", function(t) {
                var n = t.delete(e);
                return new Promise(function(e, t) {
                  (n.onerror = function() {
                    return t(n.error);
                  }),
                    (n.onsuccess = function() {
                      return e();
                    });
                });
              });
            }),
            (e.prototype.setItem = function(e, t) {
              return this.withObjectStore("readwrite", function(n) {
                var r = n.put({ id: e, value: t });
                return new Promise(function(e, t) {
                  (r.onerror = function() {
                    return t(r.error);
                  }),
                    (r.onsuccess = function() {
                      return e();
                    });
                });
              });
            }),
            (e.prototype.getDb = function() {
              var e = self.indexedDB.open(this.dbName, 1);
              return new Promise(function(t, n) {
                (e.onsuccess = function() {
                  t(e.result);
                }),
                  (e.onerror = function() {
                    n(e.error);
                  }),
                  (e.onblocked = function() {
                    n(new Error("Unable to access DB"));
                  }),
                  (e.onupgradeneeded = function() {
                    var t = e.result;
                    (t.onerror = function() {
                      n(new Error("Failed to create object store"));
                    }),
                      t.createObjectStore("IdentityIds", { keyPath: "id" });
                  });
              });
            }),
            (e.prototype.withObjectStore = function(e, t) {
              return this.getDb().then(function(n) {
                var r = n.transaction("IdentityIds", e);
                return (
                  (r.oncomplete = function() {
                    return n.close();
                  }),
                  new Promise(function(e, n) {
                    (r.onerror = function() {
                      return n(r.error);
                    }),
                      e(t(r.objectStore("IdentityIds")));
                  }).catch(function(e) {
                    throw (n.close(), e);
                  })
                );
              });
            }),
            e
          );
        })(),
        ir = new ((function() {
          function e(e) {
            void 0 === e && (e = {}), (this.store = e);
          }
          return (
            (e.prototype.getItem = function(e) {
              return e in this.store ? this.store[e] : null;
            }),
            (e.prototype.removeItem = function(e) {
              delete this.store[e];
            }),
            (e.prototype.setItem = function(e, t) {
              this.store[e] = t;
            }),
            e
          );
        })())();
      function or(e) {
        var t = this,
          n = e.accountId,
          r = e.cache,
          i =
            void 0 === r
              ? "object" == typeof self && self.indexedDB
                ? new rr()
                : "object" == typeof window && window.localStorage
                ? window.localStorage
                : ir
              : r,
          o = e.client,
          s = e.customRoleArn,
          a = e.identityPoolId,
          u = e.logins,
          c = e.userIdentifier,
          f =
            void 0 === c
              ? u && 0 !== Object.keys(u).length
                ? void 0
                : "ANONYMOUS"
              : c,
          l = f ? "aws:cognito-identity-credentials:" + a + ":" + f : void 0,
          h = function() {
            return Q(t, void 0, void 0, function() {
              var e, t, r, c, f, d, p, g, y;
              return $(this, function(v) {
                switch (v.label) {
                  case 0:
                    return (t = l) ? [4, i.getItem(l)] : [3, 2];
                  case 1:
                    (t = v.sent()), (v.label = 2);
                  case 2:
                    return (e = t)
                      ? [3, 7]
                      : ((d = (f = o).send),
                        (p = nr.bind),
                        (y = { AccountId: n, IdentityPoolId: a }),
                        u ? [4, er(u)] : [3, 4]);
                  case 3:
                    return (g = v.sent()), [3, 5];
                  case 4:
                    (g = void 0), (v.label = 5);
                  case 5:
                    return [
                      4,
                      d.apply(f, [
                        new (p.apply(nr, [void 0, ((y.Logins = g), y)]))()
                      ])
                    ];
                  case 6:
                    (r = v.sent().IdentityId),
                      (c =
                        void 0 === r
                          ? (function() {
                              throw new Zn(
                                "Response from Amazon Cognito contained no identity ID"
                              );
                            })()
                          : r),
                      (e = c),
                      l &&
                        Promise.resolve(i.setItem(l, e)).catch(function() {}),
                      (v.label = 7);
                  case 7:
                    return [
                      2,
                      (h = tr({
                        client: o,
                        customRoleArn: s,
                        logins: u,
                        identityId: e
                      }))()
                    ];
                }
              });
            });
          };
        return function() {
          return h().catch(function(e) {
            return Q(t, void 0, void 0, function() {
              return $(this, function(t) {
                throw (l &&
                  Promise.resolve(i.removeItem(l)).catch(function() {}),
                e);
              });
            });
          });
        };
      }
      var sr = n(17),
        ar = n(41);
      function ur(e) {
        var t = encodeURIComponent(e);
        return (t = t.replace(/[!'()*]/g, cr));
      }
      function cr(e) {
        return (
          "%" +
          e
            .charCodeAt(0)
            .toString(16)
            .toUpperCase()
        );
      }
      for (
        var fr = (function() {
            function e(e) {
              void 0 === e && (e = {}), (this.httpOptions = e);
            }
            return (
              (e.prototype.destroy = function() {}),
              (e.prototype.handle = function(e, t) {
                var n = null == t ? void 0 : t.abortSignal,
                  r = this.httpOptions.requestTimeout;
                if (null == n ? void 0 : n.aborted) {
                  var i = new Error("Request aborted");
                  return (i.name = "AbortError"), Promise.reject(i);
                }
                var o = e.path;
                if (e.query) {
                  var s = (function(e) {
                    var t,
                      n,
                      r = [];
                    try {
                      for (
                        var i = X(Object.keys(e).sort()), o = i.next();
                        !o.done;
                        o = i.next()
                      ) {
                        var s = o.value,
                          a = e[s];
                        if (((s = ur(s)), Array.isArray(a)))
                          for (var u = 0, c = a.length; u < c; u++)
                            r.push(s + "=" + ur(a[u]));
                        else {
                          var f = s;
                          (a || "string" == typeof a) && (f += "=" + ur(a)),
                            r.push(f);
                        }
                      }
                    } catch (e) {
                      t = { error: e };
                    } finally {
                      try {
                        o && !o.done && (n = i.return) && n.call(i);
                      } finally {
                        if (t) throw t.error;
                      }
                    }
                    return r.join("&");
                  })(e.query);
                  s && (o += "?" + s);
                }
                var a = e.port,
                  u = e.protocol + "//" + e.hostname + (a ? ":" + a : "") + o,
                  c = {
                    body: e.body,
                    headers: new Headers(e.headers),
                    method: e.method
                  };
                "undefined" != typeof AbortController && (c.signal = n);
                var f,
                  l = new Request(u, c),
                  h = [
                    fetch(l).then(function(e) {
                      var t,
                        n,
                        r = e.headers,
                        i = {};
                      try {
                        for (
                          var o = X(r.entries()), s = o.next();
                          !s.done;
                          s = o.next()
                        ) {
                          var a = s.value;
                          i[a[0]] = a[1];
                        }
                      } catch (e) {
                        t = { error: e };
                      } finally {
                        try {
                          s && !s.done && (n = o.return) && n.call(o);
                        } finally {
                          if (t) throw t.error;
                        }
                      }
                      return void 0 !== e.body
                        ? {
                            response: new vn({
                              headers: i,
                              statusCode: e.status,
                              body: e.body
                            })
                          }
                        : e.blob().then(function(t) {
                            return {
                              response: new vn({
                                headers: i,
                                statusCode: e.status,
                                body: t
                              })
                            };
                          });
                    }),
                    ((f = r),
                    void 0 === f && (f = 0),
                    new Promise(function(e, t) {
                      f &&
                        setTimeout(function() {
                          var e = new Error(
                            "Request did not complete within " + f + " ms"
                          );
                          (e.name = "TimeoutError"), t(e);
                        }, f);
                    }))
                  ];
                return (
                  n &&
                    h.push(
                      new Promise(function(e, t) {
                        n.onabort = function() {
                          var e = new Error("Request aborted");
                          (e.name = "AbortError"), t(e);
                        };
                      })
                    ),
                  Promise.race(h)
                );
              }),
              e
            );
          })(),
          lr = {},
          hr = new Array(64),
          dr = 0,
          pr = "A".charCodeAt(0),
          gr = "Z".charCodeAt(0);
        dr + pr <= gr;
        dr++
      ) {
        var yr = String.fromCharCode(dr + pr);
        (lr[yr] = dr), (hr[dr] = yr);
      }
      for (
        dr = 0, pr = "a".charCodeAt(0), gr = "z".charCodeAt(0);
        dr + pr <= gr;
        dr++
      ) {
        yr = String.fromCharCode(dr + pr);
        var vr = dr + 26;
        (lr[yr] = vr), (hr[vr] = yr);
      }
      for (dr = 0; dr < 10; dr++) {
        lr[dr.toString(10)] = dr + 52;
        (yr = dr.toString(10)), (vr = dr + 52);
        (lr[yr] = vr), (hr[vr] = yr);
      }
      (lr["+"] = 62), (hr[62] = "+"), (lr["/"] = 63), (hr[63] = "/");
      function mr(e) {
        var t = (e.length / 4) * 3;
        "==" === e.substr(-2) ? (t -= 2) : "=" === e.substr(-1) && t--;
        for (
          var n = new ArrayBuffer(t), r = new DataView(n), i = 0;
          i < e.length;
          i += 4
        ) {
          for (var o = 0, s = 0, a = i, u = i + 3; a <= u; a++)
            "=" !== e[a]
              ? ((o |= lr[e[a]] << (6 * (u - a))), (s += 6))
              : (o >>= 6);
          var c = (i / 4) * 3;
          o >>= s % 8;
          for (var f = Math.floor(s / 8), l = 0; l < f; l++) {
            var h = 8 * (f - l - 1);
            r.setUint8(c + l, (o & (255 << h)) >> h);
          }
        }
        return new Uint8Array(n);
      }
      function br(e) {
        return new Promise(function(t, n) {
          var r = new FileReader();
          (r.onloadend = function() {
            var e;
            if (2 !== r.readyState)
              return n(new Error("Reader aborted too early"));
            var i = null !== (e = r.result) && void 0 !== e ? e : "",
              o = i.indexOf(","),
              s = o > -1 ? o + 1 : i.length;
            t(i.substring(s));
          }),
            (r.onabort = function() {
              return n(new Error("Read aborted"));
            }),
            (r.onerror = function() {
              return n(r.error);
            }),
            r.readAsDataURL(e);
        });
      }
      var wr = {
          name: "retryMiddleware",
          tags: ["RETRY"],
          step: "finalizeRequest",
          priority: "high"
        },
        _r = function(e) {
          return {
            applyToStack: function(t) {
              t.add(
                (function(e) {
                  return function(t) {
                    return function(n) {
                      return Q(void 0, void 0, void 0, function() {
                        return $(this, function(r) {
                          return [2, e.retryStrategy.retry(t, n)];
                        });
                      });
                    };
                  };
                })(e),
                wr
              );
            }
          };
        },
        Sr = [
          "AuthFailure",
          "InvalidSignatureException",
          "RequestExpired",
          "RequestInTheFuture",
          "RequestTimeTooSkewed",
          "SignatureDoesNotMatch"
        ],
        Er = [
          "Throttling",
          "ThrottlingException",
          "ThrottledException",
          "RequestThrottledException",
          "TooManyRequestsException",
          "ProvisionedThroughputExceededException",
          "TransactionInProgressException",
          "RequestLimitExceeded",
          "BandwidthLimitExceeded",
          "LimitExceededException",
          "RequestThrottled",
          "SlowDown",
          "PriorRequestNotComplete",
          "EC2ThrottledException"
        ],
        Ar = [
          "AbortError",
          "TimeoutError",
          "RequestTimeout",
          "RequestTimeoutException"
        ],
        Ir = [500, 502, 503, 504],
        Tr = function(e) {
          var t;
          return (
            Er.includes(e.name) ||
            1 ==
              (null === (t = e.$retryable) || void 0 === t
                ? void 0
                : t.throttling)
          );
        },
        Cr = n(7),
        Or = function(e, t) {
          return Math.floor(Math.min(2e4, Math.random() * Math.pow(2, t) * e));
        },
        Pr = function(e) {
          return (
            !!e &&
            ((function(e) {
              return void 0 !== e.$retryable;
            })(e) ||
              (function(e) {
                return Sr.includes(e.name);
              })(e) ||
              Tr(e) ||
              (function(e) {
                var t;
                return (
                  Ar.includes(e.name) ||
                  Ir.includes(
                    (null === (t = e.$metadata) || void 0 === t
                      ? void 0
                      : t.httpStatusCode) || 0
                  )
                );
              })(e))
          );
        },
        kr = (function() {
          function e(e, t) {
            var n, r, i, o, s, a, u, c;
            (this.maxAttemptsProvider = e),
              (this.retryDecider =
                null !== (n = null == t ? void 0 : t.retryDecider) &&
                void 0 !== n
                  ? n
                  : Pr),
              (this.delayDecider =
                null !== (r = null == t ? void 0 : t.delayDecider) &&
                void 0 !== r
                  ? r
                  : Or),
              (this.retryQuota =
                null !== (i = null == t ? void 0 : t.retryQuota) && void 0 !== i
                  ? i
                  : ((s = o = 500),
                    (a = o),
                    (u = function(e) {
                      return "TimeoutError" === e.name ? 10 : 5;
                    }),
                    (c = function(e) {
                      return u(e) <= a;
                    }),
                    Object.freeze({
                      hasRetryTokens: c,
                      retrieveRetryTokens: function(e) {
                        if (!c(e)) throw new Error("No retry token available");
                        var t = u(e);
                        return (a -= t), t;
                      },
                      releaseRetryTokens: function(e) {
                        (a += null != e ? e : 1), (a = Math.min(a, s));
                      }
                    })));
          }
          return (
            (e.prototype.shouldRetry = function(e, t, n) {
              return (
                t < n &&
                this.retryDecider(e) &&
                this.retryQuota.hasRetryTokens(e)
              );
            }),
            (e.prototype.getMaxAttempts = function() {
              return Q(this, void 0, void 0, function() {
                var e;
                return $(this, function(t) {
                  switch (t.label) {
                    case 0:
                      return (
                        t.trys.push([0, 2, , 3]),
                        [4, this.maxAttemptsProvider()]
                      );
                    case 1:
                      return (e = t.sent()), [3, 3];
                    case 2:
                      return t.sent(), (e = 3), [3, 3];
                    case 3:
                      return [2, e];
                  }
                });
              });
            }),
            (e.prototype.retry = function(e, t) {
              return Q(this, void 0, void 0, function() {
                var n, r, i, o, s, a, u, c;
                return $(this, function(f) {
                  switch (f.label) {
                    case 0:
                      return (r = 0), (i = 0), [4, this.getMaxAttempts()];
                    case 1:
                      (o = f.sent()),
                        (s = t.request),
                        mn.isInstance(s) &&
                          (s.headers["amz-sdk-invocation-id"] = Object(
                            Cr.v4
                          )()),
                        (a = function() {
                          var a, c, f, l, h;
                          return $(this, function(d) {
                            switch (d.label) {
                              case 0:
                                return (
                                  d.trys.push([0, 2, , 5]),
                                  mn.isInstance(s) &&
                                    (s.headers["amz-sdk-request"] =
                                      "attempt=" + (r + 1) + "; max=" + o),
                                  [4, e(t)]
                                );
                              case 1:
                                return (
                                  (a = d.sent()),
                                  (c = a.response),
                                  (f = a.output),
                                  u.retryQuota.releaseRetryTokens(n),
                                  (f.$metadata.attempts = r + 1),
                                  (f.$metadata.totalRetryDelay = i),
                                  [2, { value: { response: c, output: f } }]
                                );
                              case 2:
                                return (
                                  (l = d.sent()),
                                  r++,
                                  u.shouldRetry(l, r, o)
                                    ? ((n = u.retryQuota.retrieveRetryTokens(
                                        l
                                      )),
                                      (h = u.delayDecider(
                                        Tr(l) ? 500 : 100,
                                        r
                                      )),
                                      (i += h),
                                      [
                                        4,
                                        new Promise(function(e) {
                                          return setTimeout(e, h);
                                        })
                                      ])
                                    : [3, 4]
                                );
                              case 3:
                                return d.sent(), [2, "continue"];
                              case 4:
                                throw (l.$metadata || (l.$metadata = {}),
                                (l.$metadata.attempts = r),
                                (l.$metadata.totalRetryDelay = i),
                                l);
                              case 5:
                                return [2];
                            }
                          });
                        }),
                        (u = this),
                        (f.label = 2);
                    case 2:
                      return [5, a()];
                    case 3:
                      return "object" == typeof (c = f.sent())
                        ? [2, c.value]
                        : [3, 2];
                    case 4:
                      return [2];
                  }
                });
              });
            }),
            e
          );
        })(),
        Nr = function(e) {
          if ((void 0 === e && (e = 3), "number" == typeof e)) {
            var t = Promise.resolve(e);
            return function() {
              return t;
            };
          }
          return e;
        };
      var Rr,
        xr,
        Ur,
        Dr = "cognito-identity.{region}.amazonaws.com",
        Mr = new Set([
          "ap-east-1",
          "ap-northeast-1",
          "ap-northeast-2",
          "ap-south-1",
          "ap-southeast-1",
          "ap-southeast-2",
          "ca-central-1",
          "eu-central-1",
          "eu-north-1",
          "eu-west-1",
          "eu-west-2",
          "eu-west-3",
          "me-south-1",
          "sa-east-1",
          "us-east-1",
          "us-east-2",
          "us-west-1",
          "us-west-2"
        ]),
        jr = new Set(["cn-north-1", "cn-northwest-1"]),
        Lr = new Set(["us-iso-east-1"]),
        Fr = new Set(["us-isob-east-1"]),
        Br = new Set(["us-gov-east-1", "us-gov-west-1"]),
        qr = re(
          re(
            {},
            {
              apiVersion: "2014-06-30",
              disableHostPrefix: !1,
              regionInfoProvider: function(e, t) {
                var n = void 0;
                switch (e) {
                  case "ap-northeast-1":
                    n = {
                      hostname: "cognito-identity.ap-northeast-1.amazonaws.com",
                      partition: "aws"
                    };
                    break;
                  case "ap-northeast-2":
                    n = {
                      hostname: "cognito-identity.ap-northeast-2.amazonaws.com",
                      partition: "aws"
                    };
                    break;
                  case "ap-south-1":
                    n = {
                      hostname: "cognito-identity.ap-south-1.amazonaws.com",
                      partition: "aws"
                    };
                    break;
                  case "ap-southeast-1":
                    n = {
                      hostname: "cognito-identity.ap-southeast-1.amazonaws.com",
                      partition: "aws"
                    };
                    break;
                  case "ap-southeast-2":
                    n = {
                      hostname: "cognito-identity.ap-southeast-2.amazonaws.com",
                      partition: "aws"
                    };
                    break;
                  case "ca-central-1":
                    n = {
                      hostname: "cognito-identity.ca-central-1.amazonaws.com",
                      partition: "aws"
                    };
                    break;
                  case "cn-north-1":
                    n = {
                      hostname: "cognito-identity.cn-north-1.amazonaws.com.cn",
                      partition: "aws-cn"
                    };
                    break;
                  case "eu-central-1":
                    n = {
                      hostname: "cognito-identity.eu-central-1.amazonaws.com",
                      partition: "aws"
                    };
                    break;
                  case "eu-west-1":
                    n = {
                      hostname: "cognito-identity.eu-west-1.amazonaws.com",
                      partition: "aws"
                    };
                    break;
                  case "eu-west-2":
                    n = {
                      hostname: "cognito-identity.eu-west-2.amazonaws.com",
                      partition: "aws"
                    };
                    break;
                  case "us-east-1":
                    n = {
                      hostname: "cognito-identity.us-east-1.amazonaws.com",
                      partition: "aws"
                    };
                    break;
                  case "us-east-2":
                    n = {
                      hostname: "cognito-identity.us-east-2.amazonaws.com",
                      partition: "aws"
                    };
                    break;
                  case "us-west-2":
                    n = {
                      hostname: "cognito-identity.us-west-2.amazonaws.com",
                      partition: "aws"
                    };
                    break;
                  default:
                    Mr.has(e) &&
                      (n = {
                        hostname: Dr.replace("{region}", e),
                        partition: "aws"
                      }),
                      jr.has(e) &&
                        (n = {
                          hostname: "cognito-identity.{region}.amazonaws.com.cn".replace(
                            "{region}",
                            e
                          ),
                          partition: "aws-cn"
                        }),
                      Lr.has(e) &&
                        (n = {
                          hostname: "cognito-identity.{region}.c2s.ic.gov".replace(
                            "{region}",
                            e
                          ),
                          partition: "aws-iso"
                        }),
                      Fr.has(e) &&
                        (n = {
                          hostname: "cognito-identity.{region}.sc2s.sgov.gov".replace(
                            "{region}",
                            e
                          ),
                          partition: "aws-iso-b"
                        }),
                      Br.has(e) &&
                        (n = {
                          hostname: "cognito-identity.{region}.amazonaws.com".replace(
                            "{region}",
                            e
                          ),
                          partition: "aws-us-gov"
                        }),
                      void 0 === n &&
                        (n = {
                          hostname: Dr.replace("{region}", e),
                          partition: "aws"
                        });
                }
                return Promise.resolve(n);
              },
              signingName: "cognito-identity"
            }
          ),
          {
            runtime: "browser",
            base64Decoder: mr,
            base64Encoder: function(e) {
              for (var t = "", n = 0; n < e.length; n += 3) {
                for (
                  var r = 0, i = 0, o = n, s = Math.min(n + 3, e.length);
                  o < s;
                  o++
                )
                  (r |= e[o] << (8 * (s - o - 1))), (i += 8);
                var a = Math.ceil(i / 6);
                r <<= 6 * a - i;
                for (var u = 1; u <= a; u++) {
                  var c = 6 * (a - u);
                  t += hr[(r & (63 << c)) >> c];
                }
                t += "==".slice(0, 4 - a);
              }
              return t;
            },
            bodyLengthChecker: function(e) {
              if ("string" == typeof e) {
                for (var t = e.length, n = t - 1; n >= 0; n--) {
                  var r = e.charCodeAt(n);
                  r > 127 && r <= 2047
                    ? t++
                    : r > 2047 && r <= 65535 && (t += 2);
                }
                return t;
              }
              return "number" == typeof e.byteLength
                ? e.byteLength
                : "number" == typeof e.size
                ? e.size
                : void 0;
            },
            credentialDefaultProvider: function() {},
            defaultUserAgent:
              ((xr = sr.a),
              (Ur = sr.b),
              "aws-sdk-js-v3-" +
                xr +
                "/" +
                Ur +
                " " +
                ("undefined" != typeof navigator &&
                "string" == typeof navigator.userAgent
                  ? navigator.userAgent
                  : "")),
            maxAttempts: 3,
            region:
              ((Rr = "Region is missing"),
              function() {
                throw new Error(Rr);
              }),
            requestHandler: new fr(),
            sha256: ar.Sha256,
            streamCollector: function(e) {
              return "function" == typeof Blob && e instanceof Blob
                ? (function(e) {
                    return Q(this, void 0, void 0, function() {
                      var t, n;
                      return $(this, function(r) {
                        switch (r.label) {
                          case 0:
                            return [4, br(e)];
                          case 1:
                            return (
                              (t = r.sent()),
                              (n = mr(t)),
                              [2, new Uint8Array(n)]
                            );
                        }
                      });
                    });
                  })(e)
                : (function(e) {
                    return Q(this, void 0, void 0, function() {
                      var t, n, r, i, o, s, a;
                      return $(this, function(u) {
                        switch (u.label) {
                          case 0:
                            (t = new Uint8Array(0)),
                              (n = e.getReader()),
                              (r = !1),
                              (u.label = 1);
                          case 1:
                            return r ? [3, 3] : [4, n.read()];
                          case 2:
                            return (
                              (i = u.sent()),
                              (o = i.done),
                              (s = i.value) &&
                                ((a = t),
                                (t = new Uint8Array(a.length + s.length)).set(
                                  a
                                ),
                                t.set(s, a.length)),
                              (r = o),
                              [3, 1]
                            );
                          case 3:
                            return [2, t];
                        }
                      });
                    });
                  })(e);
            },
            urlParser: function(e) {
              var t,
                n = new URL(e),
                r = n.hostname,
                i = n.pathname,
                o = n.port,
                s = n.protocol,
                a = n.search;
              return (
                a &&
                  (t = (function(e) {
                    var t,
                      n,
                      r = {};
                    if ((e = e.replace(/^\?/, "")))
                      try {
                        for (
                          var i = X(e.split("&")), o = i.next();
                          !o.done;
                          o = i.next()
                        ) {
                          var s = Z(o.value.split("="), 2),
                            a = s[0],
                            u = s[1],
                            c = void 0 === u ? null : u;
                          (a = decodeURIComponent(a)),
                            c && (c = decodeURIComponent(c)),
                            a in r
                              ? Array.isArray(r[a])
                                ? r[a].push(c)
                                : (r[a] = [r[a], c])
                              : (r[a] = c);
                        }
                      } catch (e) {
                        t = { error: e };
                      } finally {
                        try {
                          o && !o.done && (n = i.return) && n.call(i);
                        } finally {
                          if (t) throw t.error;
                        }
                      }
                    return r;
                  })(a)),
                {
                  hostname: r,
                  port: o ? parseInt(o) : void 0,
                  protocol: s,
                  path: i,
                  query: t
                }
              );
            },
            utf8Decoder: function(e) {
              return "function" == typeof TextEncoder
                ? (function(e) {
                    return new TextEncoder().encode(e);
                  })(e)
                : (function(e) {
                    for (var t = [], n = 0, r = e.length; n < r; n++) {
                      var i = e.charCodeAt(n);
                      if (i < 128) t.push(i);
                      else if (i < 2048) t.push((i >> 6) | 192, (63 & i) | 128);
                      else if (
                        n + 1 < e.length &&
                        55296 == (64512 & i) &&
                        56320 == (64512 & e.charCodeAt(n + 1))
                      ) {
                        var o =
                          65536 +
                          ((1023 & i) << 10) +
                          (1023 & e.charCodeAt(++n));
                        t.push(
                          (o >> 18) | 240,
                          ((o >> 12) & 63) | 128,
                          ((o >> 6) & 63) | 128,
                          (63 & o) | 128
                        );
                      } else
                        t.push(
                          (i >> 12) | 224,
                          ((i >> 6) & 63) | 128,
                          (63 & i) | 128
                        );
                    }
                    return Uint8Array.from(t);
                  })(e);
            },
            utf8Encoder: function(e) {
              return "function" == typeof TextDecoder
                ? (function(e) {
                    return new TextDecoder("utf-8").decode(e);
                  })(e)
                : (function(e) {
                    for (var t = "", n = 0, r = e.length; n < r; n++) {
                      var i = e[n];
                      if (i < 128) t += String.fromCharCode(i);
                      else if (192 <= i && i < 224) {
                        var o = e[++n];
                        t += String.fromCharCode(((31 & i) << 6) | (63 & o));
                      } else if (240 <= i && i < 365) {
                        var s =
                          "%" +
                          [i, e[++n], e[++n], e[++n]]
                            .map(function(e) {
                              return e.toString(16);
                            })
                            .join("%");
                        t += decodeURIComponent(s);
                      } else
                        t += String.fromCharCode(
                          ((15 & i) << 12) |
                            ((63 & e[++n]) << 6) |
                            (63 & e[++n])
                        );
                    }
                    return t;
                  })(e);
            }
          }
        ),
        Vr = function(e) {
          var t = e.endpoint,
            n = e.urlParser;
          if ("string" == typeof t) {
            var r = Promise.resolve(n(t));
            return function() {
              return r;
            };
          }
          if ("object" == typeof t) {
            var i = Promise.resolve(t);
            return function() {
              return i;
            };
          }
          return t;
        },
        zr = function(e) {
          return Q(void 0, void 0, void 0, function() {
            var t, n, r, i, o;
            return $(this, function(s) {
              switch (s.label) {
                case 0:
                  return (t = e.tls), (n = void 0 === t || t), [4, e.region()];
                case 1:
                  if (
                    ((r = s.sent()),
                    !new RegExp(
                      /^([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9])$/
                    ).test(r))
                  )
                    throw new Error("Invalid region in client config");
                  return [4, e.regionInfoProvider(r)];
                case 2:
                  if (
                    !(i = (null !== (o = s.sent()) && void 0 !== o ? o : {})
                      .hostname)
                  )
                    throw new Error(
                      "Cannot resolve hostname from client config"
                    );
                  return [2, e.urlParser((n ? "https:" : "http:") + "//" + i)];
              }
            });
          });
        },
        Kr = function(e) {
          if ("string" == typeof e) {
            var t = Promise.resolve(e);
            return function() {
              return t;
            };
          }
          return e;
        };
      var Gr = {
          step: "build",
          tags: ["SET_CONTENT_LENGTH", "CONTENT_LENGTH"],
          name: "contentLengthMiddleware"
        },
        Hr = function(e) {
          return {
            applyToStack: function(t) {
              t.add(
                (function(e) {
                  var t = this;
                  return function(n) {
                    return function(r) {
                      return Q(t, void 0, void 0, function() {
                        var t, i, o, s, a;
                        return $(this, function(u) {
                          return (
                            (t = r.request),
                            mn.isInstance(t) &&
                              ((i = t.body),
                              (o = t.headers),
                              i &&
                                -1 ===
                                  Object.keys(o)
                                    .map(function(e) {
                                      return e.toLowerCase();
                                    })
                                    .indexOf("content-length") &&
                                void 0 !== (s = e(i)) &&
                                (t.headers = Y(
                                  Y({}, t.headers),
                                  (((a = {})["content-length"] = String(s)), a)
                                ))),
                            [2, n(Y(Y({}, r), { request: t }))]
                          );
                        });
                      });
                    };
                  };
                })(e.bodyLengthChecker),
                Gr
              );
            }
          };
        };
      var Wr = { name: "hostHeaderMiddleware", step: "build", tags: ["HOST"] },
        Yr = function(e) {
          return {
            applyToStack: function(t) {
              t.add(
                (function(e) {
                  return function(t) {
                    return function(n) {
                      return Q(void 0, void 0, void 0, function() {
                        var r, i;
                        return $(this, function(o) {
                          return mn.isInstance(n.request)
                            ? ((r = n.request),
                              (i = (e.requestHandler.metadata || {})
                                .handlerProtocol),
                              (void 0 === i ? "" : i).indexOf("h2") >= 0 &&
                              !r.headers[":authority"]
                                ? (delete r.headers.host,
                                  (r.headers[":authority"] = ""))
                                : r.headers.host ||
                                  (r.headers.host = r.hostname),
                              [2, t(n)])
                            : [2, t(n)];
                        });
                      });
                    };
                  };
                })(e),
                Wr
              );
            }
          };
        },
        Jr = {
          name: "loggerMiddleware",
          tags: ["LOGGER"],
          step: "finalizeRequest"
        },
        Qr = function(e) {
          return {
            applyToStack: function(e) {
              e.add(function(e, t) {
                return function(n) {
                  return Q(void 0, void 0, void 0, function() {
                    var r, i, o, s, a, u, c;
                    return $(this, function(f) {
                      switch (f.label) {
                        case 0:
                          return (
                            (r = t.logger),
                            (i = t.inputFilterSensitiveLog),
                            (o = t.outputFilterSensitiveLog),
                            [4, e(n)]
                          );
                        case 1:
                          return (
                            (s = f.sent()),
                            r
                              ? ((a = s.output),
                                (u = a.$metadata),
                                (c = J(a, ["$metadata"])),
                                "function" == typeof r.debug &&
                                  (r.debug({ httpRequest: n.request }),
                                  r.debug({ httpResponse: s.response })),
                                "function" == typeof r.info &&
                                  r.info({
                                    $metadata: u,
                                    input: i(n.input),
                                    output: o(c)
                                  }),
                                [2, s])
                              : [2, s]
                          );
                      }
                    });
                  });
                };
              }, Jr);
            }
          };
        },
        $r = "X-Amz-Date".toLowerCase(),
        Xr = ["authorization", $r, "date"],
        Zr = "X-Amz-Signature".toLowerCase(),
        ei = "X-Amz-Security-Token".toLowerCase(),
        ti = {
          authorization: !0,
          "cache-control": !0,
          connection: !0,
          expect: !0,
          from: !0,
          "keep-alive": !0,
          "max-forwards": !0,
          pragma: !0,
          referer: !0,
          te: !0,
          trailer: !0,
          "transfer-encoding": !0,
          upgrade: !0,
          "user-agent": !0,
          "x-amzn-trace-id": !0
        },
        ni = /^proxy-/,
        ri = /^sec-/,
        ii = "AWS4-HMAC-SHA256-PAYLOAD",
        oi = {},
        si = [];
      function ai(e, t, n) {
        return e + "/" + t + "/" + n + "/aws4_request";
      }
      for (var ui = {}, ci = {}, fi = 0; fi < 256; fi++) {
        var li = fi.toString(16).toLowerCase();
        1 === li.length && (li = "0" + li), (ui[fi] = li), (ci[li] = fi);
      }
      function hi(e) {
        for (var t = "", n = 0; n < e.byteLength; n++) t += ui[e[n]];
        return t;
      }
      function di(e, t, n) {
        var r,
          i,
          o = e.headers,
          s = {};
        try {
          for (
            var a = X(Object.keys(o).sort()), u = a.next();
            !u.done;
            u = a.next()
          ) {
            var c = u.value,
              f = c.toLowerCase();
            ((f in ti ||
              (null == t ? void 0 : t.has(f)) ||
              ni.test(f) ||
              ri.test(f)) &&
              (!n || (n && !n.has(f)))) ||
              (s[f] = o[c].trim().replace(/\s+/g, " "));
          }
        } catch (e) {
          r = { error: e };
        } finally {
          try {
            u && !u.done && (i = a.return) && i.call(a);
          } finally {
            if (r) throw r.error;
          }
        }
        return s;
      }
      function pi(e, t) {
        var n = e.headers,
          r = e.body;
        return Q(this, void 0, void 0, function() {
          var e, i, o, s, a, u, c;
          return $(this, function(f) {
            switch (f.label) {
              case 0:
                try {
                  for (
                    e = X(Object.keys(n)), i = e.next();
                    !i.done;
                    i = e.next()
                  )
                    if ("x-amz-content-sha256" === (o = i.value).toLowerCase())
                      return [2, n[o]];
                } catch (e) {
                  u = { error: e };
                } finally {
                  try {
                    i && !i.done && (c = e.return) && c.call(e);
                  } finally {
                    if (u) throw u.error;
                  }
                }
                return null != r
                  ? [3, 1]
                  : [
                      2,
                      "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"
                    ];
              case 1:
                return "string" == typeof r ||
                  ArrayBuffer.isView(r) ||
                  ((l = r),
                  ("function" == typeof ArrayBuffer &&
                    l instanceof ArrayBuffer) ||
                    "[object ArrayBuffer]" ===
                      Object.prototype.toString.call(l))
                  ? ((s = new t()).update(r), (a = hi), [4, s.digest()])
                  : [3, 3];
              case 2:
                return [2, a.apply(void 0, [f.sent()])];
              case 3:
                return [2, "UNSIGNED-PAYLOAD"];
            }
            var l;
          });
        });
      }
      function gi(e) {
        var t = e.headers,
          n = e.query,
          r = J(e, ["headers", "query"]);
        return Y(Y({}, r), { headers: Y({}, t), query: n ? yi(n) : void 0 });
      }
      function yi(e) {
        return Object.keys(e).reduce(function(t, n) {
          var r,
            i = e[n];
          return Y(Y({}, t), (((r = {})[n] = Array.isArray(i) ? ee(i) : i), r));
        }, {});
      }
      function vi(e) {
        var t, n;
        e = "function" == typeof e.clone ? e.clone() : gi(e);
        try {
          for (
            var r = X(Object.keys(e.headers)), i = r.next();
            !i.done;
            i = r.next()
          ) {
            var o = i.value;
            Xr.indexOf(o.toLowerCase()) > -1 && delete e.headers[o];
          }
        } catch (e) {
          t = { error: e };
        } finally {
          try {
            i && !i.done && (n = r.return) && n.call(r);
          } finally {
            if (t) throw t.error;
          }
        }
        return e;
      }
      function mi(e) {
        return (function(e) {
          if ("number" == typeof e) return new Date(1e3 * e);
          if ("string" == typeof e)
            return Number(e) ? new Date(1e3 * Number(e)) : new Date(e);
          return e;
        })(e)
          .toISOString()
          .replace(/\.\d{3}Z$/, "Z");
      }
      var bi = (function() {
          function e(e) {
            var t = e.applyChecksum,
              n = e.credentials,
              r = e.region,
              i = e.service,
              o = e.sha256,
              s = e.uriEscapePath,
              a = void 0 === s || s;
            (this.service = i),
              (this.sha256 = o),
              (this.uriEscapePath = a),
              (this.applyChecksum = "boolean" != typeof t || t),
              (this.regionProvider = Si(r)),
              (this.credentialProvider = Ei(n));
          }
          return (
            (e.prototype.presign = function(e, t) {
              return (
                void 0 === t && (t = {}),
                Q(this, void 0, void 0, function() {
                  var n,
                    r,
                    i,
                    o,
                    s,
                    a,
                    u,
                    c,
                    f,
                    l,
                    h,
                    d,
                    p,
                    g,
                    y,
                    v,
                    m,
                    b,
                    w,
                    _,
                    S,
                    E,
                    A;
                  return $(this, function(I) {
                    switch (I.label) {
                      case 0:
                        return (
                          (n = t.signingDate),
                          (r = void 0 === n ? new Date() : n),
                          (i = t.expiresIn),
                          (o = void 0 === i ? 3600 : i),
                          (s = t.unsignableHeaders),
                          (a = t.signableHeaders),
                          (u = t.signingRegion),
                          (c = t.signingService),
                          [4, this.credentialProvider()]
                        );
                      case 1:
                        return (
                          (f = I.sent()), null == u ? [3, 2] : ((h = u), [3, 4])
                        );
                      case 2:
                        return [4, this.regionProvider()];
                      case 3:
                        (h = I.sent()), (I.label = 4);
                      case 4:
                        return (
                          (l = h),
                          (d = wi(r)),
                          (p = d.longDate),
                          (g = d.shortDate),
                          o > 604800
                            ? [
                                2,
                                Promise.reject(
                                  "Signature version 4 presigned URLs must have an expiration date less than one week in the future"
                                )
                              ]
                            : ((y = ai(g, l, null != c ? c : this.service)),
                              (v = (function(e) {
                                var t,
                                  n,
                                  r =
                                    "function" == typeof e.clone
                                      ? e.clone()
                                      : gi(e),
                                  i = r.headers,
                                  o = r.query,
                                  s = void 0 === o ? {} : o;
                                try {
                                  for (
                                    var a = X(Object.keys(i)), u = a.next();
                                    !u.done;
                                    u = a.next()
                                  ) {
                                    var c = u.value;
                                    "x-amz-" === c.toLowerCase().substr(0, 6) &&
                                      ((s[c] = i[c]), delete i[c]);
                                  }
                                } catch (e) {
                                  t = { error: e };
                                } finally {
                                  try {
                                    u && !u.done && (n = a.return) && n.call(a);
                                  } finally {
                                    if (t) throw t.error;
                                  }
                                }
                                return Y(Y({}, e), { headers: i, query: s });
                              })(vi(e))),
                              f.sessionToken &&
                                (v.query["X-Amz-Security-Token"] =
                                  f.sessionToken),
                              (v.query["X-Amz-Algorithm"] = "AWS4-HMAC-SHA256"),
                              (v.query["X-Amz-Credential"] =
                                f.accessKeyId + "/" + y),
                              (v.query["X-Amz-Date"] = p),
                              (v.query["X-Amz-Expires"] = o.toString(10)),
                              (m = di(v, s, a)),
                              (v.query["X-Amz-SignedHeaders"] = _i(m)),
                              (b = v.query),
                              (w = "X-Amz-Signature"),
                              (_ = this.getSignature),
                              (S = [p, y, this.getSigningKey(f, l, g, c)]),
                              (E = this.createCanonicalRequest),
                              (A = [v, m]),
                              [4, pi(e, this.sha256)])
                        );
                      case 5:
                        return [
                          4,
                          _.apply(
                            this,
                            S.concat([E.apply(this, A.concat([I.sent()]))])
                          )
                        ];
                      case 6:
                        return (b[w] = I.sent()), [2, v];
                    }
                  });
                })
              );
            }),
            (e.prototype.sign = function(e, t) {
              return Q(this, void 0, void 0, function() {
                return $(this, function(n) {
                  return "string" == typeof e
                    ? [2, this.signString(e, t)]
                    : e.headers && e.payload
                    ? [2, this.signEvent(e, t)]
                    : [2, this.signRequest(e, t)];
                });
              });
            }),
            (e.prototype.signEvent = function(e, t) {
              var n = e.headers,
                r = e.payload,
                i = t.signingDate,
                o = void 0 === i ? new Date() : i,
                s = t.priorSignature,
                a = t.signingRegion,
                u = t.signingService;
              return Q(this, void 0, void 0, function() {
                var e, t, i, c, f, l, h, d, p, g, y;
                return $(this, function(v) {
                  switch (v.label) {
                    case 0:
                      return null == a ? [3, 1] : ((t = a), [3, 3]);
                    case 1:
                      return [4, this.regionProvider()];
                    case 2:
                      (t = v.sent()), (v.label = 3);
                    case 3:
                      return (
                        (e = t),
                        (i = wi(o)),
                        (c = i.shortDate),
                        (f = i.longDate),
                        (l = ai(c, e, null != u ? u : this.service)),
                        [4, pi({ headers: {}, body: r }, this.sha256)]
                      );
                    case 4:
                      return (
                        (h = v.sent()),
                        (d = new this.sha256()).update(n),
                        (g = hi),
                        [4, d.digest()]
                      );
                    case 5:
                      return (
                        (p = g.apply(void 0, [v.sent()])),
                        (y = [ii, f, l, s, p, h].join("\n")),
                        [
                          2,
                          this.signString(y, {
                            signingDate: o,
                            signingRegion: e,
                            signingService: u
                          })
                        ]
                      );
                  }
                });
              });
            }),
            (e.prototype.signString = function(e, t) {
              var n = void 0 === t ? {} : t,
                r = n.signingDate,
                i = void 0 === r ? new Date() : r,
                o = n.signingRegion,
                s = n.signingService;
              return Q(this, void 0, void 0, function() {
                var t, n, r, a, u, c, f, l;
                return $(this, function(h) {
                  switch (h.label) {
                    case 0:
                      return [4, this.credentialProvider()];
                    case 1:
                      return (
                        (t = h.sent()), null == o ? [3, 2] : ((r = o), [3, 4])
                      );
                    case 2:
                      return [4, this.regionProvider()];
                    case 3:
                      (r = h.sent()), (h.label = 4);
                    case 4:
                      return (
                        (n = r),
                        (a = wi(i).shortDate),
                        (f = (c = this.sha256).bind),
                        [4, this.getSigningKey(t, n, a, s)]
                      );
                    case 5:
                      return (
                        (u = new (f.apply(c, [void 0, h.sent()]))()).update(e),
                        (l = hi),
                        [4, u.digest()]
                      );
                    case 6:
                      return [2, l.apply(void 0, [h.sent()])];
                  }
                });
              });
            }),
            (e.prototype.signRequest = function(e, t) {
              var n = void 0 === t ? {} : t,
                r = n.signingDate,
                i = void 0 === r ? new Date() : r,
                o = n.signableHeaders,
                s = n.unsignableHeaders,
                a = n.signingRegion,
                u = n.signingService;
              return Q(this, void 0, void 0, function() {
                var t, n, r, c, f, l, h, d, p, g, y;
                return $(this, function(v) {
                  switch (v.label) {
                    case 0:
                      return [4, this.credentialProvider()];
                    case 1:
                      return (
                        (t = v.sent()), null == a ? [3, 2] : ((r = a), [3, 4])
                      );
                    case 2:
                      return [4, this.regionProvider()];
                    case 3:
                      (r = v.sent()), (v.label = 4);
                    case 4:
                      return (
                        (n = r),
                        (c = vi(e)),
                        (f = wi(i)),
                        (l = f.longDate),
                        (h = f.shortDate),
                        (d = ai(h, n, null != u ? u : this.service)),
                        (c.headers[$r] = l),
                        t.sessionToken && (c.headers[ei] = t.sessionToken),
                        [4, pi(c, this.sha256)]
                      );
                    case 5:
                      return (
                        (p = v.sent()),
                        !(function(e, t) {
                          var n, r;
                          e = e.toLowerCase();
                          try {
                            for (
                              var i = X(Object.keys(t)), o = i.next();
                              !o.done;
                              o = i.next()
                            ) {
                              if (e === o.value.toLowerCase()) return !0;
                            }
                          } catch (e) {
                            n = { error: e };
                          } finally {
                            try {
                              o && !o.done && (r = i.return) && r.call(i);
                            } finally {
                              if (n) throw n.error;
                            }
                          }
                          return !1;
                        })("x-amz-content-sha256", c.headers) &&
                          this.applyChecksum &&
                          (c.headers["x-amz-content-sha256"] = p),
                        (g = di(c, s, o)),
                        [
                          4,
                          this.getSignature(
                            l,
                            d,
                            this.getSigningKey(t, n, h, u),
                            this.createCanonicalRequest(c, g, p)
                          )
                        ]
                      );
                    case 6:
                      return (
                        (y = v.sent()),
                        (c.headers.authorization =
                          "AWS4-HMAC-SHA256 Credential=" +
                          t.accessKeyId +
                          "/" +
                          d +
                          ", SignedHeaders=" +
                          _i(g) +
                          ", Signature=" +
                          y),
                        [2, c]
                      );
                  }
                });
              });
            }),
            (e.prototype.createCanonicalRequest = function(e, t, n) {
              var r = Object.keys(t).sort();
              return (
                e.method +
                "\n" +
                this.getCanonicalPath(e) +
                "\n" +
                (function(e) {
                  var t,
                    n,
                    r = e.query,
                    i = void 0 === r ? {} : r,
                    o = [],
                    s = {},
                    a = function(e) {
                      if (e.toLowerCase() === Zr) return "continue";
                      o.push(e);
                      var t = i[e];
                      "string" == typeof t
                        ? (s[e] = ur(e) + "=" + ur(t))
                        : Array.isArray(t) &&
                          (s[e] = t
                            .slice(0)
                            .sort()
                            .reduce(function(t, n) {
                              return t.concat([ur(e) + "=" + ur(n)]);
                            }, [])
                            .join("&"));
                    };
                  try {
                    for (
                      var u = X(Object.keys(i).sort()), c = u.next();
                      !c.done;
                      c = u.next()
                    ) {
                      a(c.value);
                    }
                  } catch (e) {
                    t = { error: e };
                  } finally {
                    try {
                      c && !c.done && (n = u.return) && n.call(u);
                    } finally {
                      if (t) throw t.error;
                    }
                  }
                  return o
                    .map(function(e) {
                      return s[e];
                    })
                    .filter(function(e) {
                      return e;
                    })
                    .join("&");
                })(e) +
                "\n" +
                r
                  .map(function(e) {
                    return e + ":" + t[e];
                  })
                  .join("\n") +
                "\n\n" +
                r.join(";") +
                "\n" +
                n
              );
            }),
            (e.prototype.createStringToSign = function(e, t, n) {
              return Q(this, void 0, void 0, function() {
                var r, i;
                return $(this, function(o) {
                  switch (o.label) {
                    case 0:
                      return (r = new this.sha256()).update(n), [4, r.digest()];
                    case 1:
                      return (
                        (i = o.sent()),
                        [2, "AWS4-HMAC-SHA256\n" + e + "\n" + t + "\n" + hi(i)]
                      );
                  }
                });
              });
            }),
            (e.prototype.getCanonicalPath = function(e) {
              var t = e.path;
              return this.uriEscapePath
                ? "/" +
                    encodeURIComponent(t.replace(/^\//, "")).replace(
                      /%2F/g,
                      "/"
                    )
                : t;
            }),
            (e.prototype.getSignature = function(e, t, n, r) {
              return Q(this, void 0, void 0, function() {
                var i, o, s, a, u;
                return $(this, function(c) {
                  switch (c.label) {
                    case 0:
                      return [4, this.createStringToSign(e, t, r)];
                    case 1:
                      return (
                        (i = c.sent()), (a = (s = this.sha256).bind), [4, n]
                      );
                    case 2:
                      return (
                        (o = new (a.apply(s, [void 0, c.sent()]))()).update(i),
                        (u = hi),
                        [4, o.digest()]
                      );
                    case 3:
                      return [2, u.apply(void 0, [c.sent()])];
                  }
                });
              });
            }),
            (e.prototype.getSigningKey = function(e, t, n, r) {
              return (function(e, t, n, r, i) {
                var o =
                  n +
                  ":" +
                  r +
                  ":" +
                  i +
                  ":" +
                  t.accessKeyId +
                  ":" +
                  t.sessionToken;
                if (o in oi) return oi[o];
                for (si.push(o); si.length > 50; ) delete oi[si.shift()];
                return (oi[o] = new Promise(function(s, a) {
                  var u,
                    c,
                    f = Promise.resolve("AWS4" + t.secretAccessKey),
                    l = function(t) {
                      (f = f.then(function(n) {
                        return (r = t), (i = new e(n)).update(r), i.digest();
                        var r, i;
                      })).catch(function() {});
                    };
                  try {
                    for (
                      var h = X([n, r, i, "aws4_request"]), d = h.next();
                      !d.done;
                      d = h.next()
                    ) {
                      l(d.value);
                    }
                  } catch (e) {
                    u = { error: e };
                  } finally {
                    try {
                      d && !d.done && (c = h.return) && c.call(h);
                    } finally {
                      if (u) throw u.error;
                    }
                  }
                  f.then(s, function(e) {
                    delete oi[o], a(e);
                  });
                }));
              })(this.sha256, e, n, t, r || this.service);
            }),
            e
          );
        })(),
        wi = function(e) {
          var t = mi(e).replace(/[\-:]/g, "");
          return { longDate: t, shortDate: t.substr(0, 8) };
        },
        _i = function(e) {
          return Object.keys(e)
            .sort()
            .join(";");
        },
        Si = function(e) {
          if ("string" == typeof e) {
            var t = Promise.resolve(e);
            return function() {
              return t;
            };
          }
          return e;
        },
        Ei = function(e) {
          if ("object" == typeof e) {
            var t = Promise.resolve(e);
            return function() {
              return t;
            };
          }
          return e;
        };
      function Ai(e) {
        if ("object" == typeof e) {
          var t = Promise.resolve(e);
          return function() {
            return t;
          };
        }
        return e;
      }
      var Ii = {
          name: "getUserAgentMiddleware",
          step: "build",
          tags: ["SET_USER_AGENT", "USER_AGENT"]
        },
        Ti = function(e) {
          return {
            applyToStack: function(t) {
              var n;
              t.add(
                ((n = e),
                function(e) {
                  return function(t) {
                    var r = t.request;
                    if (!mn.isInstance(r)) return e(t);
                    var i = r.headers,
                      o =
                        "node" === n.runtime
                          ? "user-agent"
                          : "x-amz-user-agent";
                    return (
                      i[o]
                        ? (i[o] += " " + n.defaultUserAgent)
                        : (i[o] = "" + n.defaultUserAgent),
                      n.customUserAgent && (i[o] += " " + n.customUserAgent),
                      e(Y(Y({}, t), { request: r }))
                    );
                  };
                }),
                Ii
              );
            }
          };
        },
        Ci = (function(e) {
          function t(t) {
            var n,
              r,
              i = this,
              o = (function(e) {
                if (!e.region) throw new Error("Region is missing");
                return Y(Y({}, e), { region: Kr(e.region) });
              })(re(re({}, qr), t)),
              s = (function(e) {
                var t = Nr(e.maxAttempts);
                return Y(Y({}, e), {
                  maxAttempts: t,
                  retryStrategy: e.retryStrategy || new kr(t)
                });
              })(
                (function(e) {
                  var t,
                    n = this,
                    r = Ai(e.credentials || e.credentialDefaultProvider(e)),
                    i = e.signingEscapePath,
                    o = void 0 === i || i,
                    s = e.systemClockOffset,
                    a = void 0 === s ? e.systemClockOffset || 0 : s,
                    u = e.sha256;
                  return (
                    (t = e.signer
                      ? Ai(e.signer)
                      : function() {
                          return Ai(e.region)()
                            .then(function(t) {
                              return Q(n, void 0, void 0, function() {
                                return $(this, function(n) {
                                  switch (n.label) {
                                    case 0:
                                      return [4, e.regionInfoProvider(t)];
                                    case 1:
                                      return [2, [n.sent() || {}, t]];
                                  }
                                });
                              });
                            })
                            .then(function(t) {
                              var n = Z(t, 2),
                                i = n[0],
                                s = n[1],
                                a = i.signingRegion,
                                c = void 0 === a ? e.signingRegion : a,
                                f = i.signingService,
                                l = void 0 === f ? e.signingName : f;
                              return (
                                (e.signingRegion = e.signingRegion || c || s),
                                (e.signingName = e.signingName || l),
                                new bi({
                                  credentials: r,
                                  region: e.signingRegion,
                                  service: e.signingName,
                                  sha256: u,
                                  uriEscapePath: o
                                })
                              );
                            });
                        }),
                    Y(Y({}, e), {
                      systemClockOffset: a,
                      signingEscapePath: o,
                      credentials: r,
                      signer: t
                    })
                  );
                })(
                  Y(Y({}, (n = o)), {
                    tls: null === (r = n.tls) || void 0 === r || r,
                    endpoint: n.endpoint
                      ? Vr(n)
                      : function() {
                          return zr(n);
                        }
                  })
                )
              );
            return (
              ((i = e.call(this, s) || this).config = s),
              i.middlewareStack.use(_r(i.config)),
              i.middlewareStack.use(Ti(i.config)),
              i.middlewareStack.use(Hr(i.config)),
              i.middlewareStack.use(Yr(i.config)),
              i.middlewareStack.use(Qr(i.config)),
              i
            );
          }
          return (
            ne(t, e),
            (t.prototype.destroy = function() {
              e.prototype.destroy.call(this);
            }),
            t
          );
        })(fe),
        Oi = function() {
          return (Oi =
            Object.assign ||
            function(e) {
              for (var t, n = 1, r = arguments.length; n < r; n++)
                for (var i in (t = arguments[n]))
                  Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
              return e;
            }).apply(this, arguments);
        },
        Pi = function(e, t, n, r) {
          return new (n || (n = Promise))(function(i, o) {
            function s(e) {
              try {
                u(r.next(e));
              } catch (e) {
                o(e);
              }
            }
            function a(e) {
              try {
                u(r.throw(e));
              } catch (e) {
                o(e);
              }
            }
            function u(e) {
              var t;
              e.done
                ? i(e.value)
                : ((t = e.value),
                  t instanceof n
                    ? t
                    : new n(function(e) {
                        e(t);
                      })).then(s, a);
            }
            u((r = r.apply(e, t || [])).next());
          });
        },
        ki = function(e, t) {
          var n,
            r,
            i,
            o,
            s = {
              label: 0,
              sent: function() {
                if (1 & i[0]) throw i[1];
                return i[1];
              },
              trys: [],
              ops: []
            };
          return (
            (o = { next: a(0), throw: a(1), return: a(2) }),
            "function" == typeof Symbol &&
              (o[Symbol.iterator] = function() {
                return this;
              }),
            o
          );
          function a(o) {
            return function(a) {
              return (function(o) {
                if (n) throw new TypeError("Generator is already executing.");
                for (; s; )
                  try {
                    if (
                      ((n = 1),
                      r &&
                        (i =
                          2 & o[0]
                            ? r.return
                            : o[0]
                            ? r.throw || ((i = r.return) && i.call(r), 0)
                            : r.next) &&
                        !(i = i.call(r, o[1])).done)
                    )
                      return i;
                    switch (((r = 0), i && (o = [2 & o[0], i.value]), o[0])) {
                      case 0:
                      case 1:
                        i = o;
                        break;
                      case 4:
                        return s.label++, { value: o[1], done: !1 };
                      case 5:
                        s.label++, (r = o[1]), (o = [0]);
                        continue;
                      case 7:
                        (o = s.ops.pop()), s.trys.pop();
                        continue;
                      default:
                        if (
                          !((i = s.trys),
                          (i = i.length > 0 && i[i.length - 1]) ||
                            (6 !== o[0] && 2 !== o[0]))
                        ) {
                          s = 0;
                          continue;
                        }
                        if (
                          3 === o[0] &&
                          (!i || (o[1] > i[0] && o[1] < i[3]))
                        ) {
                          s.label = o[1];
                          break;
                        }
                        if (6 === o[0] && s.label < i[1]) {
                          (s.label = i[1]), (i = o);
                          break;
                        }
                        if (i && s.label < i[2]) {
                          (s.label = i[2]), s.ops.push(o);
                          break;
                        }
                        i[2] && s.ops.pop(), s.trys.pop();
                        continue;
                    }
                    o = t.call(e, s);
                  } catch (e) {
                    (o = [6, e]), (r = 0);
                  } finally {
                    n = i = 0;
                  }
                if (5 & o[0]) throw o[1];
                return { value: o[0] ? o[1] : void 0, done: !0 };
              })([o, a]);
            };
          }
        },
        Ni = new f("Credentials"),
        Ri = new ((function() {
          function e(e) {
            (this._gettingCredPromise = null),
              (this._refreshHandlers = {}),
              (this.Auth = G.Auth),
              this.configure(e),
              (this._refreshHandlers.google = F.refreshGoogleToken),
              (this._refreshHandlers.facebook = B.refreshFacebookToken);
          }
          return (
            (e.prototype.getModuleName = function() {
              return "Credentials";
            }),
            (e.prototype.getCredSource = function() {
              return this._credentials_source;
            }),
            (e.prototype.configure = function(e) {
              if (!e) return this._config || {};
              this._config = Object.assign({}, this._config, e);
              var t = this._config.refreshHandlers;
              return (
                t &&
                  (this._refreshHandlers = Oi(
                    Oi({}, this._refreshHandlers),
                    t
                  )),
                (this._storage = this._config.storage),
                this._storage || (this._storage = new b().getStorage()),
                (this._storageSync = Promise.resolve()),
                "function" == typeof this._storage.sync &&
                  (this._storageSync = this._storage.sync()),
                this._config
              );
            }),
            (e.prototype.get = function() {
              return Ni.debug("getting credentials"), this._pickupCredentials();
            }),
            (e.prototype._pickupCredentials = function() {
              return (
                Ni.debug("picking up credentials"),
                this._gettingCredPromise && this._gettingCredPromise.isPending()
                  ? Ni.debug("getting old cred promise")
                  : (Ni.debug("getting new cred promise"),
                    (this._gettingCredPromise = Object(w.c)(
                      this._keepAlive()
                    ))),
                this._gettingCredPromise
              );
            }),
            (e.prototype._keepAlive = function() {
              Ni.debug("checking if credentials exists and not expired");
              var e = this._credentials;
              return e && !this._isExpired(e)
                ? (Ni.debug(
                    "credentials not changed and not expired, directly return"
                  ),
                  Promise.resolve(e))
                : (Ni.debug(
                    "need to get a new credential or refresh the existing one"
                  ),
                  this.Auth &&
                  "function" == typeof this.Auth.currentUserCredentials
                    ? this.Auth.currentUserCredentials()
                    : Promise.reject("No Auth module registered in Amplify"));
            }),
            (e.prototype.refreshFederatedToken = function(e) {
              Ni.debug("Getting federated credentials");
              var t = e.provider,
                n = e.user,
                r = e.token,
                i = e.identity_id,
                o = e.expires_at;
              o = 1970 === new Date(o).getFullYear() ? 1e3 * o : o;
              return (
                Ni.debug("checking if federated jwt token expired"),
                o > new Date().getTime()
                  ? (Ni.debug("token not expired"),
                    this._setCredentialsFromFederation({
                      provider: t,
                      token: r,
                      user: n,
                      identity_id: i,
                      expires_at: o
                    }))
                  : this._refreshHandlers[t] &&
                    "function" == typeof this._refreshHandlers[t]
                  ? (Ni.debug(
                      "getting refreshed jwt token from federation provider"
                    ),
                    this._providerRefreshWithRetry({
                      refreshHandler: this._refreshHandlers[t],
                      provider: t,
                      user: n
                    }))
                  : (Ni.debug("no refresh handler for provider:", t),
                    this.clear(),
                    Promise.reject("no refresh handler for provider"))
              );
            }),
            (e.prototype._providerRefreshWithRetry = function(e) {
              var t = this,
                n = e.refreshHandler,
                r = e.provider,
                i = e.user;
              return O(n, [], 1e4)
                .then(function(e) {
                  return (
                    Ni.debug("refresh federated token sucessfully", e),
                    t._setCredentialsFromFederation({
                      provider: r,
                      token: e.token,
                      user: i,
                      identity_id: e.identity_id,
                      expires_at: e.expires_at
                    })
                  );
                })
                .catch(function(e) {
                  return (
                    ("string" == typeof e &&
                      0 ===
                        e
                          .toLowerCase()
                          .lastIndexOf("network error", e.length)) ||
                      t.clear(),
                    Ni.debug("refresh federated token failed", e),
                    Promise.reject("refreshing federation token failed: " + e)
                  );
                });
            }),
            (e.prototype._isExpired = function(e) {
              if (!e)
                return Ni.debug("no credentials for expiration check"), !0;
              Ni.debug("are these credentials expired?", e);
              var t = Date.now();
              return !(
                e.expiration.getTime() > t + 6e5 &&
                t < this._nextCredentialsRefresh
              );
            }),
            (e.prototype._setCredentialsForGuest = function() {
              return Pi(this, void 0, void 0, function() {
                var e,
                  t,
                  n,
                  r,
                  i,
                  o,
                  s,
                  a = this;
                return ki(this, function(u) {
                  switch (u.label) {
                    case 0:
                      if (
                        (Ni.debug("setting credentials for guest"),
                        (e = this._config),
                        (t = e.identityPoolId),
                        (n = e.region),
                        e.mandatorySignIn)
                      )
                        return [
                          2,
                          Promise.reject(
                            "cannot get guest credentials when mandatory signin enabled"
                          )
                        ];
                      if (!t)
                        return (
                          Ni.debug(
                            "No Cognito Identity pool provided for unauthenticated access"
                          ),
                          [
                            2,
                            Promise.reject(
                              "No Cognito Identity pool provided for unauthenticated access"
                            )
                          ]
                        );
                      if (!n)
                        return (
                          Ni.debug(
                            "region is not configured for getting the credentials"
                          ),
                          [
                            2,
                            Promise.reject(
                              "region is not configured for getting the credentials"
                            )
                          ]
                        );
                      (r = void 0), (u.label = 1);
                    case 1:
                      return u.trys.push([1, 3, , 4]), [4, this._storageSync];
                    case 2:
                      return (
                        u.sent(),
                        (r = this._storage.getItem("CognitoIdentityId-" + t)),
                        (this._identityId = r),
                        [3, 4]
                      );
                    case 3:
                      return (
                        (i = u.sent()),
                        Ni.debug("Failed to get the cached identityId", i),
                        [3, 4]
                      );
                    case 4:
                      return (
                        (o = new Ci({ region: n, customUserAgent: V() })),
                        (s = void 0),
                        (s = r
                          ? tr({ identityId: r, client: o })()
                          : (function() {
                              return Pi(a, void 0, void 0, function() {
                                var e;
                                return ki(this, function(n) {
                                  switch (n.label) {
                                    case 0:
                                      return [
                                        4,
                                        o.send(new nr({ IdentityPoolId: t }))
                                      ];
                                    case 1:
                                      return (
                                        (e = n.sent().IdentityId),
                                        (this._identityId = e),
                                        [2, tr({ client: o, identityId: e })()]
                                      );
                                  }
                                });
                              });
                            })().catch(function(e) {
                              return Pi(a, void 0, void 0, function() {
                                return ki(this, function(t) {
                                  throw e;
                                });
                              });
                            })),
                        [
                          2,
                          this._loadCredentials(s, "guest", !1, null)
                            .then(function(e) {
                              return e;
                            })
                            .catch(function(e) {
                              return Pi(a, void 0, void 0, function() {
                                var n = this;
                                return ki(this, function(i) {
                                  return "ResourceNotFoundException" ===
                                    e.name &&
                                    e.message ===
                                      "Identity '" + r + "' not found."
                                    ? (Ni.debug(
                                        "Failed to load guest credentials"
                                      ),
                                      this._storage.removeItem(
                                        "CognitoIdentityId-" + t
                                      ),
                                      (s = (function() {
                                        return Pi(
                                          n,
                                          void 0,
                                          void 0,
                                          function() {
                                            var e;
                                            return ki(this, function(n) {
                                              switch (n.label) {
                                                case 0:
                                                  return [
                                                    4,
                                                    o.send(
                                                      new nr({
                                                        IdentityPoolId: t
                                                      })
                                                    )
                                                  ];
                                                case 1:
                                                  return (
                                                    (e = n.sent().IdentityId),
                                                    (this._identityId = e),
                                                    [
                                                      2,
                                                      tr({
                                                        client: o,
                                                        identityId: e
                                                      })()
                                                    ]
                                                  );
                                              }
                                            });
                                          }
                                        );
                                      })().catch(function(e) {
                                        return Pi(
                                          n,
                                          void 0,
                                          void 0,
                                          function() {
                                            return ki(this, function(t) {
                                              throw e;
                                            });
                                          }
                                        );
                                      })),
                                      [
                                        2,
                                        this._loadCredentials(
                                          s,
                                          "guest",
                                          !1,
                                          null
                                        )
                                      ])
                                    : [2, e];
                                });
                              });
                            })
                        ]
                      );
                  }
                });
              });
            }),
            (e.prototype._setCredentialsFromFederation = function(e) {
              var t = e.provider,
                n = e.token,
                r = e.identity_id,
                i =
                  {
                    google: "accounts.google.com",
                    facebook: "graph.facebook.com",
                    amazon: "www.amazon.com",
                    developer: "cognito-identity.amazonaws.com"
                  }[t] || t;
              if (!i)
                return Promise.reject("You must specify a federated provider");
              var o = {};
              o[i] = n;
              var s = this._config,
                a = s.identityPoolId,
                u = s.region;
              if (!a)
                return (
                  Ni.debug("No Cognito Federated Identity pool provided"),
                  Promise.reject("No Cognito Federated Identity pool provided")
                );
              if (!u)
                return (
                  Ni.debug(
                    "region is not configured for getting the credentials"
                  ),
                  Promise.reject(
                    "region is not configured for getting the credentials"
                  )
                );
              var c = new Ci({ region: u, customUserAgent: V() }),
                f = void 0;
              r
                ? (f = tr({ identityId: r, logins: o, client: c })())
                : (f = or({ logins: o, identityPoolId: a, client: c })());
              return this._loadCredentials(f, "federated", !0, e);
            }),
            (e.prototype._setCredentialsFromSession = function(e) {
              var t = this;
              Ni.debug("set credentials from session");
              var n = e.getIdToken().getJwtToken(),
                r = this._config,
                i = r.region,
                o = r.userPoolId,
                s = r.identityPoolId;
              if (!s)
                return (
                  Ni.debug("No Cognito Federated Identity pool provided"),
                  Promise.reject("No Cognito Federated Identity pool provided")
                );
              if (!i)
                return (
                  Ni.debug(
                    "region is not configured for getting the credentials"
                  ),
                  Promise.reject(
                    "region is not configured for getting the credentials"
                  )
                );
              var a = {};
              a["cognito-idp." + i + ".amazonaws.com/" + o] = n;
              var u = new Ci({ region: i, customUserAgent: V() }),
                c = Pi(t, void 0, void 0, function() {
                  var e;
                  return ki(this, function(t) {
                    switch (t.label) {
                      case 0:
                        return [
                          4,
                          u.send(new nr({ IdentityPoolId: s, Logins: a }))
                        ];
                      case 1:
                        return (
                          (e = t.sent().IdentityId),
                          (this._identityId = e),
                          [2, tr({ client: u, logins: a, identityId: e })()]
                        );
                    }
                  });
                }).catch(function(e) {
                  return Pi(t, void 0, void 0, function() {
                    return ki(this, function(t) {
                      throw e;
                    });
                  });
                });
              return this._loadCredentials(c, "userPool", !0, null);
            }),
            (e.prototype._loadCredentials = function(e, t, n, r) {
              var i = this,
                o = this,
                s = this._config.identityPoolId;
              return new Promise(function(a, u) {
                e.then(function(e) {
                  return Pi(i, void 0, void 0, function() {
                    var i, u, c, f, l, h;
                    return ki(this, function(d) {
                      switch (d.label) {
                        case 0:
                          if (
                            (Ni.debug("Load credentials successfully", e),
                            this._identityId &&
                              !e.identityId &&
                              (e.identityId = this._identityId),
                            (o._credentials = e),
                            (o._credentials.authenticated = n),
                            (o._credentials_source = t),
                            (o._nextCredentialsRefresh =
                              new Date().getTime() + 3e6),
                            "federated" === t)
                          ) {
                            (i = Object.assign(
                              { id: this._credentials.identityId },
                              r.user
                            )),
                              (u = r.provider),
                              (c = r.token),
                              (f = r.expires_at),
                              (l = r.identity_id);
                            try {
                              this._storage.setItem(
                                "aws-amplify-federatedInfo",
                                JSON.stringify({
                                  provider: u,
                                  token: c,
                                  user: i,
                                  expires_at: f,
                                  identity_id: l
                                })
                              );
                            } catch (e) {
                              Ni.debug(
                                "Failed to put federated info into auth storage",
                                e
                              );
                            }
                          }
                          if ("guest" !== t) return [3, 4];
                          d.label = 1;
                        case 1:
                          return (
                            d.trys.push([1, 3, , 4]), [4, this._storageSync]
                          );
                        case 2:
                          return (
                            d.sent(),
                            this._storage.setItem(
                              "CognitoIdentityId-" + s,
                              e.identityId
                            ),
                            [3, 4]
                          );
                        case 3:
                          return (
                            (h = d.sent()),
                            Ni.debug("Failed to cache identityId", h),
                            [3, 4]
                          );
                        case 4:
                          return a(o._credentials), [2];
                      }
                    });
                  });
                }).catch(function(t) {
                  if (t)
                    return (
                      Ni.debug("Failed to load credentials", e),
                      Ni.debug("Error loading credentials", t),
                      void u(t)
                    );
                });
              });
            }),
            (e.prototype.set = function(e, t) {
              return "session" === t
                ? this._setCredentialsFromSession(e)
                : "federation" === t
                ? this._setCredentialsFromFederation(e)
                : "guest" === t
                ? this._setCredentialsForGuest()
                : (Ni.debug("no source specified for setting credentials"),
                  Promise.reject("invalid source"));
            }),
            (e.prototype.clear = function() {
              return Pi(this, void 0, void 0, function() {
                return ki(this, function(e) {
                  return (
                    (this._credentials = null),
                    (this._credentials_source = null),
                    Ni.debug("removing aws-amplify-federatedInfo from storage"),
                    this._storage.removeItem("aws-amplify-federatedInfo"),
                    [2]
                  );
                });
              });
            }),
            (e.prototype.shear = function(e) {
              return {
                accessKeyId: e.accessKeyId,
                sessionToken: e.sessionToken,
                secretAccessKey: e.secretAccessKey,
                identityId: e.identityId,
                authenticated: e.authenticated
              };
            }),
            e
          );
        })())(null);
      G.register(Ri);
      var xi = new f("Parser"),
        Ui = function(e) {
          var t,
            n = {};
          if (e.aws_mobile_analytics_app_id) {
            var r = {
              AWSPinpoint: {
                appId: e.aws_mobile_analytics_app_id,
                region: e.aws_mobile_analytics_app_region
              }
            };
            n.Analytics = r;
          }
          return (
            (e.aws_cognito_identity_pool_id || e.aws_user_pools_id) &&
              (n.Auth = {
                userPoolId: e.aws_user_pools_id,
                userPoolWebClientId: e.aws_user_pools_web_client_id,
                region: e.aws_cognito_region,
                identityPoolId: e.aws_cognito_identity_pool_id,
                identityPoolRegion: e.aws_cognito_region,
                mandatorySignIn: "enable" === e.aws_mandatory_sign_in
              }),
            (t = e.aws_user_files_s3_bucket
              ? {
                  AWSS3: {
                    bucket: e.aws_user_files_s3_bucket,
                    region: e.aws_user_files_s3_bucket_region,
                    dangerouslyConnectToHttpEndpointForTesting:
                      e.aws_user_files_s3_dangerously_connect_to_http_endpoint_for_testing
                  }
                }
              : e
              ? e.Storage || e
              : {}),
            (n.Analytics = Object.assign({}, n.Analytics, e.Analytics)),
            (n.Auth = Object.assign({}, n.Auth, e.Auth)),
            (n.Storage = Object.assign({}, t)),
            xi.debug("parse config", e, "to amplifyconfig", n),
            n
          );
        },
        Di = (function() {
          function e() {}
          return (e.parseMobilehubConfig = Ui), e;
        })(),
        Mi = n(9);
      function ji(e, t) {
        void 0 === t && (t = {});
        var n = (function(e) {
          if (e && "j" === e[0] && ":" === e[1]) return e.substr(2);
          return e;
        })(e);
        if (
          (function(e, t) {
            return (
              void 0 === t &&
                (t = !e || ("{" !== e[0] && "[" !== e[0] && '"' !== e[0])),
              !t
            );
          })(n, t.doNotParse)
        )
          try {
            return JSON.parse(n);
          } catch (e) {}
        return e;
      }
      var Li,
        Fi = n(80),
        Bi = (function() {
          function e(e, t) {
            var n = this;
            (this.changeListeners = []),
              (this.HAS_DOCUMENT_COOKIE = !1),
              (this.cookies = (function(e, t) {
                return "string" == typeof e
                  ? Mi.parse(e, t)
                  : "object" == typeof e && null !== e
                  ? e
                  : {};
              })(e, t)),
              new Promise(function() {
                n.HAS_DOCUMENT_COOKIE =
                  "object" == typeof document &&
                  "string" == typeof document.cookie;
              }).catch(function() {});
          }
          return (
            (e.prototype._updateBrowserValues = function(e) {
              this.HAS_DOCUMENT_COOKIE &&
                (this.cookies = Mi.parse(document.cookie, e));
            }),
            (e.prototype._emitChange = function(e) {
              for (var t = 0; t < this.changeListeners.length; ++t)
                this.changeListeners[t](e);
            }),
            (e.prototype.get = function(e, t, n) {
              return (
                void 0 === t && (t = {}),
                this._updateBrowserValues(n),
                ji(this.cookies[e], t)
              );
            }),
            (e.prototype.getAll = function(e, t) {
              void 0 === e && (e = {}), this._updateBrowserValues(t);
              var n = {};
              for (var r in this.cookies) n[r] = ji(this.cookies[r], e);
              return n;
            }),
            (e.prototype.set = function(e, t, n) {
              var r;
              "object" == typeof t && (t = JSON.stringify(t)),
                (this.cookies = Fi({}, this.cookies, (((r = {})[e] = t), r))),
                this.HAS_DOCUMENT_COOKIE &&
                  (document.cookie = Mi.serialize(e, t, n)),
                this._emitChange({ name: e, value: t, options: n });
            }),
            (e.prototype.remove = function(e, t) {
              var n = (t = Fi({}, t, {
                expires: new Date(1970, 1, 1, 0, 0, 1),
                maxAge: 0
              }));
              (this.cookies = Fi({}, this.cookies)),
                delete this.cookies[e],
                this.HAS_DOCUMENT_COOKIE &&
                  (document.cookie = Mi.serialize(e, "", n)),
                this._emitChange({ name: e, value: void 0, options: t });
            }),
            (e.prototype.addChangeListener = function(e) {
              this.changeListeners.push(e);
            }),
            (e.prototype.removeChangeListener = function(e) {
              var t = this.changeListeners.indexOf(e);
              t >= 0 && this.changeListeners.splice(t, 1);
            }),
            e
          );
        })(),
        qi = Object(w.b)().isBrowser,
        Vi = (function() {
          function e(e) {
            void 0 === e && (e = {}),
              (this.cookies = new Bi()),
              (this.store = qi ? window.localStorage : Object.create(null)),
              (this.cookies = e.req ? new Bi(e.req.headers.cookie) : new Bi()),
              Object.assign(this.store, this.cookies.getAll());
          }
          return (
            Object.defineProperty(e.prototype, "length", {
              get: function() {
                return Object.entries(this.store).length;
              },
              enumerable: !0,
              configurable: !0
            }),
            (e.prototype.clear = function() {
              var e = this;
              Array.from(new Array(this.length))
                .map(function(t, n) {
                  return e.key(n);
                })
                .forEach(function(t) {
                  return e.removeItem(t);
                });
            }),
            (e.prototype.getItem = function(e) {
              return this.getLocalItem(e);
            }),
            (e.prototype.getLocalItem = function(e) {
              return Object.prototype.hasOwnProperty.call(this.store, e)
                ? this.store[e]
                : null;
            }),
            (e.prototype.getUniversalItem = function(e) {
              return this.cookies.get(e);
            }),
            (e.prototype.key = function(e) {
              return Object.keys(this.store)[e];
            }),
            (e.prototype.removeItem = function(e) {
              this.removeLocalItem(e), this.removeUniversalItem(e);
            }),
            (e.prototype.removeLocalItem = function(e) {
              delete this.store[e];
            }),
            (e.prototype.removeUniversalItem = function(e) {
              this.cookies.remove(e);
            }),
            (e.prototype.setItem = function(e, t) {
              switch ((this.setLocalItem(e, t), e.split(".").pop())) {
                case "LastAuthUser":
                case "accessToken":
                case "idToken":
                  this.setUniversalItem(e, t);
              }
            }),
            (e.prototype.setLocalItem = function(e, t) {
              this.store[e] = t;
            }),
            (e.prototype.setUniversalItem = function(e, t) {
              this.cookies.set(e, t, {
                path: "/",
                sameSite: !0,
                secure: "localhost" !== window.location.hostname
              });
            }),
            e
          );
        })(),
        zi = (function() {
          function e(e) {
            var t = e || {},
              n = t.ValidationData,
              r = t.Username,
              i = t.Password,
              o = t.AuthParameters,
              s = t.ClientMetadata;
            (this.validationData = n || {}),
              (this.authParameters = o || {}),
              (this.clientMetadata = s || {}),
              (this.username = r),
              (this.password = i);
          }
          var t = e.prototype;
          return (
            (t.getUsername = function() {
              return this.username;
            }),
            (t.getPassword = function() {
              return this.password;
            }),
            (t.getValidationData = function() {
              return this.validationData;
            }),
            (t.getAuthParameters = function() {
              return this.authParameters;
            }),
            (t.getClientMetadata = function() {
              return this.clientMetadata;
            }),
            e
          );
        })(),
        Ki = n(0),
        Gi = n(2),
        Hi = n.n(Gi),
        Wi = (n(20), n(11)),
        Yi = n.n(Wi),
        Ji = n(8),
        Qi = n.n(Ji),
        $i = Xi;
      function Xi(e, t) {
        null != e && this.fromString(e, t);
      }
      function Zi() {
        return new Xi(null);
      }
      var eo = "undefined" != typeof navigator;
      eo && "Microsoft Internet Explorer" == navigator.appName
        ? ((Xi.prototype.am = function(e, t, n, r, i, o) {
            for (var s = 32767 & t, a = t >> 15; --o >= 0; ) {
              var u = 32767 & this[e],
                c = this[e++] >> 15,
                f = a * u + c * s;
              (i =
                ((u = s * u + ((32767 & f) << 15) + n[r] + (1073741823 & i)) >>>
                  30) +
                (f >>> 15) +
                a * c +
                (i >>> 30)),
                (n[r++] = 1073741823 & u);
            }
            return i;
          }),
          (Li = 30))
        : eo && "Netscape" != navigator.appName
        ? ((Xi.prototype.am = function(e, t, n, r, i, o) {
            for (; --o >= 0; ) {
              var s = t * this[e++] + n[r] + i;
              (i = Math.floor(s / 67108864)), (n[r++] = 67108863 & s);
            }
            return i;
          }),
          (Li = 26))
        : ((Xi.prototype.am = function(e, t, n, r, i, o) {
            for (var s = 16383 & t, a = t >> 14; --o >= 0; ) {
              var u = 16383 & this[e],
                c = this[e++] >> 14,
                f = a * u + c * s;
              (i =
                ((u = s * u + ((16383 & f) << 14) + n[r] + i) >> 28) +
                (f >> 14) +
                a * c),
                (n[r++] = 268435455 & u);
            }
            return i;
          }),
          (Li = 28)),
        (Xi.prototype.DB = Li),
        (Xi.prototype.DM = (1 << Li) - 1),
        (Xi.prototype.DV = 1 << Li);
      (Xi.prototype.FV = Math.pow(2, 52)),
        (Xi.prototype.F1 = 52 - Li),
        (Xi.prototype.F2 = 2 * Li - 52);
      var to,
        no,
        ro = new Array();
      for (to = "0".charCodeAt(0), no = 0; no <= 9; ++no) ro[to++] = no;
      for (to = "a".charCodeAt(0), no = 10; no < 36; ++no) ro[to++] = no;
      for (to = "A".charCodeAt(0), no = 10; no < 36; ++no) ro[to++] = no;
      function io(e) {
        return "0123456789abcdefghijklmnopqrstuvwxyz".charAt(e);
      }
      function oo(e, t) {
        var n = ro[e.charCodeAt(t)];
        return null == n ? -1 : n;
      }
      function so(e) {
        var t = Zi();
        return t.fromInt(e), t;
      }
      function ao(e) {
        var t,
          n = 1;
        return (
          0 != (t = e >>> 16) && ((e = t), (n += 16)),
          0 != (t = e >> 8) && ((e = t), (n += 8)),
          0 != (t = e >> 4) && ((e = t), (n += 4)),
          0 != (t = e >> 2) && ((e = t), (n += 2)),
          0 != (t = e >> 1) && ((e = t), (n += 1)),
          n
        );
      }
      function uo(e) {
        (this.m = e),
          (this.mp = e.invDigit()),
          (this.mpl = 32767 & this.mp),
          (this.mph = this.mp >> 15),
          (this.um = (1 << (e.DB - 15)) - 1),
          (this.mt2 = 2 * e.t);
      }
      (uo.prototype.convert = function(e) {
        var t = Zi();
        return (
          e.abs().dlShiftTo(this.m.t, t),
          t.divRemTo(this.m, null, t),
          e.s < 0 && t.compareTo(Xi.ZERO) > 0 && this.m.subTo(t, t),
          t
        );
      }),
        (uo.prototype.revert = function(e) {
          var t = Zi();
          return e.copyTo(t), this.reduce(t), t;
        }),
        (uo.prototype.reduce = function(e) {
          for (; e.t <= this.mt2; ) e[e.t++] = 0;
          for (var t = 0; t < this.m.t; ++t) {
            var n = 32767 & e[t],
              r =
                (n * this.mpl +
                  (((n * this.mph + (e[t] >> 15) * this.mpl) & this.um) <<
                    15)) &
                e.DM;
            for (
              e[(n = t + this.m.t)] += this.m.am(0, r, e, t, 0, this.m.t);
              e[n] >= e.DV;

            )
              (e[n] -= e.DV), e[++n]++;
          }
          e.clamp(),
            e.drShiftTo(this.m.t, e),
            e.compareTo(this.m) >= 0 && e.subTo(this.m, e);
        }),
        (uo.prototype.mulTo = function(e, t, n) {
          e.multiplyTo(t, n), this.reduce(n);
        }),
        (uo.prototype.sqrTo = function(e, t) {
          e.squareTo(t), this.reduce(t);
        }),
        (Xi.prototype.copyTo = function(e) {
          for (var t = this.t - 1; t >= 0; --t) e[t] = this[t];
          (e.t = this.t), (e.s = this.s);
        }),
        (Xi.prototype.fromInt = function(e) {
          (this.t = 1),
            (this.s = e < 0 ? -1 : 0),
            e > 0
              ? (this[0] = e)
              : e < -1
              ? (this[0] = e + this.DV)
              : (this.t = 0);
        }),
        (Xi.prototype.fromString = function(e, t) {
          var n;
          if (16 == t) n = 4;
          else if (8 == t) n = 3;
          else if (2 == t) n = 1;
          else if (32 == t) n = 5;
          else {
            if (4 != t)
              throw new Error("Only radix 2, 4, 8, 16, 32 are supported");
            n = 2;
          }
          (this.t = 0), (this.s = 0);
          for (var r = e.length, i = !1, o = 0; --r >= 0; ) {
            var s = oo(e, r);
            s < 0
              ? "-" == e.charAt(r) && (i = !0)
              : ((i = !1),
                0 == o
                  ? (this[this.t++] = s)
                  : o + n > this.DB
                  ? ((this[this.t - 1] |=
                      (s & ((1 << (this.DB - o)) - 1)) << o),
                    (this[this.t++] = s >> (this.DB - o)))
                  : (this[this.t - 1] |= s << o),
                (o += n) >= this.DB && (o -= this.DB));
          }
          this.clamp(), i && Xi.ZERO.subTo(this, this);
        }),
        (Xi.prototype.clamp = function() {
          for (var e = this.s & this.DM; this.t > 0 && this[this.t - 1] == e; )
            --this.t;
        }),
        (Xi.prototype.dlShiftTo = function(e, t) {
          var n;
          for (n = this.t - 1; n >= 0; --n) t[n + e] = this[n];
          for (n = e - 1; n >= 0; --n) t[n] = 0;
          (t.t = this.t + e), (t.s = this.s);
        }),
        (Xi.prototype.drShiftTo = function(e, t) {
          for (var n = e; n < this.t; ++n) t[n - e] = this[n];
          (t.t = Math.max(this.t - e, 0)), (t.s = this.s);
        }),
        (Xi.prototype.lShiftTo = function(e, t) {
          var n,
            r = e % this.DB,
            i = this.DB - r,
            o = (1 << i) - 1,
            s = Math.floor(e / this.DB),
            a = (this.s << r) & this.DM;
          for (n = this.t - 1; n >= 0; --n)
            (t[n + s + 1] = (this[n] >> i) | a), (a = (this[n] & o) << r);
          for (n = s - 1; n >= 0; --n) t[n] = 0;
          (t[s] = a), (t.t = this.t + s + 1), (t.s = this.s), t.clamp();
        }),
        (Xi.prototype.rShiftTo = function(e, t) {
          t.s = this.s;
          var n = Math.floor(e / this.DB);
          if (n >= this.t) t.t = 0;
          else {
            var r = e % this.DB,
              i = this.DB - r,
              o = (1 << r) - 1;
            t[0] = this[n] >> r;
            for (var s = n + 1; s < this.t; ++s)
              (t[s - n - 1] |= (this[s] & o) << i), (t[s - n] = this[s] >> r);
            r > 0 && (t[this.t - n - 1] |= (this.s & o) << i),
              (t.t = this.t - n),
              t.clamp();
          }
        }),
        (Xi.prototype.subTo = function(e, t) {
          for (var n = 0, r = 0, i = Math.min(e.t, this.t); n < i; )
            (r += this[n] - e[n]), (t[n++] = r & this.DM), (r >>= this.DB);
          if (e.t < this.t) {
            for (r -= e.s; n < this.t; )
              (r += this[n]), (t[n++] = r & this.DM), (r >>= this.DB);
            r += this.s;
          } else {
            for (r += this.s; n < e.t; )
              (r -= e[n]), (t[n++] = r & this.DM), (r >>= this.DB);
            r -= e.s;
          }
          (t.s = r < 0 ? -1 : 0),
            r < -1 ? (t[n++] = this.DV + r) : r > 0 && (t[n++] = r),
            (t.t = n),
            t.clamp();
        }),
        (Xi.prototype.multiplyTo = function(e, t) {
          var n = this.abs(),
            r = e.abs(),
            i = n.t;
          for (t.t = i + r.t; --i >= 0; ) t[i] = 0;
          for (i = 0; i < r.t; ++i) t[i + n.t] = n.am(0, r[i], t, i, 0, n.t);
          (t.s = 0), t.clamp(), this.s != e.s && Xi.ZERO.subTo(t, t);
        }),
        (Xi.prototype.squareTo = function(e) {
          for (var t = this.abs(), n = (e.t = 2 * t.t); --n >= 0; ) e[n] = 0;
          for (n = 0; n < t.t - 1; ++n) {
            var r = t.am(n, t[n], e, 2 * n, 0, 1);
            (e[n + t.t] += t.am(
              n + 1,
              2 * t[n],
              e,
              2 * n + 1,
              r,
              t.t - n - 1
            )) >= t.DV && ((e[n + t.t] -= t.DV), (e[n + t.t + 1] = 1));
          }
          e.t > 0 && (e[e.t - 1] += t.am(n, t[n], e, 2 * n, 0, 1)),
            (e.s = 0),
            e.clamp();
        }),
        (Xi.prototype.divRemTo = function(e, t, n) {
          var r = e.abs();
          if (!(r.t <= 0)) {
            var i = this.abs();
            if (i.t < r.t)
              return (
                null != t && t.fromInt(0), void (null != n && this.copyTo(n))
              );
            null == n && (n = Zi());
            var o = Zi(),
              s = this.s,
              a = e.s,
              u = this.DB - ao(r[r.t - 1]);
            u > 0
              ? (r.lShiftTo(u, o), i.lShiftTo(u, n))
              : (r.copyTo(o), i.copyTo(n));
            var c = o.t,
              f = o[c - 1];
            if (0 != f) {
              var l = f * (1 << this.F1) + (c > 1 ? o[c - 2] >> this.F2 : 0),
                h = this.FV / l,
                d = (1 << this.F1) / l,
                p = 1 << this.F2,
                g = n.t,
                y = g - c,
                v = null == t ? Zi() : t;
              for (
                o.dlShiftTo(y, v),
                  n.compareTo(v) >= 0 && ((n[n.t++] = 1), n.subTo(v, n)),
                  Xi.ONE.dlShiftTo(c, v),
                  v.subTo(o, o);
                o.t < c;

              )
                o[o.t++] = 0;
              for (; --y >= 0; ) {
                var m =
                  n[--g] == f
                    ? this.DM
                    : Math.floor(n[g] * h + (n[g - 1] + p) * d);
                if ((n[g] += o.am(0, m, n, y, 0, c)) < m)
                  for (o.dlShiftTo(y, v), n.subTo(v, n); n[g] < --m; )
                    n.subTo(v, n);
              }
              null != t && (n.drShiftTo(c, t), s != a && Xi.ZERO.subTo(t, t)),
                (n.t = c),
                n.clamp(),
                u > 0 && n.rShiftTo(u, n),
                s < 0 && Xi.ZERO.subTo(n, n);
            }
          }
        }),
        (Xi.prototype.invDigit = function() {
          if (this.t < 1) return 0;
          var e = this[0];
          if (0 == (1 & e)) return 0;
          var t = 3 & e;
          return (t =
            ((t =
              ((t =
                ((t = (t * (2 - (15 & e) * t)) & 15) * (2 - (255 & e) * t)) &
                255) *
                (2 - (((65535 & e) * t) & 65535))) &
              65535) *
              (2 - ((e * t) % this.DV))) %
            this.DV) > 0
            ? this.DV - t
            : -t;
        }),
        (Xi.prototype.addTo = function(e, t) {
          for (var n = 0, r = 0, i = Math.min(e.t, this.t); n < i; )
            (r += this[n] + e[n]), (t[n++] = r & this.DM), (r >>= this.DB);
          if (e.t < this.t) {
            for (r += e.s; n < this.t; )
              (r += this[n]), (t[n++] = r & this.DM), (r >>= this.DB);
            r += this.s;
          } else {
            for (r += this.s; n < e.t; )
              (r += e[n]), (t[n++] = r & this.DM), (r >>= this.DB);
            r += e.s;
          }
          (t.s = r < 0 ? -1 : 0),
            r > 0 ? (t[n++] = r) : r < -1 && (t[n++] = this.DV + r),
            (t.t = n),
            t.clamp();
        }),
        (Xi.prototype.toString = function(e) {
          if (this.s < 0) return "-" + this.negate().toString(e);
          var t;
          if (16 == e) t = 4;
          else if (8 == e) t = 3;
          else if (2 == e) t = 1;
          else if (32 == e) t = 5;
          else {
            if (4 != e)
              throw new Error("Only radix 2, 4, 8, 16, 32 are supported");
            t = 2;
          }
          var n,
            r = (1 << t) - 1,
            i = !1,
            o = "",
            s = this.t,
            a = this.DB - ((s * this.DB) % t);
          if (s-- > 0)
            for (
              a < this.DB && (n = this[s] >> a) > 0 && ((i = !0), (o = io(n)));
              s >= 0;

            )
              a < t
                ? ((n = (this[s] & ((1 << a) - 1)) << (t - a)),
                  (n |= this[--s] >> (a += this.DB - t)))
                : ((n = (this[s] >> (a -= t)) & r),
                  a <= 0 && ((a += this.DB), --s)),
                n > 0 && (i = !0),
                i && (o += io(n));
          return i ? o : "0";
        }),
        (Xi.prototype.negate = function() {
          var e = Zi();
          return Xi.ZERO.subTo(this, e), e;
        }),
        (Xi.prototype.abs = function() {
          return this.s < 0 ? this.negate() : this;
        }),
        (Xi.prototype.compareTo = function(e) {
          var t = this.s - e.s;
          if (0 != t) return t;
          var n = this.t;
          if (0 != (t = n - e.t)) return this.s < 0 ? -t : t;
          for (; --n >= 0; ) if (0 != (t = this[n] - e[n])) return t;
          return 0;
        }),
        (Xi.prototype.bitLength = function() {
          return this.t <= 0
            ? 0
            : this.DB * (this.t - 1) +
                ao(this[this.t - 1] ^ (this.s & this.DM));
        }),
        (Xi.prototype.mod = function(e) {
          var t = Zi();
          return (
            this.abs().divRemTo(e, null, t),
            this.s < 0 && t.compareTo(Xi.ZERO) > 0 && e.subTo(t, t),
            t
          );
        }),
        (Xi.prototype.equals = function(e) {
          return 0 == this.compareTo(e);
        }),
        (Xi.prototype.add = function(e) {
          var t = Zi();
          return this.addTo(e, t), t;
        }),
        (Xi.prototype.subtract = function(e) {
          var t = Zi();
          return this.subTo(e, t), t;
        }),
        (Xi.prototype.multiply = function(e) {
          var t = Zi();
          return this.multiplyTo(e, t), t;
        }),
        (Xi.prototype.divide = function(e) {
          var t = Zi();
          return this.divRemTo(e, t, null), t;
        }),
        (Xi.prototype.modPow = function(e, t, n) {
          var r,
            i = e.bitLength(),
            o = so(1),
            s = new uo(t);
          if (i <= 0) return o;
          r = i < 18 ? 1 : i < 48 ? 3 : i < 144 ? 4 : i < 768 ? 5 : 6;
          var a = new Array(),
            u = 3,
            c = r - 1,
            f = (1 << r) - 1;
          if (((a[1] = s.convert(this)), r > 1)) {
            var l = Zi();
            for (s.sqrTo(a[1], l); u <= f; )
              (a[u] = Zi()), s.mulTo(l, a[u - 2], a[u]), (u += 2);
          }
          var h,
            d,
            p = e.t - 1,
            g = !0,
            y = Zi();
          for (i = ao(e[p]) - 1; p >= 0; ) {
            for (
              i >= c
                ? (h = (e[p] >> (i - c)) & f)
                : ((h = (e[p] & ((1 << (i + 1)) - 1)) << (c - i)),
                  p > 0 && (h |= e[p - 1] >> (this.DB + i - c))),
                u = r;
              0 == (1 & h);

            )
              (h >>= 1), --u;
            if (((i -= u) < 0 && ((i += this.DB), --p), g))
              a[h].copyTo(o), (g = !1);
            else {
              for (; u > 1; ) s.sqrTo(o, y), s.sqrTo(y, o), (u -= 2);
              u > 0 ? s.sqrTo(o, y) : ((d = o), (o = y), (y = d)),
                s.mulTo(y, a[h], o);
            }
            for (; p >= 0 && 0 == (e[p] & (1 << i)); )
              s.sqrTo(o, y),
                (d = o),
                (o = y),
                (y = d),
                --i < 0 && ((i = this.DB - 1), --p);
          }
          var v = s.revert(o);
          return n(null, v), v;
        }),
        (Xi.ZERO = so(0)),
        (Xi.ONE = so(1));
      /*!
       * Copyright 2016 Amazon.com,
       * Inc. or its affiliates. All Rights Reserved.
       *
       * Licensed under the Amazon Software License (the "License").
       * You may not use this file except in compliance with the
       * License. A copy of the License is located at
       *
       *     http://aws.amazon.com/asl/
       *
       * or in the "license" file accompanying this file. This file is
       * distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
       * CONDITIONS OF ANY KIND, express or implied. See the License
       * for the specific language governing permissions and
       * limitations under the License.
       */
      var co = function(e) {
          return Ki.Buffer.from(Hi.a.lib.WordArray.random(e).toString(), "hex");
        },
        fo = (function() {
          function e(e) {
            (this.N = new $i(
              "FFFFFFFFFFFFFFFFC90FDAA22168C234C4C6628B80DC1CD129024E088A67CC74020BBEA63B139B22514A08798E3404DDEF9519B3CD3A431B302B0A6DF25F14374FE1356D6D51C245E485B576625E7EC6F44C42E9A637ED6B0BFF5CB6F406B7EDEE386BFB5A899FA5AE9F24117C4B1FE649286651ECE45B3DC2007CB8A163BF0598DA48361C55D39A69163FA8FD24CF5F83655D23DCA3AD961C62F356208552BB9ED529077096966D670C354E4ABC9804F1746C08CA18217C32905E462E36CE3BE39E772C180E86039B2783A2EC07A28FB5C55DF06F4C52C9DE2BCBF6955817183995497CEA956AE515D2261898FA051015728E5A8AAAC42DAD33170D04507A33A85521ABDF1CBA64ECFB850458DBEF0A8AEA71575D060C7DB3970F85A6E1E4C7ABF5AE8CDB0933D71E8C94E04A25619DCEE3D2261AD2EE6BF12FFA06D98A0864D87602733EC86A64521F2B18177B200CBBE117577A615D6C770988C0BAD946E208E24FA074E5AB3143DB5BFCE0FD108E4B82D120A93AD2CAFFFFFFFFFFFFFFFF",
              16
            )),
              (this.g = new $i("2", 16)),
              (this.k = new $i(
                this.hexHash(
                  "00" + this.N.toString(16) + "0" + this.g.toString(16)
                ),
                16
              )),
              (this.smallAValue = this.generateRandomSmallA()),
              this.getLargeAValue(function() {}),
              (this.infoBits = Ki.Buffer.from("Caldera Derived Key", "utf8")),
              (this.poolName = e);
          }
          var t = e.prototype;
          return (
            (t.getSmallAValue = function() {
              return this.smallAValue;
            }),
            (t.getLargeAValue = function(e) {
              var t = this;
              this.largeAValue
                ? e(null, this.largeAValue)
                : this.calculateA(this.smallAValue, function(n, r) {
                    n && e(n, null),
                      (t.largeAValue = r),
                      e(null, t.largeAValue);
                  });
            }),
            (t.generateRandomSmallA = function() {
              var e = co(128).toString("hex");
              return new $i(e, 16).mod(this.N);
            }),
            (t.generateRandomString = function() {
              return co(40).toString("base64");
            }),
            (t.getRandomPassword = function() {
              return this.randomPassword;
            }),
            (t.getSaltDevices = function() {
              return this.SaltToHashDevices;
            }),
            (t.getVerifierDevices = function() {
              return this.verifierDevices;
            }),
            (t.generateHashDevice = function(e, t, n) {
              var r = this;
              this.randomPassword = this.generateRandomString();
              var i = "" + e + t + ":" + this.randomPassword,
                o = this.hash(i),
                s = co(16).toString("hex");
              (this.SaltToHashDevices = this.padHex(new $i(s, 16))),
                this.g.modPow(
                  new $i(this.hexHash(this.SaltToHashDevices + o), 16),
                  this.N,
                  function(e, t) {
                    e && n(e, null),
                      (r.verifierDevices = r.padHex(t)),
                      n(null, null);
                  }
                );
            }),
            (t.calculateA = function(e, t) {
              var n = this;
              this.g.modPow(e, this.N, function(e, r) {
                e && t(e, null),
                  r.mod(n.N).equals($i.ZERO) &&
                    t(
                      new Error("Illegal paramater. A mod N cannot be 0."),
                      null
                    ),
                  t(null, r);
              });
            }),
            (t.calculateU = function(e, t) {
              return (
                (this.UHexHash = this.hexHash(this.padHex(e) + this.padHex(t))),
                new $i(this.UHexHash, 16)
              );
            }),
            (t.hash = function(e) {
              var t = e instanceof Ki.Buffer ? Hi.a.lib.WordArray.create(e) : e,
                n = Yi()(t).toString();
              return new Array(64 - n.length).join("0") + n;
            }),
            (t.hexHash = function(e) {
              return this.hash(Ki.Buffer.from(e, "hex"));
            }),
            (t.computehkdf = function(e, t) {
              var n = Hi.a.lib.WordArray.create(
                  Ki.Buffer.concat([
                    this.infoBits,
                    Ki.Buffer.from(String.fromCharCode(1), "utf8")
                  ])
                ),
                r = e instanceof Ki.Buffer ? Hi.a.lib.WordArray.create(e) : e,
                i = t instanceof Ki.Buffer ? Hi.a.lib.WordArray.create(t) : t,
                o = Qi()(r, i),
                s = Qi()(n, o);
              return Ki.Buffer.from(s.toString(), "hex").slice(0, 16);
            }),
            (t.getPasswordAuthenticationKey = function(e, t, n, r, i) {
              var o = this;
              if (n.mod(this.N).equals($i.ZERO))
                throw new Error("B cannot be zero.");
              if (
                ((this.UValue = this.calculateU(this.largeAValue, n)),
                this.UValue.equals($i.ZERO))
              )
                throw new Error("U cannot be zero.");
              var s = "" + this.poolName + e + ":" + t,
                a = this.hash(s),
                u = new $i(this.hexHash(this.padHex(r) + a), 16);
              this.calculateS(u, n, function(e, t) {
                e && i(e, null);
                var n = o.computehkdf(
                  Ki.Buffer.from(o.padHex(t), "hex"),
                  Ki.Buffer.from(o.padHex(o.UValue.toString(16)), "hex")
                );
                i(null, n);
              });
            }),
            (t.calculateS = function(e, t, n) {
              var r = this;
              this.g.modPow(e, this.N, function(i, o) {
                i && n(i, null),
                  t
                    .subtract(r.k.multiply(o))
                    .modPow(
                      r.smallAValue.add(r.UValue.multiply(e)),
                      r.N,
                      function(e, t) {
                        e && n(e, null), n(null, t.mod(r.N));
                      }
                    );
              });
            }),
            (t.getNewPasswordRequiredChallengeUserAttributePrefix = function() {
              return "userAttributes.";
            }),
            (t.padHex = function(e) {
              var t = e.toString(16);
              return (
                t.length % 2 == 1
                  ? (t = "0" + t)
                  : -1 !== "89ABCDEFabcdef".indexOf(t[0]) && (t = "00" + t),
                t
              );
            }),
            e
          );
        })(),
        lo = (function() {
          function e(e) {
            (this.jwtToken = e || ""), (this.payload = this.decodePayload());
          }
          var t = e.prototype;
          return (
            (t.getJwtToken = function() {
              return this.jwtToken;
            }),
            (t.getExpiration = function() {
              return this.payload.exp;
            }),
            (t.getIssuedAt = function() {
              return this.payload.iat;
            }),
            (t.decodePayload = function() {
              var e = this.jwtToken.split(".")[1];
              try {
                return JSON.parse(Ki.Buffer.from(e, "base64").toString("utf8"));
              } catch (e) {
                return {};
              }
            }),
            e
          );
        })();
      var ho = (function(e) {
        var t, n;
        function r(t) {
          var n = (void 0 === t ? {} : t).AccessToken;
          return e.call(this, n || "") || this;
        }
        return (
          (n = e),
          ((t = r).prototype = Object.create(n.prototype)),
          (t.prototype.constructor = t),
          (t.__proto__ = n),
          r
        );
      })(lo);
      /*!
       * Copyright 2016 Amazon.com,
       * Inc. or its affiliates. All Rights Reserved.
       *
       * Licensed under the Amazon Software License (the "License").
       * You may not use this file except in compliance with the
       * License. A copy of the License is located at
       *
       *     http://aws.amazon.com/asl/
       *
       * or in the "license" file accompanying this file. This file is
       * distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
       * CONDITIONS OF ANY KIND, express or implied. See the License
       * for the specific language governing permissions and
       * limitations under the License.
       */
      var po = (function(e) {
          var t, n;
          function r(t) {
            var n = (void 0 === t ? {} : t).IdToken;
            return e.call(this, n || "") || this;
          }
          return (
            (n = e),
            ((t = r).prototype = Object.create(n.prototype)),
            (t.prototype.constructor = t),
            (t.__proto__ = n),
            r
          );
        })(lo),
        go = (function() {
          function e(e) {
            var t = (void 0 === e ? {} : e).RefreshToken;
            this.token = t || "";
          }
          return (
            (e.prototype.getToken = function() {
              return this.token;
            }),
            e
          );
        })(),
        yo = n(12),
        vo = n.n(yo),
        mo = (function() {
          function e(e) {
            var t = void 0 === e ? {} : e,
              n = t.IdToken,
              r = t.RefreshToken,
              i = t.AccessToken,
              o = t.ClockDrift;
            if (null == i || null == n)
              throw new Error("Id token and Access Token must be present.");
            (this.idToken = n),
              (this.refreshToken = r),
              (this.accessToken = i),
              (this.clockDrift = void 0 === o ? this.calculateClockDrift() : o);
          }
          var t = e.prototype;
          return (
            (t.getIdToken = function() {
              return this.idToken;
            }),
            (t.getRefreshToken = function() {
              return this.refreshToken;
            }),
            (t.getAccessToken = function() {
              return this.accessToken;
            }),
            (t.getClockDrift = function() {
              return this.clockDrift;
            }),
            (t.calculateClockDrift = function() {
              return (
                Math.floor(new Date() / 1e3) -
                Math.min(
                  this.accessToken.getIssuedAt(),
                  this.idToken.getIssuedAt()
                )
              );
            }),
            (t.isValid = function() {
              var e = Math.floor(new Date() / 1e3) - this.clockDrift;
              return (
                e < this.accessToken.getExpiration() &&
                e < this.idToken.getExpiration()
              );
            }),
            e
          );
        })(),
        bo = [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec"
        ],
        wo = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        _o = (function() {
          function e() {}
          return (
            (e.prototype.getNowString = function() {
              var e = new Date(),
                t = wo[e.getUTCDay()],
                n = bo[e.getUTCMonth()],
                r = e.getUTCDate(),
                i = e.getUTCHours();
              i < 10 && (i = "0" + i);
              var o = e.getUTCMinutes();
              o < 10 && (o = "0" + o);
              var s = e.getUTCSeconds();
              return (
                s < 10 && (s = "0" + s),
                t +
                  " " +
                  n +
                  " " +
                  r +
                  " " +
                  i +
                  ":" +
                  o +
                  ":" +
                  s +
                  " UTC " +
                  e.getUTCFullYear()
              );
            }),
            e
          );
        })(),
        So = (function() {
          function e(e) {
            var t = void 0 === e ? {} : e,
              n = t.Name,
              r = t.Value;
            (this.Name = n || ""), (this.Value = r || "");
          }
          var t = e.prototype;
          return (
            (t.getValue = function() {
              return this.Value;
            }),
            (t.setValue = function(e) {
              return (this.Value = e), this;
            }),
            (t.getName = function() {
              return this.Name;
            }),
            (t.setName = function(e) {
              return (this.Name = e), this;
            }),
            (t.toString = function() {
              return JSON.stringify(this);
            }),
            (t.toJSON = function() {
              return { Name: this.Name, Value: this.Value };
            }),
            e
          );
        })(),
        Eo = {},
        Ao = (function() {
          function e() {}
          return (
            (e.setItem = function(e, t) {
              return (Eo[e] = t), Eo[e];
            }),
            (e.getItem = function(e) {
              return Object.prototype.hasOwnProperty.call(Eo, e)
                ? Eo[e]
                : void 0;
            }),
            (e.removeItem = function(e) {
              return delete Eo[e];
            }),
            (e.clear = function() {
              return (Eo = {});
            }),
            e
          );
        })(),
        Io = (function() {
          function e() {
            try {
              (this.storageWindow = window.localStorage),
                this.storageWindow.setItem("aws.cognito.test-ls", 1),
                this.storageWindow.removeItem("aws.cognito.test-ls");
            } catch (e) {
              this.storageWindow = Ao;
            }
          }
          return (
            (e.prototype.getStorage = function() {
              return this.storageWindow;
            }),
            e
          );
        })(),
        To = "undefined" != typeof navigator ? navigator.userAgent : "nodejs",
        Co = (function() {
          function e(e) {
            if (null == e || null == e.Username || null == e.Pool)
              throw new Error("Username and pool information are required.");
            (this.username = e.Username || ""),
              (this.pool = e.Pool),
              (this.Session = null),
              (this.client = e.Pool.client),
              (this.signInUserSession = null),
              (this.authenticationFlowType = "USER_SRP_AUTH"),
              (this.storage = e.Storage || new Io().getStorage()),
              (this.keyPrefix =
                "CognitoIdentityServiceProvider." + this.pool.getClientId()),
              (this.userDataKey =
                this.keyPrefix + "." + this.username + ".userData");
          }
          var t = e.prototype;
          return (
            (t.setSignInUserSession = function(e) {
              this.clearCachedUserData(),
                (this.signInUserSession = e),
                this.cacheTokens();
            }),
            (t.getSignInUserSession = function() {
              return this.signInUserSession;
            }),
            (t.getUsername = function() {
              return this.username;
            }),
            (t.getAuthenticationFlowType = function() {
              return this.authenticationFlowType;
            }),
            (t.setAuthenticationFlowType = function(e) {
              this.authenticationFlowType = e;
            }),
            (t.initiateAuth = function(e, t) {
              var n = this,
                r = e.getAuthParameters();
              r.USERNAME = this.username;
              var i =
                  0 !== Object.keys(e.getValidationData()).length
                    ? e.getValidationData()
                    : e.getClientMetadata(),
                o = {
                  AuthFlow: "CUSTOM_AUTH",
                  ClientId: this.pool.getClientId(),
                  AuthParameters: r,
                  ClientMetadata: i
                };
              this.getUserContextData() &&
                (o.UserContextData = this.getUserContextData()),
                this.client.request("InitiateAuth", o, function(e, r) {
                  if (e) return t.onFailure(e);
                  var i = r.ChallengeName,
                    o = r.ChallengeParameters;
                  return "CUSTOM_CHALLENGE" === i
                    ? ((n.Session = r.Session), t.customChallenge(o))
                    : ((n.signInUserSession = n.getCognitoUserSession(
                        r.AuthenticationResult
                      )),
                      n.cacheTokens(),
                      t.onSuccess(n.signInUserSession));
                });
            }),
            (t.authenticateUser = function(e, t) {
              return "USER_PASSWORD_AUTH" === this.authenticationFlowType
                ? this.authenticateUserPlainUsernamePassword(e, t)
                : "USER_SRP_AUTH" === this.authenticationFlowType ||
                  "CUSTOM_AUTH" === this.authenticationFlowType
                ? this.authenticateUserDefaultAuth(e, t)
                : t.onFailure(
                    new Error("Authentication flow type is invalid.")
                  );
            }),
            (t.authenticateUserDefaultAuth = function(e, t) {
              var n,
                r,
                i = this,
                o = new fo(this.pool.getUserPoolId().split("_")[1]),
                s = new _o(),
                a = {};
              null != this.deviceKey && (a.DEVICE_KEY = this.deviceKey),
                (a.USERNAME = this.username),
                o.getLargeAValue(function(u, c) {
                  u && t.onFailure(u),
                    (a.SRP_A = c.toString(16)),
                    "CUSTOM_AUTH" === i.authenticationFlowType &&
                      (a.CHALLENGE_NAME = "SRP_A");
                  var f =
                      0 !== Object.keys(e.getValidationData()).length
                        ? e.getValidationData()
                        : e.getClientMetadata(),
                    l = {
                      AuthFlow: i.authenticationFlowType,
                      ClientId: i.pool.getClientId(),
                      AuthParameters: a,
                      ClientMetadata: f
                    };
                  i.getUserContextData(i.username) &&
                    (l.UserContextData = i.getUserContextData(i.username)),
                    i.client.request("InitiateAuth", l, function(a, u) {
                      if (a) return t.onFailure(a);
                      var c = u.ChallengeParameters;
                      (i.username = c.USER_ID_FOR_SRP),
                        (n = new $i(c.SRP_B, 16)),
                        (r = new $i(c.SALT, 16)),
                        i.getCachedDeviceKeyAndPassword(),
                        o.getPasswordAuthenticationKey(
                          i.username,
                          e.getPassword(),
                          n,
                          r,
                          function(e, n) {
                            e && t.onFailure(e);
                            var r = s.getNowString(),
                              a = Hi.a.lib.WordArray.create(
                                Ki.Buffer.concat([
                                  Ki.Buffer.from(
                                    i.pool.getUserPoolId().split("_")[1],
                                    "utf8"
                                  ),
                                  Ki.Buffer.from(i.username, "utf8"),
                                  Ki.Buffer.from(c.SECRET_BLOCK, "base64"),
                                  Ki.Buffer.from(r, "utf8")
                                ])
                              ),
                              l = Hi.a.lib.WordArray.create(n),
                              h = vo.a.stringify(Qi()(a, l)),
                              d = {};
                            (d.USERNAME = i.username),
                              (d.PASSWORD_CLAIM_SECRET_BLOCK = c.SECRET_BLOCK),
                              (d.TIMESTAMP = r),
                              (d.PASSWORD_CLAIM_SIGNATURE = h),
                              null != i.deviceKey &&
                                (d.DEVICE_KEY = i.deviceKey);
                            var p = {
                              ChallengeName: "PASSWORD_VERIFIER",
                              ClientId: i.pool.getClientId(),
                              ChallengeResponses: d,
                              Session: u.Session,
                              ClientMetadata: f
                            };
                            i.getUserContextData() &&
                              (p.UserContextData = i.getUserContextData()),
                              (function e(t, n) {
                                return i.client.request(
                                  "RespondToAuthChallenge",
                                  t,
                                  function(r, o) {
                                    return r &&
                                      "ResourceNotFoundException" === r.code &&
                                      -1 !==
                                        r.message
                                          .toLowerCase()
                                          .indexOf("device")
                                      ? ((d.DEVICE_KEY = null),
                                        (i.deviceKey = null),
                                        (i.randomPassword = null),
                                        (i.deviceGroupKey = null),
                                        i.clearCachedDeviceKeyAndPassword(),
                                        e(t, n))
                                      : n(r, o);
                                  }
                                );
                              })(p, function(e, n) {
                                return e
                                  ? t.onFailure(e)
                                  : i.authenticateUserInternal(n, o, t);
                              });
                          }
                        );
                    });
                });
            }),
            (t.authenticateUserPlainUsernamePassword = function(e, t) {
              var n = this,
                r = {};
              if (
                ((r.USERNAME = this.username),
                (r.PASSWORD = e.getPassword()),
                r.PASSWORD)
              ) {
                var i = new fo(this.pool.getUserPoolId().split("_")[1]);
                this.getCachedDeviceKeyAndPassword(),
                  null != this.deviceKey && (r.DEVICE_KEY = this.deviceKey);
                var o =
                    0 !== Object.keys(e.getValidationData()).length
                      ? e.getValidationData()
                      : e.getClientMetadata(),
                  s = {
                    AuthFlow: "USER_PASSWORD_AUTH",
                    ClientId: this.pool.getClientId(),
                    AuthParameters: r,
                    ClientMetadata: o
                  };
                this.getUserContextData(this.username) &&
                  (s.UserContextData = this.getUserContextData(this.username)),
                  this.client.request("InitiateAuth", s, function(e, r) {
                    return e
                      ? t.onFailure(e)
                      : n.authenticateUserInternal(r, i, t);
                  });
              } else t.onFailure(new Error("PASSWORD parameter is required"));
            }),
            (t.authenticateUserInternal = function(e, t, n) {
              var r = this,
                i = e.ChallengeName,
                o = e.ChallengeParameters;
              if ("SMS_MFA" === i)
                return (this.Session = e.Session), n.mfaRequired(i, o);
              if ("SELECT_MFA_TYPE" === i)
                return (this.Session = e.Session), n.selectMFAType(i, o);
              if ("MFA_SETUP" === i)
                return (this.Session = e.Session), n.mfaSetup(i, o);
              if ("SOFTWARE_TOKEN_MFA" === i)
                return (this.Session = e.Session), n.totpRequired(i, o);
              if ("CUSTOM_CHALLENGE" === i)
                return (this.Session = e.Session), n.customChallenge(o);
              if ("NEW_PASSWORD_REQUIRED" === i) {
                this.Session = e.Session;
                var s = null,
                  a = null,
                  u = [],
                  c = t.getNewPasswordRequiredChallengeUserAttributePrefix();
                if (
                  (o &&
                    ((s = JSON.parse(e.ChallengeParameters.userAttributes)),
                    (a = JSON.parse(e.ChallengeParameters.requiredAttributes))),
                  a)
                )
                  for (var f = 0; f < a.length; f++)
                    u[f] = a[f].substr(c.length);
                return n.newPasswordRequired(s, u);
              }
              if ("DEVICE_SRP_AUTH" !== i) {
                (this.signInUserSession = this.getCognitoUserSession(
                  e.AuthenticationResult
                )),
                  (this.challengeName = i),
                  this.cacheTokens();
                var l = e.AuthenticationResult.NewDeviceMetadata;
                if (null == l) return n.onSuccess(this.signInUserSession);
                t.generateHashDevice(
                  e.AuthenticationResult.NewDeviceMetadata.DeviceGroupKey,
                  e.AuthenticationResult.NewDeviceMetadata.DeviceKey,
                  function(i) {
                    if (i) return n.onFailure(i);
                    var o = {
                      Salt: Ki.Buffer.from(t.getSaltDevices(), "hex").toString(
                        "base64"
                      ),
                      PasswordVerifier: Ki.Buffer.from(
                        t.getVerifierDevices(),
                        "hex"
                      ).toString("base64")
                    };
                    (r.verifierDevices = o.PasswordVerifier),
                      (r.deviceGroupKey = l.DeviceGroupKey),
                      (r.randomPassword = t.getRandomPassword()),
                      r.client.request(
                        "ConfirmDevice",
                        {
                          DeviceKey: l.DeviceKey,
                          AccessToken: r.signInUserSession
                            .getAccessToken()
                            .getJwtToken(),
                          DeviceSecretVerifierConfig: o,
                          DeviceName: To
                        },
                        function(t, i) {
                          return t
                            ? n.onFailure(t)
                            : ((r.deviceKey =
                                e.AuthenticationResult.NewDeviceMetadata.DeviceKey),
                              r.cacheDeviceKeyAndPassword(),
                              !0 === i.UserConfirmationNecessary
                                ? n.onSuccess(
                                    r.signInUserSession,
                                    i.UserConfirmationNecessary
                                  )
                                : n.onSuccess(r.signInUserSession));
                        }
                      );
                  }
                );
              } else this.getDeviceResponse(n);
            }),
            (t.completeNewPasswordChallenge = function(e, t, n, r) {
              var i = this;
              if (!e)
                return n.onFailure(new Error("New password is required."));
              var o = new fo(this.pool.getUserPoolId().split("_")[1]),
                s = o.getNewPasswordRequiredChallengeUserAttributePrefix(),
                a = {};
              t &&
                Object.keys(t).forEach(function(e) {
                  a[s + e] = t[e];
                }),
                (a.NEW_PASSWORD = e),
                (a.USERNAME = this.username);
              var u = {
                ChallengeName: "NEW_PASSWORD_REQUIRED",
                ClientId: this.pool.getClientId(),
                ChallengeResponses: a,
                Session: this.Session,
                ClientMetadata: r
              };
              this.getUserContextData() &&
                (u.UserContextData = this.getUserContextData()),
                this.client.request("RespondToAuthChallenge", u, function(
                  e,
                  t
                ) {
                  return e
                    ? n.onFailure(e)
                    : i.authenticateUserInternal(t, o, n);
                });
            }),
            (t.getDeviceResponse = function(e, t) {
              var n = this,
                r = new fo(this.deviceGroupKey),
                i = new _o(),
                o = {};
              (o.USERNAME = this.username),
                (o.DEVICE_KEY = this.deviceKey),
                r.getLargeAValue(function(s, a) {
                  s && e.onFailure(s), (o.SRP_A = a.toString(16));
                  var u = {
                    ChallengeName: "DEVICE_SRP_AUTH",
                    ClientId: n.pool.getClientId(),
                    ChallengeResponses: o,
                    ClientMetadata: t
                  };
                  n.getUserContextData() &&
                    (u.UserContextData = n.getUserContextData()),
                    n.client.request("RespondToAuthChallenge", u, function(
                      t,
                      o
                    ) {
                      if (t) return e.onFailure(t);
                      var s = o.ChallengeParameters,
                        a = new $i(s.SRP_B, 16),
                        u = new $i(s.SALT, 16);
                      r.getPasswordAuthenticationKey(
                        n.deviceKey,
                        n.randomPassword,
                        a,
                        u,
                        function(t, r) {
                          if (t) return e.onFailure(t);
                          var a = i.getNowString(),
                            u = Hi.a.lib.WordArray.create(
                              Ki.Buffer.concat([
                                Ki.Buffer.from(n.deviceGroupKey, "utf8"),
                                Ki.Buffer.from(n.deviceKey, "utf8"),
                                Ki.Buffer.from(s.SECRET_BLOCK, "base64"),
                                Ki.Buffer.from(a, "utf8")
                              ])
                            ),
                            c = Hi.a.lib.WordArray.create(r),
                            f = vo.a.stringify(Qi()(u, c)),
                            l = {};
                          (l.USERNAME = n.username),
                            (l.PASSWORD_CLAIM_SECRET_BLOCK = s.SECRET_BLOCK),
                            (l.TIMESTAMP = a),
                            (l.PASSWORD_CLAIM_SIGNATURE = f),
                            (l.DEVICE_KEY = n.deviceKey);
                          var h = {
                            ChallengeName: "DEVICE_PASSWORD_VERIFIER",
                            ClientId: n.pool.getClientId(),
                            ChallengeResponses: l,
                            Session: o.Session
                          };
                          n.getUserContextData() &&
                            (h.UserContextData = n.getUserContextData()),
                            n.client.request(
                              "RespondToAuthChallenge",
                              h,
                              function(t, r) {
                                return t
                                  ? e.onFailure(t)
                                  : ((n.signInUserSession = n.getCognitoUserSession(
                                      r.AuthenticationResult
                                    )),
                                    n.cacheTokens(),
                                    e.onSuccess(n.signInUserSession));
                              }
                            );
                        }
                      );
                    });
                });
            }),
            (t.confirmRegistration = function(e, t, n, r) {
              var i = {
                ClientId: this.pool.getClientId(),
                ConfirmationCode: e,
                Username: this.username,
                ForceAliasCreation: t,
                ClientMetadata: r
              };
              this.getUserContextData() &&
                (i.UserContextData = this.getUserContextData()),
                this.client.request("ConfirmSignUp", i, function(e) {
                  return e ? n(e, null) : n(null, "SUCCESS");
                });
            }),
            (t.sendCustomChallengeAnswer = function(e, t, n) {
              var r = this,
                i = {};
              (i.USERNAME = this.username), (i.ANSWER = e);
              var o = new fo(this.pool.getUserPoolId().split("_")[1]);
              this.getCachedDeviceKeyAndPassword(),
                null != this.deviceKey && (i.DEVICE_KEY = this.deviceKey);
              var s = {
                ChallengeName: "CUSTOM_CHALLENGE",
                ChallengeResponses: i,
                ClientId: this.pool.getClientId(),
                Session: this.Session,
                ClientMetadata: n
              };
              this.getUserContextData() &&
                (s.UserContextData = this.getUserContextData()),
                this.client.request("RespondToAuthChallenge", s, function(
                  e,
                  n
                ) {
                  return e
                    ? t.onFailure(e)
                    : r.authenticateUserInternal(n, o, t);
                });
            }),
            (t.sendMFACode = function(e, t, n, r) {
              var i = this,
                o = {};
              (o.USERNAME = this.username), (o.SMS_MFA_CODE = e);
              var s = n || "SMS_MFA";
              "SOFTWARE_TOKEN_MFA" === s && (o.SOFTWARE_TOKEN_MFA_CODE = e),
                null != this.deviceKey && (o.DEVICE_KEY = this.deviceKey);
              var a = {
                ChallengeName: s,
                ChallengeResponses: o,
                ClientId: this.pool.getClientId(),
                Session: this.Session,
                ClientMetadata: r
              };
              this.getUserContextData() &&
                (a.UserContextData = this.getUserContextData()),
                this.client.request("RespondToAuthChallenge", a, function(
                  e,
                  n
                ) {
                  if (e) return t.onFailure(e);
                  if ("DEVICE_SRP_AUTH" !== n.ChallengeName) {
                    if (
                      ((i.signInUserSession = i.getCognitoUserSession(
                        n.AuthenticationResult
                      )),
                      i.cacheTokens(),
                      null == n.AuthenticationResult.NewDeviceMetadata)
                    )
                      return t.onSuccess(i.signInUserSession);
                    var r = new fo(i.pool.getUserPoolId().split("_")[1]);
                    r.generateHashDevice(
                      n.AuthenticationResult.NewDeviceMetadata.DeviceGroupKey,
                      n.AuthenticationResult.NewDeviceMetadata.DeviceKey,
                      function(e) {
                        if (e) return t.onFailure(e);
                        var o = {
                          Salt: Ki.Buffer.from(
                            r.getSaltDevices(),
                            "hex"
                          ).toString("base64"),
                          PasswordVerifier: Ki.Buffer.from(
                            r.getVerifierDevices(),
                            "hex"
                          ).toString("base64")
                        };
                        (i.verifierDevices = o.PasswordVerifier),
                          (i.deviceGroupKey =
                            n.AuthenticationResult.NewDeviceMetadata.DeviceGroupKey),
                          (i.randomPassword = r.getRandomPassword()),
                          i.client.request(
                            "ConfirmDevice",
                            {
                              DeviceKey:
                                n.AuthenticationResult.NewDeviceMetadata
                                  .DeviceKey,
                              AccessToken: i.signInUserSession
                                .getAccessToken()
                                .getJwtToken(),
                              DeviceSecretVerifierConfig: o,
                              DeviceName: To
                            },
                            function(e, r) {
                              return e
                                ? t.onFailure(e)
                                : ((i.deviceKey =
                                    n.AuthenticationResult.NewDeviceMetadata.DeviceKey),
                                  i.cacheDeviceKeyAndPassword(),
                                  !0 === r.UserConfirmationNecessary
                                    ? t.onSuccess(
                                        i.signInUserSession,
                                        r.UserConfirmationNecessary
                                      )
                                    : t.onSuccess(i.signInUserSession));
                            }
                          );
                      }
                    );
                  } else i.getDeviceResponse(t);
                });
            }),
            (t.changePassword = function(e, t, n, r) {
              if (
                null == this.signInUserSession ||
                !this.signInUserSession.isValid()
              )
                return n(new Error("User is not authenticated"), null);
              this.client.request(
                "ChangePassword",
                {
                  PreviousPassword: e,
                  ProposedPassword: t,
                  AccessToken: this.signInUserSession
                    .getAccessToken()
                    .getJwtToken(),
                  ClientMetadata: r
                },
                function(e) {
                  return e ? n(e, null) : n(null, "SUCCESS");
                }
              );
            }),
            (t.enableMFA = function(e) {
              if (
                null == this.signInUserSession ||
                !this.signInUserSession.isValid()
              )
                return e(new Error("User is not authenticated"), null);
              var t = [];
              t.push({ DeliveryMedium: "SMS", AttributeName: "phone_number" }),
                this.client.request(
                  "SetUserSettings",
                  {
                    MFAOptions: t,
                    AccessToken: this.signInUserSession
                      .getAccessToken()
                      .getJwtToken()
                  },
                  function(t) {
                    return t ? e(t, null) : e(null, "SUCCESS");
                  }
                );
            }),
            (t.setUserMfaPreference = function(e, t, n) {
              if (
                null == this.signInUserSession ||
                !this.signInUserSession.isValid()
              )
                return n(new Error("User is not authenticated"), null);
              this.client.request(
                "SetUserMFAPreference",
                {
                  SMSMfaSettings: e,
                  SoftwareTokenMfaSettings: t,
                  AccessToken: this.signInUserSession
                    .getAccessToken()
                    .getJwtToken()
                },
                function(e) {
                  return e ? n(e, null) : n(null, "SUCCESS");
                }
              );
            }),
            (t.disableMFA = function(e) {
              if (
                null == this.signInUserSession ||
                !this.signInUserSession.isValid()
              )
                return e(new Error("User is not authenticated"), null);
              this.client.request(
                "SetUserSettings",
                {
                  MFAOptions: [],
                  AccessToken: this.signInUserSession
                    .getAccessToken()
                    .getJwtToken()
                },
                function(t) {
                  return t ? e(t, null) : e(null, "SUCCESS");
                }
              );
            }),
            (t.deleteUser = function(e, t) {
              var n = this;
              if (
                null == this.signInUserSession ||
                !this.signInUserSession.isValid()
              )
                return e(new Error("User is not authenticated"), null);
              this.client.request(
                "DeleteUser",
                {
                  AccessToken: this.signInUserSession
                    .getAccessToken()
                    .getJwtToken(),
                  ClientMetadata: t
                },
                function(t) {
                  return t
                    ? e(t, null)
                    : (n.clearCachedUser(), e(null, "SUCCESS"));
                }
              );
            }),
            (t.updateAttributes = function(e, t, n) {
              var r = this;
              if (
                null == this.signInUserSession ||
                !this.signInUserSession.isValid()
              )
                return t(new Error("User is not authenticated"), null);
              this.client.request(
                "UpdateUserAttributes",
                {
                  AccessToken: this.signInUserSession
                    .getAccessToken()
                    .getJwtToken(),
                  UserAttributes: e,
                  ClientMetadata: n
                },
                function(e) {
                  return e
                    ? t(e, null)
                    : r.getUserData(
                        function() {
                          return t(null, "SUCCESS");
                        },
                        { bypassCache: !0 }
                      );
                }
              );
            }),
            (t.getUserAttributes = function(e) {
              if (
                null == this.signInUserSession ||
                !this.signInUserSession.isValid()
              )
                return e(new Error("User is not authenticated"), null);
              this.client.request(
                "GetUser",
                {
                  AccessToken: this.signInUserSession
                    .getAccessToken()
                    .getJwtToken()
                },
                function(t, n) {
                  if (t) return e(t, null);
                  for (var r = [], i = 0; i < n.UserAttributes.length; i++) {
                    var o = {
                        Name: n.UserAttributes[i].Name,
                        Value: n.UserAttributes[i].Value
                      },
                      s = new So(o);
                    r.push(s);
                  }
                  return e(null, r);
                }
              );
            }),
            (t.getMFAOptions = function(e) {
              if (
                null == this.signInUserSession ||
                !this.signInUserSession.isValid()
              )
                return e(new Error("User is not authenticated"), null);
              this.client.request(
                "GetUser",
                {
                  AccessToken: this.signInUserSession
                    .getAccessToken()
                    .getJwtToken()
                },
                function(t, n) {
                  return t ? e(t, null) : e(null, n.MFAOptions);
                }
              );
            }),
            (t.createGetUserRequest = function() {
              return this.client.promisifyRequest("GetUser", {
                AccessToken: this.signInUserSession
                  .getAccessToken()
                  .getJwtToken()
              });
            }),
            (t.refreshSessionIfPossible = function() {
              var e = this;
              return new Promise(function(t) {
                var n = e.signInUserSession.getRefreshToken();
                n && n.getToken() ? e.refreshSession(n, t) : t();
              });
            }),
            (t.getUserData = function(e, t) {
              var n = this;
              if (
                null == this.signInUserSession ||
                !this.signInUserSession.isValid()
              )
                return (
                  this.clearCachedUserData(),
                  e(new Error("User is not authenticated"), null)
                );
              var r = this.getUserDataFromCache();
              if (r)
                if (this.isFetchUserDataAndTokenRequired(t))
                  this.fetchUserData()
                    .then(function(e) {
                      return n.refreshSessionIfPossible().then(function() {
                        return e;
                      });
                    })
                    .then(function(t) {
                      return e(null, t);
                    })
                    .catch(e);
                else
                  try {
                    return void e(null, JSON.parse(r));
                  } catch (t) {
                    return this.clearCachedUserData(), void e(t, null);
                  }
              else
                this.fetchUserData()
                  .then(function(t) {
                    e(null, t);
                  })
                  .catch(e);
            }),
            (t.getUserDataFromCache = function() {
              return this.storage.getItem(this.userDataKey);
            }),
            (t.isFetchUserDataAndTokenRequired = function(e) {
              var t = (e || {}).bypassCache;
              return void 0 !== t && t;
            }),
            (t.fetchUserData = function() {
              var e = this;
              return this.createGetUserRequest().then(function(t) {
                return e.cacheUserData(t), t;
              });
            }),
            (t.deleteAttributes = function(e, t) {
              if (
                null == this.signInUserSession ||
                !this.signInUserSession.isValid()
              )
                return t(new Error("User is not authenticated"), null);
              this.client.request(
                "DeleteUserAttributes",
                {
                  UserAttributeNames: e,
                  AccessToken: this.signInUserSession
                    .getAccessToken()
                    .getJwtToken()
                },
                function(e) {
                  return e ? t(e, null) : t(null, "SUCCESS");
                }
              );
            }),
            (t.resendConfirmationCode = function(e, t) {
              var n = {
                ClientId: this.pool.getClientId(),
                Username: this.username,
                ClientMetadata: t
              };
              this.client.request("ResendConfirmationCode", n, function(t, n) {
                return t ? e(t, null) : e(null, n);
              });
            }),
            (t.getSession = function(e) {
              if (null == this.username)
                return e(
                  new Error("Username is null. Cannot retrieve a new session"),
                  null
                );
              if (
                null != this.signInUserSession &&
                this.signInUserSession.isValid()
              )
                return e(null, this.signInUserSession);
              var t =
                  "CognitoIdentityServiceProvider." +
                  this.pool.getClientId() +
                  "." +
                  this.username,
                n = t + ".idToken",
                r = t + ".accessToken",
                i = t + ".refreshToken",
                o = t + ".clockDrift";
              if (this.storage.getItem(n)) {
                var s = new po({ IdToken: this.storage.getItem(n) }),
                  a = new ho({ AccessToken: this.storage.getItem(r) }),
                  u = new go({ RefreshToken: this.storage.getItem(i) }),
                  c = parseInt(this.storage.getItem(o), 0) || 0,
                  f = new mo({
                    IdToken: s,
                    AccessToken: a,
                    RefreshToken: u,
                    ClockDrift: c
                  });
                if (f.isValid())
                  return (
                    (this.signInUserSession = f),
                    e(null, this.signInUserSession)
                  );
                if (!u.getToken())
                  return e(
                    new Error(
                      "Cannot retrieve a new session. Please authenticate."
                    ),
                    null
                  );
                this.refreshSession(u, e);
              } else
                e(
                  new Error(
                    "Local storage is missing an ID Token, Please authenticate"
                  ),
                  null
                );
            }),
            (t.refreshSession = function(e, t, n) {
              var r = this,
                i = {};
              i.REFRESH_TOKEN = e.getToken();
              var o =
                  "CognitoIdentityServiceProvider." + this.pool.getClientId(),
                s = o + ".LastAuthUser";
              if (this.storage.getItem(s)) {
                this.username = this.storage.getItem(s);
                var a = o + "." + this.username + ".deviceKey";
                (this.deviceKey = this.storage.getItem(a)),
                  (i.DEVICE_KEY = this.deviceKey);
              }
              var u = {
                ClientId: this.pool.getClientId(),
                AuthFlow: "REFRESH_TOKEN_AUTH",
                AuthParameters: i,
                ClientMetadata: n
              };
              this.getUserContextData() &&
                (u.UserContextData = this.getUserContextData()),
                this.client.request("InitiateAuth", u, function(n, i) {
                  if (n)
                    return (
                      "NotAuthorizedException" === n.code &&
                        r.clearCachedUser(),
                      t(n, null)
                    );
                  if (i) {
                    var o = i.AuthenticationResult;
                    return (
                      Object.prototype.hasOwnProperty.call(o, "RefreshToken") ||
                        (o.RefreshToken = e.getToken()),
                      (r.signInUserSession = r.getCognitoUserSession(o)),
                      r.cacheTokens(),
                      t(null, r.signInUserSession)
                    );
                  }
                });
            }),
            (t.cacheTokens = function() {
              var e =
                  "CognitoIdentityServiceProvider." + this.pool.getClientId(),
                t = e + "." + this.username + ".idToken",
                n = e + "." + this.username + ".accessToken",
                r = e + "." + this.username + ".refreshToken",
                i = e + "." + this.username + ".clockDrift",
                o = e + ".LastAuthUser";
              this.storage.setItem(
                t,
                this.signInUserSession.getIdToken().getJwtToken()
              ),
                this.storage.setItem(
                  n,
                  this.signInUserSession.getAccessToken().getJwtToken()
                ),
                this.storage.setItem(
                  r,
                  this.signInUserSession.getRefreshToken().getToken()
                ),
                this.storage.setItem(
                  i,
                  "" + this.signInUserSession.getClockDrift()
                ),
                this.storage.setItem(o, this.username);
            }),
            (t.cacheUserData = function(e) {
              this.storage.setItem(this.userDataKey, JSON.stringify(e));
            }),
            (t.clearCachedUserData = function() {
              this.storage.removeItem(this.userDataKey);
            }),
            (t.clearCachedUser = function() {
              this.clearCachedTokens(), this.clearCachedUserData();
            }),
            (t.cacheDeviceKeyAndPassword = function() {
              var e =
                  "CognitoIdentityServiceProvider." +
                  this.pool.getClientId() +
                  "." +
                  this.username,
                t = e + ".deviceKey",
                n = e + ".randomPasswordKey",
                r = e + ".deviceGroupKey";
              this.storage.setItem(t, this.deviceKey),
                this.storage.setItem(n, this.randomPassword),
                this.storage.setItem(r, this.deviceGroupKey);
            }),
            (t.getCachedDeviceKeyAndPassword = function() {
              var e =
                  "CognitoIdentityServiceProvider." +
                  this.pool.getClientId() +
                  "." +
                  this.username,
                t = e + ".deviceKey",
                n = e + ".randomPasswordKey",
                r = e + ".deviceGroupKey";
              this.storage.getItem(t) &&
                ((this.deviceKey = this.storage.getItem(t)),
                (this.randomPassword = this.storage.getItem(n)),
                (this.deviceGroupKey = this.storage.getItem(r)));
            }),
            (t.clearCachedDeviceKeyAndPassword = function() {
              var e =
                  "CognitoIdentityServiceProvider." +
                  this.pool.getClientId() +
                  "." +
                  this.username,
                t = e + ".deviceKey",
                n = e + ".randomPasswordKey",
                r = e + ".deviceGroupKey";
              this.storage.removeItem(t),
                this.storage.removeItem(n),
                this.storage.removeItem(r);
            }),
            (t.clearCachedTokens = function() {
              var e =
                  "CognitoIdentityServiceProvider." + this.pool.getClientId(),
                t = e + "." + this.username + ".idToken",
                n = e + "." + this.username + ".accessToken",
                r = e + "." + this.username + ".refreshToken",
                i = e + ".LastAuthUser",
                o = e + "." + this.username + ".clockDrift";
              this.storage.removeItem(t),
                this.storage.removeItem(n),
                this.storage.removeItem(r),
                this.storage.removeItem(i),
                this.storage.removeItem(o);
            }),
            (t.getCognitoUserSession = function(e) {
              var t = new po(e),
                n = new ho(e),
                r = new go(e);
              return new mo({ IdToken: t, AccessToken: n, RefreshToken: r });
            }),
            (t.forgotPassword = function(e, t) {
              var n = {
                ClientId: this.pool.getClientId(),
                Username: this.username,
                ClientMetadata: t
              };
              this.getUserContextData() &&
                (n.UserContextData = this.getUserContextData()),
                this.client.request("ForgotPassword", n, function(t, n) {
                  return t
                    ? e.onFailure(t)
                    : "function" == typeof e.inputVerificationCode
                    ? e.inputVerificationCode(n)
                    : e.onSuccess(n);
                });
            }),
            (t.confirmPassword = function(e, t, n, r) {
              var i = {
                ClientId: this.pool.getClientId(),
                Username: this.username,
                ConfirmationCode: e,
                Password: t,
                ClientMetadata: r
              };
              this.getUserContextData() &&
                (i.UserContextData = this.getUserContextData()),
                this.client.request("ConfirmForgotPassword", i, function(e) {
                  return e ? n.onFailure(e) : n.onSuccess();
                });
            }),
            (t.getAttributeVerificationCode = function(e, t, n) {
              if (
                null == this.signInUserSession ||
                !this.signInUserSession.isValid()
              )
                return t.onFailure(new Error("User is not authenticated"));
              this.client.request(
                "GetUserAttributeVerificationCode",
                {
                  AttributeName: e,
                  AccessToken: this.signInUserSession
                    .getAccessToken()
                    .getJwtToken(),
                  ClientMetadata: n
                },
                function(e, n) {
                  return e
                    ? t.onFailure(e)
                    : "function" == typeof t.inputVerificationCode
                    ? t.inputVerificationCode(n)
                    : t.onSuccess();
                }
              );
            }),
            (t.verifyAttribute = function(e, t, n) {
              if (
                null == this.signInUserSession ||
                !this.signInUserSession.isValid()
              )
                return n.onFailure(new Error("User is not authenticated"));
              this.client.request(
                "VerifyUserAttribute",
                {
                  AttributeName: e,
                  Code: t,
                  AccessToken: this.signInUserSession
                    .getAccessToken()
                    .getJwtToken()
                },
                function(e) {
                  return e ? n.onFailure(e) : n.onSuccess("SUCCESS");
                }
              );
            }),
            (t.getDevice = function(e) {
              if (
                null == this.signInUserSession ||
                !this.signInUserSession.isValid()
              )
                return e.onFailure(new Error("User is not authenticated"));
              this.client.request(
                "GetDevice",
                {
                  AccessToken: this.signInUserSession
                    .getAccessToken()
                    .getJwtToken(),
                  DeviceKey: this.deviceKey
                },
                function(t, n) {
                  return t ? e.onFailure(t) : e.onSuccess(n);
                }
              );
            }),
            (t.forgetSpecificDevice = function(e, t) {
              if (
                null == this.signInUserSession ||
                !this.signInUserSession.isValid()
              )
                return t.onFailure(new Error("User is not authenticated"));
              this.client.request(
                "ForgetDevice",
                {
                  AccessToken: this.signInUserSession
                    .getAccessToken()
                    .getJwtToken(),
                  DeviceKey: e
                },
                function(e) {
                  return e ? t.onFailure(e) : t.onSuccess("SUCCESS");
                }
              );
            }),
            (t.forgetDevice = function(e) {
              var t = this;
              this.forgetSpecificDevice(this.deviceKey, {
                onFailure: e.onFailure,
                onSuccess: function(n) {
                  return (
                    (t.deviceKey = null),
                    (t.deviceGroupKey = null),
                    (t.randomPassword = null),
                    t.clearCachedDeviceKeyAndPassword(),
                    e.onSuccess(n)
                  );
                }
              });
            }),
            (t.setDeviceStatusRemembered = function(e) {
              if (
                null == this.signInUserSession ||
                !this.signInUserSession.isValid()
              )
                return e.onFailure(new Error("User is not authenticated"));
              this.client.request(
                "UpdateDeviceStatus",
                {
                  AccessToken: this.signInUserSession
                    .getAccessToken()
                    .getJwtToken(),
                  DeviceKey: this.deviceKey,
                  DeviceRememberedStatus: "remembered"
                },
                function(t) {
                  return t ? e.onFailure(t) : e.onSuccess("SUCCESS");
                }
              );
            }),
            (t.setDeviceStatusNotRemembered = function(e) {
              if (
                null == this.signInUserSession ||
                !this.signInUserSession.isValid()
              )
                return e.onFailure(new Error("User is not authenticated"));
              this.client.request(
                "UpdateDeviceStatus",
                {
                  AccessToken: this.signInUserSession
                    .getAccessToken()
                    .getJwtToken(),
                  DeviceKey: this.deviceKey,
                  DeviceRememberedStatus: "not_remembered"
                },
                function(t) {
                  return t ? e.onFailure(t) : e.onSuccess("SUCCESS");
                }
              );
            }),
            (t.listDevices = function(e, t, n) {
              if (
                null == this.signInUserSession ||
                !this.signInUserSession.isValid()
              )
                return n.onFailure(new Error("User is not authenticated"));
              var r = {
                AccessToken: this.signInUserSession
                  .getAccessToken()
                  .getJwtToken(),
                Limit: e
              };
              t && (r.PaginationToken = t),
                this.client.request("ListDevices", r, function(e, t) {
                  return e ? n.onFailure(e) : n.onSuccess(t);
                });
            }),
            (t.globalSignOut = function(e) {
              var t = this;
              if (
                null == this.signInUserSession ||
                !this.signInUserSession.isValid()
              )
                return e.onFailure(new Error("User is not authenticated"));
              this.client.request(
                "GlobalSignOut",
                {
                  AccessToken: this.signInUserSession
                    .getAccessToken()
                    .getJwtToken()
                },
                function(n) {
                  return n
                    ? e.onFailure(n)
                    : (t.clearCachedUser(), e.onSuccess("SUCCESS"));
                }
              );
            }),
            (t.signOut = function() {
              (this.signInUserSession = null), this.clearCachedUser();
            }),
            (t.sendMFASelectionAnswer = function(e, t) {
              var n = this,
                r = {};
              (r.USERNAME = this.username), (r.ANSWER = e);
              var i = {
                ChallengeName: "SELECT_MFA_TYPE",
                ChallengeResponses: r,
                ClientId: this.pool.getClientId(),
                Session: this.Session
              };
              this.getUserContextData() &&
                (i.UserContextData = this.getUserContextData()),
                this.client.request("RespondToAuthChallenge", i, function(
                  r,
                  i
                ) {
                  return r
                    ? t.onFailure(r)
                    : ((n.Session = i.Session),
                      "SMS_MFA" === e
                        ? t.mfaRequired(i.ChallengeName, i.ChallengeParameters)
                        : "SOFTWARE_TOKEN_MFA" === e
                        ? t.totpRequired(i.ChallengeName, i.ChallengeParameters)
                        : void 0);
                });
            }),
            (t.getUserContextData = function() {
              return this.pool.getUserContextData(this.username);
            }),
            (t.associateSoftwareToken = function(e) {
              var t = this;
              null != this.signInUserSession && this.signInUserSession.isValid()
                ? this.client.request(
                    "AssociateSoftwareToken",
                    {
                      AccessToken: this.signInUserSession
                        .getAccessToken()
                        .getJwtToken()
                    },
                    function(t, n) {
                      return t
                        ? e.onFailure(t)
                        : e.associateSecretCode(n.SecretCode);
                    }
                  )
                : this.client.request(
                    "AssociateSoftwareToken",
                    { Session: this.Session },
                    function(n, r) {
                      return n
                        ? e.onFailure(n)
                        : ((t.Session = r.Session),
                          e.associateSecretCode(r.SecretCode));
                    }
                  );
            }),
            (t.verifySoftwareToken = function(e, t, n) {
              var r = this;
              null != this.signInUserSession && this.signInUserSession.isValid()
                ? this.client.request(
                    "VerifySoftwareToken",
                    {
                      AccessToken: this.signInUserSession
                        .getAccessToken()
                        .getJwtToken(),
                      UserCode: e,
                      FriendlyDeviceName: t
                    },
                    function(e, t) {
                      return e ? n.onFailure(e) : n.onSuccess(t);
                    }
                  )
                : this.client.request(
                    "VerifySoftwareToken",
                    {
                      Session: this.Session,
                      UserCode: e,
                      FriendlyDeviceName: t
                    },
                    function(e, t) {
                      if (e) return n.onFailure(e);
                      r.Session = t.Session;
                      var i = {};
                      i.USERNAME = r.username;
                      var o = {
                        ChallengeName: "MFA_SETUP",
                        ClientId: r.pool.getClientId(),
                        ChallengeResponses: i,
                        Session: r.Session
                      };
                      r.getUserContextData() &&
                        (o.UserContextData = r.getUserContextData()),
                        r.client.request("RespondToAuthChallenge", o, function(
                          e,
                          t
                        ) {
                          return e
                            ? n.onFailure(e)
                            : ((r.signInUserSession = r.getCognitoUserSession(
                                t.AuthenticationResult
                              )),
                              r.cacheTokens(),
                              n.onSuccess(r.signInUserSession));
                        });
                    }
                  );
            }),
            e
          );
        })();
      /*!
       * Copyright 2016 Amazon.com,
       * Inc. or its affiliates. All Rights Reserved.
       *
       * Licensed under the Amazon Software License (the "License").
       * You may not use this file except in compliance with the
       * License. A copy of the License is located at
       *
       *     http://aws.amazon.com/asl/
       *
       * or in the "license" file accompanying this file. This file is
       * distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
       * CONDITIONS OF ANY KIND, express or implied. See the License
       * for the specific language governing permissions and
       * limitations under the License.
       */ n(57);
      function Oo() {}
      Oo.prototype.userAgent = "aws-amplify/0.1.x js";
      var Po = Oo;
      function ko(e) {
        var t = "function" == typeof Map ? new Map() : void 0;
        return (ko = function(e) {
          if (
            null === e ||
            ((n = e), -1 === Function.toString.call(n).indexOf("[native code]"))
          )
            return e;
          var n;
          if ("function" != typeof e)
            throw new TypeError(
              "Super expression must either be null or a function"
            );
          if (void 0 !== t) {
            if (t.has(e)) return t.get(e);
            t.set(e, r);
          }
          function r() {
            return No(e, arguments, Uo(this).constructor);
          }
          return (
            (r.prototype = Object.create(e.prototype, {
              constructor: {
                value: r,
                enumerable: !1,
                writable: !0,
                configurable: !0
              }
            })),
            xo(r, e)
          );
        })(e);
      }
      function No(e, t, n) {
        return (No = Ro()
          ? Reflect.construct
          : function(e, t, n) {
              var r = [null];
              r.push.apply(r, t);
              var i = new (Function.bind.apply(e, r))();
              return n && xo(i, n.prototype), i;
            }).apply(null, arguments);
      }
      function Ro() {
        if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
        if (Reflect.construct.sham) return !1;
        if ("function" == typeof Proxy) return !0;
        try {
          return (
            Date.prototype.toString.call(
              Reflect.construct(Date, [], function() {})
            ),
            !0
          );
        } catch (e) {
          return !1;
        }
      }
      function xo(e, t) {
        return (xo =
          Object.setPrototypeOf ||
          function(e, t) {
            return (e.__proto__ = t), e;
          })(e, t);
      }
      function Uo(e) {
        return (Uo = Object.setPrototypeOf
          ? Object.getPrototypeOf
          : function(e) {
              return e.__proto__ || Object.getPrototypeOf(e);
            })(e);
      }
      var Do,
        Mo = (function(e) {
          var t, n;
          function r(t, n, r, i) {
            var o;
            return (
              ((o = e.call(this, t) || this).code = n),
              (o.name = r),
              (o.statusCode = i),
              o
            );
          }
          return (
            (n = e),
            ((t = r).prototype = Object.create(n.prototype)),
            (t.prototype.constructor = t),
            (t.__proto__ = n),
            r
          );
        })(ko(Error)),
        jo = (function() {
          function e(e, t, n) {
            this.endpoint = t || "https://cognito-idp." + e + ".amazonaws.com/";
            var r = (n || {}).credentials;
            this.fetchOptions = r ? { credentials: r } : {};
          }
          var t = e.prototype;
          return (
            (t.promisifyRequest = function(e, t) {
              var n = this;
              return new Promise(function(r, i) {
                n.request(e, t, function(e, t) {
                  e ? i(new Mo(e.message, e.code, e.name, e.statusCode)) : r(t);
                });
              });
            }),
            (t.request = function(e, t, n) {
              var r,
                i = {
                  "Content-Type": "application/x-amz-json-1.1",
                  "X-Amz-Target": "AWSCognitoIdentityProviderService." + e,
                  "X-Amz-User-Agent": Po.prototype.userAgent
                },
                o = Object.assign({}, this.fetchOptions, {
                  headers: i,
                  method: "POST",
                  mode: "cors",
                  cache: "no-cache",
                  body: JSON.stringify(t)
                });
              fetch(this.endpoint, o)
                .then(
                  function(e) {
                    return (r = e), e;
                  },
                  function(e) {
                    if (e instanceof TypeError)
                      throw new Error("Network error");
                    throw e;
                  }
                )
                .then(function(e) {
                  return e.json().catch(function() {
                    return {};
                  });
                })
                .then(function(e) {
                  if (r.ok) return n(null, e);
                  e;
                  var t = (e.__type || e.code).split("#").pop(),
                    i = {
                      code: t,
                      name: t,
                      message: e.message || e.Message || null
                    };
                  return n(i);
                })
                .catch(function(e) {
                  if (!(r && r.headers && r.headers.get("x-amzn-errortype"))) {
                    if (e instanceof Error && "Network error" === e.message) {
                      var t = {
                        code: "NetworkError",
                        name: e.name,
                        message: e.message
                      };
                      return n(t);
                    }
                    return n(e);
                  }
                  try {
                    var i = r.headers.get("x-amzn-errortype").split(":")[0],
                      o = {
                        code: i,
                        name: i,
                        statusCode: r.status,
                        message: r.status ? r.status.toString() : null
                      };
                    return n(o);
                  } catch (t) {
                    return n(e);
                  }
                });
            }),
            e
          );
        })(),
        Lo = (function() {
          function e(e) {
            var t = e || {},
              n = t.UserPoolId,
              r = t.ClientId,
              i = t.endpoint,
              o = t.fetchOptions,
              s = t.AdvancedSecurityDataCollectionFlag;
            if (!n || !r)
              throw new Error("Both UserPoolId and ClientId are required.");
            if (!/^[\w-]+_.+$/.test(n))
              throw new Error("Invalid UserPoolId format.");
            var a = n.split("_")[0];
            (this.userPoolId = n),
              (this.clientId = r),
              (this.client = new jo(a, i, o)),
              (this.advancedSecurityDataCollectionFlag = !1 !== s),
              (this.storage = e.Storage || new Io().getStorage());
          }
          var t = e.prototype;
          return (
            (t.getUserPoolId = function() {
              return this.userPoolId;
            }),
            (t.getClientId = function() {
              return this.clientId;
            }),
            (t.signUp = function(e, t, n, r, i, o) {
              var s = this,
                a = {
                  ClientId: this.clientId,
                  Username: e,
                  Password: t,
                  UserAttributes: n,
                  ValidationData: r,
                  ClientMetadata: o
                };
              this.getUserContextData(e) &&
                (a.UserContextData = this.getUserContextData(e)),
                this.client.request("SignUp", a, function(t, n) {
                  if (t) return i(t, null);
                  var r = { Username: e, Pool: s, Storage: s.storage },
                    o = {
                      user: new Co(r),
                      userConfirmed: n.UserConfirmed,
                      userSub: n.UserSub,
                      codeDeliveryDetails: n.CodeDeliveryDetails
                    };
                  return i(null, o);
                });
            }),
            (t.getCurrentUser = function() {
              var e =
                  "CognitoIdentityServiceProvider." +
                  this.clientId +
                  ".LastAuthUser",
                t = this.storage.getItem(e);
              if (t) {
                var n = { Username: t, Pool: this, Storage: this.storage };
                return new Co(n);
              }
              return null;
            }),
            (t.getUserContextData = function(e) {
              if ("undefined" != typeof AmazonCognitoAdvancedSecurityData) {
                var t = AmazonCognitoAdvancedSecurityData;
                if (this.advancedSecurityDataCollectionFlag) {
                  var n = t.getData(e, this.userPoolId, this.clientId);
                  if (n) return { EncodedData: n };
                }
                return {};
              }
            }),
            e
          );
        })(),
        Fo = n(6),
        Bo = (function() {
          function e(e) {
            if (!e.domain)
              throw new Error(
                "The domain of cookieStorage can not be undefined."
              );
            if (
              ((this.domain = e.domain),
              e.path ? (this.path = e.path) : (this.path = "/"),
              Object.prototype.hasOwnProperty.call(e, "expires")
                ? (this.expires = e.expires)
                : (this.expires = 365),
              Object.prototype.hasOwnProperty.call(e, "secure")
                ? (this.secure = e.secure)
                : (this.secure = !0),
              Object.prototype.hasOwnProperty.call(e, "sameSite"))
            ) {
              if (!["strict", "lax", "none"].includes(e.sameSite))
                throw new Error(
                  'The sameSite value of cookieStorage must be "lax", "strict" or "none".'
                );
              if ("none" === e.sameSite && !this.secure)
                throw new Error(
                  "sameSite = None requires the Secure attribute in latest browser versions."
                );
              this.sameSite = e.sameSite;
            } else this.sameSite = null;
          }
          var t = e.prototype;
          return (
            (t.setItem = function(e, t) {
              var n = {
                path: this.path,
                expires: this.expires,
                domain: this.domain,
                secure: this.secure
              };
              return (
                this.sameSite && (n.sameSite = this.sameSite),
                Fo.set(e, t, n),
                Fo.get(e)
              );
            }),
            (t.getItem = function(e) {
              return Fo.get(e);
            }),
            (t.removeItem = function(e) {
              var t = {
                path: this.path,
                expires: this.expires,
                domain: this.domain,
                secure: this.secure
              };
              return (
                this.sameSite && (t.sameSite = this.sameSite), Fo.remove(e, t)
              );
            }),
            (t.clear = function() {
              var e,
                t = Fo.get();
              for (e = 0; e < t.length; ++e) Fo.remove(t[e]);
              return {};
            }),
            e
          );
        })(),
        qo = n(1),
        Vo = function(e) {
          var t = window.open(e, "_self");
          return t ? Promise.resolve(t) : Promise.reject();
        },
        zo = function() {
          return (zo =
            Object.assign ||
            function(e) {
              for (var t, n = 1, r = arguments.length; n < r; n++)
                for (var i in (t = arguments[n]))
                  Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
              return e;
            }).apply(this, arguments);
        },
        Ko = function(e, t, n, r) {
          return new (n || (n = Promise))(function(i, o) {
            function s(e) {
              try {
                u(r.next(e));
              } catch (e) {
                o(e);
              }
            }
            function a(e) {
              try {
                u(r.throw(e));
              } catch (e) {
                o(e);
              }
            }
            function u(e) {
              var t;
              e.done
                ? i(e.value)
                : ((t = e.value),
                  t instanceof n
                    ? t
                    : new n(function(e) {
                        e(t);
                      })).then(s, a);
            }
            u((r = r.apply(e, t || [])).next());
          });
        },
        Go = function(e, t) {
          var n,
            r,
            i,
            o,
            s = {
              label: 0,
              sent: function() {
                if (1 & i[0]) throw i[1];
                return i[1];
              },
              trys: [],
              ops: []
            };
          return (
            (o = { next: a(0), throw: a(1), return: a(2) }),
            "function" == typeof Symbol &&
              (o[Symbol.iterator] = function() {
                return this;
              }),
            o
          );
          function a(o) {
            return function(a) {
              return (function(o) {
                if (n) throw new TypeError("Generator is already executing.");
                for (; s; )
                  try {
                    if (
                      ((n = 1),
                      r &&
                        (i =
                          2 & o[0]
                            ? r.return
                            : o[0]
                            ? r.throw || ((i = r.return) && i.call(r), 0)
                            : r.next) &&
                        !(i = i.call(r, o[1])).done)
                    )
                      return i;
                    switch (((r = 0), i && (o = [2 & o[0], i.value]), o[0])) {
                      case 0:
                      case 1:
                        i = o;
                        break;
                      case 4:
                        return s.label++, { value: o[1], done: !1 };
                      case 5:
                        s.label++, (r = o[1]), (o = [0]);
                        continue;
                      case 7:
                        (o = s.ops.pop()), s.trys.pop();
                        continue;
                      default:
                        if (
                          !((i = s.trys),
                          (i = i.length > 0 && i[i.length - 1]) ||
                            (6 !== o[0] && 2 !== o[0]))
                        ) {
                          s = 0;
                          continue;
                        }
                        if (
                          3 === o[0] &&
                          (!i || (o[1] > i[0] && o[1] < i[3]))
                        ) {
                          s.label = o[1];
                          break;
                        }
                        if (6 === o[0] && s.label < i[1]) {
                          (s.label = i[1]), (i = o);
                          break;
                        }
                        if (i && s.label < i[2]) {
                          (s.label = i[2]), s.ops.push(o);
                          break;
                        }
                        i[2] && s.ops.pop(), s.trys.pop();
                        continue;
                    }
                    o = t.call(e, s);
                  } catch (e) {
                    (o = [6, e]), (r = 0);
                  } finally {
                    n = i = 0;
                  }
                if (5 & o[0]) throw o[1];
                return { value: o[0] ? o[1] : void 0, done: !0 };
              })([o, a]);
            };
          }
        },
        Ho = function(e, t) {
          var n = "function" == typeof Symbol && e[Symbol.iterator];
          if (!n) return e;
          var r,
            i,
            o = n.call(e),
            s = [];
          try {
            for (; (void 0 === t || t-- > 0) && !(r = o.next()).done; )
              s.push(r.value);
          } catch (e) {
            i = { error: e };
          } finally {
            try {
              r && !r.done && (n = o.return) && n.call(o);
            } finally {
              if (i) throw i.error;
            }
          }
          return s;
        },
        Wo =
          "undefined" != typeof Symbol && "function" == typeof Symbol.for
            ? Symbol.for("amplify_default")
            : "@@amplify_default",
        Yo = function(e, t, n) {
          y.dispatch("auth", { event: e, data: t, message: n }, "Auth", Wo);
        },
        Jo = new f("OAuth"),
        Qo = (function() {
          function e(e) {
            var t = e.config,
              n = e.cognitoClientId,
              r = e.scopes,
              i = void 0 === r ? [] : r;
            if (
              ((this._urlOpener = t.urlOpener || Vo),
              (this._config = t),
              (this._cognitoClientId = n),
              !this.isValidScopes(i))
            )
              throw Error("scopes must be a String Array");
            this._scopes = i;
          }
          return (
            (e.prototype.isValidScopes = function(e) {
              return (
                Array.isArray(e) &&
                e.every(function(e) {
                  return "string" == typeof e;
                })
              );
            }),
            (e.prototype.oauthSignIn = function(e, t, n, i, o, s) {
              void 0 === e && (e = "code"), void 0 === o && (o = r.Cognito);
              var a = this._generateState(32),
                u = s ? a + "-" + s : a;
              !(function(e) {
                window.sessionStorage.setItem("oauth_state", e);
              })(encodeURIComponent(u));
              var c,
                f = this._generateRandom(128);
              (c = f), window.sessionStorage.setItem("ouath_pkce_key", c);
              var l = this._generateChallenge(f),
                h = this._scopes.join(" "),
                d =
                  "https://" +
                  t +
                  "/oauth2/authorize?" +
                  Object.entries(
                    zo(
                      zo(
                        {
                          redirect_uri: n,
                          response_type: e,
                          client_id: i,
                          identity_provider: o,
                          scope: h,
                          state: u
                        },
                        "code" === e ? { code_challenge: l } : {}
                      ),
                      "code" === e ? { code_challenge_method: "S256" } : {}
                    )
                  )
                    .map(function(e) {
                      var t = Ho(e, 2),
                        n = t[0],
                        r = t[1];
                      return (
                        encodeURIComponent(n) + "=" + encodeURIComponent(r)
                      );
                    })
                    .join("&");
              Jo.debug("Redirecting to " + d), this._urlOpener(d, n);
            }),
            (e.prototype._handleCodeFlow = function(e) {
              return Ko(this, void 0, void 0, function() {
                var t, n, r, i, o, a, u, c, f, l, h, d;
                return Go(this, function(p) {
                  switch (p.label) {
                    case 0:
                      return (t = (Object(qo.parse)(e).query || "")
                        .split("&")
                        .map(function(e) {
                          return e.split("=");
                        })
                        .reduce(
                          function(e, t) {
                            var n,
                              r = Ho(t, 2),
                              i = r[0],
                              o = r[1];
                            return zo(zo({}, e), (((n = {})[i] = o), n));
                          },
                          { code: void 0 }
                        ).code)
                        ? ((n =
                            "https://" + this._config.domain + "/oauth2/token"),
                          Yo("codeFlow", {}, "Retrieving tokens from " + n),
                          (r = s(this._config)
                            ? this._cognitoClientId
                            : this._config.clientID),
                          (i = s(this._config)
                            ? this._config.redirectSignIn
                            : this._config.redirectUri),
                          (g = window.sessionStorage.getItem("ouath_pkce_key")),
                          window.sessionStorage.removeItem("ouath_pkce_key"),
                          (a = zo(
                            {
                              grant_type: "authorization_code",
                              code: t,
                              client_id: r,
                              redirect_uri: i
                            },
                            (o = g) ? { code_verifier: o } : {}
                          )),
                          Jo.debug("Calling token endpoint: " + n + " with", a),
                          (u = Object.entries(a)
                            .map(function(e) {
                              var t = Ho(e, 2),
                                n = t[0],
                                r = t[1];
                              return (
                                encodeURIComponent(n) +
                                "=" +
                                encodeURIComponent(r)
                              );
                            })
                            .join("&")),
                          [
                            4,
                            fetch(n, {
                              method: "POST",
                              headers: {
                                "Content-Type":
                                  "application/x-www-form-urlencoded"
                              },
                              body: u
                            })
                          ])
                        : [2];
                    case 1:
                      return [4, p.sent().json()];
                    case 2:
                      if (
                        ((c = p.sent()),
                        (f = c.access_token),
                        (l = c.refresh_token),
                        (h = c.id_token),
                        (d = c.error))
                      )
                        throw new Error(d);
                      return [
                        2,
                        { accessToken: f, refreshToken: l, idToken: h }
                      ];
                  }
                  var g;
                });
              });
            }),
            (e.prototype._handleImplicitFlow = function(e) {
              return Ko(this, void 0, void 0, function() {
                var t, n, r;
                return Go(this, function(i) {
                  return (
                    (t = (Object(qo.parse)(e).hash || "#")
                      .substr(1)
                      .split("&")
                      .map(function(e) {
                        return e.split("=");
                      })
                      .reduce(
                        function(e, t) {
                          var n,
                            r = Ho(t, 2),
                            i = r[0],
                            o = r[1];
                          return zo(zo({}, e), (((n = {})[i] = o), n));
                        },
                        { id_token: void 0, access_token: void 0 }
                      )),
                    (n = t.id_token),
                    (r = t.access_token),
                    Yo("implicitFlow", {}, "Got tokens from " + e),
                    Jo.debug("Retrieving implicit tokens from " + e + " with"),
                    [2, { accessToken: r, idToken: n, refreshToken: null }]
                  );
                });
              });
            }),
            (e.prototype.handleAuthResponse = function(e) {
              return Ko(this, void 0, void 0, function() {
                var t, n, r, i, o, s, a;
                return Go(this, function(u) {
                  switch (u.label) {
                    case 0:
                      if (
                        (u.trys.push([0, 5, , 6]),
                        (t = e
                          ? zo(
                              zo(
                                {},
                                (Object(qo.parse)(e).hash || "#")
                                  .substr(1)
                                  .split("&")
                                  .map(function(e) {
                                    return e.split("=");
                                  })
                                  .reduce(function(e, t) {
                                    var n = Ho(t, 2),
                                      r = n[0],
                                      i = n[1];
                                    return (e[r] = i), e;
                                  }, {})
                              ),
                              (Object(qo.parse)(e).query || "")
                                .split("&")
                                .map(function(e) {
                                  return e.split("=");
                                })
                                .reduce(function(e, t) {
                                  var n = Ho(t, 2),
                                    r = n[0],
                                    i = n[1];
                                  return (e[r] = i), e;
                                }, {})
                            )
                          : {}),
                        (n = t.error),
                        (r = t.error_description),
                        n)
                      )
                        throw new Error(r);
                      return (
                        (i = this._validateState(t)),
                        Jo.debug(
                          "Starting " +
                            this._config.responseType +
                            " flow with " +
                            e
                        ),
                        "code" !== this._config.responseType
                          ? [3, 2]
                          : ((o = [{}]), [4, this._handleCodeFlow(e)])
                      );
                    case 1:
                      return [
                        2,
                        zo.apply(void 0, [
                          zo.apply(void 0, o.concat([u.sent()])),
                          { state: i }
                        ])
                      ];
                    case 2:
                      return (s = [{}]), [4, this._handleImplicitFlow(e)];
                    case 3:
                      return [
                        2,
                        zo.apply(void 0, [
                          zo.apply(void 0, s.concat([u.sent()])),
                          { state: i }
                        ])
                      ];
                    case 4:
                      return [3, 6];
                    case 5:
                      throw ((a = u.sent()),
                      Jo.error("Error handling auth response.", a),
                      a);
                    case 6:
                      return [2];
                  }
                });
              });
            }),
            (e.prototype._validateState = function(e) {
              if (e) {
                var t,
                  n =
                    ((t = window.sessionStorage.getItem("oauth_state")),
                    window.sessionStorage.removeItem("oauth_state"),
                    t),
                  r = e.state;
                if (n && n !== r)
                  throw new Error("Invalid state in OAuth flow");
                return r;
              }
            }),
            (e.prototype.signOut = function() {
              return Ko(this, void 0, void 0, function() {
                var e, t, n;
                return Go(this, function(r) {
                  return (
                    (e = "https://" + this._config.domain + "/logout?"),
                    (t = s(this._config)
                      ? this._cognitoClientId
                      : this._config.oauth.clientID),
                    (n = s(this._config)
                      ? this._config.redirectSignOut
                      : this._config.returnTo),
                    (e += Object.entries({
                      client_id: t,
                      logout_uri: encodeURIComponent(n)
                    })
                      .map(function(e) {
                        var t = Ho(e, 2);
                        return t[0] + "=" + t[1];
                      })
                      .join("&")),
                    Yo(
                      "oAuthSignOut",
                      { oAuth: "signOut" },
                      "Signing out from " + e
                    ),
                    Jo.debug("Signing out from " + e),
                    [2, this._urlOpener(e)]
                  );
                });
              });
            }),
            (e.prototype._generateState = function(e) {
              for (
                var t = "",
                  n = e,
                  r =
                    "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
                n > 0;
                --n
              )
                t += r[Math.round(Math.random() * (r.length - 1))];
              return t;
            }),
            (e.prototype._generateChallenge = function(e) {
              return this._base64URL(Yi()(e));
            }),
            (e.prototype._base64URL = function(e) {
              return e
                .toString(vo.a)
                .replace(/=/g, "")
                .replace(/\+/g, "-")
                .replace(/\//g, "_");
            }),
            (e.prototype._generateRandom = function(e) {
              var t = new Uint8Array(e);
              if ("undefined" != typeof window && window.crypto)
                window.crypto.getRandomValues(t);
              else
                for (var n = 0; n < e; n += 1)
                  t[n] =
                    (Math.random() *
                      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~"
                        .length) |
                    0;
              return this._bufferToString(t);
            }),
            (e.prototype._bufferToString = function(e) {
              for (
                var t =
                    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
                  n = [],
                  r = 0;
                r < e.byteLength;
                r += 1
              ) {
                var i = e[r] % t.length;
                n.push(t[i]);
              }
              return n.join("");
            }),
            e
          );
        })();
      !(function(e) {
        (e.DEFAULT_MSG = "Authentication Error"),
          (e.EMPTY_USERNAME = "Username cannot be empty"),
          (e.INVALID_USERNAME =
            "The username should either be a string or one of the sign in types"),
          (e.EMPTY_PASSWORD = "Password cannot be empty"),
          (e.EMPTY_CODE = "Confirmation code cannot be empty"),
          (e.SIGN_UP_ERROR = "Error creating account"),
          (e.NO_MFA = "No valid MFA method provided"),
          (e.INVALID_MFA = "Invalid MFA type"),
          (e.EMPTY_CHALLENGE = "Challenge response cannot be empty"),
          (e.NO_USER_SESSION =
            "Failed to get the session because the user is empty");
      })(Do || (Do = {}));
      var $o = (function() {
          var e = function(t, n) {
            return (e =
              Object.setPrototypeOf ||
              ({ __proto__: [] } instanceof Array &&
                function(e, t) {
                  e.__proto__ = t;
                }) ||
              function(e, t) {
                for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
              })(t, n);
          };
          return function(t, n) {
            function r() {
              this.constructor = t;
            }
            e(t, n),
              (t.prototype =
                null === n
                  ? Object.create(n)
                  : ((r.prototype = n.prototype), new r()));
          };
        })(),
        Xo = new f("AuthError"),
        Zo = (function(e) {
          function t(n) {
            var r = this,
              i = ts[n],
              o = i.message,
              s = i.log;
            return (
              ((r = e.call(this, o) || this).constructor = t),
              Object.setPrototypeOf(r, t.prototype),
              (r.name = "AuthError"),
              (r.log = s || o),
              Xo.error(r.log),
              r
            );
          }
          return $o(t, e), t;
        })(Error),
        es = (function(e) {
          function t(n) {
            var r = e.call(this, n) || this;
            return (
              (r.constructor = t),
              Object.setPrototypeOf(r, t.prototype),
              (r.name = "NoUserPoolError"),
              r
            );
          }
          return $o(t, e), t;
        })(Zo),
        ts = {
          noConfig: {
            message: Do.DEFAULT_MSG,
            log:
              "\n            Error: Amplify has not been configured correctly.\n            This error is typically caused by one of the following scenarios:\n\n            1. Make sure you're passing the awsconfig object to Amplify.configure() in your app's entry point\n                See https://aws-amplify.github.io/docs/js/authentication#configure-your-app for more information\n            \n            2. There might be multiple conflicting versions of aws-amplify or amplify packages in your node_modules.\n                Try deleting your node_modules folder and reinstalling the dependencies with `yarn install`\n        "
          },
          missingAuthConfig: {
            message: Do.DEFAULT_MSG,
            log:
              "\n            Error: Amplify has not been configured correctly. \n            The configuration object is missing required auth properties. \n            Did you run `amplify push` after adding auth via `amplify add auth`?\n            See https://aws-amplify.github.io/docs/js/authentication#amplify-project-setup for more information\n        "
          },
          emptyUsername: { message: Do.EMPTY_USERNAME },
          invalidUsername: { message: Do.INVALID_USERNAME },
          emptyPassword: { message: Do.EMPTY_PASSWORD },
          emptyCode: { message: Do.EMPTY_CODE },
          signUpError: {
            message: Do.SIGN_UP_ERROR,
            log:
              "The first parameter should either be non-null string or object"
          },
          noMFA: { message: Do.NO_MFA },
          invalidMFA: { message: Do.INVALID_MFA },
          emptyChallengeResponse: { message: Do.EMPTY_CHALLENGE },
          noUserSession: { message: Do.NO_USER_SESSION },
          default: { message: Do.DEFAULT_MSG }
        },
        ns = function(e, t, n, r) {
          return new (n || (n = Promise))(function(i, o) {
            function s(e) {
              try {
                u(r.next(e));
              } catch (e) {
                o(e);
              }
            }
            function a(e) {
              try {
                u(r.throw(e));
              } catch (e) {
                o(e);
              }
            }
            function u(e) {
              var t;
              e.done
                ? i(e.value)
                : ((t = e.value),
                  t instanceof n
                    ? t
                    : new n(function(e) {
                        e(t);
                      })).then(s, a);
            }
            u((r = r.apply(e, t || [])).next());
          });
        },
        rs = function(e, t) {
          var n,
            r,
            i,
            o,
            s = {
              label: 0,
              sent: function() {
                if (1 & i[0]) throw i[1];
                return i[1];
              },
              trys: [],
              ops: []
            };
          return (
            (o = { next: a(0), throw: a(1), return: a(2) }),
            "function" == typeof Symbol &&
              (o[Symbol.iterator] = function() {
                return this;
              }),
            o
          );
          function a(o) {
            return function(a) {
              return (function(o) {
                if (n) throw new TypeError("Generator is already executing.");
                for (; s; )
                  try {
                    if (
                      ((n = 1),
                      r &&
                        (i =
                          2 & o[0]
                            ? r.return
                            : o[0]
                            ? r.throw || ((i = r.return) && i.call(r), 0)
                            : r.next) &&
                        !(i = i.call(r, o[1])).done)
                    )
                      return i;
                    switch (((r = 0), i && (o = [2 & o[0], i.value]), o[0])) {
                      case 0:
                      case 1:
                        i = o;
                        break;
                      case 4:
                        return s.label++, { value: o[1], done: !1 };
                      case 5:
                        s.label++, (r = o[1]), (o = [0]);
                        continue;
                      case 7:
                        (o = s.ops.pop()), s.trys.pop();
                        continue;
                      default:
                        if (
                          !((i = s.trys),
                          (i = i.length > 0 && i[i.length - 1]) ||
                            (6 !== o[0] && 2 !== o[0]))
                        ) {
                          s = 0;
                          continue;
                        }
                        if (
                          3 === o[0] &&
                          (!i || (o[1] > i[0] && o[1] < i[3]))
                        ) {
                          s.label = o[1];
                          break;
                        }
                        if (6 === o[0] && s.label < i[1]) {
                          (s.label = i[1]), (i = o);
                          break;
                        }
                        if (i && s.label < i[2]) {
                          (s.label = i[2]), s.ops.push(o);
                          break;
                        }
                        i[2] && s.ops.pop(), s.trys.pop();
                        continue;
                    }
                    o = t.call(e, s);
                  } catch (e) {
                    (o = [6, e]), (r = 0);
                  } finally {
                    n = i = 0;
                  }
                if (5 & o[0]) throw o[1];
                return { value: o[0] ? o[1] : void 0, done: !0 };
              })([o, a]);
            };
          }
        },
        is = function(e, t) {
          var n = "function" == typeof Symbol && e[Symbol.iterator];
          if (!n) return e;
          var r,
            i,
            o = n.call(e),
            s = [];
          try {
            for (; (void 0 === t || t-- > 0) && !(r = o.next()).done; )
              s.push(r.value);
          } catch (e) {
            i = { error: e };
          } finally {
            try {
              r && !r.done && (n = o.return) && n.call(o);
            } finally {
              if (i) throw i.error;
            }
          }
          return s;
        },
        os = new f("AuthClass"),
        ss =
          "undefined" != typeof Symbol && "function" == typeof Symbol.for
            ? Symbol.for("amplify_default")
            : "@@amplify_default",
        as = function(e, t, n) {
          y.dispatch("auth", { event: e, data: t, message: n }, "Auth", ss);
        },
        us = new ((function() {
          function e(e) {
            var t = this;
            (this.userPool = null),
              (this.user = null),
              (this.oAuthFlowInProgress = !1),
              (this.Credentials = Ri),
              this.configure(e),
              (this.currentUserCredentials = this.currentUserCredentials.bind(
                this
              )),
              y.listen("auth", function(e) {
                switch (e.payload.event) {
                  case "signIn":
                    t._storage.setItem("amplify-signin-with-hostedUI", "false");
                    break;
                  case "signOut":
                    t._storage.removeItem("amplify-signin-with-hostedUI");
                    break;
                  case "cognitoHostedUI":
                    t._storage.setItem("amplify-signin-with-hostedUI", "true");
                }
              });
          }
          return (
            (e.prototype.getModuleName = function() {
              return "Auth";
            }),
            (e.prototype.configure = function(e) {
              var t = this;
              if (!e) return this._config || {};
              os.debug("configure Auth");
              var n = Object.assign(
                {},
                this._config,
                Di.parseMobilehubConfig(e).Auth,
                e
              );
              this._config = n;
              var r = this._config,
                i = r.userPoolId,
                o = r.userPoolWebClientId,
                a = r.cookieStorage,
                u = r.oauth,
                c = r.region,
                f = r.identityPoolId,
                l = r.mandatorySignIn,
                h = r.refreshHandlers,
                d = r.identityPoolRegion,
                p = r.clientMetadata,
                g = r.endpoint;
              if (this._config.storage) {
                if (!this._isValidAuthStorage(this._config.storage))
                  throw (os.error(
                    "The storage in the Auth config is not valid!"
                  ),
                  new Error("Empty storage object"));
                this._storage = this._config.storage;
              } else
                this._storage = a
                  ? new Bo(a)
                  : e.ssr
                  ? new Vi()
                  : new b().getStorage();
              if (
                ((this._storageSync = Promise.resolve()),
                "function" == typeof this._storage.sync &&
                  (this._storageSync = this._storage.sync()),
                i)
              ) {
                var y = { UserPoolId: i, ClientId: o, endpoint: g };
                (y.Storage = this._storage), (this.userPool = new Lo(y));
              }
              this.Credentials.configure({
                mandatorySignIn: l,
                region: d || c,
                userPoolId: i,
                identityPoolId: f,
                refreshHandlers: h,
                storage: this._storage
              });
              var v = u ? (s(this._config.oauth) ? u : u.awsCognito) : void 0;
              if (v) {
                var m = Object.assign(
                  {
                    cognitoClientId: o,
                    UserPoolId: i,
                    domain: v.domain,
                    scopes: v.scope,
                    redirectSignIn: v.redirectSignIn,
                    redirectSignOut: v.redirectSignOut,
                    responseType: v.responseType,
                    Storage: this._storage,
                    urlOpener: v.urlOpener,
                    clientMetadata: p
                  },
                  v.options
                );
                this._oAuthHandler = new Qo({
                  scopes: m.scopes,
                  config: m,
                  cognitoClientId: m.cognitoClientId
                });
                var _ = {};
                !(function(e) {
                  if (w.a.browserOrNode().isBrowser && window.location)
                    e({ url: window.location.href });
                  else if (!w.a.browserOrNode().isNode)
                    throw new Error("Not supported");
                })(function(e) {
                  var n = e.url;
                  _[n] || ((_[n] = !0), t._handleAuthResponse(n));
                });
              }
              return (
                as(
                  "configured",
                  null,
                  "The Auth category has been configured successfully"
                ),
                this._config
              );
            }),
            (e.prototype.signUp = function(e) {
              for (var t = this, n = [], r = 1; r < arguments.length; r++)
                n[r - 1] = arguments[r];
              if (!this.userPool) return this.rejectNoUserPool();
              var o,
                s = null,
                a = null,
                u = [],
                c = null;
              if (e && "string" == typeof e) {
                (s = e), (a = n ? n[0] : null);
                var f = n ? n[1] : null,
                  l = n ? n[2] : null;
                f && u.push({ Name: "email", Value: f }),
                  l && u.push({ Name: "phone_number", Value: l });
              } else {
                if (!e || "object" != typeof e)
                  return this.rejectAuthError(i.SignUpError);
                (s = e.username),
                  (a = e.password),
                  e && e.clientMetadata
                    ? (o = e.clientMetadata)
                    : this._config.clientMetadata &&
                      (o = this._config.clientMetadata);
                var h = e.attributes;
                h &&
                  Object.keys(h).map(function(e) {
                    var t = { Name: e, Value: h[e] };
                    u.push(t);
                  }),
                  (c = e.validationData || null);
              }
              return s
                ? a
                  ? (os.debug("signUp attrs:", u),
                    os.debug("signUp validation data:", c),
                    new Promise(function(e, n) {
                      t.userPool.signUp(
                        s,
                        a,
                        u,
                        c,
                        function(t, r) {
                          t
                            ? (as("signUp_failure", t, s + " failed to signup"),
                              n(t))
                            : (as(
                                "signUp",
                                r,
                                s + " has signed up successfully"
                              ),
                              e(r));
                        },
                        o
                      );
                    }))
                  : this.rejectAuthError(i.EmptyPassword)
                : this.rejectAuthError(i.EmptyUsername);
            }),
            (e.prototype.confirmSignUp = function(e, t, n) {
              if (!this.userPool) return this.rejectNoUserPool();
              if (!e) return this.rejectAuthError(i.EmptyUsername);
              if (!t) return this.rejectAuthError(i.EmptyCode);
              var r,
                o = this.createCognitoUser(e),
                s =
                  !n ||
                  "boolean" != typeof n.forceAliasCreation ||
                  n.forceAliasCreation;
              return (
                n && n.clientMetadata
                  ? (r = n.clientMetadata)
                  : this._config.clientMetadata &&
                    (r = this._config.clientMetadata),
                new Promise(function(e, n) {
                  o.confirmRegistration(
                    t,
                    s,
                    function(t, r) {
                      t ? n(t) : e(r);
                    },
                    r
                  );
                })
              );
            }),
            (e.prototype.resendSignUp = function(e, t) {
              if (
                (void 0 === t && (t = this._config.clientMetadata),
                !this.userPool)
              )
                return this.rejectNoUserPool();
              if (!e) return this.rejectAuthError(i.EmptyUsername);
              var n = this.createCognitoUser(e);
              return new Promise(function(e, r) {
                n.resendConfirmationCode(function(t, n) {
                  t ? r(t) : e(n);
                }, t);
              });
            }),
            (e.prototype.signIn = function(e, t, n) {
              if (
                (void 0 === n && (n = this._config.clientMetadata),
                !this.userPool)
              )
                return this.rejectNoUserPool();
              var r = null,
                o = null,
                s = {};
              if ("string" == typeof e) (r = e), (o = t);
              else {
                if (!e.username) return this.rejectAuthError(i.InvalidUsername);
                void 0 !== t &&
                  os.warn(
                    "The password should be defined under the first parameter object!"
                  ),
                  (r = e.username),
                  (o = e.password),
                  (s = e.validationData);
              }
              if (!r) return this.rejectAuthError(i.EmptyUsername);
              var a = new zi({
                Username: r,
                Password: o,
                ValidationData: s,
                ClientMetadata: n
              });
              return o
                ? this.signInWithPassword(a)
                : this.signInWithoutPassword(a);
            }),
            (e.prototype.authCallbacks = function(e, t, n) {
              var r = this,
                i = this;
              return {
                onSuccess: function(o) {
                  return ns(r, void 0, void 0, function() {
                    var r, s, a, u;
                    return rs(this, function(c) {
                      switch (c.label) {
                        case 0:
                          os.debug(o),
                            delete e.challengeName,
                            delete e.challengeParam,
                            (c.label = 1);
                        case 1:
                          return (
                            c.trys.push([1, 4, 5, 9]),
                            [4, this.Credentials.clear()]
                          );
                        case 2:
                          return (
                            c.sent(), [4, this.Credentials.set(o, "session")]
                          );
                        case 3:
                          return (
                            (r = c.sent()),
                            os.debug("succeed to get cognito credentials", r),
                            [3, 9]
                          );
                        case 4:
                          return (
                            (s = c.sent()),
                            os.debug("cannot get cognito credentials", s),
                            [3, 9]
                          );
                        case 5:
                          return (
                            c.trys.push([5, 7, , 8]),
                            [4, this.currentUserPoolUser()]
                          );
                        case 6:
                          return (
                            (a = c.sent()),
                            (i.user = a),
                            as(
                              "signIn",
                              a,
                              "A user " +
                                e.getUsername() +
                                " has been signed in"
                            ),
                            t(a),
                            [3, 8]
                          );
                        case 7:
                          return (
                            (u = c.sent()),
                            os.error("Failed to get the signed in user", u),
                            n(u),
                            [3, 8]
                          );
                        case 8:
                          return [7];
                        case 9:
                          return [2];
                      }
                    });
                  });
                },
                onFailure: function(t) {
                  os.debug("signIn failure", t),
                    as(
                      "signIn_failure",
                      t,
                      e.getUsername() + " failed to signin"
                    ),
                    n(t);
                },
                customChallenge: function(n) {
                  os.debug("signIn custom challenge answer required"),
                    (e.challengeName = "CUSTOM_CHALLENGE"),
                    (e.challengeParam = n),
                    t(e);
                },
                mfaRequired: function(n, r) {
                  os.debug("signIn MFA required"),
                    (e.challengeName = n),
                    (e.challengeParam = r),
                    t(e);
                },
                mfaSetup: function(n, r) {
                  os.debug("signIn mfa setup", n),
                    (e.challengeName = n),
                    (e.challengeParam = r),
                    t(e);
                },
                newPasswordRequired: function(n, r) {
                  os.debug("signIn new password"),
                    (e.challengeName = "NEW_PASSWORD_REQUIRED"),
                    (e.challengeParam = {
                      userAttributes: n,
                      requiredAttributes: r
                    }),
                    t(e);
                },
                totpRequired: function(n, r) {
                  os.debug("signIn totpRequired"),
                    (e.challengeName = n),
                    (e.challengeParam = r),
                    t(e);
                },
                selectMFAType: function(n, r) {
                  os.debug("signIn selectMFAType", n),
                    (e.challengeName = n),
                    (e.challengeParam = r),
                    t(e);
                }
              };
            }),
            (e.prototype.signInWithPassword = function(e) {
              var t = this,
                n = this.createCognitoUser(e.getUsername());
              return new Promise(function(r, i) {
                n.authenticateUser(e, t.authCallbacks(n, r, i));
              });
            }),
            (e.prototype.signInWithoutPassword = function(e) {
              var t = this,
                n = this.createCognitoUser(e.getUsername());
              return (
                n.setAuthenticationFlowType("CUSTOM_AUTH"),
                new Promise(function(r, i) {
                  n.initiateAuth(e, t.authCallbacks(n, r, i));
                })
              );
            }),
            (e.prototype.getMFAOptions = function(e) {
              return new Promise(function(t, n) {
                e.getMFAOptions(function(e, r) {
                  if (e)
                    return os.debug("get MFA Options failed", e), void n(e);
                  os.debug("get MFA options success", r), t(r);
                });
              });
            }),
            (e.prototype.getPreferredMFA = function(e, t) {
              var n = this;
              return new Promise(function(r, i) {
                var o = !!t && t.bypassCache;
                e.getUserData(
                  function(e, t) {
                    if (e)
                      return (
                        os.debug("getting preferred mfa failed", e), void i(e)
                      );
                    var o = n._getMfaTypeFromUserData(t);
                    return o ? void r(o) : void i("invalid MFA Type");
                  },
                  { bypassCache: o }
                );
              });
            }),
            (e.prototype._getMfaTypeFromUserData = function(e) {
              var t = null,
                n = e.PreferredMfaSetting;
              if (n) t = n;
              else {
                var r = e.UserMFASettingList;
                if (r)
                  0 === r.length
                    ? (t = "NOMFA")
                    : os.debug("invalid case for getPreferredMFA", e);
                else t = e.MFAOptions ? "SMS_MFA" : "NOMFA";
              }
              return t;
            }),
            (e.prototype._getUserData = function(e, t) {
              return new Promise(function(n, r) {
                e.getUserData(function(e, t) {
                  return e
                    ? (os.debug("getting user data failed", e), void r(e))
                    : void n(t);
                }, t);
              });
            }),
            (e.prototype.setPreferredMFA = function(e, t) {
              return ns(this, void 0, void 0, function() {
                var n, r, o, s, a;
                return rs(this, function(u) {
                  switch (u.label) {
                    case 0:
                      return [4, this._getUserData(e, { bypassCache: !0 })];
                    case 1:
                      switch (((n = u.sent()), (r = null), (o = null), t)) {
                        case "TOTP":
                          return [3, 2];
                        case "SMS":
                          return [3, 3];
                        case "NOMFA":
                          return [3, 4];
                      }
                      return [3, 6];
                    case 2:
                      return (o = { PreferredMfa: !0, Enabled: !0 }), [3, 7];
                    case 3:
                      return (r = { PreferredMfa: !0, Enabled: !0 }), [3, 7];
                    case 4:
                      return (
                        (s = n.UserMFASettingList),
                        [4, this._getMfaTypeFromUserData(n)]
                      );
                    case 5:
                      if ("NOMFA" === (a = u.sent()))
                        return [2, Promise.resolve("No change for mfa type")];
                      if ("SMS_MFA" === a)
                        r = { PreferredMfa: !1, Enabled: !1 };
                      else {
                        if ("SOFTWARE_TOKEN_MFA" !== a)
                          return [2, this.rejectAuthError(i.InvalidMFA)];
                        o = { PreferredMfa: !1, Enabled: !1 };
                      }
                      return (
                        s &&
                          0 !== s.length &&
                          s.forEach(function(e) {
                            "SMS_MFA" === e
                              ? (r = { PreferredMfa: !1, Enabled: !1 })
                              : "SOFTWARE_TOKEN_MFA" === e &&
                                (o = { PreferredMfa: !1, Enabled: !1 });
                          }),
                        [3, 7]
                      );
                    case 6:
                      return (
                        os.debug("no validmfa method provided"),
                        [2, this.rejectAuthError(i.NoMFA)]
                      );
                    case 7:
                      return (
                        this,
                        [
                          2,
                          new Promise(function(t, n) {
                            e.setUserMfaPreference(r, o, function(r, i) {
                              if (r)
                                return (
                                  os.debug("Set user mfa preference error", r),
                                  n(r)
                                );
                              os.debug("Set user mfa success", i),
                                os.debug(
                                  "Caching the latest user data into local"
                                ),
                                e.getUserData(
                                  function(e, r) {
                                    return e
                                      ? (os.debug(
                                          "getting user data failed",
                                          e
                                        ),
                                        n(e))
                                      : t(i);
                                  },
                                  { bypassCache: !0 }
                                );
                            });
                          })
                        ]
                      );
                  }
                });
              });
            }),
            (e.prototype.disableSMS = function(e) {
              return new Promise(function(t, n) {
                e.disableMFA(function(e, r) {
                  if (e) return os.debug("disable mfa failed", e), void n(e);
                  os.debug("disable mfa succeed", r), t(r);
                });
              });
            }),
            (e.prototype.enableSMS = function(e) {
              return new Promise(function(t, n) {
                e.enableMFA(function(e, r) {
                  if (e) return os.debug("enable mfa failed", e), void n(e);
                  os.debug("enable mfa succeed", r), t(r);
                });
              });
            }),
            (e.prototype.setupTOTP = function(e) {
              return new Promise(function(t, n) {
                e.associateSoftwareToken({
                  onFailure: function(e) {
                    os.debug("associateSoftwareToken failed", e), n(e);
                  },
                  associateSecretCode: function(e) {
                    os.debug("associateSoftwareToken sucess", e), t(e);
                  }
                });
              });
            }),
            (e.prototype.verifyTotpToken = function(e, t) {
              return (
                os.debug("verfication totp token", e, t),
                new Promise(function(n, r) {
                  e.verifySoftwareToken(t, "My TOTP device", {
                    onFailure: function(e) {
                      os.debug("verifyTotpToken failed", e), r(e);
                    },
                    onSuccess: function(e) {
                      os.debug("verifyTotpToken success", e), n(e);
                    }
                  });
                })
              );
            }),
            (e.prototype.confirmSignIn = function(e, t, n, r) {
              var o = this;
              if ((void 0 === r && (r = this._config.clientMetadata), !t))
                return this.rejectAuthError(i.EmptyCode);
              var s = this;
              return new Promise(function(i, a) {
                e.sendMFACode(
                  t,
                  {
                    onSuccess: function(t) {
                      return ns(o, void 0, void 0, function() {
                        var n, r;
                        return rs(this, function(o) {
                          switch (o.label) {
                            case 0:
                              os.debug(t), (o.label = 1);
                            case 1:
                              return (
                                o.trys.push([1, 4, 5, 6]),
                                [4, this.Credentials.clear()]
                              );
                            case 2:
                              return (
                                o.sent(),
                                [4, this.Credentials.set(t, "session")]
                              );
                            case 3:
                              return (
                                (n = o.sent()),
                                os.debug(
                                  "succeed to get cognito credentials",
                                  n
                                ),
                                [3, 6]
                              );
                            case 4:
                              return (
                                (r = o.sent()),
                                os.debug("cannot get cognito credentials", r),
                                [3, 6]
                              );
                            case 5:
                              return (
                                (s.user = e),
                                as("signIn", e, e + " has signed in"),
                                i(e),
                                [7]
                              );
                            case 6:
                              return [2];
                          }
                        });
                      });
                    },
                    onFailure: function(e) {
                      os.debug("confirm signIn failure", e), a(e);
                    }
                  },
                  n,
                  r
                );
              });
            }),
            (e.prototype.completeNewPassword = function(e, t, n, r) {
              var o = this;
              if (
                (void 0 === n && (n = {}),
                void 0 === r && (r = this._config.clientMetadata),
                !t)
              )
                return this.rejectAuthError(i.EmptyPassword);
              var s = this;
              return new Promise(function(i, a) {
                e.completeNewPasswordChallenge(
                  t,
                  n,
                  {
                    onSuccess: function(t) {
                      return ns(o, void 0, void 0, function() {
                        var n, r;
                        return rs(this, function(o) {
                          switch (o.label) {
                            case 0:
                              os.debug(t), (o.label = 1);
                            case 1:
                              return (
                                o.trys.push([1, 4, 5, 6]),
                                [4, this.Credentials.clear()]
                              );
                            case 2:
                              return (
                                o.sent(),
                                [4, this.Credentials.set(t, "session")]
                              );
                            case 3:
                              return (
                                (n = o.sent()),
                                os.debug(
                                  "succeed to get cognito credentials",
                                  n
                                ),
                                [3, 6]
                              );
                            case 4:
                              return (
                                (r = o.sent()),
                                os.debug("cannot get cognito credentials", r),
                                [3, 6]
                              );
                            case 5:
                              return (
                                (s.user = e),
                                as("signIn", e, e + " has signed in"),
                                i(e),
                                [7]
                              );
                            case 6:
                              return [2];
                          }
                        });
                      });
                    },
                    onFailure: function(e) {
                      os.debug("completeNewPassword failure", e),
                        as(
                          "completeNewPassword_failure",
                          e,
                          o.user + " failed to complete the new password flow"
                        ),
                        a(e);
                    },
                    mfaRequired: function(t, n) {
                      os.debug("signIn MFA required"),
                        (e.challengeName = t),
                        (e.challengeParam = n),
                        i(e);
                    },
                    mfaSetup: function(t, n) {
                      os.debug("signIn mfa setup", t),
                        (e.challengeName = t),
                        (e.challengeParam = n),
                        i(e);
                    },
                    totpRequired: function(t, n) {
                      os.debug("signIn mfa setup", t),
                        (e.challengeName = t),
                        (e.challengeParam = n),
                        i(e);
                    }
                  },
                  r
                );
              });
            }),
            (e.prototype.sendCustomChallengeAnswer = function(e, t, n) {
              var r = this;
              if (
                (void 0 === n && (n = this._config.clientMetadata),
                !this.userPool)
              )
                return this.rejectNoUserPool();
              if (!t) return this.rejectAuthError(i.EmptyChallengeResponse);
              return new Promise(function(i, o) {
                e.sendCustomChallengeAnswer(t, r.authCallbacks(e, i, o), n);
              });
            }),
            (e.prototype.updateUserAttributes = function(e, t, n) {
              void 0 === n && (n = this._config.clientMetadata);
              var r = [],
                i = this;
              return new Promise(function(o, s) {
                i.userSession(e).then(function(i) {
                  for (var a in t)
                    if ("sub" !== a && a.indexOf("_verified") < 0) {
                      var u = { Name: a, Value: t[a] };
                      r.push(u);
                    }
                  e.updateAttributes(
                    r,
                    function(e, t) {
                      return e ? s(e) : o(t);
                    },
                    n
                  );
                });
              });
            }),
            (e.prototype.userAttributes = function(e) {
              var t = this;
              return new Promise(function(n, r) {
                t.userSession(e).then(function(t) {
                  e.getUserAttributes(function(e, t) {
                    e ? r(e) : n(t);
                  });
                });
              });
            }),
            (e.prototype.verifiedContact = function(e) {
              var t = this;
              return this.userAttributes(e).then(function(e) {
                var n = t.attributesToObject(e),
                  r = {},
                  i = {};
                return (
                  n.email &&
                    (n.email_verified
                      ? (i.email = n.email)
                      : (r.email = n.email)),
                  n.phone_number &&
                    (n.phone_number_verified
                      ? (i.phone_number = n.phone_number)
                      : (r.phone_number = n.phone_number)),
                  { verified: i, unverified: r }
                );
              });
            }),
            (e.prototype.currentUserPoolUser = function(e) {
              var t = this;
              return this.userPool
                ? new Promise(function(n, r) {
                    t._storageSync
                      .then(function() {
                        return ns(t, void 0, void 0, function() {
                          var t,
                            i = this;
                          return rs(this, function(o) {
                            switch (o.label) {
                              case 0:
                                return this.isOAuthInProgress()
                                  ? (os.debug(
                                      "OAuth signIn in progress, waiting for resolution..."
                                    ),
                                    [
                                      4,
                                      new Promise(function(e) {
                                        var t = setTimeout(function() {
                                          os.debug(
                                            "OAuth signIn in progress timeout"
                                          ),
                                            y.remove("auth", n),
                                            e();
                                        }, 1e4);
                                        function n(r) {
                                          var i = r.payload.event;
                                          ("cognitoHostedUI" !== i &&
                                            "cognitoHostedUI_failure" !== i) ||
                                            (os.debug(
                                              "OAuth signIn resolved: " + i
                                            ),
                                            clearTimeout(t),
                                            y.remove("auth", n),
                                            e());
                                        }
                                        y.listen("auth", n);
                                      })
                                    ])
                                  : [3, 2];
                              case 1:
                                o.sent(), (o.label = 2);
                              case 2:
                                return (t = this.userPool.getCurrentUser())
                                  ? (t.getSession(function(o, s) {
                                      return ns(i, void 0, void 0, function() {
                                        var i,
                                          a,
                                          u = this;
                                        return rs(this, function(c) {
                                          switch (c.label) {
                                            case 0:
                                              return o
                                                ? (os.debug(
                                                    "Failed to get the user session",
                                                    o
                                                  ),
                                                  r(o),
                                                  [2])
                                                : (i = !!e && e.bypassCache)
                                                ? [4, this.Credentials.clear()]
                                                : [3, 2];
                                            case 1:
                                              c.sent(), (c.label = 2);
                                            case 2:
                                              return (
                                                (a = s
                                                  .getAccessToken()
                                                  .decodePayload().scope),
                                                (void 0 === a ? "" : a)
                                                  .split(" ")
                                                  .includes(
                                                    "aws.cognito.signin.user.admin"
                                                  )
                                                  ? (t.getUserData(
                                                      function(e, i) {
                                                        if (e)
                                                          return (
                                                            os.debug(
                                                              "getting user data failed",
                                                              e
                                                            ),
                                                            void ("User is disabled." ===
                                                              e.message ||
                                                            "User does not exist." ===
                                                              e.message ||
                                                            "Access Token has been revoked" ===
                                                              e.message
                                                              ? r(e)
                                                              : n(t))
                                                          );
                                                        for (
                                                          var o =
                                                              i.PreferredMfaSetting ||
                                                              "NOMFA",
                                                            s = [],
                                                            a = 0;
                                                          a <
                                                          i.UserAttributes
                                                            .length;
                                                          a++
                                                        ) {
                                                          var c = {
                                                              Name:
                                                                i
                                                                  .UserAttributes[
                                                                  a
                                                                ].Name,
                                                              Value:
                                                                i
                                                                  .UserAttributes[
                                                                  a
                                                                ].Value
                                                            },
                                                            f = new So(c);
                                                          s.push(f);
                                                        }
                                                        var l = u.attributesToObject(
                                                          s
                                                        );
                                                        return (
                                                          Object.assign(t, {
                                                            attributes: l,
                                                            preferredMFA: o
                                                          }),
                                                          n(t)
                                                        );
                                                      },
                                                      { bypassCache: i }
                                                    ),
                                                    [2])
                                                  : (os.debug(
                                                      "Unable to get the user data because the aws.cognito.signin.user.admin is not in the scopes of the access token"
                                                    ),
                                                    [2, n(t)])
                                              );
                                          }
                                        });
                                      });
                                    }),
                                    [2])
                                  : (os.debug(
                                      "Failed to get user from user pool"
                                    ),
                                    r("No current user"),
                                    [2]);
                            }
                          });
                        });
                      })
                      .catch(function(e) {
                        return (
                          os.debug("Failed to sync cache info into memory", e),
                          r(e)
                        );
                      });
                  })
                : this.rejectNoUserPool();
            }),
            (e.prototype.isOAuthInProgress = function() {
              return this.oAuthFlowInProgress;
            }),
            (e.prototype.currentAuthenticatedUser = function(e) {
              return ns(this, void 0, void 0, function() {
                var t, n, r, i;
                return rs(this, function(o) {
                  switch (o.label) {
                    case 0:
                      os.debug("getting current authenticated user"),
                        (t = null),
                        (o.label = 1);
                    case 1:
                      return o.trys.push([1, 3, , 4]), [4, this._storageSync];
                    case 2:
                      return o.sent(), [3, 4];
                    case 3:
                      throw ((n = o.sent()),
                      os.debug("Failed to sync cache info into memory", n),
                      n);
                    case 4:
                      try {
                        t = JSON.parse(
                          this._storage.getItem("aws-amplify-federatedInfo")
                        ).user;
                      } catch (e) {
                        os.debug(
                          "cannot load federated user from auth storage"
                        );
                      }
                      return t
                        ? ((this.user = t),
                          os.debug(
                            "get current authenticated federated user",
                            this.user
                          ),
                          [2, this.user])
                        : [3, 5];
                    case 5:
                      os.debug("get current authenticated userpool user"),
                        (r = null),
                        (o.label = 6);
                    case 6:
                      return (
                        o.trys.push([6, 8, , 9]),
                        [4, this.currentUserPoolUser(e)]
                      );
                    case 7:
                      return (r = o.sent()), [3, 9];
                    case 8:
                      throw ("No userPool" === (i = o.sent()) &&
                        os.error(
                          "Cannot get the current user because the user pool is missing. Please make sure the Auth module is configured with a valid Cognito User Pool ID"
                        ),
                      os.debug("The user is not authenticated by the error", i),
                      "not authenticated");
                    case 9:
                      return (this.user = r), [2, this.user];
                  }
                });
              });
            }),
            (e.prototype.currentSession = function() {
              var e = this;
              return (
                os.debug("Getting current session"),
                this.userPool
                  ? new Promise(function(t, n) {
                      e.currentUserPoolUser()
                        .then(function(r) {
                          e.userSession(r)
                            .then(function(e) {
                              t(e);
                            })
                            .catch(function(e) {
                              os.debug("Failed to get the current session", e),
                                n(e);
                            });
                        })
                        .catch(function(e) {
                          os.debug("Failed to get the current user", e), n(e);
                        });
                    })
                  : Promise.reject()
              );
            }),
            (e.prototype.userSession = function(e) {
              return e
                ? new Promise(function(t, n) {
                    os.debug("Getting the session from this user:", e),
                      e.getSession(function(r, i) {
                        return r
                          ? (os.debug("Failed to get the session from user", e),
                            void n(r))
                          : (os.debug("Succeed to get the user session", i),
                            void t(i));
                      });
                  })
                : (os.debug("the user is null"),
                  this.rejectAuthError(i.NoUserSession));
            }),
            (e.prototype.currentUserCredentials = function() {
              return ns(this, void 0, void 0, function() {
                var e,
                  t,
                  n = this;
                return rs(this, function(r) {
                  switch (r.label) {
                    case 0:
                      this,
                        os.debug("Getting current user credentials"),
                        (r.label = 1);
                    case 1:
                      return r.trys.push([1, 3, , 4]), [4, this._storageSync];
                    case 2:
                      return r.sent(), [3, 4];
                    case 3:
                      throw ((e = r.sent()),
                      os.debug("Failed to sync cache info into memory", e),
                      e);
                    case 4:
                      t = null;
                      try {
                        t = JSON.parse(
                          this._storage.getItem("aws-amplify-federatedInfo")
                        );
                      } catch (e) {
                        os.debug(
                          "failed to get or parse item aws-amplify-federatedInfo",
                          e
                        );
                      }
                      return t
                        ? [2, this.Credentials.refreshFederatedToken(t)]
                        : [
                            2,
                            this.currentSession()
                              .then(function(e) {
                                return (
                                  os.debug("getting session success", e),
                                  n.Credentials.set(e, "session")
                                );
                              })
                              .catch(function(e) {
                                return (
                                  os.debug("getting session failed", e),
                                  n.Credentials.set(null, "guest")
                                );
                              })
                          ];
                  }
                });
              });
            }),
            (e.prototype.currentCredentials = function() {
              return (
                os.debug("getting current credentials"), this.Credentials.get()
              );
            }),
            (e.prototype.verifyUserAttribute = function(e, t, n) {
              return (
                void 0 === n && (n = this._config.clientMetadata),
                new Promise(function(r, i) {
                  e.getAttributeVerificationCode(t, {
                    onSuccess: function() {
                      return r();
                    },
                    onFailure: function(e) {
                      return i(e);
                    },
                    clientMetadata: n
                  });
                })
              );
            }),
            (e.prototype.verifyUserAttributeSubmit = function(e, t, n) {
              return n
                ? new Promise(function(r, i) {
                    e.verifyAttribute(t, n, {
                      onSuccess: function(e) {
                        r(e);
                      },
                      onFailure: function(e) {
                        i(e);
                      }
                    });
                  })
                : this.rejectAuthError(i.EmptyCode);
            }),
            (e.prototype.verifyCurrentUserAttribute = function(e) {
              var t = this;
              return t.currentUserPoolUser().then(function(n) {
                return t.verifyUserAttribute(n, e);
              });
            }),
            (e.prototype.verifyCurrentUserAttributeSubmit = function(e, t) {
              var n = this;
              return n.currentUserPoolUser().then(function(r) {
                return n.verifyUserAttributeSubmit(r, e, t);
              });
            }),
            (e.prototype.cognitoIdentitySignOut = function(e, t) {
              return ns(this, void 0, void 0, function() {
                var n,
                  r,
                  i = this;
                return rs(this, function(o) {
                  switch (o.label) {
                    case 0:
                      return o.trys.push([0, 2, , 3]), [4, this._storageSync];
                    case 1:
                      return o.sent(), [3, 3];
                    case 2:
                      throw ((n = o.sent()),
                      os.debug("Failed to sync cache info into memory", n),
                      n);
                    case 3:
                      return (
                        (r =
                          this._oAuthHandler &&
                          "true" ===
                            this._storage.getItem(
                              "amplify-signin-with-hostedUI"
                            )),
                        [
                          2,
                          new Promise(function(n, o) {
                            if (e && e.global)
                              os.debug("user global sign out", t),
                                t.getSession(function(e, s) {
                                  if (e)
                                    return (
                                      os.debug(
                                        "failed to get the user session",
                                        e
                                      ),
                                      o(e)
                                    );
                                  t.globalSignOut({
                                    onSuccess: function(e) {
                                      if (
                                        (os.debug("global sign out success"),
                                        !r)
                                      )
                                        return n();
                                      i.oAuthSignOutRedirect(n, o);
                                    },
                                    onFailure: function(e) {
                                      return (
                                        os.debug("global sign out failed", e),
                                        o(e)
                                      );
                                    }
                                  });
                                });
                            else {
                              if (
                                (os.debug("user sign out", t), t.signOut(), !r)
                              )
                                return n();
                              i.oAuthSignOutRedirect(n, o);
                            }
                          })
                        ]
                      );
                  }
                });
              });
            }),
            (e.prototype.oAuthSignOutRedirect = function(e, t) {
              w.a.browserOrNode().isBrowser
                ? this.oAuthSignOutRedirectOrReject(t)
                : this.oAuthSignOutAndResolve(e);
            }),
            (e.prototype.oAuthSignOutAndResolve = function(e) {
              this._oAuthHandler.signOut(), e();
            }),
            (e.prototype.oAuthSignOutRedirectOrReject = function(e) {
              this._oAuthHandler.signOut(),
                setTimeout(function() {
                  return e("Signout timeout fail");
                }, 3e3);
            }),
            (e.prototype.signOut = function(e) {
              return ns(this, void 0, void 0, function() {
                var t;
                return rs(this, function(n) {
                  switch (n.label) {
                    case 0:
                      return (
                        n.trys.push([0, 2, , 3]), [4, this.cleanCachedItems()]
                      );
                    case 1:
                      return n.sent(), [3, 3];
                    case 2:
                      return (
                        n.sent(),
                        os.debug("failed to clear cached items"),
                        [3, 3]
                      );
                    case 3:
                      return this.userPool
                        ? (t = this.userPool.getCurrentUser())
                          ? [4, this.cognitoIdentitySignOut(e, t)]
                          : [3, 5]
                        : [3, 7];
                    case 4:
                      return n.sent(), [3, 6];
                    case 5:
                      os.debug("no current Cognito user"), (n.label = 6);
                    case 6:
                      return [3, 8];
                    case 7:
                      os.debug("no Congito User pool"), (n.label = 8);
                    case 8:
                      return (
                        as("signOut", this.user, "A user has been signed out"),
                        (this.user = null),
                        [2]
                      );
                  }
                });
              });
            }),
            (e.prototype.cleanCachedItems = function() {
              return ns(this, void 0, void 0, function() {
                return rs(this, function(e) {
                  switch (e.label) {
                    case 0:
                      return [4, this.Credentials.clear()];
                    case 1:
                      return e.sent(), [2];
                  }
                });
              });
            }),
            (e.prototype.changePassword = function(e, t, n, r) {
              var i = this;
              return (
                void 0 === r && (r = this._config.clientMetadata),
                new Promise(function(o, s) {
                  i.userSession(e).then(function(i) {
                    e.changePassword(
                      t,
                      n,
                      function(e, t) {
                        return e
                          ? (os.debug("change password failure", e), s(e))
                          : o(t);
                      },
                      r
                    );
                  });
                })
              );
            }),
            (e.prototype.forgotPassword = function(e, t) {
              if (
                (void 0 === t && (t = this._config.clientMetadata),
                !this.userPool)
              )
                return this.rejectNoUserPool();
              if (!e) return this.rejectAuthError(i.EmptyUsername);
              var n = this.createCognitoUser(e);
              return new Promise(function(r, i) {
                n.forgotPassword(
                  {
                    onSuccess: function() {
                      r();
                    },
                    onFailure: function(t) {
                      os.debug("forgot password failure", t),
                        as(
                          "forgotPassword_failure",
                          t,
                          e + " forgotPassword failed"
                        ),
                        i(t);
                    },
                    inputVerificationCode: function(t) {
                      as(
                        "forgotPassword",
                        n,
                        e + " has initiated forgot password flow"
                      ),
                        r(t);
                    }
                  },
                  t
                );
              });
            }),
            (e.prototype.forgotPasswordSubmit = function(e, t, n, r) {
              if (
                (void 0 === r && (r = this._config.clientMetadata),
                !this.userPool)
              )
                return this.rejectNoUserPool();
              if (!e) return this.rejectAuthError(i.EmptyUsername);
              if (!t) return this.rejectAuthError(i.EmptyCode);
              if (!n) return this.rejectAuthError(i.EmptyPassword);
              var o = this.createCognitoUser(e);
              return new Promise(function(i, s) {
                o.confirmPassword(
                  t,
                  n,
                  {
                    onSuccess: function() {
                      as(
                        "forgotPasswordSubmit",
                        o,
                        e + " forgotPasswordSubmit successful"
                      ),
                        i();
                    },
                    onFailure: function(t) {
                      as(
                        "forgotPasswordSubmit_failure",
                        t,
                        e + " forgotPasswordSubmit failed"
                      ),
                        s(t);
                    }
                  },
                  r
                );
              });
            }),
            (e.prototype.currentUserInfo = function() {
              return ns(this, void 0, void 0, function() {
                var e, t, n, r, i, o, s;
                return rs(this, function(a) {
                  switch (a.label) {
                    case 0:
                      return (e = this.Credentials.getCredSource()) &&
                        "aws" !== e &&
                        "userPool" !== e
                        ? [3, 9]
                        : [
                            4,
                            this.currentUserPoolUser().catch(function(e) {
                              return os.debug(e);
                            })
                          ];
                    case 1:
                      if (!(s = a.sent())) return [2, null];
                      a.label = 2;
                    case 2:
                      return (
                        a.trys.push([2, 8, , 9]), [4, this.userAttributes(s)]
                      );
                    case 3:
                      (t = a.sent()),
                        (n = this.attributesToObject(t)),
                        (r = null),
                        (a.label = 4);
                    case 4:
                      return (
                        a.trys.push([4, 6, , 7]), [4, this.currentCredentials()]
                      );
                    case 5:
                      return (r = a.sent()), [3, 7];
                    case 6:
                      return (
                        (i = a.sent()),
                        os.debug(
                          "Failed to retrieve credentials while getting current user info",
                          i
                        ),
                        [3, 7]
                      );
                    case 7:
                      return [
                        2,
                        {
                          id: r ? r.identityId : void 0,
                          username: s.getUsername(),
                          attributes: n
                        }
                      ];
                    case 8:
                      return (
                        (o = a.sent()),
                        os.debug("currentUserInfo error", o),
                        [2, {}]
                      );
                    case 9:
                      return "federated" === e
                        ? [2, (s = this.user) || {}]
                        : [2];
                  }
                });
              });
            }),
            (e.prototype.federatedSignIn = function(e, t, n) {
              return ns(this, void 0, void 0, function() {
                var i, a, u, c, f, l, h, d, p, g, y;
                return rs(this, function(v) {
                  switch (v.label) {
                    case 0:
                      if (
                        !this._config.identityPoolId &&
                        !this._config.userPoolId
                      )
                        throw new Error(
                          "Federation requires either a User Pool or Identity Pool in config"
                        );
                      if (
                        void 0 === e &&
                        this._config.identityPoolId &&
                        !this._config.userPoolId
                      )
                        throw new Error(
                          "Federation with Identity Pools requires tokens passed as arguments"
                        );
                      return o(e) ||
                        ((m = e) &&
                          ["customProvider"].find(function(e) {
                            return m.hasOwnProperty(e);
                          })) ||
                        (function(e) {
                          return (
                            e &&
                            !!["customState"].find(function(t) {
                              return e.hasOwnProperty(t);
                            })
                          );
                        })(e) ||
                        void 0 === e
                        ? ((i = e || { provider: r.Cognito }),
                          (f = o(i) ? i.provider : i.customProvider),
                          o(i),
                          (a = i.customState),
                          this._config.userPoolId &&
                            ((u = s(this._config.oauth)
                              ? this._config.userPoolWebClientId
                              : this._config.oauth.clientID),
                            (c = s(this._config.oauth)
                              ? this._config.oauth.redirectSignIn
                              : this._config.oauth.redirectUri),
                            this._oAuthHandler.oauthSignIn(
                              this._config.oauth.responseType,
                              this._config.oauth.domain,
                              c,
                              u,
                              f,
                              a
                            )),
                          [3, 4])
                        : [3, 1];
                    case 1:
                      f = e;
                      try {
                        (l = JSON.stringify(
                          JSON.parse(
                            this._storage.getItem("aws-amplify-federatedInfo")
                          ).user
                        )) &&
                          os.warn(
                            "There is already a signed in user: " +
                              l +
                              " in your app.\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tYou should not call Auth.federatedSignIn method again as it may cause unexpected behavior."
                          );
                      } catch (e) {}
                      return (
                        (h = t.token),
                        (d = t.identity_id),
                        (p = t.expires_at),
                        [
                          4,
                          this.Credentials.set(
                            {
                              provider: f,
                              token: h,
                              identity_id: d,
                              user: n,
                              expires_at: p
                            },
                            "federation"
                          )
                        ]
                      );
                    case 2:
                      return (
                        (g = v.sent()), [4, this.currentAuthenticatedUser()]
                      );
                    case 3:
                      return (
                        (y = v.sent()),
                        as(
                          "signIn",
                          y,
                          "A user " + y.username + " has been signed in"
                        ),
                        os.debug("federated sign in credentials", g),
                        [2, g]
                      );
                    case 4:
                      return [2];
                  }
                  var m;
                });
              });
            }),
            (e.prototype._handleAuthResponse = function(e) {
              return ns(this, void 0, void 0, function() {
                var t, n, r, i, o, s, a, u, c, f, l, h, d, p;
                return rs(this, function(g) {
                  switch (g.label) {
                    case 0:
                      if (this.oAuthFlowInProgress)
                        return (
                          os.debug(
                            "Skipping URL " + e + " current flow in progress"
                          ),
                          [2]
                        );
                      g.label = 1;
                    case 1:
                      if (
                        (g.trys.push([1, , 8, 9]),
                        (this.oAuthFlowInProgress = !0),
                        !this._config.userPoolId)
                      )
                        throw new Error(
                          "OAuth responses require a User Pool defined in config"
                        );
                      if (
                        (as(
                          "parsingCallbackUrl",
                          { url: e },
                          "The callback url is being parsed"
                        ),
                        (t =
                          e ||
                          (w.a.browserOrNode().isBrowser
                            ? window.location.href
                            : "")),
                        (n = !!(Object(qo.parse)(t).query || "")
                          .split("&")
                          .map(function(e) {
                            return e.split("=");
                          })
                          .find(function(e) {
                            var t = is(e, 1)[0];
                            return "code" === t || "error" === t;
                          })),
                        (r = !!(Object(qo.parse)(t).hash || "#")
                          .substr(1)
                          .split("&")
                          .map(function(e) {
                            return e.split("=");
                          })
                          .find(function(e) {
                            var t = is(e, 1)[0];
                            return "access_token" === t || "error" === t;
                          })),
                        !n && !r)
                      )
                        return [3, 7];
                      this._storage.setItem(
                        "amplify-redirected-from-hosted-ui",
                        "true"
                      ),
                        (g.label = 2);
                    case 2:
                      return (
                        g.trys.push([2, 6, , 7]),
                        [4, this._oAuthHandler.handleAuthResponse(t)]
                      );
                    case 3:
                      return (
                        (i = g.sent()),
                        (o = i.accessToken),
                        (s = i.idToken),
                        (a = i.refreshToken),
                        (u = i.state),
                        (c = new mo({
                          IdToken: new po({ IdToken: s }),
                          RefreshToken: new go({ RefreshToken: a }),
                          AccessToken: new ho({ AccessToken: o })
                        })),
                        (f = void 0),
                        this._config.identityPoolId
                          ? [4, this.Credentials.set(c, "session")]
                          : [3, 5]
                      );
                    case 4:
                      (f = g.sent()),
                        os.debug("AWS credentials", f),
                        (g.label = 5);
                    case 5:
                      return (
                        (l = /-/.test(u)),
                        (h = this.createCognitoUser(
                          c.getIdToken().decodePayload()["cognito:username"]
                        )).setSignInUserSession(c),
                        window &&
                          void 0 !== window.history &&
                          window.history.replaceState(
                            {},
                            null,
                            this._config.oauth.redirectSignIn
                          ),
                        as(
                          "signIn",
                          h,
                          "A user " + h.getUsername() + " has been signed in"
                        ),
                        as(
                          "cognitoHostedUI",
                          h,
                          "A user " +
                            h.getUsername() +
                            " has been signed in via Cognito Hosted UI"
                        ),
                        l &&
                          ((d = u
                            .split("-")
                            .splice(1)
                            .join("-")),
                          as(
                            "customOAuthState",
                            d,
                            "State for user " + h.getUsername()
                          )),
                        [2, f]
                      );
                    case 6:
                      return (
                        (p = g.sent()),
                        os.debug("Error in cognito hosted auth response", p),
                        as(
                          "signIn_failure",
                          p,
                          "The OAuth response flow failed"
                        ),
                        as(
                          "cognitoHostedUI_failure",
                          p,
                          "A failure occurred when returning to the Cognito Hosted UI"
                        ),
                        as(
                          "customState_failure",
                          p,
                          "A failure occurred when returning state"
                        ),
                        [3, 7]
                      );
                    case 7:
                      return [3, 9];
                    case 8:
                      return (this.oAuthFlowInProgress = !1), [7];
                    case 9:
                      return [2];
                  }
                });
              });
            }),
            (e.prototype.essentialCredentials = function(e) {
              return {
                accessKeyId: e.accessKeyId,
                sessionToken: e.sessionToken,
                secretAccessKey: e.secretAccessKey,
                identityId: e.identityId,
                authenticated: e.authenticated
              };
            }),
            (e.prototype.attributesToObject = function(e) {
              var t = {};
              return (
                e &&
                  e.map(function(e) {
                    "email_verified" === e.Name ||
                    "phone_number_verified" === e.Name
                      ? (t[e.Name] = "true" === e.Value || !0 === e.Value)
                      : (t[e.Name] = e.Value);
                  }),
                t
              );
            }),
            (e.prototype.createCognitoUser = function(e) {
              var t = { Username: e, Pool: this.userPool };
              t.Storage = this._storage;
              var n = this._config.authenticationFlowType,
                r = new Co(t);
              return n && r.setAuthenticationFlowType(n), r;
            }),
            (e.prototype._isValidAuthStorage = function(e) {
              return (
                !!e &&
                "function" == typeof e.getItem &&
                "function" == typeof e.setItem &&
                "function" == typeof e.removeItem &&
                "function" == typeof e.clear
              );
            }),
            (e.prototype.noUserPoolErrorHandler = function(e) {
              return !e || (e.userPoolId && e.identityPoolId)
                ? i.NoConfig
                : i.MissingAuthConfig;
            }),
            (e.prototype.rejectAuthError = function(e) {
              return Promise.reject(new Zo(e));
            }),
            (e.prototype.rejectNoUserPool = function() {
              var e = this.noUserPoolErrorHandler(this._config);
              return Promise.reject(new es(e));
            }),
            e
          );
        })())(null);
      G.register(us);
      var cs = us,
        fs = {
          keyPrefix: "aws-amplify-cache",
          capacityInBytes: 1048576,
          itemMaxSize: 21e4,
          defaultTTL: 2592e5,
          defaultPriority: 5,
          warningThreshold: 0.8,
          storage: new b().getStorage()
        };
      function ls(e) {
        var t = 0;
        t = e.length;
        for (var n = e.length; n >= 0; n -= 1) {
          var r = e.charCodeAt(n);
          r > 127 && r <= 2047 ? (t += 1) : r > 2047 && r <= 65535 && (t += 2),
            r >= 56320 && r <= 57343 && (n -= 1);
        }
        return t;
      }
      function hs() {
        return new Date().getTime();
      }
      function ds(e) {
        return Number.isInteger
          ? Number.isInteger(e)
          : (function(e) {
              return "number" == typeof e && isFinite(e) && Math.floor(e) === e;
            })(e);
      }
      var ps = {},
        gs =
          ((function() {
            function e() {}
            (e.clear = function() {
              ps = {};
            }),
              (e.getItem = function(e) {
                return ps[e] || null;
              }),
              (e.setItem = function(e, t) {
                ps[e] = t;
              }),
              (e.removeItem = function(e) {
                delete ps[e];
              });
          })(),
          new f("StorageCache")),
        ys = (function() {
          function e(e) {
            (this.config = Object.assign({}, e)),
              (this.cacheCurSizeKey = this.config.keyPrefix + "CurSize"),
              this.checkConfig();
          }
          return (
            (e.prototype.getModuleName = function() {
              return "Cache";
            }),
            (e.prototype.checkConfig = function() {
              ds(this.config.capacityInBytes) ||
                (gs.error(
                  "Invalid parameter: capacityInBytes. It should be an Integer. Setting back to default."
                ),
                (this.config.capacityInBytes = fs.capacityInBytes)),
                ds(this.config.itemMaxSize) ||
                  (gs.error(
                    "Invalid parameter: itemMaxSize. It should be an Integer. Setting back to default."
                  ),
                  (this.config.itemMaxSize = fs.itemMaxSize)),
                ds(this.config.defaultTTL) ||
                  (gs.error(
                    "Invalid parameter: defaultTTL. It should be an Integer. Setting back to default."
                  ),
                  (this.config.defaultTTL = fs.defaultTTL)),
                ds(this.config.defaultPriority) ||
                  (gs.error(
                    "Invalid parameter: defaultPriority. It should be an Integer. Setting back to default."
                  ),
                  (this.config.defaultPriority = fs.defaultPriority)),
                this.config.itemMaxSize > this.config.capacityInBytes &&
                  (gs.error(
                    "Invalid parameter: itemMaxSize. It should be smaller than capacityInBytes. Setting back to default."
                  ),
                  (this.config.itemMaxSize = fs.itemMaxSize)),
                (this.config.defaultPriority > 5 ||
                  this.config.defaultPriority < 1) &&
                  (gs.error(
                    "Invalid parameter: defaultPriority. It should be between 1 and 5. Setting back to default."
                  ),
                  (this.config.defaultPriority = fs.defaultPriority)),
                (Number(this.config.warningThreshold) > 1 ||
                  Number(this.config.warningThreshold) < 0) &&
                  (gs.error(
                    "Invalid parameter: warningThreshold. It should be between 0 and 1. Setting back to default."
                  ),
                  (this.config.warningThreshold = fs.warningThreshold));
              this.config.capacityInBytes > 5242880 &&
                (gs.error(
                  "Cache Capacity should be less than 5MB. Setting back to default. Setting back to default."
                ),
                (this.config.capacityInBytes = fs.capacityInBytes));
            }),
            (e.prototype.fillCacheItem = function(e, t, n) {
              var r = {
                key: e,
                data: t,
                timestamp: hs(),
                visitedTime: hs(),
                priority: n.priority,
                expires: n.expires,
                type: typeof t,
                byteSize: 0
              };
              return (
                (r.byteSize = ls(JSON.stringify(r))),
                (r.byteSize = ls(JSON.stringify(r))),
                r
              );
            }),
            (e.prototype.configure = function(e) {
              return e
                ? (e.keyPrefix && gs.warn("Don't try to configure keyPrefix!"),
                  (this.config = Object.assign({}, this.config, e, e.Cache)),
                  this.checkConfig(),
                  this.config)
                : this.config;
            }),
            e
          );
        })(),
        vs = (function() {
          var e = function(t, n) {
            return (e =
              Object.setPrototypeOf ||
              ({ __proto__: [] } instanceof Array &&
                function(e, t) {
                  e.__proto__ = t;
                }) ||
              function(e, t) {
                for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
              })(t, n);
          };
          return function(t, n) {
            function r() {
              this.constructor = t;
            }
            e(t, n),
              (t.prototype =
                null === n
                  ? Object.create(n)
                  : ((r.prototype = n.prototype), new r()));
          };
        })(),
        ms = new f("Cache"),
        bs = new ((function(e) {
          function t(t) {
            var n = this,
              r = t ? Object.assign({}, fs, t) : fs;
            return (
              ((n = e.call(this, r) || this).config.storage = r.storage),
              (n.getItem = n.getItem.bind(n)),
              (n.setItem = n.setItem.bind(n)),
              (n.removeItem = n.removeItem.bind(n)),
              n
            );
          }
          return (
            vs(t, e),
            (t.prototype._decreaseCurSizeInBytes = function(e) {
              var t = this.getCacheCurSize();
              this.config.storage.setItem(
                this.cacheCurSizeKey,
                (t - e).toString()
              );
            }),
            (t.prototype._increaseCurSizeInBytes = function(e) {
              var t = this.getCacheCurSize();
              this.config.storage.setItem(
                this.cacheCurSizeKey,
                (t + e).toString()
              );
            }),
            (t.prototype._refreshItem = function(e, t) {
              return (
                (e.visitedTime = hs()),
                this.config.storage.setItem(t, JSON.stringify(e)),
                e
              );
            }),
            (t.prototype._isExpired = function(e) {
              var t = this.config.storage.getItem(e),
                n = JSON.parse(t);
              return hs() >= n.expires;
            }),
            (t.prototype._removeItem = function(e, t) {
              var n = t || JSON.parse(this.config.storage.getItem(e)).byteSize;
              this._decreaseCurSizeInBytes(n),
                this.config.storage.removeItem(e);
            }),
            (t.prototype._setItem = function(e, t) {
              this._increaseCurSizeInBytes(t.byteSize);
              try {
                this.config.storage.setItem(e, JSON.stringify(t));
              } catch (e) {
                this._decreaseCurSizeInBytes(t.byteSize),
                  ms.error("Failed to set item " + e);
              }
            }),
            (t.prototype._sizeToPop = function(e) {
              var t = this.getCacheCurSize() + e - this.config.capacityInBytes,
                n =
                  (1 - this.config.warningThreshold) *
                  this.config.capacityInBytes;
              return t > n ? t : n;
            }),
            (t.prototype._isCacheFull = function(e) {
              return e + this.getCacheCurSize() > this.config.capacityInBytes;
            }),
            (t.prototype._findValidKeys = function() {
              for (
                var e = [], t = [], n = 0;
                n < this.config.storage.length;
                n += 1
              )
                t.push(this.config.storage.key(n));
              for (n = 0; n < t.length; n += 1) {
                var r = t[n];
                0 === r.indexOf(this.config.keyPrefix) &&
                  r !== this.cacheCurSizeKey &&
                  (this._isExpired(r) ? this._removeItem(r) : e.push(r));
              }
              return e;
            }),
            (t.prototype._popOutItems = function(e, t) {
              for (var n = [], r = t, i = 0; i < e.length; i += 1) {
                var o = this.config.storage.getItem(e[i]);
                if (null != o) {
                  var s = JSON.parse(o);
                  n.push(s);
                }
              }
              n.sort(function(e, t) {
                return e.priority > t.priority
                  ? -1
                  : e.priority < t.priority
                  ? 1
                  : e.visitedTime < t.visitedTime
                  ? -1
                  : 1;
              });
              for (i = 0; i < n.length; i += 1)
                if (
                  (this._removeItem(n[i].key, n[i].byteSize),
                  (r -= n[i].byteSize) <= 0)
                )
                  return;
            }),
            (t.prototype.setItem = function(e, t, n) {
              ms.log(
                "Set item: key is " +
                  e +
                  ", value is " +
                  t +
                  " with options: " +
                  n
              );
              var r = this.config.keyPrefix + e;
              if (r !== this.config.keyPrefix && r !== this.cacheCurSizeKey)
                if (void 0 !== t) {
                  var i = {
                    priority:
                      n && void 0 !== n.priority
                        ? n.priority
                        : this.config.defaultPriority,
                    expires:
                      n && void 0 !== n.expires
                        ? n.expires
                        : this.config.defaultTTL + hs()
                  };
                  if (i.priority < 1 || i.priority > 5)
                    ms.warn(
                      "Invalid parameter: priority due to out or range. It should be within 1 and 5."
                    );
                  else {
                    var o = this.fillCacheItem(r, t, i);
                    if (o.byteSize > this.config.itemMaxSize)
                      ms.warn(
                        "Item with key: " +
                          e +
                          " you are trying to put into is too big!"
                      );
                    else
                      try {
                        var s = this.config.storage.getItem(r);
                        if (
                          (s && this._removeItem(r, JSON.parse(s).byteSize),
                          this._isCacheFull(o.byteSize))
                        ) {
                          var a = this._findValidKeys();
                          if (this._isCacheFull(o.byteSize)) {
                            var u = this._sizeToPop(o.byteSize);
                            this._popOutItems(a, u);
                          }
                        }
                        this._setItem(r, o);
                      } catch (e) {
                        ms.warn("setItem failed! " + e);
                      }
                  }
                } else ms.warn("The value of item should not be undefined!");
              else ms.warn("Invalid key: should not be empty or 'CurSize'");
            }),
            (t.prototype.getItem = function(e, t) {
              ms.log("Get item: key is " + e + " with options " + t);
              var n = null,
                r = this.config.keyPrefix + e;
              if (r === this.config.keyPrefix || r === this.cacheCurSizeKey)
                return (
                  ms.warn("Invalid key: should not be empty or 'CurSize'"), null
                );
              try {
                if (null != (n = this.config.storage.getItem(r))) {
                  if (!this._isExpired(r)) {
                    var i = JSON.parse(n);
                    return (i = this._refreshItem(i, r)).data;
                  }
                  this._removeItem(r, JSON.parse(n).byteSize), (n = null);
                }
                if (t && void 0 !== t.callback) {
                  var o = t.callback();
                  return null !== o && this.setItem(e, o, t), o;
                }
                return null;
              } catch (e) {
                return ms.warn("getItem failed! " + e), null;
              }
            }),
            (t.prototype.removeItem = function(e) {
              ms.log("Remove item: key is " + e);
              var t = this.config.keyPrefix + e;
              if (t !== this.config.keyPrefix && t !== this.cacheCurSizeKey)
                try {
                  var n = this.config.storage.getItem(t);
                  n && this._removeItem(t, JSON.parse(n).byteSize);
                } catch (e) {
                  ms.warn("removeItem failed! " + e);
                }
            }),
            (t.prototype.clear = function() {
              ms.log("Clear Cache");
              for (var e = [], t = 0; t < this.config.storage.length; t += 1) {
                var n = this.config.storage.key(t);
                0 === n.indexOf(this.config.keyPrefix) && e.push(n);
              }
              try {
                for (t = 0; t < e.length; t += 1)
                  this.config.storage.removeItem(e[t]);
              } catch (e) {
                ms.warn("clear failed! " + e);
              }
            }),
            (t.prototype.getAllKeys = function() {
              for (var e = [], t = 0; t < this.config.storage.length; t += 1) {
                var n = this.config.storage.key(t);
                0 === n.indexOf(this.config.keyPrefix) &&
                  n !== this.cacheCurSizeKey &&
                  e.push(n.substring(this.config.keyPrefix.length));
              }
              return e;
            }),
            (t.prototype.getCacheCurSize = function() {
              var e = this.config.storage.getItem(this.cacheCurSizeKey);
              return (
                e ||
                  (this.config.storage.setItem(this.cacheCurSizeKey, "0"),
                  (e = "0")),
                Number(e)
              );
            }),
            (t.prototype.createInstance = function(e) {
              return (
                (e.keyPrefix && e.keyPrefix !== fs.keyPrefix) ||
                  (ms.error(
                    "invalid keyPrefix, setting keyPrefix with timeStamp"
                  ),
                  (e.keyPrefix = hs.toString())),
                new t(e)
              );
            }),
            t
          );
        })(ys))(),
        ws = bs;
      G.register(bs);
      var _s = function(e, t) {
          var n = "function" == typeof Symbol && e[Symbol.iterator];
          if (!n) return e;
          var r,
            i,
            o = n.call(e),
            s = [];
          try {
            for (; (void 0 === t || t-- > 0) && !(r = o.next()).done; )
              s.push(r.value);
          } catch (e) {
            i = { error: e };
          } finally {
            try {
              r && !r.done && (n = o.return) && n.call(o);
            } finally {
              if (i) throw i.error;
            }
          }
          return s;
        },
        Ss = {
          clockOffset: 0,
          getDateWithClockOffset: function() {
            return Ss.clockOffset
              ? new Date(new Date().getTime() + Ss.clockOffset)
              : new Date();
          },
          getClockOffset: function() {
            return Ss.clockOffset;
          },
          getHeaderStringFromDate: function(e) {
            return (
              void 0 === e && (e = Ss.getDateWithClockOffset()),
              e.toISOString().replace(/[:\-]|\.\d{3}/g, "")
            );
          },
          getDateFromHeaderString: function(e) {
            var t = _s(
                e.match(/^(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2}).+/),
                7
              ),
              n = t[1],
              r = t[2],
              i = t[3],
              o = t[4],
              s = t[5],
              a = t[6];
            return new Date(
              Date.UTC(
                Number(n),
                Number(r) - 1,
                Number(i),
                Number(o),
                Number(s),
                Number(a)
              )
            );
          },
          isClockSkewed: function(e) {
            return (
              Math.abs(e.getTime() - Ss.getDateWithClockOffset().getTime()) >=
              3e5
            );
          },
          isClockSkewError: function(e) {
            if (!e.response || !e.response.headers) return !1;
            var t = e.response.headers;
            return Boolean(
              "BadRequestException" === t["x-amzn-errortype"] &&
                (t.date || t.Date)
            );
          },
          setClockOffset: function(e) {
            Ss.clockOffset = e;
          }
        },
        Es = n(14),
        As = function() {
          return (As =
            Object.assign ||
            function(e) {
              for (var t, n = 1, r = arguments.length; n < r; n++)
                for (var i in (t = arguments[n]))
                  Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
              return e;
            }).apply(this, arguments);
        },
        Is = function(e, t) {
          var n = {};
          for (var r in e)
            Object.prototype.hasOwnProperty.call(e, r) &&
              t.indexOf(r) < 0 &&
              (n[r] = e[r]);
          if (null != e && "function" == typeof Object.getOwnPropertySymbols) {
            var i = 0;
            for (r = Object.getOwnPropertySymbols(e); i < r.length; i++)
              t.indexOf(r[i]) < 0 &&
                Object.prototype.propertyIsEnumerable.call(e, r[i]) &&
                (n[r[i]] = e[r[i]]);
          }
          return n;
        },
        Ts = new f("Signer"),
        Cs = function(e, t) {
          var n = new Es.Sha256(e);
          return n.update(t), n.digestSync();
        },
        Os = function(e) {
          var t = e || "",
            n = new Es.Sha256();
          return n.update(t), hi(n.digestSync());
        },
        Ps = function(e) {
          return Object.keys(e)
            .map(function(e) {
              return e.toLowerCase();
            })
            .sort()
            .join(";");
        },
        ks = function(e) {
          var t,
            n,
            r = Object(qo.parse)(e.url);
          return [
            e.method || "/",
            encodeURIComponent(r.pathname).replace(/%2F/gi, "/"),
            ((n = r.query),
            n && 0 !== n.length
              ? n
                  .split("&")
                  .map(function(e) {
                    var t = e.split("=");
                    if (1 === t.length) return e;
                    var n = t[1].replace(/[!'()*]/g, function(e) {
                      return (
                        "%" +
                        e
                          .charCodeAt(0)
                          .toString(16)
                          .toUpperCase()
                      );
                    });
                    return t[0] + "=" + n;
                  })
                  .sort(function(e, t) {
                    var n = e.split("=")[0],
                      r = t.split("=")[0];
                    return n === r ? (e < t ? -1 : 1) : n < r ? -1 : 1;
                  })
                  .join("&")
              : ""),
            ((t = e.headers),
            t && 0 !== Object.keys(t).length
              ? Object.keys(t)
                  .map(function(e) {
                    return {
                      key: e.toLowerCase(),
                      value: t[e] ? t[e].trim().replace(/\s+/g, " ") : ""
                    };
                  })
                  .sort(function(e, t) {
                    return e.key < t.key ? -1 : 1;
                  })
                  .map(function(e) {
                    return e.key + ":" + e.value;
                  })
                  .join("\n") + "\n"
              : ""),
            Ps(e.headers),
            Os(e.data)
          ].join("\n");
        },
        Ns = function(e) {
          var t = (
            Object(qo.parse)(e.url).host.match(
              /([^\.]+)\.(?:([^\.]*)\.)?amazonaws\.com$/
            ) || []
          ).slice(1, 3);
          return (
            "es" === t[1] && (t = t.reverse()),
            { service: e.service || t[0], region: e.region || t[1] }
          );
        },
        Rs = function(e, t, n) {
          return [e, t, n, "aws4_request"].join("/");
        },
        xs = function(e, t, n, r) {
          return [e, n, r, Os(t)].join("\n");
        },
        Us = function(e, t, n) {
          Ts.debug(n);
          var r = Cs("AWS4" + e, t),
            i = Cs(r, n.region),
            o = Cs(i, n.service);
          return Cs(o, "aws4_request");
        },
        Ds = function(e, t) {
          return hi(Cs(e, t));
        },
        Ms = (function() {
          function e() {}
          return (
            (e.sign = function(e, t, n) {
              void 0 === n && (n = null), (e.headers = e.headers || {});
              var r = Ss.getDateWithClockOffset()
                  .toISOString()
                  .replace(/[:\-]|\.\d{3}/g, ""),
                i = r.substr(0, 8),
                o = Object(qo.parse)(e.url);
              (e.headers.host = o.host),
                (e.headers["x-amz-date"] = r),
                t.session_token &&
                  (e.headers["X-Amz-Security-Token"] = t.session_token);
              var s = ks(e);
              Ts.debug(s);
              var a = n || Ns(e),
                u = Rs(i, a.region, a.service),
                c = xs("AWS4-HMAC-SHA256", s, r, u),
                f = Us(t.secret_key, i, a),
                l = Ds(f, c),
                h = (function(e, t, n, r, i) {
                  return [
                    e + " Credential=" + t + "/" + n,
                    "SignedHeaders=" + r,
                    "Signature=" + i
                  ].join(", ");
                })("AWS4-HMAC-SHA256", t.access_key, u, Ps(e.headers), l);
              return (e.headers.Authorization = h), e;
            }),
            (e.signUrl = function(e, t, n, r) {
              var i = "object" == typeof e ? e.url : e,
                o = "object" == typeof e ? e.method : "GET",
                s = "object" == typeof e ? e.body : void 0,
                a = Ss.getDateWithClockOffset()
                  .toISOString()
                  .replace(/[:\-]|\.\d{3}/g, ""),
                u = a.substr(0, 8),
                c = Object(qo.parse)(i, !0, !0),
                f = (c.search, Is(c, ["search"])),
                l = { host: f.host },
                h = n || Ns({ url: Object(qo.format)(f) }),
                d = h.region,
                p = h.service,
                g = Rs(u, d, p),
                y = t.session_token && "iotdevicegateway" !== p,
                v = As(
                  As(
                    As(
                      {
                        "X-Amz-Algorithm": "AWS4-HMAC-SHA256",
                        "X-Amz-Credential": [t.access_key, g].join("/"),
                        "X-Amz-Date": a.substr(0, 16)
                      },
                      y ? { "X-Amz-Security-Token": "" + t.session_token } : {}
                    ),
                    r ? { "X-Amz-Expires": "" + r } : {}
                  ),
                  { "X-Amz-SignedHeaders": Object.keys(l).join(",") }
                ),
                m = ks({
                  method: o,
                  url: Object(qo.format)(
                    As(As({}, f), { query: As(As({}, f.query), v) })
                  ),
                  headers: l,
                  data: s
                }),
                b = xs("AWS4-HMAC-SHA256", m, a, g),
                w = Us(t.secret_key, u, { region: d, service: p }),
                _ = Ds(w, b),
                S = As(
                  { "X-Amz-Signature": _ },
                  t.session_token && { "X-Amz-Security-Token": t.session_token }
                );
              return Object(qo.format)({
                protocol: f.protocol,
                slashes: !0,
                hostname: f.hostname,
                port: f.port,
                pathname: f.pathname,
                query: As(As(As({}, f.query), v), S)
              });
            }),
            e
          );
        })(),
        js = n(13),
        Ls = n.n(js),
        Fs = function() {
          return (Fs =
            Object.assign ||
            function(e) {
              for (var t, n = 1, r = arguments.length; n < r; n++)
                for (var i in (t = arguments[n]))
                  Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
              return e;
            }).apply(this, arguments);
        },
        Bs = function(e, t, n, r) {
          return new (n || (n = Promise))(function(i, o) {
            function s(e) {
              try {
                u(r.next(e));
              } catch (e) {
                o(e);
              }
            }
            function a(e) {
              try {
                u(r.throw(e));
              } catch (e) {
                o(e);
              }
            }
            function u(e) {
              var t;
              e.done
                ? i(e.value)
                : ((t = e.value),
                  t instanceof n
                    ? t
                    : new n(function(e) {
                        e(t);
                      })).then(s, a);
            }
            u((r = r.apply(e, t || [])).next());
          });
        },
        qs = function(e, t) {
          var n,
            r,
            i,
            o,
            s = {
              label: 0,
              sent: function() {
                if (1 & i[0]) throw i[1];
                return i[1];
              },
              trys: [],
              ops: []
            };
          return (
            (o = { next: a(0), throw: a(1), return: a(2) }),
            "function" == typeof Symbol &&
              (o[Symbol.iterator] = function() {
                return this;
              }),
            o
          );
          function a(o) {
            return function(a) {
              return (function(o) {
                if (n) throw new TypeError("Generator is already executing.");
                for (; s; )
                  try {
                    if (
                      ((n = 1),
                      r &&
                        (i =
                          2 & o[0]
                            ? r.return
                            : o[0]
                            ? r.throw || ((i = r.return) && i.call(r), 0)
                            : r.next) &&
                        !(i = i.call(r, o[1])).done)
                    )
                      return i;
                    switch (((r = 0), i && (o = [2 & o[0], i.value]), o[0])) {
                      case 0:
                      case 1:
                        i = o;
                        break;
                      case 4:
                        return s.label++, { value: o[1], done: !1 };
                      case 5:
                        s.label++, (r = o[1]), (o = [0]);
                        continue;
                      case 7:
                        (o = s.ops.pop()), s.trys.pop();
                        continue;
                      default:
                        if (
                          !((i = s.trys),
                          (i = i.length > 0 && i[i.length - 1]) ||
                            (6 !== o[0] && 2 !== o[0]))
                        ) {
                          s = 0;
                          continue;
                        }
                        if (
                          3 === o[0] &&
                          (!i || (o[1] > i[0] && o[1] < i[3]))
                        ) {
                          s.label = o[1];
                          break;
                        }
                        if (6 === o[0] && s.label < i[1]) {
                          (s.label = i[1]), (i = o);
                          break;
                        }
                        if (i && s.label < i[2]) {
                          (s.label = i[2]), s.ops.push(o);
                          break;
                        }
                        i[2] && s.ops.pop(), s.trys.pop();
                        continue;
                    }
                    o = t.call(e, s);
                  } catch (e) {
                    (o = [6, e]), (r = 0);
                  } finally {
                    n = i = 0;
                  }
                if (5 & o[0]) throw o[1];
                return { value: o[0] ? o[1] : void 0, done: !0 };
              })([o, a]);
            };
          }
        },
        Vs = function(e, t) {
          var n = {};
          for (var r in e)
            Object.prototype.hasOwnProperty.call(e, r) &&
              t.indexOf(r) < 0 &&
              (n[r] = e[r]);
          if (null != e && "function" == typeof Object.getOwnPropertySymbols) {
            var i = 0;
            for (r = Object.getOwnPropertySymbols(e); i < r.length; i++)
              t.indexOf(r[i]) < 0 &&
                Object.prototype.propertyIsEnumerable.call(e, r[i]) &&
                (n[r[i]] = e[r[i]]);
          }
          return n;
        },
        zs = new f("RestClient"),
        Ks = (function() {
          function e(e) {
            (this._region = "us-east-1"),
              (this._service = "execute-api"),
              (this._custom_header = void 0),
              (this._cancelTokenMap = null),
              (this.Credentials = Ri),
              (this._options = e),
              zs.debug("API Options", this._options),
              null == this._cancelTokenMap &&
                (this._cancelTokenMap = new WeakMap());
          }
          return (
            (e.prototype.ajax = function(e, t, n) {
              return Bs(this, void 0, void 0, function() {
                var r,
                  i,
                  o,
                  s,
                  a,
                  u,
                  c,
                  f,
                  l,
                  h,
                  d,
                  p,
                  g,
                  y,
                  v = this;
                return qs(this, function(m) {
                  switch (m.label) {
                    case 0:
                      return (
                        zs.debug(t, e),
                        (o = "us-east-1"),
                        (s = "execute-api"),
                        (a = void 0),
                        "string" == typeof e
                          ? ((r = this._parseUrl(e)), (i = e))
                          : ((i = e.endpoint),
                            (a = e.custom_header),
                            (o = e.region),
                            (s = e.service),
                            (r = this._parseUrl(e.endpoint))),
                        (u = {
                          method: t,
                          url: i,
                          host: r.host,
                          path: r.path,
                          headers: {},
                          data: null,
                          responseType: "json",
                          timeout: 0,
                          cancelToken: null
                        }),
                        (c = {}),
                        q.isReactNative &&
                          ((f = q.userAgent || "aws-amplify/0.1.x"),
                          (c = { "User-Agent": f })),
                        (l = Object.assign({}, n)),
                        (h = l.response),
                        l.body &&
                          ((c["Content-Type"] =
                            "application/json; charset=UTF-8"),
                          (u.data = JSON.stringify(l.body))),
                        l.responseType && (u.responseType = l.responseType),
                        l.withCredentials &&
                          (u.withCredentials = l.withCredentials),
                        l.timeout && (u.timeout = l.timeout),
                        l.cancellableToken &&
                          (u.cancelToken = l.cancellableToken.token),
                        (u.signerServiceInfo = l.signerServiceInfo),
                        "function" != typeof a ? [3, 2] : [4, a()]
                      );
                    case 1:
                      return (p = m.sent()), [3, 3];
                    case 2:
                      (p = void 0), (m.label = 3);
                    case 3:
                      return (
                        (d = p),
                        (u.headers = Fs(Fs(Fs({}, c), d), l.headers)),
                        (g = Object(qo.parse)(i, !0, !0)),
                        g.search,
                        (y = Vs(g, ["search"])),
                        (u.url = Object(qo.format)(
                          Fs(Fs({}, y), {
                            query: Fs(
                              Fs({}, y.query),
                              l.queryStringParameters || {}
                            )
                          })
                        )),
                        void 0 !== u.headers.Authorization
                          ? ((u.headers = Object.keys(u.headers).reduce(
                              function(e, t) {
                                return u.headers[t] && (e[t] = u.headers[t]), e;
                              },
                              {}
                            )),
                            [2, this._request(u, h)])
                          : [
                              2,
                              this.Credentials.get().then(
                                function(r) {
                                  return v
                                    ._signed(Fs({}, u), r, h, {
                                      region: o,
                                      service: s
                                    })
                                    .catch(function(r) {
                                      if (Ss.isClockSkewError(r)) {
                                        var i = r.response.headers,
                                          o = i && (i.date || i.Date),
                                          s = new Date(o),
                                          a = Ss.getDateFromHeaderString(
                                            u.headers["x-amz-date"]
                                          );
                                        if (Ss.isClockSkewed(a, s))
                                          return (
                                            Ss.setClockOffset(
                                              s.getTime() - a.getTime()
                                            ),
                                            v.ajax(e, t, n)
                                          );
                                      }
                                      throw r;
                                    });
                                },
                                function(e) {
                                  return (
                                    zs.debug(
                                      "No credentials available, the request will be unsigned"
                                    ),
                                    v._request(u, h)
                                  );
                                }
                              )
                            ]
                      );
                  }
                });
              });
            }),
            (e.prototype.get = function(e, t) {
              return this.ajax(e, "GET", t);
            }),
            (e.prototype.put = function(e, t) {
              return this.ajax(e, "PUT", t);
            }),
            (e.prototype.patch = function(e, t) {
              return this.ajax(e, "PATCH", t);
            }),
            (e.prototype.post = function(e, t) {
              return this.ajax(e, "POST", t);
            }),
            (e.prototype.del = function(e, t) {
              return this.ajax(e, "DELETE", t);
            }),
            (e.prototype.head = function(e, t) {
              return this.ajax(e, "HEAD", t);
            }),
            (e.prototype.cancel = function(e, t) {
              var n = this._cancelTokenMap.get(e);
              return n && n.cancel(t), !0;
            }),
            (e.prototype.isCancel = function(e) {
              return Ls.a.isCancel(e);
            }),
            (e.prototype.getCancellableToken = function() {
              return Ls.a.CancelToken.source();
            }),
            (e.prototype.updateRequestToBeCancellable = function(e, t) {
              this._cancelTokenMap.set(e, t);
            }),
            (e.prototype.endpoint = function(e) {
              var t = this,
                n = this._options.endpoints,
                r = "";
              return Array.isArray(n)
                ? (n.forEach(function(n) {
                    n.name === e &&
                      ((r = n.endpoint),
                      "string" == typeof n.region
                        ? (t._region = n.region)
                        : "string" == typeof t._options.region &&
                          (t._region = t._options.region),
                      "string" == typeof n.service
                        ? (t._service = n.service || "execute-api")
                        : (t._service = "execute-api"),
                      "function" == typeof n.custom_header
                        ? (t._custom_header = n.custom_header)
                        : (t._custom_header = void 0));
                  }),
                  r)
                : r;
            }),
            (e.prototype._signed = function(e, t, n, r) {
              var i = r.service,
                o = r.region,
                s = e.signerServiceInfo,
                a = Vs(e, ["signerServiceInfo"]),
                u = o || this._region || this._options.region,
                c = i || this._service || this._options.service,
                f = {
                  secret_key: t.secretAccessKey,
                  access_key: t.accessKeyId,
                  session_token: t.sessionToken
                },
                l = { region: u, service: c },
                h = Object.assign(l, s),
                d = Ms.sign(a, f, h);
              return (
                d.data && (d.body = d.data),
                zs.debug("Signed Request: ", d),
                delete d.headers.host,
                Ls()(d)
                  .then(function(e) {
                    return n ? e : e.data;
                  })
                  .catch(function(e) {
                    throw (zs.debug(e), e);
                  })
              );
            }),
            (e.prototype._request = function(e, t) {
              return (
                void 0 === t && (t = !1),
                Ls()(e)
                  .then(function(e) {
                    return t ? e : e.data;
                  })
                  .catch(function(e) {
                    throw (zs.debug(e), e);
                  })
              );
            }),
            (e.prototype._parseUrl = function(e) {
              var t = e.split("/");
              return { host: t[2], path: "/" + t.slice(3).join("/") };
            }),
            e
          );
        })(),
        Gs = function() {
          return (Gs =
            Object.assign ||
            function(e) {
              for (var t, n = 1, r = arguments.length; n < r; n++)
                for (var i in (t = arguments[n]))
                  Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
              return e;
            }).apply(this, arguments);
        },
        Hs = function(e, t, n, r) {
          return new (n || (n = Promise))(function(i, o) {
            function s(e) {
              try {
                u(r.next(e));
              } catch (e) {
                o(e);
              }
            }
            function a(e) {
              try {
                u(r.throw(e));
              } catch (e) {
                o(e);
              }
            }
            function u(e) {
              var t;
              e.done
                ? i(e.value)
                : ((t = e.value),
                  t instanceof n
                    ? t
                    : new n(function(e) {
                        e(t);
                      })).then(s, a);
            }
            u((r = r.apply(e, t || [])).next());
          });
        },
        Ws = function(e, t) {
          var n,
            r,
            i,
            o,
            s = {
              label: 0,
              sent: function() {
                if (1 & i[0]) throw i[1];
                return i[1];
              },
              trys: [],
              ops: []
            };
          return (
            (o = { next: a(0), throw: a(1), return: a(2) }),
            "function" == typeof Symbol &&
              (o[Symbol.iterator] = function() {
                return this;
              }),
            o
          );
          function a(o) {
            return function(a) {
              return (function(o) {
                if (n) throw new TypeError("Generator is already executing.");
                for (; s; )
                  try {
                    if (
                      ((n = 1),
                      r &&
                        (i =
                          2 & o[0]
                            ? r.return
                            : o[0]
                            ? r.throw || ((i = r.return) && i.call(r), 0)
                            : r.next) &&
                        !(i = i.call(r, o[1])).done)
                    )
                      return i;
                    switch (((r = 0), i && (o = [2 & o[0], i.value]), o[0])) {
                      case 0:
                      case 1:
                        i = o;
                        break;
                      case 4:
                        return s.label++, { value: o[1], done: !1 };
                      case 5:
                        s.label++, (r = o[1]), (o = [0]);
                        continue;
                      case 7:
                        (o = s.ops.pop()), s.trys.pop();
                        continue;
                      default:
                        if (
                          !((i = s.trys),
                          (i = i.length > 0 && i[i.length - 1]) ||
                            (6 !== o[0] && 2 !== o[0]))
                        ) {
                          s = 0;
                          continue;
                        }
                        if (
                          3 === o[0] &&
                          (!i || (o[1] > i[0] && o[1] < i[3]))
                        ) {
                          s.label = o[1];
                          break;
                        }
                        if (6 === o[0] && s.label < i[1]) {
                          (s.label = i[1]), (i = o);
                          break;
                        }
                        if (i && s.label < i[2]) {
                          (s.label = i[2]), s.ops.push(o);
                          break;
                        }
                        i[2] && s.ops.pop(), s.trys.pop();
                        continue;
                    }
                    o = t.call(e, s);
                  } catch (e) {
                    (o = [6, e]), (r = 0);
                  } finally {
                    n = i = 0;
                  }
                if (5 & o[0]) throw o[1];
                return { value: o[0] ? o[1] : void 0, done: !0 };
              })([o, a]);
            };
          }
        },
        Ys = function(e, t) {
          var n = {};
          for (var r in e)
            Object.prototype.hasOwnProperty.call(e, r) &&
              t.indexOf(r) < 0 &&
              (n[r] = e[r]);
          if (null != e && "function" == typeof Object.getOwnPropertySymbols) {
            var i = 0;
            for (r = Object.getOwnPropertySymbols(e); i < r.length; i++)
              t.indexOf(r[i]) < 0 &&
                Object.prototype.propertyIsEnumerable.call(e, r[i]) &&
                (n[r[i]] = e[r[i]]);
          }
          return n;
        },
        Js = new f("RestAPI"),
        Qs = (function() {
          function e(e) {
            (this._api = null),
              (this.Credentials = Ri),
              (this._options = e),
              Js.debug("API Options", this._options);
          }
          return (
            (e.prototype.getModuleName = function() {
              return "RestAPI";
            }),
            (e.prototype.configure = function(e) {
              var t = e || {},
                n = t.API,
                r = void 0 === n ? {} : n,
                i = Ys(t, ["API"]),
                o = Gs(Gs({}, i), r);
              if (
                (Js.debug("configure Rest API", { opt: o }),
                o.aws_project_region)
              ) {
                if (o.aws_cloud_logic_custom) {
                  var s = o.aws_cloud_logic_custom;
                  o.endpoints = "string" == typeof s ? JSON.parse(s) : s;
                }
                o = Object.assign({}, o, {
                  region: o.aws_project_region,
                  header: {}
                });
              }
              return (
                Array.isArray(o.endpoints)
                  ? o.endpoints.forEach(function(e) {
                      void 0 !== e.custom_header &&
                        "function" != typeof e.custom_header &&
                        (Js.warn(
                          "Rest API " +
                            e.name +
                            ", custom_header should be a function"
                        ),
                        (e.custom_header = void 0));
                    })
                  : this._options && Array.isArray(this._options.endpoints)
                  ? (o.endpoints = this._options.endpoints)
                  : (o.endpoints = []),
                (this._options = Object.assign({}, this._options, o)),
                this.createInstance(),
                this._options
              );
            }),
            (e.prototype.createInstance = function() {
              return (
                Js.debug("create Rest API instance"),
                (this._api = new Ks(this._options)),
                (this._api.Credentials = this.Credentials),
                !0
              );
            }),
            (e.prototype.get = function(e, t, n) {
              try {
                var r = this.getEndpointInfo(e, t),
                  i = this._api.getCancellableToken(),
                  o = Object.assign({}, n);
                o.cancellableToken = i;
                var s = this._api.get(r, o);
                return this._api.updateRequestToBeCancellable(s, i), s;
              } catch (e) {
                return Promise.reject(e.message);
              }
            }),
            (e.prototype.post = function(e, t, n) {
              try {
                var r = this.getEndpointInfo(e, t),
                  i = this._api.getCancellableToken(),
                  o = Object.assign({}, n);
                o.cancellableToken = i;
                var s = this._api.post(r, o);
                return this._api.updateRequestToBeCancellable(s, i), s;
              } catch (e) {
                return Promise.reject(e.message);
              }
            }),
            (e.prototype.put = function(e, t, n) {
              try {
                var r = this.getEndpointInfo(e, t),
                  i = this._api.getCancellableToken(),
                  o = Object.assign({}, n);
                o.cancellableToken = i;
                var s = this._api.put(r, o);
                return this._api.updateRequestToBeCancellable(s, i), s;
              } catch (e) {
                return Promise.reject(e.message);
              }
            }),
            (e.prototype.patch = function(e, t, n) {
              try {
                var r = this.getEndpointInfo(e, t),
                  i = this._api.getCancellableToken(),
                  o = Object.assign({}, n);
                o.cancellableToken = i;
                var s = this._api.patch(r, o);
                return this._api.updateRequestToBeCancellable(s, i), s;
              } catch (e) {
                return Promise.reject(e.message);
              }
            }),
            (e.prototype.del = function(e, t, n) {
              try {
                var r = this.getEndpointInfo(e, t),
                  i = this._api.getCancellableToken(),
                  o = Object.assign({}, n);
                o.cancellableToken = i;
                var s = this._api.del(r, o);
                return this._api.updateRequestToBeCancellable(s, i), s;
              } catch (e) {
                return Promise.reject(e.message);
              }
            }),
            (e.prototype.head = function(e, t, n) {
              try {
                var r = this.getEndpointInfo(e, t),
                  i = this._api.getCancellableToken(),
                  o = Object.assign({}, n);
                o.cancellableToken = i;
                var s = this._api.head(r, o);
                return this._api.updateRequestToBeCancellable(s, i), s;
              } catch (e) {
                return Promise.reject(e.message);
              }
            }),
            (e.prototype.isCancel = function(e) {
              return this._api.isCancel(e);
            }),
            (e.prototype.cancel = function(e, t) {
              return this._api.cancel(e, t);
            }),
            (e.prototype.endpoint = function(e) {
              return Hs(this, void 0, void 0, function() {
                return Ws(this, function(t) {
                  return [2, this._api.endpoint(e)];
                });
              });
            }),
            (e.prototype.getEndpointInfo = function(e, t) {
              var n = this._options.endpoints;
              if (!Array.isArray(n))
                throw new Error("API category not configured");
              var r = n.find(function(t) {
                return t.name === e;
              });
              if (!r) throw new Error("API " + e + " does not exist");
              var i = { endpoint: r.endpoint + t };
              return (
                "string" == typeof r.region
                  ? (i.region = r.region)
                  : "string" == typeof this._options.region &&
                    (i.region = this._options.region),
                "string" == typeof r.service
                  ? (i.service = r.service || "execute-api")
                  : (i.service = "execute-api"),
                "function" == typeof r.custom_header
                  ? (i.custom_header = r.custom_header)
                  : (i.custom_header = void 0),
                i
              );
            }),
            e
          );
        })(),
        $s = new Qs(null);
      function Xs(e, t) {
        for (
          var n, r = /\r\n|[\n\r]/g, i = 1, o = t + 1;
          (n = r.exec(e.body)) && n.index < t;

        )
          (i += 1), (o = t + 1 - (n.index + n[0].length));
        return { line: i, column: o };
      }
      function Zs(e, t) {
        var n = e.locationOffset.column - 1,
          r = ea(n) + e.body,
          i = t.line - 1,
          o = e.locationOffset.line - 1,
          s = t.line + o,
          a = 1 === t.line ? n : 0,
          u = t.column + a,
          c = r.split(/\r\n|[\n\r]/g);
        return (
          ""
            .concat(e.name, " (")
            .concat(s, ":")
            .concat(u, ")\n") +
          (function(e) {
            var t = e.filter(function(e) {
                e[0];
                return void 0 !== e[1];
              }),
              n = 0,
              r = !0,
              i = !1,
              o = void 0;
            try {
              for (
                var s, a = t[Symbol.iterator]();
                !(r = (s = a.next()).done);
                r = !0
              ) {
                var u = s.value[0];
                n = Math.max(n, u.length);
              }
            } catch (e) {
              (i = !0), (o = e);
            } finally {
              try {
                r || null == a.return || a.return();
              } finally {
                if (i) throw o;
              }
            }
            return t
              .map(function(e) {
                var t,
                  r = e[0],
                  i = e[1];
                return ea(n - (t = r).length) + t + i;
              })
              .join("\n");
          })([
            ["".concat(s - 1, ": "), c[i - 1]],
            ["".concat(s, ": "), c[i]],
            ["", ea(u - 1) + "^"],
            ["".concat(s + 1, ": "), c[i + 1]]
          ])
        );
      }
      function ea(e) {
        return Array(e + 1).join(" ");
      }
      function ta(e, t, n, r, i, o, s) {
        var a = Array.isArray(t)
            ? 0 !== t.length
              ? t
              : void 0
            : t
            ? [t]
            : void 0,
          u = n;
        if (!u && a) {
          var c = a[0];
          u = c && c.loc && c.loc.source;
        }
        var f,
          l = r;
        !l &&
          a &&
          (l = a.reduce(function(e, t) {
            return t.loc && e.push(t.loc.start), e;
          }, [])),
          l && 0 === l.length && (l = void 0),
          r && n
            ? (f = r.map(function(e) {
                return Xs(n, e);
              }))
            : a &&
              (f = a.reduce(function(e, t) {
                return t.loc && e.push(Xs(t.loc.source, t.loc.start)), e;
              }, []));
        var h = s || (o && o.extensions);
        Object.defineProperties(this, {
          message: { value: e, enumerable: !0, writable: !0 },
          locations: { value: f || void 0, enumerable: Boolean(f) },
          path: { value: i || void 0, enumerable: Boolean(i) },
          nodes: { value: a || void 0 },
          source: { value: u || void 0 },
          positions: { value: l || void 0 },
          originalError: { value: o },
          extensions: { value: h || void 0, enumerable: Boolean(h) }
        }),
          o && o.stack
            ? Object.defineProperty(this, "stack", {
                value: o.stack,
                writable: !0,
                configurable: !0
              })
            : Error.captureStackTrace
            ? Error.captureStackTrace(this, ta)
            : Object.defineProperty(this, "stack", {
                value: Error().stack,
                writable: !0,
                configurable: !0
              });
      }
      G.register($s),
        (ta.prototype = Object.create(Error.prototype, {
          constructor: { value: ta },
          name: { value: "GraphQLError" },
          toString: {
            value: function() {
              return (function(e) {
                var t = [];
                if (e.nodes) {
                  var n = !0,
                    r = !1,
                    i = void 0;
                  try {
                    for (
                      var o, s = e.nodes[Symbol.iterator]();
                      !(n = (o = s.next()).done);
                      n = !0
                    ) {
                      var a = o.value;
                      a.loc &&
                        t.push(Zs(a.loc.source, Xs(a.loc.source, a.loc.start)));
                    }
                  } catch (e) {
                    (r = !0), (i = e);
                  } finally {
                    try {
                      n || null == s.return || s.return();
                    } finally {
                      if (r) throw i;
                    }
                  }
                } else if (e.source && e.locations) {
                  var u = e.source,
                    c = !0,
                    f = !1,
                    l = void 0;
                  try {
                    for (
                      var h, d = e.locations[Symbol.iterator]();
                      !(c = (h = d.next()).done);
                      c = !0
                    ) {
                      var p = h.value;
                      t.push(Zs(u, p));
                    }
                  } catch (e) {
                    (f = !0), (l = e);
                  } finally {
                    try {
                      c || null == d.return || d.return();
                    } finally {
                      if (f) throw l;
                    }
                  }
                }
                return 0 === t.length
                  ? e.message
                  : [e.message].concat(t).join("\n\n") + "\n";
              })(this);
            }
          }
        }));
      var na = {
          Name: [],
          Document: ["definitions"],
          OperationDefinition: [
            "name",
            "variableDefinitions",
            "directives",
            "selectionSet"
          ],
          VariableDefinition: [
            "variable",
            "type",
            "defaultValue",
            "directives"
          ],
          Variable: ["name"],
          SelectionSet: ["selections"],
          Field: ["alias", "name", "arguments", "directives", "selectionSet"],
          Argument: ["name", "value"],
          FragmentSpread: ["name", "directives"],
          InlineFragment: ["typeCondition", "directives", "selectionSet"],
          FragmentDefinition: [
            "name",
            "variableDefinitions",
            "typeCondition",
            "directives",
            "selectionSet"
          ],
          IntValue: [],
          FloatValue: [],
          StringValue: [],
          BooleanValue: [],
          NullValue: [],
          EnumValue: [],
          ListValue: ["values"],
          ObjectValue: ["fields"],
          ObjectField: ["name", "value"],
          Directive: ["name", "arguments"],
          NamedType: ["name"],
          ListType: ["type"],
          NonNullType: ["type"],
          SchemaDefinition: ["directives", "operationTypes"],
          OperationTypeDefinition: ["type"],
          ScalarTypeDefinition: ["description", "name", "directives"],
          ObjectTypeDefinition: [
            "description",
            "name",
            "interfaces",
            "directives",
            "fields"
          ],
          FieldDefinition: [
            "description",
            "name",
            "arguments",
            "type",
            "directives"
          ],
          InputValueDefinition: [
            "description",
            "name",
            "type",
            "defaultValue",
            "directives"
          ],
          InterfaceTypeDefinition: [
            "description",
            "name",
            "directives",
            "fields"
          ],
          UnionTypeDefinition: ["description", "name", "directives", "types"],
          EnumTypeDefinition: ["description", "name", "directives", "values"],
          EnumValueDefinition: ["description", "name", "directives"],
          InputObjectTypeDefinition: [
            "description",
            "name",
            "directives",
            "fields"
          ],
          DirectiveDefinition: [
            "description",
            "name",
            "arguments",
            "locations"
          ],
          SchemaExtension: ["directives", "operationTypes"],
          ScalarTypeExtension: ["name", "directives"],
          ObjectTypeExtension: ["name", "interfaces", "directives", "fields"],
          InterfaceTypeExtension: ["name", "directives", "fields"],
          UnionTypeExtension: ["name", "directives", "types"],
          EnumTypeExtension: ["name", "directives", "values"],
          InputObjectTypeExtension: ["name", "directives", "fields"]
        },
        ra = {};
      function ia(e) {
        return Boolean(e && "string" == typeof e.kind);
      }
      function oa(e, t, n) {
        var r = e[t];
        if (r) {
          if (!n && "function" == typeof r) return r;
          var i = n ? r.leave : r.enter;
          if ("function" == typeof i) return i;
        } else {
          var o = n ? e.leave : e.enter;
          if (o) {
            if ("function" == typeof o) return o;
            var s = o[t];
            if ("function" == typeof s) return s;
          }
        }
      }
      function sa(e) {
        return (function(e, t) {
          var n =
              arguments.length > 2 && void 0 !== arguments[2]
                ? arguments[2]
                : na,
            r = void 0,
            i = Array.isArray(e),
            o = [e],
            s = -1,
            a = [],
            u = void 0,
            c = void 0,
            f = void 0,
            l = [],
            h = [],
            d = e;
          do {
            var p = ++s === o.length,
              g = p && 0 !== a.length;
            if (p) {
              if (
                ((c = 0 === h.length ? void 0 : l[l.length - 1]),
                (u = f),
                (f = h.pop()),
                g)
              ) {
                if (i) u = u.slice();
                else {
                  var y = {};
                  for (var v in u) u.hasOwnProperty(v) && (y[v] = u[v]);
                  u = y;
                }
                for (var m = 0, b = 0; b < a.length; b++) {
                  var w = a[b][0],
                    _ = a[b][1];
                  i && (w -= m),
                    i && null === _ ? (u.splice(w, 1), m++) : (u[w] = _);
                }
              }
              (s = r.index),
                (o = r.keys),
                (a = r.edits),
                (i = r.inArray),
                (r = r.prev);
            } else {
              if (
                ((c = f ? (i ? s : o[s]) : void 0), null == (u = f ? f[c] : d))
              )
                continue;
              f && l.push(c);
            }
            var S = void 0;
            if (!Array.isArray(u)) {
              if (!ia(u))
                throw new Error("Invalid AST Node: " + JSON.stringify(u));
              var E = oa(t, u.kind, p);
              if (E) {
                if ((S = E.call(t, u, c, f, l, h)) === ra) break;
                if (!1 === S) {
                  if (!p) {
                    l.pop();
                    continue;
                  }
                } else if (void 0 !== S && (a.push([c, S]), !p)) {
                  if (!ia(S)) {
                    l.pop();
                    continue;
                  }
                  u = S;
                }
              }
            }
            void 0 === S && g && a.push([c, u]),
              p
                ? l.pop()
                : ((r = { inArray: i, index: s, keys: o, edits: a, prev: r }),
                  (o = (i = Array.isArray(u)) ? u : n[u.kind] || []),
                  (s = -1),
                  (a = []),
                  f && h.push(f),
                  (f = u));
          } while (void 0 !== r);
          return 0 !== a.length && (d = a[a.length - 1][1]), d;
        })(e, { leave: aa });
      }
      var aa = {
        Name: function(e) {
          return e.value;
        },
        Variable: function(e) {
          return "$" + e.name;
        },
        Document: function(e) {
          return ca(e.definitions, "\n\n") + "\n";
        },
        OperationDefinition: function(e) {
          var t = e.operation,
            n = e.name,
            r = la("(", ca(e.variableDefinitions, ", "), ")"),
            i = ca(e.directives, " "),
            o = e.selectionSet;
          return n || i || r || "query" !== t
            ? ca([t, ca([n, r]), i, o], " ")
            : o;
        },
        VariableDefinition: function(e) {
          var t = e.variable,
            n = e.type,
            r = e.defaultValue,
            i = e.directives;
          return t + ": " + n + la(" = ", r) + la(" ", ca(i, " "));
        },
        SelectionSet: function(e) {
          return fa(e.selections);
        },
        Field: function(e) {
          var t = e.alias,
            n = e.name,
            r = e.arguments,
            i = e.directives,
            o = e.selectionSet;
          return ca(
            [la("", t, ": ") + n + la("(", ca(r, ", "), ")"), ca(i, " "), o],
            " "
          );
        },
        Argument: function(e) {
          return e.name + ": " + e.value;
        },
        FragmentSpread: function(e) {
          return "..." + e.name + la(" ", ca(e.directives, " "));
        },
        InlineFragment: function(e) {
          var t = e.typeCondition,
            n = e.directives,
            r = e.selectionSet;
          return ca(["...", la("on ", t), ca(n, " "), r], " ");
        },
        FragmentDefinition: function(e) {
          var t = e.name,
            n = e.typeCondition,
            r = e.variableDefinitions,
            i = e.directives,
            o = e.selectionSet;
          return (
            "fragment ".concat(t).concat(la("(", ca(r, ", "), ")"), " ") +
            "on ".concat(n, " ").concat(la("", ca(i, " "), " ")) +
            o
          );
        },
        IntValue: function(e) {
          return e.value;
        },
        FloatValue: function(e) {
          return e.value;
        },
        StringValue: function(e, t) {
          var n = e.value;
          return e.block
            ? (function(e, t) {
                var n = e.replace(/"""/g, '\\"""');
                return (" " !== e[0] && "\t" !== e[0]) || -1 !== e.indexOf("\n")
                  ? '"""\n'.concat(t ? n : ha(n), '\n"""')
                  : '"""'.concat(n.replace(/"$/, '"\n'), '"""');
              })(n, "description" === t)
            : JSON.stringify(n);
        },
        BooleanValue: function(e) {
          return e.value ? "true" : "false";
        },
        NullValue: function() {
          return "null";
        },
        EnumValue: function(e) {
          return e.value;
        },
        ListValue: function(e) {
          return "[" + ca(e.values, ", ") + "]";
        },
        ObjectValue: function(e) {
          return "{" + ca(e.fields, ", ") + "}";
        },
        ObjectField: function(e) {
          return e.name + ": " + e.value;
        },
        Directive: function(e) {
          return "@" + e.name + la("(", ca(e.arguments, ", "), ")");
        },
        NamedType: function(e) {
          return e.name;
        },
        ListType: function(e) {
          return "[" + e.type + "]";
        },
        NonNullType: function(e) {
          return e.type + "!";
        },
        SchemaDefinition: function(e) {
          var t = e.directives,
            n = e.operationTypes;
          return ca(["schema", ca(t, " "), fa(n)], " ");
        },
        OperationTypeDefinition: function(e) {
          return e.operation + ": " + e.type;
        },
        ScalarTypeDefinition: ua(function(e) {
          return ca(["scalar", e.name, ca(e.directives, " ")], " ");
        }),
        ObjectTypeDefinition: ua(function(e) {
          var t = e.name,
            n = e.interfaces,
            r = e.directives,
            i = e.fields;
          return ca(
            ["type", t, la("implements ", ca(n, " & ")), ca(r, " "), fa(i)],
            " "
          );
        }),
        FieldDefinition: ua(function(e) {
          var t = e.name,
            n = e.arguments,
            r = e.type,
            i = e.directives;
          return (
            t +
            (n.every(function(e) {
              return -1 === e.indexOf("\n");
            })
              ? la("(", ca(n, ", "), ")")
              : la("(\n", ha(ca(n, "\n")), "\n)")) +
            ": " +
            r +
            la(" ", ca(i, " "))
          );
        }),
        InputValueDefinition: ua(function(e) {
          var t = e.name,
            n = e.type,
            r = e.defaultValue,
            i = e.directives;
          return ca([t + ": " + n, la("= ", r), ca(i, " ")], " ");
        }),
        InterfaceTypeDefinition: ua(function(e) {
          var t = e.name,
            n = e.directives,
            r = e.fields;
          return ca(["interface", t, ca(n, " "), fa(r)], " ");
        }),
        UnionTypeDefinition: ua(function(e) {
          var t = e.name,
            n = e.directives,
            r = e.types;
          return ca(
            [
              "union",
              t,
              ca(n, " "),
              r && 0 !== r.length ? "= " + ca(r, " | ") : ""
            ],
            " "
          );
        }),
        EnumTypeDefinition: ua(function(e) {
          var t = e.name,
            n = e.directives,
            r = e.values;
          return ca(["enum", t, ca(n, " "), fa(r)], " ");
        }),
        EnumValueDefinition: ua(function(e) {
          return ca([e.name, ca(e.directives, " ")], " ");
        }),
        InputObjectTypeDefinition: ua(function(e) {
          var t = e.name,
            n = e.directives,
            r = e.fields;
          return ca(["input", t, ca(n, " "), fa(r)], " ");
        }),
        DirectiveDefinition: ua(function(e) {
          var t = e.name,
            n = e.arguments,
            r = e.locations;
          return (
            "directive @" +
            t +
            (n.every(function(e) {
              return -1 === e.indexOf("\n");
            })
              ? la("(", ca(n, ", "), ")")
              : la("(\n", ha(ca(n, "\n")), "\n)")) +
            " on " +
            ca(r, " | ")
          );
        }),
        SchemaExtension: function(e) {
          var t = e.directives,
            n = e.operationTypes;
          return ca(["extend schema", ca(t, " "), fa(n)], " ");
        },
        ScalarTypeExtension: function(e) {
          return ca(["extend scalar", e.name, ca(e.directives, " ")], " ");
        },
        ObjectTypeExtension: function(e) {
          var t = e.name,
            n = e.interfaces,
            r = e.directives,
            i = e.fields;
          return ca(
            [
              "extend type",
              t,
              la("implements ", ca(n, " & ")),
              ca(r, " "),
              fa(i)
            ],
            " "
          );
        },
        InterfaceTypeExtension: function(e) {
          var t = e.name,
            n = e.directives,
            r = e.fields;
          return ca(["extend interface", t, ca(n, " "), fa(r)], " ");
        },
        UnionTypeExtension: function(e) {
          var t = e.name,
            n = e.directives,
            r = e.types;
          return ca(
            [
              "extend union",
              t,
              ca(n, " "),
              r && 0 !== r.length ? "= " + ca(r, " | ") : ""
            ],
            " "
          );
        },
        EnumTypeExtension: function(e) {
          var t = e.name,
            n = e.directives,
            r = e.values;
          return ca(["extend enum", t, ca(n, " "), fa(r)], " ");
        },
        InputObjectTypeExtension: function(e) {
          var t = e.name,
            n = e.directives,
            r = e.fields;
          return ca(["extend input", t, ca(n, " "), fa(r)], " ");
        }
      };
      function ua(e) {
        return function(t) {
          return ca([t.description, e(t)], "\n");
        };
      }
      function ca(e, t) {
        return e
          ? e
              .filter(function(e) {
                return e;
              })
              .join(t || "")
          : "";
      }
      function fa(e) {
        return e && 0 !== e.length ? "{\n" + ha(ca(e, "\n")) + "\n}" : "";
      }
      function la(e, t, n) {
        return t ? e + t + (n || "") : "";
      }
      function ha(e) {
        return e && "  " + e.replace(/\n/g, "\n  ");
      }
      function da(e) {
        return (da =
          "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
            ? function(e) {
                return typeof e;
              }
            : function(e) {
                return e &&
                  "function" == typeof Symbol &&
                  e.constructor === Symbol &&
                  e !== Symbol.prototype
                  ? "symbol"
                  : typeof e;
              })(e);
      }
      function pa(e) {
        return e && "object" === da(e)
          ? "function" == typeof e.inspect
            ? e.inspect()
            : Array.isArray(e)
            ? "[" + e.map(pa).join(", ") + "]"
            : "{" +
              Object.keys(e)
                .map(function(t) {
                  return "".concat(t, ": ").concat(pa(e[t]));
                })
                .join(", ") +
              "}"
          : "string" == typeof e
          ? '"' + e + '"'
          : "function" == typeof e
          ? "[function ".concat(e.name, "]")
          : String(e);
      }
      function ga(e, t) {
        if (!e) throw new Error(t);
      }
      function ya(e, t, n) {
        return (
          t in e
            ? Object.defineProperty(e, t, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0
              })
            : (e[t] = n),
          e
        );
      }
      var va,
        ma = function(e, t, n) {
          ya(this, "body", void 0),
            ya(this, "name", void 0),
            ya(this, "locationOffset", void 0),
            (this.body = e),
            (this.name = t || "GraphQL request"),
            (this.locationOffset = n || { line: 1, column: 1 }),
            this.locationOffset.line > 0 ||
              ga(0, "line in locationOffset is 1-indexed and must be positive"),
            this.locationOffset.column > 0 ||
              ga(
                0,
                "column in locationOffset is 1-indexed and must be positive"
              );
        };
      function ba(e, t, n) {
        return new ta("Syntax Error: ".concat(n), void 0, e, [t]);
      }
      function wa(e) {
        for (
          var t = e.split(/\r\n|[\n\r]/g), n = null, r = 1;
          r < t.length;
          r++
        ) {
          var i = t[r],
            o = _a(i);
          if (o < i.length && (null === n || o < n) && 0 === (n = o)) break;
        }
        if (n) for (var s = 1; s < t.length; s++) t[s] = t[s].slice(n);
        for (; t.length > 0 && Sa(t[0]); ) t.shift();
        for (; t.length > 0 && Sa(t[t.length - 1]); ) t.pop();
        return t.join("\n");
      }
      function _a(e) {
        for (var t = 0; t < e.length && (" " === e[t] || "\t" === e[t]); ) t++;
        return t;
      }
      function Sa(e) {
        return _a(e) === e.length;
      }
      function Ea(e, t) {
        var n = new ka(Ta.SOF, 0, 0, 0, 0, null);
        return {
          source: e,
          options: t,
          lastToken: n,
          token: n,
          line: 1,
          lineStart: 0,
          advance: Aa,
          lookahead: Ia
        };
      }
      function Aa() {
        return (this.lastToken = this.token), (this.token = this.lookahead());
      }
      function Ia() {
        var e = this.token;
        if (e.kind !== Ta.EOF)
          do {
            e = e.next || (e.next = Ra(this, e));
          } while (e.kind === Ta.COMMENT);
        return e;
      }
      (va = ma),
        "function" == typeof Symbol &&
          Symbol.toStringTag &&
          Object.defineProperty(va.prototype, Symbol.toStringTag, {
            get: function() {
              return this.constructor.name;
            }
          });
      var Ta = Object.freeze({
        SOF: "<SOF>",
        EOF: "<EOF>",
        BANG: "!",
        DOLLAR: "$",
        AMP: "&",
        PAREN_L: "(",
        PAREN_R: ")",
        SPREAD: "...",
        COLON: ":",
        EQUALS: "=",
        AT: "@",
        BRACKET_L: "[",
        BRACKET_R: "]",
        BRACE_L: "{",
        PIPE: "|",
        BRACE_R: "}",
        NAME: "Name",
        INT: "Int",
        FLOAT: "Float",
        STRING: "String",
        BLOCK_STRING: "BlockString",
        COMMENT: "Comment"
      });
      function Ca(e) {
        var t = e.value;
        return t ? "".concat(e.kind, ' "').concat(t, '"') : e.kind;
      }
      var Oa = String.prototype.charCodeAt,
        Pa = String.prototype.slice;
      function ka(e, t, n, r, i, o, s) {
        (this.kind = e),
          (this.start = t),
          (this.end = n),
          (this.line = r),
          (this.column = i),
          (this.value = s),
          (this.prev = o),
          (this.next = null);
      }
      function Na(e) {
        return isNaN(e)
          ? Ta.EOF
          : e < 127
          ? JSON.stringify(String.fromCharCode(e))
          : '"\\u'.concat(("00" + e.toString(16).toUpperCase()).slice(-4), '"');
      }
      function Ra(e, t) {
        var n = e.source,
          r = n.body,
          i = r.length,
          o = (function(e, t, n) {
            var r = e.length,
              i = t;
            for (; i < r; ) {
              var o = Oa.call(e, i);
              if (9 === o || 32 === o || 44 === o || 65279 === o) ++i;
              else if (10 === o) ++i, ++n.line, (n.lineStart = i);
              else {
                if (13 !== o) break;
                10 === Oa.call(e, i + 1) ? (i += 2) : ++i,
                  ++n.line,
                  (n.lineStart = i);
              }
            }
            return i;
          })(r, t.end, e),
          s = e.line,
          a = 1 + o - e.lineStart;
        if (o >= i) return new ka(Ta.EOF, i, i, s, a, t);
        var u = Oa.call(r, o);
        switch (u) {
          case 33:
            return new ka(Ta.BANG, o, o + 1, s, a, t);
          case 35:
            return (function(e, t, n, r, i) {
              var o,
                s = e.body,
                a = t;
              do {
                o = Oa.call(s, ++a);
              } while (null !== o && (o > 31 || 9 === o));
              return new ka(Ta.COMMENT, t, a, n, r, i, Pa.call(s, t + 1, a));
            })(n, o, s, a, t);
          case 36:
            return new ka(Ta.DOLLAR, o, o + 1, s, a, t);
          case 38:
            return new ka(Ta.AMP, o, o + 1, s, a, t);
          case 40:
            return new ka(Ta.PAREN_L, o, o + 1, s, a, t);
          case 41:
            return new ka(Ta.PAREN_R, o, o + 1, s, a, t);
          case 46:
            if (46 === Oa.call(r, o + 1) && 46 === Oa.call(r, o + 2))
              return new ka(Ta.SPREAD, o, o + 3, s, a, t);
            break;
          case 58:
            return new ka(Ta.COLON, o, o + 1, s, a, t);
          case 61:
            return new ka(Ta.EQUALS, o, o + 1, s, a, t);
          case 64:
            return new ka(Ta.AT, o, o + 1, s, a, t);
          case 91:
            return new ka(Ta.BRACKET_L, o, o + 1, s, a, t);
          case 93:
            return new ka(Ta.BRACKET_R, o, o + 1, s, a, t);
          case 123:
            return new ka(Ta.BRACE_L, o, o + 1, s, a, t);
          case 124:
            return new ka(Ta.PIPE, o, o + 1, s, a, t);
          case 125:
            return new ka(Ta.BRACE_R, o, o + 1, s, a, t);
          case 65:
          case 66:
          case 67:
          case 68:
          case 69:
          case 70:
          case 71:
          case 72:
          case 73:
          case 74:
          case 75:
          case 76:
          case 77:
          case 78:
          case 79:
          case 80:
          case 81:
          case 82:
          case 83:
          case 84:
          case 85:
          case 86:
          case 87:
          case 88:
          case 89:
          case 90:
          case 95:
          case 97:
          case 98:
          case 99:
          case 100:
          case 101:
          case 102:
          case 103:
          case 104:
          case 105:
          case 106:
          case 107:
          case 108:
          case 109:
          case 110:
          case 111:
          case 112:
          case 113:
          case 114:
          case 115:
          case 116:
          case 117:
          case 118:
          case 119:
          case 120:
          case 121:
          case 122:
            return (function(e, t, n, r, i) {
              var o = e.body,
                s = o.length,
                a = t + 1,
                u = 0;
              for (
                ;
                a !== s &&
                null !== (u = Oa.call(o, a)) &&
                (95 === u ||
                  (u >= 48 && u <= 57) ||
                  (u >= 65 && u <= 90) ||
                  (u >= 97 && u <= 122));

              )
                ++a;
              return new ka(Ta.NAME, t, a, n, r, i, Pa.call(o, t, a));
            })(n, o, s, a, t);
          case 45:
          case 48:
          case 49:
          case 50:
          case 51:
          case 52:
          case 53:
          case 54:
          case 55:
          case 56:
          case 57:
            return (function(e, t, n, r, i, o) {
              var s = e.body,
                a = n,
                u = t,
                c = !1;
              45 === a && (a = Oa.call(s, ++u));
              if (48 === a) {
                if ((a = Oa.call(s, ++u)) >= 48 && a <= 57)
                  throw ba(
                    e,
                    u,
                    "Invalid number, unexpected digit after 0: ".concat(
                      Na(a),
                      "."
                    )
                  );
              } else (u = xa(e, u, a)), (a = Oa.call(s, u));
              46 === a &&
                ((c = !0),
                (a = Oa.call(s, ++u)),
                (u = xa(e, u, a)),
                (a = Oa.call(s, u)));
              (69 !== a && 101 !== a) ||
                ((c = !0),
                (43 !== (a = Oa.call(s, ++u)) && 45 !== a) ||
                  (a = Oa.call(s, ++u)),
                (u = xa(e, u, a)));
              return new ka(
                c ? Ta.FLOAT : Ta.INT,
                t,
                u,
                r,
                i,
                o,
                Pa.call(s, t, u)
              );
            })(n, o, u, s, a, t);
          case 34:
            return 34 === Oa.call(r, o + 1) && 34 === Oa.call(r, o + 2)
              ? (function(e, t, n, r, i) {
                  var o = e.body,
                    s = t + 3,
                    a = s,
                    u = 0,
                    c = "";
                  for (; s < o.length && null !== (u = Oa.call(o, s)); ) {
                    if (
                      34 === u &&
                      34 === Oa.call(o, s + 1) &&
                      34 === Oa.call(o, s + 2)
                    )
                      return (
                        (c += Pa.call(o, a, s)),
                        new ka(Ta.BLOCK_STRING, t, s + 3, n, r, i, wa(c))
                      );
                    if (u < 32 && 9 !== u && 10 !== u && 13 !== u)
                      throw ba(
                        e,
                        s,
                        "Invalid character within String: ".concat(Na(u), ".")
                      );
                    92 === u &&
                    34 === Oa.call(o, s + 1) &&
                    34 === Oa.call(o, s + 2) &&
                    34 === Oa.call(o, s + 3)
                      ? ((c += Pa.call(o, a, s) + '"""'), (a = s += 4))
                      : ++s;
                  }
                  throw ba(e, s, "Unterminated string.");
                })(n, o, s, a, t)
              : (function(e, t, n, r, i) {
                  var o = e.body,
                    s = t + 1,
                    a = s,
                    u = 0,
                    c = "";
                  for (
                    ;
                    s < o.length &&
                    null !== (u = Oa.call(o, s)) &&
                    10 !== u &&
                    13 !== u;

                  ) {
                    if (34 === u)
                      return (
                        (c += Pa.call(o, a, s)),
                        new ka(Ta.STRING, t, s + 1, n, r, i, c)
                      );
                    if (u < 32 && 9 !== u)
                      throw ba(
                        e,
                        s,
                        "Invalid character within String: ".concat(Na(u), ".")
                      );
                    if ((++s, 92 === u)) {
                      switch (
                        ((c += Pa.call(o, a, s - 1)), (u = Oa.call(o, s)))
                      ) {
                        case 34:
                          c += '"';
                          break;
                        case 47:
                          c += "/";
                          break;
                        case 92:
                          c += "\\";
                          break;
                        case 98:
                          c += "\b";
                          break;
                        case 102:
                          c += "\f";
                          break;
                        case 110:
                          c += "\n";
                          break;
                        case 114:
                          c += "\r";
                          break;
                        case 116:
                          c += "\t";
                          break;
                        case 117:
                          var f =
                            ((l = Oa.call(o, s + 1)),
                            (h = Oa.call(o, s + 2)),
                            (d = Oa.call(o, s + 3)),
                            (p = Oa.call(o, s + 4)),
                            (Ua(l) << 12) |
                              (Ua(h) << 8) |
                              (Ua(d) << 4) |
                              Ua(p));
                          if (f < 0)
                            throw ba(
                              e,
                              s,
                              "Invalid character escape sequence: " +
                                "\\u".concat(o.slice(s + 1, s + 5), ".")
                            );
                          (c += String.fromCharCode(f)), (s += 4);
                          break;
                        default:
                          throw ba(
                            e,
                            s,
                            "Invalid character escape sequence: \\".concat(
                              String.fromCharCode(u),
                              "."
                            )
                          );
                      }
                      ++s, (a = s);
                    }
                  }
                  var l, h, d, p;
                  throw ba(e, s, "Unterminated string.");
                })(n, o, s, a, t);
        }
        throw ba(
          n,
          o,
          (function(e) {
            if (e < 32 && 9 !== e && 10 !== e && 13 !== e)
              return "Cannot contain the invalid character ".concat(Na(e), ".");
            if (39 === e)
              return "Unexpected single quote character ('), did you mean to use a double quote (\")?";
            return "Cannot parse the unexpected character ".concat(Na(e), ".");
          })(u)
        );
      }
      function xa(e, t, n) {
        var r = e.body,
          i = t,
          o = n;
        if (o >= 48 && o <= 57) {
          do {
            o = Oa.call(r, ++i);
          } while (o >= 48 && o <= 57);
          return i;
        }
        throw ba(
          e,
          i,
          "Invalid number, expected digit but got: ".concat(Na(o), ".")
        );
      }
      function Ua(e) {
        return e >= 48 && e <= 57
          ? e - 48
          : e >= 65 && e <= 70
          ? e - 55
          : e >= 97 && e <= 102
          ? e - 87
          : -1;
      }
      ka.prototype.toJSON = ka.prototype.inspect = function() {
        return {
          kind: this.kind,
          value: this.value,
          line: this.line,
          column: this.column
        };
      };
      var Da = Object.freeze({
          NAME: "Name",
          DOCUMENT: "Document",
          OPERATION_DEFINITION: "OperationDefinition",
          VARIABLE_DEFINITION: "VariableDefinition",
          SELECTION_SET: "SelectionSet",
          FIELD: "Field",
          ARGUMENT: "Argument",
          FRAGMENT_SPREAD: "FragmentSpread",
          INLINE_FRAGMENT: "InlineFragment",
          FRAGMENT_DEFINITION: "FragmentDefinition",
          VARIABLE: "Variable",
          INT: "IntValue",
          FLOAT: "FloatValue",
          STRING: "StringValue",
          BOOLEAN: "BooleanValue",
          NULL: "NullValue",
          ENUM: "EnumValue",
          LIST: "ListValue",
          OBJECT: "ObjectValue",
          OBJECT_FIELD: "ObjectField",
          DIRECTIVE: "Directive",
          NAMED_TYPE: "NamedType",
          LIST_TYPE: "ListType",
          NON_NULL_TYPE: "NonNullType",
          SCHEMA_DEFINITION: "SchemaDefinition",
          OPERATION_TYPE_DEFINITION: "OperationTypeDefinition",
          SCALAR_TYPE_DEFINITION: "ScalarTypeDefinition",
          OBJECT_TYPE_DEFINITION: "ObjectTypeDefinition",
          FIELD_DEFINITION: "FieldDefinition",
          INPUT_VALUE_DEFINITION: "InputValueDefinition",
          INTERFACE_TYPE_DEFINITION: "InterfaceTypeDefinition",
          UNION_TYPE_DEFINITION: "UnionTypeDefinition",
          ENUM_TYPE_DEFINITION: "EnumTypeDefinition",
          ENUM_VALUE_DEFINITION: "EnumValueDefinition",
          INPUT_OBJECT_TYPE_DEFINITION: "InputObjectTypeDefinition",
          DIRECTIVE_DEFINITION: "DirectiveDefinition",
          SCHEMA_EXTENSION: "SchemaExtension",
          SCALAR_TYPE_EXTENSION: "ScalarTypeExtension",
          OBJECT_TYPE_EXTENSION: "ObjectTypeExtension",
          INTERFACE_TYPE_EXTENSION: "InterfaceTypeExtension",
          UNION_TYPE_EXTENSION: "UnionTypeExtension",
          ENUM_TYPE_EXTENSION: "EnumTypeExtension",
          INPUT_OBJECT_TYPE_EXTENSION: "InputObjectTypeExtension"
        }),
        Ma = Object.freeze({
          QUERY: "QUERY",
          MUTATION: "MUTATION",
          SUBSCRIPTION: "SUBSCRIPTION",
          FIELD: "FIELD",
          FRAGMENT_DEFINITION: "FRAGMENT_DEFINITION",
          FRAGMENT_SPREAD: "FRAGMENT_SPREAD",
          INLINE_FRAGMENT: "INLINE_FRAGMENT",
          VARIABLE_DEFINITION: "VARIABLE_DEFINITION",
          SCHEMA: "SCHEMA",
          SCALAR: "SCALAR",
          OBJECT: "OBJECT",
          FIELD_DEFINITION: "FIELD_DEFINITION",
          ARGUMENT_DEFINITION: "ARGUMENT_DEFINITION",
          INTERFACE: "INTERFACE",
          UNION: "UNION",
          ENUM: "ENUM",
          ENUM_VALUE: "ENUM_VALUE",
          INPUT_OBJECT: "INPUT_OBJECT",
          INPUT_FIELD_DEFINITION: "INPUT_FIELD_DEFINITION"
        });
      function ja(e, t) {
        var n = "string" == typeof e ? new ma(e) : e;
        if (!(n instanceof ma))
          throw new TypeError("Must provide Source. Received: ".concat(pa(n)));
        return (function(e) {
          var t = e.token;
          return {
            kind: Da.DOCUMENT,
            definitions: Pu(e, Ta.SOF, Fa, Ta.EOF),
            loc: _u(e, t)
          };
        })(Ea(n, t || {}));
      }
      function La(e) {
        var t = Iu(e, Ta.NAME);
        return { kind: Da.NAME, value: t.value, loc: _u(e, t) };
      }
      function Fa(e) {
        if (Eu(e, Ta.NAME))
          switch (e.token.value) {
            case "query":
            case "mutation":
            case "subscription":
            case "fragment":
              return Ba(e);
            case "schema":
            case "scalar":
            case "type":
            case "interface":
            case "union":
            case "enum":
            case "input":
            case "directive":
              return au(e);
            case "extend":
              return (function(e) {
                var t = e.lookahead();
                if (t.kind === Ta.NAME)
                  switch (t.value) {
                    case "schema":
                      return (function(e) {
                        var t = e.token;
                        Tu(e, "extend"), Tu(e, "schema");
                        var n = ru(e, !0),
                          r = Eu(e, Ta.BRACE_L)
                            ? Pu(e, Ta.BRACE_L, fu, Ta.BRACE_R)
                            : [];
                        if (0 === n.length && 0 === r.length) throw Cu(e);
                        return {
                          kind: Da.SCHEMA_EXTENSION,
                          directives: n,
                          operationTypes: r,
                          loc: _u(e, t)
                        };
                      })(e);
                    case "scalar":
                      return (function(e) {
                        var t = e.token;
                        Tu(e, "extend"), Tu(e, "scalar");
                        var n = La(e),
                          r = ru(e, !0);
                        if (0 === r.length) throw Cu(e);
                        return {
                          kind: Da.SCALAR_TYPE_EXTENSION,
                          name: n,
                          directives: r,
                          loc: _u(e, t)
                        };
                      })(e);
                    case "type":
                      return (function(e) {
                        var t = e.token;
                        Tu(e, "extend"), Tu(e, "type");
                        var n = La(e),
                          r = lu(e),
                          i = ru(e, !0),
                          o = hu(e);
                        if (0 === r.length && 0 === i.length && 0 === o.length)
                          throw Cu(e);
                        return {
                          kind: Da.OBJECT_TYPE_EXTENSION,
                          name: n,
                          interfaces: r,
                          directives: i,
                          fields: o,
                          loc: _u(e, t)
                        };
                      })(e);
                    case "interface":
                      return (function(e) {
                        var t = e.token;
                        Tu(e, "extend"), Tu(e, "interface");
                        var n = La(e),
                          r = ru(e, !0),
                          i = hu(e);
                        if (0 === r.length && 0 === i.length) throw Cu(e);
                        return {
                          kind: Da.INTERFACE_TYPE_EXTENSION,
                          name: n,
                          directives: r,
                          fields: i,
                          loc: _u(e, t)
                        };
                      })(e);
                    case "union":
                      return (function(e) {
                        var t = e.token;
                        Tu(e, "extend"), Tu(e, "union");
                        var n = La(e),
                          r = ru(e, !0),
                          i = yu(e);
                        if (0 === r.length && 0 === i.length) throw Cu(e);
                        return {
                          kind: Da.UNION_TYPE_EXTENSION,
                          name: n,
                          directives: r,
                          types: i,
                          loc: _u(e, t)
                        };
                      })(e);
                    case "enum":
                      return (function(e) {
                        var t = e.token;
                        Tu(e, "extend"), Tu(e, "enum");
                        var n = La(e),
                          r = ru(e, !0),
                          i = vu(e);
                        if (0 === r.length && 0 === i.length) throw Cu(e);
                        return {
                          kind: Da.ENUM_TYPE_EXTENSION,
                          name: n,
                          directives: r,
                          values: i,
                          loc: _u(e, t)
                        };
                      })(e);
                    case "input":
                      return (function(e) {
                        var t = e.token;
                        Tu(e, "extend"), Tu(e, "input");
                        var n = La(e),
                          r = ru(e, !0),
                          i = bu(e);
                        if (0 === r.length && 0 === i.length) throw Cu(e);
                        return {
                          kind: Da.INPUT_OBJECT_TYPE_EXTENSION,
                          name: n,
                          directives: r,
                          fields: i,
                          loc: _u(e, t)
                        };
                      })(e);
                  }
                throw Cu(e, t);
              })(e);
          }
        else {
          if (Eu(e, Ta.BRACE_L)) return Ba(e);
          if (uu(e)) return au(e);
        }
        throw Cu(e);
      }
      function Ba(e) {
        if (Eu(e, Ta.NAME))
          switch (e.token.value) {
            case "query":
            case "mutation":
            case "subscription":
              return qa(e);
            case "fragment":
              return (function(e) {
                var t = e.token;
                if (
                  (Tu(e, "fragment"), e.options.experimentalFragmentVariables)
                )
                  return {
                    kind: Da.FRAGMENT_DEFINITION,
                    name: $a(e),
                    variableDefinitions: za(e),
                    typeCondition: (Tu(e, "on"), su(e)),
                    directives: ru(e, !1),
                    selectionSet: Ha(e),
                    loc: _u(e, t)
                  };
                return {
                  kind: Da.FRAGMENT_DEFINITION,
                  name: $a(e),
                  typeCondition: (Tu(e, "on"), su(e)),
                  directives: ru(e, !1),
                  selectionSet: Ha(e),
                  loc: _u(e, t)
                };
              })(e);
          }
        else if (Eu(e, Ta.BRACE_L)) return qa(e);
        throw Cu(e);
      }
      function qa(e) {
        var t = e.token;
        if (Eu(e, Ta.BRACE_L))
          return {
            kind: Da.OPERATION_DEFINITION,
            operation: "query",
            name: void 0,
            variableDefinitions: [],
            directives: [],
            selectionSet: Ha(e),
            loc: _u(e, t)
          };
        var n,
          r = Va(e);
        return (
          Eu(e, Ta.NAME) && (n = La(e)),
          {
            kind: Da.OPERATION_DEFINITION,
            operation: r,
            name: n,
            variableDefinitions: za(e),
            directives: ru(e, !1),
            selectionSet: Ha(e),
            loc: _u(e, t)
          }
        );
      }
      function Va(e) {
        var t = Iu(e, Ta.NAME);
        switch (t.value) {
          case "query":
            return "query";
          case "mutation":
            return "mutation";
          case "subscription":
            return "subscription";
        }
        throw Cu(e, t);
      }
      function za(e) {
        return Eu(e, Ta.PAREN_L) ? Pu(e, Ta.PAREN_L, Ka, Ta.PAREN_R) : [];
      }
      function Ka(e) {
        var t = e.token;
        return e.options.experimentalVariableDefinitionDirectives
          ? {
              kind: Da.VARIABLE_DEFINITION,
              variable: Ga(e),
              type: (Iu(e, Ta.COLON), ou(e)),
              defaultValue: Au(e, Ta.EQUALS) ? Xa(e, !0) : void 0,
              directives: ru(e, !0),
              loc: _u(e, t)
            }
          : {
              kind: Da.VARIABLE_DEFINITION,
              variable: Ga(e),
              type: (Iu(e, Ta.COLON), ou(e)),
              defaultValue: Au(e, Ta.EQUALS) ? Xa(e, !0) : void 0,
              loc: _u(e, t)
            };
      }
      function Ga(e) {
        var t = e.token;
        return (
          Iu(e, Ta.DOLLAR), { kind: Da.VARIABLE, name: La(e), loc: _u(e, t) }
        );
      }
      function Ha(e) {
        var t = e.token;
        return {
          kind: Da.SELECTION_SET,
          selections: Pu(e, Ta.BRACE_L, Wa, Ta.BRACE_R),
          loc: _u(e, t)
        };
      }
      function Wa(e) {
        return Eu(e, Ta.SPREAD)
          ? (function(e) {
              var t,
                n = e.token;
              if ((Iu(e, Ta.SPREAD), Eu(e, Ta.NAME) && "on" !== e.token.value))
                return {
                  kind: Da.FRAGMENT_SPREAD,
                  name: $a(e),
                  directives: ru(e, !1),
                  loc: _u(e, n)
                };
              "on" === e.token.value && (e.advance(), (t = su(e)));
              return {
                kind: Da.INLINE_FRAGMENT,
                typeCondition: t,
                directives: ru(e, !1),
                selectionSet: Ha(e),
                loc: _u(e, n)
              };
            })(e)
          : (function(e) {
              var t,
                n,
                r = e.token,
                i = La(e);
              Au(e, Ta.COLON) ? ((t = i), (n = La(e))) : (n = i);
              return {
                kind: Da.FIELD,
                alias: t,
                name: n,
                arguments: Ya(e, !1),
                directives: ru(e, !1),
                selectionSet: Eu(e, Ta.BRACE_L) ? Ha(e) : void 0,
                loc: _u(e, r)
              };
            })(e);
      }
      function Ya(e, t) {
        var n = t ? Qa : Ja;
        return Eu(e, Ta.PAREN_L) ? Pu(e, Ta.PAREN_L, n, Ta.PAREN_R) : [];
      }
      function Ja(e) {
        var t = e.token;
        return {
          kind: Da.ARGUMENT,
          name: La(e),
          value: (Iu(e, Ta.COLON), Xa(e, !1)),
          loc: _u(e, t)
        };
      }
      function Qa(e) {
        var t = e.token;
        return {
          kind: Da.ARGUMENT,
          name: La(e),
          value: (Iu(e, Ta.COLON), eu(e)),
          loc: _u(e, t)
        };
      }
      function $a(e) {
        if ("on" === e.token.value) throw Cu(e);
        return La(e);
      }
      function Xa(e, t) {
        var n = e.token;
        switch (n.kind) {
          case Ta.BRACKET_L:
            return (function(e, t) {
              var n = e.token,
                r = t ? eu : tu;
              return {
                kind: Da.LIST,
                values: Ou(e, Ta.BRACKET_L, r, Ta.BRACKET_R),
                loc: _u(e, n)
              };
            })(e, t);
          case Ta.BRACE_L:
            return (function(e, t) {
              var n = e.token;
              Iu(e, Ta.BRACE_L);
              var r = [];
              for (; !Au(e, Ta.BRACE_R); ) r.push(nu(e, t));
              return { kind: Da.OBJECT, fields: r, loc: _u(e, n) };
            })(e, t);
          case Ta.INT:
            return e.advance(), { kind: Da.INT, value: n.value, loc: _u(e, n) };
          case Ta.FLOAT:
            return (
              e.advance(), { kind: Da.FLOAT, value: n.value, loc: _u(e, n) }
            );
          case Ta.STRING:
          case Ta.BLOCK_STRING:
            return Za(e);
          case Ta.NAME:
            return "true" === n.value || "false" === n.value
              ? (e.advance(),
                { kind: Da.BOOLEAN, value: "true" === n.value, loc: _u(e, n) })
              : "null" === n.value
              ? (e.advance(), { kind: Da.NULL, loc: _u(e, n) })
              : (e.advance(), { kind: Da.ENUM, value: n.value, loc: _u(e, n) });
          case Ta.DOLLAR:
            if (!t) return Ga(e);
        }
        throw Cu(e);
      }
      function Za(e) {
        var t = e.token;
        return (
          e.advance(),
          {
            kind: Da.STRING,
            value: t.value,
            block: t.kind === Ta.BLOCK_STRING,
            loc: _u(e, t)
          }
        );
      }
      function eu(e) {
        return Xa(e, !0);
      }
      function tu(e) {
        return Xa(e, !1);
      }
      function nu(e, t) {
        var n = e.token;
        return {
          kind: Da.OBJECT_FIELD,
          name: La(e),
          value: (Iu(e, Ta.COLON), Xa(e, t)),
          loc: _u(e, n)
        };
      }
      function ru(e, t) {
        for (var n = []; Eu(e, Ta.AT); ) n.push(iu(e, t));
        return n;
      }
      function iu(e, t) {
        var n = e.token;
        return (
          Iu(e, Ta.AT),
          {
            kind: Da.DIRECTIVE,
            name: La(e),
            arguments: Ya(e, t),
            loc: _u(e, n)
          }
        );
      }
      function ou(e) {
        var t,
          n = e.token;
        return (
          Au(e, Ta.BRACKET_L)
            ? ((t = ou(e)),
              Iu(e, Ta.BRACKET_R),
              (t = { kind: Da.LIST_TYPE, type: t, loc: _u(e, n) }))
            : (t = su(e)),
          Au(e, Ta.BANG)
            ? { kind: Da.NON_NULL_TYPE, type: t, loc: _u(e, n) }
            : t
        );
      }
      function su(e) {
        var t = e.token;
        return { kind: Da.NAMED_TYPE, name: La(e), loc: _u(e, t) };
      }
      function au(e) {
        var t = uu(e) ? e.lookahead() : e.token;
        if (t.kind === Ta.NAME)
          switch (t.value) {
            case "schema":
              return (function(e) {
                var t = e.token;
                Tu(e, "schema");
                var n = ru(e, !0),
                  r = Pu(e, Ta.BRACE_L, fu, Ta.BRACE_R);
                return {
                  kind: Da.SCHEMA_DEFINITION,
                  directives: n,
                  operationTypes: r,
                  loc: _u(e, t)
                };
              })(e);
            case "scalar":
              return (function(e) {
                var t = e.token,
                  n = cu(e);
                Tu(e, "scalar");
                var r = La(e),
                  i = ru(e, !0);
                return {
                  kind: Da.SCALAR_TYPE_DEFINITION,
                  description: n,
                  name: r,
                  directives: i,
                  loc: _u(e, t)
                };
              })(e);
            case "type":
              return (function(e) {
                var t = e.token,
                  n = cu(e);
                Tu(e, "type");
                var r = La(e),
                  i = lu(e),
                  o = ru(e, !0),
                  s = hu(e);
                return {
                  kind: Da.OBJECT_TYPE_DEFINITION,
                  description: n,
                  name: r,
                  interfaces: i,
                  directives: o,
                  fields: s,
                  loc: _u(e, t)
                };
              })(e);
            case "interface":
              return (function(e) {
                var t = e.token,
                  n = cu(e);
                Tu(e, "interface");
                var r = La(e),
                  i = ru(e, !0),
                  o = hu(e);
                return {
                  kind: Da.INTERFACE_TYPE_DEFINITION,
                  description: n,
                  name: r,
                  directives: i,
                  fields: o,
                  loc: _u(e, t)
                };
              })(e);
            case "union":
              return (function(e) {
                var t = e.token,
                  n = cu(e);
                Tu(e, "union");
                var r = La(e),
                  i = ru(e, !0),
                  o = yu(e);
                return {
                  kind: Da.UNION_TYPE_DEFINITION,
                  description: n,
                  name: r,
                  directives: i,
                  types: o,
                  loc: _u(e, t)
                };
              })(e);
            case "enum":
              return (function(e) {
                var t = e.token,
                  n = cu(e);
                Tu(e, "enum");
                var r = La(e),
                  i = ru(e, !0),
                  o = vu(e);
                return {
                  kind: Da.ENUM_TYPE_DEFINITION,
                  description: n,
                  name: r,
                  directives: i,
                  values: o,
                  loc: _u(e, t)
                };
              })(e);
            case "input":
              return (function(e) {
                var t = e.token,
                  n = cu(e);
                Tu(e, "input");
                var r = La(e),
                  i = ru(e, !0),
                  o = bu(e);
                return {
                  kind: Da.INPUT_OBJECT_TYPE_DEFINITION,
                  description: n,
                  name: r,
                  directives: i,
                  fields: o,
                  loc: _u(e, t)
                };
              })(e);
            case "directive":
              return (function(e) {
                var t = e.token,
                  n = cu(e);
                Tu(e, "directive"), Iu(e, Ta.AT);
                var r = La(e),
                  i = pu(e);
                Tu(e, "on");
                var o = (function(e) {
                  Au(e, Ta.PIPE);
                  var t = [];
                  do {
                    t.push(wu(e));
                  } while (Au(e, Ta.PIPE));
                  return t;
                })(e);
                return {
                  kind: Da.DIRECTIVE_DEFINITION,
                  description: n,
                  name: r,
                  arguments: i,
                  locations: o,
                  loc: _u(e, t)
                };
              })(e);
          }
        throw Cu(e, t);
      }
      function uu(e) {
        return Eu(e, Ta.STRING) || Eu(e, Ta.BLOCK_STRING);
      }
      function cu(e) {
        if (uu(e)) return Za(e);
      }
      function fu(e) {
        var t = e.token,
          n = Va(e);
        Iu(e, Ta.COLON);
        var r = su(e);
        return {
          kind: Da.OPERATION_TYPE_DEFINITION,
          operation: n,
          type: r,
          loc: _u(e, t)
        };
      }
      function lu(e) {
        var t = [];
        if ("implements" === e.token.value) {
          e.advance(), Au(e, Ta.AMP);
          do {
            t.push(su(e));
          } while (
            Au(e, Ta.AMP) ||
            (e.options.allowLegacySDLImplementsInterfaces && Eu(e, Ta.NAME))
          );
        }
        return t;
      }
      function hu(e) {
        return e.options.allowLegacySDLEmptyFields &&
          Eu(e, Ta.BRACE_L) &&
          e.lookahead().kind === Ta.BRACE_R
          ? (e.advance(), e.advance(), [])
          : Eu(e, Ta.BRACE_L)
          ? Pu(e, Ta.BRACE_L, du, Ta.BRACE_R)
          : [];
      }
      function du(e) {
        var t = e.token,
          n = cu(e),
          r = La(e),
          i = pu(e);
        Iu(e, Ta.COLON);
        var o = ou(e),
          s = ru(e, !0);
        return {
          kind: Da.FIELD_DEFINITION,
          description: n,
          name: r,
          arguments: i,
          type: o,
          directives: s,
          loc: _u(e, t)
        };
      }
      function pu(e) {
        return Eu(e, Ta.PAREN_L) ? Pu(e, Ta.PAREN_L, gu, Ta.PAREN_R) : [];
      }
      function gu(e) {
        var t = e.token,
          n = cu(e),
          r = La(e);
        Iu(e, Ta.COLON);
        var i,
          o = ou(e);
        Au(e, Ta.EQUALS) && (i = eu(e));
        var s = ru(e, !0);
        return {
          kind: Da.INPUT_VALUE_DEFINITION,
          description: n,
          name: r,
          type: o,
          defaultValue: i,
          directives: s,
          loc: _u(e, t)
        };
      }
      function yu(e) {
        var t = [];
        if (Au(e, Ta.EQUALS)) {
          Au(e, Ta.PIPE);
          do {
            t.push(su(e));
          } while (Au(e, Ta.PIPE));
        }
        return t;
      }
      function vu(e) {
        return Eu(e, Ta.BRACE_L) ? Pu(e, Ta.BRACE_L, mu, Ta.BRACE_R) : [];
      }
      function mu(e) {
        var t = e.token,
          n = cu(e),
          r = La(e),
          i = ru(e, !0);
        return {
          kind: Da.ENUM_VALUE_DEFINITION,
          description: n,
          name: r,
          directives: i,
          loc: _u(e, t)
        };
      }
      function bu(e) {
        return Eu(e, Ta.BRACE_L) ? Pu(e, Ta.BRACE_L, gu, Ta.BRACE_R) : [];
      }
      function wu(e) {
        var t = e.token,
          n = La(e);
        if (Ma.hasOwnProperty(n.value)) return n;
        throw Cu(e, t);
      }
      function _u(e, t) {
        if (!e.options.noLocation) return new Su(t, e.lastToken, e.source);
      }
      function Su(e, t, n) {
        (this.start = e.start),
          (this.end = t.end),
          (this.startToken = e),
          (this.endToken = t),
          (this.source = n);
      }
      function Eu(e, t) {
        return e.token.kind === t;
      }
      function Au(e, t) {
        var n = e.token.kind === t;
        return n && e.advance(), n;
      }
      function Iu(e, t) {
        var n = e.token;
        if (n.kind === t) return e.advance(), n;
        throw ba(
          e.source,
          n.start,
          "Expected ".concat(t, ", found ").concat(Ca(n))
        );
      }
      function Tu(e, t) {
        var n = e.token;
        if (n.kind === Ta.NAME && n.value === t) return e.advance(), n;
        throw ba(
          e.source,
          n.start,
          'Expected "'.concat(t, '", found ').concat(Ca(n))
        );
      }
      function Cu(e, t) {
        var n = t || e.token;
        return ba(e.source, n.start, "Unexpected ".concat(Ca(n)));
      }
      function Ou(e, t, n, r) {
        Iu(e, t);
        for (var i = []; !Au(e, r); ) i.push(n(e));
        return i;
      }
      function Pu(e, t, n, r) {
        Iu(e, t);
        for (var i = [n(e)]; !Au(e, r); ) i.push(n(e));
        return i;
      }
      Su.prototype.toJSON = Su.prototype.inspect = function() {
        return { start: this.start, end: this.end };
      };
      var ku = { userAgent: q.userAgent },
        Nu = "undefined" != typeof Symbol && "function" == typeof Symbol.for,
        Ru = Nu
          ? Symbol.for("INTERNAL_AWS_APPSYNC_PUBSUB_PROVIDER")
          : "@@INTERNAL_AWS_APPSYNC_PUBSUB_PROVIDER",
        xu = Nu
          ? Symbol.for("INTERNAL_AWS_APPSYNC_REALTIME_PUBSUB_PROVIDER")
          : "@@INTERNAL_AWS_APPSYNC_REALTIME_PUBSUB_PROVIDER",
        Uu = n(42),
        Du = n.n(Uu).a,
        Mu = n(43),
        ju = function() {
          return (ju =
            Object.assign ||
            function(e) {
              for (var t, n = 1, r = arguments.length; n < r; n++)
                for (var i in (t = arguments[n]))
                  Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
              return e;
            }).apply(this, arguments);
        },
        Lu = new f("AbstractPubSubProvider"),
        Fu = (function() {
          function e(e) {
            void 0 === e && (e = {}), (this._config = e);
          }
          return (
            (e.prototype.configure = function(e) {
              return (
                void 0 === e && (e = {}),
                (this._config = ju(ju({}, e), this._config)),
                Lu.debug("configure " + this.getProviderName(), this._config),
                this.options
              );
            }),
            (e.prototype.getCategory = function() {
              return "PubSub";
            }),
            Object.defineProperty(e.prototype, "options", {
              get: function() {
                return ju({}, this._config);
              },
              enumerable: !0,
              configurable: !0
            }),
            e
          );
        })(),
        Bu = (function() {
          var e = function(t, n) {
            return (e =
              Object.setPrototypeOf ||
              ({ __proto__: [] } instanceof Array &&
                function(e, t) {
                  e.__proto__ = t;
                }) ||
              function(e, t) {
                for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
              })(t, n);
          };
          return function(t, n) {
            function r() {
              this.constructor = t;
            }
            e(t, n),
              (t.prototype =
                null === n
                  ? Object.create(n)
                  : ((r.prototype = n.prototype), new r()));
          };
        })(),
        qu = function() {
          return (qu =
            Object.assign ||
            function(e) {
              for (var t, n = 1, r = arguments.length; n < r; n++)
                for (var i in (t = arguments[n]))
                  Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
              return e;
            }).apply(this, arguments);
        },
        Vu = function(e, t, n, r) {
          return new (n || (n = Promise))(function(i, o) {
            function s(e) {
              try {
                u(r.next(e));
              } catch (e) {
                o(e);
              }
            }
            function a(e) {
              try {
                u(r.throw(e));
              } catch (e) {
                o(e);
              }
            }
            function u(e) {
              var t;
              e.done
                ? i(e.value)
                : ((t = e.value),
                  t instanceof n
                    ? t
                    : new n(function(e) {
                        e(t);
                      })).then(s, a);
            }
            u((r = r.apply(e, t || [])).next());
          });
        },
        zu = function(e, t) {
          var n,
            r,
            i,
            o,
            s = {
              label: 0,
              sent: function() {
                if (1 & i[0]) throw i[1];
                return i[1];
              },
              trys: [],
              ops: []
            };
          return (
            (o = { next: a(0), throw: a(1), return: a(2) }),
            "function" == typeof Symbol &&
              (o[Symbol.iterator] = function() {
                return this;
              }),
            o
          );
          function a(o) {
            return function(a) {
              return (function(o) {
                if (n) throw new TypeError("Generator is already executing.");
                for (; s; )
                  try {
                    if (
                      ((n = 1),
                      r &&
                        (i =
                          2 & o[0]
                            ? r.return
                            : o[0]
                            ? r.throw || ((i = r.return) && i.call(r), 0)
                            : r.next) &&
                        !(i = i.call(r, o[1])).done)
                    )
                      return i;
                    switch (((r = 0), i && (o = [2 & o[0], i.value]), o[0])) {
                      case 0:
                      case 1:
                        i = o;
                        break;
                      case 4:
                        return s.label++, { value: o[1], done: !1 };
                      case 5:
                        s.label++, (r = o[1]), (o = [0]);
                        continue;
                      case 7:
                        (o = s.ops.pop()), s.trys.pop();
                        continue;
                      default:
                        if (
                          !((i = s.trys),
                          (i = i.length > 0 && i[i.length - 1]) ||
                            (6 !== o[0] && 2 !== o[0]))
                        ) {
                          s = 0;
                          continue;
                        }
                        if (
                          3 === o[0] &&
                          (!i || (o[1] > i[0] && o[1] < i[3]))
                        ) {
                          s.label = o[1];
                          break;
                        }
                        if (6 === o[0] && s.label < i[1]) {
                          (s.label = i[1]), (i = o);
                          break;
                        }
                        if (i && s.label < i[2]) {
                          (s.label = i[2]), s.ops.push(o);
                          break;
                        }
                        i[2] && s.ops.pop(), s.trys.pop();
                        continue;
                    }
                    o = t.call(e, s);
                  } catch (e) {
                    (o = [6, e]), (r = 0);
                  } finally {
                    n = i = 0;
                  }
                if (5 & o[0]) throw o[1];
                return { value: o[0] ? o[1] : void 0, done: !0 };
              })([o, a]);
            };
          }
        },
        Ku = function(e, t) {
          var n = {};
          for (var r in e)
            Object.prototype.hasOwnProperty.call(e, r) &&
              t.indexOf(r) < 0 &&
              (n[r] = e[r]);
          if (null != e && "function" == typeof Object.getOwnPropertySymbols) {
            var i = 0;
            for (r = Object.getOwnPropertySymbols(e); i < r.length; i++)
              t.indexOf(r[i]) < 0 &&
                Object.prototype.propertyIsEnumerable.call(e, r[i]) &&
                (n[r[i]] = e[r[i]]);
          }
          return n;
        },
        Gu = new f("MqttOverWSProvider");
      var Hu,
        Wu,
        Yu,
        Ju = (function() {
          function e() {
            this.promises = new Map();
          }
          return (
            (e.prototype.get = function(e, t) {
              return Vu(this, void 0, void 0, function() {
                var n;
                return zu(this, function(r) {
                  return (
                    (n = this.promises.get(e)) ||
                      ((n = t(e)), this.promises.set(e, n)),
                    [2, n]
                  );
                });
              });
            }),
            Object.defineProperty(e.prototype, "allClients", {
              get: function() {
                return Array.from(this.promises.keys());
              },
              enumerable: !0,
              configurable: !0
            }),
            (e.prototype.remove = function(e) {
              this.promises.delete(e);
            }),
            e
          );
        })(),
        Qu = "undefined" != typeof Symbol ? Symbol("topic") : "@@topic",
        $u = (function(e) {
          function t(t) {
            void 0 === t && (t = {});
            var n =
              e.call(
                this,
                qu(qu({}, t), { clientId: t.clientId || Object(Cr.v4)() })
              ) || this;
            return (
              (n._clientsQueue = new Ju()),
              (n._topicObservers = new Map()),
              (n._clientIdObservers = new Map()),
              n
            );
          }
          return (
            Bu(t, e),
            Object.defineProperty(t.prototype, "clientId", {
              get: function() {
                return this.options.clientId;
              },
              enumerable: !0,
              configurable: !0
            }),
            Object.defineProperty(t.prototype, "endpoint", {
              get: function() {
                return this.options.aws_pubsub_endpoint;
              },
              enumerable: !0,
              configurable: !0
            }),
            Object.defineProperty(t.prototype, "clientsQueue", {
              get: function() {
                return this._clientsQueue;
              },
              enumerable: !0,
              configurable: !0
            }),
            Object.defineProperty(t.prototype, "isSSLEnabled", {
              get: function() {
                return !this.options
                  .aws_appsync_dangerously_connect_to_http_endpoint_for_testing;
              },
              enumerable: !0,
              configurable: !0
            }),
            (t.prototype.getTopicForValue = function(e) {
              return "object" == typeof e && e[Qu];
            }),
            (t.prototype.getProviderName = function() {
              return "MqttOverWSProvider";
            }),
            (t.prototype.onDisconnect = function(e) {
              var t = this,
                n = e.clientId,
                r = e.errorCode,
                i = Ku(e, ["clientId", "errorCode"]);
              if (0 !== r) {
                Gu.warn(n, JSON.stringify(qu({ errorCode: r }, i), null, 2));
                var o = [],
                  s = this._clientIdObservers.get(n);
                if (!s) return;
                s.forEach(function(e) {
                  e.error("Disconnected, error code: " + r),
                    t._topicObservers.forEach(function(t, n) {
                      t.delete(e), 0 === t.size && o.push(n);
                    });
                }),
                  this._clientIdObservers.delete(n),
                  o.forEach(function(e) {
                    t._topicObservers.delete(e);
                  });
              }
            }),
            (t.prototype.newClient = function(e) {
              var t = e.url,
                n = e.clientId;
              return Vu(this, void 0, void 0, function() {
                var e,
                  r = this;
                return zu(this, function(i) {
                  switch (i.label) {
                    case 0:
                      return (
                        Gu.debug("Creating new MQTT client", n),
                        ((e = new Mu.Client(t, n)).onMessageArrived = function(
                          e
                        ) {
                          var t = e.destinationName,
                            n = e.payloadString;
                          r._onMessage(t, n);
                        }),
                        (e.onConnectionLost = function(e) {
                          var t = e.errorCode,
                            i = Ku(e, ["errorCode"]);
                          r.onDisconnect(qu({ clientId: n, errorCode: t }, i));
                        }),
                        [
                          4,
                          new Promise(function(t, n) {
                            e.connect({
                              useSSL: r.isSSLEnabled,
                              mqttVersion: 3,
                              onSuccess: function() {
                                return t(e);
                              },
                              onFailure: n
                            });
                          })
                        ]
                      );
                    case 1:
                      return i.sent(), [2, e];
                  }
                });
              });
            }),
            (t.prototype.connect = function(e, t) {
              return (
                void 0 === t && (t = {}),
                Vu(this, void 0, void 0, function() {
                  var n = this;
                  return zu(this, function(r) {
                    switch (r.label) {
                      case 0:
                        return [
                          4,
                          this.clientsQueue.get(e, function(e) {
                            return n.newClient(qu(qu({}, t), { clientId: e }));
                          })
                        ];
                      case 1:
                        return [2, r.sent()];
                    }
                  });
                })
              );
            }),
            (t.prototype.disconnect = function(e) {
              return Vu(this, void 0, void 0, function() {
                var t;
                return zu(this, function(n) {
                  switch (n.label) {
                    case 0:
                      return [
                        4,
                        this.clientsQueue.get(e, function() {
                          return null;
                        })
                      ];
                    case 1:
                      return (
                        (t = n.sent()) && t.isConnected() && t.disconnect(),
                        this.clientsQueue.remove(e),
                        [2]
                      );
                  }
                });
              });
            }),
            (t.prototype.publish = function(e, t) {
              return Vu(this, void 0, void 0, function() {
                var n, r, i, o;
                return zu(this, function(s) {
                  switch (s.label) {
                    case 0:
                      return (
                        (n = [].concat(e)),
                        (r = JSON.stringify(t)),
                        [4, this.endpoint]
                      );
                    case 1:
                      return (
                        (i = s.sent()),
                        [4, this.connect(this.clientId, { url: i })]
                      );
                    case 2:
                      return (
                        (o = s.sent()),
                        Gu.debug("Publishing to topic(s)", n.join(","), r),
                        n.forEach(function(e) {
                          return o.send(e, r);
                        }),
                        [2]
                      );
                  }
                });
              });
            }),
            (t.prototype._onMessage = function(e, t) {
              try {
                var n = [];
                this._topicObservers.forEach(function(t, r) {
                  (function(e, t) {
                    for (
                      var n = e.split("/"),
                        r = n.length,
                        i = t.split("/"),
                        o = 0;
                      o < r;
                      ++o
                    ) {
                      var s = n[o],
                        a = i[o];
                      if ("#" === s) return i.length >= r;
                      if ("+" !== s && s !== a) return !1;
                    }
                    return r === i.length;
                  })(r, e) && n.push(t);
                });
                var r = JSON.parse(t);
                "object" == typeof r && (r[Qu] = e),
                  n.forEach(function(e) {
                    e.forEach(function(e) {
                      return e.next(r);
                    });
                  });
              } catch (e) {
                Gu.warn("Error handling message", e, t);
              }
            }),
            (t.prototype.subscribe = function(e, t) {
              var n = this;
              void 0 === t && (t = {});
              var r = [].concat(e);
              return (
                Gu.debug("Subscribing to topic(s)", r.join(",")),
                new Du(function(e) {
                  var i;
                  r.forEach(function(t) {
                    var r = n._topicObservers.get(t);
                    r || ((r = new Set()), n._topicObservers.set(t, r)),
                      r.add(e);
                  });
                  var o = t.clientId,
                    s = void 0 === o ? n.clientId : o,
                    a = n._clientIdObservers.get(s);
                  return (
                    a || (a = new Set()),
                    a.add(e),
                    n._clientIdObservers.set(s, a),
                    Vu(n, void 0, void 0, function() {
                      var n, o, a, u;
                      return zu(this, function(c) {
                        switch (c.label) {
                          case 0:
                            return void 0 !== (n = t.url)
                              ? [3, 2]
                              : [4, this.endpoint];
                          case 1:
                            return (a = c.sent()), [3, 3];
                          case 2:
                            (a = n), (c.label = 3);
                          case 3:
                            (o = a), (c.label = 4);
                          case 4:
                            return (
                              c.trys.push([4, 6, , 7]),
                              [4, this.connect(s, { url: o })]
                            );
                          case 5:
                            return (
                              (i = c.sent()),
                              r.forEach(function(e) {
                                i.subscribe(e);
                              }),
                              [3, 7]
                            );
                          case 6:
                            return (u = c.sent()), e.error(u), [3, 7];
                          case 7:
                            return [2];
                        }
                      });
                    }),
                    function() {
                      return (
                        Gu.debug("Unsubscribing from topic(s)", r.join(",")),
                        i &&
                          (n._clientIdObservers.get(s).delete(e),
                          0 === n._clientIdObservers.get(s).size &&
                            (n.disconnect(s), n._clientIdObservers.delete(s)),
                          r.forEach(function(t) {
                            var r = n._topicObservers.get(t) || new Set();
                            r.delete(e),
                              0 === r.size &&
                                (n._topicObservers.delete(t),
                                i.isConnected() && i.unsubscribe(t));
                          })),
                        null
                      );
                    }
                  );
                })
              );
            }),
            t
          );
        })(Fu),
        Xu = (function() {
          var e = function(t, n) {
            return (e =
              Object.setPrototypeOf ||
              ({ __proto__: [] } instanceof Array &&
                function(e, t) {
                  e.__proto__ = t;
                }) ||
              function(e, t) {
                for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
              })(t, n);
          };
          return function(t, n) {
            function r() {
              this.constructor = t;
            }
            e(t, n),
              (t.prototype =
                null === n
                  ? Object.create(n)
                  : ((r.prototype = n.prototype), new r()));
          };
        })(),
        Zu = function(e, t, n, r) {
          return new (n || (n = Promise))(function(i, o) {
            function s(e) {
              try {
                u(r.next(e));
              } catch (e) {
                o(e);
              }
            }
            function a(e) {
              try {
                u(r.throw(e));
              } catch (e) {
                o(e);
              }
            }
            function u(e) {
              var t;
              e.done
                ? i(e.value)
                : ((t = e.value),
                  t instanceof n
                    ? t
                    : new n(function(e) {
                        e(t);
                      })).then(s, a);
            }
            u((r = r.apply(e, t || [])).next());
          });
        },
        ec = function(e, t) {
          var n,
            r,
            i,
            o,
            s = {
              label: 0,
              sent: function() {
                if (1 & i[0]) throw i[1];
                return i[1];
              },
              trys: [],
              ops: []
            };
          return (
            (o = { next: a(0), throw: a(1), return: a(2) }),
            "function" == typeof Symbol &&
              (o[Symbol.iterator] = function() {
                return this;
              }),
            o
          );
          function a(o) {
            return function(a) {
              return (function(o) {
                if (n) throw new TypeError("Generator is already executing.");
                for (; s; )
                  try {
                    if (
                      ((n = 1),
                      r &&
                        (i =
                          2 & o[0]
                            ? r.return
                            : o[0]
                            ? r.throw || ((i = r.return) && i.call(r), 0)
                            : r.next) &&
                        !(i = i.call(r, o[1])).done)
                    )
                      return i;
                    switch (((r = 0), i && (o = [2 & o[0], i.value]), o[0])) {
                      case 0:
                      case 1:
                        i = o;
                        break;
                      case 4:
                        return s.label++, { value: o[1], done: !1 };
                      case 5:
                        s.label++, (r = o[1]), (o = [0]);
                        continue;
                      case 7:
                        (o = s.ops.pop()), s.trys.pop();
                        continue;
                      default:
                        if (
                          !((i = s.trys),
                          (i = i.length > 0 && i[i.length - 1]) ||
                            (6 !== o[0] && 2 !== o[0]))
                        ) {
                          s = 0;
                          continue;
                        }
                        if (
                          3 === o[0] &&
                          (!i || (o[1] > i[0] && o[1] < i[3]))
                        ) {
                          s.label = o[1];
                          break;
                        }
                        if (6 === o[0] && s.label < i[1]) {
                          (s.label = i[1]), (i = o);
                          break;
                        }
                        if (i && s.label < i[2]) {
                          (s.label = i[2]), s.ops.push(o);
                          break;
                        }
                        i[2] && s.ops.pop(), s.trys.pop();
                        continue;
                    }
                    o = t.call(e, s);
                  } catch (e) {
                    (o = [6, e]), (r = 0);
                  } finally {
                    n = i = 0;
                  }
                if (5 & o[0]) throw o[1];
                return { value: o[0] ? o[1] : void 0, done: !0 };
              })([o, a]);
            };
          }
        },
        tc = function(e, t) {
          var n = {};
          for (var r in e)
            Object.prototype.hasOwnProperty.call(e, r) &&
              t.indexOf(r) < 0 &&
              (n[r] = e[r]);
          if (null != e && "function" == typeof Object.getOwnPropertySymbols) {
            var i = 0;
            for (r = Object.getOwnPropertySymbols(e); i < r.length; i++)
              t.indexOf(r[i]) < 0 &&
                Object.prototype.propertyIsEnumerable.call(e, r[i]) &&
                (n[r[i]] = e[r[i]]);
          }
          return n;
        },
        nc = function(e, t) {
          var n = "function" == typeof Symbol && e[Symbol.iterator];
          if (!n) return e;
          var r,
            i,
            o = n.call(e),
            s = [];
          try {
            for (; (void 0 === t || t-- > 0) && !(r = o.next()).done; )
              s.push(r.value);
          } catch (e) {
            i = { error: e };
          } finally {
            try {
              r && !r.done && (n = o.return) && n.call(o);
            } finally {
              if (i) throw i.error;
            }
          }
          return s;
        },
        rc = function() {
          for (var e = [], t = 0; t < arguments.length; t++)
            e = e.concat(nc(arguments[t]));
          return e;
        },
        ic = new f("AWSAppSyncProvider"),
        oc = (function(e) {
          function t() {
            var t = (null !== e && e.apply(this, arguments)) || this;
            return (t._topicClient = new Map()), (t._topicAlias = new Map()), t;
          }
          return (
            Xu(t, e),
            Object.defineProperty(t.prototype, "endpoint", {
              get: function() {
                throw new Error("Not supported");
              },
              enumerable: !0,
              configurable: !0
            }),
            (t.prototype.getProviderName = function() {
              return "AWSAppSyncProvider";
            }),
            (t.prototype.publish = function(e, t, n) {
              return Zu(this, void 0, void 0, function() {
                return ec(this, function(e) {
                  throw new Error("Operation not supported");
                });
              });
            }),
            (t.prototype._cleanUp = function(e) {
              var t = this;
              Array.from(this._topicClient.entries())
                .filter(function(t) {
                  return nc(t, 2)[1].clientId === e;
                })
                .map(function(e) {
                  return nc(e, 1)[0];
                })
                .forEach(function(e) {
                  return t._cleanUpForTopic(e);
                });
            }),
            (t.prototype._cleanUpForTopic = function(e) {
              this._topicClient.delete(e), this._topicAlias.delete(e);
            }),
            (t.prototype.onDisconnect = function(e) {
              var t = this,
                n = e.clientId,
                r = e.errorCode,
                i = tc(e, ["clientId", "errorCode"]);
              0 !== r &&
                (Array.from(this._topicClient.entries())
                  .filter(function(e) {
                    return nc(e, 2)[1].clientId === n;
                  })
                  .map(function(e) {
                    return nc(e, 1)[0];
                  })
                  .forEach(function(e) {
                    t._topicObservers.has(e) &&
                      (t._topicObservers.get(e).forEach(function(e) {
                        e.closed || e.error(i);
                      }),
                      t._topicObservers.delete(e));
                  }),
                this._cleanUp(n));
            }),
            (t.prototype.disconnect = function(t) {
              return Zu(this, void 0, void 0, function() {
                return ec(this, function(n) {
                  switch (n.label) {
                    case 0:
                      return [
                        4,
                        this.clientsQueue.get(t, function() {
                          return null;
                        })
                      ];
                    case 1:
                      return (
                        n.sent(), [4, e.prototype.disconnect.call(this, t)]
                      );
                    case 2:
                      return n.sent(), this._cleanUp(t), [2];
                  }
                });
              });
            }),
            (t.prototype.subscribe = function(e, t) {
              var n = this;
              void 0 === t && (t = {});
              var r = new Du(function(r) {
                var i = [].concat(e);
                return (
                  ic.debug("Subscribing to topic(s)", i.join(",")),
                  Zu(n, void 0, void 0, function() {
                    var e,
                      n,
                      o,
                      s,
                      a,
                      u = this;
                    return ec(this, function(c) {
                      switch (c.label) {
                        case 0:
                          return (
                            i.forEach(function(e) {
                              u._topicObservers.has(e) ||
                                u._topicObservers.set(e, new Set()),
                                u._topicObservers.get(e).add(r);
                            }),
                            (e = t.mqttConnections),
                            (n = void 0 === e ? [] : e),
                            (o = t.newSubscriptions),
                            (s = Object.entries(o).map(function(e) {
                              var t = nc(e, 2),
                                n = t[0];
                              return [t[1].topic, n];
                            })),
                            (this._topicAlias = new Map(
                              rc(Array.from(this._topicAlias.entries()), s)
                            )),
                            (a = Object.entries(
                              i.reduce(function(e, t) {
                                var r = n.find(function(e) {
                                  return e.topics.indexOf(t) > -1;
                                });
                                if (r) {
                                  var i = r.client,
                                    o = r.url;
                                  e[i] ||
                                    (e[i] = { url: o, topics: new Set() }),
                                    e[i].topics.add(t);
                                }
                                return e;
                              }, {})
                            )),
                            [
                              4,
                              Promise.all(
                                a.map(function(e) {
                                  var t = nc(e, 2),
                                    n = t[0],
                                    i = t[1],
                                    o = i.url,
                                    s = i.topics;
                                  return Zu(u, void 0, void 0, function() {
                                    var e,
                                      t,
                                      i = this;
                                    return ec(this, function(a) {
                                      switch (a.label) {
                                        case 0:
                                          (e = null), (a.label = 1);
                                        case 1:
                                          return (
                                            a.trys.push([1, 3, , 4]),
                                            [
                                              4,
                                              this.connect(n, {
                                                clientId: n,
                                                url: o
                                              })
                                            ]
                                          );
                                        case 2:
                                          return (e = a.sent()), [3, 4];
                                        case 3:
                                          return (
                                            (t = a.sent()),
                                            r.error({
                                              message: "Failed to connect",
                                              error: t
                                            }),
                                            r.complete(),
                                            [2, void 0]
                                          );
                                        case 4:
                                          return (
                                            s.forEach(function(t) {
                                              e.isConnected() &&
                                                (e.subscribe(t),
                                                i._topicClient.set(t, e));
                                            }),
                                            [2, e]
                                          );
                                      }
                                    });
                                  });
                                })
                              )
                            ]
                          );
                        case 1:
                          return c.sent(), [2];
                      }
                    });
                  }),
                  function() {
                    ic.debug("Unsubscribing from topic(s)", i.join(",")),
                      i.forEach(function(e) {
                        var t = n._topicClient.get(e);
                        t &&
                          t.isConnected() &&
                          (t.unsubscribe(e),
                          n._topicClient.delete(e),
                          Array.from(n._topicClient.values()).some(function(e) {
                            return e === t;
                          }) || n.disconnect(t.clientId)),
                          n._topicObservers.delete(e);
                      });
                  }
                );
              });
              return Du.from(r).map(function(e) {
                var t = n.getTopicForValue(e),
                  r = n._topicAlias.get(t);
                return (
                  (e.data = Object.entries(e.data).reduce(function(e, t) {
                    var n = nc(t, 2),
                      i = n[0],
                      o = n[1];
                    return (e[r || i] = o), e;
                  }, {})),
                  e
                );
              });
            }),
            t
          );
        })($u),
        sc = (function() {
          var e = function(t, n) {
            return (e =
              Object.setPrototypeOf ||
              ({ __proto__: [] } instanceof Array &&
                function(e, t) {
                  e.__proto__ = t;
                }) ||
              function(e, t) {
                for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
              })(t, n);
          };
          return function(t, n) {
            function r() {
              this.constructor = t;
            }
            e(t, n),
              (t.prototype =
                null === n
                  ? Object.create(n)
                  : ((r.prototype = n.prototype), new r()));
          };
        })(),
        ac = function() {
          return (ac =
            Object.assign ||
            function(e) {
              for (var t, n = 1, r = arguments.length; n < r; n++)
                for (var i in (t = arguments[n]))
                  Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
              return e;
            }).apply(this, arguments);
        },
        uc = function(e, t, n, r) {
          return new (n || (n = Promise))(function(i, o) {
            function s(e) {
              try {
                u(r.next(e));
              } catch (e) {
                o(e);
              }
            }
            function a(e) {
              try {
                u(r.throw(e));
              } catch (e) {
                o(e);
              }
            }
            function u(e) {
              var t;
              e.done
                ? i(e.value)
                : ((t = e.value),
                  t instanceof n
                    ? t
                    : new n(function(e) {
                        e(t);
                      })).then(s, a);
            }
            u((r = r.apply(e, t || [])).next());
          });
        },
        cc = function(e, t) {
          var n,
            r,
            i,
            o,
            s = {
              label: 0,
              sent: function() {
                if (1 & i[0]) throw i[1];
                return i[1];
              },
              trys: [],
              ops: []
            };
          return (
            (o = { next: a(0), throw: a(1), return: a(2) }),
            "function" == typeof Symbol &&
              (o[Symbol.iterator] = function() {
                return this;
              }),
            o
          );
          function a(o) {
            return function(a) {
              return (function(o) {
                if (n) throw new TypeError("Generator is already executing.");
                for (; s; )
                  try {
                    if (
                      ((n = 1),
                      r &&
                        (i =
                          2 & o[0]
                            ? r.return
                            : o[0]
                            ? r.throw || ((i = r.return) && i.call(r), 0)
                            : r.next) &&
                        !(i = i.call(r, o[1])).done)
                    )
                      return i;
                    switch (((r = 0), i && (o = [2 & o[0], i.value]), o[0])) {
                      case 0:
                      case 1:
                        i = o;
                        break;
                      case 4:
                        return s.label++, { value: o[1], done: !1 };
                      case 5:
                        s.label++, (r = o[1]), (o = [0]);
                        continue;
                      case 7:
                        (o = s.ops.pop()), s.trys.pop();
                        continue;
                      default:
                        if (
                          !((i = s.trys),
                          (i = i.length > 0 && i[i.length - 1]) ||
                            (6 !== o[0] && 2 !== o[0]))
                        ) {
                          s = 0;
                          continue;
                        }
                        if (
                          3 === o[0] &&
                          (!i || (o[1] > i[0] && o[1] < i[3]))
                        ) {
                          s.label = o[1];
                          break;
                        }
                        if (6 === o[0] && s.label < i[1]) {
                          (s.label = i[1]), (i = o);
                          break;
                        }
                        if (i && s.label < i[2]) {
                          (s.label = i[2]), s.ops.push(o);
                          break;
                        }
                        i[2] && s.ops.pop(), s.trys.pop();
                        continue;
                    }
                    o = t.call(e, s);
                  } catch (e) {
                    (o = [6, e]), (r = 0);
                  } finally {
                    n = i = 0;
                  }
                if (5 & o[0]) throw o[1];
                return { value: o[0] ? o[1] : void 0, done: !0 };
              })([o, a]);
            };
          }
        },
        fc = function(e, t) {
          var n = "function" == typeof Symbol && e[Symbol.iterator];
          if (!n) return e;
          var r,
            i,
            o = n.call(e),
            s = [];
          try {
            for (; (void 0 === t || t-- > 0) && !(r = o.next()).done; )
              s.push(r.value);
          } catch (e) {
            i = { error: e };
          } finally {
            try {
              r && !r.done && (n = o.return) && n.call(o);
            } finally {
              if (i) throw i.error;
            }
          }
          return s;
        },
        lc = new f("AWSAppSyncRealTimeProvider"),
        hc =
          "undefined" != typeof Symbol && "function" == typeof Symbol.for
            ? Symbol.for("amplify_default")
            : "@@amplify_default",
        dc = [400, 401, 403];
      !(function(e) {
        (e.GQL_CONNECTION_INIT = "connection_init"),
          (e.GQL_CONNECTION_ERROR = "connection_error"),
          (e.GQL_CONNECTION_ACK = "connection_ack"),
          (e.GQL_START = "start"),
          (e.GQL_START_ACK = "start_ack"),
          (e.GQL_DATA = "data"),
          (e.GQL_CONNECTION_KEEP_ALIVE = "ka"),
          (e.GQL_STOP = "stop"),
          (e.GQL_COMPLETE = "complete"),
          (e.GQL_ERROR = "error");
      })(Hu || (Hu = {})),
        (function(e) {
          (e[(e.PENDING = 0)] = "PENDING"),
            (e[(e.CONNECTED = 1)] = "CONNECTED"),
            (e[(e.FAILED = 2)] = "FAILED");
        })(Wu || (Wu = {})),
        (function(e) {
          (e[(e.CLOSED = 0)] = "CLOSED"),
            (e[(e.READY = 1)] = "READY"),
            (e[(e.CONNECTING = 2)] = "CONNECTING");
        })(Yu || (Yu = {}));
      var pc,
        gc = {
          accept: "application/json, text/javascript",
          "content-encoding": "amz-1.0",
          "content-type": "application/json; charset=UTF-8"
        },
        yc = (function(e) {
          function t() {
            var t = (null !== e && e.apply(this, arguments)) || this;
            return (
              (t.socketStatus = Yu.CLOSED),
              (t.keepAliveTimeout = 3e5),
              (t.subscriptionObserverMap = new Map()),
              (t.promiseArray = []),
              t
            );
          }
          return (
            sc(t, e),
            (t.prototype.getProviderName = function() {
              return "AWSAppSyncRealTimeProvider";
            }),
            (t.prototype.newClient = function() {
              throw new Error("Not used here");
            }),
            (t.prototype.publish = function(e, t, n) {
              return uc(this, void 0, void 0, function() {
                return cc(this, function(e) {
                  throw new Error("Operation not supported");
                });
              });
            }),
            (t.prototype.subscribe = function(e, t) {
              var n = this,
                r = t.appSyncGraphqlEndpoint;
              return new Du(function(e) {
                if (r) {
                  var i = Object(Cr.v4)();
                  return (
                    n._startSubscriptionWithAWSAppSyncRealTime({
                      options: t,
                      observer: e,
                      subscriptionId: i
                    }),
                    function() {
                      return uc(n, void 0, void 0, function() {
                        var e, t;
                        return cc(this, function(n) {
                          switch (n.label) {
                            case 0:
                              return (
                                n.trys.push([0, 2, 3, 4]),
                                [4, this._waitForSubscriptionToBeConnected(i)]
                              );
                            case 1:
                              if (
                                (n.sent(),
                                !(e = (
                                  this.subscriptionObserverMap.get(i) || {}
                                ).subscriptionState))
                              )
                                return [2];
                              if (e !== Wu.CONNECTED)
                                throw new Error("Subscription never connected");
                              return this._sendUnsubscriptionMessage(i), [3, 4];
                            case 2:
                              return (
                                (t = n.sent()),
                                lc.debug("Error while unsubscribing " + t),
                                [3, 4]
                              );
                            case 3:
                              return this._removeSubscriptionObserver(i), [7];
                            case 4:
                              return [2];
                          }
                        });
                      });
                    }
                  );
                }
                e.error({
                  errors: [
                    ac(
                      {},
                      new ta(
                        "Subscribe only available for AWS AppSync endpoint"
                      )
                    )
                  ]
                }),
                  e.complete();
              });
            }),
            Object.defineProperty(t.prototype, "isSSLEnabled", {
              get: function() {
                return !this.options
                  .aws_appsync_dangerously_connect_to_http_endpoint_for_testing;
              },
              enumerable: !0,
              configurable: !0
            }),
            (t.prototype._startSubscriptionWithAWSAppSyncRealTime = function(
              e
            ) {
              var t = e.options,
                n = e.observer,
                r = e.subscriptionId;
              return uc(this, void 0, void 0, function() {
                var e,
                  i,
                  o,
                  s,
                  a,
                  u,
                  c,
                  f,
                  l,
                  h,
                  d,
                  p,
                  g,
                  y,
                  v,
                  m,
                  b,
                  w,
                  _,
                  S,
                  E,
                  A,
                  I,
                  T,
                  C,
                  O,
                  P = this;
                return cc(this, function(k) {
                  switch (k.label) {
                    case 0:
                      return (
                        (e = t.appSyncGraphqlEndpoint),
                        (i = t.authenticationType),
                        (o = t.query),
                        (s = t.variables),
                        (a = t.apiKey),
                        (u = t.region),
                        (c = t.graphql_headers),
                        (f =
                          void 0 === c
                            ? function() {
                                return {};
                              }
                            : c),
                        (l = t.additionalHeaders),
                        (h = void 0 === l ? {} : l),
                        (d = Wu.PENDING),
                        (p = { query: o, variables: s }),
                        this.subscriptionObserverMap.set(r, {
                          observer: n,
                          query: o,
                          variables: s,
                          subscriptionState: d,
                          startAckTimeoutId: null
                        }),
                        (g = JSON.stringify(p)),
                        (v = [{}]),
                        [
                          4,
                          this._awsRealTimeHeaderBasedAuth({
                            apiKey: a,
                            appSyncGraphqlEndpoint: e,
                            authenticationType: i,
                            payload: g,
                            canonicalUri: "",
                            region: u
                          })
                        ]
                      );
                    case 1:
                      return (
                        (m = [ac.apply(void 0, v.concat([k.sent()]))]), [4, f()]
                      );
                    case 2:
                      (y = ac.apply(void 0, [
                        ac.apply(void 0, [
                          ac.apply(void 0, m.concat([k.sent()])),
                          h
                        ]),
                        ((O = {}), (O["x-amz-user-agent"] = ku.userAgent), O)
                      ])),
                        (b = {
                          id: r,
                          payload: {
                            data: g,
                            extensions: { authorization: ac({}, y) }
                          },
                          type: Hu.GQL_START
                        }),
                        (w = JSON.stringify(b)),
                        (k.label = 3);
                    case 3:
                      return (
                        k.trys.push([3, 5, , 6]),
                        [
                          4,
                          this._initializeWebSocketConnection({
                            apiKey: a,
                            appSyncGraphqlEndpoint: e,
                            authenticationType: i,
                            region: u
                          })
                        ]
                      );
                    case 4:
                      return k.sent(), [3, 6];
                    case 5:
                      return (
                        (_ = k.sent()),
                        lc.debug({ err: _ }),
                        (S = _.message),
                        (E = void 0 === S ? "" : S),
                        n.error({
                          errors: [ac({}, new ta("Connection failed: " + E))]
                        }),
                        n.complete(),
                        "function" ==
                          typeof (A = (
                            this.subscriptionObserverMap.get(r) || {}
                          ).subscriptionFailedCallback) && A(),
                        [2]
                      );
                    case 6:
                      return (
                        (I = this.subscriptionObserverMap.get(r)),
                        (T = I.subscriptionFailedCallback),
                        (C = I.subscriptionReadyCallback),
                        this.subscriptionObserverMap.set(r, {
                          observer: n,
                          subscriptionState: d,
                          variables: s,
                          query: o,
                          subscriptionReadyCallback: C,
                          subscriptionFailedCallback: T,
                          startAckTimeoutId: setTimeout(function() {
                            P._timeoutStartSubscriptionAck.call(P, r);
                          }, 15e3)
                        }),
                        this.awsRealTimeSocket.send(w),
                        [2]
                      );
                  }
                });
              });
            }),
            (t.prototype._waitForSubscriptionToBeConnected = function(e) {
              return uc(this, void 0, void 0, function() {
                var t = this;
                return cc(this, function(n) {
                  return this.subscriptionObserverMap.get(e)
                    .subscriptionState === Wu.PENDING
                    ? [
                        2,
                        new Promise(function(n, r) {
                          var i = t.subscriptionObserverMap.get(e),
                            o = i.observer,
                            s = i.subscriptionState,
                            a = i.variables,
                            u = i.query;
                          t.subscriptionObserverMap.set(e, {
                            observer: o,
                            subscriptionState: s,
                            variables: a,
                            query: u,
                            subscriptionReadyCallback: n,
                            subscriptionFailedCallback: r
                          });
                        })
                      ]
                    : [2];
                });
              });
            }),
            (t.prototype._sendUnsubscriptionMessage = function(e) {
              try {
                if (
                  this.awsRealTimeSocket &&
                  this.awsRealTimeSocket.readyState === WebSocket.OPEN &&
                  this.socketStatus === Yu.READY
                ) {
                  var t = { id: e, type: Hu.GQL_STOP },
                    n = JSON.stringify(t);
                  this.awsRealTimeSocket.send(n);
                }
              } catch (e) {
                lc.debug({ err: e });
              }
            }),
            (t.prototype._removeSubscriptionObserver = function(e) {
              this.subscriptionObserverMap.delete(e),
                setTimeout(this._closeSocketIfRequired.bind(this), 1e3);
            }),
            (t.prototype._closeSocketIfRequired = function() {
              if (!(this.subscriptionObserverMap.size > 0))
                if (this.awsRealTimeSocket)
                  if (this.awsRealTimeSocket.bufferedAmount > 0)
                    setTimeout(this._closeSocketIfRequired.bind(this), 1e3);
                  else {
                    lc.debug("closing WebSocket..."),
                      clearTimeout(this.keepAliveTimeoutId);
                    var e = this.awsRealTimeSocket;
                    (e.onclose = void 0),
                      (e.onerror = void 0),
                      e.close(1e3),
                      (this.awsRealTimeSocket = null),
                      (this.socketStatus = Yu.CLOSED);
                  }
                else this.socketStatus = Yu.CLOSED;
            }),
            (t.prototype._handleIncomingSubscriptionMessage = function(e) {
              lc.debug(
                "subscription message from AWS AppSync RealTime: " + e.data
              );
              var t = JSON.parse(e.data),
                n = t.id,
                r = void 0 === n ? "" : n,
                i = t.payload,
                o = t.type,
                s = this.subscriptionObserverMap.get(r) || {},
                a = s.observer,
                u = void 0 === a ? null : a,
                c = s.query,
                f = void 0 === c ? "" : c,
                l = s.variables,
                h = void 0 === l ? {} : l,
                d = s.startAckTimeoutId,
                p = s.subscriptionReadyCallback,
                g = s.subscriptionFailedCallback;
              if (
                (lc.debug({ id: r, observer: u, query: f, variables: h }),
                o === Hu.GQL_DATA && i && i.data)
              )
                u ? u.next(i) : lc.debug("observer not found for id: " + r);
              else if (o !== Hu.GQL_START_ACK) {
                if (o === Hu.GQL_CONNECTION_KEEP_ALIVE)
                  return (
                    clearTimeout(this.keepAliveTimeoutId),
                    void (this.keepAliveTimeoutId = setTimeout(
                      this._errorDisconnect.bind(this, pc.TIMEOUT_DISCONNECT),
                      this.keepAliveTimeout
                    ))
                  );
                if (o === Hu.GQL_ERROR) {
                  v = Wu.FAILED;
                  this.subscriptionObserverMap.set(r, {
                    observer: u,
                    query: f,
                    variables: h,
                    startAckTimeoutId: d,
                    subscriptionReadyCallback: p,
                    subscriptionFailedCallback: g,
                    subscriptionState: v
                  }),
                    u.error({
                      errors: [
                        ac(
                          {},
                          new ta("Connection failed: " + JSON.stringify(i))
                        )
                      ]
                    }),
                    clearTimeout(d),
                    u.complete(),
                    "function" == typeof g && g();
                }
              } else {
                lc.debug(
                  "subscription ready for " +
                    JSON.stringify({ query: f, variables: h })
                ),
                  "function" == typeof p && p(),
                  clearTimeout(d),
                  (function(e, t, n) {
                    y.dispatch(
                      "api",
                      { event: e, data: t, message: n },
                      "PubSub",
                      hc
                    );
                  })(
                    pc.SUBSCRIPTION_ACK,
                    { query: f, variables: h },
                    "Connection established for subscription"
                  );
                var v = Wu.CONNECTED;
                this.subscriptionObserverMap.set(r, {
                  observer: u,
                  query: f,
                  variables: h,
                  startAckTimeoutId: null,
                  subscriptionState: v,
                  subscriptionReadyCallback: p,
                  subscriptionFailedCallback: g
                });
              }
            }),
            (t.prototype._errorDisconnect = function(e) {
              lc.debug("Disconnect error: " + e),
                this.subscriptionObserverMap.forEach(function(t) {
                  var n = t.observer;
                  n && !n.closed && n.error({ errors: [ac({}, new ta(e))] });
                }),
                this.subscriptionObserverMap.clear(),
                this.awsRealTimeSocket && this.awsRealTimeSocket.close(),
                (this.socketStatus = Yu.CLOSED);
            }),
            (t.prototype._timeoutStartSubscriptionAck = function(e) {
              var t = this.subscriptionObserverMap.get(e) || {},
                n = t.observer,
                r = t.query,
                i = t.variables;
              n &&
                (this.subscriptionObserverMap.set(e, {
                  observer: n,
                  query: r,
                  variables: i,
                  subscriptionState: Wu.FAILED
                }),
                n &&
                  !n.closed &&
                  (n.error({
                    errors: [
                      ac(
                        {},
                        new ta(
                          "Subscription timeout " +
                            JSON.stringify({ query: r, variables: i })
                        )
                      )
                    ]
                  }),
                  n.complete()),
                lc.debug(
                  "timeoutStartSubscription",
                  JSON.stringify({ query: r, variables: i })
                ));
            }),
            (t.prototype._initializeWebSocketConnection = function(e) {
              var t = this,
                n = e.appSyncGraphqlEndpoint,
                r = e.authenticationType,
                i = e.apiKey,
                o = e.region;
              if (this.socketStatus !== Yu.READY)
                return new Promise(function(e, s) {
                  return uc(t, void 0, void 0, function() {
                    var t, a, u, c, f, l, h, d, p, g;
                    return cc(this, function(y) {
                      switch (y.label) {
                        case 0:
                          if (
                            (this.promiseArray.push({ res: e, rej: s }),
                            this.socketStatus !== Yu.CLOSED)
                          )
                            return [3, 5];
                          y.label = 1;
                        case 1:
                          return (
                            y.trys.push([1, 4, , 5]),
                            (this.socketStatus = Yu.CONNECTING),
                            (t = this.isSSLEnabled ? "wss://" : "ws://"),
                            (a = n
                              .replace("https://", t)
                              .replace("http://", t)
                              .replace("appsync-api", "appsync-realtime-api")
                              .replace("gogi-beta", "grt-beta")),
                            (u = "{}"),
                            (l = (f = JSON).stringify),
                            [
                              4,
                              this._awsRealTimeHeaderBasedAuth({
                                authenticationType: r,
                                payload: u,
                                canonicalUri: "/connect",
                                apiKey: i,
                                appSyncGraphqlEndpoint: n,
                                region: o
                              })
                            ]
                          );
                        case 2:
                          return (
                            (c = l.apply(f, [y.sent()])),
                            (h = Ki.Buffer.from(c).toString("base64")),
                            (d = Ki.Buffer.from(u).toString("base64")),
                            (p = a + "?header=" + h + "&payload=" + d),
                            [
                              4,
                              this._initializeRetryableHandshake({
                                awsRealTimeUrl: p
                              })
                            ]
                          );
                        case 3:
                          return (
                            y.sent(),
                            this.promiseArray.forEach(function(e) {
                              var t = e.res;
                              lc.debug("Notifying connection successful"), t();
                            }),
                            (this.socketStatus = Yu.READY),
                            (this.promiseArray = []),
                            [3, 5]
                          );
                        case 4:
                          throw ((g = y.sent()),
                          this.promiseArray.forEach(function(e) {
                            return (0, e.rej)(g);
                          }),
                          (this.promiseArray = []),
                          this.awsRealTimeSocket &&
                            this.awsRealTimeSocket.readyState ===
                              WebSocket.OPEN &&
                            this.awsRealTimeSocket.close(3001),
                          (this.awsRealTimeSocket = null),
                          (this.socketStatus = Yu.CLOSED),
                          g);
                        case 5:
                          return [2];
                      }
                    });
                  });
                });
            }),
            (t.prototype._initializeRetryableHandshake = function(e) {
              var t = e.awsRealTimeUrl;
              return uc(this, void 0, void 0, function() {
                return cc(this, function(e) {
                  switch (e.label) {
                    case 0:
                      return (
                        lc.debug("Initializaling retryable Handshake"),
                        [
                          4,
                          O(
                            this._initializeHandshake.bind(this),
                            [{ awsRealTimeUrl: t }],
                            5e3
                          )
                        ]
                      );
                    case 1:
                      return e.sent(), [2];
                  }
                });
              });
            }),
            (t.prototype._initializeHandshake = function(e) {
              var t = e.awsRealTimeUrl;
              return uc(this, void 0, void 0, function() {
                var e,
                  n,
                  r,
                  i = this;
                return cc(this, function(o) {
                  switch (o.label) {
                    case 0:
                      lc.debug("Initializing handshake " + t), (o.label = 1);
                    case 1:
                      return (
                        o.trys.push([1, 4, , 5]),
                        [
                          4,
                          new Promise(function(e, n) {
                            var r = new WebSocket(t, "graphql-ws");
                            (r.onerror = function() {
                              lc.debug("WebSocket connection error");
                            }),
                              (r.onclose = function() {
                                n(new Error("Connection handshake error"));
                              }),
                              (r.onopen = function() {
                                return (i.awsRealTimeSocket = r), e();
                              });
                          })
                        ]
                      );
                    case 2:
                      return (
                        o.sent(),
                        [
                          4,
                          new Promise(function(e, t) {
                            var n = !1;
                            (i.awsRealTimeSocket.onerror = function(e) {
                              lc.debug("WebSocket error " + JSON.stringify(e));
                            }),
                              (i.awsRealTimeSocket.onclose = function(e) {
                                lc.debug("WebSocket closed " + e.reason),
                                  t(new Error(JSON.stringify(e)));
                              }),
                              (i.awsRealTimeSocket.onmessage = function(r) {
                                lc.debug(
                                  "subscription message from AWS AppSyncRealTime: " +
                                    r.data +
                                    " "
                                );
                                var o = JSON.parse(r.data),
                                  s = o.type,
                                  a = o.payload,
                                  u = (void 0 === a ? {} : a)
                                    .connectionTimeoutMs,
                                  c = void 0 === u ? 3e5 : u;
                                if (s === Hu.GQL_CONNECTION_ACK)
                                  return (
                                    (n = !0),
                                    (i.keepAliveTimeout = c),
                                    (i.awsRealTimeSocket.onmessage = i._handleIncomingSubscriptionMessage.bind(
                                      i
                                    )),
                                    (i.awsRealTimeSocket.onerror = function(e) {
                                      lc.debug(e),
                                        i._errorDisconnect(
                                          pc.CONNECTION_CLOSED
                                        );
                                    }),
                                    (i.awsRealTimeSocket.onclose = function(e) {
                                      lc.debug("WebSocket closed " + e.reason),
                                        i._errorDisconnect(
                                          pc.CONNECTION_CLOSED
                                        );
                                    }),
                                    void e(
                                      "Cool, connected to AWS AppSyncRealTime"
                                    )
                                  );
                                if (s === Hu.GQL_CONNECTION_ERROR) {
                                  var f = o.payload,
                                    l = (void 0 === f ? {} : f).errors,
                                    h = fc(void 0 === l ? [] : l, 1)[0],
                                    d = void 0 === h ? {} : h,
                                    p = d.errorType,
                                    g = void 0 === p ? "" : p,
                                    y = d.errorCode;
                                  t({
                                    errorType: g,
                                    errorCode: void 0 === y ? 0 : y
                                  });
                                }
                              });
                            var r = { type: Hu.GQL_CONNECTION_INIT };
                            i.awsRealTimeSocket.send(JSON.stringify(r)),
                              setTimeout(
                                function() {
                                  n ||
                                    t(
                                      new Error(
                                        "Connection timeout: ack from AWSRealTime was not received on 15000 ms"
                                      )
                                    );
                                }.bind(i),
                                15e3
                              );
                          })
                        ]
                      );
                    case 3:
                      return o.sent(), [3, 5];
                    case 4:
                      throw ((e = o.sent()),
                      (n = e.errorType),
                      (r = e.errorCode),
                      dc.includes(r) ? new C(n) : n ? new Error(n) : e);
                    case 5:
                      return [2];
                  }
                });
              });
            }),
            (t.prototype._awsRealTimeHeaderBasedAuth = function(e) {
              var t = e.authenticationType,
                n = e.payload,
                r = e.canonicalUri,
                i = e.appSyncGraphqlEndpoint,
                o = e.apiKey,
                s = e.region;
              return uc(this, void 0, void 0, function() {
                var e, a, u;
                return cc(this, function(c) {
                  switch (c.label) {
                    case 0:
                      return (
                        (e = {
                          API_KEY: this._awsRealTimeApiKeyHeader.bind(this),
                          AWS_IAM: this._awsRealTimeIAMHeader.bind(this),
                          OPENID_CONNECT: this._awsRealTimeOPENIDHeader.bind(
                            this
                          ),
                          AMAZON_COGNITO_USER_POOLS: this._awsRealTimeCUPHeader.bind(
                            this
                          )
                        }),
                        "function" != typeof (a = e[t])
                          ? (lc.debug(
                              "Authentication type " + t + " not supported"
                            ),
                            [2, ""])
                          : ((u = qo.parse(i).host),
                            [
                              4,
                              a({
                                payload: n,
                                canonicalUri: r,
                                appSyncGraphqlEndpoint: i,
                                apiKey: o,
                                region: s,
                                host: u
                              })
                            ])
                      );
                    case 1:
                      return [2, c.sent()];
                  }
                });
              });
            }),
            (t.prototype._awsRealTimeCUPHeader = function(e) {
              var t = e.host;
              return uc(this, void 0, void 0, function() {
                return cc(this, function(e) {
                  switch (e.label) {
                    case 0:
                      return [4, cs.currentSession()];
                    case 1:
                      return [
                        2,
                        {
                          Authorization: e
                            .sent()
                            .getAccessToken()
                            .getJwtToken(),
                          host: t
                        }
                      ];
                  }
                });
              });
            }),
            (t.prototype._awsRealTimeOPENIDHeader = function(e) {
              var t = e.host;
              return uc(this, void 0, void 0, function() {
                var e;
                return cc(this, function(n) {
                  switch (n.label) {
                    case 0:
                      return [4, ws.getItem("federatedInfo")];
                    case 1:
                      if (!(e = n.sent()) || !e.token)
                        throw new Error("No federated jwt");
                      return [2, { Authorization: e.token, host: t }];
                  }
                });
              });
            }),
            (t.prototype._awsRealTimeApiKeyHeader = function(e) {
              var t = e.apiKey,
                n = e.host;
              return uc(this, void 0, void 0, function() {
                var e, r;
                return cc(this, function(i) {
                  return (
                    (e = new Date()),
                    (r = e.toISOString().replace(/[:\-]|\.\d{3}/g, "")),
                    [2, { host: n, "x-amz-date": r, "x-api-key": t }]
                  );
                });
              });
            }),
            (t.prototype._awsRealTimeIAMHeader = function(e) {
              var t = e.payload,
                n = e.canonicalUri,
                r = e.appSyncGraphqlEndpoint,
                i = e.region;
              return uc(this, void 0, void 0, function() {
                var e, o, s;
                return cc(this, function(a) {
                  switch (a.label) {
                    case 0:
                      return (
                        (e = { region: i, service: "appsync" }),
                        [4, this._ensureCredentials()]
                      );
                    case 1:
                      if (!a.sent()) throw new Error("No credentials");
                      return [
                        4,
                        Ri.get().then(function(e) {
                          return {
                            secret_key: e.secretAccessKey,
                            access_key: e.accessKeyId,
                            session_token: e.sessionToken
                          };
                        })
                      ];
                    case 2:
                      return (
                        (o = a.sent()),
                        (s = {
                          url: "" + r + n,
                          data: t,
                          method: "POST",
                          headers: ac({}, gc)
                        }),
                        [2, Ms.sign(s, o, e).headers]
                      );
                  }
                });
              });
            }),
            (t.prototype._ensureCredentials = function() {
              return Ri.get()
                .then(function(e) {
                  if (!e) return !1;
                  var t = Ri.shear(e);
                  return (
                    lc.debug(
                      "set credentials for AWSAppSyncRealTimeProvider",
                      t
                    ),
                    !0
                  );
                })
                .catch(function(e) {
                  return lc.warn("ensure credentials error", e), !1;
                });
            }),
            t
          );
        })(Fu),
        vc = function(e, t, n, r) {
          return new (n || (n = Promise))(function(i, o) {
            function s(e) {
              try {
                u(r.next(e));
              } catch (e) {
                o(e);
              }
            }
            function a(e) {
              try {
                u(r.throw(e));
              } catch (e) {
                o(e);
              }
            }
            function u(e) {
              var t;
              e.done
                ? i(e.value)
                : ((t = e.value),
                  t instanceof n
                    ? t
                    : new n(function(e) {
                        e(t);
                      })).then(s, a);
            }
            u((r = r.apply(e, t || [])).next());
          });
        },
        mc = function(e, t) {
          var n,
            r,
            i,
            o,
            s = {
              label: 0,
              sent: function() {
                if (1 & i[0]) throw i[1];
                return i[1];
              },
              trys: [],
              ops: []
            };
          return (
            (o = { next: a(0), throw: a(1), return: a(2) }),
            "function" == typeof Symbol &&
              (o[Symbol.iterator] = function() {
                return this;
              }),
            o
          );
          function a(o) {
            return function(a) {
              return (function(o) {
                if (n) throw new TypeError("Generator is already executing.");
                for (; s; )
                  try {
                    if (
                      ((n = 1),
                      r &&
                        (i =
                          2 & o[0]
                            ? r.return
                            : o[0]
                            ? r.throw || ((i = r.return) && i.call(r), 0)
                            : r.next) &&
                        !(i = i.call(r, o[1])).done)
                    )
                      return i;
                    switch (((r = 0), i && (o = [2 & o[0], i.value]), o[0])) {
                      case 0:
                      case 1:
                        i = o;
                        break;
                      case 4:
                        return s.label++, { value: o[1], done: !1 };
                      case 5:
                        s.label++, (r = o[1]), (o = [0]);
                        continue;
                      case 7:
                        (o = s.ops.pop()), s.trys.pop();
                        continue;
                      default:
                        if (
                          !((i = s.trys),
                          (i = i.length > 0 && i[i.length - 1]) ||
                            (6 !== o[0] && 2 !== o[0]))
                        ) {
                          s = 0;
                          continue;
                        }
                        if (
                          3 === o[0] &&
                          (!i || (o[1] > i[0] && o[1] < i[3]))
                        ) {
                          s.label = o[1];
                          break;
                        }
                        if (6 === o[0] && s.label < i[1]) {
                          (s.label = i[1]), (i = o);
                          break;
                        }
                        if (i && s.label < i[2]) {
                          (s.label = i[2]), s.ops.push(o);
                          break;
                        }
                        i[2] && s.ops.pop(), s.trys.pop();
                        continue;
                    }
                    o = t.call(e, s);
                  } catch (e) {
                    (o = [6, e]), (r = 0);
                  } finally {
                    n = i = 0;
                  }
                if (5 & o[0]) throw o[1];
                return { value: o[0] ? o[1] : void 0, done: !0 };
              })([o, a]);
            };
          }
        },
        bc = Object(w.b)().isNode,
        wc = new f("PubSub"),
        _c = new ((function() {
          function e(e) {
            (this._options = e),
              wc.debug("PubSub Options", this._options),
              (this._pluggables = []),
              (this.subscribe = this.subscribe.bind(this));
          }
          return (
            Object.defineProperty(e.prototype, "awsAppSyncProvider", {
              get: function() {
                return (
                  this._awsAppSyncProvider ||
                    (this._awsAppSyncProvider = new oc(this._options)),
                  this._awsAppSyncProvider
                );
              },
              enumerable: !0,
              configurable: !0
            }),
            Object.defineProperty(e.prototype, "awsAppSyncRealTimeProvider", {
              get: function() {
                return (
                  this._awsAppSyncRealTimeProvider ||
                    (this._awsAppSyncRealTimeProvider = new yc(this._options)),
                  this._awsAppSyncRealTimeProvider
                );
              },
              enumerable: !0,
              configurable: !0
            }),
            (e.prototype.getModuleName = function() {
              return "PubSub";
            }),
            (e.prototype.configure = function(e) {
              var t = this,
                n = e ? e.PubSub || e : {};
              return (
                wc.debug("configure PubSub", { opt: n }),
                (this._options = Object.assign({}, this._options, n)),
                this._pluggables.map(function(e) {
                  return e.configure(t._options);
                }),
                this._options
              );
            }),
            (e.prototype.addPluggable = function(e) {
              return vc(this, void 0, void 0, function() {
                return mc(this, function(t) {
                  return e && "PubSub" === e.getCategory()
                    ? (this._pluggables.push(e),
                      [2, e.configure(this._options)])
                    : [2];
                });
              });
            }),
            (e.prototype.getProviderByName = function(e) {
              return e === Ru
                ? this.awsAppSyncProvider
                : e === xu
                ? this.awsAppSyncRealTimeProvider
                : this._pluggables.find(function(t) {
                    return t.getProviderName() === e;
                  });
            }),
            (e.prototype.getProviders = function(e) {
              void 0 === e && (e = {});
              var t = e.provider;
              if (!t) return this._pluggables;
              var n = this.getProviderByName(t);
              if (!n) throw new Error("Could not find provider named " + t);
              return [n];
            }),
            (e.prototype.publish = function(e, t, n) {
              return vc(this, void 0, void 0, function() {
                return mc(this, function(r) {
                  return [
                    2,
                    Promise.all(
                      this.getProviders(n).map(function(r) {
                        return r.publish(e, t, n);
                      })
                    )
                  ];
                });
              });
            }),
            (e.prototype.subscribe = function(e, t) {
              if (bc)
                throw new Error("Subscriptions are not supported in Node");
              wc.debug("subscribe options", t);
              var n = this.getProviders(t);
              return new Du(function(r) {
                var i = n
                  .map(function(n) {
                    return { provider: n, observable: n.subscribe(e, t) };
                  })
                  .map(function(e) {
                    var t = e.provider;
                    return e.observable.subscribe({
                      start: console.error,
                      next: function(e) {
                        return r.next({ provider: t, value: e });
                      },
                      error: function(e) {
                        return r.error({ provider: t, error: e });
                      }
                    });
                  });
                return function() {
                  return i.forEach(function(e) {
                    return e.unsubscribe();
                  });
                };
              });
            }),
            e
          );
        })())(null);
      G.register(_c),
        (function(e) {
          (e.CONNECTION_CLOSED = "Connection closed"),
            (e.TIMEOUT_DISCONNECT = "Timeout disconnect"),
            (e.SUBSCRIPTION_ACK = "Subscription ack");
        })(pc || (pc = {}));
      var Sc = _c,
        Ec = function() {
          return (Ec =
            Object.assign ||
            function(e) {
              for (var t, n = 1, r = arguments.length; n < r; n++)
                for (var i in (t = arguments[n]))
                  Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
              return e;
            }).apply(this, arguments);
        },
        Ac = function(e, t, n, r) {
          return new (n || (n = Promise))(function(i, o) {
            function s(e) {
              try {
                u(r.next(e));
              } catch (e) {
                o(e);
              }
            }
            function a(e) {
              try {
                u(r.throw(e));
              } catch (e) {
                o(e);
              }
            }
            function u(e) {
              var t;
              e.done
                ? i(e.value)
                : ((t = e.value),
                  t instanceof n
                    ? t
                    : new n(function(e) {
                        e(t);
                      })).then(s, a);
            }
            u((r = r.apply(e, t || [])).next());
          });
        },
        Ic = function(e, t) {
          var n,
            r,
            i,
            o,
            s = {
              label: 0,
              sent: function() {
                if (1 & i[0]) throw i[1];
                return i[1];
              },
              trys: [],
              ops: []
            };
          return (
            (o = { next: a(0), throw: a(1), return: a(2) }),
            "function" == typeof Symbol &&
              (o[Symbol.iterator] = function() {
                return this;
              }),
            o
          );
          function a(o) {
            return function(a) {
              return (function(o) {
                if (n) throw new TypeError("Generator is already executing.");
                for (; s; )
                  try {
                    if (
                      ((n = 1),
                      r &&
                        (i =
                          2 & o[0]
                            ? r.return
                            : o[0]
                            ? r.throw || ((i = r.return) && i.call(r), 0)
                            : r.next) &&
                        !(i = i.call(r, o[1])).done)
                    )
                      return i;
                    switch (((r = 0), i && (o = [2 & o[0], i.value]), o[0])) {
                      case 0:
                      case 1:
                        i = o;
                        break;
                      case 4:
                        return s.label++, { value: o[1], done: !1 };
                      case 5:
                        s.label++, (r = o[1]), (o = [0]);
                        continue;
                      case 7:
                        (o = s.ops.pop()), s.trys.pop();
                        continue;
                      default:
                        if (
                          !((i = s.trys),
                          (i = i.length > 0 && i[i.length - 1]) ||
                            (6 !== o[0] && 2 !== o[0]))
                        ) {
                          s = 0;
                          continue;
                        }
                        if (
                          3 === o[0] &&
                          (!i || (o[1] > i[0] && o[1] < i[3]))
                        ) {
                          s.label = o[1];
                          break;
                        }
                        if (6 === o[0] && s.label < i[1]) {
                          (s.label = i[1]), (i = o);
                          break;
                        }
                        if (i && s.label < i[2]) {
                          (s.label = i[2]), s.ops.push(o);
                          break;
                        }
                        i[2] && s.ops.pop(), s.trys.pop();
                        continue;
                    }
                    o = t.call(e, s);
                  } catch (e) {
                    (o = [6, e]), (r = 0);
                  } finally {
                    n = i = 0;
                  }
                if (5 & o[0]) throw o[1];
                return { value: o[0] ? o[1] : void 0, done: !0 };
              })([o, a]);
            };
          }
        },
        Tc = function(e, t) {
          var n = {};
          for (var r in e)
            Object.prototype.hasOwnProperty.call(e, r) &&
              t.indexOf(r) < 0 &&
              (n[r] = e[r]);
          if (null != e && "function" == typeof Object.getOwnPropertySymbols) {
            var i = 0;
            for (r = Object.getOwnPropertySymbols(e); i < r.length; i++)
              t.indexOf(r[i]) < 0 &&
                Object.prototype.propertyIsEnumerable.call(e, r[i]) &&
                (n[r[i]] = e[r[i]]);
          }
          return n;
        },
        Cc = function(e, t) {
          var n = "function" == typeof Symbol && e[Symbol.iterator];
          if (!n) return e;
          var r,
            i,
            o = n.call(e),
            s = [];
          try {
            for (; (void 0 === t || t-- > 0) && !(r = o.next()).done; )
              s.push(r.value);
          } catch (e) {
            i = { error: e };
          } finally {
            try {
              r && !r.done && (n = o.return) && n.call(o);
            } finally {
              if (i) throw i.error;
            }
          }
          return s;
        },
        Oc = new f("GraphQLAPI"),
        Pc = function(e, t) {
          return void 0 === t && (t = {}), { query: e, variables: t };
        },
        kc = (function() {
          function e(e) {
            (this._api = null),
              (this.Auth = cs),
              (this.Cache = ws),
              (this.Credentials = Ri),
              (this._options = e),
              Oc.debug("API Options", this._options);
          }
          return (
            (e.prototype.getModuleName = function() {
              return "GraphQLAPI";
            }),
            (e.prototype.configure = function(e) {
              var t = e || {},
                n = t.API,
                r = void 0 === n ? {} : n,
                i = Tc(t, ["API"]),
                o = Ec(Ec({}, i), r);
              return (
                Oc.debug("configure GraphQL API", { opt: o }),
                o.aws_project_region &&
                  (o = Object.assign({}, o, {
                    region: o.aws_project_region,
                    header: {}
                  })),
                void 0 !== o.graphql_headers &&
                  "function" != typeof o.graphql_headers &&
                  (Oc.warn("graphql_headers should be a function"),
                  (o.graphql_headers = void 0)),
                (this._options = Object.assign({}, this._options, o)),
                this.createInstance(),
                this._options
              );
            }),
            (e.prototype.createInstance = function() {
              return (
                Oc.debug("create Rest instance"),
                this._options
                  ? ((this._api = new Ks(this._options)),
                    (this._api.Credentials = this.Credentials),
                    !0)
                  : Promise.reject("API not configured")
              );
            }),
            (e.prototype._headerBasedAuth = function(e) {
              return Ac(this, void 0, void 0, function() {
                var t, n, r, i, o, s;
                return Ic(this, function(a) {
                  switch (a.label) {
                    case 0:
                      switch (
                        ((t = this._options),
                        (n = t.aws_appsync_authenticationType),
                        (r = t.aws_appsync_apiKey),
                        (i = {}),
                        e || n || "AWS_IAM")
                      ) {
                        case "API_KEY":
                          return [3, 1];
                        case "AWS_IAM":
                          return [3, 2];
                        case "OPENID_CONNECT":
                          return [3, 4];
                        case "AMAZON_COGNITO_USER_POOLS":
                          return [3, 6];
                      }
                      return [3, 8];
                    case 1:
                      if (!r) throw new Error("No api-key configured");
                      return (
                        (i = { Authorization: null, "X-Api-Key": r }), [3, 9]
                      );
                    case 2:
                      return [4, this._ensureCredentials()];
                    case 3:
                      if (!a.sent()) throw new Error("No credentials");
                      return [3, 9];
                    case 4:
                      return [4, this.Cache.getItem("federatedInfo")];
                    case 5:
                      if (!(o = a.sent()) || !o.token)
                        throw new Error("No federated jwt");
                      return (i = { Authorization: o.token }), [3, 9];
                    case 6:
                      return [4, this.Auth.currentSession()];
                    case 7:
                      return (
                        (s = a.sent()),
                        (i = {
                          Authorization: s.getAccessToken().getJwtToken()
                        }),
                        [3, 9]
                      );
                    case 8:
                      return (i = { Authorization: null }), [3, 9];
                    case 9:
                      return [2, i];
                  }
                });
              });
            }),
            (e.prototype.getGraphqlOperationType = function(e) {
              var t = ja(e);
              return Cc(t.definitions, 1)[0].operation;
            }),
            (e.prototype.graphql = function(e, t) {
              var n = e.query,
                r = e.variables,
                i = void 0 === r ? {} : r,
                o = e.authMode,
                s = ja("string" == typeof n ? n : sa(n)),
                a = Cc(
                  s.definitions.filter(function(e) {
                    return "OperationDefinition" === e.kind;
                  }),
                  1
                )[0],
                u = (void 0 === a ? {} : a).operation;
              switch (u) {
                case "query":
                case "mutation":
                  var c = this._api.getCancellableToken(),
                    f = { cancellableToken: c },
                    l = this._graphql(
                      { query: s, variables: i, authMode: o },
                      t,
                      f
                    );
                  return this._api.updateRequestToBeCancellable(l, c), l;
                case "subscription":
                  return this._graphqlSubscribe(
                    { query: s, variables: i, authMode: o },
                    t
                  );
              }
              throw new Error("invalid operation type: " + u);
            }),
            (e.prototype._graphql = function(e, t, n) {
              var r = e.query,
                i = e.variables,
                o = e.authMode;
              return (
                void 0 === t && (t = {}),
                void 0 === n && (n = {}),
                Ac(this, void 0, void 0, function() {
                  var e,
                    s,
                    a,
                    u,
                    c,
                    f,
                    l,
                    h,
                    d,
                    p,
                    g,
                    y,
                    v,
                    m,
                    b,
                    w,
                    _,
                    S,
                    E,
                    A,
                    I;
                  return Ic(this, function(T) {
                    switch (T.label) {
                      case 0:
                        return this._api ? [3, 2] : [4, this.createInstance()];
                      case 1:
                        T.sent(), (T.label = 2);
                      case 2:
                        return (
                          (e = this._options),
                          (s = e.aws_appsync_region),
                          (a = e.aws_appsync_graphqlEndpoint),
                          (u = e.graphql_headers),
                          (c =
                            void 0 === u
                              ? function() {
                                  return {};
                                }
                              : u),
                          (f = e.graphql_endpoint),
                          (l = e.graphql_endpoint_iam_region),
                          (d = [{}]),
                          (p = !f) ? [4, this._headerBasedAuth(o)] : [3, 4]
                        );
                      case 3:
                        (p = T.sent()), (T.label = 4);
                      case 4:
                        return (
                          (g = [Ec.apply(void 0, d.concat([p]))]),
                          (y = f)
                            ? l
                              ? [4, this._headerBasedAuth(o)]
                              : [3, 6]
                            : [3, 8]
                        );
                      case 5:
                        return (v = T.sent()), [3, 7];
                      case 6:
                        (v = { Authorization: null }), (T.label = 7);
                      case 7:
                        (y = v), (T.label = 8);
                      case 8:
                        return (
                          (m = [Ec.apply(void 0, g.concat([y]))]),
                          [4, c({ query: r, variables: i })]
                        );
                      case 9:
                        if (
                          ((h = Ec.apply(void 0, [
                            Ec.apply(void 0, [
                              Ec.apply(void 0, m.concat([T.sent()])),
                              t
                            ]),
                            !f &&
                              ((I = {}),
                              (I["x-amz-user-agent"] = ku.userAgent),
                              I)
                          ])),
                          (b = { query: sa(r), variables: i }),
                          (w = Object.assign(
                            {
                              headers: h,
                              body: b,
                              signerServiceInfo: {
                                service: f ? "execute-api" : "appsync",
                                region: f ? l : s
                              }
                            },
                            n
                          )),
                          !(_ = f || a))
                        )
                          throw {
                            data: {},
                            errors: [new ta("No graphql endpoint provided.")]
                          };
                        T.label = 10;
                      case 10:
                        return (
                          T.trys.push([10, 12, , 13]), [4, this._api.post(_, w)]
                        );
                      case 11:
                        return (S = T.sent()), [3, 13];
                      case 12:
                        if (((E = T.sent()), this._api.isCancel(E))) throw E;
                        return (
                          (S = { data: {}, errors: [new ta(E.message)] }),
                          [3, 13]
                        );
                      case 13:
                        if ((A = S.errors) && A.length) throw S;
                        return [2, S];
                    }
                  });
                })
              );
            }),
            (e.prototype.isCancel = function(e) {
              return this._api.isCancel(e);
            }),
            (e.prototype.cancel = function(e, t) {
              return this._api.cancel(e, t);
            }),
            (e.prototype._graphqlSubscribe = function(e, t) {
              var n = e.query,
                r = e.variables,
                i = e.authMode;
              void 0 === t && (t = {});
              var o = this._options,
                s = o.aws_appsync_region,
                a = o.aws_appsync_graphqlEndpoint,
                u = o.aws_appsync_authenticationType,
                c = o.aws_appsync_apiKey,
                f = o.graphql_headers,
                l =
                  void 0 === f
                    ? function() {
                        return {};
                      }
                    : f,
                h = i || u || "AWS_IAM";
              if (Sc && "function" == typeof Sc.subscribe)
                return Sc.subscribe("", {
                  provider: xu,
                  appSyncGraphqlEndpoint: a,
                  authenticationType: h,
                  apiKey: c,
                  query: sa(n),
                  region: s,
                  variables: r,
                  graphql_headers: l,
                  additionalHeaders: t
                });
              throw (Oc.debug("No pubsub module applied for subscription"),
              new Error("No pubsub module applied for subscription"));
            }),
            (e.prototype._ensureCredentials = function() {
              var e = this;
              return this.Credentials.get()
                .then(function(t) {
                  if (!t) return !1;
                  var n = e.Credentials.shear(t);
                  return Oc.debug("set credentials for api", n), !0;
                })
                .catch(function(e) {
                  return Oc.warn("ensure credentials error", e), !1;
                });
            }),
            e
          );
        })(),
        Nc = new kc(null);
      G.register(Nc);
      var Rc = function() {
          return (Rc =
            Object.assign ||
            function(e) {
              for (var t, n = 1, r = arguments.length; n < r; n++)
                for (var i in (t = arguments[n]))
                  Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
              return e;
            }).apply(this, arguments);
        },
        xc = function(e, t, n, r) {
          return new (n || (n = Promise))(function(i, o) {
            function s(e) {
              try {
                u(r.next(e));
              } catch (e) {
                o(e);
              }
            }
            function a(e) {
              try {
                u(r.throw(e));
              } catch (e) {
                o(e);
              }
            }
            function u(e) {
              var t;
              e.done
                ? i(e.value)
                : ((t = e.value),
                  t instanceof n
                    ? t
                    : new n(function(e) {
                        e(t);
                      })).then(s, a);
            }
            u((r = r.apply(e, t || [])).next());
          });
        },
        Uc = function(e, t) {
          var n,
            r,
            i,
            o,
            s = {
              label: 0,
              sent: function() {
                if (1 & i[0]) throw i[1];
                return i[1];
              },
              trys: [],
              ops: []
            };
          return (
            (o = { next: a(0), throw: a(1), return: a(2) }),
            "function" == typeof Symbol &&
              (o[Symbol.iterator] = function() {
                return this;
              }),
            o
          );
          function a(o) {
            return function(a) {
              return (function(o) {
                if (n) throw new TypeError("Generator is already executing.");
                for (; s; )
                  try {
                    if (
                      ((n = 1),
                      r &&
                        (i =
                          2 & o[0]
                            ? r.return
                            : o[0]
                            ? r.throw || ((i = r.return) && i.call(r), 0)
                            : r.next) &&
                        !(i = i.call(r, o[1])).done)
                    )
                      return i;
                    switch (((r = 0), i && (o = [2 & o[0], i.value]), o[0])) {
                      case 0:
                      case 1:
                        i = o;
                        break;
                      case 4:
                        return s.label++, { value: o[1], done: !1 };
                      case 5:
                        s.label++, (r = o[1]), (o = [0]);
                        continue;
                      case 7:
                        (o = s.ops.pop()), s.trys.pop();
                        continue;
                      default:
                        if (
                          !((i = s.trys),
                          (i = i.length > 0 && i[i.length - 1]) ||
                            (6 !== o[0] && 2 !== o[0]))
                        ) {
                          s = 0;
                          continue;
                        }
                        if (
                          3 === o[0] &&
                          (!i || (o[1] > i[0] && o[1] < i[3]))
                        ) {
                          s.label = o[1];
                          break;
                        }
                        if (6 === o[0] && s.label < i[1]) {
                          (s.label = i[1]), (i = o);
                          break;
                        }
                        if (i && s.label < i[2]) {
                          (s.label = i[2]), s.ops.push(o);
                          break;
                        }
                        i[2] && s.ops.pop(), s.trys.pop();
                        continue;
                    }
                    o = t.call(e, s);
                  } catch (e) {
                    (o = [6, e]), (r = 0);
                  } finally {
                    n = i = 0;
                  }
                if (5 & o[0]) throw o[1];
                return { value: o[0] ? o[1] : void 0, done: !0 };
              })([o, a]);
            };
          }
        },
        Dc = new f("API"),
        Mc = new ((function() {
          function e(e) {
            (this.Auth = us),
              (this.Cache = ws),
              (this.Credentials = Ri),
              (this._options = e),
              (this._restApi = new Qs(e)),
              (this._graphqlApi = new kc(e)),
              Dc.debug("API Options", this._options);
          }
          return (
            (e.prototype.getModuleName = function() {
              return "API";
            }),
            (e.prototype.configure = function(e) {
              (this._options = Object.assign({}, this._options, e)),
                (this._restApi.Credentials = this.Credentials),
                (this._graphqlApi.Auth = this.Auth),
                (this._graphqlApi.Cache = this.Cache),
                (this._graphqlApi.Credentials = this.Credentials);
              var t = this._restApi.configure(this._options),
                n = this._graphqlApi.configure(this._options);
              return Rc(Rc({}, t), n);
            }),
            (e.prototype.get = function(e, t, n) {
              return this._restApi.get(e, t, n);
            }),
            (e.prototype.post = function(e, t, n) {
              return this._restApi.post(e, t, n);
            }),
            (e.prototype.put = function(e, t, n) {
              return this._restApi.put(e, t, n);
            }),
            (e.prototype.patch = function(e, t, n) {
              return this._restApi.patch(e, t, n);
            }),
            (e.prototype.del = function(e, t, n) {
              return this._restApi.del(e, t, n);
            }),
            (e.prototype.head = function(e, t, n) {
              return this._restApi.head(e, t, n);
            }),
            (e.prototype.isCancel = function(e) {
              return this._restApi.isCancel(e);
            }),
            (e.prototype.cancel = function(e, t) {
              return this._restApi.cancel(e, t);
            }),
            (e.prototype.endpoint = function(e) {
              return xc(this, void 0, void 0, function() {
                return Uc(this, function(t) {
                  return [2, this._restApi.endpoint(e)];
                });
              });
            }),
            (e.prototype.getGraphqlOperationType = function(e) {
              return this._graphqlApi.getGraphqlOperationType(e);
            }),
            (e.prototype.graphql = function(e, t) {
              return this._graphqlApi.graphql(e, t);
            }),
            e
          );
        })())(null);
      G.register(Mc);
      var jc = Mc;
    }
  ]);
});
