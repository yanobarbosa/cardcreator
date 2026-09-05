import {
    n as e
} from "./chunk-B3K2TuZy.js";
import {
    o as t
} from "./compiler-runtime-4XzsAixn.js";
import {
    A as n,
    B as r,
    F as i,
    H as a,
    L as o,
    M as s,
    N as c,
    P as l,
    Y as u,
    _t as d,
    at as f,
    c as p,
    ct as m,
    d as h,
    et as g,
    f as _,
    ft as ee,
    gt as v,
    h as y,
    ht as b,
    it as x,
    k as S,
    m as C,
    mt as te,
    n as w,
    o as T,
    p as E,
    pt as D,
    q as O,
    rt as k,
    s as A,
    tt as j,
    u as M,
    ut as N,
    v as P,
    x as F,
    xt as I,
    yt as L
} from "./portal-CtSeHqeD.js";
import {
    a as ne,
    c as R,
    d as z,
    i as re,
    l as B,
    r as ie,
    t as ae,
    u as V
} from "./use-resolve-button-type-BJQyyNxN.js";
import {
    a as oe,
    i as se,
    n as ce,
    r as le,
    t as ue
} from "./frozen-DrtCOwXN.js";
import {
    n as de
} from "./form-fields-jCJtFt6p.js";
import {
    c as fe,
    l as H,
    s as U
} from "./dialog-C2QVAJ1w.js";
import {
    _ as pe,
    a as W,
    c as me,
    d as he,
    f as ge,
    g as _e,
    h as ve,
    i as G,
    l as ye,
    m as be,
    n as K,
    o as xe,
    p as Se,
    r as Ce,
    s as we,
    t as Te
} from "./element-movement-CmW-4m3J.js";
import {
    t as Ee
} from "./use-tree-walker-DryPBupz.js";

function q(e, t, n) {
    let r = n.initialDeps ?? [],
        i, a = !0;

    function o() {
        let o;
        n.key && n.debug ?.call(n) && (o = Date.now());
        let s = e();
        if (!(s.length !== r.length || s.some((e, t) => r[t] !== e))) return i;
        r = s;
        let c;
        if (n.key && n.debug ?.call(n) && (c = Date.now()), i = t(...s), n.key && n.debug ?.call(n)) {
            let e = Math.round((Date.now() - o) * 100) / 100,
                t = Math.round((Date.now() - c) * 100) / 100,
                r = t / 16,
                i = (e, t) => {
                    for (e = String(e); e.length < t;) e = ` ` + e;
                    return e
                };
            console.info(`%c⏱ ${i(t,5)} /${i(e,5)} ms`, `
            font-size: .6rem;
            font-weight: bold;
            color: hsl(${Math.max(0,Math.min(120-120*r,120))}deg 100% 31%);`, n ?.key)
        }
        return n ?.onChange && !(a && n.skipInitialOnChange) && n.onChange(i), a = !1, i
    }
    return o.updateDeps = e => {
        r = e
    }, o
}

function De(e, t) {
    if (e === void 0) throw Error(`Unexpected undefined${t?`: ${t}`:``}`);
    return e
}
var Oe = (e, t) => Math.abs(e - t) < 1.01,
    ke = (e, t, n) => {
        let r;
        return function(...i) {
            e.clearTimeout(r), r = e.setTimeout(() => t.apply(this, i), n)
        }
    },
    Ae = e => {
        let {
            offsetWidth: t,
            offsetHeight: n
        } = e;
        return {
            width: t,
            height: n
        }
    },
    je = e => e,
    Me = e => {
        let t = Math.max(e.startIndex - e.overscan, 0),
            n = Math.min(e.endIndex + e.overscan, e.count - 1),
            r = [];
        for (let e = t; e <= n; e++) r.push(e);
        return r
    },
    Ne = (e, t) => {
        let n = e.scrollElement;
        if (!n) return;
        let r = e.targetWindow;
        if (!r) return;
        let i = e => {
            let {
                width: n,
                height: r
            } = e;
            t({
                width: Math.round(n),
                height: Math.round(r)
            })
        };
        if (i(Ae(n)), !r.ResizeObserver) return () => {};
        let a = new r.ResizeObserver(t => {
            let r = () => {
                let e = t[0];
                if (e ?.borderBoxSize) {
                    let t = e.borderBoxSize[0];
                    if (t) {
                        i({
                            width: t.inlineSize,
                            height: t.blockSize
                        });
                        return
                    }
                }
                i(Ae(n))
            };
            e.options.useAnimationFrameWithResizeObserver ? requestAnimationFrame(r) : r()
        });
        return a.observe(n, {
            box: `border-box`
        }), () => {
            a.unobserve(n)
        }
    },
    Pe = {
        passive: !0
    },
    Fe = typeof window > `u` ? !0 : `onscrollend` in window,
    Ie = (e, t) => {
        let n = e.scrollElement;
        if (!n) return;
        let r = e.targetWindow;
        if (!r) return;
        let i = 0,
            a = e.options.useScrollendEvent && Fe ? () => void 0 : ke(r, () => {
                t(i, !1)
            }, e.options.isScrollingResetDelay),
            o = r => () => {
                let {
                    horizontal: o,
                    isRtl: s
                } = e.options;
                i = o ? n.scrollLeft * (s && -1 || 1) : n.scrollTop, a(), t(i, r)
            },
            s = o(!0),
            c = o(!1);
        n.addEventListener(`scroll`, s, Pe);
        let l = e.options.useScrollendEvent && Fe;
        return l && n.addEventListener(`scrollend`, c, Pe), () => {
            n.removeEventListener(`scroll`, s), l && n.removeEventListener(`scrollend`, c)
        }
    },
    Le = (e, t, n) => {
        if (t ?.borderBoxSize) {
            let e = t.borderBoxSize[0];
            if (e) return Math.round(e[n.options.horizontal ? `inlineSize` : `blockSize`])
        }
        return e[n.options.horizontal ? `offsetWidth` : `offsetHeight`]
    },
    Re = (e, {
        adjustments: t = 0,
        behavior: n
    }, r) => {
        var i, a;
        let o = e + t;
        (a = (i = r.scrollElement) ?.scrollTo) == null || a.call(i, {
            [r.options.horizontal ? `left` : `top`]: o,
            behavior: n
        })
    },
    ze = class {
        constructor(e) {
            this.unsubs = [], this.scrollElement = null, this.targetWindow = null, this.isScrolling = !1, this.currentScrollToIndex = null, this.measurementsCache = [], this.itemSizeCache = new Map, this.laneAssignments = new Map, this.pendingMeasuredCacheIndexes = [], this.prevLanes = void 0, this.lanesChangedFlag = !1, this.lanesSettling = !1, this.scrollRect = null, this.scrollOffset = null, this.scrollDirection = null, this.scrollAdjustments = 0, this.elementsCache = new Map, this.observer = (() => {
                let e = null,
                    t = () => e || (!this.targetWindow || !this.targetWindow.ResizeObserver ? null : e = new this.targetWindow.ResizeObserver(e => {
                        e.forEach(e => {
                            let t = () => {
                                this._measureElement(e.target, e)
                            };
                            this.options.useAnimationFrameWithResizeObserver ? requestAnimationFrame(t) : t()
                        })
                    }));
                return {
                    disconnect: () => {
                        var n;
                        (n = t()) == null || n.disconnect(), e = null
                    },
                    observe: e => t() ?.observe(e, {
                        box: `border-box`
                    }),
                    unobserve: e => t() ?.unobserve(e)
                }
            })(), this.range = null, this.setOptions = e => {
                Object.entries(e).forEach(([t, n]) => {
                    n === void 0 && delete e[t]
                }), this.options = {
                    debug: !1,
                    initialOffset: 0,
                    overscan: 1,
                    paddingStart: 0,
                    paddingEnd: 0,
                    scrollPaddingStart: 0,
                    scrollPaddingEnd: 0,
                    horizontal: !1,
                    getItemKey: je,
                    rangeExtractor: Me,
                    onChange: () => {},
                    measureElement: Le,
                    initialRect: {
                        width: 0,
                        height: 0
                    },
                    scrollMargin: 0,
                    gap: 0,
                    indexAttribute: `data-index`,
                    initialMeasurementsCache: [],
                    lanes: 1,
                    isScrollingResetDelay: 150,
                    enabled: !0,
                    isRtl: !1,
                    useScrollendEvent: !1,
                    useAnimationFrameWithResizeObserver: !1,
                    ...e
                }
            }, this.notify = e => {
                var t, n;
                (n = (t = this.options).onChange) == null || n.call(t, this, e)
            }, this.maybeNotify = q(() => (this.calculateRange(), [this.isScrolling, this.range ? this.range.startIndex : null, this.range ? this.range.endIndex : null]), e => {
                this.notify(e)
            }, {
                key: !1,
                debug: () => this.options.debug,
                initialDeps: [this.isScrolling, this.range ? this.range.startIndex : null, this.range ? this.range.endIndex : null]
            }), this.cleanup = () => {
                this.unsubs.filter(Boolean).forEach(e => e()), this.unsubs = [], this.observer.disconnect(), this.scrollElement = null, this.targetWindow = null
            }, this._didMount = () => () => {
                this.cleanup()
            }, this._willUpdate = () => {
                let e = this.options.enabled ? this.options.getScrollElement() : null;
                if (this.scrollElement !== e) {
                    if (this.cleanup(), !e) {
                        this.maybeNotify();
                        return
                    }
                    this.scrollElement = e, this.scrollElement && `ownerDocument` in this.scrollElement ? this.targetWindow = this.scrollElement.ownerDocument.defaultView : this.targetWindow = this.scrollElement ?.window ?? null, this.elementsCache.forEach(e => {
                        this.observer.observe(e)
                    }), this.unsubs.push(this.options.observeElementRect(this, e => {
                        this.scrollRect = e, this.maybeNotify()
                    })), this.unsubs.push(this.options.observeElementOffset(this, (e, t) => {
                        this.scrollAdjustments = 0, this.scrollDirection = t ? this.getScrollOffset() < e ? `forward` : `backward` : null, this.scrollOffset = e, this.isScrolling = t, this.maybeNotify()
                    })), this._scrollToOffset(this.getScrollOffset(), {
                        adjustments: void 0,
                        behavior: void 0
                    })
                }
            }, this.getSize = () => this.options.enabled ? (this.scrollRect = this.scrollRect ?? this.options.initialRect, this.scrollRect[this.options.horizontal ? `width` : `height`]) : (this.scrollRect = null, 0), this.getScrollOffset = () => this.options.enabled ? (this.scrollOffset = this.scrollOffset ?? (typeof this.options.initialOffset == `function` ? this.options.initialOffset() : this.options.initialOffset), this.scrollOffset) : (this.scrollOffset = null, 0), this.getFurthestMeasurement = (e, t) => {
                let n = new Map,
                    r = new Map;
                for (let i = t - 1; i >= 0; i--) {
                    let t = e[i];
                    if (n.has(t.lane)) continue;
                    let a = r.get(t.lane);
                    if (a == null || t.end > a.end ? r.set(t.lane, t) : t.end < a.end && n.set(t.lane, !0), n.size === this.options.lanes) break
                }
                return r.size === this.options.lanes ? Array.from(r.values()).sort((e, t) => e.end === t.end ? e.index - t.index : e.end - t.end)[0] : void 0
            }, this.getMeasurementOptions = q(() => [this.options.count, this.options.paddingStart, this.options.scrollMargin, this.options.getItemKey, this.options.enabled, this.options.lanes], (e, t, n, r, i, a) => (this.prevLanes !== void 0 && this.prevLanes !== a && (this.lanesChangedFlag = !0), this.prevLanes = a, this.pendingMeasuredCacheIndexes = [], {
                count: e,
                paddingStart: t,
                scrollMargin: n,
                getItemKey: r,
                enabled: i,
                lanes: a
            }), {
                key: !1
            }), this.getMeasurements = q(() => [this.getMeasurementOptions(), this.itemSizeCache], ({
                count: e,
                paddingStart: t,
                scrollMargin: n,
                getItemKey: r,
                enabled: i,
                lanes: a
            }, o) => {
                if (!i) return this.measurementsCache = [], this.itemSizeCache.clear(), this.laneAssignments.clear(), [];
                if (this.laneAssignments.size > e)
                    for (let t of this.laneAssignments.keys()) t >= e && this.laneAssignments.delete(t);
                this.lanesChangedFlag && (this.lanesChangedFlag = !1, this.lanesSettling = !0, this.measurementsCache = [], this.itemSizeCache.clear(), this.laneAssignments.clear(), this.pendingMeasuredCacheIndexes = []), this.measurementsCache.length === 0 && !this.lanesSettling && (this.measurementsCache = this.options.initialMeasurementsCache, this.measurementsCache.forEach(e => {
                    this.itemSizeCache.set(e.key, e.size)
                }));
                let s = this.lanesSettling ? 0 : this.pendingMeasuredCacheIndexes.length > 0 ? Math.min(...this.pendingMeasuredCacheIndexes) : 0;
                this.pendingMeasuredCacheIndexes = [], this.lanesSettling && this.measurementsCache.length === e && (this.lanesSettling = !1);
                let c = this.measurementsCache.slice(0, s),
                    l = Array(a).fill(void 0);
                for (let e = 0; e < s; e++) {
                    let t = c[e];
                    t && (l[t.lane] = e)
                }
                for (let i = s; i < e; i++) {
                    let e = r(i),
                        a = this.laneAssignments.get(i),
                        s, u;
                    if (a !== void 0 && this.options.lanes > 1) {
                        s = a;
                        let e = l[s],
                            r = e === void 0 ? void 0 : c[e];
                        u = r ? r.end + this.options.gap : t + n
                    } else {
                        let e = this.options.lanes === 1 ? c[i - 1] : this.getFurthestMeasurement(c, i);
                        u = e ? e.end + this.options.gap : t + n, s = e ? e.lane : i % this.options.lanes, this.options.lanes > 1 && this.laneAssignments.set(i, s)
                    }
                    let d = o.get(e),
                        f = typeof d == `number` ? d : this.options.estimateSize(i),
                        p = u + f;
                    c[i] = {
                        index: i,
                        start: u,
                        size: f,
                        end: p,
                        key: e,
                        lane: s
                    }, l[s] = i
                }
                return this.measurementsCache = c, c
            }, {
                key: !1,
                debug: () => this.options.debug
            }), this.calculateRange = q(() => [this.getMeasurements(), this.getSize(), this.getScrollOffset(), this.options.lanes], (e, t, n, r) => this.range = e.length > 0 && t > 0 ? Ve({
                measurements: e,
                outerSize: t,
                scrollOffset: n,
                lanes: r
            }) : null, {
                key: !1,
                debug: () => this.options.debug
            }), this.getVirtualIndexes = q(() => {
                let e = null,
                    t = null,
                    n = this.calculateRange();
                return n && (e = n.startIndex, t = n.endIndex), this.maybeNotify.updateDeps([this.isScrolling, e, t]), [this.options.rangeExtractor, this.options.overscan, this.options.count, e, t]
            }, (e, t, n, r, i) => r === null || i === null ? [] : e({
                startIndex: r,
                endIndex: i,
                overscan: t,
                count: n
            }), {
                key: !1,
                debug: () => this.options.debug
            }), this.indexFromElement = e => {
                let t = this.options.indexAttribute,
                    n = e.getAttribute(t);
                return n ? parseInt(n, 10) : (console.warn(`Missing attribute name '${t}={index}' on measured element.`), -1)
            }, this._measureElement = (e, t) => {
                let n = this.indexFromElement(e),
                    r = this.measurementsCache[n];
                if (!r) return;
                let i = r.key,
                    a = this.elementsCache.get(i);
                a !== e && (a && this.observer.unobserve(a), this.observer.observe(e), this.elementsCache.set(i, e)), e.isConnected && this.resizeItem(n, this.options.measureElement(e, t, this))
            }, this.resizeItem = (e, t) => {
                let n = this.measurementsCache[e];
                if (!n) return;
                let r = t - (this.itemSizeCache.get(n.key) ?? n.size);
                r !== 0 && ((this.shouldAdjustScrollPositionOnItemSizeChange === void 0 ? n.start < this.getScrollOffset() + this.scrollAdjustments : this.shouldAdjustScrollPositionOnItemSizeChange(n, r, this)) && this._scrollToOffset(this.getScrollOffset(), {
                    adjustments: this.scrollAdjustments += r,
                    behavior: void 0
                }), this.pendingMeasuredCacheIndexes.push(n.index), this.itemSizeCache = new Map(this.itemSizeCache.set(n.key, t)), this.notify(!1))
            }, this.measureElement = e => {
                if (!e) {
                    this.elementsCache.forEach((e, t) => {
                        e.isConnected || (this.observer.unobserve(e), this.elementsCache.delete(t))
                    });
                    return
                }
                this._measureElement(e, void 0)
            }, this.getVirtualItems = q(() => [this.getVirtualIndexes(), this.getMeasurements()], (e, t) => {
                let n = [];
                for (let r = 0, i = e.length; r < i; r++) {
                    let i = t[e[r]];
                    n.push(i)
                }
                return n
            }, {
                key: !1,
                debug: () => this.options.debug
            }), this.getVirtualItemForOffset = e => {
                let t = this.getMeasurements();
                if (t.length !== 0) return De(t[Be(0, t.length - 1, e => De(t[e]).start, e)])
            }, this.getMaxScrollOffset = () => {
                if (!this.scrollElement) return 0;
                if (`scrollHeight` in this.scrollElement) return this.options.horizontal ? this.scrollElement.scrollWidth - this.scrollElement.clientWidth : this.scrollElement.scrollHeight - this.scrollElement.clientHeight; {
                    let e = this.scrollElement.document.documentElement;
                    return this.options.horizontal ? e.scrollWidth - this.scrollElement.innerWidth : e.scrollHeight - this.scrollElement.innerHeight
                }
            }, this.getOffsetForAlignment = (e, t, n = 0) => {
                if (!this.scrollElement) return 0;
                let r = this.getSize(),
                    i = this.getScrollOffset();
                t === `auto` && (t = e >= i + r ? `end` : `start`), t === `center` ? e += (n - r) / 2 : t === `end` && (e -= r);
                let a = this.getMaxScrollOffset();
                return Math.max(Math.min(a, e), 0)
            }, this.getOffsetForIndex = (e, t = `auto`) => {
                e = Math.max(0, Math.min(e, this.options.count - 1));
                let n = this.measurementsCache[e];
                if (!n) return;
                let r = this.getSize(),
                    i = this.getScrollOffset();
                if (t === `auto`)
                    if (n.end >= i + r - this.options.scrollPaddingEnd) t = `end`;
                    else if (n.start <= i + this.options.scrollPaddingStart) t = `start`;
                else return [i, t];
                if (t === `end` && e === this.options.count - 1) return [this.getMaxScrollOffset(), t];
                let a = t === `end` ? n.end + this.options.scrollPaddingEnd : n.start - this.options.scrollPaddingStart;
                return [this.getOffsetForAlignment(a, t, n.size), t]
            }, this.isDynamicMode = () => this.elementsCache.size > 0, this.scrollToOffset = (e, {
                align: t = `start`,
                behavior: n
            } = {}) => {
                n === `smooth` && this.isDynamicMode() && console.warn("The `smooth` scroll behavior is not fully supported with dynamic size."), this._scrollToOffset(this.getOffsetForAlignment(e, t), {
                    adjustments: void 0,
                    behavior: n
                })
            }, this.scrollToIndex = (e, {
                align: t = `auto`,
                behavior: n
            } = {}) => {
                n === `smooth` && this.isDynamicMode() && console.warn("The `smooth` scroll behavior is not fully supported with dynamic size."), e = Math.max(0, Math.min(e, this.options.count - 1)), this.currentScrollToIndex = e;
                let r = 0,
                    i = t => {
                        if (!this.targetWindow) return;
                        let r = this.getOffsetForIndex(e, t);
                        if (!r) {
                            console.warn(`Failed to get offset for index:`, e);
                            return
                        }
                        let [i, o] = r;
                        this._scrollToOffset(i, {
                            adjustments: void 0,
                            behavior: n
                        }), this.targetWindow.requestAnimationFrame(() => {
                            let t = () => {
                                if (this.currentScrollToIndex !== e) return;
                                let t = this.getScrollOffset(),
                                    n = this.getOffsetForIndex(e, o);
                                if (!n) {
                                    console.warn(`Failed to get offset for index:`, e);
                                    return
                                }
                                Oe(n[0], t) || a(o)
                            };
                            this.isDynamicMode() ? this.targetWindow.requestAnimationFrame(t) : t()
                        })
                    },
                    a = t => {
                        this.targetWindow && this.currentScrollToIndex === e && (r++, r < 10 ? this.targetWindow.requestAnimationFrame(() => i(t)) : console.warn(`Failed to scroll to index ${e} after 10 attempts.`))
                    };
                i(t)
            }, this.scrollBy = (e, {
                behavior: t
            } = {}) => {
                t === `smooth` && this.isDynamicMode() && console.warn("The `smooth` scroll behavior is not fully supported with dynamic size."), this._scrollToOffset(this.getScrollOffset() + e, {
                    adjustments: void 0,
                    behavior: t
                })
            }, this.getTotalSize = () => {
                let e = this.getMeasurements(),
                    t;
                if (e.length === 0) t = this.options.paddingStart;
                else if (this.options.lanes === 1) t = e[e.length - 1] ?.end ?? 0;
                else {
                    let n = Array(this.options.lanes).fill(null),
                        r = e.length - 1;
                    for (; r >= 0 && n.some(e => e === null);) {
                        let t = e[r];
                        n[t.lane] === null && (n[t.lane] = t.end), r--
                    }
                    t = Math.max(...n.filter(e => e !== null))
                }
                return Math.max(t - this.options.scrollMargin + this.options.paddingEnd, 0)
            }, this._scrollToOffset = (e, {
                adjustments: t,
                behavior: n
            }) => {
                this.options.scrollToFn(e, {
                    behavior: n,
                    adjustments: t
                }, this)
            }, this.measure = () => {
                this.itemSizeCache = new Map, this.laneAssignments = new Map, this.notify(!1)
            }, this.setOptions(e)
        }
    },
    Be = (e, t, n, r) => {
        for (; e <= t;) {
            let i = (e + t) / 2 | 0,
                a = n(i);
            if (a < r) e = i + 1;
            else if (a > r) t = i - 1;
            else return i
        }
        return e > 0 ? e - 1 : 0
    };

function Ve({
    measurements: e,
    outerSize: t,
    scrollOffset: n,
    lanes: r
}) {
    let i = e.length - 1,
        a = t => e[t].start;
    if (e.length <= r) return {
        startIndex: 0,
        endIndex: i
    };
    let o = Be(0, i, a, n),
        s = o;
    if (r === 1)
        for (; s < i && e[s].end < n + t;) s++;
    else if (r > 1) {
        let a = Array(r).fill(0);
        for (; s < i && a.some(e => e < n + t);) {
            let t = e[s];
            a[t.lane] = t.end, s++
        }
        let c = Array(r).fill(n + t);
        for (; o >= 0 && c.some(e => e >= n);) {
            let t = e[o];
            c[t.lane] = t.start, o--
        }
        o = Math.max(0, o - o % r), s = Math.min(i, s + (r - 1 - s % r))
    }
    return {
        startIndex: o,
        endIndex: s
    }
}
var J = e(t(), 1),
    He = I(),
    Ue = typeof document < `u` ? J.useLayoutEffect : J.useEffect;

function We({
    useFlushSync: e = !0,
    ...t
}) {
    let n = J.useReducer(() => ({}), {})[1],
        r = { ...t,
            onChange: (r, i) => {
                var a;
                e && i ? (0, He.flushSync)(n) : n(), (a = t.onChange) == null || a.call(t, r, i)
            }
        },
        [i] = J.useState(() => new ze(r));
    return i.setOptions(r), Ue(() => i._didMount(), []), Ue(() => i._willUpdate()), i
}

function Ge(e) {
    return We({
        observeElementRect: Ne,
        observeElementOffset: Ie,
        scrollToFn: Re,
        ...e
    })
}

function Ke(e) {
    let t = (0, J.useRef)({
        value: ``,
        selectionStart: null,
        selectionEnd: null
    });
    return H(e, `blur`, e => {
        let n = e.target;
        O(n) && (t.current = {
            value: n.value,
            selectionStart: n.selectionStart,
            selectionEnd: n.selectionEnd
        })
    }), D(() => {
        if (!L(e) && O(e) && e.isConnected) {
            if (e.focus({
                    preventScroll: !0
                }), e.value !== t.current.value) e.setSelectionRange(e.value.length, e.value.length);
            else {
                let {
                    selectionStart: n,
                    selectionEnd: r
                } = t.current;
                n !== null && r !== null && e.setSelectionRange(n, r)
            }
            t.current = {
                value: ``,
                selectionStart: null,
                selectionEnd: null
            }
        }
    })
}
var qe = Object.defineProperty,
    Je = (e, t, n) => t in e ? qe(e, t, {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: n
    }) : e[t] = n,
    Ye = (e, t, n) => (Je(e, typeof t == `symbol` ? t : t + ``, n), n),
    Y = (e => (e[e.Open = 0] = `Open`, e[e.Closed = 1] = `Closed`, e))(Y || {}),
    X = (e => (e[e.Single = 0] = `Single`, e[e.Multi = 1] = `Multi`, e))(X || {}),
    Z = (e => (e[e.Pointer = 0] = `Pointer`, e[e.Focus = 1] = `Focus`, e[e.Other = 2] = `Other`, e))(Z || {}),
    Xe = (e => (e[e.OpenCombobox = 0] = `OpenCombobox`, e[e.CloseCombobox = 1] = `CloseCombobox`, e[e.GoToOption = 2] = `GoToOption`, e[e.SetTyping = 3] = `SetTyping`, e[e.RegisterOption = 4] = `RegisterOption`, e[e.UnregisterOption = 5] = `UnregisterOption`, e[e.DefaultToFirstOption = 6] = `DefaultToFirstOption`, e[e.SetActivationTrigger = 7] = `SetActivationTrigger`, e[e.UpdateVirtualConfiguration = 8] = `UpdateVirtualConfiguration`, e[e.SetInputElement = 9] = `SetInputElement`, e[e.SetButtonElement = 10] = `SetButtonElement`, e[e.SetOptionsElement = 11] = `SetOptionsElement`, e[e.MarkInputAsMoved = 12] = `MarkInputAsMoved`, e))(Xe || {});

function Ze(e, t = e => e) {
    let n = e.activeOptionIndex === null ? null : e.options[e.activeOptionIndex],
        r = t(e.options.slice()),
        i = r.length > 0 && r[0].dataRef.current.order !== null ? r.sort((e, t) => e.dataRef.current.order - t.dataRef.current.order) : F(r, e => e.dataRef.current.domRef.current),
        a = n ? i.indexOf(n) : null;
    return a === -1 && (a = null), {
        options: i,
        activeOptionIndex: a
    }
}
var Qe = {
        1(e) {
            var t;
            if ((t = e.dataRef.current) != null && t.disabled || e.comboboxState === 1) return e;
            let n = e.inputElement ? K.Tracked(Te(e.inputElement)) : e.inputPositionState;
            return { ...e,
                activeOptionIndex: null,
                comboboxState: 1,
                isTyping: !1,
                activationTrigger: 2,
                inputPositionState: n,
                __demoMode: !1
            }
        },
        0(e) {
            var t, n;
            if ((t = e.dataRef.current) != null && t.disabled || e.comboboxState === 0) return e;
            if ((n = e.dataRef.current) != null && n.value) {
                let t = e.dataRef.current.calculateIndex(e.dataRef.current.value);
                if (t !== -1) return { ...e,
                    activeOptionIndex: t,
                    comboboxState: 0,
                    __demoMode: !1,
                    inputPositionState: K.Idle
                }
            }
            return { ...e,
                comboboxState: 0,
                inputPositionState: K.Idle,
                __demoMode: !1
            }
        },
        3(e, t) {
            return e.isTyping === t.isTyping ? e : { ...e,
                isTyping: t.isTyping
            }
        },
        2(e, t) {
            var n, r;
            if ((n = e.dataRef.current) != null && n.disabled || e.optionsElement && !((r = e.dataRef.current) != null && r.optionsPropsRef.current.static) && e.comboboxState === 1) return e;
            if (e.virtual) {
                let {
                    options: n,
                    disabled: r
                } = e.virtual, i = t.focus === G.Specific ? t.idx : W(t, {
                    resolveItems: () => n,
                    resolveActiveIndex: () => e.activeOptionIndex ?? n.findIndex(e => !r(e)) ?? null,
                    resolveDisabled: r,
                    resolveId() {
                        throw Error(`Function not implemented.`)
                    }
                }), a = t.trigger ?? 2;
                return e.activeOptionIndex === i && e.activationTrigger === a ? e : { ...e,
                    activeOptionIndex: i,
                    activationTrigger: a,
                    isTyping: !1,
                    __demoMode: !1
                }
            }
            let i = Ze(e);
            if (i.activeOptionIndex === null) {
                let e = i.options.findIndex(e => !e.dataRef.current.disabled);
                e !== -1 && (i.activeOptionIndex = e)
            }
            let a = t.focus === G.Specific ? t.idx : W(t, {
                    resolveItems: () => i.options,
                    resolveActiveIndex: () => i.activeOptionIndex,
                    resolveId: e => e.id,
                    resolveDisabled: e => e.dataRef.current.disabled
                }),
                o = t.trigger ?? 2;
            return e.activeOptionIndex === a && e.activationTrigger === o ? e : { ...e,
                ...i,
                isTyping: !1,
                activeOptionIndex: a,
                activationTrigger: o,
                __demoMode: !1
            }
        },
        4: (e, t) => {
            var n, r, i, a;
            if ((n = e.dataRef.current) != null && n.virtual) return { ...e,
                options: [...e.options, t.payload]
            };
            let o = t.payload,
                s = Ze(e, e => (e.push(o), e));
            e.activeOptionIndex === null && (i = (r = e.dataRef.current).isSelected) != null && i.call(r, t.payload.dataRef.current.value) && (s.activeOptionIndex = s.options.indexOf(o));
            let c = { ...e,
                ...s,
                activationTrigger: 2
            };
            return (a = e.dataRef.current) != null && a.__demoMode && e.dataRef.current.value === void 0 && (c.activeOptionIndex = 0), c
        },
        5: (e, t) => {
            var n;
            if ((n = e.dataRef.current) != null && n.virtual) return { ...e,
                options: e.options.filter(e => e.id !== t.id)
            };
            let r = Ze(e, e => {
                let n = e.findIndex(e => e.id === t.id);
                return n !== -1 && e.splice(n, 1), e
            });
            return { ...e,
                ...r,
                activationTrigger: 2
            }
        },
        6: (e, t) => e.defaultToFirstOption === t.value ? e : { ...e,
            defaultToFirstOption: t.value
        },
        7: (e, t) => e.activationTrigger === t.trigger ? e : { ...e,
            activationTrigger: t.trigger
        },
        8: (e, t) => {
            if (e.virtual === null) return { ...e,
                virtual: {
                    options: t.options,
                    disabled: t.disabled ?? (() => !1)
                }
            };
            if (e.virtual.options === t.options && e.virtual.disabled === t.disabled) return e;
            let n = e.activeOptionIndex;
            if (e.activeOptionIndex !== null) {
                let r = t.options.indexOf(e.virtual.options[e.activeOptionIndex]);
                n = r === -1 ? null : r
            }
            return { ...e,
                activeOptionIndex: n,
                virtual: {
                    options: t.options,
                    disabled: t.disabled ?? (() => !1)
                }
            }
        },
        9: (e, t) => e.inputElement === t.element ? e : { ...e,
            inputElement: t.element
        },
        10: (e, t) => e.buttonElement === t.element ? e : { ...e,
            buttonElement: t.element
        },
        11: (e, t) => e.optionsElement === t.element ? e : { ...e,
            optionsElement: t.element
        },
        12(e) {
            return e.inputPositionState.kind === `Tracked` ? { ...e,
                inputPositionState: K.Moved
            } : e
        }
    },
    $e = class e extends i {
        constructor(e) {
            super(e), Ye(this, `actions`, {
                onChange: e => {
                    let {
                        onChange: t,
                        compare: n,
                        mode: r,
                        value: i
                    } = this.state.dataRef.current;
                    return m(r, {
                        0: () => t ?.(e),
                        1: () => {
                            let r = i.slice(),
                                a = r.findIndex(t => n(t, e));
                            return a === -1 ? r.push(e) : r.splice(a, 1), t ?.(r)
                        }
                    })
                },
                registerOption: (e, t) => (this.send({
                    type: 4,
                    payload: {
                        id: e,
                        dataRef: t
                    }
                }), () => {
                    this.state.activeOptionIndex === this.state.dataRef.current.calculateIndex(t.current.value) && this.send({
                        type: 6,
                        value: !0
                    }), this.send({
                        type: 5,
                        id: e
                    })
                }),
                goToOption: (e, t) => (this.send({
                    type: 6,
                    value: !1
                }), this.send({
                    type: 2,
                    ...e,
                    trigger: t
                })),
                setIsTyping: e => {
                    this.send({
                        type: 3,
                        isTyping: e
                    })
                },
                closeCombobox: () => {
                    var e, t;
                    this.send({
                        type: 1
                    }), this.send({
                        type: 6,
                        value: !1
                    }), (t = (e = this.state.dataRef.current).onClose) == null || t.call(e)
                },
                openCombobox: () => {
                    this.send({
                        type: 0
                    }), this.send({
                        type: 6,
                        value: !0
                    })
                },
                setActivationTrigger: e => {
                    this.send({
                        type: 7,
                        trigger: e
                    })
                },
                selectActiveOption: () => {
                    let e = this.selectors.activeOptionIndex(this.state);
                    if (e !== null) {
                        if (this.actions.setIsTyping(!1), this.state.virtual) this.actions.onChange(this.state.virtual.options[e]);
                        else {
                            let {
                                dataRef: t
                            } = this.state.options[e];
                            this.actions.onChange(t.current.value)
                        }
                        this.actions.goToOption({
                            focus: G.Specific,
                            idx: e
                        })
                    }
                },
                setInputElement: e => {
                    this.send({
                        type: 9,
                        element: e
                    })
                },
                setButtonElement: e => {
                    this.send({
                        type: 10,
                        element: e
                    })
                },
                setOptionsElement: e => {
                    this.send({
                        type: 11,
                        element: e
                    })
                }
            }), Ye(this, `selectors`, {
                activeDescendantId: e => {
                    let t = this.selectors.activeOptionIndex(e);
                    if (t !== null) return e.virtual ? e.options.find(n => !n.dataRef.current.disabled && e.dataRef.current.compare(n.dataRef.current.value, e.virtual.options[t])) ?.id : e.options[t] ?.id
                },
                activeOptionIndex: e => {
                    if (e.defaultToFirstOption && e.activeOptionIndex === null && (e.virtual ? e.virtual.options.length > 0 : e.options.length > 0)) {
                        if (e.virtual) {
                            let {
                                options: t,
                                disabled: n
                            } = e.virtual, r = t.findIndex(e => {
                                var t;
                                return !((t = n ?.(e)) != null && t)
                            });
                            if (r !== -1) return r
                        }
                        let t = e.options.findIndex(e => !e.dataRef.current.disabled);
                        if (t !== -1) return t
                    }
                    return e.activeOptionIndex
                },
                activeOption: e => {
                    let t = this.selectors.activeOptionIndex(e);
                    return t === null ? null : e.virtual ? e.virtual.options[t ?? 0] : e.options[t] ?.dataRef.current.value ?? null
                },
                isActive: (e, t, n) => {
                    let r = this.selectors.activeOptionIndex(e);
                    return r === null ? !1 : e.virtual ? r === e.dataRef.current.calculateIndex(t) : e.options[r] ?.id === n
                },
                shouldScrollIntoView: (e, t, n) => !(e.virtual || e.__demoMode || e.comboboxState !== 0 || e.activationTrigger === 0 || !this.selectors.isActive(e, t, n)),
                didInputMove(e) {
                    return e.inputPositionState.kind === `Moved`
                }
            }); {
                let e = this.state.id,
                    t = l.get(null);
                this.disposables.add(t.on(c.Push, n => {
                    !t.selectors.isTop(n, e) && this.state.comboboxState === 0 && this.actions.closeCombobox()
                })), this.on(0, () => t.actions.push(e)), this.on(1, () => t.actions.pop(e))
            }
            this.disposables.group(e => {
                this.on(1, t => {
                    t.inputElement && (e.dispose(), e.add(Ce(t.inputElement, t.inputPositionState, () => {
                        this.send({
                            type: 12
                        })
                    })))
                })
            })
        }
        static new({
            id: t,
            virtual: n = null,
            __demoMode: r = !1
        }) {
            return new e({
                id: t,
                dataRef: {
                    current: {}
                },
                comboboxState: r ? 0 : 1,
                isTyping: !1,
                options: [],
                virtual: n ? {
                    options: n.options,
                    disabled: n.disabled ?? (() => !1)
                } : null,
                activeOptionIndex: null,
                activationTrigger: 2,
                inputElement: null,
                buttonElement: null,
                optionsElement: null,
                __demoMode: r,
                inputPositionState: K.Idle
            })
        }
        reduce(e, t) {
            return m(t.type, Qe, e, t)
        }
    },
    et = (0, J.createContext)(null);

function tt(e) {
    let t = (0, J.useContext)(et);
    if (t === null) {
        let t = Error(`<${e} /> is missing a parent <Combobox /> component.`);
        throw Error.captureStackTrace && Error.captureStackTrace(t, nt), t
    }
    return t
}

function nt({
    id: e,
    virtual: t = null,
    __demoMode: n = !1
}) {
    let r = (0, J.useMemo)(() => $e.new({
        id: e,
        virtual: t,
        __demoMode: n
    }), []);
    return T(() => r.dispose()), r
}
var Q = I(),
    rt = (0, J.createContext)(null);
rt.displayName = `ComboboxDataContext`;

function $(e) {
    let t = (0, J.useContext)(rt);
    if (t === null) {
        let t = Error(`<${e} /> is missing a parent <Combobox /> component.`);
        throw Error.captureStackTrace && Error.captureStackTrace(t, $), t
    }
    return t
}
var it = (0, J.createContext)(null);

function at(e) {
    let t = tt(`VirtualProvider`),
        {
            options: n
        } = $(`VirtualProvider`).virtual,
        r = s(t, e => e.optionsElement),
        [i, a] = (0, J.useMemo)(() => {
            let e = r;
            if (!e) return [0, 0];
            let t = window.getComputedStyle(e);
            return [parseFloat(t.paddingBlockStart || t.paddingTop), parseFloat(t.paddingBlockEnd || t.paddingBottom)]
        }, [r]),
        o = Ge({
            enabled: n.length !== 0,
            scrollPaddingStart: i,
            scrollPaddingEnd: a,
            count: n.length,
            estimateSize() {
                return 40
            },
            getScrollElement() {
                return t.state.optionsElement
            },
            overscan: 12
        }),
        [c, l] = (0, J.useState)(0);
    b(() => {
        l(e => e + 1)
    }, [n]);
    let u = o.getVirtualItems(),
        d = s(t, e => e.activationTrigger === Z.Pointer),
        f = s(t, t.selectors.activeOptionIndex);
    return u.length === 0 ? null : J.createElement(it.Provider, {
        value: o
    }, J.createElement(`div`, {
        style: {
            position: `relative`,
            width: `100%`,
            height: `${o.getTotalSize()}px`
        },
        ref: e => {
            e && (d || f !== null && n.length > f && o.scrollToIndex(f))
        }
    }, u.map(t => J.createElement(J.Fragment, {
        key: t.key
    }, J.cloneElement(e.children ?.call(e, { ...e.slot,
        option: n[t.index]
    }), {
        key: `${c}-${t.key}`,
        "data-index": t.index,
        "aria-setsize": n.length,
        "aria-posinset": t.index + 1,
        style: {
            position: `absolute`,
            top: 0,
            left: 0,
            transform: `translateY(${t.start}px)`,
            overflowAnchor: `none`
        }
    })))))
}
var ot = J.Fragment;

function st(e, t) {
    let n = (0, g.useId)(),
        r = N(),
        {
            value: i,
            defaultValue: a,
            onChange: o,
            form: c,
            name: u,
            by: d,
            invalid: f = !1,
            disabled: h = r || !1,
            onClose: _,
            __demoMode: v = !1,
            multiple: x = !1,
            immediate: S = !1,
            virtual: C = null,
            nullable: te,
            ...w
        } = e,
        T = se(a),
        [E = x ? [] : void 0, O] = oe(i, o, T),
        j = nt({
            id: n,
            virtual: C,
            __demoMode: v
        }),
        M = (0, J.useRef)({
            static: !1,
            hold: !1
        }),
        P = le(d),
        F = D(e => C ? d === null ? C.options.indexOf(e) : C.options.findIndex(t => P(t, e)) : j.state.options.findIndex(t => P(t.dataRef.current.value, e))),
        I = (0, J.useCallback)(e => m(R.mode, {
            [X.Multi]: () => E.some(t => P(t, e)),
            [X.Single]: () => P(E, e)
        }), [E]),
        L = s(j, e => e.virtual),
        ne = D(() => _ ?.()),
        R = (0, J.useMemo)(() => ({
            __demoMode: v,
            immediate: S,
            optionsPropsRef: M,
            value: E,
            defaultValue: T,
            disabled: h,
            invalid: f,
            mode: x ? X.Multi : X.Single,
            virtual: C ? L : null,
            onChange: O,
            isSelected: I,
            calculateIndex: F,
            compare: P,
            onClose: ne
        }), [v, S, M, E, T, h, f, x, C, L, O, I, F, P, ne]);
    b(() => {
        C && j.send({
            type: Xe.UpdateVirtualConfiguration,
            options: C.options,
            disabled: C.disabled ?? null
        })
    }, [C, C ?.options, C ?.disabled]), b(() => {
        j.state.dataRef.current = R
    }, [R]);
    let [z, B, ie, ae] = s(j, e => [e.comboboxState, e.buttonElement, e.inputElement, e.optionsElement]), V = l.get(null);
    y(s(V, (0, J.useCallback)(e => V.selectors.isTop(e, n), [V, n])), [B, ie, ae], () => j.actions.closeCombobox());
    let ce = s(j, j.selectors.activeOptionIndex),
        ue = s(j, j.selectors.activeOption),
        fe = ee({
            open: z === Y.Open,
            disabled: h,
            invalid: f,
            activeIndex: ce,
            activeOption: ue,
            value: E
        }),
        [H, U] = re(),
        pe = t === null ? {} : {
            ref: t
        },
        W = (0, J.useCallback)(() => {
            if (T !== void 0) return O ?.(T)
        }, [O, T]),
        me = k();
    return J.createElement(U, {
        value: H,
        props: {
            htmlFor: ie ?.id
        },
        slot: {
            open: z === Y.Open,
            disabled: h
        }
    }, J.createElement(xe, null, J.createElement(rt.Provider, {
        value: R
    }, J.createElement(et.Provider, {
        value: j
    }, J.createElement(A, {
        value: m(z, {
            [Y.Open]: p.Open,
            [Y.Closed]: p.Closed
        })
    }, u != null && J.createElement(de, {
        disabled: h,
        data: E == null ? {} : {
            [u]: E
        },
        form: c,
        onReset: W
    }), me({
        ourProps: pe,
        theirProps: w,
        slot: fe,
        defaultTag: ot,
        name: `Combobox`
    }))))))
}
var ct = `input`;

function lt(e, t) {
    let n = tt(`Combobox.Input`),
        i = $(`Combobox.Input`),
        c = (0, g.useId)(),
        l = R(),
        {
            id: u = l || `headlessui-combobox-input-${c}`,
            onChange: d,
            displayValue: f,
            disabled: p = i.disabled || !1,
            autoFocus: h = !1,
            type: _ = `text`,
            ...y
        } = e,
        b = (0, J.useRef)(null),
        S = a(b, t, we(), n.actions.setInputElement),
        [C, te] = s(n, e => [e.comboboxState, e.isTyping]),
        w = v(),
        T = D(() => {
            n.actions.onChange(null), n.state.optionsElement && (n.state.optionsElement.scrollTop = 0), n.actions.goToOption({
                focus: G.Nothing
            })
        });
    fe(([e, t], [r, i]) => {
        if (n.state.isTyping) return;
        let a = b.current;
        a && ((i === Y.Open && t === Y.Closed || e !== r) && (a.value = e), requestAnimationFrame(() => {
            if (n.state.isTyping || !a || L(a)) return;
            let {
                selectionStart: e,
                selectionEnd: t
            } = a;
            Math.abs((t ?? 0) - (e ?? 0)) === 0 && e === 0 && a.setSelectionRange(a.value.length, a.value.length)
        }))
    }, [(0, J.useMemo)(() => typeof f == `function` && i.value !== void 0 ? f(i.value) ?? `` : typeof i.value == `string` ? i.value : ``, [i.value, f]), C, te]), fe(([e], [t]) => {
        if (e === Y.Open && t === Y.Closed) {
            if (n.state.isTyping) return;
            let e = b.current;
            if (!e) return;
            let t = e.value,
                {
                    selectionStart: r,
                    selectionEnd: i,
                    selectionDirection: a
                } = e;
            e.value = ``, e.value = t, a === null ? e.setSelectionRange(r, i) : e.setSelectionRange(r, i, a)
        }
    }, [C]);
    let E = (0, J.useRef)(!1),
        O = D(() => {
            E.current = !0
        }),
        A = D(() => {
            w.nextFrame(() => {
                E.current = !1
            })
        }),
        j = D(e => {
            switch (n.actions.setIsTyping(!0), e.key) {
                case o.Enter:
                    if (n.state.comboboxState !== Y.Open || E.current) return;
                    if (e.preventDefault(), e.stopPropagation(), n.selectors.activeOptionIndex(n.state) === null) {
                        n.actions.closeCombobox();
                        return
                    }
                    n.actions.selectActiveOption(), i.mode === X.Single && n.actions.closeCombobox();
                    break;
                case o.ArrowDown:
                    return e.preventDefault(), e.stopPropagation(), m(n.state.comboboxState, {
                        [Y.Open]: () => n.actions.goToOption({
                            focus: G.Next
                        }),
                        [Y.Closed]: () => n.actions.openCombobox()
                    });
                case o.ArrowUp:
                    return e.preventDefault(), e.stopPropagation(), m(n.state.comboboxState, {
                        [Y.Open]: () => n.actions.goToOption({
                            focus: G.Previous
                        }),
                        [Y.Closed]: () => {
                            (0, Q.flushSync)(() => n.actions.openCombobox()), i.value || n.actions.goToOption({
                                focus: G.Last
                            })
                        }
                    });
                case o.Home:
                    if (n.state.comboboxState === Y.Closed || e.shiftKey) break;
                    return e.preventDefault(), e.stopPropagation(), n.actions.goToOption({
                        focus: G.First
                    });
                case o.PageUp:
                    return e.preventDefault(), e.stopPropagation(), n.actions.goToOption({
                        focus: G.First
                    });
                case o.End:
                    if (n.state.comboboxState === Y.Closed || e.shiftKey) break;
                    return e.preventDefault(), e.stopPropagation(), n.actions.goToOption({
                        focus: G.Last
                    });
                case o.PageDown:
                    return e.preventDefault(), e.stopPropagation(), n.actions.goToOption({
                        focus: G.Last
                    });
                case o.Escape:
                    return n.state.comboboxState === Y.Open ? (e.preventDefault(), n.state.optionsElement && !i.optionsPropsRef.current.static && e.stopPropagation(), i.mode === X.Single && i.value === null && T(), n.actions.closeCombobox()) : void 0;
                case o.Tab:
                    if (n.actions.setIsTyping(!1), n.state.comboboxState !== Y.Open) return;
                    i.mode === X.Single && n.state.activationTrigger !== Z.Focus && n.actions.selectActiveOption(), n.actions.closeCombobox();
                    break
            }
        }),
        M = D(e => {
            d ?.(e), i.mode === X.Single && e.target.value === `` && T(), n.actions.openCombobox()
        }),
        N = D(e => {
            var t, r;
            let a = e.relatedTarget ?? U.find(t => t !== e.currentTarget);
            if (!((t = n.state.optionsElement) != null && t.contains(a)) && !((r = n.state.buttonElement) != null && r.contains(a)) && n.state.comboboxState === Y.Open) return e.preventDefault(), i.mode === X.Single && i.value === null && T(), n.actions.closeCombobox()
        }),
        P = D(e => {
            var t, r;
            let a = e.relatedTarget ?? U.find(t => t !== e.currentTarget);
            (t = n.state.buttonElement) != null && t.contains(a) || (r = n.state.optionsElement) != null && r.contains(a) || i.disabled || i.immediate && n.state.comboboxState !== Y.Open && w.microTask(() => {
                (0, Q.flushSync)(() => n.actions.openCombobox()), n.actions.setActivationTrigger(Z.Focus)
            })
        }),
        F = ie(),
        I = r(),
        {
            isFocused: ne,
            focusProps: re
        } = V({
            autoFocus: h
        }),
        {
            isHovered: B,
            hoverProps: ae
        } = z({
            isDisabled: p
        }),
        oe = s(n, e => e.optionsElement),
        se = ee({
            open: C === Y.Open,
            disabled: p,
            invalid: i.invalid,
            hover: B,
            focus: ne,
            autofocus: h
        }),
        ce = x({
            ref: S,
            id: u,
            role: `combobox`,
            type: _,
            "aria-controls": oe ?.id,
            "aria-expanded": C === Y.Open,
            "aria-activedescendant": s(n, n.selectors.activeDescendantId),
            "aria-labelledby": F,
            "aria-describedby": I,
            "aria-autocomplete": `list`,
            defaultValue: e.defaultValue ?? (i.defaultValue === void 0 ? null : f ?.(i.defaultValue)) ?? i.defaultValue,
            disabled: p || void 0,
            autoFocus: h,
            onCompositionStart: O,
            onCompositionEnd: A,
            onKeyDown: j,
            onChange: M,
            onFocus: P,
            onBlur: N
        }, re, ae);
    return k()({
        ourProps: ce,
        theirProps: y,
        slot: se,
        defaultTag: ct,
        name: `Combobox.Input`
    })
}
var ut = `button`;

function dt(e, t) {
    let n = tt(`Combobox.Button`),
        r = $(`Combobox.Button`),
        [i, c] = (0, J.useState)(null),
        l = a(t, c, n.actions.setButtonElement),
        d = (0, g.useId)(),
        {
            id: f = `headlessui-combobox-button-${d}`,
            disabled: p = r.disabled || !1,
            autoFocus: m = !1,
            ...h
        } = e,
        [_, v, y] = s(n, e => [e.comboboxState, e.inputElement, e.optionsElement]),
        b = Ke(v);
    Se(_ === Y.Open, {
        trigger: i,
        action: (0, J.useCallback)(e => {
            if (i != null && i.contains(e.target) || v != null && v.contains(e.target)) return be.Ignore;
            let t = e.target.closest(`[role="option"]:not([data-disabled])`);
            return u(t) ? be.Select(t) : y != null && y.contains(e.target) ? be.Ignore : be.Close
        }, [i, v, y]),
        close: n.actions.closeCombobox,
        select: n.actions.selectActiveOption
    });
    let S = D(e => {
            switch (e.key) {
                case o.Space:
                case o.Enter:
                    e.preventDefault(), e.stopPropagation(), n.state.comboboxState === Y.Closed && (0, Q.flushSync)(() => n.actions.openCombobox()), b();
                    return;
                case o.ArrowDown:
                    e.preventDefault(), e.stopPropagation(), n.state.comboboxState === Y.Closed && ((0, Q.flushSync)(() => n.actions.openCombobox()), n.state.dataRef.current.value || n.actions.goToOption({
                        focus: G.First
                    })), b();
                    return;
                case o.ArrowUp:
                    e.preventDefault(), e.stopPropagation(), n.state.comboboxState === Y.Closed && ((0, Q.flushSync)(() => n.actions.openCombobox()), n.state.dataRef.current.value || n.actions.goToOption({
                        focus: G.Last
                    })), b();
                    return;
                case o.Escape:
                    if (n.state.comboboxState !== Y.Open) return;
                    e.preventDefault(), n.state.optionsElement && !r.optionsPropsRef.current.static && e.stopPropagation(), (0, Q.flushSync)(() => n.actions.closeCombobox()), b();
                    return;
                default:
                    return
            }
        }),
        C = ve(() => {
            n.state.comboboxState === Y.Open ? n.actions.closeCombobox() : n.actions.openCombobox(), b()
        }),
        te = ie([f]),
        {
            isFocusVisible: w,
            focusProps: T
        } = V({
            autoFocus: m
        }),
        {
            isHovered: E,
            hoverProps: O
        } = z({
            isDisabled: p
        }),
        {
            pressed: A,
            pressProps: j
        } = B({
            disabled: p
        }),
        M = ee({
            open: _ === Y.Open,
            active: A || _ === Y.Open,
            disabled: p,
            invalid: r.invalid,
            value: r.value,
            hover: E,
            focus: w
        }),
        N = x({
            ref: l,
            id: f,
            type: ae(e, i),
            tabIndex: -1,
            "aria-haspopup": `listbox`,
            "aria-controls": y ?.id,
            "aria-expanded": _ === Y.Open,
            "aria-labelledby": te,
            disabled: p || void 0,
            autoFocus: m,
            onKeyDown: S
        }, C, T, O, j);
    return k()({
        ourProps: N,
        theirProps: h,
        slot: M,
        defaultTag: ut,
        name: `Combobox.Button`
    })
}
var ft = `div`,
    pt = j.RenderStrategy | j.Static;

function mt(e, t) {
    let r = (0, g.useId)(),
        {
            id: i = `headlessui-combobox-options-${r}`,
            hold: o = !1,
            anchor: c,
            portal: l = !1,
            modal: u = !0,
            transition: d = !1,
            ...f
        } = e,
        m = tt(`Combobox.Options`),
        v = $(`Combobox.Options`),
        y = he(c);
    y && (l = !0);
    let [te, T] = me(y), [O, A] = (0, J.useState)(null), j = ye(), N = a(t, y ? te : null, m.actions.setOptionsElement, A), [P, F, I, L, ne] = s(m, e => [e.comboboxState, e.inputElement, e.buttonElement, e.optionsElement, e.activationTrigger]), R = C(F || I), z = C(L), re = M(), [B, ae] = h(d, O, re === null ? P === Y.Open : (re & p.Open) === p.Open);
    S(B, F, m.actions.closeCombobox), E(v.__demoMode ? !1 : u && P === Y.Open, z), n(v.__demoMode ? !1 : u && P === Y.Open, {
        allowed: (0, J.useCallback)(() => [F, I, L], [F, I, L])
    });
    let V = s(m, m.selectors.didInputMove) ? !1 : B;
    b(() => {
        v.optionsPropsRef.current.static = e.static ?? !1
    }, [v.optionsPropsRef, e.static]), b(() => {
        v.optionsPropsRef.current.hold = o
    }, [v.optionsPropsRef, o]), Ee(P === Y.Open, {
        container: L,
        accept(e) {
            return e.getAttribute(`role`) === `option` ? NodeFilter.FILTER_REJECT : e.hasAttribute(`role`) ? NodeFilter.FILTER_SKIP : NodeFilter.FILTER_ACCEPT
        },
        walk(e) {
            e.setAttribute(`role`, `none`)
        }
    });
    let oe = ie([I ?.id]),
        se = ee({
            open: P === Y.Open,
            option: void 0
        }),
        le = D(() => {
            m.actions.setActivationTrigger(Z.Pointer)
        }),
        de = D(e => {
            e.preventDefault(), m.actions.setActivationTrigger(Z.Pointer)
        }),
        fe = x(y ? j() : {}, {
            "aria-labelledby": oe,
            role: `listbox`,
            "aria-multiselectable": v.mode === X.Multi ? !0 : void 0,
            id: i,
            ref: N,
            style: { ...f.style,
                ...T,
                "--input-width": pe(B, F, !0).width,
                "--button-width": pe(B, I, !0).width
            },
            onWheel: ne === Z.Pointer ? void 0 : le,
            onMouseDown: de,
            ..._(ae)
        }),
        H = B && P === Y.Closed && !e.static,
        U = ce(H, v.virtual ?.options),
        W = ce(H, v.value),
        ge = (0, J.useCallback)(e => v.compare(W, e), [v.compare, W]),
        _e = (0, J.useMemo)(() => {
            if (!v.virtual) return v;
            if (U === void 0) throw Error("Missing `options` in virtual mode");
            return U === v.virtual.options ? v : { ...v,
                virtual: { ...v.virtual,
                    options: U
                }
            }
        }, [v, U, v.virtual ?.options]);
    v.virtual && Object.assign(f, {
        children: J.createElement(rt.Provider, {
            value: _e
        }, J.createElement(at, {
            slot: se
        }, f.children))
    });
    let ve = k(),
        G = (0, J.useMemo)(() => v.mode === X.Multi ? v : { ...v,
            isSelected: ge
        }, [v, ge]);
    return J.createElement(w, {
        enabled: l ? e.static || B : !1,
        ownerDocument: R
    }, J.createElement(rt.Provider, {
        value: G
    }, ve({
        ourProps: fe,
        theirProps: { ...f,
            children: J.createElement(ue, {
                freeze: H
            }, typeof f.children == `function` ? f.children ?.call(f, se) : f.children)
        },
        slot: se,
        defaultTag: ft,
        features: pt,
        visible: V,
        name: `Combobox.Options`
    })))
}
var ht = `div`;

function gt(e, t) {
    var n;
    let r = $(`Combobox.Option`),
        i = tt(`Combobox.Option`),
        o = (0, g.useId)(),
        {
            id: c = `headlessui-combobox-option-${o}`,
            value: l,
            disabled: u = ((n = r.virtual) ?.disabled) ?.call(n, l) ?? !1,
            order: f = null,
            ...p
        } = e,
        [m] = s(i, e => [e.inputElement]),
        h = Ke(m),
        _ = s(i, (0, J.useCallback)(e => i.selectors.isActive(e, l, c), [l, c])),
        v = r.isSelected(l),
        y = (0, J.useRef)(null),
        x = te({
            disabled: u,
            value: l,
            domRef: y,
            order: f
        }),
        S = (0, J.useContext)(it),
        C = a(t, y, S ? S.measureElement : null),
        w = D(() => {
            i.actions.setIsTyping(!1), i.actions.onChange(l)
        });
    b(() => i.actions.registerOption(c, x), [x, c]);
    let T = s(i, (0, J.useCallback)(e => i.selectors.shouldScrollIntoView(e, l, c), [l, c]));
    b(() => {
        if (T) return d().requestAnimationFrame(() => {
            var e, t;
            (t = (e = y.current) ?.scrollIntoView) == null || t.call(e, {
                block: `nearest`
            })
        })
    }, [T, y]);
    let E = D(e => {
            e.preventDefault(), e.button === _e.Left && (u || (w(), P() || requestAnimationFrame(() => h()), r.mode === X.Single && i.actions.closeCombobox()))
        }),
        O = D(() => {
            if (u) return i.actions.goToOption({
                focus: G.Nothing
            });
            let e = r.calculateIndex(l);
            i.actions.goToOption({
                focus: G.Specific,
                idx: e
            })
        }),
        A = ge(),
        j = D(e => A.update(e)),
        M = D(e => {
            if (!A.wasMoved(e) || u || _ && i.state.activationTrigger === Z.Pointer) return;
            let t = r.calculateIndex(l);
            i.actions.goToOption({
                focus: G.Specific,
                idx: t
            }, Z.Pointer)
        }),
        N = D(e => {
            A.wasMoved(e) && (u || _ && (r.optionsPropsRef.current.hold || i.state.activationTrigger === Z.Pointer && i.actions.goToOption({
                focus: G.Nothing
            })))
        }),
        F = ee({
            active: _,
            focus: _,
            selected: v,
            disabled: u
        }),
        I = {
            id: c,
            ref: C,
            role: `option`,
            tabIndex: u === !0 ? void 0 : -1,
            "aria-disabled": u === !0 ? !0 : void 0,
            "aria-selected": v,
            disabled: void 0,
            onMouseDown: E,
            onFocus: O,
            onPointerEnter: j,
            onMouseEnter: j,
            onPointerMove: M,
            onMouseMove: M,
            onPointerLeave: N,
            onMouseLeave: N
        };
    return k()({
        ourProps: I,
        theirProps: p,
        slot: F,
        defaultTag: ht,
        name: `Combobox.Option`
    })
}
var _t = f(st),
    vt = f(dt),
    yt = f(lt),
    bt = ne,
    xt = f(mt),
    St = f(gt),
    Ct = Object.assign(_t, {
        Input: yt,
        Button: vt,
        Label: bt,
        Options: xt,
        Option: St
    });
export {
    yt as a, xt as i, St as n, Ct as r, vt as t
};
//# sourceMappingURL=combobox-D4npfmot.js.map