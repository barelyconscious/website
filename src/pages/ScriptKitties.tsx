import { GAMES, SOCIALS } from "@/data/site";
import PageHero from "@/components/content/PageHero";
import { Badge } from "@/components/ui/badge";

import battle from "@/res/scriptkitties/battle.png";
import trailer from "@/res/scriptkitties/ScriptKitties 2025-01-13 19-44-08.mp4";
import bag from "@/res/scriptkitties/bag.png";
import profile from "@/res/scriptkitties/profile.png";
import journal from "@/res/scriptkitties/journal.png";
import kennel from "@/res/scriptkitties/kennel.png";
import shop from "@/res/scriptkitties/shop.png";
import dialog from "@/res/scriptkitties/dialog.png";
import map from "@/res/scriptkitties/map.png";

const SHOTS = [
  { src: battle, label: "Battle" },
  { src: map, label: "World map" },
  { src: dialog, label: "Dialog" },
  { src: kennel, label: "Kennel" },
  { src: journal, label: "Journal" },
  { src: shop, label: "Shop" },
  { src: bag, label: "Inventory" },
  { src: profile, label: "Profile" },
];

const ScriptKitties = () => {
  const game = GAMES.find((g) => g.slug === "script-kitties")!;

  return (
    <div>
      <PageHero title="Script Kitties" subtitle={game.tagline} image={battle} pixelated>
        <Badge className="font-pixel rounded-none border-2 border-black bg-accent text-[0.55rem] text-accent-foreground uppercase">
          {game.status}
        </Badge>
      </PageHero>

      <div className="mx-auto max-w-4xl px-4 py-12">
        <p className="text-lg text-foreground/90">{game.blurb}</p>

        {/* Socials */}
        <h2 className="mt-12 mb-5 text-lg text-foreground">Follow along</h2>
        <div className="flex flex-wrap gap-3">
          {SOCIALS.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-3 border-2 border-black bg-card px-4 py-2 transition-transform hover:-translate-y-0.5 hover:pixel-shadow"
            >
              <img src={s.icon} alt="" className="size-6" />
              <span className="font-pixel text-[0.6rem] text-foreground uppercase">
                {s.label}
              </span>
            </a>
          ))}
        </div>

        {/* Release */}
        <h2 className="mt-12 mb-2 text-lg text-foreground">When is it coming out?</h2>
        <p className="text-muted-foreground">Eventually. Here's a trailer and some screenshots in the meantime.</p>

        {/* Trailer */}
        <video controls className="mt-8 w-full border-2 border-black pixel-shadow">
          <source src={trailer} type="video/mp4" />
        </video>

        {/* Screenshots */}
        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          {SHOTS.map((shot) => (
            <figure key={shot.label}>
              <img
                src={shot.src}
                alt={shot.label}
                className="pixelated w-full border-2 border-black pixel-shadow"
              />
              <figcaption className="mt-2 text-center text-xs text-muted-foreground italic">
                {shot.label}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScriptKitties;
