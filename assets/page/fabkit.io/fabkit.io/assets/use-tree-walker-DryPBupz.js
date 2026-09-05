import {
    n as e
} from "./chunk-B3K2TuZy.js";
import {
    o as t
} from "./compiler-runtime-4XzsAixn.js";
import {
    bt as n,
    ht as r
} from "./portal-CtSeHqeD.js";
var i = e(t(), 1);

function a(e, {
    container: t,
    accept: a,
    walk: o
}) {
    let s = (0, i.useRef)(a),
        c = (0, i.useRef)(o);
    (0, i.useEffect)(() => {
        s.current = a, c.current = o
    }, [a, o]), r(() => {
        if (!t || !e) return;
        let r = n(t);
        if (!r) return;
        let i = s.current,
            a = c.current,
            o = Object.assign(e => i(e), {
                acceptNode: i
            }),
            l = r.createTreeWalker(t, NodeFilter.SHOW_ELEMENT, o, !1);
        for (; l.nextNode();) a(l.currentNode)
    }, [t, e, s, c])
}
export {
    a as t
};
//# sourceMappingURL=use-tree-walker-DryPBupz.js.map