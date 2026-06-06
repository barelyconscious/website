import type { ReactNode } from "react";
import PageHero from "@/components/content/PageHero";
import Figure from "@/components/content/Figure";

import preview from "@/res/stonequestPreview.png";
import earliest from "@/res/worldsbetween/earliestRoguelikeImage.png";
import roguelikeInterface from "@/res/worldsbetween/roguelikeInterface.png";
import rogueSplash from "@/res/worldsbetween/rogue_splash1.png";
import july2012 from "@/res/worldsbetween/stonequest_july_2012.png";
import graphics2d from "@/res/worldsbetween/stonequest_2dgraphics_mar_2013.png";
import may2013 from "@/res/worldsbetween/stonequest_may_2013.png";
import lastSwing from "@/res/worldsbetween/stonequest_lastswing.png";
import graveFlower from "@/res/worldsbetween/graveFlower.png";
import libGdx from "@/res/worldsbetween/stonequest_libgdx.png";

const P = ({ children }: { children: ReactNode }) => (
  <p className="leading-relaxed text-foreground/85">{children}</p>
);

const Era = ({ children }: { children: string }) => (
  <h2 className="mt-14 mb-2 border-b-2 border-border pb-3 text-base text-primary">
    {children}
  </h2>
);

const A = ({ href, children }: { href: string; children: ReactNode }) => (
  <a href={href} target="_blank" rel="noreferrer" className="text-primary hover:underline">
    {children}
  </a>
);

const StoneQuest = () => {
  return (
    <div>
      <PageHero
        title="StoneQuest"
        subtitle="The life and death of a roguelike — a decade-long obsession, in screenshots."
        image={preview}
        pixelated
      />

      <div className="mx-auto max-w-3xl space-y-5 px-4 py-12">
        <P>
          I consider StoneQuest to be the beginning of the actualization of my desire to write
          and design my own game, which started in December of 2011, over winter break. My life
          was about to move in an unpredictable direction when I returned to university a few
          weeks later, but until then all I wanted to do was expand my skills as a programmer.
        </P>
        <P>
          I had just learned about <A href="https://en.wikipedia.org/wiki/Roguelike">roguelikes</A>{" "}
          and completed a semester of advanced networking in C, so naturally I began looking into{" "}
          <A href="https://en.wikipedia.org/wiki/Ncurses">ncurses</A>. It was quickly abandoned
          because I wanted to spend the time I had writing the game before the break ended. I went
          with what I knew: <A href="https://en.wikipedia.org/wiki/Swing_(Java)">Java Swing</A>.
          From this point on, I began a series of constant tweaking and perfecting.
        </P>

        <Figure src={earliest} caption="Earliest screenshot I have" />

        <P>
          The UI got the most obvious overhaul over the years, but internally I spent countless
          hours fighting Swing — and eventually Canvas — to do what I wanted. I wrote a custom
          rasterizer for images and fonts, a custom event-handling loop for key and mouse input,
          and of course the game loop itself, object interactivity, and collision detection. It
          could have been called finished in the summer of 2012, but I realized as soon as I gave
          it a name why I was obsessing over it: I had a story to tell and a promise to keep.
        </P>

        <Era>January 2012</Era>
        <P>
          January 2012 marked the beginning of the rest of my life. I had just transferred to the
          University of Texas at Austin and, for the first time, I was in a city where I knew no
          one. I turned inward and focused on the game I wanted to create. I doodled in notebooks,
          pseudocoded level-generation algorithms, and planned the basic design.
        </P>
        <Figure src={roguelikeInterface} caption="Roguelike with an interface!" />
        <P>
          I'm not proud of it for what it is, but for what it represents. This started the project
          that would become StoneQuest, which has become so integral to who I am. Looking back on
          old screenshots is like flipping through a family album — each one brings me right back
          to where I was in life.
        </P>
        <Figure src={rogueSplash} caption="Rogue splash screen v1" />

        <Era>July 2012</Era>
        <P>
          With my first semester behind me, I went back to my family for summer vacation and
          picked up the game again. I threw away the first iteration and, after about 100 hours,
          had a fully functional game engine I could build the rest of the game on. The beauty of
          roguelikes is that they can be as simple or complex as you want — games you can grow
          with as a developer.
        </P>
        <Figure src={july2012} caption="Roguelike rewrite, July 2012" />

        <Era>May 2013</Era>
        <P>
          From July 2012 until May 2013, I dedicated several hundred hours to the game. Sometime
          between January and March I plucked the name StoneQuest out of the air as a working
          title — and once it had a name, it became very real to me. For the first time, I spent
          more time making a game than playing them. Over spring break I implemented 2D graphics.
          It was surprisingly easy, but the performance was trash.
        </P>
        <Figure src={graphics2d} caption="StoneQuest appears (terribly over-saturated)" pixelated={false} />
        <P>
          The next things I added: a minimap; shadow-casting; monsters to fight; interactable
          objects like chests; loot you could pick up, drop, and equip; mouse support;
          double-buffered rendering to fix performance; a sound engine; and a revamped UI. This is
          the most complete StoneQuest had ever been — and, regrettably, ever will be.
        </P>
        <Figure src={may2013} caption="StoneQuest's most complete form" pixelated={false} />

        <Era>Summer 2013</Era>
        <P>
          The UI above was horrible to use. It was tiny and hard to read at best, unintuitive at
          worst. I spent much of the summer drawing — increasing the tile size, rebuilding the
          interface around readability and familiarity, and adding transient elements like tips.
          Without realizing it, I had begun to tie the game's development to big moments in my
          personal life.
        </P>
        <Figure src={lastSwing} caption="StoneQuest's final moments in Java Canvas" pixelated={false} />
        <P>
          It was at this point I realized the codebase was doomed. Input handling was a mess and
          the UI was just as bad internally. Scene transitions didn't exist and adding them meant
          a major rework. I hadn't used source control, and I haven't bothered to salvage it. For
          all meaningful purposes, this is where and when StoneQuest died.
        </P>
        <div className="py-6 text-center">
          <img
            src={graveFlower}
            alt="Sleep your eternal dream."
            className="pixelated mx-auto w-24"
          />
          <p className="mt-3 text-sm text-muted-foreground italic">July 2012 – May 11, 2013.</p>
        </div>

        <Era>2014</Era>
        <P>
          Every good story has an epilogue; sometimes bad ones do as well. I'll leave it to you to
          decide which this is. I reworked the UI artwork again and designed an interface I really
          liked. I explored other engines — Slick2D and libGDX, both in Java. Here's StoneQuest
          implemented in libGDX with that UI.
        </P>
        <Figure src={libGdx} caption="StoneQuest implemented in libGDX" pixelated={false} />
      </div>
    </div>
  );
};

export default StoneQuest;
