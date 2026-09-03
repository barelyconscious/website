import { useState } from "react";
import { Link } from "react-router-dom";
import { Dialog } from "radix-ui";
import { ArrowLeft, ArrowRight, X } from "lucide-react";

import { GAMES, SOCIALS } from "@/data/site";
import PageHero from "@/components/content/PageHero";
import { Badge } from "@/components/ui/badge";

import battle from "@/res/scriptkitties/battle.png";
import bag from "@/res/scriptkitties/bag.png";
import profile from "@/res/scriptkitties/profile.png";
import journal from "@/res/scriptkitties/journal.png";
import kennel from "@/res/scriptkitties/kennel.png";
import shop from "@/res/scriptkitties/shop.png";
import dialog from "@/res/scriptkitties/dialog.png";
import map from "@/res/scriptkitties/map.png";

/**
 * Trailer lives on CloudFront rather than in `src/res` — it's ~40 MB, too big to
 * bundle. Served as `video/quicktime`, but it's H.264 so browsers play it fine.
 */
const TRAILER_URL = "https://d32jwktcm7qojt.cloudfront.net/sk_trailer.mov";

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

/** Full-size screenshot viewer. `index` null means closed. */
function ShotLightbox({
  index,
  onClose,
  onStep,
}: {
  index: number | null;
  onClose: () => void;
  onStep: (delta: number) => void;
}) {
  const shot = index === null ? null : SHOTS[index];

  return (
    <Dialog.Root open={shot !== null} onOpenChange={(open) => !open && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/85" />
        <Dialog.Content
          // No body copy in here — skip Radix's description wiring.
          aria-describedby={undefined}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 focus:outline-none sm:p-12"
          // Clicking the empty space around the image closes, like the backdrop.
          onClick={(e) => e.target === e.currentTarget && onClose()}
          onKeyDown={(e) => {
            if (e.key === "ArrowLeft") onStep(-1);
            if (e.key === "ArrowRight") onStep(1);
          }}
        >
          {shot && (
            <figure onClick={(e) => e.stopPropagation()}>
              <img
                src={shot.src}
                alt={shot.label}
                className="pixelated mx-auto max-h-[78vh] w-auto max-w-full border-2 border-black object-contain pixel-shadow"
              />
              <Dialog.Title className="mt-3 text-center text-xs text-muted-foreground italic">
                {shot.label}
              </Dialog.Title>
            </figure>
          )}

          <button
            type="button"
            onClick={() => onStep(-1)}
            className="absolute top-1/2 left-2 -translate-y-1/2 border-2 border-black bg-card p-2 transition-colors hover:bg-secondary sm:left-4"
          >
            <ArrowLeft className="size-4 text-foreground" strokeWidth={3} />
            <span className="sr-only">Previous screenshot</span>
          </button>
          <button
            type="button"
            onClick={() => onStep(1)}
            className="absolute top-1/2 right-2 -translate-y-1/2 border-2 border-black bg-card p-2 transition-colors hover:bg-secondary sm:right-4"
          >
            <ArrowRight className="size-4 text-foreground" strokeWidth={3} />
            <span className="sr-only">Next screenshot</span>
          </button>

          <Dialog.Close className="absolute top-2 right-2 border-2 border-black bg-card p-2 transition-colors hover:bg-secondary sm:top-4 sm:right-4">
            <X className="size-4 text-foreground" strokeWidth={3} />
            <span className="sr-only">Close</span>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

const ScriptKitties = () => {
  const game = GAMES.find((g) => g.slug === "script-kitties")!;
  const [openShot, setOpenShot] = useState<number | null>(null);

  // Wraps around at both ends.
  const step = (delta: number) =>
    setOpenShot((i) => (i === null ? i : (i + delta + SHOTS.length) % SHOTS.length));

  return (
    <div>
      <PageHero title="Script Kitties" subtitle={game.tagline} image={battle} pixelated>
        <Badge className="font-display rounded-none border-2 border-black bg-accent text-[0.55rem] text-accent-foreground uppercase">
          {game.status}
        </Badge>
      </PageHero>

      <div className="mx-auto max-w-4xl px-4 py-12">
        <p className="text-lg text-foreground/90">{game.blurb}</p>

        {/* Trailer */}
        <h2 className="mt-10 mb-5 text-lg text-foreground">Trailer</h2>
        <video
          src={TRAILER_URL}
          controls
          loop
          playsInline
          preload="metadata"
          className="w-full border-2 border-black pixel-shadow"
        />

        {/* Roadmap */}
        <Link
          to="/script-kitties/roadmap"
          className="mt-8 inline-flex items-center gap-2 border-2 border-black bg-accent px-4 py-2 transition-transform hover:-translate-y-0.5 hover:pixel-shadow"
        >
          <span className="font-display text-[0.6rem] text-accent-foreground uppercase">
            View the roadmap
          </span>
          <ArrowRight className="size-4 text-accent-foreground" strokeWidth={3} />
        </Link>

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
              <span className="font-display text-[0.6rem] text-foreground uppercase">
                {s.label}
              </span>
            </a>
          ))}
        </div>

        {/* Release */}
        <h2 className="mt-12 mb-2 text-lg text-foreground">When is it coming out?</h2>
        <p className="text-muted-foreground">Eventually. Anyway, here's some screenshots.</p>

        {/* Screenshots */}
        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          {SHOTS.map((shot, i) => (
            <figure key={shot.label}>
              <button
                type="button"
                onClick={() => setOpenShot(i)}
                className="block w-full cursor-zoom-in transition-transform hover:-translate-y-0.5"
              >
                <img
                  src={shot.src}
                  alt={shot.label}
                  className="pixelated w-full border-2 border-black pixel-shadow"
                />
              </button>
              <figcaption className="mt-2 text-center text-xs text-muted-foreground italic">
                {shot.label}
              </figcaption>
            </figure>
          ))}
        </div>

        <ShotLightbox index={openShot} onClose={() => setOpenShot(null)} onStep={step} />
      </div>
    </div>
  );
};

export default ScriptKitties;
