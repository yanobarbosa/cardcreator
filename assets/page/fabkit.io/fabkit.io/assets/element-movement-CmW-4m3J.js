import {
    n as e
} from "./chunk-B3K2TuZy.js";
import {
    o as t
} from "./compiler-runtime-4XzsAixn.js";
import {
    K as n,
    X as r,
    Y as i,
    _ as a,
    _t as o,
    gt as s,
    ht as c,
    pt as l,
    xt as u
} from "./portal-CtSeHqeD.js";
import {
    o as d
} from "./use-resolve-button-type-BJQyyNxN.js";
var f = e(t(), 1);

function p(e) {
    if (e === null) return {
        width: 0,
        height: 0
    };
    let {
        width: t,
        height: n
    } = e.getBoundingClientRect();
    return {
        width: t,
        height: n
    }
}

function m(e, t, n = !1) {
    let [r, i] = (0, f.useState)(() => p(t));
    return c(() => {
        if (!t || !e) return;
        let n = o();
        return n.requestAnimationFrame(function e() {
            n.requestAnimationFrame(e), i(e => {
                let n = p(t);
                return n.width === e.width && n.height === e.height ? e : n
            })
        }), () => {
            n.dispose()
        }
    }, [t, e]), n ? {
        width: `${r.width}px`,
        height: `${r.height}px`
    } : r
}
var h = (e => (e[e.Left = 0] = `Left`, e[e.Right = 2] = `Right`, e))(h || {});

function g(e) {
    let t = (0, f.useRef)(null);
    return {
        onPointerDown: l(n => {
            t.current = n.pointerType, !d(n.currentTarget) && n.pointerType === `mouse` && n.button === h.Left && (n.preventDefault(), e(n))
        }),
        onClick: l(n => {
            t.current !== `mouse` && (d(n.currentTarget) || e(n))
        })
    }
}
var _ = (e => (e[e.Ignore = 0] = `Ignore`, e[e.Select = 1] = `Select`, e[e.Close = 2] = `Close`, e))(_ || {}),
    v = {
        Ignore: {
            kind: 0
        },
        Select: e => ({
            kind: 1,
            target: e
        }),
        Close: {
            kind: 2
        }
    },
    y = 200,
    b = 5;

function x(e, {
    trigger: t,
    action: i,
    close: o,
    select: s
}) {
    let c = (0, f.useRef)(null),
        l = (0, f.useRef)(null),
        u = (0, f.useRef)(null);
    a(e && t !== null, `pointerdown`, e => {
        r(e ?.target) && t != null && t.contains(e.target) && (l.current = e.x, u.current = e.y, c.current = e.timeStamp)
    }), a(e && t !== null, `pointerup`, e => {
        let t = c.current;
        if (t === null || (c.current = null, !n(e.target)) || Math.abs(e.x - (l.current ?? e.x)) < b && Math.abs(e.y - (u.current ?? e.y)) < b) return;
        let r = i(e);
        switch (r.kind) {
            case 0:
                return;
            case 1:
                e.timeStamp - t > y && (s(r.target), o());
                break;
            case 2:
                o();
                break
        }
    }, {
        capture: !0
    })
}

function S(e) {
    return [e.screenX, e.screenY]
}

function C() {
    let e = (0, f.useRef)([-1, -1]);
    return {
        wasMoved(t) {
            let n = S(t);
            return e.current[0] === n[0] && e.current[1] === n[1] ? !1 : (e.current = n, !0)
        },
        update(t) {
            e.current = S(t)
        }
    }
}

function w() {
    return typeof window < `u`
}

function T(e) {
    return O(e) ? (e.nodeName || ``).toLowerCase() : `#document`
}

function E(e) {
    var t;
    return (e == null || (t = e.ownerDocument) == null ? void 0 : t.defaultView) || window
}

function D(e) {
    return ((O(e) ? e.ownerDocument : e.document) || window.document) ?.documentElement
}

function O(e) {
    return w() ? e instanceof Node || e instanceof E(e).Node : !1
}

function k(e) {
    return w() ? e instanceof Element || e instanceof E(e).Element : !1
}

function A(e) {
    return w() ? e instanceof HTMLElement || e instanceof E(e).HTMLElement : !1
}

function j(e) {
    return !w() || typeof ShadowRoot > `u` ? !1 : e instanceof ShadowRoot || e instanceof E(e).ShadowRoot
}
var ee = new Set([`inline`, `contents`]);

function M(e) {
    let {
        overflow: t,
        overflowX: n,
        overflowY: r,
        display: i
    } = P(e);
    return /auto|scroll|overlay|hidden|clip/.test(t + r + n) && !ee.has(i)
}
var te = new Set([`table`, `td`, `th`]);

function ne(e) {
    return te.has(T(e))
}
var re = [`:popover-open`, `:modal`];

function ie(e) {
    return re.some(t => {
        try {
            return e.matches(t)
        } catch {
            return !1
        }
    })
}
var ae = [`transform`, `translate`, `scale`, `rotate`, `perspective`],
    oe = [`transform`, `translate`, `scale`, `rotate`, `perspective`, `filter`],
    se = [`paint`, `layout`, `strict`, `content`];

function ce(e) {
    let t = ue(),
        n = k(e) ? P(e) : e;
    return ae.some(e => n[e] ? n[e] !== `none` : !1) || (n.containerType ? n.containerType !== `normal` : !1) || !t && (n.backdropFilter ? n.backdropFilter !== `none` : !1) || !t && (n.filter ? n.filter !== `none` : !1) || oe.some(e => (n.willChange || ``).includes(e)) || se.some(e => (n.contain || ``).includes(e))
}

function le(e) {
    let t = F(e);
    for (; A(t) && !N(t);) {
        if (ce(t)) return t;
        if (ie(t)) return null;
        t = F(t)
    }
    return null
}

function ue() {
    return typeof CSS > `u` || !CSS.supports ? !1 : CSS.supports(`-webkit-backdrop-filter`, `none`)
}
var de = new Set([`html`, `body`, `#document`]);

function N(e) {
    return de.has(T(e))
}

function P(e) {
    return E(e).getComputedStyle(e)
}

function fe(e) {
    return k(e) ? {
        scrollLeft: e.scrollLeft,
        scrollTop: e.scrollTop
    } : {
        scrollLeft: e.scrollX,
        scrollTop: e.scrollY
    }
}

function F(e) {
    if (T(e) === `html`) return e;
    let t = e.assignedSlot || e.parentNode || j(e) && e.host || D(e);
    return j(t) ? t.host : t
}

function pe(e) {
    let t = F(e);
    return N(t) ? e.ownerDocument ? e.ownerDocument.body : e.body : A(t) && M(t) ? t : pe(t)
}

function I(e, t, n) {
    t === void 0 && (t = []), n === void 0 && (n = !0);
    let r = pe(e),
        i = r === e.ownerDocument ?.body,
        a = E(r);
    if (i) {
        let e = me(a);
        return t.concat(a, a.visualViewport || [], M(r) ? r : [], e && n ? I(e) : [])
    }
    return t.concat(r, I(r, [], n))
}

function me(e) {
    return e.parent && Object.getPrototypeOf(e.parent) ? e.frameElement : null
}

function he() {
    let e = navigator.userAgentData;
    return e && Array.isArray(e.brands) ? e.brands.map(e => {
        let {
            brand: t,
            version: n
        } = e;
        return t + `/` + n
    }).join(` `) : navigator.userAgent
}
var L = Math.min,
    R = Math.max,
    z = Math.round,
    ge = Math.floor,
    B = e => ({
        x: e,
        y: e
    }),
    _e = {
        left: `right`,
        right: `left`,
        bottom: `top`,
        top: `bottom`
    },
    ve = {
        start: `end`,
        end: `start`
    };

function ye(e, t, n) {
    return R(e, L(t, n))
}

function V(e, t) {
    return typeof e == `function` ? e(t) : e
}

function H(e) {
    return e.split(`-`)[0]
}

function U(e) {
    return e.split(`-`)[1]
}

function be(e) {
    return e === `x` ? `y` : `x`
}

function xe(e) {
    return e === `y` ? `height` : `width`
}
var Se = new Set([`top`, `bottom`]);

function W(e) {
    return Se.has(H(e)) ? `y` : `x`
}

function Ce(e) {
    return be(W(e))
}

function we(e, t, n) {
    n === void 0 && (n = !1);
    let r = U(e),
        i = Ce(e),
        a = xe(i),
        o = i === `x` ? r === (n ? `end` : `start`) ? `right` : `left` : r === `start` ? `bottom` : `top`;
    return t.reference[a] > t.floating[a] && (o = G(o)), [o, G(o)]
}

function Te(e) {
    let t = G(e);
    return [Ee(e), t, Ee(t)]
}

function Ee(e) {
    return e.replace(/start|end/g, e => ve[e])
}
var De = [`left`, `right`],
    Oe = [`right`, `left`],
    ke = [`top`, `bottom`],
    Ae = [`bottom`, `top`];

function je(e, t, n) {
    switch (e) {
        case `top`:
        case `bottom`:
            return n ? t ? Oe : De : t ? De : Oe;
        case `left`:
        case `right`:
            return t ? ke : Ae;
        default:
            return []
    }
}

function Me(e, t, n, r) {
    let i = U(e),
        a = je(H(e), n === `start`, r);
    return i && (a = a.map(e => e + `-` + i), t && (a = a.concat(a.map(Ee)))), a
}

function G(e) {
    return e.replace(/left|right|bottom|top/g, e => _e[e])
}

function Ne(e) {
    return {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        ...e
    }
}

function Pe(e) {
    return typeof e == `number` ? {
        top: e,
        right: e,
        bottom: e,
        left: e
    } : Ne(e)
}

function K(e) {
    let {
        x: t,
        y: n,
        width: r,
        height: i
    } = e;
    return {
        width: r,
        height: i,
        top: n,
        left: t,
        right: t + r,
        bottom: n + i,
        x: t,
        y: n
    }
}

function Fe(e, t, n) {
    let {
        reference: r,
        floating: i
    } = e, a = W(t), o = Ce(t), s = xe(o), c = H(t), l = a === `y`, u = r.x + r.width / 2 - i.width / 2, d = r.y + r.height / 2 - i.height / 2, f = r[s] / 2 - i[s] / 2, p;
    switch (c) {
        case `top`:
            p = {
                x: u,
                y: r.y - i.height
            };
            break;
        case `bottom`:
            p = {
                x: u,
                y: r.y + r.height
            };
            break;
        case `right`:
            p = {
                x: r.x + r.width,
                y: d
            };
            break;
        case `left`:
            p = {
                x: r.x - i.width,
                y: d
            };
            break;
        default:
            p = {
                x: r.x,
                y: r.y
            }
    }
    switch (U(t)) {
        case `start`:
            p[o] -= f * (n && l ? -1 : 1);
            break;
        case `end`:
            p[o] += f * (n && l ? -1 : 1);
            break
    }
    return p
}
var Ie = async (e, t, n) => {
    let {
        placement: r = `bottom`,
        strategy: i = `absolute`,
        middleware: a = [],
        platform: o
    } = n, s = a.filter(Boolean), c = await (o.isRTL == null ? void 0 : o.isRTL(t)), l = await o.getElementRects({
        reference: e,
        floating: t,
        strategy: i
    }), {
        x: u,
        y: d
    } = Fe(l, r, c), f = r, p = {}, m = 0;
    for (let n = 0; n < s.length; n++) {
        let {
            name: a,
            fn: h
        } = s[n], {
            x: g,
            y: _,
            data: v,
            reset: y
        } = await h({
            x: u,
            y: d,
            initialPlacement: r,
            placement: f,
            strategy: i,
            middlewareData: p,
            rects: l,
            platform: o,
            elements: {
                reference: e,
                floating: t
            }
        });
        u = g ?? u, d = _ ?? d, p = { ...p,
            [a]: { ...p[a],
                ...v
            }
        }, y && m <= 50 && (m++, typeof y == `object` && (y.placement && (f = y.placement), y.rects && (l = y.rects === !0 ? await o.getElementRects({
            reference: e,
            floating: t,
            strategy: i
        }) : y.rects), {
            x: u,
            y: d
        } = Fe(l, f, c)), n = -1)
    }
    return {
        x: u,
        y: d,
        placement: f,
        strategy: i,
        middlewareData: p
    }
};
async function q(e, t) {
    t === void 0 && (t = {});
    let {
        x: n,
        y: r,
        platform: i,
        rects: a,
        elements: o,
        strategy: s
    } = e, {
        boundary: c = `clippingAncestors`,
        rootBoundary: l = `viewport`,
        elementContext: u = `floating`,
        altBoundary: d = !1,
        padding: f = 0
    } = V(t, e), p = Pe(f), m = o[d ? u === `floating` ? `reference` : `floating` : u], h = K(await i.getClippingRect({
        element: await (i.isElement == null ? void 0 : i.isElement(m)) ?? !0 ? m : m.contextElement || await (i.getDocumentElement == null ? void 0 : i.getDocumentElement(o.floating)),
        boundary: c,
        rootBoundary: l,
        strategy: s
    })), g = u === `floating` ? {
        x: n,
        y: r,
        width: a.floating.width,
        height: a.floating.height
    } : a.reference, _ = await (i.getOffsetParent == null ? void 0 : i.getOffsetParent(o.floating)), v = await (i.isElement == null ? void 0 : i.isElement(_)) && await (i.getScale == null ? void 0 : i.getScale(_)) || {
        x: 1,
        y: 1
    }, y = K(i.convertOffsetParentRelativeRectToViewportRelativeRect ? await i.convertOffsetParentRelativeRectToViewportRelativeRect({
        elements: o,
        rect: g,
        offsetParent: _,
        strategy: s
    }) : g);
    return {
        top: (h.top - y.top + p.top) / v.y,
        bottom: (y.bottom - h.bottom + p.bottom) / v.y,
        left: (h.left - y.left + p.left) / v.x,
        right: (y.right - h.right + p.right) / v.x
    }
}
var Le = function(e) {
        return e === void 0 && (e = {}), {
            name: `flip`,
            options: e,
            async fn(t) {
                var n;
                let {
                    placement: r,
                    middlewareData: i,
                    rects: a,
                    initialPlacement: o,
                    platform: s,
                    elements: c
                } = t, {
                    mainAxis: l = !0,
                    crossAxis: u = !0,
                    fallbackPlacements: d,
                    fallbackStrategy: f = `bestFit`,
                    fallbackAxisSideDirection: p = `none`,
                    flipAlignment: m = !0,
                    ...h
                } = V(e, t);
                if ((n = i.arrow) != null && n.alignmentOffset) return {};
                let g = H(r),
                    _ = W(o),
                    v = H(o) === o,
                    y = await (s.isRTL == null ? void 0 : s.isRTL(c.floating)),
                    b = d || (v || !m ? [G(o)] : Te(o)),
                    x = p !== `none`;
                !d && x && b.push(...Me(o, m, p, y));
                let S = [o, ...b],
                    C = await q(t, h),
                    w = [],
                    T = i.flip ?.overflows || [];
                if (l && w.push(C[g]), u) {
                    let e = we(r, a, y);
                    w.push(C[e[0]], C[e[1]])
                }
                if (T = [...T, {
                        placement: r,
                        overflows: w
                    }], !w.every(e => e <= 0)) {
                    let e = (i.flip ?.index || 0) + 1,
                        t = S[e];
                    if (t && (!(u === `alignment` && _ !== W(t)) || T.every(e => W(e.placement) === _ ? e.overflows[0] > 0 : !0))) return {
                        data: {
                            index: e,
                            overflows: T
                        },
                        reset: {
                            placement: t
                        }
                    };
                    let n = T.filter(e => e.overflows[0] <= 0).sort((e, t) => e.overflows[1] - t.overflows[1])[0] ?.placement;
                    if (!n) switch (f) {
                        case `bestFit`:
                            {
                                let e = T.filter(e => {
                                    if (x) {
                                        let t = W(e.placement);
                                        return t === _ || t === `y`
                                    }
                                    return !0
                                }).map(e => [e.placement, e.overflows.filter(e => e > 0).reduce((e, t) => e + t, 0)]).sort((e, t) => e[1] - t[1])[0] ?.[0];e && (n = e);
                                break
                            }
                        case `initialPlacement`:
                            n = o;
                            break
                    }
                    if (r !== n) return {
                        reset: {
                            placement: n
                        }
                    }
                }
                return {}
            }
        }
    },
    Re = new Set([`left`, `top`]);
async function ze(e, t) {
    let {
        placement: n,
        platform: r,
        elements: i
    } = e, a = await (r.isRTL == null ? void 0 : r.isRTL(i.floating)), o = H(n), s = U(n), c = W(n) === `y`, l = Re.has(o) ? -1 : 1, u = a && c ? -1 : 1, d = V(t, e), {
        mainAxis: f,
        crossAxis: p,
        alignmentAxis: m
    } = typeof d == `number` ? {
        mainAxis: d,
        crossAxis: 0,
        alignmentAxis: null
    } : {
        mainAxis: d.mainAxis || 0,
        crossAxis: d.crossAxis || 0,
        alignmentAxis: d.alignmentAxis
    };
    return s && typeof m == `number` && (p = s === `end` ? m * -1 : m), c ? {
        x: p * u,
        y: f * l
    } : {
        x: f * l,
        y: p * u
    }
}
var Be = function(e) {
        return e === void 0 && (e = 0), {
            name: `offset`,
            options: e,
            async fn(t) {
                var n;
                let {
                    x: r,
                    y: i,
                    placement: a,
                    middlewareData: o
                } = t, s = await ze(t, e);
                return a === o.offset ?.placement && (n = o.arrow) != null && n.alignmentOffset ? {} : {
                    x: r + s.x,
                    y: i + s.y,
                    data: { ...s,
                        placement: a
                    }
                }
            }
        }
    },
    Ve = function(e) {
        return e === void 0 && (e = {}), {
            name: `shift`,
            options: e,
            async fn(t) {
                let {
                    x: n,
                    y: r,
                    placement: i
                } = t, {
                    mainAxis: a = !0,
                    crossAxis: o = !1,
                    limiter: s = {
                        fn: e => {
                            let {
                                x: t,
                                y: n
                            } = e;
                            return {
                                x: t,
                                y: n
                            }
                        }
                    },
                    ...c
                } = V(e, t), l = {
                    x: n,
                    y: r
                }, u = await q(t, c), d = W(H(i)), f = be(d), p = l[f], m = l[d];
                if (a) {
                    let e = f === `y` ? `top` : `left`,
                        t = f === `y` ? `bottom` : `right`,
                        n = p + u[e],
                        r = p - u[t];
                    p = ye(n, p, r)
                }
                if (o) {
                    let e = d === `y` ? `top` : `left`,
                        t = d === `y` ? `bottom` : `right`,
                        n = m + u[e],
                        r = m - u[t];
                    m = ye(n, m, r)
                }
                let h = s.fn({ ...t,
                    [f]: p,
                    [d]: m
                });
                return { ...h,
                    data: {
                        x: h.x - n,
                        y: h.y - r,
                        enabled: {
                            [f]: a,
                            [d]: o
                        }
                    }
                }
            }
        }
    },
    He = function(e) {
        return e === void 0 && (e = {}), {
            name: `size`,
            options: e,
            async fn(t) {
                var n, r;
                let {
                    placement: i,
                    rects: a,
                    platform: o,
                    elements: s
                } = t, {
                    apply: c = () => {},
                    ...l
                } = V(e, t), u = await q(t, l), d = H(i), f = U(i), p = W(i) === `y`, {
                    width: m,
                    height: h
                } = a.floating, g, _;
                d === `top` || d === `bottom` ? (g = d, _ = f === (await (o.isRTL == null ? void 0 : o.isRTL(s.floating)) ? `start` : `end`) ? `left` : `right`) : (_ = d, g = f === `end` ? `top` : `bottom`);
                let v = h - u.top - u.bottom,
                    y = m - u.left - u.right,
                    b = L(h - u[g], v),
                    x = L(m - u[_], y),
                    S = !t.middlewareData.shift,
                    C = b,
                    w = x;
                if ((n = t.middlewareData.shift) != null && n.enabled.x && (w = y), (r = t.middlewareData.shift) != null && r.enabled.y && (C = v), S && !f) {
                    let e = R(u.left, 0),
                        t = R(u.right, 0),
                        n = R(u.top, 0),
                        r = R(u.bottom, 0);
                    p ? w = m - 2 * (e !== 0 || t !== 0 ? e + t : R(u.left, u.right)) : C = h - 2 * (n !== 0 || r !== 0 ? n + r : R(u.top, u.bottom))
                }
                await c({ ...t,
                    availableWidth: w,
                    availableHeight: C
                });
                let T = await o.getDimensions(s.floating);
                return m !== T.width || h !== T.height ? {
                    reset: {
                        rects: !0
                    }
                } : {}
            }
        }
    };

function Ue(e) {
    let t = P(e),
        n = parseFloat(t.width) || 0,
        r = parseFloat(t.height) || 0,
        i = A(e),
        a = i ? e.offsetWidth : n,
        o = i ? e.offsetHeight : r,
        s = z(n) !== a || z(r) !== o;
    return s && (n = a, r = o), {
        width: n,
        height: r,
        $: s
    }
}

function We(e) {
    return k(e) ? e : e.contextElement
}

function J(e) {
    let t = We(e);
    if (!A(t)) return B(1);
    let n = t.getBoundingClientRect(),
        {
            width: r,
            height: i,
            $: a
        } = Ue(t),
        o = (a ? z(n.width) : n.width) / r,
        s = (a ? z(n.height) : n.height) / i;
    return (!o || !Number.isFinite(o)) && (o = 1), (!s || !Number.isFinite(s)) && (s = 1), {
        x: o,
        y: s
    }
}
var Ge = B(0);

function Ke(e) {
    let t = E(e);
    return !ue() || !t.visualViewport ? Ge : {
        x: t.visualViewport.offsetLeft,
        y: t.visualViewport.offsetTop
    }
}

function qe(e, t, n) {
    return t === void 0 && (t = !1), !n || t && n !== E(e) ? !1 : t
}

function Y(e, t, n, r) {
    t === void 0 && (t = !1), n === void 0 && (n = !1);
    let i = e.getBoundingClientRect(),
        a = We(e),
        o = B(1);
    t && (r ? k(r) && (o = J(r)) : o = J(e));
    let s = qe(a, n, r) ? Ke(a) : B(0),
        c = (i.left + s.x) / o.x,
        l = (i.top + s.y) / o.y,
        u = i.width / o.x,
        d = i.height / o.y;
    if (a) {
        let e = E(a),
            t = r && k(r) ? E(r) : r,
            n = e,
            i = me(n);
        for (; i && r && t !== n;) {
            let e = J(i),
                t = i.getBoundingClientRect(),
                r = P(i),
                a = t.left + (i.clientLeft + parseFloat(r.paddingLeft)) * e.x,
                o = t.top + (i.clientTop + parseFloat(r.paddingTop)) * e.y;
            c *= e.x, l *= e.y, u *= e.x, d *= e.y, c += a, l += o, n = E(i), i = me(n)
        }
    }
    return K({
        width: u,
        height: d,
        x: c,
        y: l
    })
}

function X(e, t) {
    let n = fe(e).scrollLeft;
    return t ? t.left + n : Y(D(e)).left + n
}

function Je(e, t) {
    let n = e.getBoundingClientRect();
    return {
        x: n.left + t.scrollLeft - X(e, n),
        y: n.top + t.scrollTop
    }
}

function Ye(e) {
    let {
        elements: t,
        rect: n,
        offsetParent: r,
        strategy: i
    } = e, a = i === `fixed`, o = D(r), s = t ? ie(t.floating) : !1;
    if (r === o || s && a) return n;
    let c = {
            scrollLeft: 0,
            scrollTop: 0
        },
        l = B(1),
        u = B(0),
        d = A(r);
    if ((d || !d && !a) && ((T(r) !== `body` || M(o)) && (c = fe(r)), A(r))) {
        let e = Y(r);
        l = J(r), u.x = e.x + r.clientLeft, u.y = e.y + r.clientTop
    }
    let f = o && !d && !a ? Je(o, c) : B(0);
    return {
        width: n.width * l.x,
        height: n.height * l.y,
        x: n.x * l.x - c.scrollLeft * l.x + u.x + f.x,
        y: n.y * l.y - c.scrollTop * l.y + u.y + f.y
    }
}

function Xe(e) {
    return Array.from(e.getClientRects())
}

function Ze(e) {
    let t = D(e),
        n = fe(e),
        r = e.ownerDocument.body,
        i = R(t.scrollWidth, t.clientWidth, r.scrollWidth, r.clientWidth),
        a = R(t.scrollHeight, t.clientHeight, r.scrollHeight, r.clientHeight),
        o = -n.scrollLeft + X(e),
        s = -n.scrollTop;
    return P(r).direction === `rtl` && (o += R(t.clientWidth, r.clientWidth) - i), {
        width: i,
        height: a,
        x: o,
        y: s
    }
}
var Qe = 25;

function $e(e, t) {
    let n = E(e),
        r = D(e),
        i = n.visualViewport,
        a = r.clientWidth,
        o = r.clientHeight,
        s = 0,
        c = 0;
    if (i) {
        a = i.width, o = i.height;
        let e = ue();
        (!e || e && t === `fixed`) && (s = i.offsetLeft, c = i.offsetTop)
    }
    let l = X(r);
    if (l <= 0) {
        let e = r.ownerDocument,
            t = e.body,
            n = getComputedStyle(t),
            i = e.compatMode === `CSS1Compat` && parseFloat(n.marginLeft) + parseFloat(n.marginRight) || 0,
            o = Math.abs(r.clientWidth - t.clientWidth - i);
        o <= Qe && (a -= o)
    } else l <= Qe && (a += l);
    return {
        width: a,
        height: o,
        x: s,
        y: c
    }
}
var et = new Set([`absolute`, `fixed`]);

function tt(e, t) {
    let n = Y(e, !0, t === `fixed`),
        r = n.top + e.clientTop,
        i = n.left + e.clientLeft,
        a = A(e) ? J(e) : B(1);
    return {
        width: e.clientWidth * a.x,
        height: e.clientHeight * a.y,
        x: i * a.x,
        y: r * a.y
    }
}

function nt(e, t, n) {
    let r;
    if (t === `viewport`) r = $e(e, n);
    else if (t === `document`) r = Ze(D(e));
    else if (k(t)) r = tt(t, n);
    else {
        let n = Ke(e);
        r = {
            x: t.x - n.x,
            y: t.y - n.y,
            width: t.width,
            height: t.height
        }
    }
    return K(r)
}

function rt(e, t) {
    let n = F(e);
    return n === t || !k(n) || N(n) ? !1 : P(n).position === `fixed` || rt(n, t)
}

function it(e, t) {
    let n = t.get(e);
    if (n) return n;
    let r = I(e, [], !1).filter(e => k(e) && T(e) !== `body`),
        i = null,
        a = P(e).position === `fixed`,
        o = a ? F(e) : e;
    for (; k(o) && !N(o);) {
        let t = P(o),
            n = ce(o);
        !n && t.position === `fixed` && (i = null), (a ? !n && !i : !n && t.position === `static` && i && et.has(i.position) || M(o) && !n && rt(e, o)) ? r = r.filter(e => e !== o) : i = t, o = F(o)
    }
    return t.set(e, r), r
}

function at(e) {
    let {
        element: t,
        boundary: n,
        rootBoundary: r,
        strategy: i
    } = e, a = [...n === `clippingAncestors` ? ie(t) ? [] : it(t, this._c) : [].concat(n), r], o = a[0], s = a.reduce((e, n) => {
        let r = nt(t, n, i);
        return e.top = R(r.top, e.top), e.right = L(r.right, e.right), e.bottom = L(r.bottom, e.bottom), e.left = R(r.left, e.left), e
    }, nt(t, o, i));
    return {
        width: s.right - s.left,
        height: s.bottom - s.top,
        x: s.left,
        y: s.top
    }
}

function ot(e) {
    let {
        width: t,
        height: n
    } = Ue(e);
    return {
        width: t,
        height: n
    }
}

function st(e, t, n) {
    let r = A(t),
        i = D(t),
        a = n === `fixed`,
        o = Y(e, !0, a, t),
        s = {
            scrollLeft: 0,
            scrollTop: 0
        },
        c = B(0);

    function l() {
        c.x = X(i)
    }
    if (r || !r && !a)
        if ((T(t) !== `body` || M(i)) && (s = fe(t)), r) {
            let e = Y(t, !0, a, t);
            c.x = e.x + t.clientLeft, c.y = e.y + t.clientTop
        } else i && l();
    a && !r && i && l();
    let u = i && !r && !a ? Je(i, s) : B(0);
    return {
        x: o.left + s.scrollLeft - c.x - u.x,
        y: o.top + s.scrollTop - c.y - u.y,
        width: o.width,
        height: o.height
    }
}

function ct(e) {
    return P(e).position === `static`
}

function lt(e, t) {
    if (!A(e) || P(e).position === `fixed`) return null;
    if (t) return t(e);
    let n = e.offsetParent;
    return D(e) === n && (n = n.ownerDocument.body), n
}

function ut(e, t) {
    let n = E(e);
    if (ie(e)) return n;
    if (!A(e)) {
        let t = F(e);
        for (; t && !N(t);) {
            if (k(t) && !ct(t)) return t;
            t = F(t)
        }
        return n
    }
    let r = lt(e, t);
    for (; r && ne(r) && ct(r);) r = lt(r, t);
    return r && N(r) && ct(r) && !ce(r) ? n : r || le(e) || n
}
var dt = async function(e) {
    let t = this.getOffsetParent || ut,
        n = this.getDimensions,
        r = await n(e.floating);
    return {
        reference: st(e.reference, await t(e.floating), e.strategy),
        floating: {
            x: 0,
            y: 0,
            width: r.width,
            height: r.height
        }
    }
};

function ft(e) {
    return P(e).direction === `rtl`
}
var pt = {
    convertOffsetParentRelativeRectToViewportRelativeRect: Ye,
    getDocumentElement: D,
    getClippingRect: at,
    getOffsetParent: ut,
    getElementRects: dt,
    getClientRects: Xe,
    getDimensions: ot,
    getScale: J,
    isElement: k,
    isRTL: ft
};

function mt(e, t) {
    return e.x === t.x && e.y === t.y && e.width === t.width && e.height === t.height
}

function ht(e, t) {
    let n = null,
        r, i = D(e);

    function a() {
        var e;
        clearTimeout(r), (e = n) == null || e.disconnect(), n = null
    }

    function o(s, c) {
        s === void 0 && (s = !1), c === void 0 && (c = 1), a();
        let l = e.getBoundingClientRect(),
            {
                left: u,
                top: d,
                width: f,
                height: p
            } = l;
        if (s || t(), !f || !p) return;
        let m = ge(d),
            h = ge(i.clientWidth - (u + f)),
            g = ge(i.clientHeight - (d + p)),
            _ = ge(u),
            v = {
                rootMargin: -m + `px ` + -h + `px ` + -g + `px ` + -_ + `px`,
                threshold: R(0, L(1, c)) || 1
            },
            y = !0;

        function b(t) {
            let n = t[0].intersectionRatio;
            if (n !== c) {
                if (!y) return o();
                n ? o(!1, n) : r = setTimeout(() => {
                    o(!1, 1e-7)
                }, 1e3)
            }
            n === 1 && !mt(l, e.getBoundingClientRect()) && o(), y = !1
        }
        try {
            n = new IntersectionObserver(b, { ...v,
                root: i.ownerDocument
            })
        } catch {
            n = new IntersectionObserver(b, v)
        }
        n.observe(e)
    }
    return o(!0), a
}

function gt(e, t, n, r) {
    r === void 0 && (r = {});
    let {
        ancestorScroll: i = !0,
        ancestorResize: a = !0,
        elementResize: o = typeof ResizeObserver == `function`,
        layoutShift: s = typeof IntersectionObserver == `function`,
        animationFrame: c = !1
    } = r, l = We(e), u = i || a ? [...l ? I(l) : [], ...I(t)] : [];
    u.forEach(e => {
        i && e.addEventListener(`scroll`, n, {
            passive: !0
        }), a && e.addEventListener(`resize`, n)
    });
    let d = l && s ? ht(l, n) : null,
        f = -1,
        p = null;
    o && (p = new ResizeObserver(e => {
        let [r] = e;
        r && r.target === l && p && (p.unobserve(t), cancelAnimationFrame(f), f = requestAnimationFrame(() => {
            var e;
            (e = p) == null || e.observe(t)
        })), n()
    }), l && !c && p.observe(l), p.observe(t));
    let m, h = c ? Y(e) : null;
    c && g();

    function g() {
        let t = Y(e);
        h && !mt(h, t) && n(), h = t, m = requestAnimationFrame(g)
    }
    return n(), () => {
        var e;
        u.forEach(e => {
            i && e.removeEventListener(`scroll`, n), a && e.removeEventListener(`resize`, n)
        }), d ?.(), (e = p) == null || e.disconnect(), p = null, c && cancelAnimationFrame(m)
    }
}
var _t = q,
    vt = Be,
    yt = Ve,
    bt = Le,
    xt = He,
    St = (e, t, n) => {
        let r = new Map,
            i = {
                platform: pt,
                ...n
            },
            a = { ...i.platform,
                _c: r
            };
        return Ie(e, t, { ...i,
            platform: a
        })
    },
    Ct = e(u(), 1),
    Z = typeof document < `u` ? f.useLayoutEffect : function() {};

function Q(e, t) {
    if (e === t) return !0;
    if (typeof e != typeof t) return !1;
    if (typeof e == `function` && e.toString() === t.toString()) return !0;
    let n, r, i;
    if (e && t && typeof e == `object`) {
        if (Array.isArray(e)) {
            if (n = e.length, n !== t.length) return !1;
            for (r = n; r-- !== 0;)
                if (!Q(e[r], t[r])) return !1;
            return !0
        }
        if (i = Object.keys(e), n = i.length, n !== Object.keys(t).length) return !1;
        for (r = n; r-- !== 0;)
            if (!{}.hasOwnProperty.call(t, i[r])) return !1;
        for (r = n; r-- !== 0;) {
            let n = i[r];
            if (!(n === `_owner` && e.$$typeof) && !Q(e[n], t[n])) return !1
        }
        return !0
    }
    return e !== e && t !== t
}

function wt(e) {
    return typeof window > `u` ? 1 : (e.ownerDocument.defaultView || window).devicePixelRatio || 1
}

function Tt(e, t) {
    let n = wt(e);
    return Math.round(t * n) / n
}

function Et(e) {
    let t = f.useRef(e);
    return Z(() => {
        t.current = e
    }), t
}

function Dt(e) {
    e === void 0 && (e = {});
    let {
        placement: t = `bottom`,
        strategy: n = `absolute`,
        middleware: r = [],
        platform: i,
        elements: {
            reference: a,
            floating: o
        } = {},
        transform: s = !0,
        whileElementsMounted: c,
        open: l
    } = e, [u, d] = f.useState({
        x: 0,
        y: 0,
        strategy: n,
        placement: t,
        middlewareData: {},
        isPositioned: !1
    }), [p, m] = f.useState(r);
    Q(p, r) || m(r);
    let [h, g] = f.useState(null), [_, v] = f.useState(null), y = f.useCallback(e => {
        e !== C.current && (C.current = e, g(e))
    }, []), b = f.useCallback(e => {
        e !== w.current && (w.current = e, v(e))
    }, []), x = a || h, S = o || _, C = f.useRef(null), w = f.useRef(null), T = f.useRef(u), E = c != null, D = Et(c), O = Et(i), k = Et(l), A = f.useCallback(() => {
        if (!C.current || !w.current) return;
        let e = {
            placement: t,
            strategy: n,
            middleware: p
        };
        O.current && (e.platform = O.current), St(C.current, w.current, e).then(e => {
            let t = { ...e,
                isPositioned: k.current !== !1
            };
            j.current && !Q(T.current, t) && (T.current = t, Ct.flushSync(() => {
                d(t)
            }))
        })
    }, [p, t, n, O, k]);
    Z(() => {
        l === !1 && T.current.isPositioned && (T.current.isPositioned = !1, d(e => ({ ...e,
            isPositioned: !1
        })))
    }, [l]);
    let j = f.useRef(!1);
    Z(() => (j.current = !0, () => {
        j.current = !1
    }), []), Z(() => {
        if (x && (C.current = x), S && (w.current = S), x && S) {
            if (D.current) return D.current(x, S, A);
            A()
        }
    }, [x, S, A, D, E]);
    let ee = f.useMemo(() => ({
            reference: C,
            floating: w,
            setReference: y,
            setFloating: b
        }), [y, b]),
        M = f.useMemo(() => ({
            reference: x,
            floating: S
        }), [x, S]),
        te = f.useMemo(() => {
            let e = {
                position: n,
                left: 0,
                top: 0
            };
            if (!M.floating) return e;
            let t = Tt(M.floating, u.x),
                r = Tt(M.floating, u.y);
            return s ? { ...e,
                transform: `translate(` + t + `px, ` + r + `px)`,
                ...wt(M.floating) >= 1.5 && {
                    willChange: `transform`
                }
            } : {
                position: n,
                left: t,
                top: r
            }
        }, [n, s, M.floating, u.x, u.y]);
    return f.useMemo(() => ({ ...u,
        update: A,
        refs: ee,
        elements: M,
        floatingStyles: te
    }), [u, A, ee, M, te])
}
var Ot = (e, t) => ({ ...vt(e),
        options: [e, t]
    }),
    kt = (e, t) => ({ ...yt(e),
        options: [e, t]
    }),
    At = (e, t) => ({ ...bt(e),
        options: [e, t]
    }),
    jt = (e, t) => ({ ...xt(e),
        options: [e, t]
    }),
    Mt = e(u(), 1),
    Nt = { ...f
    },
    Pt = Nt.useInsertionEffect || (e => e());

function Ft(e) {
    let t = f.useRef(() => {});
    return Pt(() => {
        t.current = e
    }), f.useCallback(function() {
        var e = [...arguments];
        return t.current == null ? void 0 : t.current(...e)
    }, [])
}
var It = `ArrowUp`,
    Lt = `ArrowDown`,
    Rt = `ArrowLeft`,
    zt = `ArrowRight`,
    Bt = typeof document < `u` ? f.useLayoutEffect : f.useEffect,
    Vt = [Rt, zt],
    Ht = [It, Lt];
[...Vt, ...Ht];
var Ut = !1,
    Wt = 0,
    Gt = () => `floating-ui-` + Math.random().toString(36).slice(2, 6) + Wt++;

function Kt() {
    let [e, t] = f.useState(() => Ut ? Gt() : void 0);
    return Bt(() => {
        e ?? t(Gt())
    }, []), f.useEffect(() => {
        Ut = !0
    }, []), e
}
var qt = Nt.useId || Kt;

function Jt() {
    let e = new Map;
    return {
        emit(t, n) {
            var r;
            (r = e.get(t)) == null || r.forEach(e => e(n))
        },
        on(t, n) {
            e.set(t, [...e.get(t) || [], n])
        },
        off(t, n) {
            e.set(t, e.get(t) ?.filter(e => e !== n) || [])
        }
    }
}
var Yt = f.createContext(null),
    Xt = f.createContext(null),
    Zt = () => f.useContext(Yt) ?.id || null,
    Qt = () => f.useContext(Xt),
    $t = `data-floating-ui-focusable`;

function en(e) {
    let {
        open: t = !1,
        onOpenChange: n,
        elements: r
    } = e, i = qt(), a = f.useRef({}), [o] = f.useState(() => Jt()), s = Zt() != null, [c, l] = f.useState(r.reference), u = Ft((e, t, r) => {
        a.current.openEvent = e ? t : void 0, o.emit(`openchange`, {
            open: e,
            event: t,
            reason: r,
            nested: s
        }), n ?.(e, t, r)
    }), d = f.useMemo(() => ({
        setPositionReference: l
    }), []), p = f.useMemo(() => ({
        reference: c || r.reference || null,
        floating: r.floating || null,
        domReference: r.reference
    }), [c, r.reference, r.floating]);
    return f.useMemo(() => ({
        dataRef: a,
        open: t,
        onOpenChange: u,
        elements: p,
        events: o,
        floatingId: i,
        refs: d
    }), [t, u, p, o, i, d])
}

function tn(e) {
    e === void 0 && (e = {});
    let {
        nodeId: t
    } = e, n = en({ ...e,
        elements: {
            reference: null,
            floating: null,
            ...e.elements
        }
    }), r = e.rootContext || n, i = r.elements, [a, o] = f.useState(null), [s, c] = f.useState(null), l = i ?.domReference || a, u = f.useRef(null), d = Qt();
    Bt(() => {
        l && (u.current = l)
    }, [l]);
    let p = Dt({ ...e,
            elements: { ...i,
                ...s && {
                    reference: s
                }
            }
        }),
        m = f.useCallback(e => {
            let t = k(e) ? {
                getBoundingClientRect: () => e.getBoundingClientRect(),
                contextElement: e
            } : e;
            c(t), p.refs.setReference(t)
        }, [p.refs]),
        h = f.useCallback(e => {
            (k(e) || e === null) && (u.current = e, o(e)), (k(p.refs.reference.current) || p.refs.reference.current === null || e !== null && !k(e)) && p.refs.setReference(e)
        }, [p.refs]),
        g = f.useMemo(() => ({ ...p.refs,
            setReference: h,
            setPositionReference: m,
            domReference: u
        }), [p.refs, h, m]),
        _ = f.useMemo(() => ({ ...p.elements,
            domReference: l
        }), [p.elements, l]),
        v = f.useMemo(() => ({ ...p,
            ...r,
            refs: g,
            elements: _,
            nodeId: t
        }), [p, g, _, t, r]);
    return Bt(() => {
        r.dataRef.current.floatingContext = v;
        let e = d ?.nodesRef.current.find(e => e.id === t);
        e && (e.context = v)
    }), f.useMemo(() => ({ ...p,
        context: v,
        refs: g,
        elements: _
    }), [p, g, _, v])
}
var nn = `active`,
    rn = `selected`;

function an(e, t, n) {
    let r = new Map,
        i = n === `item`,
        a = e;
    if (i && e) {
        let {
            [nn]: t, [rn]: n, ...r
        } = e;
        a = r
    }
    return { ...n === `floating` && {
            tabIndex: -1,
            [$t]: ``
        },
        ...a,
        ...t.map(t => {
            let r = t ? t[n] : null;
            return typeof r == `function` ? e ? r(e) : null : r
        }).concat(e).reduce((e, t) => (t && Object.entries(t).forEach(t => {
            let [n, a] = t;
            if (!(i && [nn, rn].includes(n)))
                if (n.indexOf(`on`) === 0) {
                    if (r.has(n) || r.set(n, []), typeof a == `function`) {
                        var o;
                        (o = r.get(n)) == null || o.push(a), e[n] = function() {
                            var e = [...arguments];
                            return r.get(n) ?.map(t => t(...e)).find(e => e !== void 0)
                        }
                    }
                } else e[n] = a
        }), e), {})
    }
}

function on(e) {
    e === void 0 && (e = []);
    let t = e.map(e => e ?.reference),
        n = e.map(e => e ?.floating),
        r = e.map(e => e ?.item),
        i = f.useCallback(t => an(t, e, `reference`), t),
        a = f.useCallback(t => an(t, e, `floating`), n),
        o = f.useCallback(t => an(t, e, `item`), r);
    return f.useMemo(() => ({
        getReferenceProps: i,
        getFloatingProps: a,
        getItemProps: o
    }), [i, a, o])
}

function sn(e, t) {
    return { ...e,
        rects: { ...e.rects,
            floating: { ...e.rects.floating,
                height: t
            }
        }
    }
}
var cn = e => ({
    name: `inner`,
    options: e,
    async fn(t) {
        let {
            listRef: n,
            overflowRef: r,
            onFallbackChange: i,
            offset: a = 0,
            index: o = 0,
            minItemsVisible: s = 4,
            referenceOverflowThreshold: c = 0,
            scrollRef: l,
            ...u
        } = V(e, t), {
            rects: d,
            elements: {
                floating: f
            }
        } = t, p = n.current[o], m = l ?.current || f, h = f.clientTop || m.clientTop, g = f.clientTop !== 0, _ = m.clientTop !== 0, v = f === m;
        if (!p) return {};
        let y = { ...t,
                ...await Ot(-p.offsetTop - f.clientTop - d.reference.height / 2 - p.offsetHeight / 2 - a).fn(t)
            },
            b = await _t(sn(y, m.scrollHeight + h + f.clientTop), u),
            x = await _t(y, { ...u,
                elementContext: `reference`
            }),
            S = R(0, b.top),
            C = y.y + S,
            w = (m.scrollHeight > m.clientHeight ? e => e : z)(R(0, m.scrollHeight + (g && v || _ ? h * 2 : 0) - S - R(0, b.bottom)));
        if (m.style.maxHeight = w + `px`, m.scrollTop = S, i) {
            let e = m.offsetHeight < p.offsetHeight * L(s, n.current.length) - 1 || x.top >= -c || x.bottom >= -c;
            Mt.flushSync(() => i(e))
        }
        return r && (r.current = await _t(sn({ ...y,
            y: C
        }, m.offsetHeight + h + f.clientTop), u)), {
            y: C
        }
    }
});

function ln(e, t) {
    let {
        open: n,
        elements: r
    } = e, {
        enabled: i = !0,
        overflowRef: a,
        scrollRef: o,
        onChange: s
    } = t, c = Ft(s), l = f.useRef(!1), u = f.useRef(null), d = f.useRef(null);
    f.useEffect(() => {
        if (!i) return;

        function e(e) {
            if (e.ctrlKey || !t || a.current == null) return;
            let n = e.deltaY,
                r = a.current.top >= -.5,
                i = a.current.bottom >= -.5,
                o = t.scrollHeight - t.clientHeight,
                s = n < 0 ? -1 : 1,
                l = n < 0 ? `max` : `min`;
            t.scrollHeight <= t.clientHeight || (!r && n > 0 || !i && n < 0 ? (e.preventDefault(), Mt.flushSync(() => {
                c(e => e + Math[l](n, o * s))
            })) : /firefox/i.test(he()) && (t.scrollTop += n))
        }
        let t = o ?.current || r.floating;
        if (n && t) return t.addEventListener(`wheel`, e), requestAnimationFrame(() => {
            u.current = t.scrollTop, a.current != null && (d.current = { ...a.current
            })
        }), () => {
            u.current = null, d.current = null, t.removeEventListener(`wheel`, e)
        }
    }, [i, n, r.floating, a, o, c]);
    let p = f.useMemo(() => ({
        onKeyDown() {
            l.current = !0
        },
        onWheel() {
            l.current = !1
        },
        onPointerMove() {
            l.current = !1
        },
        onScroll() {
            let e = o ?.current || r.floating;
            if (!(!a.current || !e || !l.current)) {
                if (u.current !== null) {
                    let t = e.scrollTop - u.current;
                    (a.current.bottom < -.5 && t < -1 || a.current.top < -.5 && t > 1) && Mt.flushSync(() => c(e => e + t))
                }
                requestAnimationFrame(() => {
                    u.current = e.scrollTop
                })
            }
        }
    }), [r.floating, c, a, o]);
    return f.useMemo(() => i ? {
        floating: p
    } : {}, [i, p])
}
var $ = (0, f.createContext)({
    styles: void 0,
    setReference: () => {},
    setFloating: () => {},
    getReferenceProps: () => ({}),
    getFloatingProps: () => ({}),
    slot: {}
});
$.displayName = `FloatingContext`;
var un = (0, f.createContext)(null);
un.displayName = `PlacementContext`;

function dn(e) {
    return (0, f.useMemo)(() => e ? typeof e == `string` ? {
        to: e
    } : e : null, [e])
}

function fn() {
    return (0, f.useContext)($).setReference
}

function pn() {
    return (0, f.useContext)($).getReferenceProps
}

function mn() {
    let {
        getFloatingProps: e,
        slot: t
    } = (0, f.useContext)($);
    return (0, f.useCallback)((...n) => Object.assign({}, e(...n), {
        "data-anchor": t.anchor
    }), [e, t])
}

function hn(e = null) {
    e === !1 && (e = null), typeof e == `string` && (e = {
        to: e
    });
    let t = (0, f.useContext)(un),
        n = (0, f.useMemo)(() => e, [JSON.stringify(e, (e, t) => t ?.outerHTML ?? t)]);
    c(() => {
        t ?.(n ?? null)
    }, [t, n]);
    let r = (0, f.useContext)($);
    return (0, f.useMemo)(() => [r.setFloating, e ? r.styles : {}], [r.setFloating, e, r.styles])
}
var gn = 4;

function _n({
    children: e,
    enabled: t = !0
}) {
    let [n, r] = (0, f.useState)(null), [a, o] = (0, f.useState)(0), s = (0, f.useRef)(null), [u, d] = (0, f.useState)(null);
    vn(u);
    let p = t && n !== null && u !== null,
        {
            to: m = `bottom`,
            gap: h = 0,
            offset: g = 0,
            padding: _ = 0,
            inner: v
        } = yn(n, u),
        [y, b = `center`] = m.split(` `);
    c(() => {
        p && o(0)
    }, [p]);
    let {
        refs: x,
        floatingStyles: S,
        context: C
    } = tn({
        open: p,
        placement: y === `selection` ? b === `center` ? `bottom` : `bottom-${b}` : b === `center` ? `${y}` : `${y}-${b}`,
        strategy: `absolute`,
        transform: !1,
        middleware: [Ot({
            mainAxis: y === `selection` ? 0 : h,
            crossAxis: g
        }), kt({
            padding: _
        }), y !== `selection` && At({
            padding: _
        }), y === `selection` && v ? cn({ ...v,
            padding: _,
            overflowRef: s,
            offset: a,
            minItemsVisible: gn,
            referenceOverflowThreshold: _,
            onFallbackChange(e) {
                if (!e) return;
                let t = C.elements.floating;
                if (!t) return;
                let n = parseFloat(getComputedStyle(t).scrollPaddingBottom) || 0,
                    r = Math.min(gn, t.childElementCount),
                    a = 0,
                    s = 0;
                for (let e of C.elements.floating ?.childNodes ?? [])
                    if (i(e)) {
                        let i = e.offsetTop,
                            o = i + e.clientHeight + n,
                            c = t.scrollTop,
                            l = c + t.clientHeight;
                        if (i >= c && o <= l) r--;
                        else {
                            s = Math.max(0, Math.min(o, l) - Math.max(i, c)), a = e.clientHeight;
                            break
                        }
                    }
                r >= 1 && o(e => {
                    let t = a * r - s + n;
                    return e >= t ? e : t
                })
            }
        }) : null, jt({
            padding: _,
            apply({
                availableWidth: e,
                availableHeight: t,
                elements: n
            }) {
                Object.assign(n.floating.style, {
                    overflow: `auto`,
                    maxWidth: `${e}px`,
                    maxHeight: `min(var(--anchor-max-height, 100vh), ${t}px)`
                })
            }
        })].filter(Boolean),
        whileElementsMounted: gt
    }), [w = y, T = b] = C.placement.split(`-`);
    y === `selection` && (w = `selection`);
    let E = (0, f.useMemo)(() => ({
            anchor: [w, T].filter(Boolean).join(` `)
        }), [w, T]),
        {
            getReferenceProps: D,
            getFloatingProps: O
        } = on([ln(C, {
            overflowRef: s,
            onChange: o
        })]),
        k = l(e => {
            d(e), x.setFloating(e)
        });
    return f.createElement(un.Provider, {
        value: r
    }, f.createElement($.Provider, {
        value: {
            setFloating: k,
            setReference: x.setReference,
            styles: S,
            getReferenceProps: D,
            getFloatingProps: O,
            slot: E
        }
    }, e))
}

function vn(e) {
    c(() => {
        if (!e) return;
        let t = new MutationObserver(() => {
            let t = window.getComputedStyle(e).maxHeight,
                n = parseFloat(t);
            if (isNaN(n)) return;
            let r = parseInt(t);
            isNaN(r) || n !== r && (e.style.maxHeight = `${Math.ceil(n)}px`)
        });
        return t.observe(e, {
            attributes: !0,
            attributeFilter: [`style`]
        }), () => {
            t.disconnect()
        }
    }, [e])
}

function yn(e, t) {
    let n = bn(e ?.gap ?? `var(--anchor-gap, 0)`, t),
        r = bn(e ?.offset ?? `var(--anchor-offset, 0)`, t),
        i = bn(e ?.padding ?? `var(--anchor-padding, 0)`, t);
    return { ...e,
        gap: n,
        offset: r,
        padding: i
    }
}

function bn(e, t, n = void 0) {
    let r = s(),
        i = l((e, t) => {
            if (e == null) return [n, null];
            if (typeof e == `number`) return [e, null];
            if (typeof e == `string`) {
                if (!t) return [n, null];
                let i = Sn(e, t);
                return [i, n => {
                    let a = xn(e); {
                        let o = a.map(e => window.getComputedStyle(t).getPropertyValue(e));
                        r.requestAnimationFrame(function s() {
                            r.nextFrame(s);
                            let c = !1;
                            for (let [e, n] of a.entries()) {
                                let r = window.getComputedStyle(t).getPropertyValue(n);
                                if (o[e] !== r) {
                                    o[e] = r, c = !0;
                                    break
                                }
                            }
                            if (!c) return;
                            let l = Sn(e, t);
                            i !== l && (n(l), i = l)
                        })
                    }
                    return r.dispose
                }]
            }
            return [n, null]
        }),
        a = (0, f.useMemo)(() => i(e, t)[0], [e, t]),
        [o = a, u] = (0, f.useState)();
    return c(() => {
        let [n, r] = i(e, t);
        if (u(n), r) return r(u)
    }, [e, t]), o
}

function xn(e) {
    let t = /var\((.*)\)/.exec(e);
    if (t) {
        let e = t[1].indexOf(`,`);
        if (e === -1) return [t[1]];
        let n = t[1].slice(0, e).trim(),
            r = t[1].slice(e + 1).trim();
        return r ? [n, ...xn(r)] : [n]
    }
    return []
}

function Sn(e, t) {
    let n = document.createElement(`div`);
    t.appendChild(n), n.style.setProperty(`margin-top`, `0px`, `important`), n.style.setProperty(`margin-top`, e, `important`);
    let r = parseFloat(window.getComputedStyle(n).marginTop) || 0;
    return t.removeChild(n), r
}

function Cn(e) {
    throw Error(`Unexpected object: ` + e)
}
var wn = (e => (e[e.First = 0] = `First`, e[e.Previous = 1] = `Previous`, e[e.Next = 2] = `Next`, e[e.Last = 3] = `Last`, e[e.Specific = 4] = `Specific`, e[e.Nothing = 5] = `Nothing`, e))(wn || {});

function Tn(e, t) {
    let n = t.resolveItems();
    if (n.length <= 0) return null;
    let r = t.resolveActiveIndex(),
        i = r ?? -1;
    switch (e.focus) {
        case 0:
            for (let e = 0; e < n.length; ++e)
                if (!t.resolveDisabled(n[e], e, n)) return e;
            return r;
        case 1:
            i === -1 && (i = n.length);
            for (let e = i - 1; e >= 0; --e)
                if (!t.resolveDisabled(n[e], e, n)) return e;
            return r;
        case 2:
            for (let e = i + 1; e < n.length; ++e)
                if (!t.resolveDisabled(n[e], e, n)) return e;
            return r;
        case 3:
            for (let e = n.length - 1; e >= 0; --e)
                if (!t.resolveDisabled(n[e], e, n)) return e;
            return r;
        case 4:
            for (let r = 0; r < n.length; ++r)
                if (t.resolveId(n[r], r, n) === e.id) return r;
            return r;
        case 5:
            return null;
        default:
            Cn(e)
    }
}
var En = {
    Idle: {
        kind: `Idle`
    },
    Tracked: e => ({
        kind: `Tracked`,
        position: e
    }),
    Moved: {
        kind: `Moved`
    }
};

function Dn(e) {
    let t = e.getBoundingClientRect();
    return `${t.x},${t.y}`
}

function On(e, t, n) {
    let r = o();
    if (t.kind === `Tracked`) {
        let i = function() {
                a !== Dn(e) && (r.dispose(), n())
            },
            {
                position: a
            } = t,
            o = new ResizeObserver(i);
        o.observe(e), r.add(() => o.disconnect()), r.addEventListener(window, `scroll`, i, {
            passive: !0
        }), r.addEventListener(window, `resize`, i)
    }
    return () => r.dispose()
}
export {
    m as _, Tn as a, hn as c, dn as d, C as f, h as g, g as h, wn as i, mn as l, v as m, En as n, _n as o, x as p, On as r, fn as s, Dn as t, pn as u
};
//# sourceMappingURL=element-movement-CmW-4m3J.js.map