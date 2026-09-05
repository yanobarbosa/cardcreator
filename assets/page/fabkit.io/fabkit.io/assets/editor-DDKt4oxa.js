var e = Object.defineProperty,
    t = (t, n) => {
        let r = {};
        for (var i in t) e(r, i, {
            get: t[i],
            enumerable: !0
        });
        return n || e(r, Symbol.toStringTag, {
            value: `Module`
        }), r
    };

function n(e) {
    this.content = e
}
n.prototype = {
    constructor: n,
    find: function(e) {
        for (var t = 0; t < this.content.length; t += 2)
            if (this.content[t] === e) return t;
        return -1
    },
    get: function(e) {
        var t = this.find(e);
        return t == -1 ? void 0 : this.content[t + 1]
    },
    update: function(e, t, r) {
        var i = r && r != e ? this.remove(r) : this,
            a = i.find(e),
            o = i.content.slice();
        return a == -1 ? o.push(r || e, t) : (o[a + 1] = t, r && (o[a] = r)), new n(o)
    },
    remove: function(e) {
        var t = this.find(e);
        if (t == -1) return this;
        var r = this.content.slice();
        return r.splice(t, 2), new n(r)
    },
    addToStart: function(e, t) {
        return new n([e, t].concat(this.remove(e).content))
    },
    addToEnd: function(e, t) {
        var r = this.remove(e).content.slice();
        return r.push(e, t), new n(r)
    },
    addBefore: function(e, t, r) {
        var i = this.remove(t),
            a = i.content.slice(),
            o = i.find(e);
        return a.splice(o == -1 ? a.length : o, 0, t, r), new n(a)
    },
    forEach: function(e) {
        for (var t = 0; t < this.content.length; t += 2) e(this.content[t], this.content[t + 1])
    },
    prepend: function(e) {
        return e = n.from(e), e.size ? new n(e.content.concat(this.subtract(e).content)) : this
    },
    append: function(e) {
        return e = n.from(e), e.size ? new n(this.subtract(e).content.concat(e.content)) : this
    },
    subtract: function(e) {
        var t = this;
        e = n.from(e);
        for (var r = 0; r < e.content.length; r += 2) t = t.remove(e.content[r]);
        return t
    },
    toObject: function() {
        var e = {};
        return this.forEach(function(t, n) {
            e[t] = n
        }), e
    },
    get size() {
        return this.content.length >> 1
    }
}, n.from = function(e) {
    if (e instanceof n) return e;
    var t = [];
    if (e)
        for (var r in e) t.push(r, e[r]);
    return new n(t)
};
var r = n;

function i(e, t, n) {
    for (let r = 0;; r++) {
        if (r == e.childCount || r == t.childCount) return e.childCount == t.childCount ? null : n;
        let a = e.child(r),
            c = t.child(r);
        if (a == c) {
            n += a.nodeSize;
            continue
        }
        if (!a.sameMarkup(c)) return n;
        if (a.isText && a.text != c.text) {
            let e = a.text,
                t = c.text,
                r = 0;
            for (; e[r] == t[r]; r++) n++;
            return r && r < e.length && r < t.length && s(e.charCodeAt(r - 1)) && o(e.charCodeAt(r)) && n--, n
        }
        if (a.content.size || c.content.size) {
            let e = i(a.content, c.content, n + 1);
            if (e != null) return e
        }
        n += a.nodeSize
    }
}

function a(e, t, n, r) {
    for (let i = e.childCount, c = t.childCount;;) {
        if (i == 0 || c == 0) return i == c ? null : {
            a: n,
            b: r
        };
        let l = e.child(--i),
            u = t.child(--c),
            d = l.nodeSize;
        if (l == u) {
            n -= d, r -= d;
            continue
        }
        if (!l.sameMarkup(u)) return {
            a: n,
            b: r
        };
        if (l.isText && l.text != u.text) {
            let e = l.text,
                t = u.text,
                i = e.length,
                a = t.length;
            for (; i > 0 && a > 0 && e[i - 1] == t[a - 1];) i--, a--, n--, r--;
            return i && a && i < e.length && s(e.charCodeAt(i - 1)) && o(e.charCodeAt(i)) && (n++, r++), {
                a: n,
                b: r
            }
        }
        if (l.content.size || u.content.size) {
            let e = a(l.content, u.content, n - 1, r - 1);
            if (e) return e
        }
        n -= d, r -= d
    }
}

function o(e) {
    return e >= 56320 && e < 57344
}

function s(e) {
    return e >= 55296 && e < 56320
}
var c = class e {
    constructor(e, t) {
        if (this.content = e, this.size = t || 0, t == null)
            for (let t = 0; t < e.length; t++) this.size += e[t].nodeSize
    }
    nodesBetween(e, t, n, r = 0, i) {
        for (let a = 0, o = 0; o < t; a++) {
            let s = this.content[a],
                c = o + s.nodeSize;
            if (c > e && n(s, r + o, i || null, a) !== !1 && s.content.size) {
                let i = o + 1;
                s.nodesBetween(Math.max(0, e - i), Math.min(s.content.size, t - i), n, r + i)
            }
            o = c
        }
    }
    descendants(e) {
        this.nodesBetween(0, this.size, e)
    }
    textBetween(e, t, n, r) {
        let i = ``,
            a = !0;
        return this.nodesBetween(e, t, (o, s) => {
            let c = o.isText ? o.text.slice(Math.max(e, s) - s, t - s) : o.isLeaf ? r ? typeof r == `function` ? r(o) : r : o.type.spec.leafText ? o.type.spec.leafText(o) : `` : ``;
            o.isBlock && (o.isLeaf && c || o.isTextblock) && n && (a ? a = !1 : i += n), i += c
        }, 0), i
    }
    append(t) {
        if (!t.size) return this;
        if (!this.size) return t;
        let n = this.lastChild,
            r = t.firstChild,
            i = this.content.slice(),
            a = 0;
        for (n.isText && n.sameMarkup(r) && (i[i.length - 1] = n.withText(n.text + r.text), a = 1); a < t.content.length; a++) i.push(t.content[a]);
        return new e(i, this.size + t.size)
    }
    cut(t, n = this.size) {
        if (t == 0 && n == this.size) return this;
        let r = [],
            i = 0;
        if (n > t)
            for (let e = 0, a = 0; a < n; e++) {
                let o = this.content[e],
                    s = a + o.nodeSize;
                s > t && ((a < t || s > n) && (o = o.isText ? o.cut(Math.max(0, t - a), Math.min(o.text.length, n - a)) : o.cut(Math.max(0, t - a - 1), Math.min(o.content.size, n - a - 1))), r.push(o), i += o.nodeSize), a = s
            }
        return new e(r, i)
    }
    cutByIndex(t, n) {
        return t == n ? e.empty : t == 0 && n == this.content.length ? this : new e(this.content.slice(t, n))
    }
    replaceChild(t, n) {
        let r = this.content[t];
        if (r == n) return this;
        let i = this.content.slice(),
            a = this.size + n.nodeSize - r.nodeSize;
        return i[t] = n, new e(i, a)
    }
    addToStart(t) {
        return new e([t].concat(this.content), this.size + t.nodeSize)
    }
    addToEnd(t) {
        return new e(this.content.concat(t), this.size + t.nodeSize)
    }
    eq(e) {
        if (this.content.length != e.content.length) return !1;
        for (let t = 0; t < this.content.length; t++)
            if (!this.content[t].eq(e.content[t])) return !1;
        return !0
    }
    get firstChild() {
        return this.content.length ? this.content[0] : null
    }
    get lastChild() {
        return this.content.length ? this.content[this.content.length - 1] : null
    }
    get childCount() {
        return this.content.length
    }
    child(e) {
        let t = this.content[e];
        if (!t) throw RangeError(`Index ` + e + ` out of range for ` + this);
        return t
    }
    maybeChild(e) {
        return this.content[e] || null
    }
    forEach(e) {
        for (let t = 0, n = 0; t < this.content.length; t++) {
            let r = this.content[t];
            e(r, n, t), n += r.nodeSize
        }
    }
    findDiffStart(e, t = 0) {
        return i(this, e, t)
    }
    findDiffEnd(e, t = this.size, n = e.size) {
        return a(this, e, t, n)
    }
    findIndex(e) {
        if (e == 0) return u(0, e);
        if (e == this.size) return u(this.content.length, e);
        if (e > this.size || e < 0) throw RangeError(`Position ${e} outside of fragment (${this})`);
        for (let t = 0, n = 0;; t++) {
            let r = this.child(t),
                i = n + r.nodeSize;
            if (i >= e) return i == e ? u(t + 1, i) : u(t, n);
            n = i
        }
    }
    toString() {
        return `<` + this.toStringInner() + `>`
    }
    toStringInner() {
        return this.content.join(`, `)
    }
    toJSON() {
        return this.content.length ? this.content.map(e => e.toJSON()) : null
    }
    static fromJSON(t, n) {
        if (!n) return e.empty;
        if (!Array.isArray(n)) throw RangeError(`Invalid input for Fragment.fromJSON`);
        return e.fromArray(n.map(t.nodeFromJSON))
    }
    static fromArray(t) {
        if (!t.length) return e.empty;
        let n, r = 0;
        for (let e = 0; e < t.length; e++) {
            let i = t[e];
            r += i.nodeSize, e && i.isText && t[e - 1].sameMarkup(i) ? (n ||= t.slice(0, e), n[n.length - 1] = i.withText(n[n.length - 1].text + i.text)) : n && n.push(i)
        }
        return new e(n || t, r)
    }
    static from(t) {
        if (!t) return e.empty;
        if (t instanceof e) return t;
        if (Array.isArray(t)) return this.fromArray(t);
        if (t.attrs) return new e([t], t.nodeSize);
        throw RangeError(`Can not convert ` + t + ` to a Fragment` + (t.nodesBetween ? ` (looks like multiple versions of prosemirror-model were loaded)` : ``))
    }
};
c.empty = new c([], 0);
var l = {
    index: 0,
    offset: 0
};

function u(e, t) {
    return l.index = e, l.offset = t, l
}

function d(e, t) {
    if (e === t) return !0;
    if (!(e && typeof e == `object`) || !(t && typeof t == `object`)) return !1;
    let n = Array.isArray(e);
    if (Array.isArray(t) != n) return !1;
    if (n) {
        if (e.length != t.length) return !1;
        for (let n = 0; n < e.length; n++)
            if (!d(e[n], t[n])) return !1
    } else {
        for (let n in e)
            if (!(n in t) || !d(e[n], t[n])) return !1;
        for (let n in t)
            if (!(n in e)) return !1
    }
    return !0
}
var f = class e {
    constructor(e, t) {
        this.type = e, this.attrs = t
    }
    addToSet(e) {
        let t, n = !1;
        for (let r = 0; r < e.length; r++) {
            let i = e[r];
            if (this.eq(i)) return e;
            if (this.type.excludes(i.type)) t ||= e.slice(0, r);
            else if (i.type.excludes(this.type)) return e;
            else !n && i.type.rank > this.type.rank && (t ||= e.slice(0, r), t.push(this), n = !0), t && t.push(i)
        }
        return t ||= e.slice(), n || t.push(this), t
    }
    removeFromSet(e) {
        for (let t = 0; t < e.length; t++)
            if (this.eq(e[t])) return e.slice(0, t).concat(e.slice(t + 1));
        return e
    }
    isInSet(e) {
        for (let t = 0; t < e.length; t++)
            if (this.eq(e[t])) return !0;
        return !1
    }
    eq(e) {
        return this == e || this.type == e.type && d(this.attrs, e.attrs)
    }
    toJSON() {
        let e = {
            type: this.type.name
        };
        for (let t in this.attrs) {
            e.attrs = this.attrs;
            break
        }
        return e
    }
    static fromJSON(e, t) {
        if (!t) throw RangeError(`Invalid input for Mark.fromJSON`);
        let n = e.marks[t.type];
        if (!n) throw RangeError(`There is no mark type ${t.type} in this schema`);
        let r = n.create(t.attrs);
        return n.checkAttrs(r.attrs), r
    }
    static sameSet(e, t) {
        if (e == t) return !0;
        if (e.length != t.length) return !1;
        for (let n = 0; n < e.length; n++)
            if (!e[n].eq(t[n])) return !1;
        return !0
    }
    static setFrom(t) {
        if (!t || Array.isArray(t) && t.length == 0) return e.none;
        if (t instanceof e) return [t];
        let n = t.slice();
        return n.sort((e, t) => e.type.rank - t.type.rank), n
    }
};
f.none = [];
var p = class extends Error {},
    m = class e {
        constructor(e, t, n) {
            this.content = e, this.openStart = t, this.openEnd = n
        }
        get size() {
            return this.content.size - this.openStart - this.openEnd
        }
        insertAt(t, n) {
            let r = g(this.content, t + this.openStart, n, this.openStart + 1, this.openEnd + 1);
            return r && new e(r, this.openStart, this.openEnd)
        }
        removeBetween(t, n) {
            return new e(h(this.content, t + this.openStart, n + this.openStart), this.openStart, this.openEnd)
        }
        eq(e) {
            return this.content.eq(e.content) && this.openStart == e.openStart && this.openEnd == e.openEnd
        }
        toString() {
            return this.content + `(` + this.openStart + `,` + this.openEnd + `)`
        }
        toJSON() {
            if (!this.content.size) return null;
            let e = {
                content: this.content.toJSON()
            };
            return this.openStart > 0 && (e.openStart = this.openStart), this.openEnd > 0 && (e.openEnd = this.openEnd), e
        }
        static fromJSON(t, n) {
            if (!n) return e.empty;
            let r = n.openStart || 0,
                i = n.openEnd || 0;
            if (typeof r != `number` || typeof i != `number`) throw RangeError(`Invalid input for Slice.fromJSON`);
            return new e(c.fromJSON(t, n.content), r, i)
        }
        static maxOpen(t, n = !0) {
            let r = 0,
                i = 0;
            for (let e = t.firstChild; e && !e.isLeaf && (n || !e.type.spec.isolating); e = e.firstChild) r++;
            for (let e = t.lastChild; e && !e.isLeaf && (n || !e.type.spec.isolating); e = e.lastChild) i++;
            return new e(t, r, i)
        }
    };
m.empty = new m(c.empty, 0, 0);

function h(e, t, n) {
    let {
        index: r,
        offset: i
    } = e.findIndex(t), a = e.maybeChild(r), {
        index: o,
        offset: s
    } = e.findIndex(n);
    if (i == t || a.isText) {
        if (s != n && !e.child(o).isText) throw RangeError(`Removing non-flat range`);
        return e.cut(0, t).append(e.cut(n))
    }
    if (r != o) throw RangeError(`Removing non-flat range`);
    return e.replaceChild(r, a.copy(h(a.content, t - i - 1, n - i - 1)))
}

function g(e, t, n, r, i, a) {
    let {
        index: o,
        offset: s
    } = e.findIndex(t), c = e.maybeChild(o);
    if (s == t || c.isText) return a && r <= 0 && i <= 0 && !a.canReplace(o, o, n) ? null : e.cut(0, t).append(n).append(e.cut(t));
    let l = g(c.content, t - s - 1, n, o == 0 ? r - 1 : 0, o == e.childCount - 1 ? i - 1 : 0, c);
    return l && e.replaceChild(o, c.copy(l))
}

function ee(e, t, n) {
    if (n.openStart > e.depth) throw new p(`Inserted content deeper than insertion position`);
    if (e.depth - n.openStart != t.depth - n.openEnd) throw new p(`Inconsistent open depths`);
    return te(e, t, n, 0)
}

function te(e, t, n, r) {
    let i = e.index(r),
        a = e.node(r);
    if (i == t.index(r) && r < e.depth - n.openStart) {
        let o = te(e, t, n, r + 1);
        return a.copy(a.content.replaceChild(i, o))
    } else if (n.content.size)
        if (!n.openStart && !n.openEnd && e.depth == r && t.depth == r) {
            let r = e.parent,
                i = r.content;
            return ie(r, i.cut(0, e.parentOffset).append(n.content).append(i.cut(t.parentOffset)))
        } else {
            let {
                start: i,
                end: o
            } = se(n, e);
            return ie(a, ae(e, i, o, t, r))
        }
    else return ie(a, oe(e, t, r))
}

function _(e, t) {
    if (!t.type.compatibleContent(e.type)) throw new p(`Cannot join ` + t.type.name + ` onto ` + e.type.name)
}

function ne(e, t, n) {
    let r = e.node(n);
    return _(r, t.node(n)), r
}

function v(e, t) {
    let n = t.length - 1;
    n >= 0 && e.isText && e.sameMarkup(t[n]) ? t[n] = e.withText(t[n].text + e.text) : t.push(e)
}

function re(e, t, n, r) {
    let i = (t || e).node(n),
        a = 0,
        o = t ? t.index(n) : i.childCount;
    e && (a = e.index(n), e.depth > n ? a++ : e.textOffset && (v(e.nodeAfter, r), a++));
    for (let e = a; e < o; e++) v(i.child(e), r);
    t && t.depth == n && t.textOffset && v(t.nodeBefore, r)
}

function ie(e, t) {
    if (!e.type.validContent(t)) throw new p(`Invalid content for node ` + e.type.name);
    return e.copy(t)
}

function ae(e, t, n, r, i) {
    let a = e.depth > i && ne(e, t, i + 1),
        o = r.depth > i && ne(n, r, i + 1),
        s = [];
    return re(null, e, i, s), a && o && t.index(i) == n.index(i) ? (_(a, o), v(ie(a, ae(e, t, n, r, i + 1)), s)) : (a && v(ie(a, oe(e, t, i + 1)), s), re(t, n, i, s), o && v(ie(o, oe(n, r, i + 1)), s)), re(r, null, i, s), new c(s)
}

function oe(e, t, n) {
    let r = [];
    return re(null, e, n, r), e.depth > n && v(ie(ne(e, t, n + 1), oe(e, t, n + 1)), r), re(t, null, n, r), new c(r)
}

function se(e, t) {
    let n = t.depth - e.openStart,
        r = t.node(n).copy(e.content);
    for (let e = n - 1; e >= 0; e--) r = t.node(e).copy(c.from(r));
    return {
        start: r.resolveNoCache(e.openStart + n),
        end: r.resolveNoCache(r.content.size - e.openEnd - n)
    }
}
var ce = class e {
        constructor(e, t, n) {
            this.pos = e, this.path = t, this.parentOffset = n, this.depth = t.length / 3 - 1
        }
        resolveDepth(e) {
            return e == null ? this.depth : e < 0 ? this.depth + e : e
        }
        get parent() {
            return this.node(this.depth)
        }
        get doc() {
            return this.node(0)
        }
        node(e) {
            return this.path[this.resolveDepth(e) * 3]
        }
        index(e) {
            return this.path[this.resolveDepth(e) * 3 + 1]
        }
        indexAfter(e) {
            return e = this.resolveDepth(e), this.index(e) + (e == this.depth && !this.textOffset ? 0 : 1)
        }
        start(e) {
            return e = this.resolveDepth(e), e == 0 ? 0 : this.path[e * 3 - 1] + 1
        }
        end(e) {
            return e = this.resolveDepth(e), this.start(e) + this.node(e).content.size
        }
        before(e) {
            if (e = this.resolveDepth(e), !e) throw RangeError(`There is no position before the top-level node`);
            return e == this.depth + 1 ? this.pos : this.path[e * 3 - 1]
        }
        after(e) {
            if (e = this.resolveDepth(e), !e) throw RangeError(`There is no position after the top-level node`);
            return e == this.depth + 1 ? this.pos : this.path[e * 3 - 1] + this.path[e * 3].nodeSize
        }
        get textOffset() {
            return this.pos - this.path[this.path.length - 1]
        }
        get nodeAfter() {
            let e = this.parent,
                t = this.index(this.depth);
            if (t == e.childCount) return null;
            let n = this.pos - this.path[this.path.length - 1],
                r = e.child(t);
            return n ? e.child(t).cut(n) : r
        }
        get nodeBefore() {
            let e = this.index(this.depth),
                t = this.pos - this.path[this.path.length - 1];
            return t ? this.parent.child(e).cut(0, t) : e == 0 ? null : this.parent.child(e - 1)
        }
        posAtIndex(e, t) {
            t = this.resolveDepth(t);
            let n = this.path[t * 3],
                r = t == 0 ? 0 : this.path[t * 3 - 1] + 1;
            for (let t = 0; t < e; t++) r += n.child(t).nodeSize;
            return r
        }
        marks() {
            let e = this.parent,
                t = this.index();
            if (e.content.size == 0) return f.none;
            if (this.textOffset) return e.child(t).marks;
            let n = e.maybeChild(t - 1),
                r = e.maybeChild(t);
            if (!n) {
                let e = n;
                n = r, r = e
            }
            let i = n.marks;
            for (var a = 0; a < i.length; a++) i[a].type.spec.inclusive === !1 && (!r || !i[a].isInSet(r.marks)) && (i = i[a--].removeFromSet(i));
            return i
        }
        marksAcross(e) {
            let t = this.parent.maybeChild(this.index());
            if (!t || !t.isInline) return null;
            let n = t.marks,
                r = e.parent.maybeChild(e.index());
            for (var i = 0; i < n.length; i++) n[i].type.spec.inclusive === !1 && (!r || !n[i].isInSet(r.marks)) && (n = n[i--].removeFromSet(n));
            return n
        }
        sharedDepth(e) {
            for (let t = this.depth; t > 0; t--)
                if (this.start(t) <= e && this.end(t) >= e) return t;
            return 0
        }
        blockRange(e = this, t) {
            if (e.pos < this.pos) return e.blockRange(this);
            for (let n = this.depth - (this.parent.inlineContent || this.pos == e.pos ? 1 : 0); n >= 0; n--)
                if (e.pos <= this.end(n) && (!t || t(this.node(n)))) return new fe(this, e, n);
            return null
        }
        sameParent(e) {
            return this.pos - this.parentOffset == e.pos - e.parentOffset
        }
        max(e) {
            return e.pos > this.pos ? e : this
        }
        min(e) {
            return e.pos < this.pos ? e : this
        }
        toString() {
            let e = ``;
            for (let t = 1; t <= this.depth; t++) e += (e ? `/` : ``) + this.node(t).type.name + `_` + this.index(t - 1);
            return e + `:` + this.parentOffset
        }
        static resolve(t, n) {
            if (!(n >= 0 && n <= t.content.size)) throw RangeError(`Position ` + n + ` out of range`);
            let r = [],
                i = 0,
                a = n;
            for (let e = t;;) {
                let {
                    index: t,
                    offset: n
                } = e.content.findIndex(a), o = a - n;
                if (r.push(e, t, i + n), !o || (e = e.child(t), e.isText)) break;
                a = o - 1, i += n + 1
            }
            return new e(n, r, a)
        }
        static resolveCached(t, n) {
            let r = de.get(t);
            if (r)
                for (let e = 0; e < r.elts.length; e++) {
                    let t = r.elts[e];
                    if (t.pos == n) return t
                } else de.set(t, r = new le);
            let i = r.elts[r.i] = e.resolve(t, n);
            return r.i = (r.i + 1) % ue, i
        }
    },
    le = class {
        constructor() {
            this.elts = [], this.i = 0
        }
    },
    ue = 12,
    de = new WeakMap,
    fe = class {
        constructor(e, t, n) {
            this.$from = e, this.$to = t, this.depth = n
        }
        get start() {
            return this.$from.before(this.depth + 1)
        }
        get end() {
            return this.$to.after(this.depth + 1)
        }
        get parent() {
            return this.$from.node(this.depth)
        }
        get startIndex() {
            return this.$from.index(this.depth)
        }
        get endIndex() {
            return this.$to.indexAfter(this.depth)
        }
    },
    pe = Object.create(null),
    me = class e {
        constructor(e, t, n, r = f.none) {
            this.type = e, this.attrs = t, this.marks = r, this.content = n || c.empty
        }
        get children() {
            return this.content.content
        }
        get nodeSize() {
            return this.isLeaf ? 1 : 2 + this.content.size
        }
        get childCount() {
            return this.content.childCount
        }
        child(e) {
            return this.content.child(e)
        }
        maybeChild(e) {
            return this.content.maybeChild(e)
        }
        forEach(e) {
            this.content.forEach(e)
        }
        nodesBetween(e, t, n, r = 0) {
            this.content.nodesBetween(e, t, n, r, this)
        }
        descendants(e) {
            this.nodesBetween(0, this.content.size, e)
        }
        get textContent() {
            return this.isLeaf && this.type.spec.leafText ? this.type.spec.leafText(this) : this.textBetween(0, this.content.size, ``)
        }
        textBetween(e, t, n, r) {
            return this.content.textBetween(e, t, n, r)
        }
        get firstChild() {
            return this.content.firstChild
        }
        get lastChild() {
            return this.content.lastChild
        }
        eq(e) {
            return this == e || this.sameMarkup(e) && this.content.eq(e.content)
        }
        sameMarkup(e) {
            return this.hasMarkup(e.type, e.attrs, e.marks)
        }
        hasMarkup(e, t, n) {
            return this.type == e && d(this.attrs, t || e.defaultAttrs || pe) && f.sameSet(this.marks, n || f.none)
        }
        copy(t = null) {
            return t == this.content ? this : new e(this.type, this.attrs, t, this.marks)
        }
        mark(t) {
            return t == this.marks ? this : new e(this.type, this.attrs, this.content, t)
        }
        cut(e, t = this.content.size) {
            return e == 0 && t == this.content.size ? this : this.copy(this.content.cut(e, t))
        }
        slice(e, t = this.content.size, n = !1) {
            if (e == t) return m.empty;
            let r = this.resolve(e),
                i = this.resolve(t),
                a = n ? 0 : r.sharedDepth(t),
                o = r.start(a);
            return new m(r.node(a).content.cut(r.pos - o, i.pos - o), r.depth - a, i.depth - a)
        }
        replace(e, t, n) {
            return ee(this.resolve(e), this.resolve(t), n)
        }
        nodeAt(e) {
            for (let t = this;;) {
                let {
                    index: n,
                    offset: r
                } = t.content.findIndex(e);
                if (t = t.maybeChild(n), !t) return null;
                if (r == e || t.isText) return t;
                e -= r + 1
            }
        }
        childAfter(e) {
            let {
                index: t,
                offset: n
            } = this.content.findIndex(e);
            return {
                node: this.content.maybeChild(t),
                index: t,
                offset: n
            }
        }
        childBefore(e) {
            if (e == 0) return {
                node: null,
                index: 0,
                offset: 0
            };
            let {
                index: t,
                offset: n
            } = this.content.findIndex(e);
            if (n < e) return {
                node: this.content.child(t),
                index: t,
                offset: n
            };
            let r = this.content.child(t - 1);
            return {
                node: r,
                index: t - 1,
                offset: n - r.nodeSize
            }
        }
        resolve(e) {
            return ce.resolveCached(this, e)
        }
        resolveNoCache(e) {
            return ce.resolve(this, e)
        }
        rangeHasMark(e, t, n) {
            let r = !1;
            return t > e && this.nodesBetween(e, t, e => (n.isInSet(e.marks) && (r = !0), !r)), r
        }
        get isBlock() {
            return this.type.isBlock
        }
        get isTextblock() {
            return this.type.isTextblock
        }
        get inlineContent() {
            return this.type.inlineContent
        }
        get isInline() {
            return this.type.isInline
        }
        get isText() {
            return this.type.isText
        }
        get isLeaf() {
            return this.type.isLeaf
        }
        get isAtom() {
            return this.type.isAtom
        }
        toString() {
            if (this.type.spec.toDebugString) return this.type.spec.toDebugString(this);
            let e = this.type.name;
            return this.content.size && (e += `(` + this.content.toStringInner() + `)`), ge(this.marks, e)
        }
        contentMatchAt(e) {
            let t = this.type.contentMatch.matchFragment(this.content, 0, e);
            if (!t) throw Error(`Called contentMatchAt on a node with invalid content`);
            return t
        }
        canReplace(e, t, n = c.empty, r = 0, i = n.childCount) {
            let a = this.contentMatchAt(e).matchFragment(n, r, i),
                o = a && a.matchFragment(this.content, t);
            if (!o || !o.validEnd) return !1;
            for (let e = r; e < i; e++)
                if (!this.type.allowsMarks(n.child(e).marks)) return !1;
            return !0
        }
        canReplaceWith(e, t, n, r) {
            if (r && !this.type.allowsMarks(r)) return !1;
            let i = this.contentMatchAt(e).matchType(n),
                a = i && i.matchFragment(this.content, t);
            return a ? a.validEnd : !1
        }
        canAppend(e) {
            return e.content.size ? this.canReplace(this.childCount, this.childCount, e.content) : this.type.compatibleContent(e.type)
        }
        check() {
            this.type.checkContent(this.content), this.type.checkAttrs(this.attrs);
            let e = f.none;
            for (let t = 0; t < this.marks.length; t++) {
                let n = this.marks[t];
                n.type.checkAttrs(n.attrs), e = n.addToSet(e)
            }
            if (!f.sameSet(e, this.marks)) throw RangeError(`Invalid collection of marks for node ${this.type.name}: ${this.marks.map(e=>e.type.name)}`);
            this.content.forEach(e => e.check())
        }
        toJSON() {
            let e = {
                type: this.type.name
            };
            for (let t in this.attrs) {
                e.attrs = this.attrs;
                break
            }
            return this.content.size && (e.content = this.content.toJSON()), this.marks.length && (e.marks = this.marks.map(e => e.toJSON())), e
        }
        static fromJSON(e, t) {
            if (!t) throw RangeError(`Invalid input for Node.fromJSON`);
            let n;
            if (t.marks) {
                if (!Array.isArray(t.marks)) throw RangeError(`Invalid mark data for Node.fromJSON`);
                n = t.marks.map(e.markFromJSON)
            }
            if (t.type == `text`) {
                if (typeof t.text != `string`) throw RangeError(`Invalid text node in JSON`);
                return e.text(t.text, n)
            }
            let r = c.fromJSON(e, t.content),
                i = e.nodeType(t.type).create(t.attrs, r, n);
            return i.type.checkAttrs(i.attrs), i
        }
    };
me.prototype.text = void 0;
var he = class e extends me {
    constructor(e, t, n, r) {
        if (super(e, t, null, r), !n) throw RangeError(`Empty text nodes are not allowed`);
        this.text = n
    }
    toString() {
        return this.type.spec.toDebugString ? this.type.spec.toDebugString(this) : ge(this.marks, JSON.stringify(this.text))
    }
    get textContent() {
        return this.text
    }
    textBetween(e, t) {
        return this.text.slice(e, t)
    }
    get nodeSize() {
        return this.text.length
    }
    mark(t) {
        return t == this.marks ? this : new e(this.type, this.attrs, this.text, t)
    }
    withText(t) {
        return t == this.text ? this : new e(this.type, this.attrs, t, this.marks)
    }
    cut(e = 0, t = this.text.length) {
        return e == 0 && t == this.text.length ? this : this.withText(this.text.slice(e, t))
    }
    eq(e) {
        return this.sameMarkup(e) && this.text == e.text
    }
    toJSON() {
        let e = super.toJSON();
        return e.text = this.text, e
    }
};

function ge(e, t) {
    for (let n = e.length - 1; n >= 0; n--) t = e[n].type.name + `(` + t + `)`;
    return t
}
var _e = class e {
    constructor(e) {
        this.validEnd = e, this.next = [], this.wrapCache = []
    }
    static parse(t, n) {
        let r = new ve(t, n);
        if (r.next == null) return e.empty;
        let i = ye(r);
        r.next && r.err(`Unexpected trailing text`);
        let a = ke(Ee(i));
        return Ae(a, r), a
    }
    matchType(e) {
        for (let t = 0; t < this.next.length; t++)
            if (this.next[t].type == e) return this.next[t].next;
        return null
    }
    matchFragment(e, t = 0, n = e.childCount) {
        let r = this;
        for (let i = t; r && i < n; i++) r = r.matchType(e.child(i).type);
        return r
    }
    get inlineContent() {
        return this.next.length != 0 && this.next[0].type.isInline
    }
    get defaultType() {
        for (let e = 0; e < this.next.length; e++) {
            let {
                type: t
            } = this.next[e];
            if (!(t.isText || t.hasRequiredAttrs())) return t
        }
        return null
    }
    compatible(e) {
        for (let t = 0; t < this.next.length; t++)
            for (let n = 0; n < e.next.length; n++)
                if (this.next[t].type == e.next[n].type) return !0;
        return !1
    }
    fillBefore(e, t = !1, n = 0) {
        let r = [this];

        function i(a, o) {
            let s = a.matchFragment(e, n);
            if (s && (!t || s.validEnd)) return c.from(o.map(e => e.createAndFill()));
            for (let e = 0; e < a.next.length; e++) {
                let {
                    type: t,
                    next: n
                } = a.next[e];
                if (!(t.isText || t.hasRequiredAttrs()) && r.indexOf(n) == -1) {
                    r.push(n);
                    let e = i(n, o.concat(t));
                    if (e) return e
                }
            }
            return null
        }
        return i(this, [])
    }
    findWrapping(e) {
        for (let t = 0; t < this.wrapCache.length; t += 2)
            if (this.wrapCache[t] == e) return this.wrapCache[t + 1];
        let t = this.computeWrapping(e);
        return this.wrapCache.push(e, t), t
    }
    computeWrapping(e) {
        let t = Object.create(null),
            n = [{
                match: this,
                type: null,
                via: null
            }];
        for (; n.length;) {
            let r = n.shift(),
                i = r.match;
            if (i.matchType(e)) {
                let e = [];
                for (let t = r; t.type; t = t.via) e.push(t.type);
                return e.reverse()
            }
            for (let e = 0; e < i.next.length; e++) {
                let {
                    type: a,
                    next: o
                } = i.next[e];
                !a.isLeaf && !a.hasRequiredAttrs() && !(a.name in t) && (!r.type || o.validEnd) && (n.push({
                    match: a.contentMatch,
                    type: a,
                    via: r
                }), t[a.name] = !0)
            }
        }
        return null
    }
    get edgeCount() {
        return this.next.length
    }
    edge(e) {
        if (e >= this.next.length) throw RangeError(`There's no ${e}th edge in this content match`);
        return this.next[e]
    }
    toString() {
        let e = [];

        function t(n) {
            e.push(n);
            for (let r = 0; r < n.next.length; r++) e.indexOf(n.next[r].next) == -1 && t(n.next[r].next)
        }
        return t(this), e.map((t, n) => {
            let r = n + (t.validEnd ? `*` : ` `) + ` `;
            for (let n = 0; n < t.next.length; n++) r += (n ? `, ` : ``) + t.next[n].type.name + `->` + e.indexOf(t.next[n].next);
            return r
        }).join(`
`)
    }
};
_e.empty = new _e(!0);
var ve = class {
    constructor(e, t) {
        this.string = e, this.nodeTypes = t, this.inline = null, this.pos = 0, this.tokens = e.split(/\s*(?=\b|\W|$)/), this.tokens[this.tokens.length - 1] == `` && this.tokens.pop(), this.tokens[0] == `` && this.tokens.shift()
    }
    get next() {
        return this.tokens[this.pos]
    }
    eat(e) {
        return this.next == e && (this.pos++ || !0)
    }
    err(e) {
        throw SyntaxError(e + ` (in content expression '` + this.string + `')`)
    }
};

function ye(e) {
    let t = [];
    do t.push(be(e)); while (e.eat(`|`));
    return t.length == 1 ? t[0] : {
        type: `choice`,
        exprs: t
    }
}

function be(e) {
    let t = [];
    do t.push(xe(e)); while (e.next && e.next != `)` && e.next != `|`);
    return t.length == 1 ? t[0] : {
        type: `seq`,
        exprs: t
    }
}

function xe(e) {
    let t = Te(e);
    for (;;)
        if (e.eat(`+`)) t = {
            type: `plus`,
            expr: t
        };
        else if (e.eat(`*`)) t = {
        type: `star`,
        expr: t
    };
    else if (e.eat(`?`)) t = {
        type: `opt`,
        expr: t
    };
    else if (e.eat(`{`)) t = Ce(e, t);
    else break;
    return t
}

function Se(e) {
    /\D/.test(e.next) && e.err(`Expected number, got '` + e.next + `'`);
    let t = Number(e.next);
    return e.pos++, t
}

function Ce(e, t) {
    let n = Se(e),
        r = n;
    return e.eat(`,`) && (r = e.next == `}` ? -1 : Se(e)), e.eat(`}`) || e.err(`Unclosed braced range`), {
        type: `range`,
        min: n,
        max: r,
        expr: t
    }
}

function we(e, t) {
    let n = e.nodeTypes,
        r = n[t];
    if (r) return [r];
    let i = [];
    for (let e in n) {
        let r = n[e];
        r.isInGroup(t) && i.push(r)
    }
    return i.length == 0 && e.err(`No node type or group '` + t + `' found`), i
}

function Te(e) {
    if (e.eat(`(`)) {
        let t = ye(e);
        return e.eat(`)`) || e.err(`Missing closing paren`), t
    } else if (/\W/.test(e.next)) e.err(`Unexpected token '` + e.next + `'`);
    else {
        let t = we(e, e.next).map(t => (e.inline == null ? e.inline = t.isInline : e.inline != t.isInline && e.err(`Mixing inline and block content`), {
            type: `name`,
            value: t
        }));
        return e.pos++, t.length == 1 ? t[0] : {
            type: `choice`,
            exprs: t
        }
    }
}

function Ee(e) {
    let t = [
        []
    ];
    return i(a(e, 0), n()), t;

    function n() {
        return t.push([]) - 1
    }

    function r(e, n, r) {
        let i = {
            term: r,
            to: n
        };
        return t[e].push(i), i
    }

    function i(e, t) {
        e.forEach(e => e.to = t)
    }

    function a(e, t) {
        if (e.type == `choice`) return e.exprs.reduce((e, n) => e.concat(a(n, t)), []);
        if (e.type == `seq`)
            for (let r = 0;; r++) {
                let o = a(e.exprs[r], t);
                if (r == e.exprs.length - 1) return o;
                i(o, t = n())
            } else if (e.type == `star`) {
                let o = n();
                return r(t, o), i(a(e.expr, o), o), [r(o)]
            } else if (e.type == `plus`) {
            let o = n();
            return i(a(e.expr, t), o), i(a(e.expr, o), o), [r(o)]
        } else if (e.type == `opt`) return [r(t)].concat(a(e.expr, t));
        else if (e.type == `range`) {
            let o = t;
            for (let t = 0; t < e.min; t++) {
                let t = n();
                i(a(e.expr, o), t), o = t
            }
            if (e.max == -1) i(a(e.expr, o), o);
            else
                for (let t = e.min; t < e.max; t++) {
                    let t = n();
                    r(o, t), i(a(e.expr, o), t), o = t
                }
            return [r(o)]
        } else if (e.type == `name`) return [r(t, void 0, e.value)];
        else throw Error(`Unknown expr type`)
    }
}

function De(e, t) {
    return t - e
}

function Oe(e, t) {
    let n = [];
    return r(t), n.sort(De);

    function r(t) {
        let i = e[t];
        if (i.length == 1 && !i[0].term) return r(i[0].to);
        n.push(t);
        for (let e = 0; e < i.length; e++) {
            let {
                term: t,
                to: a
            } = i[e];
            !t && n.indexOf(a) == -1 && r(a)
        }
    }
}

function ke(e) {
    let t = Object.create(null);
    return n(Oe(e, 0));

    function n(r) {
        let i = [];
        r.forEach(t => {
            e[t].forEach(({
                term: t,
                to: n
            }) => {
                if (!t) return;
                let r;
                for (let e = 0; e < i.length; e++) i[e][0] == t && (r = i[e][1]);
                Oe(e, n).forEach(e => {
                    r || i.push([t, r = []]), r.indexOf(e) == -1 && r.push(e)
                })
            })
        });
        let a = t[r.join(`,`)] = new _e(r.indexOf(e.length - 1) > -1);
        for (let e = 0; e < i.length; e++) {
            let r = i[e][1].sort(De);
            a.next.push({
                type: i[e][0],
                next: t[r.join(`,`)] || n(r)
            })
        }
        return a
    }
}

function Ae(e, t) {
    for (let n = 0, r = [e]; n < r.length; n++) {
        let e = r[n],
            i = !e.validEnd,
            a = [];
        for (let t = 0; t < e.next.length; t++) {
            let {
                type: n,
                next: o
            } = e.next[t];
            a.push(n.name), i && !(n.isText || n.hasRequiredAttrs()) && (i = !1), r.indexOf(o) == -1 && r.push(o)
        }
        i && t.err(`Only non-generatable nodes (` + a.join(`, `) + `) in a required position (see https://prosemirror.net/docs/guide/#generatable)`)
    }
}

function je(e) {
    let t = Object.create(null);
    for (let n in e) {
        let r = e[n];
        if (!r.hasDefault) return null;
        t[n] = r.default
    }
    return t
}

function Me(e, t) {
    let n = Object.create(null);
    for (let r in e) {
        let i = t && t[r];
        if (i === void 0) {
            let t = e[r];
            if (t.hasDefault) i = t.default;
            else throw RangeError(`No value supplied for attribute ` + r)
        }
        n[r] = i
    }
    return n
}

function Ne(e, t, n, r) {
    for (let i in t)
        if (!(i in e)) throw RangeError(`Unsupported attribute ${i} for ${n} of type ${r}`);
    for (let n in e) e[n].validate && e[n].validate(t[n])
}

function Pe(e, t) {
    let n = Object.create(null);
    if (t)
        for (let r in t) n[r] = new Le(e, r, t[r]);
    return n
}
var Fe = class e {
    constructor(e, t, n) {
        this.name = e, this.schema = t, this.spec = n, this.markSet = null, this.groups = n.group ? n.group.split(` `) : [], this.attrs = Pe(e, n.attrs), this.defaultAttrs = je(this.attrs), this.contentMatch = null, this.inlineContent = null, this.isBlock = !(n.inline || e == `text`), this.isText = e == `text`
    }
    get isInline() {
        return !this.isBlock
    }
    get isTextblock() {
        return this.isBlock && this.inlineContent
    }
    get isLeaf() {
        return this.contentMatch == _e.empty
    }
    get isAtom() {
        return this.isLeaf || !!this.spec.atom
    }
    isInGroup(e) {
        return this.groups.indexOf(e) > -1
    }
    get whitespace() {
        return this.spec.whitespace || (this.spec.code ? `pre` : `normal`)
    }
    hasRequiredAttrs() {
        for (let e in this.attrs)
            if (this.attrs[e].isRequired) return !0;
        return !1
    }
    compatibleContent(e) {
        return this == e || this.contentMatch.compatible(e.contentMatch)
    }
    computeAttrs(e) {
        return !e && this.defaultAttrs ? this.defaultAttrs : Me(this.attrs, e)
    }
    create(e = null, t, n) {
        if (this.isText) throw Error(`NodeType.create can't construct text nodes`);
        return new me(this, this.computeAttrs(e), c.from(t), f.setFrom(n))
    }
    createChecked(e = null, t, n) {
        return t = c.from(t), this.checkContent(t), new me(this, this.computeAttrs(e), t, f.setFrom(n))
    }
    createAndFill(e = null, t, n) {
        if (e = this.computeAttrs(e), t = c.from(t), t.size) {
            let e = this.contentMatch.fillBefore(t);
            if (!e) return null;
            t = e.append(t)
        }
        let r = this.contentMatch.matchFragment(t),
            i = r && r.fillBefore(c.empty, !0);
        return i ? new me(this, e, t.append(i), f.setFrom(n)) : null
    }
    validContent(e) {
        let t = this.contentMatch.matchFragment(e);
        if (!t || !t.validEnd) return !1;
        for (let t = 0; t < e.childCount; t++)
            if (!this.allowsMarks(e.child(t).marks)) return !1;
        return !0
    }
    checkContent(e) {
        if (!this.validContent(e)) throw RangeError(`Invalid content for node ${this.name}: ${e.toString().slice(0,50)}`)
    }
    checkAttrs(e) {
        Ne(this.attrs, e, `node`, this.name)
    }
    allowsMarkType(e) {
        return this.markSet == null || this.markSet.indexOf(e) > -1
    }
    allowsMarks(e) {
        if (this.markSet == null) return !0;
        for (let t = 0; t < e.length; t++)
            if (!this.allowsMarkType(e[t].type)) return !1;
        return !0
    }
    allowedMarks(e) {
        if (this.markSet == null) return e;
        let t;
        for (let n = 0; n < e.length; n++) this.allowsMarkType(e[n].type) ? t && t.push(e[n]) : t ||= e.slice(0, n);
        return t ? t.length ? t : f.none : e
    }
    static compile(t, n) {
        let r = Object.create(null);
        t.forEach((t, i) => r[t] = new e(t, n, i));
        let i = n.spec.topNode || `doc`;
        if (!r[i]) throw RangeError(`Schema is missing its top node type ('` + i + `')`);
        if (!r.text) throw RangeError(`Every schema needs a 'text' type`);
        for (let e in r.text.attrs) throw RangeError(`The text node type should not have attributes`);
        return r
    }
};

function Ie(e, t, n) {
    let r = n.split(`|`);
    return n => {
        let i = n === null ? `null` : typeof n;
        if (r.indexOf(i) < 0) throw RangeError(`Expected value of type ${r} for attribute ${t} on type ${e}, got ${i}`)
    }
}
var Le = class {
        constructor(e, t, n) {
            this.hasDefault = Object.prototype.hasOwnProperty.call(n, `default`), this.default = n.default, this.validate = typeof n.validate == `string` ? Ie(e, t, n.validate) : n.validate
        }
        get isRequired() {
            return !this.hasDefault
        }
    },
    Re = class e {
        constructor(e, t, n, r) {
            this.name = e, this.rank = t, this.schema = n, this.spec = r, this.attrs = Pe(e, r.attrs), this.excluded = null;
            let i = je(this.attrs);
            this.instance = i ? new f(this, i) : null
        }
        create(e = null) {
            return !e && this.instance ? this.instance : new f(this, Me(this.attrs, e))
        }
        static compile(t, n) {
            let r = Object.create(null),
                i = 0;
            return t.forEach((t, a) => r[t] = new e(t, i++, n, a)), r
        }
        removeFromSet(e) {
            for (var t = 0; t < e.length; t++) e[t].type == this && (e = e.slice(0, t).concat(e.slice(t + 1)), t--);
            return e
        }
        isInSet(e) {
            for (let t = 0; t < e.length; t++)
                if (e[t].type == this) return e[t]
        }
        checkAttrs(e) {
            Ne(this.attrs, e, `mark`, this.name)
        }
        excludes(e) {
            return this.excluded.indexOf(e) > -1
        }
    },
    ze = class {
        constructor(e) {
            this.linebreakReplacement = null, this.cached = Object.create(null);
            let t = this.spec = {};
            for (let n in e) t[n] = e[n];
            t.nodes = r.from(e.nodes), t.marks = r.from(e.marks || {}), this.nodes = Fe.compile(this.spec.nodes, this), this.marks = Re.compile(this.spec.marks, this);
            let n = Object.create(null);
            for (let e in this.nodes) {
                if (e in this.marks) throw RangeError(e + ` can not be both a node and a mark`);
                let t = this.nodes[e],
                    r = t.spec.content || ``,
                    i = t.spec.marks;
                if (t.contentMatch = n[r] || (n[r] = _e.parse(r, this.nodes)), t.inlineContent = t.contentMatch.inlineContent, t.spec.linebreakReplacement) {
                    if (this.linebreakReplacement) throw RangeError(`Multiple linebreak nodes defined`);
                    if (!t.isInline || !t.isLeaf) throw RangeError(`Linebreak replacement nodes must be inline leaf nodes`);
                    this.linebreakReplacement = t
                }
                t.markSet = i == `_` ? null : i ? Be(this, i.split(` `)) : i == `` || !t.inlineContent ? [] : null
            }
            for (let e in this.marks) {
                let t = this.marks[e],
                    n = t.spec.excludes;
                t.excluded = n == null ? [t] : n == `` ? [] : Be(this, n.split(` `))
            }
            this.nodeFromJSON = e => me.fromJSON(this, e), this.markFromJSON = e => f.fromJSON(this, e), this.topNodeType = this.nodes[this.spec.topNode || `doc`], this.cached.wrappings = Object.create(null)
        }
        node(e, t = null, n, r) {
            if (typeof e == `string`) e = this.nodeType(e);
            else if (e instanceof Fe) {
                if (e.schema != this) throw RangeError(`Node type from different schema used (` + e.name + `)`)
            } else throw RangeError(`Invalid node type: ` + e);
            return e.createChecked(t, n, r)
        }
        text(e, t) {
            let n = this.nodes.text;
            return new he(n, n.defaultAttrs, e, f.setFrom(t))
        }
        mark(e, t) {
            return typeof e == `string` && (e = this.marks[e]), e.create(t)
        }
        nodeType(e) {
            let t = this.nodes[e];
            if (!t) throw RangeError(`Unknown node type: ` + e);
            return t
        }
    };

function Be(e, t) {
    let n = [];
    for (let r = 0; r < t.length; r++) {
        let i = t[r],
            a = e.marks[i],
            o = a;
        if (a) n.push(a);
        else
            for (let t in e.marks) {
                let r = e.marks[t];
                (i == `_` || r.spec.group && r.spec.group.split(` `).indexOf(i) > -1) && n.push(o = r)
            }
        if (!o) throw SyntaxError(`Unknown mark type: '` + t[r] + `'`)
    }
    return n
}

function Ve(e) {
    return e.tag != null
}

function He(e) {
    return e.style != null
}
var Ue = class e {
        constructor(e, t) {
            this.schema = e, this.rules = t, this.tags = [], this.styles = [];
            let n = this.matchedStyles = [];
            t.forEach(e => {
                if (Ve(e)) this.tags.push(e);
                else if (He(e)) {
                    let t = /[^=]*/.exec(e.style)[0];
                    n.indexOf(t) < 0 && n.push(t), this.styles.push(e)
                }
            }), this.normalizeLists = !this.tags.some(t => {
                if (!/^(ul|ol)\b/.test(t.tag) || !t.node) return !1;
                let n = e.nodes[t.node];
                return n.contentMatch.matchType(n)
            })
        }
        parse(e, t = {}) {
            let n = new Qe(this, t, !1);
            return n.addAll(e, f.none, t.from, t.to), n.finish()
        }
        parseSlice(e, t = {}) {
            let n = new Qe(this, t, !0);
            return n.addAll(e, f.none, t.from, t.to), m.maxOpen(n.finish())
        }
        matchTag(e, t, n) {
            for (let r = n ? this.tags.indexOf(n) + 1 : 0; r < this.tags.length; r++) {
                let n = this.tags[r];
                if (et(e, n.tag) && (n.namespace === void 0 || e.namespaceURI == n.namespace) && (!n.context || t.matchesContext(n.context))) {
                    if (n.getAttrs) {
                        let t = n.getAttrs(e);
                        if (t === !1) continue;
                        n.attrs = t || void 0
                    }
                    return n
                }
            }
        }
        matchStyle(e, t, n, r) {
            for (let i = r ? this.styles.indexOf(r) + 1 : 0; i < this.styles.length; i++) {
                let r = this.styles[i],
                    a = r.style;
                if (!(a.indexOf(e) != 0 || r.context && !n.matchesContext(r.context) || a.length > e.length && (a.charCodeAt(e.length) != 61 || a.slice(e.length + 1) != t))) {
                    if (r.getAttrs) {
                        let e = r.getAttrs(t);
                        if (e === !1) continue;
                        r.attrs = e || void 0
                    }
                    return r
                }
            }
        }
        static schemaRules(e) {
            let t = [];

            function n(e) {
                let n = e.priority == null ? 50 : e.priority,
                    r = 0;
                for (; r < t.length; r++) {
                    let e = t[r];
                    if ((e.priority == null ? 50 : e.priority) < n) break
                }
                t.splice(r, 0, e)
            }
            for (let t in e.marks) {
                let r = e.marks[t].spec.parseDOM;
                r && r.forEach(e => {
                    n(e = tt(e)), e.mark || e.ignore || e.clearMark || (e.mark = t)
                })
            }
            for (let t in e.nodes) {
                let r = e.nodes[t].spec.parseDOM;
                r && r.forEach(e => {
                    n(e = tt(e)), e.node || e.ignore || e.mark || (e.node = t)
                })
            }
            return t
        }
        static fromSchema(t) {
            return t.cached.domParser || (t.cached.domParser = new e(t, e.schemaRules(t)))
        }
    },
    We = {
        address: !0,
        article: !0,
        aside: !0,
        blockquote: !0,
        body: !0,
        canvas: !0,
        dd: !0,
        div: !0,
        dl: !0,
        fieldset: !0,
        figcaption: !0,
        figure: !0,
        footer: !0,
        form: !0,
        h1: !0,
        h2: !0,
        h3: !0,
        h4: !0,
        h5: !0,
        h6: !0,
        header: !0,
        hgroup: !0,
        hr: !0,
        li: !0,
        noscript: !0,
        ol: !0,
        output: !0,
        p: !0,
        pre: !0,
        section: !0,
        table: !0,
        tfoot: !0,
        ul: !0
    },
    Ge = {
        head: !0,
        noscript: !0,
        object: !0,
        script: !0,
        style: !0,
        title: !0
    },
    Ke = {
        ol: !0,
        ul: !0
    },
    qe = 1,
    Je = 2,
    Ye = 4;

function Xe(e, t, n) {
    return t == null ? e && e.whitespace == `pre` ? qe | Je : n & ~Ye : (t ? qe : 0) | (t === `full` ? Je : 0)
}
var Ze = class {
        constructor(e, t, n, r, i, a) {
            this.type = e, this.attrs = t, this.marks = n, this.solid = r, this.options = a, this.content = [], this.activeMarks = f.none, this.match = i || (a & Ye ? null : e.contentMatch)
        }
        findWrapping(e) {
            if (!this.match) {
                if (!this.type) return [];
                let t = this.type.contentMatch.fillBefore(c.from(e));
                if (t) this.match = this.type.contentMatch.matchFragment(t);
                else {
                    let t = this.type.contentMatch,
                        n;
                    return (n = t.findWrapping(e.type)) ? (this.match = t, n) : null
                }
            }
            return this.match.findWrapping(e.type)
        }
        finish(e) {
            if (!(this.options & qe)) {
                let e = this.content[this.content.length - 1],
                    t;
                if (e && e.isText && (t = /[ \t\r\n\u000c]+$/.exec(e.text))) {
                    let n = e;
                    e.text.length == t[0].length ? this.content.pop() : this.content[this.content.length - 1] = n.withText(n.text.slice(0, n.text.length - t[0].length))
                }
            }
            let t = c.from(this.content);
            return !e && this.match && (t = t.append(this.match.fillBefore(c.empty, !0))), this.type ? this.type.create(this.attrs, t, this.marks) : t
        }
        inlineContext(e) {
            return this.type ? this.type.inlineContent : this.content.length ? this.content[0].isInline : e.parentNode && !We.hasOwnProperty(e.parentNode.nodeName.toLowerCase())
        }
    },
    Qe = class {
        constructor(e, t, n) {
            this.parser = e, this.options = t, this.isOpen = n, this.open = 0, this.localPreserveWS = !1;
            let r = t.topNode,
                i, a = Xe(null, t.preserveWhitespace, 0) | (n ? Ye : 0);
            i = r ? new Ze(r.type, r.attrs, f.none, !0, t.topMatch || r.type.contentMatch, a) : n ? new Ze(null, null, f.none, !0, null, a) : new Ze(e.schema.topNodeType, null, f.none, !0, null, a), this.nodes = [i], this.find = t.findPositions, this.needsBlock = !1
        }
        get top() {
            return this.nodes[this.open]
        }
        addDOM(e, t) {
            e.nodeType == 3 ? this.addTextNode(e, t) : e.nodeType == 1 && this.addElement(e, t)
        }
        addTextNode(e, t) {
            let n = e.nodeValue,
                r = this.top,
                i = r.options & Je ? `full` : this.localPreserveWS || (r.options & qe) > 0,
                {
                    schema: a
                } = this.parser;
            if (i === `full` || r.inlineContext(e) || /[^ \t\r\n\u000c]/.test(n)) {
                if (i)
                    if (i === `full`) n = n.replace(/\r\n?/g, `
`);
                    else if (a.linebreakReplacement && /[\r\n]/.test(n) && this.top.findWrapping(a.linebreakReplacement.create())) {
                    let e = n.split(/\r?\n|\r/);
                    for (let n = 0; n < e.length; n++) n && this.insertNode(a.linebreakReplacement.create(), t, !0), e[n] && this.insertNode(a.text(e[n]), t, !/\S/.test(e[n]));
                    n = ``
                } else n = n.replace(/\r?\n|\r/g, ` `);
                else if (n = n.replace(/[ \t\r\n\u000c]+/g, ` `), /^[ \t\r\n\u000c]/.test(n) && this.open == this.nodes.length - 1) {
                    let t = r.content[r.content.length - 1],
                        i = e.previousSibling;
                    (!t || i && i.nodeName == `BR` || t.isText && /[ \t\r\n\u000c]$/.test(t.text)) && (n = n.slice(1))
                }
                n && this.insertNode(a.text(n), t, !/\S/.test(n)), this.findInText(e)
            } else this.findInside(e)
        }
        addElement(e, t, n) {
            let r = this.localPreserveWS,
                i = this.top;
            (e.tagName == `PRE` || /pre/.test(e.style && e.style.whiteSpace)) && (this.localPreserveWS = !0);
            let a = e.nodeName.toLowerCase(),
                o;
            Ke.hasOwnProperty(a) && this.parser.normalizeLists && $e(e);
            let s = this.options.ruleFromNode && this.options.ruleFromNode(e) || (o = this.parser.matchTag(e, this, n));
            out: if (s ? s.ignore : Ge.hasOwnProperty(a)) this.findInside(e), this.ignoreFallback(e, t);
                else
            if (!s || s.skip || s.closeParent) {
                s && s.closeParent ? this.open = Math.max(0, this.open - 1) : s && s.skip.nodeType && (e = s.skip);
                let n, r = this.needsBlock;
                if (We.hasOwnProperty(a)) i.content.length && i.content[0].isInline && this.open && (this.open--, i = this.top), n = !0, i.type || (this.needsBlock = !0);
                else if (!e.firstChild) {
                    this.leafFallback(e, t);
                    break out
                }
                let o = s && s.skip ? t : this.readStyles(e, t);
                o && this.addAll(e, o), n && this.sync(i), this.needsBlock = r
            } else {
                let n = this.readStyles(e, t);
                n && this.addElementByRule(e, s, n, s.consuming === !1 ? o : void 0)
            }
            this.localPreserveWS = r
        }
        leafFallback(e, t) {
            e.nodeName == `BR` && this.top.type && this.top.type.inlineContent && this.addTextNode(e.ownerDocument.createTextNode(`
`), t)
        }
        ignoreFallback(e, t) {
            e.nodeName == `BR` && (!this.top.type || !this.top.type.inlineContent) && this.findPlace(this.parser.schema.text(`-`), t, !0)
        }
        readStyles(e, t) {
            let n = e.style;
            if (n && n.length)
                for (let e = 0; e < this.parser.matchedStyles.length; e++) {
                    let r = this.parser.matchedStyles[e],
                        i = n.getPropertyValue(r);
                    if (i)
                        for (let e;;) {
                            let n = this.parser.matchStyle(r, i, this, e);
                            if (!n) break;
                            if (n.ignore) return null;
                            if (t = n.clearMark ? t.filter(e => !n.clearMark(e)) : t.concat(this.parser.schema.marks[n.mark].create(n.attrs)), n.consuming === !1) e = n;
                            else break
                        }
                }
            return t
        }
        addElementByRule(e, t, n, r) {
            let i, a;
            if (t.node)
                if (a = this.parser.schema.nodes[t.node], a.isLeaf) this.insertNode(a.create(t.attrs), n, e.nodeName == `BR`) || this.leafFallback(e, n);
                else {
                    let e = this.enter(a, t.attrs || null, n, t.preserveWhitespace);
                    e && (i = !0, n = e)
                }
            else {
                let e = this.parser.schema.marks[t.mark];
                n = n.concat(e.create(t.attrs))
            }
            let o = this.top;
            if (a && a.isLeaf) this.findInside(e);
            else if (r) this.addElement(e, n, r);
            else if (t.getContent) this.findInside(e), t.getContent(e, this.parser.schema).forEach(e => this.insertNode(e, n, !1));
            else {
                let r = e;
                typeof t.contentElement == `string` ? r = e.querySelector(t.contentElement) : typeof t.contentElement == `function` ? r = t.contentElement(e) : t.contentElement && (r = t.contentElement), this.findAround(e, r, !0), this.addAll(r, n), this.findAround(e, r, !1)
            }
            i && this.sync(o) && this.open--
        }
        addAll(e, t, n, r) {
            let i = n || 0;
            for (let a = n ? e.childNodes[n] : e.firstChild, o = r == null ? null : e.childNodes[r]; a != o; a = a.nextSibling, ++i) this.findAtPoint(e, i), this.addDOM(a, t);
            this.findAtPoint(e, i)
        }
        findPlace(e, t, n) {
            let r, i;
            for (let t = this.open, a = 0; t >= 0; t--) {
                let o = this.nodes[t],
                    s = o.findWrapping(e);
                if (s && (!r || r.length > s.length + a) && (r = s, i = o, !s.length)) break;
                if (o.solid) {
                    if (n) break;
                    a += 2
                }
            }
            if (!r) return null;
            this.sync(i);
            for (let e = 0; e < r.length; e++) t = this.enterInner(r[e], null, t, !1);
            return t
        }
        insertNode(e, t, n) {
            if (e.isInline && this.needsBlock && !this.top.type) {
                let e = this.textblockFromContext();
                e && (t = this.enterInner(e, null, t))
            }
            let r = this.findPlace(e, t, n);
            if (r) {
                this.closeExtra();
                let t = this.top;
                t.match &&= t.match.matchType(e.type);
                let n = f.none;
                for (let i of r.concat(e.marks))(t.type ? t.type.allowsMarkType(i.type) : nt(i.type, e.type)) && (n = i.addToSet(n));
                return t.content.push(e.mark(n)), !0
            }
            return !1
        }
        enter(e, t, n, r) {
            let i = this.findPlace(e.create(t), n, !1);
            return i &&= this.enterInner(e, t, n, !0, r), i
        }
        enterInner(e, t, n, r = !1, i) {
            this.closeExtra();
            let a = this.top;
            a.match = a.match && a.match.matchType(e);
            let o = Xe(e, i, a.options);
            a.options & Ye && a.content.length == 0 && (o |= Ye);
            let s = f.none;
            return n = n.filter(t => (a.type ? a.type.allowsMarkType(t.type) : nt(t.type, e)) ? (s = t.addToSet(s), !1) : !0), this.nodes.push(new Ze(e, t, s, r, null, o)), this.open++, n
        }
        closeExtra(e = !1) {
            let t = this.nodes.length - 1;
            if (t > this.open) {
                for (; t > this.open; t--) this.nodes[t - 1].content.push(this.nodes[t].finish(e));
                this.nodes.length = this.open + 1
            }
        }
        finish() {
            return this.open = 0, this.closeExtra(this.isOpen), this.nodes[0].finish(!!(this.isOpen || this.options.topOpen))
        }
        sync(e) {
            for (let t = this.open; t >= 0; t--)
                if (this.nodes[t] == e) return this.open = t, !0;
                else this.localPreserveWS && (this.nodes[t].options |= qe);
            return !1
        }
        get currentPos() {
            this.closeExtra();
            let e = 0;
            for (let t = this.open; t >= 0; t--) {
                let n = this.nodes[t].content;
                for (let t = n.length - 1; t >= 0; t--) e += n[t].nodeSize;
                t && e++
            }
            return e
        }
        findAtPoint(e, t) {
            if (this.find)
                for (let n = 0; n < this.find.length; n++) this.find[n].node == e && this.find[n].offset == t && (this.find[n].pos = this.currentPos)
        }
        findInside(e) {
            if (this.find)
                for (let t = 0; t < this.find.length; t++) this.find[t].pos == null && e.nodeType == 1 && e.contains(this.find[t].node) && (this.find[t].pos = this.currentPos)
        }
        findAround(e, t, n) {
            if (e != t && this.find)
                for (let r = 0; r < this.find.length; r++) this.find[r].pos == null && e.nodeType == 1 && e.contains(this.find[r].node) && t.compareDocumentPosition(this.find[r].node) & (n ? 2 : 4) && (this.find[r].pos = this.currentPos)
        }
        findInText(e) {
            if (this.find)
                for (let t = 0; t < this.find.length; t++) this.find[t].node == e && (this.find[t].pos = this.currentPos - (e.nodeValue.length - this.find[t].offset))
        }
        matchesContext(e) {
            if (e.indexOf(`|`) > -1) return e.split(/\s*\|\s*/).some(this.matchesContext, this);
            let t = e.split(`/`),
                n = this.options.context,
                r = !this.isOpen && (!n || n.parent.type == this.nodes[0].type),
                i = -(n ? n.depth + 1 : 0) + (r ? 0 : 1),
                a = (e, o) => {
                    for (; e >= 0; e--) {
                        let s = t[e];
                        if (s == ``) {
                            if (e == t.length - 1 || e == 0) continue;
                            for (; o >= i; o--)
                                if (a(e - 1, o)) return !0;
                            return !1
                        } else {
                            let e = o > 0 || o == 0 && r ? this.nodes[o].type : n && o >= i ? n.node(o - i).type : null;
                            if (!e || e.name != s && !e.isInGroup(s)) return !1;
                            o--
                        }
                    }
                    return !0
                };
            return a(t.length - 1, this.open)
        }
        textblockFromContext() {
            let e = this.options.context;
            if (e)
                for (let t = e.depth; t >= 0; t--) {
                    let n = e.node(t).contentMatchAt(e.indexAfter(t)).defaultType;
                    if (n && n.isTextblock && n.defaultAttrs) return n
                }
            for (let e in this.parser.schema.nodes) {
                let t = this.parser.schema.nodes[e];
                if (t.isTextblock && t.defaultAttrs) return t
            }
        }
    };

function $e(e) {
    for (let t = e.firstChild, n = null; t; t = t.nextSibling) {
        let e = t.nodeType == 1 ? t.nodeName.toLowerCase() : null;
        e && Ke.hasOwnProperty(e) && n ? (n.appendChild(t), t = n) : e == `li` ? n = t : e && (n = null)
    }
}

function et(e, t) {
    return (e.matches || e.msMatchesSelector || e.webkitMatchesSelector || e.mozMatchesSelector).call(e, t)
}

function tt(e) {
    let t = {};
    for (let n in e) t[n] = e[n];
    return t
}

function nt(e, t) {
    let n = t.schema.nodes;
    for (let r in n) {
        let i = n[r];
        if (!i.allowsMarkType(e)) continue;
        let a = [],
            o = e => {
                a.push(e);
                for (let n = 0; n < e.edgeCount; n++) {
                    let {
                        type: r,
                        next: i
                    } = e.edge(n);
                    if (r == t || a.indexOf(i) < 0 && o(i)) return !0
                }
            };
        if (o(i.contentMatch)) return !0
    }
}
var rt = class e {
    constructor(e, t) {
        this.nodes = e, this.marks = t
    }
    serializeFragment(e, t = {}, n) {
        n ||= at(t).createDocumentFragment();
        let r = n,
            i = [];
        return e.forEach(e => {
            if (i.length || e.marks.length) {
                let n = 0,
                    a = 0;
                for (; n < i.length && a < e.marks.length;) {
                    let t = e.marks[a];
                    if (!this.marks[t.type.name]) {
                        a++;
                        continue
                    }
                    if (!t.eq(i[n][0]) || t.type.spec.spanning === !1) break;
                    n++, a++
                }
                for (; n < i.length;) r = i.pop()[1];
                for (; a < e.marks.length;) {
                    let n = e.marks[a++],
                        o = this.serializeMark(n, e.isInline, t);
                    o && (i.push([n, r]), r.appendChild(o.dom), r = o.contentDOM || o.dom)
                }
            }
            r.appendChild(this.serializeNodeInner(e, t))
        }), n
    }
    serializeNodeInner(e, t) {
        if (e.isText) return at(t).createTextNode(e.text);
        let {
            dom: n,
            contentDOM: r
        } = lt(at(t), this.nodes[e.type.name](e), null, e.attrs);
        if (r) {
            if (e.isLeaf) throw RangeError(`Content hole not allowed in a leaf node spec`);
            this.serializeFragment(e.content, t, r)
        }
        return n
    }
    serializeNode(e, t = {}) {
        let n = this.serializeNodeInner(e, t);
        for (let r = e.marks.length - 1; r >= 0; r--) {
            let i = this.serializeMark(e.marks[r], e.isInline, t);
            i && ((i.contentDOM || i.dom).appendChild(n), n = i.dom)
        }
        return n
    }
    serializeMark(e, t, n = {}) {
        let r = this.marks[e.type.name];
        return r && lt(at(n), r(e, t), null, e.attrs)
    }
    static renderSpec(e, t, n = null, r) {
        return typeof t == `string` ? {
            dom: e.createTextNode(t)
        } : lt(e, t, n, r)
    }
    static fromSchema(t) {
        return t.cached.domSerializer || (t.cached.domSerializer = new e(this.nodesFromSchema(t), this.marksFromSchema(t)))
    }
    static nodesFromSchema(e) {
        let t = it(e.nodes);
        return t.text ||= e => e.text, t
    }
    static marksFromSchema(e) {
        return it(e.marks)
    }
};

function it(e) {
    let t = {};
    for (let n in e) {
        let r = e[n].spec.toDOM;
        r && (t[n] = r)
    }
    return t
}

function at(e) {
    return e.document || window.document
}
var ot = new WeakMap;

function st(e) {
    let t = ot.get(e);
    return t === void 0 && ot.set(e, t = ct(e)), t
}

function ct(e) {
    let t = null;

    function n(e) {
        if (e && typeof e == `object`)
            if (Array.isArray(e))
                if (typeof e[0] == `string`) t ||= [], t.push(e);
                else
                    for (let t = 0; t < e.length; t++) n(e[t]);
        else
            for (let t in e) n(e[t])
    }
    return n(e), t
}

function lt(e, t, n, r) {
    if (t.nodeType == 1) return {
        dom: t
    };
    if (t.dom && t.dom.nodeType == 1) return t;
    let i = t[0],
        a;
    if (typeof i != `string`) throw RangeError(`Invalid array passed to renderSpec`);
    if (r && (a = st(r)) && a.indexOf(t) > -1) throw RangeError(`Using an array from an attribute object as a DOM spec. This may be an attempted cross site scripting attack.`);
    let o = i.indexOf(` `);
    o > 0 && (n = i.slice(0, o), i = i.slice(o + 1));
    let s, c = n ? e.createElementNS(n, i) : e.createElement(i),
        l = t[1],
        u = 1;
    if (l && typeof l == `object` && l.nodeType == null && !Array.isArray(l)) {
        for (let e in u = 2, l)
            if (l[e] != null) {
                let t = e.indexOf(` `);
                t > 0 ? c.setAttributeNS(e.slice(0, t), e.slice(t + 1), l[e]) : e == `style` && c.style ? c.style.cssText = l[e] : c.setAttribute(e, l[e])
            }
    }
    for (let i = u; i < t.length; i++) {
        let a = t[i];
        if (a === 0) {
            if (i < t.length - 1 || i > u) throw RangeError(`Content hole must be the only child of its parent node`);
            return {
                dom: c,
                contentDOM: c
            }
        } else if (typeof a == `string`) c.appendChild(e.createTextNode(a));
        else {
            let {
                dom: t,
                contentDOM: i
            } = lt(e, a, n, r);
            if (c.appendChild(t), i) {
                if (s) throw RangeError(`Multiple content holes`);
                s = i
            }
        }
    }
    return {
        dom: c,
        contentDOM: s
    }
}
var ut = 65535,
    dt = 2 ** 16;

function ft(e, t) {
    return e + t * dt
}

function pt(e) {
    return e & ut
}

function mt(e) {
    return (e - (e & ut)) / dt
}
var ht = 1,
    gt = 2,
    _t = 4,
    vt = 8,
    yt = class {
        constructor(e, t, n) {
            this.pos = e, this.delInfo = t, this.recover = n
        }
        get deleted() {
            return (this.delInfo & vt) > 0
        }
        get deletedBefore() {
            return (this.delInfo & (ht | _t)) > 0
        }
        get deletedAfter() {
            return (this.delInfo & (gt | _t)) > 0
        }
        get deletedAcross() {
            return (this.delInfo & _t) > 0
        }
    },
    bt = class e {
        constructor(t, n = !1) {
            if (this.ranges = t, this.inverted = n, !t.length && e.empty) return e.empty
        }
        recover(e) {
            let t = 0,
                n = pt(e);
            if (!this.inverted)
                for (let e = 0; e < n; e++) t += this.ranges[e * 3 + 2] - this.ranges[e * 3 + 1];
            return this.ranges[n * 3] + t + mt(e)
        }
        mapResult(e, t = 1) {
            return this._map(e, t, !1)
        }
        map(e, t = 1) {
            return this._map(e, t, !0)
        }
        _map(e, t, n) {
            let r = 0,
                i = this.inverted ? 2 : 1,
                a = this.inverted ? 1 : 2;
            for (let o = 0; o < this.ranges.length; o += 3) {
                let s = this.ranges[o] - (this.inverted ? r : 0);
                if (s > e) break;
                let c = this.ranges[o + i],
                    l = this.ranges[o + a],
                    u = s + c;
                if (e <= u) {
                    let i = c ? e == s ? -1 : e == u ? 1 : t : t,
                        a = s + r + (i < 0 ? 0 : l);
                    if (n) return a;
                    let d = e == (t < 0 ? s : u) ? null : ft(o / 3, e - s),
                        f = e == s ? gt : e == u ? ht : _t;
                    return (t < 0 ? e != s : e != u) && (f |= vt), new yt(a, f, d)
                }
                r += l - c
            }
            return n ? e + r : new yt(e + r, 0, null)
        }
        touches(e, t) {
            let n = 0,
                r = pt(t),
                i = this.inverted ? 2 : 1,
                a = this.inverted ? 1 : 2;
            for (let t = 0; t < this.ranges.length; t += 3) {
                let o = this.ranges[t] - (this.inverted ? n : 0);
                if (o > e) break;
                let s = this.ranges[t + i];
                if (e <= o + s && t == r * 3) return !0;
                n += this.ranges[t + a] - s
            }
            return !1
        }
        forEach(e) {
            let t = this.inverted ? 2 : 1,
                n = this.inverted ? 1 : 2;
            for (let r = 0, i = 0; r < this.ranges.length; r += 3) {
                let a = this.ranges[r],
                    o = a - (this.inverted ? i : 0),
                    s = a + (this.inverted ? 0 : i),
                    c = this.ranges[r + t],
                    l = this.ranges[r + n];
                e(o, o + c, s, s + l), i += l - c
            }
        }
        invert() {
            return new e(this.ranges, !this.inverted)
        }
        toString() {
            return (this.inverted ? `-` : ``) + JSON.stringify(this.ranges)
        }
        static offset(t) {
            return t == 0 ? e.empty : new e(t < 0 ? [0, -t, 0] : [0, 0, t])
        }
    };
bt.empty = new bt([]);
var xt = class e {
        constructor(e, t, n = 0, r = e ? e.length : 0) {
            this.mirror = t, this.from = n, this.to = r, this._maps = e || [], this.ownData = !(e || t)
        }
        get maps() {
            return this._maps
        }
        slice(t = 0, n = this.maps.length) {
            return new e(this._maps, this.mirror, t, n)
        }
        appendMap(e, t) {
            this.ownData ||= (this._maps = this._maps.slice(), this.mirror = this.mirror && this.mirror.slice(), !0), this.to = this._maps.push(e), t != null && this.setMirror(this._maps.length - 1, t)
        }
        appendMapping(e) {
            for (let t = 0, n = this._maps.length; t < e._maps.length; t++) {
                let r = e.getMirror(t);
                this.appendMap(e._maps[t], r != null && r < t ? n + r : void 0)
            }
        }
        getMirror(e) {
            if (this.mirror) {
                for (let t = 0; t < this.mirror.length; t++)
                    if (this.mirror[t] == e) return this.mirror[t + (t % 2 ? -1 : 1)]
            }
        }
        setMirror(e, t) {
            this.mirror ||= [], this.mirror.push(e, t)
        }
        appendMappingInverted(e) {
            for (let t = e.maps.length - 1, n = this._maps.length + e._maps.length; t >= 0; t--) {
                let r = e.getMirror(t);
                this.appendMap(e._maps[t].invert(), r != null && r > t ? n - r - 1 : void 0)
            }
        }
        invert() {
            let t = new e;
            return t.appendMappingInverted(this), t
        }
        map(e, t = 1) {
            if (this.mirror) return this._map(e, t, !0);
            for (let n = this.from; n < this.to; n++) e = this._maps[n].map(e, t);
            return e
        }
        mapResult(e, t = 1) {
            return this._map(e, t, !1)
        }
        _map(e, t, n) {
            let r = 0;
            for (let n = this.from; n < this.to; n++) {
                let i = this._maps[n].mapResult(e, t);
                if (i.recover != null) {
                    let t = this.getMirror(n);
                    if (t != null && t > n && t < this.to) {
                        n = t, e = this._maps[t].recover(i.recover);
                        continue
                    }
                }
                r |= i.delInfo, e = i.pos
            }
            return n ? e : new yt(e, r, null)
        }
    },
    St = Object.create(null),
    y = class {
        getMap() {
            return bt.empty
        }
        merge(e) {
            return null
        }
        static fromJSON(e, t) {
            if (!t || !t.stepType) throw RangeError(`Invalid input for Step.fromJSON`);
            let n = St[t.stepType];
            if (!n) throw RangeError(`No step type ${t.stepType} defined`);
            return n.fromJSON(e, t)
        }
        static jsonID(e, t) {
            if (e in St) throw RangeError(`Duplicate use of step JSON ID ` + e);
            return St[e] = t, t.prototype.jsonID = e, t
        }
    },
    b = class e {
        constructor(e, t) {
            this.doc = e, this.failed = t
        }
        static ok(t) {
            return new e(t, null)
        }
        static fail(t) {
            return new e(null, t)
        }
        static fromReplace(t, n, r, i) {
            try {
                return e.ok(t.replace(n, r, i))
            } catch (t) {
                if (t instanceof p) return e.fail(t.message);
                throw t
            }
        }
    };

function Ct(e, t, n) {
    let r = [];
    for (let i = 0; i < e.childCount; i++) {
        let a = e.child(i);
        a.content.size && (a = a.copy(Ct(a.content, t, a))), a.isInline && (a = t(a, n, i)), r.push(a)
    }
    return c.fromArray(r)
}
var wt = class e extends y {
    constructor(e, t, n) {
        super(), this.from = e, this.to = t, this.mark = n
    }
    apply(e) {
        let t = e.slice(this.from, this.to),
            n = e.resolve(this.from),
            r = n.node(n.sharedDepth(this.to)),
            i = new m(Ct(t.content, (e, t) => !e.isAtom || !t.type.allowsMarkType(this.mark.type) ? e : e.mark(this.mark.addToSet(e.marks)), r), t.openStart, t.openEnd);
        return b.fromReplace(e, this.from, this.to, i)
    }
    invert() {
        return new Tt(this.from, this.to, this.mark)
    }
    map(t) {
        let n = t.mapResult(this.from, 1),
            r = t.mapResult(this.to, -1);
        return n.deleted && r.deleted || n.pos >= r.pos ? null : new e(n.pos, r.pos, this.mark)
    }
    merge(t) {
        return t instanceof e && t.mark.eq(this.mark) && this.from <= t.to && this.to >= t.from ? new e(Math.min(this.from, t.from), Math.max(this.to, t.to), this.mark) : null
    }
    toJSON() {
        return {
            stepType: `addMark`,
            mark: this.mark.toJSON(),
            from: this.from,
            to: this.to
        }
    }
    static fromJSON(t, n) {
        if (typeof n.from != `number` || typeof n.to != `number`) throw RangeError(`Invalid input for AddMarkStep.fromJSON`);
        return new e(n.from, n.to, t.markFromJSON(n.mark))
    }
};
y.jsonID(`addMark`, wt);
var Tt = class e extends y {
    constructor(e, t, n) {
        super(), this.from = e, this.to = t, this.mark = n
    }
    apply(e) {
        let t = e.slice(this.from, this.to),
            n = new m(Ct(t.content, e => e.mark(this.mark.removeFromSet(e.marks)), e), t.openStart, t.openEnd);
        return b.fromReplace(e, this.from, this.to, n)
    }
    invert() {
        return new wt(this.from, this.to, this.mark)
    }
    map(t) {
        let n = t.mapResult(this.from, 1),
            r = t.mapResult(this.to, -1);
        return n.deleted && r.deleted || n.pos >= r.pos ? null : new e(n.pos, r.pos, this.mark)
    }
    merge(t) {
        return t instanceof e && t.mark.eq(this.mark) && this.from <= t.to && this.to >= t.from ? new e(Math.min(this.from, t.from), Math.max(this.to, t.to), this.mark) : null
    }
    toJSON() {
        return {
            stepType: `removeMark`,
            mark: this.mark.toJSON(),
            from: this.from,
            to: this.to
        }
    }
    static fromJSON(t, n) {
        if (typeof n.from != `number` || typeof n.to != `number`) throw RangeError(`Invalid input for RemoveMarkStep.fromJSON`);
        return new e(n.from, n.to, t.markFromJSON(n.mark))
    }
};
y.jsonID(`removeMark`, Tt);
var Et = class e extends y {
    constructor(e, t) {
        super(), this.pos = e, this.mark = t
    }
    apply(e) {
        let t = e.nodeAt(this.pos);
        if (!t) return b.fail(`No node at mark step's position`);
        let n = t.type.create(t.attrs, null, this.mark.addToSet(t.marks));
        return b.fromReplace(e, this.pos, this.pos + 1, new m(c.from(n), 0, t.isLeaf ? 0 : 1))
    }
    invert(t) {
        let n = t.nodeAt(this.pos);
        if (n) {
            let t = this.mark.addToSet(n.marks);
            if (t.length == n.marks.length) {
                for (let r = 0; r < n.marks.length; r++)
                    if (!n.marks[r].isInSet(t)) return new e(this.pos, n.marks[r]);
                return new e(this.pos, this.mark)
            }
        }
        return new Dt(this.pos, this.mark)
    }
    map(t) {
        let n = t.mapResult(this.pos, 1);
        return n.deletedAfter ? null : new e(n.pos, this.mark)
    }
    toJSON() {
        return {
            stepType: `addNodeMark`,
            pos: this.pos,
            mark: this.mark.toJSON()
        }
    }
    static fromJSON(t, n) {
        if (typeof n.pos != `number`) throw RangeError(`Invalid input for AddNodeMarkStep.fromJSON`);
        return new e(n.pos, t.markFromJSON(n.mark))
    }
};
y.jsonID(`addNodeMark`, Et);
var Dt = class e extends y {
    constructor(e, t) {
        super(), this.pos = e, this.mark = t
    }
    apply(e) {
        let t = e.nodeAt(this.pos);
        if (!t) return b.fail(`No node at mark step's position`);
        let n = t.type.create(t.attrs, null, this.mark.removeFromSet(t.marks));
        return b.fromReplace(e, this.pos, this.pos + 1, new m(c.from(n), 0, t.isLeaf ? 0 : 1))
    }
    invert(e) {
        let t = e.nodeAt(this.pos);
        return !t || !this.mark.isInSet(t.marks) ? this : new Et(this.pos, this.mark)
    }
    map(t) {
        let n = t.mapResult(this.pos, 1);
        return n.deletedAfter ? null : new e(n.pos, this.mark)
    }
    toJSON() {
        return {
            stepType: `removeNodeMark`,
            pos: this.pos,
            mark: this.mark.toJSON()
        }
    }
    static fromJSON(t, n) {
        if (typeof n.pos != `number`) throw RangeError(`Invalid input for RemoveNodeMarkStep.fromJSON`);
        return new e(n.pos, t.markFromJSON(n.mark))
    }
};
y.jsonID(`removeNodeMark`, Dt);
var Ot = class e extends y {
    constructor(e, t, n, r = !1) {
        super(), this.from = e, this.to = t, this.slice = n, this.structure = r
    }
    apply(e) {
        return this.structure && At(e, this.from, this.to) ? b.fail(`Structure replace would overwrite content`) : b.fromReplace(e, this.from, this.to, this.slice)
    }
    getMap() {
        return new bt([this.from, this.to - this.from, this.slice.size])
    }
    invert(t) {
        return new e(this.from, this.from + this.slice.size, t.slice(this.from, this.to))
    }
    map(t) {
        let n = t.mapResult(this.to, -1),
            r = this.from == this.to && e.MAP_BIAS < 0 ? n : t.mapResult(this.from, 1);
        return r.deletedAcross && n.deletedAcross ? null : new e(r.pos, Math.max(r.pos, n.pos), this.slice, this.structure)
    }
    merge(t) {
        if (!(t instanceof e) || t.structure || this.structure) return null;
        if (this.from + this.slice.size == t.from && !this.slice.openEnd && !t.slice.openStart) {
            let n = this.slice.size + t.slice.size == 0 ? m.empty : new m(this.slice.content.append(t.slice.content), this.slice.openStart, t.slice.openEnd);
            return new e(this.from, this.to + (t.to - t.from), n, this.structure)
        } else if (t.to == this.from && !this.slice.openStart && !t.slice.openEnd) {
            let n = this.slice.size + t.slice.size == 0 ? m.empty : new m(t.slice.content.append(this.slice.content), t.slice.openStart, this.slice.openEnd);
            return new e(t.from, this.to, n, this.structure)
        } else return null
    }
    toJSON() {
        let e = {
            stepType: `replace`,
            from: this.from,
            to: this.to
        };
        return this.slice.size && (e.slice = this.slice.toJSON()), this.structure && (e.structure = !0), e
    }
    static fromJSON(t, n) {
        if (typeof n.from != `number` || typeof n.to != `number`) throw RangeError(`Invalid input for ReplaceStep.fromJSON`);
        return new e(n.from, n.to, m.fromJSON(t, n.slice), !!n.structure)
    }
};
Ot.MAP_BIAS = 1, y.jsonID(`replace`, Ot);
var kt = class e extends y {
    constructor(e, t, n, r, i, a, o = !1) {
        super(), this.from = e, this.to = t, this.gapFrom = n, this.gapTo = r, this.slice = i, this.insert = a, this.structure = o
    }
    apply(e) {
        if (this.structure && (At(e, this.from, this.gapFrom) || At(e, this.gapTo, this.to))) return b.fail(`Structure gap-replace would overwrite content`);
        let t = e.slice(this.gapFrom, this.gapTo);
        if (t.openStart || t.openEnd) return b.fail(`Gap is not a flat range`);
        let n = this.slice.insertAt(this.insert, t.content);
        return n ? b.fromReplace(e, this.from, this.to, n) : b.fail(`Content does not fit in gap`)
    }
    getMap() {
        return new bt([this.from, this.gapFrom - this.from, this.insert, this.gapTo, this.to - this.gapTo, this.slice.size - this.insert])
    }
    invert(t) {
        let n = this.gapTo - this.gapFrom;
        return new e(this.from, this.from + this.slice.size + n, this.from + this.insert, this.from + this.insert + n, t.slice(this.from, this.to).removeBetween(this.gapFrom - this.from, this.gapTo - this.from), this.gapFrom - this.from, this.structure)
    }
    map(t) {
        let n = t.mapResult(this.from, 1),
            r = t.mapResult(this.to, -1),
            i = this.from == this.gapFrom ? n.pos : t.map(this.gapFrom, -1),
            a = this.to == this.gapTo ? r.pos : t.map(this.gapTo, 1);
        return n.deletedAcross && r.deletedAcross || i < n.pos || a > r.pos ? null : new e(n.pos, r.pos, i, a, this.slice, this.insert, this.structure)
    }
    toJSON() {
        let e = {
            stepType: `replaceAround`,
            from: this.from,
            to: this.to,
            gapFrom: this.gapFrom,
            gapTo: this.gapTo,
            insert: this.insert
        };
        return this.slice.size && (e.slice = this.slice.toJSON()), this.structure && (e.structure = !0), e
    }
    static fromJSON(t, n) {
        if (typeof n.from != `number` || typeof n.to != `number` || typeof n.gapFrom != `number` || typeof n.gapTo != `number` || typeof n.insert != `number`) throw RangeError(`Invalid input for ReplaceAroundStep.fromJSON`);
        return new e(n.from, n.to, n.gapFrom, n.gapTo, m.fromJSON(t, n.slice), n.insert, !!n.structure)
    }
};
y.jsonID(`replaceAround`, kt);

function At(e, t, n) {
    let r = e.resolve(t),
        i = n - t,
        a = r.depth;
    for (; i > 0 && a > 0 && r.indexAfter(a) == r.node(a).childCount;) a--, i--;
    if (i > 0) {
        let e = r.node(a).maybeChild(r.indexAfter(a));
        for (; i > 0;) {
            if (!e || e.isLeaf) return !0;
            e = e.firstChild, i--
        }
    }
    return !1
}

function jt(e, t, n, r) {
    let i = [],
        a = [],
        o, s;
    e.doc.nodesBetween(t, n, (e, c, l) => {
        if (!e.isInline) return;
        let u = e.marks;
        if (!r.isInSet(u) && l.type.allowsMarkType(r.type)) {
            let l = Math.max(c, t),
                d = Math.min(c + e.nodeSize, n),
                f = r.addToSet(u);
            for (let e = 0; e < u.length; e++) u[e].isInSet(f) || (o && o.to == l && o.mark.eq(u[e]) ? o.to = d : i.push(o = new Tt(l, d, u[e])));
            s && s.to == l ? s.to = d : a.push(s = new wt(l, d, r))
        }
    }), i.forEach(t => e.step(t)), a.forEach(t => e.step(t))
}

function Mt(e, t, n, r) {
    let i = [],
        a = 0;
    e.doc.nodesBetween(t, n, (e, o) => {
        if (!e.isInline) return;
        a++;
        let s = null;
        if (r instanceof Re) {
            let t = e.marks,
                n;
            for (; n = r.isInSet(t);)(s ||= []).push(n), t = n.removeFromSet(t)
        } else r ? r.isInSet(e.marks) && (s = [r]) : s = e.marks;
        if (s && s.length) {
            let r = Math.min(o + e.nodeSize, n);
            for (let e = 0; e < s.length; e++) {
                let n = s[e],
                    c;
                for (let e = 0; e < i.length; e++) {
                    let t = i[e];
                    t.step == a - 1 && n.eq(i[e].style) && (c = t)
                }
                c ? (c.to = r, c.step = a) : i.push({
                    style: n,
                    from: Math.max(o, t),
                    to: r,
                    step: a
                })
            }
        }
    }), i.forEach(t => e.step(new Tt(t.from, t.to, t.style)))
}

function Nt(e, t, n, r = n.contentMatch, i = !0) {
    let a = e.doc.nodeAt(t),
        o = [],
        s = t + 1;
    for (let t = 0; t < a.childCount; t++) {
        let l = a.child(t),
            u = s + l.nodeSize,
            d = r.matchType(l.type);
        if (!d) o.push(new Ot(s, u, m.empty));
        else {
            r = d;
            for (let t = 0; t < l.marks.length; t++) n.allowsMarkType(l.marks[t].type) || e.step(new Tt(s, u, l.marks[t]));
            if (i && l.isText && n.whitespace != `pre`) {
                let e, t = /\r?\n|\r/g,
                    r;
                for (; e = t.exec(l.text);) r ||= new m(c.from(n.schema.text(` `, n.allowedMarks(l.marks))), 0, 0), o.push(new Ot(s + e.index, s + e.index + e[0].length, r))
            }
        }
        s = u
    }
    if (!r.validEnd) {
        let t = r.fillBefore(c.empty, !0);
        e.replace(s, s, new m(t, 0, 0))
    }
    for (let t = o.length - 1; t >= 0; t--) e.step(o[t])
}

function Pt(e, t, n) {
    return (t == 0 || e.canReplace(t, e.childCount)) && (n == e.childCount || e.canReplace(0, n))
}

function Ft(e) {
    let t = e.parent.content.cutByIndex(e.startIndex, e.endIndex);
    for (let n = e.depth, r = 0, i = 0;; --n) {
        let a = e.$from.node(n),
            o = e.$from.index(n) + r,
            s = e.$to.indexAfter(n) - i;
        if (n < e.depth && a.canReplace(o, s, t)) return n;
        if (n == 0 || a.type.spec.isolating || !Pt(a, o, s)) break;
        o && (r = 1), s < a.childCount && (i = 1)
    }
    return null
}

function It(e, t, n) {
    let {
        $from: r,
        $to: i,
        depth: a
    } = t, o = r.before(a + 1), s = i.after(a + 1), l = o, u = s, d = c.empty, f = 0;
    for (let e = a, t = !1; e > n; e--) t || r.index(e) > 0 ? (t = !0, d = c.from(r.node(e).copy(d)), f++) : l--;
    let p = c.empty,
        h = 0;
    for (let e = a, t = !1; e > n; e--) t || i.after(e + 1) < i.end(e) ? (t = !0, p = c.from(i.node(e).copy(p)), h++) : u++;
    e.step(new kt(l, u, o, s, new m(d.append(p), f, h), d.size - f, !0))
}

function Lt(e, t, n = null, r = e) {
    let i = zt(e, t),
        a = i && Bt(r, t);
    return a ? i.map(Rt).concat({
        type: t,
        attrs: n
    }).concat(a.map(Rt)) : null
}

function Rt(e) {
    return {
        type: e,
        attrs: null
    }
}

function zt(e, t) {
    let {
        parent: n,
        startIndex: r,
        endIndex: i
    } = e, a = n.contentMatchAt(r).findWrapping(t);
    if (!a) return null;
    let o = a.length ? a[0] : t;
    return n.canReplaceWith(r, i, o) ? a : null
}

function Bt(e, t) {
    let {
        parent: n,
        startIndex: r,
        endIndex: i
    } = e, a = n.child(r), o = t.contentMatch.findWrapping(a.type);
    if (!o) return null;
    let s = (o.length ? o[o.length - 1] : t).contentMatch;
    for (let e = r; s && e < i; e++) s = s.matchType(n.child(e).type);
    return !s || !s.validEnd ? null : o
}

function Vt(e, t, n) {
    let r = c.empty;
    for (let e = n.length - 1; e >= 0; e--) {
        if (r.size) {
            let t = n[e].type.contentMatch.matchFragment(r);
            if (!t || !t.validEnd) throw RangeError(`Wrapper type given to Transform.wrap does not form valid content of its parent wrapper`)
        }
        r = c.from(n[e].type.create(n[e].attrs, r))
    }
    let i = t.start,
        a = t.end;
    e.step(new kt(i, a, i, a, new m(r, 0, 0), n.length, !0))
}

function Ht(e, t, n, r, i) {
    if (!r.isTextblock) throw RangeError(`Type given to setBlockType should be a textblock`);
    let a = e.steps.length;
    e.doc.nodesBetween(t, n, (t, n) => {
        let o = typeof i == `function` ? i(t) : i;
        if (t.isTextblock && !t.hasMarkup(r, o) && Gt(e.doc, e.mapping.slice(a).map(n), r)) {
            let i = null;
            if (r.schema.linebreakReplacement) {
                let e = r.whitespace == `pre`,
                    t = !!r.contentMatch.matchType(r.schema.linebreakReplacement);
                e && !t ? i = !1 : !e && t && (i = !0)
            }
            i === !1 && Wt(e, t, n, a), Nt(e, e.mapping.slice(a).map(n, 1), r, void 0, i === null);
            let s = e.mapping.slice(a),
                l = s.map(n, 1),
                u = s.map(n + t.nodeSize, 1);
            return e.step(new kt(l, u, l + 1, u - 1, new m(c.from(r.create(o, null, t.marks)), 0, 0), 1, !0)), i === !0 && Ut(e, t, n, a), !1
        }
    })
}

function Ut(e, t, n, r) {
    t.forEach((i, a) => {
        if (i.isText) {
            let o, s = /\r?\n|\r/g;
            for (; o = s.exec(i.text);) {
                let i = e.mapping.slice(r).map(n + 1 + a + o.index);
                e.replaceWith(i, i + 1, t.type.schema.linebreakReplacement.create())
            }
        }
    })
}

function Wt(e, t, n, r) {
    t.forEach((i, a) => {
        if (i.type == i.type.schema.linebreakReplacement) {
            let i = e.mapping.slice(r).map(n + 1 + a);
            e.replaceWith(i, i + 1, t.type.schema.text(`
`))
        }
    })
}

function Gt(e, t, n) {
    let r = e.resolve(t),
        i = r.index();
    return r.parent.canReplaceWith(i, i + 1, n)
}

function Kt(e, t, n, r, i) {
    let a = e.doc.nodeAt(t);
    if (!a) throw RangeError(`No node at given position`);
    n ||= a.type;
    let o = n.create(r, null, i || a.marks);
    if (a.isLeaf) return e.replaceWith(t, t + a.nodeSize, o);
    if (!n.validContent(a.content)) throw RangeError(`Invalid content for node type ` + n.name);
    e.step(new kt(t, t + a.nodeSize, t + 1, t + a.nodeSize - 1, new m(c.from(o), 0, 0), 1, !0))
}

function qt(e, t, n = 1, r) {
    let i = e.resolve(t),
        a = i.depth - n,
        o = r && r[r.length - 1] || i.parent;
    if (a < 0 || i.parent.type.spec.isolating || !i.parent.canReplace(i.index(), i.parent.childCount) || !o.type.validContent(i.parent.content.cutByIndex(i.index(), i.parent.childCount))) return !1;
    for (let e = i.depth - 1, t = n - 2; e > a; e--, t--) {
        let n = i.node(e),
            a = i.index(e);
        if (n.type.spec.isolating) return !1;
        let o = n.content.cutByIndex(a, n.childCount),
            s = r && r[t + 1];
        s && (o = o.replaceChild(0, s.type.create(s.attrs)));
        let c = r && r[t] || n;
        if (!n.canReplace(a + 1, n.childCount) || !c.type.validContent(o)) return !1
    }
    let s = i.indexAfter(a),
        c = r && r[0];
    return i.node(a).canReplaceWith(s, s, c ? c.type : i.node(a + 1).type)
}

function Jt(e, t, n = 1, r) {
    let i = e.doc.resolve(t),
        a = c.empty,
        o = c.empty;
    for (let e = i.depth, t = i.depth - n, s = n - 1; e > t; e--, s--) {
        a = c.from(i.node(e).copy(a));
        let t = r && r[s];
        o = c.from(t ? t.type.create(t.attrs, o) : i.node(e).copy(o))
    }
    e.step(new Ot(t, t, new m(a.append(o), n, n), !0))
}

function Yt(e, t) {
    let n = e.resolve(t),
        r = n.index();
    return Zt(n.nodeBefore, n.nodeAfter) && n.parent.canReplace(r, r + 1)
}

function Xt(e, t) {
    t.content.size || e.type.compatibleContent(t.type);
    let n = e.contentMatchAt(e.childCount),
        {
            linebreakReplacement: r
        } = e.type.schema;
    for (let i = 0; i < t.childCount; i++) {
        let a = t.child(i),
            o = a.type == r ? e.type.schema.nodes.text : a.type;
        if (n = n.matchType(o), !n || !e.type.allowsMarks(a.marks)) return !1
    }
    return n.validEnd
}

function Zt(e, t) {
    return !!(e && t && !e.isLeaf && Xt(e, t))
}

function Qt(e, t, n = -1) {
    let r = e.resolve(t);
    for (let e = r.depth;; e--) {
        let i, a, o = r.index(e);
        if (e == r.depth ? (i = r.nodeBefore, a = r.nodeAfter) : n > 0 ? (i = r.node(e + 1), o++, a = r.node(e).maybeChild(o)) : (i = r.node(e).maybeChild(o - 1), a = r.node(e + 1)), i && !i.isTextblock && Zt(i, a) && r.node(e).canReplace(o, o + 1)) return t;
        if (e == 0) break;
        t = n < 0 ? r.before(e) : r.after(e)
    }
}

function $t(e, t, n) {
    let r = null,
        {
            linebreakReplacement: i
        } = e.doc.type.schema,
        a = e.doc.resolve(t - n),
        o = a.node().type;
    if (i && o.inlineContent) {
        let e = o.whitespace == `pre`,
            t = !!o.contentMatch.matchType(i);
        e && !t ? r = !1 : !e && t && (r = !0)
    }
    let s = e.steps.length;
    if (r === !1) {
        let r = e.doc.resolve(t + n);
        Wt(e, r.node(), r.before(), s)
    }
    o.inlineContent && Nt(e, t + n - 1, o, a.node().contentMatchAt(a.index()), r == null);
    let c = e.mapping.slice(s),
        l = c.map(t - n);
    if (e.step(new Ot(l, c.map(t + n, -1), m.empty, !0)), r === !0) {
        let t = e.doc.resolve(l);
        Ut(e, t.node(), t.before(), e.steps.length)
    }
    return e
}

function en(e, t, n) {
    let r = e.resolve(t);
    if (r.parent.canReplaceWith(r.index(), r.index(), n)) return t;
    if (r.parentOffset == 0)
        for (let e = r.depth - 1; e >= 0; e--) {
            let t = r.index(e);
            if (r.node(e).canReplaceWith(t, t, n)) return r.before(e + 1);
            if (t > 0) return null
        }
    if (r.parentOffset == r.parent.content.size)
        for (let e = r.depth - 1; e >= 0; e--) {
            let t = r.indexAfter(e);
            if (r.node(e).canReplaceWith(t, t, n)) return r.after(e + 1);
            if (t < r.node(e).childCount) return null
        }
    return null
}

function tn(e, t, n) {
    let r = e.resolve(t);
    if (!n.content.size) return t;
    let i = n.content;
    for (let e = 0; e < n.openStart; e++) i = i.firstChild.content;
    for (let e = 1; e <= (n.openStart == 0 && n.size ? 2 : 1); e++)
        for (let t = r.depth; t >= 0; t--) {
            let n = t == r.depth ? 0 : r.pos <= (r.start(t + 1) + r.end(t + 1)) / 2 ? -1 : 1,
                a = r.index(t) + (n > 0 ? 1 : 0),
                o = r.node(t),
                s = !1;
            if (e == 1) s = o.canReplace(a, a, i);
            else {
                let e = o.contentMatchAt(a).findWrapping(i.firstChild.type);
                s = e && o.canReplaceWith(a, a, e[0])
            }
            if (s) return n == 0 ? r.pos : n < 0 ? r.before(t + 1) : r.after(t + 1)
        }
    return null
}

function nn(e, t, n = t, r = m.empty) {
    if (t == n && !r.size) return null;
    let i = e.resolve(t),
        a = e.resolve(n);
    return rn(i, a, r) ? new Ot(t, n, r) : new an(i, a, r).fit()
}

function rn(e, t, n) {
    return !n.openStart && !n.openEnd && e.start() == t.start() && e.parent.canReplace(e.index(), t.index(), n.content)
}
var an = class {
    constructor(e, t, n) {
        this.$from = e, this.$to = t, this.unplaced = n, this.frontier = [], this.placed = c.empty;
        for (let t = 0; t <= e.depth; t++) {
            let n = e.node(t);
            this.frontier.push({
                type: n.type,
                match: n.contentMatchAt(e.indexAfter(t))
            })
        }
        for (let t = e.depth; t > 0; t--) this.placed = c.from(e.node(t).copy(this.placed))
    }
    get depth() {
        return this.frontier.length - 1
    }
    fit() {
        for (; this.unplaced.size;) {
            let e = this.findFittable();
            e ? this.placeNodes(e) : this.openMore() || this.dropNode()
        }
        let e = this.mustMoveInline(),
            t = this.placed.size - this.depth - this.$from.depth,
            n = this.$from,
            r = this.close(e < 0 ? this.$to : n.doc.resolve(e));
        if (!r) return null;
        let i = this.placed,
            a = n.depth,
            o = r.depth;
        for (; a && o && i.childCount == 1;) i = i.firstChild.content, a--, o--;
        let s = new m(i, a, o);
        return e > -1 ? new kt(n.pos, e, this.$to.pos, this.$to.end(), s, t) : s.size || n.pos != this.$to.pos ? new Ot(n.pos, r.pos, s) : null
    }
    findFittable() {
        let e = this.unplaced.openStart;
        for (let t = this.unplaced.content, n = 0, r = this.unplaced.openEnd; n < e; n++) {
            let i = t.firstChild;
            if (t.childCount > 1 && (r = 0), i.type.spec.isolating && r <= n) {
                e = n;
                break
            }
            t = i.content
        }
        for (let t = 1; t <= 2; t++)
            for (let n = t == 1 ? e : this.unplaced.openStart; n >= 0; n--) {
                let e, r = null;
                n ? (r = cn(this.unplaced.content, n - 1).firstChild, e = r.content) : e = this.unplaced.content;
                let i = e.firstChild;
                for (let e = this.depth; e >= 0; e--) {
                    let {
                        type: a,
                        match: o
                    } = this.frontier[e], s, l = null;
                    if (t == 1 && (i ? o.matchType(i.type) || (l = o.fillBefore(c.from(i), !1)) : r && a.compatibleContent(r.type))) return {
                        sliceDepth: n,
                        frontierDepth: e,
                        parent: r,
                        inject: l
                    };
                    if (t == 2 && i && (s = o.findWrapping(i.type))) return {
                        sliceDepth: n,
                        frontierDepth: e,
                        parent: r,
                        wrap: s
                    };
                    if (r && o.matchType(r.type)) break
                }
            }
    }
    openMore() {
        let {
            content: e,
            openStart: t,
            openEnd: n
        } = this.unplaced, r = cn(e, t);
        return !r.childCount || r.firstChild.isLeaf ? !1 : (this.unplaced = new m(e, t + 1, Math.max(n, r.size + t >= e.size - n ? t + 1 : 0)), !0)
    }
    dropNode() {
        let {
            content: e,
            openStart: t,
            openEnd: n
        } = this.unplaced, r = cn(e, t);
        if (r.childCount <= 1 && t > 0) {
            let i = e.size - t <= t + r.size;
            this.unplaced = new m(on(e, t - 1, 1), t - 1, i ? t - 1 : n)
        } else this.unplaced = new m(on(e, t, 1), t, n)
    }
    placeNodes({
        sliceDepth: e,
        frontierDepth: t,
        parent: n,
        inject: r,
        wrap: i
    }) {
        for (; this.depth > t;) this.closeFrontierNode();
        if (i)
            for (let e = 0; e < i.length; e++) this.openFrontierNode(i[e]);
        let a = this.unplaced,
            o = n ? n.content : a.content,
            s = a.openStart - e,
            l = 0,
            u = [],
            {
                match: d,
                type: f
            } = this.frontier[t];
        if (r) {
            for (let e = 0; e < r.childCount; e++) u.push(r.child(e));
            d = d.matchFragment(r)
        }
        let p = o.size + e - (a.content.size - a.openEnd);
        for (; l < o.childCount;) {
            let e = o.child(l),
                t = d.matchType(e.type);
            if (!t) break;
            l++, (l > 1 || s == 0 || e.content.size) && (d = t, u.push(ln(e.mark(f.allowedMarks(e.marks)), l == 1 ? s : 0, l == o.childCount ? p : -1)))
        }
        let h = l == o.childCount;
        h || (p = -1), this.placed = sn(this.placed, t, c.from(u)), this.frontier[t].match = d, h && p < 0 && n && n.type == this.frontier[this.depth].type && this.frontier.length > 1 && this.closeFrontierNode();
        for (let e = 0, t = o; e < p; e++) {
            let e = t.lastChild;
            this.frontier.push({
                type: e.type,
                match: e.contentMatchAt(e.childCount)
            }), t = e.content
        }
        this.unplaced = h ? e == 0 ? m.empty : new m(on(a.content, e - 1, 1), e - 1, p < 0 ? a.openEnd : e - 1) : new m(on(a.content, e, l), a.openStart, a.openEnd)
    }
    mustMoveInline() {
        if (!this.$to.parent.isTextblock) return -1;
        let e = this.frontier[this.depth],
            t;
        if (!e.type.isTextblock || !un(this.$to, this.$to.depth, e.type, e.match, !1) || this.$to.depth == this.depth && (t = this.findCloseLevel(this.$to)) && t.depth == this.depth) return -1;
        let {
            depth: n
        } = this.$to, r = this.$to.after(n);
        for (; n > 1 && r == this.$to.end(--n);) ++r;
        return r
    }
    findCloseLevel(e) {
        scan: for (let t = Math.min(this.depth, e.depth); t >= 0; t--) {
            let {
                match: n,
                type: r
            } = this.frontier[t], i = t < e.depth && e.end(t + 1) == e.pos + (e.depth - (t + 1)), a = un(e, t, r, n, i);
            if (a) {
                for (let n = t - 1; n >= 0; n--) {
                    let {
                        match: t,
                        type: r
                    } = this.frontier[n], i = un(e, n, r, t, !0);
                    if (!i || i.childCount) continue scan
                }
                return {
                    depth: t,
                    fit: a,
                    move: i ? e.doc.resolve(e.after(t + 1)) : e
                }
            }
        }
    }
    close(e) {
        let t = this.findCloseLevel(e);
        if (!t) return null;
        for (; this.depth > t.depth;) this.closeFrontierNode();
        t.fit.childCount && (this.placed = sn(this.placed, t.depth, t.fit)), e = t.move;
        for (let n = t.depth + 1; n <= e.depth; n++) {
            let t = e.node(n),
                r = t.type.contentMatch.fillBefore(t.content, !0, e.index(n));
            this.openFrontierNode(t.type, t.attrs, r)
        }
        return e
    }
    openFrontierNode(e, t = null, n) {
        let r = this.frontier[this.depth];
        r.match = r.match.matchType(e), this.placed = sn(this.placed, this.depth, c.from(e.create(t, n))), this.frontier.push({
            type: e,
            match: e.contentMatch
        })
    }
    closeFrontierNode() {
        let e = this.frontier.pop().match.fillBefore(c.empty, !0);
        e.childCount && (this.placed = sn(this.placed, this.frontier.length, e))
    }
};

function on(e, t, n) {
    return t == 0 ? e.cutByIndex(n, e.childCount) : e.replaceChild(0, e.firstChild.copy(on(e.firstChild.content, t - 1, n)))
}

function sn(e, t, n) {
    return t == 0 ? e.append(n) : e.replaceChild(e.childCount - 1, e.lastChild.copy(sn(e.lastChild.content, t - 1, n)))
}

function cn(e, t) {
    for (let n = 0; n < t; n++) e = e.firstChild.content;
    return e
}

function ln(e, t, n) {
    if (t <= 0) return e;
    let r = e.content;
    return t > 1 && (r = r.replaceChild(0, ln(r.firstChild, t - 1, r.childCount == 1 ? n - 1 : 0))), t > 0 && (r = e.type.contentMatch.fillBefore(r).append(r), n <= 0 && (r = r.append(e.type.contentMatch.matchFragment(r).fillBefore(c.empty, !0)))), e.copy(r)
}

function un(e, t, n, r, i) {
    let a = e.node(t),
        o = i ? e.indexAfter(t) : e.index(t);
    if (o == a.childCount && !n.compatibleContent(a.type)) return null;
    let s = r.fillBefore(a.content, !0, o);
    return s && !dn(n, a.content, o) ? s : null
}

function dn(e, t, n) {
    for (let r = n; r < t.childCount; r++)
        if (!e.allowsMarks(t.child(r).marks)) return !0;
    return !1
}

function fn(e) {
    return e.spec.defining || e.spec.definingForContent
}

function pn(e, t, n, r) {
    if (!r.size) return e.deleteRange(t, n);
    let i = e.doc.resolve(t),
        a = e.doc.resolve(n);
    if (rn(i, a, r)) return e.step(new Ot(t, n, r));
    let o = _n(i, a);
    o[o.length - 1] == 0 && o.pop();
    let s = -(i.depth + 1);
    o.unshift(s);
    for (let e = i.depth, t = i.pos - 1; e > 0; e--, t--) {
        let n = i.node(e).type.spec;
        if (n.defining || n.definingAsContext || n.isolating) break;
        o.indexOf(e) > -1 ? s = e : i.before(e) == t && o.splice(1, 0, -e)
    }
    let c = o.indexOf(s),
        l = [],
        u = r.openStart;
    for (let e = r.content, t = 0;; t++) {
        let n = e.firstChild;
        if (l.push(n), t == r.openStart) break;
        e = n.content
    }
    for (let e = u - 1; e >= 0; e--) {
        let t = l[e],
            n = fn(t.type);
        if (n && !t.sameMarkup(i.node(Math.abs(s) - 1))) u = e;
        else if (n || !t.type.isTextblock) break
    }
    for (let t = r.openStart; t >= 0; t--) {
        let s = (t + u + 1) % (r.openStart + 1),
            d = l[s];
        if (d)
            for (let t = 0; t < o.length; t++) {
                let l = o[(t + c) % o.length],
                    u = !0;
                l < 0 && (u = !1, l = -l);
                let f = i.node(l - 1),
                    p = i.index(l - 1);
                if (f.canReplaceWith(p, p, d.type, d.marks)) return e.replace(i.before(l), u ? a.after(l) : n, new m(mn(r.content, 0, r.openStart, s), s, r.openEnd))
            }
    }
    let d = e.steps.length;
    for (let s = o.length - 1; s >= 0 && (e.replace(t, n, r), !(e.steps.length > d)); s--) {
        let e = o[s];
        e < 0 || (t = i.before(e), n = a.after(e))
    }
}

function mn(e, t, n, r, i) {
    if (t < n) {
        let i = e.firstChild;
        e = e.replaceChild(0, i.copy(mn(i.content, t + 1, n, r, i)))
    }
    if (t > r) {
        let t = i.contentMatchAt(0),
            n = t.fillBefore(e).append(e);
        e = n.append(t.matchFragment(n).fillBefore(c.empty, !0))
    }
    return e
}

function hn(e, t, n, r) {
    if (!r.isInline && t == n && e.doc.resolve(t).parent.content.size) {
        let i = en(e.doc, t, r.type);
        i != null && (t = n = i)
    }
    e.replaceRange(t, n, new m(c.from(r), 0, 0))
}

function gn(e, t, n) {
    let r = e.doc.resolve(t),
        i = e.doc.resolve(n);
    if (r.parent.isTextblock && i.parent.isTextblock && r.start() != i.start() && r.parentOffset == 0 && i.parentOffset == 0) {
        let a = r.sharedDepth(n),
            o = !1;
        for (let e = r.depth; e > a; e--) r.node(e).type.spec.isolating && (o = !0);
        for (let e = i.depth; e > a; e--) i.node(e).type.spec.isolating && (o = !0);
        if (!o) {
            for (let e = r.depth; e > 0 && t == r.start(e); e--) t = r.before(e);
            for (let e = i.depth; e > 0 && n == i.start(e); e--) n = i.before(e);
            r = e.doc.resolve(t), i = e.doc.resolve(n)
        }
    }
    let a = _n(r, i);
    for (let t = 0; t < a.length; t++) {
        let n = a[t],
            o = t == a.length - 1;
        if (o && n == 0 || r.node(n).type.contentMatch.validEnd) return e.delete(r.start(n), i.end(n));
        if (n > 0 && (o || r.node(n - 1).canReplace(r.index(n - 1), i.indexAfter(n - 1)))) return e.delete(r.before(n), i.after(n))
    }
    for (let a = 1; a <= r.depth && a <= i.depth; a++)
        if (t - r.start(a) == r.depth - a && n > r.end(a) && i.end(a) - n != i.depth - a && r.start(a - 1) == i.start(a - 1) && r.node(a - 1).canReplace(r.index(a - 1), i.index(a - 1))) return e.delete(r.before(a), n);
    e.delete(t, n)
}

function _n(e, t) {
    let n = [],
        r = Math.min(e.depth, t.depth);
    for (let i = r; i >= 0; i--) {
        let r = e.start(i);
        if (r < e.pos - (e.depth - i) || t.end(i) > t.pos + (t.depth - i) || e.node(i).type.spec.isolating || t.node(i).type.spec.isolating) break;
        (r == t.start(i) || i == e.depth && i == t.depth && e.parent.inlineContent && t.parent.inlineContent && i && t.start(i - 1) == r - 1) && n.push(i)
    }
    return n
}
var vn = class e extends y {
    constructor(e, t, n) {
        super(), this.pos = e, this.attr = t, this.value = n
    }
    apply(e) {
        let t = e.nodeAt(this.pos);
        if (!t) return b.fail(`No node at attribute step's position`);
        let n = Object.create(null);
        for (let e in t.attrs) n[e] = t.attrs[e];
        n[this.attr] = this.value;
        let r = t.type.create(n, null, t.marks);
        return b.fromReplace(e, this.pos, this.pos + 1, new m(c.from(r), 0, t.isLeaf ? 0 : 1))
    }
    getMap() {
        return bt.empty
    }
    invert(t) {
        return new e(this.pos, this.attr, t.nodeAt(this.pos).attrs[this.attr])
    }
    map(t) {
        let n = t.mapResult(this.pos, 1);
        return n.deletedAfter ? null : new e(n.pos, this.attr, this.value)
    }
    toJSON() {
        return {
            stepType: `attr`,
            pos: this.pos,
            attr: this.attr,
            value: this.value
        }
    }
    static fromJSON(t, n) {
        if (typeof n.pos != `number` || typeof n.attr != `string`) throw RangeError(`Invalid input for AttrStep.fromJSON`);
        return new e(n.pos, n.attr, n.value)
    }
};
y.jsonID(`attr`, vn);
var yn = class e extends y {
    constructor(e, t) {
        super(), this.attr = e, this.value = t
    }
    apply(e) {
        let t = Object.create(null);
        for (let n in e.attrs) t[n] = e.attrs[n];
        t[this.attr] = this.value;
        let n = e.type.create(t, e.content, e.marks);
        return b.ok(n)
    }
    getMap() {
        return bt.empty
    }
    invert(t) {
        return new e(this.attr, t.attrs[this.attr])
    }
    map(e) {
        return this
    }
    toJSON() {
        return {
            stepType: `docAttr`,
            attr: this.attr,
            value: this.value
        }
    }
    static fromJSON(t, n) {
        if (typeof n.attr != `string`) throw RangeError(`Invalid input for DocAttrStep.fromJSON`);
        return new e(n.attr, n.value)
    }
};
y.jsonID(`docAttr`, yn);
var bn = class extends Error {};
bn = function e(t) {
    let n = Error.call(this, t);
    return n.__proto__ = e.prototype, n
}, bn.prototype = Object.create(Error.prototype), bn.prototype.constructor = bn, bn.prototype.name = `TransformError`;
var xn = class {
    constructor(e) {
        this.doc = e, this.steps = [], this.docs = [], this.mapping = new xt
    }
    get before() {
        return this.docs.length ? this.docs[0] : this.doc
    }
    step(e) {
        let t = this.maybeStep(e);
        if (t.failed) throw new bn(t.failed);
        return this
    }
    maybeStep(e) {
        let t = e.apply(this.doc);
        return t.failed || this.addStep(e, t.doc), t
    }
    get docChanged() {
        return this.steps.length > 0
    }
    changedRange() {
        let e = 1e9,
            t = -1e9;
        for (let n = 0; n < this.mapping.maps.length; n++) {
            let r = this.mapping.maps[n];
            n && (e = r.map(e, 1), t = r.map(t, -1)), r.forEach((n, r, i, a) => {
                e = Math.min(e, i), t = Math.max(t, a)
            })
        }
        return e == 1e9 ? null : {
            from: e,
            to: t
        }
    }
    addStep(e, t) {
        this.docs.push(this.doc), this.steps.push(e), this.mapping.appendMap(e.getMap()), this.doc = t
    }
    replace(e, t = e, n = m.empty) {
        let r = nn(this.doc, e, t, n);
        return r && this.step(r), this
    }
    replaceWith(e, t, n) {
        return this.replace(e, t, new m(c.from(n), 0, 0))
    }
    delete(e, t) {
        return this.replace(e, t, m.empty)
    }
    insert(e, t) {
        return this.replaceWith(e, e, t)
    }
    replaceRange(e, t, n) {
        return pn(this, e, t, n), this
    }
    replaceRangeWith(e, t, n) {
        return hn(this, e, t, n), this
    }
    deleteRange(e, t) {
        return gn(this, e, t), this
    }
    lift(e, t) {
        return It(this, e, t), this
    }
    join(e, t = 1) {
        return $t(this, e, t), this
    }
    wrap(e, t) {
        return Vt(this, e, t), this
    }
    setBlockType(e, t = e, n, r = null) {
        return Ht(this, e, t, n, r), this
    }
    setNodeMarkup(e, t, n = null, r) {
        return Kt(this, e, t, n, r), this
    }
    setNodeAttribute(e, t, n) {
        return this.step(new vn(e, t, n)), this
    }
    setDocAttribute(e, t) {
        return this.step(new yn(e, t)), this
    }
    addNodeMark(e, t) {
        return this.step(new Et(e, t)), this
    }
    removeNodeMark(e, t) {
        let n = this.doc.nodeAt(e);
        if (!n) throw RangeError(`No node at position ` + e);
        if (t instanceof f) t.isInSet(n.marks) && this.step(new Dt(e, t));
        else {
            let r = n.marks,
                i, a = [];
            for (; i = t.isInSet(r);) a.push(new Dt(e, i)), r = i.removeFromSet(r);
            for (let e = a.length - 1; e >= 0; e--) this.step(a[e])
        }
        return this
    }
    split(e, t = 1, n) {
        return Jt(this, e, t, n), this
    }
    addMark(e, t, n) {
        return jt(this, e, t, n), this
    }
    removeMark(e, t, n) {
        return Mt(this, e, t, n), this
    }
    clearIncompatible(e, t, n) {
        return Nt(this, e, t, n), this
    }
};

function Sn(e, t, n) {
    for (let r = 0;; r++) {
        if (r == e.childCount || r == t.childCount) return e.childCount == t.childCount ? null : n;
        let i = e.child(r),
            a = t.child(r);
        if (i == a) {
            n += i.nodeSize;
            continue
        }
        if (!i.sameMarkup(a)) return n;
        if (i.isText && i.text != a.text) {
            for (let e = 0; i.text[e] == a.text[e]; e++) n++;
            return n
        }
        if (i.content.size || a.content.size) {
            let e = Sn(i.content, a.content, n + 1);
            if (e != null) return e
        }
        n += i.nodeSize
    }
}

function Cn(e, t, n, r) {
    for (let i = e.childCount, a = t.childCount;;) {
        if (i == 0 || a == 0) return i == a ? null : {
            a: n,
            b: r
        };
        let o = e.child(--i),
            s = t.child(--a),
            c = o.nodeSize;
        if (o == s) {
            n -= c, r -= c;
            continue
        }
        if (!o.sameMarkup(s)) return {
            a: n,
            b: r
        };
        if (o.isText && o.text != s.text) {
            let e = 0,
                t = Math.min(o.text.length, s.text.length);
            for (; e < t && o.text[o.text.length - e - 1] == s.text[s.text.length - e - 1];) e++, n--, r--;
            return {
                a: n,
                b: r
            }
        }
        if (o.content.size || s.content.size) {
            let e = Cn(o.content, s.content, n - 1, r - 1);
            if (e) return e
        }
        n -= c, r -= c
    }
}
var x = class e {
    constructor(e, t) {
        if (this.content = e, this.size = t || 0, t == null)
            for (let t = 0; t < e.length; t++) this.size += e[t].nodeSize
    }
    nodesBetween(e, t, n, r = 0, i) {
        for (let a = 0, o = 0; o < t; a++) {
            let s = this.content[a],
                c = o + s.nodeSize;
            if (c > e && n(s, r + o, i || null, a) !== !1 && s.content.size) {
                let i = o + 1;
                s.nodesBetween(Math.max(0, e - i), Math.min(s.content.size, t - i), n, r + i)
            }
            o = c
        }
    }
    descendants(e) {
        this.nodesBetween(0, this.size, e)
    }
    textBetween(e, t, n, r) {
        let i = ``,
            a = !0;
        return this.nodesBetween(e, t, (o, s) => {
            let c = o.isText ? o.text.slice(Math.max(e, s) - s, t - s) : o.isLeaf ? r ? typeof r == `function` ? r(o) : r : o.type.spec.leafText ? o.type.spec.leafText(o) : `` : ``;
            o.isBlock && (o.isLeaf && c || o.isTextblock) && n && (a ? a = !1 : i += n), i += c
        }, 0), i
    }
    append(t) {
        if (!t.size) return this;
        if (!this.size) return t;
        let n = this.lastChild,
            r = t.firstChild,
            i = this.content.slice(),
            a = 0;
        for (n.isText && n.sameMarkup(r) && (i[i.length - 1] = n.withText(n.text + r.text), a = 1); a < t.content.length; a++) i.push(t.content[a]);
        return new e(i, this.size + t.size)
    }
    cut(t, n = this.size) {
        if (t == 0 && n == this.size) return this;
        let r = [],
            i = 0;
        if (n > t)
            for (let e = 0, a = 0; a < n; e++) {
                let o = this.content[e],
                    s = a + o.nodeSize;
                s > t && ((a < t || s > n) && (o = o.isText ? o.cut(Math.max(0, t - a), Math.min(o.text.length, n - a)) : o.cut(Math.max(0, t - a - 1), Math.min(o.content.size, n - a - 1))), r.push(o), i += o.nodeSize), a = s
            }
        return new e(r, i)
    }
    cutByIndex(t, n) {
        return t == n ? e.empty : t == 0 && n == this.content.length ? this : new e(this.content.slice(t, n))
    }
    replaceChild(t, n) {
        let r = this.content[t];
        if (r == n) return this;
        let i = this.content.slice(),
            a = this.size + n.nodeSize - r.nodeSize;
        return i[t] = n, new e(i, a)
    }
    addToStart(t) {
        return new e([t].concat(this.content), this.size + t.nodeSize)
    }
    addToEnd(t) {
        return new e(this.content.concat(t), this.size + t.nodeSize)
    }
    eq(e) {
        if (this.content.length != e.content.length) return !1;
        for (let t = 0; t < this.content.length; t++)
            if (!this.content[t].eq(e.content[t])) return !1;
        return !0
    }
    get firstChild() {
        return this.content.length ? this.content[0] : null
    }
    get lastChild() {
        return this.content.length ? this.content[this.content.length - 1] : null
    }
    get childCount() {
        return this.content.length
    }
    child(e) {
        let t = this.content[e];
        if (!t) throw RangeError(`Index ` + e + ` out of range for ` + this);
        return t
    }
    maybeChild(e) {
        return this.content[e] || null
    }
    forEach(e) {
        for (let t = 0, n = 0; t < this.content.length; t++) {
            let r = this.content[t];
            e(r, n, t), n += r.nodeSize
        }
    }
    findDiffStart(e, t = 0) {
        return Sn(this, e, t)
    }
    findDiffEnd(e, t = this.size, n = e.size) {
        return Cn(this, e, t, n)
    }
    findIndex(e) {
        if (e == 0) return Tn(0, e);
        if (e == this.size) return Tn(this.content.length, e);
        if (e > this.size || e < 0) throw RangeError(`Position ${e} outside of fragment (${this})`);
        for (let t = 0, n = 0;; t++) {
            let r = this.child(t),
                i = n + r.nodeSize;
            if (i >= e) return i == e ? Tn(t + 1, i) : Tn(t, n);
            n = i
        }
    }
    toString() {
        return `<` + this.toStringInner() + `>`
    }
    toStringInner() {
        return this.content.join(`, `)
    }
    toJSON() {
        return this.content.length ? this.content.map(e => e.toJSON()) : null
    }
    static fromJSON(t, n) {
        if (!n) return e.empty;
        if (!Array.isArray(n)) throw RangeError(`Invalid input for Fragment.fromJSON`);
        return new e(n.map(t.nodeFromJSON))
    }
    static fromArray(t) {
        if (!t.length) return e.empty;
        let n, r = 0;
        for (let e = 0; e < t.length; e++) {
            let i = t[e];
            r += i.nodeSize, e && i.isText && t[e - 1].sameMarkup(i) ? (n ||= t.slice(0, e), n[n.length - 1] = i.withText(n[n.length - 1].text + i.text)) : n && n.push(i)
        }
        return new e(n || t, r)
    }
    static from(t) {
        if (!t) return e.empty;
        if (t instanceof e) return t;
        if (Array.isArray(t)) return this.fromArray(t);
        if (t.attrs) return new e([t], t.nodeSize);
        throw RangeError(`Can not convert ` + t + ` to a Fragment` + (t.nodesBetween ? ` (looks like multiple versions of prosemirror-model were loaded)` : ``))
    }
};
x.empty = new x([], 0);
var wn = {
    index: 0,
    offset: 0
};

function Tn(e, t) {
    return wn.index = e, wn.offset = t, wn
}

function En(e, t) {
    if (e === t) return !0;
    if (!(e && typeof e == `object`) || !(t && typeof t == `object`)) return !1;
    let n = Array.isArray(e);
    if (Array.isArray(t) != n) return !1;
    if (n) {
        if (e.length != t.length) return !1;
        for (let n = 0; n < e.length; n++)
            if (!En(e[n], t[n])) return !1
    } else {
        for (let n in e)
            if (!(n in t) || !En(e[n], t[n])) return !1;
        for (let n in t)
            if (!(n in e)) return !1
    }
    return !0
}
var Dn = class e {
    constructor(e, t) {
        this.type = e, this.attrs = t
    }
    addToSet(e) {
        let t, n = !1;
        for (let r = 0; r < e.length; r++) {
            let i = e[r];
            if (this.eq(i)) return e;
            if (this.type.excludes(i.type)) t ||= e.slice(0, r);
            else if (i.type.excludes(this.type)) return e;
            else !n && i.type.rank > this.type.rank && (t ||= e.slice(0, r), t.push(this), n = !0), t && t.push(i)
        }
        return t ||= e.slice(), n || t.push(this), t
    }
    removeFromSet(e) {
        for (let t = 0; t < e.length; t++)
            if (this.eq(e[t])) return e.slice(0, t).concat(e.slice(t + 1));
        return e
    }
    isInSet(e) {
        for (let t = 0; t < e.length; t++)
            if (this.eq(e[t])) return !0;
        return !1
    }
    eq(e) {
        return this == e || this.type == e.type && En(this.attrs, e.attrs)
    }
    toJSON() {
        let e = {
            type: this.type.name
        };
        for (let t in this.attrs) {
            e.attrs = this.attrs;
            break
        }
        return e
    }
    static fromJSON(e, t) {
        if (!t) throw RangeError(`Invalid input for Mark.fromJSON`);
        let n = e.marks[t.type];
        if (!n) throw RangeError(`There is no mark type ${t.type} in this schema`);
        let r = n.create(t.attrs);
        return n.checkAttrs(r.attrs), r
    }
    static sameSet(e, t) {
        if (e == t) return !0;
        if (e.length != t.length) return !1;
        for (let n = 0; n < e.length; n++)
            if (!e[n].eq(t[n])) return !1;
        return !0
    }
    static setFrom(t) {
        if (!t || Array.isArray(t) && t.length == 0) return e.none;
        if (t instanceof e) return [t];
        let n = t.slice();
        return n.sort((e, t) => e.type.rank - t.type.rank), n
    }
};
Dn.none = [];
var On = class extends Error {},
    S = class e {
        constructor(e, t, n) {
            this.content = e, this.openStart = t, this.openEnd = n
        }
        get size() {
            return this.content.size - this.openStart - this.openEnd
        }
        insertAt(t, n) {
            let r = An(this.content, t + this.openStart, n);
            return r && new e(r, this.openStart, this.openEnd)
        }
        removeBetween(t, n) {
            return new e(kn(this.content, t + this.openStart, n + this.openStart), this.openStart, this.openEnd)
        }
        eq(e) {
            return this.content.eq(e.content) && this.openStart == e.openStart && this.openEnd == e.openEnd
        }
        toString() {
            return this.content + `(` + this.openStart + `,` + this.openEnd + `)`
        }
        toJSON() {
            if (!this.content.size) return null;
            let e = {
                content: this.content.toJSON()
            };
            return this.openStart > 0 && (e.openStart = this.openStart), this.openEnd > 0 && (e.openEnd = this.openEnd), e
        }
        static fromJSON(t, n) {
            if (!n) return e.empty;
            let r = n.openStart || 0,
                i = n.openEnd || 0;
            if (typeof r != `number` || typeof i != `number`) throw RangeError(`Invalid input for Slice.fromJSON`);
            return new e(x.fromJSON(t, n.content), r, i)
        }
        static maxOpen(t, n = !0) {
            let r = 0,
                i = 0;
            for (let e = t.firstChild; e && !e.isLeaf && (n || !e.type.spec.isolating); e = e.firstChild) r++;
            for (let e = t.lastChild; e && !e.isLeaf && (n || !e.type.spec.isolating); e = e.lastChild) i++;
            return new e(t, r, i)
        }
    };
S.empty = new S(x.empty, 0, 0);

function kn(e, t, n) {
    let {
        index: r,
        offset: i
    } = e.findIndex(t), a = e.maybeChild(r), {
        index: o,
        offset: s
    } = e.findIndex(n);
    if (i == t || a.isText) {
        if (s != n && !e.child(o).isText) throw RangeError(`Removing non-flat range`);
        return e.cut(0, t).append(e.cut(n))
    }
    if (r != o) throw RangeError(`Removing non-flat range`);
    return e.replaceChild(r, a.copy(kn(a.content, t - i - 1, n - i - 1)))
}

function An(e, t, n, r) {
    let {
        index: i,
        offset: a
    } = e.findIndex(t), o = e.maybeChild(i);
    if (a == t || o.isText) return r && !r.canReplace(i, i, n) ? null : e.cut(0, t).append(n).append(e.cut(t));
    let s = An(o.content, t - a - 1, n, o);
    return s && e.replaceChild(i, o.copy(s))
}

function jn(e, t, n) {
    if (n.openStart > e.depth) throw new On(`Inserted content deeper than insertion position`);
    if (e.depth - n.openStart != t.depth - n.openEnd) throw new On(`Inconsistent open depths`);
    return Mn(e, t, n, 0)
}

function Mn(e, t, n, r) {
    let i = e.index(r),
        a = e.node(r);
    if (i == t.index(r) && r < e.depth - n.openStart) {
        let o = Mn(e, t, n, r + 1);
        return a.copy(a.content.replaceChild(i, o))
    } else if (n.content.size)
        if (!n.openStart && !n.openEnd && e.depth == r && t.depth == r) {
            let r = e.parent,
                i = r.content;
            return Ln(r, i.cut(0, e.parentOffset).append(n.content).append(i.cut(t.parentOffset)))
        } else {
            let {
                start: i,
                end: o
            } = Bn(n, e);
            return Ln(a, Rn(e, i, o, t, r))
        }
    else return Ln(a, zn(e, t, r))
}

function Nn(e, t) {
    if (!t.type.compatibleContent(e.type)) throw new On(`Cannot join ` + t.type.name + ` onto ` + e.type.name)
}

function Pn(e, t, n) {
    let r = e.node(n);
    return Nn(r, t.node(n)), r
}

function Fn(e, t) {
    let n = t.length - 1;
    n >= 0 && e.isText && e.sameMarkup(t[n]) ? t[n] = e.withText(t[n].text + e.text) : t.push(e)
}

function In(e, t, n, r) {
    let i = (t || e).node(n),
        a = 0,
        o = t ? t.index(n) : i.childCount;
    e && (a = e.index(n), e.depth > n ? a++ : e.textOffset && (Fn(e.nodeAfter, r), a++));
    for (let e = a; e < o; e++) Fn(i.child(e), r);
    t && t.depth == n && t.textOffset && Fn(t.nodeBefore, r)
}

function Ln(e, t) {
    return e.type.checkContent(t), e.copy(t)
}

function Rn(e, t, n, r, i) {
    let a = e.depth > i && Pn(e, t, i + 1),
        o = r.depth > i && Pn(n, r, i + 1),
        s = [];
    return In(null, e, i, s), a && o && t.index(i) == n.index(i) ? (Nn(a, o), Fn(Ln(a, Rn(e, t, n, r, i + 1)), s)) : (a && Fn(Ln(a, zn(e, t, i + 1)), s), In(t, n, i, s), o && Fn(Ln(o, zn(n, r, i + 1)), s)), In(r, null, i, s), new x(s)
}

function zn(e, t, n) {
    let r = [];
    return In(null, e, n, r), e.depth > n && Fn(Ln(Pn(e, t, n + 1), zn(e, t, n + 1)), r), In(t, null, n, r), new x(r)
}

function Bn(e, t) {
    let n = t.depth - e.openStart,
        r = t.node(n).copy(e.content);
    for (let e = n - 1; e >= 0; e--) r = t.node(e).copy(x.from(r));
    return {
        start: r.resolveNoCache(e.openStart + n),
        end: r.resolveNoCache(r.content.size - e.openEnd - n)
    }
}
var Vn = class e {
        constructor(e, t, n) {
            this.pos = e, this.path = t, this.parentOffset = n, this.depth = t.length / 3 - 1
        }
        resolveDepth(e) {
            return e == null ? this.depth : e < 0 ? this.depth + e : e
        }
        get parent() {
            return this.node(this.depth)
        }
        get doc() {
            return this.node(0)
        }
        node(e) {
            return this.path[this.resolveDepth(e) * 3]
        }
        index(e) {
            return this.path[this.resolveDepth(e) * 3 + 1]
        }
        indexAfter(e) {
            return e = this.resolveDepth(e), this.index(e) + (e == this.depth && !this.textOffset ? 0 : 1)
        }
        start(e) {
            return e = this.resolveDepth(e), e == 0 ? 0 : this.path[e * 3 - 1] + 1
        }
        end(e) {
            return e = this.resolveDepth(e), this.start(e) + this.node(e).content.size
        }
        before(e) {
            if (e = this.resolveDepth(e), !e) throw RangeError(`There is no position before the top-level node`);
            return e == this.depth + 1 ? this.pos : this.path[e * 3 - 1]
        }
        after(e) {
            if (e = this.resolveDepth(e), !e) throw RangeError(`There is no position after the top-level node`);
            return e == this.depth + 1 ? this.pos : this.path[e * 3 - 1] + this.path[e * 3].nodeSize
        }
        get textOffset() {
            return this.pos - this.path[this.path.length - 1]
        }
        get nodeAfter() {
            let e = this.parent,
                t = this.index(this.depth);
            if (t == e.childCount) return null;
            let n = this.pos - this.path[this.path.length - 1],
                r = e.child(t);
            return n ? e.child(t).cut(n) : r
        }
        get nodeBefore() {
            let e = this.index(this.depth),
                t = this.pos - this.path[this.path.length - 1];
            return t ? this.parent.child(e).cut(0, t) : e == 0 ? null : this.parent.child(e - 1)
        }
        posAtIndex(e, t) {
            t = this.resolveDepth(t);
            let n = this.path[t * 3],
                r = t == 0 ? 0 : this.path[t * 3 - 1] + 1;
            for (let t = 0; t < e; t++) r += n.child(t).nodeSize;
            return r
        }
        marks() {
            let e = this.parent,
                t = this.index();
            if (e.content.size == 0) return Dn.none;
            if (this.textOffset) return e.child(t).marks;
            let n = e.maybeChild(t - 1),
                r = e.maybeChild(t);
            if (!n) {
                let e = n;
                n = r, r = e
            }
            let i = n.marks;
            for (var a = 0; a < i.length; a++) i[a].type.spec.inclusive === !1 && (!r || !i[a].isInSet(r.marks)) && (i = i[a--].removeFromSet(i));
            return i
        }
        marksAcross(e) {
            let t = this.parent.maybeChild(this.index());
            if (!t || !t.isInline) return null;
            let n = t.marks,
                r = e.parent.maybeChild(e.index());
            for (var i = 0; i < n.length; i++) n[i].type.spec.inclusive === !1 && (!r || !n[i].isInSet(r.marks)) && (n = n[i--].removeFromSet(n));
            return n
        }
        sharedDepth(e) {
            for (let t = this.depth; t > 0; t--)
                if (this.start(t) <= e && this.end(t) >= e) return t;
            return 0
        }
        blockRange(e = this, t) {
            if (e.pos < this.pos) return e.blockRange(this);
            for (let n = this.depth - (this.parent.inlineContent || this.pos == e.pos ? 1 : 0); n >= 0; n--)
                if (e.pos <= this.end(n) && (!t || t(this.node(n)))) return new Gn(this, e, n);
            return null
        }
        sameParent(e) {
            return this.pos - this.parentOffset == e.pos - e.parentOffset
        }
        max(e) {
            return e.pos > this.pos ? e : this
        }
        min(e) {
            return e.pos < this.pos ? e : this
        }
        toString() {
            let e = ``;
            for (let t = 1; t <= this.depth; t++) e += (e ? `/` : ``) + this.node(t).type.name + `_` + this.index(t - 1);
            return e + `:` + this.parentOffset
        }
        static resolve(t, n) {
            if (!(n >= 0 && n <= t.content.size)) throw RangeError(`Position ` + n + ` out of range`);
            let r = [],
                i = 0,
                a = n;
            for (let e = t;;) {
                let {
                    index: t,
                    offset: n
                } = e.content.findIndex(a), o = a - n;
                if (r.push(e, t, i + n), !o || (e = e.child(t), e.isText)) break;
                a = o - 1, i += n + 1
            }
            return new e(n, r, a)
        }
        static resolveCached(t, n) {
            let r = Wn.get(t);
            if (r)
                for (let e = 0; e < r.elts.length; e++) {
                    let t = r.elts[e];
                    if (t.pos == n) return t
                } else Wn.set(t, r = new Hn);
            let i = r.elts[r.i] = e.resolve(t, n);
            return r.i = (r.i + 1) % Un, i
        }
    },
    Hn = class {
        constructor() {
            this.elts = [], this.i = 0
        }
    },
    Un = 12,
    Wn = new WeakMap,
    Gn = class {
        constructor(e, t, n) {
            this.$from = e, this.$to = t, this.depth = n
        }
        get start() {
            return this.$from.before(this.depth + 1)
        }
        get end() {
            return this.$to.after(this.depth + 1)
        }
        get parent() {
            return this.$from.node(this.depth)
        }
        get startIndex() {
            return this.$from.index(this.depth)
        }
        get endIndex() {
            return this.$to.indexAfter(this.depth)
        }
    },
    Kn = Object.create(null),
    qn = class e {
        constructor(e, t, n, r = Dn.none) {
            this.type = e, this.attrs = t, this.marks = r, this.content = n || x.empty
        }
        get children() {
            return this.content.content
        }
        get nodeSize() {
            return this.isLeaf ? 1 : 2 + this.content.size
        }
        get childCount() {
            return this.content.childCount
        }
        child(e) {
            return this.content.child(e)
        }
        maybeChild(e) {
            return this.content.maybeChild(e)
        }
        forEach(e) {
            this.content.forEach(e)
        }
        nodesBetween(e, t, n, r = 0) {
            this.content.nodesBetween(e, t, n, r, this)
        }
        descendants(e) {
            this.nodesBetween(0, this.content.size, e)
        }
        get textContent() {
            return this.isLeaf && this.type.spec.leafText ? this.type.spec.leafText(this) : this.textBetween(0, this.content.size, ``)
        }
        textBetween(e, t, n, r) {
            return this.content.textBetween(e, t, n, r)
        }
        get firstChild() {
            return this.content.firstChild
        }
        get lastChild() {
            return this.content.lastChild
        }
        eq(e) {
            return this == e || this.sameMarkup(e) && this.content.eq(e.content)
        }
        sameMarkup(e) {
            return this.hasMarkup(e.type, e.attrs, e.marks)
        }
        hasMarkup(e, t, n) {
            return this.type == e && En(this.attrs, t || e.defaultAttrs || Kn) && Dn.sameSet(this.marks, n || Dn.none)
        }
        copy(t = null) {
            return t == this.content ? this : new e(this.type, this.attrs, t, this.marks)
        }
        mark(t) {
            return t == this.marks ? this : new e(this.type, this.attrs, this.content, t)
        }
        cut(e, t = this.content.size) {
            return e == 0 && t == this.content.size ? this : this.copy(this.content.cut(e, t))
        }
        slice(e, t = this.content.size, n = !1) {
            if (e == t) return S.empty;
            let r = this.resolve(e),
                i = this.resolve(t),
                a = n ? 0 : r.sharedDepth(t),
                o = r.start(a);
            return new S(r.node(a).content.cut(r.pos - o, i.pos - o), r.depth - a, i.depth - a)
        }
        replace(e, t, n) {
            return jn(this.resolve(e), this.resolve(t), n)
        }
        nodeAt(e) {
            for (let t = this;;) {
                let {
                    index: n,
                    offset: r
                } = t.content.findIndex(e);
                if (t = t.maybeChild(n), !t) return null;
                if (r == e || t.isText) return t;
                e -= r + 1
            }
        }
        childAfter(e) {
            let {
                index: t,
                offset: n
            } = this.content.findIndex(e);
            return {
                node: this.content.maybeChild(t),
                index: t,
                offset: n
            }
        }
        childBefore(e) {
            if (e == 0) return {
                node: null,
                index: 0,
                offset: 0
            };
            let {
                index: t,
                offset: n
            } = this.content.findIndex(e);
            if (n < e) return {
                node: this.content.child(t),
                index: t,
                offset: n
            };
            let r = this.content.child(t - 1);
            return {
                node: r,
                index: t - 1,
                offset: n - r.nodeSize
            }
        }
        resolve(e) {
            return Vn.resolveCached(this, e)
        }
        resolveNoCache(e) {
            return Vn.resolve(this, e)
        }
        rangeHasMark(e, t, n) {
            let r = !1;
            return t > e && this.nodesBetween(e, t, e => (n.isInSet(e.marks) && (r = !0), !r)), r
        }
        get isBlock() {
            return this.type.isBlock
        }
        get isTextblock() {
            return this.type.isTextblock
        }
        get inlineContent() {
            return this.type.inlineContent
        }
        get isInline() {
            return this.type.isInline
        }
        get isText() {
            return this.type.isText
        }
        get isLeaf() {
            return this.type.isLeaf
        }
        get isAtom() {
            return this.type.isAtom
        }
        toString() {
            if (this.type.spec.toDebugString) return this.type.spec.toDebugString(this);
            let e = this.type.name;
            return this.content.size && (e += `(` + this.content.toStringInner() + `)`), Jn(this.marks, e)
        }
        contentMatchAt(e) {
            let t = this.type.contentMatch.matchFragment(this.content, 0, e);
            if (!t) throw Error(`Called contentMatchAt on a node with invalid content`);
            return t
        }
        canReplace(e, t, n = x.empty, r = 0, i = n.childCount) {
            let a = this.contentMatchAt(e).matchFragment(n, r, i),
                o = a && a.matchFragment(this.content, t);
            if (!o || !o.validEnd) return !1;
            for (let e = r; e < i; e++)
                if (!this.type.allowsMarks(n.child(e).marks)) return !1;
            return !0
        }
        canReplaceWith(e, t, n, r) {
            if (r && !this.type.allowsMarks(r)) return !1;
            let i = this.contentMatchAt(e).matchType(n),
                a = i && i.matchFragment(this.content, t);
            return a ? a.validEnd : !1
        }
        canAppend(e) {
            return e.content.size ? this.canReplace(this.childCount, this.childCount, e.content) : this.type.compatibleContent(e.type)
        }
        check() {
            this.type.checkContent(this.content), this.type.checkAttrs(this.attrs);
            let e = Dn.none;
            for (let t = 0; t < this.marks.length; t++) {
                let n = this.marks[t];
                n.type.checkAttrs(n.attrs), e = n.addToSet(e)
            }
            if (!Dn.sameSet(e, this.marks)) throw RangeError(`Invalid collection of marks for node ${this.type.name}: ${this.marks.map(e=>e.type.name)}`);
            this.content.forEach(e => e.check())
        }
        toJSON() {
            let e = {
                type: this.type.name
            };
            for (let t in this.attrs) {
                e.attrs = this.attrs;
                break
            }
            return this.content.size && (e.content = this.content.toJSON()), this.marks.length && (e.marks = this.marks.map(e => e.toJSON())), e
        }
        static fromJSON(e, t) {
            if (!t) throw RangeError(`Invalid input for Node.fromJSON`);
            let n;
            if (t.marks) {
                if (!Array.isArray(t.marks)) throw RangeError(`Invalid mark data for Node.fromJSON`);
                n = t.marks.map(e.markFromJSON)
            }
            if (t.type == `text`) {
                if (typeof t.text != `string`) throw RangeError(`Invalid text node in JSON`);
                return e.text(t.text, n)
            }
            let r = x.fromJSON(e, t.content),
                i = e.nodeType(t.type).create(t.attrs, r, n);
            return i.type.checkAttrs(i.attrs), i
        }
    };
qn.prototype.text = void 0;

function Jn(e, t) {
    for (let n = e.length - 1; n >= 0; n--) t = e[n].type.name + `(` + t + `)`;
    return t
}
var Yn = class e {
    constructor(e) {
        this.validEnd = e, this.next = [], this.wrapCache = []
    }
    static parse(t, n) {
        let r = new Xn(t, n);
        if (r.next == null) return e.empty;
        let i = Zn(r);
        r.next && r.err(`Unexpected trailing text`);
        let a = sr(ir(i));
        return cr(a, r), a
    }
    matchType(e) {
        for (let t = 0; t < this.next.length; t++)
            if (this.next[t].type == e) return this.next[t].next;
        return null
    }
    matchFragment(e, t = 0, n = e.childCount) {
        let r = this;
        for (let i = t; r && i < n; i++) r = r.matchType(e.child(i).type);
        return r
    }
    get inlineContent() {
        return this.next.length != 0 && this.next[0].type.isInline
    }
    get defaultType() {
        for (let e = 0; e < this.next.length; e++) {
            let {
                type: t
            } = this.next[e];
            if (!(t.isText || t.hasRequiredAttrs())) return t
        }
        return null
    }
    compatible(e) {
        for (let t = 0; t < this.next.length; t++)
            for (let n = 0; n < e.next.length; n++)
                if (this.next[t].type == e.next[n].type) return !0;
        return !1
    }
    fillBefore(e, t = !1, n = 0) {
        let r = [this];

        function i(a, o) {
            let s = a.matchFragment(e, n);
            if (s && (!t || s.validEnd)) return x.from(o.map(e => e.createAndFill()));
            for (let e = 0; e < a.next.length; e++) {
                let {
                    type: t,
                    next: n
                } = a.next[e];
                if (!(t.isText || t.hasRequiredAttrs()) && r.indexOf(n) == -1) {
                    r.push(n);
                    let e = i(n, o.concat(t));
                    if (e) return e
                }
            }
            return null
        }
        return i(this, [])
    }
    findWrapping(e) {
        for (let t = 0; t < this.wrapCache.length; t += 2)
            if (this.wrapCache[t] == e) return this.wrapCache[t + 1];
        let t = this.computeWrapping(e);
        return this.wrapCache.push(e, t), t
    }
    computeWrapping(e) {
        let t = Object.create(null),
            n = [{
                match: this,
                type: null,
                via: null
            }];
        for (; n.length;) {
            let r = n.shift(),
                i = r.match;
            if (i.matchType(e)) {
                let e = [];
                for (let t = r; t.type; t = t.via) e.push(t.type);
                return e.reverse()
            }
            for (let e = 0; e < i.next.length; e++) {
                let {
                    type: a,
                    next: o
                } = i.next[e];
                !a.isLeaf && !a.hasRequiredAttrs() && !(a.name in t) && (!r.type || o.validEnd) && (n.push({
                    match: a.contentMatch,
                    type: a,
                    via: r
                }), t[a.name] = !0)
            }
        }
        return null
    }
    get edgeCount() {
        return this.next.length
    }
    edge(e) {
        if (e >= this.next.length) throw RangeError(`There's no ${e}th edge in this content match`);
        return this.next[e]
    }
    toString() {
        let e = [];

        function t(n) {
            e.push(n);
            for (let r = 0; r < n.next.length; r++) e.indexOf(n.next[r].next) == -1 && t(n.next[r].next)
        }
        return t(this), e.map((t, n) => {
            let r = n + (t.validEnd ? `*` : ` `) + ` `;
            for (let n = 0; n < t.next.length; n++) r += (n ? `, ` : ``) + t.next[n].type.name + `->` + e.indexOf(t.next[n].next);
            return r
        }).join(`
`)
    }
};
Yn.empty = new Yn(!0);
var Xn = class {
    constructor(e, t) {
        this.string = e, this.nodeTypes = t, this.inline = null, this.pos = 0, this.tokens = e.split(/\s*(?=\b|\W|$)/), this.tokens[this.tokens.length - 1] == `` && this.tokens.pop(), this.tokens[0] == `` && this.tokens.shift()
    }
    get next() {
        return this.tokens[this.pos]
    }
    eat(e) {
        return this.next == e && (this.pos++ || !0)
    }
    err(e) {
        throw SyntaxError(e + ` (in content expression '` + this.string + `')`)
    }
};

function Zn(e) {
    let t = [];
    do t.push(Qn(e)); while (e.eat(`|`));
    return t.length == 1 ? t[0] : {
        type: `choice`,
        exprs: t
    }
}

function Qn(e) {
    let t = [];
    do t.push($n(e)); while (e.next && e.next != `)` && e.next != `|`);
    return t.length == 1 ? t[0] : {
        type: `seq`,
        exprs: t
    }
}

function $n(e) {
    let t = rr(e);
    for (;;)
        if (e.eat(`+`)) t = {
            type: `plus`,
            expr: t
        };
        else if (e.eat(`*`)) t = {
        type: `star`,
        expr: t
    };
    else if (e.eat(`?`)) t = {
        type: `opt`,
        expr: t
    };
    else if (e.eat(`{`)) t = tr(e, t);
    else break;
    return t
}

function er(e) {
    /\D/.test(e.next) && e.err(`Expected number, got '` + e.next + `'`);
    let t = Number(e.next);
    return e.pos++, t
}

function tr(e, t) {
    let n = er(e),
        r = n;
    return e.eat(`,`) && (r = e.next == `}` ? -1 : er(e)), e.eat(`}`) || e.err(`Unclosed braced range`), {
        type: `range`,
        min: n,
        max: r,
        expr: t
    }
}

function nr(e, t) {
    let n = e.nodeTypes,
        r = n[t];
    if (r) return [r];
    let i = [];
    for (let e in n) {
        let r = n[e];
        r.isInGroup(t) && i.push(r)
    }
    return i.length == 0 && e.err(`No node type or group '` + t + `' found`), i
}

function rr(e) {
    if (e.eat(`(`)) {
        let t = Zn(e);
        return e.eat(`)`) || e.err(`Missing closing paren`), t
    } else if (/\W/.test(e.next)) e.err(`Unexpected token '` + e.next + `'`);
    else {
        let t = nr(e, e.next).map(t => (e.inline == null ? e.inline = t.isInline : e.inline != t.isInline && e.err(`Mixing inline and block content`), {
            type: `name`,
            value: t
        }));
        return e.pos++, t.length == 1 ? t[0] : {
            type: `choice`,
            exprs: t
        }
    }
}

function ir(e) {
    let t = [
        []
    ];
    return i(a(e, 0), n()), t;

    function n() {
        return t.push([]) - 1
    }

    function r(e, n, r) {
        let i = {
            term: r,
            to: n
        };
        return t[e].push(i), i
    }

    function i(e, t) {
        e.forEach(e => e.to = t)
    }

    function a(e, t) {
        if (e.type == `choice`) return e.exprs.reduce((e, n) => e.concat(a(n, t)), []);
        if (e.type == `seq`)
            for (let r = 0;; r++) {
                let o = a(e.exprs[r], t);
                if (r == e.exprs.length - 1) return o;
                i(o, t = n())
            } else if (e.type == `star`) {
                let o = n();
                return r(t, o), i(a(e.expr, o), o), [r(o)]
            } else if (e.type == `plus`) {
            let o = n();
            return i(a(e.expr, t), o), i(a(e.expr, o), o), [r(o)]
        } else if (e.type == `opt`) return [r(t)].concat(a(e.expr, t));
        else if (e.type == `range`) {
            let o = t;
            for (let t = 0; t < e.min; t++) {
                let t = n();
                i(a(e.expr, o), t), o = t
            }
            if (e.max == -1) i(a(e.expr, o), o);
            else
                for (let t = e.min; t < e.max; t++) {
                    let t = n();
                    r(o, t), i(a(e.expr, o), t), o = t
                }
            return [r(o)]
        } else if (e.type == `name`) return [r(t, void 0, e.value)];
        else throw Error(`Unknown expr type`)
    }
}

function ar(e, t) {
    return t - e
}

function or(e, t) {
    let n = [];
    return r(t), n.sort(ar);

    function r(t) {
        let i = e[t];
        if (i.length == 1 && !i[0].term) return r(i[0].to);
        n.push(t);
        for (let e = 0; e < i.length; e++) {
            let {
                term: t,
                to: a
            } = i[e];
            !t && n.indexOf(a) == -1 && r(a)
        }
    }
}

function sr(e) {
    let t = Object.create(null);
    return n(or(e, 0));

    function n(r) {
        let i = [];
        r.forEach(t => {
            e[t].forEach(({
                term: t,
                to: n
            }) => {
                if (!t) return;
                let r;
                for (let e = 0; e < i.length; e++) i[e][0] == t && (r = i[e][1]);
                or(e, n).forEach(e => {
                    r || i.push([t, r = []]), r.indexOf(e) == -1 && r.push(e)
                })
            })
        });
        let a = t[r.join(`,`)] = new Yn(r.indexOf(e.length - 1) > -1);
        for (let e = 0; e < i.length; e++) {
            let r = i[e][1].sort(ar);
            a.next.push({
                type: i[e][0],
                next: t[r.join(`,`)] || n(r)
            })
        }
        return a
    }
}

function cr(e, t) {
    for (let n = 0, r = [e]; n < r.length; n++) {
        let e = r[n],
            i = !e.validEnd,
            a = [];
        for (let t = 0; t < e.next.length; t++) {
            let {
                type: n,
                next: o
            } = e.next[t];
            a.push(n.name), i && !(n.isText || n.hasRequiredAttrs()) && (i = !1), r.indexOf(o) == -1 && r.push(o)
        }
        i && t.err(`Only non-generatable nodes (` + a.join(`, `) + `) in a required position (see https://prosemirror.net/docs/guide/#generatable)`)
    }
}
var lr = 65535,
    ur = 2 ** 16;

function dr(e, t) {
    return e + t * ur
}

function fr(e) {
    return e & lr
}

function pr(e) {
    return (e - (e & lr)) / ur
}
var mr = 1,
    hr = 2,
    gr = 4,
    _r = 8,
    vr = class {
        constructor(e, t, n) {
            this.pos = e, this.delInfo = t, this.recover = n
        }
        get deleted() {
            return (this.delInfo & _r) > 0
        }
        get deletedBefore() {
            return (this.delInfo & (mr | gr)) > 0
        }
        get deletedAfter() {
            return (this.delInfo & (hr | gr)) > 0
        }
        get deletedAcross() {
            return (this.delInfo & gr) > 0
        }
    },
    yr = class e {
        constructor(t, n = !1) {
            if (this.ranges = t, this.inverted = n, !t.length && e.empty) return e.empty
        }
        recover(e) {
            let t = 0,
                n = fr(e);
            if (!this.inverted)
                for (let e = 0; e < n; e++) t += this.ranges[e * 3 + 2] - this.ranges[e * 3 + 1];
            return this.ranges[n * 3] + t + pr(e)
        }
        mapResult(e, t = 1) {
            return this._map(e, t, !1)
        }
        map(e, t = 1) {
            return this._map(e, t, !0)
        }
        _map(e, t, n) {
            let r = 0,
                i = this.inverted ? 2 : 1,
                a = this.inverted ? 1 : 2;
            for (let o = 0; o < this.ranges.length; o += 3) {
                let s = this.ranges[o] - (this.inverted ? r : 0);
                if (s > e) break;
                let c = this.ranges[o + i],
                    l = this.ranges[o + a],
                    u = s + c;
                if (e <= u) {
                    let i = c ? e == s ? -1 : e == u ? 1 : t : t,
                        a = s + r + (i < 0 ? 0 : l);
                    if (n) return a;
                    let d = e == (t < 0 ? s : u) ? null : dr(o / 3, e - s),
                        f = e == s ? hr : e == u ? mr : gr;
                    return (t < 0 ? e != s : e != u) && (f |= _r), new vr(a, f, d)
                }
                r += l - c
            }
            return n ? e + r : new vr(e + r, 0, null)
        }
        touches(e, t) {
            let n = 0,
                r = fr(t),
                i = this.inverted ? 2 : 1,
                a = this.inverted ? 1 : 2;
            for (let t = 0; t < this.ranges.length; t += 3) {
                let o = this.ranges[t] - (this.inverted ? n : 0);
                if (o > e) break;
                let s = this.ranges[t + i];
                if (e <= o + s && t == r * 3) return !0;
                n += this.ranges[t + a] - s
            }
            return !1
        }
        forEach(e) {
            let t = this.inverted ? 2 : 1,
                n = this.inverted ? 1 : 2;
            for (let r = 0, i = 0; r < this.ranges.length; r += 3) {
                let a = this.ranges[r],
                    o = a - (this.inverted ? i : 0),
                    s = a + (this.inverted ? 0 : i),
                    c = this.ranges[r + t],
                    l = this.ranges[r + n];
                e(o, o + c, s, s + l), i += l - c
            }
        }
        invert() {
            return new e(this.ranges, !this.inverted)
        }
        toString() {
            return (this.inverted ? `-` : ``) + JSON.stringify(this.ranges)
        }
        static offset(t) {
            return t == 0 ? e.empty : new e(t < 0 ? [0, -t, 0] : [0, 0, t])
        }
    };
yr.empty = new yr([]);
var br = Object.create(null),
    C = class {
        getMap() {
            return yr.empty
        }
        merge(e) {
            return null
        }
        static fromJSON(e, t) {
            if (!t || !t.stepType) throw RangeError(`Invalid input for Step.fromJSON`);
            let n = br[t.stepType];
            if (!n) throw RangeError(`No step type ${t.stepType} defined`);
            return n.fromJSON(e, t)
        }
        static jsonID(e, t) {
            if (e in br) throw RangeError(`Duplicate use of step JSON ID ` + e);
            return br[e] = t, t.prototype.jsonID = e, t
        }
    },
    w = class e {
        constructor(e, t) {
            this.doc = e, this.failed = t
        }
        static ok(t) {
            return new e(t, null)
        }
        static fail(t) {
            return new e(null, t)
        }
        static fromReplace(t, n, r, i) {
            try {
                return e.ok(t.replace(n, r, i))
            } catch (t) {
                if (t instanceof On) return e.fail(t.message);
                throw t
            }
        }
    };

function xr(e, t, n) {
    let r = [];
    for (let i = 0; i < e.childCount; i++) {
        let a = e.child(i);
        a.content.size && (a = a.copy(xr(a.content, t, a))), a.isInline && (a = t(a, n, i)), r.push(a)
    }
    return x.fromArray(r)
}
var Sr = class e extends C {
    constructor(e, t, n) {
        super(), this.from = e, this.to = t, this.mark = n
    }
    apply(e) {
        let t = e.slice(this.from, this.to),
            n = e.resolve(this.from),
            r = n.node(n.sharedDepth(this.to)),
            i = new S(xr(t.content, (e, t) => !e.isAtom || !t.type.allowsMarkType(this.mark.type) ? e : e.mark(this.mark.addToSet(e.marks)), r), t.openStart, t.openEnd);
        return w.fromReplace(e, this.from, this.to, i)
    }
    invert() {
        return new Cr(this.from, this.to, this.mark)
    }
    map(t) {
        let n = t.mapResult(this.from, 1),
            r = t.mapResult(this.to, -1);
        return n.deleted && r.deleted || n.pos >= r.pos ? null : new e(n.pos, r.pos, this.mark)
    }
    merge(t) {
        return t instanceof e && t.mark.eq(this.mark) && this.from <= t.to && this.to >= t.from ? new e(Math.min(this.from, t.from), Math.max(this.to, t.to), this.mark) : null
    }
    toJSON() {
        return {
            stepType: `addMark`,
            mark: this.mark.toJSON(),
            from: this.from,
            to: this.to
        }
    }
    static fromJSON(t, n) {
        if (typeof n.from != `number` || typeof n.to != `number`) throw RangeError(`Invalid input for AddMarkStep.fromJSON`);
        return new e(n.from, n.to, t.markFromJSON(n.mark))
    }
};
C.jsonID(`addMark`, Sr);
var Cr = class e extends C {
    constructor(e, t, n) {
        super(), this.from = e, this.to = t, this.mark = n
    }
    apply(e) {
        let t = e.slice(this.from, this.to),
            n = new S(xr(t.content, e => e.mark(this.mark.removeFromSet(e.marks)), e), t.openStart, t.openEnd);
        return w.fromReplace(e, this.from, this.to, n)
    }
    invert() {
        return new Sr(this.from, this.to, this.mark)
    }
    map(t) {
        let n = t.mapResult(this.from, 1),
            r = t.mapResult(this.to, -1);
        return n.deleted && r.deleted || n.pos >= r.pos ? null : new e(n.pos, r.pos, this.mark)
    }
    merge(t) {
        return t instanceof e && t.mark.eq(this.mark) && this.from <= t.to && this.to >= t.from ? new e(Math.min(this.from, t.from), Math.max(this.to, t.to), this.mark) : null
    }
    toJSON() {
        return {
            stepType: `removeMark`,
            mark: this.mark.toJSON(),
            from: this.from,
            to: this.to
        }
    }
    static fromJSON(t, n) {
        if (typeof n.from != `number` || typeof n.to != `number`) throw RangeError(`Invalid input for RemoveMarkStep.fromJSON`);
        return new e(n.from, n.to, t.markFromJSON(n.mark))
    }
};
C.jsonID(`removeMark`, Cr);
var wr = class e extends C {
    constructor(e, t) {
        super(), this.pos = e, this.mark = t
    }
    apply(e) {
        let t = e.nodeAt(this.pos);
        if (!t) return w.fail(`No node at mark step's position`);
        let n = t.type.create(t.attrs, null, this.mark.addToSet(t.marks));
        return w.fromReplace(e, this.pos, this.pos + 1, new S(x.from(n), 0, t.isLeaf ? 0 : 1))
    }
    invert(t) {
        let n = t.nodeAt(this.pos);
        if (n) {
            let t = this.mark.addToSet(n.marks);
            if (t.length == n.marks.length) {
                for (let r = 0; r < n.marks.length; r++)
                    if (!n.marks[r].isInSet(t)) return new e(this.pos, n.marks[r]);
                return new e(this.pos, this.mark)
            }
        }
        return new Tr(this.pos, this.mark)
    }
    map(t) {
        let n = t.mapResult(this.pos, 1);
        return n.deletedAfter ? null : new e(n.pos, this.mark)
    }
    toJSON() {
        return {
            stepType: `addNodeMark`,
            pos: this.pos,
            mark: this.mark.toJSON()
        }
    }
    static fromJSON(t, n) {
        if (typeof n.pos != `number`) throw RangeError(`Invalid input for AddNodeMarkStep.fromJSON`);
        return new e(n.pos, t.markFromJSON(n.mark))
    }
};
C.jsonID(`addNodeMark`, wr);
var Tr = class e extends C {
    constructor(e, t) {
        super(), this.pos = e, this.mark = t
    }
    apply(e) {
        let t = e.nodeAt(this.pos);
        if (!t) return w.fail(`No node at mark step's position`);
        let n = t.type.create(t.attrs, null, this.mark.removeFromSet(t.marks));
        return w.fromReplace(e, this.pos, this.pos + 1, new S(x.from(n), 0, t.isLeaf ? 0 : 1))
    }
    invert(e) {
        let t = e.nodeAt(this.pos);
        return !t || !this.mark.isInSet(t.marks) ? this : new wr(this.pos, this.mark)
    }
    map(t) {
        let n = t.mapResult(this.pos, 1);
        return n.deletedAfter ? null : new e(n.pos, this.mark)
    }
    toJSON() {
        return {
            stepType: `removeNodeMark`,
            pos: this.pos,
            mark: this.mark.toJSON()
        }
    }
    static fromJSON(t, n) {
        if (typeof n.pos != `number`) throw RangeError(`Invalid input for RemoveNodeMarkStep.fromJSON`);
        return new e(n.pos, t.markFromJSON(n.mark))
    }
};
C.jsonID(`removeNodeMark`, Tr);
var Er = class e extends C {
    constructor(e, t, n, r = !1) {
        super(), this.from = e, this.to = t, this.slice = n, this.structure = r
    }
    apply(e) {
        return this.structure && Or(e, this.from, this.to) ? w.fail(`Structure replace would overwrite content`) : w.fromReplace(e, this.from, this.to, this.slice)
    }
    getMap() {
        return new yr([this.from, this.to - this.from, this.slice.size])
    }
    invert(t) {
        return new e(this.from, this.from + this.slice.size, t.slice(this.from, this.to))
    }
    map(t) {
        let n = t.mapResult(this.from, 1),
            r = t.mapResult(this.to, -1);
        return n.deletedAcross && r.deletedAcross ? null : new e(n.pos, Math.max(n.pos, r.pos), this.slice, this.structure)
    }
    merge(t) {
        if (!(t instanceof e) || t.structure || this.structure) return null;
        if (this.from + this.slice.size == t.from && !this.slice.openEnd && !t.slice.openStart) {
            let n = this.slice.size + t.slice.size == 0 ? S.empty : new S(this.slice.content.append(t.slice.content), this.slice.openStart, t.slice.openEnd);
            return new e(this.from, this.to + (t.to - t.from), n, this.structure)
        } else if (t.to == this.from && !this.slice.openStart && !t.slice.openEnd) {
            let n = this.slice.size + t.slice.size == 0 ? S.empty : new S(t.slice.content.append(this.slice.content), t.slice.openStart, this.slice.openEnd);
            return new e(t.from, this.to, n, this.structure)
        } else return null
    }
    toJSON() {
        let e = {
            stepType: `replace`,
            from: this.from,
            to: this.to
        };
        return this.slice.size && (e.slice = this.slice.toJSON()), this.structure && (e.structure = !0), e
    }
    static fromJSON(t, n) {
        if (typeof n.from != `number` || typeof n.to != `number`) throw RangeError(`Invalid input for ReplaceStep.fromJSON`);
        return new e(n.from, n.to, S.fromJSON(t, n.slice), !!n.structure)
    }
};
C.jsonID(`replace`, Er);
var Dr = class e extends C {
    constructor(e, t, n, r, i, a, o = !1) {
        super(), this.from = e, this.to = t, this.gapFrom = n, this.gapTo = r, this.slice = i, this.insert = a, this.structure = o
    }
    apply(e) {
        if (this.structure && (Or(e, this.from, this.gapFrom) || Or(e, this.gapTo, this.to))) return w.fail(`Structure gap-replace would overwrite content`);
        let t = e.slice(this.gapFrom, this.gapTo);
        if (t.openStart || t.openEnd) return w.fail(`Gap is not a flat range`);
        let n = this.slice.insertAt(this.insert, t.content);
        return n ? w.fromReplace(e, this.from, this.to, n) : w.fail(`Content does not fit in gap`)
    }
    getMap() {
        return new yr([this.from, this.gapFrom - this.from, this.insert, this.gapTo, this.to - this.gapTo, this.slice.size - this.insert])
    }
    invert(t) {
        let n = this.gapTo - this.gapFrom;
        return new e(this.from, this.from + this.slice.size + n, this.from + this.insert, this.from + this.insert + n, t.slice(this.from, this.to).removeBetween(this.gapFrom - this.from, this.gapTo - this.from), this.gapFrom - this.from, this.structure)
    }
    map(t) {
        let n = t.mapResult(this.from, 1),
            r = t.mapResult(this.to, -1),
            i = this.from == this.gapFrom ? n.pos : t.map(this.gapFrom, -1),
            a = this.to == this.gapTo ? r.pos : t.map(this.gapTo, 1);
        return n.deletedAcross && r.deletedAcross || i < n.pos || a > r.pos ? null : new e(n.pos, r.pos, i, a, this.slice, this.insert, this.structure)
    }
    toJSON() {
        let e = {
            stepType: `replaceAround`,
            from: this.from,
            to: this.to,
            gapFrom: this.gapFrom,
            gapTo: this.gapTo,
            insert: this.insert
        };
        return this.slice.size && (e.slice = this.slice.toJSON()), this.structure && (e.structure = !0), e
    }
    static fromJSON(t, n) {
        if (typeof n.from != `number` || typeof n.to != `number` || typeof n.gapFrom != `number` || typeof n.gapTo != `number` || typeof n.insert != `number`) throw RangeError(`Invalid input for ReplaceAroundStep.fromJSON`);
        return new e(n.from, n.to, n.gapFrom, n.gapTo, S.fromJSON(t, n.slice), n.insert, !!n.structure)
    }
};
C.jsonID(`replaceAround`, Dr);

function Or(e, t, n) {
    let r = e.resolve(t),
        i = n - t,
        a = r.depth;
    for (; i > 0 && a > 0 && r.indexAfter(a) == r.node(a).childCount;) a--, i--;
    if (i > 0) {
        let e = r.node(a).maybeChild(r.indexAfter(a));
        for (; i > 0;) {
            if (!e || e.isLeaf) return !0;
            e = e.firstChild, i--
        }
    }
    return !1
}

function kr(e, t, n) {
    return (t == 0 || e.canReplace(t, e.childCount)) && (n == e.childCount || e.canReplace(0, n))
}

function Ar(e) {
    let t = e.parent.content.cutByIndex(e.startIndex, e.endIndex);
    for (let n = e.depth, r = 0, i = 0;; --n) {
        let a = e.$from.node(n),
            o = e.$from.index(n) + r,
            s = e.$to.indexAfter(n) - i;
        if (n < e.depth && a.canReplace(o, s, t)) return n;
        if (n == 0 || a.type.spec.isolating || !kr(a, o, s)) break;
        o && (r = 1), s < a.childCount && (i = 1)
    }
    return null
}

function jr(e, t, n = null, r = e) {
    let i = Nr(e, t),
        a = i && Pr(r, t);
    return a ? i.map(Mr).concat({
        type: t,
        attrs: n
    }).concat(a.map(Mr)) : null
}

function Mr(e) {
    return {
        type: e,
        attrs: null
    }
}

function Nr(e, t) {
    let {
        parent: n,
        startIndex: r,
        endIndex: i
    } = e, a = n.contentMatchAt(r).findWrapping(t);
    if (!a) return null;
    let o = a.length ? a[0] : t;
    return n.canReplaceWith(r, i, o) ? a : null
}

function Pr(e, t) {
    let {
        parent: n,
        startIndex: r,
        endIndex: i
    } = e, a = n.child(r), o = t.contentMatch.findWrapping(a.type);
    if (!o) return null;
    let s = (o.length ? o[o.length - 1] : t).contentMatch;
    for (let e = r; s && e < i; e++) s = s.matchType(n.child(e).type);
    return !s || !s.validEnd ? null : o
}

function Fr(e, t, n = 1, r) {
    let i = e.resolve(t),
        a = i.depth - n,
        o = r && r[r.length - 1] || i.parent;
    if (a < 0 || i.parent.type.spec.isolating || !i.parent.canReplace(i.index(), i.parent.childCount) || !o.type.validContent(i.parent.content.cutByIndex(i.index(), i.parent.childCount))) return !1;
    for (let e = i.depth - 1, t = n - 2; e > a; e--, t--) {
        let n = i.node(e),
            a = i.index(e);
        if (n.type.spec.isolating) return !1;
        let o = n.content.cutByIndex(a, n.childCount),
            s = r && r[t + 1];
        s && (o = o.replaceChild(0, s.type.create(s.attrs)));
        let c = r && r[t] || n;
        if (!n.canReplace(a + 1, n.childCount) || !c.type.validContent(o)) return !1
    }
    let s = i.indexAfter(a),
        c = r && r[0];
    return i.node(a).canReplaceWith(s, s, c ? c.type : i.node(a + 1).type)
}

function Ir(e, t) {
    let n = e.resolve(t),
        r = n.index();
    return Rr(n.nodeBefore, n.nodeAfter) && n.parent.canReplace(r, r + 1)
}

function Lr(e, t) {
    t.content.size || e.type.compatibleContent(t.type);
    let n = e.contentMatchAt(e.childCount),
        {
            linebreakReplacement: r
        } = e.type.schema;
    for (let i = 0; i < t.childCount; i++) {
        let a = t.child(i),
            o = a.type == r ? e.type.schema.nodes.text : a.type;
        if (n = n.matchType(o), !n || !e.type.allowsMarks(a.marks)) return !1
    }
    return n.validEnd
}

function Rr(e, t) {
    return !!(e && t && !e.isLeaf && Lr(e, t))
}

function zr(e, t, n = -1) {
    let r = e.resolve(t);
    for (let e = r.depth;; e--) {
        let i, a, o = r.index(e);
        if (e == r.depth ? (i = r.nodeBefore, a = r.nodeAfter) : n > 0 ? (i = r.node(e + 1), o++, a = r.node(e).maybeChild(o)) : (i = r.node(e).maybeChild(o - 1), a = r.node(e + 1)), i && !i.isTextblock && Rr(i, a) && r.node(e).canReplace(o, o + 1)) return t;
        if (e == 0) break;
        t = n < 0 ? r.before(e) : r.after(e)
    }
}

function Br(e, t, n = t, r = S.empty) {
    if (t == n && !r.size) return null;
    let i = e.resolve(t),
        a = e.resolve(n);
    return Vr(i, a, r) ? new Er(t, n, r) : new Hr(i, a, r).fit()
}

function Vr(e, t, n) {
    return !n.openStart && !n.openEnd && e.start() == t.start() && e.parent.canReplace(e.index(), t.index(), n.content)
}
var Hr = class {
    constructor(e, t, n) {
        this.$from = e, this.$to = t, this.unplaced = n, this.frontier = [], this.placed = x.empty;
        for (let t = 0; t <= e.depth; t++) {
            let n = e.node(t);
            this.frontier.push({
                type: n.type,
                match: n.contentMatchAt(e.indexAfter(t))
            })
        }
        for (let t = e.depth; t > 0; t--) this.placed = x.from(e.node(t).copy(this.placed))
    }
    get depth() {
        return this.frontier.length - 1
    }
    fit() {
        for (; this.unplaced.size;) {
            let e = this.findFittable();
            e ? this.placeNodes(e) : this.openMore() || this.dropNode()
        }
        let e = this.mustMoveInline(),
            t = this.placed.size - this.depth - this.$from.depth,
            n = this.$from,
            r = this.close(e < 0 ? this.$to : n.doc.resolve(e));
        if (!r) return null;
        let i = this.placed,
            a = n.depth,
            o = r.depth;
        for (; a && o && i.childCount == 1;) i = i.firstChild.content, a--, o--;
        let s = new S(i, a, o);
        return e > -1 ? new Dr(n.pos, e, this.$to.pos, this.$to.end(), s, t) : s.size || n.pos != this.$to.pos ? new Er(n.pos, r.pos, s) : null
    }
    findFittable() {
        let e = this.unplaced.openStart;
        for (let t = this.unplaced.content, n = 0, r = this.unplaced.openEnd; n < e; n++) {
            let i = t.firstChild;
            if (t.childCount > 1 && (r = 0), i.type.spec.isolating && r <= n) {
                e = n;
                break
            }
            t = i.content
        }
        for (let t = 1; t <= 2; t++)
            for (let n = t == 1 ? e : this.unplaced.openStart; n >= 0; n--) {
                let e, r = null;
                n ? (r = Gr(this.unplaced.content, n - 1).firstChild, e = r.content) : e = this.unplaced.content;
                let i = e.firstChild;
                for (let e = this.depth; e >= 0; e--) {
                    let {
                        type: a,
                        match: o
                    } = this.frontier[e], s, c = null;
                    if (t == 1 && (i ? o.matchType(i.type) || (c = o.fillBefore(x.from(i), !1)) : r && a.compatibleContent(r.type))) return {
                        sliceDepth: n,
                        frontierDepth: e,
                        parent: r,
                        inject: c
                    };
                    if (t == 2 && i && (s = o.findWrapping(i.type))) return {
                        sliceDepth: n,
                        frontierDepth: e,
                        parent: r,
                        wrap: s
                    };
                    if (r && o.matchType(r.type)) break
                }
            }
    }
    openMore() {
        let {
            content: e,
            openStart: t,
            openEnd: n
        } = this.unplaced, r = Gr(e, t);
        return !r.childCount || r.firstChild.isLeaf ? !1 : (this.unplaced = new S(e, t + 1, Math.max(n, r.size + t >= e.size - n ? t + 1 : 0)), !0)
    }
    dropNode() {
        let {
            content: e,
            openStart: t,
            openEnd: n
        } = this.unplaced, r = Gr(e, t);
        if (r.childCount <= 1 && t > 0) {
            let i = e.size - t <= t + r.size;
            this.unplaced = new S(Ur(e, t - 1, 1), t - 1, i ? t - 1 : n)
        } else this.unplaced = new S(Ur(e, t, 1), t, n)
    }
    placeNodes({
        sliceDepth: e,
        frontierDepth: t,
        parent: n,
        inject: r,
        wrap: i
    }) {
        for (; this.depth > t;) this.closeFrontierNode();
        if (i)
            for (let e = 0; e < i.length; e++) this.openFrontierNode(i[e]);
        let a = this.unplaced,
            o = n ? n.content : a.content,
            s = a.openStart - e,
            c = 0,
            l = [],
            {
                match: u,
                type: d
            } = this.frontier[t];
        if (r) {
            for (let e = 0; e < r.childCount; e++) l.push(r.child(e));
            u = u.matchFragment(r)
        }
        let f = o.size + e - (a.content.size - a.openEnd);
        for (; c < o.childCount;) {
            let e = o.child(c),
                t = u.matchType(e.type);
            if (!t) break;
            c++, (c > 1 || s == 0 || e.content.size) && (u = t, l.push(Kr(e.mark(d.allowedMarks(e.marks)), c == 1 ? s : 0, c == o.childCount ? f : -1)))
        }
        let p = c == o.childCount;
        p || (f = -1), this.placed = Wr(this.placed, t, x.from(l)), this.frontier[t].match = u, p && f < 0 && n && n.type == this.frontier[this.depth].type && this.frontier.length > 1 && this.closeFrontierNode();
        for (let e = 0, t = o; e < f; e++) {
            let e = t.lastChild;
            this.frontier.push({
                type: e.type,
                match: e.contentMatchAt(e.childCount)
            }), t = e.content
        }
        this.unplaced = p ? e == 0 ? S.empty : new S(Ur(a.content, e - 1, 1), e - 1, f < 0 ? a.openEnd : e - 1) : new S(Ur(a.content, e, c), a.openStart, a.openEnd)
    }
    mustMoveInline() {
        if (!this.$to.parent.isTextblock) return -1;
        let e = this.frontier[this.depth],
            t;
        if (!e.type.isTextblock || !qr(this.$to, this.$to.depth, e.type, e.match, !1) || this.$to.depth == this.depth && (t = this.findCloseLevel(this.$to)) && t.depth == this.depth) return -1;
        let {
            depth: n
        } = this.$to, r = this.$to.after(n);
        for (; n > 1 && r == this.$to.end(--n);) ++r;
        return r
    }
    findCloseLevel(e) {
        scan: for (let t = Math.min(this.depth, e.depth); t >= 0; t--) {
            let {
                match: n,
                type: r
            } = this.frontier[t], i = t < e.depth && e.end(t + 1) == e.pos + (e.depth - (t + 1)), a = qr(e, t, r, n, i);
            if (a) {
                for (let n = t - 1; n >= 0; n--) {
                    let {
                        match: t,
                        type: r
                    } = this.frontier[n], i = qr(e, n, r, t, !0);
                    if (!i || i.childCount) continue scan
                }
                return {
                    depth: t,
                    fit: a,
                    move: i ? e.doc.resolve(e.after(t + 1)) : e
                }
            }
        }
    }
    close(e) {
        let t = this.findCloseLevel(e);
        if (!t) return null;
        for (; this.depth > t.depth;) this.closeFrontierNode();
        t.fit.childCount && (this.placed = Wr(this.placed, t.depth, t.fit)), e = t.move;
        for (let n = t.depth + 1; n <= e.depth; n++) {
            let t = e.node(n),
                r = t.type.contentMatch.fillBefore(t.content, !0, e.index(n));
            this.openFrontierNode(t.type, t.attrs, r)
        }
        return e
    }
    openFrontierNode(e, t = null, n) {
        let r = this.frontier[this.depth];
        r.match = r.match.matchType(e), this.placed = Wr(this.placed, this.depth, x.from(e.create(t, n))), this.frontier.push({
            type: e,
            match: e.contentMatch
        })
    }
    closeFrontierNode() {
        let e = this.frontier.pop().match.fillBefore(x.empty, !0);
        e.childCount && (this.placed = Wr(this.placed, this.frontier.length, e))
    }
};

function Ur(e, t, n) {
    return t == 0 ? e.cutByIndex(n, e.childCount) : e.replaceChild(0, e.firstChild.copy(Ur(e.firstChild.content, t - 1, n)))
}

function Wr(e, t, n) {
    return t == 0 ? e.append(n) : e.replaceChild(e.childCount - 1, e.lastChild.copy(Wr(e.lastChild.content, t - 1, n)))
}

function Gr(e, t) {
    for (let n = 0; n < t; n++) e = e.firstChild.content;
    return e
}

function Kr(e, t, n) {
    if (t <= 0) return e;
    let r = e.content;
    return t > 1 && (r = r.replaceChild(0, Kr(r.firstChild, t - 1, r.childCount == 1 ? n - 1 : 0))), t > 0 && (r = e.type.contentMatch.fillBefore(r).append(r), n <= 0 && (r = r.append(e.type.contentMatch.matchFragment(r).fillBefore(x.empty, !0)))), e.copy(r)
}

function qr(e, t, n, r, i) {
    let a = e.node(t),
        o = i ? e.indexAfter(t) : e.index(t);
    if (o == a.childCount && !n.compatibleContent(a.type)) return null;
    let s = r.fillBefore(a.content, !0, o);
    return s && !Jr(n, a.content, o) ? s : null
}

function Jr(e, t, n) {
    for (let r = n; r < t.childCount; r++)
        if (!e.allowsMarks(t.child(r).marks)) return !0;
    return !1
}
var Yr = class e extends C {
    constructor(e, t, n) {
        super(), this.pos = e, this.attr = t, this.value = n
    }
    apply(e) {
        let t = e.nodeAt(this.pos);
        if (!t) return w.fail(`No node at attribute step's position`);
        let n = Object.create(null);
        for (let e in t.attrs) n[e] = t.attrs[e];
        n[this.attr] = this.value;
        let r = t.type.create(n, null, t.marks);
        return w.fromReplace(e, this.pos, this.pos + 1, new S(x.from(r), 0, t.isLeaf ? 0 : 1))
    }
    getMap() {
        return yr.empty
    }
    invert(t) {
        return new e(this.pos, this.attr, t.nodeAt(this.pos).attrs[this.attr])
    }
    map(t) {
        let n = t.mapResult(this.pos, 1);
        return n.deletedAfter ? null : new e(n.pos, this.attr, this.value)
    }
    toJSON() {
        return {
            stepType: `attr`,
            pos: this.pos,
            attr: this.attr,
            value: this.value
        }
    }
    static fromJSON(t, n) {
        if (typeof n.pos != `number` || typeof n.attr != `string`) throw RangeError(`Invalid input for AttrStep.fromJSON`);
        return new e(n.pos, n.attr, n.value)
    }
};
C.jsonID(`attr`, Yr);
var Xr = class e extends C {
    constructor(e, t) {
        super(), this.attr = e, this.value = t
    }
    apply(e) {
        let t = Object.create(null);
        for (let n in e.attrs) t[n] = e.attrs[n];
        t[this.attr] = this.value;
        let n = e.type.create(t, e.content, e.marks);
        return w.ok(n)
    }
    getMap() {
        return yr.empty
    }
    invert(t) {
        return new e(this.attr, t.attrs[this.attr])
    }
    map(e) {
        return this
    }
    toJSON() {
        return {
            stepType: `docAttr`,
            attr: this.attr,
            value: this.value
        }
    }
    static fromJSON(t, n) {
        if (typeof n.attr != `string`) throw RangeError(`Invalid input for DocAttrStep.fromJSON`);
        return new e(n.attr, n.value)
    }
};
C.jsonID(`docAttr`, Xr);
var Zr = class extends Error {};
Zr = function e(t) {
    let n = Error.call(this, t);
    return n.__proto__ = e.prototype, n
}, Zr.prototype = Object.create(Error.prototype), Zr.prototype.constructor = Zr, Zr.prototype.name = `TransformError`;

function Qr(e, t, n) {
    for (let r = 0;; r++) {
        if (r == e.childCount || r == t.childCount) return e.childCount == t.childCount ? null : n;
        let i = e.child(r),
            a = t.child(r);
        if (i == a) {
            n += i.nodeSize;
            continue
        }
        if (!i.sameMarkup(a)) return n;
        if (i.isText && i.text != a.text) {
            for (let e = 0; i.text[e] == a.text[e]; e++) n++;
            return n
        }
        if (i.content.size || a.content.size) {
            let e = Qr(i.content, a.content, n + 1);
            if (e != null) return e
        }
        n += i.nodeSize
    }
}

function $r(e, t, n, r) {
    for (let i = e.childCount, a = t.childCount;;) {
        if (i == 0 || a == 0) return i == a ? null : {
            a: n,
            b: r
        };
        let o = e.child(--i),
            s = t.child(--a),
            c = o.nodeSize;
        if (o == s) {
            n -= c, r -= c;
            continue
        }
        if (!o.sameMarkup(s)) return {
            a: n,
            b: r
        };
        if (o.isText && o.text != s.text) {
            let e = 0,
                t = Math.min(o.text.length, s.text.length);
            for (; e < t && o.text[o.text.length - e - 1] == s.text[s.text.length - e - 1];) e++, n--, r--;
            return {
                a: n,
                b: r
            }
        }
        if (o.content.size || s.content.size) {
            let e = $r(o.content, s.content, n - 1, r - 1);
            if (e) return e
        }
        n -= c, r -= c
    }
}
var T = class e {
    constructor(e, t) {
        if (this.content = e, this.size = t || 0, t == null)
            for (let t = 0; t < e.length; t++) this.size += e[t].nodeSize
    }
    nodesBetween(e, t, n, r = 0, i) {
        for (let a = 0, o = 0; o < t; a++) {
            let s = this.content[a],
                c = o + s.nodeSize;
            if (c > e && n(s, r + o, i || null, a) !== !1 && s.content.size) {
                let i = o + 1;
                s.nodesBetween(Math.max(0, e - i), Math.min(s.content.size, t - i), n, r + i)
            }
            o = c
        }
    }
    descendants(e) {
        this.nodesBetween(0, this.size, e)
    }
    textBetween(e, t, n, r) {
        let i = ``,
            a = !0;
        return this.nodesBetween(e, t, (o, s) => {
            let c = o.isText ? o.text.slice(Math.max(e, s) - s, t - s) : o.isLeaf ? r ? typeof r == `function` ? r(o) : r : o.type.spec.leafText ? o.type.spec.leafText(o) : `` : ``;
            o.isBlock && (o.isLeaf && c || o.isTextblock) && n && (a ? a = !1 : i += n), i += c
        }, 0), i
    }
    append(t) {
        if (!t.size) return this;
        if (!this.size) return t;
        let n = this.lastChild,
            r = t.firstChild,
            i = this.content.slice(),
            a = 0;
        for (n.isText && n.sameMarkup(r) && (i[i.length - 1] = n.withText(n.text + r.text), a = 1); a < t.content.length; a++) i.push(t.content[a]);
        return new e(i, this.size + t.size)
    }
    cut(t, n = this.size) {
        if (t == 0 && n == this.size) return this;
        let r = [],
            i = 0;
        if (n > t)
            for (let e = 0, a = 0; a < n; e++) {
                let o = this.content[e],
                    s = a + o.nodeSize;
                s > t && ((a < t || s > n) && (o = o.isText ? o.cut(Math.max(0, t - a), Math.min(o.text.length, n - a)) : o.cut(Math.max(0, t - a - 1), Math.min(o.content.size, n - a - 1))), r.push(o), i += o.nodeSize), a = s
            }
        return new e(r, i)
    }
    cutByIndex(t, n) {
        return t == n ? e.empty : t == 0 && n == this.content.length ? this : new e(this.content.slice(t, n))
    }
    replaceChild(t, n) {
        let r = this.content[t];
        if (r == n) return this;
        let i = this.content.slice(),
            a = this.size + n.nodeSize - r.nodeSize;
        return i[t] = n, new e(i, a)
    }
    addToStart(t) {
        return new e([t].concat(this.content), this.size + t.nodeSize)
    }
    addToEnd(t) {
        return new e(this.content.concat(t), this.size + t.nodeSize)
    }
    eq(e) {
        if (this.content.length != e.content.length) return !1;
        for (let t = 0; t < this.content.length; t++)
            if (!this.content[t].eq(e.content[t])) return !1;
        return !0
    }
    get firstChild() {
        return this.content.length ? this.content[0] : null
    }
    get lastChild() {
        return this.content.length ? this.content[this.content.length - 1] : null
    }
    get childCount() {
        return this.content.length
    }
    child(e) {
        let t = this.content[e];
        if (!t) throw RangeError(`Index ` + e + ` out of range for ` + this);
        return t
    }
    maybeChild(e) {
        return this.content[e] || null
    }
    forEach(e) {
        for (let t = 0, n = 0; t < this.content.length; t++) {
            let r = this.content[t];
            e(r, n, t), n += r.nodeSize
        }
    }
    findDiffStart(e, t = 0) {
        return Qr(this, e, t)
    }
    findDiffEnd(e, t = this.size, n = e.size) {
        return $r(this, e, t, n)
    }
    findIndex(e) {
        if (e == 0) return ti(0, e);
        if (e == this.size) return ti(this.content.length, e);
        if (e > this.size || e < 0) throw RangeError(`Position ${e} outside of fragment (${this})`);
        for (let t = 0, n = 0;; t++) {
            let r = this.child(t),
                i = n + r.nodeSize;
            if (i >= e) return i == e ? ti(t + 1, i) : ti(t, n);
            n = i
        }
    }
    toString() {
        return `<` + this.toStringInner() + `>`
    }
    toStringInner() {
        return this.content.join(`, `)
    }
    toJSON() {
        return this.content.length ? this.content.map(e => e.toJSON()) : null
    }
    static fromJSON(t, n) {
        if (!n) return e.empty;
        if (!Array.isArray(n)) throw RangeError(`Invalid input for Fragment.fromJSON`);
        return new e(n.map(t.nodeFromJSON))
    }
    static fromArray(t) {
        if (!t.length) return e.empty;
        let n, r = 0;
        for (let e = 0; e < t.length; e++) {
            let i = t[e];
            r += i.nodeSize, e && i.isText && t[e - 1].sameMarkup(i) ? (n ||= t.slice(0, e), n[n.length - 1] = i.withText(n[n.length - 1].text + i.text)) : n && n.push(i)
        }
        return new e(n || t, r)
    }
    static from(t) {
        if (!t) return e.empty;
        if (t instanceof e) return t;
        if (Array.isArray(t)) return this.fromArray(t);
        if (t.attrs) return new e([t], t.nodeSize);
        throw RangeError(`Can not convert ` + t + ` to a Fragment` + (t.nodesBetween ? ` (looks like multiple versions of prosemirror-model were loaded)` : ``))
    }
};
T.empty = new T([], 0);
var ei = {
    index: 0,
    offset: 0
};

function ti(e, t) {
    return ei.index = e, ei.offset = t, ei
}

function ni(e, t) {
    if (e === t) return !0;
    if (!(e && typeof e == `object`) || !(t && typeof t == `object`)) return !1;
    let n = Array.isArray(e);
    if (Array.isArray(t) != n) return !1;
    if (n) {
        if (e.length != t.length) return !1;
        for (let n = 0; n < e.length; n++)
            if (!ni(e[n], t[n])) return !1
    } else {
        for (let n in e)
            if (!(n in t) || !ni(e[n], t[n])) return !1;
        for (let n in t)
            if (!(n in e)) return !1
    }
    return !0
}
var E = class e {
    constructor(e, t) {
        this.type = e, this.attrs = t
    }
    addToSet(e) {
        let t, n = !1;
        for (let r = 0; r < e.length; r++) {
            let i = e[r];
            if (this.eq(i)) return e;
            if (this.type.excludes(i.type)) t ||= e.slice(0, r);
            else if (i.type.excludes(this.type)) return e;
            else !n && i.type.rank > this.type.rank && (t ||= e.slice(0, r), t.push(this), n = !0), t && t.push(i)
        }
        return t ||= e.slice(), n || t.push(this), t
    }
    removeFromSet(e) {
        for (let t = 0; t < e.length; t++)
            if (this.eq(e[t])) return e.slice(0, t).concat(e.slice(t + 1));
        return e
    }
    isInSet(e) {
        for (let t = 0; t < e.length; t++)
            if (this.eq(e[t])) return !0;
        return !1
    }
    eq(e) {
        return this == e || this.type == e.type && ni(this.attrs, e.attrs)
    }
    toJSON() {
        let e = {
            type: this.type.name
        };
        for (let t in this.attrs) {
            e.attrs = this.attrs;
            break
        }
        return e
    }
    static fromJSON(e, t) {
        if (!t) throw RangeError(`Invalid input for Mark.fromJSON`);
        let n = e.marks[t.type];
        if (!n) throw RangeError(`There is no mark type ${t.type} in this schema`);
        let r = n.create(t.attrs);
        return n.checkAttrs(r.attrs), r
    }
    static sameSet(e, t) {
        if (e == t) return !0;
        if (e.length != t.length) return !1;
        for (let n = 0; n < e.length; n++)
            if (!e[n].eq(t[n])) return !1;
        return !0
    }
    static setFrom(t) {
        if (!t || Array.isArray(t) && t.length == 0) return e.none;
        if (t instanceof e) return [t];
        let n = t.slice();
        return n.sort((e, t) => e.type.rank - t.type.rank), n
    }
};
E.none = [];
var ri = class extends Error {},
    D = class e {
        constructor(e, t, n) {
            this.content = e, this.openStart = t, this.openEnd = n
        }
        get size() {
            return this.content.size - this.openStart - this.openEnd
        }
        insertAt(t, n) {
            let r = ai(this.content, t + this.openStart, n);
            return r && new e(r, this.openStart, this.openEnd)
        }
        removeBetween(t, n) {
            return new e(ii(this.content, t + this.openStart, n + this.openStart), this.openStart, this.openEnd)
        }
        eq(e) {
            return this.content.eq(e.content) && this.openStart == e.openStart && this.openEnd == e.openEnd
        }
        toString() {
            return this.content + `(` + this.openStart + `,` + this.openEnd + `)`
        }
        toJSON() {
            if (!this.content.size) return null;
            let e = {
                content: this.content.toJSON()
            };
            return this.openStart > 0 && (e.openStart = this.openStart), this.openEnd > 0 && (e.openEnd = this.openEnd), e
        }
        static fromJSON(t, n) {
            if (!n) return e.empty;
            let r = n.openStart || 0,
                i = n.openEnd || 0;
            if (typeof r != `number` || typeof i != `number`) throw RangeError(`Invalid input for Slice.fromJSON`);
            return new e(T.fromJSON(t, n.content), r, i)
        }
        static maxOpen(t, n = !0) {
            let r = 0,
                i = 0;
            for (let e = t.firstChild; e && !e.isLeaf && (n || !e.type.spec.isolating); e = e.firstChild) r++;
            for (let e = t.lastChild; e && !e.isLeaf && (n || !e.type.spec.isolating); e = e.lastChild) i++;
            return new e(t, r, i)
        }
    };
D.empty = new D(T.empty, 0, 0);

function ii(e, t, n) {
    let {
        index: r,
        offset: i
    } = e.findIndex(t), a = e.maybeChild(r), {
        index: o,
        offset: s
    } = e.findIndex(n);
    if (i == t || a.isText) {
        if (s != n && !e.child(o).isText) throw RangeError(`Removing non-flat range`);
        return e.cut(0, t).append(e.cut(n))
    }
    if (r != o) throw RangeError(`Removing non-flat range`);
    return e.replaceChild(r, a.copy(ii(a.content, t - i - 1, n - i - 1)))
}

function ai(e, t, n, r) {
    let {
        index: i,
        offset: a
    } = e.findIndex(t), o = e.maybeChild(i);
    if (a == t || o.isText) return r && !r.canReplace(i, i, n) ? null : e.cut(0, t).append(n).append(e.cut(t));
    let s = ai(o.content, t - a - 1, n, o);
    return s && e.replaceChild(i, o.copy(s))
}

function oi(e, t, n) {
    if (n.openStart > e.depth) throw new ri(`Inserted content deeper than insertion position`);
    if (e.depth - n.openStart != t.depth - n.openEnd) throw new ri(`Inconsistent open depths`);
    return si(e, t, n, 0)
}

function si(e, t, n, r) {
    let i = e.index(r),
        a = e.node(r);
    if (i == t.index(r) && r < e.depth - n.openStart) {
        let o = si(e, t, n, r + 1);
        return a.copy(a.content.replaceChild(i, o))
    } else if (n.content.size)
        if (!n.openStart && !n.openEnd && e.depth == r && t.depth == r) {
            let r = e.parent,
                i = r.content;
            return fi(r, i.cut(0, e.parentOffset).append(n.content).append(i.cut(t.parentOffset)))
        } else {
            let {
                start: i,
                end: o
            } = hi(n, e);
            return fi(a, pi(e, i, o, t, r))
        }
    else return fi(a, mi(e, t, r))
}

function ci(e, t) {
    if (!t.type.compatibleContent(e.type)) throw new ri(`Cannot join ` + t.type.name + ` onto ` + e.type.name)
}

function li(e, t, n) {
    let r = e.node(n);
    return ci(r, t.node(n)), r
}

function ui(e, t) {
    let n = t.length - 1;
    n >= 0 && e.isText && e.sameMarkup(t[n]) ? t[n] = e.withText(t[n].text + e.text) : t.push(e)
}

function di(e, t, n, r) {
    let i = (t || e).node(n),
        a = 0,
        o = t ? t.index(n) : i.childCount;
    e && (a = e.index(n), e.depth > n ? a++ : e.textOffset && (ui(e.nodeAfter, r), a++));
    for (let e = a; e < o; e++) ui(i.child(e), r);
    t && t.depth == n && t.textOffset && ui(t.nodeBefore, r)
}

function fi(e, t) {
    return e.type.checkContent(t), e.copy(t)
}

function pi(e, t, n, r, i) {
    let a = e.depth > i && li(e, t, i + 1),
        o = r.depth > i && li(n, r, i + 1),
        s = [];
    return di(null, e, i, s), a && o && t.index(i) == n.index(i) ? (ci(a, o), ui(fi(a, pi(e, t, n, r, i + 1)), s)) : (a && ui(fi(a, mi(e, t, i + 1)), s), di(t, n, i, s), o && ui(fi(o, mi(n, r, i + 1)), s)), di(r, null, i, s), new T(s)
}

function mi(e, t, n) {
    let r = [];
    return di(null, e, n, r), e.depth > n && ui(fi(li(e, t, n + 1), mi(e, t, n + 1)), r), di(t, null, n, r), new T(r)
}

function hi(e, t) {
    let n = t.depth - e.openStart,
        r = t.node(n).copy(e.content);
    for (let e = n - 1; e >= 0; e--) r = t.node(e).copy(T.from(r));
    return {
        start: r.resolveNoCache(e.openStart + n),
        end: r.resolveNoCache(r.content.size - e.openEnd - n)
    }
}
var gi = class e {
        constructor(e, t, n) {
            this.pos = e, this.path = t, this.parentOffset = n, this.depth = t.length / 3 - 1
        }
        resolveDepth(e) {
            return e == null ? this.depth : e < 0 ? this.depth + e : e
        }
        get parent() {
            return this.node(this.depth)
        }
        get doc() {
            return this.node(0)
        }
        node(e) {
            return this.path[this.resolveDepth(e) * 3]
        }
        index(e) {
            return this.path[this.resolveDepth(e) * 3 + 1]
        }
        indexAfter(e) {
            return e = this.resolveDepth(e), this.index(e) + (e == this.depth && !this.textOffset ? 0 : 1)
        }
        start(e) {
            return e = this.resolveDepth(e), e == 0 ? 0 : this.path[e * 3 - 1] + 1
        }
        end(e) {
            return e = this.resolveDepth(e), this.start(e) + this.node(e).content.size
        }
        before(e) {
            if (e = this.resolveDepth(e), !e) throw RangeError(`There is no position before the top-level node`);
            return e == this.depth + 1 ? this.pos : this.path[e * 3 - 1]
        }
        after(e) {
            if (e = this.resolveDepth(e), !e) throw RangeError(`There is no position after the top-level node`);
            return e == this.depth + 1 ? this.pos : this.path[e * 3 - 1] + this.path[e * 3].nodeSize
        }
        get textOffset() {
            return this.pos - this.path[this.path.length - 1]
        }
        get nodeAfter() {
            let e = this.parent,
                t = this.index(this.depth);
            if (t == e.childCount) return null;
            let n = this.pos - this.path[this.path.length - 1],
                r = e.child(t);
            return n ? e.child(t).cut(n) : r
        }
        get nodeBefore() {
            let e = this.index(this.depth),
                t = this.pos - this.path[this.path.length - 1];
            return t ? this.parent.child(e).cut(0, t) : e == 0 ? null : this.parent.child(e - 1)
        }
        posAtIndex(e, t) {
            t = this.resolveDepth(t);
            let n = this.path[t * 3],
                r = t == 0 ? 0 : this.path[t * 3 - 1] + 1;
            for (let t = 0; t < e; t++) r += n.child(t).nodeSize;
            return r
        }
        marks() {
            let e = this.parent,
                t = this.index();
            if (e.content.size == 0) return E.none;
            if (this.textOffset) return e.child(t).marks;
            let n = e.maybeChild(t - 1),
                r = e.maybeChild(t);
            if (!n) {
                let e = n;
                n = r, r = e
            }
            let i = n.marks;
            for (var a = 0; a < i.length; a++) i[a].type.spec.inclusive === !1 && (!r || !i[a].isInSet(r.marks)) && (i = i[a--].removeFromSet(i));
            return i
        }
        marksAcross(e) {
            let t = this.parent.maybeChild(this.index());
            if (!t || !t.isInline) return null;
            let n = t.marks,
                r = e.parent.maybeChild(e.index());
            for (var i = 0; i < n.length; i++) n[i].type.spec.inclusive === !1 && (!r || !n[i].isInSet(r.marks)) && (n = n[i--].removeFromSet(n));
            return n
        }
        sharedDepth(e) {
            for (let t = this.depth; t > 0; t--)
                if (this.start(t) <= e && this.end(t) >= e) return t;
            return 0
        }
        blockRange(e = this, t) {
            if (e.pos < this.pos) return e.blockRange(this);
            for (let n = this.depth - (this.parent.inlineContent || this.pos == e.pos ? 1 : 0); n >= 0; n--)
                if (e.pos <= this.end(n) && (!t || t(this.node(n)))) return new bi(this, e, n);
            return null
        }
        sameParent(e) {
            return this.pos - this.parentOffset == e.pos - e.parentOffset
        }
        max(e) {
            return e.pos > this.pos ? e : this
        }
        min(e) {
            return e.pos < this.pos ? e : this
        }
        toString() {
            let e = ``;
            for (let t = 1; t <= this.depth; t++) e += (e ? `/` : ``) + this.node(t).type.name + `_` + this.index(t - 1);
            return e + `:` + this.parentOffset
        }
        static resolve(t, n) {
            if (!(n >= 0 && n <= t.content.size)) throw RangeError(`Position ` + n + ` out of range`);
            let r = [],
                i = 0,
                a = n;
            for (let e = t;;) {
                let {
                    index: t,
                    offset: n
                } = e.content.findIndex(a), o = a - n;
                if (r.push(e, t, i + n), !o || (e = e.child(t), e.isText)) break;
                a = o - 1, i += n + 1
            }
            return new e(n, r, a)
        }
        static resolveCached(t, n) {
            let r = yi.get(t);
            if (r)
                for (let e = 0; e < r.elts.length; e++) {
                    let t = r.elts[e];
                    if (t.pos == n) return t
                } else yi.set(t, r = new _i);
            let i = r.elts[r.i] = e.resolve(t, n);
            return r.i = (r.i + 1) % vi, i
        }
    },
    _i = class {
        constructor() {
            this.elts = [], this.i = 0
        }
    },
    vi = 12,
    yi = new WeakMap,
    bi = class {
        constructor(e, t, n) {
            this.$from = e, this.$to = t, this.depth = n
        }
        get start() {
            return this.$from.before(this.depth + 1)
        }
        get end() {
            return this.$to.after(this.depth + 1)
        }
        get parent() {
            return this.$from.node(this.depth)
        }
        get startIndex() {
            return this.$from.index(this.depth)
        }
        get endIndex() {
            return this.$to.indexAfter(this.depth)
        }
    },
    xi = Object.create(null),
    Si = class e {
        constructor(e, t, n, r = E.none) {
            this.type = e, this.attrs = t, this.marks = r, this.content = n || T.empty
        }
        get children() {
            return this.content.content
        }
        get nodeSize() {
            return this.isLeaf ? 1 : 2 + this.content.size
        }
        get childCount() {
            return this.content.childCount
        }
        child(e) {
            return this.content.child(e)
        }
        maybeChild(e) {
            return this.content.maybeChild(e)
        }
        forEach(e) {
            this.content.forEach(e)
        }
        nodesBetween(e, t, n, r = 0) {
            this.content.nodesBetween(e, t, n, r, this)
        }
        descendants(e) {
            this.nodesBetween(0, this.content.size, e)
        }
        get textContent() {
            return this.isLeaf && this.type.spec.leafText ? this.type.spec.leafText(this) : this.textBetween(0, this.content.size, ``)
        }
        textBetween(e, t, n, r) {
            return this.content.textBetween(e, t, n, r)
        }
        get firstChild() {
            return this.content.firstChild
        }
        get lastChild() {
            return this.content.lastChild
        }
        eq(e) {
            return this == e || this.sameMarkup(e) && this.content.eq(e.content)
        }
        sameMarkup(e) {
            return this.hasMarkup(e.type, e.attrs, e.marks)
        }
        hasMarkup(e, t, n) {
            return this.type == e && ni(this.attrs, t || e.defaultAttrs || xi) && E.sameSet(this.marks, n || E.none)
        }
        copy(t = null) {
            return t == this.content ? this : new e(this.type, this.attrs, t, this.marks)
        }
        mark(t) {
            return t == this.marks ? this : new e(this.type, this.attrs, this.content, t)
        }
        cut(e, t = this.content.size) {
            return e == 0 && t == this.content.size ? this : this.copy(this.content.cut(e, t))
        }
        slice(e, t = this.content.size, n = !1) {
            if (e == t) return D.empty;
            let r = this.resolve(e),
                i = this.resolve(t),
                a = n ? 0 : r.sharedDepth(t),
                o = r.start(a);
            return new D(r.node(a).content.cut(r.pos - o, i.pos - o), r.depth - a, i.depth - a)
        }
        replace(e, t, n) {
            return oi(this.resolve(e), this.resolve(t), n)
        }
        nodeAt(e) {
            for (let t = this;;) {
                let {
                    index: n,
                    offset: r
                } = t.content.findIndex(e);
                if (t = t.maybeChild(n), !t) return null;
                if (r == e || t.isText) return t;
                e -= r + 1
            }
        }
        childAfter(e) {
            let {
                index: t,
                offset: n
            } = this.content.findIndex(e);
            return {
                node: this.content.maybeChild(t),
                index: t,
                offset: n
            }
        }
        childBefore(e) {
            if (e == 0) return {
                node: null,
                index: 0,
                offset: 0
            };
            let {
                index: t,
                offset: n
            } = this.content.findIndex(e);
            if (n < e) return {
                node: this.content.child(t),
                index: t,
                offset: n
            };
            let r = this.content.child(t - 1);
            return {
                node: r,
                index: t - 1,
                offset: n - r.nodeSize
            }
        }
        resolve(e) {
            return gi.resolveCached(this, e)
        }
        resolveNoCache(e) {
            return gi.resolve(this, e)
        }
        rangeHasMark(e, t, n) {
            let r = !1;
            return t > e && this.nodesBetween(e, t, e => (n.isInSet(e.marks) && (r = !0), !r)), r
        }
        get isBlock() {
            return this.type.isBlock
        }
        get isTextblock() {
            return this.type.isTextblock
        }
        get inlineContent() {
            return this.type.inlineContent
        }
        get isInline() {
            return this.type.isInline
        }
        get isText() {
            return this.type.isText
        }
        get isLeaf() {
            return this.type.isLeaf
        }
        get isAtom() {
            return this.type.isAtom
        }
        toString() {
            if (this.type.spec.toDebugString) return this.type.spec.toDebugString(this);
            let e = this.type.name;
            return this.content.size && (e += `(` + this.content.toStringInner() + `)`), Ci(this.marks, e)
        }
        contentMatchAt(e) {
            let t = this.type.contentMatch.matchFragment(this.content, 0, e);
            if (!t) throw Error(`Called contentMatchAt on a node with invalid content`);
            return t
        }
        canReplace(e, t, n = T.empty, r = 0, i = n.childCount) {
            let a = this.contentMatchAt(e).matchFragment(n, r, i),
                o = a && a.matchFragment(this.content, t);
            if (!o || !o.validEnd) return !1;
            for (let e = r; e < i; e++)
                if (!this.type.allowsMarks(n.child(e).marks)) return !1;
            return !0
        }
        canReplaceWith(e, t, n, r) {
            if (r && !this.type.allowsMarks(r)) return !1;
            let i = this.contentMatchAt(e).matchType(n),
                a = i && i.matchFragment(this.content, t);
            return a ? a.validEnd : !1
        }
        canAppend(e) {
            return e.content.size ? this.canReplace(this.childCount, this.childCount, e.content) : this.type.compatibleContent(e.type)
        }
        check() {
            this.type.checkContent(this.content), this.type.checkAttrs(this.attrs);
            let e = E.none;
            for (let t = 0; t < this.marks.length; t++) {
                let n = this.marks[t];
                n.type.checkAttrs(n.attrs), e = n.addToSet(e)
            }
            if (!E.sameSet(e, this.marks)) throw RangeError(`Invalid collection of marks for node ${this.type.name}: ${this.marks.map(e=>e.type.name)}`);
            this.content.forEach(e => e.check())
        }
        toJSON() {
            let e = {
                type: this.type.name
            };
            for (let t in this.attrs) {
                e.attrs = this.attrs;
                break
            }
            return this.content.size && (e.content = this.content.toJSON()), this.marks.length && (e.marks = this.marks.map(e => e.toJSON())), e
        }
        static fromJSON(e, t) {
            if (!t) throw RangeError(`Invalid input for Node.fromJSON`);
            let n;
            if (t.marks) {
                if (!Array.isArray(t.marks)) throw RangeError(`Invalid mark data for Node.fromJSON`);
                n = t.marks.map(e.markFromJSON)
            }
            if (t.type == `text`) {
                if (typeof t.text != `string`) throw RangeError(`Invalid text node in JSON`);
                return e.text(t.text, n)
            }
            let r = T.fromJSON(e, t.content),
                i = e.nodeType(t.type).create(t.attrs, r, n);
            return i.type.checkAttrs(i.attrs), i
        }
    };
Si.prototype.text = void 0;

function Ci(e, t) {
    for (let n = e.length - 1; n >= 0; n--) t = e[n].type.name + `(` + t + `)`;
    return t
}
var wi = class e {
    constructor(e) {
        this.validEnd = e, this.next = [], this.wrapCache = []
    }
    static parse(t, n) {
        let r = new Ti(t, n);
        if (r.next == null) return e.empty;
        let i = Ei(r);
        r.next && r.err(`Unexpected trailing text`);
        let a = Ii(Ni(i));
        return Li(a, r), a
    }
    matchType(e) {
        for (let t = 0; t < this.next.length; t++)
            if (this.next[t].type == e) return this.next[t].next;
        return null
    }
    matchFragment(e, t = 0, n = e.childCount) {
        let r = this;
        for (let i = t; r && i < n; i++) r = r.matchType(e.child(i).type);
        return r
    }
    get inlineContent() {
        return this.next.length != 0 && this.next[0].type.isInline
    }
    get defaultType() {
        for (let e = 0; e < this.next.length; e++) {
            let {
                type: t
            } = this.next[e];
            if (!(t.isText || t.hasRequiredAttrs())) return t
        }
        return null
    }
    compatible(e) {
        for (let t = 0; t < this.next.length; t++)
            for (let n = 0; n < e.next.length; n++)
                if (this.next[t].type == e.next[n].type) return !0;
        return !1
    }
    fillBefore(e, t = !1, n = 0) {
        let r = [this];

        function i(a, o) {
            let s = a.matchFragment(e, n);
            if (s && (!t || s.validEnd)) return T.from(o.map(e => e.createAndFill()));
            for (let e = 0; e < a.next.length; e++) {
                let {
                    type: t,
                    next: n
                } = a.next[e];
                if (!(t.isText || t.hasRequiredAttrs()) && r.indexOf(n) == -1) {
                    r.push(n);
                    let e = i(n, o.concat(t));
                    if (e) return e
                }
            }
            return null
        }
        return i(this, [])
    }
    findWrapping(e) {
        for (let t = 0; t < this.wrapCache.length; t += 2)
            if (this.wrapCache[t] == e) return this.wrapCache[t + 1];
        let t = this.computeWrapping(e);
        return this.wrapCache.push(e, t), t
    }
    computeWrapping(e) {
        let t = Object.create(null),
            n = [{
                match: this,
                type: null,
                via: null
            }];
        for (; n.length;) {
            let r = n.shift(),
                i = r.match;
            if (i.matchType(e)) {
                let e = [];
                for (let t = r; t.type; t = t.via) e.push(t.type);
                return e.reverse()
            }
            for (let e = 0; e < i.next.length; e++) {
                let {
                    type: a,
                    next: o
                } = i.next[e];
                !a.isLeaf && !a.hasRequiredAttrs() && !(a.name in t) && (!r.type || o.validEnd) && (n.push({
                    match: a.contentMatch,
                    type: a,
                    via: r
                }), t[a.name] = !0)
            }
        }
        return null
    }
    get edgeCount() {
        return this.next.length
    }
    edge(e) {
        if (e >= this.next.length) throw RangeError(`There's no ${e}th edge in this content match`);
        return this.next[e]
    }
    toString() {
        let e = [];

        function t(n) {
            e.push(n);
            for (let r = 0; r < n.next.length; r++) e.indexOf(n.next[r].next) == -1 && t(n.next[r].next)
        }
        return t(this), e.map((t, n) => {
            let r = n + (t.validEnd ? `*` : ` `) + ` `;
            for (let n = 0; n < t.next.length; n++) r += (n ? `, ` : ``) + t.next[n].type.name + `->` + e.indexOf(t.next[n].next);
            return r
        }).join(`
`)
    }
};
wi.empty = new wi(!0);
var Ti = class {
    constructor(e, t) {
        this.string = e, this.nodeTypes = t, this.inline = null, this.pos = 0, this.tokens = e.split(/\s*(?=\b|\W|$)/), this.tokens[this.tokens.length - 1] == `` && this.tokens.pop(), this.tokens[0] == `` && this.tokens.shift()
    }
    get next() {
        return this.tokens[this.pos]
    }
    eat(e) {
        return this.next == e && (this.pos++ || !0)
    }
    err(e) {
        throw SyntaxError(e + ` (in content expression '` + this.string + `')`)
    }
};

function Ei(e) {
    let t = [];
    do t.push(Di(e)); while (e.eat(`|`));
    return t.length == 1 ? t[0] : {
        type: `choice`,
        exprs: t
    }
}

function Di(e) {
    let t = [];
    do t.push(Oi(e)); while (e.next && e.next != `)` && e.next != `|`);
    return t.length == 1 ? t[0] : {
        type: `seq`,
        exprs: t
    }
}

function Oi(e) {
    let t = Mi(e);
    for (;;)
        if (e.eat(`+`)) t = {
            type: `plus`,
            expr: t
        };
        else if (e.eat(`*`)) t = {
        type: `star`,
        expr: t
    };
    else if (e.eat(`?`)) t = {
        type: `opt`,
        expr: t
    };
    else if (e.eat(`{`)) t = Ai(e, t);
    else break;
    return t
}

function ki(e) {
    /\D/.test(e.next) && e.err(`Expected number, got '` + e.next + `'`);
    let t = Number(e.next);
    return e.pos++, t
}

function Ai(e, t) {
    let n = ki(e),
        r = n;
    return e.eat(`,`) && (r = e.next == `}` ? -1 : ki(e)), e.eat(`}`) || e.err(`Unclosed braced range`), {
        type: `range`,
        min: n,
        max: r,
        expr: t
    }
}

function ji(e, t) {
    let n = e.nodeTypes,
        r = n[t];
    if (r) return [r];
    let i = [];
    for (let e in n) {
        let r = n[e];
        r.isInGroup(t) && i.push(r)
    }
    return i.length == 0 && e.err(`No node type or group '` + t + `' found`), i
}

function Mi(e) {
    if (e.eat(`(`)) {
        let t = Ei(e);
        return e.eat(`)`) || e.err(`Missing closing paren`), t
    } else if (/\W/.test(e.next)) e.err(`Unexpected token '` + e.next + `'`);
    else {
        let t = ji(e, e.next).map(t => (e.inline == null ? e.inline = t.isInline : e.inline != t.isInline && e.err(`Mixing inline and block content`), {
            type: `name`,
            value: t
        }));
        return e.pos++, t.length == 1 ? t[0] : {
            type: `choice`,
            exprs: t
        }
    }
}

function Ni(e) {
    let t = [
        []
    ];
    return i(a(e, 0), n()), t;

    function n() {
        return t.push([]) - 1
    }

    function r(e, n, r) {
        let i = {
            term: r,
            to: n
        };
        return t[e].push(i), i
    }

    function i(e, t) {
        e.forEach(e => e.to = t)
    }

    function a(e, t) {
        if (e.type == `choice`) return e.exprs.reduce((e, n) => e.concat(a(n, t)), []);
        if (e.type == `seq`)
            for (let r = 0;; r++) {
                let o = a(e.exprs[r], t);
                if (r == e.exprs.length - 1) return o;
                i(o, t = n())
            } else if (e.type == `star`) {
                let o = n();
                return r(t, o), i(a(e.expr, o), o), [r(o)]
            } else if (e.type == `plus`) {
            let o = n();
            return i(a(e.expr, t), o), i(a(e.expr, o), o), [r(o)]
        } else if (e.type == `opt`) return [r(t)].concat(a(e.expr, t));
        else if (e.type == `range`) {
            let o = t;
            for (let t = 0; t < e.min; t++) {
                let t = n();
                i(a(e.expr, o), t), o = t
            }
            if (e.max == -1) i(a(e.expr, o), o);
            else
                for (let t = e.min; t < e.max; t++) {
                    let t = n();
                    r(o, t), i(a(e.expr, o), t), o = t
                }
            return [r(o)]
        } else if (e.type == `name`) return [r(t, void 0, e.value)];
        else throw Error(`Unknown expr type`)
    }
}

function Pi(e, t) {
    return t - e
}

function Fi(e, t) {
    let n = [];
    return r(t), n.sort(Pi);

    function r(t) {
        let i = e[t];
        if (i.length == 1 && !i[0].term) return r(i[0].to);
        n.push(t);
        for (let e = 0; e < i.length; e++) {
            let {
                term: t,
                to: a
            } = i[e];
            !t && n.indexOf(a) == -1 && r(a)
        }
    }
}

function Ii(e) {
    let t = Object.create(null);
    return n(Fi(e, 0));

    function n(r) {
        let i = [];
        r.forEach(t => {
            e[t].forEach(({
                term: t,
                to: n
            }) => {
                if (!t) return;
                let r;
                for (let e = 0; e < i.length; e++) i[e][0] == t && (r = i[e][1]);
                Fi(e, n).forEach(e => {
                    r || i.push([t, r = []]), r.indexOf(e) == -1 && r.push(e)
                })
            })
        });
        let a = t[r.join(`,`)] = new wi(r.indexOf(e.length - 1) > -1);
        for (let e = 0; e < i.length; e++) {
            let r = i[e][1].sort(Pi);
            a.next.push({
                type: i[e][0],
                next: t[r.join(`,`)] || n(r)
            })
        }
        return a
    }
}

function Li(e, t) {
    for (let n = 0, r = [e]; n < r.length; n++) {
        let e = r[n],
            i = !e.validEnd,
            a = [];
        for (let t = 0; t < e.next.length; t++) {
            let {
                type: n,
                next: o
            } = e.next[t];
            a.push(n.name), i && !(n.isText || n.hasRequiredAttrs()) && (i = !1), r.indexOf(o) == -1 && r.push(o)
        }
        i && t.err(`Only non-generatable nodes (` + a.join(`, `) + `) in a required position (see https://prosemirror.net/docs/guide/#generatable)`)
    }
}

function Ri(e) {
    let t = Object.create(null);
    for (let n in e) {
        let r = e[n];
        if (!r.hasDefault) return null;
        t[n] = r.default
    }
    return t
}

function zi(e, t) {
    let n = Object.create(null);
    for (let r in e) {
        let i = t && t[r];
        if (i === void 0) {
            let t = e[r];
            if (t.hasDefault) i = t.default;
            else throw RangeError(`No value supplied for attribute ` + r)
        }
        n[r] = i
    }
    return n
}

function Bi(e, t, n, r) {
    for (let r in t)
        if (!(r in e)) throw RangeError(`Unsupported attribute ${r} for ${n} of type ${r}`);
    for (let n in e) {
        let r = e[n];
        r.validate && r.validate(t[n])
    }
}

function Vi(e, t) {
    let n = Object.create(null);
    if (t)
        for (let r in t) n[r] = new Ui(e, r, t[r]);
    return n
}

function Hi(e, t, n) {
    let r = n.split(`|`);
    return n => {
        let i = n === null ? `null` : typeof n;
        if (r.indexOf(i) < 0) throw RangeError(`Expected value of type ${r} for attribute ${t} on type ${e}, got ${i}`)
    }
}
var Ui = class {
        constructor(e, t, n) {
            this.hasDefault = Object.prototype.hasOwnProperty.call(n, `default`), this.default = n.default, this.validate = typeof n.validate == `string` ? Hi(e, t, n.validate) : n.validate
        }
        get isRequired() {
            return !this.hasDefault
        }
    },
    Wi = class e {
        constructor(e, t, n, r) {
            this.name = e, this.rank = t, this.schema = n, this.spec = r, this.attrs = Vi(e, r.attrs), this.excluded = null;
            let i = Ri(this.attrs);
            this.instance = i ? new E(this, i) : null
        }
        create(e = null) {
            return !e && this.instance ? this.instance : new E(this, zi(this.attrs, e))
        }
        static compile(t, n) {
            let r = Object.create(null),
                i = 0;
            return t.forEach((t, a) => r[t] = new e(t, i++, n, a)), r
        }
        removeFromSet(e) {
            for (var t = 0; t < e.length; t++) e[t].type == this && (e = e.slice(0, t).concat(e.slice(t + 1)), t--);
            return e
        }
        isInSet(e) {
            for (let t = 0; t < e.length; t++)
                if (e[t].type == this) return e[t]
        }
        checkAttrs(e) {
            Bi(this.attrs, e, `mark`, this.name)
        }
        excludes(e) {
            return this.excluded.indexOf(e) > -1
        }
    },
    Gi = 65535,
    Ki = 2 ** 16;

function qi(e, t) {
    return e + t * Ki
}

function Ji(e) {
    return e & Gi
}

function Yi(e) {
    return (e - (e & Gi)) / Ki
}
var Xi = 1,
    Zi = 2,
    Qi = 4,
    $i = 8,
    ea = class {
        constructor(e, t, n) {
            this.pos = e, this.delInfo = t, this.recover = n
        }
        get deleted() {
            return (this.delInfo & $i) > 0
        }
        get deletedBefore() {
            return (this.delInfo & (Xi | Qi)) > 0
        }
        get deletedAfter() {
            return (this.delInfo & (Zi | Qi)) > 0
        }
        get deletedAcross() {
            return (this.delInfo & Qi) > 0
        }
    },
    ta = class e {
        constructor(t, n = !1) {
            if (this.ranges = t, this.inverted = n, !t.length && e.empty) return e.empty
        }
        recover(e) {
            let t = 0,
                n = Ji(e);
            if (!this.inverted)
                for (let e = 0; e < n; e++) t += this.ranges[e * 3 + 2] - this.ranges[e * 3 + 1];
            return this.ranges[n * 3] + t + Yi(e)
        }
        mapResult(e, t = 1) {
            return this._map(e, t, !1)
        }
        map(e, t = 1) {
            return this._map(e, t, !0)
        }
        _map(e, t, n) {
            let r = 0,
                i = this.inverted ? 2 : 1,
                a = this.inverted ? 1 : 2;
            for (let o = 0; o < this.ranges.length; o += 3) {
                let s = this.ranges[o] - (this.inverted ? r : 0);
                if (s > e) break;
                let c = this.ranges[o + i],
                    l = this.ranges[o + a],
                    u = s + c;
                if (e <= u) {
                    let i = c ? e == s ? -1 : e == u ? 1 : t : t,
                        a = s + r + (i < 0 ? 0 : l);
                    if (n) return a;
                    let d = e == (t < 0 ? s : u) ? null : qi(o / 3, e - s),
                        f = e == s ? Zi : e == u ? Xi : Qi;
                    return (t < 0 ? e != s : e != u) && (f |= $i), new ea(a, f, d)
                }
                r += l - c
            }
            return n ? e + r : new ea(e + r, 0, null)
        }
        touches(e, t) {
            let n = 0,
                r = Ji(t),
                i = this.inverted ? 2 : 1,
                a = this.inverted ? 1 : 2;
            for (let t = 0; t < this.ranges.length; t += 3) {
                let o = this.ranges[t] - (this.inverted ? n : 0);
                if (o > e) break;
                let s = this.ranges[t + i];
                if (e <= o + s && t == r * 3) return !0;
                n += this.ranges[t + a] - s
            }
            return !1
        }
        forEach(e) {
            let t = this.inverted ? 2 : 1,
                n = this.inverted ? 1 : 2;
            for (let r = 0, i = 0; r < this.ranges.length; r += 3) {
                let a = this.ranges[r],
                    o = a - (this.inverted ? i : 0),
                    s = a + (this.inverted ? 0 : i),
                    c = this.ranges[r + t],
                    l = this.ranges[r + n];
                e(o, o + c, s, s + l), i += l - c
            }
        }
        invert() {
            return new e(this.ranges, !this.inverted)
        }
        toString() {
            return (this.inverted ? `-` : ``) + JSON.stringify(this.ranges)
        }
        static offset(t) {
            return t == 0 ? e.empty : new e(t < 0 ? [0, -t, 0] : [0, 0, t])
        }
    };
ta.empty = new ta([]);
var na = class e {
        constructor(e, t, n = 0, r = e ? e.length : 0) {
            this.mirror = t, this.from = n, this.to = r, this._maps = e || [], this.ownData = !(e || t)
        }
        get maps() {
            return this._maps
        }
        slice(t = 0, n = this.maps.length) {
            return new e(this._maps, this.mirror, t, n)
        }
        appendMap(e, t) {
            this.ownData ||= (this._maps = this._maps.slice(), this.mirror = this.mirror && this.mirror.slice(), !0), this.to = this._maps.push(e), t != null && this.setMirror(this._maps.length - 1, t)
        }
        appendMapping(e) {
            for (let t = 0, n = this._maps.length; t < e._maps.length; t++) {
                let r = e.getMirror(t);
                this.appendMap(e._maps[t], r != null && r < t ? n + r : void 0)
            }
        }
        getMirror(e) {
            if (this.mirror) {
                for (let t = 0; t < this.mirror.length; t++)
                    if (this.mirror[t] == e) return this.mirror[t + (t % 2 ? -1 : 1)]
            }
        }
        setMirror(e, t) {
            this.mirror ||= [], this.mirror.push(e, t)
        }
        appendMappingInverted(e) {
            for (let t = e.maps.length - 1, n = this._maps.length + e._maps.length; t >= 0; t--) {
                let r = e.getMirror(t);
                this.appendMap(e._maps[t].invert(), r != null && r > t ? n - r - 1 : void 0)
            }
        }
        invert() {
            let t = new e;
            return t.appendMappingInverted(this), t
        }
        map(e, t = 1) {
            if (this.mirror) return this._map(e, t, !0);
            for (let n = this.from; n < this.to; n++) e = this._maps[n].map(e, t);
            return e
        }
        mapResult(e, t = 1) {
            return this._map(e, t, !1)
        }
        _map(e, t, n) {
            let r = 0;
            for (let n = this.from; n < this.to; n++) {
                let i = this._maps[n].mapResult(e, t);
                if (i.recover != null) {
                    let t = this.getMirror(n);
                    if (t != null && t > n && t < this.to) {
                        n = t, e = this._maps[t].recover(i.recover);
                        continue
                    }
                }
                r |= i.delInfo, e = i.pos
            }
            return n ? e : new ea(e, r, null)
        }
    },
    ra = Object.create(null),
    O = class {
        getMap() {
            return ta.empty
        }
        merge(e) {
            return null
        }
        static fromJSON(e, t) {
            if (!t || !t.stepType) throw RangeError(`Invalid input for Step.fromJSON`);
            let n = ra[t.stepType];
            if (!n) throw RangeError(`No step type ${t.stepType} defined`);
            return n.fromJSON(e, t)
        }
        static jsonID(e, t) {
            if (e in ra) throw RangeError(`Duplicate use of step JSON ID ` + e);
            return ra[e] = t, t.prototype.jsonID = e, t
        }
    },
    k = class e {
        constructor(e, t) {
            this.doc = e, this.failed = t
        }
        static ok(t) {
            return new e(t, null)
        }
        static fail(t) {
            return new e(null, t)
        }
        static fromReplace(t, n, r, i) {
            try {
                return e.ok(t.replace(n, r, i))
            } catch (t) {
                if (t instanceof ri) return e.fail(t.message);
                throw t
            }
        }
    };

function ia(e, t, n) {
    let r = [];
    for (let i = 0; i < e.childCount; i++) {
        let a = e.child(i);
        a.content.size && (a = a.copy(ia(a.content, t, a))), a.isInline && (a = t(a, n, i)), r.push(a)
    }
    return T.fromArray(r)
}
var aa = class e extends O {
    constructor(e, t, n) {
        super(), this.from = e, this.to = t, this.mark = n
    }
    apply(e) {
        let t = e.slice(this.from, this.to),
            n = e.resolve(this.from),
            r = n.node(n.sharedDepth(this.to)),
            i = new D(ia(t.content, (e, t) => !e.isAtom || !t.type.allowsMarkType(this.mark.type) ? e : e.mark(this.mark.addToSet(e.marks)), r), t.openStart, t.openEnd);
        return k.fromReplace(e, this.from, this.to, i)
    }
    invert() {
        return new oa(this.from, this.to, this.mark)
    }
    map(t) {
        let n = t.mapResult(this.from, 1),
            r = t.mapResult(this.to, -1);
        return n.deleted && r.deleted || n.pos >= r.pos ? null : new e(n.pos, r.pos, this.mark)
    }
    merge(t) {
        return t instanceof e && t.mark.eq(this.mark) && this.from <= t.to && this.to >= t.from ? new e(Math.min(this.from, t.from), Math.max(this.to, t.to), this.mark) : null
    }
    toJSON() {
        return {
            stepType: `addMark`,
            mark: this.mark.toJSON(),
            from: this.from,
            to: this.to
        }
    }
    static fromJSON(t, n) {
        if (typeof n.from != `number` || typeof n.to != `number`) throw RangeError(`Invalid input for AddMarkStep.fromJSON`);
        return new e(n.from, n.to, t.markFromJSON(n.mark))
    }
};
O.jsonID(`addMark`, aa);
var oa = class e extends O {
    constructor(e, t, n) {
        super(), this.from = e, this.to = t, this.mark = n
    }
    apply(e) {
        let t = e.slice(this.from, this.to),
            n = new D(ia(t.content, e => e.mark(this.mark.removeFromSet(e.marks)), e), t.openStart, t.openEnd);
        return k.fromReplace(e, this.from, this.to, n)
    }
    invert() {
        return new aa(this.from, this.to, this.mark)
    }
    map(t) {
        let n = t.mapResult(this.from, 1),
            r = t.mapResult(this.to, -1);
        return n.deleted && r.deleted || n.pos >= r.pos ? null : new e(n.pos, r.pos, this.mark)
    }
    merge(t) {
        return t instanceof e && t.mark.eq(this.mark) && this.from <= t.to && this.to >= t.from ? new e(Math.min(this.from, t.from), Math.max(this.to, t.to), this.mark) : null
    }
    toJSON() {
        return {
            stepType: `removeMark`,
            mark: this.mark.toJSON(),
            from: this.from,
            to: this.to
        }
    }
    static fromJSON(t, n) {
        if (typeof n.from != `number` || typeof n.to != `number`) throw RangeError(`Invalid input for RemoveMarkStep.fromJSON`);
        return new e(n.from, n.to, t.markFromJSON(n.mark))
    }
};
O.jsonID(`removeMark`, oa);
var sa = class e extends O {
    constructor(e, t) {
        super(), this.pos = e, this.mark = t
    }
    apply(e) {
        let t = e.nodeAt(this.pos);
        if (!t) return k.fail(`No node at mark step's position`);
        let n = t.type.create(t.attrs, null, this.mark.addToSet(t.marks));
        return k.fromReplace(e, this.pos, this.pos + 1, new D(T.from(n), 0, t.isLeaf ? 0 : 1))
    }
    invert(t) {
        let n = t.nodeAt(this.pos);
        if (n) {
            let t = this.mark.addToSet(n.marks);
            if (t.length == n.marks.length) {
                for (let r = 0; r < n.marks.length; r++)
                    if (!n.marks[r].isInSet(t)) return new e(this.pos, n.marks[r]);
                return new e(this.pos, this.mark)
            }
        }
        return new ca(this.pos, this.mark)
    }
    map(t) {
        let n = t.mapResult(this.pos, 1);
        return n.deletedAfter ? null : new e(n.pos, this.mark)
    }
    toJSON() {
        return {
            stepType: `addNodeMark`,
            pos: this.pos,
            mark: this.mark.toJSON()
        }
    }
    static fromJSON(t, n) {
        if (typeof n.pos != `number`) throw RangeError(`Invalid input for AddNodeMarkStep.fromJSON`);
        return new e(n.pos, t.markFromJSON(n.mark))
    }
};
O.jsonID(`addNodeMark`, sa);
var ca = class e extends O {
    constructor(e, t) {
        super(), this.pos = e, this.mark = t
    }
    apply(e) {
        let t = e.nodeAt(this.pos);
        if (!t) return k.fail(`No node at mark step's position`);
        let n = t.type.create(t.attrs, null, this.mark.removeFromSet(t.marks));
        return k.fromReplace(e, this.pos, this.pos + 1, new D(T.from(n), 0, t.isLeaf ? 0 : 1))
    }
    invert(e) {
        let t = e.nodeAt(this.pos);
        return !t || !this.mark.isInSet(t.marks) ? this : new sa(this.pos, this.mark)
    }
    map(t) {
        let n = t.mapResult(this.pos, 1);
        return n.deletedAfter ? null : new e(n.pos, this.mark)
    }
    toJSON() {
        return {
            stepType: `removeNodeMark`,
            pos: this.pos,
            mark: this.mark.toJSON()
        }
    }
    static fromJSON(t, n) {
        if (typeof n.pos != `number`) throw RangeError(`Invalid input for RemoveNodeMarkStep.fromJSON`);
        return new e(n.pos, t.markFromJSON(n.mark))
    }
};
O.jsonID(`removeNodeMark`, ca);
var la = class e extends O {
    constructor(e, t, n, r = !1) {
        super(), this.from = e, this.to = t, this.slice = n, this.structure = r
    }
    apply(e) {
        return this.structure && da(e, this.from, this.to) ? k.fail(`Structure replace would overwrite content`) : k.fromReplace(e, this.from, this.to, this.slice)
    }
    getMap() {
        return new ta([this.from, this.to - this.from, this.slice.size])
    }
    invert(t) {
        return new e(this.from, this.from + this.slice.size, t.slice(this.from, this.to))
    }
    map(t) {
        let n = t.mapResult(this.from, 1),
            r = t.mapResult(this.to, -1);
        return n.deletedAcross && r.deletedAcross ? null : new e(n.pos, Math.max(n.pos, r.pos), this.slice, this.structure)
    }
    merge(t) {
        if (!(t instanceof e) || t.structure || this.structure) return null;
        if (this.from + this.slice.size == t.from && !this.slice.openEnd && !t.slice.openStart) {
            let n = this.slice.size + t.slice.size == 0 ? D.empty : new D(this.slice.content.append(t.slice.content), this.slice.openStart, t.slice.openEnd);
            return new e(this.from, this.to + (t.to - t.from), n, this.structure)
        } else if (t.to == this.from && !this.slice.openStart && !t.slice.openEnd) {
            let n = this.slice.size + t.slice.size == 0 ? D.empty : new D(t.slice.content.append(this.slice.content), t.slice.openStart, this.slice.openEnd);
            return new e(t.from, this.to, n, this.structure)
        } else return null
    }
    toJSON() {
        let e = {
            stepType: `replace`,
            from: this.from,
            to: this.to
        };
        return this.slice.size && (e.slice = this.slice.toJSON()), this.structure && (e.structure = !0), e
    }
    static fromJSON(t, n) {
        if (typeof n.from != `number` || typeof n.to != `number`) throw RangeError(`Invalid input for ReplaceStep.fromJSON`);
        return new e(n.from, n.to, D.fromJSON(t, n.slice), !!n.structure)
    }
};
O.jsonID(`replace`, la);
var ua = class e extends O {
    constructor(e, t, n, r, i, a, o = !1) {
        super(), this.from = e, this.to = t, this.gapFrom = n, this.gapTo = r, this.slice = i, this.insert = a, this.structure = o
    }
    apply(e) {
        if (this.structure && (da(e, this.from, this.gapFrom) || da(e, this.gapTo, this.to))) return k.fail(`Structure gap-replace would overwrite content`);
        let t = e.slice(this.gapFrom, this.gapTo);
        if (t.openStart || t.openEnd) return k.fail(`Gap is not a flat range`);
        let n = this.slice.insertAt(this.insert, t.content);
        return n ? k.fromReplace(e, this.from, this.to, n) : k.fail(`Content does not fit in gap`)
    }
    getMap() {
        return new ta([this.from, this.gapFrom - this.from, this.insert, this.gapTo, this.to - this.gapTo, this.slice.size - this.insert])
    }
    invert(t) {
        let n = this.gapTo - this.gapFrom;
        return new e(this.from, this.from + this.slice.size + n, this.from + this.insert, this.from + this.insert + n, t.slice(this.from, this.to).removeBetween(this.gapFrom - this.from, this.gapTo - this.from), this.gapFrom - this.from, this.structure)
    }
    map(t) {
        let n = t.mapResult(this.from, 1),
            r = t.mapResult(this.to, -1),
            i = this.from == this.gapFrom ? n.pos : t.map(this.gapFrom, -1),
            a = this.to == this.gapTo ? r.pos : t.map(this.gapTo, 1);
        return n.deletedAcross && r.deletedAcross || i < n.pos || a > r.pos ? null : new e(n.pos, r.pos, i, a, this.slice, this.insert, this.structure)
    }
    toJSON() {
        let e = {
            stepType: `replaceAround`,
            from: this.from,
            to: this.to,
            gapFrom: this.gapFrom,
            gapTo: this.gapTo,
            insert: this.insert
        };
        return this.slice.size && (e.slice = this.slice.toJSON()), this.structure && (e.structure = !0), e
    }
    static fromJSON(t, n) {
        if (typeof n.from != `number` || typeof n.to != `number` || typeof n.gapFrom != `number` || typeof n.gapTo != `number` || typeof n.insert != `number`) throw RangeError(`Invalid input for ReplaceAroundStep.fromJSON`);
        return new e(n.from, n.to, n.gapFrom, n.gapTo, D.fromJSON(t, n.slice), n.insert, !!n.structure)
    }
};
O.jsonID(`replaceAround`, ua);

function da(e, t, n) {
    let r = e.resolve(t),
        i = n - t,
        a = r.depth;
    for (; i > 0 && a > 0 && r.indexAfter(a) == r.node(a).childCount;) a--, i--;
    if (i > 0) {
        let e = r.node(a).maybeChild(r.indexAfter(a));
        for (; i > 0;) {
            if (!e || e.isLeaf) return !0;
            e = e.firstChild, i--
        }
    }
    return !1
}

function fa(e, t, n, r) {
    let i = [],
        a = [],
        o, s;
    e.doc.nodesBetween(t, n, (e, c, l) => {
        if (!e.isInline) return;
        let u = e.marks;
        if (!r.isInSet(u) && l.type.allowsMarkType(r.type)) {
            let l = Math.max(c, t),
                d = Math.min(c + e.nodeSize, n),
                f = r.addToSet(u);
            for (let e = 0; e < u.length; e++) u[e].isInSet(f) || (o && o.to == l && o.mark.eq(u[e]) ? o.to = d : i.push(o = new oa(l, d, u[e])));
            s && s.to == l ? s.to = d : a.push(s = new aa(l, d, r))
        }
    }), i.forEach(t => e.step(t)), a.forEach(t => e.step(t))
}

function pa(e, t, n, r) {
    let i = [],
        a = 0;
    e.doc.nodesBetween(t, n, (e, o) => {
        if (!e.isInline) return;
        a++;
        let s = null;
        if (r instanceof Wi) {
            let t = e.marks,
                n;
            for (; n = r.isInSet(t);)(s ||= []).push(n), t = n.removeFromSet(t)
        } else r ? r.isInSet(e.marks) && (s = [r]) : s = e.marks;
        if (s && s.length) {
            let r = Math.min(o + e.nodeSize, n);
            for (let e = 0; e < s.length; e++) {
                let n = s[e],
                    c;
                for (let e = 0; e < i.length; e++) {
                    let t = i[e];
                    t.step == a - 1 && n.eq(i[e].style) && (c = t)
                }
                c ? (c.to = r, c.step = a) : i.push({
                    style: n,
                    from: Math.max(o, t),
                    to: r,
                    step: a
                })
            }
        }
    }), i.forEach(t => e.step(new oa(t.from, t.to, t.style)))
}

function ma(e, t, n, r = n.contentMatch, i = !0) {
    let a = e.doc.nodeAt(t),
        o = [],
        s = t + 1;
    for (let t = 0; t < a.childCount; t++) {
        let c = a.child(t),
            l = s + c.nodeSize,
            u = r.matchType(c.type);
        if (!u) o.push(new la(s, l, D.empty));
        else {
            r = u;
            for (let t = 0; t < c.marks.length; t++) n.allowsMarkType(c.marks[t].type) || e.step(new oa(s, l, c.marks[t]));
            if (i && c.isText && n.whitespace != `pre`) {
                let e, t = /\r?\n|\r/g,
                    r;
                for (; e = t.exec(c.text);) r ||= new D(T.from(n.schema.text(` `, n.allowedMarks(c.marks))), 0, 0), o.push(new la(s + e.index, s + e.index + e[0].length, r))
            }
        }
        s = l
    }
    if (!r.validEnd) {
        let t = r.fillBefore(T.empty, !0);
        e.replace(s, s, new D(t, 0, 0))
    }
    for (let t = o.length - 1; t >= 0; t--) e.step(o[t])
}

function ha(e, t, n) {
    let {
        $from: r,
        $to: i,
        depth: a
    } = t, o = r.before(a + 1), s = i.after(a + 1), c = o, l = s, u = T.empty, d = 0;
    for (let e = a, t = !1; e > n; e--) t || r.index(e) > 0 ? (t = !0, u = T.from(r.node(e).copy(u)), d++) : c--;
    let f = T.empty,
        p = 0;
    for (let e = a, t = !1; e > n; e--) t || i.after(e + 1) < i.end(e) ? (t = !0, f = T.from(i.node(e).copy(f)), p++) : l++;
    e.step(new ua(c, l, o, s, new D(u.append(f), d, p), u.size - d, !0))
}

function ga(e, t, n) {
    let r = T.empty;
    for (let e = n.length - 1; e >= 0; e--) {
        if (r.size) {
            let t = n[e].type.contentMatch.matchFragment(r);
            if (!t || !t.validEnd) throw RangeError(`Wrapper type given to Transform.wrap does not form valid content of its parent wrapper`)
        }
        r = T.from(n[e].type.create(n[e].attrs, r))
    }
    let i = t.start,
        a = t.end;
    e.step(new ua(i, a, i, a, new D(r, 0, 0), n.length, !0))
}

function _a(e, t, n, r, i) {
    if (!r.isTextblock) throw RangeError(`Type given to setBlockType should be a textblock`);
    let a = e.steps.length;
    e.doc.nodesBetween(t, n, (t, n) => {
        let o = typeof i == `function` ? i(t) : i;
        if (t.isTextblock && !t.hasMarkup(r, o) && ba(e.doc, e.mapping.slice(a).map(n), r)) {
            let i = null;
            if (r.schema.linebreakReplacement) {
                let e = r.whitespace == `pre`,
                    t = !!r.contentMatch.matchType(r.schema.linebreakReplacement);
                e && !t ? i = !1 : !e && t && (i = !0)
            }
            i === !1 && ya(e, t, n, a), ma(e, e.mapping.slice(a).map(n, 1), r, void 0, i === null);
            let s = e.mapping.slice(a),
                c = s.map(n, 1),
                l = s.map(n + t.nodeSize, 1);
            return e.step(new ua(c, l, c + 1, l - 1, new D(T.from(r.create(o, null, t.marks)), 0, 0), 1, !0)), i === !0 && va(e, t, n, a), !1
        }
    })
}

function va(e, t, n, r) {
    t.forEach((i, a) => {
        if (i.isText) {
            let o, s = /\r?\n|\r/g;
            for (; o = s.exec(i.text);) {
                let i = e.mapping.slice(r).map(n + 1 + a + o.index);
                e.replaceWith(i, i + 1, t.type.schema.linebreakReplacement.create())
            }
        }
    })
}

function ya(e, t, n, r) {
    t.forEach((i, a) => {
        if (i.type == i.type.schema.linebreakReplacement) {
            let i = e.mapping.slice(r).map(n + 1 + a);
            e.replaceWith(i, i + 1, t.type.schema.text(`
`))
        }
    })
}

function ba(e, t, n) {
    let r = e.resolve(t),
        i = r.index();
    return r.parent.canReplaceWith(i, i + 1, n)
}

function xa(e, t, n, r, i) {
    let a = e.doc.nodeAt(t);
    if (!a) throw RangeError(`No node at given position`);
    n ||= a.type;
    let o = n.create(r, null, i || a.marks);
    if (a.isLeaf) return e.replaceWith(t, t + a.nodeSize, o);
    if (!n.validContent(a.content)) throw RangeError(`Invalid content for node type ` + n.name);
    e.step(new ua(t, t + a.nodeSize, t + 1, t + a.nodeSize - 1, new D(T.from(o), 0, 0), 1, !0))
}

function Sa(e, t, n = 1, r) {
    let i = e.doc.resolve(t),
        a = T.empty,
        o = T.empty;
    for (let e = i.depth, t = i.depth - n, s = n - 1; e > t; e--, s--) {
        a = T.from(i.node(e).copy(a));
        let t = r && r[s];
        o = T.from(t ? t.type.create(t.attrs, o) : i.node(e).copy(o))
    }
    e.step(new la(t, t, new D(a.append(o), n, n), !0))
}

function Ca(e, t, n) {
    let r = null,
        {
            linebreakReplacement: i
        } = e.doc.type.schema,
        a = e.doc.resolve(t - n),
        o = a.node().type;
    if (i && o.inlineContent) {
        let e = o.whitespace == `pre`,
            t = !!o.contentMatch.matchType(i);
        e && !t ? r = !1 : !e && t && (r = !0)
    }
    let s = e.steps.length;
    if (r === !1) {
        let r = e.doc.resolve(t + n);
        ya(e, r.node(), r.before(), s)
    }
    o.inlineContent && ma(e, t + n - 1, o, a.node().contentMatchAt(a.index()), r == null);
    let c = e.mapping.slice(s),
        l = c.map(t - n);
    if (e.step(new la(l, c.map(t + n, -1), D.empty, !0)), r === !0) {
        let t = e.doc.resolve(l);
        va(e, t.node(), t.before(), e.steps.length)
    }
    return e
}

function wa(e, t, n) {
    let r = e.resolve(t);
    if (r.parent.canReplaceWith(r.index(), r.index(), n)) return t;
    if (r.parentOffset == 0)
        for (let e = r.depth - 1; e >= 0; e--) {
            let t = r.index(e);
            if (r.node(e).canReplaceWith(t, t, n)) return r.before(e + 1);
            if (t > 0) return null
        }
    if (r.parentOffset == r.parent.content.size)
        for (let e = r.depth - 1; e >= 0; e--) {
            let t = r.indexAfter(e);
            if (r.node(e).canReplaceWith(t, t, n)) return r.after(e + 1);
            if (t < r.node(e).childCount) return null
        }
    return null
}

function Ta(e, t, n = t, r = D.empty) {
    if (t == n && !r.size) return null;
    let i = e.resolve(t),
        a = e.resolve(n);
    return Ea(i, a, r) ? new la(t, n, r) : new Da(i, a, r).fit()
}

function Ea(e, t, n) {
    return !n.openStart && !n.openEnd && e.start() == t.start() && e.parent.canReplace(e.index(), t.index(), n.content)
}
var Da = class {
    constructor(e, t, n) {
        this.$from = e, this.$to = t, this.unplaced = n, this.frontier = [], this.placed = T.empty;
        for (let t = 0; t <= e.depth; t++) {
            let n = e.node(t);
            this.frontier.push({
                type: n.type,
                match: n.contentMatchAt(e.indexAfter(t))
            })
        }
        for (let t = e.depth; t > 0; t--) this.placed = T.from(e.node(t).copy(this.placed))
    }
    get depth() {
        return this.frontier.length - 1
    }
    fit() {
        for (; this.unplaced.size;) {
            let e = this.findFittable();
            e ? this.placeNodes(e) : this.openMore() || this.dropNode()
        }
        let e = this.mustMoveInline(),
            t = this.placed.size - this.depth - this.$from.depth,
            n = this.$from,
            r = this.close(e < 0 ? this.$to : n.doc.resolve(e));
        if (!r) return null;
        let i = this.placed,
            a = n.depth,
            o = r.depth;
        for (; a && o && i.childCount == 1;) i = i.firstChild.content, a--, o--;
        let s = new D(i, a, o);
        return e > -1 ? new ua(n.pos, e, this.$to.pos, this.$to.end(), s, t) : s.size || n.pos != this.$to.pos ? new la(n.pos, r.pos, s) : null
    }
    findFittable() {
        let e = this.unplaced.openStart;
        for (let t = this.unplaced.content, n = 0, r = this.unplaced.openEnd; n < e; n++) {
            let i = t.firstChild;
            if (t.childCount > 1 && (r = 0), i.type.spec.isolating && r <= n) {
                e = n;
                break
            }
            t = i.content
        }
        for (let t = 1; t <= 2; t++)
            for (let n = t == 1 ? e : this.unplaced.openStart; n >= 0; n--) {
                let e, r = null;
                n ? (r = Aa(this.unplaced.content, n - 1).firstChild, e = r.content) : e = this.unplaced.content;
                let i = e.firstChild;
                for (let e = this.depth; e >= 0; e--) {
                    let {
                        type: a,
                        match: o
                    } = this.frontier[e], s, c = null;
                    if (t == 1 && (i ? o.matchType(i.type) || (c = o.fillBefore(T.from(i), !1)) : r && a.compatibleContent(r.type))) return {
                        sliceDepth: n,
                        frontierDepth: e,
                        parent: r,
                        inject: c
                    };
                    if (t == 2 && i && (s = o.findWrapping(i.type))) return {
                        sliceDepth: n,
                        frontierDepth: e,
                        parent: r,
                        wrap: s
                    };
                    if (r && o.matchType(r.type)) break
                }
            }
    }
    openMore() {
        let {
            content: e,
            openStart: t,
            openEnd: n
        } = this.unplaced, r = Aa(e, t);
        return !r.childCount || r.firstChild.isLeaf ? !1 : (this.unplaced = new D(e, t + 1, Math.max(n, r.size + t >= e.size - n ? t + 1 : 0)), !0)
    }
    dropNode() {
        let {
            content: e,
            openStart: t,
            openEnd: n
        } = this.unplaced, r = Aa(e, t);
        if (r.childCount <= 1 && t > 0) {
            let i = e.size - t <= t + r.size;
            this.unplaced = new D(Oa(e, t - 1, 1), t - 1, i ? t - 1 : n)
        } else this.unplaced = new D(Oa(e, t, 1), t, n)
    }
    placeNodes({
        sliceDepth: e,
        frontierDepth: t,
        parent: n,
        inject: r,
        wrap: i
    }) {
        for (; this.depth > t;) this.closeFrontierNode();
        if (i)
            for (let e = 0; e < i.length; e++) this.openFrontierNode(i[e]);
        let a = this.unplaced,
            o = n ? n.content : a.content,
            s = a.openStart - e,
            c = 0,
            l = [],
            {
                match: u,
                type: d
            } = this.frontier[t];
        if (r) {
            for (let e = 0; e < r.childCount; e++) l.push(r.child(e));
            u = u.matchFragment(r)
        }
        let f = o.size + e - (a.content.size - a.openEnd);
        for (; c < o.childCount;) {
            let e = o.child(c),
                t = u.matchType(e.type);
            if (!t) break;
            c++, (c > 1 || s == 0 || e.content.size) && (u = t, l.push(ja(e.mark(d.allowedMarks(e.marks)), c == 1 ? s : 0, c == o.childCount ? f : -1)))
        }
        let p = c == o.childCount;
        p || (f = -1), this.placed = ka(this.placed, t, T.from(l)), this.frontier[t].match = u, p && f < 0 && n && n.type == this.frontier[this.depth].type && this.frontier.length > 1 && this.closeFrontierNode();
        for (let e = 0, t = o; e < f; e++) {
            let e = t.lastChild;
            this.frontier.push({
                type: e.type,
                match: e.contentMatchAt(e.childCount)
            }), t = e.content
        }
        this.unplaced = p ? e == 0 ? D.empty : new D(Oa(a.content, e - 1, 1), e - 1, f < 0 ? a.openEnd : e - 1) : new D(Oa(a.content, e, c), a.openStart, a.openEnd)
    }
    mustMoveInline() {
        if (!this.$to.parent.isTextblock) return -1;
        let e = this.frontier[this.depth],
            t;
        if (!e.type.isTextblock || !Ma(this.$to, this.$to.depth, e.type, e.match, !1) || this.$to.depth == this.depth && (t = this.findCloseLevel(this.$to)) && t.depth == this.depth) return -1;
        let {
            depth: n
        } = this.$to, r = this.$to.after(n);
        for (; n > 1 && r == this.$to.end(--n);) ++r;
        return r
    }
    findCloseLevel(e) {
        scan: for (let t = Math.min(this.depth, e.depth); t >= 0; t--) {
            let {
                match: n,
                type: r
            } = this.frontier[t], i = t < e.depth && e.end(t + 1) == e.pos + (e.depth - (t + 1)), a = Ma(e, t, r, n, i);
            if (a) {
                for (let n = t - 1; n >= 0; n--) {
                    let {
                        match: t,
                        type: r
                    } = this.frontier[n], i = Ma(e, n, r, t, !0);
                    if (!i || i.childCount) continue scan
                }
                return {
                    depth: t,
                    fit: a,
                    move: i ? e.doc.resolve(e.after(t + 1)) : e
                }
            }
        }
    }
    close(e) {
        let t = this.findCloseLevel(e);
        if (!t) return null;
        for (; this.depth > t.depth;) this.closeFrontierNode();
        t.fit.childCount && (this.placed = ka(this.placed, t.depth, t.fit)), e = t.move;
        for (let n = t.depth + 1; n <= e.depth; n++) {
            let t = e.node(n),
                r = t.type.contentMatch.fillBefore(t.content, !0, e.index(n));
            this.openFrontierNode(t.type, t.attrs, r)
        }
        return e
    }
    openFrontierNode(e, t = null, n) {
        let r = this.frontier[this.depth];
        r.match = r.match.matchType(e), this.placed = ka(this.placed, this.depth, T.from(e.create(t, n))), this.frontier.push({
            type: e,
            match: e.contentMatch
        })
    }
    closeFrontierNode() {
        let e = this.frontier.pop().match.fillBefore(T.empty, !0);
        e.childCount && (this.placed = ka(this.placed, this.frontier.length, e))
    }
};

function Oa(e, t, n) {
    return t == 0 ? e.cutByIndex(n, e.childCount) : e.replaceChild(0, e.firstChild.copy(Oa(e.firstChild.content, t - 1, n)))
}

function ka(e, t, n) {
    return t == 0 ? e.append(n) : e.replaceChild(e.childCount - 1, e.lastChild.copy(ka(e.lastChild.content, t - 1, n)))
}

function Aa(e, t) {
    for (let n = 0; n < t; n++) e = e.firstChild.content;
    return e
}

function ja(e, t, n) {
    if (t <= 0) return e;
    let r = e.content;
    return t > 1 && (r = r.replaceChild(0, ja(r.firstChild, t - 1, r.childCount == 1 ? n - 1 : 0))), t > 0 && (r = e.type.contentMatch.fillBefore(r).append(r), n <= 0 && (r = r.append(e.type.contentMatch.matchFragment(r).fillBefore(T.empty, !0)))), e.copy(r)
}

function Ma(e, t, n, r, i) {
    let a = e.node(t),
        o = i ? e.indexAfter(t) : e.index(t);
    if (o == a.childCount && !n.compatibleContent(a.type)) return null;
    let s = r.fillBefore(a.content, !0, o);
    return s && !Na(n, a.content, o) ? s : null
}

function Na(e, t, n) {
    for (let r = n; r < t.childCount; r++)
        if (!e.allowsMarks(t.child(r).marks)) return !0;
    return !1
}

function Pa(e) {
    return e.spec.defining || e.spec.definingForContent
}

function Fa(e, t, n, r) {
    if (!r.size) return e.deleteRange(t, n);
    let i = e.doc.resolve(t),
        a = e.doc.resolve(n);
    if (Ea(i, a, r)) return e.step(new la(t, n, r));
    let o = za(i, a);
    o[o.length - 1] == 0 && o.pop();
    let s = -(i.depth + 1);
    o.unshift(s);
    for (let e = i.depth, t = i.pos - 1; e > 0; e--, t--) {
        let n = i.node(e).type.spec;
        if (n.defining || n.definingAsContext || n.isolating) break;
        o.indexOf(e) > -1 ? s = e : i.before(e) == t && o.splice(1, 0, -e)
    }
    let c = o.indexOf(s),
        l = [],
        u = r.openStart;
    for (let e = r.content, t = 0;; t++) {
        let n = e.firstChild;
        if (l.push(n), t == r.openStart) break;
        e = n.content
    }
    for (let e = u - 1; e >= 0; e--) {
        let t = l[e],
            n = Pa(t.type);
        if (n && !t.sameMarkup(i.node(Math.abs(s) - 1))) u = e;
        else if (n || !t.type.isTextblock) break
    }
    for (let t = r.openStart; t >= 0; t--) {
        let s = (t + u + 1) % (r.openStart + 1),
            d = l[s];
        if (d)
            for (let t = 0; t < o.length; t++) {
                let l = o[(t + c) % o.length],
                    u = !0;
                l < 0 && (u = !1, l = -l);
                let f = i.node(l - 1),
                    p = i.index(l - 1);
                if (f.canReplaceWith(p, p, d.type, d.marks)) return e.replace(i.before(l), u ? a.after(l) : n, new D(Ia(r.content, 0, r.openStart, s), s, r.openEnd))
            }
    }
    let d = e.steps.length;
    for (let s = o.length - 1; s >= 0 && (e.replace(t, n, r), !(e.steps.length > d)); s--) {
        let e = o[s];
        e < 0 || (t = i.before(e), n = a.after(e))
    }
}

function Ia(e, t, n, r, i) {
    if (t < n) {
        let i = e.firstChild;
        e = e.replaceChild(0, i.copy(Ia(i.content, t + 1, n, r, i)))
    }
    if (t > r) {
        let t = i.contentMatchAt(0),
            n = t.fillBefore(e).append(e);
        e = n.append(t.matchFragment(n).fillBefore(T.empty, !0))
    }
    return e
}

function La(e, t, n, r) {
    if (!r.isInline && t == n && e.doc.resolve(t).parent.content.size) {
        let i = wa(e.doc, t, r.type);
        i != null && (t = n = i)
    }
    e.replaceRange(t, n, new D(T.from(r), 0, 0))
}

function Ra(e, t, n) {
    let r = e.doc.resolve(t),
        i = e.doc.resolve(n),
        a = za(r, i);
    for (let t = 0; t < a.length; t++) {
        let n = a[t],
            o = t == a.length - 1;
        if (o && n == 0 || r.node(n).type.contentMatch.validEnd) return e.delete(r.start(n), i.end(n));
        if (n > 0 && (o || r.node(n - 1).canReplace(r.index(n - 1), i.indexAfter(n - 1)))) return e.delete(r.before(n), i.after(n))
    }
    for (let a = 1; a <= r.depth && a <= i.depth; a++)
        if (t - r.start(a) == r.depth - a && n > r.end(a) && i.end(a) - n != i.depth - a && r.start(a - 1) == i.start(a - 1) && r.node(a - 1).canReplace(r.index(a - 1), i.index(a - 1))) return e.delete(r.before(a), n);
    e.delete(t, n)
}

function za(e, t) {
    let n = [],
        r = Math.min(e.depth, t.depth);
    for (let i = r; i >= 0; i--) {
        let r = e.start(i);
        if (r < e.pos - (e.depth - i) || t.end(i) > t.pos + (t.depth - i) || e.node(i).type.spec.isolating || t.node(i).type.spec.isolating) break;
        (r == t.start(i) || i == e.depth && i == t.depth && e.parent.inlineContent && t.parent.inlineContent && i && t.start(i - 1) == r - 1) && n.push(i)
    }
    return n
}
var Ba = class e extends O {
    constructor(e, t, n) {
        super(), this.pos = e, this.attr = t, this.value = n
    }
    apply(e) {
        let t = e.nodeAt(this.pos);
        if (!t) return k.fail(`No node at attribute step's position`);
        let n = Object.create(null);
        for (let e in t.attrs) n[e] = t.attrs[e];
        n[this.attr] = this.value;
        let r = t.type.create(n, null, t.marks);
        return k.fromReplace(e, this.pos, this.pos + 1, new D(T.from(r), 0, t.isLeaf ? 0 : 1))
    }
    getMap() {
        return ta.empty
    }
    invert(t) {
        return new e(this.pos, this.attr, t.nodeAt(this.pos).attrs[this.attr])
    }
    map(t) {
        let n = t.mapResult(this.pos, 1);
        return n.deletedAfter ? null : new e(n.pos, this.attr, this.value)
    }
    toJSON() {
        return {
            stepType: `attr`,
            pos: this.pos,
            attr: this.attr,
            value: this.value
        }
    }
    static fromJSON(t, n) {
        if (typeof n.pos != `number` || typeof n.attr != `string`) throw RangeError(`Invalid input for AttrStep.fromJSON`);
        return new e(n.pos, n.attr, n.value)
    }
};
O.jsonID(`attr`, Ba);
var Va = class e extends O {
    constructor(e, t) {
        super(), this.attr = e, this.value = t
    }
    apply(e) {
        let t = Object.create(null);
        for (let n in e.attrs) t[n] = e.attrs[n];
        t[this.attr] = this.value;
        let n = e.type.create(t, e.content, e.marks);
        return k.ok(n)
    }
    getMap() {
        return ta.empty
    }
    invert(t) {
        return new e(this.attr, t.attrs[this.attr])
    }
    map(e) {
        return this
    }
    toJSON() {
        return {
            stepType: `docAttr`,
            attr: this.attr,
            value: this.value
        }
    }
    static fromJSON(t, n) {
        if (typeof n.attr != `string`) throw RangeError(`Invalid input for DocAttrStep.fromJSON`);
        return new e(n.attr, n.value)
    }
};
O.jsonID(`docAttr`, Va);
var Ha = class extends Error {};
Ha = function e(t) {
    let n = Error.call(this, t);
    return n.__proto__ = e.prototype, n
}, Ha.prototype = Object.create(Error.prototype), Ha.prototype.constructor = Ha, Ha.prototype.name = `TransformError`;
var Ua = class {
        constructor(e) {
            this.doc = e, this.steps = [], this.docs = [], this.mapping = new na
        }
        get before() {
            return this.docs.length ? this.docs[0] : this.doc
        }
        step(e) {
            let t = this.maybeStep(e);
            if (t.failed) throw new Ha(t.failed);
            return this
        }
        maybeStep(e) {
            let t = e.apply(this.doc);
            return t.failed || this.addStep(e, t.doc), t
        }
        get docChanged() {
            return this.steps.length > 0
        }
        changedRange() {
            let e = 1e9,
                t = -1e9;
            for (let n = 0; n < this.mapping.maps.length; n++) {
                let r = this.mapping.maps[n];
                n && (e = r.map(e, 1), t = r.map(t, -1)), r.forEach((n, r, i, a) => {
                    e = Math.min(e, i), t = Math.max(t, a)
                })
            }
            return e == 1e9 ? null : {
                from: e,
                to: t
            }
        }
        addStep(e, t) {
            this.docs.push(this.doc), this.steps.push(e), this.mapping.appendMap(e.getMap()), this.doc = t
        }
        replace(e, t = e, n = D.empty) {
            let r = Ta(this.doc, e, t, n);
            return r && this.step(r), this
        }
        replaceWith(e, t, n) {
            return this.replace(e, t, new D(T.from(n), 0, 0))
        }
        delete(e, t) {
            return this.replace(e, t, D.empty)
        }
        insert(e, t) {
            return this.replaceWith(e, e, t)
        }
        replaceRange(e, t, n) {
            return Fa(this, e, t, n), this
        }
        replaceRangeWith(e, t, n) {
            return La(this, e, t, n), this
        }
        deleteRange(e, t) {
            return Ra(this, e, t), this
        }
        lift(e, t) {
            return ha(this, e, t), this
        }
        join(e, t = 1) {
            return Ca(this, e, t), this
        }
        wrap(e, t) {
            return ga(this, e, t), this
        }
        setBlockType(e, t = e, n, r = null) {
            return _a(this, e, t, n, r), this
        }
        setNodeMarkup(e, t, n = null, r) {
            return xa(this, e, t, n, r), this
        }
        setNodeAttribute(e, t, n) {
            return this.step(new Ba(e, t, n)), this
        }
        setDocAttribute(e, t) {
            return this.step(new Va(e, t)), this
        }
        addNodeMark(e, t) {
            return this.step(new sa(e, t)), this
        }
        removeNodeMark(e, t) {
            let n = this.doc.nodeAt(e);
            if (!n) throw RangeError(`No node at position ` + e);
            if (t instanceof E) t.isInSet(n.marks) && this.step(new ca(e, t));
            else {
                let r = n.marks,
                    i, a = [];
                for (; i = t.isInSet(r);) a.push(new ca(e, i)), r = i.removeFromSet(r);
                for (let e = a.length - 1; e >= 0; e--) this.step(a[e])
            }
            return this
        }
        split(e, t = 1, n) {
            return Sa(this, e, t, n), this
        }
        addMark(e, t, n) {
            return fa(this, e, t, n), this
        }
        removeMark(e, t, n) {
            return pa(this, e, t, n), this
        }
        clearIncompatible(e, t, n) {
            return ma(this, e, t, n), this
        }
    },
    Wa = Object.create(null),
    A = class {
        constructor(e, t, n) {
            this.$anchor = e, this.$head = t, this.ranges = n || [new Ga(e.min(t), e.max(t))]
        }
        get anchor() {
            return this.$anchor.pos
        }
        get head() {
            return this.$head.pos
        }
        get from() {
            return this.$from.pos
        }
        get to() {
            return this.$to.pos
        }
        get $from() {
            return this.ranges[0].$from
        }
        get $to() {
            return this.ranges[0].$to
        }
        get empty() {
            let e = this.ranges;
            for (let t = 0; t < e.length; t++)
                if (e[t].$from.pos != e[t].$to.pos) return !1;
            return !0
        }
        content() {
            return this.$from.doc.slice(this.from, this.to, !0)
        }
        replace(e, t = D.empty) {
            let n = t.content.lastChild,
                r = null;
            for (let e = 0; e < t.openEnd; e++) r = n, n = n.lastChild;
            let i = e.steps.length,
                a = this.ranges;
            for (let o = 0; o < a.length; o++) {
                let {
                    $from: s,
                    $to: c
                } = a[o], l = e.mapping.slice(i);
                e.replaceRange(l.map(s.pos), l.map(c.pos), o ? D.empty : t), o == 0 && $a(e, i, (n ? n.isInline : r && r.isTextblock) ? -1 : 1)
            }
        }
        replaceWith(e, t) {
            let n = e.steps.length,
                r = this.ranges;
            for (let i = 0; i < r.length; i++) {
                let {
                    $from: a,
                    $to: o
                } = r[i], s = e.mapping.slice(n), c = s.map(a.pos), l = s.map(o.pos);
                i ? e.deleteRange(c, l) : (e.replaceRangeWith(c, l, t), $a(e, n, t.isInline ? -1 : 1))
            }
        }
        static findFrom(e, t, n = !1) {
            let r = e.parent.inlineContent ? new j(e) : Qa(e.node(0), e.parent, e.pos, e.index(), t, n);
            if (r) return r;
            for (let r = e.depth - 1; r >= 0; r--) {
                let i = t < 0 ? Qa(e.node(0), e.node(r), e.before(r + 1), e.index(r), t, n) : Qa(e.node(0), e.node(r), e.after(r + 1), e.index(r) + 1, t, n);
                if (i) return i
            }
            return null
        }
        static near(e, t = 1) {
            return this.findFrom(e, t) || this.findFrom(e, -t) || new Xa(e.node(0))
        }
        static atStart(e) {
            return Qa(e, e, 0, 0, 1) || new Xa(e)
        }
        static atEnd(e) {
            return Qa(e, e, e.content.size, e.childCount, -1) || new Xa(e)
        }
        static fromJSON(e, t) {
            if (!t || !t.type) throw RangeError(`Invalid input for Selection.fromJSON`);
            let n = Wa[t.type];
            if (!n) throw RangeError(`No selection type ${t.type} defined`);
            return n.fromJSON(e, t)
        }
        static jsonID(e, t) {
            if (e in Wa) throw RangeError(`Duplicate use of selection JSON ID ` + e);
            return Wa[e] = t, t.prototype.jsonID = e, t
        }
        getBookmark() {
            return j.between(this.$anchor, this.$head).getBookmark()
        }
    };
A.prototype.visible = !0;
var Ga = class {
        constructor(e, t) {
            this.$from = e, this.$to = t
        }
    },
    Ka = !1;

function qa(e) {
    !Ka && !e.parent.inlineContent && (Ka = !0, console.warn(`TextSelection endpoint not pointing into a node with inline content (` + e.parent.type.name + `)`))
}
var j = class e extends A {
    constructor(e, t = e) {
        qa(e), qa(t), super(e, t)
    }
    get $cursor() {
        return this.$anchor.pos == this.$head.pos ? this.$head : null
    }
    map(t, n) {
        let r = t.resolve(n.map(this.head));
        if (!r.parent.inlineContent) return A.near(r);
        let i = t.resolve(n.map(this.anchor));
        return new e(i.parent.inlineContent ? i : r, r)
    }
    replace(e, t = D.empty) {
        if (super.replace(e, t), t == D.empty) {
            let t = this.$from.marksAcross(this.$to);
            t && e.ensureMarks(t)
        }
    }
    eq(t) {
        return t instanceof e && t.anchor == this.anchor && t.head == this.head
    }
    getBookmark() {
        return new Ja(this.anchor, this.head)
    }
    toJSON() {
        return {
            type: `text`,
            anchor: this.anchor,
            head: this.head
        }
    }
    static fromJSON(t, n) {
        if (typeof n.anchor != `number` || typeof n.head != `number`) throw RangeError(`Invalid input for TextSelection.fromJSON`);
        return new e(t.resolve(n.anchor), t.resolve(n.head))
    }
    static create(e, t, n = t) {
        let r = e.resolve(t);
        return new this(r, n == t ? r : e.resolve(n))
    }
    static between(t, n, r) {
        let i = t.pos - n.pos;
        if ((!r || i) && (r = i >= 0 ? 1 : -1), !n.parent.inlineContent) {
            let e = A.findFrom(n, r, !0) || A.findFrom(n, -r, !0);
            if (e) n = e.$head;
            else return A.near(n, r)
        }
        return t.parent.inlineContent || (i == 0 ? t = n : (t = (A.findFrom(t, -r, !0) || A.findFrom(t, r, !0)).$anchor, t.pos < n.pos != i < 0 && (t = n))), new e(t, n)
    }
};
A.jsonID(`text`, j);
var Ja = class e {
        constructor(e, t) {
            this.anchor = e, this.head = t
        }
        map(t) {
            return new e(t.map(this.anchor), t.map(this.head))
        }
        resolve(e) {
            return j.between(e.resolve(this.anchor), e.resolve(this.head))
        }
    },
    M = class e extends A {
        constructor(e) {
            let t = e.nodeAfter,
                n = e.node(0).resolve(e.pos + t.nodeSize);
            super(e, n), this.node = t
        }
        map(t, n) {
            let {
                deleted: r,
                pos: i
            } = n.mapResult(this.anchor), a = t.resolve(i);
            return r ? A.near(a) : new e(a)
        }
        content() {
            return new D(T.from(this.node), 0, 0)
        }
        eq(t) {
            return t instanceof e && t.anchor == this.anchor
        }
        toJSON() {
            return {
                type: `node`,
                anchor: this.anchor
            }
        }
        getBookmark() {
            return new Ya(this.anchor)
        }
        static fromJSON(t, n) {
            if (typeof n.anchor != `number`) throw RangeError(`Invalid input for NodeSelection.fromJSON`);
            return new e(t.resolve(n.anchor))
        }
        static create(t, n) {
            return new e(t.resolve(n))
        }
        static isSelectable(e) {
            return !e.isText && e.type.spec.selectable !== !1
        }
    };
M.prototype.visible = !1, A.jsonID(`node`, M);
var Ya = class e {
        constructor(e) {
            this.anchor = e
        }
        map(t) {
            let {
                deleted: n,
                pos: r
            } = t.mapResult(this.anchor);
            return n ? new Ja(r, r) : new e(r)
        }
        resolve(e) {
            let t = e.resolve(this.anchor),
                n = t.nodeAfter;
            return n && M.isSelectable(n) ? new M(t) : A.near(t)
        }
    },
    Xa = class e extends A {
        constructor(e) {
            super(e.resolve(0), e.resolve(e.content.size))
        }
        replace(e, t = D.empty) {
            if (t == D.empty) {
                e.delete(0, e.doc.content.size);
                let t = A.atStart(e.doc);
                t.eq(e.selection) || e.setSelection(t)
            } else super.replace(e, t)
        }
        toJSON() {
            return {
                type: `all`
            }
        }
        static fromJSON(t) {
            return new e(t)
        }
        map(t) {
            return new e(t)
        }
        eq(t) {
            return t instanceof e
        }
        getBookmark() {
            return Za
        }
    };
A.jsonID(`all`, Xa);
var Za = {
    map() {
        return this
    },
    resolve(e) {
        return new Xa(e)
    }
};

function Qa(e, t, n, r, i, a = !1) {
    if (t.inlineContent) return j.create(e, n);
    for (let o = r - (i > 0 ? 0 : 1); i > 0 ? o < t.childCount : o >= 0; o += i) {
        let r = t.child(o);
        if (r.isAtom) {
            if (!a && M.isSelectable(r)) return M.create(e, n - (i < 0 ? r.nodeSize : 0))
        } else {
            let t = Qa(e, r, n + i, i < 0 ? r.childCount : 0, i, a);
            if (t) return t
        }
        n += r.nodeSize * i
    }
    return null
}

function $a(e, t, n) {
    let r = e.steps.length - 1;
    if (r < t) return;
    let i = e.steps[r];
    if (!(i instanceof la || i instanceof ua)) return;
    let a = e.mapping.maps[r],
        o;
    a.forEach((e, t, n, r) => {
        o ??= r
    }), e.setSelection(A.near(e.doc.resolve(o), n))
}
var eo = 1,
    to = 2,
    no = 4,
    ro = class extends Ua {
        constructor(e) {
            super(e.doc), this.curSelectionFor = 0, this.updated = 0, this.meta = Object.create(null), this.time = Date.now(), this.curSelection = e.selection, this.storedMarks = e.storedMarks
        }
        get selection() {
            return this.curSelectionFor < this.steps.length && (this.curSelection = this.curSelection.map(this.doc, this.mapping.slice(this.curSelectionFor)), this.curSelectionFor = this.steps.length), this.curSelection
        }
        setSelection(e) {
            if (e.$from.doc != this.doc) throw RangeError(`Selection passed to setSelection must point at the current document`);
            return this.curSelection = e, this.curSelectionFor = this.steps.length, this.updated = (this.updated | eo) & ~to, this.storedMarks = null, this
        }
        get selectionSet() {
            return (this.updated & eo) > 0
        }
        setStoredMarks(e) {
            return this.storedMarks = e, this.updated |= to, this
        }
        ensureMarks(e) {
            return E.sameSet(this.storedMarks || this.selection.$from.marks(), e) || this.setStoredMarks(e), this
        }
        addStoredMark(e) {
            return this.ensureMarks(e.addToSet(this.storedMarks || this.selection.$head.marks()))
        }
        removeStoredMark(e) {
            return this.ensureMarks(e.removeFromSet(this.storedMarks || this.selection.$head.marks()))
        }
        get storedMarksSet() {
            return (this.updated & to) > 0
        }
        addStep(e, t) {
            super.addStep(e, t), this.updated &= ~to, this.storedMarks = null
        }
        setTime(e) {
            return this.time = e, this
        }
        replaceSelection(e) {
            return this.selection.replace(this, e), this
        }
        replaceSelectionWith(e, t = !0) {
            let n = this.selection;
            return t && (e = e.mark(this.storedMarks || (n.empty ? n.$from.marks() : n.$from.marksAcross(n.$to) || E.none))), n.replaceWith(this, e), this
        }
        deleteSelection() {
            return this.selection.replace(this), this
        }
        insertText(e, t, n) {
            let r = this.doc.type.schema;
            if (t == null) return e ? this.replaceSelectionWith(r.text(e), !0) : this.deleteSelection(); {
                if (n ??= t, !e) return this.deleteRange(t, n);
                let i = this.storedMarks;
                if (!i) {
                    let e = this.doc.resolve(t);
                    i = n == t ? e.marks() : e.marksAcross(this.doc.resolve(n))
                }
                return this.replaceRangeWith(t, n, r.text(e, i)), !this.selection.empty && this.selection.to == t + e.length && this.setSelection(A.near(this.selection.$to)), this
            }
        }
        setMeta(e, t) {
            return this.meta[typeof e == `string` ? e : e.key] = t, this
        }
        getMeta(e) {
            return this.meta[typeof e == `string` ? e : e.key]
        }
        get isGeneric() {
            for (let e in this.meta) return !1;
            return !0
        }
        scrollIntoView() {
            return this.updated |= no, this
        }
        get scrolledIntoView() {
            return (this.updated & no) > 0
        }
    };

function io(e, t) {
    return !t || !e ? e : e.bind(t)
}
var ao = class {
        constructor(e, t, n) {
            this.name = e, this.init = io(t.init, n), this.apply = io(t.apply, n)
        }
    },
    oo = [new ao(`doc`, {
        init(e) {
            return e.doc || e.schema.topNodeType.createAndFill()
        },
        apply(e) {
            return e.doc
        }
    }), new ao(`selection`, {
        init(e, t) {
            return e.selection || A.atStart(t.doc)
        },
        apply(e) {
            return e.selection
        }
    }), new ao(`storedMarks`, {
        init(e) {
            return e.storedMarks || null
        },
        apply(e, t, n, r) {
            return r.selection.$cursor ? e.storedMarks : null
        }
    }), new ao(`scrollToSelection`, {
        init() {
            return 0
        },
        apply(e, t) {
            return e.scrolledIntoView ? t + 1 : t
        }
    })],
    so = class {
        constructor(e, t) {
            this.schema = e, this.plugins = [], this.pluginsByKey = Object.create(null), this.fields = oo.slice(), t && t.forEach(e => {
                if (this.pluginsByKey[e.key]) throw RangeError(`Adding different instances of a keyed plugin (` + e.key + `)`);
                this.plugins.push(e), this.pluginsByKey[e.key] = e, e.spec.state && this.fields.push(new ao(e.key, e.spec.state, e))
            })
        }
    },
    co = class e {
        constructor(e) {
            this.config = e
        }
        get schema() {
            return this.config.schema
        }
        get plugins() {
            return this.config.plugins
        }
        apply(e) {
            return this.applyTransaction(e).state
        }
        filterTransaction(e, t = -1) {
            for (let n = 0; n < this.config.plugins.length; n++)
                if (n != t) {
                    let t = this.config.plugins[n];
                    if (t.spec.filterTransaction && !t.spec.filterTransaction.call(t, e, this)) return !1
                }
            return !0
        }
        applyTransaction(e) {
            if (!this.filterTransaction(e)) return {
                state: this,
                transactions: []
            };
            let t = [e],
                n = this.applyInner(e),
                r = null;
            for (;;) {
                let i = !1;
                for (let a = 0; a < this.config.plugins.length; a++) {
                    let o = this.config.plugins[a];
                    if (o.spec.appendTransaction) {
                        let s = r ? r[a].n : 0,
                            c = r ? r[a].state : this,
                            l = s < t.length && o.spec.appendTransaction.call(o, s ? t.slice(s) : t, c, n);
                        if (l && n.filterTransaction(l, a)) {
                            if (l.setMeta(`appendedTransaction`, e), !r) {
                                r = [];
                                for (let e = 0; e < this.config.plugins.length; e++) r.push(e < a ? {
                                    state: n,
                                    n: t.length
                                } : {
                                    state: this,
                                    n: 0
                                })
                            }
                            t.push(l), n = n.applyInner(l), i = !0
                        }
                        r && (r[a] = {
                            state: n,
                            n: t.length
                        })
                    }
                }
                if (!i) return {
                    state: n,
                    transactions: t
                }
            }
        }
        applyInner(t) {
            if (!t.before.eq(this.doc)) throw RangeError(`Applying a mismatched transaction`);
            let n = new e(this.config),
                r = this.config.fields;
            for (let e = 0; e < r.length; e++) {
                let i = r[e];
                n[i.name] = i.apply(t, this[i.name], this, n)
            }
            return n
        }
        get tr() {
            return new ro(this)
        }
        static create(t) {
            let n = new so(t.doc ? t.doc.type.schema : t.schema, t.plugins),
                r = new e(n);
            for (let e = 0; e < n.fields.length; e++) r[n.fields[e].name] = n.fields[e].init(t, r);
            return r
        }
        reconfigure(t) {
            let n = new so(this.schema, t.plugins),
                r = n.fields,
                i = new e(n);
            for (let e = 0; e < r.length; e++) {
                let n = r[e].name;
                i[n] = this.hasOwnProperty(n) ? this[n] : r[e].init(t, i)
            }
            return i
        }
        toJSON(e) {
            let t = {
                doc: this.doc.toJSON(),
                selection: this.selection.toJSON()
            };
            if (this.storedMarks && (t.storedMarks = this.storedMarks.map(e => e.toJSON())), e && typeof e == `object`)
                for (let n in e) {
                    if (n == `doc` || n == `selection`) throw RangeError("The JSON fields `doc` and `selection` are reserved");
                    let r = e[n],
                        i = r.spec.state;
                    i && i.toJSON && (t[n] = i.toJSON.call(r, this[r.key]))
                }
            return t
        }
        static fromJSON(t, n, r) {
            if (!n) throw RangeError(`Invalid input for EditorState.fromJSON`);
            if (!t.schema) throw RangeError(`Required config field 'schema' missing`);
            let i = new so(t.schema, t.plugins),
                a = new e(i);
            return i.fields.forEach(e => {
                if (e.name == `doc`) a.doc = Si.fromJSON(t.schema, n.doc);
                else if (e.name == `selection`) a.selection = A.fromJSON(a.doc, n.selection);
                else if (e.name == `storedMarks`) n.storedMarks && (a.storedMarks = n.storedMarks.map(t.schema.markFromJSON));
                else {
                    if (r)
                        for (let i in r) {
                            let o = r[i],
                                s = o.spec.state;
                            if (o.key == e.name && s && s.fromJSON && Object.prototype.hasOwnProperty.call(n, i)) {
                                a[e.name] = s.fromJSON.call(o, t, n[i], a);
                                return
                            }
                        }
                    a[e.name] = e.init(t, a)
                }
            }), a
        }
    };

function lo(e, t, n) {
    for (let r in e) {
        let i = e[r];
        i instanceof Function ? i = i.bind(t) : r == `handleDOMEvents` && (i = lo(i, t, {})), n[r] = i
    }
    return n
}
var N = class {
        constructor(e) {
            this.spec = e, this.props = {}, e.props && lo(e.props, this, this.props), this.key = e.key ? e.key.key : fo(`plugin`)
        }
        getState(e) {
            return e[this.key]
        }
    },
    uo = Object.create(null);

function fo(e) {
    return e in uo ? e + `$` + ++uo[e] : (uo[e] = 0, e + `$`)
}
var po = class {
        constructor(e = `key`) {
            this.key = fo(e)
        }
        get(e) {
            return e.config.pluginsByKey[this.key]
        }
        getState(e) {
            return e[this.key]
        }
    },
    mo = (e, t) => e.selection.empty ? !1 : (t && t(e.tr.deleteSelection().scrollIntoView()), !0);

function ho(e, t) {
    let {
        $cursor: n
    } = e.selection;
    return !n || (t ? !t.endOfTextblock(`backward`, e) : n.parentOffset > 0) ? null : n
}
var go = (e, t, n) => {
        let r = ho(e, n);
        if (!r) return !1;
        let i = So(r);
        if (!i) {
            let n = r.blockRange(),
                i = n && Ar(n);
            return i == null ? !1 : (t && t(e.tr.lift(n, i).scrollIntoView()), !0)
        }
        let a = i.nodeBefore;
        if (Bo(e, i, t, -1)) return !0;
        if (r.parent.content.size == 0 && (bo(a, `end`) || M.isSelectable(a)))
            for (let n = r.depth;; n--) {
                let o = Br(e.doc, r.before(n), r.after(n), S.empty);
                if (o && o.slice.size < o.to - o.from) {
                    if (t) {
                        let n = e.tr.step(o);
                        n.setSelection(bo(a, `end`) ? A.findFrom(n.doc.resolve(n.mapping.map(i.pos, -1)), -1) : M.create(n.doc, i.pos - a.nodeSize)), t(n.scrollIntoView())
                    }
                    return !0
                }
                if (n == 1 || r.node(n - 1).childCount > 1) break
            }
        return a.isAtom && i.depth == r.depth - 1 ? (t && t(e.tr.delete(i.pos - a.nodeSize, i.pos).scrollIntoView()), !0) : !1
    },
    _o = (e, t, n) => {
        let r = ho(e, n);
        if (!r) return !1;
        let i = So(r);
        return i ? yo(e, i, t) : !1
    },
    vo = (e, t, n) => {
        let r = Co(e, n);
        if (!r) return !1;
        let i = Eo(r);
        return i ? yo(e, i, t) : !1
    };

function yo(e, t, n) {
    let r = t.nodeBefore,
        i = t.pos - 1;
    for (; !r.isTextblock; i--) {
        if (r.type.spec.isolating) return !1;
        let e = r.lastChild;
        if (!e) return !1;
        r = e
    }
    let a = t.nodeAfter,
        o = t.pos + 1;
    for (; !a.isTextblock; o++) {
        if (a.type.spec.isolating) return !1;
        let e = a.firstChild;
        if (!e) return !1;
        a = e
    }
    let s = Br(e.doc, i, o, S.empty);
    if (!s || s.from != i || s instanceof Er && s.slice.size >= o - i) return !1;
    if (n) {
        let t = e.tr.step(s);
        t.setSelection(j.create(t.doc, i)), n(t.scrollIntoView())
    }
    return !0
}

function bo(e, t, n = !1) {
    for (let r = e; r; r = t == `start` ? r.firstChild : r.lastChild) {
        if (r.isTextblock) return !0;
        if (n && r.childCount != 1) return !1
    }
    return !1
}
var xo = (e, t, n) => {
    let {
        $head: r,
        empty: i
    } = e.selection, a = r;
    if (!i) return !1;
    if (r.parent.isTextblock) {
        if (n ? !n.endOfTextblock(`backward`, e) : r.parentOffset > 0) return !1;
        a = So(r)
    }
    let o = a && a.nodeBefore;
    return !o || !M.isSelectable(o) ? !1 : (t && t(e.tr.setSelection(M.create(e.doc, a.pos - o.nodeSize)).scrollIntoView()), !0)
};

function So(e) {
    if (!e.parent.type.spec.isolating)
        for (let t = e.depth - 1; t >= 0; t--) {
            if (e.index(t) > 0) return e.doc.resolve(e.before(t + 1));
            if (e.node(t).type.spec.isolating) break
        }
    return null
}

function Co(e, t) {
    let {
        $cursor: n
    } = e.selection;
    return !n || (t ? !t.endOfTextblock(`forward`, e) : n.parentOffset < n.parent.content.size) ? null : n
}
var wo = (e, t, n) => {
        let r = Co(e, n);
        if (!r) return !1;
        let i = Eo(r);
        if (!i) return !1;
        let a = i.nodeAfter;
        if (Bo(e, i, t, 1)) return !0;
        if (r.parent.content.size == 0 && (bo(a, `start`) || M.isSelectable(a))) {
            let n = Br(e.doc, r.before(), r.after(), S.empty);
            if (n && n.slice.size < n.to - n.from) {
                if (t) {
                    let r = e.tr.step(n);
                    r.setSelection(bo(a, `start`) ? A.findFrom(r.doc.resolve(r.mapping.map(i.pos)), 1) : M.create(r.doc, r.mapping.map(i.pos))), t(r.scrollIntoView())
                }
                return !0
            }
        }
        return a.isAtom && i.depth == r.depth - 1 ? (t && t(e.tr.delete(i.pos, i.pos + a.nodeSize).scrollIntoView()), !0) : !1
    },
    To = (e, t, n) => {
        let {
            $head: r,
            empty: i
        } = e.selection, a = r;
        if (!i) return !1;
        if (r.parent.isTextblock) {
            if (n ? !n.endOfTextblock(`forward`, e) : r.parentOffset < r.parent.content.size) return !1;
            a = Eo(r)
        }
        let o = a && a.nodeAfter;
        return !o || !M.isSelectable(o) ? !1 : (t && t(e.tr.setSelection(M.create(e.doc, a.pos)).scrollIntoView()), !0)
    };

function Eo(e) {
    if (!e.parent.type.spec.isolating)
        for (let t = e.depth - 1; t >= 0; t--) {
            let n = e.node(t);
            if (e.index(t) + 1 < n.childCount) return e.doc.resolve(e.after(t + 1));
            if (n.type.spec.isolating) break
        }
    return null
}
var Do = (e, t) => {
        let n = e.selection,
            r = n instanceof M,
            i;
        if (r) {
            if (n.node.isTextblock || !Ir(e.doc, n.from)) return !1;
            i = n.from
        } else if (i = zr(e.doc, n.from, -1), i == null) return !1;
        if (t) {
            let n = e.tr.join(i);
            r && n.setSelection(M.create(n.doc, i - e.doc.resolve(i).nodeBefore.nodeSize)), t(n.scrollIntoView())
        }
        return !0
    },
    Oo = (e, t) => {
        let n = e.selection,
            r;
        if (n instanceof M) {
            if (n.node.isTextblock || !Ir(e.doc, n.to)) return !1;
            r = n.to
        } else if (r = zr(e.doc, n.to, 1), r == null) return !1;
        return t && t(e.tr.join(r).scrollIntoView()), !0
    },
    ko = (e, t) => {
        let {
            $from: n,
            $to: r
        } = e.selection, i = n.blockRange(r), a = i && Ar(i);
        return a == null ? !1 : (t && t(e.tr.lift(i, a).scrollIntoView()), !0)
    },
    Ao = (e, t) => {
        let {
            $head: n,
            $anchor: r
        } = e.selection;
        return !n.parent.type.spec.code || !n.sameParent(r) ? !1 : (t && t(e.tr.insertText(`
`).scrollIntoView()), !0)
    };

function jo(e) {
    for (let t = 0; t < e.edgeCount; t++) {
        let {
            type: n
        } = e.edge(t);
        if (n.isTextblock && !n.hasRequiredAttrs()) return n
    }
    return null
}
var Mo = (e, t) => {
        let {
            $head: n,
            $anchor: r
        } = e.selection;
        if (!n.parent.type.spec.code || !n.sameParent(r)) return !1;
        let i = n.node(-1),
            a = n.indexAfter(-1),
            o = jo(i.contentMatchAt(a));
        if (!o || !i.canReplaceWith(a, a, o)) return !1;
        if (t) {
            let r = n.after(),
                i = e.tr.replaceWith(r, r, o.createAndFill());
            i.setSelection(A.near(i.doc.resolve(r), 1)), t(i.scrollIntoView())
        }
        return !0
    },
    No = (e, t) => {
        let n = e.selection,
            {
                $from: r,
                $to: i
            } = n;
        if (n instanceof Xa || r.parent.inlineContent || i.parent.inlineContent) return !1;
        let a = jo(i.parent.contentMatchAt(i.indexAfter()));
        if (!a || !a.isTextblock) return !1;
        if (t) {
            let n = (!r.parentOffset && i.index() < i.parent.childCount ? r : i).pos,
                o = e.tr.insert(n, a.createAndFill());
            o.setSelection(j.create(o.doc, n + 1)), t(o.scrollIntoView())
        }
        return !0
    },
    Po = (e, t) => {
        let {
            $cursor: n
        } = e.selection;
        if (!n || n.parent.content.size) return !1;
        if (n.depth > 1 && n.after() != n.end(-1)) {
            let r = n.before();
            if (Fr(e.doc, r)) return t && t(e.tr.split(r).scrollIntoView()), !0
        }
        let r = n.blockRange(),
            i = r && Ar(r);
        return i == null ? !1 : (t && t(e.tr.lift(r, i).scrollIntoView()), !0)
    };

function Fo(e) {
    return (t, n) => {
        let {
            $from: r,
            $to: i
        } = t.selection;
        if (t.selection instanceof M && t.selection.node.isBlock) return !r.parentOffset || !Fr(t.doc, r.pos) ? !1 : (n && n(t.tr.split(r.pos).scrollIntoView()), !0);
        if (!r.depth) return !1;
        let a = [],
            o, s, c = !1,
            l = !1;
        for (let t = r.depth;; t--)
            if (r.node(t).isBlock) {
                c = r.end(t) == r.pos + (r.depth - t), l = r.start(t) == r.pos - (r.depth - t), s = jo(r.node(t - 1).contentMatchAt(r.indexAfter(t - 1)));
                let n = e && e(i.parent, c, r);
                a.unshift(n || (c && s ? {
                    type: s
                } : null)), o = t;
                break
            } else {
                if (t == 1) return !1;
                a.unshift(null)
            }
        let u = t.tr;
        (t.selection instanceof j || t.selection instanceof Xa) && u.deleteSelection();
        let d = u.mapping.map(r.pos),
            f = Fr(u.doc, d, a.length, a);
        if (f ||= (a[0] = s ? {
                type: s
            } : null, Fr(u.doc, d, a.length, a)), !f) return !1;
        if (u.split(d, a.length, a), !c && l && r.node(o).type != s) {
            let e = u.mapping.map(r.before(o)),
                t = u.doc.resolve(e);
            s && r.node(o - 1).canReplaceWith(t.index(), t.index() + 1, s) && u.setNodeMarkup(u.mapping.map(r.before(o)), s)
        }
        return n && n(u.scrollIntoView()), !0
    }
}
var Io = Fo(),
    Lo = (e, t) => {
        let {
            $from: n,
            to: r
        } = e.selection, i, a = n.sharedDepth(r);
        return a == 0 ? !1 : (i = n.before(a), t && t(e.tr.setSelection(M.create(e.doc, i))), !0)
    },
    Ro = (e, t) => (t && t(e.tr.setSelection(new Xa(e.doc))), !0);

function zo(e, t, n) {
    let r = t.nodeBefore,
        i = t.nodeAfter,
        a = t.index();
    return !r || !i || !r.type.compatibleContent(i.type) ? !1 : !r.content.size && t.parent.canReplace(a - 1, a) ? (n && n(e.tr.delete(t.pos - r.nodeSize, t.pos).scrollIntoView()), !0) : !t.parent.canReplace(a, a + 1) || !(i.isTextblock || Ir(e.doc, t.pos)) ? !1 : (n && n(e.tr.join(t.pos).scrollIntoView()), !0)
}

function Bo(e, t, n, r) {
    let i = t.nodeBefore,
        a = t.nodeAfter,
        o, s, c = i.type.spec.isolating || a.type.spec.isolating;
    if (!c && zo(e, t, n)) return !0;
    let l = !c && t.parent.canReplace(t.index(), t.index() + 1);
    if (l && (o = (s = i.contentMatchAt(i.childCount)).findWrapping(a.type)) && s.matchType(o[0] || a.type).validEnd) {
        if (n) {
            let r = t.pos + a.nodeSize,
                s = x.empty;
            for (let e = o.length - 1; e >= 0; e--) s = x.from(o[e].create(null, s));
            s = x.from(i.copy(s));
            let c = e.tr.step(new Dr(t.pos - 1, r, t.pos, r, new S(s, 1, 0), o.length, !0)),
                l = c.doc.resolve(r + 2 * o.length);
            l.nodeAfter && l.nodeAfter.type == i.type && Ir(c.doc, l.pos) && c.join(l.pos), n(c.scrollIntoView())
        }
        return !0
    }
    let u = a.type.spec.isolating || r > 0 && c ? null : A.findFrom(t, 1),
        d = u && u.$from.blockRange(u.$to),
        f = d && Ar(d);
    if (f != null && f >= t.depth) return n && n(e.tr.lift(d, f).scrollIntoView()), !0;
    if (l && bo(a, `start`, !0) && bo(i, `end`)) {
        let r = i,
            o = [];
        for (; o.push(r), !r.isTextblock;) r = r.lastChild;
        let s = a,
            c = 1;
        for (; !s.isTextblock; s = s.firstChild) c++;
        if (r.canReplace(r.childCount, r.childCount, s.content)) {
            if (n) {
                let r = x.empty;
                for (let e = o.length - 1; e >= 0; e--) r = x.from(o[e].copy(r));
                n(e.tr.step(new Dr(t.pos - o.length, t.pos + a.nodeSize, t.pos + c, t.pos + a.nodeSize - c, new S(r, o.length, 0), 0, !0)).scrollIntoView())
            }
            return !0
        }
    }
    return !1
}

function Vo(e) {
    return function(t, n) {
        let r = t.selection,
            i = e < 0 ? r.$from : r.$to,
            a = i.depth;
        for (; i.node(a).isInline;) {
            if (!a) return !1;
            a--
        }
        return i.node(a).isTextblock ? (n && n(t.tr.setSelection(j.create(t.doc, e < 0 ? i.start(a) : i.end(a)))), !0) : !1
    }
}
var Ho = Vo(-1),
    Uo = Vo(1);

function Wo(e, t = null) {
    return function(n, r) {
        let {
            $from: i,
            $to: a
        } = n.selection, o = i.blockRange(a), s = o && jr(o, e, t);
        return s ? (r && r(n.tr.wrap(o, s).scrollIntoView()), !0) : !1
    }
}

function Go(e, t = null) {
    return function(n, r) {
        let i = !1;
        for (let r = 0; r < n.selection.ranges.length && !i; r++) {
            let {
                $from: {
                    pos: a
                },
                $to: {
                    pos: o
                }
            } = n.selection.ranges[r];
            n.doc.nodesBetween(a, o, (r, a) => {
                if (i) return !1;
                if (!(!r.isTextblock || r.hasMarkup(e, t)))
                    if (r.type == e) i = !0;
                    else {
                        let t = n.doc.resolve(a),
                            r = t.index();
                        i = t.parent.canReplaceWith(r, r + 1, e)
                    }
            })
        }
        if (!i) return !1;
        if (r) {
            let i = n.tr;
            for (let r = 0; r < n.selection.ranges.length; r++) {
                let {
                    $from: {
                        pos: a
                    },
                    $to: {
                        pos: o
                    }
                } = n.selection.ranges[r];
                i.setBlockType(a, o, e, t)
            }
            r(i.scrollIntoView())
        }
        return !0
    }
}

function Ko(...e) {
    return function(t, n, r) {
        for (let i = 0; i < e.length; i++)
            if (e[i](t, n, r)) return !0;
        return !1
    }
}
var qo = Ko(mo, go, xo),
    Jo = Ko(mo, wo, To),
    Yo = {
        Enter: Ko(Ao, No, Po, Io),
        "Mod-Enter": Mo,
        Backspace: qo,
        "Mod-Backspace": qo,
        "Shift-Backspace": qo,
        Delete: Jo,
        "Mod-Delete": Jo,
        "Mod-a": Ro
    },
    Xo = {
        "Ctrl-h": Yo.Backspace,
        "Alt-Backspace": Yo[`Mod-Backspace`],
        "Ctrl-d": Yo.Delete,
        "Ctrl-Alt-Backspace": Yo[`Mod-Delete`],
        "Alt-Delete": Yo[`Mod-Delete`],
        "Alt-d": Yo[`Mod-Delete`],
        "Ctrl-a": Ho,
        "Ctrl-e": Uo
    };
for (let e in Yo) Xo[e] = Yo[e];
typeof navigator < `u` ? /Mac|iP(hone|[oa]d)/.test(navigator.platform) : typeof os < `u` && os.platform && os.platform();

function Zo(e, t, n) {
    for (let r = 0;; r++) {
        if (r == e.childCount || r == t.childCount) return e.childCount == t.childCount ? null : n;
        let i = e.child(r),
            a = t.child(r);
        if (i == a) {
            n += i.nodeSize;
            continue
        }
        if (!i.sameMarkup(a)) return n;
        if (i.isText && i.text != a.text) {
            for (let e = 0; i.text[e] == a.text[e]; e++) n++;
            return n
        }
        if (i.content.size || a.content.size) {
            let e = Zo(i.content, a.content, n + 1);
            if (e != null) return e
        }
        n += i.nodeSize
    }
}

function Qo(e, t, n, r) {
    for (let i = e.childCount, a = t.childCount;;) {
        if (i == 0 || a == 0) return i == a ? null : {
            a: n,
            b: r
        };
        let o = e.child(--i),
            s = t.child(--a),
            c = o.nodeSize;
        if (o == s) {
            n -= c, r -= c;
            continue
        }
        if (!o.sameMarkup(s)) return {
            a: n,
            b: r
        };
        if (o.isText && o.text != s.text) {
            let e = 0,
                t = Math.min(o.text.length, s.text.length);
            for (; e < t && o.text[o.text.length - e - 1] == s.text[s.text.length - e - 1];) e++, n--, r--;
            return {
                a: n,
                b: r
            }
        }
        if (o.content.size || s.content.size) {
            let e = Qo(o.content, s.content, n - 1, r - 1);
            if (e) return e
        }
        n -= c, r -= c
    }
}
var P = class e {
    constructor(e, t) {
        if (this.content = e, this.size = t || 0, t == null)
            for (let t = 0; t < e.length; t++) this.size += e[t].nodeSize
    }
    nodesBetween(e, t, n, r = 0, i) {
        for (let a = 0, o = 0; o < t; a++) {
            let s = this.content[a],
                c = o + s.nodeSize;
            if (c > e && n(s, r + o, i || null, a) !== !1 && s.content.size) {
                let i = o + 1;
                s.nodesBetween(Math.max(0, e - i), Math.min(s.content.size, t - i), n, r + i)
            }
            o = c
        }
    }
    descendants(e) {
        this.nodesBetween(0, this.size, e)
    }
    textBetween(e, t, n, r) {
        let i = ``,
            a = !0;
        return this.nodesBetween(e, t, (o, s) => {
            let c = o.isText ? o.text.slice(Math.max(e, s) - s, t - s) : o.isLeaf ? r ? typeof r == `function` ? r(o) : r : o.type.spec.leafText ? o.type.spec.leafText(o) : `` : ``;
            o.isBlock && (o.isLeaf && c || o.isTextblock) && n && (a ? a = !1 : i += n), i += c
        }, 0), i
    }
    append(t) {
        if (!t.size) return this;
        if (!this.size) return t;
        let n = this.lastChild,
            r = t.firstChild,
            i = this.content.slice(),
            a = 0;
        for (n.isText && n.sameMarkup(r) && (i[i.length - 1] = n.withText(n.text + r.text), a = 1); a < t.content.length; a++) i.push(t.content[a]);
        return new e(i, this.size + t.size)
    }
    cut(t, n = this.size) {
        if (t == 0 && n == this.size) return this;
        let r = [],
            i = 0;
        if (n > t)
            for (let e = 0, a = 0; a < n; e++) {
                let o = this.content[e],
                    s = a + o.nodeSize;
                s > t && ((a < t || s > n) && (o = o.isText ? o.cut(Math.max(0, t - a), Math.min(o.text.length, n - a)) : o.cut(Math.max(0, t - a - 1), Math.min(o.content.size, n - a - 1))), r.push(o), i += o.nodeSize), a = s
            }
        return new e(r, i)
    }
    cutByIndex(t, n) {
        return t == n ? e.empty : t == 0 && n == this.content.length ? this : new e(this.content.slice(t, n))
    }
    replaceChild(t, n) {
        let r = this.content[t];
        if (r == n) return this;
        let i = this.content.slice(),
            a = this.size + n.nodeSize - r.nodeSize;
        return i[t] = n, new e(i, a)
    }
    addToStart(t) {
        return new e([t].concat(this.content), this.size + t.nodeSize)
    }
    addToEnd(t) {
        return new e(this.content.concat(t), this.size + t.nodeSize)
    }
    eq(e) {
        if (this.content.length != e.content.length) return !1;
        for (let t = 0; t < this.content.length; t++)
            if (!this.content[t].eq(e.content[t])) return !1;
        return !0
    }
    get firstChild() {
        return this.content.length ? this.content[0] : null
    }
    get lastChild() {
        return this.content.length ? this.content[this.content.length - 1] : null
    }
    get childCount() {
        return this.content.length
    }
    child(e) {
        let t = this.content[e];
        if (!t) throw RangeError(`Index ` + e + ` out of range for ` + this);
        return t
    }
    maybeChild(e) {
        return this.content[e] || null
    }
    forEach(e) {
        for (let t = 0, n = 0; t < this.content.length; t++) {
            let r = this.content[t];
            e(r, n, t), n += r.nodeSize
        }
    }
    findDiffStart(e, t = 0) {
        return Zo(this, e, t)
    }
    findDiffEnd(e, t = this.size, n = e.size) {
        return Qo(this, e, t, n)
    }
    findIndex(e) {
        if (e == 0) return es(0, e);
        if (e == this.size) return es(this.content.length, e);
        if (e > this.size || e < 0) throw RangeError(`Position ${e} outside of fragment (${this})`);
        for (let t = 0, n = 0;; t++) {
            let r = this.child(t),
                i = n + r.nodeSize;
            if (i >= e) return i == e ? es(t + 1, i) : es(t, n);
            n = i
        }
    }
    toString() {
        return `<` + this.toStringInner() + `>`
    }
    toStringInner() {
        return this.content.join(`, `)
    }
    toJSON() {
        return this.content.length ? this.content.map(e => e.toJSON()) : null
    }
    static fromJSON(t, n) {
        if (!n) return e.empty;
        if (!Array.isArray(n)) throw RangeError(`Invalid input for Fragment.fromJSON`);
        return new e(n.map(t.nodeFromJSON))
    }
    static fromArray(t) {
        if (!t.length) return e.empty;
        let n, r = 0;
        for (let e = 0; e < t.length; e++) {
            let i = t[e];
            r += i.nodeSize, e && i.isText && t[e - 1].sameMarkup(i) ? (n ||= t.slice(0, e), n[n.length - 1] = i.withText(n[n.length - 1].text + i.text)) : n && n.push(i)
        }
        return new e(n || t, r)
    }
    static from(t) {
        if (!t) return e.empty;
        if (t instanceof e) return t;
        if (Array.isArray(t)) return this.fromArray(t);
        if (t.attrs) return new e([t], t.nodeSize);
        throw RangeError(`Can not convert ` + t + ` to a Fragment` + (t.nodesBetween ? ` (looks like multiple versions of prosemirror-model were loaded)` : ``))
    }
};
P.empty = new P([], 0);
var $o = {
    index: 0,
    offset: 0
};

function es(e, t) {
    return $o.index = e, $o.offset = t, $o
}

function ts(e, t) {
    if (e === t) return !0;
    if (!(e && typeof e == `object`) || !(t && typeof t == `object`)) return !1;
    let n = Array.isArray(e);
    if (Array.isArray(t) != n) return !1;
    if (n) {
        if (e.length != t.length) return !1;
        for (let n = 0; n < e.length; n++)
            if (!ts(e[n], t[n])) return !1
    } else {
        for (let n in e)
            if (!(n in t) || !ts(e[n], t[n])) return !1;
        for (let n in t)
            if (!(n in e)) return !1
    }
    return !0
}
var ns = class e {
    constructor(e, t) {
        this.type = e, this.attrs = t
    }
    addToSet(e) {
        let t, n = !1;
        for (let r = 0; r < e.length; r++) {
            let i = e[r];
            if (this.eq(i)) return e;
            if (this.type.excludes(i.type)) t ||= e.slice(0, r);
            else if (i.type.excludes(this.type)) return e;
            else !n && i.type.rank > this.type.rank && (t ||= e.slice(0, r), t.push(this), n = !0), t && t.push(i)
        }
        return t ||= e.slice(), n || t.push(this), t
    }
    removeFromSet(e) {
        for (let t = 0; t < e.length; t++)
            if (this.eq(e[t])) return e.slice(0, t).concat(e.slice(t + 1));
        return e
    }
    isInSet(e) {
        for (let t = 0; t < e.length; t++)
            if (this.eq(e[t])) return !0;
        return !1
    }
    eq(e) {
        return this == e || this.type == e.type && ts(this.attrs, e.attrs)
    }
    toJSON() {
        let e = {
            type: this.type.name
        };
        for (let t in this.attrs) {
            e.attrs = this.attrs;
            break
        }
        return e
    }
    static fromJSON(e, t) {
        if (!t) throw RangeError(`Invalid input for Mark.fromJSON`);
        let n = e.marks[t.type];
        if (!n) throw RangeError(`There is no mark type ${t.type} in this schema`);
        let r = n.create(t.attrs);
        return n.checkAttrs(r.attrs), r
    }
    static sameSet(e, t) {
        if (e == t) return !0;
        if (e.length != t.length) return !1;
        for (let n = 0; n < e.length; n++)
            if (!e[n].eq(t[n])) return !1;
        return !0
    }
    static setFrom(t) {
        if (!t || Array.isArray(t) && t.length == 0) return e.none;
        if (t instanceof e) return [t];
        let n = t.slice();
        return n.sort((e, t) => e.type.rank - t.type.rank), n
    }
};
ns.none = [];
var rs = class extends Error {},
    F = class e {
        constructor(e, t, n) {
            this.content = e, this.openStart = t, this.openEnd = n
        }
        get size() {
            return this.content.size - this.openStart - this.openEnd
        }
        insertAt(t, n) {
            let r = as(this.content, t + this.openStart, n);
            return r && new e(r, this.openStart, this.openEnd)
        }
        removeBetween(t, n) {
            return new e(is(this.content, t + this.openStart, n + this.openStart), this.openStart, this.openEnd)
        }
        eq(e) {
            return this.content.eq(e.content) && this.openStart == e.openStart && this.openEnd == e.openEnd
        }
        toString() {
            return this.content + `(` + this.openStart + `,` + this.openEnd + `)`
        }
        toJSON() {
            if (!this.content.size) return null;
            let e = {
                content: this.content.toJSON()
            };
            return this.openStart > 0 && (e.openStart = this.openStart), this.openEnd > 0 && (e.openEnd = this.openEnd), e
        }
        static fromJSON(t, n) {
            if (!n) return e.empty;
            let r = n.openStart || 0,
                i = n.openEnd || 0;
            if (typeof r != `number` || typeof i != `number`) throw RangeError(`Invalid input for Slice.fromJSON`);
            return new e(P.fromJSON(t, n.content), r, i)
        }
        static maxOpen(t, n = !0) {
            let r = 0,
                i = 0;
            for (let e = t.firstChild; e && !e.isLeaf && (n || !e.type.spec.isolating); e = e.firstChild) r++;
            for (let e = t.lastChild; e && !e.isLeaf && (n || !e.type.spec.isolating); e = e.lastChild) i++;
            return new e(t, r, i)
        }
    };
F.empty = new F(P.empty, 0, 0);

function is(e, t, n) {
    let {
        index: r,
        offset: i
    } = e.findIndex(t), a = e.maybeChild(r), {
        index: o,
        offset: s
    } = e.findIndex(n);
    if (i == t || a.isText) {
        if (s != n && !e.child(o).isText) throw RangeError(`Removing non-flat range`);
        return e.cut(0, t).append(e.cut(n))
    }
    if (r != o) throw RangeError(`Removing non-flat range`);
    return e.replaceChild(r, a.copy(is(a.content, t - i - 1, n - i - 1)))
}

function as(e, t, n, r) {
    let {
        index: i,
        offset: a
    } = e.findIndex(t), o = e.maybeChild(i);
    if (a == t || o.isText) return r && !r.canReplace(i, i, n) ? null : e.cut(0, t).append(n).append(e.cut(t));
    let s = as(o.content, t - a - 1, n, o);
    return s && e.replaceChild(i, o.copy(s))
}

function ss(e, t, n) {
    if (n.openStart > e.depth) throw new rs(`Inserted content deeper than insertion position`);
    if (e.depth - n.openStart != t.depth - n.openEnd) throw new rs(`Inconsistent open depths`);
    return cs(e, t, n, 0)
}

function cs(e, t, n, r) {
    let i = e.index(r),
        a = e.node(r);
    if (i == t.index(r) && r < e.depth - n.openStart) {
        let o = cs(e, t, n, r + 1);
        return a.copy(a.content.replaceChild(i, o))
    } else if (n.content.size)
        if (!n.openStart && !n.openEnd && e.depth == r && t.depth == r) {
            let r = e.parent,
                i = r.content;
            return ps(r, i.cut(0, e.parentOffset).append(n.content).append(i.cut(t.parentOffset)))
        } else {
            let {
                start: i,
                end: o
            } = gs(n, e);
            return ps(a, ms(e, i, o, t, r))
        }
    else return ps(a, hs(e, t, r))
}

function ls(e, t) {
    if (!t.type.compatibleContent(e.type)) throw new rs(`Cannot join ` + t.type.name + ` onto ` + e.type.name)
}

function us(e, t, n) {
    let r = e.node(n);
    return ls(r, t.node(n)), r
}

function ds(e, t) {
    let n = t.length - 1;
    n >= 0 && e.isText && e.sameMarkup(t[n]) ? t[n] = e.withText(t[n].text + e.text) : t.push(e)
}

function fs(e, t, n, r) {
    let i = (t || e).node(n),
        a = 0,
        o = t ? t.index(n) : i.childCount;
    e && (a = e.index(n), e.depth > n ? a++ : e.textOffset && (ds(e.nodeAfter, r), a++));
    for (let e = a; e < o; e++) ds(i.child(e), r);
    t && t.depth == n && t.textOffset && ds(t.nodeBefore, r)
}

function ps(e, t) {
    return e.type.checkContent(t), e.copy(t)
}

function ms(e, t, n, r, i) {
    let a = e.depth > i && us(e, t, i + 1),
        o = r.depth > i && us(n, r, i + 1),
        s = [];
    return fs(null, e, i, s), a && o && t.index(i) == n.index(i) ? (ls(a, o), ds(ps(a, ms(e, t, n, r, i + 1)), s)) : (a && ds(ps(a, hs(e, t, i + 1)), s), fs(t, n, i, s), o && ds(ps(o, hs(n, r, i + 1)), s)), fs(r, null, i, s), new P(s)
}

function hs(e, t, n) {
    let r = [];
    return fs(null, e, n, r), e.depth > n && ds(ps(us(e, t, n + 1), hs(e, t, n + 1)), r), fs(t, null, n, r), new P(r)
}

function gs(e, t) {
    let n = t.depth - e.openStart,
        r = t.node(n).copy(e.content);
    for (let e = n - 1; e >= 0; e--) r = t.node(e).copy(P.from(r));
    return {
        start: r.resolveNoCache(e.openStart + n),
        end: r.resolveNoCache(r.content.size - e.openEnd - n)
    }
}
var _s = class e {
        constructor(e, t, n) {
            this.pos = e, this.path = t, this.parentOffset = n, this.depth = t.length / 3 - 1
        }
        resolveDepth(e) {
            return e == null ? this.depth : e < 0 ? this.depth + e : e
        }
        get parent() {
            return this.node(this.depth)
        }
        get doc() {
            return this.node(0)
        }
        node(e) {
            return this.path[this.resolveDepth(e) * 3]
        }
        index(e) {
            return this.path[this.resolveDepth(e) * 3 + 1]
        }
        indexAfter(e) {
            return e = this.resolveDepth(e), this.index(e) + (e == this.depth && !this.textOffset ? 0 : 1)
        }
        start(e) {
            return e = this.resolveDepth(e), e == 0 ? 0 : this.path[e * 3 - 1] + 1
        }
        end(e) {
            return e = this.resolveDepth(e), this.start(e) + this.node(e).content.size
        }
        before(e) {
            if (e = this.resolveDepth(e), !e) throw RangeError(`There is no position before the top-level node`);
            return e == this.depth + 1 ? this.pos : this.path[e * 3 - 1]
        }
        after(e) {
            if (e = this.resolveDepth(e), !e) throw RangeError(`There is no position after the top-level node`);
            return e == this.depth + 1 ? this.pos : this.path[e * 3 - 1] + this.path[e * 3].nodeSize
        }
        get textOffset() {
            return this.pos - this.path[this.path.length - 1]
        }
        get nodeAfter() {
            let e = this.parent,
                t = this.index(this.depth);
            if (t == e.childCount) return null;
            let n = this.pos - this.path[this.path.length - 1],
                r = e.child(t);
            return n ? e.child(t).cut(n) : r
        }
        get nodeBefore() {
            let e = this.index(this.depth),
                t = this.pos - this.path[this.path.length - 1];
            return t ? this.parent.child(e).cut(0, t) : e == 0 ? null : this.parent.child(e - 1)
        }
        posAtIndex(e, t) {
            t = this.resolveDepth(t);
            let n = this.path[t * 3],
                r = t == 0 ? 0 : this.path[t * 3 - 1] + 1;
            for (let t = 0; t < e; t++) r += n.child(t).nodeSize;
            return r
        }
        marks() {
            let e = this.parent,
                t = this.index();
            if (e.content.size == 0) return ns.none;
            if (this.textOffset) return e.child(t).marks;
            let n = e.maybeChild(t - 1),
                r = e.maybeChild(t);
            if (!n) {
                let e = n;
                n = r, r = e
            }
            let i = n.marks;
            for (var a = 0; a < i.length; a++) i[a].type.spec.inclusive === !1 && (!r || !i[a].isInSet(r.marks)) && (i = i[a--].removeFromSet(i));
            return i
        }
        marksAcross(e) {
            let t = this.parent.maybeChild(this.index());
            if (!t || !t.isInline) return null;
            let n = t.marks,
                r = e.parent.maybeChild(e.index());
            for (var i = 0; i < n.length; i++) n[i].type.spec.inclusive === !1 && (!r || !n[i].isInSet(r.marks)) && (n = n[i--].removeFromSet(n));
            return n
        }
        sharedDepth(e) {
            for (let t = this.depth; t > 0; t--)
                if (this.start(t) <= e && this.end(t) >= e) return t;
            return 0
        }
        blockRange(e = this, t) {
            if (e.pos < this.pos) return e.blockRange(this);
            for (let n = this.depth - (this.parent.inlineContent || this.pos == e.pos ? 1 : 0); n >= 0; n--)
                if (e.pos <= this.end(n) && (!t || t(this.node(n)))) return new xs(this, e, n);
            return null
        }
        sameParent(e) {
            return this.pos - this.parentOffset == e.pos - e.parentOffset
        }
        max(e) {
            return e.pos > this.pos ? e : this
        }
        min(e) {
            return e.pos < this.pos ? e : this
        }
        toString() {
            let e = ``;
            for (let t = 1; t <= this.depth; t++) e += (e ? `/` : ``) + this.node(t).type.name + `_` + this.index(t - 1);
            return e + `:` + this.parentOffset
        }
        static resolve(t, n) {
            if (!(n >= 0 && n <= t.content.size)) throw RangeError(`Position ` + n + ` out of range`);
            let r = [],
                i = 0,
                a = n;
            for (let e = t;;) {
                let {
                    index: t,
                    offset: n
                } = e.content.findIndex(a), o = a - n;
                if (r.push(e, t, i + n), !o || (e = e.child(t), e.isText)) break;
                a = o - 1, i += n + 1
            }
            return new e(n, r, a)
        }
        static resolveCached(t, n) {
            let r = bs.get(t);
            if (r)
                for (let e = 0; e < r.elts.length; e++) {
                    let t = r.elts[e];
                    if (t.pos == n) return t
                } else bs.set(t, r = new vs);
            let i = r.elts[r.i] = e.resolve(t, n);
            return r.i = (r.i + 1) % ys, i
        }
    },
    vs = class {
        constructor() {
            this.elts = [], this.i = 0
        }
    },
    ys = 12,
    bs = new WeakMap,
    xs = class {
        constructor(e, t, n) {
            this.$from = e, this.$to = t, this.depth = n
        }
        get start() {
            return this.$from.before(this.depth + 1)
        }
        get end() {
            return this.$to.after(this.depth + 1)
        }
        get parent() {
            return this.$from.node(this.depth)
        }
        get startIndex() {
            return this.$from.index(this.depth)
        }
        get endIndex() {
            return this.$to.indexAfter(this.depth)
        }
    },
    Ss = Object.create(null),
    Cs = class e {
        constructor(e, t, n, r = ns.none) {
            this.type = e, this.attrs = t, this.marks = r, this.content = n || P.empty
        }
        get children() {
            return this.content.content
        }
        get nodeSize() {
            return this.isLeaf ? 1 : 2 + this.content.size
        }
        get childCount() {
            return this.content.childCount
        }
        child(e) {
            return this.content.child(e)
        }
        maybeChild(e) {
            return this.content.maybeChild(e)
        }
        forEach(e) {
            this.content.forEach(e)
        }
        nodesBetween(e, t, n, r = 0) {
            this.content.nodesBetween(e, t, n, r, this)
        }
        descendants(e) {
            this.nodesBetween(0, this.content.size, e)
        }
        get textContent() {
            return this.isLeaf && this.type.spec.leafText ? this.type.spec.leafText(this) : this.textBetween(0, this.content.size, ``)
        }
        textBetween(e, t, n, r) {
            return this.content.textBetween(e, t, n, r)
        }
        get firstChild() {
            return this.content.firstChild
        }
        get lastChild() {
            return this.content.lastChild
        }
        eq(e) {
            return this == e || this.sameMarkup(e) && this.content.eq(e.content)
        }
        sameMarkup(e) {
            return this.hasMarkup(e.type, e.attrs, e.marks)
        }
        hasMarkup(e, t, n) {
            return this.type == e && ts(this.attrs, t || e.defaultAttrs || Ss) && ns.sameSet(this.marks, n || ns.none)
        }
        copy(t = null) {
            return t == this.content ? this : new e(this.type, this.attrs, t, this.marks)
        }
        mark(t) {
            return t == this.marks ? this : new e(this.type, this.attrs, this.content, t)
        }
        cut(e, t = this.content.size) {
            return e == 0 && t == this.content.size ? this : this.copy(this.content.cut(e, t))
        }
        slice(e, t = this.content.size, n = !1) {
            if (e == t) return F.empty;
            let r = this.resolve(e),
                i = this.resolve(t),
                a = n ? 0 : r.sharedDepth(t),
                o = r.start(a);
            return new F(r.node(a).content.cut(r.pos - o, i.pos - o), r.depth - a, i.depth - a)
        }
        replace(e, t, n) {
            return ss(this.resolve(e), this.resolve(t), n)
        }
        nodeAt(e) {
            for (let t = this;;) {
                let {
                    index: n,
                    offset: r
                } = t.content.findIndex(e);
                if (t = t.maybeChild(n), !t) return null;
                if (r == e || t.isText) return t;
                e -= r + 1
            }
        }
        childAfter(e) {
            let {
                index: t,
                offset: n
            } = this.content.findIndex(e);
            return {
                node: this.content.maybeChild(t),
                index: t,
                offset: n
            }
        }
        childBefore(e) {
            if (e == 0) return {
                node: null,
                index: 0,
                offset: 0
            };
            let {
                index: t,
                offset: n
            } = this.content.findIndex(e);
            if (n < e) return {
                node: this.content.child(t),
                index: t,
                offset: n
            };
            let r = this.content.child(t - 1);
            return {
                node: r,
                index: t - 1,
                offset: n - r.nodeSize
            }
        }
        resolve(e) {
            return _s.resolveCached(this, e)
        }
        resolveNoCache(e) {
            return _s.resolve(this, e)
        }
        rangeHasMark(e, t, n) {
            let r = !1;
            return t > e && this.nodesBetween(e, t, e => (n.isInSet(e.marks) && (r = !0), !r)), r
        }
        get isBlock() {
            return this.type.isBlock
        }
        get isTextblock() {
            return this.type.isTextblock
        }
        get inlineContent() {
            return this.type.inlineContent
        }
        get isInline() {
            return this.type.isInline
        }
        get isText() {
            return this.type.isText
        }
        get isLeaf() {
            return this.type.isLeaf
        }
        get isAtom() {
            return this.type.isAtom
        }
        toString() {
            if (this.type.spec.toDebugString) return this.type.spec.toDebugString(this);
            let e = this.type.name;
            return this.content.size && (e += `(` + this.content.toStringInner() + `)`), ws(this.marks, e)
        }
        contentMatchAt(e) {
            let t = this.type.contentMatch.matchFragment(this.content, 0, e);
            if (!t) throw Error(`Called contentMatchAt on a node with invalid content`);
            return t
        }
        canReplace(e, t, n = P.empty, r = 0, i = n.childCount) {
            let a = this.contentMatchAt(e).matchFragment(n, r, i),
                o = a && a.matchFragment(this.content, t);
            if (!o || !o.validEnd) return !1;
            for (let e = r; e < i; e++)
                if (!this.type.allowsMarks(n.child(e).marks)) return !1;
            return !0
        }
        canReplaceWith(e, t, n, r) {
            if (r && !this.type.allowsMarks(r)) return !1;
            let i = this.contentMatchAt(e).matchType(n),
                a = i && i.matchFragment(this.content, t);
            return a ? a.validEnd : !1
        }
        canAppend(e) {
            return e.content.size ? this.canReplace(this.childCount, this.childCount, e.content) : this.type.compatibleContent(e.type)
        }
        check() {
            this.type.checkContent(this.content), this.type.checkAttrs(this.attrs);
            let e = ns.none;
            for (let t = 0; t < this.marks.length; t++) {
                let n = this.marks[t];
                n.type.checkAttrs(n.attrs), e = n.addToSet(e)
            }
            if (!ns.sameSet(e, this.marks)) throw RangeError(`Invalid collection of marks for node ${this.type.name}: ${this.marks.map(e=>e.type.name)}`);
            this.content.forEach(e => e.check())
        }
        toJSON() {
            let e = {
                type: this.type.name
            };
            for (let t in this.attrs) {
                e.attrs = this.attrs;
                break
            }
            return this.content.size && (e.content = this.content.toJSON()), this.marks.length && (e.marks = this.marks.map(e => e.toJSON())), e
        }
        static fromJSON(e, t) {
            if (!t) throw RangeError(`Invalid input for Node.fromJSON`);
            let n;
            if (t.marks) {
                if (!Array.isArray(t.marks)) throw RangeError(`Invalid mark data for Node.fromJSON`);
                n = t.marks.map(e.markFromJSON)
            }
            if (t.type == `text`) {
                if (typeof t.text != `string`) throw RangeError(`Invalid text node in JSON`);
                return e.text(t.text, n)
            }
            let r = P.fromJSON(e, t.content),
                i = e.nodeType(t.type).create(t.attrs, r, n);
            return i.type.checkAttrs(i.attrs), i
        }
    };
Cs.prototype.text = void 0;

function ws(e, t) {
    for (let n = e.length - 1; n >= 0; n--) t = e[n].type.name + `(` + t + `)`;
    return t
}
var Ts = class e {
    constructor(e) {
        this.validEnd = e, this.next = [], this.wrapCache = []
    }
    static parse(t, n) {
        let r = new Es(t, n);
        if (r.next == null) return e.empty;
        let i = Ds(r);
        r.next && r.err(`Unexpected trailing text`);
        let a = Ls(Ps(i));
        return Rs(a, r), a
    }
    matchType(e) {
        for (let t = 0; t < this.next.length; t++)
            if (this.next[t].type == e) return this.next[t].next;
        return null
    }
    matchFragment(e, t = 0, n = e.childCount) {
        let r = this;
        for (let i = t; r && i < n; i++) r = r.matchType(e.child(i).type);
        return r
    }
    get inlineContent() {
        return this.next.length != 0 && this.next[0].type.isInline
    }
    get defaultType() {
        for (let e = 0; e < this.next.length; e++) {
            let {
                type: t
            } = this.next[e];
            if (!(t.isText || t.hasRequiredAttrs())) return t
        }
        return null
    }
    compatible(e) {
        for (let t = 0; t < this.next.length; t++)
            for (let n = 0; n < e.next.length; n++)
                if (this.next[t].type == e.next[n].type) return !0;
        return !1
    }
    fillBefore(e, t = !1, n = 0) {
        let r = [this];

        function i(a, o) {
            let s = a.matchFragment(e, n);
            if (s && (!t || s.validEnd)) return P.from(o.map(e => e.createAndFill()));
            for (let e = 0; e < a.next.length; e++) {
                let {
                    type: t,
                    next: n
                } = a.next[e];
                if (!(t.isText || t.hasRequiredAttrs()) && r.indexOf(n) == -1) {
                    r.push(n);
                    let e = i(n, o.concat(t));
                    if (e) return e
                }
            }
            return null
        }
        return i(this, [])
    }
    findWrapping(e) {
        for (let t = 0; t < this.wrapCache.length; t += 2)
            if (this.wrapCache[t] == e) return this.wrapCache[t + 1];
        let t = this.computeWrapping(e);
        return this.wrapCache.push(e, t), t
    }
    computeWrapping(e) {
        let t = Object.create(null),
            n = [{
                match: this,
                type: null,
                via: null
            }];
        for (; n.length;) {
            let r = n.shift(),
                i = r.match;
            if (i.matchType(e)) {
                let e = [];
                for (let t = r; t.type; t = t.via) e.push(t.type);
                return e.reverse()
            }
            for (let e = 0; e < i.next.length; e++) {
                let {
                    type: a,
                    next: o
                } = i.next[e];
                !a.isLeaf && !a.hasRequiredAttrs() && !(a.name in t) && (!r.type || o.validEnd) && (n.push({
                    match: a.contentMatch,
                    type: a,
                    via: r
                }), t[a.name] = !0)
            }
        }
        return null
    }
    get edgeCount() {
        return this.next.length
    }
    edge(e) {
        if (e >= this.next.length) throw RangeError(`There's no ${e}th edge in this content match`);
        return this.next[e]
    }
    toString() {
        let e = [];

        function t(n) {
            e.push(n);
            for (let r = 0; r < n.next.length; r++) e.indexOf(n.next[r].next) == -1 && t(n.next[r].next)
        }
        return t(this), e.map((t, n) => {
            let r = n + (t.validEnd ? `*` : ` `) + ` `;
            for (let n = 0; n < t.next.length; n++) r += (n ? `, ` : ``) + t.next[n].type.name + `->` + e.indexOf(t.next[n].next);
            return r
        }).join(`
`)
    }
};
Ts.empty = new Ts(!0);
var Es = class {
    constructor(e, t) {
        this.string = e, this.nodeTypes = t, this.inline = null, this.pos = 0, this.tokens = e.split(/\s*(?=\b|\W|$)/), this.tokens[this.tokens.length - 1] == `` && this.tokens.pop(), this.tokens[0] == `` && this.tokens.shift()
    }
    get next() {
        return this.tokens[this.pos]
    }
    eat(e) {
        return this.next == e && (this.pos++ || !0)
    }
    err(e) {
        throw SyntaxError(e + ` (in content expression '` + this.string + `')`)
    }
};

function Ds(e) {
    let t = [];
    do t.push(Os(e)); while (e.eat(`|`));
    return t.length == 1 ? t[0] : {
        type: `choice`,
        exprs: t
    }
}

function Os(e) {
    let t = [];
    do t.push(ks(e)); while (e.next && e.next != `)` && e.next != `|`);
    return t.length == 1 ? t[0] : {
        type: `seq`,
        exprs: t
    }
}

function ks(e) {
    let t = Ns(e);
    for (;;)
        if (e.eat(`+`)) t = {
            type: `plus`,
            expr: t
        };
        else if (e.eat(`*`)) t = {
        type: `star`,
        expr: t
    };
    else if (e.eat(`?`)) t = {
        type: `opt`,
        expr: t
    };
    else if (e.eat(`{`)) t = js(e, t);
    else break;
    return t
}

function As(e) {
    /\D/.test(e.next) && e.err(`Expected number, got '` + e.next + `'`);
    let t = Number(e.next);
    return e.pos++, t
}

function js(e, t) {
    let n = As(e),
        r = n;
    return e.eat(`,`) && (r = e.next == `}` ? -1 : As(e)), e.eat(`}`) || e.err(`Unclosed braced range`), {
        type: `range`,
        min: n,
        max: r,
        expr: t
    }
}

function Ms(e, t) {
    let n = e.nodeTypes,
        r = n[t];
    if (r) return [r];
    let i = [];
    for (let e in n) {
        let r = n[e];
        r.isInGroup(t) && i.push(r)
    }
    return i.length == 0 && e.err(`No node type or group '` + t + `' found`), i
}

function Ns(e) {
    if (e.eat(`(`)) {
        let t = Ds(e);
        return e.eat(`)`) || e.err(`Missing closing paren`), t
    } else if (/\W/.test(e.next)) e.err(`Unexpected token '` + e.next + `'`);
    else {
        let t = Ms(e, e.next).map(t => (e.inline == null ? e.inline = t.isInline : e.inline != t.isInline && e.err(`Mixing inline and block content`), {
            type: `name`,
            value: t
        }));
        return e.pos++, t.length == 1 ? t[0] : {
            type: `choice`,
            exprs: t
        }
    }
}

function Ps(e) {
    let t = [
        []
    ];
    return i(a(e, 0), n()), t;

    function n() {
        return t.push([]) - 1
    }

    function r(e, n, r) {
        let i = {
            term: r,
            to: n
        };
        return t[e].push(i), i
    }

    function i(e, t) {
        e.forEach(e => e.to = t)
    }

    function a(e, t) {
        if (e.type == `choice`) return e.exprs.reduce((e, n) => e.concat(a(n, t)), []);
        if (e.type == `seq`)
            for (let r = 0;; r++) {
                let o = a(e.exprs[r], t);
                if (r == e.exprs.length - 1) return o;
                i(o, t = n())
            } else if (e.type == `star`) {
                let o = n();
                return r(t, o), i(a(e.expr, o), o), [r(o)]
            } else if (e.type == `plus`) {
            let o = n();
            return i(a(e.expr, t), o), i(a(e.expr, o), o), [r(o)]
        } else if (e.type == `opt`) return [r(t)].concat(a(e.expr, t));
        else if (e.type == `range`) {
            let o = t;
            for (let t = 0; t < e.min; t++) {
                let t = n();
                i(a(e.expr, o), t), o = t
            }
            if (e.max == -1) i(a(e.expr, o), o);
            else
                for (let t = e.min; t < e.max; t++) {
                    let t = n();
                    r(o, t), i(a(e.expr, o), t), o = t
                }
            return [r(o)]
        } else if (e.type == `name`) return [r(t, void 0, e.value)];
        else throw Error(`Unknown expr type`)
    }
}

function Fs(e, t) {
    return t - e
}

function Is(e, t) {
    let n = [];
    return r(t), n.sort(Fs);

    function r(t) {
        let i = e[t];
        if (i.length == 1 && !i[0].term) return r(i[0].to);
        n.push(t);
        for (let e = 0; e < i.length; e++) {
            let {
                term: t,
                to: a
            } = i[e];
            !t && n.indexOf(a) == -1 && r(a)
        }
    }
}

function Ls(e) {
    let t = Object.create(null);
    return n(Is(e, 0));

    function n(r) {
        let i = [];
        r.forEach(t => {
            e[t].forEach(({
                term: t,
                to: n
            }) => {
                if (!t) return;
                let r;
                for (let e = 0; e < i.length; e++) i[e][0] == t && (r = i[e][1]);
                Is(e, n).forEach(e => {
                    r || i.push([t, r = []]), r.indexOf(e) == -1 && r.push(e)
                })
            })
        });
        let a = t[r.join(`,`)] = new Ts(r.indexOf(e.length - 1) > -1);
        for (let e = 0; e < i.length; e++) {
            let r = i[e][1].sort(Fs);
            a.next.push({
                type: i[e][0],
                next: t[r.join(`,`)] || n(r)
            })
        }
        return a
    }
}

function Rs(e, t) {
    for (let n = 0, r = [e]; n < r.length; n++) {
        let e = r[n],
            i = !e.validEnd,
            a = [];
        for (let t = 0; t < e.next.length; t++) {
            let {
                type: n,
                next: o
            } = e.next[t];
            a.push(n.name), i && !(n.isText || n.hasRequiredAttrs()) && (i = !1), r.indexOf(o) == -1 && r.push(o)
        }
        i && t.err(`Only non-generatable nodes (` + a.join(`, `) + `) in a required position (see https://prosemirror.net/docs/guide/#generatable)`)
    }
}
var zs = 65535,
    Bs = 2 ** 16;

function Vs(e, t) {
    return e + t * Bs
}

function Hs(e) {
    return e & zs
}

function Us(e) {
    return (e - (e & zs)) / Bs
}
var Ws = 1,
    Gs = 2,
    Ks = 4,
    qs = 8,
    Js = class {
        constructor(e, t, n) {
            this.pos = e, this.delInfo = t, this.recover = n
        }
        get deleted() {
            return (this.delInfo & qs) > 0
        }
        get deletedBefore() {
            return (this.delInfo & (Ws | Ks)) > 0
        }
        get deletedAfter() {
            return (this.delInfo & (Gs | Ks)) > 0
        }
        get deletedAcross() {
            return (this.delInfo & Ks) > 0
        }
    },
    Ys = class e {
        constructor(t, n = !1) {
            if (this.ranges = t, this.inverted = n, !t.length && e.empty) return e.empty
        }
        recover(e) {
            let t = 0,
                n = Hs(e);
            if (!this.inverted)
                for (let e = 0; e < n; e++) t += this.ranges[e * 3 + 2] - this.ranges[e * 3 + 1];
            return this.ranges[n * 3] + t + Us(e)
        }
        mapResult(e, t = 1) {
            return this._map(e, t, !1)
        }
        map(e, t = 1) {
            return this._map(e, t, !0)
        }
        _map(e, t, n) {
            let r = 0,
                i = this.inverted ? 2 : 1,
                a = this.inverted ? 1 : 2;
            for (let o = 0; o < this.ranges.length; o += 3) {
                let s = this.ranges[o] - (this.inverted ? r : 0);
                if (s > e) break;
                let c = this.ranges[o + i],
                    l = this.ranges[o + a],
                    u = s + c;
                if (e <= u) {
                    let i = c ? e == s ? -1 : e == u ? 1 : t : t,
                        a = s + r + (i < 0 ? 0 : l);
                    if (n) return a;
                    let d = e == (t < 0 ? s : u) ? null : Vs(o / 3, e - s),
                        f = e == s ? Gs : e == u ? Ws : Ks;
                    return (t < 0 ? e != s : e != u) && (f |= qs), new Js(a, f, d)
                }
                r += l - c
            }
            return n ? e + r : new Js(e + r, 0, null)
        }
        touches(e, t) {
            let n = 0,
                r = Hs(t),
                i = this.inverted ? 2 : 1,
                a = this.inverted ? 1 : 2;
            for (let t = 0; t < this.ranges.length; t += 3) {
                let o = this.ranges[t] - (this.inverted ? n : 0);
                if (o > e) break;
                let s = this.ranges[t + i];
                if (e <= o + s && t == r * 3) return !0;
                n += this.ranges[t + a] - s
            }
            return !1
        }
        forEach(e) {
            let t = this.inverted ? 2 : 1,
                n = this.inverted ? 1 : 2;
            for (let r = 0, i = 0; r < this.ranges.length; r += 3) {
                let a = this.ranges[r],
                    o = a - (this.inverted ? i : 0),
                    s = a + (this.inverted ? 0 : i),
                    c = this.ranges[r + t],
                    l = this.ranges[r + n];
                e(o, o + c, s, s + l), i += l - c
            }
        }
        invert() {
            return new e(this.ranges, !this.inverted)
        }
        toString() {
            return (this.inverted ? `-` : ``) + JSON.stringify(this.ranges)
        }
        static offset(t) {
            return t == 0 ? e.empty : new e(t < 0 ? [0, -t, 0] : [0, 0, t])
        }
    };
Ys.empty = new Ys([]);
var Xs = Object.create(null),
    I = class {
        getMap() {
            return Ys.empty
        }
        merge(e) {
            return null
        }
        static fromJSON(e, t) {
            if (!t || !t.stepType) throw RangeError(`Invalid input for Step.fromJSON`);
            let n = Xs[t.stepType];
            if (!n) throw RangeError(`No step type ${t.stepType} defined`);
            return n.fromJSON(e, t)
        }
        static jsonID(e, t) {
            if (e in Xs) throw RangeError(`Duplicate use of step JSON ID ` + e);
            return Xs[e] = t, t.prototype.jsonID = e, t
        }
    },
    L = class e {
        constructor(e, t) {
            this.doc = e, this.failed = t
        }
        static ok(t) {
            return new e(t, null)
        }
        static fail(t) {
            return new e(null, t)
        }
        static fromReplace(t, n, r, i) {
            try {
                return e.ok(t.replace(n, r, i))
            } catch (t) {
                if (t instanceof rs) return e.fail(t.message);
                throw t
            }
        }
    };

function Zs(e, t, n) {
    let r = [];
    for (let i = 0; i < e.childCount; i++) {
        let a = e.child(i);
        a.content.size && (a = a.copy(Zs(a.content, t, a))), a.isInline && (a = t(a, n, i)), r.push(a)
    }
    return P.fromArray(r)
}
var Qs = class e extends I {
    constructor(e, t, n) {
        super(), this.from = e, this.to = t, this.mark = n
    }
    apply(e) {
        let t = e.slice(this.from, this.to),
            n = e.resolve(this.from),
            r = n.node(n.sharedDepth(this.to)),
            i = new F(Zs(t.content, (e, t) => !e.isAtom || !t.type.allowsMarkType(this.mark.type) ? e : e.mark(this.mark.addToSet(e.marks)), r), t.openStart, t.openEnd);
        return L.fromReplace(e, this.from, this.to, i)
    }
    invert() {
        return new $s(this.from, this.to, this.mark)
    }
    map(t) {
        let n = t.mapResult(this.from, 1),
            r = t.mapResult(this.to, -1);
        return n.deleted && r.deleted || n.pos >= r.pos ? null : new e(n.pos, r.pos, this.mark)
    }
    merge(t) {
        return t instanceof e && t.mark.eq(this.mark) && this.from <= t.to && this.to >= t.from ? new e(Math.min(this.from, t.from), Math.max(this.to, t.to), this.mark) : null
    }
    toJSON() {
        return {
            stepType: `addMark`,
            mark: this.mark.toJSON(),
            from: this.from,
            to: this.to
        }
    }
    static fromJSON(t, n) {
        if (typeof n.from != `number` || typeof n.to != `number`) throw RangeError(`Invalid input for AddMarkStep.fromJSON`);
        return new e(n.from, n.to, t.markFromJSON(n.mark))
    }
};
I.jsonID(`addMark`, Qs);
var $s = class e extends I {
    constructor(e, t, n) {
        super(), this.from = e, this.to = t, this.mark = n
    }
    apply(e) {
        let t = e.slice(this.from, this.to),
            n = new F(Zs(t.content, e => e.mark(this.mark.removeFromSet(e.marks)), e), t.openStart, t.openEnd);
        return L.fromReplace(e, this.from, this.to, n)
    }
    invert() {
        return new Qs(this.from, this.to, this.mark)
    }
    map(t) {
        let n = t.mapResult(this.from, 1),
            r = t.mapResult(this.to, -1);
        return n.deleted && r.deleted || n.pos >= r.pos ? null : new e(n.pos, r.pos, this.mark)
    }
    merge(t) {
        return t instanceof e && t.mark.eq(this.mark) && this.from <= t.to && this.to >= t.from ? new e(Math.min(this.from, t.from), Math.max(this.to, t.to), this.mark) : null
    }
    toJSON() {
        return {
            stepType: `removeMark`,
            mark: this.mark.toJSON(),
            from: this.from,
            to: this.to
        }
    }
    static fromJSON(t, n) {
        if (typeof n.from != `number` || typeof n.to != `number`) throw RangeError(`Invalid input for RemoveMarkStep.fromJSON`);
        return new e(n.from, n.to, t.markFromJSON(n.mark))
    }
};
I.jsonID(`removeMark`, $s);
var ec = class e extends I {
    constructor(e, t) {
        super(), this.pos = e, this.mark = t
    }
    apply(e) {
        let t = e.nodeAt(this.pos);
        if (!t) return L.fail(`No node at mark step's position`);
        let n = t.type.create(t.attrs, null, this.mark.addToSet(t.marks));
        return L.fromReplace(e, this.pos, this.pos + 1, new F(P.from(n), 0, t.isLeaf ? 0 : 1))
    }
    invert(t) {
        let n = t.nodeAt(this.pos);
        if (n) {
            let t = this.mark.addToSet(n.marks);
            if (t.length == n.marks.length) {
                for (let r = 0; r < n.marks.length; r++)
                    if (!n.marks[r].isInSet(t)) return new e(this.pos, n.marks[r]);
                return new e(this.pos, this.mark)
            }
        }
        return new tc(this.pos, this.mark)
    }
    map(t) {
        let n = t.mapResult(this.pos, 1);
        return n.deletedAfter ? null : new e(n.pos, this.mark)
    }
    toJSON() {
        return {
            stepType: `addNodeMark`,
            pos: this.pos,
            mark: this.mark.toJSON()
        }
    }
    static fromJSON(t, n) {
        if (typeof n.pos != `number`) throw RangeError(`Invalid input for AddNodeMarkStep.fromJSON`);
        return new e(n.pos, t.markFromJSON(n.mark))
    }
};
I.jsonID(`addNodeMark`, ec);
var tc = class e extends I {
    constructor(e, t) {
        super(), this.pos = e, this.mark = t
    }
    apply(e) {
        let t = e.nodeAt(this.pos);
        if (!t) return L.fail(`No node at mark step's position`);
        let n = t.type.create(t.attrs, null, this.mark.removeFromSet(t.marks));
        return L.fromReplace(e, this.pos, this.pos + 1, new F(P.from(n), 0, t.isLeaf ? 0 : 1))
    }
    invert(e) {
        let t = e.nodeAt(this.pos);
        return !t || !this.mark.isInSet(t.marks) ? this : new ec(this.pos, this.mark)
    }
    map(t) {
        let n = t.mapResult(this.pos, 1);
        return n.deletedAfter ? null : new e(n.pos, this.mark)
    }
    toJSON() {
        return {
            stepType: `removeNodeMark`,
            pos: this.pos,
            mark: this.mark.toJSON()
        }
    }
    static fromJSON(t, n) {
        if (typeof n.pos != `number`) throw RangeError(`Invalid input for RemoveNodeMarkStep.fromJSON`);
        return new e(n.pos, t.markFromJSON(n.mark))
    }
};
I.jsonID(`removeNodeMark`, tc);
var nc = class e extends I {
    constructor(e, t, n, r = !1) {
        super(), this.from = e, this.to = t, this.slice = n, this.structure = r
    }
    apply(e) {
        return this.structure && ic(e, this.from, this.to) ? L.fail(`Structure replace would overwrite content`) : L.fromReplace(e, this.from, this.to, this.slice)
    }
    getMap() {
        return new Ys([this.from, this.to - this.from, this.slice.size])
    }
    invert(t) {
        return new e(this.from, this.from + this.slice.size, t.slice(this.from, this.to))
    }
    map(t) {
        let n = t.mapResult(this.from, 1),
            r = t.mapResult(this.to, -1);
        return n.deletedAcross && r.deletedAcross ? null : new e(n.pos, Math.max(n.pos, r.pos), this.slice, this.structure)
    }
    merge(t) {
        if (!(t instanceof e) || t.structure || this.structure) return null;
        if (this.from + this.slice.size == t.from && !this.slice.openEnd && !t.slice.openStart) {
            let n = this.slice.size + t.slice.size == 0 ? F.empty : new F(this.slice.content.append(t.slice.content), this.slice.openStart, t.slice.openEnd);
            return new e(this.from, this.to + (t.to - t.from), n, this.structure)
        } else if (t.to == this.from && !this.slice.openStart && !t.slice.openEnd) {
            let n = this.slice.size + t.slice.size == 0 ? F.empty : new F(t.slice.content.append(this.slice.content), t.slice.openStart, this.slice.openEnd);
            return new e(t.from, this.to, n, this.structure)
        } else return null
    }
    toJSON() {
        let e = {
            stepType: `replace`,
            from: this.from,
            to: this.to
        };
        return this.slice.size && (e.slice = this.slice.toJSON()), this.structure && (e.structure = !0), e
    }
    static fromJSON(t, n) {
        if (typeof n.from != `number` || typeof n.to != `number`) throw RangeError(`Invalid input for ReplaceStep.fromJSON`);
        return new e(n.from, n.to, F.fromJSON(t, n.slice), !!n.structure)
    }
};
I.jsonID(`replace`, nc);
var rc = class e extends I {
    constructor(e, t, n, r, i, a, o = !1) {
        super(), this.from = e, this.to = t, this.gapFrom = n, this.gapTo = r, this.slice = i, this.insert = a, this.structure = o
    }
    apply(e) {
        if (this.structure && (ic(e, this.from, this.gapFrom) || ic(e, this.gapTo, this.to))) return L.fail(`Structure gap-replace would overwrite content`);
        let t = e.slice(this.gapFrom, this.gapTo);
        if (t.openStart || t.openEnd) return L.fail(`Gap is not a flat range`);
        let n = this.slice.insertAt(this.insert, t.content);
        return n ? L.fromReplace(e, this.from, this.to, n) : L.fail(`Content does not fit in gap`)
    }
    getMap() {
        return new Ys([this.from, this.gapFrom - this.from, this.insert, this.gapTo, this.to - this.gapTo, this.slice.size - this.insert])
    }
    invert(t) {
        let n = this.gapTo - this.gapFrom;
        return new e(this.from, this.from + this.slice.size + n, this.from + this.insert, this.from + this.insert + n, t.slice(this.from, this.to).removeBetween(this.gapFrom - this.from, this.gapTo - this.from), this.gapFrom - this.from, this.structure)
    }
    map(t) {
        let n = t.mapResult(this.from, 1),
            r = t.mapResult(this.to, -1),
            i = this.from == this.gapFrom ? n.pos : t.map(this.gapFrom, -1),
            a = this.to == this.gapTo ? r.pos : t.map(this.gapTo, 1);
        return n.deletedAcross && r.deletedAcross || i < n.pos || a > r.pos ? null : new e(n.pos, r.pos, i, a, this.slice, this.insert, this.structure)
    }
    toJSON() {
        let e = {
            stepType: `replaceAround`,
            from: this.from,
            to: this.to,
            gapFrom: this.gapFrom,
            gapTo: this.gapTo,
            insert: this.insert
        };
        return this.slice.size && (e.slice = this.slice.toJSON()), this.structure && (e.structure = !0), e
    }
    static fromJSON(t, n) {
        if (typeof n.from != `number` || typeof n.to != `number` || typeof n.gapFrom != `number` || typeof n.gapTo != `number` || typeof n.insert != `number`) throw RangeError(`Invalid input for ReplaceAroundStep.fromJSON`);
        return new e(n.from, n.to, n.gapFrom, n.gapTo, F.fromJSON(t, n.slice), n.insert, !!n.structure)
    }
};
I.jsonID(`replaceAround`, rc);

function ic(e, t, n) {
    let r = e.resolve(t),
        i = n - t,
        a = r.depth;
    for (; i > 0 && a > 0 && r.indexAfter(a) == r.node(a).childCount;) a--, i--;
    if (i > 0) {
        let e = r.node(a).maybeChild(r.indexAfter(a));
        for (; i > 0;) {
            if (!e || e.isLeaf) return !0;
            e = e.firstChild, i--
        }
    }
    return !1
}

function ac(e, t, n) {
    return (t == 0 || e.canReplace(t, e.childCount)) && (n == e.childCount || e.canReplace(0, n))
}

function oc(e) {
    let t = e.parent.content.cutByIndex(e.startIndex, e.endIndex);
    for (let n = e.depth, r = 0, i = 0;; --n) {
        let a = e.$from.node(n),
            o = e.$from.index(n) + r,
            s = e.$to.indexAfter(n) - i;
        if (n < e.depth && a.canReplace(o, s, t)) return n;
        if (n == 0 || a.type.spec.isolating || !ac(a, o, s)) break;
        o && (r = 1), s < a.childCount && (i = 1)
    }
    return null
}

function sc(e, t, n = null, r = e) {
    let i = lc(e, t),
        a = i && uc(r, t);
    return a ? i.map(cc).concat({
        type: t,
        attrs: n
    }).concat(a.map(cc)) : null
}

function cc(e) {
    return {
        type: e,
        attrs: null
    }
}

function lc(e, t) {
    let {
        parent: n,
        startIndex: r,
        endIndex: i
    } = e, a = n.contentMatchAt(r).findWrapping(t);
    if (!a) return null;
    let o = a.length ? a[0] : t;
    return n.canReplaceWith(r, i, o) ? a : null
}

function uc(e, t) {
    let {
        parent: n,
        startIndex: r,
        endIndex: i
    } = e, a = n.child(r), o = t.contentMatch.findWrapping(a.type);
    if (!o) return null;
    let s = (o.length ? o[o.length - 1] : t).contentMatch;
    for (let e = r; s && e < i; e++) s = s.matchType(n.child(e).type);
    return !s || !s.validEnd ? null : o
}

function dc(e, t, n = 1, r) {
    let i = e.resolve(t),
        a = i.depth - n,
        o = r && r[r.length - 1] || i.parent;
    if (a < 0 || i.parent.type.spec.isolating || !i.parent.canReplace(i.index(), i.parent.childCount) || !o.type.validContent(i.parent.content.cutByIndex(i.index(), i.parent.childCount))) return !1;
    for (let e = i.depth - 1, t = n - 2; e > a; e--, t--) {
        let n = i.node(e),
            a = i.index(e);
        if (n.type.spec.isolating) return !1;
        let o = n.content.cutByIndex(a, n.childCount),
            s = r && r[t + 1];
        s && (o = o.replaceChild(0, s.type.create(s.attrs)));
        let c = r && r[t] || n;
        if (!n.canReplace(a + 1, n.childCount) || !c.type.validContent(o)) return !1
    }
    let s = i.indexAfter(a),
        c = r && r[0];
    return i.node(a).canReplaceWith(s, s, c ? c.type : i.node(a + 1).type)
}

function fc(e, t) {
    let n = e.resolve(t),
        r = n.index();
    return mc(n.nodeBefore, n.nodeAfter) && n.parent.canReplace(r, r + 1)
}

function pc(e, t) {
    t.content.size || e.type.compatibleContent(t.type);
    let n = e.contentMatchAt(e.childCount),
        {
            linebreakReplacement: r
        } = e.type.schema;
    for (let i = 0; i < t.childCount; i++) {
        let a = t.child(i),
            o = a.type == r ? e.type.schema.nodes.text : a.type;
        if (n = n.matchType(o), !n || !e.type.allowsMarks(a.marks)) return !1
    }
    return n.validEnd
}

function mc(e, t) {
    return !!(e && t && !e.isLeaf && pc(e, t))
}
var hc = class e extends I {
    constructor(e, t, n) {
        super(), this.pos = e, this.attr = t, this.value = n
    }
    apply(e) {
        let t = e.nodeAt(this.pos);
        if (!t) return L.fail(`No node at attribute step's position`);
        let n = Object.create(null);
        for (let e in t.attrs) n[e] = t.attrs[e];
        n[this.attr] = this.value;
        let r = t.type.create(n, null, t.marks);
        return L.fromReplace(e, this.pos, this.pos + 1, new F(P.from(r), 0, t.isLeaf ? 0 : 1))
    }
    getMap() {
        return Ys.empty
    }
    invert(t) {
        return new e(this.pos, this.attr, t.nodeAt(this.pos).attrs[this.attr])
    }
    map(t) {
        let n = t.mapResult(this.pos, 1);
        return n.deletedAfter ? null : new e(n.pos, this.attr, this.value)
    }
    toJSON() {
        return {
            stepType: `attr`,
            pos: this.pos,
            attr: this.attr,
            value: this.value
        }
    }
    static fromJSON(t, n) {
        if (typeof n.pos != `number` || typeof n.attr != `string`) throw RangeError(`Invalid input for AttrStep.fromJSON`);
        return new e(n.pos, n.attr, n.value)
    }
};
I.jsonID(`attr`, hc);
var gc = class e extends I {
    constructor(e, t) {
        super(), this.attr = e, this.value = t
    }
    apply(e) {
        let t = Object.create(null);
        for (let n in e.attrs) t[n] = e.attrs[n];
        t[this.attr] = this.value;
        let n = e.type.create(t, e.content, e.marks);
        return L.ok(n)
    }
    getMap() {
        return Ys.empty
    }
    invert(t) {
        return new e(this.attr, t.attrs[this.attr])
    }
    map(e) {
        return this
    }
    toJSON() {
        return {
            stepType: `docAttr`,
            attr: this.attr,
            value: this.value
        }
    }
    static fromJSON(t, n) {
        if (typeof n.attr != `string`) throw RangeError(`Invalid input for DocAttrStep.fromJSON`);
        return new e(n.attr, n.value)
    }
};
I.jsonID(`docAttr`, gc);
var _c = class extends Error {};
_c = function e(t) {
    let n = Error.call(this, t);
    return n.__proto__ = e.prototype, n
}, _c.prototype = Object.create(Error.prototype), _c.prototype.constructor = _c, _c.prototype.name = `TransformError`;

function vc(e, t = null) {
    return function(n, r) {
        let {
            $from: i,
            $to: a
        } = n.selection, o = i.blockRange(a);
        if (!o) return !1;
        let s = r ? n.tr : null;
        return yc(s, o, e, t) ? (r && r(s.scrollIntoView()), !0) : !1
    }
}

function yc(e, t, n, r = null) {
    let i = !1,
        a = t,
        o = t.$from.doc;
    if (t.depth >= 2 && t.$from.node(t.depth - 1).type.compatibleContent(n) && t.startIndex == 0) {
        if (t.$from.index(t.depth - 1) == 0) return !1;
        let e = o.resolve(t.start - 2);
        a = new xs(e, e, t.depth), t.endIndex < t.parent.childCount && (t = new xs(t.$from, o.resolve(t.$to.end(t.depth)), t.depth)), i = !0
    }
    let s = sc(a, n, r, t);
    return s ? (e && bc(e, t, s, i, n), !0) : !1
}

function bc(e, t, n, r, i) {
    let a = P.empty;
    for (let e = n.length - 1; e >= 0; e--) a = P.from(n[e].type.create(n[e].attrs, a));
    e.step(new rc(t.start - (r ? 2 : 0), t.end, t.start, t.end, new F(a, 0, 0), n.length, !0));
    let o = 0;
    for (let e = 0; e < n.length; e++) n[e].type == i && (o = e + 1);
    let s = n.length - o,
        c = t.start + n.length - (r ? 2 : 0),
        l = t.parent;
    for (let n = t.startIndex, r = t.endIndex, i = !0; n < r; n++, i = !1) !i && dc(e.doc, c, s) && (e.split(c, s), c += 2 * s), c += l.child(n).nodeSize;
    return e
}

function xc(e) {
    return function(t, n) {
        let {
            $from: r,
            $to: i
        } = t.selection, a = r.blockRange(i, t => t.childCount > 0 && t.firstChild.type == e);
        return a ? n ? r.node(a.depth - 1).type == e ? Sc(t, n, e, a) : Cc(t, n, a) : !0 : !1
    }
}

function Sc(e, t, n, r) {
    let i = e.tr,
        a = r.end,
        o = r.$to.end(r.depth);
    a < o && (i.step(new rc(a - 1, o, a, o, new F(P.from(n.create(null, r.parent.copy())), 1, 0), 1, !0)), r = new xs(i.doc.resolve(r.$from.pos), i.doc.resolve(o), r.depth));
    let s = oc(r);
    if (s == null) return !1;
    i.lift(r, s);
    let c = i.doc.resolve(i.mapping.map(a, -1) - 1);
    return fc(i.doc, c.pos) && c.nodeBefore.type == c.nodeAfter.type && i.join(c.pos), t(i.scrollIntoView()), !0
}

function Cc(e, t, n) {
    let r = e.tr,
        i = n.parent;
    for (let e = n.end, t = n.endIndex - 1, a = n.startIndex; t > a; t--) e -= i.child(t).nodeSize, r.delete(e - 1, e + 1);
    let a = r.doc.resolve(n.start),
        o = a.nodeAfter;
    if (r.mapping.map(n.end) != n.start + a.nodeAfter.nodeSize) return !1;
    let s = n.startIndex == 0,
        c = n.endIndex == i.childCount,
        l = a.node(-1),
        u = a.index(-1);
    if (!l.canReplace(u + (s ? 0 : 1), u + 1, o.content.append(c ? P.empty : P.from(i)))) return !1;
    let d = a.pos,
        f = d + o.nodeSize;
    return r.step(new rc(d - (s ? 1 : 0), f + (c ? 1 : 0), d + 1, f - 1, new F((s ? P.empty : P.from(i.copy(P.empty))).append(c ? P.empty : P.from(i.copy(P.empty))), s ? 0 : 1, c ? 0 : 1), s ? 0 : 1)), t(r.scrollIntoView()), !0
}

function wc(e) {
    return function(t, n) {
        let {
            $from: r,
            $to: i
        } = t.selection, a = r.blockRange(i, t => t.childCount > 0 && t.firstChild.type == e);
        if (!a) return !1;
        let o = a.startIndex;
        if (o == 0) return !1;
        let s = a.parent,
            c = s.child(o - 1);
        if (c.type != e) return !1;
        if (n) {
            let r = c.lastChild && c.lastChild.type == s.type,
                i = P.from(r ? e.create() : null),
                o = new F(P.from(e.create(null, P.from(s.type.create(null, i)))), r ? 3 : 1, 0),
                l = a.start,
                u = a.end;
            n(t.tr.step(new rc(l - (r ? 3 : 1), u, l, u, o, 1, !0)).scrollIntoView())
        }
        return !0
    }
}
var R = function(e) {
        for (var t = 0;; t++)
            if (e = e.previousSibling, !e) return t
    },
    Tc = function(e) {
        let t = e.assignedSlot || e.parentNode;
        return t && t.nodeType == 11 ? t.host : t
    },
    Ec = null,
    Dc = function(e, t, n) {
        let r = Ec ||= document.createRange();
        return r.setEnd(e, n ?? e.nodeValue.length), r.setStart(e, t || 0), r
    },
    Oc = function() {
        Ec = null
    },
    kc = function(e, t, n, r) {
        return n && (jc(e, t, n, r, -1) || jc(e, t, n, r, 1))
    },
    Ac = /^(img|br|input|textarea|hr)$/i;

function jc(e, t, n, r, i) {
    for (;;) {
        if (e == n && t == r) return !0;
        if (t == (i < 0 ? 0 : z(e))) {
            let n = e.parentNode;
            if (!n || n.nodeType != 1 || Fc(e) || Ac.test(e.nodeName) || e.contentEditable == `false`) return !1;
            t = R(e) + (i < 0 ? 0 : 1), e = n
        } else if (e.nodeType == 1) {
            let n = e.childNodes[t + (i < 0 ? -1 : 0)];
            if (n.nodeType == 1 && n.contentEditable == `false`)
                if (n.pmViewDesc ?.ignoreForSelection) t += i;
                else return !1;
            else e = n, t = i < 0 ? z(e) : 0
        } else return !1
    }
}

function z(e) {
    return e.nodeType == 3 ? e.nodeValue.length : e.childNodes.length
}

function Mc(e, t) {
    for (;;) {
        if (e.nodeType == 3 && t) return e;
        if (e.nodeType == 1 && t > 0) {
            if (e.contentEditable == `false`) return null;
            e = e.childNodes[t - 1], t = z(e)
        } else if (e.parentNode && !Fc(e)) t = R(e), e = e.parentNode;
        else return null
    }
}

function Nc(e, t) {
    for (;;) {
        if (e.nodeType == 3 && t < e.nodeValue.length) return e;
        if (e.nodeType == 1 && t < e.childNodes.length) {
            if (e.contentEditable == `false`) return null;
            e = e.childNodes[t], t = 0
        } else if (e.parentNode && !Fc(e)) t = R(e) + 1, e = e.parentNode;
        else return null
    }
}

function Pc(e, t, n) {
    for (let r = t == 0, i = t == z(e); r || i;) {
        if (e == n) return !0;
        let t = R(e);
        if (e = e.parentNode, !e) return !1;
        r &&= t == 0, i &&= t == z(e)
    }
}

function Fc(e) {
    let t;
    for (let n = e; n && !(t = n.pmViewDesc); n = n.parentNode);
    return t && t.node && t.node.isBlock && (t.dom == e || t.contentDOM == e)
}
var Ic = function(e) {
    return e.focusNode && kc(e.focusNode, e.focusOffset, e.anchorNode, e.anchorOffset)
};

function Lc(e, t) {
    let n = document.createEvent(`Event`);
    return n.initEvent(`keydown`, !0, !0), n.keyCode = e, n.key = n.code = t, n
}

function Rc(e) {
    let t = e.activeElement;
    for (; t && t.shadowRoot;) t = t.shadowRoot.activeElement;
    return t
}

function zc(e, t, n) {
    if (e.caretPositionFromPoint) try {
        let r = e.caretPositionFromPoint(t, n);
        if (r) return {
            node: r.offsetNode,
            offset: Math.min(z(r.offsetNode), r.offset)
        }
    } catch {}
    if (e.caretRangeFromPoint) {
        let r = e.caretRangeFromPoint(t, n);
        if (r) return {
            node: r.startContainer,
            offset: Math.min(z(r.startContainer), r.startOffset)
        }
    }
}
var Bc = typeof navigator < `u` ? navigator : null,
    Vc = typeof document < `u` ? document : null,
    Hc = Bc && Bc.userAgent || ``,
    Uc = /Edge\/(\d+)/.exec(Hc),
    Wc = /MSIE \d/.exec(Hc),
    Gc = /Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(Hc),
    B = !!(Wc || Gc || Uc),
    Kc = Wc ? document.documentMode : Gc ? +Gc[1] : Uc ? +Uc[1] : 0,
    V = !B && /gecko\/(\d+)/i.test(Hc);
V && +(/Firefox\/(\d+)/.exec(Hc) || [0, 0])[1];
var qc = !B && /Chrome\/(\d+)/.exec(Hc),
    H = !!qc,
    Jc = qc ? +qc[1] : 0,
    U = !B && !!Bc && /Apple Computer/.test(Bc.vendor),
    Yc = U && (/Mobile\/\w+/.test(Hc) || !!Bc && Bc.maxTouchPoints > 2),
    W = Yc || (Bc ? /Mac/.test(Bc.platform) : !1),
    Xc = Bc ? /Win/.test(Bc.platform) : !1,
    Zc = /Android \d/.test(Hc),
    Qc = !!Vc && `webkitFontSmoothing` in Vc.documentElement.style,
    $c = Qc ? +(/\bAppleWebKit\/(\d+)/.exec(navigator.userAgent) || [0, 0])[1] : 0;

function el(e) {
    let t = e.defaultView && e.defaultView.visualViewport;
    return t ? {
        left: 0,
        right: t.width,
        top: 0,
        bottom: t.height
    } : {
        left: 0,
        right: e.documentElement.clientWidth,
        top: 0,
        bottom: e.documentElement.clientHeight
    }
}

function tl(e, t) {
    return typeof e == `number` ? e : e[t]
}

function nl(e) {
    let t = e.getBoundingClientRect(),
        n = t.width / e.offsetWidth || 1,
        r = t.height / e.offsetHeight || 1;
    return {
        left: t.left,
        right: t.left + e.clientWidth * n,
        top: t.top,
        bottom: t.top + e.clientHeight * r
    }
}

function rl(e, t, n) {
    if (!vl(t) && t.left == 0) return;
    let r = e.someProp(`scrollThreshold`) || 0,
        i = e.someProp(`scrollMargin`) || 5,
        a = e.dom.ownerDocument;
    for (let o = n || e.dom; o;) {
        if (o.nodeType != 1) {
            o = Tc(o);
            continue
        }
        let e = o,
            n = e == a.body,
            s = n ? el(a) : nl(e),
            c = 0,
            l = 0;
        if (t.top < s.top + tl(r, `top`) ? l = -(s.top - t.top + tl(i, `top`)) : t.bottom > s.bottom - tl(r, `bottom`) && (l = t.bottom - t.top > s.bottom - s.top ? t.top + tl(i, `top`) - s.top : t.bottom - s.bottom + tl(i, `bottom`)), t.left < s.left + tl(r, `left`) ? c = -(s.left - t.left + tl(i, `left`)) : t.right > s.right - tl(r, `right`) && (c = t.right - s.right + tl(i, `right`)), c || l)
            if (n) a.defaultView.scrollBy(c, l);
            else {
                let n = e.scrollLeft,
                    r = e.scrollTop;
                l && (e.scrollTop += l), c && (e.scrollLeft += c);
                let i = e.scrollLeft - n,
                    a = e.scrollTop - r;
                t = {
                    left: t.left - i,
                    top: t.top - a,
                    right: t.right - i,
                    bottom: t.bottom - a
                }
            }
        let u = n ? `fixed` : getComputedStyle(o).position;
        if (/^(fixed|sticky)$/.test(u)) break;
        o = u == `absolute` ? o.offsetParent : Tc(o)
    }
}

function il(e) {
    let t = e.dom.getBoundingClientRect(),
        n = Math.max(0, t.top),
        r, i;
    for (let a = (t.left + t.right) / 2, o = n + 1; o < Math.min(innerHeight, t.bottom); o += 5) {
        let t = e.root.elementFromPoint(a, o);
        if (!t || t == e.dom || !e.dom.contains(t)) continue;
        let s = t.getBoundingClientRect();
        if (s.top >= n - 20) {
            r = t, i = s.top;
            break
        }
    }
    return {
        refDOM: r,
        refTop: i,
        stack: al(e.dom)
    }
}

function al(e) {
    let t = [],
        n = e.ownerDocument;
    for (let r = e; r && (t.push({
            dom: r,
            top: r.scrollTop,
            left: r.scrollLeft
        }), e != n); r = Tc(r));
    return t
}

function ol({
    refDOM: e,
    refTop: t,
    stack: n
}) {
    let r = e ? e.getBoundingClientRect().top : 0;
    sl(n, r == 0 ? 0 : r - t)
}

function sl(e, t) {
    for (let n = 0; n < e.length; n++) {
        let {
            dom: r,
            top: i,
            left: a
        } = e[n];
        r.scrollTop != i + t && (r.scrollTop = i + t), r.scrollLeft != a && (r.scrollLeft = a)
    }
}
var cl = null;

function ll(e) {
    if (e.setActive) return e.setActive();
    if (cl) return e.focus(cl);
    let t = al(e);
    e.focus(cl == null ? {
        get preventScroll() {
            return cl = {
                preventScroll: !0
            }, !0
        }
    } : void 0), cl || (cl = !1, sl(t, 0))
}

function ul(e, t) {
    let n, r = 2e8,
        i, a = 0,
        o = t.top,
        s = t.top,
        c, l;
    for (let u = e.firstChild, d = 0; u; u = u.nextSibling, d++) {
        let e;
        if (u.nodeType == 1) e = u.getClientRects();
        else if (u.nodeType == 3) e = Dc(u).getClientRects();
        else continue;
        for (let f = 0; f < e.length; f++) {
            let p = e[f];
            if (p.top <= o && p.bottom >= s) {
                o = Math.max(p.bottom, o), s = Math.min(p.top, s);
                let e = p.left > t.left ? p.left - t.left : p.right < t.left ? t.left - p.right : 0;
                if (e < r) {
                    n = u, r = e, i = e && n.nodeType == 3 ? {
                        left: p.right < t.left ? p.right : p.left,
                        top: t.top
                    } : t, u.nodeType == 1 && e && (a = d + (t.left >= (p.left + p.right) / 2 ? 1 : 0));
                    continue
                }
            } else p.top > t.top && !c && p.left <= t.left && p.right >= t.left && (c = u, l = {
                left: Math.max(p.left, Math.min(p.right, t.left)),
                top: p.top
            });
            !n && (t.left >= p.right && t.top >= p.top || t.left >= p.left && t.top >= p.bottom) && (a = d + 1)
        }
    }
    return !n && c && (n = c, i = l, r = 0), n && n.nodeType == 3 ? dl(n, i) : !n || r && n.nodeType == 1 ? {
        node: e,
        offset: a
    } : ul(n, i)
}

function dl(e, t) {
    let n = e.nodeValue.length,
        r = document.createRange(),
        i;
    for (let a = 0; a < n; a++) {
        r.setEnd(e, a + 1), r.setStart(e, a);
        let n = yl(r, 1);
        if (n.top != n.bottom && fl(t, n)) {
            i = {
                node: e,
                offset: a + (t.left >= (n.left + n.right) / 2 ? 1 : 0)
            };
            break
        }
    }
    return r.detach(), i || {
        node: e,
        offset: 0
    }
}

function fl(e, t) {
    return e.left >= t.left - 1 && e.left <= t.right + 1 && e.top >= t.top - 1 && e.top <= t.bottom + 1
}

function pl(e, t) {
    let n = e.parentNode;
    return n && /^li$/i.test(n.nodeName) && t.left < e.getBoundingClientRect().left ? n : e
}

function ml(e, t, n) {
    let {
        node: r,
        offset: i
    } = ul(t, n), a = -1;
    if (r.nodeType == 1 && !r.firstChild) {
        let e = r.getBoundingClientRect();
        a = e.left != e.right && n.left > (e.left + e.right) / 2 ? 1 : -1
    }
    return e.docView.posFromDOM(r, i, a)
}

function hl(e, t, n, r) {
    let i = -1;
    for (let n = t, a = !1; n != e.dom;) {
        let t = e.docView.nearestDesc(n, !0),
            o;
        if (!t) return null;
        if (t.dom.nodeType == 1 && (t.node.isBlock && t.parent || !t.contentDOM) && ((o = t.dom.getBoundingClientRect()).width || o.height) && (t.node.isBlock && t.parent && !/^T(R|BODY|HEAD|FOOT)$/.test(t.dom.nodeName) && (!a && o.left > r.left || o.top > r.top ? i = t.posBefore : (!a && o.right < r.left || o.bottom < r.top) && (i = t.posAfter), a = !0), !t.contentDOM && i < 0 && !t.node.isText)) return (t.node.isBlock ? r.top < (o.top + o.bottom) / 2 : r.left < (o.left + o.right) / 2) ? t.posBefore : t.posAfter;
        n = t.dom.parentNode
    }
    return i > -1 ? i : e.docView.posFromDOM(t, n, -1)
}

function gl(e, t, n) {
    let r = e.childNodes.length;
    if (r && n.top < n.bottom)
        for (let i = Math.max(0, Math.min(r - 1, Math.floor(r * (t.top - n.top) / (n.bottom - n.top)) - 2)), a = i;;) {
            let n = e.childNodes[a];
            if (n.nodeType == 1) {
                let e = n.getClientRects();
                for (let r = 0; r < e.length; r++) {
                    let i = e[r];
                    if (fl(t, i)) return gl(n, t, i)
                }
            }
            if ((a = (a + 1) % r) == i) break
        }
    return e
}

function _l(e, t) {
    let n = e.dom.ownerDocument,
        r, i = 0,
        a = zc(n, t.left, t.top);
    a && ({
        node: r,
        offset: i
    } = a);
    let o = (e.root.elementFromPoint ? e.root : n).elementFromPoint(t.left, t.top),
        s;
    if (!o || !e.dom.contains(o.nodeType == 1 ? o : o.parentNode)) {
        let n = e.dom.getBoundingClientRect();
        if (!fl(t, n) || (o = gl(e.dom, t, n), !o)) return null
    }
    if (U)
        for (let e = o; r && e; e = Tc(e)) e.draggable && (r = void 0);
    if (o = pl(o, t), r) {
        if (V && r.nodeType == 1 && (i = Math.min(i, r.childNodes.length), i < r.childNodes.length)) {
            let e = r.childNodes[i],
                n;
            e.nodeName == `IMG` && (n = e.getBoundingClientRect()).right <= t.left && n.bottom > t.top && i++
        }
        let n;
        Qc && i && r.nodeType == 1 && (n = r.childNodes[i - 1]).nodeType == 1 && n.contentEditable == `false` && n.getBoundingClientRect().top >= t.top && i--, r == e.dom && i == r.childNodes.length - 1 && r.lastChild.nodeType == 1 && t.top > r.lastChild.getBoundingClientRect().bottom ? s = e.state.doc.content.size : (i == 0 || r.nodeType != 1 || r.childNodes[i - 1].nodeName != `BR`) && (s = hl(e, r, i, t))
    }
    s ??= ml(e, o, t);
    let c = e.docView.nearestDesc(o, !0);
    return {
        pos: s,
        inside: c ? c.posAtStart - c.border : -1
    }
}

function vl(e) {
    return e.top < e.bottom || e.left < e.right
}

function yl(e, t) {
    let n = e.getClientRects();
    if (n.length) {
        let e = n[t < 0 ? 0 : n.length - 1];
        if (vl(e)) return e
    }
    return Array.prototype.find.call(n, vl) || e.getBoundingClientRect()
}
var bl = /[\u0590-\u05f4\u0600-\u06ff\u0700-\u08ac]/;

function xl(e, t, n) {
    let {
        node: r,
        offset: i,
        atom: a
    } = e.docView.domFromPos(t, n < 0 ? -1 : 1), o = Qc || V;
    if (r.nodeType == 3)
        if (o && (bl.test(r.nodeValue) || (n < 0 ? !i : i == r.nodeValue.length))) {
            let e = yl(Dc(r, i, i), n);
            if (V && i && /\s/.test(r.nodeValue[i - 1]) && i < r.nodeValue.length) {
                let t = yl(Dc(r, i - 1, i - 1), -1);
                if (t.top == e.top) {
                    let n = yl(Dc(r, i, i + 1), -1);
                    if (n.top != e.top) return Sl(n, n.left < t.left)
                }
            }
            return e
        } else {
            let e = i,
                t = i,
                a = n < 0 ? 1 : -1;
            return n < 0 && !i ? (t++, a = -1) : n >= 0 && i == r.nodeValue.length ? (e--, a = 1) : n < 0 ? e-- : t++, Sl(yl(Dc(r, e, t), a), a < 0)
        }
    if (!e.state.doc.resolve(t - (a || 0)).parent.inlineContent) {
        if (a == null && i && (n < 0 || i == z(r))) {
            let e = r.childNodes[i - 1];
            if (e.nodeType == 1) return Cl(e.getBoundingClientRect(), !1)
        }
        if (a == null && i < z(r)) {
            let e = r.childNodes[i];
            if (e.nodeType == 1) return Cl(e.getBoundingClientRect(), !0)
        }
        return Cl(r.getBoundingClientRect(), n >= 0)
    }
    if (a == null && i && (n < 0 || i == z(r))) {
        let e = r.childNodes[i - 1],
            t = e.nodeType == 3 ? Dc(e, z(e) - (o ? 0 : 1)) : e.nodeType == 1 && (e.nodeName != `BR` || !e.nextSibling) ? e : null;
        if (t) return Sl(yl(t, 1), !1)
    }
    if (a == null && i < z(r)) {
        let e = r.childNodes[i];
        for (; e.pmViewDesc && e.pmViewDesc.ignoreForCoords;) e = e.nextSibling;
        let t = e ? e.nodeType == 3 ? Dc(e, 0, o ? 0 : 1) : e.nodeType == 1 ? e : null : null;
        if (t) return Sl(yl(t, -1), !0)
    }
    return Sl(yl(r.nodeType == 3 ? Dc(r) : r, -n), n >= 0)
}

function Sl(e, t) {
    if (e.width == 0) return e;
    let n = t ? e.left : e.right;
    return {
        top: e.top,
        bottom: e.bottom,
        left: n,
        right: n
    }
}

function Cl(e, t) {
    if (e.height == 0) return e;
    let n = t ? e.top : e.bottom;
    return {
        top: n,
        bottom: n,
        left: e.left,
        right: e.right
    }
}

function wl(e, t, n) {
    let r = e.state,
        i = e.root.activeElement;
    r != t && e.updateState(t), i != e.dom && e.focus();
    try {
        return n()
    } finally {
        r != t && e.updateState(r), i != e.dom && i && i.focus()
    }
}

function Tl(e, t, n) {
    let r = t.selection,
        i = n == `up` ? r.$from : r.$to;
    return wl(e, t, () => {
        let {
            node: t
        } = e.docView.domFromPos(i.pos, n == `up` ? -1 : 1);
        for (;;) {
            let n = e.docView.nearestDesc(t, !0);
            if (!n) break;
            if (n.node.isBlock) {
                t = n.contentDOM || n.dom;
                break
            }
            t = n.dom.parentNode
        }
        let r = xl(e, i.pos, 1);
        for (let e = t.firstChild; e; e = e.nextSibling) {
            let t;
            if (e.nodeType == 1) t = e.getClientRects();
            else if (e.nodeType == 3) t = Dc(e, 0, e.nodeValue.length).getClientRects();
            else continue;
            for (let e = 0; e < t.length; e++) {
                let i = t[e];
                if (i.bottom > i.top + 1 && (n == `up` ? r.top - i.top > (i.bottom - r.top) * 2 : i.bottom - r.bottom > (r.bottom - i.top) * 2)) return !1
            }
        }
        return !0
    })
}
var El = /[\u0590-\u08ac]/;

function Dl(e, t, n) {
    let {
        $head: r
    } = t.selection;
    if (!r.parent.isTextblock) return !1;
    let i = r.parentOffset,
        a = !i,
        o = i == r.parent.content.size,
        s = e.domSelection();
    return s ? !El.test(r.parent.textContent) || !s.modify ? n == `left` || n == `backward` ? a : o : wl(e, t, () => {
        let {
            focusNode: t,
            focusOffset: i,
            anchorNode: a,
            anchorOffset: o
        } = e.domSelectionRange(), c = s.caretBidiLevel;
        s.modify(`move`, n, `character`);
        let l = r.depth ? e.docView.domAfterPos(r.before()) : e.dom,
            {
                focusNode: u,
                focusOffset: d
            } = e.domSelectionRange(),
            f = u && !l.contains(u.nodeType == 1 ? u : u.parentNode) || t == u && i == d;
        try {
            s.collapse(a, o), t && (t != a || i != o) && s.extend && s.extend(t, i)
        } catch {}
        return c != null && (s.caretBidiLevel = c), f
    }) : r.pos == r.start() || r.pos == r.end()
}
var Ol = null,
    kl = null,
    Al = !1;

function jl(e, t, n) {
    return Ol == t && kl == n ? Al : (Ol = t, kl = n, Al = n == `up` || n == `down` ? Tl(e, t, n) : Dl(e, t, n))
}
var G = 0,
    Ml = 1,
    Nl = 2,
    Pl = 3,
    Fl = class {
        constructor(e, t, n, r) {
            this.parent = e, this.children = t, this.dom = n, this.contentDOM = r, this.dirty = G, n.pmViewDesc = this
        }
        matchesWidget(e) {
            return !1
        }
        matchesMark(e) {
            return !1
        }
        matchesNode(e, t, n) {
            return !1
        }
        matchesHack(e) {
            return !1
        }
        parseRule(e) {
            return null
        }
        stopEvent(e) {
            return !1
        }
        get size() {
            let e = 0;
            for (let t = 0; t < this.children.length; t++) e += this.children[t].size;
            return e
        }
        get border() {
            return 0
        }
        destroy() {
            this.parent = void 0, this.dom.pmViewDesc == this && (this.dom.pmViewDesc = void 0);
            for (let e = 0; e < this.children.length; e++) this.children[e].destroy()
        }
        posBeforeChild(e) {
            for (let t = 0, n = this.posAtStart;; t++) {
                let r = this.children[t];
                if (r == e) return n;
                n += r.size
            }
        }
        get posBefore() {
            return this.parent.posBeforeChild(this)
        }
        get posAtStart() {
            return this.parent ? this.parent.posBeforeChild(this) + this.border : 0
        }
        get posAfter() {
            return this.posBefore + this.size
        }
        get posAtEnd() {
            return this.posAtStart + this.size - 2 * this.border
        }
        localPosFromDOM(e, t, n) {
            if (this.contentDOM && this.contentDOM.contains(e.nodeType == 1 ? e : e.parentNode))
                if (n < 0) {
                    let n, r;
                    if (e == this.contentDOM) n = e.childNodes[t - 1];
                    else {
                        for (; e.parentNode != this.contentDOM;) e = e.parentNode;
                        n = e.previousSibling
                    }
                    for (; n && !((r = n.pmViewDesc) && r.parent == this);) n = n.previousSibling;
                    return n ? this.posBeforeChild(r) + r.size : this.posAtStart
                } else {
                    let n, r;
                    if (e == this.contentDOM) n = e.childNodes[t];
                    else {
                        for (; e.parentNode != this.contentDOM;) e = e.parentNode;
                        n = e.nextSibling
                    }
                    for (; n && !((r = n.pmViewDesc) && r.parent == this);) n = n.nextSibling;
                    return n ? this.posBeforeChild(r) : this.posAtEnd
                }
            let r;
            if (e == this.dom && this.contentDOM) r = t > R(this.contentDOM);
            else if (this.contentDOM && this.contentDOM != this.dom && this.dom.contains(this.contentDOM)) r = e.compareDocumentPosition(this.contentDOM) & 2;
            else if (this.dom.firstChild) {
                if (t == 0)
                    for (let t = e;; t = t.parentNode) {
                        if (t == this.dom) {
                            r = !1;
                            break
                        }
                        if (t.previousSibling) break
                    }
                if (r == null && t == e.childNodes.length)
                    for (let t = e;; t = t.parentNode) {
                        if (t == this.dom) {
                            r = !0;
                            break
                        }
                        if (t.nextSibling) break
                    }
            }
            return r ?? n > 0 ? this.posAtEnd : this.posAtStart
        }
        nearestDesc(e, t = !1) {
            for (let n = !0, r = e; r; r = r.parentNode) {
                let i = this.getDesc(r),
                    a;
                if (i && (!t || i.node))
                    if (n && (a = i.nodeDOM) && !(a.nodeType == 1 ? a.contains(e.nodeType == 1 ? e : e.parentNode) : a == e)) n = !1;
                    else return i
            }
        }
        getDesc(e) {
            let t = e.pmViewDesc;
            for (let e = t; e; e = e.parent)
                if (e == this) return t
        }
        posFromDOM(e, t, n) {
            for (let r = e; r; r = r.parentNode) {
                let i = this.getDesc(r);
                if (i) return i.localPosFromDOM(e, t, n)
            }
            return -1
        }
        descAt(e) {
            for (let t = 0, n = 0; t < this.children.length; t++) {
                let r = this.children[t],
                    i = n + r.size;
                if (n == e && i != n) {
                    for (; !r.border && r.children.length;)
                        for (let e = 0; e < r.children.length; e++) {
                            let t = r.children[e];
                            if (t.size) {
                                r = t;
                                break
                            }
                        }
                    return r
                }
                if (e < i) return r.descAt(e - n - r.border);
                n = i
            }
        }
        domFromPos(e, t) {
            if (!this.contentDOM) return {
                node: this.dom,
                offset: 0,
                atom: e + 1
            };
            let n = 0,
                r = 0;
            for (let t = 0; n < this.children.length; n++) {
                let i = this.children[n],
                    a = t + i.size;
                if (a > e || i instanceof Hl) {
                    r = e - t;
                    break
                }
                t = a
            }
            if (r) return this.children[n].domFromPos(r - this.children[n].border, t);
            for (let e; n && !(e = this.children[n - 1]).size && e instanceof Il && e.side >= 0; n--);
            if (t <= 0) {
                let e, r = !0;
                for (; e = n ? this.children[n - 1] : null, !(!e || e.dom.parentNode == this.contentDOM); n--, r = !1);
                return e && t && r && !e.border && !e.domAtom ? e.domFromPos(e.size, t) : {
                    node: this.contentDOM,
                    offset: e ? R(e.dom) + 1 : 0
                }
            } else {
                let e, r = !0;
                for (; e = n < this.children.length ? this.children[n] : null, !(!e || e.dom.parentNode == this.contentDOM); n++, r = !1);
                return e && r && !e.border && !e.domAtom ? e.domFromPos(0, t) : {
                    node: this.contentDOM,
                    offset: e ? R(e.dom) : this.contentDOM.childNodes.length
                }
            }
        }
        parseRange(e, t, n = 0) {
            if (this.children.length == 0) return {
                node: this.contentDOM,
                from: e,
                to: t,
                fromOffset: 0,
                toOffset: this.contentDOM.childNodes.length
            };
            let r = -1,
                i = -1;
            for (let a = n, o = 0;; o++) {
                let n = this.children[o],
                    s = a + n.size;
                if (r == -1 && e <= s) {
                    let i = a + n.border;
                    if (e >= i && t <= s - n.border && n.node && n.contentDOM && this.contentDOM.contains(n.contentDOM)) return n.parseRange(e, t, i);
                    e = a;
                    for (let t = o; t > 0; t--) {
                        let n = this.children[t - 1];
                        if (n.size && n.dom.parentNode == this.contentDOM && !n.emptyChildAt(1)) {
                            r = R(n.dom) + 1;
                            break
                        }
                        e -= n.size
                    }
                    r == -1 && (r = 0)
                }
                if (r > -1 && (s > t || o == this.children.length - 1)) {
                    t = s;
                    for (let e = o + 1; e < this.children.length; e++) {
                        let n = this.children[e];
                        if (n.size && n.dom.parentNode == this.contentDOM && !n.emptyChildAt(-1)) {
                            i = R(n.dom);
                            break
                        }
                        t += n.size
                    }
                    i == -1 && (i = this.contentDOM.childNodes.length);
                    break
                }
                a = s
            }
            return {
                node: this.contentDOM,
                from: e,
                to: t,
                fromOffset: r,
                toOffset: i
            }
        }
        emptyChildAt(e) {
            if (this.border || !this.contentDOM || !this.children.length) return !1;
            let t = this.children[e < 0 ? 0 : this.children.length - 1];
            return t.size == 0 || t.emptyChildAt(e)
        }
        domAfterPos(e) {
            let {
                node: t,
                offset: n
            } = this.domFromPos(e, 0);
            if (t.nodeType != 1 || n == t.childNodes.length) throw RangeError(`No node after pos ` + e);
            return t.childNodes[n]
        }
        setSelection(e, t, n, r = !1) {
            let i = Math.min(e, t),
                a = Math.max(e, t);
            for (let o = 0, s = 0; o < this.children.length; o++) {
                let c = this.children[o],
                    l = s + c.size;
                if (i > s && a < l) return c.setSelection(e - s - c.border, t - s - c.border, n, r);
                s = l
            }
            let o = this.domFromPos(e, e ? -1 : 1),
                s = t == e ? o : this.domFromPos(t, t ? -1 : 1),
                c = n.root.getSelection(),
                l = n.domSelectionRange(),
                u = !1;
            if ((V || U) && e == t) {
                let {
                    node: e,
                    offset: t
                } = o;
                if (e.nodeType == 3) {
                    if (u = !!(t && e.nodeValue[t - 1] == `
`), u && t == e.nodeValue.length)
                        for (let t = e, n; t; t = t.parentNode) {
                            if (n = t.nextSibling) {
                                n.nodeName == `BR` && (o = s = {
                                    node: n.parentNode,
                                    offset: R(n) + 1
                                });
                                break
                            }
                            let e = t.pmViewDesc;
                            if (e && e.node && e.node.isBlock) break
                        }
                } else {
                    let n = e.childNodes[t - 1];
                    u = n && (n.nodeName == `BR` || n.contentEditable == `false`)
                }
            }
            if (V && l.focusNode && l.focusNode != s.node && l.focusNode.nodeType == 1) {
                let e = l.focusNode.childNodes[l.focusOffset];
                e && e.contentEditable == `false` && (r = !0)
            }
            if (!(r || u && U) && kc(o.node, o.offset, l.anchorNode, l.anchorOffset) && kc(s.node, s.offset, l.focusNode, l.focusOffset)) return;
            let d = !1;
            if ((c.extend || e == t) && !(u && V)) {
                c.collapse(o.node, o.offset);
                try {
                    e != t && c.extend(s.node, s.offset), d = !0
                } catch {}
            }
            if (!d) {
                if (e > t) {
                    let e = o;
                    o = s, s = e
                }
                let n = document.createRange();
                n.setEnd(s.node, s.offset), n.setStart(o.node, o.offset), c.removeAllRanges(), c.addRange(n)
            }
        }
        ignoreMutation(e) {
            return !this.contentDOM && e.type != `selection`
        }
        get contentLost() {
            return this.contentDOM && this.contentDOM != this.dom && !this.dom.contains(this.contentDOM)
        }
        markDirty(e, t) {
            for (let n = 0, r = 0; r < this.children.length; r++) {
                let i = this.children[r],
                    a = n + i.size;
                if (n == a ? e <= a && t >= n : e < a && t > n) {
                    let r = n + i.border,
                        o = a - i.border;
                    if (e >= r && t <= o) {
                        this.dirty = e == n || t == a ? Nl : Ml, e == r && t == o && (i.contentLost || i.dom.parentNode != this.contentDOM) ? i.dirty = Pl : i.markDirty(e - r, t - r);
                        return
                    } else i.dirty = i.dom == i.contentDOM && i.dom.parentNode == this.contentDOM && !i.children.length ? Nl : Pl
                }
                n = a
            }
            this.dirty = Nl
        }
        markParentsDirty() {
            let e = 1;
            for (let t = this.parent; t; t = t.parent, e++) {
                let n = e == 1 ? Nl : Ml;
                t.dirty < n && (t.dirty = n)
            }
        }
        get domAtom() {
            return !1
        }
        get ignoreForCoords() {
            return !1
        }
        get ignoreForSelection() {
            return !1
        }
        isText(e) {
            return !1
        }
    },
    Il = class extends Fl {
        constructor(e, t, n, r) {
            let i, a = t.type.toDOM;
            if (typeof a == `function` && (a = a(n, () => {
                    if (!i) return r;
                    if (i.parent) return i.parent.posBeforeChild(i)
                })), !t.type.spec.raw) {
                if (a.nodeType != 1) {
                    let e = document.createElement(`span`);
                    e.appendChild(a), a = e
                }
                a.hasAttribute(`contenteditable`) || (a.contentEditable = `false`), a.classList.add(`ProseMirror-widget`)
            }
            super(e, [], a, null), this.widget = t, this.widget = t, i = this
        }
        matchesWidget(e) {
            return this.dirty == G && e.type.eq(this.widget.type)
        }
        parseRule() {
            return {
                ignore: !0
            }
        }
        stopEvent(e) {
            let t = this.widget.spec.stopEvent;
            return t ? t(e) : !1
        }
        ignoreMutation(e) {
            return e.type != `selection` || this.widget.spec.ignoreSelection
        }
        destroy() {
            this.widget.type.destroy(this.dom), super.destroy()
        }
        get domAtom() {
            return !0
        }
        get ignoreForSelection() {
            return !!this.widget.type.spec.relaxedSide
        }
        get side() {
            return this.widget.type.side
        }
    },
    Ll = class extends Fl {
        constructor(e, t, n, r) {
            super(e, [], t, null), this.textDOM = n, this.text = r
        }
        get size() {
            return this.text.length
        }
        localPosFromDOM(e, t) {
            return e == this.textDOM ? this.posAtStart + t : this.posAtStart + (t ? this.size : 0)
        }
        domFromPos(e) {
            return {
                node: this.textDOM,
                offset: e
            }
        }
        ignoreMutation(e) {
            return e.type === `characterData` && e.target.nodeValue == e.oldValue
        }
    },
    Rl = class e extends Fl {
        constructor(e, t, n, r, i) {
            super(e, [], n, r), this.mark = t, this.spec = i
        }
        static create(t, n, r, i) {
            let a = i.nodeViews[n.type.name],
                o = a && a(n, i, r);
            return (!o || !o.dom) && (o = rt.renderSpec(document, n.type.spec.toDOM(n, r), null, n.attrs)), new e(t, n, o.dom, o.contentDOM || o.dom, o)
        }
        parseRule() {
            return this.dirty & Pl || this.mark.type.spec.reparseInView ? null : {
                mark: this.mark.type.name,
                attrs: this.mark.attrs,
                contentElement: this.contentDOM
            }
        }
        matchesMark(e) {
            return this.dirty != Pl && this.mark.eq(e)
        }
        markDirty(e, t) {
            if (super.markDirty(e, t), this.dirty != G) {
                let e = this.parent;
                for (; !e.node;) e = e.parent;
                e.dirty < this.dirty && (e.dirty = this.dirty), this.dirty = G
            }
        }
        slice(t, n, r) {
            let i = e.create(this.parent, this.mark, !0, r),
                a = this.children,
                o = this.size;
            n < o && (a = au(a, n, o, r)), t > 0 && (a = au(a, 0, t, r));
            for (let e = 0; e < a.length; e++) a[e].parent = i;
            return i.children = a, i
        }
        ignoreMutation(e) {
            return this.spec.ignoreMutation ? this.spec.ignoreMutation(e) : super.ignoreMutation(e)
        }
        destroy() {
            this.spec.destroy && this.spec.destroy(), super.destroy()
        }
    },
    zl = class e extends Fl {
        constructor(e, t, n, r, i, a, o) {
            super(e, [], i, a), this.node = t, this.outerDeco = n, this.innerDeco = r, this.nodeDOM = o
        }
        static create(t, n, r, i, a, o) {
            let s = a.nodeViews[n.type.name],
                c, l = s && s(n, a, () => {
                    if (!c) return o;
                    if (c.parent) return c.parent.posBeforeChild(c)
                }, r, i),
                u = l && l.dom,
                d = l && l.contentDOM;
            if (n.isText) {
                if (!u) u = document.createTextNode(n.text);
                else if (u.nodeType != 3) throw RangeError(`Text must be rendered as a DOM text node`)
            } else if (!u) {
                let e = rt.renderSpec(document, n.type.spec.toDOM(n), null, n.attrs);
                ({
                    dom: u,
                    contentDOM: d
                } = e)
            }!d && !n.isText && u.nodeName != `BR` && (u.hasAttribute(`contenteditable`) || (u.contentEditable = `false`), n.type.spec.draggable && (u.draggable = !0));
            let f = u;
            return u = Xl(u, r, n), l ? c = new Ul(t, n, r, i, u, d || null, f, l) : n.isText ? new Vl(t, n, r, i, u, f) : new e(t, n, r, i, u, d || null, f)
        }
        parseRule(e) {
            if (this.node.type.spec.reparseInView) return null;
            let t = {
                node: this.node.type.name,
                attrs: this.node.attrs
            };
            if (this.node.type.whitespace == `pre` && (t.preserveWhitespace = `full`), !this.contentDOM) t.getContent = () => this.node.content;
            else if (!this.contentLost) t.contentElement = this.contentDOM;
            else {
                for (let e = this.children.length - 1; e >= 0; e--) {
                    let n = this.children[e];
                    if (this.dom.contains(n.dom.parentNode)) {
                        t.contentElement = n.dom.parentNode;
                        break
                    }
                }
                if (!t.contentElement) {
                    let n = e && e.find(t => t.nodeType == 1 && e.indexOf(t.parentNode) < 0 && this.dom.contains(t));
                    n ? t.contentElement = n : t.getContent = () => c.empty
                }
            }
            return t
        }
        matchesNode(e, t, n) {
            return this.dirty == G && e.eq(this.node) && Zl(t, this.outerDeco) && n.eq(this.innerDeco)
        }
        get size() {
            return this.node.nodeSize
        }
        get border() {
            return this.node.isLeaf ? 0 : 1
        }
        updateChildren(e, t) {
            let n = this.node.inlineContent,
                r = t,
                i = e.composing ? this.localCompositionInfo(e, t) : null,
                a = i && i.pos > -1 ? i : null,
                o = i && i.pos < 0,
                s = new $l(this, a && a.node, e);
            nu(this.node, this.innerDeco, (t, i, a) => {
                t.spec.marks ? s.syncToMarks(t.spec.marks, n, e, i) : t.type.side >= 0 && !a && s.syncToMarks(i == this.node.childCount ? f.none : this.node.child(i).marks, n, e, i), s.placeWidget(t, e, r)
            }, (t, a, c, l) => {
                s.syncToMarks(t.marks, n, e, l);
                let u;
                s.findNodeMatch(t, a, c, l) || o && e.state.selection.from > r && e.state.selection.to < r + t.nodeSize && (u = s.findIndexWithChild(i.node)) > -1 && s.updateNodeAt(t, a, c, u, e) || s.updateNextNode(t, a, c, e, l, r) || s.addNode(t, a, c, e, r), r += t.nodeSize
            }), s.syncToMarks([], n, e, 0), this.node.isTextblock && s.addTextblockHacks(), s.destroyRest(), (s.changed || this.dirty == Nl) && (a && this.protectLocalComposition(e, a), Wl(this.contentDOM, this.children, e), Yc && ru(this.dom))
        }
        localCompositionInfo(e, t) {
            let {
                from: n,
                to: r
            } = e.state.selection;
            if (!(e.state.selection instanceof j) || n < t || r > t + this.node.content.size) return null;
            let i = e.input.compositionNode;
            if (!i || !this.dom.contains(i.parentNode)) return null;
            if (this.node.inlineContent) {
                let e = i.nodeValue,
                    a = iu(this.node.content, e, n - t, r - t);
                return a < 0 ? null : {
                    node: i,
                    pos: a,
                    text: e
                }
            } else return {
                node: i,
                pos: -1,
                text: ``
            }
        }
        protectLocalComposition(e, {
            node: t,
            pos: n,
            text: r
        }) {
            if (this.getDesc(t)) return;
            let i = t;
            for (; i.parentNode != this.contentDOM; i = i.parentNode) {
                for (; i.previousSibling;) i.parentNode.removeChild(i.previousSibling);
                for (; i.nextSibling;) i.parentNode.removeChild(i.nextSibling);
                i.pmViewDesc &&= void 0
            }
            let a = new Ll(this, i, t, r);
            e.input.compositionNodes.push(a), this.children = au(this.children, n, n + r.length, e, a)
        }
        update(e, t, n, r) {
            return this.dirty == Pl || !e.sameMarkup(this.node) ? !1 : (this.updateInner(e, t, n, r), !0)
        }
        updateInner(e, t, n, r) {
            this.updateOuterDeco(t), this.node = e, this.innerDeco = n, this.contentDOM && this.updateChildren(r, this.posAtStart), this.dirty = G
        }
        updateOuterDeco(e) {
            if (Zl(e, this.outerDeco)) return;
            let t = this.nodeDOM.nodeType != 1,
                n = this.dom;
            this.dom = Jl(this.dom, this.nodeDOM, ql(this.outerDeco, this.node, t), ql(e, this.node, t)), this.dom != n && (n.pmViewDesc = void 0, this.dom.pmViewDesc = this), this.outerDeco = e
        }
        selectNode() {
            this.nodeDOM.nodeType == 1 && (this.nodeDOM.classList.add(`ProseMirror-selectednode`), (this.contentDOM || !this.node.type.spec.draggable) && (this.nodeDOM.draggable = !0))
        }
        deselectNode() {
            this.nodeDOM.nodeType == 1 && (this.nodeDOM.classList.remove(`ProseMirror-selectednode`), (this.contentDOM || !this.node.type.spec.draggable) && this.nodeDOM.removeAttribute(`draggable`))
        }
        get domAtom() {
            return this.node.isAtom
        }
    };

function Bl(e, t, n, r, i) {
    Xl(r, t, e);
    let a = new zl(void 0, e, t, n, r, r, r);
    return a.contentDOM && a.updateChildren(i, 0), a
}
var Vl = class e extends zl {
        constructor(e, t, n, r, i, a) {
            super(e, t, n, r, i, null, a)
        }
        parseRule() {
            let e = this.nodeDOM.parentNode;
            for (; e && e != this.dom && !e.pmIsDeco;) e = e.parentNode;
            return {
                skip: e || !0
            }
        }
        update(e, t, n, r) {
            return this.dirty == Pl || this.dirty != G && !this.inParent() || !e.sameMarkup(this.node) ? !1 : (this.updateOuterDeco(t), (this.dirty != G || e.text != this.node.text) && e.text != this.nodeDOM.nodeValue && (this.nodeDOM.nodeValue = e.text, r.trackWrites == this.nodeDOM && (r.trackWrites = null)), this.node = e, this.dirty = G, !0)
        }
        inParent() {
            let e = this.parent.contentDOM;
            for (let t = this.nodeDOM; t; t = t.parentNode)
                if (t == e) return !0;
            return !1
        }
        domFromPos(e) {
            return {
                node: this.nodeDOM,
                offset: e
            }
        }
        localPosFromDOM(e, t, n) {
            return e == this.nodeDOM ? this.posAtStart + Math.min(t, this.node.text.length) : super.localPosFromDOM(e, t, n)
        }
        ignoreMutation(e) {
            return e.type != `characterData` && e.type != `selection`
        }
        slice(t, n, r) {
            let i = this.node.cut(t, n),
                a = document.createTextNode(i.text);
            return new e(this.parent, i, this.outerDeco, this.innerDeco, a, a)
        }
        markDirty(e, t) {
            super.markDirty(e, t), this.dom != this.nodeDOM && (e == 0 || t == this.nodeDOM.nodeValue.length) && (this.dirty = Pl)
        }
        get domAtom() {
            return !1
        }
        isText(e) {
            return this.node.text == e
        }
    },
    Hl = class extends Fl {
        parseRule() {
            return {
                ignore: !0
            }
        }
        matchesHack(e) {
            return this.dirty == G && this.dom.nodeName == e
        }
        get domAtom() {
            return !0
        }
        get ignoreForCoords() {
            return this.dom.nodeName == `IMG`
        }
    },
    Ul = class extends zl {
        constructor(e, t, n, r, i, a, o, s) {
            super(e, t, n, r, i, a, o), this.spec = s
        }
        update(e, t, n, r) {
            if (this.dirty == Pl) return !1;
            if (this.spec.update && (this.node.type == e.type || this.spec.multiType)) {
                let i = this.spec.update(e, t, n);
                return i && this.updateInner(e, t, n, r), i
            } else if (!this.contentDOM && !e.isLeaf) return !1;
            else return super.update(e, t, n, r)
        }
        selectNode() {
            this.spec.selectNode ? this.spec.selectNode() : super.selectNode()
        }
        deselectNode() {
            this.spec.deselectNode ? this.spec.deselectNode() : super.deselectNode()
        }
        setSelection(e, t, n, r) {
            this.spec.setSelection ? this.spec.setSelection(e, t, n.root) : super.setSelection(e, t, n, r)
        }
        destroy() {
            this.spec.destroy && this.spec.destroy(), super.destroy()
        }
        stopEvent(e) {
            return this.spec.stopEvent ? this.spec.stopEvent(e) : !1
        }
        ignoreMutation(e) {
            return this.spec.ignoreMutation ? this.spec.ignoreMutation(e) : super.ignoreMutation(e)
        }
    };

function Wl(e, t, n) {
    let r = e.firstChild,
        i = !1;
    for (let a = 0; a < t.length; a++) {
        let o = t[a],
            s = o.dom;
        if (s.parentNode == e) {
            for (; s != r;) r = Ql(r), i = !0;
            r = r.nextSibling
        } else i = !0, e.insertBefore(s, r);
        if (o instanceof Rl) {
            let t = r ? r.previousSibling : e.lastChild;
            Wl(o.contentDOM, o.children, n), r = t ? t.nextSibling : e.firstChild
        }
    }
    for (; r;) r = Ql(r), i = !0;
    i && n.trackWrites == e && (n.trackWrites = null)
}
var Gl = function(e) {
    e && (this.nodeName = e)
};
Gl.prototype = Object.create(null);
var Kl = [new Gl];

function ql(e, t, n) {
    if (e.length == 0) return Kl;
    let r = n ? Kl[0] : new Gl,
        i = [r];
    for (let a = 0; a < e.length; a++) {
        let o = e[a].type.attrs;
        if (o)
            for (let e in o.nodeName && i.push(r = new Gl(o.nodeName)), o) {
                let a = o[e];
                a != null && (n && i.length == 1 && i.push(r = new Gl(t.isInline ? `span` : `div`)), e == `class` ? r.class = (r.class ? r.class + ` ` : ``) + a : e == `style` ? r.style = (r.style ? r.style + `;` : ``) + a : e != `nodeName` && (r[e] = a))
            }
    }
    return i
}

function Jl(e, t, n, r) {
    if (n == Kl && r == Kl) return t;
    let i = t;
    for (let t = 0; t < r.length; t++) {
        let a = r[t],
            o = n[t];
        if (t) {
            let t;
            o && o.nodeName == a.nodeName && i != e && (t = i.parentNode) && t.nodeName.toLowerCase() == a.nodeName ? i = t : (t = document.createElement(a.nodeName), t.pmIsDeco = !0, t.appendChild(i), o = Kl[0], i = t)
        }
        Yl(i, o || Kl[0], a)
    }
    return i
}

function Yl(e, t, n) {
    for (let r in t) r != `class` && r != `style` && r != `nodeName` && !(r in n) && e.removeAttribute(r);
    for (let r in n) r != `class` && r != `style` && r != `nodeName` && n[r] != t[r] && e.setAttribute(r, n[r]);
    if (t.class != n.class) {
        let r = t.class ? t.class.split(` `).filter(Boolean) : [],
            i = n.class ? n.class.split(` `).filter(Boolean) : [];
        for (let t = 0; t < r.length; t++) i.indexOf(r[t]) == -1 && e.classList.remove(r[t]);
        for (let t = 0; t < i.length; t++) r.indexOf(i[t]) == -1 && e.classList.add(i[t]);
        e.classList.length == 0 && e.removeAttribute(`class`)
    }
    if (t.style != n.style) {
        if (t.style) {
            let n = /\s*([\w\-\xa1-\uffff]+)\s*:(?:"(?:\\.|[^"])*"|'(?:\\.|[^'])*'|\(.*?\)|[^;])*/g,
                r;
            for (; r = n.exec(t.style);) e.style.removeProperty(r[1])
        }
        n.style && (e.style.cssText += n.style)
    }
}

function Xl(e, t, n) {
    return Jl(e, e, Kl, ql(t, n, e.nodeType != 1))
}

function Zl(e, t) {
    if (e.length != t.length) return !1;
    for (let n = 0; n < e.length; n++)
        if (!e[n].type.eq(t[n].type)) return !1;
    return !0
}

function Ql(e) {
    let t = e.nextSibling;
    return e.parentNode.removeChild(e), t
}
var $l = class {
    constructor(e, t, n) {
        this.lock = t, this.view = n, this.index = 0, this.stack = [], this.changed = !1, this.top = e, this.preMatch = eu(e.node.content, e)
    }
    destroyBetween(e, t) {
        if (e != t) {
            for (let n = e; n < t; n++) this.top.children[n].destroy();
            this.top.children.splice(e, t - e), this.changed = !0
        }
    }
    destroyRest() {
        this.destroyBetween(this.index, this.top.children.length)
    }
    syncToMarks(e, t, n, r) {
        let i = 0,
            a = this.stack.length >> 1,
            o = Math.min(a, e.length);
        for (; i < o && (i == a - 1 ? this.top : this.stack[i + 1 << 1]).matchesMark(e[i]) && e[i].type.spec.spanning !== !1;) i++;
        for (; i < a;) this.destroyRest(), this.top.dirty = G, this.index = this.stack.pop(), this.top = this.stack.pop(), a--;
        for (; a < e.length;) {
            this.stack.push(this.top, this.index + 1);
            let i = -1,
                o = this.top.children.length;
            r < this.preMatch.index && (o = Math.min(this.index + 3, o));
            for (let t = this.index; t < o; t++) {
                let n = this.top.children[t];
                if (n.matchesMark(e[a]) && !this.isLocked(n.dom)) {
                    i = t;
                    break
                }
            }
            if (i < 0 && this.index < this.top.children.length) {
                let t = this.top.children[this.index];
                t instanceof Rl && t.dirty != Pl && t.mark.type == e[a].type && t.spec.update && !this.isLocked(t.dom) && t.spec.update(e[a]) && (t.mark = e[a], i = this.index, this.changed = !0)
            }
            if (i > -1) i > this.index && (this.changed = !0, this.destroyBetween(this.index, i)), this.top = this.top.children[this.index];
            else {
                let r = Rl.create(this.top, e[a], t, n);
                this.top.children.splice(this.index, 0, r), this.top = r, this.changed = !0
            }
            this.index = 0, a++
        }
    }
    findNodeMatch(e, t, n, r) {
        let i = -1,
            a;
        if (r >= this.preMatch.index && (a = this.preMatch.matches[r - this.preMatch.index]).parent == this.top && a.matchesNode(e, t, n)) i = this.top.children.indexOf(a, this.index);
        else
            for (let r = this.index, a = Math.min(this.top.children.length, r + 5); r < a; r++) {
                let a = this.top.children[r];
                if (a.matchesNode(e, t, n) && !this.preMatch.matched.has(a)) {
                    i = r;
                    break
                }
            }
        return i < 0 ? !1 : (this.destroyBetween(this.index, i), this.index++, !0)
    }
    updateNodeAt(e, t, n, r, i) {
        let a = this.top.children[r];
        return a.dirty == Pl && a.dom == a.contentDOM && (a.dirty = Nl), a.update(e, t, n, i) ? (this.destroyBetween(this.index, r), this.index++, !0) : !1
    }
    findIndexWithChild(e) {
        for (;;) {
            let t = e.parentNode;
            if (!t) return -1;
            if (t == this.top.contentDOM) {
                let t = e.pmViewDesc;
                if (t) {
                    for (let e = this.index; e < this.top.children.length; e++)
                        if (this.top.children[e] == t) return e
                }
                return -1
            }
            e = t
        }
    }
    updateNextNode(e, t, n, r, i, a) {
        for (let o = this.index; o < this.top.children.length; o++) {
            let s = this.top.children[o];
            if (s instanceof zl) {
                let c = this.preMatch.matched.get(s);
                if (c != null && c != i) return !1;
                let l = s.dom,
                    u, d = this.isLocked(l) && !(e.isText && s.node && s.node.isText && s.nodeDOM.nodeValue == e.text && s.dirty != Pl && Zl(t, s.outerDeco));
                if (!d && s.update(e, t, n, r)) return this.destroyBetween(this.index, o), s.dom != l && (this.changed = !0), this.index++, !0;
                if (!d && (u = this.recreateWrapper(s, e, t, n, r, a))) return this.destroyBetween(this.index, o), this.top.children[this.index] = u, u.contentDOM && (u.dirty = Nl, u.updateChildren(r, a + 1), u.dirty = G), this.changed = !0, this.index++, !0;
                break
            }
        }
        return !1
    }
    recreateWrapper(e, t, n, r, i, a) {
        if (e.dirty || t.isAtom || !e.children.length || !e.node.content.eq(t.content) || !Zl(n, e.outerDeco) || !r.eq(e.innerDeco)) return null;
        let o = zl.create(this.top, t, n, r, i, a);
        if (o.contentDOM) {
            o.children = e.children, e.children = [];
            for (let e of o.children) e.parent = o
        }
        return e.destroy(), o
    }
    addNode(e, t, n, r, i) {
        let a = zl.create(this.top, e, t, n, r, i);
        a.contentDOM && a.updateChildren(r, i + 1), this.top.children.splice(this.index++, 0, a), this.changed = !0
    }
    placeWidget(e, t, n) {
        let r = this.index < this.top.children.length ? this.top.children[this.index] : null;
        if (r && r.matchesWidget(e) && (e == r.widget || !r.widget.type.toDOM.parentNode)) this.index++;
        else {
            let r = new Il(this.top, e, t, n);
            this.top.children.splice(this.index++, 0, r), this.changed = !0
        }
    }
    addTextblockHacks() {
        let e = this.top.children[this.index - 1],
            t = this.top;
        for (; e instanceof Rl;) t = e, e = t.children[t.children.length - 1];
        (!e || !(e instanceof Vl) || /\n$/.test(e.node.text) || this.view.requiresGeckoHackNode && /\s$/.test(e.node.text)) && ((U || H) && e && e.dom.contentEditable == `false` && this.addHackNode(`IMG`, t), this.addHackNode(`BR`, this.top))
    }
    addHackNode(e, t) {
        if (t == this.top && this.index < t.children.length && t.children[this.index].matchesHack(e)) this.index++;
        else {
            let n = document.createElement(e);
            e == `IMG` && (n.className = `ProseMirror-separator`, n.alt = ``), e == `BR` && (n.className = `ProseMirror-trailingBreak`);
            let r = new Hl(this.top, [], n, null);
            t == this.top ? t.children.splice(this.index++, 0, r) : t.children.push(r), this.changed = !0
        }
    }
    isLocked(e) {
        return this.lock && (e == this.lock || e.nodeType == 1 && e.contains(this.lock.parentNode))
    }
};

function eu(e, t) {
    let n = t,
        r = n.children.length,
        i = e.childCount,
        a = new Map,
        o = [];
    outer: for (; i > 0;) {
        let s;
        for (;;)
            if (r) {
                let e = n.children[r - 1];
                if (e instanceof Rl) n = e, r = e.children.length;
                else {
                    s = e, r--;
                    break
                }
            } else if (n == t) break outer;
        else r = n.parent.children.indexOf(n), n = n.parent;
        let c = s.node;
        if (c) {
            if (c != e.child(i - 1)) break;
            --i, a.set(s, i), o.push(s)
        }
    }
    return {
        index: i,
        matched: a,
        matches: o.reverse()
    }
}

function tu(e, t) {
    return e.type.side - t.type.side
}

function nu(e, t, n, r) {
    let i = t.locals(e),
        a = 0;
    if (i.length == 0) {
        for (let n = 0; n < e.childCount; n++) {
            let o = e.child(n);
            r(o, i, t.forChild(a, o), n), a += o.nodeSize
        }
        return
    }
    let o = 0,
        s = [],
        c = null;
    for (let l = 0;;) {
        let u, d;
        for (; o < i.length && i[o].to == a;) {
            let e = i[o++];
            e.widget && (u ? (d ||= [u]).push(e) : u = e)
        }
        if (u)
            if (d) {
                d.sort(tu);
                for (let e = 0; e < d.length; e++) n(d[e], l, !!c)
            } else n(u, l, !!c);
        let f, p;
        if (c) p = -1, f = c, c = null;
        else if (l < e.childCount) p = l, f = e.child(l++);
        else break;
        for (let e = 0; e < s.length; e++) s[e].to <= a && s.splice(e--, 1);
        for (; o < i.length && i[o].from <= a && i[o].to > a;) s.push(i[o++]);
        let m = a + f.nodeSize;
        if (f.isText) {
            let e = m;
            o < i.length && i[o].from < e && (e = i[o].from);
            for (let t = 0; t < s.length; t++) s[t].to < e && (e = s[t].to);
            e < m && (c = f.cut(e - a), f = f.cut(0, e - a), m = e, p = -1)
        } else
            for (; o < i.length && i[o].to < m;) o++;
        let h = f.isInline && !f.isLeaf ? s.filter(e => !e.inline) : s.slice();
        r(f, h, t.forChild(a, f), p), a = m
    }
}

function ru(e) {
    if (e.nodeName == `UL` || e.nodeName == `OL`) {
        let t = e.style.cssText;
        e.style.cssText = t + `; list-style: square !important`, window.getComputedStyle(e).listStyle, e.style.cssText = t
    }
}

function iu(e, t, n, r) {
    for (let i = 0, a = 0; i < e.childCount && a <= r;) {
        let o = e.child(i++),
            s = a;
        if (a += o.nodeSize, !o.isText) continue;
        let c = o.text;
        for (; i < e.childCount;) {
            let t = e.child(i++);
            if (a += t.nodeSize, !t.isText) break;
            c += t.text
        }
        if (a >= n) {
            if (a >= r && c.slice(r - t.length - s, r - s) == t) return r - t.length;
            let e = s < r ? c.lastIndexOf(t, r - s - 1) : -1;
            if (e >= 0 && e + t.length + s >= n) return s + e;
            if (n == r && c.length >= r + t.length - s && c.slice(r - s, r - s + t.length) == t) return r
        }
    }
    return -1
}

function au(e, t, n, r, i) {
    let a = [];
    for (let o = 0, s = 0; o < e.length; o++) {
        let c = e[o],
            l = s,
            u = s += c.size;
        l >= n || u <= t ? a.push(c) : (l < t && a.push(c.slice(0, t - l, r)), i &&= (a.push(i), void 0), u > n && a.push(c.slice(n - l, c.size, r)))
    }
    return a
}

function ou(e, t = null) {
    let n = e.domSelectionRange(),
        r = e.state.doc;
    if (!n.focusNode) return null;
    let i = e.docView.nearestDesc(n.focusNode),
        a = i && i.size == 0,
        o = e.docView.posFromDOM(n.focusNode, n.focusOffset, 1);
    if (o < 0) return null;
    let s = r.resolve(o),
        c, l;
    if (Ic(n)) {
        for (c = o; i && !i.node;) i = i.parent;
        let e = i.node;
        if (i && e.isAtom && M.isSelectable(e) && i.parent && !(e.isInline && Pc(n.focusNode, n.focusOffset, i.dom))) {
            let e = i.posBefore;
            l = new M(o == e ? s : r.resolve(e))
        }
    } else {
        if (n instanceof e.dom.ownerDocument.defaultView.Selection && n.rangeCount > 1) {
            let t = o,
                i = o;
            for (let r = 0; r < n.rangeCount; r++) {
                let a = n.getRangeAt(r);
                t = Math.min(t, e.docView.posFromDOM(a.startContainer, a.startOffset, 1)), i = Math.max(i, e.docView.posFromDOM(a.endContainer, a.endOffset, -1))
            }
            if (t < 0) return null;
            [c, o] = i == e.state.selection.anchor ? [i, t] : [t, i], s = r.resolve(o)
        } else c = e.docView.posFromDOM(n.anchorNode, n.anchorOffset, 1);
        if (c < 0) return null
    }
    let u = r.resolve(c);
    if (!l) {
        let n = t == `pointer` || e.state.selection.head < s.pos && !a ? 1 : -1;
        l = _u(e, u, s, n)
    }
    return l
}

function su(e) {
    return e.editable ? e.hasFocus() : yu(e) && document.activeElement && document.activeElement.contains(e.dom)
}

function cu(e, t = !1) {
    let n = e.state.selection;
    if (hu(e, n), !su(e)) return;
    let r = e.input.mouseDown;
    if (!t && H && r) {
        let t = e.domSelectionRange(),
            n = e.domObserver.currentSelection;
        if (t.anchorNode && n.anchorNode && kc(t.anchorNode, t.anchorOffset, n.anchorNode, n.anchorOffset) && r.delaySelUpdate()) {
            e.domObserver.setCurSelection();
            return
        }
    }
    if (e.domObserver.disconnectSelection(), e.cursorWrapper) mu(e);
    else {
        let {
            anchor: r,
            head: i
        } = n, a, o;
        lu && !(n instanceof j) && (n.$from.parent.inlineContent || (a = uu(e, n.from)), !n.empty && !n.$from.parent.inlineContent && (o = uu(e, n.to))), e.docView.setSelection(r, i, e, t), lu && (a && fu(a), o && fu(o)), n.visible ? e.dom.classList.remove(`ProseMirror-hideselection`) : (e.dom.classList.add(`ProseMirror-hideselection`), `onselectionchange` in document && pu(e))
    }
    e.domObserver.setCurSelection(), e.domObserver.connectSelection()
}
var lu = U || H && Jc < 63;

function uu(e, t) {
    let {
        node: n,
        offset: r
    } = e.docView.domFromPos(t, 0), i = r < n.childNodes.length ? n.childNodes[r] : null, a = r ? n.childNodes[r - 1] : null;
    if (U && i && i.contentEditable == `false`) return du(i);
    if ((!i || i.contentEditable == `false`) && (!a || a.contentEditable == `false`)) {
        if (i) return du(i);
        if (a) return du(a)
    }
}

function du(e) {
    return e.contentEditable = `true`, U && e.draggable && (e.draggable = !1, e.wasDraggable = !0), e
}

function fu(e) {
    e.contentEditable = `false`, e.wasDraggable &&= (e.draggable = !0, null)
}

function pu(e) {
    let t = e.dom.ownerDocument;
    t.removeEventListener(`selectionchange`, e.input.hideSelectionGuard);
    let n = e.domSelectionRange(),
        r = n.anchorNode,
        i = n.anchorOffset;
    t.addEventListener(`selectionchange`, e.input.hideSelectionGuard = () => {
        (n.anchorNode != r || n.anchorOffset != i) && (t.removeEventListener(`selectionchange`, e.input.hideSelectionGuard), setTimeout(() => {
            (!su(e) || e.state.selection.visible) && e.dom.classList.remove(`ProseMirror-hideselection`)
        }, 20))
    })
}

function mu(e) {
    let t = e.domSelection();
    if (!t) return;
    let n = e.cursorWrapper.dom,
        r = n.nodeName == `IMG`;
    r ? t.collapse(n.parentNode, R(n) + 1) : t.collapse(n, 0), !r && !e.state.selection.visible && B && Kc <= 11 && (n.disabled = !0, n.disabled = !1)
}

function hu(e, t) {
    if (t instanceof M) {
        let n = e.docView.descAt(t.from);
        n != e.lastSelectedViewDesc && (gu(e), n && n.selectNode(), e.lastSelectedViewDesc = n)
    } else gu(e)
}

function gu(e) {
    e.lastSelectedViewDesc &&= (e.lastSelectedViewDesc.parent && e.lastSelectedViewDesc.deselectNode(), void 0)
}

function _u(e, t, n, r) {
    return e.someProp(`createSelectionBetween`, r => r(e, t, n)) || j.between(t, n, r)
}

function vu(e) {
    return e.editable && !e.hasFocus() ? !1 : yu(e)
}

function yu(e) {
    let t = e.domSelectionRange();
    if (!t.anchorNode) return !1;
    try {
        return e.dom.contains(t.anchorNode.nodeType == 3 ? t.anchorNode.parentNode : t.anchorNode) && (e.editable || e.dom.contains(t.focusNode.nodeType == 3 ? t.focusNode.parentNode : t.focusNode))
    } catch {
        return !1
    }
}

function bu(e) {
    let t = e.docView.domFromPos(e.state.selection.anchor, 0),
        n = e.domSelectionRange();
    return kc(t.node, t.offset, n.anchorNode, n.anchorOffset)
}

function xu(e, t) {
    let {
        $anchor: n,
        $head: r
    } = e.selection, i = t > 0 ? n.max(r) : n.min(r), a = i.parent.inlineContent ? i.depth ? e.doc.resolve(t > 0 ? i.after() : i.before()) : null : i;
    return a && A.findFrom(a, t)
}

function Su(e, t) {
    return e.dispatch(e.state.tr.setSelection(t).scrollIntoView()), !0
}

function Cu(e, t, n) {
    let r = e.state.selection;
    if (r instanceof j)
        if (n.indexOf(`s`) > -1) {
            let {
                $head: n
            } = r, i = n.textOffset ? null : t < 0 ? n.nodeBefore : n.nodeAfter;
            if (!i || i.isText || !i.isLeaf) return !1;
            let a = e.state.doc.resolve(n.pos + i.nodeSize * (t < 0 ? -1 : 1));
            return Su(e, new j(r.$anchor, a))
        } else if (r.empty) {
        if (e.endOfTextblock(t > 0 ? `forward` : `backward`)) {
            let n = xu(e.state, t);
            return n && n instanceof M ? Su(e, n) : !1
        } else if (!(W && n.indexOf(`m`) > -1)) {
            let n = r.$head,
                i = n.textOffset ? null : t < 0 ? n.nodeBefore : n.nodeAfter,
                a;
            if (!i || i.isText) return !1;
            let o = t < 0 ? n.pos - i.nodeSize : n.pos;
            return i.isAtom || (a = e.docView.descAt(o)) && !a.contentDOM ? M.isSelectable(i) ? Su(e, new M(t < 0 ? e.state.doc.resolve(n.pos - i.nodeSize) : n)) : Qc ? Su(e, new j(e.state.doc.resolve(t < 0 ? o : o + i.nodeSize))) : !1 : !1
        }
    } else return !1;
    else if (r instanceof M && r.node.isInline) return Su(e, new j(t > 0 ? r.$to : r.$from));
    else {
        let n = xu(e.state, t);
        return n ? Su(e, n) : !1
    }
}

function wu(e) {
    return e.nodeType == 3 ? e.nodeValue.length : e.childNodes.length
}

function Tu(e, t) {
    let n = e.pmViewDesc;
    return n && n.size == 0 && (t < 0 || e.nextSibling || e.nodeName != `BR`)
}

function Eu(e, t) {
    return t < 0 ? Du(e) : Ou(e)
}

function Du(e) {
    let t = e.domSelectionRange(),
        n = t.focusNode,
        r = t.focusOffset;
    if (!n) return;
    let i, a, o = !1;
    for (V && n.nodeType == 1 && r < wu(n) && Tu(n.childNodes[r], -1) && (o = !0);;)
        if (r > 0) {
            if (n.nodeType != 1) break; {
                let e = n.childNodes[r - 1];
                if (Tu(e, -1)) i = n, a = --r;
                else if (e.nodeType == 3) n = e, r = n.nodeValue.length;
                else break
            }
        } else if (ku(n)) break;
    else {
        let t = n.previousSibling;
        for (; t && Tu(t, -1);) i = n.parentNode, a = R(t), t = t.previousSibling;
        if (t) n = t, r = wu(n);
        else {
            if (n = n.parentNode, n == e.dom) break;
            r = 0
        }
    }
    o ? Mu(e, n, r) : i && Mu(e, i, a)
}

function Ou(e) {
    let t = e.domSelectionRange(),
        n = t.focusNode,
        r = t.focusOffset;
    if (!n) return;
    let i = wu(n),
        a, o;
    for (;;)
        if (r < i) {
            if (n.nodeType != 1) break;
            let e = n.childNodes[r];
            if (Tu(e, 1)) a = n, o = ++r;
            else break
        } else if (ku(n)) break;
    else {
        let t = n.nextSibling;
        for (; t && Tu(t, 1);) a = t.parentNode, o = R(t) + 1, t = t.nextSibling;
        if (t) n = t, r = 0, i = wu(n);
        else {
            if (n = n.parentNode, n == e.dom) break;
            r = i = 0
        }
    }
    a && Mu(e, a, o)
}

function ku(e) {
    let t = e.pmViewDesc;
    return t && t.node && t.node.isBlock
}

function Au(e, t) {
    for (; e && t == e.childNodes.length && !Fc(e);) t = R(e) + 1, e = e.parentNode;
    for (; e && t < e.childNodes.length;) {
        let n = e.childNodes[t];
        if (n.nodeType == 3) return n;
        if (n.nodeType == 1 && n.contentEditable == `false`) break;
        e = n, t = 0
    }
}

function ju(e, t) {
    for (; e && !t && !Fc(e);) t = R(e), e = e.parentNode;
    for (; e && t;) {
        let n = e.childNodes[t - 1];
        if (n.nodeType == 3) return n;
        if (n.nodeType == 1 && n.contentEditable == `false`) break;
        e = n, t = e.childNodes.length
    }
}

function Mu(e, t, n) {
    if (t.nodeType != 3) {
        let e, r;
        (r = Au(t, n)) ? (t = r, n = 0) : (e = ju(t, n)) && (t = e, n = e.nodeValue.length)
    }
    let r = e.domSelection();
    if (!r) return;
    if (Ic(r)) {
        let e = document.createRange();
        e.setEnd(t, n), e.setStart(t, n), r.removeAllRanges(), r.addRange(e)
    } else r.extend && r.extend(t, n);
    e.domObserver.setCurSelection();
    let {
        state: i
    } = e;
    setTimeout(() => {
        e.state == i && cu(e)
    }, 50)
}

function Nu(e, t) {
    let n = e.state.doc.resolve(t);
    if (!(H || Xc) && n.parent.inlineContent) {
        let r = e.coordsAtPos(t);
        if (t > n.start()) {
            let n = e.coordsAtPos(t - 1),
                i = (n.top + n.bottom) / 2;
            if (i > r.top && i < r.bottom && Math.abs(n.left - r.left) > 1) return n.left < r.left ? `ltr` : `rtl`
        }
        if (t < n.end()) {
            let n = e.coordsAtPos(t + 1),
                i = (n.top + n.bottom) / 2;
            if (i > r.top && i < r.bottom && Math.abs(n.left - r.left) > 1) return n.left > r.left ? `ltr` : `rtl`
        }
    }
    return getComputedStyle(e.dom).direction == `rtl` ? `rtl` : `ltr`
}

function Pu(e, t, n) {
    let r = e.state.selection;
    if (r instanceof j && !r.empty || n.indexOf(`s`) > -1 || W && n.indexOf(`m`) > -1) return !1;
    let {
        $from: i,
        $to: a
    } = r;
    if (!i.parent.inlineContent || e.endOfTextblock(t < 0 ? `up` : `down`)) {
        let n = xu(e.state, t);
        if (n && n instanceof M) return Su(e, n)
    }
    if (!i.parent.inlineContent) {
        let n = t < 0 ? i : a,
            o = r instanceof Xa ? A.near(n, t) : A.findFrom(n, t);
        return o ? Su(e, o) : !1
    }
    return !1
}

function Fu(e, t) {
    if (!(e.state.selection instanceof j)) return !0;
    let {
        $head: n,
        $anchor: r,
        empty: i
    } = e.state.selection;
    if (!n.sameParent(r)) return !0;
    if (!i) return !1;
    if (e.endOfTextblock(t > 0 ? `forward` : `backward`)) return !0;
    let a = !n.textOffset && (t < 0 ? n.nodeBefore : n.nodeAfter);
    if (a && !a.isText) {
        let r = e.state.tr;
        return t < 0 ? r.delete(n.pos - a.nodeSize, n.pos) : r.delete(n.pos, n.pos + a.nodeSize), e.dispatch(r), !0
    }
    return !1
}

function Iu(e, t, n) {
    e.domObserver.stop(), t.contentEditable = n, e.domObserver.start()
}

function Lu(e) {
    if (!U || e.state.selection.$head.parentOffset > 0) return !1;
    let {
        focusNode: t,
        focusOffset: n
    } = e.domSelectionRange();
    if (t && t.nodeType == 1 && n == 0 && t.firstChild && t.firstChild.contentEditable == `false`) {
        let n = t.firstChild;
        Iu(e, n, `true`), setTimeout(() => Iu(e, n, `false`), 20)
    }
    return !1
}

function Ru(e) {
    let t = ``;
    return e.ctrlKey && (t += `c`), e.metaKey && (t += `m`), e.altKey && (t += `a`), e.shiftKey && (t += `s`), t
}

function zu(e, t) {
    let n = t.keyCode,
        r = Ru(t);
    if (n == 8 || W && n == 72 && r == `c`) return Fu(e, -1) || Eu(e, -1);
    if (n == 46 && !t.shiftKey || W && n == 68 && r == `c`) return Fu(e, 1) || Eu(e, 1);
    if (n == 13 || n == 27) return !0;
    if (n == 37 || W && n == 66 && r == `c`) {
        let t = n == 37 ? Nu(e, e.state.selection.from) == `ltr` ? -1 : 1 : -1;
        return Cu(e, t, r) || Eu(e, t)
    } else if (n == 39 || W && n == 70 && r == `c`) {
        let t = n == 39 ? Nu(e, e.state.selection.from) == `ltr` ? 1 : -1 : 1;
        return Cu(e, t, r) || Eu(e, t)
    } else if (n == 38 || W && n == 80 && r == `c`) return Pu(e, -1, r) || Eu(e, -1);
    else if (n == 40 || W && n == 78 && r == `c`) return Lu(e) || Pu(e, 1, r) || Eu(e, 1);
    else if (r == (W ? `m` : `c`) && (n == 66 || n == 73 || n == 89 || n == 90)) return !0;
    return !1
}

function Bu(e, t) {
    e.someProp(`transformCopied`, n => {
        t = n(t, e)
    });
    let n = [],
        {
            content: r,
            openStart: i,
            openEnd: a
        } = t;
    for (; i > 1 && a > 1 && r.childCount == 1 && r.firstChild.childCount == 1;) {
        i--, a--;
        let e = r.firstChild;
        n.push(e.type.name, e.attrs == e.type.defaultAttrs ? null : e.attrs), r = e.content
    }
    let o = e.someProp(`clipboardSerializer`) || rt.fromSchema(e.state.schema),
        s = Xu(),
        c = s.createElement(`div`);
    c.appendChild(o.serializeFragment(r, {
        document: s
    }));
    let l = c.firstChild,
        u, d = 0;
    for (; l && l.nodeType == 1 && (u = Yu[l.nodeName.toLowerCase()]);) {
        for (let e = u.length - 1; e >= 0; e--) {
            let t = s.createElement(u[e]);
            for (; c.firstChild;) t.appendChild(c.firstChild);
            c.appendChild(t), d++
        }
        l = c.firstChild
    }
    return l && l.nodeType == 1 && l.setAttribute(`data-pm-slice`, `${i} ${a}${d?` -${d}`:``} ${JSON.stringify(n)}`), {
        dom: c,
        text: e.someProp(`clipboardTextSerializer`, n => n(t, e)) || t.content.textBetween(0, t.content.size, `

`),
        slice: t
    }
}

function Vu(e, t, n, r, i) {
    let a = i.parent.type.spec.code,
        o, s;
    if (!n && !t) return null;
    let l = !!t && (r || a || !n);
    if (l) {
        if (e.someProp(`transformPastedText`, n => {
                t = n(t, a || r, e)
            }), a) return s = new m(c.from(e.state.schema.text(t.replace(/\r\n?/g, `
`))), 0, 0), e.someProp(`transformPasted`, t => {
            s = t(s, e, !0)
        }), s;
        let n = e.someProp(`clipboardTextParser`, n => n(t, i, r, e));
        if (n) s = n;
        else {
            let n = i.marks(),
                {
                    schema: r
                } = e.state,
                a = rt.fromSchema(r);
            o = document.createElement(`div`), t.split(/(?:\r\n?|\n)+/).forEach(e => {
                let t = o.appendChild(document.createElement(`p`));
                e && t.appendChild(a.serializeNode(r.text(e, n)))
            })
        }
    } else e.someProp(`transformPastedHTML`, t => {
        n = t(n, e)
    }), o = $u(n), Qc && ed(o);
    let u = o && o.querySelector(`[data-pm-slice]`),
        d = u && /^(\d+) (\d+)(?: -(\d+))? (.*)/.exec(u.getAttribute(`data-pm-slice`) || ``);
    if (d && d[3])
        for (let e = +d[3]; e > 0; e--) {
            let e = o.firstChild;
            for (; e && e.nodeType != 1;) e = e.nextSibling;
            if (!e) break;
            o = e
        }
    if (s ||= (e.someProp(`clipboardParser`) || e.someProp(`domParser`) || Ue.fromSchema(e.state.schema)).parseSlice(o, {
            preserveWhitespace: !!(l || d),
            context: i,
            ruleFromNode(e) {
                return e.nodeName == `BR` && !e.nextSibling && e.parentNode && !Hu.test(e.parentNode.nodeName) ? {
                    ignore: !0
                } : null
            }
        }), d) s = td(Ju(s, +d[1], +d[2]), d[4]);
    else if (s = m.maxOpen(Uu(s.content, i), !0), s.openStart || s.openEnd) {
        let e = 0,
            t = 0;
        for (let t = s.content.firstChild; e < s.openStart && !t.type.spec.isolating; e++, t = t.firstChild);
        for (let e = s.content.lastChild; t < s.openEnd && !e.type.spec.isolating; t++, e = e.lastChild);
        s = Ju(s, e, t)
    }
    return e.someProp(`transformPasted`, t => {
        s = t(s, e, l)
    }), s
}
var Hu = /^(a|abbr|acronym|b|cite|code|del|em|i|ins|kbd|label|output|q|ruby|s|samp|span|strong|sub|sup|time|u|tt|var)$/i;

function Uu(e, t) {
    if (e.childCount < 2) return e;
    for (let n = t.depth; n >= 0; n--) {
        let r = t.node(n).contentMatchAt(t.index(n)),
            i, a = [];
        if (e.forEach(e => {
                if (!a) return;
                let t = r.findWrapping(e.type),
                    n;
                if (!t) return a = null;
                if (n = a.length && i.length && Gu(t, i, e, a[a.length - 1], 0)) a[a.length - 1] = n;
                else {
                    a.length && (a[a.length - 1] = Ku(a[a.length - 1], i.length));
                    let n = Wu(e, t);
                    a.push(n), r = r.matchType(n.type), i = t
                }
            }), a) return c.from(a)
    }
    return e
}

function Wu(e, t, n = 0) {
    for (let r = t.length - 1; r >= n; r--) e = t[r].create(null, c.from(e));
    return e
}

function Gu(e, t, n, r, i) {
    if (i < e.length && i < t.length && e[i] == t[i]) {
        let a = Gu(e, t, n, r.lastChild, i + 1);
        if (a) return r.copy(r.content.replaceChild(r.childCount - 1, a));
        if (r.contentMatchAt(r.childCount).matchType(i == e.length - 1 ? n.type : e[i + 1])) return r.copy(r.content.append(c.from(Wu(n, e, i + 1))))
    }
}

function Ku(e, t) {
    if (t == 0) return e;
    let n = e.content.replaceChild(e.childCount - 1, Ku(e.lastChild, t - 1)),
        r = e.contentMatchAt(e.childCount).fillBefore(c.empty, !0);
    return e.copy(n.append(r))
}

function qu(e, t, n, r, i, a) {
    let o = t < 0 ? e.firstChild : e.lastChild,
        s = o.content;
    return e.childCount > 1 && (a = 0), i < r - 1 && (s = qu(s, t, n, r, i + 1, a)), i >= n && (s = t < 0 ? o.contentMatchAt(0).fillBefore(s, a <= i).append(s) : s.append(o.contentMatchAt(o.childCount).fillBefore(c.empty, !0))), e.replaceChild(t < 0 ? 0 : e.childCount - 1, o.copy(s))
}

function Ju(e, t, n) {
    return t < e.openStart && (e = new m(qu(e.content, -1, t, e.openStart, 0, e.openEnd), t, e.openEnd)), n < e.openEnd && (e = new m(qu(e.content, 1, n, e.openEnd, 0, 0), e.openStart, n)), e
}
var Yu = {
    thead: [`table`],
    tbody: [`table`],
    tfoot: [`table`],
    caption: [`table`],
    colgroup: [`table`],
    col: [`table`, `colgroup`],
    tr: [`table`, `tbody`],
    td: [`table`, `tbody`, `tr`],
    th: [`table`, `tbody`, `tr`]
};

function Xu() {
    return document.implementation.createHTMLDocument(`title`)
}
var Zu = null;

function Qu(e) {
    let t = window.trustedTypes;
    if (!t) return e;
    if (!Zu) {
        if (Zu = t.defaultPolicy) try {
            return Zu.createHTML(e)
        } catch {}
        Zu = t.createPolicy(`ProseMirrorClipboard`, {
            createHTML: e => e
        })
    }
    return Zu.createHTML(e)
}

function $u(e) {
    let t = /^(\s*<meta [^>]*>)*/.exec(e);
    t && (e = e.slice(t[0].length));
    let n = Xu(),
        r = n.body,
        i = /<([a-z][^>\s]+)/i.exec(e),
        a;
    if ((a = i && Yu[i[1].toLowerCase()]) && (e = a.map(e => `<` + e + `>`).join(``) + e + a.map(e => `</` + e + `>`).reverse().join(``)), r.innerHTML = Qu(e), a)
        for (let e = 0; e < a.length; e++) r = r.querySelector(a[e]) || r;
    for (let e = 0; e < n.styleSheets.length; e++) {
        let t = n.styleSheets[e];
        for (let e = 0; e < t.rules.length; e++) {
            let n = t.rules[e];
            if (n instanceof CSSStyleRule) {
                let e = r.querySelectorAll(n.selectorText);
                for (let t = 0; t < e.length; t++) e[t].style.cssText += n.style.cssText
            }
        }
    }
    return r
}

function ed(e) {
    let t = e.querySelectorAll(H ? `span:not([class]):not([style])` : `span.Apple-converted-space`);
    for (let n = 0; n < t.length; n++) {
        let r = t[n];
        r.childNodes.length == 1 && r.textContent == `\xA0` && r.parentNode && r.parentNode.replaceChild(e.ownerDocument.createTextNode(` `), r)
    }
}

function td(e, t) {
    if (!e.size) return e;
    let n = e.content.firstChild.type.schema,
        r;
    try {
        r = JSON.parse(t)
    } catch {
        return e
    }
    let {
        content: i,
        openStart: a,
        openEnd: o
    } = e;
    for (let e = r.length - 2; e >= 0; e -= 2) {
        let t = n.nodes[r[e]];
        if (!t || t.hasRequiredAttrs()) break;
        try {
            t.checkAttrs(r[e + 1])
        } catch {
            break
        }
        i = c.from(t.create(r[e + 1], i)), a++, o++
    }
    return new m(i, a, o)
}
var K = {},
    q = {},
    nd = {
        touchstart: !0,
        touchmove: !0
    },
    rd = class {
        constructor() {
            this.shiftKey = !1, this.mouseDown = null, this.lastKeyCode = null, this.lastKeyCodeTime = 0, this.lastClick = {
                time: 0,
                x: 0,
                y: 0,
                type: ``,
                button: 0
            }, this.lastSelectionOrigin = null, this.lastSelectionTime = 0, this.lastIOSEnter = 0, this.lastIOSEnterFallbackTimeout = -1, this.lastFocus = 0, this.lastTouch = 0, this.lastChromeDelete = 0, this.composing = !1, this.compositionNode = null, this.composingTimeout = -1, this.compositionNodes = [], this.compositionEndedAt = -2e8, this.compositionID = 1, this.badSafariComposition = !1, this.compositionPendingChanges = 0, this.domChangeCount = 0, this.eventHandlers = Object.create(null), this.hideSelectionGuard = null
        }
    };

function id(e) {
    for (let t in K) {
        let n = K[t];
        e.dom.addEventListener(t, e.input.eventHandlers[t] = t => {
            ld(e, t) && !cd(e, t) && (e.editable || !(t.type in q)) && n(e, t)
        }, nd[t] ? {
            passive: !0
        } : void 0)
    }
    U && e.dom.addEventListener(`input`, () => null), sd(e)
}

function ad(e, t) {
    e.input.lastSelectionOrigin = t, e.input.lastSelectionTime = Date.now()
}

function od(e) {
    for (let t in e.input.mouseDown && e.input.mouseDown.done(), e.domObserver.stop(), e.input.eventHandlers) e.dom.removeEventListener(t, e.input.eventHandlers[t]);
    clearTimeout(e.input.composingTimeout), clearTimeout(e.input.lastIOSEnterFallbackTimeout)
}

function sd(e) {
    e.someProp(`handleDOMEvents`, t => {
        for (let n in t) e.input.eventHandlers[n] || e.dom.addEventListener(n, e.input.eventHandlers[n] = t => cd(e, t))
    })
}

function cd(e, t) {
    return e.someProp(`handleDOMEvents`, n => {
        let r = n[t.type];
        return r ? r(e, t) || t.defaultPrevented : !1
    })
}

function ld(e, t) {
    if (!t.bubbles) return !0;
    if (t.defaultPrevented) return !1;
    for (let n = t.target; n != e.dom; n = n.parentNode)
        if (!n || n.nodeType == 11 || n.pmViewDesc && n.pmViewDesc.stopEvent(t)) return !1;
    return !0
}

function ud(e, t) {
    !cd(e, t) && K[t.type] && (e.editable || !(t.type in q)) && K[t.type](e, t)
}
q.keydown = (e, t) => {
    let n = t;
    if (e.input.shiftKey = n.keyCode == 16 || n.shiftKey, !Dd(e) && (e.input.lastKeyCode = n.keyCode, e.input.lastKeyCodeTime = Date.now(), !(Zc && H && n.keyCode == 13)))
        if (n.keyCode != 229 && e.domObserver.forceFlush(), Yc && n.keyCode == 13 && !n.ctrlKey && !n.altKey && !n.metaKey) {
            let t = Date.now();
            e.input.lastIOSEnter = t, e.input.lastIOSEnterFallbackTimeout = setTimeout(() => {
                e.input.lastIOSEnter == t && (e.someProp(`handleKeyDown`, t => t(e, Lc(13, `Enter`))), e.input.lastIOSEnter = 0)
            }, 200)
        } else e.someProp(`handleKeyDown`, t => t(e, n)) || zu(e, n) ? n.preventDefault() : ad(e, `key`)
}, q.keyup = (e, t) => {
    t.keyCode == 16 && (e.input.shiftKey = !1)
}, q.keypress = (e, t) => {
    let n = t;
    if (Dd(e) || !n.charCode || n.ctrlKey && !n.altKey || W && n.metaKey) return;
    if (e.someProp(`handleKeyPress`, t => t(e, n))) {
        n.preventDefault();
        return
    }
    let r = e.state.selection;
    if (!(r instanceof j) || !r.$from.sameParent(r.$to)) {
        let t = String.fromCharCode(n.charCode),
            i = () => e.state.tr.insertText(t).scrollIntoView();
        !/[\r\n]/.test(t) && !e.someProp(`handleTextInput`, n => n(e, r.$from.pos, r.$to.pos, t, i)) && e.dispatch(i()), n.preventDefault()
    }
};

function dd(e) {
    return {
        left: e.clientX,
        top: e.clientY
    }
}

function fd(e, t) {
    let n = t.x - e.clientX,
        r = t.y - e.clientY;
    return n * n + r * r < 100
}

function pd(e, t, n, r, i) {
    if (r == -1) return !1;
    let a = e.state.doc.resolve(r);
    for (let r = a.depth + 1; r > 0; r--)
        if (e.someProp(t, t => r > a.depth ? t(e, n, a.nodeAfter, a.before(r), i, !0) : t(e, n, a.node(r), a.before(r), i, !1))) return !0;
    return !1
}

function md(e, t, n) {
    if (e.focused || e.focus(), e.state.selection.eq(t)) return;
    let r = e.state.tr.setSelection(t);
    n == `pointer` && r.setMeta(`pointer`, !0), e.dispatch(r)
}

function hd(e, t) {
    if (t == -1) return !1;
    let n = e.state.doc.resolve(t),
        r = n.nodeAfter;
    return r && r.isAtom && M.isSelectable(r) ? (md(e, new M(n), `pointer`), !0) : !1
}

function gd(e, t) {
    if (t == -1) return !1;
    let n = e.state.selection,
        r, i;
    n instanceof M && (r = n.node);
    let a = e.state.doc.resolve(t);
    for (let e = a.depth + 1; e > 0; e--) {
        let t = e > a.depth ? a.nodeAfter : a.node(e);
        if (M.isSelectable(t)) {
            i = r && n.$from.depth > 0 && e >= n.$from.depth && a.before(n.$from.depth + 1) == n.$from.pos ? a.before(n.$from.depth) : a.before(e);
            break
        }
    }
    return i == null ? !1 : (md(e, M.create(e.state.doc, i), `pointer`), !0)
}

function _d(e, t, n, r, i) {
    return pd(e, `handleClickOn`, t, n, r) || e.someProp(`handleClick`, n => n(e, t, r)) || (i ? gd(e, n) : hd(e, n))
}

function vd(e, t, n, r) {
    return pd(e, `handleDoubleClickOn`, t, n, r) || e.someProp(`handleDoubleClick`, n => n(e, t, r))
}

function yd(e, t, n, r) {
    return pd(e, `handleTripleClickOn`, t, n, r) || e.someProp(`handleTripleClick`, n => n(e, t, r)) || bd(e, n, r)
}

function bd(e, t, n) {
    if (n.button != 0) return !1;
    let r = xd(e, t, !0),
        i = e.state.doc;
    return r ? (md(e, r, `pointer`), r instanceof j && i.eq(e.state.doc) && (e.input.mouseDown = new Ed(e, r)), !0) : !1
}

function xd(e, t, n) {
    let r = e.state.doc;
    if (t == -1) return r.inlineContent ? j.create(r, 0, r.content.size) : null;
    let i = r.resolve(t);
    for (let e = i.depth + 1; e > 0; e--) {
        let t = e > i.depth ? i.nodeAfter : i.node(e),
            a = i.before(e);
        if (t.inlineContent) return j.create(r, a + 1, a + 1 + t.content.size);
        if (n && M.isSelectable(t)) return M.create(r, a)
    }
    return null
}

function Sd(e) {
    return Nd(e)
}
var Cd = W ? `metaKey` : `ctrlKey`;
K.mousedown = (e, t) => {
    let n = t;
    e.input.shiftKey = n.shiftKey;
    let r = Sd(e),
        i = Date.now(),
        a = `singleClick`;
    i - e.input.lastClick.time < 500 && fd(n, e.input.lastClick) && !n[Cd] && e.input.lastClick.button == n.button && (e.input.lastClick.type == `singleClick` ? a = `doubleClick` : e.input.lastClick.type == `doubleClick` && (a = `tripleClick`)), e.input.lastClick = {
        time: i,
        x: n.clientX,
        y: n.clientY,
        type: a,
        button: n.button
    }, e.input.mouseDown && e.input.mouseDown.done();
    let o = e.posAtCoords(dd(n));
    o && (a == `singleClick` ? e.input.mouseDown = new Td(e, o, n, !!r) : (a == `doubleClick` ? vd : yd)(e, o.pos, o.inside, n) ? n.preventDefault() : ad(e, `pointer`))
};
var wd = class {
        constructor(e) {
            this.view = e, this.mightDrag = null, e.root.addEventListener(`mouseup`, this.up = this.up.bind(this)), e.root.addEventListener(`mousemove`, this.move = this.move.bind(this))
        }
        up(e) {
            this.done()
        }
        move(e) {
            e.buttons == 0 && this.done()
        }
        done() {
            this.view.root.removeEventListener(`mouseup`, this.up), this.view.root.removeEventListener(`mousemove`, this.move), this.view.input.mouseDown == this && (this.view.input.mouseDown = null)
        }
        delaySelUpdate() {
            return !1
        }
    },
    Td = class extends wd {
        constructor(e, t, n, r) {
            super(e), this.pos = t, this.event = n, this.flushed = r, this.delayedSelectionSync = !1, this.startDoc = e.state.doc, this.selectNode = !!n[Cd], this.allowDefault = n.shiftKey;
            let i, a;
            if (t.inside > -1) i = e.state.doc.nodeAt(t.inside), a = t.inside;
            else {
                let n = e.state.doc.resolve(t.pos);
                i = n.parent, a = n.depth ? n.before() : 0
            }
            let o = r ? null : n.target,
                s = o ? e.docView.nearestDesc(o, !0) : null;
            this.target = s && s.nodeDOM.nodeType == 1 ? s.nodeDOM : null;
            let {
                selection: c
            } = e.state;
            n.button == 0 && (i.type.spec.draggable && i.type.spec.selectable !== !1 || c instanceof M && c.from <= a && c.to > a) && (this.mightDrag = {
                node: i,
                pos: a,
                addAttr: !!(this.target && !this.target.draggable),
                setUneditable: !!(this.target && V && !this.target.hasAttribute(`contentEditable`))
            }), this.target && this.mightDrag && (this.mightDrag.addAttr || this.mightDrag.setUneditable) && (this.view.domObserver.stop(), this.mightDrag.addAttr && (this.target.draggable = !0), this.mightDrag.setUneditable && setTimeout(() => {
                this.view.input.mouseDown == this && this.target.setAttribute(`contentEditable`, `false`)
            }, 20), this.view.domObserver.start()), ad(e, `pointer`)
        }
        done() {
            super.done(), this.mightDrag && this.target && (this.view.domObserver.stop(), this.mightDrag.addAttr && this.target.removeAttribute(`draggable`), this.mightDrag.setUneditable && this.target.removeAttribute(`contentEditable`), this.view.domObserver.start()), this.delayedSelectionSync && setTimeout(() => {
                this.view.isDestroyed || cu(this.view)
            })
        }
        up(e) {
            if (this.done(), !this.view.dom.contains(e.target)) return;
            let t = this.pos;
            this.view.state.doc != this.startDoc && (t = this.view.posAtCoords(dd(e))), this.updateAllowDefault(e), this.allowDefault || !t ? ad(this.view, `pointer`) : _d(this.view, t.pos, t.inside, e, this.selectNode) ? e.preventDefault() : e.button == 0 && (this.flushed || U && this.mightDrag && !this.mightDrag.node.isAtom || H && !this.view.state.selection.visible && Math.min(Math.abs(t.pos - this.view.state.selection.from), Math.abs(t.pos - this.view.state.selection.to)) <= 2) ? (md(this.view, A.near(this.view.state.doc.resolve(t.pos)), `pointer`), e.preventDefault()) : ad(this.view, `pointer`)
        }
        move(e) {
            this.updateAllowDefault(e), ad(this.view, `pointer`), super.move(e)
        }
        updateAllowDefault(e) {
            !this.allowDefault && (Math.abs(this.event.x - e.clientX) > 4 || Math.abs(this.event.y - e.clientY) > 4) && (this.allowDefault = !0)
        }
        delaySelUpdate() {
            return this.allowDefault ? (this.delayedSelectionSync = !0, !0) : !1
        }
    },
    Ed = class extends wd {
        constructor(e, t) {
            super(e), this.startSelection = t, this.startDoc = e.state.doc
        }
        move(e) {
            if (e.buttons == 0 || this.view.isDestroyed || !this.view.state.doc.eq(this.startDoc)) {
                this.done();
                return
            }
            e.preventDefault(), ad(this.view, `pointer`);
            let t = this.view.posAtCoords(dd(e)),
                n = t && xd(this.view, t.inside, !1);
            if (!n) return;
            let {
                doc: r
            } = this.view.state, i = this.startSelection, [a, o] = n.from < i.from ? [i.to, n.from] : [i.from, n.to];
            md(this.view, j.create(r, a, o), `pointer`)
        }
    };
K.touchstart = e => {
    e.input.lastTouch = Date.now(), Sd(e), ad(e, `pointer`)
}, K.touchmove = e => {
    e.input.lastTouch = Date.now(), ad(e, `pointer`)
}, K.contextmenu = e => Sd(e);

function Dd(e, t) {
    return e.composing ? !0 : U && Math.abs(Date.now() - e.input.compositionEndedAt) < 500 ? (e.input.compositionEndedAt = -2e8, !0) : !1
}
var Od = Zc ? 5e3 : -1;
q.compositionstart = q.compositionupdate = e => {
    if (!e.composing) {
        e.domObserver.flush();
        let {
            state: t
        } = e, n = t.selection.$to;
        if (t.selection instanceof j && (t.storedMarks || !n.textOffset && n.parentOffset && n.nodeBefore.marks.some(e => e.type.spec.inclusive === !1) || H && Xc && kd(e))) e.markCursor = e.state.storedMarks || n.marks(), Nd(e, !0), e.markCursor = null;
        else if (Nd(e, !t.selection.empty), V && t.selection.empty && n.parentOffset && !n.textOffset && n.nodeBefore.marks.length) {
            let t = e.domSelectionRange();
            for (let n = t.focusNode, r = t.focusOffset; n && n.nodeType == 1 && r != 0;) {
                let t = r < 0 ? n.lastChild : n.childNodes[r - 1];
                if (!t) break;
                if (t.nodeType == 3) {
                    let n = e.domSelection();
                    n && n.collapse(t, t.nodeValue.length);
                    break
                } else n = t, r = -1
            }
        }
        e.input.composing = !0
    }
    Ad(e, Od)
};

function kd(e) {
    let {
        focusNode: t,
        focusOffset: n
    } = e.domSelectionRange();
    if (!t || t.nodeType != 1 || n >= t.childNodes.length) return !1;
    let r = t.childNodes[n];
    return r.nodeType == 1 && r.contentEditable == `false`
}
q.compositionend = (e, t) => {
    e.composing && (e.input.composing = !1, e.input.compositionEndedAt = Date.now(), e.input.compositionPendingChanges = e.domObserver.pendingRecords().length ? e.input.compositionID : 0, e.input.compositionNode = null, e.input.badSafariComposition ? e.domObserver.forceFlush() : e.input.compositionPendingChanges && Promise.resolve().then(() => e.domObserver.flush()), e.input.compositionID++, Ad(e, 20))
};

function Ad(e, t) {
    clearTimeout(e.input.composingTimeout), t > -1 && (e.input.composingTimeout = setTimeout(() => Nd(e), t))
}

function jd(e) {
    for (e.composing && (e.input.composing = !1, e.input.compositionEndedAt = Date.now()); e.input.compositionNodes.length > 0;) e.input.compositionNodes.pop().markParentsDirty()
}

function Md(e) {
    let t = e.domSelectionRange();
    if (!t.focusNode) return null;
    let n = Mc(t.focusNode, t.focusOffset),
        r = Nc(t.focusNode, t.focusOffset);
    if (n && r && n != r) {
        let t = r.pmViewDesc,
            i = e.domObserver.lastChangedTextNode;
        if (n == i || r == i) return i;
        if (!t || !t.isText(r.nodeValue)) return r;
        if (e.input.compositionNode == r) {
            let e = n.pmViewDesc;
            if (!(!e || !e.isText(n.nodeValue))) return r
        }
    }
    return n || r
}

function Nd(e, t = !1) {
    if (!(Zc && e.domObserver.flushingSoon >= 0)) {
        if (e.domObserver.forceFlush(), jd(e), t || e.docView && e.docView.dirty) {
            let n = ou(e),
                r = e.state.selection;
            return n && !n.eq(r) ? e.dispatch(e.state.tr.setSelection(n)) : (e.markCursor || t) && !r.$from.node(r.$from.sharedDepth(r.to)).inlineContent ? e.dispatch(e.state.tr.deleteSelection()) : e.updateState(e.state), !0
        }
        return !1
    }
}

function Pd(e, t) {
    if (!e.dom.parentNode) return;
    let n = e.dom.parentNode.appendChild(document.createElement(`div`));
    n.appendChild(t), n.style.cssText = `position: fixed; left: -10000px; top: 10px`;
    let r = getSelection(),
        i = document.createRange();
    i.selectNodeContents(t), e.dom.blur(), r.removeAllRanges(), r.addRange(i), setTimeout(() => {
        n.parentNode && n.parentNode.removeChild(n), e.focus()
    }, 50)
}
var Fd = B && Kc < 15 || Yc && $c < 604;
K.copy = q.cut = (e, t) => {
    let n = t,
        r = e.state.selection,
        i = n.type == `cut`;
    if (r.empty) return;
    let a = Fd ? null : n.clipboardData,
        {
            dom: o,
            text: s
        } = Bu(e, r.content());
    a ? (n.preventDefault(), a.clearData(), a.setData(`text/html`, o.innerHTML), a.setData(`text/plain`, s)) : Pd(e, o), i && e.dispatch(e.state.tr.deleteSelection().scrollIntoView().setMeta(`uiEvent`, `cut`))
};

function Id(e) {
    return e.openStart == 0 && e.openEnd == 0 && e.content.childCount == 1 ? e.content.firstChild : null
}

function Ld(e, t) {
    if (!e.dom.parentNode) return;
    let n = e.input.shiftKey || e.state.selection.$from.parent.type.spec.code,
        r = e.dom.parentNode.appendChild(document.createElement(n ? `textarea` : `div`));
    n || (r.contentEditable = `true`), r.style.cssText = `position: fixed; left: -10000px; top: 10px`, r.focus();
    let i = e.input.shiftKey && e.input.lastKeyCode != 45;
    setTimeout(() => {
        e.focus(), r.parentNode && r.parentNode.removeChild(r), n ? Rd(e, r.value, null, i, t) : Rd(e, r.textContent, r.innerHTML, i, t)
    }, 50)
}

function Rd(e, t, n, r, i) {
    let a = Vu(e, t, n, r, e.state.selection.$from);
    if (e.someProp(`handlePaste`, t => t(e, i, a || m.empty))) return !0;
    if (!a) return !1;
    let o = Id(a),
        s = o ? e.state.tr.replaceSelectionWith(o, r) : e.state.tr.replaceSelection(a);
    return e.dispatch(s.scrollIntoView().setMeta(`paste`, !0).setMeta(`uiEvent`, `paste`)), !0
}

function zd(e) {
    let t = e.getData(`text/plain`) || e.getData(`Text`);
    if (t) return t;
    let n = e.getData(`text/uri-list`);
    return n ? n.replace(/\r?\n/g, ` `) : ``
}
q.paste = (e, t) => {
    let n = t;
    if (e.composing && !Zc) return;
    let r = Fd ? null : n.clipboardData,
        i = e.input.shiftKey && e.input.lastKeyCode != 45;
    r && Rd(e, zd(r), r.getData(`text/html`), i, n) ? n.preventDefault() : Ld(e, n)
};
var Bd = class {
        constructor(e, t, n) {
            this.slice = e, this.move = t, this.node = n
        }
    },
    Vd = W ? `altKey` : `ctrlKey`;

function Hd(e, t) {
    let n;
    return e.someProp(`dragCopies`, e => {
        n ||= e(t)
    }), n == null ? !t[Vd] : !n
}
K.dragstart = (e, t) => {
    let n = t,
        r = e.input.mouseDown;
    if (r && r.done(), !n.dataTransfer) return;
    let i = e.state.selection,
        a = i.empty ? null : e.posAtCoords(dd(n)),
        o;
    if (!(a && a.pos >= i.from && a.pos <= (i instanceof M ? i.to - 1 : i.to))) {
        if (r && r.mightDrag) o = M.create(e.state.doc, r.mightDrag.pos);
        else if (n.target && n.target.nodeType == 1) {
            let t = e.docView.nearestDesc(n.target, !0);
            t && t.node.type.spec.draggable && t != e.docView && (o = M.create(e.state.doc, t.posBefore))
        }
    }
    let {
        dom: s,
        text: c,
        slice: l
    } = Bu(e, (o || e.state.selection).content());
    (!n.dataTransfer.files.length || !H || Jc > 120) && n.dataTransfer.clearData(), n.dataTransfer.setData(Fd ? `Text` : `text/html`, s.innerHTML), n.dataTransfer.effectAllowed = `copyMove`, Fd || n.dataTransfer.setData(`text/plain`, c), e.dragging = new Bd(l, Hd(e, n), o)
}, K.dragend = e => {
    let t = e.dragging;
    window.setTimeout(() => {
        e.dragging == t && (e.dragging = null)
    }, 50)
}, q.dragover = q.dragenter = (e, t) => t.preventDefault(), q.drop = (e, t) => {
    try {
        Ud(e, t, e.dragging)
    } finally {
        e.dragging = null
    }
};

function Ud(e, t, n) {
    if (!t.dataTransfer) return;
    let r = e.posAtCoords(dd(t));
    if (!r) return;
    let i = e.state.doc.resolve(r.pos),
        a = n && n.slice;
    a ? e.someProp(`transformPasted`, t => {
        a = t(a, e, !1)
    }) : a = Vu(e, zd(t.dataTransfer), Fd ? null : t.dataTransfer.getData(`text/html`), !1, i);
    let o = !!(n && Hd(e, t));
    if (e.someProp(`handleDrop`, n => n(e, t, a || m.empty, o))) {
        t.preventDefault();
        return
    }
    if (!a) return;
    t.preventDefault();
    let s = a ? tn(e.state.doc, i.pos, a) : i.pos;
    s ??= i.pos;
    let c = e.state.tr;
    if (o) {
        let {
            node: e
        } = n;
        e ? e.replace(c) : c.deleteSelection()
    }
    let l = c.mapping.map(s),
        u = a.openStart == 0 && a.openEnd == 0 && a.content.childCount == 1,
        d = c.doc;
    if (u ? c.replaceRangeWith(l, l, a.content.firstChild) : c.replaceRange(l, l, a), c.doc.eq(d)) return;
    let f = c.doc.resolve(l);
    if (u && M.isSelectable(a.content.firstChild) && f.nodeAfter && f.nodeAfter.sameMarkup(a.content.firstChild)) c.setSelection(new M(f));
    else {
        let t = c.mapping.map(s);
        c.mapping.maps[c.mapping.maps.length - 1].forEach((e, n, r, i) => t = i), c.setSelection(_u(e, f, c.doc.resolve(t)))
    }
    e.focus(), e.dispatch(c.setMeta(`uiEvent`, `drop`))
}
for (let e in K.focus = e => {
        e.input.lastFocus = Date.now(), e.focused || (e.domObserver.stop(), e.dom.classList.add(`ProseMirror-focused`), e.domObserver.start(), e.focused = !0, setTimeout(() => {
            e.docView && e.hasFocus() && !e.domObserver.currentSelection.eq(e.domSelectionRange()) && cu(e)
        }, 20))
    }, K.blur = (e, t) => {
        let n = t;
        e.focused &&= (e.domObserver.stop(), e.dom.classList.remove(`ProseMirror-focused`), e.domObserver.start(), n.relatedTarget && e.dom.contains(n.relatedTarget) && e.domObserver.currentSelection.clear(), !1)
    }, K.beforeinput = (e, t) => {
        if (Zc && t.inputType == `deleteContentBackward`) {
            e.domObserver.flushSoon();
            let {
                domChangeCount: t
            } = e.input;
            setTimeout(() => {
                if (e.input.domChangeCount != t || (e.dom.blur(), e.focus(), e.someProp(`handleKeyDown`, t => t(e, Lc(8, `Backspace`))))) return;
                let {
                    $cursor: n
                } = e.state.selection;
                n && n.pos > 0 && e.dispatch(e.state.tr.delete(n.pos - 1, n.pos).scrollIntoView())
            }, 50)
        }
    }, q) K[e] = q[e];

function Wd(e, t) {
    if (e == t) return !0;
    for (let n in e)
        if (e[n] !== t[n]) return !1;
    for (let n in t)
        if (!(n in e)) return !1;
    return !0
}
var Gd = class e {
        constructor(e, t) {
            this.toDOM = e, this.spec = t || Xd, this.side = this.spec.side || 0
        }
        map(e, t, n, r) {
            let {
                pos: i,
                deleted: a
            } = e.mapResult(t.from + r, this.side < 0 ? -1 : 1);
            return a ? null : new Jd(i - n, i - n, this)
        }
        valid() {
            return !0
        }
        eq(t) {
            return this == t || t instanceof e && (this.spec.key && this.spec.key == t.spec.key || this.toDOM == t.toDOM && Wd(this.spec, t.spec))
        }
        destroy(e) {
            this.spec.destroy && this.spec.destroy(e)
        }
    },
    Kd = class e {
        constructor(e, t) {
            this.attrs = e, this.spec = t || Xd
        }
        map(e, t, n, r) {
            let i = e.map(t.from + r, this.spec.inclusiveStart ? -1 : 1) - n,
                a = e.map(t.to + r, this.spec.inclusiveEnd ? 1 : -1) - n;
            return i >= a ? null : new Jd(i, a, this)
        }
        valid(e, t) {
            return t.from < t.to
        }
        eq(t) {
            return this == t || t instanceof e && Wd(this.attrs, t.attrs) && Wd(this.spec, t.spec)
        }
        static is(t) {
            return t.type instanceof e
        }
        destroy() {}
    },
    qd = class e {
        constructor(e, t) {
            this.attrs = e, this.spec = t || Xd
        }
        map(e, t, n, r) {
            let i = e.mapResult(t.from + r, 1);
            if (i.deleted) return null;
            let a = e.mapResult(t.to + r, -1);
            return a.deleted || a.pos <= i.pos ? null : new Jd(i.pos - n, a.pos - n, this)
        }
        valid(e, t) {
            let {
                index: n,
                offset: r
            } = e.content.findIndex(t.from), i;
            return r == t.from && !(i = e.child(n)).isText && r + i.nodeSize == t.to
        }
        eq(t) {
            return this == t || t instanceof e && Wd(this.attrs, t.attrs) && Wd(this.spec, t.spec)
        }
        destroy() {}
    },
    Jd = class e {
        constructor(e, t, n) {
            this.from = e, this.to = t, this.type = n
        }
        copy(t, n) {
            return new e(t, n, this.type)
        }
        eq(e, t = 0) {
            return this.type.eq(e.type) && this.from + t == e.from && this.to + t == e.to
        }
        map(e, t, n) {
            return this.type.map(e, this, t, n)
        }
        static widget(t, n, r) {
            return new e(t, t, new Gd(n, r))
        }
        static inline(t, n, r, i) {
            return new e(t, n, new Kd(r, i))
        }
        static node(t, n, r, i) {
            return new e(t, n, new qd(r, i))
        }
        get spec() {
            return this.type.spec
        }
        get inline() {
            return this.type instanceof Kd
        }
        get widget() {
            return this.type instanceof Gd
        }
    },
    Yd = [],
    Xd = {},
    J = class e {
        constructor(e, t) {
            this.local = e.length ? e : Yd, this.children = t.length ? t : Yd
        }
        static create(e, t) {
            return t.length ? rf(t, e, 0, Xd) : Y
        }
        find(e, t, n) {
            let r = [];
            return this.findInner(e ?? 0, t ?? 1e9, r, 0, n), r
        }
        findInner(e, t, n, r, i) {
            for (let a = 0; a < this.local.length; a++) {
                let o = this.local[a];
                o.from <= t && o.to >= e && (!i || i(o.spec)) && n.push(o.copy(o.from + r, o.to + r))
            }
            for (let a = 0; a < this.children.length; a += 3)
                if (this.children[a] < t && this.children[a + 1] > e) {
                    let o = this.children[a] + 1;
                    this.children[a + 2].findInner(e - o, t - o, n, r + o, i)
                }
        }
        map(e, t, n) {
            return this == Y || e.maps.length == 0 ? this : this.mapInner(e, t, 0, 0, n || Xd)
        }
        mapInner(t, n, r, i, a) {
            let o;
            for (let e = 0; e < this.local.length; e++) {
                let s = this.local[e].map(t, r, i);
                s && s.type.valid(n, s) ? (o ||= []).push(s) : a.onRemove && a.onRemove(this.local[e].spec)
            }
            return this.children.length ? Qd(this.children, o || [], t, n, r, i, a) : o ? new e(o.sort(af), Yd) : Y
        }
        add(t, n) {
            return n.length ? this == Y ? e.create(t, n) : this.addInner(t, n, 0) : this
        }
        addInner(t, n, r) {
            let i, a = 0;
            t.forEach((e, t) => {
                let o = t + r,
                    s;
                if (s = tf(n, e, o)) {
                    for (i ||= this.children.slice(); a < i.length && i[a] < t;) a += 3;
                    i[a] == t ? i[a + 2] = i[a + 2].addInner(e, s, o + 1) : i.splice(a, 0, t, t + e.nodeSize, rf(s, e, o + 1, Xd)), a += 3
                }
            });
            let o = $d(a ? nf(n) : n, -r);
            for (let e = 0; e < o.length; e++) o[e].type.valid(t, o[e]) || o.splice(e--, 1);
            return new e(o.length ? this.local.concat(o).sort(af) : this.local, i || this.children)
        }
        remove(e) {
            return e.length == 0 || this == Y ? this : this.removeInner(e, 0)
        }
        removeInner(t, n) {
            let r = this.children,
                i = this.local;
            for (let e = 0; e < r.length; e += 3) {
                let i, a = r[e] + n,
                    o = r[e + 1] + n;
                for (let e = 0, n; e < t.length; e++)(n = t[e]) && n.from > a && n.to < o && (t[e] = null, (i ||= []).push(n));
                if (!i) continue;
                r == this.children && (r = this.children.slice());
                let s = r[e + 2].removeInner(i, a + 1);
                s == Y ? (r.splice(e, 3), e -= 3) : r[e + 2] = s
            }
            if (i.length) {
                for (let e = 0, r; e < t.length; e++)
                    if (r = t[e])
                        for (let e = 0; e < i.length; e++) i[e].eq(r, n) && (i == this.local && (i = this.local.slice()), i.splice(e--, 1))
            }
            return r == this.children && i == this.local ? this : i.length || r.length ? new e(i, r) : Y
        }
        forChild(t, n) {
            if (this == Y) return this;
            if (n.isLeaf) return e.empty;
            let r, i;
            for (let e = 0; e < this.children.length; e += 3)
                if (this.children[e] >= t) {
                    this.children[e] == t && (r = this.children[e + 2]);
                    break
                }
            let a = t + 1,
                o = a + n.content.size;
            for (let e = 0; e < this.local.length; e++) {
                let t = this.local[e];
                if (t.from < o && t.to > a && t.type instanceof Kd) {
                    let e = Math.max(a, t.from) - a,
                        n = Math.min(o, t.to) - a;
                    e < n && (i ||= []).push(t.copy(e, n))
                }
            }
            if (i) {
                let t = new e(i.sort(af), Yd);
                return r ? new Zd([t, r]) : t
            }
            return r || Y
        }
        eq(t) {
            if (this == t) return !0;
            if (!(t instanceof e) || this.local.length != t.local.length || this.children.length != t.children.length) return !1;
            for (let e = 0; e < this.local.length; e++)
                if (!this.local[e].eq(t.local[e])) return !1;
            for (let e = 0; e < this.children.length; e += 3)
                if (this.children[e] != t.children[e] || this.children[e + 1] != t.children[e + 1] || !this.children[e + 2].eq(t.children[e + 2])) return !1;
            return !0
        }
        locals(e) {
            return of(this.localsInner(e))
        }
        localsInner(e) {
            if (this == Y) return Yd;
            if (e.inlineContent || !this.local.some(Kd.is)) return this.local;
            let t = [];
            for (let e = 0; e < this.local.length; e++) this.local[e].type instanceof Kd || t.push(this.local[e]);
            return t
        }
        forEachSet(e) {
            e(this)
        }
    };
J.empty = new J([], []), J.removeOverlap = of ;
var Y = J.empty,
    Zd = class e {
        constructor(e) {
            this.members = e
        }
        map(t, n) {
            let r = this.members.map(e => e.map(t, n, Xd));
            return e.from(r)
        }
        forChild(t, n) {
            if (n.isLeaf) return J.empty;
            let r = [];
            for (let i = 0; i < this.members.length; i++) {
                let a = this.members[i].forChild(t, n);
                a != Y && (a instanceof e ? r = r.concat(a.members) : r.push(a))
            }
            return e.from(r)
        }
        eq(t) {
            if (!(t instanceof e) || t.members.length != this.members.length) return !1;
            for (let e = 0; e < this.members.length; e++)
                if (!this.members[e].eq(t.members[e])) return !1;
            return !0
        }
        locals(e) {
            let t, n = !0;
            for (let r = 0; r < this.members.length; r++) {
                let i = this.members[r].localsInner(e);
                if (i.length)
                    if (!t) t = i;
                    else {
                        n &&= (t = t.slice(), !1);
                        for (let e = 0; e < i.length; e++) t.push(i[e])
                    }
            }
            return t ? of (n ? t : t.sort(af)) : Yd
        }
        static from(t) {
            switch (t.length) {
                case 0:
                    return Y;
                case 1:
                    return t[0];
                default:
                    return new e(t.every(e => e instanceof J) ? t : t.reduce((e, t) => e.concat(t instanceof J ? t : t.members), []))
            }
        }
        forEachSet(e) {
            for (let t = 0; t < this.members.length; t++) this.members[t].forEachSet(e)
        }
    };

function Qd(e, t, n, r, i, a, o) {
    let s = e.slice();
    for (let e = 0, t = a; e < n.maps.length; e++) {
        let r = 0;
        n.maps[e].forEach((e, n, i, a) => {
            let o = a - i - (n - e);
            for (let i = 0; i < s.length; i += 3) {
                let a = s[i + 1];
                if (a < 0 || e > a + t - r) continue;
                let c = s[i] + t - r;
                n >= c ? s[i + 1] = e <= c ? -2 : -1 : e >= t && o && (s[i] += o, s[i + 1] += o)
            }
            r += o
        }), t = n.maps[e].map(t, -1)
    }
    let c = !1;
    for (let t = 0; t < s.length; t += 3)
        if (s[t + 1] < 0) {
            if (s[t + 1] == -2) {
                c = !0, s[t + 1] = -1;
                continue
            }
            let l = n.map(e[t] + a),
                u = l - i;
            if (u < 0 || u >= r.content.size) {
                c = !0;
                continue
            }
            let d = n.map(e[t + 1] + a, -1) - i,
                {
                    index: f,
                    offset: p
                } = r.content.findIndex(u),
                m = r.maybeChild(f);
            if (m && p == u && p + m.nodeSize == d) {
                let r = s[t + 2].mapInner(n, m, l + 1, e[t] + a + 1, o);
                r == Y ? (s[t + 1] = -2, c = !0) : (s[t] = u, s[t + 1] = d, s[t + 2] = r)
            } else c = !0
        }
    if (c) {
        let c = rf(ef(s, e, t, n, i, a, o), r, 0, o);
        t = c.local;
        for (let e = 0; e < s.length; e += 3) s[e + 1] < 0 && (s.splice(e, 3), e -= 3);
        for (let e = 0, t = 0; e < c.children.length; e += 3) {
            let n = c.children[e];
            for (; t < s.length && s[t] < n;) t += 3;
            s.splice(t, 0, c.children[e], c.children[e + 1], c.children[e + 2])
        }
    }
    return new J(t.sort(af), s)
}

function $d(e, t) {
    if (!t || !e.length) return e;
    let n = [];
    for (let r = 0; r < e.length; r++) {
        let i = e[r];
        n.push(new Jd(i.from + t, i.to + t, i.type))
    }
    return n
}

function ef(e, t, n, r, i, a, o) {
    function s(e, t) {
        for (let a = 0; a < e.local.length; a++) {
            let s = e.local[a].map(r, i, t);
            s ? n.push(s) : o.onRemove && o.onRemove(e.local[a].spec)
        }
        for (let n = 0; n < e.children.length; n += 3) s(e.children[n + 2], e.children[n] + t + 1)
    }
    for (let n = 0; n < e.length; n += 3) e[n + 1] == -1 && s(e[n + 2], t[n] + a + 1);
    return n
}

function tf(e, t, n) {
    if (t.isLeaf) return null;
    let r = n + t.nodeSize,
        i = null;
    for (let t = 0, a; t < e.length; t++)(a = e[t]) && a.from > n && a.to < r && ((i ||= []).push(a), e[t] = null);
    return i
}

function nf(e) {
    let t = [];
    for (let n = 0; n < e.length; n++) e[n] != null && t.push(e[n]);
    return t
}

function rf(e, t, n, r) {
    let i = [],
        a = !1;
    t.forEach((t, o) => {
        let s = tf(e, t, o + n);
        if (s) {
            a = !0;
            let e = rf(s, t, n + o + 1, r);
            e != Y && i.push(o, o + t.nodeSize, e)
        }
    });
    let o = $d(a ? nf(e) : e, -n).sort(af);
    for (let e = 0; e < o.length; e++) o[e].type.valid(t, o[e]) || (r.onRemove && r.onRemove(o[e].spec), o.splice(e--, 1));
    return o.length || i.length ? new J(o, i) : Y
}

function af(e, t) {
    return e.from - t.from || e.to - t.to
}

function of (e) {
    let t = e;
    for (let n = 0; n < t.length - 1; n++) {
        let r = t[n];
        if (r.from != r.to)
            for (let i = n + 1; i < t.length; i++) {
                let a = t[i];
                if (a.from == r.from) {
                    a.to != r.to && (t == e && (t = e.slice()), t[i] = a.copy(a.from, r.to), sf(t, i + 1, a.copy(r.to, a.to)));
                    continue
                } else {
                    a.from < r.to && (t == e && (t = e.slice()), t[n] = r.copy(r.from, a.from), sf(t, i, r.copy(a.from, r.to)));
                    break
                }
            }
    }
    return t
}

function sf(e, t, n) {
    for (; t < e.length && af(n, e[t]) > 0;) t++;
    e.splice(t, 0, n)
}

function cf(e) {
    let t = [];
    return e.someProp(`decorations`, n => {
        let r = n(e.state);
        r && r != Y && t.push(r)
    }), e.cursorWrapper && t.push(J.create(e.state.doc, [e.cursorWrapper.deco])), Zd.from(t)
}
var lf = {
        childList: !0,
        characterData: !0,
        characterDataOldValue: !0,
        attributes: !0,
        attributeOldValue: !0,
        subtree: !0
    },
    uf = B && Kc <= 11,
    df = class {
        constructor() {
            this.anchorNode = null, this.anchorOffset = 0, this.focusNode = null, this.focusOffset = 0
        }
        set(e) {
            this.anchorNode = e.anchorNode, this.anchorOffset = e.anchorOffset, this.focusNode = e.focusNode, this.focusOffset = e.focusOffset
        }
        clear() {
            this.anchorNode = this.focusNode = null
        }
        eq(e) {
            return e.anchorNode == this.anchorNode && e.anchorOffset == this.anchorOffset && e.focusNode == this.focusNode && e.focusOffset == this.focusOffset
        }
    },
    ff = class {
        constructor(e, t) {
            this.view = e, this.handleDOMChange = t, this.queue = [], this.flushingSoon = -1, this.observer = null, this.currentSelection = new df, this.onCharData = null, this.suppressingSelectionUpdates = !1, this.lastChangedTextNode = null, this.observer = window.MutationObserver && new window.MutationObserver(t => {
                for (let e = 0; e < t.length; e++) this.queue.push(t[e]);
                B && Kc <= 11 && t.some(e => e.type == `childList` && e.removedNodes.length || e.type == `characterData` && e.oldValue.length > e.target.nodeValue.length) ? this.flushSoon() : U && e.composing && t.some(e => e.type == `childList` && e.target.nodeName == `TR`) ? (e.input.badSafariComposition = !0, this.flushSoon()) : this.flush()
            }), uf && (this.onCharData = e => {
                this.queue.push({
                    target: e.target,
                    type: `characterData`,
                    oldValue: e.prevValue
                }), this.flushSoon()
            }), this.onSelectionChange = this.onSelectionChange.bind(this)
        }
        flushSoon() {
            this.flushingSoon < 0 && (this.flushingSoon = window.setTimeout(() => {
                this.flushingSoon = -1, this.flush()
            }, 20))
        }
        forceFlush() {
            this.flushingSoon > -1 && (window.clearTimeout(this.flushingSoon), this.flushingSoon = -1, this.flush())
        }
        start() {
            this.observer && (this.observer.takeRecords(), this.observer.observe(this.view.dom, lf)), this.onCharData && this.view.dom.addEventListener(`DOMCharacterDataModified`, this.onCharData), this.connectSelection()
        }
        stop() {
            if (this.observer) {
                let e = this.observer.takeRecords();
                if (e.length) {
                    for (let t = 0; t < e.length; t++) this.queue.push(e[t]);
                    window.setTimeout(() => this.flush(), 20)
                }
                this.observer.disconnect()
            }
            this.onCharData && this.view.dom.removeEventListener(`DOMCharacterDataModified`, this.onCharData), this.disconnectSelection()
        }
        connectSelection() {
            this.view.dom.ownerDocument.addEventListener(`selectionchange`, this.onSelectionChange)
        }
        disconnectSelection() {
            this.view.dom.ownerDocument.removeEventListener(`selectionchange`, this.onSelectionChange)
        }
        suppressSelectionUpdates() {
            this.suppressingSelectionUpdates = !0, setTimeout(() => this.suppressingSelectionUpdates = !1, 50)
        }
        onSelectionChange() {
            if (vu(this.view)) {
                if (this.suppressingSelectionUpdates) return cu(this.view);
                if (B && Kc <= 11 && !this.view.state.selection.empty) {
                    let e = this.view.domSelectionRange();
                    if (e.focusNode && kc(e.focusNode, e.focusOffset, e.anchorNode, e.anchorOffset)) return this.flushSoon()
                }
                this.flush()
            }
        }
        setCurSelection() {
            this.currentSelection.set(this.view.domSelectionRange())
        }
        ignoreSelectionChange(e) {
            if (!e.focusNode) return !0;
            let t = new Set,
                n;
            for (let n = e.focusNode; n; n = Tc(n)) t.add(n);
            for (let r = e.anchorNode; r; r = Tc(r))
                if (t.has(r)) {
                    n = r;
                    break
                }
            let r = n && this.view.docView.nearestDesc(n);
            if (r && r.ignoreMutation({
                    type: `selection`,
                    target: n.nodeType == 3 ? n.parentNode : n
                })) return this.setCurSelection(), !0
        }
        pendingRecords() {
            if (this.observer)
                for (let e of this.observer.takeRecords()) this.queue.push(e);
            return this.queue
        }
        flush() {
            let {
                view: e
            } = this;
            if (!e.docView || this.flushingSoon > -1) return;
            let t = this.pendingRecords();
            t.length && (this.queue = []);
            let n = e.domSelectionRange(),
                r = !this.suppressingSelectionUpdates && !this.currentSelection.eq(n) && vu(e) && !this.ignoreSelectionChange(n),
                i = -1,
                a = -1,
                o = !1,
                s = [];
            if (e.editable)
                for (let e = 0; e < t.length; e++) {
                    let n = this.registerMutation(t[e], s);
                    n && (i = i < 0 ? n.from : Math.min(n.from, i), a = a < 0 ? n.to : Math.max(n.to, a), n.typeOver && (o = !0))
                }
            if (s.some(e => e.nodeName == `BR`) && (e.input.lastKeyCode == 8 || e.input.lastKeyCode == 46 || H && (e.composing || e.input.compositionEndedAt > Date.now() - 50) && t.some(e => e.type == `childList` && e.removedNodes.length))) {
                for (let e of s)
                    if (e.nodeName == `BR` && e.parentNode) {
                        let t = e.nextSibling;
                        for (; t && t.nodeType == 1;) {
                            if (t.contentEditable == `false`) {
                                e.parentNode.removeChild(e);
                                break
                            }
                            t = t.firstChild
                        }
                    }
            } else if (V && s.length) {
                let t = s.filter(e => e.nodeName == `BR`);
                if (t.length == 2) {
                    let [e, n] = t;
                    e.parentNode && e.parentNode.parentNode == n.parentNode ? n.remove() : e.remove()
                } else {
                    let {
                        focusNode: n
                    } = this.currentSelection;
                    for (let r of t) {
                        let t = r.parentNode;
                        t && t.nodeName == `LI` && (!n || vf(e, n) != t) && r.remove()
                    }
                }
            }
            let c = null;
            i < 0 && r && e.input.lastFocus > Date.now() - 200 && Math.max(e.input.lastTouch, e.input.lastClick.time) < Date.now() - 300 && Ic(n) && (c = ou(e)) && c.eq(A.near(e.state.doc.resolve(0), 1)) ? (e.input.lastFocus = 0, cu(e), this.currentSelection.set(n), e.scrollToSelection()) : (i > -1 || r) && (i > -1 && (e.docView.markDirty(i, a), hf(e)), e.input.badSafariComposition && (e.input.badSafariComposition = !1, yf(e, s)), this.handleDOMChange(i, a, o, s), e.docView && e.docView.dirty ? e.updateState(e.state) : this.currentSelection.eq(n) || cu(e), this.currentSelection.set(n))
        }
        registerMutation(e, t) {
            if (t.indexOf(e.target) > -1) return null;
            let n = this.view.docView.nearestDesc(e.target);
            if (e.type == `attributes` && (n == this.view.docView || e.attributeName == `contenteditable` || e.attributeName == `style` && !e.oldValue && !e.target.getAttribute(`style`)) || !n || n.ignoreMutation(e)) return null;
            if (e.type == `childList`) {
                for (let n = 0; n < e.addedNodes.length; n++) {
                    let r = e.addedNodes[n];
                    t.push(r), r.nodeType == 3 && (this.lastChangedTextNode = r)
                }
                if (n.contentDOM && n.contentDOM != n.dom && !n.contentDOM.contains(e.target)) return {
                    from: n.posBefore,
                    to: n.posAfter
                };
                let r = e.previousSibling,
                    i = e.nextSibling;
                if (B && Kc <= 11 && e.addedNodes.length)
                    for (let t = 0; t < e.addedNodes.length; t++) {
                        let {
                            previousSibling: n,
                            nextSibling: a
                        } = e.addedNodes[t];
                        (!n || Array.prototype.indexOf.call(e.addedNodes, n) < 0) && (r = n), (!a || Array.prototype.indexOf.call(e.addedNodes, a) < 0) && (i = a)
                    }
                let a = r && r.parentNode == e.target ? R(r) + 1 : 0,
                    o = n.localPosFromDOM(e.target, a, -1),
                    s = i && i.parentNode == e.target ? R(i) : e.target.childNodes.length;
                return {
                    from: o,
                    to: n.localPosFromDOM(e.target, s, 1)
                }
            } else if (e.type == `attributes`) return {
                from: n.posAtStart - n.border,
                to: n.posAtEnd + n.border
            };
            else return this.lastChangedTextNode = e.target, {
                from: n.posAtStart,
                to: n.posAtEnd,
                typeOver: e.target.nodeValue == e.oldValue
            }
        }
    },
    pf = new WeakMap,
    mf = !1;

function hf(e) {
    if (!pf.has(e) && (pf.set(e, null), [`normal`, `nowrap`, `pre-line`].indexOf(getComputedStyle(e.dom).whiteSpace) !== -1)) {
        if (e.requiresGeckoHackNode = V, mf) return;
        console.warn(`ProseMirror expects the CSS white-space property to be set, preferably to 'pre-wrap'. It is recommended to load style/prosemirror.css from the prosemirror-view package.`), mf = !0
    }
}

function gf(e, t) {
    let n = t.startContainer,
        r = t.startOffset,
        i = t.endContainer,
        a = t.endOffset,
        o = e.domAtPos(e.state.selection.anchor);
    return kc(o.node, o.offset, i, a) && ([n, r, i, a] = [i, a, n, r]), {
        anchorNode: n,
        anchorOffset: r,
        focusNode: i,
        focusOffset: a
    }
}

function _f(e, t) {
    if (t.getComposedRanges) {
        let n = t.getComposedRanges(e.root)[0];
        if (n) return gf(e, n)
    }
    let n;

    function r(e) {
        e.preventDefault(), e.stopImmediatePropagation(), n = e.getTargetRanges()[0]
    }
    return e.dom.addEventListener(`beforeinput`, r, !0), document.execCommand(`indent`), e.dom.removeEventListener(`beforeinput`, r, !0), n ? gf(e, n) : null
}

function vf(e, t) {
    for (let n = t.parentNode; n && n != e.dom; n = n.parentNode) {
        let t = e.docView.nearestDesc(n, !0);
        if (t && t.node.isBlock) return n
    }
    return null
}

function yf(e, t) {
    let {
        focusNode: n,
        focusOffset: r
    } = e.domSelectionRange();
    for (let i of t)
        if (i.parentNode ?.nodeName == `TR`) {
            let t = i.nextSibling;
            for (; t && t.nodeName != `TD` && t.nodeName != `TH`;) t = t.nextSibling;
            if (t) {
                let a = t;
                for (;;) {
                    let e = a.firstChild;
                    if (!e || e.nodeType != 1 || e.contentEditable == `false` || /^(BR|IMG)$/.test(e.nodeName)) break;
                    a = e
                }
                a.insertBefore(i, a.firstChild), n == i && e.domSelection().collapse(i, r)
            } else i.parentNode.removeChild(i)
        }
}

function bf(e, t, n, r) {
    let {
        node: i,
        fromOffset: a,
        toOffset: o,
        from: s,
        to: c
    } = e.docView.parseRange(t, n), l = e.domSelectionRange(), u, d = l.anchorNode;
    if (d && e.dom.contains(d.nodeType == 1 ? d : d.parentNode) && (u = [{
            node: d,
            offset: l.anchorOffset
        }], Ic(l) || u.push({
            node: l.focusNode,
            offset: l.focusOffset
        })), H && e.input.lastKeyCode === 8)
        for (let e = o; e > a; e--) {
            let t = i.childNodes[e - 1],
                n = t.pmViewDesc;
            if (t.nodeName == `BR` && !n) {
                o = e;
                break
            }
            if (!n || n.size) break
        }
    let f = e.state.doc,
        p = e.someProp(`domParser`) || Ue.fromSchema(e.state.schema),
        m = f.resolve(s),
        h = null,
        g = p.parse(i, {
            topNode: m.parent,
            topMatch: m.parent.contentMatchAt(m.index()),
            topOpen: !0,
            from: a,
            to: o,
            preserveWhitespace: m.parent.type.whitespace == `pre` ? `full` : !0,
            findPositions: u,
            ruleFromNode: xf(r),
            context: m
        });
    if (u && u[0].pos != null) {
        let e = u[0].pos,
            t = u[1] && u[1].pos;
        t ??= e, h = {
            anchor: e + s,
            head: t + s
        }
    }
    return {
        doc: g,
        sel: h,
        from: s,
        to: c
    }
}
var xf = e => t => {
        let n = t.pmViewDesc;
        if (n) return n.parseRule(e);
        if (t.nodeName == `BR` && t.parentNode) {
            if (U && /^(ul|ol)$/i.test(t.parentNode.nodeName)) {
                let e = document.createElement(`div`);
                return e.appendChild(document.createElement(`li`)), {
                    skip: e
                }
            } else if (t.parentNode.lastChild == t || U && /^(tr|table)$/i.test(t.parentNode.nodeName)) return {
                ignore: !0
            }
        } else if (t.nodeName == `IMG` && t.getAttribute(`mark-placeholder`)) return {
            ignore: !0
        };
        return null
    },
    Sf = /^(a|abbr|acronym|b|bd[io]|big|br|button|cite|code|data(list)?|del|dfn|em|i|img|ins|kbd|label|map|mark|meter|output|q|ruby|s|samp|small|span|strong|su[bp]|time|u|tt|var)$/i;

function Cf(e, t, n, r, i) {
    let a = e.input.compositionPendingChanges || (e.composing ? e.input.compositionID : 0);
    if (e.input.compositionPendingChanges = 0, t < 0) {
        let t = e.input.lastSelectionTime > Date.now() - 50 ? e.input.lastSelectionOrigin : null,
            n = ou(e, t);
        if (n && !e.state.selection.eq(n)) {
            if (H && Zc && e.input.lastKeyCode === 13 && Date.now() - 100 < e.input.lastKeyCodeTime && e.someProp(`handleKeyDown`, t => t(e, Lc(13, `Enter`)))) return;
            let r = e.state.tr.setSelection(n);
            t == `pointer` ? r.setMeta(`pointer`, !0) : t == `key` && r.scrollIntoView(), a && r.setMeta(`composition`, a), e.dispatch(r)
        }
        return
    }
    let o = e.state.doc.resolve(t),
        s = o.sharedDepth(n);
    t = o.before(s + 1), n = e.state.doc.resolve(n).after(s + 1);
    let c = e.state.selection,
        l = bf(e, t, n, i),
        u = e.state.doc,
        d = u.slice(l.from, l.to),
        f, p;
    e.input.lastKeyCode === 8 && Date.now() - 100 < e.input.lastKeyCodeTime ? (f = e.state.selection.to, p = `end`) : (f = e.state.selection.from, p = `start`), e.input.lastKeyCode = null;
    let m = Of(d.content, l.doc.content, l.from, f, p);
    if (m && e.input.domChangeCount++, (Yc && e.input.lastIOSEnter > Date.now() - 225 || Zc) && i.some(e => e.nodeType == 1 && !Sf.test(e.nodeName)) && (!m || m.endA >= m.endB) && e.someProp(`handleKeyDown`, t => t(e, Lc(13, `Enter`)))) {
        e.input.lastIOSEnter = 0;
        return
    }
    if (!m)
        if (r && c instanceof j && !c.empty && c.$head.sameParent(c.$anchor) && !e.composing && !(l.sel && l.sel.anchor != l.sel.head)) m = {
            start: c.from,
            endA: c.to,
            endB: c.to
        };
        else {
            if (l.sel) {
                let t = wf(e, e.state.doc, l.sel);
                if (t && !t.eq(e.state.selection)) {
                    let n = e.state.tr.setSelection(t);
                    a && n.setMeta(`composition`, a), e.dispatch(n)
                }
            }
            return
        }
    e.state.selection.from < e.state.selection.to && m.start == m.endB && e.state.selection instanceof j && (m.start > e.state.selection.from && m.start <= e.state.selection.from + 2 && e.state.selection.from >= l.from ? m.start = e.state.selection.from : m.endA < e.state.selection.to && m.endA >= e.state.selection.to - 2 && e.state.selection.to <= l.to && (m.endB += e.state.selection.to - m.endA, m.endA = e.state.selection.to)), B && Kc <= 11 && m.endB == m.start + 1 && m.endA == m.start && m.start > l.from && l.doc.textBetween(m.start - l.from - 1, m.start - l.from + 1) == ` \xA0` && (m.start--, m.endA--, m.endB--);
    let h = l.doc.resolveNoCache(m.start - l.from),
        g = l.doc.resolveNoCache(m.endB - l.from),
        ee = u.resolve(m.start),
        te = h.sameParent(g) && h.parent.inlineContent && ee.end() >= m.endA;
    if ((Yc && e.input.lastIOSEnter > Date.now() - 225 && (!te || i.some(e => e.nodeName == `DIV` || e.nodeName == `P`)) || !te && h.pos < l.doc.content.size && (!h.sameParent(g) || !h.parent.inlineContent) && h.pos < g.pos && !/\S/.test(l.doc.textBetween(h.pos, g.pos, ``, ``))) && e.someProp(`handleKeyDown`, t => t(e, Lc(13, `Enter`)))) {
        e.input.lastIOSEnter = 0;
        return
    }
    if (e.state.selection.anchor > m.start && Ef(u, m.start, m.endA, h, g) && e.someProp(`handleKeyDown`, t => t(e, Lc(8, `Backspace`)))) {
        Zc && H && e.domObserver.suppressSelectionUpdates();
        return
    }
    H && m.endB == m.start && (e.input.lastChromeDelete = Date.now()), Zc && !te && h.start() != g.start() && g.parentOffset == 0 && h.depth == g.depth && l.sel && l.sel.anchor == l.sel.head && l.sel.head == m.endA && (m.endB -= 2, g = l.doc.resolveNoCache(m.endB - l.from), setTimeout(() => {
        e.someProp(`handleKeyDown`, function(t) {
            return t(e, Lc(13, `Enter`))
        })
    }, 20));
    let _ = m.start,
        ne = m.endA,
        v = t => {
            let n = t || e.state.tr.replace(_, ne, l.doc.slice(m.start - l.from, m.endB - l.from));
            if (l.sel) {
                let t = wf(e, n.doc, l.sel);
                t && !(H && e.composing && t.empty && (m.start != m.endB || e.input.lastChromeDelete < Date.now() - 100) && (t.head == _ || t.head == n.mapping.map(ne) - 1) || B && t.empty && t.head == _) && n.setSelection(t)
            }
            return a && n.setMeta(`composition`, a), n.scrollIntoView()
        },
        re;
    if (te)
        if (h.pos == g.pos) {
            B && Kc <= 11 && h.parentOffset == 0 && (e.domObserver.suppressSelectionUpdates(), setTimeout(() => cu(e), 20));
            let t = v(e.state.tr.delete(_, ne)),
                n = u.resolve(m.start).marksAcross(u.resolve(m.endA));
            n && t.ensureMarks(n), e.dispatch(t)
        } else if (m.endA == m.endB && (re = Tf(h.parent.content.cut(h.parentOffset, g.parentOffset), ee.parent.content.cut(ee.parentOffset, m.endA - ee.start())))) {
        let t = v(e.state.tr);
        re.type == `add` ? t.addMark(_, ne, re.mark) : t.removeMark(_, ne, re.mark), e.dispatch(t)
    } else if (h.parent.child(h.index()).isText && h.index() == g.index() - (g.textOffset ? 0 : 1)) {
        let t = h.parent.textBetween(h.parentOffset, g.parentOffset),
            n = () => v(e.state.tr.insertText(t, _, ne));
        e.someProp(`handleTextInput`, r => r(e, _, ne, t, n)) || e.dispatch(n())
    } else e.dispatch(v());
    else e.dispatch(v())
}

function wf(e, t, n) {
    return Math.max(n.anchor, n.head) > t.content.size ? null : _u(e, t.resolve(n.anchor), t.resolve(n.head))
}

function Tf(e, t) {
    let n = e.firstChild.marks,
        r = t.firstChild.marks,
        i = n,
        a = r,
        o, s, l;
    for (let e = 0; e < r.length; e++) i = r[e].removeFromSet(i);
    for (let e = 0; e < n.length; e++) a = n[e].removeFromSet(a);
    if (i.length == 1 && a.length == 0) s = i[0], o = `add`, l = e => e.mark(s.addToSet(e.marks));
    else if (i.length == 0 && a.length == 1) s = a[0], o = `remove`, l = e => e.mark(s.removeFromSet(e.marks));
    else return null;
    let u = [];
    for (let e = 0; e < t.childCount; e++) u.push(l(t.child(e)));
    if (c.from(u).eq(e)) return {
        mark: s,
        type: o
    }
}

function Ef(e, t, n, r, i) {
    if (n - t <= i.pos - r.pos || Df(r, !0, !1) < i.pos) return !1;
    let a = e.resolve(t);
    if (!r.parent.isTextblock) {
        let e = a.nodeAfter;
        return e != null && n == t + e.nodeSize
    }
    if (a.parentOffset < a.parent.content.size || !a.parent.isTextblock) return !1;
    let o = e.resolve(Df(a, !0, !0));
    return !o.parent.isTextblock || o.pos > n || Df(o, !0, !1) < n ? !1 : r.parent.content.cut(r.parentOffset).eq(o.parent.content)
}

function Df(e, t, n) {
    let r = e.depth,
        i = t ? e.end() : e.pos;
    for (; r > 0 && (t || e.indexAfter(r) == e.node(r).childCount);) r--, i++, t = !1;
    if (n) {
        let t = e.node(r).maybeChild(e.indexAfter(r));
        for (; t && !t.isLeaf;) t = t.firstChild, i++
    }
    return i
}

function Of(e, t, n, r, i) {
    let a = e.findDiffStart(t, n),
        o = n + e.size,
        s = n + t.size;
    if (a == null) return null;
    let {
        a: c,
        b: l
    } = e.findDiffEnd(t, o, s);
    if (i == `end`) {
        let e = Math.max(0, a - Math.min(c, l));
        r -= c + e - a
    }
    if (c < a && o < s) {
        let e = r <= a && r >= c ? a - r : 0;
        a -= e, l = a + (l - c), c = a
    } else if (l < a) {
        let e = r <= a && r >= l ? a - r : 0;
        a -= e, c = a + (c - l), l = a
    }
    return {
        start: a,
        endA: c,
        endB: l
    }
}
var kf = class {
    constructor(e, t) {
        this._root = null, this.focused = !1, this.trackWrites = null, this.mounted = !1, this.markCursor = null, this.cursorWrapper = null, this.lastSelectedViewDesc = void 0, this.input = new rd, this.prevDirectPlugins = [], this.pluginViews = [], this.requiresGeckoHackNode = !1, this.dragging = null, this._props = t, this.state = t.state, this.directPlugins = t.plugins || [], this.directPlugins.forEach(If), this.dispatch = this.dispatch.bind(this), this.dom = e && e.mount || document.createElement(`div`), e && (e.appendChild ? e.appendChild(this.dom) : typeof e == `function` ? e(this.dom) : e.mount && (this.mounted = !0)), this.editable = Mf(this), jf(this), this.nodeViews = Pf(this), this.docView = Bl(this.state.doc, Af(this), cf(this), this.dom, this), this.domObserver = new ff(this, (e, t, n, r) => Cf(this, e, t, n, r)), this.domObserver.start(), id(this), this.updatePluginViews()
    }
    get composing() {
        return this.input.composing
    }
    get props() {
        if (this._props.state != this.state) {
            let e = this._props;
            for (let t in this._props = {}, e) this._props[t] = e[t];
            this._props.state = this.state
        }
        return this._props
    }
    update(e) {
        e.handleDOMEvents != this._props.handleDOMEvents && sd(this);
        let t = this._props;
        this._props = e, e.plugins && (e.plugins.forEach(If), this.directPlugins = e.plugins), this.updateStateInner(e.state, t)
    }
    setProps(e) {
        let t = {};
        for (let e in this._props) t[e] = this._props[e];
        for (let n in t.state = this.state, e) t[n] = e[n];
        this.update(t)
    }
    updateState(e) {
        this.updateStateInner(e, this._props)
    }
    updateStateInner(e, t) {
        let n = this.state,
            r = !1,
            i = !1;
        e.storedMarks && this.composing && (jd(this), i = !0), this.state = e;
        let a = n.plugins != e.plugins || this._props.plugins != t.plugins;
        if (a || this._props.plugins != t.plugins || this._props.nodeViews != t.nodeViews) {
            let e = Pf(this);
            Ff(e, this.nodeViews) && (this.nodeViews = e, r = !0)
        }(a || t.handleDOMEvents != this._props.handleDOMEvents) && sd(this), this.editable = Mf(this), jf(this);
        let o = cf(this),
            s = Af(this),
            c = n.plugins != e.plugins && !n.doc.eq(e.doc) ? `reset` : e.scrollToSelection > n.scrollToSelection ? `to selection` : `preserve`,
            l = r || !this.docView.matchesNode(e.doc, s, o);
        (l || !e.selection.eq(n.selection)) && (i = !0);
        let u = c == `preserve` && i && this.dom.style.overflowAnchor == null && il(this);
        if (i) {
            this.domObserver.stop();
            let t = l && (B || H) && !this.composing && !n.selection.empty && !e.selection.empty && Nf(n.selection, e.selection);
            if (l) {
                let n = H ? this.trackWrites = this.domSelectionRange().focusNode : null;
                this.composing && (this.input.compositionNode = Md(this)), (r || !this.docView.update(e.doc, s, o, this)) && (this.docView.updateOuterDeco(s), this.docView.destroy(), this.docView = Bl(e.doc, s, o, this.dom, this)), n && (!this.trackWrites || !this.dom.contains(this.trackWrites)) && (t = !0)
            }
            let i = this.input.mouseDown;
            t || !(i && this.domObserver.currentSelection.eq(this.domSelectionRange()) && bu(this) && i.delaySelUpdate()) ? cu(this, t) : (hu(this, e.selection), this.domObserver.setCurSelection()), this.domObserver.start()
        }
        this.updatePluginViews(n), this.dragging ?.node && !n.doc.eq(e.doc) && this.updateDraggedNode(this.dragging, n), c == `reset` ? this.dom.scrollTop = 0 : c == `to selection` ? this.scrollToSelection() : u && ol(u)
    }
    scrollToSelection() {
        let e = this.domSelectionRange().focusNode;
        if (!(!e || !this.dom.contains(e.nodeType == 1 ? e : e.parentNode)) && !this.someProp(`handleScrollToSelection`, e => e(this)))
            if (this.state.selection instanceof M) {
                let t = this.docView.domAfterPos(this.state.selection.from);
                t.nodeType == 1 && rl(this, t.getBoundingClientRect(), e)
            } else rl(this, this.coordsAtPos(this.state.selection.head, 1), e)
    }
    destroyPluginViews() {
        let e;
        for (; e = this.pluginViews.pop();) e.destroy && e.destroy()
    }
    updatePluginViews(e) {
        if (!e || e.plugins != this.state.plugins || this.directPlugins != this.prevDirectPlugins) {
            this.prevDirectPlugins = this.directPlugins, this.destroyPluginViews();
            for (let e = 0; e < this.directPlugins.length; e++) {
                let t = this.directPlugins[e];
                t.spec.view && this.pluginViews.push(t.spec.view(this))
            }
            for (let e = 0; e < this.state.plugins.length; e++) {
                let t = this.state.plugins[e];
                t.spec.view && this.pluginViews.push(t.spec.view(this))
            }
        } else
            for (let t = 0; t < this.pluginViews.length; t++) {
                let n = this.pluginViews[t];
                n.update && n.update(this, e)
            }
    }
    updateDraggedNode(e, t) {
        let n = e.node,
            r = -1;
        if (n.from < this.state.doc.content.size && this.state.doc.nodeAt(n.from) == n.node) r = n.from;
        else {
            let e = n.from + (this.state.doc.content.size - t.doc.content.size);
            (e > 0 && e < this.state.doc.content.size && this.state.doc.nodeAt(e)) == n.node && (r = e)
        }
        this.dragging = new Bd(e.slice, e.move, r < 0 ? void 0 : M.create(this.state.doc, r))
    }
    someProp(e, t) {
        let n = this._props && this._props[e],
            r;
        if (n != null && (r = t ? t(n) : n)) return r;
        for (let n = 0; n < this.directPlugins.length; n++) {
            let i = this.directPlugins[n].props[e];
            if (i != null && (r = t ? t(i) : i)) return r
        }
        let i = this.state.plugins;
        if (i)
            for (let n = 0; n < i.length; n++) {
                let a = i[n].props[e];
                if (a != null && (r = t ? t(a) : a)) return r
            }
    }
    hasFocus() {
        if (B) {
            let e = this.root.activeElement;
            if (e == this.dom) return !0;
            if (!e || !this.dom.contains(e)) return !1;
            for (; e && this.dom != e && this.dom.contains(e);) {
                if (e.contentEditable == `false`) return !1;
                e = e.parentElement
            }
            return !0
        }
        return this.root.activeElement == this.dom
    }
    focus() {
        this.domObserver.stop(), this.editable && ll(this.dom), cu(this), this.domObserver.start()
    }
    get root() {
        let e = this._root;
        if (e == null) {
            for (let e = this.dom.parentNode; e; e = e.parentNode)
                if (e.nodeType == 9 || e.nodeType == 11 && e.host) return e.getSelection || (Object.getPrototypeOf(e).getSelection = () => e.ownerDocument.getSelection()), this._root = e
        }
        return e || document
    }
    updateRoot() {
        this._root = null
    }
    posAtCoords(e) {
        return _l(this, e)
    }
    coordsAtPos(e, t = 1) {
        return xl(this, e, t)
    }
    domAtPos(e, t = 0) {
        return this.docView.domFromPos(e, t)
    }
    nodeDOM(e) {
        let t = this.docView.descAt(e);
        return t ? t.nodeDOM : null
    }
    posAtDOM(e, t, n = -1) {
        let r = this.docView.posFromDOM(e, t, n);
        if (r == null) throw RangeError(`DOM position not inside the editor`);
        return r
    }
    endOfTextblock(e, t) {
        return jl(this, t || this.state, e)
    }
    pasteHTML(e, t) {
        return Rd(this, ``, e, !1, t || new ClipboardEvent(`paste`))
    }
    pasteText(e, t) {
        return Rd(this, e, null, !0, t || new ClipboardEvent(`paste`))
    }
    serializeForClipboard(e) {
        return Bu(this, e)
    }
    destroy() {
        this.docView && (od(this), this.destroyPluginViews(), this.mounted ? (this.docView.update(this.state.doc, [], cf(this), this), this.dom.textContent = ``) : this.dom.parentNode && this.dom.parentNode.removeChild(this.dom), this.docView.destroy(), this.docView = null, Oc())
    }
    get isDestroyed() {
        return this.docView == null
    }
    dispatchEvent(e) {
        return ud(this, e)
    }
    domSelectionRange() {
        let e = this.domSelection();
        return e ? U && this.root.nodeType === 11 && Rc(this.dom.ownerDocument) == this.dom && _f(this, e) || e : {
            focusNode: null,
            focusOffset: 0,
            anchorNode: null,
            anchorOffset: 0
        }
    }
    domSelection() {
        return this.root.getSelection()
    }
};
kf.prototype.dispatch = function(e) {
    let t = this._props.dispatchTransaction;
    t ? t.call(this, e) : this.updateState(this.state.apply(e))
};

function Af(e) {
    let t = Object.create(null);
    return t.class = `ProseMirror`, t.contenteditable = String(e.editable), e.someProp(`attributes`, n => {
        if (typeof n == `function` && (n = n(e.state)), n)
            for (let e in n) e == `class` ? t.class += ` ` + n[e] : e == `style` ? t.style = (t.style ? t.style + `;` : ``) + n[e] : !t[e] && e != `contenteditable` && e != `nodeName` && (t[e] = String(n[e]))
    }), t.translate ||= `no`, [Jd.node(0, e.state.doc.content.size, t)]
}

function jf(e) {
    if (e.markCursor) {
        let t = document.createElement(`img`);
        t.className = `ProseMirror-separator`, t.setAttribute(`mark-placeholder`, `true`), t.setAttribute(`alt`, ``), e.cursorWrapper = {
            dom: t,
            deco: Jd.widget(e.state.selection.from, t, {
                raw: !0,
                marks: e.markCursor
            })
        }
    } else e.cursorWrapper = null
}

function Mf(e) {
    return !e.someProp(`editable`, t => t(e.state) === !1)
}

function Nf(e, t) {
    let n = Math.min(e.$anchor.sharedDepth(e.head), t.$anchor.sharedDepth(t.head));
    return e.$anchor.start(n) != t.$anchor.start(n)
}

function Pf(e) {
    let t = Object.create(null);

    function n(e) {
        for (let n in e) Object.prototype.hasOwnProperty.call(t, n) || (t[n] = e[n])
    }
    return e.someProp(`nodeViews`, n), e.someProp(`markViews`, n), t
}

function Ff(e, t) {
    let n = 0,
        r = 0;
    for (let r in e) {
        if (e[r] != t[r]) return !0;
        n++
    }
    for (let e in t) r++;
    return n != r
}

function If(e) {
    if (e.spec.state || e.spec.filterTransaction || e.spec.appendTransaction) throw RangeError(`Plugins passed directly to the view must not have a state component`)
}
for (var Lf = {
        8: `Backspace`,
        9: `Tab`,
        10: `Enter`,
        12: `NumLock`,
        13: `Enter`,
        16: `Shift`,
        17: `Control`,
        18: `Alt`,
        20: `CapsLock`,
        27: `Escape`,
        32: ` `,
        33: `PageUp`,
        34: `PageDown`,
        35: `End`,
        36: `Home`,
        37: `ArrowLeft`,
        38: `ArrowUp`,
        39: `ArrowRight`,
        40: `ArrowDown`,
        44: `PrintScreen`,
        45: `Insert`,
        46: `Delete`,
        59: `;`,
        61: `=`,
        91: `Meta`,
        92: `Meta`,
        106: `*`,
        107: `+`,
        108: `,`,
        109: `-`,
        110: `.`,
        111: `/`,
        144: `NumLock`,
        145: `ScrollLock`,
        160: `Shift`,
        161: `Shift`,
        162: `Control`,
        163: `Control`,
        164: `Alt`,
        165: `Alt`,
        173: `-`,
        186: `;`,
        187: `=`,
        188: `,`,
        189: `-`,
        190: `.`,
        191: `/`,
        192: "`",
        219: `[`,
        220: `\\`,
        221: `]`,
        222: `'`
    }, Rf = {
        48: `)`,
        49: `!`,
        50: `@`,
        51: `#`,
        52: `$`,
        53: `%`,
        54: `^`,
        55: `&`,
        56: `*`,
        57: `(`,
        59: `:`,
        61: `+`,
        173: `_`,
        186: `:`,
        187: `+`,
        188: `<`,
        189: `_`,
        190: `>`,
        191: `?`,
        192: `~`,
        219: `{`,
        220: `|`,
        221: `}`,
        222: `"`
    }, zf = typeof navigator < `u` && /Mac/.test(navigator.platform), Bf = typeof navigator < `u` && /MSIE \d|Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(navigator.userAgent), X = 0; X < 10; X++) Lf[48 + X] = Lf[96 + X] = String(X);
for (var X = 1; X <= 24; X++) Lf[X + 111] = `F` + X;
for (var X = 65; X <= 90; X++) Lf[X] = String.fromCharCode(X + 32), Rf[X] = String.fromCharCode(X);
for (var Vf in Lf) Rf.hasOwnProperty(Vf) || (Rf[Vf] = Lf[Vf]);

function Hf(e) {
    var t = !(zf && e.metaKey && e.shiftKey && !e.ctrlKey && !e.altKey || Bf && e.shiftKey && e.key && e.key.length == 1 || e.key == `Unidentified`) && e.key || (e.shiftKey ? Rf : Lf)[e.keyCode] || e.key || `Unidentified`;
    return t == `Esc` && (t = `Escape`), t == `Del` && (t = `Delete`), t == `Left` && (t = `ArrowLeft`), t == `Up` && (t = `ArrowUp`), t == `Right` && (t = `ArrowRight`), t == `Down` && (t = `ArrowDown`), t
}
var Uf = typeof navigator < `u` && /Mac|iP(hone|[oa]d)/.test(navigator.platform),
    Wf = typeof navigator < `u` && /Win/.test(navigator.platform);

function Gf(e) {
    let t = e.split(/-(?!$)/),
        n = t[t.length - 1];
    n == `Space` && (n = ` `);
    let r, i, a, o;
    for (let e = 0; e < t.length - 1; e++) {
        let n = t[e];
        if (/^(cmd|meta|m)$/i.test(n)) o = !0;
        else if (/^a(lt)?$/i.test(n)) r = !0;
        else if (/^(c|ctrl|control)$/i.test(n)) i = !0;
        else if (/^s(hift)?$/i.test(n)) a = !0;
        else if (/^mod$/i.test(n)) Uf ? o = !0 : i = !0;
        else throw Error(`Unrecognized modifier name: ` + n)
    }
    return r && (n = `Alt-` + n), i && (n = `Ctrl-` + n), o && (n = `Meta-` + n), a && (n = `Shift-` + n), n
}

function Kf(e) {
    let t = Object.create(null);
    for (let n in e) t[Gf(n)] = e[n];
    return t
}

function qf(e, t, n = !0) {
    return t.altKey && (e = `Alt-` + e), t.ctrlKey && (e = `Ctrl-` + e), t.metaKey && (e = `Meta-` + e), n && t.shiftKey && (e = `Shift-` + e), e
}

function Jf(e) {
    return new N({
        props: {
            handleKeyDown: Yf(e)
        }
    })
}

function Yf(e) {
    let t = Kf(e);
    return function(e, n) {
        let r = Hf(n),
            i, a = t[qf(r, n)];
        if (a && a(e.state, e.dispatch, e)) return !0;
        if (r.length == 1 && r != ` `) {
            if (n.shiftKey) {
                let i = t[qf(r, n, !1)];
                if (i && i(e.state, e.dispatch, e)) return !0
            }
            if ((n.altKey || n.metaKey || n.ctrlKey) && !(Wf && n.ctrlKey && n.altKey) && (i = Lf[n.keyCode]) && i != r) {
                let r = t[qf(i, n)];
                if (r && r(e.state, e.dispatch, e)) return !0
            }
        }
        return !1
    }
}

function Xf(e) {
    let {
        state: t,
        transaction: n
    } = e, {
        selection: r
    } = n, {
        doc: i
    } = n, {
        storedMarks: a
    } = n;
    return { ...t,
        apply: t.apply.bind(t),
        applyTransaction: t.applyTransaction.bind(t),
        plugins: t.plugins,
        schema: t.schema,
        reconfigure: t.reconfigure.bind(t),
        toJSON: t.toJSON.bind(t),
        get storedMarks() {
            return a
        },
        get selection() {
            return r
        },
        get doc() {
            return i
        },
        get tr() {
            return r = n.selection, i = n.doc, a = n.storedMarks, n
        }
    }
}
var Zf = class e {
        constructor(e) {
            this.editor = e.editor, this.rawCommands = this.editor.extensionManager.commands, this.customState = e.state
        }
        get hasCustomState() {
            return !!this.customState
        }
        get state() {
            return this.customState || this.editor.state
        }
        get commands() {
            let {
                rawCommands: e,
                editor: t,
                state: n
            } = this, {
                view: r
            } = t, {
                tr: i
            } = n, a = this.buildProps(i);
            return Object.fromEntries(Object.entries(e).map(([e, t]) => [e, (...e) => {
                let n = t(...e)(a);
                return !i.getMeta(`preventDispatch`) && !this.hasCustomState && r.dispatch(i), n
            }]))
        }
        get chain() {
            return () => this.createChain()
        }
        get can() {
            return () => this.createCan()
        }
        createChain(e, t = !0) {
            let {
                rawCommands: n,
                editor: r,
                state: i
            } = this, {
                view: a
            } = r, o = [], s = !!e, c = e || i.tr, l = () => (!s && t && !c.getMeta(`preventDispatch`) && !this.hasCustomState && a.dispatch(c), o.every(e => e === !0)), u = { ...Object.fromEntries(Object.entries(n).map(([e, n]) => [e, (...e) => {
                    let r = this.buildProps(c, t),
                        i = n(...e)(r);
                    return o.push(i), u
                }])),
                run: l
            };
            return u
        }
        static createFakeChain() {
            let e = new Proxy({}, {
                get: (t, n) => {
                    if (n !== `then`) return n === `run` ? () => !1 : () => e
                }
            });
            return e
        }
        createCan(e) {
            let {
                rawCommands: t,
                state: n
            } = this, r = e || n.tr, i = this.buildProps(r, !1);
            return { ...Object.fromEntries(Object.entries(t).map(([e, t]) => [e, (...e) => t(...e)({ ...i,
                    dispatch: void 0
                })])),
                chain: () => this.createChain(r, !1)
            }
        }
        static createFallbackCan() {
            let t = e.createFakeChain();
            return new Proxy({
                chain: () => t
            }, {
                get: (e, t) => {
                    if (t !== `then`) return t === `chain` ? e.chain : () => !1
                }
            })
        }
        buildProps(e, t = !0) {
            let {
                rawCommands: n,
                editor: r,
                state: i
            } = this, {
                view: a
            } = r, o = {
                tr: e,
                editor: r,
                view: a,
                state: Xf({
                    state: i,
                    transaction: e
                }),
                dispatch: t ? () => void 0 : void 0,
                chain: () => this.createChain(e, t),
                can: () => this.createCan(e),
                get commands() {
                    return Object.fromEntries(Object.entries(n).map(([e, t]) => [e, (...e) => t(...e)(o)]))
                }
            };
            return o
        }
    },
    Qf = () => ({
        editor: e,
        view: t
    }) => (requestAnimationFrame(() => {
        if (!e.isDestroyed) {
            var n;
            t.dom.blur(), (n = window) == null || (n = n.getSelection()) == null || n.removeAllRanges()
        }
    }), !0),
    $f = (e = !0) => ({
        commands: t
    }) => t.setContent(``, {
        emitUpdate: e
    }),
    ep = () => ({
        state: e,
        tr: t,
        dispatch: n
    }) => {
        let {
            selection: r
        } = t, {
            ranges: i
        } = r;
        return n && i.forEach(({
            $from: n,
            $to: r
        }) => {
            e.doc.nodesBetween(n.pos, r.pos, (e, n) => {
                if (e.type.isText) return;
                let {
                    doc: r,
                    mapping: i
                } = t, a = r.resolve(i.map(n)), o = r.resolve(i.map(n + e.nodeSize)), s = a.blockRange(o);
                if (!s) return;
                let c = Ft(s);
                if (e.type.isTextblock) {
                    let {
                        defaultType: e
                    } = a.parent.contentMatchAt(a.index());
                    t.setNodeMarkup(s.start, e)
                }(c || c === 0) && t.lift(s, c)
            })
        }), !0
    },
    tp = e => t => e(t),
    np = () => ({
        state: e,
        dispatch: t
    }) => No(e, t),
    rp = (e, t) => ({
        editor: n,
        tr: r
    }) => {
        let {
            state: i
        } = n, a = i.doc.slice(e.from, e.to);
        r.deleteRange(e.from, e.to);
        let o = r.mapping.map(t);
        return r.insert(o, a.content), r.setSelection(new j(r.doc.resolve(Math.max(o - 1, 0)))), !0
    },
    ip = () => ({
        tr: e,
        dispatch: t
    }) => {
        let {
            selection: n
        } = e, r = n.$anchor.node();
        if (r.content.size > 0) return !1;
        let i = e.selection.$anchor;
        for (let n = i.depth; n > 0; --n)
            if (i.node(n).type === r.type) {
                if (t) {
                    let t = i.before(n),
                        r = i.after(n);
                    e.delete(t, r).scrollIntoView()
                }
                return !0
            }
        return !1
    };

function Z(e, t) {
    if (typeof e == `string`) {
        if (!t.nodes[e]) throw Error(`There is no node type named '${e}'. Maybe you forgot to add the extension?`);
        return t.nodes[e]
    }
    return e
}
var ap = e => ({
        tr: t,
        state: n,
        dispatch: r
    }) => {
        let i = Z(e, n.schema),
            a = t.selection.$anchor;
        for (let e = a.depth; e > 0; --e)
            if (a.node(e).type === i) {
                if (r) {
                    let n = a.before(e),
                        r = a.after(e);
                    t.delete(n, r).scrollIntoView()
                }
                return !0
            }
        return !1
    },
    op = e => ({
        tr: t,
        dispatch: n
    }) => {
        let {
            from: r,
            to: i
        } = e;
        return n && t.delete(r, i), !0
    },
    sp = e => e.content ? /^text(\*|\+)/.test(e.content) : !1,
    cp = (e, t, n) => {
        if (!e.parent.isInline || n === `left` && e.pos > e.start() || n === `right` && e.pos < e.end()) return e.pos;
        let r = t.nodes[e.parent.type.name].spec;
        return sp(r) ? n === `left` ? e.start() - 1 : e.end() + 1 : e.pos
    },
    lp = (e, t, n) => ({
        from: cp(e, n, `left`),
        to: cp(t, n, `right`)
    }),
    up = () => ({
        state: e,
        dispatch: t
    }) => {
        if (e.selection.empty) return !1;
        if (t) {
            let n = e.tr,
                {
                    ranges: r
                } = e.selection,
                i = n.steps.length;
            r.forEach(t => {
                let r = n.mapping.slice(i),
                    {
                        from: a,
                        to: o
                    } = lp(n.doc.resolve(r.map(t.$from.pos)), n.doc.resolve(r.map(t.$to.pos)), e.schema);
                n.deleteRange(a, o)
            }), n.selection.empty || n.setSelection(j.near(n.doc.resolve(n.selection.from))), n.scrollIntoView(), t(n)
        }
        return !0
    },
    dp = () => ({
        commands: e
    }) => e.keyboardShortcut(`Enter`),
    fp = () => ({
        state: e,
        dispatch: t
    }) => Mo(e, t);

function pp(e) {
    return Object.prototype.toString.call(e) === `[object RegExp]`
}

function mp(e, t, n = {
    strict: !0
}) {
    let r = Object.keys(t);
    return r.length ? r.every(r => n.strict ? t[r] === e[r] : pp(t[r]) ? t[r].test(e[r]) : t[r] === e[r]) : !0
}

function hp(e, t, n = {}) {
    return e.find(e => e.type === t && mp(Object.fromEntries(Object.keys(n).map(t => [t, e.attrs[t]])), n))
}

function gp(e, t, n = {}) {
    return !!hp(e, t, n)
}

function _p(e, t, n) {
    if (!e || !t) return;
    let r = e.parent.childAfter(e.parentOffset);
    if ((!r.node || !r.node.marks.some(e => e.type === t)) && (r = e.parent.childBefore(e.parentOffset)), !r.node || !r.node.marks.some(e => e.type === t)) return;
    if (!n) {
        let e = r.node.marks.find(e => e.type === t);
        e && (n = e.attrs)
    }
    if (!hp([...r.node.marks], t, n)) return;
    let i = r.index,
        a = e.start() + r.offset,
        o = i + 1,
        s = a + r.node.nodeSize;
    for (; i > 0 && gp([...e.parent.child(i - 1).marks], t, n);) --i, a -= e.parent.child(i).nodeSize;
    for (; o < e.parent.childCount && gp([...e.parent.child(o).marks], t, n);) s += e.parent.child(o).nodeSize, o += 1;
    return {
        from: a,
        to: s
    }
}

function vp(e, t) {
    if (typeof e == `string`) {
        if (!t.marks[e]) throw Error(`There is no mark type named '${e}'. Maybe you forgot to add the extension?`);
        return t.marks[e]
    }
    return e
}
var yp = (e, t) => ({
        tr: n,
        state: r,
        dispatch: i
    }) => {
        let a = vp(e, r.schema),
            {
                doc: o,
                selection: s
            } = n,
            {
                $from: c,
                from: l,
                to: u
            } = s;
        if (i) {
            let e = _p(c, a, t);
            if (e && e.from <= l && e.to >= u) {
                let t = j.create(o, e.from, e.to);
                n.setSelection(t)
            }
        }
        return !0
    },
    bp = e => t => {
        let n = typeof e == `function` ? e(t) : e;
        for (let e = 0; e < n.length; e += 1)
            if (n[e](t)) return !0;
        return !1
    };

function xp(e) {
    return e instanceof j
}

function Sp(e = 0, t = 0, n = 0) {
    return Math.min(Math.max(e, t), n)
}

function Cp(e, t = null) {
    if (!t) return null;
    let n = A.atStart(e),
        r = A.atEnd(e);
    if (t === `start` || t === !0) return n;
    if (t === `end`) return r;
    let i = n.from,
        a = r.to;
    return t === `all` ? j.create(e, Sp(0, i, a), Sp(e.content.size, i, a)) : j.create(e, Sp(t, i, a), Sp(t, i, a))
}

function wp() {
    return [`Android`].includes(navigator.platform) || /android/i.test(navigator.userAgent)
}

function Tp() {
    return [`iPad Simulator`, `iPhone Simulator`, `iPod Simulator`, `iPad`, `iPhone`, `iPod`].includes(navigator.platform) || navigator.userAgent.includes(`Mac`) && `ontouchend` in document
}

function Ep() {
    return typeof navigator < `u` ? /^((?!chrome|android).)*safari/i.test(navigator.userAgent) : !1
}
var Dp = (e = null, t = {}) => ({
        editor: n,
        view: r,
        tr: i,
        dispatch: a
    }) => {
        t = {
            scrollIntoView: !0,
            ...t
        };
        let o = () => {
            (Tp() || wp()) && r.dom.focus(), Ep() && !Tp() && !wp() && r.dom.focus({
                preventScroll: !0
            }), requestAnimationFrame(() => {
                n.isDestroyed || (r.focus(), t ?.scrollIntoView && n.commands.scrollIntoView())
            })
        };
        try {
            if (r.hasFocus() && e === null || e === !1) return !0
        } catch {
            return !1
        }
        if (a && e === null && !xp(n.state.selection)) return o(), !0;
        let s = Cp(i.doc, e) || n.state.selection,
            c = n.state.selection.eq(s);
        return a && (c || i.setSelection(s), c && i.storedMarks && i.setStoredMarks(i.storedMarks), o()), !0
    },
    Op = (e, t) => n => e.every((e, r) => t(e, { ...n,
        index: r
    })),
    kp = (e, t) => ({
        tr: n,
        commands: r
    }) => r.insertContentAt({
        from: n.selection.from,
        to: n.selection.to
    }, e, t),
    Ap = e => {
        let t = e.childNodes;
        for (let n = t.length - 1; n >= 0; --n) {
            let r = t[n];
            r.nodeType === 3 && r.nodeValue && /^(\n\s\s|\n)$/.test(r.nodeValue) ? e.removeChild(r) : r.nodeType === 1 && Ap(r)
        }
        return e
    };

function jp(e) {
    if (typeof window > `u`) throw Error(`[tiptap error]: there is no window object available, so this function cannot be used`);
    let t = `<body>${e}</body>`,
        n = new window.DOMParser().parseFromString(t, `text/html`).body;
    return Ap(n)
}

function Mp(e) {
    return typeof e ?.nodesBetween == `function`
}

function Np(e, t, n) {
    if (Mp(e)) return e;
    let r = typeof e == `object` && !!e;
    n = {
        slice: !0,
        parseOptions: {},
        ...n
    };
    let i = typeof e == `string`;
    if (r) try {
        if (Array.isArray(e) && e.length > 0) return c.fromArray(e.map(e => t.nodeFromJSON(e)));
        let r = t.nodeFromJSON(e);
        return n.errorOnInvalidContent && r.check(), r
    } catch (r) {
        if (n.errorOnInvalidContent) throw Error(`[tiptap error]: Invalid JSON content`, {
            cause: r
        });
        return console.warn(`[tiptap warn]: Invalid content.`, `Passed value:`, e, `Error:`, r), Np(``, t, n)
    }
    if (i) {
        if (n.errorOnInvalidContent) {
            let r = !1,
                i = ``,
                a = new ze({
                    topNode: t.spec.topNode,
                    marks: t.spec.marks,
                    nodes: t.spec.nodes.append({
                        __tiptap__private__unknown__catch__all__node: {
                            content: `inline*`,
                            group: `block`,
                            parseDOM: [{
                                tag: `*`,
                                getAttrs: e => (r = !0, i = typeof e == `string` ? e : e.outerHTML, null)
                            }]
                        }
                    })
                });
            if (n.slice ? Ue.fromSchema(a).parseSlice(jp(e), n.parseOptions) : Ue.fromSchema(a).parse(jp(e), n.parseOptions), n.errorOnInvalidContent && r) throw Error(`[tiptap error]: Invalid HTML content`, {
                cause: Error(`Invalid element found: ${i}`)
            })
        }
        let r = Ue.fromSchema(t);
        return n.slice ? r.parseSlice(jp(e), n.parseOptions).content : r.parse(jp(e), n.parseOptions)
    }
    return Np(``, t, n)
}

function Pp(e) {
    return !(`type` in e)
}

function Fp(e, t, n) {
    let r = e.steps.length - 1;
    if (r < t) return;
    let i = e.steps[r];
    if (!(i instanceof Ot || i instanceof kt)) return;
    let a = e.mapping.maps[r],
        o = 0;
    a.forEach((e, t, n, r) => {
        o === 0 && (o = r)
    }), e.setSelection(A.near(e.doc.resolve(o), n))
}
var Ip = (e, t, n) => ({
    tr: r,
    dispatch: i,
    editor: a
}) => {
    if (i) {
        n = {
            parseOptions: a.options.parseOptions,
            updateSelection: !0,
            applyInputRules: !1,
            applyPasteRules: !1,
            ...n
        };
        let i, o = e => {
                a.emit(`contentError`, {
                    editor: a,
                    error: e,
                    disableCollaboration: () => {
                        `collaboration` in a.storage && typeof a.storage.collaboration == `object` && a.storage.collaboration && (a.storage.collaboration.isDisabled = !0)
                    }
                })
            },
            s = {
                preserveWhitespace: `full`,
                ...n.parseOptions
            };
        if (!n.errorOnInvalidContent && !a.options.enableContentCheck && a.options.emitContentError) try {
            Np(t, a.schema, {
                parseOptions: s,
                errorOnInvalidContent: !0
            })
        } catch (e) {
            o(e)
        }
        try {
            i = Np(t, a.schema, {
                parseOptions: s,
                errorOnInvalidContent: n.errorOnInvalidContent ?? a.options.enableContentCheck
            })
        } catch (e) {
            return o(e), !1
        }
        let {
            from: l,
            to: u
        } = typeof e == `number` ? {
            from: e,
            to: e
        } : {
            from: e.from,
            to: e.to
        }, d = !0, f = !0, p = Pp(i) ? i.content : [i];
        if (p.forEach(e => {
                e.check(), d = d ? e.isText && e.marks.length === 0 : !1, f = f ? e.isBlock : !1
            }), l === u && f) {
            let {
                parent: e
            } = r.doc.resolve(l);
            e.isTextblock && !e.type.spec.code && !e.childCount && (--l, u += 1)
        }
        let m;
        if (d) m = Array.isArray(t) ? t.map(e => e.text || ``).join(``) : Mp(t) ? p.map(e => e.text ?? ``).join(``) : typeof t == `object` && t && t.text ? t.text : t, r.insertText(m, l, u);
        else {
            m = c.from(p);
            let e = r.doc.resolve(l),
                t = e.node(),
                n = e.parentOffset === 0,
                i = t.isText || t.isTextblock,
                a = t.content.size > 0;
            n && i && a && f && (l = Math.max(0, l - 1)), r.replaceWith(l, u, p)
        }
        n.updateSelection && Fp(r, r.steps.length - 1, -1), n.applyInputRules && r.setMeta(`applyInputRules`, {
            from: l,
            text: m
        }), n.applyPasteRules && r.setMeta(`applyPasteRules`, {
            from: l,
            text: m
        })
    }
    return !0
};

function Lp(e) {
    for (let t = 0; t < e.edgeCount; t += 1) {
        let {
            type: n
        } = e.edge(t);
        if (n.isTextblock && !n.hasRequiredAttrs()) return n
    }
    return null
}
var Rp = (e = {}) => ({
        tr: t,
        dispatch: n,
        editor: r
    }) => {
        let {
            pos: i,
            attrs: a,
            content: o,
            updateSelection: s = !0
        } = e, c;
        c = typeof i == `number` ? t.doc.resolve(i) : i || t.selection.$from;
        let l = Lp(c.parent.contentMatchAt(c.index()));
        if (!l) return !1;
        let u = Object.keys(l.spec.attrs || {}),
            d = a ? Object.fromEntries(Object.entries(a).filter(([e]) => u.includes(e))) : {},
            f;
        if (o) {
            let e = Np(o, r.schema);
            f = l.createAndFill(d, e)
        } else f = l.createAndFill(d);
        return f ? (n && (t.insert(c.pos, f), s && Fp(t, t.steps.length - 1, -1)), !0) : !1
    },
    zp = () => ({
        state: e,
        dispatch: t
    }) => Do(e, t),
    Bp = () => ({
        state: e,
        dispatch: t
    }) => Oo(e, t),
    Vp = () => ({
        state: e,
        dispatch: t
    }) => go(e, t),
    Hp = () => ({
        state: e,
        dispatch: t
    }) => wo(e, t),
    Up = () => ({
        state: e,
        dispatch: t,
        tr: n
    }) => {
        try {
            let r = Qt(e.doc, e.selection.$from.pos, -1);
            return r == null ? !1 : (n.join(r, 2), t && t(n), !0)
        } catch {
            return !1
        }
    },
    Wp = () => ({
        state: e,
        dispatch: t,
        tr: n
    }) => {
        try {
            let r = Qt(e.doc, e.selection.$from.pos, 1);
            return r == null ? !1 : (n.join(r, 2), t && t(n), !0)
        } catch {
            return !1
        }
    },
    Gp = () => ({
        state: e,
        dispatch: t
    }) => _o(e, t),
    Kp = () => ({
        state: e,
        dispatch: t
    }) => vo(e, t);

function qp() {
    return typeof navigator < `u` ? /Mac/.test(navigator.platform) : !1
}

function Jp(e) {
    let t = e.split(/-(?!$)/),
        n = t[t.length - 1];
    n === `Space` && (n = ` `);
    let r, i, a, o;
    for (let e = 0; e < t.length - 1; e += 1) {
        let n = t[e];
        if (/^(cmd|meta|m)$/i.test(n)) o = !0;
        else if (/^a(lt)?$/i.test(n)) r = !0;
        else if (/^(c|ctrl|control)$/i.test(n)) i = !0;
        else if (/^s(hift)?$/i.test(n)) a = !0;
        else if (/^mod$/i.test(n)) Tp() || qp() ? o = !0 : i = !0;
        else throw Error(`Unrecognized modifier name: ${n}`)
    }
    return r && (n = `Alt-${n}`), i && (n = `Ctrl-${n}`), o && (n = `Meta-${n}`), a && (n = `Shift-${n}`), n
}
var Yp = e => ({
    editor: t,
    view: n,
    tr: r,
    dispatch: i
}) => {
    let a = Jp(e).split(/-(?!$)/),
        o = a.find(e => ![`Alt`, `Ctrl`, `Meta`, `Shift`].includes(e)),
        s = new KeyboardEvent(`keydown`, {
            key: o === `Space` ? ` ` : o,
            altKey: a.includes(`Alt`),
            ctrlKey: a.includes(`Ctrl`),
            metaKey: a.includes(`Meta`),
            shiftKey: a.includes(`Shift`),
            bubbles: !0,
            cancelable: !0
        });
    return t.captureTransaction(() => {
        n.someProp(`handleKeyDown`, e => e(n, s))
    }) ?.steps.forEach(e => {
        let t = e.map(r.mapping);
        t && i && r.maybeStep(t)
    }), !0
};

function Xp(e, t, n = {}) {
    let {
        from: r,
        to: i,
        empty: a
    } = e.selection, o = t ? Z(t, e.schema) : null, s = [];
    e.doc.nodesBetween(r, i, (e, t) => {
        if (e.isText) return;
        let n = Math.max(r, t),
            a = Math.min(i, t + e.nodeSize);
        s.push({
            node: e,
            from: n,
            to: a
        })
    });
    let c = i - r,
        l = s.filter(e => o ? o.name === e.node.type.name : !0).filter(e => mp(e.node.attrs, n, {
            strict: !1
        }));
    return a ? !!l.length : l.reduce((e, t) => e + t.to - t.from, 0) >= c
}
var Zp = (e, t = {}) => ({
        state: n,
        dispatch: r
    }) => Xp(n, Z(e, n.schema), t) ? ko(n, r) : !1,
    Qp = () => ({
        state: e,
        dispatch: t
    }) => Po(e, t),
    $p = e => ({
        state: t,
        dispatch: n
    }) => xc(Z(e, t.schema))(t, n),
    em = () => ({
        state: e,
        dispatch: t
    }) => Ao(e, t);

function tm(e, t) {
    return t.nodes[e] ? `node` : t.marks[e] ? `mark` : null
}

function nm(e, t) {
    let n = typeof t == `string` ? [t] : t;
    return Object.keys(e).reduce((t, r) => (n.includes(r) || (t[r] = e[r]), t), {})
}
var rm = (e, t) => ({
        tr: n,
        state: r,
        dispatch: i
    }) => {
        let a = null,
            o = null,
            s = tm(typeof e == `string` ? e : e.name, r.schema);
        if (!s) return !1;
        s === `node` && (a = Z(e, r.schema)), s === `mark` && (o = vp(e, r.schema));
        let c = !1;
        return n.selection.ranges.forEach(e => {
            r.doc.nodesBetween(e.$from.pos, e.$to.pos, (e, r) => {
                a && a === e.type && (c = !0, i && n.setNodeMarkup(r, void 0, nm(e.attrs, t))), o && e.marks.length && e.marks.forEach(a => {
                    o === a.type && (c = !0, i && n.addMark(r, r + e.nodeSize, o.create(nm(a.attrs, t))))
                })
            })
        }), c
    },
    im = () => ({
        tr: e,
        dispatch: t
    }) => (t && e.scrollIntoView(), !0),
    am = () => ({
        tr: e,
        dispatch: t
    }) => {
        if (t) {
            let t = new Xa(e.doc);
            e.setSelection(t)
        }
        return !0
    },
    om = () => ({
        state: e,
        dispatch: t
    }) => xo(e, t),
    sm = () => ({
        state: e,
        dispatch: t
    }) => To(e, t),
    cm = () => ({
        state: e,
        dispatch: t
    }) => Lo(e, t),
    lm = () => ({
        state: e,
        dispatch: t
    }) => Uo(e, t),
    um = () => ({
        state: e,
        dispatch: t
    }) => Ho(e, t);

function dm(e, t, n = {}, r = {}) {
    return Np(e, t, {
        slice: !1,
        parseOptions: n,
        errorOnInvalidContent: r.errorOnInvalidContent
    })
}
var fm = (e, {
    errorOnInvalidContent: t,
    emitUpdate: n = !0,
    parseOptions: r = {}
} = {}) => ({
    editor: i,
    tr: a,
    dispatch: o,
    commands: s
}) => {
    let {
        doc: c
    } = a;
    if (r.preserveWhitespace !== `full`) {
        let s = dm(e, i.schema, r, {
            errorOnInvalidContent: t ?? i.options.enableContentCheck
        });
        if (o) {
            let e = Pp(s) ? s.content : [s];
            a.replaceWith(0, c.content.size, e).setMeta(`preventUpdate`, !n)
        }
        return !0
    }
    return o && a.setMeta(`preventUpdate`, !n), s.insertContentAt({
        from: 0,
        to: c.content.size
    }, e, {
        parseOptions: r,
        errorOnInvalidContent: t ?? i.options.enableContentCheck
    })
};

function pm(e, t) {
    let n = vp(t, e.schema),
        {
            from: r,
            to: i,
            empty: a
        } = e.selection,
        o = [];
    a ? (e.storedMarks && o.push(...e.storedMarks), o.push(...e.selection.$head.marks())) : e.doc.nodesBetween(r, i, e => {
        o.push(...e.marks)
    });
    let s = o.find(e => e.type.name === n.name);
    return s ? { ...s.attrs
    } : {}
}

function mm(e, t) {
    let n = new xn(e);
    return t.forEach(e => {
        e.steps.forEach(e => {
            n.step(e)
        })
    }), n
}

function hm(e, t, n) {
    let r = [];
    return e.nodesBetween(t.from, t.to, (e, t) => {
        n(e) && r.push({
            node: e,
            pos: t
        })
    }), r
}

function gm(e, t) {
    for (let n = e.depth; n > 0; --n) {
        let r = e.node(n);
        if (t(r)) return {
            pos: n > 0 ? e.before(n) : 0,
            start: e.start(n),
            depth: n,
            node: r
        }
    }
}

function _m(e) {
    return t => gm(t.$from, e)
}

function Q(e, t, n) {
    return e.config[t] === void 0 && e.parent ? Q(e.parent, t, n) : typeof e.config[t] == `function` ? e.config[t].bind({ ...n,
        parent: e.parent ? Q(e.parent, t, n) : null
    }) : e.config[t]
}

function vm(e) {
    return e.map(e => {
        let t = Q(e, `addExtensions`, {
            name: e.name,
            options: e.options,
            storage: e.storage
        });
        return t ? [e, ...vm(t())] : e
    }).flat(10)
}

function ym(e, t) {
    let n = rt.fromSchema(t).serializeFragment(e),
        r = document.implementation.createHTMLDocument().createElement(`div`);
    return r.appendChild(n), r.innerHTML
}

function bm(e) {
    return typeof e == `function`
}

function $(e, t = void 0, ...n) {
    return bm(e) ? t ? e.bind(t)(...n) : e(...n) : e
}

function xm(e = {}) {
    return Object.keys(e).length === 0 && e.constructor === Object
}

function Sm(e) {
    return {
        baseExtensions: e.filter(e => e.type === `extension`),
        nodeExtensions: e.filter(e => e.type === `node`),
        markExtensions: e.filter(e => e.type === `mark`)
    }
}

function Cm(e) {
    let t = [],
        {
            nodeExtensions: n,
            markExtensions: r
        } = Sm(e),
        i = [...n, ...r],
        a = {
            default: null,
            validate: void 0,
            rendered: !0,
            renderHTML: null,
            parseHTML: null,
            keepOnSplit: !0,
            isRequired: !1
        },
        o = n.filter(e => e.name !== `text`).map(e => e.name),
        s = r.map(e => e.name),
        c = [...o, ...s];
    return e.forEach(e => {
        let n = Q(e, `addGlobalAttributes`, {
            name: e.name,
            options: e.options,
            storage: e.storage,
            extensions: i
        });
        n && n().forEach(e => {
            let n;
            n = Array.isArray(e.types) ? e.types : e.types === `*` ? c : e.types === `nodes` ? o : e.types === `marks` ? s : [], n.forEach(n => {
                Object.entries(e.attributes).forEach(([e, r]) => {
                    t.push({
                        type: n,
                        name: e,
                        attribute: { ...a,
                            ...r
                        }
                    })
                })
            })
        })
    }), i.forEach(e => {
        let n = Q(e, `addAttributes`, {
            name: e.name,
            options: e.options,
            storage: e.storage
        });
        if (!n) return;
        let r = n();
        Object.entries(r).forEach(([n, r]) => {
            let i = { ...a,
                ...r
            };
            typeof i ?.default == `function` && (i.default = i.default()), i ?.isRequired && i ?.default === void 0 && delete i.default, t.push({
                type: e.name,
                name: n,
                attribute: i
            })
        })
    }), t
}

function wm(e) {
    let t = [],
        n = ``,
        r = !1,
        i = !1,
        a = 0,
        o = e.length;
    for (let s = 0; s < o; s += 1) {
        let o = e[s];
        if (o === `'` && !i) {
            r = !r, n += o;
            continue
        }
        if (o === `"` && !r) {
            i = !i, n += o;
            continue
        }
        if (!r && !i) {
            if (o === `(`) {
                a += 1, n += o;
                continue
            }
            if (o === `)` && a > 0) {
                --a, n += o;
                continue
            }
            if (o === `;` && a === 0) {
                t.push(n), n = ``;
                continue
            }
        }
        n += o
    }
    return n && t.push(n), t
}

function Tm(e) {
    let t = [],
        n = wm(e || ``),
        r = n.length;
    for (let e = 0; e < r; e += 1) {
        let r = n[e],
            i = r.indexOf(`:`);
        if (i === -1) continue;
        let a = r.slice(0, i).trim(),
            o = r.slice(i + 1).trim();
        a && o && t.push([a, o])
    }
    return t
}

function Em(...e) {
    return e.filter(e => !!e).reduce((e, t) => {
        let n = { ...e
        };
        return Object.entries(t).forEach(([e, t]) => {
            if (!n[e]) {
                n[e] = t;
                return
            }
            if (e === `class`) {
                let r = t ? String(t).split(` `) : [],
                    i = n[e] ? n[e].split(` `) : [],
                    a = r.filter(e => !i.includes(e));
                n[e] = [...i, ...a].join(` `)
            } else if (e === `style`) {
                let r = new Map([...Tm(n[e]), ...Tm(t)]);
                n[e] = Array.from(r.entries()).map(([e, t]) => `${e}: ${t}`).join(`; `)
            } else n[e] = t
        }), n
    }, {})
}

function Dm(e, t) {
    return t.filter(t => t.type === e.type.name).filter(e => e.attribute.rendered).map(t => t.attribute.renderHTML ? t.attribute.renderHTML(e.attrs) || {} : {
        [t.name]: e.attrs[t.name]
    }).reduce((e, t) => Em(e, t), {})
}

function Om(e) {
    return typeof e == `string` ? e.match(/^[+-]?(?:\d*\.)?\d+$/) ? Number(e) : e === `true` ? !0 : e === `false` ? !1 : e : e
}

function km(e, t) {
    return `style` in e ? e : { ...e,
        getAttrs: n => {
            let r = e.getAttrs ? e.getAttrs(n) : e.attrs;
            if (r === !1) return !1;
            let i = t.reduce((e, t) => {
                let r = t.attribute.parseHTML ? t.attribute.parseHTML(n) : Om(n.getAttribute(t.name));
                return r == null ? e : { ...e,
                    [t.name]: r
                }
            }, {});
            return { ...r,
                ...i
            }
        }
    }
}

function Am(e) {
    return Object.fromEntries(Object.entries(e).filter(([e, t]) => e === `attrs` && xm(t) ? !1 : t != null))
}

function jm(e) {
    var t, n;
    let r = {};
    return !(!(e == null || (t = e.attribute) == null) && t.isRequired) && `default` in (e ?.attribute || {}) && (r.default = e.attribute.default), (e == null || (n = e.attribute) == null ? void 0 : n.validate) !== void 0 && (r.validate = e.attribute.validate), [e.name, r]
}

function Mm(e, t) {
    let n = Cm(e),
        {
            nodeExtensions: r,
            markExtensions: i
        } = Sm(e);
    return new ze({
        topNode: r.find(e => Q(e, `topNode`)) ?.name,
        nodes: Object.fromEntries(r.map(r => {
            let i = n.filter(e => e.type === r.name),
                a = {
                    name: r.name,
                    options: r.options,
                    storage: r.storage,
                    editor: t
                },
                o = Am({ ...e.reduce((e, t) => {
                        let n = Q(t, `extendNodeSchema`, a);
                        return { ...e,
                            ...n ? n(r) : {}
                        }
                    }, {}),
                    content: $(Q(r, `content`, a)),
                    marks: $(Q(r, `marks`, a)),
                    group: $(Q(r, `group`, a)),
                    inline: $(Q(r, `inline`, a)),
                    atom: $(Q(r, `atom`, a)),
                    selectable: $(Q(r, `selectable`, a)),
                    draggable: $(Q(r, `draggable`, a)),
                    code: $(Q(r, `code`, a)),
                    whitespace: $(Q(r, `whitespace`, a)),
                    linebreakReplacement: $(Q(r, `linebreakReplacement`, a)),
                    defining: $(Q(r, `defining`, a)),
                    isolating: $(Q(r, `isolating`, a)),
                    attrs: Object.fromEntries(i.map(jm))
                }),
                s = $(Q(r, `parseHTML`, a));
            s && (o.parseDOM = s.map(e => km(e, i)));
            let c = Q(r, `renderHTML`, a);
            c && (o.toDOM = e => c({
                node: e,
                HTMLAttributes: Dm(e, i)
            }));
            let l = Q(r, `renderText`, a);
            return l && (o.toText = l), [r.name, o]
        })),
        marks: Object.fromEntries(i.map(r => {
            let i = n.filter(e => e.type === r.name),
                a = {
                    name: r.name,
                    options: r.options,
                    storage: r.storage,
                    editor: t
                },
                o = Am({ ...e.reduce((e, t) => {
                        let n = Q(t, `extendMarkSchema`, a);
                        return { ...e,
                            ...n ? n(r) : {}
                        }
                    }, {}),
                    inclusive: $(Q(r, `inclusive`, a)),
                    excludes: $(Q(r, `excludes`, a)),
                    group: $(Q(r, `group`, a)),
                    spanning: $(Q(r, `spanning`, a)),
                    code: $(Q(r, `code`, a)),
                    attrs: Object.fromEntries(i.map(jm))
                }),
                s = $(Q(r, `parseHTML`, a));
            s && (o.parseDOM = s.map(e => km(e, i)));
            let c = Q(r, `renderHTML`, a);
            return c && (o.toDOM = e => c({
                mark: e,
                HTMLAttributes: Dm(e, i)
            })), [r.name, o]
        }))
    })
}

function Nm(e) {
    let t = e.filter((t, n) => e.indexOf(t) !== n);
    return Array.from(new Set(t))
}

function Pm(e) {
    return e.sort((e, t) => {
        let n = Q(e, `priority`) || 100,
            r = Q(t, `priority`) || 100;
        return n > r ? -1 : n < r ? 1 : 0
    })
}

function Fm(e) {
    let t = Pm(vm(e)),
        n = Nm(t.map(e => e.name));
    return n.length && console.warn(`[tiptap warn]: Duplicate extension names found: [${n.map(e=>`'${e}'`).join(`, `)}]. This can lead to issues.`), t
}

function Im(e, t) {
    return Mm(Fm(e), t)
}

function Lm(e, t, n) {
    let {
        from: r,
        to: i
    } = t, {
        blockSeparator: a = `

`,
        textSerializers: o = {}
    } = n || {}, s = ``;
    return e.nodesBetween(r, i, (e, n, c, l) => {
        e.isBlock && n > r && (s += a);
        let u = o ?.[e.type.name];
        if (u) return c && (s += u({
            node: e,
            pos: n,
            parent: c,
            index: l,
            range: t
        })), !1;
        if (e.isText) {
            var d;
            s += e == null || (d = e.text) == null ? void 0 : d.slice(Math.max(r, n) - n, i - n)
        }
    }), s
}

function Rm(e, t) {
    return Lm(e, {
        from: 0,
        to: e.content.size
    }, t)
}

function zm(e) {
    return Object.fromEntries(Object.entries(e.nodes).filter(([, e]) => e.spec.toText).map(([e, t]) => [e, t.spec.toText]))
}

function Bm(e, t) {
    let n = Z(t, e.schema),
        {
            from: r,
            to: i
        } = e.selection,
        a = [];
    e.doc.nodesBetween(r, i, e => {
        a.push(e)
    });
    let o = a.reverse().find(e => e.type.name === n.name);
    return o ? { ...o.attrs
    } : {}
}

function Vm(e, t) {
    let n = tm(typeof t == `string` ? t : t.name, e.schema);
    return n === `node` ? Bm(e, t) : n === `mark` ? pm(e, t) : {}
}

function Hm(e, t = JSON.stringify) {
    let n = {};
    return e.filter(e => {
        let r = t(e);
        return Object.prototype.hasOwnProperty.call(n, r) ? !1 : n[r] = !0
    })
}

function Um(e) {
    let t = Hm(e);
    return t.length === 1 ? t : t.filter((e, n) => !t.filter((e, t) => t !== n).some(t => e.oldRange.from >= t.oldRange.from && e.oldRange.to <= t.oldRange.to && e.newRange.from >= t.newRange.from && e.newRange.to <= t.newRange.to))
}

function Wm(e) {
    let {
        mapping: t,
        steps: n
    } = e, r = [];
    return t.maps.forEach((e, i) => {
        let a = [];
        if (e.ranges.length) e.forEach((e, t) => {
            a.push({
                from: e,
                to: t
            })
        });
        else {
            let {
                from: e,
                to: t
            } = n[i];
            if (e === void 0 || t === void 0) return;
            a.push({
                from: e,
                to: t
            })
        }
        a.forEach(({
            from: e,
            to: n
        }) => {
            let a = t.slice(i).map(e, -1),
                o = t.slice(i).map(n),
                s = t.invert().map(a, -1),
                c = t.invert().map(o);
            r.push({
                oldRange: {
                    from: s,
                    to: c
                },
                newRange: {
                    from: a,
                    to: o
                }
            })
        })
    }), Um(r)
}

function Gm(e, t, n) {
    let r = [];
    return e === t ? n.resolve(e).marks().forEach(t => {
        let i = _p(n.resolve(e), t.type);
        i && r.push({
            mark: t,
            ...i
        })
    }) : n.nodesBetween(e, t, (e, t) => {
        !e || e ?.nodeSize === void 0 || r.push(...e.marks.map(n => ({
            from: t,
            to: t + e.nodeSize,
            mark: n
        })))
    }), r
}
var Km = (e, t, n, r = 20) => {
        let i = e.doc.resolve(n),
            a = r,
            o = null;
        for (; a > 0 && o === null;) {
            let e = i.node(a);
            e ?.type.name === t ? o = e : --a
        }
        return [o, a]
    },
    qm = e => {
        let t = e.depth - 1;
        if (t < 0) return null;
        let n = e.index(t);
        return n === 0 ? null : e.node(t).child(n - 1)
    };

function Jm(e, t) {
    return t.nodes[e] || t.marks[e] || null
}

function Ym(e, t, n) {
    return Object.fromEntries(Object.entries(n).filter(([n]) => {
        let r = e.find(e => e.type === t && e.name === n);
        return r ? r.attribute.keepOnSplit : !1
    }))
}
var Xm = (e, t = 500) => {
    let n = ``,
        r = e.parentOffset;
    return e.parent.nodesBetween(Math.max(0, r - t), r, (e, t, i, a) => {
        var o;
        let s = (o = e.type.spec).toText ?.call(o, {
            node: e,
            pos: t,
            parent: i,
            index: a
        }) || e.textContent || `%leaf%`;
        n += e.isAtom && !e.isText ? s : s.slice(0, Math.max(0, r - t))
    }), n
};

function Zm(e, t, n = {}) {
    let {
        empty: r,
        ranges: i
    } = e.selection, a = t ? vp(t, e.schema) : null;
    if (r) return !!(e.storedMarks || e.selection.$from.marks()).filter(e => a ? a.name === e.type.name : !0).find(e => mp(e.attrs, n, {
        strict: !1
    }));
    let o = 0,
        s = [];
    if (i.forEach(({
            $from: t,
            $to: n
        }) => {
            let r = t.pos,
                i = n.pos;
            e.doc.nodesBetween(r, i, (e, t) => {
                if (a && e.inlineContent && !e.type.allowsMarkType(a)) return !1;
                if (!e.isText && !e.marks.length) return;
                let n = Math.max(r, t),
                    c = Math.min(i, t + e.nodeSize),
                    l = c - n;
                o += l, s.push(...e.marks.map(e => ({
                    mark: e,
                    from: n,
                    to: c
                })))
            })
        }), o === 0) return !1;
    let c = s.filter(e => a ? a.name === e.mark.type.name : !0).filter(e => mp(e.mark.attrs, n, {
            strict: !1
        })).reduce((e, t) => e + t.to - t.from, 0),
        l = s.filter(e => a ? e.mark.type !== a && e.mark.type.excludes(a) : !0).reduce((e, t) => e + t.to - t.from, 0);
    return (c > 0 ? c + l : c) >= o
}

function Qm(e, t, n = {}) {
    if (!t) return Xp(e, null, n) || Zm(e, null, n);
    let r = tm(t, e.schema);
    return r === `node` ? Xp(e, t, n) : r === `mark` ? Zm(e, t, n) : !1
}
var $m = (e, t) => {
        let {
            $from: n,
            $to: r,
            $anchor: i
        } = e.selection;
        if (t) {
            let n = _m(e => e.type.name === t)(e.selection);
            if (!n) return !1;
            let r = e.doc.resolve(n.pos + 1);
            return i.pos + 1 === r.end()
        }
        return !(r.parentOffset < r.parent.nodeSize - 2 || n.pos !== r.pos)
    },
    eh = e => {
        let {
            $from: t,
            $to: n
        } = e.selection;
        return !(t.parentOffset > 0 || t.pos !== n.pos)
    };

function th(e, t) {
    return Array.isArray(t) ? t.some(t => (typeof t == `string` ? t : t.name) === e.name) : t
}

function nh(e, t) {
    let {
        nodeExtensions: n
    } = Sm(t), r = n.find(t => t.name === e);
    if (!r) return !1;
    let i = $(Q(r, `group`, {
        name: r.name,
        options: r.options,
        storage: r.storage
    }));
    return typeof i == `string` ? i.split(` `).includes(`list`) : !1
}

function rh(e, {
    checkChildren: t = !0,
    ignoreWhitespace: n = !1
} = {}) {
    if (n) {
        if (e.type.name === `hardBreak`) return !0;
        if (e.isText) return !/\S/.test(e.text ?? ``)
    }
    if (e.isText) return !e.text;
    if (e.isAtom || e.isLeaf) return !1;
    if (e.content.childCount === 0) return !0;
    if (t) {
        let r = !0;
        return e.content.forEach(e => {
            r !== !1 && (rh(e, {
                ignoreWhitespace: n,
                checkChildren: t
            }) || (r = !1))
        }), r
    }
    return !1
}

function ih(e) {
    return e instanceof M
}
var ah = class e {
    constructor(e) {
        this.position = e
    }
    static fromJSON(t) {
        return new e(t.position)
    }
    toJSON() {
        return {
            position: this.position
        }
    }
};

function oh(e, t) {
    let n = t.mapping.mapResult(e.position);
    return {
        position: new ah(n.pos),
        mapResult: n
    }
}

function sh(e) {
    return new ah(e)
}

function ch(e, t, n) {
    let {
        selection: r
    } = t, i = null;
    if (xp(r) && (i = r.$cursor), i) {
        let t = e.storedMarks ?? i.marks();
        return i.parent.type.allowsMarkType(n) && (!!n.isInSet(t) || !t.some(e => e.type.excludes(n)))
    }
    let {
        ranges: a
    } = r;
    return a.some(({
        $from: t,
        $to: r
    }) => {
        let i = t.depth === 0 ? e.doc.inlineContent && e.doc.type.allowsMarkType(n) : !1;
        return e.doc.nodesBetween(t.pos, r.pos, (e, t, r) => {
            if (i) return !1;
            if (e.isInline) {
                let t = !r || r.type.allowsMarkType(n),
                    a = !!n.isInSet(e.marks) || !e.marks.some(e => e.type.excludes(n));
                i = t && a
            }
            return !i
        }), i
    })
}
var lh = (e, t = {}) => ({
        tr: n,
        state: r,
        dispatch: i
    }) => {
        let {
            selection: a
        } = n, {
            empty: o,
            ranges: s
        } = a, c = vp(e, r.schema);
        if (i)
            if (o) {
                let e = pm(r, c);
                n.addStoredMark(c.create({ ...e,
                    ...t
                }))
            } else s.forEach(e => {
                let i = e.$from.pos,
                    a = e.$to.pos;
                r.doc.nodesBetween(i, a, (e, r) => {
                    let o = Math.max(r, i),
                        s = Math.min(r + e.nodeSize, a);
                    e.marks.find(e => e.type === c) ? e.marks.forEach(e => {
                        c === e.type && n.addMark(o, s, c.create({ ...e.attrs,
                            ...t
                        }))
                    }) : n.addMark(o, s, c.create(t))
                })
            });
        return ch(r, n, c)
    },
    uh = (e, t) => ({
        tr: n
    }) => (n.setMeta(e, t), !0),
    dh = (e, t = {}) => ({
        state: n,
        dispatch: r,
        chain: i
    }) => {
        let a = Z(e, n.schema),
            o;
        return n.selection.$anchor.sameParent(n.selection.$head) && (o = n.selection.$anchor.parent.attrs), a.isTextblock ? i().command(({
            commands: e
        }) => Go(a, { ...o,
            ...t
        })(n) ? !0 : e.clearNodes()).command(({
            state: e
        }) => Go(a, { ...o,
            ...t
        })(e, r)).run() : (console.warn(`[tiptap warn]: Currently "setNode()" only supports text block nodes.`), !1)
    },
    fh = e => ({
        tr: t,
        dispatch: n
    }) => {
        if (n) {
            let {
                doc: n
            } = t, r = Sp(e, 0, n.content.size), i = M.create(n, r);
            t.setSelection(i)
        }
        return !0
    },
    ph = (e, t) => ({
        tr: n,
        state: r,
        dispatch: i
    }) => {
        let {
            selection: a
        } = r, o, s;
        return typeof t == `number` ? (o = t, s = t) : t && `from` in t && `to` in t ? (o = t.from, s = t.to) : (o = a.from, s = a.to), i && n.doc.nodesBetween(o, s, (t, r) => {
            t.isText || n.setNodeMarkup(r, void 0, { ...t.attrs,
                dir: e
            })
        }), !0
    },
    mh = e => ({
        tr: t,
        dispatch: n
    }) => {
        if (n) {
            let {
                doc: n
            } = t, {
                from: r,
                to: i
            } = typeof e == `number` ? {
                from: e,
                to: e
            } : e, a = j.atStart(n).from, o = j.atEnd(n).to, s = Sp(r, a, o), c = Sp(i, a, o), l = j.create(n, s, c);
            t.setSelection(l)
        }
        return !0
    },
    hh = e => ({
        state: t,
        dispatch: n
    }) => wc(Z(e, t.schema))(t, n);

function gh(e, t) {
    let n = e.storedMarks || e.selection.$to.parentOffset && e.selection.$from.marks();
    if (n) {
        let r = n.filter(e => t ?.includes(e.type.name));
        e.tr.ensureMarks(r)
    }
}
var _h = ({
        keepMarks: e = !0
    } = {}) => ({
        tr: t,
        state: n,
        dispatch: r,
        editor: i
    }) => {
        let {
            selection: a,
            doc: o
        } = t, {
            $from: s,
            $to: c
        } = a, l = i.extensionManager.attributes, u = Ym(l, s.node().type.name, s.node().attrs);
        if (a instanceof M && a.node.isBlock) return !s.parentOffset || !qt(o, s.pos) ? !1 : (r && (e && gh(n, i.extensionManager.splittableMarks), t.split(s.pos).scrollIntoView()), !0);
        if (!s.parent.isBlock) return !1;
        let d = c.parentOffset === c.parent.content.size,
            f = s.depth === 0 ? void 0 : Lp(s.node(-1).contentMatchAt(s.indexAfter(-1))),
            p = d && f ? [{
                type: f,
                attrs: u
            }] : void 0,
            m = qt(t.doc, t.mapping.map(s.pos), 1, p);
        if (!p && !m && qt(t.doc, t.mapping.map(s.pos), 1, f ? [{
                type: f
            }] : void 0) && (m = !0, p = f ? [{
                type: f,
                attrs: u
            }] : void 0), r) {
            if (m && (a instanceof j && t.deleteSelection(), t.split(t.mapping.map(s.pos), 1, p), f && !d && !s.parentOffset && s.parent.type !== f)) {
                let e = t.mapping.map(s.before()),
                    n = t.doc.resolve(e);
                s.node(-1).canReplaceWith(n.index(), n.index() + 1, f) && t.setNodeMarkup(t.mapping.map(s.before()), f)
            }
            e && gh(n, i.extensionManager.splittableMarks), t.scrollIntoView()
        }
        return m
    },
    vh = (e, t = {}) => ({
        tr: n,
        state: r,
        dispatch: i,
        editor: a
    }) => {
        let o = Z(e, r.schema),
            {
                $from: s,
                $to: l
            } = r.selection,
            u = r.selection.node;
        if (u && u.isBlock || s.depth < 2 || !s.sameParent(l)) return !1;
        let d = s.node(-1);
        if (d.type !== o) return !1;
        let f = a.extensionManager.attributes;
        if (s.parent.content.size === 0 && s.node(-1).childCount === s.indexAfter(-1)) {
            if (s.depth === 2 || s.node(-3).type !== o || s.index(-2) !== s.node(-2).childCount - 1) return !1;
            if (i) {
                let e = c.empty,
                    r = s.index(-1) ? 1 : s.index(-2) ? 2 : 3;
                for (let t = s.depth - r; t >= s.depth - 3; --t) e = c.from(s.node(t).copy(e));
                let i = s.indexAfter(-1) < s.node(-2).childCount ? 1 : s.indexAfter(-2) < s.node(-3).childCount ? 2 : 3,
                    a = { ...Ym(f, s.node().type.name, s.node().attrs),
                        ...t
                    },
                    l = o.contentMatch.defaultType ?.createAndFill(a) || void 0;
                e = e.append(c.from(o.createAndFill(null, l) || void 0));
                let u = s.before(s.depth - (r - 1));
                n.replace(u, s.after(-i), new m(e, 4 - r, 0));
                let d = -1;
                n.doc.nodesBetween(u, n.doc.content.size, (e, t) => {
                    if (d > -1) return !1;
                    e.isTextblock && e.content.size === 0 && (d = t + 1)
                }), d > -1 && n.setSelection(j.near(n.doc.resolve(d))), n.scrollIntoView()
            }
            return !0
        }
        let p = l.pos === s.end() ? d.contentMatchAt(0).defaultType : null,
            h = { ...Ym(f, d.type.name, d.attrs),
                ...t
            },
            g = { ...Ym(f, s.node().type.name, s.node().attrs),
                ...t
            };
        n.delete(s.pos, l.pos);
        let ee = p ? [{
            type: o,
            attrs: h
        }, {
            type: p,
            attrs: g
        }] : [{
            type: o,
            attrs: h
        }];
        if (!qt(n.doc, s.pos, 2)) return !1;
        if (i) {
            let {
                selection: e,
                storedMarks: t
            } = r, {
                splittableMarks: o
            } = a.extensionManager, c = t || e.$to.parentOffset && e.$from.marks();
            if (n.split(s.pos, 2, ee).scrollIntoView(), !c || !i) return !0;
            let l = c.filter(e => o.includes(e.type.name));
            n.ensureMarks(l)
        }
        return !0
    };

function yh(e) {
    return !e || e === `1` ? null : e
}

function bh(e, t) {
    return yh(e) === yh(t)
}
var xh = (e, t) => {
        let n = _m(e => e.type === t)(e.selection);
        if (!n) return !0;
        let r = e.doc.resolve(Math.max(0, n.pos - 1)).before(n.depth);
        if (r === void 0) return !0;
        let i = e.doc.nodeAt(r);
        return !(n.node.type === i ?.type && Yt(e.doc, n.pos)) || !bh(n.node.attrs.type, i ?.attrs.type) || e.join(n.pos), !0
    },
    Sh = (e, t) => {
        let n = _m(e => e.type === t)(e.selection);
        if (!n) return !0;
        let r = e.doc.resolve(n.start).after(n.depth);
        if (r === void 0) return !0;
        let i = e.doc.nodeAt(r);
        return !(n.node.type === i ?.type && Yt(e.doc, r)) || !bh(n.node.attrs.type, i ?.attrs.type) || e.join(r), !0
    };

function Ch(e) {
    let t = e.doc,
        n = t.firstChild;
    if (!n) return null;
    let r = t.resolve(1),
        i = t.resolve(n.nodeSize - 1);
    return j.between(r, i)
}
var wh = (e, t, n, r = {}) => ({
        editor: i,
        tr: a,
        state: o,
        dispatch: s,
        chain: c,
        commands: l,
        can: u
    }) => {
        let {
            extensions: d,
            splittableMarks: f
        } = i.extensionManager, p = Z(e, o.schema), m = Z(t, o.schema), {
            selection: h,
            storedMarks: g
        } = o, {
            $from: ee,
            $to: te
        } = h, _ = ee.blockRange(te), ne = g || h.$to.parentOffset && h.$from.marks();
        if (!_) return !1;
        let v = _m(e => nh(e.type.name, d))(h),
            re = h.from === 0 && h.to === o.doc.content.size,
            ie = o.doc.content.content,
            ae = ie.length === 1 ? ie[0] : null,
            oe = re && ae && nh(ae.type.name, d) ? {
                node: ae,
                pos: 0,
                depth: 0
            } : null,
            se = v ?? oe,
            ce = !!v && _.depth >= 1 && _.depth - v.depth <= 1,
            le = !!oe;
        if ((ce || le) && se) {
            if (se.node.type === p) return re && le ? c().command(({
                tr: e,
                dispatch: t
            }) => {
                let n = Ch(e);
                return n ? (e.setSelection(n), t && t(e), !0) : !1
            }).liftListItem(m).run() : l.liftListItem(m);
            if (nh(se.node.type.name, d) && p.validContent(se.node.content)) return c().command(() => (a.setNodeMarkup(se.pos, p), !0)).command(() => xh(a, p)).command(() => Sh(a, p)).run()
        }
        return !n || !ne || !s ? c().command(() => u().wrapInList(p, r) ? !0 : l.clearNodes()).wrapInList(p, r).command(() => xh(a, p)).command(() => Sh(a, p)).run() : c().command(() => {
            let e = u().wrapInList(p, r),
                t = ne.filter(e => f.includes(e.type.name));
            return a.ensureMarks(t), e ? !0 : l.clearNodes()
        }).wrapInList(p, r).command(() => xh(a, p)).command(() => Sh(a, p)).run()
    },
    Th = (e, t = {}, n = {}) => ({
        state: r,
        commands: i
    }) => {
        let {
            extendEmptyMarkRange: a = !1
        } = n, o = vp(e, r.schema);
        return Zm(r, o, t) ? i.unsetMark(o, {
            extendEmptyMarkRange: a
        }) : i.setMark(o, t)
    },
    Eh = (e, t, n = {}) => ({
        state: r,
        commands: i
    }) => {
        let a = Z(e, r.schema),
            o = Z(t, r.schema),
            s = Xp(r, a, n),
            c;
        return r.selection.$anchor.sameParent(r.selection.$head) && (c = r.selection.$anchor.parent.attrs), s ? i.setNode(o, c) : i.setNode(a, { ...c,
            ...n
        })
    },
    Dh = (e, t = {}) => ({
        state: n,
        commands: r
    }) => {
        let i = Z(e, n.schema);
        return Xp(n, i, t) ? r.lift(i) : r.wrapIn(i, t)
    },
    Oh = () => ({
        state: e,
        dispatch: t
    }) => {
        let n = e.plugins;
        for (let r = 0; r < n.length; r += 1) {
            let i = n[r],
                a;
            if (i.spec.isInputRules && (a = i.getState(e))) {
                if (t) {
                    let t = e.tr,
                        n = a.transform;
                    for (let e = n.steps.length - 1; e >= 0; --e) t.step(n.steps[e].invert(n.docs[e]));
                    if (a.text) {
                        let n = t.doc.resolve(a.from).marks();
                        t.replaceWith(a.from, a.to, e.schema.text(a.text, n))
                    } else t.delete(a.from, a.to)
                }
                return !0
            }
        }
        return !1
    },
    kh = (e = {}) => ({
        tr: t,
        dispatch: n,
        editor: r
    }) => {
        let {
            ignoreClearable: i = !1
        } = e, {
            selection: a
        } = t, {
            empty: o,
            ranges: s
        } = a;
        if (o) return !0;
        let {
            nonClearableMarks: c
        } = r.extensionManager;
        if (n) {
            let e = Object.values(r.schema.marks).filter(e => i || !c.includes(e.name));
            s.forEach(n => {
                for (let r of e) t.removeMark(n.$from.pos, n.$to.pos, r)
            })
        }
        return !0
    },
    Ah = (e, t = {}) => ({
        tr: n,
        state: r,
        dispatch: i
    }) => {
        let {
            extendEmptyMarkRange: a = !1
        } = t, {
            selection: o
        } = n, s = vp(e, r.schema), {
            $from: c,
            empty: l,
            ranges: u
        } = o;
        if (!i) return !0;
        if (l && a) {
            let {
                from: e,
                to: t
            } = o, r = _p(c, s, c.marks().find(e => e.type === s) ?.attrs);
            r && (e = r.from, t = r.to), n.removeMark(e, t, s)
        } else u.forEach(e => {
            n.removeMark(e.$from.pos, e.$to.pos, s)
        });
        return n.removeStoredMark(s), !0
    },
    jh = e => ({
        tr: t,
        state: n,
        dispatch: r
    }) => {
        let {
            selection: i
        } = n, a, o;
        return typeof e == `number` ? (a = e, o = e) : e && `from` in e && `to` in e ? (a = e.from, o = e.to) : (a = i.from, o = i.to), r && t.doc.nodesBetween(a, o, (e, n) => {
            if (e.isText) return;
            let r = { ...e.attrs
            };
            delete r.dir, t.setNodeMarkup(n, void 0, r)
        }), !0
    },
    Mh = (e, t = {}) => ({
        tr: n,
        state: r,
        dispatch: i
    }) => {
        let a = null,
            o = null,
            s = tm(typeof e == `string` ? e : e.name, r.schema);
        if (!s) return !1;
        s === `node` && (a = Z(e, r.schema)), s === `mark` && (o = vp(e, r.schema));
        let c = !1;
        return n.selection.ranges.forEach(e => {
            let s = e.$from.pos,
                l = e.$to.pos,
                u, d, f, p;
            n.selection.empty ? r.doc.nodesBetween(s, l, (e, t) => {
                a && a === e.type && (c = !0, f = Math.max(t, s), p = Math.min(t + e.nodeSize, l), u = t, d = e)
            }) : r.doc.nodesBetween(s, l, (e, r) => {
                r < s && a && a === e.type && (c = !0, f = Math.max(r, s), p = Math.min(r + e.nodeSize, l), u = r, d = e), r >= s && r <= l && (a && a === e.type && (c = !0, i && n.setNodeMarkup(r, void 0, { ...e.attrs,
                    ...t
                })), o && e.marks.length && e.marks.forEach(a => {
                    if (o === a.type && (c = !0, i)) {
                        let i = Math.max(r, s),
                            c = Math.min(r + e.nodeSize, l);
                        n.addMark(i, c, o.create({ ...a.attrs,
                            ...t
                        }))
                    }
                }))
            }), d && (u !== void 0 && i && n.setNodeMarkup(u, void 0, { ...d.attrs,
                ...t
            }), o && d.marks.length && d.marks.forEach(e => {
                o === e.type && i && n.addMark(f, p, o.create({ ...e.attrs,
                    ...t
                }))
            }))
        }), c
    },
    Nh = new po(`__tiptap_decorations__`),
    Ph = e => ({
        tr: t,
        dispatch: n
    }) => (n && t.setMeta(Nh, {
        type: `force`,
        name: e
    }), !0),
    Fh = (e, t = {}) => ({
        state: n,
        dispatch: r
    }) => Wo(Z(e, n.schema), t)(n, r),
    Ih = (e, t = {}) => ({
        state: n,
        dispatch: r
    }) => vc(Z(e, n.schema), t)(n, r),
    Lh = t({
        blur: () => Qf,
        clearContent: () => $f,
        clearNodes: () => ep,
        command: () => tp,
        createParagraphNear: () => np,
        cut: () => rp,
        deleteCurrentNode: () => ip,
        deleteNode: () => ap,
        deleteRange: () => op,
        deleteSelection: () => up,
        enter: () => dp,
        exitCode: () => fp,
        extendMarkRange: () => yp,
        first: () => bp,
        focus: () => Dp,
        forEach: () => Op,
        insertContent: () => kp,
        insertContentAt: () => Ip,
        insertDefaultBlock: () => Rp,
        joinBackward: () => Vp,
        joinDown: () => Bp,
        joinForward: () => Hp,
        joinItemBackward: () => Up,
        joinItemForward: () => Wp,
        joinTextblockBackward: () => Gp,
        joinTextblockForward: () => Kp,
        joinUp: () => zp,
        keyboardShortcut: () => Yp,
        lift: () => Zp,
        liftEmptyBlock: () => Qp,
        liftListItem: () => $p,
        newlineInCode: () => em,
        resetAttributes: () => rm,
        scrollIntoView: () => im,
        selectAll: () => am,
        selectNodeBackward: () => om,
        selectNodeForward: () => sm,
        selectParentNode: () => cm,
        selectTextblockEnd: () => lm,
        selectTextblockStart: () => um,
        setContent: () => fm,
        setMark: () => lh,
        setMeta: () => uh,
        setNode: () => dh,
        setNodeSelection: () => fh,
        setTextDirection: () => ph,
        setTextSelection: () => mh,
        sinkListItem: () => hh,
        splitBlock: () => _h,
        splitListItem: () => vh,
        toggleList: () => wh,
        toggleMark: () => Th,
        toggleNode: () => Eh,
        toggleWrap: () => Dh,
        undoInputRule: () => Oh,
        unsetAllMarks: () => kh,
        unsetMark: () => Ah,
        unsetTextDirection: () => jh,
        updateAttributes: () => Mh,
        updateDecorations: () => Ph,
        wrapIn: () => Fh,
        wrapInList: () => Ih
    }),
    Rh = new WeakMap;

function zh(e, t) {
    Rh.set(e, (Rh.get(e) ?? 0) + 1);
    try {
        return t()
    } finally {
        let t = (Rh.get(e) ?? 1) - 1;
        t > 0 ? Rh.set(e, t) : Rh.delete(e)
    }
}

function Bh(e) {
    return Rh.has(e)
}
var Vh = class {
        constructor() {
            this.callbacks = {}
        }
        on(e, t) {
            return this.callbacks[e] || (this.callbacks[e] = []), this.callbacks[e].push(t), this
        }
        emit(e, ...t) {
            let n = this.callbacks[e];
            return n && n.forEach(e => e.apply(this, t)), this
        }
        off(e, t) {
            let n = this.callbacks[e];
            return n && (t ? this.callbacks[e] = n.filter(e => e !== t) : delete this.callbacks[e]), this
        }
        once(e, t) {
            let n = (...r) => {
                this.off(e, n), t.apply(this, r)
            };
            return this.on(e, n)
        }
        removeAllListeners() {
            this.callbacks = {}
        }
    },
    Hh = typeof process < `u` && !1;

function Uh(e) {
    return e.kind === `widget`
}

function Wh(e, t) {
    let n = [],
        r = new Set;
    for (let i of e) i.kind === `widget` && Uh(i) && r.add(i.key), n.push(i.toPMDecoration(t));
    return {
        decorations: n,
        widgetKeys: r
    }
}

function Gh(e, t, n) {
    let {
        decorations: r,
        widgetKeys: i
    } = Wh(t, n);
    return {
        set: J.create(e, r),
        widgetKeys: i
    }
}

function Kh({
    position: e,
    from: t,
    to: n,
    docSize: r
}) {
    return e < t ? !1 : e < n ? !0 : e === n && n === r
}

function qh({
    decorations: e,
    from: t,
    to: n,
    docSize: r,
    extensionName: i,
    warnedExtensions: a
}) {
    return e.filter(e => Kh({
        position: e.anchor,
        from: t,
        to: n,
        docSize: r
    }) ? !0 : (e.anchor === n || a.has(i) || (a.add(i), console.warn(`[tiptap warn]: Extension "${i}" returned a decoration outside the requested range [${t}, ${n}). It was ignored.`)), !1))
}

function Jh(e) {
    let t = e.spec ?.key;
    return typeof t == `string` ? t : void 0
}

function Yh(e) {
    let t = new Map,
        n = new Map;
    for (let r of e.find()) {
        let e = Jh(r);
        if (!e) continue;
        let i = r.spec.extensionName ?? `unknown`,
            a = t.get(e) ?? new Set;
        a.add(i), t.set(e, a), n.set(e, (n.get(e) ?? 0) + 1)
    }
    return Array.from(t, ([e, t]) => ({
        key: e,
        extensions: t
    })).filter(({
        key: e
    }) => (n.get(e) ?? 0) > 1)
}

function Xh(e) {
    return e.jsonID === `attr`
}

function Zh(e) {
    let t = !1;
    if (e.getMap().forEach(() => {
            t = !0
        }), t || Xh(e)) return !0;
    let n = e;
    return typeof n.from == `number` && typeof n.to == `number`
}

function Qh(e, t) {
    let n = null,
        r = 0,
        i = 0;
    for (let a = 0; a < e.childCount && !(i > t.to); a += 1) {
        let o = i + e.child(a).nodeSize;
        o >= t.from && (n === null && (n = i), r = o), i = o
    }
    return n === null ? null : {
        from: n,
        to: r
    }
}

function $h(e, t) {
    if (e.steps.some(e => !Zh(e))) return {
        type: `full`
    };
    let n = Wm(e).map(({
        newRange: e
    }) => e);
    e.steps.forEach((t, r) => {
        if (!Xh(t)) return;
        let i = e.mapping.slice(r);
        n.push({
            from: i.map(t.pos, -1),
            to: i.map(t.pos + 1)
        })
    });
    let r = [];
    for (let e of n) {
        let n = Qh(t, e);
        n && r.push(n)
    }
    r.sort((e, t) => e.from - t.from);
    let i = [];
    for (let e of r) {
        let t = i[i.length - 1];
        t && e.from <= t.to ? t.to = Math.max(t.to, e.to) : i.push({ ...e
        })
    }
    return {
        type: `ranges`,
        ranges: i
    }
}

function eg(e, t, n, r) {
    return e.map(t, n, {
        onRemove: e => {
            let t = e ?.key;
            typeof t == `string` && r.delete(t)
        }
    })
}

function tg(e, t, n) {
    let r = t.decorationSetsByExtension[e] ?? J.empty,
        i = new Set(t.widgetKeysByExtension[e] ?? []);
    return {
        set: eg(r, n.mapping, n.doc, i),
        widgetKeys: i
    }
}

function ng(e, t) {
    let n = Object.values(t).flatMap(e => e.find());
    return J.create(e, n)
}

function rg(e) {
    let t = new Set;
    for (let n of Object.values(e))
        for (let e of n) t.add(e);
    return t
}

function ig(e, t) {
    switch (t.update ?? `document`) {
        case `document`:
            if (t.createInRange) throw Error(`[tiptap error]: Extension "${e}" provides createInRange() but does not use the "changedRanges" decoration update strategy.`);
            return;
        case `changedRanges`:
            if (!t.createInRange) throw Error(`[tiptap error]: Extension "${e}" uses the "changedRanges" decoration update strategy but does not provide createInRange().`);
            return;
        case `manual`:
            if (t.createInRange) throw Error(`[tiptap error]: Extension "${e}" uses the "manual" decoration update strategy, which is not compatible with createInRange(). createInRange() requires the "changedRanges" strategy.`);
            if (t.shouldUpdate) throw Error(`[tiptap error]: Extension "${e}" cannot combine the "manual" decoration update strategy with shouldUpdate().`);
            return;
        default:
            throw Error(`[tiptap error]: Extension "${e}" uses an unknown decoration update strategy. Expected "document", "changedRanges", or "manual".`)
    }
}

function ag(e, t, n) {
    return n ? !0 : e.update === `manual` ? !1 : e.shouldUpdate ? e.shouldUpdate(t) : t.tr.docChanged
}
var og = new Set,
    sg = class {
        constructor(e) {
            this.warnedWidgetKeys = new Set, this.warnedOutOfRangeExtensions = new Set, this.handleBeforeTransaction = ({
                nextState: e
            }) => {
                let t = Nh.getState(e);
                t && this.warnDuplicateWidgetKeys(t)
            }, this.editor = e.editor, this.entries = this.resolveEntries(e.entries), this.entries.forEach(({
                name: e,
                spec: t
            }) => ig(e, t)), this.plugin = this.entries.length > 0 ? this.createPlugin() : null, this.editor.on(`beforeTransaction`, this.handleBeforeTransaction)
        }
        destroy() {
            this.editor.off(`beforeTransaction`, this.handleBeforeTransaction)
        }
        liveWidgetKeys() {
            return Nh.getState(this.editor.state) ?.widgetKeys ?? og
        }
        get mountedView() {
            return this.editor.isDestroyed ? null : this.editor.view
        }
        resolveEntries(e) {
            let t = [];
            for (let {
                    name: n,
                    addDecorations: r
                } of e) {
                let e = r();
                e && t.push({
                    name: n,
                    spec: e
                })
            }
            return t
        }
        createPlugin() {
            let {
                editor: e,
                entries: t
            } = this;
            return new N({
                key: Nh,
                state: {
                    init: (e, n) => {
                        let r = {},
                            i = {};
                        for (let {
                                name: e,
                                spec: a
                            } of t) {
                            let {
                                set: t,
                                widgetKeys: o
                            } = this.buildFullSet(e, a, n);
                            r[e] = t, i[e] = o
                        }
                        let a = {
                            decorationSetsByExtension: r,
                            widgetKeysByExtension: i,
                            mergedDecorationSet: this.buildMergedSet(n.doc, r),
                            widgetKeys: rg(i)
                        };
                        return this.warnDuplicateWidgetKeys(a), a
                    },
                    apply: (n, r, i, a) => {
                        let o = n.getMeta(Nh),
                            s = o ?.type === `force` && !o.name,
                            c = o ?.type === `force` ? o.name : void 0,
                            l = {},
                            u = {},
                            d = new Set;
                        return zh(e, () => {
                            for (let {
                                    name: o,
                                    spec: f
                                } of t) {
                                let t = s || c === o;
                                if (ag(f, {
                                        editor: e,
                                        tr: n,
                                        oldState: i,
                                        newState: a
                                    }, t))
                                    if (f.update === `changedRanges` && n.docChanged && !t) {
                                        let e = this.applyChangedRangesRecompute(o, f, r, n, a);
                                        l[o] = e.set, u[o] = e.widgetKeys, d.add(o)
                                    } else {
                                        let {
                                            set: e,
                                            widgetKeys: t
                                        } = this.buildFullSet(o, f, a);
                                        l[o] = e, u[o] = t, d.add(o)
                                    }
                                else {
                                    let e = tg(o, r, n);
                                    l[o] = e.set, u[o] = e.widgetKeys
                                }
                            }
                        }), d.size === 0 && !n.docChanged ? r : {
                            decorationSetsByExtension: l,
                            widgetKeysByExtension: u,
                            mergedDecorationSet: this.mergeAfterApply({
                                entries: t,
                                previous: r,
                                tr: n,
                                decorationSetsByExtension: l,
                                recomputedNames: d
                            }),
                            widgetKeys: rg(u)
                        }
                    }
                },
                props: {
                    decorations(e) {
                        return Nh.getState(e) ?.mergedDecorationSet ?? J.empty
                    }
                }
            })
        }
        applyChangedRangesRecompute(e, t, n, r, i) {
            let a = $h(r, i.doc);
            return a.type === `full` ? this.buildFullSet(e, t, i) : this.rebuildRanges(e, t, n, r, i, a.ranges)
        }
        rebuildRanges(e, t, n, r, i, a) {
            let o = n.decorationSetsByExtension[e] ?? J.empty,
                s = new Set(n.widgetKeysByExtension[e] ?? []),
                c = eg(o, r.mapping, r.doc, s),
                l = i.doc.content.size;
            for (let {
                    from: n,
                    to: r
                } of a) {
                let a = c.find(n, r).filter(e => Kh({
                    position: e.from,
                    from: n,
                    to: r,
                    docSize: l
                }));
                for (let e of a) {
                    let t = Jh(e);
                    t && s.delete(t)
                }
                c = c.remove(a);
                let {
                    decorations: o,
                    widgetKeys: u
                } = Wh(qh({
                    decorations: this.runCreate(e, `createInRange`, () => t.createInRange({
                        editor: this.editor,
                        state: i,
                        view: this.mountedView,
                        from: n,
                        to: r
                    })),
                    from: n,
                    to: r,
                    docSize: l,
                    extensionName: e,
                    warnedExtensions: this.warnedOutOfRangeExtensions
                }), e);
                c = c.add(i.doc, o);
                for (let e of u) s.add(e)
            }
            return {
                set: c,
                widgetKeys: s
            }
        }
        buildFullSet(e, t, n) {
            let r = this.runCreate(e, `create`, () => t.create({
                editor: this.editor,
                state: n,
                view: this.mountedView
            }));
            return Gh(n.doc, r, e)
        }
        runCreate(e, t, n) {
            try {
                return n()
            } catch (n) {
                return console.error(`[tiptap error]: Extension "${e}" threw in \`addDecorations().${t}()\`. Its decorations were dropped for this update.`, n), []
            }
        }
        warnDuplicateWidgetKeys(e) {
            if (!Hh) return;
            if (e.widgetKeys.size === 0) {
                this.warnedWidgetKeys.clear();
                return
            }
            let t = Yh(e.mergedDecorationSet),
                n = new Set(t.map(({
                    key: e
                }) => e));
            for (let {
                    key: e,
                    extensions: n
                } of t) {
                if (this.warnedWidgetKeys.has(e)) continue;
                let t = Array.from(n).map(e => `"${e}"`).join(`, `);
                console.warn(`[tiptap warn]: Duplicate widget decoration key "${e}" in extension${n.size===1?``:`s`} ${t}. Widget decoration keys must be globally unique, otherwise ProseMirror misplaces the widget DOM. Use a stable, unique key (e.g. \`comment-\${id}\`).`)
            }
            this.warnedWidgetKeys = n
        }
        buildMergedSet(e, t) {
            let n = Object.keys(t);
            return n.length === 1 ? t[n[0]] : ng(e, t)
        }
        mergeAfterApply({
            entries: e,
            previous: t,
            tr: n,
            decorationSetsByExtension: r,
            recomputedNames: i
        }) {
            return e.length === 1 ? r[e[0].name] : i.size === 0 ? t.mergedDecorationSet.map(n.mapping, n.doc) : ng(n.doc, r)
        }
    };

function cg(e, t) {
    let {
        selection: n
    } = e, {
        $from: r
    } = n;
    if (n instanceof M) {
        let e = r.index();
        return r.parent.canReplaceWith(e, e + 1, t)
    }
    let i = r.depth;
    for (; i >= 0;) {
        let e = r.index(i);
        if (r.node(i).contentMatchAt(e).matchType(t)) return !0;
        --i
    }
    return !1
}

function lg(e, t, n) {
    let r = document.querySelector(`style[data-tiptap-style${n?`-${n}`:``}]`);
    if (r !== null) return r;
    let i = document.createElement(`style`);
    return t && i.setAttribute(`nonce`, t), i.setAttribute(`data-tiptap-style${n?`-${n}`:``}`, ``), i.innerHTML = e, document.getElementsByTagName(`head`)[0].appendChild(i), i
}

function ug(e) {
    return typeof e == `number`
}

function dg(e) {
    return Object.prototype.toString.call(e).slice(8, -1)
}

function fg(e) {
    return dg(e) === `Object` ? e.constructor === Object && Object.getPrototypeOf(e) === Object.prototype : !1
}

function pg(e, t, n) {
    let r = e.split(`
`),
        i = [],
        a = ``,
        o = 0,
        s = t.baseIndentSize || 2;
    for (; o < r.length;) {
        let e = r[o],
            u = e.match(t.itemPattern);
        if (!u) {
            if (i.length > 0) break;
            if (e.trim() === ``) {
                o += 1, a = `${a}${e}\n`;
                continue
            } else return
        }
        let d = t.extractItemData(u),
            {
                indentLevel: f,
                mainContent: p
            } = d;
        a = `${a}${e}\n`;
        let m = [p];
        for (o += 1; o < r.length;) {
            var c;
            let e = r[o];
            if (e.trim() === ``) {
                var l;
                let t = r.slice(o + 1).findIndex(e => e.trim() !== ``);
                if (t === -1) break;
                if ((((l = r[o + 1 + t].match(/^(\s*)/)) == null || (l = l[1]) == null ? void 0 : l.length) || 0) > f) {
                    m.push(e), a = `${a}${e}\n`, o += 1;
                    continue
                } else break
            }
            if ((((c = e.match(/^(\s*)/)) == null || (c = c[1]) == null ? void 0 : c.length) || 0) > f) m.push(e), a = `${a}${e}\n`, o += 1;
            else break
        }
        let h, g = m.slice(1);
        if (g.length > 0) {
            let e = g.map(e => e.slice(f + s)).join(`
`);
            e.trim() && (h = t.customNestedParser ? t.customNestedParser(e) : n.blockTokens(e))
        }
        let ee = t.createToken(d, h);
        i.push(ee)
    }
    if (i.length !== 0) return {
        items: i,
        raw: a
    }
}

function mg(e, t, n, r) {
    if (!e || !Array.isArray(e.content)) return ``;
    let i = typeof n == `function` ? n(r) : n,
        [a, ...o] = e.content,
        s = `${i}${t.renderChildren([a])}`;
    return o && o.length > 0 && o.forEach((e, n) => {
        let r = t.renderChild ?.call(t, e, n + 1) ?? t.renderChildren([e]);
        if (r != null) {
            let n = r.split(`
`).map(e => e ? t.indent(e) : t.indent(``)).join(`
`);
            s += e.type === `paragraph` ? `\n\n${n}` : `\n${n}`
        }
    }), s
}

function hg(e, t) {
    let n = { ...e
    };
    return fg(e) && fg(t) && Object.keys(t).forEach(r => {
        fg(t[r]) && fg(e[r]) ? n[r] = hg(e[r], t[r]) : n[r] = t[r]
    }), n
}

function gg(e, t, n = {}) {
    let {
        state: r
    } = t, {
        doc: i,
        tr: a
    } = r, o = e;
    i.descendants((t, r) => {
        let i = a.mapping.map(r),
            s = a.mapping.map(r) + t.nodeSize,
            c = null;
        if (t.marks.forEach(e => {
                if (e !== o) return !1;
                c = e
            }), !c) return;
        let l = !1;
        if (Object.keys(n).forEach(e => {
                n[e] !== c.attrs[e] && (l = !0)
            }), l) {
            let t = e.type.create({ ...e.attrs,
                ...n
            });
            a.removeMark(i, s, e.type), a.addMark(i, s, t)
        }
    }), a.docChanged && t.view.dispatch(a)
}
var _g = class {
        constructor(e) {
            this.find = e.find, this.handler = e.handler, this.undoable = e.undoable ?? !0
        }
    },
    vg = (e, t) => {
        if (pp(t)) return t.exec(e);
        let n = t(e);
        if (!n) return null;
        let r = [n.text];
        return r.index = n.index, r.input = e, r.data = n.data, n.replaceWith && (n.text.includes(n.replaceWith) || console.warn(`[tiptap warn]: "inputRuleMatch.replaceWith" must be part of "inputRuleMatch.text".`), r.push(n.replaceWith)), r
    };

function yg(e) {
    let {
        editor: t,
        from: n,
        to: r,
        text: i,
        rules: a,
        plugin: o
    } = e, {
        view: s
    } = t;
    if (s.composing) return !1;
    let c = s.state.doc.resolve(n);
    if (c.parent.type.spec.code || (c.nodeBefore || c.nodeAfter) ?.marks.find(e => e.type.spec.code)) return !1;
    let l = !1,
        u = Xm(c) + i;
    return a.forEach(e => {
        if (l) return;
        let a = vg(u, e.find);
        if (!a) return;
        let d = a[0].length - i.length;
        if (d > 0) {
            let e = c.parentOffset - d;
            if (e < 0 || c.parent.textBetween(e, c.parentOffset) !== a[0].slice(0, d)) return
        }
        let f = s.state.tr,
            p = Xf({
                state: s.state,
                transaction: f
            }),
            m = {
                from: n - (a[0].length - i.length),
                to: r
            },
            {
                commands: h,
                chain: g,
                can: ee
            } = new Zf({
                editor: t,
                state: p
            });
        e.handler({
            state: p,
            range: m,
            match: a,
            commands: h,
            chain: g,
            can: ee
        }) === null || !f.steps.length || (e.undoable && f.setMeta(o, {
            transform: f,
            from: n,
            to: r,
            text: i
        }), s.dispatch(f), l = !0)
    }), l
}

function bg(e) {
    let {
        editor: t,
        rules: n
    } = e, r = new N({
        state: {
            init() {
                return null
            },
            apply(e, i, a) {
                let o = e.getMeta(r);
                if (o) return o;
                let s = e.getMeta(`applyInputRules`);
                return s && setTimeout(() => {
                    let {
                        text: e
                    } = s;
                    e = typeof e == `string` ? e : ym(c.from(e), a.schema);
                    let {
                        from: i
                    } = s;
                    yg({
                        editor: t,
                        from: i,
                        to: i + e.length,
                        text: e,
                        rules: n,
                        plugin: r
                    })
                }), e.selectionSet || e.docChanged ? null : i
            }
        },
        props: {
            handleTextInput(e, i, a, o) {
                return yg({
                    editor: t,
                    from: i,
                    to: a,
                    text: o,
                    rules: n,
                    plugin: r
                })
            },
            handleDOMEvents: {
                compositionend: e => (setTimeout(() => {
                    let {
                        $cursor: i
                    } = e.state.selection;
                    i && yg({
                        editor: t,
                        from: i.pos,
                        to: i.pos,
                        text: ``,
                        rules: n,
                        plugin: r
                    })
                }), !1)
            },
            handleKeyDown(e, i) {
                if (i.key !== `Enter`) return !1;
                let {
                    $cursor: a
                } = e.state.selection;
                return a ? yg({
                    editor: t,
                    from: a.pos,
                    to: a.pos,
                    text: `
`,
                    rules: n,
                    plugin: r
                }) : !1
            }
        },
        isInputRules: !0
    });
    return r
}
var xg = class {
        constructor(e = {}) {
            this.type = `extendable`, this.parent = null, this.child = null, this.name = ``, this.config = {
                name: this.name
            }, this.config = { ...this.config,
                ...e
            }, this.name = this.config.name
        }
        get options() {
            return { ...$(Q(this, `addOptions`, {
                    name: this.name
                }))
            }
        }
        get storage() {
            return { ...$(Q(this, `addStorage`, {
                    name: this.name,
                    options: this.options
                }))
            }
        }
        configure(e = {}) {
            let t = this.extend({ ...this.config,
                addOptions: () => hg(this.options, e)
            });
            return t.name = this.name, t.parent = this.parent, this.child = null, t
        }
        extend(e = {}) {
            let t = new this.constructor({ ...this.config,
                ...e
            });
            return t.parent = this, this.child = t, t.name = `name` in e ? e.name : t.parent.name, t
        }
    },
    Sg = class e extends xg {
        constructor(...e) {
            super(...e), this.type = `mark`
        }
        static create(t = {}) {
            return new e(typeof t == `function` ? t() : t)
        }
        static handleExit({
            editor: e,
            mark: t
        }) {
            let {
                tr: n
            } = e.state, r = e.state.selection.$from;
            if (r.pos === r.end()) {
                let i = r.marks();
                if (!i.find(e => e ?.type.name === t.name)) return !1;
                let a = i.find(e => e ?.type.name === t.name);
                return a && n.removeStoredMark(a), n.insertText(` `, r.pos), e.view.dispatch(n), !0
            }
            return !1
        }
        configure(e) {
            return super.configure(e)
        }
        extend(e) {
            let t = typeof e == `function` ? e() : e;
            return super.extend(t)
        }
    },
    Cg = class {
        constructor(e) {
            this.find = e.find, this.handler = e.handler
        }
    },
    wg = (e, t, n) => {
        if (pp(t)) return [...e.matchAll(t)];
        let r = t(e, n);
        return r ? r.map(t => {
            let n = [t.text];
            return n.index = t.index, n.input = e, n.data = t.data, t.replaceWith && (t.text.includes(t.replaceWith) || console.warn(`[tiptap warn]: "pasteRuleMatch.replaceWith" must be part of "pasteRuleMatch.text".`), n.push(t.replaceWith)), n
        }) : []
    };

function Tg(e) {
    let {
        editor: t,
        state: n,
        from: r,
        to: i,
        rule: a,
        pasteEvent: o,
        dropEvent: s
    } = e, {
        commands: c,
        chain: l,
        can: u
    } = new Zf({
        editor: t,
        state: n
    }), d = [];
    return n.doc.nodesBetween(r, i, (e, t) => {
        var f;
        if (!((f = e.type) == null || (f = f.spec) == null) && f.code || !(e.isText || e.isTextblock || e.isInline)) return;
        let p = e.content ?.size ?? e.nodeSize ?? 0,
            m = Math.max(r, t),
            h = Math.min(i, t + p);
        m >= h || wg(e.isText ? e.text || `` : e.textBetween(m - t, h - t, void 0, `￼`), a.find, o).forEach(e => {
            if (e.index === void 0) return;
            let t = m + e.index + 1,
                r = t + e[0].length,
                i = {
                    from: n.tr.mapping.map(t),
                    to: n.tr.mapping.map(r)
                },
                f = a.handler({
                    state: n,
                    range: i,
                    match: e,
                    commands: c,
                    chain: l,
                    can: u,
                    pasteEvent: o,
                    dropEvent: s
                });
            d.push(f)
        })
    }), d.every(e => e !== null)
}
var Eg = null,
    Dg = e => {
        var t;
        let n = new ClipboardEvent(`paste`, {
            clipboardData: new DataTransfer
        });
        return (t = n.clipboardData) == null || t.setData(`text/html`, e), n
    };

function Og(e) {
    let {
        editor: t,
        rules: n
    } = e, r = null, i = !1, a = !1, o = typeof ClipboardEvent < `u` ? new ClipboardEvent(`paste`) : null, s;
    try {
        s = typeof DragEvent < `u` ? new DragEvent(`drop`) : null
    } catch {
        s = null
    }
    let l = ({
        state: e,
        from: n,
        to: r,
        rule: i,
        pasteEvt: a
    }) => {
        let c = e.tr;
        if (!(!Tg({
                editor: t,
                state: Xf({
                    state: e,
                    transaction: c
                }),
                from: Math.max(n - 1, 0),
                to: r.b - 1,
                rule: i,
                pasteEvent: a,
                dropEvent: s
            }) || !c.steps.length)) {
            try {
                s = typeof DragEvent < `u` ? new DragEvent(`drop`) : null
            } catch {
                s = null
            }
            return o = typeof ClipboardEvent < `u` ? new ClipboardEvent(`paste`) : null, c
        }
    };
    return n.map(e => new N({
        view(e) {
            let n = n => {
                    r = e.dom.parentElement ?.contains(n.target) ? e.dom.parentElement : null, r && (Eg = t)
                },
                i = () => {
                    Eg &&= null
                };
            return window.addEventListener(`dragstart`, n), window.addEventListener(`dragend`, i), {
                destroy() {
                    window.removeEventListener(`dragstart`, n), window.removeEventListener(`dragend`, i)
                }
            }
        },
        props: {
            handleDOMEvents: {
                drop: (e, t) => {
                    if (a = r === e.dom.parentElement, s = t, !a) {
                        let e = Eg;
                        e ?.isEditable && setTimeout(() => {
                            let t = e.state.selection;
                            t && e.commands.deleteRange({
                                from: t.from,
                                to: t.to
                            })
                        }, 10)
                    }
                    return !1
                },
                paste: (e, t) => {
                    let n = t.clipboardData ?.getData(`text/html`);
                    return o = t, i = !!n ?.includes(`data-pm-slice`), !1
                }
            }
        },
        appendTransaction: (t, n, r) => {
            let s = t[0],
                u = s.getMeta(`uiEvent`) === `paste` && !i,
                d = s.getMeta(`uiEvent`) === `drop` && !a,
                f = s.getMeta(`applyPasteRules`),
                p = !!f;
            if (!u && !d && !p) return;
            if (p) {
                let {
                    text: t
                } = f;
                t = typeof t == `string` ? t : ym(c.from(t), r.schema);
                let {
                    from: n
                } = f, i = n + t.length, a = Dg(t);
                return l({
                    rule: e,
                    state: r,
                    from: n,
                    to: {
                        b: i
                    },
                    pasteEvt: a
                })
            }
            let m = n.doc.content.findDiffStart(r.doc.content),
                h = n.doc.content.findDiffEnd(r.doc.content);
            if (!(!ug(m) || !h || m === h.b)) return l({
                rule: e,
                state: r,
                from: m,
                to: h,
                pasteEvt: o
            })
        }
    }))
}
var kg = class {
    constructor(e, t) {
        this.splittableMarks = [], this.nonClearableMarks = [], this.decorationManager = null, this.editor = t, this.baseExtensions = e, this.extensions = Fm(e), this.schema = Mm(this.extensions, t), this.setupExtensions()
    }
    get commands() {
        return this.extensions.reduce((e, t) => {
            let n = Q(t, `addCommands`, {
                name: t.name,
                options: t.options,
                storage: this.editor.extensionStorage[t.name],
                editor: this.editor,
                type: Jm(t.name, this.schema)
            });
            return n ? { ...e,
                ...n()
            } : e
        }, {})
    }
    get plugins() {
        let {
            editor: e
        } = this, t = Pm([...this.extensions].reverse()).flatMap(t => {
            let n = {
                    name: t.name,
                    options: t.options,
                    storage: this.editor.extensionStorage[t.name],
                    editor: e,
                    type: Jm(t.name, this.schema)
                },
                r = [],
                i = Q(t, `addKeyboardShortcuts`, n),
                a = {};
            if (t.type === `mark` && Q(t, `exitable`, n) && (a.ArrowRight = () => Sg.handleExit({
                    editor: e,
                    mark: t
                })), i) {
                let t = Object.fromEntries(Object.entries(i()).map(([t, n]) => [t, () => n({
                    editor: e
                })]));
                a = { ...a,
                    ...t
                }
            }
            let o = Jf(a);
            r.push(o);
            let s = Q(t, `addInputRules`, n);
            if (th(t, e.options.enableInputRules) && s) {
                let t = s();
                if (t && t.length) {
                    let n = bg({
                            editor: e,
                            rules: t
                        }),
                        i = Array.isArray(n) ? n : [n];
                    r.push(...i)
                }
            }
            let c = Q(t, `addPasteRules`, n);
            if (th(t, e.options.enablePasteRules) && c) {
                let t = c();
                if (t && t.length) {
                    let n = Og({
                        editor: e,
                        rules: t
                    });
                    r.push(...n)
                }
            }
            let l = Q(t, `addProseMirrorPlugins`, n);
            if (l) {
                let e = l();
                r.push(...e)
            }
            return r
        }), n = this.createDecorationPlugin();
        return n && t.push(n), t
    }
    createDecorationPlugin() {
        var e;
        let {
            editor: t
        } = this;
        (e = this.decorationManager) == null || e.destroy();
        let n = [];
        return this.extensions.forEach(e => {
            let r = Q(e, `addDecorations`, {
                name: e.name,
                options: e.options,
                storage: this.editor.extensionStorage[e.name],
                editor: t,
                type: Jm(e.name, this.schema)
            });
            r && n.push({
                name: e.name,
                addDecorations: r
            })
        }), this.decorationManager = new sg({
            editor: t,
            entries: n
        }), this.decorationManager.plugin
    }
    get attributes() {
        return Cm(this.extensions)
    }
    get nodeViews() {
        let {
            editor: e
        } = this, {
            nodeExtensions: t
        } = Sm(this.extensions);
        return Object.fromEntries(t.filter(e => !!Q(e, `addNodeView`)).map(t => {
            let n = this.attributes.filter(e => e.type === t.name),
                r = Q(t, `addNodeView`, {
                    name: t.name,
                    options: t.options,
                    storage: this.editor.extensionStorage[t.name],
                    editor: e,
                    type: Z(t.name, this.schema)
                });
            if (!r) return [];
            let i = r();
            return i ? [t.name, (r, a, o, s, c) => i({
                node: r,
                view: a,
                getPos: o,
                decorations: s,
                innerDecorations: c,
                editor: e,
                extension: t,
                HTMLAttributes: Dm(r, n)
            })] : []
        }))
    }
    dispatchTransaction(e) {
        let {
            editor: t
        } = this;
        return Pm([...this.extensions].reverse()).reduceRight((e, n) => {
            let r = {
                    name: n.name,
                    options: n.options,
                    storage: this.editor.extensionStorage[n.name],
                    editor: t,
                    type: Jm(n.name, this.schema)
                },
                i = Q(n, `dispatchTransaction`, r);
            return i ? t => {
                i.call(r, {
                    transaction: t,
                    next: e
                })
            } : e
        }, e)
    }
    transformPastedHTML(e) {
        let {
            editor: t
        } = this;
        return Pm([...this.extensions]).reduce((e, n) => {
            let r = {
                    name: n.name,
                    options: n.options,
                    storage: this.editor.extensionStorage[n.name],
                    editor: t,
                    type: Jm(n.name, this.schema)
                },
                i = Q(n, `transformPastedHTML`, r);
            return i ? (t, n) => {
                let a = e(t, n);
                return i.call(r, a)
            } : e
        }, e || (e => e))
    }
    get markViews() {
        let {
            editor: e
        } = this, {
            markExtensions: t
        } = Sm(this.extensions);
        return Object.fromEntries(t.filter(e => !!Q(e, `addMarkView`)).map(t => {
            let n = this.attributes.filter(e => e.type === t.name),
                r = Q(t, `addMarkView`, {
                    name: t.name,
                    options: t.options,
                    storage: this.editor.extensionStorage[t.name],
                    editor: e,
                    type: vp(t.name, this.schema)
                });
            return r ? [t.name, (i, a, o) => {
                let s = Dm(i, n);
                return r()({
                    mark: i,
                    view: a,
                    inline: o,
                    editor: e,
                    extension: t,
                    HTMLAttributes: s,
                    updateAttributes: t => {
                        gg(i, e, t)
                    }
                })
            }] : []
        }))
    }
    destroy() {
        var e;
        (e = this.decorationManager) == null || e.destroy(), this.extensions.forEach(e => {
            let t = e;
            for (; t.parent;) {
                let e = t.parent;
                e.child === t && (e.child = null), t = e
            }
        }), this.extensions = [], this.baseExtensions = [], this.decorationManager = null, this.schema = null, this.editor = null
    }
    setupExtensions() {
        let e = this.extensions;
        this.editor.extensionStorage = Object.fromEntries(e.map(e => [e.name, e.storage])), e.forEach(e => {
            let t = {
                name: e.name,
                options: e.options,
                storage: this.editor.extensionStorage[e.name],
                editor: this.editor,
                type: Jm(e.name, this.schema)
            };
            e.type === `mark` && (($(Q(e, `keepOnSplit`, t)) ?? !0) && this.splittableMarks.push(e.name), ($(Q(e, `clearable`, t)) ?? !0) || this.nonClearableMarks.push(e.name));
            let n = Q(e, `onBeforeCreate`, t),
                r = Q(e, `onCreate`, t),
                i = Q(e, `onUpdate`, t),
                a = Q(e, `onSelectionUpdate`, t),
                o = Q(e, `onTransaction`, t),
                s = Q(e, `onFocus`, t),
                c = Q(e, `onBlur`, t),
                l = Q(e, `onDestroy`, t);
            n && this.editor.on(`beforeCreate`, n), r && this.editor.on(`create`, r), i && this.editor.on(`update`, i), a && this.editor.on(`selectionUpdate`, a), o && this.editor.on(`transaction`, o), s && this.editor.on(`focus`, s), c && this.editor.on(`blur`, c), l && this.editor.on(`destroy`, l)
        })
    }
};
kg.resolve = Fm, kg.sort = Pm, kg.flatten = vm;
var Ag = class e extends xg {
        constructor(...e) {
            super(...e), this.type = `extension`
        }
        static create(t = {}) {
            return new e(typeof t == `function` ? t() : t)
        }
        configure(e) {
            return super.configure(e)
        }
        extend(e) {
            let t = typeof e == `function` ? e() : e;
            return super.extend(t)
        }
    },
    jg = Ag.create({
        name: `clipboardTextSerializer`,
        addOptions() {
            return {
                blockSeparator: void 0
            }
        },
        addProseMirrorPlugins() {
            return [new N({
                key: new po(`clipboardTextSerializer`),
                props: {
                    clipboardTextSerializer: () => {
                        let {
                            editor: e
                        } = this, {
                            state: t,
                            schema: n
                        } = e, {
                            doc: r,
                            selection: i
                        } = t, a = zm(n), {
                            blockSeparator: o
                        } = this.options, s = { ...o === void 0 ? {} : {
                                blockSeparator: o
                            },
                            textSerializers: a
                        };
                        return [...i.ranges].sort((e, t) => e.$from.pos - t.$from.pos).map(({
                            $from: e,
                            $to: t
                        }) => Lm(r, {
                            from: e.pos,
                            to: t.pos
                        }, s)).join(o ?? `

`)
                    }
                }
            })]
        }
    }),
    Mg = Ag.create({
        name: `commands`,
        addCommands() {
            return { ...Lh
            }
        }
    }),
    Ng = Ag.create({
        name: `delete`,
        onUpdate({
            transaction: e,
            appendedTransactions: t
        }) {
            var n;
            let r = () => {
                var n, r;
                if (((n = this.editor.options.coreExtensionOptions) == null || (n = n.delete) == null || (r = n.filterTransaction) == null ? void 0 : r.call(n, e)) ?? e.getMeta(`y-sync$`)) return;
                let i = mm(e.before, [e, ...t]);
                Wm(i).forEach(t => {
                    i.mapping.mapResult(t.oldRange.from).deletedAfter && i.mapping.mapResult(t.oldRange.to).deletedBefore && i.before.nodesBetween(t.oldRange.from, t.oldRange.to, (n, r) => {
                        let a = r + n.nodeSize - 2,
                            o = t.oldRange.from <= r && a <= t.oldRange.to;
                        this.editor.emit(`delete`, {
                            type: `node`,
                            node: n,
                            from: r,
                            to: a,
                            newFrom: i.mapping.map(r),
                            newTo: i.mapping.map(a),
                            deletedRange: t.oldRange,
                            newRange: t.newRange,
                            partial: !o,
                            editor: this.editor,
                            transaction: e,
                            combinedTransform: i
                        })
                    })
                });
                let a = i.mapping;
                i.steps.forEach((t, n) => {
                    if (t instanceof Tt) {
                        let r = a.slice(n).map(t.from, -1),
                            o = a.slice(n).map(t.to),
                            s = a.invert().map(r, -1),
                            c = a.invert().map(o),
                            l = r > 0 ? i.doc.nodeAt(r - 1) ?.marks.some(e => e.eq(t.mark)) : !1,
                            u = i.doc.nodeAt(o) ?.marks.some(e => e.eq(t.mark));
                        this.editor.emit(`delete`, {
                            type: `mark`,
                            mark: t.mark,
                            from: t.from,
                            to: t.to,
                            deletedRange: {
                                from: s,
                                to: c
                            },
                            newRange: {
                                from: r,
                                to: o
                            },
                            partial: !!(u || l),
                            editor: this.editor,
                            transaction: e,
                            combinedTransform: i
                        })
                    }
                })
            };
            ((n = this.editor.options.coreExtensionOptions) == null || (n = n.delete) == null ? void 0 : n.async) ?? !0 ? setTimeout(r, 0) : r()
        }
    }),
    Pg = Ag.create({
        name: `drop`,
        addProseMirrorPlugins() {
            return [new N({
                key: new po(`tiptapDrop`),
                props: {
                    handleDrop: (e, t, n, r) => {
                        this.editor.emit(`drop`, {
                            editor: this.editor,
                            event: t,
                            slice: n,
                            moved: r
                        })
                    }
                }
            })]
        }
    }),
    Fg = Ag.create({
        name: `editable`,
        addProseMirrorPlugins() {
            return [new N({
                key: new po(`editable`),
                props: {
                    editable: () => this.editor.options.editable
                }
            })]
        }
    }),
    Ig = new po(`focusEvents`),
    Lg = Ag.create({
        name: `focusEvents`,
        addProseMirrorPlugins() {
            let {
                editor: e
            } = this;
            return [new N({
                key: Ig,
                props: {
                    handleDOMEvents: {
                        focus: (t, n) => {
                            e.isFocused = !0;
                            let r = e.state.tr.setMeta(`focus`, {
                                event: n
                            }).setMeta(`addToHistory`, !1);
                            return t.dispatch(r), !1
                        },
                        blur: (t, n) => {
                            e.isFocused = !1;
                            let r = e.state.tr.setMeta(`blur`, {
                                event: n
                            }).setMeta(`addToHistory`, !1);
                            return t.dispatch(r), !1
                        }
                    }
                }
            })]
        }
    }),
    Rg = Ag.create({
        name: `keymap`,
        addKeyboardShortcuts() {
            let e = () => this.editor.commands.first(({
                    commands: e
                }) => [() => e.undoInputRule(), () => e.command(({
                    tr: t
                }) => {
                    let {
                        selection: n,
                        doc: r
                    } = t, {
                        empty: i,
                        $anchor: a
                    } = n, {
                        pos: o,
                        parent: s
                    } = a, c = a.parent.isTextblock && o > 0 ? t.doc.resolve(o - 1) : a, l = c.parent.type.spec.isolating, u = a.pos - a.parentOffset, d = l && c.parent.childCount === 1 ? u === a.pos : A.atStart(r).from === o;
                    return !i || !s.type.isTextblock || s.textContent.length || !d || d && a.parent.type.name === `paragraph` ? !1 : e.clearNodes()
                }), () => e.deleteSelection(), () => e.joinBackward(), () => e.selectNodeBackward()]),
                t = () => this.editor.commands.first(({
                    commands: e
                }) => [() => e.deleteSelection(), () => e.deleteCurrentNode(), () => e.joinForward(), () => e.selectNodeForward()]),
                n = {
                    Enter: () => this.editor.commands.first(({
                        commands: e
                    }) => [() => e.newlineInCode(), () => e.createParagraphNear(), () => e.liftEmptyBlock(), () => e.splitBlock()]),
                    "Mod-Enter": () => this.editor.commands.exitCode(),
                    Backspace: e,
                    "Mod-Backspace": e,
                    "Shift-Backspace": e,
                    Delete: t,
                    "Mod-Delete": t,
                    "Mod-a": () => this.editor.commands.selectAll()
                },
                r = { ...n
                },
                i = { ...n,
                    "Ctrl-h": e,
                    "Alt-Backspace": e,
                    "Ctrl-d": t,
                    "Ctrl-Alt-Backspace": t,
                    "Alt-Delete": t,
                    "Alt-d": t,
                    "Ctrl-a": () => this.editor.commands.selectTextblockStart(),
                    "Ctrl-e": () => this.editor.commands.selectTextblockEnd()
                };
            return Tp() || qp() ? i : r
        },
        addProseMirrorPlugins() {
            return [new N({
                key: new po(`clearDocument`),
                appendTransaction: (e, t, n) => {
                    if (e.some(e => e.getMeta(`composition`))) return;
                    let r = e.some(e => e.docChanged) && !t.doc.eq(n.doc),
                        i = e.some(e => e.getMeta(`preventClearDocument`));
                    if (!r || i) return;
                    let {
                        empty: a,
                        from: o,
                        to: s
                    } = t.selection, c = A.atStart(t.doc).from, l = A.atEnd(t.doc).to;
                    if (a || !(o === c && s === l) || !rh(n.doc)) return;
                    let u = n.tr,
                        d = Xf({
                            state: n,
                            transaction: u
                        }),
                        {
                            commands: f
                        } = new Zf({
                            editor: this.editor,
                            state: d
                        });
                    if (f.clearNodes(), u.steps.length) return u
                }
            })]
        }
    }),
    zg = Ag.create({
        name: `paste`,
        addProseMirrorPlugins() {
            return [new N({
                key: new po(`tiptapPaste`),
                props: {
                    handlePaste: (e, t, n) => {
                        this.editor.emit(`paste`, {
                            editor: this.editor,
                            event: t,
                            slice: n
                        })
                    }
                }
            })]
        }
    }),
    Bg = Ag.create({
        name: `tabindex`,
        addOptions() {
            return {
                value: void 0
            }
        },
        addProseMirrorPlugins() {
            return [new N({
                key: new po(`tabindex`),
                props: {
                    attributes: () => !this.editor.isEditable && this.options.value === void 0 ? {} : {
                        tabindex: this.options.value ?? `0`
                    }
                }
            })]
        }
    }),
    Vg = Ag.create({
        name: `textDirection`,
        addOptions() {
            return {
                direction: void 0
            }
        },
        addGlobalAttributes() {
            if (!this.options.direction) return [];
            let {
                nodeExtensions: e
            } = Sm(this.extensions);
            return [{
                types: e.filter(e => e.name !== `text`).map(e => e.name),
                attributes: {
                    dir: {
                        default: this.options.direction,
                        parseHTML: e => {
                            let t = e.getAttribute(`dir`);
                            return t && (t === `ltr` || t === `rtl` || t === `auto`) ? t : this.options.direction
                        },
                        renderHTML: e => e.dir ? {
                            dir: e.dir
                        } : {}
                    }
                }
            }]
        },
        addProseMirrorPlugins() {
            return [new N({
                key: new po(`textDirection`),
                props: {
                    attributes: () => {
                        let e = this.options.direction;
                        return e ? {
                            dir: e
                        } : {}
                    }
                }
            })]
        }
    }),
    Hg = !1;

function Ug(e) {
    if (Hg) return;
    Hg = !0;
    let t;
    try {
        t = Ot.fromJSON(e, {
            from: 0,
            to: 0
        }).slice.content
    } catch {
        return
    }
    t instanceof c || console.warn(`[tiptap warn]: prosemirror-model is loaded more than once. Wrapping and splitting nodes will fail. Deduplicate it in your lock file, or alias it to a single copy in your bundler.`)
}
var Wg = class e {
        get name() {
            return this.node.type.name
        }
        constructor(e, t, n = !1, r = null) {
            this.currentNode = null, this.actualDepth = null, this.isBlock = n, this.resolvedPos = e, this.editor = t, this.currentNode = r
        }
        get node() {
            return this.currentNode || this.resolvedPos.node()
        }
        get element() {
            return this.editor.view.domAtPos(this.pos).node
        }
        get depth() {
            return this.actualDepth ?? this.resolvedPos.depth
        }
        get pos() {
            return this.resolvedPos.pos
        }
        get content() {
            return this.node.content
        }
        set content(e) {
            let t = this.from,
                n = this.to;
            if (this.isBlock) {
                if (this.content.size === 0) {
                    console.error(`You can’t set content on a block node. Tried to set content on ${this.name} at ${this.pos}`);
                    return
                }
                t = this.from + 1, n = this.to - 1
            }
            this.editor.commands.insertContentAt({
                from: t,
                to: n
            }, e)
        }
        get attributes() {
            return this.node.attrs
        }
        get textContent() {
            return this.node.textContent
        }
        get size() {
            return this.node.nodeSize
        }
        get from() {
            return this.isBlock ? this.pos : this.resolvedPos.start(this.resolvedPos.depth)
        }
        get range() {
            return {
                from: this.from,
                to: this.to
            }
        }
        get to() {
            return this.isBlock ? this.pos + this.size : this.resolvedPos.end(this.resolvedPos.depth) + (this.node.isText ? 0 : 1)
        }
        get parent() {
            if (this.depth === 0) return null;
            let t = this.resolvedPos.start(this.resolvedPos.depth - 1);
            return new e(this.resolvedPos.doc.resolve(t), this.editor)
        }
        get before() {
            let t = this.resolvedPos.doc.resolve(this.from - (this.isBlock ? 1 : 2));
            return t.depth !== this.depth && (t = this.resolvedPos.doc.resolve(this.from - 3)), new e(t, this.editor)
        }
        get after() {
            let t = this.resolvedPos.doc.resolve(this.to + (this.isBlock ? 2 : 1));
            return t.depth !== this.depth && (t = this.resolvedPos.doc.resolve(this.to + 3)), new e(t, this.editor)
        }
        get children() {
            let t = [];
            return this.node.content.forEach((n, r) => {
                let i = n.isBlock && !n.isTextblock,
                    a = n.isAtom && !n.isText,
                    o = n.isInline,
                    s = this.pos + r + (a ? 0 : 1);
                if (s < 0 || s > this.resolvedPos.doc.nodeSize - 2) return;
                let c = this.resolvedPos.doc.resolve(s);
                if (!i && !o && c.depth <= this.depth) return;
                let l = new e(c, this.editor, i, i || o ? n : null);
                i && (l.actualDepth = this.depth + 1), t.push(l)
            }), t
        }
        get firstChild() {
            return this.children[0] || null
        }
        get lastChild() {
            let e = this.children;
            return e[e.length - 1] || null
        }
        closest(e, t = {}) {
            let n = null,
                r = this.parent;
            for (; r && !n;) {
                if (r.node.type.name === e)
                    if (Object.keys(t).length > 0) {
                        let e = r.node.attrs,
                            n = Object.keys(t);
                        for (let r = 0; r < n.length; r += 1) {
                            let i = n[r];
                            if (e[i] !== t[i]) break
                        }
                    } else n = r;
                r = r.parent
            }
            return n
        }
        querySelector(e, t = {}) {
            return this.querySelectorAll(e, t, !0)[0] || null
        }
        querySelectorAll(e, t = {}, n = !1) {
            let r = [];
            if (!this.children || this.children.length === 0) return r;
            let i = Object.keys(t);
            return this.children.forEach(a => {
                n && r.length > 0 || (a.node.type.name === e && i.every(e => t[e] === a.node.attrs[e]) && r.push(a), !(n && r.length > 0) && (r = r.concat(a.querySelectorAll(e, t, n))))
            }), r
        }
        setAttribute(e) {
            let {
                tr: t
            } = this.editor.state;
            t.setNodeMarkup(this.from, void 0, { ...this.node.attrs,
                ...e
            }), this.editor.view.dispatch(t)
        }
    },
    Gg = `.ProseMirror {
  position: relative;
}

.ProseMirror {
  word-wrap: break-word;
  white-space: pre-wrap;
  white-space: break-spaces;
  -webkit-font-variant-ligatures: none;
  font-variant-ligatures: none;
  font-feature-settings: "liga" 0; /* the above doesn't seem to work in Edge */
}

.ProseMirror [contenteditable="false"] {
  white-space: normal;
}

.ProseMirror [contenteditable="false"] [contenteditable="true"] {
  white-space: pre-wrap;
}

.ProseMirror pre {
  white-space: pre-wrap;
}

img.ProseMirror-separator {
  display: inline !important;
  border: none !important;
  margin: 0 !important;
  width: 0 !important;
  height: 0 !important;
}

.ProseMirror-gapcursor {
  display: none;
  pointer-events: none;
  position: absolute;
  margin: 0;
}

.ProseMirror-gapcursor:after {
  content: "";
  display: block;
  position: absolute;
  top: -2px;
  width: 20px;
  border-top: 1px solid black;
  animation: ProseMirror-cursor-blink 1.1s steps(2, start) infinite;
}

@keyframes ProseMirror-cursor-blink {
  to {
    visibility: hidden;
  }
}

.ProseMirror-hideselection *::selection {
  background: transparent;
}

.ProseMirror-hideselection *::-moz-selection {
  background: transparent;
}

.ProseMirror-hideselection * {
  caret-color: transparent;
}

.ProseMirror-focused .ProseMirror-gapcursor {
  display: block;
}`,
    Kg = class extends Vh {
        constructor(e = {}) {
            super(), this.css = null, this.className = `tiptap`, this.editorView = null, this.isFocused = !1, this.destroyed = !1, this.isInitialized = !1, this.extensionStorage = {}, this.instanceId = Math.random().toString(36).slice(2, 9), this.hasWarnedStaleDecorationRead = !1, this.options = {
                element: typeof document < `u` ? document.createElement(`div`) : null,
                content: ``,
                injectCSS: !0,
                injectNonce: void 0,
                extensions: [],
                autofocus: !1,
                editable: !0,
                textDirection: void 0,
                editorProps: {},
                parseOptions: {},
                coreExtensionOptions: {},
                enableInputRules: !0,
                enablePasteRules: !0,
                enableCoreExtensions: !0,
                enableContentCheck: !1,
                emitContentError: !1,
                onBeforeCreate: () => null,
                onCreate: () => null,
                onMount: () => null,
                onUnmount: () => null,
                onUpdate: () => null,
                onSelectionUpdate: () => null,
                onTransaction: () => null,
                onFocus: () => null,
                onBlur: () => null,
                onDestroy: () => null,
                onContentError: ({
                    error: e
                }) => {
                    throw e
                },
                onPaste: () => null,
                onDrop: () => null,
                onDelete: () => null,
                enableExtensionDispatchTransaction: !0
            }, this.isCapturingTransaction = !1, this.capturedTransaction = null, this.utils = {
                getUpdatedPosition: oh,
                createMappablePosition: sh
            }, this.setOptions(e), this.createExtensionManager(), this.createCommandManager(), this.createSchema(), this.on(`beforeCreate`, this.options.onBeforeCreate), this.emit(`beforeCreate`, {
                editor: this
            }), this.on(`mount`, this.options.onMount), this.on(`unmount`, this.options.onUnmount), this.on(`contentError`, this.options.onContentError), this.on(`create`, this.options.onCreate), this.on(`update`, this.options.onUpdate), this.on(`selectionUpdate`, this.options.onSelectionUpdate), this.on(`transaction`, this.options.onTransaction), this.on(`focus`, this.options.onFocus), this.on(`blur`, this.options.onBlur), this.on(`destroy`, this.options.onDestroy), this.on(`drop`, ({
                event: e,
                slice: t,
                moved: n
            }) => this.options.onDrop(e, t, n)), this.on(`paste`, ({
                event: e,
                slice: t
            }) => this.options.onPaste(e, t)), this.on(`delete`, this.options.onDelete);
            let t = this.createDoc();
            if (!this.editorState) {
                let e = Cp(t, this.options.autofocus);
                this.editorState = co.create({
                    doc: t,
                    schema: this.schema,
                    selection: e || void 0
                })
            }
            Ug(this.schema), this.options.element && this.mount(this.options.element)
        }
        mount(e) {
            if (typeof document > `u`) throw Error(`[tiptap error]: The editor cannot be mounted because there is no 'document' defined in this environment.`);
            this.createView(e), this.emit(`mount`, {
                editor: this
            }), this.css && !document.head.contains(this.css) && document.head.appendChild(this.css), window.setTimeout(() => {
                this.isDestroyed || (this.options.autofocus !== !1 && this.options.autofocus !== null && this.commands.focus(this.options.autofocus), this.emit(`create`, {
                    editor: this
                }), this.isInitialized = !0)
            }, 0)
        }
        unmount() {
            if (this.editorView) {
                this.editorState = this.editorView.state;
                let e = this.editorView.dom;
                e ?.editor && delete e.editor, this.editorView.destroy()
            }
            if (this.editorView = null, this.isInitialized = !1, this.css && !document.querySelectorAll(`.${this.className}`).length) try {
                typeof this.css.remove == `function` ? this.css.remove() : this.css.parentNode && this.css.parentNode.removeChild(this.css)
            } catch (e) {
                console.warn(`Failed to remove CSS element:`, e)
            }
            this.css = null, this.emit(`unmount`, {
                editor: this
            })
        }
        get storage() {
            return this.extensionStorage
        }
        get commands() {
            return this.commandManager.commands
        }
        chain() {
            return this.commandManager ? this.commandManager.chain() : Zf.createFakeChain()
        }
        can() {
            return this.commandManager ? this.commandManager.can() : Zf.createFallbackCan()
        }
        injectCSS() {
            this.options.injectCSS && typeof document < `u` && (this.css = lg(Gg, this.options.injectNonce))
        }
        setOptions(e = {}) {
            this.options = { ...this.options,
                ...e
            }, !(!this.editorView || !this.state || this.isDestroyed) && (this.options.editorProps && this.view.setProps(this.options.editorProps), this.view.updateState(this.state))
        }
        setEditable(e, t = !0) {
            this.setOptions({
                editable: e
            }), t && this.emit(`update`, {
                editor: this,
                transaction: this.state.tr,
                appendedTransactions: []
            })
        }
        get isEditable() {
            return this.options.editable && this.view && this.view.editable
        }
        get view() {
            return this.editorView ? this.editorView : new Proxy({
                state: this.editorState,
                updateState: e => {
                    this.editorState = e
                },
                dispatch: e => {
                    this.dispatchTransaction(e)
                },
                composing: !1,
                dragging: null,
                editable: !0,
                isDestroyed: !1
            }, {
                get: (e, t) => {
                    if (this.editorView) return this.editorView[t];
                    if (t === `state`) return this.editorState;
                    if (t in e) return Reflect.get(e, t);
                    throw Error(`[tiptap error]: The editor view is not available. Cannot access view['${t}']. The editor may not be mounted yet.`)
                }
            })
        }
        get state() {
            return Hh && !this.hasWarnedStaleDecorationRead && Bh(this) && (this.hasWarnedStaleDecorationRead = !0, console.warn("[tiptap warn]: `editor.state` was read while decoration `create()` was running. It returns the pre-transaction document. Use the `state` argument passed to `create()` instead. Helpers like `editor.isActive()` read `editor.state` too, so pass `state` to their standalone versions instead of calling them on the editor.")), this.editorView && (this.editorState = this.view.state), this.editorState
        }
        registerPlugin(e, t) {
            let n = bm(t) ? t(e, [...this.state.plugins]) : [...this.state.plugins, e],
                r = this.state.reconfigure({
                    plugins: n
                });
            return this.view.updateState(r), r
        }
        unregisterPlugin(e) {
            if (this.isDestroyed) return;
            let t = this.state.plugins,
                n = t;
            if ([].concat(e).forEach(e => {
                    let t = typeof e == `string` ? `${e}$` : e.key;
                    n = n.filter(e => !e.key.startsWith(t))
                }), t.length === n.length) return;
            let r = this.state.reconfigure({
                plugins: n
            });
            return this.view.updateState(r), r
        }
        createExtensionManager() {
            var e, t;
            this.extensionManager = new kg([...this.options.enableCoreExtensions ? [Fg, jg.configure({
                blockSeparator: (e = this.options.coreExtensionOptions) == null || (e = e.clipboardTextSerializer) == null ? void 0 : e.blockSeparator
            }), Mg, Lg, Rg, Bg.configure({
                value: (t = this.options.coreExtensionOptions) == null || (t = t.tabindex) == null ? void 0 : t.value
            }), Pg, zg, Ng, Vg.configure({
                direction: this.options.textDirection
            })].filter(e => typeof this.options.enableCoreExtensions == `object` ? this.options.enableCoreExtensions[e.name] !== !1 : !0) : [], ...this.options.extensions].filter(e => [`extension`, `node`, `mark`].includes(e ?.type)), this)
        }
        createCommandManager() {
            this.commandManager = new Zf({
                editor: this
            })
        }
        createSchema() {
            this.schema = this.extensionManager.schema
        }
        createDoc() {
            let e;
            try {
                e = dm(this.options.content, this.schema, this.options.parseOptions, {
                    errorOnInvalidContent: this.options.enableContentCheck
                })
            } catch (e) {
                if (!(e instanceof Error) || ![`[tiptap error]: Invalid JSON content`, `[tiptap error]: Invalid HTML content`].includes(e.message)) throw e;
                let t = dm(this.options.content, this.schema, this.options.parseOptions, {
                    errorOnInvalidContent: !1
                });
                return this.editorState = co.create({
                    doc: t,
                    schema: this.schema,
                    selection: Cp(t, this.options.autofocus) || void 0
                }), this.emit(`contentError`, {
                    editor: this,
                    error: e,
                    disableCollaboration: () => {
                        `collaboration` in this.storage && typeof this.storage.collaboration == `object` && this.storage.collaboration && (this.storage.collaboration.isDisabled = !0), this.options.extensions = this.options.extensions.filter(e => e.name !== `collaboration`), this.createExtensionManager()
                    }
                }), this.editorState.doc
            }
            return e
        }
        createView(e) {
            let {
                editorProps: t,
                enableExtensionDispatchTransaction: n
            } = this.options, r = t.dispatchTransaction || this.dispatchTransaction.bind(this), i = n ? this.extensionManager.dispatchTransaction(r) : r, a = t.transformPastedHTML, o = this.extensionManager.transformPastedHTML(a);
            this.editorView = new kf(e, { ...t,
                attributes: {
                    role: `textbox`,
                    ...t ?.attributes
                },
                dispatchTransaction: i,
                transformPastedHTML: o,
                state: this.editorState,
                markViews: this.extensionManager.markViews,
                nodeViews: this.extensionManager.nodeViews
            });
            let s = this.state.reconfigure({
                plugins: this.extensionManager.plugins
            });
            this.view.updateState(s), this.prependClass(), this.injectCSS();
            let c = this.view.dom;
            c.editor = this
        }
        createNodeViews() {
            this.view.isDestroyed || this.view.setProps({
                markViews: this.extensionManager.markViews,
                nodeViews: this.extensionManager.nodeViews
            })
        }
        prependClass() {
            this.view.dom.className = `${this.className} ${this.view.dom.className}`
        }
        captureTransaction(e) {
            this.isCapturingTransaction = !0, e(), this.isCapturingTransaction = !1;
            let t = this.capturedTransaction;
            return this.capturedTransaction = null, t
        }
        dispatchTransaction(e) {
            if (this.view.isDestroyed) return;
            if (this.isCapturingTransaction) {
                if (!this.capturedTransaction) {
                    this.capturedTransaction = e;
                    return
                }
                e.steps.forEach(e => this.capturedTransaction ?.step(e));
                return
            }
            let {
                state: t,
                transactions: n
            } = this.state.applyTransaction(e), r = !this.state.selection.eq(t.selection), i = n.includes(e), a = this.state;
            if (this.emit(`beforeTransaction`, {
                    editor: this,
                    transaction: e,
                    nextState: t
                }), !i) return;
            this.view.updateState(t), this.emit(`transaction`, {
                editor: this,
                transaction: e,
                appendedTransactions: n.slice(1)
            }), r && this.emit(`selectionUpdate`, {
                editor: this,
                transaction: e
            });
            let o = n.findLast(e => e.getMeta(`focus`) || e.getMeta(`blur`)),
                s = o ?.getMeta(`focus`),
                c = o ?.getMeta(`blur`);
            s && this.emit(`focus`, {
                editor: this,
                event: s.event,
                transaction: o
            }), c && this.emit(`blur`, {
                editor: this,
                event: c.event,
                transaction: o
            }), !(e.getMeta(`preventUpdate`) || !n.some(e => e.docChanged) || a.doc.eq(t.doc)) && this.emit(`update`, {
                editor: this,
                transaction: e,
                appendedTransactions: n.slice(1)
            })
        }
        getAttributes(e) {
            return Vm(this.state, e)
        }
        isActive(e, t) {
            let n = typeof e == `string` ? e : null,
                r = typeof e == `string` ? t : e;
            return Qm(this.state, n, r)
        }
        getJSON() {
            return this.state.doc.toJSON()
        }
        getHTML() {
            return ym(this.state.doc.content, this.schema)
        }
        getText(e) {
            let {
                blockSeparator: t = `

`,
                textSerializers: n = {}
            } = e || {};
            return Rm(this.state.doc, {
                blockSeparator: t,
                textSerializers: { ...zm(this.schema),
                    ...n
                }
            })
        }
        get isEmpty() {
            return rh(this.state.doc)
        }
        destroy() {
            this.destroyed || (this.destroyed = !0, this.emit(`destroy`), this.unmount(), this.removeAllListeners(), this.extensionManager.destroy(), this.extensionManager = null, this.schema = null, this.commandManager = null, this.extensionStorage = {})
        }
        get isDestroyed() {
            return this.editorView ?.isDestroyed ?? !0
        }
        $node(e, t) {
            return this.$doc ?.querySelector(e, t) || null
        }
        $nodes(e, t) {
            return this.$doc ?.querySelectorAll(e, t) || null
        }
        $pos(e) {
            let t = this.state.doc.resolve(e),
                n = e > 0 && t.nodeAfter && !t.nodeAfter.isText && t.nodeAfter.isAtom ? t.nodeAfter : null;
            return new Wg(t, this, !1, n)
        }
        get $doc() {
            return this.$pos(0)
        }
    };

function qg(e) {
    return new _g({
        find: e.find,
        handler: ({
            state: t,
            range: n,
            match: r
        }) => {
            let i = $(e.getAttributes, void 0, r);
            if (i === !1 || i === null) return null;
            let {
                tr: a
            } = t, o = r[r.length - 1], s = r[0];
            if (o) {
                let r = s.search(/\S/),
                    c = n.from + s.indexOf(o),
                    l = c + o.length;
                if (Gm(n.from, n.to, t.doc).filter(t => t.mark.type.excluded.find(n => n === e.type && n !== t.mark.type)).filter(e => e.to > c).length) return null;
                l < n.to && a.delete(l, n.to), c > n.from && a.delete(n.from + r, c);
                let u = n.from + r + o.length;
                a.addMark(n.from + r, u, e.type.create(i || {})), a.removeStoredMark(e.type)
            }
        },
        undoable: e.undoable
    })
}

function Jg(e) {
    return new _g({
        find: e.find,
        handler: ({
            state: t,
            range: n,
            match: r
        }) => {
            let i = $(e.getAttributes, void 0, r) || {},
                {
                    tr: a
                } = t,
                o = n.from,
                s = n.to,
                c = e.type.create(i);
            if (r[1]) {
                let e = o + r[0].lastIndexOf(r[1]);
                e > s ? e = s : s = e + r[1].length;
                let t = r[0][r[0].length - 1];
                a.insertText(t, o + r[0].length - 1), a.replaceWith(e, s, c)
            } else if (r[0]) {
                let t = e.type.isInline ? o : o - 1;
                a.insert(t, e.type.create(i)).delete(a.mapping.map(o), a.mapping.map(s))
            }
            a.scrollIntoView()
        },
        undoable: e.undoable
    })
}

function Yg(e) {
    return new _g({
        find: e.find,
        handler: ({
            state: t,
            range: n,
            match: r
        }) => {
            let i = t.doc.resolve(n.from),
                a = $(e.getAttributes, void 0, r) || {};
            if (!i.node(-1).canReplaceWith(i.index(-1), i.indexAfter(-1), e.type)) return null;
            t.tr.delete(n.from, n.to).setBlockType(n.from, n.from, e.type, a)
        },
        undoable: e.undoable
    })
}

function Xg(e) {
    return new _g({
        find: e.find,
        handler: ({
            state: t,
            range: n,
            match: r,
            chain: i
        }) => {
            let a = $(e.getAttributes, void 0, r) || {},
                o = t.tr.delete(n.from, n.to),
                s = o.doc.resolve(n.from).blockRange(),
                c = s && Lt(s, e.type, a);
            if (!c) return null;
            if (o.wrap(s, c), e.keepMarks && e.editor) {
                let {
                    selection: n,
                    storedMarks: r
                } = t, {
                    splittableMarks: i
                } = e.editor.extensionManager, a = r || n.$to.parentOffset && n.$from.marks();
                if (a) {
                    let e = a.filter(e => i.includes(e.type.name));
                    o.ensureMarks(e)
                }
            }
            if (e.keepAttributes) {
                let t = e.type.name === `bulletList` || e.type.name === `orderedList` ? `listItem` : `taskList`;
                i().updateAttributes(t, a).run()
            }
            let l = o.doc.resolve(n.from - 1).nodeBefore;
            l && l.type === e.type && Yt(o.doc, n.from - 1) && (!e.joinPredicate || e.joinPredicate(r, l)) && o.join(n.from - 1)
        },
        undoable: e.undoable
    })
}
var Zg = class e extends xg {
    constructor(...e) {
        super(...e), this.type = `node`
    }
    static create(t = {}) {
        return new e(typeof t == `function` ? t() : t)
    }
    configure(e) {
        return super.configure(e)
    }
    extend(e) {
        let t = typeof e == `function` ? e() : e;
        return super.extend(t)
    }
};

function Qg(e) {
    return new Cg({
        find: e.find,
        handler: ({
            state: t,
            range: n,
            match: r,
            pasteEvent: i
        }) => {
            let a = $(e.getAttributes, void 0, r, i);
            if (a === !1 || a === null) return null;
            let {
                tr: o
            } = t, s = r[r.length - 1], c = r[0], l = n.to;
            if (s) {
                let i = c.search(/\S/),
                    u = n.from + c.indexOf(s),
                    d = u + s.length;
                if (Gm(n.from, n.to, t.doc).filter(t => t.mark.type.excluded.find(n => n === e.type && n !== t.mark.type)).filter(e => e.to > u).length) return null;
                d < n.to && o.delete(d, n.to), u > n.from && o.delete(n.from + i, u), l = n.from + i + s.length, o.addMark(n.from + i, l, e.type.create(a || {})), r.index !== void 0 && r.input !== void 0 && r.index + r[0].length >= r.input.length || o.removeStoredMark(e.type)
            }
        }
    })
}
var $g = /:([a-zA-Z0-9_+-]+):$/,
    e_ = /(^|\s):([a-zA-Z0-9_+-]+):/g;

function t_(e, t) {
    return t.find(t => e === t.name || t.shortcodes.includes(e))
}
const n_ = Zg.create({
    name: `emoji`,
    inline: !0,
    group: `inline`,
    selectable: !1,
    addOptions() {
        return {
            HTMLAttributes: {},
            emojis: []
        }
    },
    addAttributes() {
        return {
            name: {
                default: null,
                parseHTML: e => e.dataset.name,
                renderHTML: e => ({
                    "data-name": e.name
                })
            }
        }
    },
    parseHTML() {
        return [{
            tag: `span[data-type="${this.name}"]`
        }]
    },
    renderHTML({
        HTMLAttributes: e,
        node: t
    }) {
        let n = t_(t.attrs.name, this.options.emojis),
            r = Em(e, this.options.HTMLAttributes, {
                "data-type": this.name
            });
        return n ?.fallbackImage ? [`span`, r, [`img`, {
            src: n.fallbackImage,
            draggable: `false`,
            loading: `lazy`,
            align: `absmiddle`,
            alt: `${n.name} emoji`
        }]] : [`span`, r, `:${t.attrs.name}:`]
    },
    renderText({
        node: e
    }) {
        return `:${e.attrs.name}:`
    },
    addCommands() {
        return {
            setEmoji: e => ({
                chain: t
            }) => {
                let n = t_(e, this.options.emojis);
                return n ? t().insertContent({
                    type: this.name,
                    attrs: {
                        name: n.name
                    }
                }).command(({
                    tr: e,
                    state: t
                }) => (e.setStoredMarks(t.doc.resolve(t.selection.to - 1).marks()), !0)).run() : !1
            }
        }
    },
    addInputRules() {
        return [new _g({
            find: $g,
            handler: ({
                range: e,
                match: t,
                chain: n
            }) => {
                let r = t[1];
                t_(r, this.options.emojis) && n().insertContentAt(e, {
                    type: this.name,
                    attrs: {
                        name: r
                    }
                }).command(({
                    tr: e,
                    state: t
                }) => (e.setStoredMarks(t.doc.resolve(t.selection.to - 1).marks()), !0)).run()
            }
        })]
    },
    addPasteRules() {
        return [new Cg({
            find: e_,
            handler: ({
                range: e,
                match: t,
                chain: n
            }) => {
                let r = t[1] || ``,
                    i = t[2];
                if (!t_(i, this.options.emojis)) return;
                let a = e.from + r.length,
                    o = e.to;
                n().insertContentAt({
                    from: a,
                    to: o
                }, {
                    type: this.name,
                    attrs: {
                        name: i
                    }
                }, {
                    updateSelection: !1
                }).command(({
                    tr: e,
                    state: t
                }) => (e.setStoredMarks(t.doc.resolve(t.selection.to - 1).marks()), !0)).run()
            }
        })]
    }
});
var r_ = new WeakSet,
    i_ = new WeakSet;

function a_(e) {
    let t = e;
    return r_.add(t), t
}

function o_(e) {
    return Array.isArray(e) && r_.has(e)
}

function s_(e) {
    return e.flatMap(e => e == null ? [] : Array.isArray(e) && i_.has(e) && !o_(e) ? s_(e) : [e])
}

function c_(e, t) {
    if (e === `slot`) return 0;
    if (e instanceof Function) {
        let n = e(t);
        return Array.isArray(n) && !o_(n) && !i_.has(n) ? a_(n) : n
    }
    let {
        children: n,
        ...r
    } = t ?? {};
    if (e === `svg`) throw Error(`SVG elements are not supported in the JSX syntax, use the array syntax instead`);
    if (Array.isArray(n)) {
        if (o_(n)) return a_([e, r, n]);
        if (n.length === 0) return a_([e, r]);
        let t = s_(n);
        return t.length === 0 ? a_([e, r]) : a_([e, r, ...t])
    }
    return a_(n == null ? [e, r] : [e, r, n])
}
var l_ = (e, t) => c_(e, t),
    u_ = /(?:^|\s)(\*\*(?!\s+\*\*)((?:[^*]+))\*\*(?!\s+\*\*))$/,
    d_ = /(?:^|\s)(\*\*(?!\s+\*\*)((?:[^*]+))\*\*(?!\s+\*\*))/g,
    f_ = /(?:^|\s)(__(?!\s+__)((?:[^_]+))__(?!\s+__))$/,
    p_ = /(?:^|\s)(__(?!\s+__)((?:[^_]+))__(?!\s+__))/g,
    m_ = Sg.create({
        name: `bold`,
        addOptions() {
            return {
                HTMLAttributes: {}
            }
        },
        parseHTML() {
            return [{
                tag: `strong`
            }, {
                tag: `b`,
                getAttrs: e => e.style.fontWeight !== `normal` && null
            }, {
                style: `font-weight=400`,
                clearMark: e => e.type.name === this.name
            }, {
                style: `font-weight`,
                getAttrs: e => /^(bold(er)?|[5-9]\d{2,})$/.test(e) && null
            }]
        },
        renderHTML({
            HTMLAttributes: e
        }) {
            return l_(`strong`, { ...Em(this.options.HTMLAttributes, e),
                children: l_(`slot`, {})
            })
        },
        markdownTokenName: `strong`,
        parseMarkdown: (e, t) => t.applyMark(`bold`, t.parseInline(e.tokens || [])),
        markdownOptions: {
            htmlReopen: {
                open: `<strong>`,
                close: `</strong>`
            }
        },
        renderMarkdown: (e, t) => `**${t.renderChildren(e)}**`,
        addCommands() {
            return {
                setBold: () => ({
                    commands: e
                }) => e.setMark(this.name),
                toggleBold: () => ({
                    commands: e
                }) => e.toggleMark(this.name),
                unsetBold: () => ({
                    commands: e
                }) => e.unsetMark(this.name)
            }
        },
        addKeyboardShortcuts() {
            return {
                "Mod-b": () => this.editor.commands.toggleBold(),
                "Mod-B": () => this.editor.commands.toggleBold()
            }
        },
        addInputRules() {
            return [qg({
                find: u_,
                type: this.type
            }), qg({
                find: f_,
                type: this.type
            })]
        },
        addPasteRules() {
            return [Qg({
                find: d_,
                type: this.type
            }), Qg({
                find: p_,
                type: this.type
            })]
        }
    }),
    h_ = m_,
    g_ = Zg.create({
        name: `doc`,
        topNode: !0,
        content: `block+`,
        renderMarkdown: (e, t) => e.content ? t.renderChildren(e.content, `

`) : ``
    }),
    __ = Zg.create({
        name: `hardBreak`,
        markdownTokenName: `br`,
        addOptions() {
            return {
                keepMarks: !0,
                HTMLAttributes: {}
            }
        },
        inline: !0,
        group: `inline`,
        selectable: !1,
        linebreakReplacement: !0,
        parseHTML() {
            return [{
                tag: `br`
            }]
        },
        renderHTML({
            HTMLAttributes: e
        }) {
            return [`br`, Em(this.options.HTMLAttributes, e)]
        },
        renderText() {
            return `
`
        },
        renderMarkdown: () => `  
`,
        parseMarkdown: () => ({
            type: `hardBreak`
        }),
        addCommands() {
            return {
                setHardBreak: () => ({
                    commands: e,
                    chain: t,
                    state: n,
                    editor: r
                }) => e.first([() => e.exitCode(), () => e.command(() => {
                    let {
                        selection: e,
                        storedMarks: i
                    } = n;
                    if (e.$from.parent.type.spec.isolating) return !1;
                    let {
                        keepMarks: a
                    } = this.options, {
                        splittableMarks: o
                    } = r.extensionManager, s = i || e.$to.parentOffset && e.$from.marks();
                    return t().insertContent({
                        type: this.name
                    }).command(({
                        tr: e,
                        dispatch: t
                    }) => {
                        if (t && s && a) {
                            let t = s.filter(e => o.includes(e.type.name));
                            e.ensureMarks(t)
                        }
                        return !0
                    }).scrollIntoView().run()
                })])
            }
        },
        addKeyboardShortcuts() {
            return {
                "Mod-Enter": () => this.editor.commands.setHardBreak(),
                "Shift-Enter": () => this.editor.commands.setHardBreak()
            }
        }
    }),
    v_ = `&nbsp;`,
    y_ = `\xA0`,
    b_ = Zg.create({
        name: `paragraph`,
        priority: 1e3,
        addOptions() {
            return {
                HTMLAttributes: {}
            }
        },
        group: `block`,
        content: `inline*`,
        parseHTML() {
            return [{
                tag: `p`
            }]
        },
        renderHTML({
            HTMLAttributes: e
        }) {
            return [`p`, Em(this.options.HTMLAttributes, e), 0]
        },
        parseMarkdown: (e, t) => {
            let n = e.tokens || [];
            if (n.length === 1 && n[0].type === `image`) return t.parseChildren([n[0]]);
            let r = t.parseInline(n);
            return n.length === 1 && n[0].type === `text` && (n[0].raw === v_ || n[0].text === v_ || n[0].raw === y_ || n[0].text === y_) && r.length === 1 && r[0].type === `text` && (r[0].text === v_ || r[0].text === y_) ? t.createNode(`paragraph`, void 0, []) : t.createNode(`paragraph`, void 0, r)
        },
        renderMarkdown: (e, t, n) => {
            if (!e) return ``;
            let r = Array.isArray(e.content) ? e.content : [];
            if (r.length === 0) {
                var i, a;
                let e = Array.isArray(n == null || (i = n.previousNode) == null ? void 0 : i.content) ? n.previousNode.content : [];
                return (n == null || (a = n.previousNode) == null ? void 0 : a.type) === `paragraph` && e.length === 0 ? v_ : ``
            }
            return t.renderChildren(r)
        },
        addCommands() {
            return {
                setParagraph: () => ({
                    commands: e
                }) => e.setNode(this.name)
            }
        },
        addKeyboardShortcuts() {
            return {
                "Mod-Alt-0": () => this.editor.commands.setParagraph()
            }
        }
    }),
    x_ = Zg.create({
        name: `text`,
        group: `inline`,
        parseMarkdown: e => ({
            type: `text`,
            text: e.text || ``
        }),
        renderMarkdown: e => e.text || ``
    }),
    S_ = Sg.create({
        name: `underline`,
        addOptions() {
            return {
                HTMLAttributes: {}
            }
        },
        parseHTML() {
            return [{
                tag: `u`
            }, {
                style: `text-decoration`,
                consuming: !1,
                getAttrs: e => e.includes(`underline`) ? {} : !1
            }]
        },
        renderHTML({
            HTMLAttributes: e
        }) {
            return [`u`, Em(this.options.HTMLAttributes, e), 0]
        },
        parseMarkdown(e, t) {
            return t.applyMark(this.name || `underline`, t.parseInline(e.tokens || []))
        },
        renderMarkdown(e, t) {
            return `++${t.renderChildren(e)}++`
        },
        markdownTokenizer: {
            name: `underline`,
            level: `inline`,
            start(e) {
                return e.indexOf(`++`)
            },
            tokenize(e, t, n) {
                let r = /^(\+\+)([\s\S]+?)(\+\+)/.exec(e);
                if (!r) return;
                let i = r[2].trim();
                return {
                    type: `underline`,
                    raw: r[0],
                    text: i,
                    tokens: n.inlineTokens(i)
                }
            }
        },
        addCommands() {
            return {
                setUnderline: () => ({
                    commands: e
                }) => e.setMark(this.name),
                toggleUnderline: () => ({
                    commands: e
                }) => e.toggleMark(this.name),
                unsetUnderline: () => ({
                    commands: e
                }) => e.unsetMark(this.name)
            }
        },
        addKeyboardShortcuts() {
            return {
                "Mod-u": () => this.editor.commands.toggleUnderline(),
                "Mod-U": () => this.editor.commands.toggleUnderline()
            }
        }
    });
const C_ = [
    [{
        name: `cost`,
        shortcodes: [`cost`],
        tags: [`cost`],
        group: `General`,
        fallbackImage: `/img/symbols/icon_cost.svg`
    }, {
        name: `power`,
        shortcodes: [`power`],
        tags: [`power`],
        group: `General`,
        fallbackImage: `/img/symbols/icon_pwr.svg`
    }, {
        name: `defense`,
        shortcodes: [`defense`],
        tags: [`defense`],
        group: `General`,
        fallbackImage: `/img/symbols/icon_def.svg`
    }, {
        name: `life`,
        shortcodes: [`life`],
        tags: [`life`],
        group: `General`,
        fallbackImage: `/img/symbols/icon_hp.svg`
    }, {
        name: `intellect`,
        shortcodes: [`intellect`],
        tags: [`intellect`],
        group: `General`,
        fallbackImage: `/img/symbols/icon_int.svg`
    }, {
        name: `tap`,
        shortcodes: [`tap`],
        tags: [`tap`],
        group: `General`,
        fallbackImage: `/img/symbols/icon_t.svg`
    }, {
        name: `untap`,
        shortcodes: [`untap`],
        tags: [`untap`],
        group: `General`,
        fallbackImage: `/img/symbols/icon_u.svg`
    }],
    [{
        name: `chi`,
        shortcodes: [`chi`],
        tags: [`chi`],
        group: `General`,
        fallbackImage: `/img/symbols/icon_chi.svg`
    }]
];
export {
    me as $, $m as A, mg as B, Q as C, qm as D, Z as E, qg as F, J as G, Xg as H, Qg as I, po as J, M as K, Em as L, Xp as M, rh as N, Dm as O, ih as P, c as Q, Jg as R, Wm as S, Km as T, Yf as U, Yg as V, Jd as W, j as X, A as Y, rt as Z, $ as _, __ as a, hm as b, h_ as c, Kg as d, m as et, Ag as f, Cg as g, Zg as h, b_ as i, eh as j, Im as k, l_ as l, Sg as m, S_ as n, g_ as o, _g as p, N as q, x_ as r, m_ as s, C_ as t, n_ as u, cg as v, Gm as w, Vm as x, mm as y, pg as z
};
//# sourceMappingURL=editor-DDKt4oxa.js.map