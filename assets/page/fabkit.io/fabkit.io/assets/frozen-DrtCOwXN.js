import {
    n as e
} from "./chunk-B3K2TuZy.js";
import {
    o as t
} from "./compiler-runtime-4XzsAixn.js";
import {
    pt as n,
    xt as r
} from "./portal-CtSeHqeD.js";
var i = e(t(), 1),
    a = r();

function o(e, t, r) {
    let [o, s] = (0, i.useState)(r), c = e !== void 0, l = (0, i.useRef)(c), u = (0, i.useRef)(!1), d = (0, i.useRef)(!1);
    return c && !l.current && !u.current ? (u.current = !0, l.current = c, console.error(`A component is changing from uncontrolled to controlled. This may be caused by the value changing from undefined to a defined value, which should not happen.`)) : !c && l.current && !d.current && (d.current = !0, l.current = c, console.error(`A component is changing from controlled to uncontrolled. This may be caused by the value changing from a defined value to undefined, which should not happen.`)), [c ? e : o, n(e => (c || (0, a.flushSync)(() => s(e)), t ?.(e)))]
}

function s(e) {
    let [t] = (0, i.useState)(e);
    return t
}

function c(e, t) {
    return e !== null && t !== null && typeof e == `object` && typeof t == `object` && `id` in e && `id` in t ? e.id === t.id : e === t
}

function l(e = c) {
    return (0, i.useCallback)((t, n) => {
        if (typeof e == `string`) {
            let r = e;
            return t ?.[r] === n ?.[r]
        }
        return e(t, n)
    }, [e])
}

function u({
    children: e,
    freeze: t
}, n) {
    let r = f(t, e);
    return (0, i.isValidElement)(r) ? (0, i.cloneElement)(r, {
        ref: n
    }) : i.createElement(i.Fragment, null, r)
}
var d = i.forwardRef(u);

function f(e, t) {
    let [n, r] = (0, i.useState)(t);
    return !e && n !== t && r(t), e ? n : t
}
export {
    o as a, s as i, f as n, l as r, d as t
};
//# sourceMappingURL=frozen-DrtCOwXN.js.map