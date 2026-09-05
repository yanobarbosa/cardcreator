import {
    n as e,
    t
} from "./chunk-B3K2TuZy.js";
import {
    C as n,
    L as r,
    R as i,
    S as a,
    _ as o,
    i as s,
    l as c,
    n as l,
    t as u,
    v as d,
    x as f,
    z as p
} from "./v4-DqHAiBF8.js";
import {
    a as m,
    r as h,
    t as g,
    u as _
} from "./card-creator-B987kJQm.js";
async function v(e) {
    let t = new CompressionStream(`gzip`),
        n = t.writable.getWriter();
    return n.write(new TextEncoder().encode(e)), n.close(), new Response(t.readable).blob()
}
async function y(e) {
    let t = await e.arrayBuffer(),
        n = new Uint8Array(t);
    if (n[0] === 31 && n[1] === 139) {
        let e = new DecompressionStream(`gzip`);
        return new Response(new Blob([t]).stream().pipeThrough(e)).text()
    }
    return new TextDecoder().decode(t)
}
var b = t(((e, t) => {
        var n = `2.0.0`,
            r = 256;
        t.exports = {
            MAX_LENGTH: r,
            MAX_SAFE_COMPONENT_LENGTH: 16,
            MAX_SAFE_BUILD_LENGTH: r - 6,
            MAX_SAFE_INTEGER: 2 ** 53 - 1 || 9007199254740991,
            RELEASE_TYPES: [`major`, `premajor`, `minor`, `preminor`, `patch`, `prepatch`, `prerelease`],
            SEMVER_SPEC_VERSION: n,
            FLAG_INCLUDE_PRERELEASE: 1,
            FLAG_LOOSE: 2
        }
    })),
    x = t(((e, t) => {
        t.exports = typeof process == `object` && {}.NODE_DEBUG && /\bsemver\b/i.test({}.NODE_DEBUG) ? (...e) => console.error(`SEMVER`, ...e) : () => {}
    })),
    S = t(((e, t) => {
        var {
            MAX_SAFE_COMPONENT_LENGTH: n,
            MAX_SAFE_BUILD_LENGTH: r,
            MAX_LENGTH: i
        } = b(), a = x();
        e = t.exports = {};
        var o = e.re = [],
            s = e.safeRe = [],
            c = e.src = [],
            l = e.safeSrc = [],
            u = e.t = {},
            d = 0,
            f = `[a-zA-Z0-9-]`,
            p = [
                [`\\s`, 1],
                [`\\d`, i],
                [f, r]
            ],
            m = e => {
                for (let [t, n] of p) e = e.split(`${t}*`).join(`${t}{0,${n}}`).split(`${t}+`).join(`${t}{1,${n}}`);
                return e
            },
            h = (e, t, n) => {
                let r = m(t),
                    i = d++;
                a(e, i, t), u[e] = i, c[i] = t, l[i] = r, o[i] = new RegExp(t, n ? `g` : void 0), s[i] = new RegExp(r, n ? `g` : void 0)
            };
        h(`NUMERICIDENTIFIER`, `0|[1-9]\\d*`), h(`NUMERICIDENTIFIERLOOSE`, `\\d+`), h(`NONNUMERICIDENTIFIER`, `\\d*[a-zA-Z-]${f}*`), h(`MAINVERSION`, `(${c[u.NUMERICIDENTIFIER]})\\.(${c[u.NUMERICIDENTIFIER]})\\.(${c[u.NUMERICIDENTIFIER]})`), h(`MAINVERSIONLOOSE`, `(${c[u.NUMERICIDENTIFIERLOOSE]})\\.(${c[u.NUMERICIDENTIFIERLOOSE]})\\.(${c[u.NUMERICIDENTIFIERLOOSE]})`), h(`PRERELEASEIDENTIFIER`, `(?:${c[u.NONNUMERICIDENTIFIER]}|${c[u.NUMERICIDENTIFIER]})`), h(`PRERELEASEIDENTIFIERLOOSE`, `(?:${c[u.NONNUMERICIDENTIFIER]}|${c[u.NUMERICIDENTIFIERLOOSE]})`), h(`PRERELEASE`, `(?:-(${c[u.PRERELEASEIDENTIFIER]}(?:\\.${c[u.PRERELEASEIDENTIFIER]})*))`), h(`PRERELEASELOOSE`, `(?:-?(${c[u.PRERELEASEIDENTIFIERLOOSE]}(?:\\.${c[u.PRERELEASEIDENTIFIERLOOSE]})*))`), h(`BUILDIDENTIFIER`, `${f}+`), h(`BUILD`, `(?:\\+(${c[u.BUILDIDENTIFIER]}(?:\\.${c[u.BUILDIDENTIFIER]})*))`), h(`FULLPLAIN`, `v?${c[u.MAINVERSION]}${c[u.PRERELEASE]}?${c[u.BUILD]}?`), h(`FULL`, `^${c[u.FULLPLAIN]}$`), h(`LOOSEPLAIN`, `[v=\\s]*${c[u.MAINVERSIONLOOSE]}${c[u.PRERELEASELOOSE]}?${c[u.BUILD]}?`), h(`LOOSE`, `^${c[u.LOOSEPLAIN]}$`), h(`GTLT`, `((?:<|>)?=?)`), h(`XRANGEIDENTIFIERLOOSE`, `${c[u.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`), h(`XRANGEIDENTIFIER`, `${c[u.NUMERICIDENTIFIER]}|x|X|\\*`), h(`XRANGEPLAIN`, `[v=\\s]*(${c[u.XRANGEIDENTIFIER]})(?:\\.(${c[u.XRANGEIDENTIFIER]})(?:\\.(${c[u.XRANGEIDENTIFIER]})(?:${c[u.PRERELEASE]})?${c[u.BUILD]}?)?)?`), h(`XRANGEPLAINLOOSE`, `[v=\\s]*(${c[u.XRANGEIDENTIFIERLOOSE]})(?:\\.(${c[u.XRANGEIDENTIFIERLOOSE]})(?:\\.(${c[u.XRANGEIDENTIFIERLOOSE]})(?:${c[u.PRERELEASELOOSE]})?${c[u.BUILD]}?)?)?`), h(`XRANGE`, `^${c[u.GTLT]}\\s*${c[u.XRANGEPLAIN]}$`), h(`XRANGELOOSE`, `^${c[u.GTLT]}\\s*${c[u.XRANGEPLAINLOOSE]}$`), h(`COERCEPLAIN`, `(^|[^\\d])(\\d{1,${n}})(?:\\.(\\d{1,${n}}))?(?:\\.(\\d{1,${n}}))?`), h(`COERCE`, `${c[u.COERCEPLAIN]}(?:$|[^\\d])`), h(`COERCEFULL`, c[u.COERCEPLAIN] + `(?:${c[u.PRERELEASE]})?(?:${c[u.BUILD]})?(?:$|[^\\d])`), h(`COERCERTL`, c[u.COERCE], !0), h(`COERCERTLFULL`, c[u.COERCEFULL], !0), h(`LONETILDE`, `(?:~>?)`), h(`TILDETRIM`, `(\\s*)${c[u.LONETILDE]}\\s+`, !0), e.tildeTrimReplace = `$1~`, h(`TILDE`, `^${c[u.LONETILDE]}${c[u.XRANGEPLAIN]}$`), h(`TILDELOOSE`, `^${c[u.LONETILDE]}${c[u.XRANGEPLAINLOOSE]}$`), h(`LONECARET`, `(?:\\^)`), h(`CARETTRIM`, `(\\s*)${c[u.LONECARET]}\\s+`, !0), e.caretTrimReplace = `$1^`, h(`CARET`, `^${c[u.LONECARET]}${c[u.XRANGEPLAIN]}$`), h(`CARETLOOSE`, `^${c[u.LONECARET]}${c[u.XRANGEPLAINLOOSE]}$`), h(`COMPARATORLOOSE`, `^${c[u.GTLT]}\\s*(${c[u.LOOSEPLAIN]})$|^$`), h(`COMPARATOR`, `^${c[u.GTLT]}\\s*(${c[u.FULLPLAIN]})$|^$`), h(`COMPARATORTRIM`, `(\\s*)${c[u.GTLT]}\\s*(${c[u.LOOSEPLAIN]}|${c[u.XRANGEPLAIN]})`, !0), e.comparatorTrimReplace = `$1$2$3`, h(`HYPHENRANGE`, `^\\s*(${c[u.XRANGEPLAIN]})\\s+-\\s+(${c[u.XRANGEPLAIN]})\\s*$`), h(`HYPHENRANGELOOSE`, `^\\s*(${c[u.XRANGEPLAINLOOSE]})\\s+-\\s+(${c[u.XRANGEPLAINLOOSE]})\\s*$`), h(`STAR`, `(<|>)?=?\\s*\\*`), h(`GTE0`, `^\\s*>=\\s*0\\.0\\.0\\s*$`), h(`GTE0PRE`, `^\\s*>=\\s*0\\.0\\.0-0\\s*$`)
    })),
    C = t(((e, t) => {
        var n = Object.freeze({
                loose: !0
            }),
            r = Object.freeze({});
        t.exports = e => e ? typeof e == `object` ? e : n : r
    })),
    w = t(((e, t) => {
        var n = /^[0-9]+$/,
            r = (e, t) => {
                if (typeof e == `number` && typeof t == `number`) return e === t ? 0 : e < t ? -1 : 1;
                let r = n.test(e),
                    i = n.test(t);
                return r && i && (e = +e, t = +t), e === t ? 0 : r && !i ? -1 : i && !r ? 1 : e < t ? -1 : 1
            };
        t.exports = {
            compareIdentifiers: r,
            rcompareIdentifiers: (e, t) => r(t, e)
        }
    })),
    T = t(((e, t) => {
        var n = x(),
            {
                MAX_LENGTH: r,
                MAX_SAFE_INTEGER: i
            } = b(),
            {
                safeRe: a,
                t: o
            } = S(),
            s = C(),
            {
                compareIdentifiers: c
            } = w(),
            l = (e, t) => {
                let n = t.split(`.`);
                if (n.length > e.length) return !1;
                for (let t = 0; t < n.length; t++)
                    if (c(e[t], n[t]) !== 0) return !1;
                return !0
            };
        t.exports = class e {
            constructor(t, c) {
                if (c = s(c), t instanceof e) {
                    if (t.loose === !!c.loose && t.includePrerelease === !!c.includePrerelease) return t;
                    t = t.version
                } else if (typeof t != `string`) throw TypeError(`Invalid version. Must be a string. Got type "${typeof t}".`);
                if (t.length > r) throw TypeError(`version is longer than ${r} characters`);
                n(`SemVer`, t, c), this.options = c, this.loose = !!c.loose, this.includePrerelease = !!c.includePrerelease;
                let l = t.trim().match(c.loose ? a[o.LOOSE] : a[o.FULL]);
                if (!l) throw TypeError(`Invalid Version: ${t}`);
                if (this.raw = t, this.major = +l[1], this.minor = +l[2], this.patch = +l[3], this.major > i || this.major < 0) throw TypeError(`Invalid major version`);
                if (this.minor > i || this.minor < 0) throw TypeError(`Invalid minor version`);
                if (this.patch > i || this.patch < 0) throw TypeError(`Invalid patch version`);
                l[4] ? this.prerelease = l[4].split(`.`).map(e => {
                    if (/^[0-9]+$/.test(e)) {
                        let t = +e;
                        if (t >= 0 && t < i) return t
                    }
                    return e
                }) : this.prerelease = [], this.build = l[5] ? l[5].split(`.`) : [], this.format()
            }
            format() {
                return this.version = `${this.major}.${this.minor}.${this.patch}`, this.prerelease.length && (this.version += `-${this.prerelease.join(`.`)}`), this.version
            }
            toString() {
                return this.version
            }
            compare(t) {
                if (n(`SemVer.compare`, this.version, this.options, t), !(t instanceof e)) {
                    if (typeof t == `string` && t === this.version) return 0;
                    t = new e(t, this.options)
                }
                return t.version === this.version ? 0 : this.compareMain(t) || this.comparePre(t)
            }
            compareMain(t) {
                return t instanceof e || (t = new e(t, this.options)), this.major < t.major ? -1 : this.major > t.major ? 1 : this.minor < t.minor ? -1 : this.minor > t.minor ? 1 : this.patch < t.patch ? -1 : this.patch > t.patch ? 1 : 0
            }
            comparePre(t) {
                if (t instanceof e || (t = new e(t, this.options)), this.prerelease.length && !t.prerelease.length) return -1;
                if (!this.prerelease.length && t.prerelease.length) return 1;
                if (!this.prerelease.length && !t.prerelease.length) return 0;
                let r = 0;
                do {
                    let e = this.prerelease[r],
                        i = t.prerelease[r];
                    if (n(`prerelease compare`, r, e, i), e === void 0 && i === void 0) return 0;
                    if (i === void 0) return 1;
                    if (e === void 0) return -1;
                    if (e === i) continue;
                    return c(e, i)
                } while (++r)
            }
            compareBuild(t) {
                t instanceof e || (t = new e(t, this.options));
                let r = 0;
                do {
                    let e = this.build[r],
                        i = t.build[r];
                    if (n(`build compare`, r, e, i), e === void 0 && i === void 0) return 0;
                    if (i === void 0) return 1;
                    if (e === void 0) return -1;
                    if (e === i) continue;
                    return c(e, i)
                } while (++r)
            }
            inc(e, t, n) {
                if (e.startsWith(`pre`)) {
                    if (!t && n === !1) throw Error(`invalid increment argument: identifier is empty`);
                    if (t) {
                        let e = `-${t}`.match(this.options.loose ? a[o.PRERELEASELOOSE] : a[o.PRERELEASE]);
                        if (!e || e[1] !== t) throw Error(`invalid identifier: ${t}`)
                    }
                }
                switch (e) {
                    case `premajor`:
                        this.prerelease.length = 0, this.patch = 0, this.minor = 0, this.major++, this.inc(`pre`, t, n);
                        break;
                    case `preminor`:
                        this.prerelease.length = 0, this.patch = 0, this.minor++, this.inc(`pre`, t, n);
                        break;
                    case `prepatch`:
                        this.prerelease.length = 0, this.inc(`patch`, t, n), this.inc(`pre`, t, n);
                        break;
                    case `prerelease`:
                        this.prerelease.length === 0 && this.inc(`patch`, t, n), this.inc(`pre`, t, n);
                        break;
                    case `release`:
                        if (this.prerelease.length === 0) throw Error(`version ${this.raw} is not a prerelease`);
                        this.prerelease.length = 0;
                        break;
                    case `major`:
                        (this.minor !== 0 || this.patch !== 0 || this.prerelease.length === 0) && this.major++, this.minor = 0, this.patch = 0, this.prerelease = [];
                        break;
                    case `minor`:
                        (this.patch !== 0 || this.prerelease.length === 0) && this.minor++, this.patch = 0, this.prerelease = [];
                        break;
                    case `patch`:
                        this.prerelease.length === 0 && this.patch++, this.prerelease = [];
                        break;
                    case `pre`:
                        {
                            let e = Number(n) ? 1 : 0;
                            if (this.prerelease.length === 0) this.prerelease = [e];
                            else {
                                let r = this.prerelease.length;
                                for (; --r >= 0;) typeof this.prerelease[r] == `number` && (this.prerelease[r]++, r = -2);
                                if (r === -1) {
                                    if (t === this.prerelease.join(`.`) && n === !1) throw Error(`invalid increment argument: identifier already exists`);
                                    this.prerelease.push(e)
                                }
                            }
                            if (t) {
                                let r = [t, e];
                                if (n === !1 && (r = [t]), l(this.prerelease, t)) {
                                    let e = this.prerelease[t.split(`.`).length];
                                    isNaN(e) && (this.prerelease = r)
                                } else this.prerelease = r
                            }
                            break
                        }
                    default:
                        throw Error(`invalid increment argument: ${e}`)
                }
                return this.raw = this.format(), this.build.length && (this.raw += `+${this.build.join(`.`)}`), this
            }
        }
    })),
    E = t(((e, t) => {
        var n = T();
        t.exports = (e, t, r = !1) => {
            if (e instanceof n) return e;
            try {
                return new n(e, t)
            } catch (e) {
                if (!r) return null;
                throw e
            }
        }
    })),
    D = t(((e, t) => {
        var n = E();
        t.exports = (e, t) => {
            let r = n(e, t);
            return r ? r.version : null
        }
    })),
    O = t(((e, t) => {
        var n = E();
        t.exports = (e, t) => {
            let r = n(e.trim().replace(/^[=v]+/, ``), t);
            return r ? r.version : null
        }
    })),
    k = t(((e, t) => {
        var n = T();
        t.exports = (e, t, r, i, a) => {
            typeof r == `string` && (a = i, i = r, r = void 0);
            try {
                return new n(e instanceof n ? e.version : e, r).inc(t, i, a).version
            } catch {
                return null
            }
        }
    })),
    A = t(((e, t) => {
        var n = E();
        t.exports = (e, t) => {
            let r = n(e, null, !0),
                i = n(t, null, !0),
                a = r.compare(i);
            if (a === 0) return null;
            let o = a > 0,
                s = o ? r : i,
                c = o ? i : r,
                l = !!s.prerelease.length;
            if (c.prerelease.length && !l) {
                if (!c.patch && !c.minor) return `major`;
                if (c.compareMain(s) === 0) return c.minor && !c.patch ? `minor` : `patch`
            }
            let u = l ? `pre` : ``;
            return r.major === i.major ? r.minor === i.minor ? r.patch === i.patch ? `prerelease` : u + `patch` : u + `minor` : u + `major`
        }
    })),
    j = t(((e, t) => {
        var n = T();
        t.exports = (e, t) => new n(e, t).major
    })),
    M = t(((e, t) => {
        var n = T();
        t.exports = (e, t) => new n(e, t).minor
    })),
    ee = t(((e, t) => {
        var n = T();
        t.exports = (e, t) => new n(e, t).patch
    })),
    N = t(((e, t) => {
        var n = E();
        t.exports = (e, t) => {
            let r = n(e, t);
            return r && r.prerelease.length ? r.prerelease : null
        }
    })),
    P = t(((e, t) => {
        var n = T();
        t.exports = (e, t, r) => new n(e, r).compare(new n(t, r))
    })),
    te = t(((e, t) => {
        var n = P();
        t.exports = (e, t, r) => n(t, e, r)
    })),
    ne = t(((e, t) => {
        var n = P();
        t.exports = (e, t) => n(e, t, !0)
    })),
    F = t(((e, t) => {
        var n = T();
        t.exports = (e, t, r) => {
            let i = new n(e, r),
                a = new n(t, r);
            return i.compare(a) || i.compareBuild(a)
        }
    })),
    re = t(((e, t) => {
        var n = F();
        t.exports = (e, t) => e.sort((e, r) => n(e, r, t))
    })),
    ie = t(((e, t) => {
        var n = F();
        t.exports = (e, t) => e.sort((e, r) => n(r, e, t))
    })),
    I = t(((e, t) => {
        var n = P();
        t.exports = (e, t, r) => n(e, t, r) > 0
    })),
    L = t(((e, t) => {
        var n = P();
        t.exports = (e, t, r) => n(e, t, r) < 0
    })),
    ae = t(((e, t) => {
        var n = P();
        t.exports = (e, t, r) => n(e, t, r) === 0
    })),
    oe = t(((e, t) => {
        var n = P();
        t.exports = (e, t, r) => n(e, t, r) !== 0
    })),
    R = t(((e, t) => {
        var n = P();
        t.exports = (e, t, r) => n(e, t, r) >= 0
    })),
    z = t(((e, t) => {
        var n = P();
        t.exports = (e, t, r) => n(e, t, r) <= 0
    })),
    B = t(((e, t) => {
        var n = ae(),
            r = oe(),
            i = I(),
            a = R(),
            o = L(),
            s = z();
        t.exports = (e, t, c, l) => {
            switch (t) {
                case `===`:
                    return typeof e == `object` && (e = e.version), typeof c == `object` && (c = c.version), e === c;
                case `!==`:
                    return typeof e == `object` && (e = e.version), typeof c == `object` && (c = c.version), e !== c;
                case ``:
                case `=`:
                case `==`:
                    return n(e, c, l);
                case `!=`:
                    return r(e, c, l);
                case `>`:
                    return i(e, c, l);
                case `>=`:
                    return a(e, c, l);
                case `<`:
                    return o(e, c, l);
                case `<=`:
                    return s(e, c, l);
                default:
                    throw TypeError(`Invalid operator: ${t}`)
            }
        }
    })),
    se = t(((e, t) => {
        var n = T(),
            r = E(),
            {
                safeRe: i,
                t: a
            } = S();
        t.exports = (e, t) => {
            if (e instanceof n) return e;
            if (typeof e == `number` && (e = String(e)), typeof e != `string`) return null;
            t ||= {};
            let o = null;
            if (!t.rtl) o = e.match(t.includePrerelease ? i[a.COERCEFULL] : i[a.COERCE]);
            else {
                let n = t.includePrerelease ? i[a.COERCERTLFULL] : i[a.COERCERTL],
                    r;
                for (;
                    (r = n.exec(e)) && (!o || o.index + o[0].length !== e.length);)(!o || r.index + r[0].length !== o.index + o[0].length) && (o = r), n.lastIndex = r.index + r[1].length + r[2].length;
                n.lastIndex = -1
            }
            if (o === null) return null;
            let s = o[2];
            return r(`${s}.${o[3]||`0`}.${o[4]||`0`}${t.includePrerelease&&o[5]?`-${o[5]}`:``}${t.includePrerelease&&o[6]?`+${o[6]}`:``}`, t)
        }
    })),
    ce = t(((e, t) => {
        var n = E(),
            r = b(),
            i = T(),
            a = (e, t, n) => {
                if (!r.RELEASE_TYPES.includes(t)) return null;
                let i = o(e, n);
                return i && s(i, t)
            },
            o = (e, t) => n(e instanceof i ? e.version : e, t),
            s = (e, t) => {
                if (c(t)) return e.version;
                switch (e.prerelease = [], t) {
                    case `major`:
                        e.minor = 0, e.patch = 0;
                        break;
                    case `minor`:
                        e.patch = 0;
                        break
                }
                return e.format()
            },
            c = e => e.startsWith(`pre`);
        t.exports = a
    })),
    le = t(((e, t) => {
        t.exports = class {
            constructor() {
                this.max = 1e3, this.map = new Map
            }
            get(e) {
                let t = this.map.get(e);
                if (t !== void 0) return this.map.delete(e), this.map.set(e, t), t
            }
            delete(e) {
                return this.map.delete(e)
            }
            set(e, t) {
                if (!this.delete(e) && t !== void 0) {
                    if (this.map.size >= this.max) {
                        let e = this.map.keys().next().value;
                        this.delete(e)
                    }
                    this.map.set(e, t)
                }
                return this
            }
        }
    })),
    V = t(((e, t) => {
        var n = /\s+/g;
        t.exports = class e {
            constructor(t, r) {
                if (r = i(r), t instanceof e) return t.loose === !!r.loose && t.includePrerelease === !!r.includePrerelease ? t : new e(t.raw, r);
                if (t instanceof a) return this.raw = t.value, this.set = [
                    [t]
                ], this.formatted = void 0, this;
                if (this.options = r, this.loose = !!r.loose, this.includePrerelease = !!r.includePrerelease, this.raw = t.trim().replace(n, ` `), this.set = this.raw.split(`||`).map(e => this.parseRange(e.trim())).filter(e => e.length), !this.set.length) throw TypeError(`Invalid SemVer Range: ${this.raw}`);
                if (this.set.length > 1) {
                    let e = this.set[0];
                    if (this.set = this.set.filter(e => !_(e[0])), this.set.length === 0) this.set = [e];
                    else if (this.set.length > 1) {
                        for (let e of this.set)
                            if (e.length === 1 && v(e[0])) {
                                this.set = [e];
                                break
                            }
                    }
                }
                this.formatted = void 0
            }
            get range() {
                if (this.formatted === void 0) {
                    this.formatted = ``;
                    for (let e = 0; e < this.set.length; e++) {
                        e > 0 && (this.formatted += `||`);
                        let t = this.set[e];
                        for (let e = 0; e < t.length; e++) e > 0 && (this.formatted += ` `), this.formatted += t[e].toString().trim()
                    }
                }
                return this.formatted
            }
            format() {
                return this.range
            }
            toString() {
                return this.range
            }
            parseRange(e) {
                e = e.replace(g, ``);
                let t = ((this.options.includePrerelease && m) | (this.options.loose && h)) + `:` + e,
                    n = r.get(t);
                if (n) return n;
                let i = this.options.loose,
                    s = i ? c[u.HYPHENRANGELOOSE] : c[u.HYPHENRANGE];
                e = e.replace(s, te(this.options.includePrerelease)), o(`hyphen replace`, e), e = e.replace(c[u.COMPARATORTRIM], d), o(`comparator trim`, e), e = e.replace(c[u.TILDETRIM], f), o(`tilde trim`, e), e = e.replace(c[u.CARETTRIM], p), o(`caret trim`, e);
                let l = e.split(` `).map(e => w(e, this.options)).join(` `).split(/\s+/).map(e => P(e, this.options));
                i && (l = l.filter(e => (o(`loose invalid filter`, e, this.options), !!e.match(c[u.COMPARATORLOOSE])))), o(`range list`, l);
                let v = new Map,
                    y = l.map(e => new a(e, this.options));
                for (let e of y) {
                    if (_(e)) return [e];
                    v.set(e.value, e)
                }
                v.size > 1 && v.has(``) && v.delete(``);
                let b = [...v.values()];
                return r.set(t, b), b
            }
            intersects(t, n) {
                if (!(t instanceof e)) throw TypeError(`a Range is required`);
                return this.set.some(e => y(e, n) && t.set.some(t => y(t, n) && e.every(e => t.every(t => e.intersects(t, n)))))
            }
            test(e) {
                if (!e) return !1;
                if (typeof e == `string`) try {
                    e = new s(e, this.options)
                } catch {
                    return !1
                }
                for (let t = 0; t < this.set.length; t++)
                    if (ne(this.set[t], e, this.options)) return !0;
                return !1
            }
        };
        var r = new(le()),
            i = C(),
            a = H(),
            o = x(),
            s = T(),
            {
                safeRe: c,
                src: l,
                t: u,
                comparatorTrimReplace: d,
                tildeTrimReplace: f,
                caretTrimReplace: p
            } = S(),
            {
                FLAG_INCLUDE_PRERELEASE: m,
                FLAG_LOOSE: h
            } = b(),
            g = new RegExp(l[u.BUILD], `g`),
            _ = e => e.value === `<0.0.0-0`,
            v = e => e.value === ``,
            y = (e, t) => {
                let n = !0,
                    r = e.slice(),
                    i = r.pop();
                for (; n && r.length;) n = r.every(e => i.intersects(e, t)), i = r.pop();
                return n
            },
            w = (e, t) => (e = e.replace(c[u.BUILD], ``), o(`comp`, e, t), e = A(e, t), o(`caret`, e), e = O(e, t), o(`tildes`, e), e = M(e, t), o(`xrange`, e), e = N(e, t), o(`stars`, e), e),
            E = e => !e || e.toLowerCase() === `x` || e === `*`,
            D = (e, t, n) => E(e) && !E(t) || E(t) && n && !E(n),
            O = (e, t) => e.trim().split(/\s+/).map(e => k(e, t)).join(` `),
            k = (e, t) => {
                let n = t.loose ? c[u.TILDELOOSE] : c[u.TILDE],
                    r = t.includePrerelease ? `-0` : ``;
                return e.replace(n, (t, n, i, a, s) => {
                    o(`tilde`, e, t, n, i, a, s);
                    let c;
                    return E(n) ? c = `` : E(i) ? c = `>=${n}.0.0${r} <${+n+1}.0.0-0` : E(a) ? c = `>=${n}.${i}.0${r} <${n}.${+i+1}.0-0` : s ? (o(`replaceTilde pr`, s), c = `>=${n}.${i}.${a}-${s} <${n}.${+i+1}.0-0`) : c = `>=${n}.${i}.${a} <${n}.${+i+1}.0-0`, o(`tilde return`, c), c
                })
            },
            A = (e, t) => e.trim().split(/\s+/).map(e => j(e, t)).join(` `),
            j = (e, t) => {
                o(`caret`, e, t);
                let n = t.loose ? c[u.CARETLOOSE] : c[u.CARET],
                    r = t.includePrerelease ? `-0` : ``;
                return e.replace(n, (t, n, i, a, s) => {
                    o(`caret`, e, t, n, i, a, s);
                    let c;
                    return E(n) ? c = `` : E(i) ? c = `>=${n}.0.0${r} <${+n+1}.0.0-0` : E(a) ? c = n === `0` ? `>=${n}.${i}.0${r} <${n}.${+i+1}.0-0` : `>=${n}.${i}.0${r} <${+n+1}.0.0-0` : s ? (o(`replaceCaret pr`, s), c = n === `0` ? i === `0` ? `>=${n}.${i}.${a}-${s} <${n}.${i}.${+a+1}-0` : `>=${n}.${i}.${a}-${s} <${n}.${+i+1}.0-0` : `>=${n}.${i}.${a}-${s} <${+n+1}.0.0-0`) : (o(`no pr`), c = n === `0` ? i === `0` ? `>=${n}.${i}.${a} <${n}.${i}.${+a+1}-0` : `>=${n}.${i}.${a} <${n}.${+i+1}.0-0` : `>=${n}.${i}.${a} <${+n+1}.0.0-0`), o(`caret return`, c), c
                })
            },
            M = (e, t) => (o(`replaceXRanges`, e, t), e.split(/\s+/).map(e => ee(e, t)).join(` `)),
            ee = (e, t) => {
                e = e.trim();
                let n = t.loose ? c[u.XRANGELOOSE] : c[u.XRANGE];
                return e.replace(n, (n, r, i, a, s, c) => {
                    if (o(`xRange`, e, n, r, i, a, s, c), D(i, a, s)) return e;
                    let l = E(i),
                        u = l || E(a),
                        d = u || E(s),
                        f = d;
                    return r === `=` && f && (r = ``), c = t.includePrerelease ? `-0` : ``, l ? n = r === `>` || r === `<` ? `<0.0.0-0` : `*` : r && f ? (u && (a = 0), s = 0, r === `>` ? (r = `>=`, u ? (i = +i + 1, a = 0, s = 0) : (a = +a + 1, s = 0)) : r === `<=` && (r = `<`, u ? i = +i + 1 : a = +a + 1), r === `<` && (c = `-0`), n = `${r+i}.${a}.${s}${c}`) : u ? n = `>=${i}.0.0${c} <${+i+1}.0.0-0` : d && (n = `>=${i}.${a}.0${c} <${i}.${+a+1}.0-0`), o(`xRange return`, n), n
                })
            },
            N = (e, t) => (o(`replaceStars`, e, t), e.trim().replace(c[u.STAR], ``)),
            P = (e, t) => (o(`replaceGTE0`, e, t), e.trim().replace(c[t.includePrerelease ? u.GTE0PRE : u.GTE0], ``)),
            te = e => (t, n, r, i, a, o, s, c, l, u, d, f) => (n = E(r) ? `` : E(i) ? `>=${r}.0.0${e?`-0`:``}` : E(a) ? `>=${r}.${i}.0${e?`-0`:``}` : o ? `>=${n}` : `>=${n}${e?`-0`:``}`, c = E(l) ? `` : E(u) ? `<${+l+1}.0.0-0` : E(d) ? `<${l}.${+u+1}.0-0` : f ? `<=${l}.${u}.${d}-${f}` : e ? `<${l}.${u}.${+d+1}-0` : `<=${c}`, `${n} ${c}`.trim()),
            ne = (e, t, n) => {
                for (let n = 0; n < e.length; n++)
                    if (!e[n].test(t)) return !1;
                if (t.prerelease.length && !n.includePrerelease) {
                    for (let n = 0; n < e.length; n++)
                        if (o(e[n].semver), e[n].semver !== a.ANY && e[n].semver.prerelease.length > 0) {
                            let r = e[n].semver;
                            if (r.major === t.major && r.minor === t.minor && r.patch === t.patch) return !0
                        }
                    return !1
                }
                return !0
            }
    })),
    H = t(((e, t) => {
        var n = Symbol(`SemVer ANY`);
        t.exports = class e {
            static get ANY() {
                return n
            }
            constructor(t, i) {
                if (i = r(i), t instanceof e) {
                    if (t.loose === !!i.loose) return t;
                    t = t.value
                }
                t = t.trim().split(/\s+/).join(` `), s(`comparator`, t, i), this.options = i, this.loose = !!i.loose, this.parse(t), this.semver === n ? this.value = `` : this.value = this.operator + this.semver.version, s(`comp`, this)
            }
            parse(e) {
                let t = this.options.loose ? i[a.COMPARATORLOOSE] : i[a.COMPARATOR],
                    r = e.match(t);
                if (!r) throw TypeError(`Invalid comparator: ${e}`);
                this.operator = r[1] === void 0 ? `` : r[1], this.operator === `=` && (this.operator = ``), r[2] ? this.semver = new c(r[2], this.options.loose) : this.semver = n
            }
            toString() {
                return this.value
            }
            test(e) {
                if (s(`Comparator.test`, e, this.options.loose), this.semver === n || e === n) return !0;
                if (typeof e == `string`) try {
                    e = new c(e, this.options)
                } catch {
                    return !1
                }
                return o(e, this.operator, this.semver, this.options)
            }
            intersects(t, n) {
                if (!(t instanceof e)) throw TypeError(`a Comparator is required`);
                return this.operator === `` ? this.value === `` ? !0 : new l(t.value, n).test(this.value) : t.operator === `` ? t.value === `` ? !0 : new l(this.value, n).test(t.semver) : (n = r(n), n.includePrerelease && (this.value === `<0.0.0-0` || t.value === `<0.0.0-0`) || !n.includePrerelease && (this.value.startsWith(`<0.0.0`) || t.value.startsWith(`<0.0.0`)) ? !1 : !!(this.operator.startsWith(`>`) && t.operator.startsWith(`>`) || this.operator.startsWith(`<`) && t.operator.startsWith(`<`) || this.semver.version === t.semver.version && this.operator.includes(`=`) && t.operator.includes(`=`) || o(this.semver, `<`, t.semver, n) && this.operator.startsWith(`>`) && t.operator.startsWith(`<`) || o(this.semver, `>`, t.semver, n) && this.operator.startsWith(`<`) && t.operator.startsWith(`>`)))
            }
        };
        var r = C(),
            {
                safeRe: i,
                t: a
            } = S(),
            o = B(),
            s = x(),
            c = T(),
            l = V()
    })),
    U = t(((e, t) => {
        var n = V();
        t.exports = (e, t, r) => {
            try {
                t = new n(t, r)
            } catch {
                return !1
            }
            return t.test(e)
        }
    })),
    ue = t(((e, t) => {
        var n = V();
        t.exports = (e, t) => new n(e, t).set.map(e => e.map(e => e.value).join(` `).trim().split(` `))
    })),
    de = t(((e, t) => {
        var n = T(),
            r = V();
        t.exports = (e, t, i) => {
            let a = null,
                o = null,
                s = null;
            try {
                s = new r(t, i)
            } catch {
                return null
            }
            return e.forEach(e => {
                s.test(e) && (!a || o.compare(e) === -1) && (a = e, o = new n(a, i))
            }), a
        }
    })),
    fe = t(((e, t) => {
        var n = T(),
            r = V();
        t.exports = (e, t, i) => {
            let a = null,
                o = null,
                s = null;
            try {
                s = new r(t, i)
            } catch {
                return null
            }
            return e.forEach(e => {
                s.test(e) && (!a || o.compare(e) === 1) && (a = e, o = new n(a, i))
            }), a
        }
    })),
    pe = t(((e, t) => {
        var n = T(),
            r = V(),
            i = I();
        t.exports = (e, t) => {
            e = new r(e, t);
            let a = new n(`0.0.0`);
            if (e.test(a) || (a = new n(`0.0.0-0`), e.test(a))) return a;
            a = null;
            for (let t = 0; t < e.set.length; ++t) {
                let r = e.set[t],
                    o = null;
                r.forEach(e => {
                    let t = new n(e.semver.version);
                    switch (e.operator) {
                        case `>`:
                            t.prerelease.length === 0 ? t.patch++ : t.prerelease.push(0), t.raw = t.format();
                        case ``:
                        case `>=`:
                            (!o || i(t, o)) && (o = t);
                            break;
                        case `<`:
                        case `<=`:
                            break;
                        default:
                            throw Error(`Unexpected operation: ${e.operator}`)
                    }
                }), o && (!a || i(a, o)) && (a = o)
            }
            return a && e.test(a) ? a : null
        }
    })),
    me = t(((e, t) => {
        var n = V();
        t.exports = (e, t) => {
            try {
                return new n(e, t).range || `*`
            } catch {
                return null
            }
        }
    })),
    W = t(((e, t) => {
        var n = T(),
            r = H(),
            {
                ANY: i
            } = r,
            a = V(),
            o = U(),
            s = I(),
            c = L(),
            l = z(),
            u = R();
        t.exports = (e, t, d, f) => {
            e = new n(e, f), t = new a(t, f);
            let p, m, h, g, _;
            switch (d) {
                case `>`:
                    p = s, m = l, h = c, g = `>`, _ = `>=`;
                    break;
                case `<`:
                    p = c, m = u, h = s, g = `<`, _ = `<=`;
                    break;
                default:
                    throw TypeError(`Must provide a hilo val of "<" or ">"`)
            }
            if (o(e, t, f)) return !1;
            for (let n = 0; n < t.set.length; ++n) {
                let a = t.set[n],
                    o = null,
                    s = null;
                if (a.forEach(e => {
                        e.semver === i && (e = new r(`>=0.0.0`)), o ||= e, s ||= e, p(e.semver, o.semver, f) ? o = e : h(e.semver, s.semver, f) && (s = e)
                    }), o.operator === g || o.operator === _ || (!s.operator || s.operator === g) && m(e, s.semver) || s.operator === _ && h(e, s.semver)) return !1
            }
            return !0
        }
    })),
    he = t(((e, t) => {
        var n = W();
        t.exports = (e, t, r) => n(e, t, `>`, r)
    })),
    ge = t(((e, t) => {
        var n = W();
        t.exports = (e, t, r) => n(e, t, `<`, r)
    })),
    _e = t(((e, t) => {
        var n = V();
        t.exports = (e, t, r) => (e = new n(e, r), t = new n(t, r), e.intersects(t, r))
    })),
    ve = t(((e, t) => {
        var n = U(),
            r = P();
        t.exports = (e, t, i) => {
            let a = [],
                o = null,
                s = null,
                c = e.sort((e, t) => r(e, t, i));
            for (let e of c) n(e, t, i) ? (s = e, o ||= e) : (s && a.push([o, s]), s = null, o = null);
            o && a.push([o, null]);
            let l = [];
            for (let [e, t] of a) e === t ? l.push(e) : !t && e === c[0] ? l.push(`*`) : t ? e === c[0] ? l.push(`<=${t}`) : l.push(`${e} - ${t}`) : l.push(`>=${e}`);
            let u = l.join(` || `),
                d = typeof t.raw == `string` ? t.raw : String(t);
            return u.length < d.length ? u : t
        }
    })),
    ye = t(((e, t) => {
        var n = V(),
            r = H(),
            {
                ANY: i
            } = r,
            a = U(),
            o = P(),
            s = (e, t, r = {}) => {
                if (e === t) return !0;
                e = new n(e, r), t = new n(t, r);
                let i = !1;
                OUTER: for (let n of e.set) {
                    for (let e of t.set) {
                        let t = u(n, e, r);
                        if (i ||= t !== null, t) continue OUTER
                    }
                    if (i) return !1
                }
                return !0
            },
            c = [new r(`>=0.0.0-0`)],
            l = [new r(`>=0.0.0`)],
            u = (e, t, n) => {
                if (e === t) return !0;
                if (e.length === 1 && e[0].semver === i) {
                    if (t.length === 1 && t[0].semver === i) return !0;
                    e = n.includePrerelease ? c : l
                }
                if (t.length === 1 && t[0].semver === i) {
                    if (n.includePrerelease) return !0;
                    t = l
                }
                let r = new Set,
                    s, u;
                for (let t of e) t.operator === `>` || t.operator === `>=` ? s = d(s, t, n) : t.operator === `<` || t.operator === `<=` ? u = f(u, t, n) : r.add(t.semver);
                if (r.size > 1) return null;
                let p;
                if (s && u && (p = o(s.semver, u.semver, n), p > 0 || p === 0 && (s.operator !== `>=` || u.operator !== `<=`))) return null;
                for (let e of r) {
                    if (s && !a(e, String(s), n) || u && !a(e, String(u), n)) return null;
                    for (let r of t)
                        if (!a(e, String(r), n)) return !1;
                    return !0
                }
                let m, h, g, _, v = u && !n.includePrerelease && u.semver.prerelease.length ? u.semver : !1,
                    y = s && !n.includePrerelease && s.semver.prerelease.length ? s.semver : !1;
                v && v.prerelease.length === 1 && u.operator === `<` && v.prerelease[0] === 0 && (v = !1);
                for (let e of t) {
                    if (_ = _ || e.operator === `>` || e.operator === `>=`, g = g || e.operator === `<` || e.operator === `<=`, s) {
                        if (y && e.semver.prerelease && e.semver.prerelease.length && e.semver.major === y.major && e.semver.minor === y.minor && e.semver.patch === y.patch && (y = !1), e.operator === `>` || e.operator === `>=`) {
                            if (m = d(s, e, n), m === e && m !== s) return !1
                        } else if (s.operator === `>=` && !e.test(s.semver)) return !1
                    }
                    if (u) {
                        if (v && e.semver.prerelease && e.semver.prerelease.length && e.semver.major === v.major && e.semver.minor === v.minor && e.semver.patch === v.patch && (v = !1), e.operator === `<` || e.operator === `<=`) {
                            if (h = f(u, e, n), h === e && h !== u) return !1
                        } else if (u.operator === `<=` && !e.test(u.semver)) return !1
                    }
                    if (!e.operator && (u || s) && p !== 0) return !1
                }
                return !(s && g && !u && p !== 0 || u && _ && !s && p !== 0 || y || v)
            },
            d = (e, t, n) => {
                if (!e) return t;
                let r = o(e.semver, t.semver, n);
                return r > 0 ? e : r < 0 || t.operator === `>` && e.operator === `>=` ? t : e
            },
            f = (e, t, n) => {
                if (!e) return t;
                let r = o(e.semver, t.semver, n);
                return r < 0 ? e : r > 0 || t.operator === `<` && e.operator === `<=` ? t : e
            };
        t.exports = s
    })),
    G = t(((e, t) => {
        var n = S(),
            r = b(),
            i = T(),
            a = w();
        t.exports = {
            parse: E(),
            valid: D(),
            clean: O(),
            inc: k(),
            diff: A(),
            major: j(),
            minor: M(),
            patch: ee(),
            prerelease: N(),
            compare: P(),
            rcompare: te(),
            compareLoose: ne(),
            compareBuild: F(),
            sort: re(),
            rsort: ie(),
            gt: I(),
            lt: L(),
            eq: ae(),
            neq: oe(),
            gte: R(),
            lte: z(),
            cmp: B(),
            coerce: se(),
            truncate: ce(),
            Comparator: H(),
            Range: V(),
            satisfies: U(),
            toComparators: ue(),
            maxSatisfying: de(),
            minSatisfying: fe(),
            minVersion: pe(),
            validRange: me(),
            outside: W(),
            gtr: he(),
            ltr: ge(),
            intersects: _e(),
            simplifyRange: ve(),
            subset: ye(),
            SemVer: i,
            re: n.re,
            src: n.src,
            tokens: n.t,
            SEMVER_SPEC_VERSION: r.SEMVER_SPEC_VERSION,
            RELEASE_TYPES: r.RELEASE_TYPES,
            compareIdentifiers: a.compareIdentifiers,
            rcompareIdentifiers: a.rcompareIdentifiers
        }
    }));
const be = {
    version: `0.1.0`,
    migrate(e) {
        let t = e;
        return `meldActiveHalf` in t || (t.meldActiveHalf = `A`), `meldHalfA` in t || (t.meldHalfA = {
            CardType: `action`,
            CardName: null,
            CardArtwork: null,
            CardArtPosition: null,
            CardClass: null,
            CardSecondaryClass: null,
            CardSubType: null,
            CardTalent: null,
            CardTextHTML: null,
            CardTextNode: null,
            CardMacroGroup: null,
            CardWeapon: null
        }), `meldHalfB` in t || (t.meldHalfB = {
            CardType: `action`,
            CardName: null,
            CardArtwork: null,
            CardArtPosition: null,
            CardClass: null,
            CardSecondaryClass: null,
            CardSubType: null,
            CardTalent: null,
            CardTextHTML: null,
            CardTextNode: null,
            CardMacroGroup: null,
            CardWeapon: null
        }), t
    }
};
var K = e(G(), 1),
    q = `0.0.0`,
    J = [be];

function Y(e) {
    return K.default.valid(e) ?? K.default.coerce(e) ?.version ?? q
}

function xe(e, t) {
    let n = Y(t),
        r = e;
    for (let {
            version: e,
            migrate: t
        } of J) K.default.gt(e, n) && (console.info(`Applying migration ${e} to card state`), r = t(r));
    return r
}
var Se = 20,
    Ce = 5;

function we(e) {
    let t = e.schemaVersion ?? q;
    return J.some(({
        version: e
    }) => K.default.gt(e, Y(t))) ? { ...e,
        state: xe(e.state, t),
        schemaVersion: `2.6.0`
    } : e
}

function Te(e) {
    return {
        __version: e.__version,
        CardType: e.CardType,
        CardBack: e.CardBack ?.id || null,
        CardBackRight: e.CardBackRight ?.id ?? null,
        CardBackSplit: e.CardBackSplit,
        CardBackBlend: e.CardBackBlend,
        CardBackStyle: e.CardBackStyle,
        CardArtwork: e.CardArtwork,
        CardArtPosition: e.CardArtPosition,
        CardArtworkCredits: e.CardArtworkCredits,
        CardSetNumber: e.CardSetNumber,
        CardTextHTML: e.CardTextHTML,
        CardTextNode: e.CardTextNode,
        CardPitch: e.CardPitch,
        CardName: e.CardName,
        CardResource: e.CardResource,
        CardText: e.CardText,
        CardPower: e.CardPower,
        CardTalent: e.CardTalent,
        CardClass: e.CardClass,
        CardSecondaryClass: e.CardSecondaryClass,
        CardSubType: e.CardSubType,
        CardRarity: e.CardRarity,
        CardDefense: e.CardDefense,
        CardLife: e.CardLife,
        CardHeroIntellect: e.CardHeroIntellect,
        CardWeapon: e.CardWeapon,
        CardMacroGroup: e.CardMacroGroup,
        CardOverlay: e.CardOverlay,
        CardOverlayOpacity: e.CardOverlayOpacity,
        meldActiveHalf: e.meldActiveHalf,
        meldHalfA: e.meldHalfA,
        meldHalfB: e.meldHalfB
    }
}

function Ee(e, t, n) {
    return s(e) ?? _(e, t, n)
}

function De(e, t, n) {
    return e !== null && e < 0 ? Ee(e, t, n) : p.find(t => t.id === e) || p[0]
}

function Oe(e, t, n) {
    return e !== null && e < 0 ? Ee(e, t, n) : p.find(t => t.id === e) ?? null
}

function ke(e) {
    return { ...e,
        CardBack: De(e.CardBack, e.CardType, e.CardBackStyle),
        CardBackRight: e.CardType === `meld` ? null : Oe(e.CardBackRight, e.CardType, e.CardBackStyle),
        CardBackSplit: e.CardBackSplit ??.5,
        CardBackBlend: e.CardBackBlend ??.4
    }
}
async function Ae(e, t) {
    let n = e ?? m,
        r = n.CardArtwork;
    return {
        serialized: { ...n,
            CardArtwork: r && t ? await i(r) : null
        },
        imageStats: r ? {
            byteSize: r.size,
            type: r.type
        } : null
    }
}
async function je(e, t, r) {
    let i = Date.now(),
        a = {
            version: t.__version,
            cardName: e,
            createdAt: i,
            updatedAt: i,
            preview: r,
            state: Te(t),
            schemaVersion: `2.6.0`
        };
    return await n.cards.add(a), t.__version
}
async function Me(e, t, r) {
    let i = await X(e);
    if (!i) throw Error(`Card not found`);
    let a = {
        version: e,
        cardName: t.CardType === `meld` ? [t.meldHalfA ?.CardName, t.meldHalfB ?.CardName].filter(Boolean).join(` // `) || `unnamed` : t.CardName || `unnamed`,
        createdAt: i.createdAt,
        updatedAt: Date.now(),
        preview: r,
        state: Te(t),
        schemaVersion: `2.6.0`
    };
    await n.cards.put(a)
}
async function X(e) {
    let t = await n.cards.get(e);
    return t ? we(t) : null
}

function Ne(e) {
    if (!e.trim()) throw Error(`Folder name cannot be empty`);
    if (e.length > Se) throw Error(`Folder name cannot exceed ${Se} characters`)
}
async function Pe(e, t, r) {
    if ((await n.folders.filter(e => e.parentId === t && e.id !== r).toArray()).some(t => t.name === e)) throw Error(`A folder named "${e}" already exists here`)
}
async function Fe(e) {
    let t = [],
        r = e,
        i = new Set;
    for (; r && !i.has(r);) {
        i.add(r);
        let e = await n.folders.get(r);
        if (!e) break;
        t.unshift(e), r = e.parentId
    }
    return t
}
async function Ie(e) {
    let t = await n.folders.toArray(),
        r = new Map;
    for (let e of t) {
        if (!e.parentId) continue;
        let t = r.get(e.parentId) ?? [];
        t.push(e.id), r.set(e.parentId, t)
    }
    let i = [],
        a = new Set,
        o = [...r.get(e) ?? []];
    for (; o.length > 0;) {
        let e = o.pop();
        a.has(e) || (a.add(e), i.push(e), o.push(...r.get(e) ?? []))
    }
    return i
}
async function Le(e, t) {
    Ne(e);
    let r = e.trim();
    if ((await Fe(t)).length + 1 > Ce) throw Error(`Folders cannot be nested more than ${Ce} levels deep`);
    await Pe(r, t);
    let i = Date.now(),
        a = {
            id: u(),
            name: r,
            parentId: t,
            createdAt: i,
            updatedAt: i
        };
    return await n.folders.add(a), a
}
async function Re(e, t) {
    Ne(t);
    let r = t.trim(),
        i = await n.folders.get(e);
    if (!i) throw Error(`Folder not found`);
    await Pe(r, i.parentId, e), await n.folders.update(e, {
        name: r,
        updatedAt: Date.now()
    })
}
async function ze(e) {
    let t = [e, ...await Ie(e)];
    await n.transaction(`rw`, n.folders, n.cards, async () => {
        await n.cards.where(`folderId`).anyOf(t).delete(), await n.folders.bulkDelete(t)
    })
}
async function Be() {
    return n.folders.toArray()
}
async function Ve(e) {
    let t = await Ie(e),
        r = [e, ...t],
        i = await n.cards.where(`folderId`).anyOf(r).count();
    return t.length + i
}
async function Z(e, t) {
    await n.cards.update(e, {
        folderId: t
    })
}
async function He() {
    let [e, t] = await Promise.all([Ue(), Be()]);
    return {
        cards: e,
        folders: t
    }
}
async function Ue() {
    return (await n.cards.orderBy(`updatedAt`).reverse().toArray()).map(we)
}
async function We(e) {
    await n.cards.delete(e)
}
async function Ge() {
    await n.transaction(`rw`, n.cards, n.folders, async () => {
        await n.cards.clear(), await n.folders.clear()
    })
}
async function Q(e, t = {}) {
    let n = t.includeFullResImages ?? !0,
        r = t.includeCustomFrames ?? !0,
        {
            CardArtwork: a,
            CardOverlay: s
        } = e.state,
        [c, l, u, d, f, p] = await Promise.all([i(e.preview), a && n ? i(a) : Promise.resolve(null), s && n ? i(s) : Promise.resolve(null), Ae(e.state.meldHalfA, n), Ae(e.state.meldHalfB, n), r ? o(e.state.CardBack, e.state.CardBackRight, n) : Promise.resolve(null)]),
        m = {
            format: `fabkit`,
            formatVersion: `2.6.0`,
            version: e.version,
            cardName: e.cardName,
            createdAt: e.createdAt,
            updatedAt: e.updatedAt,
            preview: c,
            state: { ...e.state,
                CardArtwork: l,
                CardOverlay: u,
                meldHalfA: d.serialized,
                meldHalfB: f.serialized
            }
        };
    return n || (m.imageStats = {
        CardArtwork: a ? {
            byteSize: a.size,
            type: a.type
        } : null,
        CardOverlay: s ? {
            byteSize: s.size,
            type: s.type
        } : null,
        meldHalfA: d.imageStats,
        meldHalfB: f.imageStats
    }), p && (m.customFrames = p.metas, m.customFrameImages = p.images), m
}
async function Ke(e) {
    return JSON.stringify(await Q(e), null, 2)
}
async function $(e, t) {
    let [i, o, s, c, l] = await Promise.all([r(e.preview), e.state.CardArtwork ? r(e.state.CardArtwork) : Promise.resolve(null), e.state.CardOverlay ? r(e.state.CardOverlay) : Promise.resolve(null), e.state.meldHalfA ?.CardArtwork ? r(e.state.meldHalfA.CardArtwork) : Promise.resolve(null), e.state.meldHalfB ?.CardArtwork ? r(e.state.meldHalfB.CardArtwork) : Promise.resolve(null)]), u = xe(e.state, e.formatVersion ?? q), [d, f] = await Promise.all([a(u.CardBack, t), a(u.CardBackRight, t)]), p = {
        version: e.version,
        cardName: e.cardName,
        createdAt: e.createdAt || Date.now(),
        updatedAt: Date.now(),
        preview: i,
        state: { ...u,
            CardArtwork: o,
            CardOverlay: s,
            CardBack: d,
            CardBackRight: f,
            meldHalfA: { ...u.meldHalfA,
                CardArtwork: c
            },
            meldHalfB: { ...u.meldHalfB,
                CardArtwork: l
            }
        },
        schemaVersion: `2.6.0`
    };
    await n.cards.put(p)
}
async function qe(e) {
    let t = await f(e.customFrames, e.customFrameImages);
    await $(e, t), t.size > 0 && (await c(), l())
}
async function Je(e) {
    let t = JSON.parse(e);
    if (!t.version || !t.cardName || !t.state) throw Error(`Invalid card file format`);
    if (typeof t.state != `object` || !(`CardType` in t.state)) throw Error(`Invalid card file: state is missing required fields`);
    return qe(t)
}
async function Ye(e, t) {
    let n = await v(e),
        r = URL.createObjectURL(n),
        i = document.createElement(`a`);
    i.href = r, i.download = `${t.replace(/[^a-z0-9]/gi,`_`).toLowerCase()}.fabkit`, document.body.appendChild(i), i.click(), document.body.removeChild(i), URL.revokeObjectURL(r)
}
async function Xe(e, t) {
    let [n, r] = await Promise.all([Promise.all(e.map(async e => ({ ...await Q(e, {
            includeCustomFrames: !1
        }),
        folderId: e.folderId
    }))), d(e.map(e => ({
        CardBack: e.state.CardBack,
        CardBackRight: e.state.CardBackRight
    })), !0)]), i = {
        format: `fabgallery`,
        formatVersion: `2.6.0`,
        exportedAt: new Date().toISOString(),
        cardCount: n.length,
        cards: n,
        folders: t
    };
    r && (i.customFrames = r.metas, i.customFrameImages = r.images);
    let a = await v(JSON.stringify(i)),
        o = URL.createObjectURL(a),
        s = document.createElement(`a`);
    s.href = o, s.download = `fabkit-gallery-${new Date().toISOString().slice(0,10)}.fabgallery`, document.body.appendChild(s), s.click(), document.body.removeChild(s), URL.revokeObjectURL(o)
}
async function Ze(e) {
    let t = new Map;
    for (let n of e) {
        let e = t.get(n.parentId) ?? [];
        e.push(n), t.set(n.parentId, e)
    }
    let r = new Map,
        i = 0,
        a = 0;
    async function o(e, s) {
        let c = t.get(e) ?? [];
        for (let e of c) {
            let t = (await n.folders.filter(e => e.parentId === s).toArray()).find(t => t.name === e.name),
                c;
            if (t) c = t.id, a++;
            else try {
                c = (await Le(e.name, s)).id, i++
            } catch (t) {
                console.warn(`Skipping folder "${e.name}" during merge import:`, t);
                continue
            }
            r.set(e.id, c), await o(e.id, c)
        }
    }
    return await o(void 0, void 0), {
        idMap: r,
        created: i,
        merged: a
    }
}
async function Qe(e, t) {
    let r = JSON.parse(e);
    if (r ?.format !== `fabgallery` || !Array.isArray(r.cards)) throw Error(`Invalid gallery file format`);
    let i = r,
        a = i.folders ?? [],
        o = await f(i.customFrames, i.customFrameImages);
    if (t === `replace`) {
        await Ge(), a.length > 0 && await n.folders.bulkAdd(a);
        for (let e of i.cards) await $(e, o), e.folderId && await Z(e.version, e.folderId);
        return o.size > 0 && (await c(), l()), {
            imported: i.cards.length,
            skipped: 0,
            foldersCreated: a.length,
            foldersMerged: 0
        }
    }
    let {
        idMap: s,
        created: u,
        merged: d
    } = await Ze(a), p = 0, m = 0;
    for (let e of i.cards) {
        if (await X(e.version)) {
            m++;
            continue
        }
        await $(e, o);
        let t = e.folderId ? s.get(e.folderId) : void 0;
        t && await Z(e.version, t), p++
    }
    return o.size > 0 && (await c(), l()), {
        imported: p,
        skipped: m,
        foldersCreated: u,
        foldersMerged: d
    }
}
export {
    Me as C, y as E, je as S, v as T, Qe as _, ke as a, De as b, Q as c, He as d, Be as f, qe as g, Je as h, ze as i, Xe as l, Ve as m, Le as n, Ye as o, X as p, We as r, Ke as s, Ge as t, Ue as u, Z as v, G as w, Oe as x, Re as y
};
//# sourceMappingURL=card-storage-1Gq86c1-.js.map