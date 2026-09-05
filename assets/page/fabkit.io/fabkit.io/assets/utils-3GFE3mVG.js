import {
    n as e
} from "./chunk-B3K2TuZy.js";
import {
    o as t
} from "./compiler-runtime-4XzsAixn.js";
import {
    r as n
} from "./useRouter-yWE7_bQv.js";
var r = e(t(), 1),
    i = r.use,
    a = r.useLayoutEffect;

function o(e, t, n) {
    r.useEffect(() => {
        if (!e.current || n || typeof IntersectionObserver != `function`) return () => t();
        let r = new IntersectionObserver(e => {
            t(e.pop())
        }, {
            rootMargin: `100px`
        });
        return r.observe(e.current), () => {
            r.disconnect(), t()
        }
    }, [t, n, e])
}

function s(e) {
    let t = r.useRef(null);
    return r.useImperativeHandle(e, () => t.current, []), t
}
export {
    a as i, s as n, o as r, i as t
};
//# sourceMappingURL=utils-3GFE3mVG.js.map