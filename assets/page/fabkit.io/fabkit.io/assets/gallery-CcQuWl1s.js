const __vite__mapDeps = (i, m = __vite__mapDeps, d = (m.f || (m.f = ["assets/gallery-U3H19mAC.js", "assets/portal-CtSeHqeD.js", "assets/compiler-runtime-4XzsAixn.js", "assets/chunk-B3K2TuZy.js", "assets/dialog-C2QVAJ1w.js", "assets/TextInput-BZJP6ajZ.js", "assets/field-CxhFTRI_.js", "assets/use-resolve-button-type-BJQyyNxN.js", "assets/form-fields-jCJtFt6p.js", "assets/useStore-DYx3-od8.js", "assets/useRouter-yWE7_bQv.js", "assets/analytics-061K8zg0.js", "assets/utils-3GFE3mVG.js", "assets/useNavigate-Cg4FyyF8.js", "assets/v4-DqHAiBF8.js", "assets/react-B1rjmc0O.js", "assets/createLucideIcon-B6eqxZGx.js", "assets/chevron-right-C1KYZQxr.js", "assets/download-HTdXk2av.js", "assets/loader-circle-yVJUgMF-.js", "assets/rotate-ccw-CkaxIDAe.js", "assets/trash-2-Ct6R1bSt.js", "assets/card-storage-1Gq86c1-.js", "assets/card-creator-B987kJQm.js", "assets/middleware-D-3Mg_OF.js", "assets/export-DDS7NWn-.js", "assets/snapdom-YQIZ-pzr.js"]))) => i.map(i => d[i]);
import {
    n as e
} from "./chunk-B3K2TuZy.js";
import {
    o as t
} from "./compiler-runtime-4XzsAixn.js";
import {
    r as n
} from "./useRouter-yWE7_bQv.js";
import {
    t as r
} from "./utils-3GFE3mVG.js";
import {
    m as i
} from "./useStore-DYx3-od8.js";
import {
    n as a
} from "./route-Bul4MYPI.js";
import {
    A as o,
    C as s,
    E as c,
    F as l,
    H as u,
    I as d,
    L as f,
    M as p,
    N as m,
    P as h,
    R as g,
    S as _,
    T as v,
    Y as y,
    _t as b,
    at as x,
    c as S,
    ct as C,
    d as w,
    et as T,
    f as E,
    ft as D,
    gt as O,
    h as k,
    ht as A,
    it as j,
    k as ee,
    m as M,
    n as te,
    o as N,
    p as ne,
    pt as P,
    rt as F,
    s as re,
    tt as I,
    u as ie,
    w as L,
    x as R,
    xt as ae,
    yt as oe
} from "./portal-CtSeHqeD.js";
import {
    d as z,
    i as B,
    l as V,
    n as se,
    t as ce,
    u as le
} from "./use-resolve-button-type-BJQyyNxN.js";
import {
    _ as ue,
    a as H,
    c as de,
    d as fe,
    f as U,
    h as pe,
    i as W,
    l as me,
    m as G,
    n as K,
    o as he,
    p as ge,
    r as _e,
    s as ve,
    t as ye,
    u as be
} from "./element-movement-CmW-4m3J.js";
import {
    t as xe
} from "./use-tree-walker-DryPBupz.js";
import {
    t as Se
} from "./use-text-value-BFJ5X_B-.js";
import {
    t as Ce
} from "./preload-helper-CMvO-Ang.js";
import {
    r as we
} from "./v4-DqHAiBF8.js";
import {
    d as Te
} from "./card-storage-1Gq86c1-.js";

function Ee(e) {
    return e => {
        let t = a(e);
        return t.isRoot = !1, t
    }
}
var q = e(t(), 1);

function De(e, t) {
    let n, a, o, s = () => (n ||= (o = void 0, e().then(e => {
            n = void 0, c.preload = void 0, a = e[t ?? `default`]
        }).catch(e => {
            n = void 0, o = e
        })), n),
        c = function(e) {
            if (o) {
                if (i(o) && typeof sessionStorage < `u`) {
                    let e = `tanstack_router_reload:${o.message}`;
                    if (!sessionStorage.getItem(e)) throw sessionStorage.setItem(e, `1`), window.location.reload(), new Promise(() => {})
                }
                throw o
            }
            if (!a)
                if (r) r(s());
                else throw s();
            return q.createElement(a, e)
        };
    return c.preload = s, c
}
var Oe = Object.defineProperty,
    ke = (e, t, n) => t in e ? Oe(e, t, {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: n
    }) : e[t] = n,
    Ae = (e, t, n) => (ke(e, typeof t == `symbol` ? t : t + ``, n), n),
    J = (e => (e[e.Open = 0] = `Open`, e[e.Closed = 1] = `Closed`, e))(J || {}),
    Y = (e => (e[e.Pointer = 0] = `Pointer`, e[e.Other = 1] = `Other`, e))(Y || {}),
    X = (e => (e[e.OpenMenu = 0] = `OpenMenu`, e[e.CloseMenu = 1] = `CloseMenu`, e[e.GoToItem = 2] = `GoToItem`, e[e.Search = 3] = `Search`, e[e.ClearSearch = 4] = `ClearSearch`, e[e.RegisterItems = 5] = `RegisterItems`, e[e.UnregisterItems = 6] = `UnregisterItems`, e[e.SetButtonElement = 7] = `SetButtonElement`, e[e.SetItemsElement = 8] = `SetItemsElement`, e[e.SortItems = 9] = `SortItems`, e[e.MarkButtonAsMoved = 10] = `MarkButtonAsMoved`, e))(X || {});

function je(e, t = e => e) {
    let n = e.activeItemIndex === null ? null : e.items[e.activeItemIndex],
        r = R(t(e.items.slice()), e => e.dataRef.current.domRef.current),
        i = n ? r.indexOf(n) : null;
    return i === -1 && (i = null), {
        items: r,
        activeItemIndex: i
    }
}
var Me = {
        1(e) {
            if (e.menuState === 1) return e;
            let t = e.buttonElement ? K.Tracked(ye(e.buttonElement)) : e.buttonPositionState;
            return { ...e,
                activeItemIndex: null,
                pendingFocus: {
                    focus: W.Nothing
                },
                menuState: 1,
                buttonPositionState: t
            }
        },
        0(e, t) {
            return e.menuState === 0 ? e : { ...e,
                __demoMode: !1,
                pendingFocus: t.focus,
                menuState: 0,
                buttonPositionState: K.Idle
            }
        },
        2: (e, t) => {
            if (e.menuState === 1) return e;
            let n = { ...e,
                searchQuery: ``,
                activationTrigger: t.trigger ?? 1,
                __demoMode: !1
            };
            if (t.focus === W.Nothing) return { ...n,
                activeItemIndex: null
            };
            if (t.focus === W.Specific) return { ...n,
                activeItemIndex: e.items.findIndex(e => e.id === t.id)
            };
            if (t.focus === W.Previous) {
                let r = e.activeItemIndex;
                if (r !== null) {
                    let i = e.items[r].dataRef.current.domRef,
                        a = H(t, {
                            resolveItems: () => e.items,
                            resolveActiveIndex: () => e.activeItemIndex,
                            resolveId: e => e.id,
                            resolveDisabled: e => e.dataRef.current.disabled
                        });
                    if (a !== null) {
                        let t = e.items[a].dataRef.current.domRef;
                        if (i.current ?.previousElementSibling === t.current || t.current ?.previousElementSibling === null) return { ...n,
                            activeItemIndex: a
                        }
                    }
                }
            } else if (t.focus === W.Next) {
                let r = e.activeItemIndex;
                if (r !== null) {
                    let i = e.items[r].dataRef.current.domRef,
                        a = H(t, {
                            resolveItems: () => e.items,
                            resolveActiveIndex: () => e.activeItemIndex,
                            resolveId: e => e.id,
                            resolveDisabled: e => e.dataRef.current.disabled
                        });
                    if (a !== null) {
                        let t = e.items[a].dataRef.current.domRef;
                        if (i.current ?.nextElementSibling === t.current || t.current ?.nextElementSibling === null) return { ...n,
                            activeItemIndex: a
                        }
                    }
                }
            }
            let r = je(e),
                i = H(t, {
                    resolveItems: () => r.items,
                    resolveActiveIndex: () => r.activeItemIndex,
                    resolveId: e => e.id,
                    resolveDisabled: e => e.dataRef.current.disabled
                });
            return { ...n,
                ...r,
                activeItemIndex: i
            }
        },
        3: (e, t) => {
            let n = e.searchQuery === `` ? 1 : 0,
                r = e.searchQuery + t.value.toLowerCase(),
                i = (e.activeItemIndex === null ? e.items : e.items.slice(e.activeItemIndex + n).concat(e.items.slice(0, e.activeItemIndex + n))).find(e => e.dataRef.current.textValue ?.startsWith(r) && !e.dataRef.current.disabled),
                a = i ? e.items.indexOf(i) : -1;
            return a === -1 || a === e.activeItemIndex ? { ...e,
                searchQuery: r
            } : { ...e,
                searchQuery: r,
                activeItemIndex: a,
                activationTrigger: 1
            }
        },
        4(e) {
            return e.searchQuery === `` ? e : { ...e,
                searchQuery: ``,
                searchActiveItemIndex: null
            }
        },
        5: (e, t) => {
            let n = e.items.concat(t.items.map(e => e)),
                r = e.activeItemIndex;
            return e.pendingFocus.focus !== W.Nothing && (r = H(e.pendingFocus, {
                resolveItems: () => n,
                resolveActiveIndex: () => e.activeItemIndex,
                resolveId: e => e.id,
                resolveDisabled: e => e.dataRef.current.disabled
            })), { ...e,
                items: n,
                activeItemIndex: r,
                pendingFocus: {
                    focus: W.Nothing
                },
                pendingShouldSort: !0
            }
        },
        6: (e, t) => {
            let n = e.items,
                r = [],
                i = new Set(t.items);
            for (let [e, t] of n.entries())
                if (i.has(t.id) && (r.push(e), i.delete(t.id), i.size === 0)) break;
            if (r.length > 0) {
                n = n.slice();
                for (let e of r.reverse()) n.splice(e, 1)
            }
            return { ...e,
                items: n,
                activationTrigger: 1
            }
        },
        7: (e, t) => e.buttonElement === t.element ? e : { ...e,
            buttonElement: t.element
        },
        8: (e, t) => e.itemsElement === t.element ? e : { ...e,
            itemsElement: t.element
        },
        9: e => e.pendingShouldSort ? { ...e,
            ...je(e),
            pendingShouldSort: !1
        } : e,
        10(e) {
            return e.buttonPositionState.kind === `Tracked` ? { ...e,
                buttonPositionState: K.Moved
            } : e
        }
    },
    Ne = class e extends l {
        constructor(e) {
            super(e), Ae(this, `actions`, {
                registerItem: d(() => {
                    let e = [],
                        t = new Set;
                    return [(n, r) => {
                        t.has(r) || (t.add(r), e.push({
                            id: n,
                            dataRef: r
                        }))
                    }, () => (t.clear(), this.send({
                        type: 5,
                        items: e.splice(0)
                    }))]
                }),
                unregisterItem: d(() => {
                    let e = [];
                    return [t => e.push(t), () => this.send({
                        type: 6,
                        items: e.splice(0)
                    })]
                })
            }), Ae(this, `selectors`, {
                activeDescendantId(e) {
                    var t;
                    let n = e.activeItemIndex,
                        r = e.items;
                    return n === null || (t = r[n]) == null ? void 0 : t.id
                },
                isActive(e, t) {
                    let n = e.activeItemIndex,
                        r = e.items;
                    return n === null ? !1 : r[n] ?.id === t
                },
                shouldScrollIntoView(e, t) {
                    return e.__demoMode || e.menuState !== 0 || e.activationTrigger === 0 ? !1 : this.isActive(e, t)
                },
                didButtonMove(e) {
                    return e.buttonPositionState.kind === `Moved`
                }
            }), this.on(5, () => {
                this.disposables.requestAnimationFrame(() => {
                    this.send({
                        type: 9
                    })
                })
            }); {
                let e = this.state.id,
                    t = h.get(null);
                this.disposables.add(t.on(m.Push, n => {
                    !t.selectors.isTop(n, e) && this.state.menuState === 0 && this.send({
                        type: 1
                    })
                })), this.on(0, () => t.actions.push(e)), this.on(1, () => t.actions.pop(e))
            }
            this.disposables.group(e => {
                this.on(1, t => {
                    t.buttonElement && (e.dispose(), e.add(_e(t.buttonElement, t.buttonPositionState, () => {
                        this.send({
                            type: 10
                        })
                    })))
                })
            })
        }
        static new({
            id: t,
            __demoMode: n = !1
        }) {
            return new e({
                id: t,
                __demoMode: n,
                menuState: n ? 0 : 1,
                buttonElement: null,
                itemsElement: null,
                items: [],
                searchQuery: ``,
                activeItemIndex: null,
                activationTrigger: 1,
                pendingShouldSort: !1,
                pendingFocus: {
                    focus: W.Nothing
                },
                buttonPositionState: K.Idle
            })
        }
        reduce(e, t) {
            return C(t.type, Me, e, t)
        }
    },
    Pe = (0, q.createContext)(null);

function Z(e) {
    let t = (0, q.useContext)(Pe);
    if (t === null) {
        let t = Error(`<${e} /> is missing a parent <Menu /> component.`);
        throw Error.captureStackTrace && Error.captureStackTrace(t, Fe), t
    }
    return t
}

function Fe({
    id: e,
    __demoMode: t = !1
}) {
    let n = (0, q.useMemo)(() => Ne.new({
        id: e,
        __demoMode: t
    }), []);
    return N(() => n.dispose()), n
}
var Q = ae(),
    Ie = q.Fragment;

function Le(e, t) {
    let n = (0, T.useId)(),
        {
            __demoMode: r = !1,
            ...i
        } = e,
        a = Fe({
            id: n,
            __demoMode: r
        }),
        [o, c, l] = p(a, e => [e.menuState, e.itemsElement, e.buttonElement]),
        d = u(t),
        f = h.get(null);
    k(p(f, (0, q.useCallback)(e => f.selectors.isTop(e, n), [f, n])), [l, c], (e, t) => {
        var n;
        a.send({
            type: X.CloseMenu
        }), _(t, s.Loose) || (e.preventDefault(), (n = a.state.buttonElement) == null || n.focus())
    });
    let m = P(() => {
            a.send({
                type: X.CloseMenu
            })
        }),
        g = D({
            open: o === J.Open,
            close: m
        }),
        v = {
            ref: d
        },
        y = F();
    return q.createElement(he, null, q.createElement(Pe.Provider, {
        value: a
    }, q.createElement(re, {
        value: C(o, {
            [J.Open]: S.Open,
            [J.Closed]: S.Closed
        })
    }, y({
        ourProps: v,
        theirProps: i,
        slot: g,
        defaultTag: Ie,
        name: `Menu`
    }))))
}
var Re = `button`;

function ze(e, t) {
    let n = Z(`Menu.Button`),
        r = (0, T.useId)(),
        {
            id: i = `headlessui-menu-button-${r}`,
            disabled: a = !1,
            autoFocus: o = !1,
            ...s
        } = e,
        c = (0, q.useRef)(null),
        l = be(),
        d = u(t, c, ve(), P(e => n.send({
            type: X.SetButtonElement,
            element: e
        }))),
        m = P(e => {
            switch (e.key) {
                case f.Space:
                case f.Enter:
                case f.ArrowDown:
                    e.preventDefault(), e.stopPropagation(), n.send({
                        type: X.OpenMenu,
                        focus: {
                            focus: W.First
                        }
                    });
                    break;
                case f.ArrowUp:
                    e.preventDefault(), e.stopPropagation(), n.send({
                        type: X.OpenMenu,
                        focus: {
                            focus: W.Last
                        }
                    });
                    break
            }
        }),
        h = P(e => {
            switch (e.key) {
                case f.Space:
                    e.preventDefault();
                    break
            }
        }),
        [g, _, v] = p(n, e => [e.menuState, e.buttonElement, e.itemsElement]);
    ge(g === J.Open, {
        trigger: _,
        action: (0, q.useCallback)(e => {
            if (_ != null && _.contains(e.target)) return G.Ignore;
            let t = e.target.closest(`[role="menuitem"]:not([data-disabled])`);
            return y(t) ? G.Select(t) : v != null && v.contains(e.target) ? G.Ignore : G.Close
        }, [_, v]),
        close: (0, q.useCallback)(() => n.send({
            type: X.CloseMenu
        }), []),
        select: (0, q.useCallback)(e => e.click(), [])
    });
    let b = pe(e => {
            var t;
            a || (g === J.Open ? ((0, Q.flushSync)(() => n.send({
                type: X.CloseMenu
            })), (t = c.current) == null || t.focus({
                preventScroll: !0
            })) : (e.preventDefault(), n.send({
                type: X.OpenMenu,
                focus: {
                    focus: W.Nothing
                },
                trigger: Y.Pointer
            })))
        }),
        {
            isFocusVisible: x,
            focusProps: S
        } = le({
            autoFocus: o
        }),
        {
            isHovered: C,
            hoverProps: w
        } = z({
            isDisabled: a
        }),
        {
            pressed: E,
            pressProps: O
        } = V({
            disabled: a
        }),
        k = D({
            open: g === J.Open,
            active: E || g === J.Open,
            disabled: a,
            hover: C,
            focus: x,
            autofocus: o
        }),
        A = j(l(), {
            ref: d,
            id: i,
            type: ce(e, c.current),
            "aria-haspopup": `menu`,
            "aria-controls": v ?.id,
            "aria-expanded": g === J.Open,
            disabled: a || void 0,
            autoFocus: o,
            onKeyDown: m,
            onKeyUp: h
        }, b, S, w, O);
    return F()({
        ourProps: A,
        theirProps: s,
        slot: k,
        defaultTag: Re,
        name: `Menu.Button`
    })
}
var Be = `div`,
    Ve = I.RenderStrategy | I.Static;

function He(e, t) {
    let n = (0, T.useId)(),
        {
            id: r = `headlessui-menu-items-${n}`,
            anchor: i,
            portal: a = !1,
            modal: s = !0,
            transition: l = !1,
            ...d
        } = e,
        m = fe(i),
        h = Z(`Menu.Items`),
        [g, _] = de(m),
        y = me(),
        [b, x] = (0, q.useState)(null),
        C = u(t, m ? g : null, P(e => h.send({
            type: X.SetItemsElement,
            element: e
        })), x),
        [k, A] = p(h, e => [e.menuState, e.buttonElement]),
        N = M(A),
        re = M(b);
    m && (a = !0);
    let I = ie(),
        [R, ae] = w(l, b, I === null ? k === J.Open : (I & S.Open) === S.Open);
    ee(R, A, () => {
        h.send({
            type: X.CloseMenu
        })
    });
    let z = p(h, e => e.__demoMode);
    ne(z ? !1 : s && k === J.Open, re), o(z ? !1 : s && k === J.Open, {
        allowed: (0, q.useCallback)(() => [A, b], [A, b])
    });
    let B = p(h, h.selectors.didButtonMove) ? !1 : R;
    (0, q.useEffect)(() => {
        let e = b;
        e && k === J.Open && (oe(e) || e.focus({
            preventScroll: !0
        }))
    }, [k, b]), xe(k === J.Open, {
        container: b,
        accept(e) {
            return e.getAttribute(`role`) === `menuitem` ? NodeFilter.FILTER_REJECT : e.hasAttribute(`role`) ? NodeFilter.FILTER_SKIP : NodeFilter.FILTER_ACCEPT
        },
        walk(e) {
            e.setAttribute(`role`, `none`)
        }
    });
    let V = O(),
        se = P(e => {
            var t, n;
            switch (V.dispose(), e.key) {
                case f.Space:
                    if (h.state.searchQuery !== ``) return e.preventDefault(), e.stopPropagation(), h.send({
                        type: X.Search,
                        value: e.key
                    });
                case f.Enter:
                    if (e.preventDefault(), e.stopPropagation(), h.state.activeItemIndex !== null) {
                        let {
                            dataRef: e
                        } = h.state.items[h.state.activeItemIndex];
                        (t = e.current ?.domRef.current) == null || t.click()
                    }
                    h.send({
                        type: X.CloseMenu
                    }), L(h.state.buttonElement);
                    break;
                case f.ArrowDown:
                    return e.preventDefault(), e.stopPropagation(), h.send({
                        type: X.GoToItem,
                        focus: W.Next
                    });
                case f.ArrowUp:
                    return e.preventDefault(), e.stopPropagation(), h.send({
                        type: X.GoToItem,
                        focus: W.Previous
                    });
                case f.Home:
                case f.PageUp:
                    return e.preventDefault(), e.stopPropagation(), h.send({
                        type: X.GoToItem,
                        focus: W.First
                    });
                case f.End:
                case f.PageDown:
                    return e.preventDefault(), e.stopPropagation(), h.send({
                        type: X.GoToItem,
                        focus: W.Last
                    });
                case f.Escape:
                    e.preventDefault(), e.stopPropagation(), (0, Q.flushSync)(() => h.send({
                        type: X.CloseMenu
                    })), (n = h.state.buttonElement) == null || n.focus({
                        preventScroll: !0
                    });
                    break;
                case f.Tab:
                    e.preventDefault(), e.stopPropagation(), (0, Q.flushSync)(() => h.send({
                        type: X.CloseMenu
                    })), v(h.state.buttonElement, e.shiftKey ? c.Previous : c.Next);
                    break;
                default:
                    e.key.length === 1 && (h.send({
                        type: X.Search,
                        value: e.key
                    }), V.setTimeout(() => h.send({
                        type: X.ClearSearch
                    }), 350));
                    break
            }
        }),
        ce = P(e => {
            switch (e.key) {
                case f.Space:
                    e.preventDefault();
                    break
            }
        }),
        le = D({
            open: k === J.Open
        }),
        H = j(m ? y() : {}, {
            "aria-activedescendant": p(h, h.selectors.activeDescendantId),
            "aria-labelledby": p(h, e => e.buttonElement ?.id),
            id: r,
            onKeyDown: se,
            onKeyUp: ce,
            role: `menu`,
            tabIndex: k === J.Open ? 0 : void 0,
            ref: C,
            style: { ...d.style,
                ..._,
                "--button-width": ue(R, A, !0).width
            },
            ...E(ae)
        }),
        U = F();
    return q.createElement(te, {
        enabled: a ? e.static || R : !1,
        ownerDocument: N
    }, U({
        ourProps: H,
        theirProps: d,
        slot: le,
        defaultTag: Be,
        features: Ve,
        visible: B,
        name: `Menu.Items`
    }))
}
var Ue = q.Fragment;

function We(e, t) {
    let n = (0, T.useId)(),
        {
            id: r = `headlessui-menu-item-${n}`,
            disabled: i = !1,
            ...a
        } = e,
        o = Z(`Menu.Item`),
        s = p(o, e => o.selectors.isActive(e, r)),
        c = (0, q.useRef)(null),
        l = u(t, c),
        d = p(o, e => o.selectors.shouldScrollIntoView(e, r));
    A(() => {
        if (d) return b().requestAnimationFrame(() => {
            var e, t;
            (t = (e = c.current) ?.scrollIntoView) == null || t.call(e, {
                block: `nearest`
            })
        })
    }, [d, c]);
    let f = Se(c),
        m = (0, q.useRef)({
            disabled: i,
            domRef: c,
            get textValue() {
                return f()
            }
        });
    A(() => {
        m.current.disabled = i
    }, [m, i]), A(() => (o.actions.registerItem(r, m), () => o.actions.unregisterItem(r)), [m, r]);
    let h = P(() => {
            o.send({
                type: X.CloseMenu
            })
        }),
        _ = P(e => {
            if (i) return e.preventDefault();
            o.send({
                type: X.CloseMenu
            }), L(o.state.buttonElement)
        }),
        v = P(() => {
            if (i) return o.send({
                type: X.GoToItem,
                focus: W.Nothing
            });
            o.send({
                type: X.GoToItem,
                focus: W.Specific,
                id: r
            })
        }),
        y = U(),
        x = P(e => y.update(e)),
        S = P(e => {
            y.wasMoved(e) && (i || s || o.send({
                type: X.GoToItem,
                focus: W.Specific,
                id: r,
                trigger: Y.Pointer
            }))
        }),
        C = P(e => {
            y.wasMoved(e) && (i || s && o.state.activationTrigger === Y.Pointer && o.send({
                type: X.GoToItem,
                focus: W.Nothing
            }))
        }),
        [w, E] = B(),
        [O, k] = g(),
        j = D({
            active: s,
            focus: s,
            disabled: i,
            close: h
        }),
        ee = {
            id: r,
            ref: l,
            role: `menuitem`,
            tabIndex: i === !0 ? void 0 : -1,
            "aria-disabled": i === !0 ? !0 : void 0,
            "aria-labelledby": w,
            "aria-describedby": O,
            disabled: void 0,
            onClick: _,
            onFocus: v,
            onPointerEnter: x,
            onMouseEnter: x,
            onPointerMove: S,
            onMouseMove: S,
            onPointerLeave: C,
            onMouseLeave: C
        },
        M = F();
    return q.createElement(E, null, q.createElement(k, null, M({
        ourProps: ee,
        theirProps: a,
        slot: j,
        defaultTag: Ue,
        name: `Menu.Item`
    })))
}
var Ge = `div`;

function Ke(e, t) {
    let [n, r] = B(), i = e, a = {
        ref: t,
        "aria-labelledby": n,
        role: `group`
    }, o = F();
    return q.createElement(r, null, o({
        ourProps: a,
        theirProps: i,
        slot: {},
        defaultTag: Ge,
        name: `Menu.Section`
    }))
}
var qe = `header`;

function Je(e, t) {
    let n = (0, T.useId)(),
        {
            id: r = `headlessui-menu-heading-${n}`,
            ...i
        } = e,
        a = se();
    A(() => a.register(r), [r, a.register]);
    let o = {
        id: r,
        ref: t,
        role: `presentation`,
        ...a.props
    };
    return F()({
        ourProps: o,
        theirProps: i,
        slot: {},
        defaultTag: qe,
        name: `Menu.Heading`
    })
}
var Ye = `div`;

function Xe(e, t) {
    let n = e,
        r = {
            ref: t,
            role: `separator`
        };
    return F()({
        ourProps: r,
        theirProps: n,
        slot: {},
        defaultTag: Ye,
        name: `Menu.Separator`
    })
}
var Ze = x(Le),
    Qe = x(ze),
    $e = x(He),
    $ = x(We),
    et = x(Ke),
    tt = x(Je),
    nt = x(Xe),
    rt = Object.assign(Ze, {
        Button: Qe,
        Items: $e,
        Item: $,
        Section: et,
        Heading: tt,
        Separator: nt
    });
const it = Ee(`/gallery`)({
    component: De(() => Ce(() =>
        import (`./gallery-U3H19mAC.js`), __vite__mapDeps([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26])), `component`),
    validateSearch: e => ({
        folderId: typeof e.folderId == `string` ? e.folderId : void 0
    }),
    loader: async () => {
        let [e] = await Promise.all([Te(), we()]);
        return e
    }
});
export {
    $e as a, rt as i, Qe as n, De as o, $ as r, Ee as s, it as t
};
//# sourceMappingURL=gallery-CcQuWl1s.js.map