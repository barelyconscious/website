import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { posts, formatDate } from "@/content/devlog";
import { Badge } from "@/components/ui/badge";
import NewsletterSignup from "@/components/NewsletterSignup";

const Devlog = () => {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16">
      <header className="mb-12">
        <h1 className="text-2xl text-foreground sm:text-3xl">Devlog</h1>
        <p className="mt-3 max-w-xl text-muted-foreground">
          A random assortment of thoughts on all things game dev, but mostly focused on Script Kitties.
        </p>
        <NewsletterSignup
          tag="devlog"
          title="Never miss a post"
          className="mt-8 max-w-xl pixel-shadow"
        />
      </header>

      {posts.length === 0 ? (
        <p className="text-muted-foreground">No posts yet. Check back soon.</p>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2">
          {posts.map((post, i) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: Math.min(i * 0.06, 0.4) }}
            >
              <Link
                to={`/devlog/${post.slug}`}
                className="group flex h-full flex-col overflow-hidden border-2 border-black bg-card pixel-shadow transition-transform hover:-translate-y-1"
              >
                {post.hero ? (
                  <div className="aspect-[16/9] overflow-hidden border-b-2 border-black">
                    <img
                      src={post.hero}
                      alt=""
                      className="pixelated size-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                ) : (
                  <div className="aspect-[16/9] border-b-2 border-black bg-gradient-to-br from-secondary to-card arcade-grid" />
                )}

                <div className="flex flex-1 flex-col gap-3 p-5">
                  <div className="flex flex-wrap items-center gap-2">
                    <time className="font-pixel text-[0.55rem] text-accent uppercase">
                      {formatDate(post.date)}
                    </time>
                    <span className="font-pixel text-[0.55rem] text-muted-foreground uppercase">
                      · {post.readingTime} min read
                    </span>
                    {post.author && (
                      <span className="font-pixel text-[0.55rem] text-muted-foreground uppercase">
                        · Guest · {post.author}
                      </span>
                    )}
                  </div>
                  <h2 className="text-base leading-snug text-primary">{post.title}</h2>
                  <p className="line-clamp-3 text-sm text-muted-foreground">
                    {post.excerpt}
                  </p>
                  {post.tags.length > 0 && (
                    <div className="mt-auto flex flex-wrap gap-2 pt-2">
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
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Devlog;
