import {
    n as e
} from "./chunk-B3K2TuZy.js";
import {
    o as t
} from "./compiler-runtime-4XzsAixn.js";
import {
    r as n,
    t as r
} from "./useRouter-yWE7_bQv.js";
import {
    _ as i,
    a,
    t as o
} from "./useStore-DYx3-od8.js";

function s(e = {}) {
    if (e.isNotFound = !0, e.throw) throw e;
    return e
}

function c(e) {
    return e ?.isNotFound === !0
}
var l = `__root__`,
    u = e(t(), 1),
    d = u.createContext(void 0),
    f = u.createContext(void 0),
    p = {};

function m(e, t) {
    let n = u.useRef();
    return r => {
        let a = e ?.select ? e.select(r) : r;
        return e ?.structuralSharing ?? t.options.defaultStructuralSharing ? n.current = i(n.current, a) : a
    }
}

function h(e) {
    let t = r(),
        n = u.useContext(e.from ? f : d),
        i = e.from ?? n,
        s = t.stores.getMatchStore(i),
        c = m(e, t),
        l = o(s, e => e ? c(e) : p);
    if (l !== p) return l;
    (e.shouldThrow ?? !0) && a()
}
export {
    c as a, l as i, m as n, s as o, d as r, h as t
};
//# sourceMappingURL=useMatch-DEyhu6ur.js.map