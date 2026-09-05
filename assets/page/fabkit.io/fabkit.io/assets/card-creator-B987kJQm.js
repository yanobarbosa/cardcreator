import {
    n as e
} from "./chunk-B3K2TuZy.js";
import {
    a as t,
    o as n,
    t as r
} from "./compiler-runtime-4XzsAixn.js";
import {
    B as i,
    F as a,
    I as o,
    V as s,
    a as c,
    c as l,
    s as u,
    t as d,
    z as f
} from "./v4-DqHAiBF8.js";
import {
    t as p
} from "./react-B1rjmc0O.js";
import {
    t as m
} from "./middleware-D-3Mg_OF.js";

function h(e, t, n) {
    return [...i(t, n), ...c(e, t, n)]
}

function g(e, t) {
    let n = s(i(e, t)),
        r = t === `dented`;
    return {
        type: n ?.type ?? `general`,
        dented: n ?.dented ?? r,
        renderer: n ?.renderer ?? (r ? `normal_dented` : `normal_flat`)
    }
}
var _ = `missing-custom-frame`;

function v(e, t, n) {
    return {
        id: e,
        name: _,
        source: `custom`,
        missing: !0,
        ...g(t, n),
        images: [{
            id: 0,
            pitch: 0,
            fileName: `missing-frame.png`
        }]
    }
}

function y(e, t, n) {
    return e ?.missing ? v(e.id, t, n) : null
}

function b(e, t, n, r) {
    return y(e, t, n) ?? r()
}
const x = [`CardPitch`, `CardName`, `CardResource`, `CardPower`, `CardText`, `CardTalent`, `CardClass`, `CardSecondaryClass`, `CardSubType`, `CardRarity`, `CardDefense`, `CardLife`, `CardHeroIntellect`, `CardWeapon`, `CardMacroGroup`];
var S = r();
n();

function C(e) {
    let t = (0, S.c)(3),
        n = L(w),
        r;
    bb0: {
        if (!n) {
            r = !1;
            break bb0
        }
        let i = a[n].fields,
            o;t[0] !== e || t[1] !== i ? (o = i.includes(e), t[0] = e, t[1] = i, t[2] = o) : o = t[2],
        r = o
    }
    return r
}

function w(e) {
    return e.CardType
}

function T(e, t) {
    return t ? a[t].fields.includes(e) : !1
}
var E = e(t(), 1);
const D = {
        renderer: `meld`,
        viewBox: {
            width: 628,
            height: 450
        },
        leftHalfWidth: 312,
        centerGap: 4,
        artworkDragZone: {
            x: 0,
            y: 0,
            width: 0,
            height: 0
        },
        leftArtworkDragZone: {
            x: 28,
            y: 56,
            width: 286,
            height: 243
        },
        rightArtworkDragZone: {
            x: 314,
            y: 56,
            width: 286,
            height: 243
        },
        masks: {
            LeftArtWork: (0, E.jsx)(`rect`, {
                x: `28`,
                y: `56`,
                width: `286`,
                height: `243`,
                fill: `white`
            }),
            RightArtWork: (0, E.jsx)(`rect`, {
                x: `314`,
                y: `56`,
                width: `286`,
                height: `243`,
                fill: `white`
            })
        },
        clips: {},
        half: {
            CardName: {
                x: 187,
                y: 48,
                width: 211,
                height: 18.5,
                fill: `black`,
                fontFamily: `amanda_std_regular`,
                fontSize: 20,
                fontWeight: 400,
                maxWidth: 226,
                scaledY: 41.5
            },
            CardText: {
                x: 47,
                y: 313,
                width: 248,
                height: 66,
                fontSize: 14,
                minFontSize: 4,
                overflowScalingFactor: .99
            },
            CardBottomText: {
                x: 191.5,
                y: 403.5,
                width: 215,
                height: 18,
                fill: `black`,
                fontFamily: `amanda_std_regular`,
                fontSize: 12.7,
                fontWeight: 400,
                maxWidth: 200,
                scaledY: 399.5
            }
        },
        shared: {
            CardResource: {
                x: 584.5,
                y: 45.7,
                fill: `black`,
                fontFamily: `palatino_lt_stdroman`,
                fontSize: 12,
                fontWeight: 400,
                stroke: `#C42025`,
                strokeWidth: 1.5,
                paintOrder: `stroke`
            },
            CardPowerImage: {
                x: 26,
                y: 387,
                width: 21,
                height: 21
            },
            CardPowerText: {
                x: 59.5,
                y: 403,
                fill: `black`,
                fontFamily: `palatino_lt_stdroman`,
                fontSize: 12.5,
                fontWeight: 400
            },
            CardDefenseImage: {
                x: 581,
                y: 387,
                width: 21,
                height: 21
            },
            CardDefenseText: {
                x: 568.5,
                y: 403,
                fill: `black`,
                fontFamily: `palatino_lt_stdroman`,
                fontSize: 12.5,
                fontWeight: 400
            },
            CardLifeText: {
                x: 569,
                y: 402,
                fill: `black`,
                fontFamily: `palatino_lt_stdroman`,
                fontSize: 12.5,
                fontWeight: 400
            },
            CardIntellectText: {
                x: 59.5,
                y: 403,
                fill: `black`,
                fontFamily: `palatino_lt_stdroman`,
                fontSize: 12.5,
                fontWeight: 400
            },
            CardRarity: {
                x: 26.7,
                y: 418.5,
                width: 12,
                height: 12
            },
            MeldBandText: {
                x: 314,
                y: 288.5,
                fill: `black`,
                fontFamily: `palatino_lt_italic`,
                fontSize: 11.42,
                fontWeight: 400
            },
            CardFooterTextLeft: {
                x: 44.5,
                y: 426,
                fill: `white`,
                fontFamily: `dialog_cond_semiboldregular, "Arial Narrow", "Helvetica Condensed", Arial, sans-serif`,
                fontSize: 11,
                fontWeight: 400,
                textAnchor: `start`
            },
            CardFooterTextRight: {
                x: 601,
                y: 426,
                fill: `white`,
                fontFamily: `dialog_cond_semiboldregular, "Arial Narrow", "Helvetica Condensed", Arial, sans-serif`,
                fontSize: 11,
                fontWeight: 400,
                textAnchor: `end`
            }
        },
        elements: {}
    },
    O = .5,
    k = 200,
    A = .4,
    j = [`equipment`, `hero`, `weapon`, `demi_hero`, `weapon_equipment`, `meld`, `event`, `macro`, `mentor`],
    M = {
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
    };
var N = `action`,
    P = `dented`,
    F = s(i(N, P)) ?? f[0],
    I = {
        __version: d(),
        CardType: N,
        CardBack: F,
        CardBackRight: null,
        CardBackSplit: O,
        CardBackBlend: A,
        CardBackStyle: P,
        CardArtwork: null,
        CardArtPosition: null,
        CardArtworkCredits: null,
        CardSetNumber: null,
        CardTextHTML: null,
        CardTextNode: null,
        CardPitch: null,
        CardName: null,
        CardResource: null,
        CardText: null,
        CardPower: null,
        CardTalent: null,
        CardClass: null,
        CardSecondaryClass: null,
        CardSubType: null,
        CardRarity: `basic`,
        CardDefense: null,
        CardLife: null,
        CardHeroIntellect: null,
        CardWeapon: null,
        CardMacroGroup: null,
        CardOverlay: null,
        CardOverlayOpacity: .5,
        meldActiveHalf: `A`,
        meldHalfA: { ...M
        },
        meldHalfB: { ...M
        }
    };
const L = p()(m((e, t, n) => ({ ...I,
    setCardType: t => e(e => {
        let n = u(),
            r = h(n, t, e.CardBackStyle),
            i = e.CardBackStyle,
            a = b(e.CardBack, t, i, () => e.CardBack !== null && r.some(t => t.id === e.CardBack ?.id) ? e.CardBack : s(r));
        if (a === null) {
            for (let e of o)
                if (r = h(n, t, e), r.length > 0 && (a = s(r)), a !== null) {
                    i = e;
                    break
                }
        }
        let c = t === `meld` ? null : b(e.CardBackRight, t, i, () => e.CardBackRight === null ? null : s(r, e.CardBackRight)),
            l = {
                CardType: t,
                CardBack: a,
                CardBackRight: c,
                CardBackStyle: i
            };
        for (let e of x) T(e, t) || Object.assign(l, {
            [e]: null
        });
        return t === `meld` && e.CardType !== t && (l.meldActiveHalf = `A`, l.meldHalfA = { ...M
        }, l.meldHalfB = { ...M
        }), l
    }),
    setCardBack: t => e({
        CardBack: t
    }),
    setCardBackRight: t => e({
        CardBackRight: t
    }),
    setCardBackSplit: t => e({
        CardBackSplit: Math.abs(t - .5) < .02 ? O : Math.max(.02, Math.min(.98, t))
    }),
    setCardBackBlend: t => e({
        CardBackBlend: Math.max(0, Math.min(1, t))
    }),
    toggleHybrid: () => e(e => {
        if (e.CardBackRight !== null) return {
            CardBackRight: null
        };
        let t = h(u(), e.CardType, e.CardBackStyle);
        if (t.length < 2) return {};
        let n = e.CardBack ? t.findIndex(t => t.id === e.CardBack ?.id) : -1;
        return {
            CardBackRight: t[(n === -1 ? 0 : n + 1) % t.length]
        }
    }),
    setCardBackStyle: t => e(e => {
        let n = h(u(), e.CardType, t);
        return {
            CardBackStyle: t,
            CardBack: b(e.CardBack, e.CardType, t, () => e.CardBack !== null && n.some(t => t.id === e.CardBack ?.id) ? e.CardBack : s(n, e.CardBack)),
            CardBackRight: b(e.CardBackRight, e.CardType, t, () => e.CardBackRight === null ? null : n.some(t => t.id === e.CardBackRight ?.id) ? e.CardBackRight : s(n, e.CardBackRight))
        }
    }),
    setCardArtwork: async t => {
        if (!t) {
            e({
                CardArtwork: null,
                CardArtPosition: null
            });
            return
        }
        let n = new Image,
            r = URL.createObjectURL(t);
        try {
            await new Promise((e, t) => {
                n.onload = () => e(), n.onerror = () => t(Error(`Failed to load image`)), n.src = r
            }), e({
                CardArtwork: t,
                CardArtPosition: {
                    x: 0,
                    y: 0,
                    width: n.naturalWidth,
                    height: n.naturalHeight
                }
            })
        } finally {
            URL.revokeObjectURL(r)
        }
    },
    setCardArtPosition: t => e({
        CardArtPosition: t
    }),
    setCardArtworkCredits: t => e({
        CardArtworkCredits: t
    }),
    setCardSetNumber: t => e({
        CardSetNumber: t ?.toUpperCase()
    }),
    setCardText: (t, n) => e({
        CardTextHTML: t,
        CardTextNode: n
    }),
    setPitch: t => e({
        CardPitch: t
    }),
    setCardName: t => e({
        CardName: t
    }),
    setCardResource: t => e({
        CardResource: t
    }),
    setCardPower: t => e({
        CardPower: t
    }),
    setCardTalent: t => e({
        CardTalent: t
    }),
    setCardClass: t => e({
        CardClass: t
    }),
    setCardSecondaryClass: t => e({
        CardSecondaryClass: t
    }),
    setCardSubType: t => e({
        CardSubType: t
    }),
    setCardRarity: t => e({
        CardRarity: t
    }),
    setCardLife: t => e({
        CardLife: t
    }),
    setCardDefense: t => e({
        CardDefense: t
    }),
    setCardHeroIntellect: t => e({
        CardHeroIntellect: t
    }),
    setCardWeapon: t => e({
        CardWeapon: t
    }),
    setCardMacroGroup: t => e({
        CardMacroGroup: t
    }),
    setOverlay: t => e({
        CardOverlay: t
    }),
    setOverlayOpacity: t => e({
        CardOverlayOpacity: Math.max(0, Math.min(1, t))
    }),
    reset: () => e({ ...n.getInitialState(),
        __version: d()
    }),
    loadCard: t => e({ ...n.getInitialState(),
        ...t
    }),
    setMeldActiveHalf: t => e({
        meldActiveHalf: t
    }),
    setMeldHalfType: (t, n) => e(e => ({
        [t === `A` ? `meldHalfA` : `meldHalfB`]: { ...t === `A` ? e.meldHalfA : e.meldHalfB,
            CardType: n
        }
    })),
    setMeldHalfName: (t, n) => e(e => ({
        [t === `A` ? `meldHalfA` : `meldHalfB`]: { ...t === `A` ? e.meldHalfA : e.meldHalfB,
            CardName: n
        }
    })),
    setMeldHalfArtwork: async (t, n) => {
        let r = t === `A` ? `meldHalfA` : `meldHalfB`;
        if (!n) {
            e(e => ({
                [r]: { ...e[r],
                    CardArtwork: null,
                    CardArtPosition: null
                }
            }));
            return
        }
        let i = new Image,
            a = URL.createObjectURL(n);
        try {
            await new Promise((e, t) => {
                i.onload = () => e(), i.onerror = () => t(Error(`Failed to load image`)), i.src = a
            });
            let o = t === `B` ? D.rightArtworkDragZone.x : 0;
            e(e => ({
                [r]: { ...e[r],
                    CardArtwork: n,
                    CardArtPosition: {
                        x: o,
                        y: 0,
                        width: i.naturalWidth,
                        height: i.naturalHeight
                    }
                }
            }))
        } finally {
            URL.revokeObjectURL(a)
        }
    },
    setMeldHalfArtPosition: (t, n) => e(e => ({
        [t === `A` ? `meldHalfA` : `meldHalfB`]: { ...t === `A` ? e.meldHalfA : e.meldHalfB,
            CardArtPosition: n
        }
    })),
    setMeldHalfClass: (t, n) => e(e => ({
        [t === `A` ? `meldHalfA` : `meldHalfB`]: { ...t === `A` ? e.meldHalfA : e.meldHalfB,
            CardClass: n
        }
    })),
    setMeldHalfSecondaryClass: (t, n) => e(e => ({
        [t === `A` ? `meldHalfA` : `meldHalfB`]: { ...t === `A` ? e.meldHalfA : e.meldHalfB,
            CardSecondaryClass: n
        }
    })),
    setMeldHalfSubType: (t, n) => e(e => ({
        [t === `A` ? `meldHalfA` : `meldHalfB`]: { ...t === `A` ? e.meldHalfA : e.meldHalfB,
            CardSubType: n
        }
    })),
    setMeldHalfTalent: (t, n) => e(e => ({
        [t === `A` ? `meldHalfA` : `meldHalfB`]: { ...t === `A` ? e.meldHalfA : e.meldHalfB,
            CardTalent: n
        }
    })),
    setMeldHalfText: (t, n, r) => e(e => ({
        [t === `A` ? `meldHalfA` : `meldHalfB`]: { ...t === `A` ? e.meldHalfA : e.meldHalfB,
            CardTextHTML: n,
            CardTextNode: r
        }
    })),
    setMeldHalfMacroGroup: (t, n) => e(e => ({
        [t === `A` ? `meldHalfA` : `meldHalfB`]: { ...t === `A` ? e.meldHalfA : e.meldHalfB,
            CardMacroGroup: n
        }
    })),
    setMeldHalfWeapon: (t, n) => e(e => ({
        [t === `A` ? `meldHalfA` : `meldHalfB`]: { ...t === `A` ? e.meldHalfA : e.meldHalfB,
            CardWeapon: n
        }
    }))
})));
l(e => {
    let t = L.getState(),
        n = {};
    t.CardBack && !t.CardBack.missing && e.has(t.CardBack.id) && (n.CardBack = v(t.CardBack.id, t.CardType, t.CardBackStyle)), t.CardBackRight && !t.CardBackRight.missing && e.has(t.CardBackRight.id) && (n.CardBackRight = v(t.CardBackRight.id, t.CardType, t.CardBackStyle)), Object.keys(n).length > 0 && L.setState(n)
});
export {
    M as a, C as c, j as i, h as l, k as n, L as o, O as r, D as s, A as t, v as u
};
//# sourceMappingURL=card-creator-B987kJQm.js.map