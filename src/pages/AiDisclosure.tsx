import { Link } from "react-router-dom";
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
          Except when clearly marked, all of my games are 100% human-made, including but not limited to:
          the code (no Copilot or AI autocomplete either), the art, the sound, the writing, and all creative decisions (ie - I do not ask it to "come up with ideas").
          <br />
            <a
              href="https://click-farm.barelyconscious.games/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-primary hover:underline"
            >
              Click Farm <ExternalLink className="size-3" />
            </a>{" "}
          is a game where 100% of it is
          AI-generated, including the art and some creative decisions.
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
