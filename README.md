# Card Forge

Card Forge is a local-first, extensible TCG card editor. Version 0.1 implements a FAB ruleset, template-driven preview, and browser-local persistence.

## Run

Requires Node.js 20+ and pnpm. From the repository root (Corepack is bundled with modern Node versions):

```bash
corepack pnpm install
corepack pnpm dev
```

Open the URL printed by Vite. If `pnpm` is globally available, `pnpm dev` also works. Use `corepack pnpm test` or `corepack pnpm build` to validate the workspace.

## Architecture

- `packages/core`: framework-independent card, template, ruleset, validation, and repository interfaces.
- `packages/ruleset-fab`: FAB field definitions and validation only.
- `packages/renderer`: template data consumed by the web preview.
- `packages/storage`: IndexedDB repository adapter.
- `apps/web`: React editor and library; it only uses the repository abstraction.

The application includes sample Attack Action, Hero, and Equipment cards. Artwork is deliberately a generated placeholder area; no official art is bundled.
