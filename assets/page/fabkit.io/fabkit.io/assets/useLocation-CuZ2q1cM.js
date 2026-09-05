import {
    n as e
} from "./chunk-B3K2TuZy.js";
import {
    a as t,
    o as n
} from "./compiler-runtime-4XzsAixn.js";
import {
    r,
    t as i
} from "./useRouter-yWE7_bQv.js";
import {
    r as a,
    t as o
} from "./useStore-DYx3-od8.js";
import {
    a as s,
    i as c,
    n as l,
    r as u
} from "./useMatch-DEyhu6ur.js";
var d = e(n(), 1),
    f = e(t(), 1),
    p = class extends d.Component {
        constructor(...e) {
            super(...e), this.state = {
                error: null
            }, this.reset = () => {
                this.setState({
                    error: null
                })
            }
        }
        static getDerivedStateFromProps(e, t) {
            let n = e.getResetKey();
            return t.error && t.resetKey !== n ? {
                resetKey: n,
                error: null
            } : {
                resetKey: n
            }
        }
        static getDerivedStateFromError(e) {
            return {
                error: e
            }
        }
        componentDidCatch(e, t) {
            this.props.onCatch ?.(e, t)
        }
        render() {
            let e = this.state.error;
            return e ? d.createElement(this.props.errorComponent ?? m, {
                error: e,
                reset: this.reset
            }) : this.props.children
        }
    };

function m({
    error: e
}) {
    let [t, n] = d.useState(!1);
    return (0, f.jsxs)(`div`, {
        style: {
            padding: `.5rem`,
            maxWidth: `100%`
        },
        children: [(0, f.jsxs)(`div`, {
            style: {
                display: `flex`,
                alignItems: `center`,
                gap: `.5rem`
            },
            children: [(0, f.jsx)(`strong`, {
                style: {
                    fontSize: `1rem`
                },
                children: `Something went wrong!`
            }), (0, f.jsx)(`button`, {
                style: {
                    appearance: `none`,
                    fontSize: `.6em`,
                    border: `1px solid currentColor`,
                    padding: `.1rem .2rem`,
                    fontWeight: `bold`,
                    borderRadius: `.25rem`
                },
                onClick: () => n(e => !e),
                children: t ? `Hide Error` : `Show Error`
            })]
        }), (0, f.jsx)(`div`, {
            style: {
                height: `.25rem`
            }
        }), t ? (0, f.jsx)(`div`, {
            children: (0, f.jsx)(`pre`, {
                style: {
                    fontSize: `.7em`,
                    border: `1px solid red`,
                    borderRadius: `.25rem`,
                    padding: `.3rem`,
                    color: `red`,
                    overflow: `auto`
                },
                children: e.message ? (0, f.jsx)(`code`, {
                    children: e.message
                }) : null
            })
        }) : null]
    })
}

function h(e) {
    let t = i(),
        n = `not-found-${o(t.stores.location,e=>e.pathname)}-${o(t.stores.status,e=>e)}`;
    return (0, f.jsx)(p, {
        getResetKey: () => n,
        onCatch: (t, n) => {
            if (s(t)) e.onCatch ?.(t, n);
            else throw t
        },
        errorComponent: ({
            error: t
        }) => {
            if (s(t)) return e.fallback ?.(t);
            throw t
        },
        children: e.children
    })
}

function g() {
    return (0, f.jsx)(`p`, {
        children: `Not Found`
    })
}

function _(e) {
    return (0, f.jsx)(f.Fragment, {
        children: e.children
    })
}

function v(e, t, n) {
    return t.options.notFoundComponent ? (0, f.jsx)(t.options.notFoundComponent, { ...n
    }) : e.options.defaultNotFoundComponent ? (0, f.jsx)(e.options.defaultNotFoundComponent, { ...n
    }) : (0, f.jsx)(g, {})
}

function y(e, t) {
    let n = t ?.options.pendingComponent ?? e.options.defaultPendingComponent;
    return n ? (0, f.jsx)(n, {}) : null
}
var b = (e, t) => e[0] === t[0] && e[1] === t[1],
    x = (e, t, n) => !t.isRoot || t.options.shellComponent || t.options.wrapInSuspense || n === !1 || n === `data-only` || !e.ssr,
    S = d.memo(function({
        routeId: e
    }) {
        let t = i();
        return (0, f.jsx)(C, {
            router: t,
            match: o(t.stores.getMatchStore(e), e => e)
        })
    });

function C({
    router: e,
    match: t
}) {
    let n = e.routesById[t.routeId],
        r = y(e, n),
        i = n.options.errorComponent ?? e.options.defaultErrorComponent,
        o = n.options.onCatch ?? e.options.defaultOnCatch,
        c = n.isRoot ? n.options.notFoundComponent ?? e.options.notFoundRoute ?.options.component : n.options.notFoundComponent,
        l = t.ssr === !1 || t.ssr === `data-only`,
        m = x(e, n, t.ssr) && (n.options.wrapInSuspense ?? r ?? (n.options.errorComponent ?.preload || l)) ? d.Suspense : _,
        g = i ? p : _,
        v = c ? h : _;
    return (0, f.jsxs)(n.isRoot ? n.options.shellComponent ?? _ : _, {
        children: [(0, f.jsx)(u.Provider, {
            value: t.routeId,
            children: (0, f.jsx)(m, {
                fallback: r,
                children: (0, f.jsx)(g, {
                    getResetKey: () => t,
                    errorComponent: i,
                    onCatch: (e, n) => {
                        if (s(e)) throw e.routeId ??= t.routeId, e;
                        o ?.(e, n)
                    },
                    children: (0, f.jsx)(v, {
                        fallback: e => {
                            if (e.routeId ??= t.routeId, e.routeId !== t.routeId) throw e;
                            return d.createElement(c, e)
                        },
                        children: l ? (0, f.jsx)(a, {
                            fallback: r,
                            children: (0, f.jsx)(w, {
                                match: t
                            })
                        }) : (0, f.jsx)(w, {
                            match: t
                        })
                    })
                })
            })
        }), null]
    })
}
var w = d.memo(function({
        match: e
    }) {
        let t = i(),
            n = e.routeId,
            r = t.routesById[n],
            a = d.useMemo(() => {
                let i = (r.options.remountDeps ?? t.options.defaultRemountDeps) ?.({
                    routeId: n,
                    loaderDeps: e.loaderDeps,
                    params: e._strictParams,
                    search: e._strictSearch
                });
                return i ? JSON.stringify(i) : void 0
            }, [n, e.loaderDeps, e._strictParams, e._strictSearch, r.options.remountDeps, t.options.defaultRemountDeps]),
            o = d.useMemo(() => {
                let e = r.options.component ?? t.options.defaultComponent;
                return e ? (0, f.jsx)(e, {}, a) : (0, f.jsx)(T, {})
            }, [a, r.options.component, t.options.defaultComponent]);
        if (e.status === `pending`) {
            if (t.ssr && !x(t, r, e.ssr)) return o;
            if (t._tx) throw t._tx[5];
            return y(t, r)
        }
        if (e.status === `notFound`) return v(t, r, e.error);
        if (e.status === `error`) throw e.error;
        return o
    }),
    T = d.memo(function() {
        let e = i(),
            t = d.useContext(u),
            n, r, a; {
            let i = e.stores.getMatchStore(t);
            [n, r] = o(i, e => [!!e._notFound, e.error], b), a = o(e.stores.ids, e => e[e.indexOf(t) + 1])
        }
        if (n) return v(e, e.routesById[t], r);
        if (!a) return null;
        let s = (0, f.jsx)(S, {
            routeId: a
        });
        return t === `__root__` ? (0, f.jsx)(d.Suspense, {
            fallback: y(e),
            children: s
        }) : s
    });

function E(e) {
    let t = i();
    return o(t.stores.location, l(e, t))
}
export {
    _ as a, y as i, S as n, p as o, T as r, E as t
};
//# sourceMappingURL=useLocation-CuZ2q1cM.js.map