import { Link } from "react-router-dom";
import { Bot, ExternalLink } from "lucide-react";
import { GAMES } from "@/data/site";
import PageHero from "@/components/content/PageHero";
import Figure from "@/components/content/Figure";
import { Button } from "@/components/ui/button";

import cover from "@/res/clickfarm/cover.jpg";
import gameplay from "@/res/clickfarm/gameplay.png";

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
        subtitle="Grow your social media presence to absurd levels."
        image={cover}
      >
        <Button asChild variant="pixelAccent" size="pixel">
          <a href={PLAY_URL} target="_blank" rel="noreferrer">
            Play it now <ExternalLink className="size-3" />
          </a>
        </Button>
      </PageHero>

      <div className="mx-auto max-w-4xl px-4 py-12">
        <p>
          Click Farm is an idle clicker game in the browser that lets you build your social media empire across the well-known social media giants: Chirper, Skroll, Picshift, and Podpod. 
        </p>
        
        <Figure src={gameplay} caption="Grow followers across Chirper, Picshift, Skroll, and PodPod" pixelated={false} />

        {/* How it works */}
        <h2 className="mt-12 mb-5 text-lg text-foreground">How it works</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <Feature title="Tap to post">
            Each tap earns engagement. Engagement converts to followers. Followers unlock
            new platforms.
          </Feature>
          <Feature title="Hire your army">
            Hand starting to cramp up? Buy autoclickers that do the hard work for you.
          </Feature>
          <Feature title="Level up">
            Upgrade every facet of your social media presence to gain followers and engagement more quickly.
          </Feature>
          <Feature title="Rebrand">
            Toss it all away and become someone new. Take your clout with you to purchase permanent upgrades!
          </Feature>
        </div>

        {/* The content ladder */}
        <h2 className="mt-12 mb-3 text-lg text-foreground">Ascend the content ladder</h2>
        <p className="text-foreground/85">
          Start by posting inflammatory Chirps. Graduate to posting selfies and live streaming. Start a podcast and eventually mog on all the haters.
        </p>
        <p className="py-3">
          Continue building your engagement until the numbers stop making sense.
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
