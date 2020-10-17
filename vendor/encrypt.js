/*
 * This script was taken from the Archer C7 interface.
 * Frankly, at this point I don't really understand how it works,
 * but it transforms the password into some encrypted version
 * and is necessary to login to the interface.
 */ 

const navigator = {};
const window = {};

const host = {};

const prepareEncryption = function (t) {
  t.su = t.su || {
  },
  t.su.encrypt = function (t, r) {
    function i(t, r, i) {
      null != t && ('number' == typeof t ? this.fromNumber(t, r, i)  : null == r && 'string' != typeof t ? this.fromString(t, 256)  : this.fromString(t, r))
    }
    function o() {
      return new i(null)
    }
    function e(t) {
      return A.charAt(t)
    }
    function n(t, r) {
      var i = w[t.charCodeAt(r)];
      return null == i ? - 1 : i
    }
    function s(t) {
      var r = o();
      return r.fromInt(t),
      r
    }
    function h(t) {
      var r,
      i = 1;
      return 0 != (r = t >>> 16) && (t = r, i += 16),
      0 != (r = t >> 8) && (t = r, i += 8),
      0 != (r = t >> 4) && (t = r, i += 4),
      0 != (r = t >> 2) && (t = r, i += 2),
      0 != (r = t >> 1) && (t = r, i += 1),
      i
    }
    function a(t) {
      this.m = t
    }
    function u(t) {
      this.m = t,
      this.mp = t.invDigit(),
      this.mpl = 32767 & this.mp,
      this.mph = this.mp >> 15,
      this.um = (1 << t.DB - 15) - 1,
      this.mt2 = 2 * t.t
    }
    function f() {
      this.i = 0,
      this.j = 0,
      this.S = new Array
    }
    function p() {
      !function (t) {
        g[D++] ^= 255 & t,
        g[D++] ^= t >> 8 & 255,
        g[D++] ^= t >> 16 & 255,
        g[D++] ^= t >> 24 & 255,
        D >= S && (D -= S)
      }((new Date).getTime())
    }
    function c() {
      if (null == T) {
        for (p(), (T = new f).init(g), D = 0; D < g.length; ++D) g[D] = 0;
        D = 0
      }
      return T.next()
    }
    function l() {
    }
    function y() {
      this.n = null,
      this.e = 0,
      this.d = null,
      this.p = null,
      this.q = null,
      this.dmp1 = null,
      this.dmq1 = null,
      this.coeff = null
    }
    var v;
    'Microsoft Internet Explorer' == navigator.appName ? (i.prototype.am = function (t, r, i, o, e, n) {
      for (var s = 32767 & r, h = r >> 15; --n >= 0; ) {
        var a = 32767 & this[t],
        u = this[t++] >> 15,
        f = h * a + u * s;
        e = ((a = s * a + ((32767 & f) << 15) + i[o] + (1073741823 & e)) >>> 30) + (f >>> 15) + h * u + (e >>> 30),
        i[o++] = 1073741823 & a
      }
      return e
    }, v = 30)  : 'Netscape' != navigator.appName ? (i.prototype.am = function (t, r, i, o, e, n) {
      for (; --n >= 0; ) {
        var s = r * this[t++] + i[o] + e;
        e = Math.floor(s / 67108864),
        i[o++] = 67108863 & s
      }
      return e
    }, v = 26)  : (i.prototype.am = function (t, r, i, o, e, n) {
      for (var s = 16383 & r, h = r >> 14; --n >= 0; ) {
        var a = 16383 & this[t],
        u = this[t++] >> 14,
        f = h * a + u * s;
        e = ((a = s * a + ((16383 & f) << 14) + i[o] + e) >> 28) + (f >> 14) + h * u,
        i[o++] = 268435455 & a
      }
      return e
    }, v = 28),
    i.prototype.DB = v,
    i.prototype.DM = (1 << v) - 1,
    i.prototype.DV = 1 << v;
    i.prototype.FV = Math.pow(2, 52),
    i.prototype.F1 = 52 - v,
    i.prototype.F2 = 2 * v - 52;
    var m,
    d,
    A = '0123456789abcdefghijklmnopqrstuvwxyz',
    w = new Array;
    for (m = '0'.charCodeAt(0), d = 0; d <= 9; ++d) w[m++] = d;
    for (m = 'a'.charCodeAt(0), d = 10; d < 36; ++d) w[m++] = d;
    for (m = 'A'.charCodeAt(0), d = 10; d < 36; ++d) w[m++] = d;
    a.prototype.convert = function (t) {
      return t.s < 0 || t.compareTo(this.m) >= 0 ? t.mod(this.m)  : t
    },
    a.prototype.revert = function (t) {
      return t
    },
    a.prototype.reduce = function (t) {
      t.divRemTo(this.m, null, t)
    },
    a.prototype.mulTo = function (t, r, i) {
      t.multiplyTo(r, i),
      this.reduce(i)
    },
    a.prototype.sqrTo = function (t, r) {
      t.squareTo(r),
      this.reduce(r)
    },
    u.prototype.convert = function (t) {
      var r = o();
      return t.abs().dlShiftTo(this.m.t, r),
      r.divRemTo(this.m, null, r),
      t.s < 0 && r.compareTo(i.ZERO) > 0 && this.m.subTo(r, r),
      r
    },
    u.prototype.revert = function (t) {
      var r = o();
      return t.copyTo(r),
      this.reduce(r),
      r
    },
    u.prototype.reduce = function (t) {
      for (; t.t <= this.mt2; ) t[t.t++] = 0;
      for (var r = 0; r < this.m.t; ++r) {
        var i = 32767 & t[r],
        o = i * this.mpl + ((i * this.mph + (t[r] >> 15) * this.mpl & this.um) << 15) & t.DM;
        for (t[i = r + this.m.t] += this.m.am(0, o, t, r, 0, this.m.t); t[i] >= t.DV; ) t[i] -= t.DV,
        t[++i]++
      }
      t.clamp(),
      t.drShiftTo(this.m.t, t),
      t.compareTo(this.m) >= 0 && t.subTo(this.m, t)
    },
    u.prototype.mulTo = function (t, r, i) {
      t.multiplyTo(r, i),
      this.reduce(i)
    },
    u.prototype.sqrTo = function (t, r) {
      t.squareTo(r),
      this.reduce(r)
    },
    i.prototype.copyTo = function (t) {
      for (var r = this.t - 1; r >= 0; --r) t[r] = this[r];
      t.t = this.t,
      t.s = this.s
    },
    i.prototype.fromInt = function (t) {
      this.t = 1,
      this.s = t < 0 ? - 1 : 0,
      t > 0 ? this[0] = t : t < - 1 ? this[0] = t + this.DV : this.t = 0
    },
    i.prototype.fromString = function (t, r) {
      var o;
      if (16 == r) o = 4;
       else if (8 == r) o = 3;
       else if (256 == r) o = 8;
       else if (2 == r) o = 1;
       else if (32 == r) o = 5;
       else {
        if (4 != r) return void this.fromRadix(t, r);
        o = 2
      }
      this.t = 0,
      this.s = 0;
      for (var e = t.length, s = !1, h = 0; --e >= 0; ) {
        var a = 8 == o ? 255 & t[e] : n(t, e);
        a < 0 ? '-' == t.charAt(e) && (s = !0)  : (s = !1, 0 == h ? this[this.t++] = a : h + o > this.DB ? (this[this.t - 1] |= (a & (1 << this.DB - h) - 1) << h, this[this.t++] = a >> this.DB - h)  : this[this.t - 1] |= a << h, (h += o) >= this.DB && (h -= this.DB))
      }
      8 == o && 0 != (128 & t[0]) && (this.s = - 1, h > 0 && (this[this.t - 1] |= (1 << this.DB - h) - 1 << h)),
      this.clamp(),
      s && i.ZERO.subTo(this, this)
    },
    i.prototype.clamp = function () {
      for (var t = this.s & this.DM; this.t > 0 && this[this.t - 1] == t; ) --this.t
    },
    i.prototype.dlShiftTo = function (t, r) {
      var i;
      for (i = this.t - 1; i >= 0; --i) r[i + t] = this[i];
      for (i = t - 1; i >= 0; --i) r[i] = 0;
      r.t = this.t + t,
      r.s = this.s
    },
    i.prototype.drShiftTo = function (t, r) {
      for (var i = t; i < this.t; ++i) r[i - t] = this[i];
      r.t = Math.max(this.t - t, 0),
      r.s = this.s
    },
    i.prototype.lShiftTo = function (t, r) {
      var i,
      o = t % this.DB,
      e = this.DB - o,
      n = (1 << e) - 1,
      s = Math.floor(t / this.DB),
      h = this.s << o & this.DM;
      for (i = this.t - 1; i >= 0; --i) r[i + s + 1] = this[i] >> e | h,
      h = (this[i] & n) << o;
      for (i = s - 1; i >= 0; --i) r[i] = 0;
      r[s] = h,
      r.t = this.t + s + 1,
      r.s = this.s,
      r.clamp()
    },
    i.prototype.rShiftTo = function (t, r) {
      r.s = this.s;
      var i = Math.floor(t / this.DB);
      if (i >= this.t) r.t = 0;
       else {
        var o = t % this.DB,
        e = this.DB - o,
        n = (1 << o) - 1;
        r[0] = this[i] >> o;
        for (var s = i + 1; s < this.t; ++s) r[s - i - 1] |= (this[s] & n) << e,
        r[s - i] = this[s] >> o;
        o > 0 && (r[this.t - i - 1] |= (this.s & n) << e),
        r.t = this.t - i,
        r.clamp()
      }
    },
    i.prototype.subTo = function (t, r) {
      for (var i = 0, o = 0, e = Math.min(t.t, this.t); i < e; ) o += this[i] - t[i],
      r[i++] = o & this.DM,
      o >>= this.DB;
      if (t.t < this.t) {
        for (o -= t.s; i < this.t; ) o += this[i],
        r[i++] = o & this.DM,
        o >>= this.DB;
        o += this.s
      } else {
        for (o += this.s; i < t.t; ) o -= t[i],
        r[i++] = o & this.DM,
        o >>= this.DB;
        o -= t.s
      }
      r.s = o < 0 ? - 1 : 0,
      o < - 1 ? r[i++] = this.DV + o : o > 0 && (r[i++] = o),
      r.t = i,
      r.clamp()
    },
    i.prototype.multiplyTo = function (t, r) {
      var o = this.abs(),
      e = t.abs(),
      n = o.t;
      for (r.t = n + e.t; --n >= 0; ) r[n] = 0;
      for (n = 0; n < e.t; ++n) r[n + o.t] = o.am(0, e[n], r, n, 0, o.t);
      r.s = 0,
      r.clamp(),
      this.s != t.s && i.ZERO.subTo(r, r)
    },
    i.prototype.squareTo = function (t) {
      for (var r = this.abs(), i = t.t = 2 * r.t; --i >= 0; ) t[i] = 0;
      for (i = 0; i < r.t - 1; ++i) {
        var o = r.am(i, r[i], t, 2 * i, 0, 1);
        (t[i + r.t] += r.am(i + 1, 2 * r[i], t, 2 * i + 1, o, r.t - i - 1)) >= r.DV && (t[i + r.t] -= r.DV, t[i + r.t + 1] = 1)
      }
      t.t > 0 && (t[t.t - 1] += r.am(i, r[i], t, 2 * i, 0, 1)),
      t.s = 0,
      t.clamp()
    },
    i.prototype.divRemTo = function (t, r, e) {
      var n = t.abs();
      if (!(n.t <= 0)) {
        var s = this.abs();
        if (s.t < n.t) return null != r && r.fromInt(0),
        void (null != e && this.copyTo(e));
        null == e && (e = o());
        var a = o(),
        u = this.s,
        f = t.s,
        p = this.DB - h(n[n.t - 1]);
        p > 0 ? (n.lShiftTo(p, a), s.lShiftTo(p, e))  : (n.copyTo(a), s.copyTo(e));
        var c = a.t,
        l = a[c - 1];
        if (0 != l) {
          var y = l * (1 << this.F1) + (c > 1 ? a[c - 2] >> this.F2 : 0),
          v = this.FV / y,
          m = (1 << this.F1) / y,
          d = 1 << this.F2,
          A = e.t,
          w = A - c,
          T = null == r ? o()  : r;
          for (a.dlShiftTo(w, T), e.compareTo(T) >= 0 && (e[e.t++] = 1, e.subTo(T, e)), i.ONE.dlShiftTo(c, T), T.subTo(a, a); a.t < c; ) a[a.t++] = 0;
          for (; --w >= 0; ) {
            var g = e[--A] == l ? this.DM : Math.floor(e[A] * v + (e[A - 1] + d) * m);
            if ((e[A] += a.am(0, g, e, w, 0, c)) < g) for (a.dlShiftTo(w, T), e.subTo(T, e); e[A] < --g; ) e.subTo(T, e)
          }
          null != r && (e.drShiftTo(c, r), u != f && i.ZERO.subTo(r, r)),
          e.t = c,
          e.clamp(),
          p > 0 && e.rShiftTo(p, e),
          u < 0 && i.ZERO.subTo(e, e)
        }
      }
    },
    i.prototype.invDigit = function () {
      if (this.t < 1) return 0;
      var t = this[0];
      if (0 == (1 & t)) return 0;
      var r = 3 & t;
      return r = r * (2 - (15 & t) * r) & 15,
      r = r * (2 - (255 & t) * r) & 255,
      r = r * (2 - ((65535 & t) * r & 65535)) & 65535,
      (r = r * (2 - t * r % this.DV) % this.DV) > 0 ? this.DV - r : - r
    },
    i.prototype.isEven = function () {
      return 0 == (this.t > 0 ? 1 & this[0] : this.s)
    },
    i.prototype.exp = function (t, r) {
      if (t > 4294967295 || t < 1) return i.ONE;
      var e = o(),
      n = o(),
      s = r.convert(this),
      a = h(t) - 1;
      for (s.copyTo(e); --a >= 0; ) if (r.sqrTo(e, n), (t & 1 << a) > 0) r.mulTo(n, s, e);
       else {
        var u = e;
        e = n,
        n = u
      }
      return r.revert(e)
    },
    i.prototype.toString = function (t) {
      if (this.s < 0) return '-' + this.negate().toString(t);
      var r;
      if (16 == t) r = 4;
       else if (8 == t) r = 3;
       else if (2 == t) r = 1;
       else if (32 == t) r = 5;
       else {
        if (4 != t) return this.toRadix(t);
        r = 2
      }
      var i,
      o = (1 << r) - 1,
      n = !1,
      s = '',
      h = this.t,
      a = this.DB - h * this.DB % r;
      if (h-- > 0) for (a < this.DB && (i = this[h] >> a) > 0 && (n = !0, s = e(i)); h >= 0; ) a < r ? (i = (this[h] & (1 << a) - 1) << r - a, i |= this[--h] >> (a += this.DB - r))  : (i = this[h] >> (a -= r) & o, a <= 0 && (a += this.DB, --h)),
      i > 0 && (n = !0),
      n && (s += e(i));
      return n ? s : '0'
    },
    i.prototype.negate = function () {
      var t = o();
      return i.ZERO.subTo(this, t),
      t
    },
    i.prototype.abs = function () {
      return this.s < 0 ? this.negate()  : this
    },
    i.prototype.compareTo = function (t) {
      var r = this.s - t.s;
      if (0 != r) return r;
      var i = this.t;
      if (0 != (r = i - t.t)) return this.s < 0 ? - r : r;
      for (; --i >= 0; ) if (0 != (r = this[i] - t[i])) return r;
      return 0
    },
    i.prototype.bitLength = function () {
      return this.t <= 0 ? 0 : this.DB * (this.t - 1) + h(this[this.t - 1] ^ this.s & this.DM)
    },
    i.prototype.mod = function (t) {
      var r = o();
      return this.abs().divRemTo(t, null, r),
      this.s < 0 && r.compareTo(i.ZERO) > 0 && t.subTo(r, r),
      r
    },
    i.prototype.modPowInt = function (t, r) {
      var i;
      return i = t < 256 || r.isEven() ? new a(r)  : new u(r),
      this.exp(t, i)
    },
    i.ZERO = s(0),
    i.ONE = s(1),
    f.prototype.init = function (t) {
      var r,
      i,
      o;
      for (r = 0; r < 256; ++r) this.S[r] = r;
      for (i = 0, r = 0; r < 256; ++r) i = i + this.S[r] + t[r % t.length] & 255,
      o = this.S[r],
      this.S[r] = this.S[i],
      this.S[i] = o;
      this.i = 0,
      this.j = 0
    },
    f.prototype.next = function () {
      var t;
      return this.i = this.i + 1 & 255,
      this.j = this.j + this.S[this.i] & 255,
      t = this.S[this.i],
      this.S[this.i] = this.S[this.j],
      this.S[this.j] = t,
      this.S[t + this.S[this.i] & 255]
    };
    var T,
    g,
    D,
    S = 256;
    if (null == g) {
      g = new Array,
      D = 0;
      var C;
      if (window.crypto && window.crypto.getRandomValues) {
        var b = new Uint8Array(32);
        for (window.crypto.getRandomValues(b), C = 0; C < 32; ++C) g[D++] = b[C]
      }
      if ('Netscape' == navigator.appName && navigator.appVersion < '5' && window.crypto) {
        var B = window.crypto.random(32);
        for (C = 0; C < B.length; ++C) g[D++] = 255 & B.charCodeAt(C)
      }
      for (; D < S; ) C = Math.floor(65536 * Math.random()),
      g[D++] = C >>> 8,
      g[D++] = 255 & C;
      D = 0,
      p()
    }
    l.prototype.nextBytes = function (t) {
      var r;
      for (r = 0; r < t.length; ++r) t[r] = c()
    },
    y.prototype.doPublic = function (t) {
      return t.modPowInt(this.e, this.n)
    },
    y.prototype.setPublic = function (t, r) {
      null != t && null != r && t.length > 0 && r.length > 0 ? (this.n = function (t, r) {
        return new i(t, r)
      }(t, 16), this.e = parseInt(r, 16))  : alert('Invalid RSA public key')
    },
    y.prototype.encrypt = function (t) {
      var r = function (t, r) {
        if (r < t.length + 11) return alert('Message too long for RSA'),
        null;
        for (var o = new Array, e = t.length - 1; e >= 0 && r > 0; ) {
          var n = t.charCodeAt(e--);
          n < 128 ? o[--r] = n : n > 127 && n < 2048 ? (o[--r] = 63 & n | 128, o[--r] = n >> 6 | 192)  : (o[--r] = 63 & n | 128, o[--r] = n >> 6 & 63 | 128, o[--r] = n >> 12 | 224)
        }
        o[--r] = 0;
        for (var s = new l, h = new Array; r > 2; ) {
          for (h[0] = 0; 0 == h[0]; ) s.nextBytes(h);
          o[--r] = h[0]
        }
        return o[--r] = 2,
        o[--r] = 0,
        new i(o)
      }(t, this.n.bitLength() + 7 >> 3);
      if (null == r) return null;
      var o = this.doPublic(r);
      if (null == o) return null;
      var e = o.toString(16);
      return 0 == (1 & e.length) ? e : '0' + e
    };
    var M = new y,
    R = r[0],
    E = r[1];
    M.setPublic(R, E);
    var V = M.encrypt(t);
    if (256 != V.length) for (var x = Math.abs(256 - V.length), O = 0; O < x; O++) V = '0' + V;
    return V
  },
  t.su.des = function (r, i, o, e, n, s) {
    o && (i = unescape(encodeURIComponent(i)));
    var h,
    a,
    u,
    f,
    p,
    c,
    l,
    y,
    v,
    m,
    d,
    A,
    w,
    T,
    g = new Array(16843776, 0, 65536, 16843780, 16842756, 66564, 4, 65536, 1024, 16843776, 16843780, 1024, 16778244, 16842756, 16777216, 4, 1028, 16778240, 16778240, 66560, 66560, 16842752, 16842752, 16778244, 65540, 16777220, 16777220, 65540, 0, 1028, 66564, 16777216, 65536, 16843780, 4, 16842752, 16843776, 16777216, 16777216, 1024, 16842756, 65536, 66560, 16777220, 1024, 4, 16778244, 66564, 16843780, 65540, 16842752, 16778244, 16777220, 1028, 66564, 16843776, 1028, 16778240, 16778240, 0, 65540, 66560, 0, 16842756),
    D = new Array( - 2146402272, - 2147450880, 32768, 1081376, 1048576, 32, - 2146435040, - 2147450848, - 2147483616, - 2146402272, - 2146402304, - 2147483648, - 2147450880, 1048576, 32, - 2146435040, 1081344, 1048608, - 2147450848, 0, - 2147483648, 32768, 1081376, - 2146435072, 1048608, - 2147483616, 0, 1081344, 32800, - 2146402304, - 2146435072, 32800, 0, 1081376, - 2146435040, 1048576, - 2147450848, - 2146435072, - 2146402304, 32768, - 2146435072, - 2147450880, 32, - 2146402272, 1081376, 32, 32768, - 2147483648, 32800, - 2146402304, 1048576, - 2147483616, 1048608, - 2147450848, - 2147483616, 1048608, 1081344, 0, - 2147450880, 32800, - 2147483648, - 2146435040, - 2146402272, 1081344),
    S = new Array(520, 134349312, 0, 134348808, 134218240, 0, 131592, 134218240, 131080, 134217736, 134217736, 131072, 134349320, 131080, 134348800, 520, 134217728, 8, 134349312, 512, 131584, 134348800, 134348808, 131592, 134218248, 131584, 131072, 134218248, 8, 134349320, 512, 134217728, 134349312, 134217728, 131080, 520, 131072, 134349312, 134218240, 0, 512, 131080, 134349320, 134218240, 134217736, 512, 0, 134348808, 134218248, 131072, 134217728, 134349320, 8, 131592, 131584, 134217736, 134348800, 134218248, 520, 134348800, 131592, 8, 134348808, 131584),
    C = new Array(8396801, 8321, 8321, 128, 8396928, 8388737, 8388609, 8193, 0, 8396800, 8396800, 8396929, 129, 0, 8388736, 8388609, 1, 8192, 8388608, 8396801, 128, 8388608, 8193, 8320, 8388737, 1, 8320, 8388736, 8192, 8396928, 8396929, 129, 8388736, 8388609, 8396800, 8396929, 129, 0, 0, 8396800, 8320, 8388736, 8388737, 1, 8396801, 8321, 8321, 128, 8396929, 129, 1, 8192, 8388609, 8193, 8396928, 8388737, 8193, 8320, 8388608, 8396801, 128, 8388608, 8192, 8396928),
    b = new Array(256, 34078976, 34078720, 1107296512, 524288, 256, 1073741824, 34078720, 1074266368, 524288, 33554688, 1074266368, 1107296512, 1107820544, 524544, 1073741824, 33554432, 1074266112, 1074266112, 0, 1073742080, 1107820800, 1107820800, 33554688, 1107820544, 1073742080, 0, 1107296256, 34078976, 33554432, 1107296256, 524544, 524288, 1107296512, 256, 33554432, 1073741824, 34078720, 1107296512, 1074266368, 33554688, 1073741824, 1107820544, 34078976, 1074266368, 256, 33554432, 1107820544, 1107820800, 524544, 1107296256, 1107820800, 34078720, 0, 1074266112, 1107296256, 524544, 33554688, 1073742080, 524288, 0, 1074266112, 34078976, 1073742080),
    B = new Array(536870928, 541065216, 16384, 541081616, 541065216, 16, 541081616, 4194304, 536887296, 4210704, 4194304, 536870928, 4194320, 536887296, 536870912, 16400, 0, 4194320, 536887312, 16384, 4210688, 536887312, 16, 541065232, 541065232, 0, 4210704, 541081600, 16400, 4210688, 541081600, 536870912, 536887296, 16, 541065232, 4210688, 541081616, 4194304, 16400, 536870928, 4194304, 536887296, 536870912, 16400, 536870928, 541081616, 4210688, 541065216, 4210704, 541081600, 0, 541065232, 16, 16384, 541065216, 4210704, 16384, 4194320, 536887312, 0, 541081600, 536870912, 4194320, 536887312),
    M = new Array(2097152, 69206018, 67110914, 0, 2048, 67110914, 2099202, 69208064, 69208066, 2097152, 0, 67108866, 2, 67108864, 69206018, 2050, 67110912, 2099202, 2097154, 67110912, 67108866, 69206016, 69208064, 2097154, 69206016, 2048, 2050, 69208066, 2099200, 2, 67108864, 2099200, 67108864, 2099200, 2097152, 67110914, 67110914, 69206018, 69206018, 2, 2097154, 67108864, 67110912, 2097152, 69208064, 2050, 2099202, 69208064, 2050, 67108866, 69208066, 69206016, 2099200, 0, 2, 69208066, 0, 2099202, 69206016, 2048, 67108866, 67110912, 2048, 2097154),
    R = new Array(268439616, 4096, 262144, 268701760, 268435456, 268439616, 64, 268435456, 262208, 268697600, 268701760, 266240, 268701696, 266304, 4096, 64, 268697600, 268435520, 268439552, 4160, 266240, 262208, 268697664, 268701696, 4160, 0, 0, 268697664, 268435520, 268439552, 266304, 262144, 266304, 262144, 268701696, 4096, 64, 268697664, 4096, 266304, 268439552, 64, 268435520, 268697600, 268697664, 268435456, 262144, 268439616, 0, 268701760, 262208, 268435520, 268697600, 268439552, 268439616, 0, 268701760, 266240, 266240, 4160, 4160, 262208, 268435456, 268701696),
    E = t.su.des_createKeys(r),
    V = 0,
    x = i.length,
    O = 0,
    I = 32 == E.length ? 3 : 9;
    y = 3 == I ? o ? new Array(0, 32, 2)  : new Array(30, - 2, - 2)  : o ? new Array(0, 32, 2, 62, 30, - 2, 64, 96, 2)  : new Array(94, 62, - 2, 32, 64, 2, 30, - 2, - 2),
    2 == s ? i += '        ' : 1 == s ? o && (u = 8 - x % 8, i += String.fromCharCode(u, u, u, u, u, u, u, u), 8 === u && (x += 8))  : s || (i += '\0\0\0\0\0\0\0\0');
    var P = '',
    q = '';
    for (1 == e && (v = n.charCodeAt(V++) << 24 | n.charCodeAt(V++) << 16 | n.charCodeAt(V++) << 8 | n.charCodeAt(V++), d = n.charCodeAt(V++) << 24 | n.charCodeAt(V++) << 16 | n.charCodeAt(V++) << 8 | n.charCodeAt(V++), V = 0); V < x; ) {
      for (c = i.charCodeAt(V++) << 24 | i.charCodeAt(V++) << 16 | i.charCodeAt(V++) << 8 | i.charCodeAt(V++), l = i.charCodeAt(V++) << 24 | i.charCodeAt(V++) << 16 | i.charCodeAt(V++) << 8 | i.charCodeAt(V++), 1 == e && (o ? (c ^= v, l ^= d)  : (m = v, A = d, v = c, d = l)), c ^= (u = 252645135 & (c >>> 4 ^ l)) << 4, c ^= (u = 65535 & (c >>> 16 ^ (l ^= u))) << 16, c ^= u = 858993459 & ((l ^= u) >>> 2 ^ c), c ^= u = 16711935 & ((l ^= u << 2) >>> 8 ^ c), c = (c ^= (u = 1431655765 & (c >>> 1 ^ (l ^= u << 8))) << 1) << 1 | c >>> 31, l = (l ^= u) << 1 | l >>> 31, a = 0; a < I; a += 3) {
        for (w = y[a + 1], T = y[a + 2], h = y[a]; h != w; h += T) f = l ^ E[h],
        p = (l >>> 4 | l << 28) ^ E[h + 1],
        u = c,
        c = l,
        l = u ^ (D[f >>> 24 & 63] | C[f >>> 16 & 63] | B[f >>> 8 & 63] | R[63 & f] | g[p >>> 24 & 63] | S[p >>> 16 & 63] | b[p >>> 8 & 63] | M[63 & p]);
        u = c,
        c = l,
        l = u
      }
      l = l >>> 1 | l << 31,
      l ^= u = 1431655765 & ((c = c >>> 1 | c << 31) >>> 1 ^ l),
      l ^= (u = 16711935 & (l >>> 8 ^ (c ^= u << 1))) << 8,
      l ^= (u = 858993459 & (l >>> 2 ^ (c ^= u))) << 2,
      l ^= u = 65535 & ((c ^= u) >>> 16 ^ l),
      l ^= u = 252645135 & ((c ^= u << 16) >>> 4 ^ l),
      c ^= u << 4,
      1 == e && (o ? (v = c, d = l)  : (c ^= m, l ^= A)),
      q += String.fromCharCode(c >>> 24, c >>> 16 & 255, c >>> 8 & 255, 255 & c, l >>> 24, l >>> 16 & 255, l >>> 8 & 255, 255 & l),
      512 == (O += 8) && (P += q, q = '', O = 0)
    }
    if (P += q, P = P.replace(/\0*$/g, ''), !o) {
      if (1 === s) {
        var N = 0;
        (x = P.length) && (N = P.charCodeAt(x - 1)),
        N <= 8 && (P = P.substring(0, x - N))
      }
      P = decodeURIComponent(escape(P))
    }
    return P
  },
  t.su.des_createKeys = function (t) {
    for (var r, i, o, e = new Array(0, 4, 536870912, 536870916, 65536, 65540, 536936448, 536936452, 512, 516, 536871424, 536871428, 66048, 66052, 536936960, 536936964), n = new Array(0, 1, 1048576, 1048577, 67108864, 67108865, 68157440, 68157441, 256, 257, 1048832, 1048833, 67109120, 67109121, 68157696, 68157697), s = new Array(0, 8, 2048, 2056, 16777216, 16777224, 16779264, 16779272, 0, 8, 2048, 2056, 16777216, 16777224, 16779264, 16779272), h = new Array(0, 2097152, 134217728, 136314880, 8192, 2105344, 134225920, 136323072, 131072, 2228224, 134348800, 136445952, 139264, 2236416, 134356992, 136454144), a = new Array(0, 262144, 16, 262160, 0, 262144, 16, 262160, 4096, 266240, 4112, 266256, 4096, 266240, 4112, 266256), u = new Array(0, 1024, 32, 1056, 0, 1024, 32, 1056, 33554432, 33555456, 33554464, 33555488, 33554432, 33555456, 33554464, 33555488), f = new Array(0, 268435456, 524288, 268959744, 2, 268435458, 524290, 268959746, 0, 268435456, 524288, 268959744, 2, 268435458, 524290, 268959746), p = new Array(0, 65536, 2048, 67584, 536870912, 536936448, 536872960, 536938496, 131072, 196608, 133120, 198656, 537001984, 537067520, 537004032, 537069568), c = new Array(0, 262144, 0, 262144, 2, 262146, 2, 262146, 33554432, 33816576, 33554432, 33816576, 33554434, 33816578, 33554434, 33816578), l = new Array(0, 268435456, 8, 268435464, 0, 268435456, 8, 268435464, 1024, 268436480, 1032, 268436488, 1024, 268436480, 1032, 268436488), y = new Array(0, 32, 0, 32, 1048576, 1048608, 1048576, 1048608, 8192, 8224, 8192, 8224, 1056768, 1056800, 1056768, 1056800), v = new Array(0, 16777216, 512, 16777728, 2097152, 18874368, 2097664, 18874880, 67108864, 83886080, 67109376, 83886592, 69206016, 85983232, 69206528, 85983744), m = new Array(0, 4096, 134217728, 134221824, 524288, 528384, 134742016, 134746112, 16, 4112, 134217744, 134221840, 524304, 528400, 134742032, 134746128), d = new Array(0, 4, 256, 260, 0, 4, 256, 260, 1, 5, 257, 261, 1, 5, 257, 261), A = t.length > 8 ? 3 : 1, w = new Array(32 * A), T = new Array(0, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0), g = 0, D = 0, S = 0; S < A; S++) {
      var C = t.charCodeAt(g++) << 24 | t.charCodeAt(g++) << 16 | t.charCodeAt(g++) << 8 | t.charCodeAt(g++),
      b = t.charCodeAt(g++) << 24 | t.charCodeAt(g++) << 16 | t.charCodeAt(g++) << 8 | t.charCodeAt(g++);
      C ^= (o = 252645135 & (C >>> 4 ^ b)) << 4,
      C ^= o = 65535 & ((b ^= o) >>> - 16 ^ C),
      C ^= (o = 858993459 & (C >>> 2 ^ (b ^= o << - 16))) << 2,
      C ^= o = 65535 & ((b ^= o) >>> - 16 ^ C),
      C ^= (o = 1431655765 & (C >>> 1 ^ (b ^= o << - 16))) << 1,
      C ^= o = 16711935 & ((b ^= o) >>> 8 ^ C),
      o = (C ^= (o = 1431655765 & (C >>> 1 ^ (b ^= o << 8))) << 1) << 8 | (b ^= o) >>> 20 & 240,
      C = b << 24 | b << 8 & 16711680 | b >>> 8 & 65280 | b >>> 24 & 240,
      b = o;
      for (var B = 0; B < T.length; B++) T[B] ? (C = C << 2 | C >>> 26, b = b << 2 | b >>> 26)  : (C = C << 1 | C >>> 27, b = b << 1 | b >>> 27),
      b &= - 15,
      r = e[(C &= - 15) >>> 28] | n[C >>> 24 & 15] | s[C >>> 20 & 15] | h[C >>> 16 & 15] | a[C >>> 12 & 15] | u[C >>> 8 & 15] | f[C >>> 4 & 15],
      o = 65535 & ((i = p[b >>> 28] | c[b >>> 24 & 15] | l[b >>> 20 & 15] | y[b >>> 16 & 15] | v[b >>> 12 & 15] | m[b >>> 8 & 15] | d[b >>> 4 & 15]) >>> 16 ^ r),
      w[D++] = r ^ o,
      w[D++] = i ^ o << 16
    }
    return w
  },
  t.su.genkey = function (r, i, o) {
    return {
      key: t.su.pad(r.slice(i, o)),
      vector: 1
    }
  },
  t.su.pad = function (t) {
    for (var r = t.length; r < 24; r++) t += '0';
    return t
  },
  t.su.DES3 = {
    encrypt: function (r) {
      var i = t.su.genkey('PKCS5Padding', 0, 24);
      return btoa(t.su.des(i.key, r, 1, 1, '26951234', 1))
    },
    decrypt: function (r) {
      var i = t.su.genkey('PKCS5Padding', 0, 24);
      return t.su.des(i.key, atob(r), 0, 1, '26951234', 1)
    }
  }
};

// Apply the encryption function to this host object, and then return that.
// Once we've returned it, it can operate as a black-box function.
prepareEncryption(host);

export default host.su.encrypt;
