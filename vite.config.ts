import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'
import { readdirSync, readFileSync } from 'node:fs'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import matter from 'gray-matter'

const SITE_URL = 'https://www.barelyconscious.games'

// Static routes from src/App.tsx (the dynamic /devlog/:slug is expanded below).
// `*` (NotFound) is intentionally excluded.
const STATIC_ROUTES: { path: string; priority: number }[] = [
  { path: '/', priority: 1.0 },
  { path: '/devlog', priority: 0.8 },
  { path: '/script-kitties', priority: 0.8 },
  { path: '/click-farm', priority: 0.8 },
  { path: '/stonequest', priority: 0.7 },
  { path: '/after', priority: 0.6 },
  { path: '/ai-disclosure', priority: 0.4 },
  { path: '/jobs/digital-artist', priority: 0.5 },
]

/** Read devlog markdown, mirroring the frontmatter loader's slug/draft rules. */
function devlogEntries(devlogDir: string, today: string): { path: string; lastmod?: string }[] {
  return readdirSync(devlogDir)
    .filter((f) => f.endsWith('.md'))
    .map((f) => {
      const { data } = matter(readFileSync(`${devlogDir}/${f}`, 'utf-8'))
      const slug = (data.slug as string) ?? f.replace(/\.md$/, '').replace(/^\d{4}-\d{2}-\d{2}-/, '')
      // YAML auto-parses an unquoted `date:` into a Date; normalize to YYYY-MM-DD (UTC).
      const date =
        data.date instanceof Date
          ? data.date.toISOString().slice(0, 10)
          : data.date
            ? String(data.date).slice(0, 10)
            : undefined
      return { path: `/devlog/${slug}`, lastmod: date, draft: data.draft === true }
    })
    // Hide drafts and not-yet-released (future-dated) posts, matching
    // src/content/devlog/index.ts. YYYY-MM-DD strings compare lexically.
    .filter((e) => !e.draft && !(e.lastmod !== undefined && e.lastmod > today))
    .map(({ path, lastmod }) => ({ path, lastmod }))
}

function buildSitemap(devlogDir: string, today: string): string {
  const urls = [
    ...STATIC_ROUTES.map((r) => ({ loc: r.path, lastmod: today, priority: r.priority })),
    ...devlogEntries(devlogDir, today).map((e) => ({ loc: e.path, lastmod: e.lastmod ?? today, priority: 0.6 })),
  ]
  const body = urls
    .map(
      (u) =>
        `  <url>\n    <loc>${SITE_URL}${u.loc}</loc>\n    <lastmod>${u.lastmod}</lastmod>\n    <priority>${u.priority.toFixed(1)}</priority>\n  </url>`
    )
    .join('\n')
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`
}

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  plugins: [
    react(),
    tailwindcss(),
    {
      // Generate sitemap.xml at build time from the devlog markdown, so new
      // posts are picked up automatically. Build-only (skipped in dev server).
      name: 'sitemap-generator',
      apply: 'build',
      generateBundle() {
        const devlogDir = fileURLToPath(new URL('./src/content/devlog', import.meta.url))
        const today = new Date().toISOString().slice(0, 10)
        this.emitFile({
          type: 'asset',
          fileName: 'sitemap.xml',
          source: buildSitemap(devlogDir, today),
        })
      },
    },
    {
      // Parse markdown frontmatter at build time (Node context) so gray-matter
      // never ships to the browser. Emits structured exports per .md file.
      name: 'markdown-frontmatter-loader',
      enforce: 'pre',
      transform(code, id) {
        if (!id.endsWith('.md')) return
        const { data, content } = matter(code)
        const file = id.split('/').pop()!.replace(/\.md$/, '')
        const fileSlug = file.replace(/^\d{4}-\d{2}-\d{2}-/, '')
        // YAML auto-parses an unquoted `date: 2026-06-11` into a Date, which
        // JSON.stringify would emit as a midnight-UTC ISO string — defeating the
        // date-only 10:30-Central handling in src/content/devlog/index.ts. A
        // pure (midnight-UTC) Date is date-only → normalize to YYYY-MM-DD; a Date
        // carrying a time component is an explicit instant → keep full ISO.
        if (data.date instanceof Date) {
          const d = data.date
          const dateOnly =
            d.getUTCHours() === 0 &&
            d.getUTCMinutes() === 0 &&
            d.getUTCSeconds() === 0 &&
            d.getUTCMilliseconds() === 0
          data.date = dateOnly ? d.toISOString().slice(0, 10) : d.toISOString()
        }
        const frontmatter = {
          slug: fileSlug,
          tags: [] as string[],
          draft: false,
          ...data,
        }
        return {
          code:
            `export const frontmatter = ${JSON.stringify(frontmatter)};\n` +
            `export const content = ${JSON.stringify(content)};\n` +
            `export default content;`,
          map: null,
        }
      },
    },
  ],
})
