import {
    n as e
} from "./chunk-B3K2TuZy.js";
import {
    o as t
} from "./compiler-runtime-4XzsAixn.js";
import {
    R as n,
    at as r,
    dt as i,
    et as a,
    ft as o,
    rt as s,
    ut as c
} from "./portal-CtSeHqeD.js";
import {
    i as l,
    s as u
} from "./use-resolve-button-type-BJQyyNxN.js";
import {
    t as d
} from "./form-fields-jCJtFt6p.js";
var f = e(t(), 1),
    p = `div`;

function m(e, t) {
    let r = `headlessui-control-${(0,a.useId)()}`,
        [m, h] = l(),
        [g, _] = n(),
        v = c(),
        {
            disabled: y = v || !1,
            ...b
        } = e,
        x = o({
            disabled: y
        }),
        S = {
            ref: t,
            disabled: y || void 0,
            "aria-disabled": y || void 0
        },
        C = s();
    return f.createElement(i, {
        value: y
    }, f.createElement(h, {
        value: m
    }, f.createElement(_, {
        value: g
    }, f.createElement(u, {
        id: r
    }, C({
        ourProps: S,
        theirProps: { ...b,
            children: f.createElement(d, null, typeof b.children == `function` ? b.children(x) : b.children)
        },
        slot: x,
        defaultTag: p,
        name: `Field`
    })))))
}
var h = r(m);
export {
    h as t
};
//# sourceMappingURL=field-CxhFTRI_.js.map