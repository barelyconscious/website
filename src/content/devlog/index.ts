import type { DevlogModule, DevlogPost } from "@/types/devlog";

const modules = import.meta.glob<DevlogModule>("./*.md", { eager: true });

/**
 * Offset (ms) such that `local = utc + offset` for a time zone at a given
 * instant, derived from Intl's "GMT-05:00"-style name. DST-aware.
 */
function tzOffsetMs(timeZone: string, instant: number): number {
  const name = new Intl.DateTimeFormat("en-US", {
    timeZone,
    timeZoneName: "longOffset",
  })
    .formatToParts(instant)
    .find((p) => p.type === "timeZoneName")?.value;
  const m = name?.match(/GMT([+-]\d{1,2})(?::?(\d{2}))?/);
  if (!m) return 0; // "GMT" with no offset → UTC
  const sign = m[1].startsWith("-") ? -1 : 1;
  return sign * (Math.abs(+m[1]) * 60 + (m[2] ? +m[2] : 0)) * 60_000;
}

/**
 * Resolve a post's frontmatter `date` to an epoch timestamp. A bare
 * `YYYY-MM-DD` is pinned to 10:30am America/Chicago (auto-adjusting CDT/CST),
 * so posts just need a date and unlock at 10:30 Central. Any value that already
 * carries a time (e.g. `2026-06-13T09:00:00-05:00`) is honored verbatim,
 * letting individual posts override the default. 10:30am sits far from the 2am
 * DST switch, so the offset is unambiguous and a single lookup is exact.
 */
function parsePostDate(date: string): number {
  if (/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    const wallAsUtc = Date.parse(date + "T10:30:00Z");
    return wallAsUtc - tzOffsetMs("America/Chicago", wallAsUtc);
  }
  return Date.parse(date);
}

/** Strip markdown syntax and collapse whitespace, then truncate. */
function deriveExcerpt(content: string, max = 160): string {
  const text = content
    .replace(/^---[\s\S]*?---/, "")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/[#>*_`~-]/g, "")
    .replace(/\s+/g, " ")
    .trim();
  return text.length > max ? text.slice(0, max).trimEnd() + "…" : text;
}

export const posts: DevlogPost[] = Object.values(modules)
  .map((mod) => {
    const fm = mod.frontmatter;
    return {
      ...fm,
      tags: fm.tags ?? [],
      draft: fm.draft ?? false,
      excerpt: fm.excerpt ?? deriveExcerpt(mod.content),
      content: mod.content,
      timestamp: parsePostDate(fm.date),
    } satisfies DevlogPost;
  })
  // In production, hide drafts and posts whose date is still in the future
  // (scheduled posts), re-checked on every page load so they appear on time
  // without a rebuild. A malformed (NaN) date is left visible, as before.
  // Both drafts and future posts stay visible in dev for previewing.
  .filter(
    (p) =>
      import.meta.env.DEV ||
      (!p.draft && !(Number.isFinite(p.timestamp) && p.timestamp > Date.now()))
  )
  // Newest first; NaN-safe so a malformed date sinks rather than throwing.
  .sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));

export const postsBySlug: Record<string, DevlogPost> = Object.fromEntries(
  posts.map((p) => [p.slug, p])
);

export function getAdjacent(slug: string): {
  current?: DevlogPost;
  older?: DevlogPost;
  newer?: DevlogPost;
} {
  const i = posts.findIndex((p) => p.slug === slug);
  if (i === -1) return {};
  return {
    current: posts[i],
    older: posts[i + 1], // posts are date-desc → older is further down
    newer: i > 0 ? posts[i - 1] : undefined,
  };
}

/** Format an ISO date for display, pinned to UTC to avoid off-by-one days. */
export function formatDate(iso: string): string {
  const d = new Date(iso.length === 10 ? iso + "T12:00:00Z" : iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
}
