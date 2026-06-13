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
          AI is a polarizing topic and I have mixed feelings about it, myself. But above all else I believe it's important to be transparent about when, where, and how it is used.
        </p>

        <h2 className="mt-10 text-base text-primary">This website</h2>
        <p>
          I use AI to write and maintain the code for this website. AI influenced
          the layout and many stylistic choices. Except where clearly marked, the <i>content</i> you 
          see (the actual text) is me. 
          <br />
          Some of the text elements on the page (like buttons, the nav bar, single-word stuff) are 
          AI generated and I didn't go back and personally re-type them.
        </p>

        <h2 className="mt-10 text-base text-primary">Click Farm</h2>
        <p>
            <a
              href="https://github.com/mattschwartz/click-farm"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-primary hover:underline"
            >
              Click Farm <ExternalLink className="size-3" />
            </a>{" "}
          is a game where 100% of the code is
          AI-generated, as well as the art and most creative decisions. The sound was sourced from an artist online (I'm not sure whether the songs are AI-generated).
        </p>
        
        <h2 className="mt-10 text-base text-primary">Script Kitties</h2>
        <p>
          In Script Kitties, I use AI to maintain code for the{" "}
            <a
              href="https://github.com/barelyconscious/script-kitties-editor/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-primary hover:underline"
            >mod editor</a>{" "}
           and as a tool for understanding code documentation, such as when learning Lua and SDL.
           I will not use generative AI for: art, sound (music, SFX, VO), narrative prose or text, or creative ideas. This restriction applies to concept works as well.
        </p>
        <p className="text-base text-muted-foreground sm:text-lg">
          Last updated June 13, 2026.
        </p>
      </div>
    </div>
  );
};

export default AiDisclosure;
