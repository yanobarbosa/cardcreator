import {
    n as e
} from "./chunk-B3K2TuZy.js";
import {
    o as t
} from "./compiler-runtime-4XzsAixn.js";
import {
    A as n,
    B as r,
    C as i,
    E as a,
    F as o,
    H as s,
    I as c,
    L as l,
    M as u,
    N as d,
    P as f,
    S as p,
    T as m,
    Y as h,
    _t as g,
    at as _,
    c as v,
    ct as y,
    d as b,
    et as x,
    f as S,
    ft as C,
    gt as w,
    h as T,
    ht as E,
    it as D,
    k as O,
    m as k,
    mt as A,
    n as j,
    o as M,
    p as ee,
    pt as N,
    rt as P,
    s as F,
    tt as I,
    u as te,
    ut as ne,
    x as L,
    xt as R,
    yt as z
} from "./portal-CtSeHqeD.js";
import {
    a as B,
    c as V,
    d as re,
    i as ie,
    l as H,
    r as U,
    t as ae,
    u as oe
} from "./use-resolve-button-type-BJQyyNxN.js";
import {
    a as se,
    i as ce,
    n as le,
    r as ue
} from "./frozen-DrtCOwXN.js";
import {
    n as de,
    r as fe
} from "./form-fields-jCJtFt6p.js";
import {
    _ as pe,
    a as W,
    c as me,
    d as he,
    f as ge,
    h as _e,
    i as G,
    l as ve,
    m as K,
    n as q,
    o as ye,
    p as be,
    r as xe,
    s as Se,
    t as Ce,
    u as we
} from "./element-movement-CmW-4m3J.js";
import {
    t as Te
} from "./use-text-value-BFJ5X_B-.js";
var Ee = Object.defineProperty,
    De = (e, t, n) => t in e ? Ee(e, t, {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: n
    }) : e[t] = n,
    Oe = (e, t, n) => (De(e, typeof t == `symbol` ? t : t + ``, n), n),
    J = (e => (e[e.Open = 0] = `Open`, e[e.Closed = 1] = `Closed`, e))(J || {}),
    Y = (e => (e[e.Single = 0] = `Single`, e[e.Multi = 1] = `Multi`, e))(Y || {}),
    X = (e => (e[e.Pointer = 0] = `Pointer`, e[e.Other = 1] = `Other`, e))(X || {}),
    ke = (e => (e[e.OpenListbox = 0] = `OpenListbox`, e[e.CloseListbox = 1] = `CloseListbox`, e[e.GoToOption = 2] = `GoToOption`, e[e.Search = 3] = `Search`, e[e.ClearSearch = 4] = `ClearSearch`, e[e.SelectOption = 5] = `SelectOption`, e[e.RegisterOptions = 6] = `RegisterOptions`, e[e.UnregisterOptions = 7] = `UnregisterOptions`, e[e.SetButtonElement = 8] = `SetButtonElement`, e[e.SetOptionsElement = 9] = `SetOptionsElement`, e[e.SortOptions = 10] = `SortOptions`, e[e.MarkButtonAsMoved = 11] = `MarkButtonAsMoved`, e))(ke || {});

function Ae(e, t = e => e) {
    let n = e.activeOptionIndex === null ? null : e.options[e.activeOptionIndex],
        r = L(t(e.options.slice()), e => e.dataRef.current.domRef.current),
        i = n ? r.indexOf(n) : null;
    return i === -1 && (i = null), {
        options: r,
        activeOptionIndex: i
    }
}
var je = {
        1(e) {
            if (e.dataRef.current.disabled || e.listboxState === 1) return e;
            let t = e.buttonElement ? q.Tracked(Ce(e.buttonElement)) : e.buttonPositionState;
            return { ...e,
                activeOptionIndex: null,
                pendingFocus: {
                    focus: G.Nothing
                },
                listboxState: 1,
                __demoMode: !1,
                buttonPositionState: t
            }
        },
        0(e, t) {
            if (e.dataRef.current.disabled || e.listboxState === 0) return e;
            let n = e.activeOptionIndex,
                {
                    isSelected: r
                } = e.dataRef.current,
                i = e.options.findIndex(e => r(e.dataRef.current.value));
            return i !== -1 && (n = i), { ...e,
                frozenValue: !1,
                pendingFocus: t.focus,
                listboxState: 0,
                activeOptionIndex: n,
                __demoMode: !1,
                buttonPositionState: q.Idle
            }
        },
        2(e, t) {
            if (e.dataRef.current.disabled || e.listboxState === 1) return e;
            let n = { ...e,
                searchQuery: ``,
                activationTrigger: t.trigger ?? 1,
                __demoMode: !1
            };
            if (t.focus === G.Nothing) return { ...n,
                activeOptionIndex: null
            };
            if (t.focus === G.Specific) return { ...n,
                activeOptionIndex: e.options.findIndex(e => e.id === t.id)
            };
            if (t.focus === G.Previous) {
                let r = e.activeOptionIndex;
                if (r !== null) {
                    let i = e.options[r].dataRef.current.domRef,
                        a = W(t, {
                            resolveItems: () => e.options,
                            resolveActiveIndex: () => e.activeOptionIndex,
                            resolveId: e => e.id,
                            resolveDisabled: e => e.dataRef.current.disabled
                        });
                    if (a !== null) {
                        let t = e.options[a].dataRef.current.domRef;
                        if (i.current ?.previousElementSibling === t.current || t.current ?.previousElementSibling === null) return { ...n,
                            activeOptionIndex: a
                        }
                    }
                }
            } else if (t.focus === G.Next) {
                let r = e.activeOptionIndex;
                if (r !== null) {
                    let i = e.options[r].dataRef.current.domRef,
                        a = W(t, {
                            resolveItems: () => e.options,
                            resolveActiveIndex: () => e.activeOptionIndex,
                            resolveId: e => e.id,
                            resolveDisabled: e => e.dataRef.current.disabled
                        });
                    if (a !== null) {
                        let t = e.options[a].dataRef.current.domRef;
                        if (i.current ?.nextElementSibling === t.current || t.current ?.nextElementSibling === null) return { ...n,
                            activeOptionIndex: a
                        }
                    }
                }
            }
            let r = Ae(e),
                i = W(t, {
                    resolveItems: () => r.options,
                    resolveActiveIndex: () => r.activeOptionIndex,
                    resolveId: e => e.id,
                    resolveDisabled: e => e.dataRef.current.disabled
                });
            return { ...n,
                ...r,
                activeOptionIndex: i
            }
        },
        3: (e, t) => {
            if (e.dataRef.current.disabled || e.listboxState === 1) return e;
            let n = e.searchQuery === `` ? 1 : 0,
                r = e.searchQuery + t.value.toLowerCase(),
                i = (e.activeOptionIndex === null ? e.options : e.options.slice(e.activeOptionIndex + n).concat(e.options.slice(0, e.activeOptionIndex + n))).find(e => !e.dataRef.current.disabled && e.dataRef.current.textValue ?.startsWith(r)),
                a = i ? e.options.indexOf(i) : -1;
            return a === -1 || a === e.activeOptionIndex ? { ...e,
                searchQuery: r
            } : { ...e,
                searchQuery: r,
                activeOptionIndex: a,
                activationTrigger: 1
            }
        },
        4(e) {
            return e.dataRef.current.disabled || e.listboxState === 1 || e.searchQuery === `` ? e : { ...e,
                searchQuery: ``
            }
        },
        5(e) {
            return e.dataRef.current.mode === 0 ? { ...e,
                frozenValue: !0
            } : { ...e
            }
        },
        6: (e, t) => {
            let n = e.options.concat(t.options),
                r = e.activeOptionIndex;
            if (e.pendingFocus.focus !== G.Nothing && (r = W(e.pendingFocus, {
                    resolveItems: () => n,
                    resolveActiveIndex: () => e.activeOptionIndex,
                    resolveId: e => e.id,
                    resolveDisabled: e => e.dataRef.current.disabled
                })), e.activeOptionIndex === null) {
                let {
                    isSelected: t
                } = e.dataRef.current;
                if (t) {
                    let e = n.findIndex(e => t ?.(e.dataRef.current.value));
                    e !== -1 && (r = e)
                }
            }
            return { ...e,
                options: n,
                activeOptionIndex: r,
                pendingFocus: {
                    focus: G.Nothing
                },
                pendingShouldSort: !0
            }
        },
        7: (e, t) => {
            let n = e.options,
                r = [],
                i = new Set(t.options);
            for (let [e, t] of n.entries())
                if (i.has(t.id) && (r.push(e), i.delete(t.id), i.size === 0)) break;
            if (r.length > 0) {
                n = n.slice();
                for (let e of r.reverse()) n.splice(e, 1)
            }
            return { ...e,
                options: n,
                activationTrigger: 1
            }
        },
        8: (e, t) => e.buttonElement === t.element ? e : { ...e,
            buttonElement: t.element
        },
        9: (e, t) => e.optionsElement === t.element ? e : { ...e,
            optionsElement: t.element
        },
        10: e => e.pendingShouldSort ? { ...e,
            ...Ae(e),
            pendingShouldSort: !1
        } : e,
        11(e) {
            return e.buttonPositionState.kind === `Tracked` ? { ...e,
                buttonPositionState: q.Moved
            } : e
        }
    },
    Me = class e extends o {
        constructor(e) {
            super(e), Oe(this, `actions`, {
                onChange: e => {
                    let {
                        onChange: t,
                        compare: n,
                        mode: r,
                        value: i
                    } = this.state.dataRef.current;
                    return y(r, {
                        0: () => t ?.(e),
                        1: () => {
                            let r = i.slice(),
                                a = r.findIndex(t => n(t, e));
                            return a === -1 ? r.push(e) : r.splice(a, 1), t ?.(r)
                        }
                    })
                },
                registerOption: c(() => {
                    let e = [],
                        t = new Set;
                    return [(n, r) => {
                        t.has(r) || (t.add(r), e.push({
                            id: n,
                            dataRef: r
                        }))
                    }, () => (t.clear(), this.send({
                        type: 6,
                        options: e.splice(0)
                    }))]
                }),
                unregisterOption: c(() => {
                    let e = [];
                    return [t => e.push(t), () => {
                        this.send({
                            type: 7,
                            options: e.splice(0)
                        })
                    }]
                }),
                goToOption: c(() => {
                    let e = null;
                    return [(t, n) => {
                        e = {
                            type: 2,
                            ...t,
                            trigger: n
                        }
                    }, () => e && this.send(e)]
                }),
                closeListbox: () => {
                    this.send({
                        type: 1
                    })
                },
                openListbox: e => {
                    this.send({
                        type: 0,
                        focus: e
                    })
                },
                selectActiveOption: () => {
                    var e;
                    if (this.state.activeOptionIndex !== null) {
                        let {
                            dataRef: e
                        } = this.state.options[this.state.activeOptionIndex];
                        this.actions.selectOption(e.current.value)
                    } else this.state.dataRef.current.mode === 0 && (this.actions.closeListbox(), (e = this.state.buttonElement) == null || e.focus({
                        preventScroll: !0
                    }))
                },
                selectOption: e => {
                    this.send({
                        type: 5,
                        value: e
                    })
                },
                search: e => {
                    this.send({
                        type: 3,
                        value: e
                    })
                },
                clearSearch: () => {
                    this.send({
                        type: 4
                    })
                },
                setButtonElement: e => {
                    this.send({
                        type: 8,
                        element: e
                    })
                },
                setOptionsElement: e => {
                    this.send({
                        type: 9,
                        element: e
                    })
                }
            }), Oe(this, `selectors`, {
                activeDescendantId(e) {
                    var t;
                    let n = e.activeOptionIndex,
                        r = e.options;
                    return n === null || (t = r[n]) == null ? void 0 : t.id
                },
                isActive(e, t) {
                    let n = e.activeOptionIndex,
                        r = e.options;
                    return n === null ? !1 : r[n] ?.id === t
                },
                hasFrozenValue(e) {
                    return e.frozenValue
                },
                shouldScrollIntoView(e, t) {
                    return e.__demoMode || e.listboxState !== 0 || e.activationTrigger === 0 ? !1 : this.isActive(e, t)
                },
                didButtonMove(e) {
                    return e.buttonPositionState.kind === `Moved`
                }
            }), this.on(6, () => {
                requestAnimationFrame(() => {
                    this.send({
                        type: 10
                    })
                })
            }); {
                let e = this.state.id,
                    t = f.get(null);
                this.disposables.add(t.on(d.Push, n => {
                    !t.selectors.isTop(n, e) && this.state.listboxState === 0 && this.actions.closeListbox()
                })), this.on(0, () => t.actions.push(e)), this.on(1, () => t.actions.pop(e))
            }
            this.disposables.group(e => {
                this.on(1, t => {
                    t.buttonElement && (e.dispose(), e.add(xe(t.buttonElement, t.buttonPositionState, () => {
                        this.send({
                            type: 11
                        })
                    })))
                })
            }), this.on(5, (e, t) => {
                var n;
                this.actions.onChange(t.value), this.state.dataRef.current.mode === 0 && (this.actions.closeListbox(), (n = this.state.buttonElement) == null || n.focus({
                    preventScroll: !0
                }))
            })
        }
        static new({
            id: t,
            __demoMode: n = !1
        }) {
            return new e({
                id: t,
                dataRef: {
                    current: {}
                },
                listboxState: n ? 0 : 1,
                options: [],
                searchQuery: ``,
                activeOptionIndex: null,
                activationTrigger: 1,
                buttonElement: null,
                optionsElement: null,
                pendingShouldSort: !1,
                pendingFocus: {
                    focus: G.Nothing
                },
                frozenValue: !1,
                __demoMode: n,
                buttonPositionState: q.Idle
            })
        }
        reduce(e, t) {
            return y(t.type, je, e, t)
        }
    },
    Z = e(t(), 1),
    Ne = (0, Z.createContext)(null);

function Pe(e) {
    let t = (0, Z.useContext)(Ne);
    if (t === null) {
        let t = Error(`<${e} /> is missing a parent <Listbox /> component.`);
        throw Error.captureStackTrace && Error.captureStackTrace(t, Fe), t
    }
    return t
}

function Fe({
    id: e,
    __demoMode: t = !1
}) {
    let n = (0, Z.useMemo)(() => Me.new({
        id: e,
        __demoMode: t
    }), []);
    return M(() => n.dispose()), n
}
var Ie = R(),
    Q = (0, Z.createContext)(null);
Q.displayName = `ListboxDataContext`;

function $(e) {
    let t = (0, Z.useContext)(Q);
    if (t === null) {
        let t = Error(`<${e} /> is missing a parent <Listbox /> component.`);
        throw Error.captureStackTrace && Error.captureStackTrace(t, $), t
    }
    return t
}
var Le = Z.Fragment;

function Re(e, t) {
    let n = (0, x.useId)(),
        r = ne(),
        {
            value: a,
            defaultValue: o,
            form: c,
            name: l,
            onChange: d,
            by: m,
            invalid: h = !1,
            disabled: g = r || !1,
            horizontal: _ = !1,
            multiple: b = !1,
            __demoMode: S = !1,
            ...w
        } = e,
        D = _ ? `horizontal` : `vertical`,
        O = s(t),
        k = ce(o),
        [A = b ? [] : void 0, j] = se(a, d, k),
        M = Fe({
            id: n,
            __demoMode: S
        }),
        ee = (0, Z.useRef)({
            static: !1,
            hold: !1
        }),
        N = (0, Z.useRef)(new Map),
        I = ue(m),
        te = (0, Z.useCallback)(e => y(L.mode, {
            [Y.Multi]: () => A.some(t => I(t, e)),
            [Y.Single]: () => I(A, e)
        }), [A]),
        L = C({
            value: A,
            disabled: g,
            invalid: h,
            mode: b ? Y.Multi : Y.Single,
            orientation: D,
            onChange: j,
            compare: I,
            isSelected: te,
            optionsPropsRef: ee,
            listRef: N
        });
    E(() => {
        M.state.dataRef.current = L
    }, [L]);
    let R = u(M, e => e.listboxState),
        z = f.get(null),
        B = u(z, (0, Z.useCallback)(e => z.selectors.isTop(e, n), [z, n])),
        [V, re] = u(M, e => [e.buttonElement, e.optionsElement]);
    T(B, [V, re], (e, t) => {
        M.send({
            type: ke.CloseListbox
        }), p(t, i.Loose) || (e.preventDefault(), V ?.focus())
    });
    let H = C({
            open: R === J.Open,
            disabled: g,
            invalid: h,
            value: A
        }),
        [U, ae] = ie({
            inherit: !0
        }),
        oe = {
            ref: O
        },
        le = (0, Z.useCallback)(() => {
            if (k !== void 0) return j ?.(k)
        }, [j, k]),
        fe = P();
    return Z.createElement(ae, {
        value: U,
        props: {
            htmlFor: V ?.id
        },
        slot: {
            open: R === J.Open,
            disabled: g
        }
    }, Z.createElement(ye, null, Z.createElement(Ne.Provider, {
        value: M
    }, Z.createElement(Q.Provider, {
        value: L
    }, Z.createElement(F, {
        value: y(R, {
            [J.Open]: v.Open,
            [J.Closed]: v.Closed
        })
    }, l != null && A != null && Z.createElement(de, {
        disabled: g,
        data: {
            [l]: A
        },
        form: c,
        onReset: le
    }), fe({
        ourProps: oe,
        theirProps: w,
        slot: H,
        defaultTag: Le,
        name: `Listbox`
    }))))))
}
var ze = `button`;

function Be(e, t) {
    let n = (0, x.useId)(),
        i = V(),
        a = $(`Listbox.Button`),
        o = Pe(`Listbox.Button`),
        {
            id: c = i || `headlessui-listbox-button-${n}`,
            disabled: d = a.disabled || !1,
            autoFocus: f = !1,
            ...p
        } = e,
        m = s(t, Se(), o.actions.setButtonElement),
        g = we(),
        [_, v, y] = u(o, e => [e.listboxState, e.buttonElement, e.optionsElement]);
    be(_ === J.Open, {
        trigger: v,
        action: (0, Z.useCallback)(e => {
            if (v != null && v.contains(e.target)) return K.Ignore;
            let t = e.target.closest(`[role="option"]:not([data-disabled])`);
            return h(t) ? K.Select(t) : y != null && y.contains(e.target) ? K.Ignore : K.Close
        }, [v, y]),
        close: o.actions.closeListbox,
        select: o.actions.selectActiveOption
    });
    let b = N(e => {
            switch (e.key) {
                case l.Enter:
                    fe(e.currentTarget);
                    break;
                case l.Space:
                case l.ArrowDown:
                    e.preventDefault(), o.actions.openListbox({
                        focus: a.value ? G.Nothing : G.First
                    });
                    break;
                case l.ArrowUp:
                    e.preventDefault(), o.actions.openListbox({
                        focus: a.value ? G.Nothing : G.Last
                    });
                    break
            }
        }),
        S = N(e => {
            switch (e.key) {
                case l.Space:
                    e.preventDefault();
                    break
            }
        }),
        w = _e(e => {
            var t;
            o.state.listboxState === J.Open ? ((0, Ie.flushSync)(() => o.actions.closeListbox()), (t = o.state.buttonElement) == null || t.focus({
                preventScroll: !0
            })) : (e.preventDefault(), o.actions.openListbox({
                focus: G.Nothing
            }))
        }),
        T = N(e => e.preventDefault()),
        E = U([c]),
        O = r(),
        {
            isFocusVisible: k,
            focusProps: A
        } = oe({
            autoFocus: f
        }),
        {
            isHovered: j,
            hoverProps: M
        } = re({
            isDisabled: d
        }),
        {
            pressed: ee,
            pressProps: F
        } = H({
            disabled: d
        }),
        I = C({
            open: _ === J.Open,
            active: ee || _ === J.Open,
            disabled: d,
            invalid: a.invalid,
            value: a.value,
            hover: j,
            focus: k,
            autofocus: f
        }),
        te = u(o, e => e.listboxState === J.Open),
        ne = D(g(), {
            ref: m,
            id: c,
            type: ae(e, v),
            "aria-haspopup": `listbox`,
            "aria-controls": y ?.id,
            "aria-expanded": te,
            "aria-labelledby": E,
            "aria-describedby": O,
            disabled: d || void 0,
            autoFocus: f,
            onKeyDown: b,
            onKeyUp: S,
            onKeyPress: T
        }, w, A, M, F);
    return P()({
        ourProps: ne,
        theirProps: p,
        slot: I,
        defaultTag: ze,
        name: `Listbox.Button`
    })
}
var Ve = (0, Z.createContext)(!1),
    He = `div`,
    Ue = I.RenderStrategy | I.Static;

function We(e, t) {
    let r = (0, x.useId)(),
        {
            id: i = `headlessui-listbox-options-${r}`,
            anchor: o,
            portal: c = !1,
            modal: d = !0,
            transition: f = !1,
            ...p
        } = e,
        h = he(o),
        [g, _] = (0, Z.useState)(null);
    h && (c = !0);
    let T = $(`Listbox.Options`),
        E = Pe(`Listbox.Options`),
        [A, M, F, I] = u(E, e => [e.listboxState, e.buttonElement, e.optionsElement, e.__demoMode]),
        ne = k(M),
        L = k(F),
        R = te(),
        [B, V] = b(f, g, R === null ? A === J.Open : (R & v.Open) === v.Open);
    O(B, M, E.actions.closeListbox), ee(I ? !1 : d && A === J.Open, L), n(I ? !1 : d && A === J.Open, {
        allowed: (0, Z.useCallback)(() => [M, F], [M, F])
    });
    let re = u(E, E.selectors.didButtonMove) ? !1 : B,
        ie = le(u(E, E.selectors.hasFrozenValue) && !e.static, T.value),
        H = (0, Z.useCallback)(e => T.compare(ie, e), [T.compare, ie]),
        U = u(E, e => {
            var t;
            if (h == null || !((t = h ?.to) != null && t.includes(`selection`))) return null;
            let n = e.options.findIndex(e => H(e.dataRef.current.value));
            return n === -1 && (n = 0), n
        }),
        [ae, oe] = me((() => {
            if (h == null) return;
            if (U === null) return { ...h,
                inner: void 0
            };
            let e = Array.from(T.listRef.current.values());
            return { ...h,
                inner: {
                    listRef: {
                        current: e
                    },
                    index: U
                }
            }
        })()),
        se = ve(),
        ce = s(t, h ? ae : null, E.actions.setOptionsElement, _),
        ue = w();
    (0, Z.useEffect)(() => {
        let e = F;
        e && A === J.Open && (z(e) || e == null || e.focus({
            preventScroll: !0
        }))
    }, [A, F]);
    let de = N(e => {
            var t;
            switch (ue.dispose(), e.key) {
                case l.Space:
                    if (E.state.searchQuery !== ``) return e.preventDefault(), e.stopPropagation(), E.actions.search(e.key);
                case l.Enter:
                    e.preventDefault(), e.stopPropagation(), E.actions.selectActiveOption();
                    break;
                case y(T.orientation, {
                    vertical: l.ArrowDown,
                    horizontal: l.ArrowRight
                }):
                    return e.preventDefault(), e.stopPropagation(), E.actions.goToOption({
                        focus: G.Next
                    });
                case y(T.orientation, {
                    vertical: l.ArrowUp,
                    horizontal: l.ArrowLeft
                }):
                    return e.preventDefault(), e.stopPropagation(), E.actions.goToOption({
                        focus: G.Previous
                    });
                case l.Home:
                case l.PageUp:
                    return e.preventDefault(), e.stopPropagation(), E.actions.goToOption({
                        focus: G.First
                    });
                case l.End:
                case l.PageDown:
                    return e.preventDefault(), e.stopPropagation(), E.actions.goToOption({
                        focus: G.Last
                    });
                case l.Escape:
                    e.preventDefault(), e.stopPropagation(), (0, Ie.flushSync)(() => E.actions.closeListbox()), (t = E.state.buttonElement) == null || t.focus({
                        preventScroll: !0
                    });
                    return;
                case l.Tab:
                    e.preventDefault(), e.stopPropagation(), (0, Ie.flushSync)(() => E.actions.closeListbox()), m(E.state.buttonElement, e.shiftKey ? a.Previous : a.Next);
                    break;
                default:
                    e.key.length === 1 && (E.actions.search(e.key), ue.setTimeout(() => E.actions.clearSearch(), 350));
                    break
            }
        }),
        fe = u(E, e => e.buttonElement ?.id),
        W = C({
            open: A === J.Open
        }),
        ge = D(h ? se() : {}, {
            id: i,
            ref: ce,
            "aria-activedescendant": u(E, E.selectors.activeDescendantId),
            "aria-multiselectable": T.mode === Y.Multi ? !0 : void 0,
            "aria-labelledby": fe,
            "aria-orientation": T.orientation,
            onKeyDown: de,
            role: `listbox`,
            tabIndex: A === J.Open ? 0 : void 0,
            style: { ...p.style,
                ...oe,
                "--button-width": pe(B, M, !0).width
            },
            ...S(V)
        }),
        _e = P(),
        K = (0, Z.useMemo)(() => T.mode === Y.Multi ? T : { ...T,
            isSelected: H
        }, [T, H]);
    return Z.createElement(j, {
        enabled: c ? e.static || B : !1,
        ownerDocument: ne
    }, Z.createElement(Q.Provider, {
        value: K
    }, _e({
        ourProps: ge,
        theirProps: p,
        slot: W,
        defaultTag: He,
        features: Ue,
        visible: re,
        name: `Listbox.Options`
    })))
}
var Ge = `div`;

function Ke(e, t) {
    let n = (0, x.useId)(),
        {
            id: r = `headlessui-listbox-option-${n}`,
            disabled: i = !1,
            value: a,
            ...o
        } = e,
        c = (0, Z.useContext)(Ve) === !0,
        l = $(`Listbox.Option`),
        d = Pe(`Listbox.Option`),
        f = u(d, e => d.selectors.isActive(e, r)),
        p = l.isSelected(a),
        m = (0, Z.useRef)(null),
        h = Te(m),
        _ = A({
            disabled: i,
            value: a,
            domRef: m,
            get textValue() {
                return h()
            }
        }),
        v = s(t, m, e => {
            e ? l.listRef.current.set(r, e) : l.listRef.current.delete(r)
        }),
        y = u(d, e => d.selectors.shouldScrollIntoView(e, r));
    E(() => {
        if (y) return g().requestAnimationFrame(() => {
            var e, t;
            (t = (e = m.current) ?.scrollIntoView) == null || t.call(e, {
                block: `nearest`
            })
        })
    }, [y, m]), E(() => {
        if (!c) return d.actions.registerOption(r, _), () => d.actions.unregisterOption(r)
    }, [_, r, c]);
    let b = N(e => {
            if (i) return e.preventDefault();
            d.actions.selectOption(a)
        }),
        S = N(() => {
            if (i) return d.actions.goToOption({
                focus: G.Nothing
            });
            d.actions.goToOption({
                focus: G.Specific,
                id: r
            })
        }),
        w = ge(),
        T = N(e => w.update(e)),
        D = N(e => {
            w.wasMoved(e) && (i || f && d.state.activationTrigger === X.Pointer || d.actions.goToOption({
                focus: G.Specific,
                id: r
            }, X.Pointer))
        }),
        O = N(e => {
            w.wasMoved(e) && (i || f && d.state.activationTrigger === X.Pointer && d.actions.goToOption({
                focus: G.Nothing
            }))
        }),
        k = C({
            active: f,
            focus: f,
            selected: p,
            disabled: i,
            selectedOption: p && c
        }),
        j = c ? {} : {
            id: r,
            ref: v,
            role: `option`,
            tabIndex: i === !0 ? void 0 : -1,
            "aria-disabled": i === !0 ? !0 : void 0,
            "aria-selected": p,
            disabled: void 0,
            onClick: b,
            onFocus: S,
            onPointerEnter: T,
            onMouseEnter: T,
            onPointerMove: D,
            onMouseMove: D,
            onPointerLeave: O,
            onMouseLeave: O
        },
        M = P();
    return !p && c ? null : M({
        ourProps: j,
        theirProps: o,
        slot: k,
        defaultTag: Ge,
        name: `Listbox.Option`
    })
}
var qe = Z.Fragment;

function Je(e, t) {
    let {
        options: n,
        placeholder: r,
        ...i
    } = e, a = {
        ref: s(t)
    }, o = $(`ListboxSelectedOption`), c = C({}), l = o.value === void 0 || o.value === null || o.mode === Y.Multi && Array.isArray(o.value) && o.value.length === 0, u = P();
    return Z.createElement(Ve.Provider, {
        value: !0
    }, u({
        ourProps: a,
        theirProps: { ...i,
            children: Z.createElement(Z.Fragment, null, r && l ? r : n)
        },
        slot: c,
        defaultTag: qe,
        name: `ListboxSelectedOption`
    }))
}
var Ye = _(Re),
    Xe = _(Be),
    Ze = B,
    Qe = _(We),
    $e = _(Ke),
    et = _(Je),
    tt = Object.assign(Ye, {
        Button: Xe,
        Label: Ze,
        Options: Qe,
        Option: $e,
        SelectedOption: et
    });
export {
    Xe as i, $e as n, tt as r, Qe as t
};
//# sourceMappingURL=listbox-DApQl8aJ.js.map