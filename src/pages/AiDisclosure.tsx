import PageHero from "@/components/content/PageHero";
import { ExternalLink } from "lucide-react";

const AiDisclosure = () => {
  return (
    <div>
      <PageHero
        title="AI Disclosure"
        subtitle="Usage of LLMs and generative AI at Barely Conscious Games"
      />

      <div className="mx-auto max-w-3xl space-y-5 px-4 py-12 leading-relaxed text-foreground/85">
        <p>
          AI is a polarizing topic and I have mixed feelings about it myself. But above all else I believe it's important to be transparent about when, where, and how it is used.
        </p>

        <h2 className="mt-10 text-base text-primary">This website</h2>
        <p>
          I use AI to write and maintain the code for this website. Except where clearly marked, the <i>content</i> you
          see (the actual text) is me.
          Some of the text elements on the page (like buttons, the nav bar, single-word stuff) are
          AI generated and I didn't go back and personally re-type them.
        </p>

        <h2 className="mt-10 text-base text-primary">Script Kitties</h2>
        <p>
          The use of AI in Script Kitties is intentionally limited. Generative AI is not used for any creative asset (including but not limited to: art, prose, sound fx, music) nor is it used for any creative decision (including but not limited to: story, creature names, abilities, balance decisions). This applies both to the final assets as well as concept works. I do not use generative AI for the code either - my code is objectively better and I cannot stand reviewing AI code.
        </p>
        <p>
          I used AI to build the <a
            href="https://github.com/barelyconscious/script-kitties-editor/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 text-primary hover:underline"
          >data editor <ExternalLink className="size-3" /></a>{" "} - a simple app that helps organize and edit the game's data. I maintain the editor with AI so that I can focus my time and attention on the game itself, instead.
        </p>

        <h2 className="mt-10 text-base text-primary">Click Farm</h2>
        <p>
          <a
            href="https://click-farm.barelyconscious.games/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 text-primary hover:underline"
          >
            Click Farm <ExternalLink className="size-3" />
          </a>{" "}
          has 100% AI-generated code. During development, generative AI was used for the visual assets, which was replaced with human artwork later. Sound effects were sourced from open license websites. Music was sourced from {" "}
          <a
            href="https://pixabay.com/users/djartmusic-46653586/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 text-primary hover:underline"
          >
            DJARTMUSIC <ExternalLink className="size-3" />
          </a>.
        </p>
        <p className="text-base text-muted-foreground sm:text-lg">
          Last updated June 25, 2026.
        </p>
      </div>
    </div>
  );
};

export default AiDisclosure;
