import {
    n as e
} from "./chunk-B3K2TuZy.js";
import {
    a as t,
    n,
    o as r,
    t as i
} from "./compiler-runtime-4XzsAixn.js";
import {
    H as a,
    K as o,
    L as s,
    V as c,
    at as l,
    bt as u,
    c as d,
    ct as f,
    d as p,
    et as m,
    f as h,
    ft as g,
    it as _,
    l as v,
    ot as y,
    pt as b,
    rt as x,
    s as S,
    tt as C,
    u as w
} from "./portal-CtSeHqeD.js";
import {
    t as T
} from "./createLucideIcon-B6eqxZGx.js";
import {
    n as E,
    t as D
} from "./x-C-xfXjAs.js";
import {
    t as O
} from "./chevron-down-lr6ML0Sy.js";
import {
    t as k
} from "./chevron-left-BNjctt6l.js";
import {
    t as A
} from "./upload-BdrLhzzp.js";
import {
    d as ee,
    l as te,
    o as j,
    t as ne,
    u as re
} from "./use-resolve-button-type-BJQyyNxN.js";
import {
    i as ie,
    n as M,
    r as ae,
    t as oe,
    u as se
} from "./dialog-C2QVAJ1w.js";
import {
    t as ce
} from "./TextInput-BZJP6ajZ.js";
import {
    A as le,
    D as ue,
    E as N,
    F as de,
    M as fe,
    N as pe,
    O as P,
    P as F,
    T as me,
    b as I,
    d as L,
    f as R,
    j as z,
    k as B,
    l as he,
    n as ge,
    t as _e,
    w as ve,
    y as ye
} from "./v4-DqHAiBF8.js";
var be = T(`image`, [
        [`rect`, {
            width: `18`,
            height: `18`,
            x: `3`,
            y: `3`,
            rx: `2`,
            ry: `2`,
            key: `1m3agn`
        }],
        [`circle`, {
            cx: `9`,
            cy: `9`,
            r: `2`,
            key: `af1f0g`
        }],
        [`path`, {
            d: `m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21`,
            key: `1xmnt7`
        }]
    ]),
    xe = T(`info`, [
        [`circle`, {
            cx: `12`,
            cy: `12`,
            r: `10`,
            key: `1mglay`
        }],
        [`path`, {
            d: `M12 16v-4`,
            key: `1dtifu`
        }],
        [`path`, {
            d: `M12 8h.01`,
            key: `e9boi3`
        }]
    ]),
    V = e(r(), 1),
    Se = V.startTransition ?? function(e) {
        e()
    },
    Ce = (e => (e[e.Open = 0] = `Open`, e[e.Closed = 1] = `Closed`, e))(Ce || {}),
    we = (e => (e[e.ToggleDisclosure = 0] = `ToggleDisclosure`, e[e.CloseDisclosure = 1] = `CloseDisclosure`, e[e.SetButtonId = 2] = `SetButtonId`, e[e.SetPanelId = 3] = `SetPanelId`, e[e.SetButtonElement = 4] = `SetButtonElement`, e[e.SetPanelElement = 5] = `SetPanelElement`, e))(we || {}),
    Te = {
        0: e => ({ ...e,
            disclosureState: f(e.disclosureState, {
                0: 1,
                1: 0
            })
        }),
        1: e => e.disclosureState === 1 ? e : { ...e,
            disclosureState: 1
        },
        2(e, t) {
            return e.buttonId === t.buttonId ? e : { ...e,
                buttonId: t.buttonId
            }
        },
        3(e, t) {
            return e.panelId === t.panelId ? e : { ...e,
                panelId: t.panelId
            }
        },
        4(e, t) {
            return e.buttonElement === t.element ? e : { ...e,
                buttonElement: t.element
            }
        },
        5(e, t) {
            return e.panelElement === t.element ? e : { ...e,
                panelElement: t.element
            }
        }
    },
    H = (0, V.createContext)(null);
H.displayName = `DisclosureContext`;

function U(e) {
    let t = (0, V.useContext)(H);
    if (t === null) {
        let t = Error(`<${e} /> is missing a parent <Disclosure /> component.`);
        throw Error.captureStackTrace && Error.captureStackTrace(t, U), t
    }
    return t
}
var W = (0, V.createContext)(null);
W.displayName = `DisclosureAPIContext`;

function G(e) {
    let t = (0, V.useContext)(W);
    if (t === null) {
        let t = Error(`<${e} /> is missing a parent <Disclosure /> component.`);
        throw Error.captureStackTrace && Error.captureStackTrace(t, G), t
    }
    return t
}
var K = (0, V.createContext)(null);
K.displayName = `DisclosurePanelContext`;

function Ee() {
    return (0, V.useContext)(K)
}

function De(e, t) {
    return f(t.type, Te, e, t)
}
var Oe = V.Fragment;

function ke(e, t) {
    let {
        defaultOpen: n = !1,
        ...r
    } = e, i = (0, V.useRef)(null), s = a(t, c(e => {
        i.current = e
    }, e.as === void 0 || y(e.as))), l = (0, V.useReducer)(De, {
        disclosureState: n ? 0 : 1,
        buttonElement: null,
        panelElement: null,
        buttonId: null,
        panelId: null
    }), [{
        disclosureState: p,
        buttonId: m
    }, h] = l, _ = b(e => {
        h({
            type: 1
        });
        let t = u(i.current);
        !t || !m || (() => e ? o(e) ? e : `current` in e && o(e.current) ? e.current : t.getElementById(m) : t.getElementById(m))() ?.focus()
    }), v = (0, V.useMemo)(() => ({
        close: _
    }), [_]), C = g({
        open: p === 0,
        close: _
    }), w = {
        ref: s
    }, T = x();
    return V.createElement(H.Provider, {
        value: l
    }, V.createElement(W.Provider, {
        value: v
    }, V.createElement(se, {
        value: _
    }, V.createElement(S, {
        value: f(p, {
            0: d.Open,
            1: d.Closed
        })
    }, T({
        ourProps: w,
        theirProps: r,
        slot: C,
        defaultTag: Oe,
        name: `Disclosure`
    })))))
}
var Ae = `button`;

function je(e, t) {
    let n = (0, m.useId)(),
        {
            id: r = `headlessui-disclosure-button-${n}`,
            disabled: i = !1,
            autoFocus: o = !1,
            ...c
        } = e,
        [l, u] = U(`Disclosure.Button`),
        d = Ee(),
        f = d === null ? !1 : d === l.panelId,
        p = a((0, V.useRef)(null), t, b(e => {
            if (!f) return u({
                type: 4,
                element: e
            })
        }));
    (0, V.useEffect)(() => {
        if (!f) return u({
            type: 2,
            buttonId: r
        }), () => {
            u({
                type: 2,
                buttonId: null
            })
        }
    }, [r, u, f]);
    let h = b(e => {
            var t;
            if (f) {
                if (l.disclosureState === 1) return;
                switch (e.key) {
                    case s.Space:
                    case s.Enter:
                        e.preventDefault(), e.stopPropagation(), u({
                            type: 0
                        }), (t = l.buttonElement) == null || t.focus();
                        break
                }
            } else switch (e.key) {
                case s.Space:
                case s.Enter:
                    e.preventDefault(), e.stopPropagation(), u({
                        type: 0
                    });
                    break
            }
        }),
        v = b(e => {
            switch (e.key) {
                case s.Space:
                    e.preventDefault();
                    break
            }
        }),
        y = b(e => {
            var t;
            j(e.currentTarget) || i || (f ? (u({
                type: 0
            }), (t = l.buttonElement) == null || t.focus()) : u({
                type: 0
            }))
        }),
        {
            isFocusVisible: S,
            focusProps: C
        } = re({
            autoFocus: o
        }),
        {
            isHovered: w,
            hoverProps: T
        } = ee({
            isDisabled: i
        }),
        {
            pressed: E,
            pressProps: D
        } = te({
            disabled: i
        }),
        O = g({
            open: l.disclosureState === 0,
            hover: w,
            active: E,
            disabled: i,
            focus: S,
            autofocus: o
        }),
        k = ne(e, l.buttonElement),
        A = _(f ? {
            ref: p,
            type: k,
            disabled: i || void 0,
            autoFocus: o,
            onKeyDown: h,
            onClick: y
        } : {
            ref: p,
            id: r,
            type: k,
            "aria-expanded": l.disclosureState === 0,
            "aria-controls": l.panelElement ? l.panelId : void 0,
            disabled: i || void 0,
            autoFocus: o,
            onKeyDown: h,
            onKeyUp: v,
            onClick: y
        }, C, T, D);
    return x()({
        ourProps: A,
        theirProps: c,
        slot: O,
        defaultTag: Ae,
        name: `Disclosure.Button`
    })
}
var Me = `div`,
    Ne = C.RenderStrategy | C.Static;

function Pe(e, t) {
    let n = (0, m.useId)(),
        {
            id: r = `headlessui-disclosure-panel-${n}`,
            transition: i = !1,
            ...o
        } = e,
        [s, c] = U(`Disclosure.Panel`),
        {
            close: l
        } = G(`Disclosure.Panel`),
        [u, f] = (0, V.useState)(null),
        _ = a(t, b(e => {
            Se(() => c({
                type: 5,
                element: e
            }))
        }), f);
    (0, V.useEffect)(() => (c({
        type: 3,
        panelId: r
    }), () => {
        c({
            type: 3,
            panelId: null
        })
    }), [r, c]);
    let y = w(),
        [S, C] = p(i, u, y === null ? s.disclosureState === 0 : (y & d.Open) === d.Open),
        T = g({
            open: s.disclosureState === 0,
            close: l
        }),
        E = {
            ref: _,
            id: r,
            ...h(C)
        },
        D = x();
    return V.createElement(v, null, V.createElement(K.Provider, {
        value: s.panelId
    }, D({
        ourProps: E,
        theirProps: o,
        slot: T,
        defaultTag: Me,
        features: Ne,
        visible: S,
        name: `Disclosure.Panel`
    })))
}
var Fe = l(ke),
    q = l(je),
    J = l(Pe),
    Ie = Object.assign(Fe, {
        Button: q,
        Panel: J
    }),
    Y = e(t()),
    Le = {
        "image/png": `PNG`,
        "image/jpeg": `JPG`,
        "image/gif": `GIF`,
        "image/webp": `WebP`
    };

function Re(e) {
    return Le[e] ?? e.split(`/`)[1] ?.toUpperCase()
}

function ze(e) {
    let t = e.map(Re);
    return t.length <= 1 ? t.join(``) : t.length === 2 ? t.join(` or `) : `${t.slice(0,-1).join(`, `)}, or ${t[t.length-1]}`
}

function X({
    onImageSelect: e,
    onError: t,
    maxSize: r = 10 * 1024 * 1024,
    acceptedFormats: i = [`image/png`, `image/jpeg`, `image/gif`],
    className: a = ``
}) {
    let {
        t: o
    } = n(`platform`), s = (0, V.useRef)(_e()), [c, l] = (0, V.useState)(!1), [u, d] = (0, V.useState)(null), [f, p] = (0, V.useState)(null), m = r / 1024 / 1024, h = (0, V.useCallback)(n => {
        if (p(null), !i.includes(n.type)) {
            let e = o(`components.image_upload.error_invalid_format`, {
                formats: ze(i)
            });
            p(e), t ?.(e);
            return
        }
        if (n.size > r) {
            let e = o(`components.image_upload.error_too_large`, {
                maxSizeInMb: m
            });
            p(e), t ?.(e);
            return
        }
        d(n.name), e ?.(n)
    }, [i, r, t, e, o, m]), g = (0, V.useCallback)(e => {
        e.preventDefault(), e.stopPropagation(), l(!0)
    }, []), _ = (0, V.useCallback)(e => {
        e.preventDefault(), e.stopPropagation(), l(!1)
    }, []), v = (0, V.useCallback)(e => {
        e.preventDefault(), e.stopPropagation()
    }, []), y = (0, V.useCallback)(e => {
        e.preventDefault(), e.stopPropagation(), l(!1);
        let t = e.dataTransfer.files;
        t.length > 0 && h(t[0])
    }, [h]), b = (0, V.useCallback)(e => {
        let t = e.target.files;
        t && t.length > 0 && h(t[0])
    }, [h]), x = (0, V.useCallback)(() => {
        d(null), p(null), e ?.(null)
    }, [e]);
    return (0, Y.jsxs)(`div`, {
        className: `relative ${a}`,
        children: [(0, Y.jsx)(`input`, {
            type: `file`,
            id: s.current,
            accept: i.join(`,`),
            onChange: b,
            className: `sr-only`
        }), u ? (0, Y.jsxs)(`div`, {
            className: `flex items-center gap-2 px-3 py-2 min-h-[42px] border border-border rounded-lg bg-surface`,
            children: [(0, Y.jsx)(be, {
                className: `w-4 h-4 text-heading shrink-0`
            }), (0, Y.jsx)(`span`, {
                className: `text-sm flex-1 truncate`,
                children: u
            }), (0, Y.jsx)(`button`, {
                type: `button`,
                onClick: x,
                className: `p-1 rounded hover:bg-surface-muted transition-colors shrink-0`,
                "aria-label": o(`components.image_upload.remove`),
                children: (0, Y.jsx)(D, {
                    className: `w-4 h-4 text-muted hover:text-heading`
                })
            })]
        }) : (0, Y.jsxs)(`label`, {
            htmlFor: s.current,
            onDragEnter: g,
            onDragLeave: _,
            onDragOver: v,
            onDrop: y,
            className: `
						flex items-center gap-2 px-3 py-2 min-h-[42px] cursor-pointer
						border border-border rounded-lg
						transition-colors
						${c?`bg-surface-active border-heading`:f?`border-red-400 bg-red-50`:`bg-surface hover:bg-surface-muted`}
					`,
            children: [(0, Y.jsx)(A, {
                className: `w-4 h-4 text-muted shrink-0`
            }), (0, Y.jsx)(`span`, {
                className: `text-sm ${f?`text-red-600`:`text-subtle`}`,
                children: f || o(`components.image_upload.drag_or_click`)
            })]
        })]
    })
}
var Z = i();

function Q(e) {
    let t = (0, Z.c)(7),
        {
            selectedKeys: r,
            onToggle: i,
            lockedKeys: a
        } = e,
        {
            t: o
        } = n(`card-creator`),
        s;
    t[0] !== a || t[1] !== i || t[2] !== r || t[3] !== o ? (s = fe.map(e => {
        let t = F(e.type).map(e => o(de[e].label)).join(`, `);
        return (0, Y.jsxs)(`div`, {
            className: `space-y-1.5`,
            children: [(0, Y.jsxs)(`div`, {
                children: [(0, Y.jsx)(`p`, {
                    className: `text-sm font-medium text-heading`,
                    children: o(`custom_frames.family.${e.type}`)
                }), (0, Y.jsx)(`p`, {
                    className: `text-xs text-subtle`,
                    children: t
                })]
            }), (0, Y.jsx)(`div`, {
                className: `flex flex-wrap gap-2`,
                children: e.buckets.map(e => {
                    let t = a ?.has(e.key) ?? !1,
                        n = t || r.has(e.key);
                    return (0, Y.jsxs)(`label`, {
                        className: t ? `flex cursor-not-allowed items-center gap-1.5 rounded-md border border-border-primary bg-surface-muted px-2.5 py-1.5 text-sm text-subtle` : `flex cursor-pointer items-center gap-1.5 rounded-md border border-border-primary px-2.5 py-1.5 text-sm text-body transition-colors hover:bg-surface-muted`,
                        children: [(0, Y.jsx)(`input`, {
                            type: `checkbox`,
                            checked: n,
                            disabled: t,
                            onChange: () => i(e.key),
                            className: `h-4 w-4 accent-primary`
                        }), o(`custom_frames.style.${e.style}`), n && !t && (0, Y.jsx)(E, {
                            className: `h-3.5 w-3.5 text-primary`
                        })]
                    }, e.key)
                })
            })]
        }, e.type)
    }), t[0] = a, t[1] = i, t[2] = r, t[3] = o, t[4] = s) : s = t[4];
    let c;
    return t[5] === s ? c = t[6] : (c = (0, Y.jsx)(`div`, {
        className: `space-y-4`,
        children: s
    }), t[5] = s, t[6] = c), c
}
var Be = i();

function Ve() {
    let e = (0, Be.c)(2),
        {
            t
        } = n(`card-creator`),
        r;
    return e[0] === t ? r = e[1] : (r = (0, Y.jsx)(Ie, {
        children: e => {
            let {
                open: n
            } = e;
            return (0, Y.jsxs)(`div`, {
                className: `rounded-md border border-border-primary`,
                children: [(0, Y.jsxs)(q, {
                    className: `flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-muted transition-colors hover:text-heading`,
                    children: [(0, Y.jsx)(xe, {
                        className: `h-4 w-4 shrink-0`
                    }), (0, Y.jsx)(`span`, {
                        className: `flex-1`,
                        children: t(`custom_frames.guidelines.trigger`)
                    }), (0, Y.jsx)(O, {
                        className: `h-4 w-4 shrink-0 transition-transform ${n?`rotate-180`:``}`
                    })]
                }), (0, Y.jsx)(J, {
                    className: `space-y-2 border-t border-border-primary px-3 py-2 text-xs text-muted`,
                    children: (0, Y.jsxs)(`dl`, {
                        className: `space-y-1.5`,
                        children: [(0, Y.jsxs)(`div`, {
                            children: [(0, Y.jsx)(`dt`, {
                                className: `font-medium text-subtle`,
                                children: t(`custom_frames.guidelines.size_label`)
                            }), (0, Y.jsx)(`dd`, {
                                children: t(`custom_frames.guidelines.size_value`, {
                                    width: 900,
                                    height: ve
                                })
                            })]
                        }), (0, Y.jsxs)(`div`, {
                            children: [(0, Y.jsx)(`dt`, {
                                className: `font-medium text-subtle`,
                                children: t(`custom_frames.guidelines.formats_label`)
                            }), (0, Y.jsx)(`dd`, {
                                children: t(`custom_frames.guidelines.formats_value`)
                            })]
                        }), (0, Y.jsxs)(`div`, {
                            children: [(0, Y.jsx)(`dt`, {
                                className: `font-medium text-subtle`,
                                children: t(`custom_frames.guidelines.limits_label`)
                            }), (0, Y.jsx)(`dd`, {
                                children: t(`custom_frames.guidelines.limits_value`, {
                                    maxSizeMb: ue / 1048576,
                                    maxDimension: P
                                })
                            })]
                        }), (0, Y.jsxs)(`div`, {
                            children: [(0, Y.jsx)(`dt`, {
                                className: `font-medium text-subtle`,
                                children: t(`custom_frames.guidelines.cropping_label`)
                            }), (0, Y.jsx)(`dd`, {
                                children: t(`custom_frames.guidelines.cropping_value`)
                            })]
                        })]
                    })
                })]
            })
        }
    }), e[0] = t, e[1] = r), r
}
var $ = {
    "file-too-large": `custom_frames.dialog.error_file_too_large`,
    "unrecognized-format": `custom_frames.dialog.error_unrecognized_format`,
    unreadable: `custom_frames.dialog.error_unreadable`,
    "dimensions-too-large": `custom_frames.dialog.error_dimensions_too_large`,
    "quota-exceeded": `custom_frames.dialog.error_quota_exceeded`
};

function He({
    open: e,
    onClose: t
}) {
    let {
        t: r
    } = n(`card-creator`), [i, a] = (0, V.useState)(``), [o, s] = (0, V.useState)(null), [c, l] = (0, V.useState)(`form`), [u, d] = (0, V.useState)(!1), [f, p] = (0, V.useState)(!1), [m, h] = (0, V.useState)(null), [g, _] = (0, V.useState)(null), [v, y] = (0, V.useState)(null), [b, x] = (0, V.useState)(new Set), [S, C] = (0, V.useState)(new Set);
    (0, V.useEffect)(() => () => {
        v && URL.revokeObjectURL(v)
    }, [v]);
    let w = (0, V.useMemo)(() => z.every(e => b.has(e.key)), [b]),
        T = async e => {
            if (e.preventDefault(), !(!o || i.trim().length === 0)) {
                h(null), d(!0);
                try {
                    let e = await le(o),
                        t = await ye(e.payloadHash);
                    _(e), x(new Set(t.map(pe))), C(new Set), y(URL.createObjectURL(e.preview)), l(`availability`)
                } catch (e) {
                    h(r(e instanceof N ? $[e.code] : `custom_frames.dialog.error_unknown`))
                } finally {
                    d(!1)
                }
            }
        },
        E = e => {
            b.has(e) || C(t => {
                let n = new Set(t);
                return n.has(e) ? n.delete(e) : n.add(e), n
            })
        },
        O = async () => {
            if (!(!g || S.size === 0)) {
                h(null), p(!0);
                try {
                    let e = z.filter(e => S.has(e.key)).map(e => ({
                        name: i.trim(),
                        type: e.type,
                        dented: e.style === `dented`,
                        renderer: e.renderer,
                        mirrorsCardBackId: e.representativeCardBackId
                    }));
                    if (await I(g.payloadHash))
                        for (let t of e) await L(g.payloadHash, t);
                    else await B(g.image.size + g.preview.size), await R({
                        payloadHash: g.payloadHash,
                        sourceHash: g.sourceHash,
                        normVersion: g.normVersion,
                        image: g.image,
                        preview: g.preview,
                        byteSize: g.byteSize
                    }, e);
                    await he(), ge(), A()
                } catch (e) {
                    h(r(e instanceof N ? $[e.code] : `custom_frames.dialog.error_unknown`))
                } finally {
                    p(!1)
                }
            }
        },
        A = () => {
            a(``), s(null), l(`form`), h(null), _(null), v && URL.revokeObjectURL(v), y(null), x(new Set), C(new Set), t()
        };
    return (0, Y.jsxs)(ae, {
        open: e,
        onClose: A,
        className: `relative z-50`,
        children: [(0, Y.jsx)(oe, {
            className: `fixed inset-0 bg-black/30`
        }), (0, Y.jsx)(`div`, {
            className: `fixed inset-0 flex w-screen items-center justify-center p-4`,
            children: (0, Y.jsxs)(ie, {
                className: `relative w-full max-w-md space-y-4 rounded-lg border border-border-primary bg-surface p-6 shadow-xl`,
                children: [(0, Y.jsx)(`button`, {
                    type: `button`,
                    onClick: A,
                    "aria-label": r(`custom_frames.dialog.close`),
                    className: `absolute right-4 top-4 rounded-md p-1 text-muted transition-colors hover:bg-surface-muted hover:text-heading`,
                    children: (0, Y.jsx)(D, {
                        className: `h-4 w-4`
                    })
                }), c === `form` ? (0, Y.jsxs)(Y.Fragment, {
                    children: [(0, Y.jsxs)(`div`, {
                        className: `space-y-1 pr-8`,
                        children: [(0, Y.jsx)(M, {
                            className: `text-lg font-bold text-heading`,
                            children: r(`custom_frames.dialog.title`)
                        }), (0, Y.jsx)(`p`, {
                            className: `text-sm text-muted`,
                            children: r(`custom_frames.dialog.description`)
                        })]
                    }), (0, Y.jsxs)(`form`, {
                        onSubmit: T,
                        className: `space-y-4`,
                        children: [(0, Y.jsx)(ce, {
                            type: `text`,
                            autoFocus: !0,
                            value: i,
                            onChange: a,
                            label: r(`custom_frames.dialog.name_label`),
                            placeholder: r(`custom_frames.dialog.name_placeholder`),
                            maxLength: 30,
                            required: !0
                        }), (0, Y.jsxs)(`div`, {
                            className: `space-y-1.5`,
                            children: [(0, Y.jsxs)(`p`, {
                                className: `block text-sm font-medium text-muted`,
                                children: [r(`custom_frames.dialog.image_label`), (0, Y.jsx)(`span`, {
                                    className: `ml-1 text-primary`,
                                    children: `*`
                                })]
                            }), (0, Y.jsx)(X, {
                                acceptedFormats: [`image/png`, `image/webp`],
                                onImageSelect: s
                            }), (0, Y.jsx)(Ve, {})]
                        }), m && (0, Y.jsx)(`p`, {
                            className: `text-sm text-red-500`,
                            children: m
                        }), (0, Y.jsxs)(`div`, {
                            className: `flex justify-end gap-3`,
                            children: [(0, Y.jsx)(`button`, {
                                type: `button`,
                                onClick: A,
                                className: `rounded-md px-4 py-2 text-sm font-medium text-muted transition-colors hover:bg-surface-muted`,
                                children: r(`custom_frames.dialog.cancel`)
                            }), (0, Y.jsx)(`button`, {
                                type: `submit`,
                                disabled: !o || i.trim().length === 0 || u,
                                className: `rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50`,
                                children: r(u ? `custom_frames.dialog.processing` : `custom_frames.dialog.next`)
                            })]
                        })]
                    })]
                }) : (0, Y.jsxs)(Y.Fragment, {
                    children: [(0, Y.jsxs)(`div`, {
                        className: `space-y-1 pr-8`,
                        children: [(0, Y.jsx)(M, {
                            className: `text-lg font-bold text-heading`,
                            children: r(`custom_frames.dialog.mirror_title`)
                        }), (0, Y.jsx)(`p`, {
                            className: `text-sm text-muted`,
                            children: r(`custom_frames.dialog.mirror_description`)
                        })]
                    }), (0, Y.jsxs)(`div`, {
                        className: `flex gap-4`,
                        children: [v && (0, Y.jsx)(`div`, {
                            className: `w-20 shrink-0 overflow-hidden rounded-md bg-surface-muted`,
                            children: (0, Y.jsx)(`img`, {
                                src: v,
                                alt: r(`custom_frames.preview_alt`, {
                                    name: i
                                }),
                                className: `h-full w-full object-contain`
                            })
                        }), (0, Y.jsx)(`div`, {
                            className: `max-h-72 flex-1 overflow-y-auto pr-1`,
                            children: w ? (0, Y.jsx)(`p`, {
                                className: `text-sm text-subtle`,
                                children: r(`custom_frames.dialog.mirror_none_left`)
                            }) : (0, Y.jsx)(Q, {
                                selectedKeys: S,
                                onToggle: E,
                                lockedKeys: b
                            })
                        })]
                    }), m && (0, Y.jsx)(`p`, {
                        className: `text-sm text-red-500`,
                        children: m
                    }), (0, Y.jsxs)(`div`, {
                        className: `flex items-center justify-between gap-3`,
                        children: [(0, Y.jsxs)(`button`, {
                            type: `button`,
                            onClick: () => l(`form`),
                            className: `flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-muted transition-colors hover:bg-surface-muted`,
                            children: [(0, Y.jsx)(k, {
                                className: `h-4 w-4`
                            }), r(`custom_frames.dialog.back`)]
                        }), (0, Y.jsx)(`button`, {
                            type: `button`,
                            onClick: O,
                            disabled: S.size === 0 || f,
                            className: `rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50`,
                            children: r(f ? `custom_frames.dialog.saving` : `custom_frames.dialog.save`)
                        })]
                    })]
                })]
            })
        })]
    })
}
export {
    Q as n, X as r, He as t
};
//# sourceMappingURL=CustomFrameDialog-fFFODZHJ.js.map