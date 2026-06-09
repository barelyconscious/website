export interface DevlogFrontmatter {
  title: string;
  /**
   * ISO 8601 date string, e.g. "2025-07-19". Doubles as the publish schedule:
   * a date in the future hides the post in production until that moment passes
   * (checked on each page load), then it appears automatically — no rebuild.
   */
  date: string;
  /** Always present — the Vite loader injects a filename-derived default. */
  slug: string;
  excerpt?: string;
  tags?: string[];
  /** Absolute path under public/, e.g. "/devlog/<slug>/hero.png". */
  hero?: string;
  draft?: boolean;
  /** Set for guest posts — shown as a byline, e.g. "Claude". */
  author?: string;
}

/** Shape of a `.md` module as emitted by the markdown-frontmatter-loader. */
export interface DevlogModule {
  frontmatter: DevlogFrontmatter;
  content: string;
  default: string;
}

/** A normalized post ready for rendering. */
export interface DevlogPost extends DevlogFrontmatter {
  tags: string[];
  draft: boolean;
  content: string;
  /** Date.parse(date) — used for sorting. */
  timestamp: number;
}
