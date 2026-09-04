import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";

const SITE_NAME = "Barely Conscious Games";
const ORIGIN = "https://www.barelyconscious.games";
const DEFAULT_IMAGE = `${ORIGIN}/og-image.png`;

interface SeoProps {
  /** Page title. Rendered as `title | Barely Conscious Games` unless `bareTitle`. */
  title: string;
  /** Meta description — keep it under ~160 chars and mention the exact page/game name. */
  description: string;
  /** Absolute URL for og:image / twitter:image. Defaults to the site OG image. */
  image?: string;
  /** og:type — "website" (default) or e.g. "article" for devlog posts. */
  type?: string;
  /** Use `title` verbatim as the document title (no site-name suffix). */
  bareTitle?: boolean;
  /**
   * Optional schema.org JSON-LD object (e.g. a VideoGame or Article). Serialized
   * into a `<script type="application/ld+json">`. This is the strongest signal
   * for telling Google a page is a distinct named entity.
   */
  jsonLd?: Record<string, unknown>;
}

/**
 * Per-route `<head>` management for this client-rendered SPA. Because every route
 * otherwise shares the single title/meta in `index.html`, individual pages can't
 * rank for their own names — this component gives each page its own title,
 * description, canonical URL, social cards, and optional structured data.
 *
 * NOTE: this only reaches crawlers that render JS (Googlebot does; most social
 * scrapers do not). Prerendering/SSG the routes at build time is the robust
 * follow-up if link previews or non-JS crawlers matter.
 */
const Seo = ({ title, description, image, type = "website", bareTitle, jsonLd }: SeoProps) => {
  const { pathname } = useLocation();
  const canonical = `${ORIGIN}${pathname}`;
  const fullTitle = bareTitle ? title : `${title} | ${SITE_NAME}`;
  const ogImage = image ?? DEFAULT_IMAGE;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />

      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={ogImage} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {jsonLd && <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>}
    </Helmet>
  );
};

export default Seo;
