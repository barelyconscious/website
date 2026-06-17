import { useRef } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import { ArrowLeft, ArrowRight, ChevronLeft } from "lucide-react";
import { postsBySlug, getAdjacent, formatDate } from "@/content/devlog";
import { Badge } from "@/components/ui/badge";
import ReadingProgress from "@/components/ReadingProgress";

const DevlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const articleRef = useRef<HTMLElement>(null);
  const post = slug ? postsBySlug[slug] : undefined;

  if (!post) return <Navigate to="/devlog" replace />;

  const { older, newer } = getAdjacent(post.slug);

  return (
    <article ref={articleRef} className="mx-auto max-w-3xl px-4 py-12">
      <ReadingProgress target={articleRef} />
      <Link
        to="/devlog"
        className="font-pixel inline-flex items-center gap-2 text-[0.6rem] text-muted-foreground uppercase hover:text-primary"
      >
        <ChevronLeft className="size-3" /> All posts
      </Link>

      <header className="mt-8 border-b-2 border-border pb-8">
        <div className="flex flex-wrap items-center gap-3">
          <time className="font-pixel text-[0.6rem] text-accent uppercase">
            {formatDate(post.date)}
          </time>
          {post.author && (
            <span className="font-pixel border-2 border-black bg-secondary px-2 py-1 text-[0.55rem] text-muted-foreground uppercase">
              Guest · {post.author}
            </span>
          )}
        </div>
        <h1 className="mt-4 text-xl leading-tight text-foreground sm:text-2xl">
          {post.title}
        </h1>
        {post.tags.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Badge
                key={tag}
                variant="outline"
                className="rounded-none border-border text-[0.65rem] text-muted-foreground"
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </header>

      {post.hero && (
        <img
          src={post.hero}
          alt=""
          className="mt-8 w-full border-2 border-black pixel-shadow"
        />
      )}

      <div className="prose prose-invert devlog-prose mt-10 max-w-none">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[[rehypeHighlight, { detect: true }]]}
        >
          {post.content}
        </ReactMarkdown>
      </div>

      {/* Prev / next */}
      <nav className="mt-16 grid gap-4 border-t-2 border-border pt-8 sm:grid-cols-2">
        {newer ? (
          <Link
            to={`/devlog/${newer.slug}`}
            className="group flex flex-col gap-1 border-2 border-black bg-card p-4 transition-transform hover:-translate-y-1"
          >
            <span className="font-pixel inline-flex items-center gap-2 text-[0.55rem] text-muted-foreground uppercase">
              <ArrowLeft className="size-3" /> Newer
            </span>
            <span className="text-sm text-primary group-hover:underline">
              {newer.title}
            </span>
          </Link>
        ) : (
          <span />
        )}
        {older && (
          <Link
            to={`/devlog/${older.slug}`}
            className="group flex flex-col gap-1 border-2 border-black bg-card p-4 text-right transition-transform hover:-translate-y-1 sm:items-end"
          >
            <span className="font-pixel inline-flex items-center gap-2 text-[0.55rem] text-muted-foreground uppercase">
              Older <ArrowRight className="size-3" />
            </span>
            <span className="text-sm text-primary group-hover:underline">
              {older.title}
            </span>
          </Link>
        )}
      </nav>
    </article>
  );
};

export default DevlogPost;
