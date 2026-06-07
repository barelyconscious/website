import PageHero from "@/components/content/PageHero";
import { ExternalLink } from "lucide-react";

const AiDisclosure = () => {
  return (
    <div>
      <PageHero
        title="AI Disclosure"
        subtitle="Usage of LLMs at Barely Conscious Games"
      />

      <div className="mx-auto max-w-3xl space-y-5 px-4 py-12 leading-relaxed text-foreground/85">
        <p>
          AI is a polarizing topic and I have mixed feelings about it, myself. 
          But above all else I believe it's critically important to be 100% 
          transparent about when, where, and how it is used. Anything less feels dishonest to me.
        </p>

        <h2 className="mt-10 text-base text-primary">This website</h2>
        <p>
          I use AI heavily to write and maintain the code for this website. AI influenced
          the layout and many stylistic choices. However, 100% of the <i>content</i> you 
          see - <i>the actual text</i> - is me. 
          <br />
          Some of the text elements on the page (like buttons, the nav bar, single-word stuff) are 
          AI generated and I didn't go back and physically type them out.
        </p>

        <h2 className="mt-10 text-base text-primary">Game Development</h2>
        <p>
          Except when clearly marked, all of my games are 100% human-made.
        </p>

        <p>
            <a
              href="https://click-farm.barelyconscious.games/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-primary hover:underline"
            >
              Click Farm <ExternalLink className="size-3" />
            </a>{" "}
          is a game where 100% of it is
          AI-generated, including the art and most creative decisions.
        </p>
        
        <p>
          In Script Kitties, I use AI for the{" "}
            <a
              href="https://github.com/barelyconscious/script-kitties-editor/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-primary hover:underline"
            >mod editor</a>{" "}
           and as a tool for understanding code documentation, such as when learning Lua and SDL.
           At no point in the lifetime of Script Kitties will I use generative AI for: art, sound (music, SFX, VO), narrative prose or text, or creative ideas. Where an asset has been outsourced to a hired artist, their work is guaranteed by them to follow these same guidelines.
        </p>

        <h2 className="mt-10 text-base text-primary">General Use</h2>
        <p>
          I use AI generally for things like web searches and deep diving into code documentation.
          Although, I do actually still use Stack Overflow for some things.
        </p>
      </div>
    </div>
  );
};

export default AiDisclosure;
