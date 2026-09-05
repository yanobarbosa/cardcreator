import {
    n as e
} from "./chunk-B3K2TuZy.js";
import {
    o as t
} from "./compiler-runtime-4XzsAixn.js";
import {
    G as n,
    H as r,
    J as i,
    U as a,
    W as o,
    at as s,
    bt as c,
    et as l,
    ft as u,
    gt as d,
    ht as f,
    pt as p,
    q as ee,
    rt as te,
    ut as ne
} from "./portal-CtSeHqeD.js";
var m = e(t(), 1),
    h = typeof document < `u` ? m.useLayoutEffect : () => {},
    g = e => e ?.ownerDocument ?? document,
    _ = e => e && `window` in e && e.window === e ? e : g(e).defaultView || window;

function v(e) {
    return typeof e == `object` && !!e && `nodeType` in e && typeof e.nodeType == `number`
}

function re(e) {
    return v(e) && e.nodeType === Node.DOCUMENT_FRAGMENT_NODE && `host` in e
}
var y = !1;

function b() {
    return y
}

function x(e, t) {
    if (!b()) return t && e ? e.contains(t) : !1;
    if (!e || !t) return !1;
    let n = t;
    for (; n !== null;) {
        if (n === e) return !0;
        n = n.tagName === `SLOT` && n.assignedSlot ? n.assignedSlot.parentNode : re(n) ? n.host : n.parentNode
    }
    return !1
}
var S = (e = document) => {
    if (!b()) return e.activeElement;
    let t = e.activeElement;
    for (; t && `shadowRoot` in t && t.shadowRoot ?.activeElement;) t = t.shadowRoot.activeElement;
    return t
};

function C(e) {
    return b() && e.target.shadowRoot && e.composedPath ? e.composedPath()[0] : e.target
}

function ie(e) {
    if (ae()) e.focus({
        preventScroll: !0
    });
    else {
        let t = oe(e);
        e.focus(), se(t)
    }
}
var w = null;

function ae() {
    if (w == null) {
        w = !1;
        try {
            document.createElement(`div`).focus({
                get preventScroll() {
                    return w = !0, !0
                }
            })
        } catch {}
    }
    return w
}

function oe(e) {
    let t = e.parentNode,
        n = [],
        r = document.scrollingElement || document.documentElement;
    for (; t instanceof HTMLElement && t !== r;)(t.offsetHeight < t.scrollHeight || t.offsetWidth < t.scrollWidth) && n.push({
        element: t,
        scrollTop: t.scrollTop,
        scrollLeft: t.scrollLeft
    }), t = t.parentNode;
    return r instanceof HTMLElement && n.push({
        element: r,
        scrollTop: r.scrollTop,
        scrollLeft: r.scrollLeft
    }), n
}

function se(e) {
    for (let {
            element: t,
            scrollTop: n,
            scrollLeft: r
        } of e) t.scrollTop = n, t.scrollLeft = r
}

function T(e) {
    if (typeof window > `u` || window.navigator == null) return !1;
    let t = window.navigator.userAgentData ?.brands;
    return Array.isArray(t) && t.some(t => e.test(t.brand)) || e.test(window.navigator.userAgent)
}

function E(e) {
    return typeof window < `u` && window.navigator != null ? e.test(window.navigator.userAgentData ?.platform || window.navigator.platform) : !1
}

function D(e) {
    let t = null;
    return () => (t ??= e(), t)
}
var O = D(function() {
        return E(/^Mac/i)
    }),
    ce = D(function() {
        return E(/^iPad/i) || O() && navigator.maxTouchPoints > 1
    }),
    le = D(function() {
        return T(/AppleWebKit/i) && !ue()
    }),
    ue = D(function() {
        return T(/Chrome/i)
    }),
    de = D(function() {
        return T(/Android/i)
    }),
    fe = D(function() {
        return T(/Firefox/i)
    });

function k(e, t, n = !0) {
    var r;
    let {
        metaKey: i,
        ctrlKey: a,
        altKey: o,
        shiftKey: s
    } = t;
    fe() && (r = window.event) != null && r.type ?.startsWith(`key`) && e.target === `_blank` && (O() ? i = !0 : a = !0);
    let c = le() && O() && !ce() ? new KeyboardEvent(`keydown`, {
        keyIdentifier: `Enter`,
        metaKey: i,
        ctrlKey: a,
        altKey: o,
        shiftKey: s
    }) : new MouseEvent(`click`, {
        metaKey: i,
        ctrlKey: a,
        altKey: o,
        shiftKey: s,
        detail: 1,
        bubbles: !0,
        cancelable: !0
    });
    k.isOpening = n, ie(e), e.dispatchEvent(c), k.isOpening = !1
}
k.isOpening = !1;

function A() {
    let e = (0, m.useRef)(new Map),
        t = (0, m.useCallback)((t, n, r, i) => {
            let a = i ?.once ? (...t) => {
                e.current.delete(r), r(...t)
            } : r;
            e.current.set(r, {
                type: n,
                eventTarget: t,
                fn: a,
                options: i
            }), t.addEventListener(n, a, i)
        }, []),
        n = (0, m.useCallback)((t, n, r, i) => {
            let a = e.current.get(r) ?.fn || r;
            t.removeEventListener(n, a, i), e.current.delete(r)
        }, []),
        r = (0, m.useCallback)(() => {
            e.current.forEach((e, t) => {
                n(e.eventTarget, e.type, t, e.options)
            })
        }, [n]);
    return (0, m.useEffect)(() => r, [r]), {
        addGlobalListener: t,
        removeGlobalListener: n,
        removeAllGlobalListeners: r
    }
}

function pe(e) {
    return e.pointerType === `` && e.isTrusted ? !0 : de() && e.pointerType ? e.type === `click` && e.buttons === 1 : e.detail === 0 && !e.pointerType
}

function j(e) {
    let t = e;
    return t.nativeEvent = e, t.isDefaultPrevented = () => t.defaultPrevented, t.isPropagationStopped = () => t.cancelBubble, t.persist = () => {}, t
}

function me(e, t) {
    Object.defineProperty(e, `target`, {
        value: t
    }), Object.defineProperty(e, `currentTarget`, {
        value: t
    })
}

function M(e) {
    let t = (0, m.useRef)({
        isFocused: !1,
        observer: null
    });
    return h(() => {
        let e = t.current;
        return () => {
            e.observer &&= (e.observer.disconnect(), null)
        }
    }, []), (0, m.useCallback)(n => {
        if (n.target instanceof HTMLButtonElement || n.target instanceof HTMLInputElement || n.target instanceof HTMLTextAreaElement || n.target instanceof HTMLSelectElement) {
            t.current.isFocused = !0;
            let r = n.target;
            r.addEventListener(`focusout`, n => {
                if (t.current.isFocused = !1, r.disabled) {
                    let t = j(n);
                    e ?.(t)
                }
                t.current.observer && (t.current.observer.disconnect(), t.current.observer = null)
            }, {
                once: !0
            }), t.current.observer = new MutationObserver(() => {
                if (t.current.isFocused && r.disabled) {
                    var e;
                    (e = t.current.observer) == null || e.disconnect();
                    let n = r === document.activeElement ? null : document.activeElement;
                    r.dispatchEvent(new FocusEvent(`blur`, {
                        relatedTarget: n
                    })), r.dispatchEvent(new FocusEvent(`focusout`, {
                        bubbles: !0,
                        relatedTarget: n
                    }))
                }
            }), t.current.observer.observe(r, {
                attributes: !0,
                attributeFilter: [`disabled`]
            })
        }
    }, [e])
}
var N = !1,
    P = null,
    F = new Set,
    I = new Map,
    L = !1,
    R = !1,
    he = {
        Tab: !0,
        Escape: !0
    };

function z(e, t) {
    for (let n of F) n(e, t)
}

function ge(e) {
    return !(e.metaKey || !O() && e.altKey || e.ctrlKey || e.key === `Control` || e.key === `Shift` || e.key === `Meta`)
}

function B(e) {
    L = !0, !k.isOpening && ge(e) && (P = `keyboard`, z(`keyboard`, e))
}

function V(e) {
    P = `pointer`, `pointerType` in e && e.pointerType, (e.type === `mousedown` || e.type === `pointerdown`) && (L = !0, z(`pointer`, e))
}

function H(e) {
    !k.isOpening && pe(e) && (L = !0, P = `virtual`)
}

function U(e) {
    e.target === window || e.target === document || N || !e.isTrusted || (!L && !R && (P = `virtual`, z(`virtual`, e)), L = !1, R = !1)
}

function W() {
    N || (L = !1, R = !0)
}

function G(e) {
    if (typeof window > `u` || typeof document > `u` || I.get(_(e))) return;
    let t = _(e),
        n = g(e),
        r = t.HTMLElement.prototype.focus;
    t.HTMLElement.prototype.focus = function() {
        L = !0, r.apply(this, arguments)
    }, n.addEventListener(`keydown`, B, !0), n.addEventListener(`keyup`, B, !0), n.addEventListener(`click`, H, !0), t.addEventListener(`focus`, U, !0), t.addEventListener(`blur`, W, !1), typeof PointerEvent < `u` && (n.addEventListener(`pointerdown`, V, !0), n.addEventListener(`pointermove`, V, !0), n.addEventListener(`pointerup`, V, !0)), t.addEventListener(`beforeunload`, () => {
        K(e)
    }, {
        once: !0
    }), I.set(t, {
        focus: r
    })
}
var K = (e, t) => {
    let n = _(e),
        r = g(e);
    t && r.removeEventListener(`DOMContentLoaded`, t), I.has(n) && (n.HTMLElement.prototype.focus = I.get(n).focus, r.removeEventListener(`keydown`, B, !0), r.removeEventListener(`keyup`, B, !0), r.removeEventListener(`click`, H, !0), n.removeEventListener(`focus`, U, !0), n.removeEventListener(`blur`, W, !1), typeof PointerEvent < `u` && (r.removeEventListener(`pointerdown`, V, !0), r.removeEventListener(`pointermove`, V, !0), r.removeEventListener(`pointerup`, V, !0)), I.delete(n))
};

function _e(e) {
    let t = g(e),
        n;
    return t.readyState === `loading` ? (n = () => {
        G(e)
    }, t.addEventListener(`DOMContentLoaded`, n)) : G(e), () => K(e, n)
}
typeof document < `u` && _e();

function q() {
    return P !== `pointer`
}
var ve = new Set([`checkbox`, `radio`, `range`, `color`, `file`, `image`, `button`, `submit`, `reset`]);

function ye(e, t, n) {
    let r = g(n ?.target),
        i = typeof window < `u` ? _(n ?.target).HTMLInputElement : HTMLInputElement,
        a = typeof window < `u` ? _(n ?.target).HTMLTextAreaElement : HTMLTextAreaElement,
        o = typeof window < `u` ? _(n ?.target).HTMLElement : HTMLElement,
        s = typeof window < `u` ? _(n ?.target).KeyboardEvent : KeyboardEvent;
    return e = e || r.activeElement instanceof i && !ve.has(r.activeElement.type) || r.activeElement instanceof a || r.activeElement instanceof o && r.activeElement.isContentEditable, !(e && t === `keyboard` && n instanceof s && !he[n.key])
}

function be(e, t, n) {
    G(), (0, m.useEffect)(() => {
        let t = (t, r) => {
            ye(!!n ?.isTextInput, t, r) && e(q())
        };
        return F.add(t), () => {
            F.delete(t)
        }
    }, t)
}

function xe(e) {
    let {
        isDisabled: t,
        onFocus: n,
        onBlur: r,
        onFocusChange: i
    } = e, a = (0, m.useCallback)(e => {
        if (e.target === e.currentTarget) return r && r(e), i && i(!1), !0
    }, [r, i]), o = M(a), s = (0, m.useCallback)(e => {
        let t = g(e.target),
            r = t ? S(t) : S();
        e.target === e.currentTarget && r === C(e.nativeEvent) && (n && n(e), i && i(!0), o(e))
    }, [i, n, o]);
    return {
        focusProps: {
            onFocus: !t && (n || i || r) ? s : void 0,
            onBlur: !t && (r || i) ? a : void 0
        }
    }
}

function Se(e) {
    let {
        isDisabled: t,
        onBlurWithin: n,
        onFocusWithin: r,
        onFocusWithinChange: i
    } = e, a = (0, m.useRef)({
        isFocusWithin: !1
    }), {
        addGlobalListener: o,
        removeAllGlobalListeners: s
    } = A(), c = (0, m.useCallback)(e => {
        e.currentTarget.contains(e.target) && a.current.isFocusWithin && !e.currentTarget.contains(e.relatedTarget) && (a.current.isFocusWithin = !1, s(), n && n(e), i && i(!1))
    }, [n, i, a, s]), l = M(c), u = (0, m.useCallback)(e => {
        if (!e.currentTarget.contains(e.target)) return;
        let t = g(e.target),
            n = S(t);
        if (!a.current.isFocusWithin && n === C(e.nativeEvent)) {
            r && r(e), i && i(!0), a.current.isFocusWithin = !0, l(e);
            let n = e.currentTarget;
            o(t, `focus`, e => {
                if (a.current.isFocusWithin && !x(n, e.target)) {
                    let r = new t.defaultView.FocusEvent(`blur`, {
                        relatedTarget: e.target
                    });
                    me(r, n), c(j(r))
                }
            }, {
                capture: !0
            })
        }
    }, [r, i, l, o, c]);
    return t ? {
        focusWithinProps: {
            onFocus: void 0,
            onBlur: void 0
        }
    } : {
        focusWithinProps: {
            onFocus: u,
            onBlur: c
        }
    }
}
var J = !1,
    Y = 0;

function Ce() {
    J = !0, setTimeout(() => {
        J = !1
    }, 50)
}

function X(e) {
    e.pointerType === `touch` && Ce()
}

function we() {
    if (!(typeof document > `u`)) return Y === 0 && typeof PointerEvent < `u` && document.addEventListener(`pointerup`, X), Y++, () => {
        Y--, !(Y > 0) && typeof PointerEvent < `u` && document.removeEventListener(`pointerup`, X)
    }
}

function Te(e) {
    let {
        onHoverStart: t,
        onHoverChange: n,
        onHoverEnd: r,
        isDisabled: i
    } = e, [a, o] = (0, m.useState)(!1), s = (0, m.useRef)({
        isHovered: !1,
        ignoreEmulatedMouseEvents: !1,
        pointerType: ``,
        target: null
    }).current;
    (0, m.useEffect)(we, []);
    let {
        addGlobalListener: c,
        removeAllGlobalListeners: l
    } = A(), {
        hoverProps: u,
        triggerHoverEnd: d
    } = (0, m.useMemo)(() => {
        let e = (e, r) => {
                if (s.pointerType = r, i || r === `touch` || s.isHovered || !e.currentTarget.contains(e.target)) return;
                s.isHovered = !0;
                let l = e.currentTarget;
                s.target = l, c(g(e.target), `pointerover`, e => {
                    s.isHovered && s.target && !x(s.target, e.target) && a(e, e.pointerType)
                }, {
                    capture: !0
                }), t && t({
                    type: `hoverstart`,
                    target: l,
                    pointerType: r
                }), n && n(!0), o(!0)
            },
            a = (e, t) => {
                let i = s.target;
                s.pointerType = ``, s.target = null, !(t === `touch` || !s.isHovered || !i) && (s.isHovered = !1, l(), r && r({
                    type: `hoverend`,
                    target: i,
                    pointerType: t
                }), n && n(!1), o(!1))
            },
            u = {};
        return typeof PointerEvent < `u` && (u.onPointerEnter = t => {
            J && t.pointerType === `mouse` || e(t, t.pointerType)
        }, u.onPointerLeave = e => {
            !i && e.currentTarget.contains(e.target) && a(e, e.pointerType)
        }), {
            hoverProps: u,
            triggerHoverEnd: a
        }
    }, [t, n, r, i, s, c, l]);
    return (0, m.useEffect)(() => {
        i && d({
            currentTarget: s.target
        }, s.pointerType)
    }, [i]), {
        hoverProps: u,
        isHovered: a
    }
}

function Ee(e = {}) {
    let {
        autoFocus: t = !1,
        isTextInput: n,
        within: r
    } = e, i = (0, m.useRef)({
        isFocused: !1,
        isFocusVisible: t || q()
    }), [a, o] = (0, m.useState)(!1), [s, c] = (0, m.useState)(() => i.current.isFocused && i.current.isFocusVisible), l = (0, m.useCallback)(() => c(i.current.isFocused && i.current.isFocusVisible), []), u = (0, m.useCallback)(e => {
        i.current.isFocused = e, o(e), l()
    }, [l]);
    be(e => {
        i.current.isFocusVisible = e, l()
    }, [], {
        isTextInput: n
    });
    let {
        focusProps: d
    } = xe({
        isDisabled: r,
        onFocusChange: u
    }), {
        focusWithinProps: f
    } = Se({
        isDisabled: !r,
        onFocusWithinChange: u
    });
    return {
        isFocused: a,
        isFocusVisible: s,
        focusProps: r ? f : d
    }
}

function De(e) {
    let t = e.width / 2,
        n = e.height / 2;
    return {
        top: e.clientY - n,
        right: e.clientX + t,
        bottom: e.clientY + n,
        left: e.clientX - t
    }
}

function Oe(e, t) {
    return !(!e || !t || e.right < t.left || e.left > t.right || e.bottom < t.top || e.top > t.bottom)
}

function ke({
    disabled: e = !1
} = {}) {
    let t = (0, m.useRef)(null),
        [n, r] = (0, m.useState)(!1),
        i = d(),
        a = p(() => {
            t.current = null, r(!1), i.dispose()
        }),
        o = p(e => {
            if (i.dispose(), t.current === null) {
                t.current = e.currentTarget, r(!0); {
                    let n = c(e.currentTarget);
                    i.addEventListener(n, `pointerup`, a, !1), i.addEventListener(n, `pointermove`, e => {
                        t.current && r(Oe(De(e), t.current.getBoundingClientRect()))
                    }, !1), i.addEventListener(n, `pointercancel`, a, !1)
                }
            }
        });
    return {
        pressed: n,
        pressProps: e ? {} : {
            onPointerDown: o,
            onPointerUp: a,
            onClick: a
        }
    }
}
var Ae = (0, m.createContext)(void 0);

function je() {
    return (0, m.useContext)(Ae)
}

function Me({
    id: e,
    children: t
}) {
    return m.createElement(Ae.Provider, {
        value: e
    }, t)
}

function Ne(e) {
    let t = e.parentElement,
        r = null;
    for (; t && !n(t);) a(t) && (r = t), t = t.parentElement;
    let i = t ?.getAttribute(`disabled`) === ``;
    return i && Pe(r) ? !1 : i
}

function Pe(e) {
    if (!e) return !1;
    let t = e.previousElementSibling;
    for (; t !== null;) {
        if (a(t)) return !1;
        t = t.previousElementSibling
    }
    return !0
}
var Z = (0, m.createContext)(null);
Z.displayName = `LabelContext`;

function Q() {
    let e = (0, m.useContext)(Z);
    if (e === null) {
        let e = Error(`You used a <Label /> component, but it is not inside a relevant parent.`);
        throw Error.captureStackTrace && Error.captureStackTrace(e, Q), e
    }
    return e
}

function $(e) {
    let t = (0, m.useContext)(Z) ?.value ?? void 0;
    return (e ?.length ?? 0) > 0 ? [t, ...e].filter(Boolean).join(` `) : t
}

function Fe({
    inherit: e = !1
} = {}) {
    let t = $(),
        [n, r] = (0, m.useState)([]),
        i = e ? [t, ...n].filter(Boolean) : n;
    return [i.length > 0 ? i.join(` `) : void 0, (0, m.useMemo)(() => function(e) {
        let t = p(e => (r(t => [...t, e]), () => r(t => {
                let n = t.slice(),
                    r = n.indexOf(e);
                return r !== -1 && n.splice(r, 1), n
            }))),
            n = (0, m.useMemo)(() => ({
                register: t,
                slot: e.slot,
                name: e.name,
                props: e.props,
                value: e.value
            }), [t, e.slot, e.name, e.props, e.value]);
        return m.createElement(Z.Provider, {
            value: n
        }, e.children)
    }, [r])]
}
var Ie = `label`;

function Le(e, t) {
    let n = (0, l.useId)(),
        a = Q(),
        s = je(),
        c = ne(),
        {
            id: d = `headlessui-label-${n}`,
            htmlFor: m = s ?? a.props ?.htmlFor,
            passive: h = !1,
            ...g
        } = e,
        _ = r(t);
    f(() => a.register(d), [d, a.register]);
    let v = p(e => {
            let t = e.currentTarget;
            if (!(e.target !== e.currentTarget && o(e.target)) && (i(t) && e.preventDefault(), a.props && `onClick` in a.props && typeof a.props.onClick == `function` && a.props.onClick(e), i(t))) {
                let e = document.getElementById(t.htmlFor);
                if (e) {
                    let t = e.getAttribute(`disabled`);
                    if (t === `true` || t === ``) return;
                    let n = e.getAttribute(`aria-disabled`);
                    if (n === `true` || n === ``) return;
                    (ee(e) && (e.type === `file` || e.type === `radio` || e.type === `checkbox`) || e.role === `radio` || e.role === `checkbox` || e.role === `switch`) && e.click(), e.focus({
                        preventScroll: !0
                    })
                }
            }
        }),
        re = u({ ...a.slot,
            disabled: c || !1
        }),
        y = {
            ref: _,
            ...a.props,
            id: d,
            htmlFor: m,
            onClick: v
        };
    return h && (`onClick` in y && (delete y.htmlFor, delete y.onClick), `onClick` in g && delete g.onClick), te()({
        ourProps: y,
        theirProps: g,
        slot: re,
        defaultTag: m ? Ie : `div`,
        name: a.name || `Label`
    })
}
var Re = s(Le),
    ze = Object.assign(Re, {});

function Be(e, t) {
    return (0, m.useMemo)(() => {
        if (e.type) return e.type;
        let n = e.as ?? `button`;
        if (typeof n == `string` && n.toLowerCase() === `button` || t ?.tagName === `BUTTON` && !t.hasAttribute(`type`)) return `button`
    }, [e.type, e.as, t])
}
export {
    ze as a, je as c, Te as d, Fe as i, ke as l, Q as n, Ne as o, $ as r, Me as s, Be as t, Ee as u
};
//# sourceMappingURL=use-resolve-button-type-BJQyyNxN.js.map