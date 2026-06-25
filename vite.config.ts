import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'
import { readdirSync, readFileSync } from 'node:fs'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import matter from 'gray-matter'
import { Feed } from 'feed'
import { marked } from 'marked'

const SITE_URL = 'https://www.barelyconscious.games'
const AUTHOR = { name: 'Matt Schwartz', email: 'matt@barelyconscious.games', link: SITE_URL }

// Static routes from src/App.tsx (the dynamic /devlog/:slug is expanded below).
// `*` (NotFound) is intentionally excluded.
const STATIC_ROUTES: { path: string; priority: number }[] = [
  { path: '/', priority: 1.0 },
  { path: '/devlog', priority: 0.8 },
  { path: '/script-kitties', priority: 0.8 },
  { path: '/script-kitties/roadmap', priority: 0.7 },
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

/** Strip markdown to plain text and truncate — mirrors deriveExcerpt in
 * src/content/devlog/index.ts, used when a post has no explicit `excerpt`. */
function deriveExcerpt(content: string, max = 160): string {
  const text = content
    .replace(/```[\s\S]*?```/g, '')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/[#>*_`~-]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
  return text.length > max ? text.slice(0, max).trimEnd() + '…' : text
}

interface FeedPost {
  title: string
  slug: string
  date: string
  excerpt: string
  content: string
  hero?: string
  author?: string
}

/** Render a post's markdown to self-contained HTML for the feed: site-relative
 * URLs are absolutized (readers fetch out of context) and video-extension
 * images become <video> tags, mirroring the renderer in DevlogPost.tsx. */
function renderFullContent(markdown: string): string {
  const html = marked.parse(markdown, { async: false }) as string
  return (
    html
      // /devlog/... → https://.../devlog/... (skip protocol-relative //)
      .replace(/((?:src|href)=")\/(?!\/)/g, `$1${SITE_URL}/`)
      // <img src="….mp4"> → <video> (the site swaps these client-side)
      .replace(
        /<img\b[^>]*?\bsrc="([^"]+\.(?:mp4|webm|mov))"[^>]*>/gi,
        '<video src="$1" controls></video>'
      )
  )
}

/** Most recent posts to include in the feeds. The full archive stays on the
 * site; the feed only carries a recent window to keep the file small (each item
 * ships full content:encoded HTML). */
const FEED_POST_LIMIT = 20

/** Read devlog posts for the feed, newest first, applying the same draft /
 * future-date visibility rules as the sitemap and the runtime devlog index. */
function devlogPosts(devlogDir: string, today: string): FeedPost[] {
  return readdirSync(devlogDir)
    .filter((f) => f.endsWith('.md'))
    .map((f) => {
      const { data, content } = matter(readFileSync(`${devlogDir}/${f}`, 'utf-8'))
      const slug = (data.slug as string) ?? f.replace(/\.md$/, '').replace(/^\d{4}-\d{2}-\d{2}-/, '')
      const date =
        data.date instanceof Date
          ? data.date.toISOString().slice(0, 10)
          : data.date
            ? String(data.date).slice(0, 10)
            : ''
      return {
        title: (data.title as string) ?? slug,
        slug,
        date,
        excerpt: (data.excerpt as string) ?? deriveExcerpt(content),
        content,
        hero: data.hero as string | undefined,
        author: data.author as string | undefined,
        draft: data.draft === true,
      }
    })
    .filter((p) => !p.draft && p.date && !(p.date > today))
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .slice(0, FEED_POST_LIMIT)
    .map(({ draft: _draft, ...p }) => p)
}

/** Build RSS 2.0, Atom, and JSON Feed documents from the devlog posts. */
function buildFeeds(devlogDir: string, today: string) {
  const posts = devlogPosts(devlogDir, today)
  const feed = new Feed({
    title: 'Barely Conscious Games — Devlog',
    description: 'Devlog from Barely Conscious Games, an indie game studio making retro-modern 2D games.',
    id: `${SITE_URL}/devlog`,
    link: `${SITE_URL}/devlog`,
    language: 'en',
    favicon: `${SITE_URL}/favicon.png`,
    copyright: `© ${today.slice(0, 4)} Barely Conscious Games`,
    generator: 'vite rss-generator',
    feedLinks: {
      rss: `${SITE_URL}/rss.xml`,
      atom: `${SITE_URL}/atom.xml`,
      json: `${SITE_URL}/feed.json`,
    },
    author: AUTHOR,
    // Bare YYYY-MM-DD parses as midnight UTC, which is fine for a feed date.
    updated: posts[0] ? new Date(posts[0].date) : new Date(`${today}T00:00:00Z`),
  })
  for (const p of posts) {
    const url = `${SITE_URL}/devlog/${p.slug}`
    const hero = p.hero ? `<p><img src="${SITE_URL}${p.hero}" alt="" /></p>\n` : ''
    feed.addItem({
      title: p.title,
      id: url,
      link: url,
      // description = short summary, content = full post body (both supported
      // across RSS content:encoded / Atom content / JSON content_html).
      description: p.excerpt,
      content: hero + renderFullContent(p.content),
      date: new Date(p.date),
      author: [p.author ? { name: p.author } : AUTHOR],
    })
  }
  return { rss: feed.rss2(), atom: feed.atom1(), json: feed.json1() }
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
      // Generate RSS 2.0, Atom, and JSON feeds at build time from the devlog
      // markdown, mirroring the sitemap generator. Build-only (skipped in dev).
      name: 'rss-generator',
      apply: 'build',
      generateBundle() {
        const devlogDir = fileURLToPath(new URL('./src/content/devlog', import.meta.url))
        const today = new Date().toISOString().slice(0, 10)
        const { rss, atom, json } = buildFeeds(devlogDir, today)
        this.emitFile({ type: 'asset', fileName: 'rss.xml', source: rss })
        this.emitFile({ type: 'asset', fileName: 'atom.xml', source: atom })
        this.emitFile({ type: 'asset', fileName: 'feed.json', source: json })
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
