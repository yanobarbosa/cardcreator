import {
    n as e
} from "./chunk-B3K2TuZy.js";
import {
    o as t
} from "./compiler-runtime-4XzsAixn.js";
import {
    $ as n,
    A as r,
    D as i,
    E as a,
    H as o,
    K as s,
    L as c,
    M as l,
    O as u,
    P as d,
    Q as f,
    R as p,
    Y as m,
    Z as h,
    a as g,
    at as _,
    b as v,
    bt as y,
    c as b,
    ct as x,
    d as S,
    et as C,
    f as w,
    ft as T,
    g as E,
    gt as D,
    h as O,
    ht as k,
    i as A,
    j,
    k as M,
    l as ee,
    lt as N,
    m as P,
    mt as F,
    n as I,
    nt as L,
    o as R,
    ot as te,
    p as ne,
    pt as z,
    r as re,
    rt as B,
    s as ie,
    st as ae,
    t as V,
    tt as H,
    u as U,
    vt as W,
    y as G,
    yt as K,
    z as oe
} from "./portal-CtSeHqeD.js";
var q = e(t(), 1),
    se = (0, q.createContext)(() => {});

function ce({
    value: e,
    children: t
}) {
    return q.createElement(se.Provider, {
        value: e
    }, t)
}

function J(e, t, n, r) {
    let i = F(n);
    (0, q.useEffect)(() => {
        e ??= window;

        function n(e) {
            i.current(e)
        }
        return e.addEventListener(t, n, r), () => e.removeEventListener(t, n, r)
    }, [e, t, r])
}

function Y(e, t) {
    let n = (0, q.useRef)([]),
        r = z(e);
    (0, q.useEffect)(() => {
        let e = [...n.current];
        for (let [i, a] of t.entries())
            if (n.current[i] !== a) {
                let i = r(t, e);
                return n.current = t, i
            }
    }, [r, ...t])
}

function le(e) {
    function t() {
        document.readyState !== `loading` && (e(), document.removeEventListener(`DOMContentLoaded`, t))
    }
    typeof window < `u` && typeof document < `u` && (document.addEventListener(`DOMContentLoaded`, t), t())
}
var X = [];
le(() => {
    function e(e) {
        if (!s(e.target) || e.target === document.body || X[0] === e.target) return;
        let t = e.target;
        t = t.closest(v), X.unshift(t ?? e.target), X = X.filter(e => e != null && e.isConnected), X.splice(10)
    }
    window.addEventListener(`click`, e, {
        capture: !0
    }), window.addEventListener(`mousedown`, e, {
        capture: !0
    }), window.addEventListener(`focus`, e, {
        capture: !0
    }), document.body.addEventListener(`click`, e, {
        capture: !0
    }), document.body.addEventListener(`mousedown`, e, {
        capture: !0
    }), document.body.addEventListener(`focus`, e, {
        capture: !0
    })
});

function ue(e, t = typeof document < `u` ? document.defaultView : null, n) {
    let r = j(e, `escape`);
    J(t, `keydown`, e => {
        r && (e.defaultPrevented || e.key === c.Escape && n(e))
    })
}

function de() {
    let [e] = (0, q.useState)(() => typeof window < `u` && typeof window.matchMedia == `function` ? window.matchMedia(`(pointer: coarse)`) : null), [t, n] = (0, q.useState)(e ?.matches ?? !1);
    return k(() => {
        if (!e) return;

        function t(e) {
            n(e.matches)
        }
        return e.addEventListener(`change`, t), () => e.removeEventListener(`change`, t)
    }, [e]), t
}

function fe({
    defaultContainers: e = [],
    portals: t,
    mainTreeNode: n
} = {}) {
    let r = z(() => {
        let r = y(n),
            i = [];
        for (let t of e) t !== null && (h(t) ? i.push(t) : `current` in t && h(t.current) && i.push(t.current));
        if (t != null && t.current)
            for (let e of t.current) i.push(e);
        for (let e of r ?.querySelectorAll(`html > *, body > *`) ?? []) e !== document.body && e !== document.head && h(e) && e.id !== `headlessui-portal-root` && (n && (e.contains(n) || e.contains(n ?.getRootNode() ?.host)) || i.some(t => e.contains(t)) || i.push(e));
        return i
    });
    return {
        resolveContainers: r,
        contains: z(e => r().some(t => t.contains(e)))
    }
}
var Z = (0, q.createContext)(null);

function pe({
    children: e,
    node: t
}) {
    let [r, i] = (0, q.useState)(null), a = me(t ?? r);
    return q.createElement(Z.Provider, {
        value: a
    }, e, a === null && q.createElement(f, {
        features: n.Hidden,
        ref: e => {
            if (e) {
                for (let t of y(e) ?.querySelectorAll(`html > *, body > *`) ?? [])
                    if (t !== document.body && t !== document.head && h(t) && t != null && t.contains(e)) {
                        i(t);
                        break
                    }
            }
        }
    }))
}

function me(e = null) {
    return (0, q.useContext)(Z) ?? e
}

function he() {
    let e = (0, q.useRef)(!1);
    return k(() => (e.current = !0, () => {
        e.current = !1
    }), []), e
}
var Q = (e => (e[e.Forwards = 0] = `Forwards`, e[e.Backwards = 1] = `Backwards`, e))(Q || {});

function ge() {
    let e = (0, q.useRef)(0);
    return E(!0, `keydown`, t => {
        t.key === `Tab` && (e.current = t.shiftKey ? 1 : 0)
    }, !0), e
}

function _e(e) {
    if (!e) return new Set;
    if (typeof e == `function`) return new Set(e());
    let t = new Set;
    for (let n of e.current) h(n.current) && t.add(n.current);
    return t
}
var ve = `div`,
    $ = (e => (e[e.None = 0] = `None`, e[e.InitialFocus = 1] = `InitialFocus`, e[e.TabLock = 2] = `TabLock`, e[e.FocusLock = 4] = `FocusLock`, e[e.RestoreFocus = 8] = `RestoreFocus`, e[e.AutoFocus = 16] = `AutoFocus`, e))($ || {});

function ye(e, t) {
    let r = (0, q.useRef)(null),
        c = o(r, t),
        {
            initialFocus: l,
            initialFocusFallback: d,
            containers: p,
            features: h = 15,
            ..._
        } = e;
    g() || (h = 0);
    let v = P(r.current);
    Ce(h, {
        ownerDocument: v
    });
    let y = we(h, {
        ownerDocument: v,
        container: r,
        initialFocus: l,
        initialFocusFallback: d
    });
    Te(h, {
        ownerDocument: v,
        container: r,
        containers: p,
        previousActiveElement: y
    });
    let b = ge(),
        S = z(e => {
            if (!m(r.current)) return;
            let t = r.current;
            (e => e())(() => {
                x(b.current, {
                    [Q.Forwards]: () => {
                        i(t, a.First, {
                            skipElements: [e.relatedTarget, d]
                        })
                    },
                    [Q.Backwards]: () => {
                        i(t, a.Last, {
                            skipElements: [e.relatedTarget, d]
                        })
                    }
                })
            })
        }),
        C = j(!!(h & 2), `focus-trap#tab-lock`),
        w = D(),
        T = (0, q.useRef)(!1),
        E = {
            ref: c,
            onKeyDown(e) {
                e.key == `Tab` && (T.current = !0, w.requestAnimationFrame(() => {
                    T.current = !1
                }))
            },
            onBlur(e) {
                if (!(h & 4)) return;
                let t = _e(p);
                m(r.current) && t.add(r.current);
                let n = e.relatedTarget;
                s(n) && n.dataset.headlessuiFocusGuard !== `true` && (Ee(t, n) || (T.current ? i(r.current, x(b.current, {
                    [Q.Forwards]: () => a.Next,
                    [Q.Backwards]: () => a.Previous
                }) | a.WrapAround, {
                    relativeTo: e.target
                }) : s(e.target) && u(e.target)))
            }
        },
        O = B();
    return q.createElement(q.Fragment, null, C && q.createElement(f, {
        as: `button`,
        type: `button`,
        "data-headlessui-focus-guard": !0,
        onFocus: S,
        features: n.Focusable
    }), O({
        ourProps: E,
        theirProps: _,
        defaultTag: ve,
        name: `FocusTrap`
    }), C && q.createElement(f, {
        as: `button`,
        type: `button`,
        "data-headlessui-focus-guard": !0,
        onFocus: S,
        features: n.Focusable
    }))
}
var be = _(ye),
    xe = Object.assign(be, {
        features: $
    });

function Se(e = !0) {
    let t = (0, q.useRef)(X.slice());
    return Y(([e], [n]) => {
        n === !0 && e === !1 && W(() => {
            t.current.splice(0)
        }), n === !1 && e === !0 && (t.current = X.slice())
    }, [e, X, t]), z(() => t.current.find(e => e != null && e.isConnected) ?? null)
}

function Ce(e, {
    ownerDocument: t
}) {
    let n = !!(e & 8),
        r = Se(n);
    Y(() => {
        n || K(t ?.body) && u(r())
    }, [n]), R(() => {
        n && u(r())
    })
}

function we(e, {
    ownerDocument: t,
    container: n,
    initialFocus: r,
    initialFocusFallback: o
}) {
    let s = (0, q.useRef)(null),
        c = j(!!(e & 1), `focus-trap#initial-focus`),
        l = he();
    return Y(() => {
        if (e === 0) return;
        if (!c) {
            o != null && o.current && u(o.current);
            return
        }
        let d = n.current;
        d && W(() => {
            if (!l.current) return;
            let n = t ?.activeElement;
            if (r != null && r.current) {
                if (r ?.current === n) {
                    s.current = n;
                    return
                }
            } else if (d.contains(n)) {
                s.current = n;
                return
            }
            if (r != null && r.current) u(r.current);
            else {
                if (e & 16) {
                    if (i(d, a.First | a.AutoFocus) !== G.Error) return
                } else if (i(d, a.First) !== G.Error) return;
                if (o != null && o.current && (u(o.current), t ?.activeElement === o.current)) return;
                console.warn(`There are no focusable elements inside the <FocusTrap />`)
            }
            s.current = t ?.activeElement
        })
    }, [o, c, e]), s
}

function Te(e, {
    ownerDocument: t,
    container: n,
    containers: r,
    previousActiveElement: i
}) {
    let a = he(),
        o = !!(e & 4);
    J(t ?.defaultView, `focus`, e => {
        if (!o || !a.current) return;
        let t = _e(r);
        m(n.current) && t.add(n.current);
        let s = i.current;
        if (!s) return;
        let c = e.target;
        m(c) ? Ee(t, c) ? (i.current = c, u(c)) : (e.preventDefault(), e.stopPropagation(), u(s)) : u(i.current)
    }, !0)
}

function Ee(e, t) {
    for (let n of e)
        if (n.contains(t)) return !0;
    return !1
}

function De(e) {
    return !!(e.enter || e.enterFrom || e.enterTo || e.leave || e.leaveFrom || e.leaveTo) || !te(e.as ?? Fe) || q.Children.count(e.children) === 1
}
var Oe = (0, q.createContext)(null);
Oe.displayName = `TransitionContext`;
var ke = (e => (e.Visible = `visible`, e.Hidden = `hidden`, e))(ke || {});

function Ae() {
    let e = (0, q.useContext)(Oe);
    if (e === null) throw Error(`A <Transition.Child /> is used but it is missing a parent <Transition /> or <Transition.Root />.`);
    return e
}

function je() {
    let e = (0, q.useContext)(Me);
    if (e === null) throw Error(`A <Transition.Child /> is used but it is missing a parent <Transition /> or <Transition.Root />.`);
    return e
}
var Me = (0, q.createContext)(null);
Me.displayName = `NestingContext`;

function Ne(e) {
    return `children` in e ? Ne(e.children) : e.current.filter(({
        el: e
    }) => e.current !== null).filter(({
        state: e
    }) => e === `visible`).length > 0
}

function Pe(e, t) {
    let n = F(e),
        r = (0, q.useRef)([]),
        i = he(),
        a = D(),
        o = z((e, t = L.Hidden) => {
            let o = r.current.findIndex(({
                el: t
            }) => t === e);
            o !== -1 && (x(t, {
                [L.Unmount]() {
                    r.current.splice(o, 1)
                },
                [L.Hidden]() {
                    r.current[o].state = `hidden`
                }
            }), a.microTask(() => {
                var e;
                !Ne(r) && i.current && ((e = n.current) == null || e.call(n))
            }))
        }),
        s = z(e => {
            let t = r.current.find(({
                el: t
            }) => t === e);
            return t ? t.state !== `visible` && (t.state = `visible`) : r.current.push({
                el: e,
                state: `visible`
            }), () => o(e, L.Unmount)
        }),
        c = (0, q.useRef)([]),
        l = (0, q.useRef)(Promise.resolve()),
        u = (0, q.useRef)({
            enter: [],
            leave: []
        }),
        d = z((e, n, r) => {
            c.current.splice(0), t && (t.chains.current[n] = t.chains.current[n].filter(([t]) => t !== e)), t ?.chains.current[n].push([e, new Promise(e => {
                c.current.push(e)
            })]), t ?.chains.current[n].push([e, new Promise(e => {
                Promise.all(u.current[n].map(([e, t]) => t)).then(() => e())
            })]), n === `enter` ? l.current = l.current.then(() => t ?.wait.current).then(() => r(n)) : r(n)
        }),
        f = z((e, t, n) => {
            Promise.all(u.current[t].splice(0).map(([e, t]) => t)).then(() => {
                var e;
                (e = c.current.shift()) == null || e()
            }).then(() => n(t))
        });
    return (0, q.useMemo)(() => ({
        children: r,
        register: s,
        unregister: o,
        onStart: d,
        onStop: f,
        wait: l,
        chains: u
    }), [s, o, r, d, f, u, l])
}
var Fe = q.Fragment,
    Ie = H.RenderStrategy;

function Le(e, t) {
    var n;
    let {
        transition: r = !0,
        beforeEnter: i,
        afterEnter: a,
        beforeLeave: s,
        afterLeave: c,
        enter: l,
        enterFrom: u,
        enterTo: d,
        entered: f,
        leave: p,
        leaveFrom: m,
        leaveTo: h,
        ..._
    } = e, [v, y] = (0, q.useState)(null), C = (0, q.useRef)(null), T = De(e), E = o(...T ? [C, t, y] : t === null ? [] : [t]), D = (n = _.unmount) == null || n ? L.Unmount : L.Hidden, {
        show: O,
        appear: A,
        initial: j
    } = Ae(), [M, ee] = (0, q.useState)(O ? `visible` : `hidden`), P = je(), {
        register: F,
        unregister: I
    } = P;
    k(() => F(C), [F, C]), k(() => {
        if (D === L.Hidden && C.current) {
            if (O && M !== `visible`) {
                ee(`visible`);
                return
            }
            return x(M, {
                hidden: () => I(C),
                visible: () => F(C)
            })
        }
    }, [M, C, F, I, O, D]);
    let R = g();
    k(() => {
        if (T && R && M === `visible` && C.current === null) throw Error("Did you forget to passthrough the `ref` to the actual DOM node?")
    }, [C, M, R, T]);
    let te = j && !A,
        ne = A && O && j,
        re = (0, q.useRef)(!1),
        V = Pe(() => {
            re.current || (ee(`hidden`), I(C))
        }, P),
        H = z(e => {
            re.current = !0;
            let t = e ? `enter` : `leave`;
            V.onStart(C, t, e => {
                e === `enter` ? i ?.() : e === `leave` && s ?.()
            })
        }),
        U = z(e => {
            let t = e ? `enter` : `leave`;
            re.current = !1, V.onStop(C, t, e => {
                e === `enter` ? a ?.() : e === `leave` && c ?.()
            }), t === `leave` && !Ne(V) && (ee(`hidden`), I(C))
        });
    (0, q.useEffect)(() => {
        T && r || (H(O), U(O))
    }, [O, T, r]);
    let [, W] = S((() => !(!r || !T || !R || te))(), v, O, {
        start: H,
        end: U
    }), G = ae({
        ref: E,
        className: N(_.className, ne && l, ne && u, W.enter && l, W.enter && W.closed && u, W.enter && !W.closed && d, W.leave && p, W.leave && !W.closed && m, W.leave && W.closed && h, !W.transition && O && f) ?.trim() || void 0,
        ...w(W)
    }), K = 0;
    M === `visible` && (K |= b.Open), M === `hidden` && (K |= b.Closed), O && M === `hidden` && (K |= b.Opening), !O && M === `visible` && (K |= b.Closing);
    let oe = B();
    return q.createElement(Me.Provider, {
        value: V
    }, q.createElement(ie, {
        value: K
    }, oe({
        ourProps: G,
        theirProps: _,
        defaultTag: Fe,
        features: Ie,
        visible: M === `visible`,
        name: `Transition.Child`
    })))
}

function Re(e, t) {
    let {
        show: n,
        appear: r = !1,
        unmount: i = !0,
        ...a
    } = e, s = (0, q.useRef)(null), c = o(...De(e) ? [s, t] : t === null ? [] : [t]);
    g();
    let l = U();
    if (n === void 0 && l !== null && (n = (l & b.Open) === b.Open), n === void 0) throw Error("A <Transition /> is used but it is missing a `show={true | false}` prop.");
    let [u, d] = (0, q.useState)(n ? `visible` : `hidden`), f = Pe(() => {
        n || d(`hidden`)
    }), [p, m] = (0, q.useState)(!0), h = (0, q.useRef)([n]);
    k(() => {
        p !== !1 && h.current[h.current.length - 1] !== n && (h.current.push(n), m(!1))
    }, [h, n]);
    let _ = (0, q.useMemo)(() => ({
        show: n,
        appear: r,
        initial: p
    }), [n, r, p]);
    k(() => {
        n ? d(`visible`) : !Ne(f) && s.current !== null && d(`hidden`)
    }, [n, f]);
    let v = {
            unmount: i
        },
        y = z(() => {
            var t;
            p && m(!1), (t = e.beforeEnter) == null || t.call(e)
        }),
        x = z(() => {
            var t;
            p && m(!1), (t = e.beforeLeave) == null || t.call(e)
        }),
        S = B();
    return q.createElement(Me.Provider, {
        value: f
    }, q.createElement(Oe.Provider, {
        value: _
    }, S({
        ourProps: { ...v,
            as: q.Fragment,
            children: q.createElement(Ve, {
                ref: c,
                ...v,
                ...a,
                beforeEnter: y,
                beforeLeave: x
            })
        },
        theirProps: {},
        defaultTag: q.Fragment,
        features: Ie,
        visible: u === `visible`,
        name: `Transition`
    })))
}

function ze(e, t) {
    let n = (0, q.useContext)(Oe) !== null,
        r = U() !== null;
    return q.createElement(q.Fragment, null, !n && r ? q.createElement(Be, {
        ref: t,
        ...e
    }) : q.createElement(Ve, {
        ref: t,
        ...e
    }))
}
var Be = _(Re),
    Ve = _(Le),
    He = _(ze),
    Ue = Object.assign(Be, {
        Child: He,
        Root: Be
    }),
    We = (e => (e[e.Open = 0] = `Open`, e[e.Closed = 1] = `Closed`, e))(We || {}),
    Ge = (e => (e[e.SetTitleId = 0] = `SetTitleId`, e))(Ge || {}),
    Ke = {
        0(e, t) {
            return e.titleId === t.id ? e : { ...e,
                titleId: t.id
            }
        }
    },
    qe = (0, q.createContext)(null);
qe.displayName = `DialogContext`;

function Je(e) {
    let t = (0, q.useContext)(qe);
    if (t === null) {
        let t = Error(`<${e} /> is missing a parent <Dialog /> component.`);
        throw Error.captureStackTrace && Error.captureStackTrace(t, Je), t
    }
    return t
}

function Ye(e, t) {
    return x(t.type, Ke, e, t)
}
var Xe = _(function(e, t) {
        let n = (0, C.useId)(),
            {
                id: i = `headlessui-dialog-${n}`,
                open: a,
                onClose: s,
                initialFocus: c,
                role: u = `dialog`,
                autoFocus: f = !0,
                __demoMode: m = !1,
                unmount: h = !1,
                ..._
            } = e,
            v = (0, q.useRef)(!1);
        u = function() {
            return u === `dialog` || u === `alertdialog` ? u : (v.current || (v.current = !0, console.warn(`Invalid role [${u}] passed to <Dialog />. Only \`dialog\` and and \`alertdialog\` are supported. Using \`dialog\` instead.`)), `dialog`)
        }();
        let y = U();
        a === void 0 && y !== null && (a = (y & b.Open) === b.Open);
        let x = (0, q.useRef)(null),
            S = o(x, t),
            w = P(x.current),
            E = a ? 0 : 1,
            [D, j] = (0, q.useReducer)(Ye, {
                titleId: null,
                descriptionId: null,
                panelRef: (0, q.createRef)()
            }),
            N = z(() => s(!1)),
            F = z(e => j({
                type: 0,
                id: e
            })),
            L = g() ? E === 0 : !1,
            [R, te] = re(),
            ie = {
                get current() {
                    return D.panelRef.current ?? x.current
                }
            },
            ae = me(),
            {
                resolveContainers: H
            } = fe({
                mainTreeNode: ae,
                portals: R,
                defaultContainers: [ie]
            }),
            W = y === null ? !1 : (y & b.Closing) === b.Closing;
        r(m || W ? !1 : L, {
            allowed: z(() => [x.current ?.closest(`[data-headlessui-portal]`) ?? null]),
            disallowed: z(() => [ae ?.closest(`body > *:not(#headlessui-portal-root)`) ?? null])
        });
        let G = d.get(null);
        k(() => {
            if (L) return G.actions.push(i), () => G.actions.pop(i)
        }, [G, i, L]);
        let K = l(G, (0, q.useCallback)(e => G.selectors.isTop(e, i), [G, i]));
        O(K, H, e => {
            e.preventDefault(), N()
        }), ue(K, w ?.defaultView, e => {
            e.preventDefault(), e.stopPropagation(), document.activeElement && `blur` in document.activeElement && typeof document.activeElement.blur == `function` && document.activeElement.blur(), N()
        }), ne(m || W ? !1 : L, w, H), M(L, x, N);
        let [oe, se] = p(), J = (0, q.useMemo)(() => [{
            dialogState: E,
            close: N,
            setTitleId: F,
            unmount: h
        }, D], [E, N, F, h, D]), Y = T({
            open: E === 0
        }), le = {
            ref: S,
            id: i,
            role: u,
            tabIndex: -1,
            "aria-modal": m ? void 0 : E === 0 ? !0 : void 0,
            "aria-labelledby": D.titleId,
            "aria-describedby": oe,
            unmount: h
        }, X = !de(), Z = $.None;
        L && !m && (Z |= $.RestoreFocus, Z |= $.TabLock, f && (Z |= $.AutoFocus), X && (Z |= $.InitialFocus));
        let pe = B();
        return q.createElement(ee, null, q.createElement(A, {
            force: !0
        }, q.createElement(I, null, q.createElement(qe.Provider, {
            value: J
        }, q.createElement(V, {
            target: x
        }, q.createElement(A, {
            force: !1
        }, q.createElement(se, {
            slot: Y
        }, q.createElement(te, null, q.createElement(xe, {
            initialFocus: c,
            initialFocusFallback: x,
            containers: H,
            features: Z
        }, q.createElement(ce, {
            value: N
        }, pe({
            ourProps: le,
            theirProps: _,
            slot: Y,
            defaultTag: Ze,
            features: Qe,
            visible: E === 0,
            name: `Dialog`
        })))))))))))
    }),
    Ze = `div`,
    Qe = H.RenderStrategy | H.Static;

function $e(e, t) {
    let {
        transition: n = !1,
        open: r,
        ...i
    } = e, a = U(), o = e.hasOwnProperty(`open`) || a !== null, s = e.hasOwnProperty(`onClose`);
    if (!o && !s) throw Error("You have to provide an `open` and an `onClose` prop to the `Dialog` component.");
    if (!o) throw Error("You provided an `onClose` prop to the `Dialog`, but forgot an `open` prop.");
    if (!s) throw Error("You provided an `open` prop to the `Dialog`, but forgot an `onClose` prop.");
    if (!a && typeof e.open != `boolean`) throw Error(`You provided an \`open\` prop to the \`Dialog\`, but the value is not a boolean. Received: ${e.open}`);
    if (typeof e.onClose != `function`) throw Error(`You provided an \`onClose\` prop to the \`Dialog\`, but the value is not a function. Received: ${e.onClose}`);
    return (r !== void 0 || n) && !i.static ? q.createElement(pe, null, q.createElement(Ue, {
        show: r,
        transition: n,
        unmount: i.unmount
    }, q.createElement(Xe, {
        ref: t,
        ...i
    }))) : q.createElement(pe, null, q.createElement(Xe, {
        ref: t,
        open: r,
        ...i
    }))
}
var et = `div`;

function tt(e, t) {
    let n = (0, C.useId)(),
        {
            id: r = `headlessui-dialog-panel-${n}`,
            transition: i = !1,
            ...a
        } = e,
        [{
            dialogState: s,
            unmount: c
        }, l] = Je(`Dialog.Panel`),
        u = o(t, l.panelRef),
        d = T({
            open: s === 0
        }),
        f = {
            ref: u,
            id: r,
            onClick: z(e => {
                e.stopPropagation()
            })
        },
        p = i ? He : q.Fragment,
        m = i ? {
            unmount: c
        } : {},
        h = B();
    return q.createElement(p, { ...m
    }, h({
        ourProps: f,
        theirProps: a,
        slot: d,
        defaultTag: et,
        name: `Dialog.Panel`
    }))
}
var nt = `div`;

function rt(e, t) {
    let {
        transition: n = !1,
        ...r
    } = e, [{
        dialogState: i,
        unmount: a
    }] = Je(`Dialog.Backdrop`), o = T({
        open: i === 0
    }), s = {
        ref: t,
        "aria-hidden": !0
    }, c = n ? He : q.Fragment, l = n ? {
        unmount: a
    } : {}, u = B();
    return q.createElement(c, { ...l
    }, u({
        ourProps: s,
        theirProps: r,
        slot: o,
        defaultTag: nt,
        name: `Dialog.Backdrop`
    }))
}
var it = `h2`;

function at(e, t) {
    let n = (0, C.useId)(),
        {
            id: r = `headlessui-dialog-title-${n}`,
            ...i
        } = e,
        [{
            dialogState: a,
            setTitleId: s
        }] = Je(`Dialog.Title`),
        c = o(t);
    (0, q.useEffect)(() => (s(r), () => s(null)), [r, s]);
    let l = T({
            open: a === 0
        }),
        u = {
            ref: c,
            id: r
        };
    return B()({
        ourProps: u,
        theirProps: i,
        slot: l,
        defaultTag: it,
        name: `Dialog.Title`
    })
}
var ot = _($e),
    st = _(tt),
    ct = _(rt),
    lt = _(at),
    ut = Object.assign(ot, {
        Panel: st,
        Title: lt,
        Description: oe
    });
export {
    Ue as a, Y as c, st as i, J as l, lt as n, He as o, ut as r, X as s, ct as t, ce as u
};
//# sourceMappingURL=dialog-C2QVAJ1w.js.map