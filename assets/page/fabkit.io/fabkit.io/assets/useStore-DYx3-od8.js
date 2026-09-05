import {
    n as e,
    t
} from "./chunk-B3K2TuZy.js";
import {
    a as n,
    i as r,
    o as i
} from "./compiler-runtime-4XzsAixn.js";
import {
    r as a
} from "./useRouter-yWE7_bQv.js";

function o(e) {
    return e[e.length - 1]
}

function s(e, t) {
    return typeof e == `function` ? e(t) : e
}
var c = Object.prototype.hasOwnProperty,
    l = Object.prototype.propertyIsEnumerable;

function u(e) {
    for (let t in e)
        if (c.call(e, t)) return !0;
    return !1
}
var d = () => Object.create(null),
    f = (e, t) => p(e, t, d);

function p(e, t, n = () => ({}), r = 0) {
    if (e === t) return e;
    if (r > 500) return t;
    let i = t,
        a = _(e) && _(i);
    if (!a && !(h(e) && h(i))) return i;
    let o = a ? e : m(e);
    if (!o) return i;
    let s = a ? i : m(i);
    if (!s) return i;
    let l = o.length,
        u = s.length,
        d = a ? Array(u) : n(),
        f = 0;
    for (let t = 0; t < u; t++) {
        let o = a ? t : s[t],
            u = e[o],
            m = i[o];
        if (u === m) {
            d[o] = u, (a ? t < l : c.call(e, o)) && f++;
            continue
        }
        if (u === null || m === null || typeof u != `object` || typeof m != `object`) {
            d[o] = m;
            continue
        }
        let h = p(u, m, n, r + 1);
        d[o] = h, h === u && f++
    }
    return l === u && f === l ? e : d
}

function m(e) {
    let t = Object.keys(e);
    if (t.length !== Object.getOwnPropertyNames(e).length) return !1;
    let n = Object.getOwnPropertySymbols(e);
    if (n.length === 0) return t;
    for (let r of n) {
        if (!l.call(e, r)) return !1;
        t.push(r)
    }
    return t
}

function h(e) {
    if (!g(e)) return !1;
    let t = e.constructor;
    if (t === void 0) return !0;
    let n = t.prototype;
    return !(!g(n) || !n.hasOwnProperty(`isPrototypeOf`))
}

function g(e) {
    return Object.prototype.toString.call(e) === `[object Object]`
}

function _(e) {
    return Array.isArray(e) && e.length === Object.keys(e).length
}

function v(e, t, n) {
    if (e === t) return !0;
    if (typeof e != typeof t) return !1;
    if (Array.isArray(e) && Array.isArray(t)) {
        if (e.length !== t.length) return !1;
        for (let r = 0, i = e.length; r < i; r++)
            if (!v(e[r], t[r], n)) return !1;
        return !0
    }
    if (h(e) && h(t)) {
        let r = n ?.ignoreUndefined ?? !0;
        if (n ?.partial) {
            for (let i in t)
                if ((!r || t[i] !== void 0) && !v(e[i], t[i], n)) return !1;
            return !0
        }
        let i = 0;
        if (!r) i = Object.keys(e).length;
        else
            for (let t in e) e[t] !== void 0 && i++;
        let a = 0;
        for (let o in t)
            if ((!r || t[o] !== void 0) && (a++, a > i || !v(e[o], t[o], n))) return !1;
        return i === a
    }
    return !1
}

function y(e) {
    return typeof e ?.message == `string` ? e.message.startsWith(`Failed to fetch dynamically imported module`) || e.message.startsWith(`error loading dynamically imported module`) || e.message.startsWith(`Importing a module script failed`) : !1
}
var b = /[\x00-\x1f\x7f"<>`{}]/g;

function x(e) {
    return e.replace(b, e => `%` + e.charCodeAt(0).toString(16).toUpperCase().padStart(2, `0`))
}

function S(e) {
    let t;
    try {
        t = decodeURI(e)
    } catch {
        t = e.replaceAll(/%[0-9A-F]{2}/gi, e => {
            try {
                return decodeURI(e)
            } catch {
                return e
            }
        })
    }
    return x(t)
}
var C = [`http:`, `https:`, `mailto:`, `tel:`];

function w(e, t) {
    if (!e) return !1;
    try {
        let n = new URL(e);
        return !t.has(n.protocol)
    } catch {
        return !1
    }
}

function T(e) {
    if (!e || !/[%\\\x00-\x1f\x7f]/.test(e) && !e.startsWith(`//`)) return {
        path: e,
        handledProtocolRelativeURL: !1
    };
    let t = /%25|%5C/gi,
        n = 0,
        r = ``,
        i;
    for (;
        (i = t.exec(e)) !== null;) r += S(e.slice(n, i.index)) + i[0], n = t.lastIndex;
    r += S(n ? e.slice(n) : e);
    let a = !1;
    return r.startsWith(`//`) && (a = !0, r = `/` + r.replace(/^\/+/, ``)), {
        path: r,
        handledProtocolRelativeURL: a
    }
}

function E(e) {
    return /\s|[^\u0000-\u007F]/.test(e) ? e.replace(/\s|[^\u0000-\u007F]/gu, encodeURIComponent) : e
}

function D(e, t) {
    if (e === t) return !0;
    if (e.length !== t.length) return !1;
    for (let n = 0; n < e.length; n++)
        if (e[n] !== t[n]) return !1;
    return !0
}

function O() {
    throw Error(`Invariant failed`)
}
var k = e(i(), 1),
    A = e(n(), 1);

function j({
    children: e,
    fallback: t = null
}) {
    return (0, A.jsx)(k.Fragment, {
        children: M() ? e : t
    })
}

function M() {
    return k.useSyncExternalStore(N, () => !0, () => !1)
}

function N() {
    return () => {}
}
var P = t((e => {
        var t = i(),
            n = r();

        function a(e, t) {
            return e === t && (e !== 0 || 1 / e == 1 / t) || e !== e && t !== t
        }
        var o = typeof Object.is == `function` ? Object.is : a,
            s = n.useSyncExternalStore,
            c = t.useRef,
            l = t.useEffect,
            u = t.useMemo,
            d = t.useDebugValue;
        e.useSyncExternalStoreWithSelector = function(e, t, n, r, i) {
            var a = c(null);
            if (a.current === null) {
                var f = {
                    hasValue: !1,
                    value: null
                };
                a.current = f
            } else f = a.current;
            a = u(function() {
                function e(e) {
                    if (!a) {
                        if (a = !0, s = e, e = r(e), i !== void 0 && f.hasValue) {
                            var t = f.value;
                            if (i(t, e)) return c = t
                        }
                        return c = e
                    }
                    if (t = c, o(s, e)) return t;
                    var n = r(e);
                    return i !== void 0 && i(t, n) ? (s = e, t) : (s = e, c = n)
                }
                var a = !1,
                    s, c, l = n === void 0 ? null : n;
                return [function() {
                    return e(t())
                }, l === null ? void 0 : function() {
                    return e(l())
                }]
            }, [t, n, r, i]);
            var p = s(e, a[0], a[1]);
            return l(function() {
                f.hasValue = !0, f.value = p
            }, [p]), d(p), p
        }
    })),
    F = t(((e, t) => {
        t.exports = P()
    })),
    I = F();

function L(e, t) {
    return e === t
}

function R(e, t, n = L) {
    let r = (0, k.useCallback)(t => {
            if (!e) return () => {};
            let {
                unsubscribe: n
            } = e.subscribe(t);
            return n
        }, [e]),
        i = (0, k.useCallback)(() => e ?.get(), [e]);
    return (0, I.useSyncExternalStoreWithSelector)(r, i, i, t, n)
}
export {
    p as _, O as a, T as c, s as d, u as f, f as g, o as h, M as i, v as l, y as m, F as n, C as o, w as p, j as r, D as s, R as t, E as u
};
//# sourceMappingURL=useStore-DYx3-od8.js.map