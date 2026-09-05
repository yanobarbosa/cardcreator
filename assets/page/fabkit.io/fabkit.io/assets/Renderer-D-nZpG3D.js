import {
    n as e
} from "./chunk-B3K2TuZy.js";
import {
    a as t,
    n,
    o as r,
    t as i
} from "./compiler-runtime-4XzsAixn.js";
import {
    F as a
} from "./v4-DqHAiBF8.js";
import {
    n as o,
    o as s
} from "./card-creator-B987kJQm.js";
import {
    n as c,
    r as l,
    t as u
} from "./rendering-C9KGM53C.js";
import {
    t as d
} from "./rarities-BgClpRSi.js";
import {
    t as f
} from "./index.module-ClCUz9IR.js";
const p = {
    action: {
        none: `card.subtype.none`,
        attack: `card.subtype.attack`,
        ally: `card.subtype.ally`,
        arrow_attack: `card.subtype.arrow_attack`,
        dagger_attack: `card.subtype.dagger_attack`,
        aura: `card.subtype.aura`,
        affliction_aura: `card.subtype.affliction_aura`,
        construct: `card.subtype.construct`,
        invocation: `card.subtype.invocation`,
        item: `card.subtype.item`,
        shuriken_item: `card.subtype.shuriken_item`,
        cog_item: `card.subtype.cog_item`,
        landmark: `card.subtype.landmark`,
        song: `card.subtype.song`
    },
    attack_reaction: {
        none: `card.subtype.none`
    },
    block: {
        none: `card.subtype.none`
    },
    defense_reaction: {
        none: `card.subtype.none`,
        trap: `card.subtype.trap`
    },
    demi_hero: {
        none: `card.subtype.none`,
        demon: `card.subtype.demon`,
        young: `card.subtype.young`
    },
    equipment: {
        none: `card.subtype.none`,
        head: `card.subtype.head`,
        chest: `card.subtype.chest`,
        arms: `card.subtype.arms`,
        legs: `card.subtype.legs`,
        base: `card.subtype.base`,
        off_hand: `card.subtype.off_hand`,
        item: `card.subtype.item`
    },
    hero: {
        none: `card.subtype.none`,
        demon: `card.subtype.demon`,
        young: `card.subtype.young`
    },
    instant: {
        none: `card.subtype.none`,
        aura: `card.subtype.aura`,
        figment: `card.subtype.figment`,
        trap: `card.subtype.trap`
    },
    macro: {
        none: `card.subtype.none`
    },
    mentor: {
        none: `card.subtype.none`
    },
    resource: {
        none: `card.subtype.none`,
        gem: `card.subtype.gem`,
        chi: `card.subtype.chi`
    },
    token: {
        none: `card.subtype.none`
    },
    weapon: {
        none: `card.subtype.none`,
        axe: `card.subtype.axe`,
        book: `card.subtype.book`,
        bow: `card.subtype.bow`,
        brush: `card.subtype.brush`,
        club: `card.subtype.club`,
        dagger: `card.subtype.dagger`,
        fiddle: `card.subtype.fiddle`,
        flail: `card.subtype.flail`,
        gun: `card.subtype.gun`,
        hammer: `card.subtype.hammer`,
        lute: `card.subtype.lute`,
        orb: `card.subtype.orb`,
        pistol: `card.subtype.pistol`,
        polearm: `card.subtype.polearm`,
        rock: `card.subtype.rock`,
        scepter: `card.subtype.scepter`,
        scroll: `card.subtype.scroll`,
        scythe: `card.subtype.scythe`,
        staff: `card.subtype.staff`,
        sword: `card.subtype.sword`,
        wrench: `card.subtype.wrench`
    },
    weapon_equipment: {
        none: `card.subtype.none`,
        axe: `card.subtype.axe`,
        book: `card.subtype.book`,
        bow: `card.subtype.bow`,
        brush: `card.subtype.brush`,
        club: `card.subtype.club`,
        dagger: `card.subtype.dagger`,
        fiddle: `card.subtype.fiddle`,
        flail: `card.subtype.flail`,
        gun: `card.subtype.gun`,
        hammer: `card.subtype.hammer`,
        lute: `card.subtype.lute`,
        orb: `card.subtype.orb`,
        pistol: `card.subtype.pistol`,
        polearm: `card.subtype.polearm`,
        scepter: `card.subtype.scepter`,
        scroll: `card.subtype.scroll`,
        scythe: `card.subtype.scythe`,
        staff: `card.subtype.staff`,
        sword: `card.subtype.sword`,
        wrench: `card.subtype.wrench`
    },
    ally: {
        none: `card.subtype.none`
    },
    event: {
        none: `card.subtype.none`
    },
    meld: {
        none: `card.subtype.none`
    }
};
var m = e(r()),
    h = function(e) {
        var t = (0, m.useState)(null),
            n = t[0],
            r = t[1];
        return (0, m.useEffect)(function() {
            if (e) {
                var t = URL.createObjectURL(e);
                return r(t),
                    function() {
                        URL.revokeObjectURL(t), r(null)
                    }
            }
        }, [e]), n
    },
    g = i();

function _(e) {
    let t = (0, g.c)(21),
        {
            text: n,
            fontFamily: r,
            fontWeight: i,
            baseFontSize: a,
            baseY: o,
            maxWidth: s,
            scaledY: c,
            minFontSize: l
        } = e,
        u = i === void 0 ? 400 : i,
        d = c === void 0 ? o : c,
        f = l === void 0 ? 10 : l,
        p;
    if (t[0] !== a || t[1] !== o || t[2] !== r || t[3] !== u || t[4] !== s || t[5] !== f || t[6] !== d || t[7] !== n) {
        bb0: {
            if (!n) {
                let e;
                t[9] !== a || t[10] !== o ? (e = {
                    fontSize: a,
                    y: o
                }, t[9] = a, t[10] = o, t[11] = e) : e = t[11], p = e;
                break bb0
            }
            let e = document.createElement(`canvas`).getContext(`2d`);
            if (!e) {
                let e;
                t[12] !== a || t[13] !== o ? (e = {
                    fontSize: a,
                    y: o
                }, t[12] = a, t[13] = o, t[14] = e) : e = t[14], p = e;
                break bb0
            }
            e.font = `${u} ${a}px ${r}`;
            let i = e.measureText(n).width;
            if (i <= s) {
                let e;
                t[15] !== a || t[16] !== o ? (e = {
                    fontSize: a,
                    y: o
                }, t[15] = a, t[16] = o, t[17] = e) : e = t[17], p = e;
                break bb0
            }
            let c = Math.max(f, s / i * a),
                l = (a - c) / (a - f),
                m = o + (d - o) * l,
                h;t[18] !== c || t[19] !== m ? (h = {
                fontSize: c,
                y: m
            }, t[18] = c, t[19] = m, t[20] = h) : h = t[20],
            p = h
        }
        t[0] = a,
        t[1] = o,
        t[2] = r,
        t[3] = u,
        t[4] = s,
        t[5] = f,
        t[6] = d,
        t[7] = n,
        t[8] = p
    }
    else p = t[8];
    return p
}
var v = null,
    y = null;

function b() {
    return (!v || !y) && (v = document.createElement(`div`), v.style.position = `absolute`, v.style.visibility = `hidden`, v.style.left = `-9999px`, v.style.top = `0`, v.style.display = `flex`, v.style.flexDirection = `column`, v.style.justifyContent = `center`, v.style.alignItems = `center`, y = document.createElement(`div`), y.className = `renderedContent text-black text-center font-card-text`, v.appendChild(y), document.body.appendChild(v)), {
        container: v,
        inner: y
    }
}

function ee(e) {
    let {
        html: t,
        boxWidth: n,
        boxHeight: r,
        maxFontSize: i,
        minFontSize: a,
        precision: o,
        lineHeight: s,
        paragraphSpacing: c,
        overflowScalingFactor: l
    } = e, u = a === void 0 ? 6 : a, d = o === void 0 ?.1 : o, f = l === void 0 ? 1 : l, p;
    bb0: {
        if (!t) {
            p = i;
            break bb0
        }
        let e = t.includes(`fab-icon`);
        if (!(t.replace(/<[^>]*>/g, ``).trim().length > 0) && !e) {
            p = i;
            break bb0
        }
        let {
            container: a,
            inner: o
        } = b();
        if (o.innerHTML = t, a.style.width = `${n}px`, o.style.lineHeight = s == null ? `1.18` : `${s}`, o.style.setProperty(`--paragraph-spacing`, c == null ? null : `${c}em`), o.style.fontSize = `${i}px`, o.offsetHeight <= r) {
            p = i;
            break bb0
        }
        let l = u,
            m = i;
        for (; m - l > d;) {
            let e = (l + m) / 2;
            o.style.fontSize = `${e}px`, o.offsetHeight <= r ? l = e : m = e
        }
        p = l < i ? l * f : l
    }
    return p
}
var te = i(),
    x = e(t());

function ne(e, t) {
    let {
        CardType: n,
        CardTalent: r,
        CardClass: i,
        CardSecondaryClass: o,
        CardSubType: s,
        CardWeapon: u
    } = e, d = r && r !== `none` ? t(c[r]) || r : null, f = i && i !== `none` ? t(l[i]) || i : null, m = o && o !== `none` ? t(l[o]) || o : null, h = f && m ? `${f} / ${m}` : f, g = n ? t(a[n].label) : null, _ = [];
    if (n && s && s !== `none`) {
        let e = p[n] ?.[s] || s;
        e && _.push(t(e))
    }
    return (n === `weapon` || n === `weapon_equipment`) && u && _.push(u), [d, h, g, _.length > 0 ? `- ${_.join(` `)}` : null].filter(e => !!e).join(` `)
}

function S(e) {
    let t = (0, te.c)(270),
        {
            config: r,
            ref: i,
            isExport: a
        } = e,
        o = a === void 0 ? !1 : a,
        {
            t: c
        } = n(`card-creator`),
        l = s(_e),
        u = s(ge),
        p = s(he),
        m = s(me),
        g = s(pe),
        v = s(fe),
        y = s(de),
        b = s(ue),
        S = s(le),
        ve = s(ce),
        ye = s(se),
        be = s(oe),
        w = s(ae),
        xe = h(l.CardArtwork),
        Se = h(u.CardArtwork),
        Ce = s(ie),
        we = s(C),
        T = h(Ce);
    ye ?.images;
    let E;
    t[0] !== ye ?.images || t[1] !== m ? (E = ye ?.images.find(e => e.pitch === m) || ye ?.images[0], t[0] = ye ?.images, t[1] = m, t[2] = E) : E = t[2];
    let Te = E,
        [Ee] = f(l.CardTextHTML, 150),
        [D] = f(u.CardTextHTML, 150),
        De;
    t[3] === Ee ? De = t[4] : (De = Ee ?.replace(/\bloading="lazy"\b/g, ``) ?? null, t[3] = Ee, t[4] = De);
    let Oe = De,
        ke;
    t[5] === D ? ke = t[6] : (ke = D ?.replace(/\bloading="lazy"\b/g, ``) ?? null, t[5] = D, t[6] = ke);
    let Ae = ke,
        je = l.CardName || ``,
        Me = r.half.CardName.maxWidth ?? 1 / 0,
        Ne;
    t[7] !== r.half.CardName.fontFamily || t[8] !== r.half.CardName.fontSize || t[9] !== r.half.CardName.fontWeight || t[10] !== r.half.CardName.scaledY || t[11] !== r.half.CardName.y || t[12] !== je || t[13] !== Me ? (Ne = {
        text: je,
        fontFamily: r.half.CardName.fontFamily,
        fontWeight: r.half.CardName.fontWeight,
        baseFontSize: r.half.CardName.fontSize,
        baseY: r.half.CardName.y,
        maxWidth: Me,
        scaledY: r.half.CardName.scaledY,
        minFontSize: 5
    }, t[7] = r.half.CardName.fontFamily, t[8] = r.half.CardName.fontSize, t[9] = r.half.CardName.fontWeight, t[10] = r.half.CardName.scaledY, t[11] = r.half.CardName.y, t[12] = je, t[13] = Me, t[14] = Ne) : Ne = t[14];
    let {
        fontSize: Pe,
        y: Fe
    } = _(Ne), Ie = u.CardName || ``, Le = r.half.CardName.maxWidth ?? 1 / 0, Re;
    t[15] !== r.half.CardName.fontFamily || t[16] !== r.half.CardName.fontSize || t[17] !== r.half.CardName.fontWeight || t[18] !== r.half.CardName.scaledY || t[19] !== r.half.CardName.y || t[20] !== Ie || t[21] !== Le ? (Re = {
        text: Ie,
        fontFamily: r.half.CardName.fontFamily,
        fontWeight: r.half.CardName.fontWeight,
        baseFontSize: r.half.CardName.fontSize,
        baseY: r.half.CardName.y,
        maxWidth: Le,
        scaledY: r.half.CardName.scaledY,
        minFontSize: 5
    }, t[15] = r.half.CardName.fontFamily, t[16] = r.half.CardName.fontSize, t[17] = r.half.CardName.fontWeight, t[18] = r.half.CardName.scaledY, t[19] = r.half.CardName.y, t[20] = Ie, t[21] = Le, t[22] = Re) : Re = t[22];
    let {
        fontSize: ze,
        y: Be
    } = _(Re), Ve = Oe || ``, He = r.half.CardText.fontSize ?? 12, Ue;
    t[23] !== r.half.CardText.height || t[24] !== r.half.CardText.minFontSize || t[25] !== r.half.CardText.overflowScalingFactor || t[26] !== r.half.CardText.width || t[27] !== Ve || t[28] !== He ? (Ue = {
        html: Ve,
        boxWidth: r.half.CardText.width,
        boxHeight: r.half.CardText.height,
        maxFontSize: He,
        minFontSize: r.half.CardText.minFontSize,
        overflowScalingFactor: r.half.CardText.overflowScalingFactor
    }, t[23] = r.half.CardText.height, t[24] = r.half.CardText.minFontSize, t[25] = r.half.CardText.overflowScalingFactor, t[26] = r.half.CardText.width, t[27] = Ve, t[28] = He, t[29] = Ue) : Ue = t[29];
    let We = ee(Ue),
        Ge = Ae || ``,
        Ke = r.half.CardText.fontSize ?? 12,
        O;
    t[30] !== r.half.CardText.height || t[31] !== r.half.CardText.minFontSize || t[32] !== r.half.CardText.overflowScalingFactor || t[33] !== r.half.CardText.width || t[34] !== Ge || t[35] !== Ke ? (O = {
        html: Ge,
        boxWidth: r.half.CardText.width,
        boxHeight: r.half.CardText.height,
        maxFontSize: Ke,
        minFontSize: r.half.CardText.minFontSize,
        overflowScalingFactor: r.half.CardText.overflowScalingFactor
    }, t[30] = r.half.CardText.height, t[31] = r.half.CardText.minFontSize, t[32] = r.half.CardText.overflowScalingFactor, t[33] = r.half.CardText.width, t[34] = Ge, t[35] = Ke, t[36] = O) : O = t[36];
    let qe = ee(O),
        Je;
    t[37] !== l || t[38] !== c ? (Je = ne(l, c), t[37] = l, t[38] = c, t[39] = Je) : Je = t[39];
    let k = Je,
        Ye;
    t[40] !== u || t[41] !== c ? (Ye = ne(u, c), t[40] = u, t[41] = c, t[42] = Ye) : Ye = t[42];
    let A = Ye,
        Xe = r.half.CardBottomText.maxWidth ?? r.viewBox.width,
        j;
    t[43] !== r.half.CardBottomText.fontFamily || t[44] !== r.half.CardBottomText.fontSize || t[45] !== r.half.CardBottomText.fontWeight || t[46] !== r.half.CardBottomText.scaledY || t[47] !== r.half.CardBottomText.y || t[48] !== k || t[49] !== Xe ? (j = {
        text: k,
        fontFamily: r.half.CardBottomText.fontFamily,
        fontWeight: r.half.CardBottomText.fontWeight,
        baseFontSize: r.half.CardBottomText.fontSize,
        baseY: r.half.CardBottomText.y,
        maxWidth: Xe,
        scaledY: r.half.CardBottomText.scaledY,
        minFontSize: 5
    }, t[43] = r.half.CardBottomText.fontFamily, t[44] = r.half.CardBottomText.fontSize, t[45] = r.half.CardBottomText.fontWeight, t[46] = r.half.CardBottomText.scaledY, t[47] = r.half.CardBottomText.y, t[48] = k, t[49] = Xe, t[50] = j) : j = t[50];
    let {
        fontSize: M,
        y: N
    } = _(j), P = r.half.CardBottomText.maxWidth ?? r.viewBox.width, F;
    t[51] !== r.half.CardBottomText.fontFamily || t[52] !== r.half.CardBottomText.fontSize || t[53] !== r.half.CardBottomText.fontWeight || t[54] !== r.half.CardBottomText.scaledY || t[55] !== r.half.CardBottomText.y || t[56] !== A || t[57] !== P ? (F = {
        text: A,
        fontFamily: r.half.CardBottomText.fontFamily,
        fontWeight: r.half.CardBottomText.fontWeight,
        baseFontSize: r.half.CardBottomText.fontSize,
        baseY: r.half.CardBottomText.y,
        maxWidth: P,
        scaledY: r.half.CardBottomText.scaledY,
        minFontSize: 5
    }, t[51] = r.half.CardBottomText.fontFamily, t[52] = r.half.CardBottomText.fontSize, t[53] = r.half.CardBottomText.fontWeight, t[54] = r.half.CardBottomText.scaledY, t[55] = r.half.CardBottomText.y, t[56] = A, t[57] = P, t[58] = F) : F = t[58];
    let {
        fontSize: I,
        y: L
    } = _(F), Ze;
    t[59] !== w || t[60] !== be ? (Ze = [be, `FABKIT`, w].filter(re), t[59] = w, t[60] = be, t[61] = Ze) : Ze = t[61];
    let R = Ze.join(` | `),
        z;
    t[62] === R ? z = t[63] : (z = [R, `FaB TCC BY LSS`], t[62] = R, t[63] = z);
    let B = z,
        V;
    t[64] === c ? V = t[65] : (V = c(`card_creator.meld_band_keyword`), t[64] = c, t[65] = V);
    let H = V,
        U;
    t[66] !== g || t[67] !== c ? (U = g ? c(`card_creator.meld_band_description`, {
        cost: g
    }) : c(`card_creator.meld_band_keyword_only`), t[66] = g, t[67] = c, t[68] = U) : U = t[68];
    let W = U,
        G = r.leftHalfWidth + r.centerGap,
        K = r.viewBox.width,
        q;
    t[69] === K ? q = t[70] : (q = e => K - e, t[69] = K, t[70] = q);
    let J = q,
        Y;
    t[71] === K ? Y = t[72] : (Y = (e, t) => K - e - t, t[71] = K, t[72] = Y);
    let Qe = Y,
        X = `${r.viewBox.width}/${r.viewBox.height}`,
        Z;
    t[73] === X ? Z = t[74] : (Z = {
        aspectRatio: X
    }, t[73] = X, t[74] = Z);
    let Q = Z,
        $ = d[ve || `basic`].icon,
        $e = `0 0 ${r.viewBox.width} ${r.viewBox.height}`,
        et;
    t[75] !== l.CardName || t[76] !== u.CardName ? (et = [l.CardName, u.CardName].filter(Boolean).join(` // `) || `Meld Card`, t[75] = l.CardName, t[76] = u.CardName, t[77] = et) : et = t[77];
    let tt;
    t[78] === et ? tt = t[79] : (tt = (0, x.jsx)(`title`, {
        children: et
    }), t[78] = et, t[79] = tt);
    let nt;
    t[80] !== r.leftArtworkDragZone.height || t[81] !== r.leftArtworkDragZone.width || t[82] !== r.leftArtworkDragZone.x || t[83] !== r.leftArtworkDragZone.y ? (nt = (0, x.jsx)(`clipPath`, {
        id: `meld-left-artwork-clip`,
        children: (0, x.jsx)(`rect`, {
            x: r.leftArtworkDragZone.x,
            y: r.leftArtworkDragZone.y,
            width: r.leftArtworkDragZone.width,
            height: r.leftArtworkDragZone.height
        })
    }), t[80] = r.leftArtworkDragZone.height, t[81] = r.leftArtworkDragZone.width, t[82] = r.leftArtworkDragZone.x, t[83] = r.leftArtworkDragZone.y, t[84] = nt) : nt = t[84];
    let rt;
    t[85] !== r.rightArtworkDragZone.height || t[86] !== r.rightArtworkDragZone.width || t[87] !== r.rightArtworkDragZone.x || t[88] !== r.rightArtworkDragZone.y ? (rt = (0, x.jsx)(`clipPath`, {
        id: `meld-right-artwork-clip`,
        children: (0, x.jsx)(`rect`, {
            x: r.rightArtworkDragZone.x,
            y: r.rightArtworkDragZone.y,
            width: r.rightArtworkDragZone.width,
            height: r.rightArtworkDragZone.height
        })
    }), t[85] = r.rightArtworkDragZone.height, t[86] = r.rightArtworkDragZone.width, t[87] = r.rightArtworkDragZone.x, t[88] = r.rightArtworkDragZone.y, t[89] = rt) : rt = t[89];
    let it = r.half.CardName.x - (r.half.CardName.width ?? 0) / 2,
        at = r.half.CardName.y - (r.half.CardName.height ?? 0) / 2,
        ot = r.half.CardName.width ?? 0,
        st = r.half.CardName.height ?? 0,
        ct;
    t[90] !== it || t[91] !== at || t[92] !== ot || t[93] !== st ? (ct = (0, x.jsx)(`clipPath`, {
        id: `meld-left-title-clip`,
        children: (0, x.jsx)(`rect`, {
            x: it,
            y: at,
            width: ot,
            height: st
        })
    }), t[90] = it, t[91] = at, t[92] = ot, t[93] = st, t[94] = ct) : ct = t[94];
    let lt = J(r.half.CardName.x) - (r.half.CardName.width ?? 0) / 2,
        ut = r.half.CardName.y - (r.half.CardName.height ?? 0) / 2,
        dt = r.half.CardName.width ?? 0,
        ft = r.half.CardName.height ?? 0,
        pt;
    t[95] !== lt || t[96] !== ut || t[97] !== dt || t[98] !== ft ? (pt = (0, x.jsx)(`clipPath`, {
        id: `meld-right-title-clip`,
        children: (0, x.jsx)(`rect`, {
            x: lt,
            y: ut,
            width: dt,
            height: ft
        })
    }), t[95] = lt, t[96] = ut, t[97] = dt, t[98] = ft, t[99] = pt) : pt = t[99];
    let mt = r.half.CardBottomText.x - (r.half.CardBottomText.width ?? 0) / 2,
        ht = r.half.CardBottomText.y - (r.half.CardBottomText.height ?? 0) / 2,
        gt = r.half.CardBottomText.width ?? 0,
        _t = r.half.CardBottomText.height ?? 0,
        vt;
    t[100] !== mt || t[101] !== ht || t[102] !== gt || t[103] !== _t ? (vt = (0, x.jsx)(`clipPath`, {
        id: `meld-left-bottom-text-clip`,
        children: (0, x.jsx)(`rect`, {
            x: mt,
            y: ht,
            width: gt,
            height: _t
        })
    }), t[100] = mt, t[101] = ht, t[102] = gt, t[103] = _t, t[104] = vt) : vt = t[104];
    let yt = J(r.half.CardBottomText.x) - (r.half.CardBottomText.width ?? 0) / 2,
        bt = r.half.CardBottomText.y - (r.half.CardBottomText.height ?? 0) / 2,
        xt = r.half.CardBottomText.width ?? 0,
        St = r.half.CardBottomText.height ?? 0,
        Ct;
    t[105] !== yt || t[106] !== bt || t[107] !== xt || t[108] !== St ? (Ct = (0, x.jsx)(`clipPath`, {
        id: `meld-right-bottom-text-clip`,
        children: (0, x.jsx)(`rect`, {
            x: yt,
            y: bt,
            width: xt,
            height: St
        })
    }), t[105] = yt, t[106] = bt, t[107] = xt, t[108] = St, t[109] = Ct) : Ct = t[109];
    let wt;
    t[110] !== nt || t[111] !== rt || t[112] !== ct || t[113] !== pt || t[114] !== vt || t[115] !== Ct ? (wt = (0, x.jsxs)(`defs`, {
        children: [nt, rt, ct, pt, vt, Ct]
    }), t[110] = nt, t[111] = rt, t[112] = ct, t[113] = pt, t[114] = vt, t[115] = Ct, t[116] = wt) : wt = t[116];
    let Tt;
    t[117] !== l.CardArtPosition || t[118] !== xe ? (Tt = xe && l.CardArtPosition && (0, x.jsx)(`image`, {
        href: xe,
        x: l.CardArtPosition.x,
        y: l.CardArtPosition.y,
        width: l.CardArtPosition.width,
        height: l.CardArtPosition.height,
        preserveAspectRatio: `xMidYMid slice`,
        clipPath: `url(#meld-left-artwork-clip)`
    }), t[117] = l.CardArtPosition, t[118] = xe, t[119] = Tt) : Tt = t[119];
    let Et;
    t[120] !== u.CardArtPosition || t[121] !== Se ? (Et = Se && u.CardArtPosition && (0, x.jsx)(`image`, {
        href: Se,
        x: u.CardArtPosition.x,
        y: u.CardArtPosition.y,
        width: u.CardArtPosition.width,
        height: u.CardArtPosition.height,
        preserveAspectRatio: `xMidYMid slice`,
        clipPath: `url(#meld-right-artwork-clip)`
    }), t[120] = u.CardArtPosition, t[121] = Se, t[122] = Et) : Et = t[122];
    let Dt;
    t[123] !== Te || t[124] !== r.viewBox.height || t[125] !== r.viewBox.width ? (Dt = Te && (0, x.jsx)(`image`, {
        href: `/cardbacks/${Te?.fileName}`,
        x: `0`,
        y: `0`,
        width: r.viewBox.width,
        height: r.viewBox.height,
        preserveAspectRatio: `xMidYMid slice`
    }), t[123] = Te, t[124] = r.viewBox.height, t[125] = r.viewBox.width, t[126] = Dt) : Dt = t[126];
    let Ot;
    t[127] !== r.half.CardName.fill || t[128] !== r.half.CardName.fontFamily || t[129] !== r.half.CardName.fontWeight || t[130] !== r.half.CardName.x || t[131] !== l.CardName || t[132] !== Pe || t[133] !== Fe ? (Ot = l.CardName && (0, x.jsx)(`text`, {
        x: r.half.CardName.x,
        y: Fe,
        textAnchor: `middle`,
        dominantBaseline: `middle`,
        fill: r.half.CardName.fill,
        fontFamily: r.half.CardName.fontFamily,
        fontSize: Pe,
        fontWeight: r.half.CardName.fontWeight,
        clipPath: `url(#meld-left-title-clip)`,
        children: l.CardName
    }), t[127] = r.half.CardName.fill, t[128] = r.half.CardName.fontFamily, t[129] = r.half.CardName.fontWeight, t[130] = r.half.CardName.x, t[131] = l.CardName, t[132] = Pe, t[133] = Fe, t[134] = Ot) : Ot = t[134];
    let kt;
    t[135] !== r.half.CardText.height || t[136] !== r.half.CardText.width || t[137] !== r.half.CardText.x || t[138] !== r.half.CardText.y || t[139] !== Oe || t[140] !== We ? (kt = Oe && (0, x.jsx)(`foreignObject`, {
        x: r.half.CardText.x,
        y: r.half.CardText.y,
        width: r.half.CardText.width,
        height: r.half.CardText.height,
        children: (0, x.jsx)(`div`, {
            className: `flex h-full w-full flex-col justify-center items-center`,
            children: (0, x.jsx)(`div`, {
                className: `renderedContent text-black text-center font-card-text`,
                style: {
                    fontSize: We
                },
                dangerouslySetInnerHTML: {
                    __html: Oe
                }
            })
        })
    }), t[135] = r.half.CardText.height, t[136] = r.half.CardText.width, t[137] = r.half.CardText.x, t[138] = r.half.CardText.y, t[139] = Oe, t[140] = We, t[141] = kt) : kt = t[141];
    let At;
    t[142] !== r.half.CardBottomText.fill || t[143] !== r.half.CardBottomText.fontFamily || t[144] !== r.half.CardBottomText.fontWeight || t[145] !== r.half.CardBottomText.x || t[146] !== k || t[147] !== M || t[148] !== N ? (At = k && (0, x.jsx)(`text`, {
        x: r.half.CardBottomText.x,
        y: N,
        textAnchor: `middle`,
        dominantBaseline: `middle`,
        fill: r.half.CardBottomText.fill,
        fontFamily: r.half.CardBottomText.fontFamily,
        fontSize: M,
        fontWeight: r.half.CardBottomText.fontWeight,
        clipPath: `url(#meld-left-bottom-text-clip)`,
        children: k
    }), t[142] = r.half.CardBottomText.fill, t[143] = r.half.CardBottomText.fontFamily, t[144] = r.half.CardBottomText.fontWeight, t[145] = r.half.CardBottomText.x, t[146] = k, t[147] = M, t[148] = N, t[149] = At) : At = t[149];
    let jt;
    t[150] !== r.half.CardName.fill || t[151] !== r.half.CardName.fontFamily || t[152] !== r.half.CardName.fontWeight || t[153] !== r.half.CardName.x || t[154] !== u.CardName || t[155] !== ze || t[156] !== Be || t[157] !== J ? (jt = u.CardName && (0, x.jsx)(`text`, {
        x: J(r.half.CardName.x),
        y: Be,
        textAnchor: `middle`,
        dominantBaseline: `middle`,
        fill: r.half.CardName.fill,
        fontFamily: r.half.CardName.fontFamily,
        fontSize: ze,
        fontWeight: r.half.CardName.fontWeight,
        clipPath: `url(#meld-right-title-clip)`,
        children: u.CardName
    }), t[150] = r.half.CardName.fill, t[151] = r.half.CardName.fontFamily, t[152] = r.half.CardName.fontWeight, t[153] = r.half.CardName.x, t[154] = u.CardName, t[155] = ze, t[156] = Be, t[157] = J, t[158] = jt) : jt = t[158];
    let Mt;
    t[159] !== r.half.CardText.height || t[160] !== r.half.CardText.width || t[161] !== r.half.CardText.x || t[162] !== r.half.CardText.y || t[163] !== Ae || t[164] !== qe || t[165] !== Qe ? (Mt = Ae && (0, x.jsx)(`foreignObject`, {
        x: Qe(r.half.CardText.x, r.half.CardText.width),
        y: r.half.CardText.y,
        width: r.half.CardText.width,
        height: r.half.CardText.height,
        children: (0, x.jsx)(`div`, {
            className: `flex h-full w-full flex-col justify-center items-center`,
            children: (0, x.jsx)(`div`, {
                className: `renderedContent text-black text-center font-card-text`,
                style: {
                    fontSize: qe
                },
                dangerouslySetInnerHTML: {
                    __html: Ae
                }
            })
        })
    }), t[159] = r.half.CardText.height, t[160] = r.half.CardText.width, t[161] = r.half.CardText.x, t[162] = r.half.CardText.y, t[163] = Ae, t[164] = qe, t[165] = Qe, t[166] = Mt) : Mt = t[166];
    let Nt;
    t[167] !== r.half.CardBottomText.fill || t[168] !== r.half.CardBottomText.fontFamily || t[169] !== r.half.CardBottomText.fontWeight || t[170] !== r.half.CardBottomText.x || t[171] !== A || t[172] !== I || t[173] !== L || t[174] !== J ? (Nt = A && (0, x.jsx)(`text`, {
        x: J(r.half.CardBottomText.x),
        y: L,
        textAnchor: `middle`,
        dominantBaseline: `middle`,
        fill: r.half.CardBottomText.fill,
        fontFamily: r.half.CardBottomText.fontFamily,
        fontSize: I,
        fontWeight: r.half.CardBottomText.fontWeight,
        clipPath: `url(#meld-right-bottom-text-clip)`,
        children: A
    }), t[167] = r.half.CardBottomText.fill, t[168] = r.half.CardBottomText.fontFamily, t[169] = r.half.CardBottomText.fontWeight, t[170] = r.half.CardBottomText.x, t[171] = A, t[172] = I, t[173] = L, t[174] = J, t[175] = Nt) : Nt = t[175];
    let Pt;
    t[176] !== r.shared.CardRarity.height || t[177] !== r.shared.CardRarity.width || t[178] !== r.shared.CardRarity.x || t[179] !== r.shared.CardRarity.y || t[180] !== $ ? (Pt = (0, x.jsx)(`image`, {
        href: $,
        x: r.shared.CardRarity.x,
        y: r.shared.CardRarity.y,
        width: r.shared.CardRarity.width,
        height: r.shared.CardRarity.height,
        preserveAspectRatio: `xMidYMid slice`
    }), t[176] = r.shared.CardRarity.height, t[177] = r.shared.CardRarity.width, t[178] = r.shared.CardRarity.x, t[179] = r.shared.CardRarity.y, t[180] = $, t[181] = Pt) : Pt = t[181];
    let Ft;
    t[182] === H ? Ft = t[183] : (Ft = (0, x.jsx)(`tspan`, {
        fontFamily: `palatino_lt_stdbold`,
        children: H
    }), t[182] = H, t[183] = Ft);
    let It;
    t[184] === W ? It = t[185] : (It = (0, x.jsx)(`tspan`, {
        fontFamily: `palatino_lt_italic`,
        children: W
    }), t[184] = W, t[185] = It);
    let Lt;
    t[186] !== r.shared.MeldBandText.fill || t[187] !== r.shared.MeldBandText.fontSize || t[188] !== r.shared.MeldBandText.x || t[189] !== r.shared.MeldBandText.y || t[190] !== Ft || t[191] !== It ? (Lt = (0, x.jsxs)(`text`, {
        x: r.shared.MeldBandText.x,
        y: r.shared.MeldBandText.y,
        textAnchor: `middle`,
        dominantBaseline: `middle`,
        fill: r.shared.MeldBandText.fill,
        fontSize: r.shared.MeldBandText.fontSize,
        children: [Ft, It]
    }), t[186] = r.shared.MeldBandText.fill, t[187] = r.shared.MeldBandText.fontSize, t[188] = r.shared.MeldBandText.x, t[189] = r.shared.MeldBandText.y, t[190] = Ft, t[191] = It, t[192] = Lt) : Lt = t[192];
    let Rt;
    t[193] !== g || t[194] !== r.shared.CardResource ? (Rt = g && (0, x.jsxs)(x.Fragment, {
        children: [(0, x.jsx)(`text`, {
            x: r.shared.CardResource.x,
            y: r.shared.CardResource.y,
            textAnchor: `middle`,
            dominantBaseline: `middle`,
            fill: `none`,
            fontFamily: r.shared.CardResource.fontFamily,
            fontSize: r.shared.CardResource.fontSize,
            fontWeight: r.shared.CardResource.fontWeight,
            stroke: r.shared.CardResource.stroke,
            strokeWidth: r.shared.CardResource.strokeWidth,
            paintOrder: r.shared.CardResource.paintOrder,
            children: g
        }), (0, x.jsx)(`text`, {
            x: r.shared.CardResource.x,
            y: r.shared.CardResource.y,
            textAnchor: `middle`,
            dominantBaseline: `middle`,
            fill: r.shared.CardResource.fill,
            fontFamily: r.shared.CardResource.fontFamily,
            fontSize: r.shared.CardResource.fontSize,
            fontWeight: r.shared.CardResource.fontWeight,
            children: g
        })]
    }), t[193] = g, t[194] = r.shared.CardResource, t[195] = Rt) : Rt = t[195];
    let zt;
    t[196] !== v || t[197] !== r.shared.CardPowerImage || t[198] !== r.shared.CardPowerText ? (zt = v && (0, x.jsxs)(x.Fragment, {
        children: [(0, x.jsx)(`image`, {
            href: `/img/symbols/cardsymbol_power.svg`,
            x: r.shared.CardPowerImage.x,
            y: r.shared.CardPowerImage.y,
            width: r.shared.CardPowerImage.width,
            height: r.shared.CardPowerImage.height,
            preserveAspectRatio: `xMidYMid slice`
        }), (0, x.jsx)(`text`, {
            x: r.shared.CardPowerText.x,
            y: r.shared.CardPowerText.y,
            textAnchor: `middle`,
            dominantBaseline: `middle`,
            fill: r.shared.CardPowerText.fill,
            fontFamily: r.shared.CardPowerText.fontFamily,
            fontSize: r.shared.CardPowerText.fontSize,
            fontWeight: r.shared.CardPowerText.fontWeight,
            children: v
        })]
    }), t[196] = v, t[197] = r.shared.CardPowerImage, t[198] = r.shared.CardPowerText, t[199] = zt) : zt = t[199];
    let Bt;
    t[200] !== S || t[201] !== r.shared.CardIntellectText || t[202] !== r.shared.CardPowerImage ? (Bt = S && (0, x.jsxs)(x.Fragment, {
        children: [(0, x.jsx)(`image`, {
            href: `/img/symbols/cardsymbol_intellect.svg`,
            x: r.shared.CardPowerImage.x,
            y: r.shared.CardPowerImage.y,
            width: r.shared.CardPowerImage.width,
            height: r.shared.CardPowerImage.height,
            preserveAspectRatio: `xMidYMid slice`
        }), (0, x.jsx)(`text`, {
            x: r.shared.CardIntellectText.x,
            y: r.shared.CardIntellectText.y,
            textAnchor: `middle`,
            dominantBaseline: `middle`,
            fill: r.shared.CardIntellectText.fill,
            fontFamily: r.shared.CardIntellectText.fontFamily,
            fontSize: r.shared.CardIntellectText.fontSize,
            fontWeight: r.shared.CardIntellectText.fontWeight,
            children: S
        })]
    }), t[200] = S, t[201] = r.shared.CardIntellectText, t[202] = r.shared.CardPowerImage, t[203] = Bt) : Bt = t[203];
    let Vt;
    t[204] !== y || t[205] !== r.shared.CardDefenseImage || t[206] !== r.shared.CardDefenseText ? (Vt = y && (0, x.jsxs)(x.Fragment, {
        children: [(0, x.jsx)(`image`, {
            href: `/img/symbols/cardsymbol_defense.svg`,
            x: r.shared.CardDefenseImage.x,
            y: r.shared.CardDefenseImage.y,
            width: r.shared.CardDefenseImage.width,
            height: r.shared.CardDefenseImage.height,
            preserveAspectRatio: `xMidYMid slice`
        }), (0, x.jsx)(`text`, {
            x: r.shared.CardDefenseText.x,
            y: r.shared.CardDefenseText.y,
            textAnchor: `middle`,
            dominantBaseline: `middle`,
            fill: r.shared.CardDefenseText.fill,
            fontFamily: r.shared.CardDefenseText.fontFamily,
            fontSize: r.shared.CardDefenseText.fontSize,
            fontWeight: r.shared.CardDefenseText.fontWeight,
            children: y
        })]
    }), t[204] = y, t[205] = r.shared.CardDefenseImage, t[206] = r.shared.CardDefenseText, t[207] = Vt) : Vt = t[207];
    let Ht;
    t[208] !== b || t[209] !== r.shared.CardDefenseImage || t[210] !== r.shared.CardLifeText ? (Ht = b && (0, x.jsxs)(x.Fragment, {
        children: [(0, x.jsx)(`image`, {
            href: `/img/symbols/cardsymbol_life.svg`,
            x: r.shared.CardDefenseImage.x,
            y: r.shared.CardDefenseImage.y,
            width: r.shared.CardDefenseImage.width,
            height: r.shared.CardDefenseImage.height,
            preserveAspectRatio: `xMidYMid slice`
        }), (0, x.jsx)(`text`, {
            x: r.shared.CardLifeText.x,
            y: r.shared.CardLifeText.y,
            textAnchor: `middle`,
            dominantBaseline: `middle`,
            fill: r.shared.CardLifeText.fill,
            fontFamily: r.shared.CardLifeText.fontFamily,
            fontSize: r.shared.CardLifeText.fontSize,
            fontWeight: r.shared.CardLifeText.fontWeight,
            children: b
        })]
    }), t[208] = b, t[209] = r.shared.CardDefenseImage, t[210] = r.shared.CardLifeText, t[211] = Ht) : Ht = t[211];
    let Ut = r.shared.CardFooterTextLeft.textAnchor || `start`,
        Wt;
    t[212] !== r.shared.CardFooterTextLeft.fill || t[213] !== r.shared.CardFooterTextLeft.fontFamily || t[214] !== r.shared.CardFooterTextLeft.fontSize || t[215] !== r.shared.CardFooterTextLeft.fontWeight || t[216] !== r.shared.CardFooterTextLeft.x || t[217] !== r.shared.CardFooterTextLeft.y || t[218] !== B[0] || t[219] !== Ut ? (Wt = (0, x.jsx)(`text`, {
        x: r.shared.CardFooterTextLeft.x,
        y: r.shared.CardFooterTextLeft.y,
        textAnchor: Ut,
        dominantBaseline: `middle`,
        fill: r.shared.CardFooterTextLeft.fill,
        fontFamily: r.shared.CardFooterTextLeft.fontFamily,
        fontSize: r.shared.CardFooterTextLeft.fontSize,
        fontWeight: r.shared.CardFooterTextLeft.fontWeight,
        children: B[0]
    }), t[212] = r.shared.CardFooterTextLeft.fill, t[213] = r.shared.CardFooterTextLeft.fontFamily, t[214] = r.shared.CardFooterTextLeft.fontSize, t[215] = r.shared.CardFooterTextLeft.fontWeight, t[216] = r.shared.CardFooterTextLeft.x, t[217] = r.shared.CardFooterTextLeft.y, t[218] = B[0], t[219] = Ut, t[220] = Wt) : Wt = t[220];
    let Gt = r.shared.CardFooterTextRight.textAnchor || `end`,
        Kt;
    t[221] !== r.shared.CardFooterTextRight.fill || t[222] !== r.shared.CardFooterTextRight.fontFamily || t[223] !== r.shared.CardFooterTextRight.fontSize || t[224] !== r.shared.CardFooterTextRight.fontWeight || t[225] !== r.shared.CardFooterTextRight.x || t[226] !== r.shared.CardFooterTextRight.y || t[227] !== B[1] || t[228] !== Gt ? (Kt = (0, x.jsx)(`text`, {
        x: r.shared.CardFooterTextRight.x,
        y: r.shared.CardFooterTextRight.y,
        textAnchor: Gt,
        dominantBaseline: `middle`,
        fill: r.shared.CardFooterTextRight.fill,
        fontFamily: r.shared.CardFooterTextRight.fontFamily,
        fontSize: r.shared.CardFooterTextRight.fontSize,
        fontWeight: r.shared.CardFooterTextRight.fontWeight,
        children: B[1]
    }), t[221] = r.shared.CardFooterTextRight.fill, t[222] = r.shared.CardFooterTextRight.fontFamily, t[223] = r.shared.CardFooterTextRight.fontSize, t[224] = r.shared.CardFooterTextRight.fontWeight, t[225] = r.shared.CardFooterTextRight.x, t[226] = r.shared.CardFooterTextRight.y, t[227] = B[1], t[228] = Gt, t[229] = Kt) : Kt = t[229];
    let qt;
    t[230] !== we || t[231] !== r.viewBox.height || t[232] !== r.viewBox.width || t[233] !== T ? (qt = T && (0, x.jsx)(`image`, {
        href: T,
        x: 0,
        y: 0,
        opacity: we,
        width: r.viewBox.width,
        height: r.viewBox.height,
        preserveAspectRatio: `xMidYMid slice`
    }), t[230] = we, t[231] = r.viewBox.height, t[232] = r.viewBox.width, t[233] = T, t[234] = qt) : qt = t[234];
    let Jt;
    t[235] !== r.leftHalfWidth || t[236] !== r.viewBox.height || t[237] !== r.viewBox.width || t[238] !== o || t[239] !== p || t[240] !== G ? (Jt = !o && (0, x.jsx)(`rect`, {
        "data-export-hide": `true`,
        x: p === `A` ? 2 : G,
        y: 2,
        width: p === `A` ? r.leftHalfWidth - 2 : r.viewBox.width - G - 2,
        height: r.viewBox.height - 4,
        fill: `none`,
        stroke: `#C42025`,
        strokeWidth: 2,
        strokeDasharray: `6 4`,
        opacity: .75,
        pointerEvents: `none`,
        rx: 6
    }), t[235] = r.leftHalfWidth, t[236] = r.viewBox.height, t[237] = r.viewBox.width, t[238] = o, t[239] = p, t[240] = G, t[241] = Jt) : Jt = t[241];
    let Yt;
    return t[242] !== r.viewBox.height || t[243] !== r.viewBox.width || t[244] !== i || t[245] !== Q || t[246] !== $e || t[247] !== tt || t[248] !== wt || t[249] !== Tt || t[250] !== Et || t[251] !== Dt || t[252] !== Ot || t[253] !== kt || t[254] !== At || t[255] !== jt || t[256] !== Mt || t[257] !== Nt || t[258] !== Pt || t[259] !== Lt || t[260] !== Rt || t[261] !== zt || t[262] !== Bt || t[263] !== Vt || t[264] !== Ht || t[265] !== Wt || t[266] !== Kt || t[267] !== qt || t[268] !== Jt ? (Yt = (0, x.jsxs)(`svg`, {
        ref: i,
        viewBox: $e,
        width: r.viewBox.width,
        height: r.viewBox.height,
        style: Q,
        className: `w-full h-auto`,
        xmlns: `http://www.w3.org/2000/svg`,
        children: [tt, wt, Tt, Et, Dt, Ot, kt, At, jt, Mt, Nt, Pt, Lt, Rt, zt, Bt, Vt, Ht, Wt, Kt, qt, Jt]
    }), t[242] = r.viewBox.height, t[243] = r.viewBox.width, t[244] = i, t[245] = Q, t[246] = $e, t[247] = tt, t[248] = wt, t[249] = Tt, t[250] = Et, t[251] = Dt, t[252] = Ot, t[253] = kt, t[254] = At, t[255] = jt, t[256] = Mt, t[257] = Nt, t[258] = Pt, t[259] = Lt, t[260] = Rt, t[261] = zt, t[262] = Bt, t[263] = Vt, t[264] = Ht, t[265] = Wt, t[266] = Kt, t[267] = qt, t[268] = Jt, t[269] = Yt) : Yt = t[269], Yt
}

function re(e) {
    return e ?.trim() ?.length
}

function C(e) {
    return e.CardOverlayOpacity
}

function ie(e) {
    return e.CardOverlay
}

function ae(e) {
    return e.CardArtworkCredits
}

function oe(e) {
    return e.CardSetNumber
}

function se(e) {
    return e.CardBack
}

function ce(e) {
    return e.CardRarity
}

function le(e) {
    return e.CardHeroIntellect
}

function ue(e) {
    return e.CardLife
}

function de(e) {
    return e.CardDefense
}

function fe(e) {
    return e.CardPower
}

function pe(e) {
    return e.CardResource
}

function me(e) {
    return e.CardPitch
}

function he(e) {
    return e.meldActiveHalf
}

function ge(e) {
    return e.meldHalfB
}

function _e(e) {
    return e.meldHalfA
}
var ve = i();

function ye() {
    let e = (0, ve.c)(25),
        {
            t
        } = n(`card-creator`),
        {
            CardTalent: r,
            CardType: i,
            CardClass: o,
            CardSecondaryClass: u,
            CardSubType: d,
            CardWeapon: f
        } = s(),
        m;
    e[0] !== r || e[1] !== t ? (m = r && r !== `none` ? t(c[r]) || r : null, e[0] = r, e[1] = t, e[2] = m) : m = e[2];
    let h = m,
        g;
    e[3] !== o || e[4] !== t ? (g = o && o !== `none` ? t(l[o]) || o : null, e[3] = o, e[4] = t, e[5] = g) : g = e[5];
    let _ = g,
        v;
    e[6] !== u || e[7] !== t ? (v = u && u !== `none` ? t(l[u]) || u : null, e[6] = u, e[7] = t, e[8] = v) : v = e[8];
    let y = v,
        b = _ && y ? `${_}${i===`hero`||i===`demi_hero`?` `:` / `}${y}` : _,
        ee;
    e[9] !== i || e[10] !== t ? (ee = i ? t(a[i].label) : null, e[9] = i, e[10] = t, e[11] = ee) : ee = e[11];
    let te = ee,
        x;
    if (e[12] !== d || e[13] !== i || e[14] !== f || e[15] !== t) {
        if (x = [], i && d && d !== `none`) {
            let n = p[i] ?.[d] || d;
            if (n) {
                let r;
                e[17] !== n || e[18] !== t ? (r = t(n), e[17] = n, e[18] = t, e[19] = r) : r = e[19], x.push(r)
            }
        }(i === `weapon` || i === `weapon_equipment`) && f && x.push(f), e[12] = d, e[13] = i, e[14] = f, e[15] = t, e[16] = x
    } else x = e[16];
    let ne = x.length > 0 ? `- ${x.join(` `)}` : null,
        S;
    return e[20] !== te || e[21] !== b || e[22] !== ne || e[23] !== h ? (S = [h, b, te, ne].filter(be), e[20] = te, e[21] = b, e[22] = ne, e[23] = h, e[24] = S) : S = e[24], S.join(` `)
}

function be(e) {
    return !!e
}
var w = i();

function xe() {
    let e = (0, w.c)(6),
        t = s(we),
        n = s(Ce),
        r = s(Se),
        i;
    bb0: {
        if (t === `dented`) {
            let t;
            e[0] !== r || e[1] !== n ? (t = T(n, r), e[0] = r, e[1] = n, e[2] = t) : t = e[2], i = t;
            break bb0
        }
        let a;e[3] !== r || e[4] !== n ? (a = E(n, r), e[3] = r, e[4] = n, e[5] = a) : a = e[5],
        i = a
    }
    return i
}

function Se(e) {
    return e.CardArtworkCredits
}

function Ce(e) {
    return e.CardSetNumber
}

function we(e) {
    return e.CardBackStyle
}

function T(e, t) {
    return e === null && t === null ? `FABKIT - NOT LEGAL - FLESH AND BLOOD TCG BY LLS` : e === null ? [`FABKIT - ${t}`, `NOT LEGAL - FLESH AND BLOOD TCG BY LLS`] : t === null ? [`${e} - FABKIT`, `NOT LEGAL - FLESH AND BLOOD TCG BY LLS`] : [`${e} - FABKIT - ${t}`, `NOT LEGAL - FLESH AND BLOOD TCG BY LLS`]
}

function E(e, t) {
    return [
        [e, `FABKIT`, t].filter(e => e ?.trim() ?.length).join(` | `), `FaB TCC BY LSS`
    ]
}
var Te = i();

function Ee(e, t) {
    let n = e ?.images.find(e => e.pitch === t) ?? e ?.images[0];
    if (n) return n.objectUrl ? n.objectUrl : n.fileName ? `/cardbacks/${n.fileName}` : void 0
}

function D(e) {
    let t = (0, Te.c)(167),
        {
            config: n,
            ref: r
        } = e,
        i = s(Ue),
        a = s(He),
        o = s(Ve),
        c = s(Be),
        l = s(ze),
        u = s(Re),
        p = s(Le),
        m = s(Ie),
        g = s(Fe),
        v = s(Pe),
        y = s(Ne),
        b = s(Me),
        te = s(je),
        [ne] = f(s(Ae), 150),
        S;
    t[0] === ne ? S = t[1] : (S = ne ?.replace(/\bloading="lazy"\b/g, ``) ?? null, t[0] = ne, t[1] = S);
    let re = S,
        C = s(ke),
        ie = s(Oe),
        ae = s(De),
        oe = u || ``,
        se = n.elements.CardName.maxWidth ?? 1 / 0,
        ce;
    t[2] !== n.elements.CardName.fontFamily || t[3] !== n.elements.CardName.fontSize || t[4] !== n.elements.CardName.fontWeight || t[5] !== n.elements.CardName.scaledY || t[6] !== n.elements.CardName.y || t[7] !== oe || t[8] !== se ? (ce = {
        text: oe,
        fontFamily: n.elements.CardName.fontFamily,
        fontWeight: n.elements.CardName.fontWeight,
        baseFontSize: n.elements.CardName.fontSize,
        baseY: n.elements.CardName.y,
        maxWidth: se,
        scaledY: n.elements.CardName.scaledY
    }, t[2] = n.elements.CardName.fontFamily, t[3] = n.elements.CardName.fontSize, t[4] = n.elements.CardName.fontWeight, t[5] = n.elements.CardName.scaledY, t[6] = n.elements.CardName.y, t[7] = oe, t[8] = se, t[9] = ce) : ce = t[9];
    let {
        fontSize: le,
        y: ue
    } = _(ce), de = re || ``, fe = n.elements.CardText.fontSize ?? 20, pe;
    t[10] !== n.elements.CardText.height || t[11] !== n.elements.CardText.lineHeight || t[12] !== n.elements.CardText.minFontSize || t[13] !== n.elements.CardText.overflowScalingFactor || t[14] !== n.elements.CardText.paragraphSpacing || t[15] !== n.elements.CardText.width || t[16] !== de || t[17] !== fe ? (pe = {
        html: de,
        boxWidth: n.elements.CardText.width,
        boxHeight: n.elements.CardText.height,
        maxFontSize: fe,
        minFontSize: n.elements.CardText.minFontSize,
        lineHeight: n.elements.CardText.lineHeight,
        paragraphSpacing: n.elements.CardText.paragraphSpacing,
        overflowScalingFactor: n.elements.CardText.overflowScalingFactor
    }, t[10] = n.elements.CardText.height, t[11] = n.elements.CardText.lineHeight, t[12] = n.elements.CardText.minFontSize, t[13] = n.elements.CardText.overflowScalingFactor, t[14] = n.elements.CardText.paragraphSpacing, t[15] = n.elements.CardText.width, t[16] = de, t[17] = fe, t[18] = pe) : pe = t[18];
    let me = ee(pe),
        he = h(te),
        ge = h(ie),
        _e;
    t[19] !== i || t[20] !== l ? (_e = Ee(i, l), t[19] = i, t[20] = l, t[21] = _e) : _e = t[21];
    let ve = _e,
        be;
    t[22] !== a || t[23] !== l ? (be = Ee(a, l), t[22] = a, t[23] = l, t[24] = be) : be = t[24];
    let w = be,
        Se = n.viewBox.width * o,
        Ce = c * 200,
        we = Se - Math.max(Ce, 1) / 2,
        T = Se + Math.max(Ce, 1) / 2,
        E = ye(),
        D = xe(),
        Ke = n.elements.CardBottomText.maxWidth ?? n.viewBox.width,
        O;
    t[25] !== E || t[26] !== n.elements.CardBottomText.fontFamily || t[27] !== n.elements.CardBottomText.fontSize || t[28] !== n.elements.CardBottomText.fontWeight || t[29] !== n.elements.CardBottomText.scaledY || t[30] !== n.elements.CardBottomText.y || t[31] !== Ke ? (O = {
        text: E,
        fontFamily: n.elements.CardBottomText.fontFamily,
        fontWeight: n.elements.CardBottomText.fontWeight,
        baseFontSize: n.elements.CardBottomText.fontSize,
        baseY: n.elements.CardBottomText.y,
        maxWidth: Ke,
        scaledY: n.elements.CardBottomText.scaledY
    }, t[25] = E, t[26] = n.elements.CardBottomText.fontFamily, t[27] = n.elements.CardBottomText.fontSize, t[28] = n.elements.CardBottomText.fontWeight, t[29] = n.elements.CardBottomText.scaledY, t[30] = n.elements.CardBottomText.y, t[31] = Ke, t[32] = O) : O = t[32];
    let {
        fontSize: qe,
        y: Je
    } = _(O), k = `${n.viewBox.width}/${n.viewBox.height}`, Ye;
    t[33] === k ? Ye = t[34] : (Ye = {
        aspectRatio: k
    }, t[33] = k, t[34] = Ye);
    let A = Ye,
        Xe = `0 0 ${n.viewBox.width} ${n.viewBox.height}`,
        j;
    t[35] === u ? j = t[36] : (j = (0, x.jsx)(`title`, {
        children: u
    }), t[35] = u, t[36] = j);
    let M;
    t[37] === n.artworkClip ? M = t[38] : (M = n.artworkClip && (0, x.jsx)(`clipPath`, {
        id: `artwork-clip`,
        children: (0, x.jsx)(`rect`, {
            x: n.artworkClip.x,
            y: n.artworkClip.y,
            width: n.artworkClip.width,
            height: n.artworkClip.height
        })
    }), t[37] = n.artworkClip, t[38] = M);
    let N;
    t[39] === n.clips.Title ? N = t[40] : (N = (0, x.jsx)(`clipPath`, {
        id: `title-clip`,
        children: n.clips.Title
    }), t[39] = n.clips.Title, t[40] = N);
    let P;
    t[41] === n.clips.BottomText ? P = t[42] : (P = (0, x.jsx)(`clipPath`, {
        id: `bottom-text-clip`,
        children: n.clips.BottomText
    }), t[41] = n.clips.BottomText, t[42] = P);
    let F;
    t[43] !== T || t[44] !== we || t[45] !== w || t[46] !== n.viewBox.height || t[47] !== n.viewBox.width ? (F = w && (0, x.jsxs)(x.Fragment, {
        children: [(0, x.jsx)(`clipPath`, {
            id: `cardback-clip-left`,
            children: (0, x.jsx)(`rect`, {
                x: 0,
                y: 0,
                width: Math.max(T, 0),
                height: n.viewBox.height
            })
        }), (0, x.jsxs)(`mask`, {
            id: `cardback-mask-right`,
            children: [(0, x.jsxs)(`linearGradient`, {
                id: `cardback-blend-gradient`,
                gradientUnits: `userSpaceOnUse`,
                x1: we,
                y1: 0,
                x2: T,
                y2: 0,
                children: [(0, x.jsx)(`stop`, {
                    offset: `0`,
                    stopColor: `black`
                }), (0, x.jsx)(`stop`, {
                    offset: `1`,
                    stopColor: `white`
                })]
            }), (0, x.jsx)(`rect`, {
                x: 0,
                y: 0,
                width: n.viewBox.width,
                height: n.viewBox.height,
                fill: `url(#cardback-blend-gradient)`
            })]
        })]
    }), t[43] = T, t[44] = we, t[45] = w, t[46] = n.viewBox.height, t[47] = n.viewBox.width, t[48] = F) : F = t[48];
    let I;
    t[49] !== M || t[50] !== N || t[51] !== P || t[52] !== F ? (I = (0, x.jsxs)(`defs`, {
        children: [M, N, P, F]
    }), t[49] = M, t[50] = N, t[51] = P, t[52] = F, t[53] = I) : I = t[53];
    let L;
    t[54] !== C ?.height || t[55] !== C ?.width || t[56] !== C ?.x || t[57] !== C ?.y || t[58] !== he || t[59] !== n.artworkClip ? (L = he && (0, x.jsx)(`image`, {
        href: he,
        x: C ?.x || 0,
        y: C ?.y || 0,
        width: C ?.width || 0,
        height: C ?.height || 0,
        preserveAspectRatio: `xMidYMid slice`,
        clipPath: n.artworkClip ? `url(#artwork-clip)` : void 0
    }), t[54] = C ?.height, t[55] = C ?.width, t[56] = C ?.x, t[57] = C ?.y, t[58] = he, t[59] = n.artworkClip, t[60] = L) : L = t[60];
    let Ze = w ? `url(#cardback-clip-left)` : void 0,
        R;
    t[61] !== ve || t[62] !== n.viewBox.height || t[63] !== n.viewBox.width || t[64] !== Ze ? (R = (0, x.jsx)(`image`, {
        href: ve,
        x: `0`,
        y: `0`,
        width: n.viewBox.width,
        height: n.viewBox.height,
        preserveAspectRatio: `xMidYMid slice`,
        clipPath: Ze
    }), t[61] = ve, t[62] = n.viewBox.height, t[63] = n.viewBox.width, t[64] = Ze, t[65] = R) : R = t[65];
    let z;
    t[66] !== w || t[67] !== n.viewBox.height || t[68] !== n.viewBox.width ? (z = w && (0, x.jsx)(`image`, {
        href: w,
        x: `0`,
        y: `0`,
        width: n.viewBox.width,
        height: n.viewBox.height,
        preserveAspectRatio: `xMidYMid slice`,
        mask: `url(#cardback-mask-right)`
    }), t[66] = w, t[67] = n.viewBox.height, t[68] = n.viewBox.width, t[69] = z) : z = t[69];
    let B;
    t[70] !== R || t[71] !== z ? (B = (0, x.jsxs)(`g`, {
        children: [R, z]
    }), t[70] = R, t[71] = z, t[72] = B) : B = t[72];
    let V;
    t[73] !== u || t[74] !== le || t[75] !== ue || t[76] !== n.elements.CardName.fill || t[77] !== n.elements.CardName.fontFamily || t[78] !== n.elements.CardName.fontWeight || t[79] !== n.elements.CardName.textAnchor || t[80] !== n.elements.CardName.x ? (V = u && (0, x.jsx)(`text`, {
        x: n.elements.CardName.x,
        y: ue,
        textAnchor: n.elements.CardName.textAnchor || `middle`,
        dominantBaseline: `middle`,
        fill: n.elements.CardName.fill,
        fontFamily: n.elements.CardName.fontFamily,
        fontSize: le,
        fontWeight: n.elements.CardName.fontWeight,
        clipPath: `url(#title-clip)`,
        children: u
    }), t[73] = u, t[74] = le, t[75] = ue, t[76] = n.elements.CardName.fill, t[77] = n.elements.CardName.fontFamily, t[78] = n.elements.CardName.fontWeight, t[79] = n.elements.CardName.textAnchor, t[80] = n.elements.CardName.x, t[81] = V) : V = t[81];
    let H;
    t[82] !== p || t[83] !== n.elements.CardResource ? (H = p && (0, x.jsx)(`text`, {
        x: n.elements.CardResource.x,
        y: n.elements.CardResource.y,
        textAnchor: n.elements.CardResource.textAnchor || `middle`,
        dominantBaseline: `middle`,
        fill: `none`,
        fontFamily: n.elements.CardResource.fontFamily,
        fontSize: n.elements.CardResource.fontSize,
        fontWeight: n.elements.CardResource.fontWeight,
        stroke: n.elements.CardResource.stroke,
        strokeWidth: n.elements.CardResource.strokeWidth,
        paintOrder: n.elements.CardResource.paintOrder,
        children: p
    }), t[82] = p, t[83] = n.elements.CardResource, t[84] = H) : H = t[84];
    let U;
    t[85] !== p || t[86] !== n.elements.CardResource ? (U = p && (0, x.jsx)(`text`, {
        x: n.elements.CardResource.x,
        y: n.elements.CardResource.y,
        textAnchor: n.elements.CardResource.textAnchor || `middle`,
        dominantBaseline: `middle`,
        fill: n.elements.CardResource.fill,
        fontFamily: n.elements.CardResource.fontFamily,
        fontSize: n.elements.CardResource.fontSize,
        fontWeight: n.elements.CardResource.fontWeight,
        children: p
    }), t[85] = p, t[86] = n.elements.CardResource, t[87] = U) : U = t[87];
    let W;
    t[88] !== me || t[89] !== n.elements.CardText.boldFontSize || t[90] !== n.elements.CardText.boldLetterSpacing || t[91] !== n.elements.CardText.height || t[92] !== n.elements.CardText.italicFontSize || t[93] !== n.elements.CardText.italicLetterSpacing || t[94] !== n.elements.CardText.letterSpacing || t[95] !== n.elements.CardText.lineHeight || t[96] !== n.elements.CardText.paragraphSpacing || t[97] !== n.elements.CardText.width || t[98] !== n.elements.CardText.x || t[99] !== n.elements.CardText.y || t[100] !== re ? (W = re && (0, x.jsx)(`foreignObject`, {
        x: n.elements.CardText.x,
        y: n.elements.CardText.y,
        width: n.elements.CardText.width,
        height: n.elements.CardText.height,
        children: (0, x.jsx)(`div`, {
            className: `flex h-full w-full flex-col justify-center items-center`,
            children: (0, x.jsx)(`div`, {
                className: `renderedContent text-black text-center font-card-text`,
                style: {
                    fontSize: me,
                    lineHeight: n.elements.CardText.lineHeight,
                    "--paragraph-spacing": n.elements.CardText.paragraphSpacing == null ? void 0 : `${n.elements.CardText.paragraphSpacing}em`,
                    "--bold-font-size": n.elements.CardText.boldFontSize == null ? void 0 : `${n.elements.CardText.boldFontSize}em`,
                    "--italic-font-size": n.elements.CardText.italicFontSize == null ? void 0 : `${n.elements.CardText.italicFontSize}em`,
                    letterSpacing: n.elements.CardText.letterSpacing == null ? void 0 : `${n.elements.CardText.letterSpacing}em`,
                    "--bold-letter-spacing": n.elements.CardText.boldLetterSpacing == null ? void 0 : `${n.elements.CardText.boldLetterSpacing}em`,
                    "--italic-letter-spacing": n.elements.CardText.italicLetterSpacing == null ? void 0 : `${n.elements.CardText.italicLetterSpacing}em`
                },
                dangerouslySetInnerHTML: {
                    __html: re
                }
            })
        })
    }), t[88] = me, t[89] = n.elements.CardText.boldFontSize, t[90] = n.elements.CardText.boldLetterSpacing, t[91] = n.elements.CardText.height, t[92] = n.elements.CardText.italicFontSize, t[93] = n.elements.CardText.italicLetterSpacing, t[94] = n.elements.CardText.letterSpacing, t[95] = n.elements.CardText.lineHeight, t[96] = n.elements.CardText.paragraphSpacing, t[97] = n.elements.CardText.width, t[98] = n.elements.CardText.x, t[99] = n.elements.CardText.y, t[100] = re, t[101] = W) : W = t[101];
    let G;
    t[102] !== m || t[103] !== n.elements.CardPowerImage || t[104] !== n.elements.CardPowerText ? (G = m && (0, x.jsxs)(x.Fragment, {
        children: [(0, x.jsx)(`image`, {
            href: `/img/symbols/cardsymbol_power.svg`,
            x: n.elements.CardPowerImage.x,
            y: n.elements.CardPowerImage.y,
            width: n.elements.CardPowerImage.width,
            height: n.elements.CardPowerImage.height,
            preserveAspectRatio: `xMidYMid slice`
        }), (0, x.jsx)(`text`, {
            x: n.elements.CardPowerText.x,
            y: n.elements.CardPowerText.y,
            textAnchor: n.elements.CardPowerText.textAnchor || `middle`,
            dominantBaseline: `middle`,
            fill: n.elements.CardPowerText.fill,
            fontFamily: n.elements.CardPowerText.fontFamily,
            fontSize: n.elements.CardPowerText.fontSize,
            fontWeight: n.elements.CardPowerText.fontWeight,
            children: m
        })]
    }), t[102] = m, t[103] = n.elements.CardPowerImage, t[104] = n.elements.CardPowerText, t[105] = G) : G = t[105];
    let K;
    t[106] !== g || t[107] !== n.elements.CardIntellectText || t[108] !== n.elements.CardPowerImage ? (K = g && (0, x.jsxs)(x.Fragment, {
        children: [(0, x.jsx)(`image`, {
            href: `/img/symbols/cardsymbol_intellect.svg`,
            x: n.elements.CardPowerImage.x,
            y: n.elements.CardPowerImage.y,
            width: n.elements.CardPowerImage.width,
            height: n.elements.CardPowerImage.height,
            preserveAspectRatio: `xMidYMid slice`
        }), (0, x.jsx)(`text`, {
            x: n.elements.CardIntellectText.x,
            y: n.elements.CardIntellectText.y,
            textAnchor: n.elements.CardIntellectText.textAnchor || `middle`,
            dominantBaseline: `middle`,
            fill: n.elements.CardIntellectText.fill,
            fontFamily: n.elements.CardIntellectText.fontFamily,
            fontSize: n.elements.CardIntellectText.fontSize,
            fontWeight: n.elements.CardIntellectText.fontWeight,
            children: g
        })]
    }), t[106] = g, t[107] = n.elements.CardIntellectText, t[108] = n.elements.CardPowerImage, t[109] = K) : K = t[109];
    let q;
    t[110] !== y || t[111] !== n.elements.CardDefenseImage || t[112] !== n.elements.CardDefenseText ? (q = y && (0, x.jsxs)(x.Fragment, {
        children: [(0, x.jsx)(`image`, {
            href: `/img/symbols/cardsymbol_defense.svg`,
            x: n.elements.CardDefenseImage.x,
            y: n.elements.CardDefenseImage.y,
            width: n.elements.CardDefenseImage.width,
            height: n.elements.CardDefenseImage.height,
            preserveAspectRatio: `xMidYMid slice`
        }), (0, x.jsx)(`text`, {
            x: n.elements.CardDefenseText.x,
            y: n.elements.CardDefenseText.y,
            textAnchor: n.elements.CardDefenseText.textAnchor || `middle`,
            dominantBaseline: `middle`,
            fill: n.elements.CardDefenseText.fill,
            fontFamily: n.elements.CardDefenseText.fontFamily,
            fontSize: n.elements.CardDefenseText.fontSize,
            fontWeight: n.elements.CardDefenseText.fontWeight,
            children: y
        })]
    }), t[110] = y, t[111] = n.elements.CardDefenseImage, t[112] = n.elements.CardDefenseText, t[113] = q) : q = t[113];
    let J;
    t[114] !== b || t[115] !== n.elements.CardDefenseImage || t[116] !== n.elements.CardLifeText ? (J = b && (0, x.jsxs)(x.Fragment, {
        children: [(0, x.jsx)(`image`, {
            href: `/img/symbols/cardsymbol_life.svg`,
            x: n.elements.CardDefenseImage.x,
            y: n.elements.CardDefenseImage.y,
            width: n.elements.CardDefenseImage.width,
            height: n.elements.CardDefenseImage.height,
            preserveAspectRatio: `xMidYMid slice`
        }), (0, x.jsx)(`text`, {
            x: n.elements.CardLifeText.x,
            y: n.elements.CardLifeText.y,
            textAnchor: n.elements.CardLifeText.textAnchor || `middle`,
            dominantBaseline: `middle`,
            fill: n.elements.CardLifeText.fill,
            fontFamily: n.elements.CardLifeText.fontFamily,
            fontSize: n.elements.CardLifeText.fontSize,
            fontWeight: n.elements.CardLifeText.fontWeight,
            children: b
        })]
    }), t[114] = b, t[115] = n.elements.CardDefenseImage, t[116] = n.elements.CardLifeText, t[117] = J) : J = t[117];
    let Y;
    t[118] !== E || t[119] !== qe || t[120] !== Je || t[121] !== n.elements.CardBottomText.fill || t[122] !== n.elements.CardBottomText.fontFamily || t[123] !== n.elements.CardBottomText.fontWeight || t[124] !== n.elements.CardBottomText.textAnchor || t[125] !== n.elements.CardBottomText.x ? (Y = E && (0, x.jsx)(`text`, {
        x: n.elements.CardBottomText.x,
        y: Je,
        textAnchor: n.elements.CardBottomText.textAnchor || `middle`,
        dominantBaseline: `middle`,
        fill: n.elements.CardBottomText.fill,
        fontFamily: n.elements.CardBottomText.fontFamily,
        fontSize: qe,
        fontWeight: n.elements.CardBottomText.fontWeight,
        clipPath: `url(#bottom-text-clip)`,
        children: E
    }), t[118] = E, t[119] = qe, t[120] = Je, t[121] = n.elements.CardBottomText.fill, t[122] = n.elements.CardBottomText.fontFamily, t[123] = n.elements.CardBottomText.fontWeight, t[124] = n.elements.CardBottomText.textAnchor, t[125] = n.elements.CardBottomText.x, t[126] = Y) : Y = t[126];
    let Qe = d[v || `basic`],
        X;
    t[127] !== n.elements.CardRarity.height || t[128] !== n.elements.CardRarity.width || t[129] !== n.elements.CardRarity.x || t[130] !== n.elements.CardRarity.y || t[131] !== Qe.icon ? (X = (0, x.jsx)(`image`, {
        href: Qe.icon,
        x: n.elements.CardRarity.x,
        y: n.elements.CardRarity.y,
        width: n.elements.CardRarity.width,
        height: n.elements.CardRarity.height,
        preserveAspectRatio: `xMidYMid slice`
    }), t[127] = n.elements.CardRarity.height, t[128] = n.elements.CardRarity.width, t[129] = n.elements.CardRarity.x, t[130] = n.elements.CardRarity.y, t[131] = Qe.icon, t[132] = X) : X = t[132];
    let Z;
    t[133] !== n || t[134] !== D ? (Z = n.variant === `dented` && We(n, D), t[133] = n, t[134] = D, t[135] = Z) : Z = t[135];
    let Q;
    t[136] !== n || t[137] !== D ? (Q = n.variant === `flat` && Ge(n, D), t[136] = n, t[137] = D, t[138] = Q) : Q = t[138];
    let $;
    t[139] !== ae || t[140] !== n.viewBox.height || t[141] !== n.viewBox.width || t[142] !== ge ? ($ = ge && (0, x.jsx)(`image`, {
        href: ge,
        x: 0,
        y: 0,
        opacity: ae,
        width: n.viewBox.width,
        height: n.viewBox.height,
        preserveAspectRatio: `xMidYMid slice`
    }), t[139] = ae, t[140] = n.viewBox.height, t[141] = n.viewBox.width, t[142] = ge, t[143] = $) : $ = t[143];
    let $e;
    return t[144] !== n.viewBox.height || t[145] !== n.viewBox.width || t[146] !== r || t[147] !== A || t[148] !== Xe || t[149] !== j || t[150] !== I || t[151] !== L || t[152] !== B || t[153] !== V || t[154] !== H || t[155] !== U || t[156] !== W || t[157] !== G || t[158] !== K || t[159] !== q || t[160] !== J || t[161] !== Y || t[162] !== X || t[163] !== Z || t[164] !== Q || t[165] !== $ ? ($e = (0, x.jsxs)(`svg`, {
        ref: r,
        viewBox: Xe,
        width: n.viewBox.width,
        height: n.viewBox.height,
        style: A,
        className: `w-full h-auto`,
        xmlns: `http://www.w3.org/2000/svg`,
        children: [j, I, L, B, V, H, U, W, G, K, q, J, Y, X, Z, Q, $]
    }), t[144] = n.viewBox.height, t[145] = n.viewBox.width, t[146] = r, t[147] = A, t[148] = Xe, t[149] = j, t[150] = I, t[151] = L, t[152] = B, t[153] = V, t[154] = H, t[155] = U, t[156] = W, t[157] = G, t[158] = K, t[159] = q, t[160] = J, t[161] = Y, t[162] = X, t[163] = Z, t[164] = Q, t[165] = $, t[166] = $e) : $e = t[166], $e
}

function De(e) {
    return e.CardOverlayOpacity
}

function Oe(e) {
    return e.CardOverlay
}

function ke(e) {
    return e.CardArtPosition
}

function Ae(e) {
    return e.CardTextHTML
}

function je(e) {
    return e.CardArtwork
}

function Me(e) {
    return e.CardLife
}

function Ne(e) {
    return e.CardDefense
}

function Pe(e) {
    return e.CardRarity
}

function Fe(e) {
    return e.CardHeroIntellect
}

function Ie(e) {
    return e.CardPower
}

function Le(e) {
    return e.CardResource
}

function Re(e) {
    return e.CardName
}

function ze(e) {
    return e.CardPitch
}

function Be(e) {
    return e.CardBackBlend
}

function Ve(e) {
    return e.CardBackSplit
}

function He(e) {
    return e.CardBackRight
}

function Ue(e) {
    return e.CardBack
}

function We(e, t) {
    return Array.isArray(t) ? (0, x.jsxs)(x.Fragment, {
        children: [(0, x.jsx)(`text`, {
            x: e.elements.CardFooterTextMulti[0].x,
            y: e.elements.CardFooterTextMulti[0].y,
            textAnchor: e.elements.CardFooterTextMulti[0].textAnchor || `middle`,
            dominantBaseline: `middle`,
            fill: e.elements.CardFooterTextMulti[0].fill,
            fontFamily: e.elements.CardFooterTextMulti[0].fontFamily,
            fontSize: e.elements.CardFooterTextMulti[0].fontSize,
            fontWeight: e.elements.CardFooterTextMulti[0].fontWeight,
            children: t[0]
        }), (0, x.jsx)(`text`, {
            x: e.elements.CardFooterTextMulti[1].x,
            y: e.elements.CardFooterTextMulti[1].y,
            textAnchor: e.elements.CardFooterTextMulti[1].textAnchor || `middle`,
            dominantBaseline: `middle`,
            fill: e.elements.CardFooterTextMulti[1].fill,
            fontFamily: e.elements.CardFooterTextMulti[1].fontFamily,
            fontSize: e.elements.CardFooterTextMulti[1].fontSize,
            fontWeight: e.elements.CardFooterTextMulti[1].fontWeight,
            children: t[1]
        })]
    }) : (0, x.jsx)(`text`, {
        x: e.elements.CardFooterTextSingle.x,
        y: e.elements.CardFooterTextSingle.y,
        textAnchor: e.elements.CardFooterTextSingle.textAnchor || `middle`,
        dominantBaseline: `middle`,
        fill: e.elements.CardFooterTextSingle.fill,
        fontFamily: e.elements.CardFooterTextSingle.fontFamily,
        fontSize: e.elements.CardFooterTextSingle.fontSize,
        fontWeight: e.elements.CardFooterTextSingle.fontWeight,
        children: t
    })
}

function Ge(e, t) {
    return Array.isArray(t) ? (0, x.jsxs)(x.Fragment, {
        children: [(0, x.jsx)(`text`, {
            x: e.elements.CardFooterTextLeft.x,
            y: e.elements.CardFooterTextLeft.y,
            textAnchor: e.elements.CardFooterTextLeft.textAnchor || `middle`,
            dominantBaseline: `central`,
            fill: e.elements.CardFooterTextLeft.fill,
            fontFamily: e.elements.CardFooterTextLeft.fontFamily,
            fontSize: e.elements.CardFooterTextLeft.fontSize,
            fontWeight: e.elements.CardFooterTextLeft.fontWeight,
            children: t[0]
        }), (0, x.jsx)(`text`, {
            x: e.elements.CardFooterTextRight.x,
            y: e.elements.CardFooterTextRight.y,
            textAnchor: e.elements.CardFooterTextRight.textAnchor || `middle`,
            dominantBaseline: `middle`,
            fill: e.elements.CardFooterTextRight.fill,
            fontFamily: e.elements.CardFooterTextRight.fontFamily,
            fontSize: e.elements.CardFooterTextRight.fontSize,
            fontWeight: e.elements.CardFooterTextRight.fontWeight,
            children: t[1]
        })]
    }) : null
}
var Ke = i();

function O(e) {
    let t = (0, Ke.c)(11),
        {
            ref: r,
            isExport: i
        } = e,
        a = i === void 0 ? !1 : i,
        {
            t: o
        } = n(`card-creator`),
        c = u[s(qe) ?.renderer || ``] || null;
    switch (c ?.renderer) {
        case null:
            return null;
        case `normal`:
            {
                let e;
                return t[0] !== r || t[1] !== c ? (e = (0, x.jsx)(D, {
                    ref: r,
                    config: c
                }), t[0] = r, t[1] = c, t[2] = e) : e = t[2],
                e
            }
        case `meld`:
            {
                let e = c,
                    n;
                return t[3] !== a || t[4] !== r || t[5] !== e ? (n = (0, x.jsx)(S, {
                    ref: r,
                    config: e,
                    isExport: a
                }), t[3] = a, t[4] = r, t[5] = e, t[6] = n) : n = t[6],
                n
            }
        default:
            {
                let e;t[7] === o ? e = t[8] : (e = o(`components.renderer.unsupported`), t[7] = o, t[8] = e);
                let n;
                return t[9] === e ? n = t[10] : (n = (0, x.jsx)(`div`, {
                    className: `border border-red-500 p-4`,
                    children: (0, x.jsx)(`span`, {
                        className: `text-xl text-red-500`,
                        children: e
                    })
                }), t[9] = e, t[10] = n),
                n
            }
    }
}

function qe(e) {
    return e.CardBack
}
export {
    p as n, O as t
};
//# sourceMappingURL=Renderer-D-nZpG3D.js.map