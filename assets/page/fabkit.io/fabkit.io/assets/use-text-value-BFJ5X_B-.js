import {
    n as e
} from "./chunk-B3K2TuZy.js";
import {
    o as t
} from "./compiler-runtime-4XzsAixn.js";
import {
    Y as n,
    pt as r
} from "./portal-CtSeHqeD.js";
var i = /([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g;

function a(e) {
    let t = e.innerText ?? ``,
        r = e.cloneNode(!0);
    if (!n(r)) return t;
    let a = !1;
    for (let e of r.querySelectorAll(`[hidden],[aria-hidden],[role="img"]`)) e.remove(), a = !0;
    let o = a ? r.innerText ?? `` : t;
    return i.test(o) && (o = o.replace(i, ``)), o
}

function o(e) {
    let t = e.getAttribute(`aria-label`);
    if (typeof t == `string`) return t.trim();
    let n = e.getAttribute(`aria-labelledby`);
    if (n) {
        let e = n.split(` `).map(e => {
            let t = document.getElementById(e);
            if (t) {
                let e = t.getAttribute(`aria-label`);
                return typeof e == `string` ? e.trim() : a(t).trim()
            }
            return null
        }).filter(Boolean);
        if (e.length > 0) return e.join(`, `)
    }
    return a(e).trim()
}
var s = e(t(), 1);

function c(e) {
    let t = (0, s.useRef)(``),
        n = (0, s.useRef)(``);
    return r(() => {
        let r = e.current;
        if (!r) return ``;
        let i = r.innerText;
        if (t.current === i) return n.current;
        let a = o(r).trim().toLowerCase();
        return t.current = i, n.current = a, a
    })
}
export {
    c as t
};
//# sourceMappingURL=use-text-value-BFJ5X_B-.js.map