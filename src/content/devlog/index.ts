import type { DevlogModule, DevlogPost } from "@/types/devlog";

const modules = import.meta.glob<DevlogModule>("./*.md", { eager: true });

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
      timestamp: Date.parse(fm.date),
    } satisfies DevlogPost;
  })
  // Drafts are visible in dev, hidden in production builds.
  .filter((p) => import.meta.env.DEV || !p.draft)
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
