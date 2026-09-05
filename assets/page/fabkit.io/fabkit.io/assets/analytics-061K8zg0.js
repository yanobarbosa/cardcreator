import {
    n as e
} from "./chunk-B3K2TuZy.js";
import {
    a as t,
    o as n
} from "./compiler-runtime-4XzsAixn.js";
import {
    r,
    t as i
} from "./useRouter-yWE7_bQv.js";
import {
    n as a,
    r as o
} from "./utils-3GFE3mVG.js";
import {
    a as s,
    d as c,
    f as l,
    h as u,
    i as d,
    l as f,
    p,
    t as m
} from "./useStore-DYx3-od8.js";

function h(e) {
    let t = new Map,
        n, r, i = e => {
            e.next && (e.prev ? (e.prev.next = e.next, e.next.prev = e.prev, e.next = void 0, r && (r.next = e, e.prev = r)) : (e.next.prev = void 0, n = e.next, e.next = void 0, r && (e.prev = r, r.next = e)), r = e)
        };
    return {
        get(e) {
            let n = t.get(e);
            if (n) return i(n), n.value
        },
        set(a, o) {
            if (t.size >= e && n) {
                let e = n;
                t.delete(e.key), e.next && (n = e.next, e.next.prev = void 0), e === r && (r = void 0)
            }
            let s = t.get(a);
            if (s) s.value = o, i(s);
            else {
                let e = {
                    key: a,
                    value: o,
                    prev: r
                };
                r && (r.next = e), r = e, n ||= e, t.set(a, e)
            }
        },
        clear() {
            t.clear(), n = void 0, r = void 0
        }
    }
}
var g = 4,
    _ = 5;

function v(e, t, n = new Uint16Array(6)) {
    let r = e.indexOf(`/`, t),
        i = r === -1 ? e.length : r,
        a = e.substring(t, i);
    if (!a || !a.includes(`$`)) return n[0] = 0, n[1] = t, n[2] = t, n[3] = i, n[4] = i, n[5] = i, n;
    if (a === `$`) {
        let r = e.length;
        return n[0] = 2, n[1] = t, n[2] = t, n[3] = r, n[4] = r, n[5] = r, n
    }
    if (a.charCodeAt(0) === 36) return n[0] = 1, n[1] = t, n[2] = t + 1, n[3] = i, n[4] = i, n[5] = i, n;
    let o = a.indexOf(`{`),
        s;
    if (o !== -1 && o + 1 < a.length && (s = a.indexOf(`}`, o)) !== -1) {
        let r = a.charCodeAt(o + 1);
        if (r === 45) {
            if (o + 2 < a.length && a.charCodeAt(o + 2) === 36) {
                let e = o + 3,
                    r = s;
                if (e < r) return n[0] = 3, n[1] = t + o, n[2] = t + e, n[3] = t + r, n[4] = t + s + 1, n[5] = i, n
            }
        } else if (r === 36) {
            let r = o + 1,
                a = o + 2;
            return a === s ? (n[0] = 2, n[1] = t + o, n[2] = t + r, n[3] = t + a, n[4] = t + s + 1, n[5] = e.length, n) : (n[0] = 1, n[1] = t + o, n[2] = t + a, n[3] = t + s, n[4] = t + s + 1, n[5] = i, n)
        }
    }
    return n[0] = 0, n[1] = t, n[2] = t, n[3] = i, n[4] = i, n[5] = i, n
}

function y(e, t, n, r, i, a, o, s) {
    s ?.(n);
    let c = r; {
        let r = n.fullPath ?? n.from,
            s = n.options,
            l = r.length,
            u = s ?.caseSensitive ?? e,
            d = s ?.params ?.parse ?? s ?.parseParams;
        for (; c < l;) {
            let e = v(r, c, t),
                n, s = c,
                l = e[5];
            c = l + 1, a++;
            let f = e[0];
            switch (f) {
                case 0:
                    {
                        let t = r.substring(e[2], e[3]),
                            o = t,
                            s;u ? s = i.static ??= new Map : (o = t.toLowerCase(), s = i.staticInsensitive ??= new Map);
                        let c = s.get(o);
                        if (c) n = c;
                        else {
                            let e = x(r);
                            e.parent = i, e.depth = a, n = e, s.set(o, e)
                        }
                        break
                    }
                case 1:
                case 3:
                case 2:
                    {
                        let t = r.substring(s, e[1]),
                            c = r.substring(e[4], l),
                            p = u && !!(t || c);u || (t = t.toLowerCase(), c = c.toLowerCase());
                        let m = f === 1 ? i.dynamic : f === 3 ? i.optional : i.wildcard,
                            h = f !== 2 && !d && m ?.find(e => !e.parse && e.caseSensitive === p && e.prefix === t && e.suffix === c);
                        if (h) n = h;
                        else {
                            let e = S(f, r, p, t, c);
                            n = e, e.parent = i, e.depth = a;
                            let s;
                            s = f === 1 ? i.dynamic ??= [] : f === 3 ? i.optional ??= [] : i.wildcard ??= [], s.push(e), s.length === 2 && o ?.push(s)
                        }
                        break
                    }
            }
            i = n
        }
        if (d && n.children && !n.isRoot && n.id && n.id.charCodeAt(n.id.lastIndexOf(`/`) + 1) === 95) {
            let e = x(r);
            e.kind = _, e.parent = i, a++, e.depth = a, i.pathless ??= [], i.pathless.push(e), i = e
        }
        let f = (n.path || !n.children) && !n.isRoot;
        if (f && r.endsWith(`/`)) {
            let e = x(r);
            e.kind = g, e.parent = i, a++, e.depth = a, i.index = e, i = e
        }
        i.parse = d ?? null, i.priority = s ?.params ?.priority ?? 0, f && !i.route && (i.route = n, i.fullPath = r)
    }
    if (n.children)
        for (let r of n.children) y(e, t, r, c, i, a, o, s)
}

function b(e, t) {
    if (e.parse && !t.parse) return -1;
    if (!e.parse && t.parse) return 1;
    if (e.parse && t.parse && (e.priority || t.priority)) return t.priority - e.priority;
    if (e.prefix && t.prefix && e.prefix !== t.prefix) {
        if (e.prefix.startsWith(t.prefix)) return -1;
        if (t.prefix.startsWith(e.prefix)) return 1
    }
    if (e.suffix && t.suffix && e.suffix !== t.suffix) {
        if (e.suffix.endsWith(t.suffix)) return -1;
        if (t.suffix.endsWith(e.suffix)) return 1
    }
    return e.prefix && !t.prefix ? -1 : !e.prefix && t.prefix ? 1 : e.suffix && !t.suffix ? -1 : !e.suffix && t.suffix ? 1 : e.caseSensitive && !t.caseSensitive ? -1 : !e.caseSensitive && t.caseSensitive ? 1 : 0
}

function x(e) {
    return {
        kind: 0,
        depth: 0,
        pathless: null,
        index: null,
        static: null,
        staticInsensitive: null,
        dynamic: null,
        optional: null,
        wildcard: null,
        route: null,
        fullPath: e,
        parent: null,
        parse: null,
        priority: 0
    }
}

function S(e, t, n, r, i) {
    return {
        kind: e,
        depth: 0,
        pathless: null,
        index: null,
        static: null,
        staticInsensitive: null,
        dynamic: null,
        optional: null,
        wildcard: null,
        route: null,
        fullPath: t,
        parent: null,
        parse: null,
        priority: 0,
        caseSensitive: n,
        prefix: r,
        suffix: i
    }
}

function C(e, t) {
    let n = x(`/`),
        r = new Uint16Array(6),
        i = [];
    for (let t of e) y(!1, r, t, 1, n, 0, i);
    for (let e of i) e.sort(b);
    t.masksTree = n, t.flatCache = h(1e3)
}

function w(e, t) {
    e ||= `/`;
    let n = t.flatCache.get(e);
    if (n !== void 0) return n;
    let r = k(e, t.masksTree);
    return t.flatCache.set(e, r), r
}

function T(e, t, n, r, i) {
    e ||= `/`, r ||= `/`;
    let a = t ? `case\0${e}` : e,
        o = i.singleCache.get(a);
    return o || (o = x(`/`), y(t, new Uint16Array(6), {
        from: e
    }, 1, o, 0), i.singleCache.set(a, o)), k(r, o, n)
}

function E(e, t, n = !1) {
    let r = n ? e : `nofuzz\0${e}`,
        i = t.matchCache.get(r);
    if (i !== void 0) return i;
    e ||= `/`;
    let a;
    try {
        a = k(e, t.segmentTree, n)
    } catch (e) {
        if (e instanceof URIError) a = null;
        else throw e
    }
    return a && (a.branch = j(a.route)), t.matchCache.set(r, a), a
}

function D(e) {
    return e === `/` ? e : e.replace(/\/{1,}$/, ``)
}

function O(e, t = !1, n) {
    let r = x(e.fullPath),
        i = new Uint16Array(6),
        a = [],
        o = {},
        c = {},
        l = 0;
    y(t, i, e, 1, r, 0, a, e => {
        if (n ?.(e, l), e.id in o && s(), o[e.id] = e, l !== 0 && e.path) {
            let t = D(e.fullPath);
            (!c[t] || e.fullPath.endsWith(`/`)) && (c[t] = e)
        }
        l++
    });
    for (let e of a) e.sort(b);
    return {
        processedTree: {
            segmentTree: r,
            singleCache: h(1e3),
            matchCache: h(1e3),
            flatCache: null,
            masksTree: null
        },
        routesById: o,
        routesByPath: c
    }
}

function k(e, t, n = !1) {
    let r = e.split(`/`),
        i = ee(e, r, t, n);
    if (!i) return null;
    let [a] = A(e, r, i);
    return {
        route: i.node.route,
        rawParams: a
    }
}

function A(e, t, n) {
    let r = M(n.node),
        i = null,
        a = Object.create(null),
        o = n.extract ?.part ?? 0,
        s = n.extract ?.node ?? 0,
        c = n.extract ?.path ?? 0,
        l = n.extract ?.segment ?? 0;
    for (; s < r.length; o++, s++, c++, l++) {
        let u = r[s];
        if (u.kind === g) break;
        if (u.kind === _) {
            l--, o--, c--;
            continue
        }
        let d = t[o],
            f = c;
        if (d && (c += d.length), u.kind === 1) {
            i ??= n.node.fullPath.split(`/`);
            let e = i[l],
                t = u.prefix.length;
            if (e.charCodeAt(t) === 123) {
                let n = u.suffix.length,
                    r = e.substring(t + 2, e.length - n - 1),
                    i = d.substring(t, d.length - n);
                a[r] = decodeURIComponent(i)
            } else {
                let t = e.substring(1);
                a[t] = decodeURIComponent(d)
            }
        } else if (u.kind === 3) {
            if (n.skipped & 1 << s) {
                o--, c = f - 1;
                continue
            }
            i ??= n.node.fullPath.split(`/`);
            let e = i[l],
                t = u.prefix.length,
                r = u.suffix.length,
                p = e.substring(t + 3, e.length - r - 1),
                m = u.suffix || u.prefix ? d.substring(t, d.length - r) : d;
            m && (a[p] = decodeURIComponent(m))
        } else if (u.kind === 2) {
            let t = u,
                n = e.substring(f + t.prefix.length, e.length - t.suffix.length),
                r = decodeURIComponent(n);
            a[`*`] = r, a._splat = r;
            break
        }
    }
    return n.rawParams && Object.assign(a, n.rawParams), [a, {
        part: o,
        node: s,
        path: c,
        segment: l
    }]
}

function j(e) {
    let t = [e];
    for (; e.parentRoute;) e = e.parentRoute, t.push(e);
    return t.reverse(), t
}

function M(e) {
    let t = Array(e.depth + 1);
    do t[e.depth] = e, e = e.parent; while (e);
    return t
}

function ee(e, t, n, r) {
    if (e === `/` && n.index) return {
        node: n.index,
        skipped: 0
    };
    let i = !u(t),
        a = i && e !== `/`,
        o = t.length - (i ? 1 : 0),
        s = [{
            node: n,
            index: 1,
            skipped: 0,
            statics: 0,
            dynamics: 0,
            optionals: 0
        }],
        c = null,
        l = null;
    for (; s.length;) {
        let n = s.pop(),
            {
                node: i,
                index: u,
                skipped: d,
                statics: f,
                dynamics: p,
                optionals: m
            } = n,
            {
                extract: h,
                rawParams: _
            } = n;
        if (i.kind === 2 && i.route && !P(l, n)) continue;
        if (i.parse) {
            if (!ne(e, t, n)) continue;
            _ = n.rawParams, h = n.extract
        }
        r && i.route && i.kind !== g && P(c, n) && (c = n);
        let v = u === o;
        if (v && (i.route && (!a || i.kind === g || i.kind === 2) && P(l, n) && (l = n), !i.optional && !i.wildcard && !i.index && !i.pathless)) continue;
        let y = v ? void 0 : t[u],
            b;
        if (v && i.index) {
            let n = {
                    node: i.index,
                    index: u,
                    skipped: d,
                    statics: f,
                    dynamics: p,
                    optionals: m,
                    extract: h,
                    rawParams: _
                },
                r = !0;
            if (i.index.parse && (ne(e, t, n) || (r = !1)), r) {
                if (!p && !m && !d && te(f, o)) return n;
                P(l, n) && (l = n)
            }
        }
        if (i.wildcard)
            for (let e = i.wildcard.length - 1; e >= 0; e--) {
                let n = i.wildcard[e],
                    {
                        prefix: r,
                        suffix: a
                    } = n;
                if (!(r && (v || !(n.caseSensitive ? y : b ??= y.toLowerCase()).startsWith(r)))) {
                    if (a) {
                        if (v) continue;
                        let e = t.slice(u).join(`/`),
                            i = e.slice(-a.length);
                        if ((n.caseSensitive ? i : i.toLowerCase()) !== a || e.length - a.length < r.length) continue
                    }
                    s.push({
                        node: n,
                        index: o,
                        skipped: d,
                        statics: f,
                        dynamics: p,
                        optionals: m,
                        extract: h,
                        rawParams: _
                    })
                }
            }
        if (i.optional) {
            let e = d | 1 << i.depth + 1;
            for (let t = i.optional.length - 1; t >= 0; t--) {
                let n = i.optional[t];
                s.push({
                    node: n,
                    index: u,
                    skipped: e,
                    statics: f,
                    dynamics: p,
                    optionals: m,
                    extract: h,
                    rawParams: _
                })
            }
            if (!v)
                for (let e = i.optional.length - 1; e >= 0; e--) {
                    let t = i.optional[e],
                        {
                            prefix: n,
                            suffix: r
                        } = t;
                    if (n || r) {
                        let e = t.caseSensitive ? y : b ??= y.toLowerCase();
                        if (n && !e.startsWith(n) || r && e.indexOf(r, e.length - r.length) < n.length) continue
                    }
                    s.push({
                        node: t,
                        index: u + 1,
                        skipped: d,
                        statics: f,
                        dynamics: p,
                        optionals: m + N(o, u),
                        extract: h,
                        rawParams: _
                    })
                }
        }
        if (!v && i.dynamic && y)
            for (let e = i.dynamic.length - 1; e >= 0; e--) {
                let t = i.dynamic[e],
                    {
                        prefix: n,
                        suffix: r
                    } = t;
                if (n || r) {
                    let e = t.caseSensitive ? y : b ??= y.toLowerCase();
                    if (n && !e.startsWith(n) || r && e.indexOf(r, e.length - r.length) < n.length) continue
                }
                s.push({
                    node: t,
                    index: u + 1,
                    skipped: d,
                    statics: f,
                    dynamics: p + N(o, u),
                    optionals: m,
                    extract: h,
                    rawParams: _
                })
            }
        if (!v && i.staticInsensitive) {
            let e = i.staticInsensitive.get(b ??= y.toLowerCase());
            e && s.push({
                node: e,
                index: u + 1,
                skipped: d,
                statics: f + N(o, u),
                dynamics: p,
                optionals: m,
                extract: h,
                rawParams: _
            })
        }
        if (!v && i.static) {
            let e = i.static.get(y);
            e && s.push({
                node: e,
                index: u + 1,
                skipped: d,
                statics: f + N(o, u),
                dynamics: p,
                optionals: m,
                extract: h,
                rawParams: _
            })
        }
        if (i.pathless)
            for (let e = i.pathless.length - 1; e >= 0; e--) {
                let t = i.pathless[e];
                s.push({
                    node: t,
                    index: u,
                    skipped: d,
                    statics: f,
                    dynamics: p,
                    optionals: m,
                    extract: h,
                    rawParams: _
                })
            }
    }
    if (l) return l;
    if (r && c) {
        let n = c.index;
        for (let e = 0; e < c.index; e++) n += t[e].length;
        let r = n === e.length ? `/` : e.slice(n);
        return c.rawParams ??= Object.create(null), c.rawParams[`**`] = decodeURIComponent(r), c
    }
    return null
}

function N(e, t) {
    return 2 ** (e - t - 1)
}

function te(e, t) {
    return e === 2 ** (t - 1) - 1
}

function ne(e, t, n) {
    let r, i;
    try {
        [r, i] = A(e, t, n)
    } catch {
        return null
    }
    if (n.rawParams = r, n.extract = i, !n.node.parse) return !0;
    try {
        if (n.node.parse(r) === !1) return null
    } catch {}
    return !0
}

function P(e, t) {
    return e ? t.statics > e.statics || t.statics === e.statics && (t.dynamics > e.dynamics || t.dynamics === e.dynamics && (t.optionals > e.optionals || t.optionals === e.optionals && ((t.node.kind === g) > (e.node.kind === g) || t.node.kind === g == (e.node.kind === g) && t.node.depth > e.node.depth))) : !0
}

function re(e) {
    return F(e.filter(e => e !== void 0).join(`/`))
}

function F(e) {
    return e.replace(/\/{2,}/g, `/`)
}

function ie(e) {
    return e === `/` ? e : e.replace(/^\/{1,}/, ``)
}

function ae(e) {
    let t = e.length;
    return t > 1 && e[t - 1] === `/` ? e.replace(/\/{1,}$/, ``) : e
}

function oe(e) {
    return ae(ie(e))
}

function I(e, t) {
    return e ?.endsWith(`/`) && e !== `/` && e !== `${t}/` ? e.slice(0, -1) : e
}

function L(e, t, n) {
    return I(e, n) === I(t, n)
}

function se({
    base: e,
    to: t,
    trailingSlash: n = `never`,
    cache: r
}) {
    if (t.includes(`//`) && (t = F(t)), t.startsWith(`/`)) return t.length === 1 || n === `preserve` ? t : n === `always` ? t.endsWith(`/`) ? t : `${t}/` : t.endsWith(`/`) ? t.slice(0, -1) : t;
    let i = t === `.`,
        a;
    if (r) {
        a = i ? e : e + `\0` + t;
        let n = r.get(a);
        if (n) return n
    }
    let o;
    if (i) o = e.split(`/`);
    else {
        for (e.includes(`//`) && (e = F(e)), o = e.split(`/`); o.length > 1 && u(o) === ``;) o.pop();
        let n = t.split(`/`);
        for (let e = 0, t = n.length; e < t; e++) {
            let r = n[e];
            r === `` ? e ? e === t - 1 && o.push(r) : o = [r] : r === `..` ? o.length > 1 ? o.pop() : o = [``] : r === `.` || o.push(r)
        }
    }
    o.length > 1 && (u(o) === `` ? n === `never` && o.pop() : n === `always` && o.push(``));
    let s = o.join(`/`),
        c = (i ? F(s) : s) || `/`;
    return a && r && r.set(a, c), c
}

function ce(e) {
    let t = new Map(e.map(e => [encodeURIComponent(e), e])),
        n = Array.from(t.keys()).map(e => e.replace(/[.*+?^${}()|[\]\\]/g, `\\$&`)).join(`|`),
        r = new RegExp(n, `g`);
    return e => e.replace(r, e => t.get(e) ?? e)
}

function R(e, t, n) {
    let r = t[e];
    return typeof r == `string` ? e === `_splat` ? /^[a-zA-Z0-9\-._~!/]*$/.test(r) ? r : r.split(`/`).map(e => le(e, n)).join(`/`) : le(r, n) : r
}

function z({
    path: e,
    params: t,
    decoder: n,
    ...r
}) {
    let i = !1,
        a = Object.create(null);
    if (!e || e === `/`) return {
        interpolatedPath: `/`,
        usedParams: a,
        isMissingParams: i
    };
    if (!e.includes(`$`)) return {
        interpolatedPath: e,
        usedParams: a,
        isMissingParams: i
    };
    let o = e.length,
        s = 0,
        c, l = ``;
    for (; s < o;) {
        let r = s;
        c = v(e, r, c);
        let o = c[5];
        if (s = o + 1, r === o) continue;
        let u = c[0];
        if (u === 0) {
            l += `/` + e.substring(r, o);
            continue
        }
        if (u === 2) {
            let s = t._splat;
            a._splat = s, a[`*`] = s;
            let u = e.substring(r, c[1]),
                d = e.substring(c[4], o);
            if (!s) {
                i = !0, (u || d) && (l += `/` + u + d);
                continue
            }
            let f = R(`_splat`, t, n);
            l += `/` + u + f + d;
            continue
        }
        if (u === 1) {
            let s = e.substring(c[2], c[3]);
            !i && !(s in t) && (i = !0), a[s] = t[s];
            let u = e.substring(r, c[1]),
                d = e.substring(c[4], o),
                f = R(s, t, n) ?? `undefined`;
            l += `/` + u + f + d;
            continue
        }
        if (u === 3) {
            let i = e.substring(c[2], c[3]),
                s = t[i];
            if (s == null) continue;
            a[i] = s;
            let u = e.substring(r, c[1]),
                d = e.substring(c[4], o),
                f = R(i, t, n) ?? ``;
            l += `/` + u + f + d;
            continue
        }
    }
    return e.endsWith(`/`) && (l += `/`), {
        usedParams: a,
        interpolatedPath: l || `/`,
        isMissingParams: i
    }
}

function le(e, t) {
    let n = encodeURIComponent(e);
    return t ?.(n) ?? n
}
var ue = `Error preloading route! ☝️`,
    B = e(n(), 1);
t();

function V(e) {
    let t = B.useRef(e);
    return f(t.current, e, {
        ignoreUndefined: !1
    }) || (t.current = e), t.current
}

function de(e, t) {
    return e[0] === t[0] && e[1] === t[1] && e[2] === t[2]
}

function fe(e, t, n) {
    if (e ?.external) return p(e.href, n) ? void 0 : e.href;
    if (!K(t) && !(typeof t != `string` || t.indexOf(`:`) === -1)) try {
        return new URL(t), p(t, n) ? void 0 : t
    } catch {}
}

function pe(e, t, n, r, i, a) {
    if (a) return !1;
    if (n ?.exact) {
        if (!L(e.pathname, t.pathname, r)) return !1
    } else {
        let n = I(e.pathname, r),
            i = I(t.pathname, r);
        if (!(n.startsWith(i) && (n.length === i.length || n[i.length] === `/`))) return !1
    }
    return (n ?.includeSearch ?? !0) && !f(e.search, t.search, {
        partial: !n ?.exact,
        ignoreUndefined: !n ?.explicitUndefined
    }) ? !1 : n ?.includeHash ? i && e.hash === t.hash : !0
}

function me(e, t) {
    let n = i(),
        r = a(t),
        {
            activeProps: s,
            inactiveProps: l,
            activeOptions: u,
            to: f,
            preload: p,
            preloadDelay: h,
            preloadIntentProximity: g,
            hashScrollIntoView: _,
            replace: v,
            startTransition: y,
            resetScroll: b,
            viewTransition: x,
            children: S,
            target: C,
            disabled: w,
            style: T,
            className: E,
            onClick: D,
            onBlur: O,
            onFocus: k,
            onMouseEnter: A,
            onMouseLeave: j,
            onTouchStart: M,
            ignoreBlocker: ee,
            params: N,
            search: te,
            hash: ne,
            state: P,
            mask: re,
            reloadDocument: F,
            unsafeRelative: ie,
            from: ae,
            _fromLocation: oe,
            ...I
        } = e,
        L = d(),
        se = V(e.search),
        ce = V(e.params),
        R = V(u),
        z = B.useMemo(() => e, [n, e.from, e._fromLocation, e.hash, e.to, se, ce, e.state, e.mask, e.unsafeRelative]),
        le = B.useCallback(e => {
            let t = n.buildLocation({
                    _fromLocation: e,
                    ...z
                }),
                r = ve(t.maskedLocation ? t.maskedLocation.publicHref : t.publicHref, t.maskedLocation ? t.maskedLocation.external : t.external, n.history, w),
                i = fe(r, f, n.protocolAllowlist);
            return [r ?.href, i, pe(e, t, R, n.basepath, L, i !== void 0)]
        }, [R, w, L, z, n, f]),
        [me, K, q] = m(n.stores.location, le, de),
        J = q ? c(s, {}) ?? he : H,
        Y = q ? H : c(l, {}) ?? H,
        X = [E, J.className, Y.className].filter(Boolean).join(` `),
        Z = (T || J.style || Y.style) && { ...T,
            ...J.style,
            ...Y.style
        },
        ye = B.useRef(!1),
        Q = e.reloadDocument || K || w ? !1 : p ?? n.options.defaultPreload,
        be = h ?? n.options.defaultPreloadDelay ?? 0,
        $ = B.useCallback(() => {
            n.preloadRoute(z).catch(e => {
                console.warn(e), console.warn(ue)
            })
        }, [n, z]),
        xe = B.useCallback(e => {
            if (!e) {
                W(r);
                return
            }
            if (!(e.isIntersecting ?? Q === `intent`)) {
                e.isIntersecting === !1 && W(r);
                return
            }
            if (!be) {
                $();
                return
            }
            U.has(r) || U.set(r, setTimeout(() => {
                U.delete(r), $()
            }, be))
        }, [$, r, Q, be]);
    o(r, xe, Q !== `viewport`), B.useEffect(() => {
        ye.current || Q === `render` && ($(), ye.current = !0)
    }, [$, Q]);
    let Se = e => {
        let t = e.currentTarget.getAttribute(`target`),
            r = C === void 0 ? t : C;
        !w && !(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) && !e.defaultPrevented && (!r || r === `_self`) && e.button === 0 && (e.preventDefault(), n.navigate({ ...z,
            replace: v,
            resetScroll: b,
            hashScrollIntoView: _,
            startTransition: y,
            viewTransition: x,
            ignoreBlocker: ee
        }))
    };
    if (K) return { ...I,
        ref: r,
        href: K,
        ...S && {
            children: S
        },
        ...C && {
            target: C
        },
        ...w && {
            disabled: w
        },
        ...T && {
            style: T
        },
        ...E && {
            className: E
        },
        ...D && {
            onClick: D
        },
        ...O && {
            onBlur: O
        },
        ...k && {
            onFocus: k
        },
        ...A && {
            onMouseEnter: A
        },
        ...j && {
            onMouseLeave: j
        },
        ...M && {
            onTouchStart: M
        }
    };
    let Ce = () => {
            Q === `intent` && $()
        },
        we = () => {
            Q === `intent` && W(r)
        };
    return { ...I,
        ...J,
        ...Y,
        href: me,
        ref: r,
        onClick: G([D, Se]),
        onBlur: G([O, we]),
        onFocus: G([k, xe]),
        onMouseEnter: G([A, xe]),
        onMouseLeave: G([j, we]),
        onTouchStart: G([M, Ce]),
        disabled: !!w,
        target: C,
        ...Z && {
            style: Z
        },
        ...X && {
            className: X
        },
        ...w && ge,
        ...q && _e
    }
}
var H = {},
    he = {
        className: `active`
    },
    ge = {
        role: `link`,
        "aria-disabled": !0
    },
    _e = {
        "data-status": `active`,
        "aria-current": `page`
    },
    U = new WeakMap,
    W = e => {
        clearTimeout(U.get(e)), U.delete(e)
    },
    G = e => t => {
        for (let n of e)
            if (n) {
                if (t.defaultPrevented) return;
                n(t)
            }
    };

function ve(e, t, n, r) {
    if (!r) return t ? {
        href: e,
        external: !0
    } : {
        href: n.createHref(e) || `/`,
        external: !1
    }
}

function K(e) {
    if (typeof e != `string`) return !1;
    let t = e.charCodeAt(0);
    return t === 47 ? e.charCodeAt(1) !== 47 : t === 46
}
var q = B.forwardRef((e, t) => {
        let {
            _asChild: n,
            ...r
        } = e, {
            type: i,
            ...a
        } = me(r, t), o = typeof r.children == `function` ? r.children({
            isActive: a[`data-status`] === `active`
        }) : r.children;
        if (!n) {
            let {
                disabled: e,
                ...t
            } = a;
            return B.createElement(`a`, t, o)
        }
        return B.createElement(n, a, o)
    }),
    J = `https://cloud.umami.is/script.js`,
    Y = `fabkit.io`;

function X(e) {
    return {
        init() {
            let t = document.createElement(`script`);
            t.defer = !0, t.src = J, t.dataset.websiteId = e, t.dataset.domains = Y, document.head.appendChild(t)
        },
        track(e, t) {
            window.umami ?.track(e, t)
        }
    }
}
var Z = X(`9b21c323-63e4-4ca0-abb1-e079dc2fa989`);

function ye() {
    Z.init()
}

function Q(e) {
    Z.track(e.name, `data` in e ? e.data : void 0)
}
export {
    h as _, z as a, oe as c, j as d, w as f, O as g, C as h, ce as i, ie as l, T as m, Q as n, re as o, E as p, q as r, se as s, ye as t, ae as u
};
//# sourceMappingURL=analytics-061K8zg0.js.map