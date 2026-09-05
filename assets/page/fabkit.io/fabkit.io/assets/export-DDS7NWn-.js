import {
    t as e
} from "./snapdom-YQIZ-pzr.js";
async function t(e, t = 5e3) {
    let n = Array.from(e.querySelectorAll(`image`)).map(e => e.href ?.baseVal || e.getAttribute(`href`) || e.getAttribute(`xlink:href`)).filter(e => !!e).map(e => new Promise(t => {
        let n = new Image;
        n.onload = () => t(), n.onerror = () => t(), n.src = e, n.decode && n.decode().then(t, t)
    }));
    await Promise.race([Promise.all(n), new Promise(e => setTimeout(e, t))])
}
async function n(e, t) {
    let n = await createImageBitmap(e),
        r = document.createElement(`canvas`);
    r.width = n.height, r.height = n.width;
    let i = r.getContext(`2d`);
    return i ? (i.translate(r.width / 2, r.height / 2), i.rotate(t * Math.PI / 180), i.drawImage(n, -n.width / 2, -n.height / 2), new Promise((e, t) => r.toBlob(n => n ? e(n) : t(Error(`toBlob failed`)), `image/png`))) : e
}
async function r(r, i = 1, a = `png`, o = !1) {
    await t(r);
    let s = r.querySelectorAll(`[data-export-hide]`),
        c = [];
    s.forEach(e => {
        c.push(e.getAttribute(`visibility`) ?? ``), e.setAttribute(`visibility`, `hidden`)
    });
    let l;
    try {
        l = await e(r, {
            scale: i,
            embedFonts: !0
        })
    } finally {
        s.forEach((e, t) => {
            c[t] ? e.setAttribute(`visibility`, c[t]) : e.removeAttribute(`visibility`)
        })
    }
    let u = await l.toBlob({
        type: a
    });
    return o ? n(u, 90) : u
}
export {
    n,
    r as t
};
//# sourceMappingURL=export-DDS7NWn-.js.map