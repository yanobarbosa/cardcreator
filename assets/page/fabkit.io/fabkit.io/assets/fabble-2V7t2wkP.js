import {
    n as e
} from "./analytics-061K8zg0.js";
import {
    t
} from "./react-B1rjmc0O.js";
import {
    t as n
} from "./middleware-D-3Mg_OF.js";
const r = [`type`, `class`, `talent`, `pitch`, `cost`, `power`, `defense`, `life`, `subtypes`, `keywords`, `set`],
    i = `https://fabkit.github.io/fabble-data/v1/dataset.json`,
    a = [`standard`, `chaos`],
    o = {
        standard: 8,
        chaos: 12
    },
    s = [...a, `endless`],
    c = {
        standard: `/fabble/standard`,
        chaos: `/fabble/chaos`,
        endless: `/fabble/endless`
    },
    l = [3, 5],
    u = [`hero`, `weapon`, `equipment`, `action`, `attack_action`, `attack_reaction`, `defense_reaction`, `instant`, `ally`],
    d = 20,
    f = `https://fabkit.io/fabble`,
    p = 200,
    m = 80,
    h = (r.length - 1) * 80 + 500;

function g(e) {
    return typeof e == `number`
}

function _(e) {
    return e.length === 0 ? `` : e.join(`, `)
}

function v(e) {
    return e.life === null ? [] : [e.life]
}

function y(e, t) {
    let n = new Set(e),
        r = new Set(t);
    if (n.size !== r.size) return !1;
    for (let e of n)
        if (!r.has(e)) return !1;
    return !0
}

function b(e, t) {
    if (e.length === 0 && t.length === 0) return {
        state: `match`
    };
    if (e.length === 0 && t.length > 0) return {
        state: `miss`
    };
    if (t.length === 0 && e.length > 0) return {
        state: `miss`,
        notApplicable: !0
    };
    if (y(e, t)) return {
        state: `match`
    };
    let n = e.filter(e => t.includes(e));
    if (n.length > 0) return {
        state: `partial`,
        shared: [...new Set(n)].map(String).sort()
    };
    let r = e.filter(g),
        i = t.filter(g);
    if (r.length === 0 || i.length === 0) return {
        state: `miss`
    };
    let a = Math.max(...r),
        o = Math.min(...r),
        s = Math.max(...i);
    return a < Math.min(...i) ? {
        state: `miss`,
        direction: `higher`
    } : o > s ? {
        state: `miss`,
        direction: `lower`
    } : {
        state: `miss`
    }
}

function ee(e, t, n) {
    if (e.length === 0 && t.length === 0) return {
        state: `match`
    };
    let r = e.filter(e => t.includes(e));
    return e.length === t.length && r.length === e.length ? {
        state: `match`
    } : t.length === 0 && e.length > 0 ? n ? {
        state: `miss`,
        notApplicable: !0
    } : {
        state: `miss`
    } : r.length > 0 ? {
        state: `partial`,
        shared: [...r].sort()
    } : {
        state: `miss`
    }
}

function x(e) {
    let t = e.sets.filter(e => !e.promo && !e.limitedPrint),
        n = e.sets.filter(e => !e.promo);
    return (t.length > 0 ? t : n.length > 0 ? n : e.sets).reduce((e, t) => t.order < e.order ? t : e)
}

function S(e, t) {
    let n = new Set(t.sets.map(e => e.code)),
        r = t.sets.filter(e => !e.promo),
        i = r.length ? Math.min(...r.map(e => e.order)) : null,
        a = r.length ? Math.max(...r.map(e => e.order)) : null,
        o = e.sets.some(e => n.has(e.code)),
        s = e.sets.filter(e => e.promo),
        c = [...e.sets.filter(e => !e.promo)].sort((e, t) => t.order - e.order),
        l = [...s, ...c].map(e => n.has(e.code) ? {
            code: e.code,
            name: e.name,
            promo: !!e.promo,
            mark: `check`
        } : e.promo || i === null || a === null ? {
            code: e.code,
            name: e.name,
            promo: !!e.promo,
            mark: null
        } : i > e.order ? {
            code: e.code,
            name: e.name,
            promo: !1,
            mark: `higher`
        } : a < e.order ? {
            code: e.code,
            name: e.name,
            promo: !1,
            mark: `lower`
        } : {
            code: e.code,
            name: e.name,
            promo: !1,
            mark: null
        });
    return {
        state: o ? `match` : `miss`,
        setDetails: l
    }
}

function C(e, t, n, r) {
    let i = ee(t, n, r);
    return {
        column: e,
        state: i.state,
        guessDisplay: _(t),
        shared: i.shared,
        notApplicable: i.notApplicable
    }
}

function w(e, t, n) {
    let r = b(t, n);
    return {
        column: e,
        state: r.state,
        guessDisplay: _(t),
        direction: r.direction,
        shared: r.shared,
        notApplicable: r.notApplicable
    }
}

function T(e, t) {
    let n = e.pitches.includes(1) && e.pitches.includes(2) && e.pitches.includes(3),
        r = _(e.pitches);
    if (e.pitches.length === 0 && t.pitches.length === 0) return {
        column: `pitch`,
        state: `match`,
        guessDisplay: ``
    };
    if (y(e.pitches, t.pitches)) return {
        column: `pitch`,
        state: `match`,
        guessDisplay: r,
        isRainbow: n || void 0
    };
    let i = e.pitches.filter(e => t.pitches.includes(e));
    return {
        column: `pitch`,
        state: i.length > 0 ? `partial` : `miss`,
        guessDisplay: r,
        shared: i.length > 0 ? [...new Set(i)].map(String).sort() : void 0,
        isRainbow: n || void 0
    }
}

function E(e, t) {
    let n = S(e, t),
        r = [{
            column: `type`,
            state: e.type === t.type ? `match` : `miss`,
            guessDisplay: e.type
        }, C(`class`, e.classes, t.classes, !0), C(`talent`, e.talents, t.talents, !0), T(e, t), w(`cost`, e.costs, t.costs), w(`power`, e.powers, t.powers), w(`defense`, e.defenses, t.defenses), w(`life`, v(e), v(t)), C(`subtypes`, e.subtypes, t.subtypes, !1), C(`keywords`, e.keywords, t.keywords, !1), {
            column: `set`,
            state: n.state,
            guessDisplay: _(e.sets.map(e => e.code)),
            setDetails: n.setDetails
        }],
        i = e.id === t.id,
        a = !i && r.every(e => e.state === `match`);
    return {
        guessId: e.id,
        correct: i,
        isTwin: a,
        columns: r
    }
}

function D(e) {
    return String(e).padStart(2, `0`)
}

function O(e) {
    return `${e.getFullYear()}-${D(e.getMonth()+1)}-${D(e.getDate())}`
}

function k(e) {
    return `${D(e.getDate())}-${D(e.getMonth()+1)}-${D(e.getFullYear()%100)}`
}

function A(e) {
    return new Date(e.getFullYear(), e.getMonth(), e.getDate() + 1, 0, 0, 0, 0).getTime() - e.getTime()
}

function j(e) {
    let [t, n, r] = e.split(`-`).map(Number);
    return O(new Date(t, n - 1, r - 1))
}

function M() {
    return new Date
}

function te(e, t, n) {
    let r = O(n),
        i = t.schedule[e].find(e => e.date === r);
    return i ? {
        answerId: i.cardId,
        theme: i.theme ?? null
    } : null
}

function N(e, t) {
    let n = new Set(t),
        r = e.filter(e => !n.has(e.id)),
        i = r.length > 0 ? r : e;
    return i[Math.floor(Math.random() * i.length)]
}

function P(e) {
    return e.normalize(`NFD`).replace(/\p{M}+/gu, ``).replace(/ð/gi, `d`).replace(/ø/gi, `o`).replace(/æ/gi, `ae`).replace(/þ/gi, `th`).replace(/ß/gi, `ss`).toLowerCase().replace(/['’‘`]/g, ``).replace(/[^a-z0-9 ]/g, ` `).replace(/\s+/g, ` `).trim()
}

function F(e) {
    return e.map(e => ({
        id: e.id,
        name: e.name,
        normalized: P(e.name)
    }))
}

function I(e, t) {
    return e.name.localeCompare(t.name)
}

function L(e, t) {
    let n = P(t);
    if (n === ``) return [];
    let r = [],
        i = [];
    for (let t of e) t.normalized.startsWith(n) ? r.push(t) : t.normalized.includes(n) && i.push(t);
    return r.sort(I), i.sort(I), [...r, ...i].slice(0, 10)
}
var R = new Map,
    z = !1;

function B(e) {
    z || (z = !0, console.warn(`Fabble: localStorage unavailable, using memory fallback`, e))
}
const V = {
        get(e) {
            let t;
            try {
                t = localStorage.getItem(e) ?? R.get(e)
            } catch (n) {
                B(n), t = R.get(e)
            }
            if (t === void 0) return null;
            try {
                return JSON.parse(t)
            } catch (t) {
                return console.warn(`Fabble: corrupt stored value for "${e}"`, t), null
            }
        },
        set(e, t) {
            let n = JSON.stringify(t);
            R.set(e, n);
            try {
                localStorage.setItem(e, n)
            } catch (e) {
                B(e)
            }
        },
        remove(e) {
            R.delete(e);
            try {
                localStorage.removeItem(e)
            } catch (e) {
                B(e)
            }
        }
    },
    H = {
        session: e => `fabble:session:${e}`,
        streaks: e => `fabble:streaks:${e}`,
        dismissedTheme: e => `fabble:dismissed-theme:${e}`,
        endlessSession: `fabble:endless:session`,
        endlessStreak: `fabble:endless:streak`,
        username: `fabble:username`,
        seenRules: `fabble:seen-rules`,
        seenRainbowHint: `fabble:seen-rainbow-hint`
    };

function U(e, t, n, r) {
    if (e.lastResultDate === n) return e;
    let i;
    return i = t === `lost` ? 0 : e.lastResultDate === r && e.lastResult === `won` ? e.current + 1 : 1, {
        schema: 1,
        current: i,
        best: Math.max(e.best, i),
        lastResultDate: n,
        lastResult: t
    }
}

function W(e, t, n) {
    let r = e.current + 1;
    return {
        schema: 1,
        current: r,
        best: Math.max(e.best, r),
        completedLog: [...e.completedLog, {
            answerId: t,
            guessCount: n
        }]
    }
}

function G(e) {
    return {
        schema: 1,
        current: 0,
        best: e.best,
        completedLog: []
    }
}

function K(e) {
    let t = new Map([...e.guesses.map(e => [e.guessId, e]), ...e.twinGuesses.map(e => [e.guessId, e])]);
    return e.order.map(e => t.get(e)).filter(e => e !== void 0)
}
var q = {
        schema: 1,
        current: 0,
        best: 0,
        lastResultDate: null,
        lastResult: null
    },
    J = {
        dataset: null,
        cardsById: null,
        searchIndex: null,
        sessions: {},
        streaks: {},
        dismissedThemeDate: {},
        endlessSession: null,
        endlessStreak: V.get(H.endlessStreak) ?? {
            schema: 1,
            current: 0,
            best: 0,
            completedLog: []
        },
        username: V.get(H.username) ?? ``,
        hasSeenRules: V.get(H.seenRules) ?? !1,
        hasSeenRainbowHint: V.get(H.seenRainbowHint) ?? !1
    };

function Y(e, t) {
    let n = {
        schema: 1,
        mode: e,
        date: t.date,
        answerId: t.answerId,
        datasetVersion: t.datasetVersion,
        theme: t.theme,
        guesses: t.guesses.map(e => e.guessId),
        twinGuessIds: t.twinGuesses.map(e => e.guessId),
        order: t.order,
        hintsRevealed: t.hintsRevealed,
        status: t.status
    };
    V.set(H.session(e), n)
}

function X(e) {
    let t = new Map([...e.guesses.map(e => [e.guessId, e]), ...e.twinGuesses.map(e => [e.guessId, e])]);
    return e.order.map(e => t.get(e)).filter(e => e !== void 0)
}

function Z(e, t) {
    let n = t.get(e.answerId);
    if (!n) return null;
    let r = e => e.map(e => t.get(e)).filter(e => e !== void 0).map(e => E(e, n)),
        i = r(e.guesses),
        a = r(e.twinGuessIds);
    return {
        date: e.date,
        answerId: e.answerId,
        datasetVersion: e.datasetVersion,
        theme: e.theme,
        guesses: i,
        twinGuesses: a,
        order: e.order,
        hintsRevealed: e.hintsRevealed,
        status: e.status,
        animatedGuessIds: [...i, ...a].map(e => e.guessId)
    }
}

function Q(e) {
    let t = {
        schema: 1,
        answerId: e.answerId,
        datasetVersion: e.datasetVersion,
        guesses: e.guesses.map(e => e.guessId),
        twinGuessIds: e.twinGuesses.map(e => e.guessId),
        order: e.order,
        status: e.status
    };
    V.set(H.endlessSession, t)
}

function ne(e, t) {
    let n = t.get(e.answerId);
    if (!n) return null;
    let r = e => e.map(e => t.get(e)).filter(e => e !== void 0).map(e => E(e, n)),
        i = r(e.guesses),
        a = r(e.twinGuessIds);
    return {
        answerId: e.answerId,
        datasetVersion: e.datasetVersion,
        guesses: i,
        twinGuesses: a,
        order: e.order,
        status: e.status,
        animatedGuessIds: [...i, ...a].map(e => e.guessId)
    }
}

function $(e, t) {
    return {
        answerId: N(e.cards, t).id,
        datasetVersion: e.datasetVersion,
        guesses: [],
        twinGuesses: [],
        order: [],
        status: `playing`,
        animatedGuessIds: []
    }
}
const re = t()(n((t, n) => ({ ...J,
    ingestDataset: e => {
        n().dataset ?.datasetVersion !== e.datasetVersion && t({
            dataset: e,
            cardsById: new Map(e.cards.map(e => [e.id, e])),
            searchIndex: F(e.cards)
        }, void 0, `fabble/ingestDataset`)
    },
    startOrRestoreSession: r => {
        let {
            dataset: i,
            cardsById: a
        } = n();
        if (!i || !a) return;
        let o = O(M()),
            s = V.get(H.session(r)),
            c = null;
        if (s ?.schema === 1 && s.date === o && (c = Z(s, a), c || console.warn(`Fabble: discarding stale session for ${r}`)), !c) {
            let t = te(r, i, M());
            if (!t) return;
            c = {
                date: o,
                answerId: t.answerId,
                datasetVersion: i.datasetVersion,
                theme: t.theme,
                guesses: [],
                twinGuesses: [],
                order: [],
                hintsRevealed: [!1, !1],
                status: `playing`,
                animatedGuessIds: []
            }, Y(r, c), e({
                name: `fabble_puzzle_started`,
                data: {
                    mode: r
                }
            })
        }
        let l = V.get(H.streaks(r)) ?? q,
            u = V.get(H.dismissedTheme(r));
        t(e => ({
            sessions: { ...e.sessions,
                [r]: c
            },
            streaks: { ...e.streaks,
                [r]: l
            },
            dismissedThemeDate: u ? { ...e.dismissedThemeDate,
                [r]: u.date
            } : e.dismissedThemeDate
        }), void 0, `fabble/startOrRestoreSession`)
    },
    submitGuess: (r, i) => {
        let {
            dataset: a,
            cardsById: s,
            sessions: c
        } = n(), l = c[r];
        if (!a || !s || !l || l.status !== `playing` || l.guesses.some(e => e.guessId === i) || l.twinGuesses.some(e => e.guessId === i)) return;
        let u = s.get(i),
            d = s.get(l.answerId);
        if (!u || !d) return;
        let f = E(u, d);
        if (t(e => {
                let t = e.sessions[r];
                if (!t) return e;
                let n = [...t.order, i];
                if (f.isTwin) {
                    let i = { ...t,
                        twinGuesses: [...t.twinGuesses, f],
                        order: n
                    };
                    return Y(r, i), {
                        sessions: { ...e.sessions,
                            [r]: i
                        }
                    }
                }
                let a = [...t.guesses, f],
                    s = t.status;
                f.correct ? s = `won` : a.length >= o[r] && (s = `lost`);
                let c = { ...t,
                    guesses: a,
                    order: n,
                    status: s
                };
                if (Y(r, c), s === `playing`) return {
                    sessions: { ...e.sessions,
                        [r]: c
                    }
                };
                let l = t.date,
                    u = j(l),
                    d = U(e.streaks[r] ?? q, s === `won` ? `won` : `lost`, l, u);
                return V.set(H.streaks(r), d), {
                    sessions: { ...e.sessions,
                        [r]: c
                    },
                    streaks: { ...e.streaks,
                        [r]: d
                    }
                }
            }, void 0, `fabble/submitGuess`), !f.isTwin) {
            let t = l.guesses.length + 1;
            e({
                name: `fabble_guess_submitted`,
                data: {
                    mode: r,
                    guessNumber: t,
                    correct: f.correct
                }
            }), f.correct ? e({
                name: `fabble_puzzle_completed`,
                data: {
                    mode: r,
                    result: `won`,
                    guessCount: t
                }
            }) : t >= o[r] && e({
                name: `fabble_puzzle_completed`,
                data: {
                    mode: r,
                    result: `lost`,
                    guessCount: t
                }
            })
        }
    },
    revealHint: (n, r) => {
        t(t => {
            let i = t.sessions[n];
            if (!i || i.hintsRevealed[r] || i.guesses.length < l[r]) return t;
            let a = [...i.hintsRevealed];
            a[r] = !0;
            let o = { ...i,
                hintsRevealed: a
            };
            return Y(n, o), e({
                name: `fabble_hint_revealed`,
                data: {
                    mode: n,
                    hintIndex: r
                }
            }), {
                sessions: { ...t.sessions,
                    [n]: o
                }
            }
        }, void 0, `fabble/revealHint`)
    },
    dismissTheme: (e, n) => {
        V.set(H.dismissedTheme(e), {
            date: n
        }), t(t => ({
            dismissedThemeDate: { ...t.dismissedThemeDate,
                [e]: n
            }
        }), void 0, `fabble/dismissTheme`)
    },
    markGuessAnimated: (e, n) => {
        t(t => {
            let r = t.sessions[e];
            return !r || r.animatedGuessIds.includes(n) ? t : {
                sessions: { ...t.sessions,
                    [e]: { ...r,
                        animatedGuessIds: [...r.animatedGuessIds, n]
                    }
                }
            }
        }, void 0, `fabble/markGuessAnimated`)
    },
    advanceToNewDay: e => {
        n().startOrRestoreSession(e)
    },
    startOrRestoreEndless: () => {
        let {
            dataset: r,
            cardsById: i
        } = n();
        if (!r || !i) return;
        let a = V.get(H.endlessSession),
            o = null;
        a ?.schema === 1 && (o = ne(a, i), o || console.warn(`Fabble: discarding stale endless session`)), o || (o = $(r, n().endlessStreak.completedLog.map(e => e.answerId)), Q(o), e({
            name: `fabble_puzzle_started`,
            data: {
                mode: `endless`
            }
        })), t({
            endlessSession: o
        }, void 0, `fabble/startOrRestoreEndless`)
    },
    submitEndlessGuess: r => {
        let {
            dataset: i,
            cardsById: a,
            endlessSession: o
        } = n();
        if (!i || !a || !o || o.status !== `playing` || o.guesses.some(e => e.guessId === r) || o.twinGuesses.some(e => e.guessId === r)) return;
        let s = a.get(r),
            c = a.get(o.answerId);
        if (!s || !c) return;
        let l = E(s, c);
        if (t(e => {
                let t = e.endlessSession;
                if (!t) return e;
                let n = [...t.order, r];
                if (l.isTwin) {
                    let e = { ...t,
                        twinGuesses: [...t.twinGuesses, l],
                        order: n
                    };
                    return Q(e), {
                        endlessSession: e
                    }
                }
                let i = [...t.guesses, l],
                    a = l.correct ? `won` : t.status,
                    o = { ...t,
                        guesses: i,
                        order: n,
                        status: a
                    };
                if (Q(o), a !== `won`) return {
                    endlessSession: o
                };
                let s = W(e.endlessStreak, t.answerId, i.length);
                return V.set(H.endlessStreak, s), {
                    endlessSession: o,
                    endlessStreak: s
                }
            }, void 0, `fabble/submitEndlessGuess`), !l.isTwin) {
            let t = o.guesses.length + 1;
            e({
                name: `fabble_endless_guess_submitted`,
                data: {
                    guessNumber: t,
                    correct: l.correct
                }
            }), l.correct && e({
                name: `fabble_endless_completed`,
                data: {
                    result: `won`,
                    guessCount: t
                }
            })
        }
    },
    markEndlessGuessAnimated: e => {
        t(t => {
            let n = t.endlessSession;
            return !n || n.animatedGuessIds.includes(e) ? t : {
                endlessSession: { ...n,
                    animatedGuessIds: [...n.animatedGuessIds, e]
                }
            }
        }, void 0, `fabble/markEndlessGuessAnimated`)
    },
    giveUpEndless: () => {
        t(t => {
            let n = t.endlessSession;
            if (n ?.status !== `playing`) return t;
            let r = { ...n,
                status: `gave_up`
            };
            Q(r);
            let i = G(t.endlessStreak);
            return V.set(H.endlessStreak, i), e({
                name: `fabble_endless_completed`,
                data: {
                    result: `gave_up`,
                    guessCount: n.guesses.length
                }
            }), {
                endlessSession: r,
                endlessStreak: i
            }
        }, void 0, `fabble/giveUpEndless`)
    },
    nextEndlessPuzzle: () => {
        let {
            dataset: e,
            endlessStreak: r
        } = n();
        if (!e) return;
        let i = $(e, r.completedLog.map(e => e.answerId));
        Q(i), t({
            endlessSession: i
        }, void 0, `fabble/nextEndlessPuzzle`)
    },
    setUsername: e => {
        let n = e.slice(0, 20);
        V.set(H.username, n), t({
            username: n
        }, void 0, `fabble/setUsername`)
    },
    markRulesSeen: () => {
        V.set(H.seenRules, !0), t({
            hasSeenRules: !0
        }, void 0, `fabble/markRulesSeen`)
    },
    markRainbowHintSeen: () => {
        V.set(H.seenRainbowHint, !0), t({
            hasSeenRainbowHint: !0
        }, void 0, `fabble/markRainbowHintSeen`)
    },
    devReset: e => {}
})));
export {
    h as _, P as a, d as b, k as c, u as d, p as f, c as g, o as h, L as i, x as l, l as m, X as n, M as o, i as p, re as r, A as s, K as t, s as u, f as v, r as x, m as y
};
//# sourceMappingURL=fabble-2V7t2wkP.js.map