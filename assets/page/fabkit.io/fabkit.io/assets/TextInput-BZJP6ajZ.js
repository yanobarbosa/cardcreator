import {
    n as e
} from "./chunk-B3K2TuZy.js";
import {
    a as t,
    o as n,
    t as r
} from "./compiler-runtime-4XzsAixn.js";
import {
    B as i,
    at as a,
    et as o,
    ft as s,
    it as c,
    rt as l,
    ut as u,
    z as d
} from "./portal-CtSeHqeD.js";
import {
    a as f,
    c as p,
    d as m,
    r as h,
    u as g
} from "./use-resolve-button-type-BJQyyNxN.js";
import {
    t as _
} from "./field-CxhFTRI_.js";
var v = `input`;

function y(e, t) {
    let n = (0, o.useId)(),
        r = p(),
        a = u(),
        {
            id: d = r || `headlessui-input-${n}`,
            disabled: f = a || !1,
            autoFocus: _ = !1,
            invalid: y = !1,
            ...b
        } = e,
        x = h(),
        S = i(),
        {
            isFocused: C,
            focusProps: w
        } = g({
            autoFocus: _
        }),
        {
            isHovered: T,
            hoverProps: E
        } = m({
            isDisabled: f
        }),
        D = c({
            ref: t,
            id: d,
            "aria-labelledby": x,
            "aria-describedby": S,
            "aria-invalid": y ? `true` : void 0,
            disabled: f || void 0,
            autoFocus: _
        }, w, E),
        O = s({
            disabled: f,
            invalid: y,
            hover: T,
            focus: C,
            autofocus: _
        });
    return l()({
        ourProps: D,
        theirProps: b,
        slot: O,
        defaultTag: v,
        name: `Input`
    })
}
var b = a(y),
    x = r(),
    S = e(n()),
    C = e(t()),
    w = b;

function T(e) {
    let t = (0, x.c)(33),
        n, r, i, a, o, s, c;
    t[0] === e ? (n = t[1], r = t[2], i = t[3], a = t[4], o = t[5], s = t[6], c = t[7]) : ({
        label: r,
        description: n,
        required: o,
        warning: c,
        value: s,
        onChange: i,
        ...a
    } = e, t[0] = e, t[1] = n, t[2] = r, t[3] = i, t[4] = a, t[5] = o, t[6] = s, t[7] = c);
    let [l, u] = (0, S.useState)(!1), p = (0, S.useRef)(null), m;
    t[8] === c ? m = t[9] : (m = c ? {
        onMouseEnter: () => u(!0),
        onMouseLeave: () => u(!1),
        onTouchStart: () => {
            p.current && clearTimeout(p.current), u(!0)
        },
        onTouchEnd: () => {
            p.current = setTimeout(() => u(!1), 2e3)
        },
        onTouchCancel: () => u(!1)
    } : {}, t[8] = c, t[9] = m);
    let h = m,
        g;
    t[10] === o ? g = t[11] : (g = o && (0, C.jsx)(`span`, {
        className: `text-primary ml-1`,
        children: `*`
    }), t[10] = o, t[11] = g);
    let v;
    t[12] !== r || t[13] !== g ? (v = (0, C.jsxs)(f, {
        className: `block text-sm font-medium text-muted`,
        children: [r, g]
    }), t[12] = r, t[13] = g, t[14] = v) : v = t[14];
    let y;
    t[15] === n ? y = t[16] : (y = n && (0, C.jsx)(d, {
        className: `text-xs text-subtle`,
        children: n
    }), t[15] = n, t[16] = y);
    let b = c ? `cursor-not-allowed` : void 0,
        T = l && c ? c : s ?? ``,
        E = !!c,
        D;
    t[17] === i ? D = t[18] : (D = e => i ?.(e.target.value), t[17] = i, t[18] = D);
    let O = `w-full px-3 py-1.5 bg-surface border border-border rounded-md ${l&&c?`text-primary`:`text-body`} placeholder:text-faint focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all data-[disabled]:opacity-50 ${c?`pointer-events-none`:``}`,
        k;
    t[19] !== a || t[20] !== T || t[21] !== E || t[22] !== D || t[23] !== O ? (k = (0, C.jsx)(w, { ...a,
        value: T,
        readOnly: E,
        onChange: D,
        className: O
    }), t[19] = a, t[20] = T, t[21] = E, t[22] = D, t[23] = O, t[24] = k) : k = t[24];
    let A;
    t[25] !== k || t[26] !== b || t[27] !== h ? (A = (0, C.jsx)(`div`, {
        className: b,
        ...h,
        children: k
    }), t[25] = k, t[26] = b, t[27] = h, t[28] = A) : A = t[28];
    let j;
    return t[29] !== A || t[30] !== v || t[31] !== y ? (j = (0, C.jsxs)(_, {
        className: `space-y-1.5`,
        children: [v, y, A]
    }), t[29] = A, t[30] = v, t[31] = y, t[32] = j) : j = t[32], j
}
export {
    T as t
};
//# sourceMappingURL=TextInput-BZJP6ajZ.js.map