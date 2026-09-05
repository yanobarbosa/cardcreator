import {
    n as e,
    t
} from "./chunk-B3K2TuZy.js";
import {
    o as n
} from "./compiler-runtime-4XzsAixn.js";
var r = t((e => {
        var t = n();

        function r(e) {
            var t = `https://react.dev/errors/` + e;
            if (1 < arguments.length) {
                t += `?args[]=` + encodeURIComponent(arguments[1]);
                for (var n = 2; n < arguments.length; n++) t += `&args[]=` + encodeURIComponent(arguments[n])
            }
            return `Minified React error #` + e + `; visit ` + t + ` for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`
        }

        function i() {}
        var a = {
                d: {
                    f: i,
                    r: function() {
                        throw Error(r(522))
                    },
                    D: i,
                    C: i,
                    L: i,
                    m: i,
                    X: i,
                    S: i,
                    M: i
                },
                p: 0,
                findDOMNode: null
            },
            o = Symbol.for(`react.portal`);

        function s(e, t, n) {
            var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
            return {
                $$typeof: o,
                key: r == null ? null : `` + r,
                children: e,
                containerInfo: t,
                implementation: n
            }
        }
        var c = t.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;

        function l(e, t) {
            if (e === `font`) return ``;
            if (typeof t == `string`) return t === `use-credentials` ? t : ``
        }
        e.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = a, e.createPortal = function(e, t) {
            var n = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
            if (!t || t.nodeType !== 1 && t.nodeType !== 9 && t.nodeType !== 11) throw Error(r(299));
            return s(e, t, null, n)
        }, e.flushSync = function(e) {
            var t = c.T,
                n = a.p;
            try {
                if (c.T = null, a.p = 2, e) return e()
            } finally {
                c.T = t, a.p = n, a.d.f()
            }
        }, e.preconnect = function(e, t) {
            typeof e == `string` && (t ? (t = t.crossOrigin, t = typeof t == `string` ? t === `use-credentials` ? t : `` : void 0) : t = null, a.d.C(e, t))
        }, e.prefetchDNS = function(e) {
            typeof e == `string` && a.d.D(e)
        }, e.preinit = function(e, t) {
            if (typeof e == `string` && t && typeof t.as == `string`) {
                var n = t.as,
                    r = l(n, t.crossOrigin),
                    i = typeof t.integrity == `string` ? t.integrity : void 0,
                    o = typeof t.fetchPriority == `string` ? t.fetchPriority : void 0;
                n === `style` ? a.d.S(e, typeof t.precedence == `string` ? t.precedence : void 0, {
                    crossOrigin: r,
                    integrity: i,
                    fetchPriority: o
                }) : n === `script` && a.d.X(e, {
                    crossOrigin: r,
                    integrity: i,
                    fetchPriority: o,
                    nonce: typeof t.nonce == `string` ? t.nonce : void 0
                })
            }
        }, e.preinitModule = function(e, t) {
            if (typeof e == `string`)
                if (typeof t == `object` && t) {
                    if (t.as == null || t.as === `script`) {
                        var n = l(t.as, t.crossOrigin);
                        a.d.M(e, {
                            crossOrigin: n,
                            integrity: typeof t.integrity == `string` ? t.integrity : void 0,
                            nonce: typeof t.nonce == `string` ? t.nonce : void 0
                        })
                    }
                } else t ?? a.d.M(e)
        }, e.preload = function(e, t) {
            if (typeof e == `string` && typeof t == `object` && t && typeof t.as == `string`) {
                var n = t.as,
                    r = l(n, t.crossOrigin);
                a.d.L(e, n, {
                    crossOrigin: r,
                    integrity: typeof t.integrity == `string` ? t.integrity : void 0,
                    nonce: typeof t.nonce == `string` ? t.nonce : void 0,
                    type: typeof t.type == `string` ? t.type : void 0,
                    fetchPriority: typeof t.fetchPriority == `string` ? t.fetchPriority : void 0,
                    referrerPolicy: typeof t.referrerPolicy == `string` ? t.referrerPolicy : void 0,
                    imageSrcSet: typeof t.imageSrcSet == `string` ? t.imageSrcSet : void 0,
                    imageSizes: typeof t.imageSizes == `string` ? t.imageSizes : void 0,
                    media: typeof t.media == `string` ? t.media : void 0
                })
            }
        }, e.preloadModule = function(e, t) {
            if (typeof e == `string`)
                if (t) {
                    var n = l(t.as, t.crossOrigin);
                    a.d.m(e, {
                        as: typeof t.as == `string` && t.as !== `script` ? t.as : void 0,
                        crossOrigin: n,
                        integrity: typeof t.integrity == `string` ? t.integrity : void 0
                    })
                } else a.d.m(e)
        }, e.requestFormReset = function(e) {
            a.d.r(e)
        }, e.unstable_batchedUpdates = function(e, t) {
            return e(t)
        }, e.useFormState = function(e, t, n) {
            return c.H.useFormState(e, t, n)
        }, e.useFormStatus = function() {
            return c.H.useHostTransitionStatus()
        }, e.version = `19.2.8`
    })),
    i = t(((e, t) => {
        function n() {
            if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > `u` || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != `function`)) try {
                __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n)
            } catch (e) {
                console.error(e)
            }
        }
        n(), t.exports = r()
    })),
    a = Object.defineProperty,
    o = (e, t, n) => t in e ? a(e, t, {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: n
    }) : e[t] = n,
    s = (e, t, n) => (o(e, typeof t == `symbol` ? t : t + ``, n), n),
    c = new class {
        constructor() {
            s(this, `current`, this.detect()), s(this, `handoffState`, `pending`), s(this, `currentId`, 0)
        }
        set(e) {
            this.current !== e && (this.handoffState = `pending`, this.currentId = 0, this.current = e)
        }
        reset() {
            this.set(this.detect())
        }
        nextId() {
            return ++this.currentId
        }
        get isServer() {
            return this.current === `server`
        }
        get isClient() {
            return this.current === `client`
        }
        detect() {
            return typeof window > `u` || typeof document > `u` ? `server` : `client`
        }
        handoff() {
            this.handoffState === `pending` && (this.handoffState = `complete`)
        }
        get isHandoffComplete() {
            return this.handoffState === `complete`
        }
    };

function l(e) {
    return c.isServer ? null : e == null ? document : e ?.ownerDocument ?? document
}

function u(e) {
    return c.isServer ? null : e == null ? document : (e ?.getRootNode) ?.call(e) ?? document
}

function d(e) {
    return u(e) ?.activeElement ?? null
}

function f(e) {
    return d(e) === e
}

function p(e) {
    typeof queueMicrotask == `function` ? queueMicrotask(e) : Promise.resolve().then(e).catch(e => setTimeout(() => {
        throw e
    }))
}

function m() {
    let e = [],
        t = {
            addEventListener(e, n, r, i) {
                return e.addEventListener(n, r, i), t.add(() => e.removeEventListener(n, r, i))
            },
            requestAnimationFrame(...e) {
                let n = requestAnimationFrame(...e);
                return t.add(() => cancelAnimationFrame(n))
            },
            nextFrame(...e) {
                return t.requestAnimationFrame(() => t.requestAnimationFrame(...e))
            },
            setTimeout(...e) {
                let n = setTimeout(...e);
                return t.add(() => clearTimeout(n))
            },
            microTask(...e) {
                let n = {
                    current: !0
                };
                return p(() => {
                    n.current && e[0]()
                }), t.add(() => {
                    n.current = !1
                })
            },
            style(e, t, n) {
                let r = e.style.getPropertyValue(t);
                return Object.assign(e.style, {
                    [t]: n
                }), this.add(() => {
                    Object.assign(e.style, {
                        [t]: r
                    })
                })
            },
            group(e) {
                let t = m();
                return e(t), this.add(() => t.dispose())
            },
            add(t) {
                return e.includes(t) || e.push(t), () => {
                    let n = e.indexOf(t);
                    if (n >= 0)
                        for (let t of e.splice(n, 1)) t()
                }
            },
            dispose() {
                for (let t of e.splice(0)) t()
            }
        };
    return t
}
var h = e(n(), 1);

function g() {
    let [e] = (0, h.useState)(m);
    return (0, h.useEffect)(() => () => e.dispose(), [e]), e
}
var _ = (e, t) => {
    c.isServer ? (0, h.useEffect)(e, t) : (0, h.useLayoutEffect)(e, t)
};

function v(e) {
    let t = (0, h.useRef)(e);
    return _(() => {
        t.current = e
    }, [e]), t
}
var y = function(e) {
    let t = v(e);
    return h.useCallback((...e) => t.current(...e), [t])
};

function ee(e) {
    return (0, h.useMemo)(() => e, Object.values(e))
}
var te = (0, h.createContext)(void 0);

function ne() {
    return (0, h.useContext)(te)
}

function re({
    value: e,
    children: t
}) {
    return h.createElement(te.Provider, {
        value: e
    }, t)
}

function b(...e) {
    return Array.from(new Set(e.flatMap(e => typeof e == `string` ? e.split(` `) : []))).filter(Boolean).join(` `)
}

function x(e, t, ...n) {
    if (e in t) {
        let r = t[e];
        return typeof r == `function` ? r(...n) : r
    }
    let r = Error(`Tried to handle "${e}" but there is no handler defined. Only defined handlers are: ${Object.keys(t).map(e=>`"${e}"`).join(`, `)}.`);
    throw Error.captureStackTrace && Error.captureStackTrace(r, x), r
}
var S = (e => (e[e.None = 0] = `None`, e[e.RenderStrategy = 1] = `RenderStrategy`, e[e.Static = 2] = `Static`, e))(S || {}),
    ie = (e => (e[e.Unmount = 0] = `Unmount`, e[e.Hidden = 1] = `Hidden`, e))(ie || {});

function C() {
    let e = oe();
    return (0, h.useCallback)(t => ae({
        mergeRefs: e,
        ...t
    }), [e])
}

function ae({
    ourProps: e,
    theirProps: t,
    slot: n,
    defaultTag: r,
    features: i,
    visible: a = !0,
    name: o,
    mergeRefs: s
}) {
    s ??= se;
    let c = T(t, e);
    if (a) return w(c, n, r, o, s);
    let l = i ?? 0;
    if (l & 2) {
        let {
            static: e = !1,
            ...t
        } = c;
        if (e) return w(t, n, r, o, s)
    }
    if (l & 1) {
        let {
            unmount: e = !0,
            ...t
        } = c;
        return x(e ? 0 : 1, {
            0() {
                return null
            },
            1() {
                return w({ ...t,
                    hidden: !0,
                    style: {
                        display: `none`
                    }
                }, n, r, o, s)
            }
        })
    }
    return w(c, n, r, o, s)
}

function w(e, t = {}, n, r, i) {
    let {
        as: a = n,
        children: o,
        refName: s = `ref`,
        ...c
    } = O(e, [`unmount`, `static`]), l = e.ref === void 0 ? {} : {
        [s]: e.ref
    }, u = typeof o == `function` ? o(t) : o;
    u = ue(u), `className` in c && c.className && typeof c.className == `function` && (c.className = c.className(t)), c[`aria-labelledby`] && c[`aria-labelledby`] === c.id && (c[`aria-labelledby`] = void 0);
    let d = {};
    if (t) {
        let e = !1,
            n = [];
        for (let [r, i] of Object.entries(t)) typeof i == `boolean` && (e = !0), i === !0 && n.push(r.replace(/([A-Z])/g, e => `-${e.toLowerCase()}`));
        if (e) {
            d[`data-headlessui-state`] = n.join(` `);
            for (let e of n) d[`data-${e}`] = ``
        }
    }
    if (k(a) && (Object.keys(D(c)).length > 0 || Object.keys(D(d)).length > 0))
        if (!(0, h.isValidElement)(u) || Array.isArray(u) && u.length > 1 || de(u)) {
            if (Object.keys(D(c)).length > 0) throw Error([`Passing props on "Fragment"!`, ``, `The current component <${r} /> is rendering a "Fragment".`, `However we need to passthrough the following props:`, Object.keys(D(c)).concat(Object.keys(D(d))).map(e => `  - ${e}`).join(`
`), ``, `You can apply a few solutions:`, ['Add an `as="..."` prop, to ensure that we render an actual element instead of a "Fragment".', `Render a single element as the child so that we can forward the props onto that element.`].map(e => `  - ${e}`).join(`
`)].join(`
`))
        } else {
            let e = u.props ?.className,
                t = typeof e == `function` ? (...t) => b(e(...t), c.className) : b(e, c.className),
                n = t ? {
                    className: t
                } : {},
                r = T(u.props, D(O(c, [`ref`])));
            for (let e in d) e in r && delete d[e];
            return (0, h.cloneElement)(u, Object.assign({}, r, d, l, {
                ref: i(le(u), l.ref)
            }, n))
        }
    return (0, h.createElement)(a, Object.assign({}, O(c, [`ref`]), !k(a) && l, !k(a) && d), u)
}

function oe() {
    let e = (0, h.useRef)([]),
        t = (0, h.useCallback)(t => {
            for (let n of e.current) n != null && (typeof n == `function` ? n(t) : n.current = t)
        }, []);
    return (...n) => {
        if (!n.every(e => e == null)) return e.current = n, t
    }
}

function se(...e) {
    return e.every(e => e == null) ? void 0 : t => {
        for (let n of e) n != null && (typeof n == `function` ? n(t) : n.current = t)
    }
}

function T(...e) {
    if (e.length === 0) return {};
    if (e.length === 1) return e[0];
    let t = {},
        n = {};
    for (let r of e)
        for (let e in r) e.startsWith(`on`) && typeof r[e] == `function` ? (n[e] ?? (n[e] = []), n[e].push(r[e])) : t[e] = r[e];
    if (t.disabled || t[`aria-disabled`])
        for (let e in n) /^(on(?:Click|Pointer|Mouse|Key)(?:Down|Up|Press)?)$/.test(e) && (n[e] = [e => (e ?.preventDefault) ?.call(e)]);
    for (let e in n) Object.assign(t, {
        [e](t, ...r) {
            let i = n[e];
            for (let e of i) {
                if ((t instanceof Event || t ?.nativeEvent instanceof Event) && t.defaultPrevented) return;
                e(t, ...r)
            }
        }
    });
    return t
}

function ce(...e) {
    if (e.length === 0) return {};
    if (e.length === 1) return e[0];
    let t = {},
        n = {};
    for (let r of e)
        for (let e in r) e.startsWith(`on`) && typeof r[e] == `function` ? (n[e] ?? (n[e] = []), n[e].push(r[e])) : t[e] = r[e];
    for (let e in n) Object.assign(t, {
        [e](...t) {
            let r = n[e];
            for (let e of r) e ?.(...t)
        }
    });
    return t
}

function E(e) {
    return Object.assign((0, h.forwardRef)(e), {
        displayName: e.displayName ?? e.name
    })
}

function D(e) {
    let t = Object.assign({}, e);
    for (let e in t) t[e] === void 0 && delete t[e];
    return t
}

function O(e, t = []) {
    let n = Object.assign({}, e);
    for (let e of t) e in n && delete n[e];
    return n
}

function le(e) {
    return `19.2.8`.split(`.`)[0] >= `19` ? e.props.ref : e.ref
}

function ue(e) {
    if (e != null && e.$$typeof === Symbol.for(`react.lazy`)) {
        let t = e._payload;
        if (t != null && t.status === `fulfilled`) return ue(t.value)
    }
    return e
}

function k(e) {
    return e === h.Fragment || e === Symbol.for(`react.fragment`)
}

function de(e) {
    return k(e.type)
}
var fe = `span`,
    pe = (e => (e[e.None = 1] = `None`, e[e.Focusable = 2] = `Focusable`, e[e.Hidden = 4] = `Hidden`, e))(pe || {});

function me(e, t) {
    let {
        features: n = 1,
        ...r
    } = e, i = {
        ref: t,
        "aria-hidden": (n & 2) == 2 ? !0 : r[`aria-hidden`] ?? void 0,
        hidden: (n & 4) == 4 ? !0 : void 0,
        style: {
            position: `fixed`,
            top: 1,
            left: 1,
            width: 1,
            height: 0,
            padding: 0,
            margin: -1,
            overflow: `hidden`,
            clip: `rect(0, 0, 0, 0)`,
            whiteSpace: `nowrap`,
            borderWidth: `0`,
            ...(n & 4) == 4 && (n & 2) != 2 && {
                display: `none`
            }
        }
    };
    return C()({
        ourProps: i,
        theirProps: r,
        slot: {},
        defaultTag: fe,
        name: `Hidden`
    })
}
var he = E(me);

function ge(e) {
    return typeof e != `object` || !e ? !1 : `nodeType` in e
}

function A(e) {
    return ge(e) && `tagName` in e
}

function j(e) {
    return A(e) && `accessKey` in e
}

function M(e) {
    return A(e) && `tabIndex` in e
}

function _e(e) {
    return A(e) && `style` in e
}

function ve(e) {
    return j(e) && e.nodeName === `IFRAME`
}

function ye(e) {
    return j(e) && e.nodeName === `INPUT`
}

function be(e) {
    return j(e) && e.nodeName === `LABEL`
}

function xe(e) {
    return j(e) && e.nodeName === `FIELDSET`
}

function Se(e) {
    return j(e) && e.nodeName === `LEGEND`
}

function Ce(e) {
    return A(e) ? e.matches(`a[href],audio[controls],button,details,embed,iframe,img[usemap],input:not([type="hidden"]),label,select,textarea,video[controls]`) : !1
}
var we = Symbol();

function Te(e, t = !0) {
    return Object.assign(e, {
        [we]: t
    })
}

function N(...e) {
    let t = (0, h.useRef)(e);
    (0, h.useEffect)(() => {
        t.current = e
    }, [e]);
    let n = y(e => {
        for (let n of t.current) n != null && (typeof n == `function` ? n(e) : n.current = e)
    });
    return e.every(e => e == null || e ?.[we]) ? void 0 : n
}
var P = (0, h.createContext)(null);
P.displayName = `DescriptionContext`;

function Ee() {
    let e = (0, h.useContext)(P);
    if (e === null) {
        let e = Error(`You used a <Description /> component, but it is not inside a relevant parent.`);
        throw Error.captureStackTrace && Error.captureStackTrace(e, Ee), e
    }
    return e
}

function De() {
    return (0, h.useContext)(P) ?.value ?? void 0
}

function Oe() {
    let [e, t] = (0, h.useState)([]);
    return [e.length > 0 ? e.join(` `) : void 0, (0, h.useMemo)(() => function(e) {
        let n = y(e => (t(t => [...t, e]), () => t(t => {
                let n = t.slice(),
                    r = n.indexOf(e);
                return r !== -1 && n.splice(r, 1), n
            }))),
            r = (0, h.useMemo)(() => ({
                register: n,
                slot: e.slot,
                name: e.name,
                props: e.props,
                value: e.value
            }), [n, e.slot, e.name, e.props, e.value]);
        return h.createElement(P.Provider, {
            value: r
        }, e.children)
    }, [t])]
}
var ke = `p`;

function Ae(e, t) {
    let n = (0, h.useId)(),
        r = ne(),
        {
            id: i = `headlessui-description-${n}`,
            ...a
        } = e,
        o = Ee(),
        s = N(t);
    _(() => o.register(i), [i, o.register]);
    let c = ee({ ...o.slot,
            disabled: r || !1
        }),
        l = {
            ref: s,
            ...o.props,
            id: i
        };
    return C()({
        ourProps: l,
        theirProps: a,
        slot: c,
        defaultTag: ke,
        name: o.name || `Description`
    })
}
var je = E(Ae),
    Me = Object.assign(je, {}),
    Ne = (e => (e.Space = ` `, e.Enter = `Enter`, e.Escape = `Escape`, e.Backspace = `Backspace`, e.Delete = `Delete`, e.ArrowLeft = `ArrowLeft`, e.ArrowUp = `ArrowUp`, e.ArrowRight = `ArrowRight`, e.ArrowDown = `ArrowDown`, e.Home = `Home`, e.End = `End`, e.PageUp = `PageUp`, e.PageDown = `PageDown`, e.Tab = `Tab`, e))(Ne || {}),
    Pe = class extends Map {
        constructor(e) {
            super(), this.factory = e
        }
        get(e) {
            let t = super.get(e);
            return t === void 0 && (t = this.factory(e), this.set(e, t)), t
        }
    },
    Fe = Object.defineProperty,
    Ie = (e, t, n) => t in e ? Fe(e, t, {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: n
    }) : e[t] = n,
    Le = (e, t, n) => (Ie(e, typeof t == `symbol` ? t : t + ``, n), n),
    Re = (e, t, n) => {
        if (!t.has(e)) throw TypeError(`Cannot ` + n)
    },
    F = (e, t, n) => (Re(e, t, `read from private field`), n ? n.call(e) : t.get(e)),
    I = (e, t, n) => {
        if (t.has(e)) throw TypeError(`Cannot add the same private member more than once`);
        t instanceof WeakSet ? t.add(e) : t.set(e, n)
    },
    ze = (e, t, n, r) => (Re(e, t, `write to private field`), r ? r.call(e, n) : t.set(e, n), n),
    L, R, z, B = class {
        constructor(e) {
            I(this, L, {}), I(this, R, new Pe(() => new Set)), I(this, z, new Set), Le(this, `disposables`, m()), ze(this, L, e), c.isServer && this.disposables.microTask(() => {
                this.dispose()
            })
        }
        dispose() {
            this.disposables.dispose()
        }
        get state() {
            return F(this, L)
        }
        subscribe(e, t) {
            if (c.isServer) return () => {};
            let n = {
                selector: e,
                callback: t,
                current: e(F(this, L))
            };
            return F(this, z).add(n), this.disposables.add(() => {
                F(this, z).delete(n)
            })
        }
        on(e, t) {
            return c.isServer ? () => {} : (F(this, R).get(e).add(t), this.disposables.add(() => {
                F(this, R).get(e).delete(t)
            }))
        }
        send(e) {
            let t = this.reduce(F(this, L), e);
            if (t !== F(this, L)) {
                ze(this, L, t);
                for (let e of F(this, z)) {
                    let t = e.selector(F(this, L));
                    Be(e.current, t) || (e.current = t, e.callback(t))
                }
                for (let t of F(this, R).get(e.type)) t(F(this, L), e)
            }
        }
    };
L = new WeakMap, R = new WeakMap, z = new WeakMap;

function Be(e, t) {
    return Object.is(e, t) ? !0 : typeof e != `object` || !e || typeof t != `object` || !t ? !1 : Array.isArray(e) && Array.isArray(t) ? e.length === t.length ? V(e[Symbol.iterator](), t[Symbol.iterator]()) : !1 : e instanceof Map && t instanceof Map || e instanceof Set && t instanceof Set ? e.size === t.size ? V(e.entries(), t.entries()) : !1 : Ve(e) && Ve(t) ? V(Object.entries(e)[Symbol.iterator](), Object.entries(t)[Symbol.iterator]()) : !1
}

function V(e, t) {
    do {
        let n = e.next(),
            r = t.next();
        if (n.done && r.done) return !0;
        if (n.done || r.done || !Object.is(n.value, r.value)) return !1
    } while (!0)
}

function Ve(e) {
    if (Object.prototype.toString.call(e) !== `[object Object]`) return !1;
    let t = Object.getPrototypeOf(e);
    return t === null || Object.getPrototypeOf(t) === null
}

function He(e) {
    let [t, n] = e(), r = m();
    return (...e) => {
        t(...e), r.dispose(), r.microTask(n)
    }
}
var Ue = Object.defineProperty,
    We = (e, t, n) => t in e ? Ue(e, t, {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: n
    }) : e[t] = n,
    Ge = (e, t, n) => (We(e, typeof t == `symbol` ? t : t + ``, n), n),
    Ke = (e => (e[e.Push = 0] = `Push`, e[e.Pop = 1] = `Pop`, e))(Ke || {}),
    qe = {
        0(e, t) {
            let n = t.id,
                r = e.stack,
                i = e.stack.indexOf(n);
            if (i !== -1) {
                let t = e.stack.slice();
                return t.splice(i, 1), t.push(n), r = t, { ...e,
                    stack: r
                }
            }
            return { ...e,
                stack: [...e.stack, n]
            }
        },
        1(e, t) {
            let n = t.id,
                r = e.stack.indexOf(n);
            if (r === -1) return e;
            let i = e.stack.slice();
            return i.splice(r, 1), { ...e,
                stack: i
            }
        }
    },
    Je = class e extends B {
        constructor() {
            super(...arguments), Ge(this, `actions`, {
                push: e => this.send({
                    type: 0,
                    id: e
                }),
                pop: e => this.send({
                    type: 1,
                    id: e
                })
            }), Ge(this, `selectors`, {
                isTop: (e, t) => e.stack[e.stack.length - 1] === t,
                inStack: (e, t) => e.stack.includes(t)
            })
        }
        static new() {
            return new e({
                stack: []
            })
        }
        reduce(e, t) {
            return x(t.type, qe, e, t)
        }
    },
    Ye = new Pe(() => Je.new()),
    Xe = t((e => {
        var t = n();

        function r(e, t) {
            return e === t && (e !== 0 || 1 / e == 1 / t) || e !== e && t !== t
        }
        var i = typeof Object.is == `function` ? Object.is : r,
            a = t.useSyncExternalStore,
            o = t.useRef,
            s = t.useEffect,
            c = t.useMemo,
            l = t.useDebugValue;
        e.useSyncExternalStoreWithSelector = function(e, t, n, r, u) {
            var d = o(null);
            if (d.current === null) {
                var f = {
                    hasValue: !1,
                    value: null
                };
                d.current = f
            } else f = d.current;
            d = c(function() {
                function e(e) {
                    if (!a) {
                        if (a = !0, o = e, e = r(e), u !== void 0 && f.hasValue) {
                            var t = f.value;
                            if (u(t, e)) return s = t
                        }
                        return s = e
                    }
                    if (t = s, i(o, e)) return t;
                    var n = r(e);
                    return u !== void 0 && u(t, n) ? (o = e, t) : (o = e, s = n)
                }
                var a = !1,
                    o, s, c = n === void 0 ? null : n;
                return [function() {
                    return e(t())
                }, c === null ? void 0 : function() {
                    return e(c())
                }]
            }, [t, n, r, u]);
            var p = a(e, d[0], d[1]);
            return s(function() {
                f.hasValue = !0, f.value = p
            }, [p]), l(p), p
        }
    })),
    Ze = t(((e, t) => {
        t.exports = Xe()
    }))();

function Qe(e, t, n = Be) {
    return (0, Ze.useSyncExternalStoreWithSelector)(y(t => e.subscribe($e, t)), y(() => e.state), y(() => e.state), y(t), n)
}

function $e(e) {
    return e
}

function H(e, t) {
    let n = (0, h.useId)(),
        r = Ye.get(t),
        [i, a] = Qe(r, (0, h.useCallback)(e => [r.selectors.isTop(e, n), r.selectors.inStack(e, n)], [r, n]));
    return _(() => {
        if (e) return r.actions.push(n), () => r.actions.pop(n)
    }, [r, e, n]), e ? a ? i : !0 : !1
}
var U = new Map,
    W = new Map;

function et(e) {
    let t = W.get(e) ?? 0;
    return W.set(e, t + 1), t === 0 ? (U.set(e, {
        "aria-hidden": e.getAttribute(`aria-hidden`),
        inert: e.inert
    }), e.setAttribute(`aria-hidden`, `true`), e.inert = !0, () => tt(e)) : () => tt(e)
}

function tt(e) {
    let t = W.get(e) ?? 1;
    if (t === 1 ? W.delete(e) : W.set(e, t - 1), t !== 1) return;
    let n = U.get(e);
    n && (n[`aria-hidden`] === null ? e.removeAttribute(`aria-hidden`) : e.setAttribute(`aria-hidden`, n[`aria-hidden`]), e.inert = n.inert, U.delete(e))
}

function nt(e, {
    allowed: t,
    disallowed: n
} = {}) {
    let r = H(e, `inert-others`);
    _(() => {
        if (!r) return;
        let e = m();
        for (let t of n ?.() ?? []) t && e.add(et(t));
        let i = t ?.() ?? [];
        for (let t of i) {
            if (!t) continue;
            let n = l(t);
            if (!n) continue;
            let r = t.parentElement;
            for (; r && r !== n.body;) {
                for (let t of r.children) i.some(e => t.contains(e)) || e.add(et(t));
                r = r.parentElement
            }
        }
        return e.dispose
    }, [r, t, n])
}

function rt(e, t, n) {
    let r = v(e => {
        let t = e.getBoundingClientRect();
        t.x === 0 && t.y === 0 && t.width === 0 && t.height === 0 && n()
    });
    (0, h.useEffect)(() => {
        if (!e) return;
        let n = t === null ? null : j(t) ? t : t.current;
        if (!n) return;
        let i = m();
        if (typeof ResizeObserver < `u`) {
            let e = new ResizeObserver(() => r.current(n));
            e.observe(n), i.add(() => e.disconnect())
        }
        if (typeof IntersectionObserver < `u`) {
            let e = new IntersectionObserver(() => r.current(n));
            e.observe(n), i.add(() => e.disconnect())
        }
        return () => i.dispose()
    }, [t, r, e])
}
var G = [`[contentEditable=true]`, `[tabindex]`, `a[href]`, `area[href]`, `button:not([disabled])`, `iframe`, `input:not([disabled])`, `select:not([disabled])`, `details>summary`, `textarea:not([disabled])`].map(e => `${e}:not([tabindex='-1'])`).join(`,`),
    it = [`[data-autofocus]`].map(e => `${e}:not([tabindex='-1'])`).join(`,`),
    at = (e => (e[e.First = 1] = `First`, e[e.Previous = 2] = `Previous`, e[e.Next = 4] = `Next`, e[e.Last = 8] = `Last`, e[e.WrapAround = 16] = `WrapAround`, e[e.NoScroll = 32] = `NoScroll`, e[e.AutoFocus = 64] = `AutoFocus`, e))(at || {}),
    ot = (e => (e[e.Error = 0] = `Error`, e[e.Overflow = 1] = `Overflow`, e[e.Success = 2] = `Success`, e[e.Underflow = 3] = `Underflow`, e))(ot || {}),
    st = (e => (e[e.Previous = -1] = `Previous`, e[e.Next = 1] = `Next`, e))(st || {});

function ct(e = document.body) {
    return e == null ? [] : Array.from(e.querySelectorAll(G)).sort((e, t) => Math.sign((e.tabIndex || 2 ** 53 - 1) - (t.tabIndex || 2 ** 53 - 1)))
}

function lt(e = document.body) {
    return e == null ? [] : Array.from(e.querySelectorAll(it)).sort((e, t) => Math.sign((e.tabIndex || 2 ** 53 - 1) - (t.tabIndex || 2 ** 53 - 1)))
}
var K = (e => (e[e.Strict = 0] = `Strict`, e[e.Loose = 1] = `Loose`, e))(K || {});

function q(e, t = 0) {
    return e === l(e) ?.body ? !1 : x(t, {
        0() {
            return e.matches(G)
        },
        1() {
            let t = e;
            for (; t !== null;) {
                if (t.matches(G)) return !0;
                t = t.parentElement
            }
            return !1
        }
    })
}

function ut(e) {
    m().nextFrame(() => {
        let t = d(e);
        t && M(t) && !q(t, 0) && ft(e)
    })
}
var dt = (e => (e[e.Keyboard = 0] = `Keyboard`, e[e.Mouse = 1] = `Mouse`, e))(dt || {});
typeof window < `u` && typeof document < `u` && (document.addEventListener(`keydown`, e => {
    e.metaKey || e.altKey || e.ctrlKey || (document.documentElement.dataset.headlessuiFocusVisible = ``)
}, !0), document.addEventListener(`click`, e => {
    e.detail === 1 ? delete document.documentElement.dataset.headlessuiFocusVisible : e.detail === 0 && (document.documentElement.dataset.headlessuiFocusVisible = ``)
}, !0));

function ft(e) {
    e ?.focus({
        preventScroll: !0
    })
}
var pt = [`textarea`, `input`].join(`,`);

function mt(e) {
    return (e ?.matches) ?.call(e, pt) ?? !1
}

function ht(e, t = e => e) {
    return e.slice().sort((e, n) => {
        let r = t(e),
            i = t(n);
        if (r === null || i === null) return 0;
        let a = r.compareDocumentPosition(i);
        return a & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : a & Node.DOCUMENT_POSITION_PRECEDING ? 1 : 0
    })
}

function gt(e, t, n = e === null ? document.body : u(e)) {
    return _t(ct(n), t, {
        relativeTo: e
    })
}

function _t(e, t, {
    sorted: n = !0,
    relativeTo: r = null,
    skipElements: i = []
} = {}) {
    let a = Array.isArray(e) ? e.length > 0 ? u(e[0]) : document : u(e),
        o = Array.isArray(e) ? n ? ht(e) : e : t & 64 ? lt(e) : ct(e);
    i.length > 0 && o.length > 1 && (o = o.filter(e => !i.some(t => t != null && `current` in t ? t ?.current === e : t === e))), r ??= a ?.activeElement;
    let s = (() => {
            if (t & 5) return 1;
            if (t & 10) return -1;
            throw Error(`Missing Focus.First, Focus.Previous, Focus.Next or Focus.Last`)
        })(),
        c = (() => {
            if (t & 1) return 0;
            if (t & 2) return Math.max(0, o.indexOf(r)) - 1;
            if (t & 4) return Math.max(0, o.indexOf(r)) + 1;
            if (t & 8) return o.length - 1;
            throw Error(`Missing Focus.First, Focus.Previous, Focus.Next or Focus.Last`)
        })(),
        l = t & 32 ? {
            preventScroll: !0
        } : {},
        f = 0,
        p = o.length,
        m;
    do {
        if (f >= p || f + p <= 0) return 0;
        let e = c + f;
        if (t & 16) e = (e + p) % p;
        else {
            if (e < 0) return 3;
            if (e >= p) return 1
        }
        m = o[e], m ?.focus(l), f += s
    } while (m !== d(m));
    return t & 6 && mt(m) && m.select(), 2
}

function vt() {
    return /iPhone/gi.test(window.navigator.platform) || /Mac/gi.test(window.navigator.platform) && window.navigator.maxTouchPoints > 0
}

function yt() {
    return /Android/gi.test(window.navigator.userAgent)
}

function J() {
    return vt() || yt()
}

function Y(e, t, n, r) {
    let i = v(n);
    (0, h.useEffect)(() => {
        if (!e) return;

        function n(e) {
            i.current(e)
        }
        return document.addEventListener(t, n, r), () => document.removeEventListener(t, n, r)
    }, [e, t, r])
}

function bt(e, t, n, r) {
    let i = v(n);
    (0, h.useEffect)(() => {
        if (!e) return;

        function n(e) {
            i.current(e)
        }
        return window.addEventListener(t, n, r), () => window.removeEventListener(t, n, r)
    }, [e, t, r])
}
var xt = 30;

function St(e, t, n) {
    let r = v(n),
        i = (0, h.useCallback)(function(e, n) {
            if (e.defaultPrevented) return;
            let i = n(e);
            if (i === null || !i.getRootNode().contains(i) || !i.isConnected) return;
            let a = function e(t) {
                return typeof t == `function` ? e(t()) : Array.isArray(t) || t instanceof Set ? t : [t]
            }(t);
            for (let t of a)
                if (t !== null && (t.contains(i) || e.composed && e.composedPath().includes(t))) return;
            return !q(i, K.Loose) && i.tabIndex !== -1 && e.preventDefault(), r.current(e, i)
        }, [r, t]),
        a = (0, h.useRef)(null);
    Y(e, `pointerdown`, e => {
        J() || (a.current = e.composedPath ?.call(e) ?.[0] || e.target)
    }, !0), Y(e, `pointerup`, e => {
        if (J() || !a.current) return;
        let t = a.current;
        return a.current = null, i(e, () => t)
    }, !0);
    let o = (0, h.useRef)({
        x: 0,
        y: 0
    });
    Y(e, `touchstart`, e => {
        o.current.x = e.touches[0].clientX, o.current.y = e.touches[0].clientY
    }, !0), Y(e, `touchend`, e => {
        let t = {
            x: e.changedTouches[0].clientX,
            y: e.changedTouches[0].clientY
        };
        if (!(Math.abs(t.x - o.current.x) >= xt || Math.abs(t.y - o.current.y) >= xt)) return i(e, () => M(e.target) ? e.target : null)
    }, !0), bt(e, `blur`, e => i(e, () => ve(window.document.activeElement) ? window.document.activeElement : null), !0)
}

function Ct(...e) {
    return (0, h.useMemo)(() => l(...e), [...e])
}

function wt(e) {
    return (0, h.useSyncExternalStore)(e.subscribe, e.getSnapshot, e.getSnapshot)
}

function Tt(e, t) {
    let n = e(),
        r = new Set;
    return {
        getSnapshot() {
            return n
        },
        subscribe(e) {
            return r.add(e), () => r.delete(e)
        },
        dispatch(e, ...i) {
            let a = t[e].call(n, ...i);
            a && (n = a, r.forEach(e => e()))
        }
    }
}

function Et() {
    let e;
    return {
        before({
            doc: t
        }) {
            let n = t.documentElement,
                r = t.defaultView ?? window;
            e = Math.max(0, r.innerWidth - n.clientWidth)
        },
        after({
            doc: t,
            d: n
        }) {
            let r = t.documentElement,
                i = Math.max(0, r.clientWidth - r.offsetWidth),
                a = Math.max(0, e - i);
            n.style(r, `paddingRight`, `${a}px`)
        }
    }
}

function Dt() {
    return vt() ? {
        before({
            doc: e,
            d: t,
            meta: n
        }) {
            function r(e) {
                for (let t of n().containers)
                    for (let n of t())
                        if (n.contains(e)) return !0;
                return !1
            }
            t.microTask(() => {
                if (window.getComputedStyle(e.documentElement).scrollBehavior !== `auto`) {
                    let n = m();
                    n.style(e.documentElement, `scrollBehavior`, `auto`), t.add(() => t.microTask(() => n.dispose()))
                }
                let n = window.scrollY ?? window.pageYOffset,
                    i = null;
                t.addEventListener(e, `click`, t => {
                    if (M(t.target)) try {
                        let n = t.target.closest(`a`);
                        if (!n) return;
                        let {
                            hash: a
                        } = new URL(n.href), o = e.querySelector(a);
                        M(o) && !r(o) && (i = o)
                    } catch {}
                }, !0), t.group(n => {
                    t.addEventListener(e, `touchstart`, e => {
                        if (n.dispose(), M(e.target) && _e(e.target))
                            if (r(e.target)) {
                                let t = e.target;
                                for (; t.parentElement && r(t.parentElement);) t = t.parentElement;
                                n.style(t, `overscrollBehavior`, `contain`)
                            } else n.style(e.target, `touchAction`, `none`)
                    })
                }), t.addEventListener(e, `touchmove`, e => {
                    if (M(e.target)) {
                        if (ye(e.target)) return;
                        if (r(e.target)) {
                            let t = e.target;
                            for (; t.parentElement && t.dataset.headlessuiPortal !== `` && !(t.scrollHeight > t.clientHeight || t.scrollWidth > t.clientWidth);) t = t.parentElement;
                            t.dataset.headlessuiPortal === `` && e.preventDefault()
                        } else e.preventDefault()
                    }
                }, {
                    passive: !1
                }), t.add(() => {
                    n !== (window.scrollY ?? window.pageYOffset) && window.scrollTo(0, n), i && i.isConnected && (i.scrollIntoView({
                        block: `nearest`
                    }), i = null)
                })
            })
        }
    } : {}
}

function Ot() {
    return {
        before({
            doc: e,
            d: t
        }) {
            t.style(e.documentElement, `overflow`, `hidden`)
        }
    }
}

function kt(e) {
    let t = {};
    for (let n of e) Object.assign(t, n(t));
    return t
}
var X = Tt(() => new Map, {
    PUSH(e, t) {
        let n = this.get(e) ?? {
            doc: e,
            count: 0,
            d: m(),
            meta: new Set,
            computedMeta: {}
        };
        return n.count++, n.meta.add(t), n.computedMeta = kt(n.meta), this.set(e, n), this
    },
    POP(e, t) {
        let n = this.get(e);
        return n && (n.count--, n.meta.delete(t), n.computedMeta = kt(n.meta)), this
    },
    SCROLL_PREVENT(e) {
        let t = {
                doc: e.doc,
                d: e.d,
                meta() {
                    return e.computedMeta
                }
            },
            n = [Dt(), Et(), Ot()];
        n.forEach(({
            before: e
        }) => e ?.(t)), n.forEach(({
            after: e
        }) => e ?.(t))
    },
    SCROLL_ALLOW({
        d: e
    }) {
        e.dispose()
    },
    TEARDOWN({
        doc: e
    }) {
        this.delete(e)
    }
});
X.subscribe(() => {
    let e = X.getSnapshot(),
        t = new Map;
    for (let [n] of e) t.set(n, n.documentElement.style.overflow);
    for (let n of e.values()) {
        let e = t.get(n.doc) === `hidden`,
            r = n.count !== 0;
        (r && !e || !r && e) && X.dispatch(n.count > 0 ? `SCROLL_PREVENT` : `SCROLL_ALLOW`, n), n.count === 0 && X.dispatch(`TEARDOWN`, n)
    }
});

function At(e, t, n = () => ({
    containers: []
})) {
    let r = wt(X),
        i = t ? r.get(t) : void 0,
        a = i ? i.count > 0 : !1;
    return _(() => {
        if (!(!t || !e)) return X.dispatch(`PUSH`, t, n), () => X.dispatch(`POP`, t, n)
    }, [e, t]), a
}

function jt(e, t, n = () => [document.body]) {
    At(H(e, `scroll-lock`), t, e => ({
        containers: [...e.containers ?? [], n]
    }))
}

function Mt(e = 0) {
    let [t, n] = (0, h.useState)(e);
    return {
        flags: t,
        setFlag: (0, h.useCallback)(e => n(e), []),
        addFlag: (0, h.useCallback)(e => n(t => t | e), []),
        hasFlag: (0, h.useCallback)(e => (t & e) === e, [t]),
        removeFlag: (0, h.useCallback)(e => n(t => t & ~e), []),
        toggleFlag: (0, h.useCallback)(e => n(t => t ^ e), [])
    }
}
typeof process < `u` && typeof globalThis < `u` && typeof Element < `u` && (process == null ? void 0 : {}) ?.NODE_ENV === `test` && (Element == null ? void 0 : Element.prototype) ?.getAnimations === void 0 && (Element.prototype.getAnimations = function() {
    return console.warn(["Headless UI has polyfilled `Element.prototype.getAnimations` for your tests.", "Please install a proper polyfill e.g. `jsdom-testing-mocks`, to silence these warnings.", ``, `Example usage:`, "```js", `import { mockAnimationsApi } from 'jsdom-testing-mocks'`, `mockAnimationsApi()`, "```"].join(`
`)), []
});
var Nt = (e => (e[e.None = 0] = `None`, e[e.Closed = 1] = `Closed`, e[e.Enter = 2] = `Enter`, e[e.Leave = 4] = `Leave`, e))(Nt || {});

function Pt(e) {
    let t = {};
    for (let n in e) e[n] === !0 && (t[`data-${n}`] = ``);
    return t
}

function Ft(e, t, n, r) {
    let [i, a] = (0, h.useState)(n), {
        hasFlag: o,
        addFlag: s,
        removeFlag: c
    } = Mt(e && i ? 3 : 0), l = (0, h.useRef)(!1), u = (0, h.useRef)(!1);
    return _(() => {
        var i;
        if (e) {
            if (n && a(!0), !t) {
                n && s(3);
                return
            }
            return (i = r ?.start) == null || i.call(r, n), It(t, {
                inFlight: l,
                prepare() {
                    u.current ? u.current = !1 : u.current = l.current, l.current = !0, !u.current && (n ? (s(3), c(4)) : (s(4), c(2)))
                },
                run() {
                    u.current ? n ? (c(3), s(4)) : (c(4), s(3)) : n ? c(1) : s(1)
                },
                done() {
                    var e;
                    u.current && zt(t) || (l.current = !1, c(7), n || a(!1), (e = r ?.end) == null || e.call(r, n))
                }
            })
        }
    }, [e, n, t, g()]), e ? [i, {
        closed: o(1),
        enter: o(2),
        leave: o(4),
        transition: o(2) || o(4)
    }] : [n, {
        closed: void 0,
        enter: void 0,
        leave: void 0,
        transition: void 0
    }]
}

function It(e, {
    prepare: t,
    run: n,
    done: r,
    inFlight: i
}) {
    let a = m();
    return Rt(e, {
        prepare: t,
        inFlight: i
    }), a.nextFrame(() => {
        n(), a.requestAnimationFrame(() => {
            a.add(Lt(e, r))
        })
    }), a.dispose
}

function Lt(e, t) {
    let n = m();
    if (!e) return n.dispose;
    let r = !1;
    n.add(() => {
        r = !0
    });
    let i = e.getAnimations ?.call(e).filter(e => e instanceof CSSTransition) ?? [];
    return i.length === 0 ? (t(), n.dispose) : (Promise.allSettled(i.map(e => e.finished)).then(() => {
        r || t()
    }), n.dispose)
}

function Rt(e, {
    inFlight: t,
    prepare: n
}) {
    if (t != null && t.current) {
        n();
        return
    }
    let r = e.style.transition;
    e.style.transition = `none`, n(), e.offsetHeight, e.style.transition = r
}

function zt(e) {
    return (e.getAnimations ?.call(e) ?? []).some(e => e instanceof CSSTransition && e.playState !== `finished`)
}
var Z = (0, h.createContext)(null);
Z.displayName = `OpenClosedContext`;
var Q = (e => (e[e.Open = 1] = `Open`, e[e.Closed = 2] = `Closed`, e[e.Closing = 4] = `Closing`, e[e.Opening = 8] = `Opening`, e))(Q || {});

function Bt() {
    return (0, h.useContext)(Z)
}

function Vt({
    value: e,
    children: t
}) {
    return h.createElement(Z.Provider, {
        value: e
    }, t)
}

function Ht({
    children: e
}) {
    return h.createElement(Z.Provider, {
        value: null
    }, e)
}

function Ut(e) {
    let t = y(e),
        n = (0, h.useRef)(!1);
    (0, h.useEffect)(() => (n.current = !1, () => {
        n.current = !0, p(() => {
            n.current && t()
        })
    }), [t])
}

function Wt() {
    let e = typeof document > `u`;
    return `useSyncExternalStore` in h ? (e => e.useSyncExternalStore)(h)(() => () => {}, () => !1, () => !e) : !1
}

function Gt() {
    let e = Wt(),
        [t, n] = h.useState(c.isHandoffComplete);
    return t && c.isHandoffComplete === !1 && n(!1), h.useEffect(() => {
        t !== !0 && n(!0)
    }, [t]), h.useEffect(() => c.handoff(), []), e ? !1 : t
}
var Kt = (0, h.createContext)(!1);

function qt() {
    return (0, h.useContext)(Kt)
}

function Jt(e) {
    return h.createElement(Kt.Provider, {
        value: e.force
    }, e.children)
}
var Yt = i();

function Xt(e) {
    let t = qt(),
        n = (0, h.useContext)(tn),
        [r, i] = (0, h.useState)(() => {
            if (!t && n !== null) return n.current ?? null;
            if (c.isServer) return null;
            let r = e ?.getElementById(`headlessui-portal-root`);
            if (r) return r;
            if (e === null) return null;
            let i = e.createElement(`div`);
            return i.setAttribute(`id`, `headlessui-portal-root`), e.body.appendChild(i)
        });
    return (0, h.useEffect)(() => {
        r !== null && (e != null && e.body.contains(r) || e == null || e.body.appendChild(r))
    }, [r, e]), (0, h.useEffect)(() => {
        t || n !== null && i(n.current)
    }, [n, i, t]), r
}
var Zt = h.Fragment,
    Qt = E(function(e, t) {
        let {
            ownerDocument: n = null,
            ...r
        } = e, i = (0, h.useRef)(null), a = N(Te(e => {
            i.current = e
        }), t), o = Ct(i.current), s = Xt(n ?? o), c = (0, h.useContext)($), l = g(), u = Gt(), d = C();
        return Ut(() => {
            var e;
            s && s.childNodes.length <= 0 && ((e = s.parentElement) == null || e.removeChild(s))
        }), !s || !u ? null : (0, Yt.createPortal)(h.createElement(`div`, {
            "data-headlessui-portal": ``,
            ref: e => {
                l.dispose(), c && e && l.add(c.register(e))
            }
        }, d({
            ourProps: {
                ref: a
            },
            theirProps: r,
            slot: {},
            defaultTag: Zt,
            name: `Portal`
        })), s)
    });

function $t(e, t) {
    let n = N(t),
        {
            enabled: r = !0,
            ownerDocument: i,
            ...a
        } = e,
        o = C();
    return r ? h.createElement(Qt, { ...a,
        ownerDocument: i,
        ref: n
    }) : o({
        ourProps: {
            ref: n
        },
        theirProps: a,
        slot: {},
        defaultTag: Zt,
        name: `Portal`
    })
}
var en = h.Fragment,
    tn = (0, h.createContext)(null);

function nn(e, t) {
    let {
        target: n,
        ...r
    } = e, i = {
        ref: N(t)
    }, a = C();
    return h.createElement(tn.Provider, {
        value: n
    }, a({
        ourProps: i,
        theirProps: r,
        defaultTag: en,
        name: `Popover.Group`
    }))
}
var $ = (0, h.createContext)(null);

function rn() {
    let e = (0, h.useContext)($),
        t = (0, h.useRef)([]),
        n = y(n => (t.current.push(n), e && e.register(n), () => r(n))),
        r = y(n => {
            let r = t.current.indexOf(n);
            r !== -1 && t.current.splice(r, 1), e && e.unregister(n)
        }),
        i = (0, h.useMemo)(() => ({
            register: n,
            unregister: r,
            portals: t
        }), [n, r, t]);
    return [t, (0, h.useMemo)(() => function({
        children: e
    }) {
        return h.createElement($.Provider, {
            value: i
        }, e)
    }, [i])]
}
var an = E($t),
    on = E(nn),
    sn = Object.assign(an, {
        Group: on
    });
export {
    pe as $, nt as A, De as B, K as C, _t as D, at as E, B as F, xe as G, N as H, He as I, be as J, M as K, Ne as L, Qe as M, Ke as N, ft as O, Ye as P, he as Q, Oe as R, q as S, gt as T, Se as U, Te as V, Ce as W, ge as X, j as Y, A as Z, Y as _, m as _t, Gt as a, E as at, G as b, l as bt, Q as c, x as ct, Ft as d, re as dt, h as et, Pt as f, ee as ft, bt as g, g as gt, St as h, _ as ht, Jt as i, ce as it, H as j, rt as k, Ht as l, b as lt, Ct as m, v as mt, sn as n, ie as nt, Ut as o, k as ot, jt as p, y as pt, ye as q, rn as r, C as rt, Vt as s, D as st, on as t, S as tt, Bt as u, ne as ut, J as v, p as vt, ut as w, ht as x, i as xt, ot as y, f as yt, Me as z
};
//# sourceMappingURL=portal-CtSeHqeD.js.map