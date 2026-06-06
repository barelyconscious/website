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
        subtitle="A nostalgic retrospective"
        image={preview}
        pixelated
      />

      <div className="mx-auto max-w-3xl space-y-5 px-4 py-12">
        <P>
          I consider Worlds Between to be the beginning of the actualization of my desire to write and design my own game which started in December of 2011, over winter break. My life was about to move in an unpredictable direction when I returned to university a few weeks later, but until then all I wanted to do was expand my skills as a programmer.
        </P>
        <P>
          I had just learned about <A href="https://en.wikipedia.org/wiki/Roguelike">roguelikes</A>{" "}
          and completed a semester of advanced networking in C, so naturally I began looking into{" "}
          <A href="https://en.wikipedia.org/wiki/Ncurses">ncurses</A>. It was quickly abandoned
          because I wanted to spend more of the time I had writing the game before the break ended. I went
          with what I knew at the time: <A href="https://en.wikipedia.org/wiki/Swing_(Java)">Java Swing</A>.
          From this point on, I began a series of constant tweaking and perfecting. After hundreds of times starting up the game in development, I would realize how this or that could be improved and would spend as much time as necessary to ensure it was perfect before moving on.
        </P>

        <Figure src={earliest} caption="Earliest screenshot I have" />

        <P>
          The UI got the most obvious overhaul over the years, as you will see below, but internally I spent countless hours fighting Swing and eventually Canvas to do what I wanted it to do. I wrote a custom rasterizer for images and fonts; a custom event-handling loop that sat on top of Swing's for key and mouse input; and of course the game loop itself, object interactivity, and collision detection. I was never satisfied with anything for too long. It would be fair to critique me for that. The UI was usable and the fundamental game mechanics were all there. It could have been called finished in the summer of 2012.
        </P>

        <P>
          But I realized as soon as I gave it a name why I was obsessing over it like I had been at that point: I had a story to tell and a promise to keep. This is still my very first game. And this will be the first story I ever tell.
        </P>

        <P>
          While working on StoneQuest, I developed some story points and tropes that I wanted to include in the final game. They were formless and more feeling than thought but my story was in there waiting for me when I was ready.
        </P>

        <P>
          StoneQuest was to be set in the typical fantasy world, 1100s or 1200s maybe. The player would begin at the edge of a small town that sat in the shadow of a looming mountain nearby. In standard roguelike fashion, the player would descend into that mountain and find tougher and tougher enemies as she delved deeper. I had planned on theming sections of the underground with the story, which would tell itself as the player went lower and lower. At some point, she would find the dead civilization of the dwarves: the religious icons they worshipped and the gods that benefited them and punished them; the machines of the underground that powered the world; and finally...
        </P>

        <P>
          Well, I hadn't really planned that part out. It never found its form in the context of StoneQuest because StoneQuest wasn't the story I needed to tell. But I sat on it and years later, it found me through Worlds Between Blood.
        </P>

        <Era>January 2012</Era>
        <P>
          January 2012 marked the beginning of the rest of my life. I had just transferred to the University of Texas at Austin and for the first time in my life, I was in a city where I knew no one. I turned inward at first and focused on the game I wanted to create. I doodled in notebooks, pseudocoded algorithms to generate random levels, and planned the basic game design. Of course, none of that ever made it into the game, but I did create something I'm still proud of:
        </P>
        <Figure src={roguelikeInterface} caption="Roguelike with an interface!" />
        <P>
          Now, I know it's nothing special and I'm not proud of it for what it is but rather what it represents. This started the project that would later become StoneQuest, which has become so integral to who I am. Looking back on old screenshots is akin to flipping through old photographs in a family album for me since each brings me right back to where I was in life. It shaped me as a developer and a creator. I was incredibly excited by this. I was learning new things and this medium allowed me to express creativity and freedom in a way I had never done before.
        </P>
        <P>
          Anyway, here's the splash screen for no reason other than it makes me happy to see it after all these years:
        </P>
        <Figure src={rogueSplash} caption="Rogue splash screen v1" />

        <Era>July 2012</Era>
        <P>
          With my first semester at UT behind me, I went back to my family for summer vacation and picked up the game again. I threw away the first iteration and after about 100 hours, I had a fully functional game engine upon which I could write the rest of the game. The beauty of roguelikes is that they can be as simple or complex as you want. They're games that you can grow with as a developer.
        </P>
        <Figure src={july2012} caption="Roguelike rewrite, July 2012" />

        <Era>May 2013</Era>
        <P>
          From July 2012 until May 2013, I dedicated several hundred hours working on the game. It was sometime between January and March where I plucked the name StoneQuest out of the air, which was intended to be a working title. And once I gave it a name, it became very real to me and for the first time, I spent more time making a game than I did playing them. And the game was iterated on constantly. Over spring break, I went home again and implemented 2D graphics. It was surprisingly easy, but the performance was trash. Below is the first screenshot I have of these (terribly over-saturated) graphics:
        </P>
        <Figure src={graphics2d} caption="StoneQuest appears (terribly over-saturated)" pixelated={false} />
        <P>
          It's painful to look at now and I would have said that then, too. The next things I added were: a minimap; shadow-casting; monsters to fight; interactable objects like chests; loot you could pick up, drop and equip; mouse support; double-buffered rendering to fix the performance issues; a sound engine; and, of course, a revamped UI. Features came and went so quickly and I felt truly inspired passion. This is the most complete StoneQuest had ever been and, regrettably, ever will be:
        </P>
        <Figure src={may2013} caption="StoneQuest's most complete form" pixelated={false} />

        <Era>Summer 2013</Era>
        <P>
          The UI depicted above was horrible to use as a player. It was tiny and hard to read at best and completely unintuitive at worst. I kept tweaking the UI more and more. I spent much of the summer sitting down and drawing. I increased the tile size since it was too small before. I upgraded the interface with a focus on readability, familiarity, and usability. I wrote transient UI elements like tips and implemented much more interactive interface elements.
        </P>
        <P>
          Without realizing it, I had begun to tie the development of StoneQuest to big moments in my personal life. I can still see where I was in my life through these screenshots. So it's no wonder to me that seeing this screenshot now makes me immeasurably sad.
        </P>

        <P>
          Here is the last screenshot I have to offer for StoneQuest as it existed for almost a year using Java's Canvas library:
        </P>
        
        <Figure src={lastSwing} caption="StoneQuest's final moments in Java Canvas" pixelated={false} />
        <P>
          It was at this point I realized the code base was doomed. The input handling was a complete mess and the UI elements were just as bad internally. Scene transitions were non-existent and making them would have necessitated a major rework. I spent a few weeks trying to improve it and left it in an irrevocable state. I did not use any sort of source control before this point and have not bothered to salvage it. I don't have any way to know an exact date, but the last image I have is dated May 11, 2013.
        </P>
        <P>
          For all meaningful implications, this is where and when StoneQuest died.
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
          Every good story has an epilogue. Sometimes bad ones do as well. I'll leave it up to you to decide to which category this one belongs. I reworked the UI artwork some more and designed an interface that I really liked and that was easy to parse visually. I explored other options for game engines. I tried out Slick2D and libGDX, both in Java. Here's a screenshot of the implementation of StoneQuest using libGDX with that UI:
        </P>
        <Figure src={libGdx} caption="StoneQuest implemented in libGDX" pixelated={false} />
      </div>
    </div>
  );
};

export default StoneQuest;
