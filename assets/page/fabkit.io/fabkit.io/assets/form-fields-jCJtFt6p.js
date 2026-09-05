import {
    n as e
} from "./chunk-B3K2TuZy.js";
import {
    o as t
} from "./compiler-runtime-4XzsAixn.js";
import {
    $ as n,
    Q as r,
    gt as i,
    st as a,
    xt as o
} from "./portal-CtSeHqeD.js";
var s = e(t(), 1);

function c(e = {}, t = null, n = []) {
    for (let [r, i] of Object.entries(e)) u(n, l(t, r), i);
    return n
}

function l(e, t) {
    return e ? e + `[` + t + `]` : t
}

function u(e, t, n) {
    if (Array.isArray(n))
        for (let [r, i] of n.entries()) u(e, l(t, r.toString()), i);
    else n instanceof Date ? e.push([t, n.toISOString()]) : typeof n == `boolean` ? e.push([t, n ? `1` : `0`]) : typeof n == `string` ? e.push([t, n]) : typeof n == `number` ? e.push([t, `${n}`]) : n == null ? e.push([t, ``]) : f(n) && !(0, s.isValidElement)(n) && c(n, t, e)
}

function d(e) {
    var t;
    let n = e ?.form ?? e.closest(`form`);
    if (n) {
        for (let t of n.elements)
            if (t !== e && (t.tagName === `INPUT` && t.type === `submit` || t.tagName === `BUTTON` && t.type === `submit` || t.nodeName === `INPUT` && t.type === `image`)) {
                t.click();
                return
            }(t = n.requestSubmit) == null || t.call(n)
    }
}

function f(e) {
    if (Object.prototype.toString.call(e) !== `[object Object]`) return !1;
    let t = Object.getPrototypeOf(e);
    return t === null || Object.getPrototypeOf(t) === null
}
var p = o(),
    m = (0, s.createContext)(null);

function h(e) {
    let [t, i] = (0, s.useState)(null);
    return s.createElement(m.Provider, {
        value: {
            target: t
        }
    }, e.children, s.createElement(r, {
        features: n.Hidden,
        ref: i
    }))
}

function g({
    children: e
}) {
    let t = (0, s.useContext)(m);
    if (!t) return s.createElement(s.Fragment, null, e);
    let {
        target: n
    } = t;
    return n ? (0, p.createPortal)(s.createElement(s.Fragment, null, e), n) : null
}

function _({
    data: e,
    form: t,
    disabled: o,
    onReset: l,
    overrides: u
}) {
    let [d, f] = (0, s.useState)(null), p = i();
    return (0, s.useEffect)(() => {
        if (l && d) return p.addEventListener(d, `reset`, l)
    }, [d, t, l]), s.createElement(g, null, s.createElement(v, {
        setForm: f,
        formId: t
    }), c(e).map(([e, i]) => s.createElement(r, {
        features: n.Hidden,
        ...a({
            key: e,
            as: `input`,
            type: `hidden`,
            hidden: !0,
            readOnly: !0,
            form: t,
            disabled: o,
            name: e,
            value: i,
            ...u
        })
    })))
}

function v({
    setForm: e,
    formId: t
}) {
    return (0, s.useEffect)(() => {
        if (t) {
            let n = document.getElementById(t);
            n && e(n)
        }
    }, [e, t]), t ? null : s.createElement(r, {
        features: n.Hidden,
        as: `input`,
        type: `hidden`,
        hidden: !0,
        readOnly: !0,
        ref: t => {
            if (!t) return;
            let n = t.closest(`form`);
            n && e(n)
        }
    })
}
export {
    _ as n, d as r, h as t
};
//# sourceMappingURL=form-fields-jCJtFt6p.js.map