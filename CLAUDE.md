# CLAUDE.md

Guidance for working in this repository.

## What this is

The personal site for **Barely Conscious Games** (https://www.barelyconscious.games) — an
indie game studio. It's a single-page React app showcasing games (Script Kitties, Click
Farm, StoneQuest, After), a markdown-driven devlog, and assorted pages.

## Package manager: use Bun

**This project uses [Bun](https://bun.sh), not npm or yarn.** The lockfile is `bun.lock`.

Always use `bun` for installing and running scripts:

```sh
bun install          # install dependencies (NOT npm install)
bun run dev          # start the Vite dev server
bun run build        # type-check (tsc -b) + production build (vite build)
bun run lint         # eslint
bun run preview      # preview the production build locally
```

Do **not** run `npm install` / `npm run ...` — it creates a stray `package-lock.json` that
conflicts with `bun.lock`. If you see a `package-lock.json`, it can be deleted.

## Tech stack

- **Bun** — package manager / runtime
- **Vite** — build tool and dev server
- **React 18** + **TypeScript**
- **react-router-dom v7** — client-side routing (routes defined in `src/App.tsx`)
- **Tailwind CSS v4** (via `@tailwindcss/vite`) — styling
- **radix-ui** + local `src/components/ui/*` — UI primitives
- **framer-motion** — animations
- **react-markdown** + **remark-gfm** — devlog post rendering

## Project layout

- `src/App.tsx` — route table (the source of truth for pages)
- `src/pages/` — top-level page components
- `src/components/` — shared and feature components (`Home/`, `Forum/`, `stonequest/`, `ui/`)
- `src/content/devlog/` — devlog posts as markdown with frontmatter; `index.ts` globs and
  parses them. Drafts (`draft: true`) are shown in dev, hidden in production builds.
- `src/styles/` — CSS
- `public/` — static assets served from the site root (favicon, og-image, robots.txt)
- `index.html` — `<head>` SEO: meta description, Open Graph / Twitter cards, JSON-LD

## Notable build behavior

- **Markdown frontmatter** is parsed at build time by a custom Vite plugin in
  `vite.config.ts` (`markdown-frontmatter-loader`), so `gray-matter` never ships to the
  browser. Each `.md` becomes `{ frontmatter, content }` exports. A post's slug is its
  filename minus the `YYYY-MM-DD-` date prefix.
- **`sitemap.xml` is auto-generated** at build time by the `sitemap-generator` plugin in
  `vite.config.ts`. It lists the static routes plus every non-draft devlog post. Add a new
  top-level page → add it to that plugin's `STATIC_ROUTES`. New devlog posts are picked up
  automatically.

## SEO notes

This is a client-rendered SPA, so all routes share the single `<meta>`/title in
`index.html`. Per-page descriptions would require dynamic meta management
(react-helmet-async or React 19 native meta) — not yet set up.
