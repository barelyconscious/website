import { Link } from "react-router-dom";
import { Bot, ExternalLink } from "lucide-react";
import { GAMES } from "@/data/site";
import PageHero from "@/components/content/PageHero";
import Figure from "@/components/content/Figure";
import { Button } from "@/components/ui/button";

import cover from "@/res/clickfarm/cover.jpg";
import gameplayPlatforms from "@/res/clickfarm/gameplay-platforms.png";
import gameplayUpgrades from "@/res/clickfarm/gameplay-upgrades.png";
import gameplayMultipliers from "@/res/clickfarm/gameplay-multipliers.png";

const PLAY_URL = "https://click-farm.barelyconscious.games/";

const Feature = ({ title, children }: { title: string; children: string }) => (
  <div className="border-2 border-black bg-card p-4">
    <h3 className="font-pixel text-[0.7rem] text-primary uppercase">{title}</h3>
    <p className="mt-2 text-sm text-muted-foreground">{children}</p>
  </div>
);

const ClickFarm = () => {
  const game = GAMES.find((g) => g.slug === "click-farm")!;

  return (
    <div>
      <PageHero
        title="Click Farm"
        subtitle="Grow your fame. Lose your soul. Tap anyway."
        image={cover}
      >
        <Button asChild variant="pixelAccent" size="pixel">
          <a href={PLAY_URL} target="_blank" rel="noreferrer">
            Play it now <ExternalLink className="size-3" />
          </a>
        </Button>
      </PageHero>

      <div className="mx-auto max-w-4xl px-4 py-12">
        {/* Fully-AI disclosure — prominent and unambiguous */}
        <div className="flex items-start gap-3 border-2 border-primary bg-primary/10 p-4">
          <Bot className="mt-0.5 size-5 shrink-0 text-primary" />
          <div className="space-y-1">
            <p className="font-pixel text-[0.7rem] text-primary uppercase">
              Fully AI-generated
            </p>
            <p className="text-sm text-foreground/85">
              Click Farm was made entirely with AI — <strong>every line of code and
              every art asset</strong>, from the cover art to the icons to the backdrops and even this page.
              It's an experiment in what AI tooling can ship end-to-end. More on the{" "}
              <Link to="/ai-disclosure" className="text-primary hover:underline">
                AI Disclosure
              </Link>{" "}
              page.
            </p>
          </div>
        </div>

        <p className="mt-8 text-lg text-foreground/90">{game.blurb}</p>
        <p className="mt-4 text-muted-foreground">
          The journey between those two points is the joke — and the game.
        </p>

        <Figure src={gameplayPlatforms} caption="Grow followers across Chirper, Picshift, Skroll, and PodPod" pixelated={false} />

        {/* How it works */}
        <h2 className="mt-12 mb-5 text-lg text-foreground">How it works</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <Feature title="Tap to post">
            Each tap earns engagement. Engagement converts to followers. Followers unlock
            new platforms.
          </Feature>
          <Feature title="Hire your army">
            Buy autoclickers that tap for you. Your hand is always faster — but the army
            adds up.
          </Feature>
          <Feature title="Level up">
            Speed upgrades make you tap faster; power upgrades make every tap hit harder.
            Each axis feels different.
          </Feature>
          <Feature title="Rebrand">
            Grown enough? Wipe everything and start over — but keep Clout, which buys
            permanent upgrades for a faster, stranger next run.
          </Feature>
        </div>

        <Figure src={gameplayUpgrades} caption="Power and speed upgrades across every content tier" pixelated={false} />

        {/* The content ladder */}
        <h2 className="mt-12 mb-3 text-lg text-foreground">Ascend the content ladder</h2>
        <p className="text-foreground/85">
          Chirps become selfies become livestreams become podcasts become viral stunts.
          The numbers stop making sense. That's the point.
        </p>

        <Figure src={gameplayMultipliers} caption="Late game, when the multipliers stop making sense" pixelated={false} />

        {/* The feel */}
        <h2 className="mt-12 mb-3 text-lg text-foreground">The feel</h2>
        <p className="text-foreground/85">
          It's an idle/clicker game that plays like an arcade cabinet and reads like satire.
          The tone is affectionate, not cruel — it laughs at the creator economy, not at you.
          No ads. No microtransactions. No daily login rewards. No dark patterns. Just clicks.
          It runs entirely in your browser; state saves to localStorage, with no server,
          account, or sign-up.
        </p>

        <div className="mt-10 flex flex-wrap gap-4">
          <Button asChild variant="pixelAccent" size="pixel">
            <a href={PLAY_URL} target="_blank" rel="noreferrer">
              Play it now <ExternalLink className="size-3" />
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ClickFarm;
