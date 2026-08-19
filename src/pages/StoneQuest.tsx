import type { ReactNode } from "react";
import PageHero from "@/components/content/PageHero";
import Figure from "@/components/content/Figure";

import preview from "@/res/stonequestPreview.png";
import rogueSplash from "@/res/worldsbetween/rogue_splash1.png";
import july2012 from "@/res/worldsbetween/stonequest_july_2012.png";
import may2013 from "@/res/worldsbetween/stonequest_may_2013.png";
import lastSwing from "@/res/worldsbetween/stonequest_lastswing.png";

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
        subtitle="A nostalgic retrospective"
        image={preview}
        pixelated
      />

      <div className="mx-auto max-w-3xl space-y-5 px-4 py-12">
        <P>
          StoneQuest was the first real game that I built. I had made a couple tiny games before, but StoneQuest was the first to get a name. I worked on it all through my college days and I still remember doodling algorithms in class. It became something so integral to who I was as a person and going through these screenshots is something like flipping through old family photo albums. If you're looking to build your own games, I <i>strongly</i> recommend keeping progress screenshots.
        </P>

        <Era>2011</Era>

        <P>
          In December 2011, over winter break, I was visiting my pop when I decided to build a new game. I had only built text-based games up until this point and I felt like it would be a fun challenge to build something more interactive. Somewhere on the internet, someone recommended building <A href="https://en.wikipedia.org/wiki/Roguelike">roguelikes</A> as a starter game, so I gave it a shot. The original Rogue was built on a "terminal control library" called curses (later, <A href="https://en.wikipedia.org/wiki/Ncurses">ncurses</A> was released with expanded capabilities). I had just finished a networking class in C and so I started building an ncurses-based roguelike game. This was quickly abandoned and I switched over to something more familiar to me at the time: <A href="https://en.wikipedia.org/wiki/Swing_(Java)">Java Swing</A>.
        </P>

        <Figure src={rogueSplash} />

        <Era>2012</Era>
        <P>
          January 2012 marked the beginning of the rest of my life. I had just transferred to a new university and for the first time in my life, I was in a city where I knew no one. I turned inward at first and focused on the game I wanted to create. I doodled in notebooks, pseudocoded algorithms to generate random levels, and planned the basic game design. I built a basic interface and added more RPG elements like an inventory and stats. Summer break came and I was back at my pop's ready to spend all my free time working on this new game of mine.
        </P>

        <Figure src={july2012} />


        <Era>May 2013</Era>

        <P>
          Over the next year, I continued chipping away at it. It was around March that I had picked the name StoneQuest out of the air, and once I gave it a name, it became very real to me. For the first time, I spent more time making games than playing them.
        </P>

        <P>
          The best part about roguelikes is you can make them as simple or complicated as you want. Over spring break, I added: a minimap, shadow-casting, monsters to fight, interactable objects like chests, loot you could pick up, drop and equip, mouse support, double-buffered rendering to fix the performance issues, a sound engine, and, of course, a revamped UI.
        </P>

        <Figure src={may2013} pixelated={false} />

        <P>
          At this stage, it's more proof-of-concept than game, but you can download it <A href="https://d32jwktcm7qojt.cloudfront.net/StoneQuest-0.6.9.jar">here</A> if you'd like. You'll need to install Java and run it from a terminal with <code>java -jar StoneQuest-0.6.9.jar</code>
        </P>

        <Era>Summer 2013</Era>
        <P>
          Over the summer, I spent my time polishing the game and making it more accessible. I came up with a story for it and fleshed out the world. I brought new mechanics to the game, like salvaging, weapon upgrades, and alchemy.
        </P>

        <Figure src={lastSwing} pixelated={false} />

        <P>
          This was the end of StoneQuest for me. I tried picking it up again here and there over the years, but once I started my career and spent all day programming for someone else, it was hard to keep doing it as a hobby. And then, after 13 years, I decided to drop the career and focus on the hobby full-time. That's where <A href="/script-kitties">Script Kitties</A> comes in.
        </P>
      </div>
    </div>
  );
};

export default StoneQuest;
