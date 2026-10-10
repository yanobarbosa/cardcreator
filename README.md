# FABKIT Card Creator

This repository now uses the open-source FABKIT card creator as its base. The focus here is creating Flesh and Blood cards, managing the local gallery, and producing higher resolution exports. The FABKIT source is licensed under BSD 3-Clause; see [LICENSE.md](LICENSE.md).

## Development

Requires Node.js 20+ and pnpm.

```bash
corepack pnpm install
corepack pnpm dev
```

Create a production build with:

```bash
corepack pnpm build
```

## Export resolution

Card exports use a 3× raster scale. A standard card renderer SVG is approximately 375 × 523 px, so the resulting PNG is approximately 1125 × 1569 px. Uploaded artwork resolution still depends on the source image.

## Firebase Hosting

`firebase.json` serves the production build from `dist`.

```bash
firebase login
firebase use --add
corepack pnpm build
firebase deploy --only hosting
```

Firebase project selection and credentials stay local; this repository does not contain a project ID.

## Assets

- `public/`: FABKIT fonts, symbols, rarities, and card backgrounds used by the app.
- `assets/`: original card artwork assets retained from this project.
- `assets/page/fabkit.io/`: retained card creator reference source and cardback artwork capture.

The FABKIT site tools outside card creation have been removed from the app source.
