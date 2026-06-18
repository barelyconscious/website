import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Map } from "lucide-react";
import { GAMES, SITE } from "@/data/site";
import { posts, formatDate } from "@/content/devlog";
import GameCard from "@/components/GameCard";
import { Button } from "@/components/ui/button";
import heroArt from "@/res/scriptkitties/battle.png";

const Home = () => {
  const flagship = GAMES[0];
  const latest = posts.slice(0, 3);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden border-b-2 border-black scanlines">
        <div className="absolute inset-0">
          <img
            src={heroArt}
            alt=""
            className="pixelated size-full object-cover opacity-45"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/30" />
        </div>

        <div className="relative mx-auto flex max-w-6xl flex-col gap-6 px-4 py-20 sm:py-28">
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-pixel text-[0.6rem] tracking-widest text-accent uppercase"
          >
            {SITE.name} PRESENTS
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="max-w-3xl text-2xl leading-tight text-foreground sm:text-4xl"
          >
            {flagship.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="max-w-xl text-base text-muted-foreground sm:text-lg"
          >
            {flagship.tagline}.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="flex flex-wrap gap-4 pt-2"
          >
            <Button asChild variant="pixel" size="pixel">
              <Link to={flagship.href}>
                More Info
              </Link>
            </Button>
            <Button asChild variant="pixelAccent" size="pixel">
              <Link to="/script-kitties/roadmap">
                <Map className="size-4" />
                View Roadmap{" "}
                <span className="rounded-sm bg-black/25 px-1.5 py-0.5 text-[0.55rem]">
                  NEW!
                </span>
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Games */}
      <section id="games" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-16">
        <div className="mb-8 flex items-end justify-between">
          <h2 className="text-xl text-foreground sm:text-2xl">Games</h2>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {GAMES.filter((game) => game.slug !== "click-farm").map((game) => (
            <GameCard key={game.slug} game={game} />
          ))}
        </div>
      </section>

      {/* Latest devlog */}
      {latest.length > 0 && (
        <section className="border-t-2 border-black bg-[#11131a]">
          <div className="mx-auto max-w-6xl px-4 py-16">
            <div className="mb-8 flex items-end justify-between gap-4">
              <h2 className="text-xl text-foreground sm:text-2xl">From the Devlog</h2>
              <Link
                to="/devlog"
                className="font-pixel inline-flex items-center gap-2 text-[0.6rem] text-primary uppercase hover:underline"
              >
                All posts <ArrowRight className="size-3" />
              </Link>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {latest.map((post) => (
                <Link
                  key={post.slug}
                  to={`/devlog/${post.slug}`}
                  className="group flex flex-col border-2 border-black bg-card p-5 transition-transform hover:-translate-y-1 hover:pixel-shadow"
                >
                  <time className="font-pixel text-[0.55rem] text-accent uppercase">
                    {formatDate(post.date)}
                  </time>
                  <h3 className="mt-3 text-sm leading-snug text-primary">
                    {post.title}
                  </h3>
                  <p className="mt-3 line-clamp-3 text-sm text-muted-foreground">
                    {post.excerpt}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Home;
