# bc.games

The site for **Barely Conscious Games** — a small game studio. Showcases the games
(Script Kitties, StoneQuest, After) and hosts a markdown-authored devlog.

## Stack

- **Bun** — package manager & script runner
- **Vite 6** + **React 18** + **TypeScript**
- **Tailwind v4** + shadcn-style components + **lucide-react** icons
- **react-markdown** + a build-time frontmatter loader for the devlog

## Develop

```sh
bun install      # install deps
bun run dev      # start the dev server
bun run build    # type-check + production build
bun run lint     # eslint
bun run preview  # preview the production build
```

## Writing a devlog post

1. Add a markdown file to `src/content/devlog/` named `YYYY-MM-DD-<slug>.md`.
2. Put any images in `public/devlog/<slug>/` and reference them with absolute paths
   (e.g. `/devlog/<slug>/hero.png`).
3. Frontmatter:

   ```yaml
   ---
   title: "My Post Title"
   date: 2026-06-05        # required, ISO
   excerpt: "One-line summary for the index card."
   tags: [script-kitties, gamedev]
   hero: /devlog/my-post/hero.png   # optional
   draft: false            # optional — drafts show in dev, hidden in prod
   ---
   ```

Posts are auto-sorted (newest first) and indexed at `/devlog`; each renders at `/devlog/<slug>`.
