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

// --- Post release-time resolution (mirrors src/content/devlog/index.ts) -------
// The feeds MUST honor the exact same unlock instant the site uses, otherwise a
// build that happens to run between UTC-midnight and the real 10:30-Central
// unlock would leak a not-yet-released post into rss.xml/atom.xml/feed.json with
// a back-dated pubDate. Keep these two implementations in sync.

/** Offset (ms) such that `local = utc + offset` for `timeZone` at `instant`. */
function tzOffsetMs(timeZone: string, instant: number): number {
  const name = new Intl.DateTimeFormat('en-US', { timeZone, timeZoneName: 'longOffset' })
    .formatToParts(instant)
    .find((p) => p.type === 'timeZoneName')?.value
  const m = name?.match(/GMT([+-]\d{1,2})(?::?(\d{2}))?/)
  if (!m) return 0
  const sign = m[1].startsWith('-') ? -1 : 1
  return sign * (Math.abs(+m[1]) * 60 + (m[2] ? +m[2] : 0)) * 60_000
}

/**
 * Resolve a post's frontmatter `date` to an epoch timestamp. A bare
 * `YYYY-MM-DD` unlocks at 10:30am America/Chicago (DST-aware); a value carrying
 * an explicit time is honored verbatim. Mirrors parsePostDate in the runtime
 * devlog index so the feeds release on the same instant as the site.
 */
function parsePostDate(date: string): number {
  if (/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    const wallAsUtc = Date.parse(date + 'T10:30:00Z')
    return wallAsUtc - tzOffsetMs('America/Chicago', wallAsUtc)
  }
  return Date.parse(date)
}

/**
 * Normalize a frontmatter `date` value to the canonical string the runtime
 * loader produces: a midnight-UTC Date is date-only (`YYYY-MM-DD`); a Date with
 * a time component keeps its full ISO instant. Mirrors markdown-frontmatter-loader.
 */
function frontmatterDateString(raw: unknown): string {
  if (raw instanceof Date) {
    const d = raw
    const dateOnly =
      d.getUTCHours() === 0 &&
      d.getUTCMinutes() === 0 &&
      d.getUTCSeconds() === 0 &&
      d.getUTCMilliseconds() === 0
    return dateOnly ? d.toISOString().slice(0, 10) : d.toISOString()
  }
  return raw ? String(raw) : ''
}

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
function devlogEntries(devlogDir: string, now: number): { path: string; lastmod?: string }[] {
  return readdirSync(devlogDir)
    .filter((f) => f.endsWith('.md'))
    .map((f) => {
      const { data } = matter(readFileSync(`${devlogDir}/${f}`, 'utf-8'))
      const slug = (data.slug as string) ?? f.replace(/\.md$/, '').replace(/^\d{4}-\d{2}-\d{2}-/, '')
      const date = frontmatterDateString(data.date)
      const timestamp = date ? parsePostDate(date) : NaN
      // <lastmod> stays date-only; the precise timestamp is just for filtering.
      return { path: `/devlog/${slug}`, lastmod: date.slice(0, 10) || undefined, timestamp, draft: data.draft === true }
    })
    // Hide drafts and not-yet-released posts, matching src/content/devlog/index.ts:
    // a post is released once its unlock instant has actually passed.
    .filter((e) => !e.draft && (!Number.isFinite(e.timestamp) || e.timestamp <= now))
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
  /** Resolved unlock instant (epoch ms) — used for both ordering and pubDate. */
  timestamp: number
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
function devlogPosts(devlogDir: string, now: number): FeedPost[] {
  return readdirSync(devlogDir)
    .filter((f) => f.endsWith('.md'))
    .map((f) => {
      const { data, content } = matter(readFileSync(`${devlogDir}/${f}`, 'utf-8'))
      const slug = (data.slug as string) ?? f.replace(/\.md$/, '').replace(/^\d{4}-\d{2}-\d{2}-/, '')
      const date = frontmatterDateString(data.date)
      return {
        title: (data.title as string) ?? slug,
        slug,
        date,
        timestamp: date ? parsePostDate(date) : NaN,
        excerpt: (data.excerpt as string) ?? deriveExcerpt(content),
        content,
        hero: data.hero as string | undefined,
        author: data.author as string | undefined,
        draft: data.draft === true,
      }
    })
    // Released = not a draft, has a valid date, and its unlock instant has passed.
    .filter((p) => !p.draft && Number.isFinite(p.timestamp) && p.timestamp <= now)
    .sort((a, b) => b.timestamp - a.timestamp)
    .slice(0, FEED_POST_LIMIT)
    .map(({ draft: _draft, ...p }) => p)
}

/** Build RSS 2.0, Atom, and JSON Feed documents from the devlog posts. */
function buildFeeds(devlogDir: string, now: number) {
  const posts = devlogPosts(devlogDir, now)
  const today = new Date(now).toISOString().slice(0, 10)
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
    // Use the newest post's resolved unlock instant so the feed's own timestamp
    // never sits in the future relative to its items.
    updated: posts[0] ? new Date(posts[0].timestamp) : new Date(now),
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
      // Precise unlock instant (10:30 Central for bare dates), NOT midnight UTC,
      // so readers don't treat a fresh post as hours-old on arrival.
      date: new Date(p.timestamp),
      author: [p.author ? { name: p.author } : AUTHOR],
    })
  }
  return { rss: feed.rss2(), atom: feed.atom1(), json: feed.json1() }
}

function buildSitemap(devlogDir: string, now: number): string {
  const today = new Date(now).toISOString().slice(0, 10)
  const urls = [
    ...STATIC_ROUTES.map((r) => ({ loc: r.path, lastmod: today, priority: r.priority })),
    ...devlogEntries(devlogDir, now).map((e) => ({ loc: e.path, lastmod: e.lastmod ?? today, priority: 0.6 })),
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
        this.emitFile({
          type: 'asset',
          fileName: 'sitemap.xml',
          source: buildSitemap(devlogDir, Date.now()),
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
        const { rss, atom, json } = buildFeeds(devlogDir, Date.now())
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
