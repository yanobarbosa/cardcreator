import {
    n as e
} from "./chunk-B3K2TuZy.js";
import {
    a as t,
    o as n
} from "./compiler-runtime-4XzsAixn.js";
import {
    t as r
} from "./useRouter-yWE7_bQv.js";
import {
    a as i
} from "./useStore-DYx3-od8.js";
import {
    l as a,
    o,
    r as s,
    u as c
} from "./analytics-061K8zg0.js";
import {
    i as l,
    o as u,
    t as d
} from "./useMatch-DEyhu6ur.js";
import {
    t as f
} from "./useNavigate-Cg4FyyF8.js";

function p(e) {
    if (e.statusCode = e.statusCode || e.code || 307, !e.reloadDocument && typeof e.href == `string`) try {
        new URL(e.href), e.reloadDocument = !0
    } catch {}
    let t = new Headers(e.headers);
    e.href && t.get(`Location`) === null && t.set(`Location`, e.href);
    let n = new Response(null, {
        status: e.statusCode,
        headers: t
    });
    if (n.options = e, e.throw) throw n;
    return n
}

function m(e) {
    return e instanceof Response && !!e.options
}
var h = class {
        get to() {
            return this._to
        }
        get id() {
            return this._id
        }
        get path() {
            return this._path
        }
        get fullPath() {
            return this._fullPath
        }
        constructor(e) {
            if (this.init = e => {
                    this.originalIndex = e.originalIndex;
                    let t = this.options,
                        n = !t ?.path && !t ?.id;
                    this.parentRoute = this.options.getParentRoute ?.(), n ? this._path = l : this.parentRoute || i();
                    let r = n ? l : t ?.path;
                    r && r !== `/` && (r = a(r));
                    let s = t ?.id || r,
                        u = n ? l : o([this.parentRoute.id === `__root__` ? `` : this.parentRoute.id, s]);
                    r === `__root__` && (r = `/`), u !== `__root__` && (u = o([`/`, u]));
                    let d = u === `__root__` ? `/` : o([this.parentRoute.fullPath, r]);
                    this._path = r, this._id = u, this._fullPath = d, this._to = c(d)
                }, this.addChildren = e => this._addFileChildren(e), this._addFileChildren = e => (Array.isArray(e) && (this.children = e), typeof e == `object` && e && (this.children = Object.values(e)), this), this._addFileTypes = () => this, this.updateLoader = e => (Object.assign(this.options, e), this), this.update = e => (Object.assign(this.options, e), this), this.lazy = e => (this.lazyFn = e, this), this.redirect = e => p({
                    from: this.fullPath,
                    ...e
                }), this.options = e || {}, this.isRoot = !e ?.getParentRoute, e ?.id && e ?.path) throw Error(`Route cannot have both an 'id' and a 'path' option.`)
        }
    },
    g = class {
        constructor({
            id: e
        }) {
            this.notFound = e => u({
                routeId: this.id,
                ...e
            }), this.redirect = e => p({
                from: this.id,
                ...e
            }), this.id = e
        }
    },
    _ = class extends h {
        constructor(e) {
            super(e)
        }
    };

function v(e) {
    return d({
        from: e.from,
        strict: e.strict,
        structuralSharing: e.structuralSharing,
        select: t => e.select ? e.select(t.loaderData) : t.loaderData
    })
}

function y(e) {
    let {
        select: t,
        ...n
    } = e;
    return d({ ...n,
        select: e => t ? t(e.loaderDeps) : e.loaderDeps
    })
}

function b(e) {
    return d({
        from: e.from,
        shouldThrow: e.shouldThrow,
        structuralSharing: e.structuralSharing,
        strict: e.strict,
        select: t => {
            let n = e.strict === !1 ? t.params : t._strictParams;
            return e.select ? e.select(n) : n
        }
    })
}

function x(e) {
    return d({
        from: e.from,
        strict: e.strict,
        shouldThrow: e.shouldThrow,
        structuralSharing: e.structuralSharing,
        select: t => e.select ? e.select(t.search) : t.search
    })
}

function S(e) {
    return d({ ...e,
        select: t => e.select ? e.select(t.context) : t.context
    })
}
var C = e(n(), 1),
    w = e(t(), 1);

function T(e) {
    return new E({
        id: e
    })
}
var E = class extends g {
        constructor({
            id: e
        }) {
            super({
                id: e
            }), this.useMatch = e => d({
                select: e ?.select,
                from: this.id,
                structuralSharing: e ?.structuralSharing
            }), this.useRouteContext = e => S({ ...e,
                from: this.id
            }), this.useSearch = e => x({
                select: e ?.select,
                structuralSharing: e ?.structuralSharing,
                from: this.id
            }), this.useParams = e => b({
                select: e ?.select,
                structuralSharing: e ?.structuralSharing,
                from: this.id
            }), this.useLoaderDeps = e => y({ ...e,
                from: this.id,
                strict: !1
            }), this.useLoaderData = e => v({ ...e,
                from: this.id,
                strict: !1
            }), this.useNavigate = () => f({
                from: r().routesById[this.id].fullPath
            }), this.notFound = e => u({
                routeId: this.id,
                ...e
            }), this.Link = C.forwardRef((e, t) => {
                let n = r().routesById[this.id].fullPath;
                return (0, w.jsx)(s, {
                    ref: t,
                    from: n,
                    ...e
                })
            })
        }
    },
    D = class extends h {
        constructor(e) {
            super(e), this.useMatch = e => d({
                select: e ?.select,
                from: this.id,
                structuralSharing: e ?.structuralSharing
            }), this.useRouteContext = e => S({ ...e,
                from: this.id
            }), this.useSearch = e => x({
                select: e ?.select,
                structuralSharing: e ?.structuralSharing,
                from: this.id
            }), this.useParams = e => b({
                select: e ?.select,
                structuralSharing: e ?.structuralSharing,
                from: this.id
            }), this.useLoaderDeps = e => y({ ...e,
                from: this.id
            }), this.useLoaderData = e => v({ ...e,
                from: this.id
            }), this.useNavigate = () => f({
                from: this.fullPath
            }), this.Link = C.forwardRef((e, t) => (0, w.jsx)(s, {
                ref: t,
                from: this.fullPath,
                ...e
            }))
        }
    };

function O(e) {
    return new D(e)
}
var k = class extends _ {
    constructor(e) {
        super(e), this.useMatch = e => d({
            select: e ?.select,
            from: this.id,
            structuralSharing: e ?.structuralSharing
        }), this.useRouteContext = e => S({ ...e,
            from: this.id
        }), this.useSearch = e => x({
            select: e ?.select,
            structuralSharing: e ?.structuralSharing,
            from: this.id
        }), this.useParams = e => b({
            select: e ?.select,
            structuralSharing: e ?.structuralSharing,
            from: this.id
        }), this.useLoaderDeps = e => y({ ...e,
            from: this.id
        }), this.useLoaderData = e => v({ ...e,
            from: this.id
        }), this.useNavigate = () => f({
            from: this.fullPath
        }), this.Link = C.forwardRef((e, t) => (0, w.jsx)(s, {
            ref: t,
            from: this.fullPath,
            ...e
        }))
    }
};

function A(e) {
    return new k(e)
}
export {
    p as a, m as i, O as n, T as r, A as t
};
//# sourceMappingURL=route-Bul4MYPI.js.map