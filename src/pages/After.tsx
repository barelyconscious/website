import type { ReactNode } from "react";
import PageHero from "@/components/content/PageHero";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import background from "@/res/afterBackground.png";
import trailer from "@/res/trailer.mp4";
import shot1 from "@/res/afterScreenshot1.png";
import shot2 from "@/res/afterScreenshot2.png";
import shot3 from "@/res/afterScreenshot3.png";
import shot4 from "@/res/afterScreenshot4.png";
import shot5 from "@/res/afterScreenshot5.png";
import shot6 from "@/res/afterScreenshot6.png";
import shot7 from "@/res/afterScreenshot7.png";

const SHOTS = [shot1, shot2, shot3, shot4, shot5, shot6, shot7];

const Section = ({ title, children }: { title: string; children: ReactNode }) => (
  <section className="mt-12">
    <h2 className="mb-4 text-lg text-foreground">{title}</h2>
    {children}
  </section>
);

const Role = ({ title, children }: { title: string; children: ReactNode }) => (
  <li className="border-2 border-black bg-card p-4">
    <strong className="font-pixel text-[0.7rem] text-primary uppercase">{title}</strong>
    <p className="mt-2 text-sm text-muted-foreground">{children}</p>
  </li>
);

const After = () => {
  return (
    <div>
      <PageHero
        title="$ after█"
        subtitle="A 2D puzzle platformer about a lone survivor — a UT GAMMA project."
        image={background}
      />

      <div className="mx-auto max-w-4xl px-4 py-12">
        <Section title="About">
          <div className="space-y-4 text-foreground/85">
            <p>
              After takes place in the ruins of a city in the near future. All life has
              disappeared except for a man who has forgotten everything. He must learn what
              happened to the city, to the planet, and to its inhabitants before he can learn what
              happened to himself.
            </p>
            <p>
              It's a puzzle platformer focused on telling the story of the traveler and the city
              through environment and puzzles. After features three main levels, with a few
              transitory levels, each with unique puzzle elements. Built in Unity, with builds for
              Mac, PC, and Linux, plus an Android build.
            </p>
          </div>

          <Carousel className="mt-8">
            <CarouselContent>
              {SHOTS.map((src, i) => (
                <CarouselItem key={i}>
                  <img
                    src={src}
                    alt={`After screenshot ${i + 1}`}
                    className="w-full border-2 border-black pixel-shadow"
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="rounded-none border-2 border-black" />
            <CarouselNext className="rounded-none border-2 border-black" />
          </Carousel>
        </Section>

        <Section title="Trailer">
          <video controls className="w-full border-2 border-black pixel-shadow">
            <source src={trailer} type="video/mp4" />
          </video>
          <p className="mt-3 text-sm text-muted-foreground italic">
            Trailer directed by Taylor Womack with sound by Rob Luckfield.
          </p>
        </Section>

        <Section title="Credits">
          <ul className="grid gap-2 text-sm text-foreground/85 sm:grid-cols-2">
            <li>John Dodson — Art director</li>
            <li>Rob Luckfield — Sound engineer</li>
            <li>Tyler Pixley — Programmer</li>
            <li>Matt Schwartz — Programmer</li>
            <li>Taylor Womack — Animator & Scrum master</li>
          </ul>
        </Section>

        <Section title="My Role">
          <p className="mb-4 text-foreground/85">
            I worked with four other students through UT's multidisciplinary GAMMA program as one
            of two programmers, and lead for the mobile build. My work included:
          </p>
          <ul className="grid gap-4 sm:grid-cols-2">
            <Role title="The puzzle game loop">
              A set of Unity prefabs that let new puzzles be assembled quickly by defining how each
              piece related to the rest of the level.
            </Role>
            <Role title="A simple sound manager">
              Worked with our sound engineer, Rob, on an easy interface for adding and tweaking
              sounds in the game.
            </Role>
            <Role title="The mobile interface">
              Ours was the only team to ship on mobile. I built the interface: drag-to-move and
              touch-to-jump.
            </Role>
            <Role title="Artwork">
              Drew placeholder art and finished some first-pass art. The title scene — also the
              banner above — was drawn by me.
            </Role>
          </ul>
        </Section>

        <Section title="Play & Source">
          <div className="space-y-4 text-foreground/85">
            <p>
              The game is hosted on{" "}
              <a
                href="http://www.cs.utexas.edu/~gamedev/fall-2014/Transient-Games/Release.html"
                className="text-primary hover:underline"
              >
                UT's game development page
              </a>
              , though some browsers no longer support Unity's web player.
            </p>
          </div>
        </Section>
      </div>
    </div>
  );
};

export default After;
