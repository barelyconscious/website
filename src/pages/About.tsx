import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

import PageHero from "@/components/content/PageHero";

import battle from "@/res/scriptkitties/battle.png";

const About = () => {
  return (
    <div>
      <PageHero
        title="About Me"
        subtitle=""
        image={battle}
        pixelated
      />

      <div className="mx-auto max-w-3xl px-4 py-12">
        <div className="space-y-5 leading-relaxed text-foreground/85">
          <p>
            I'm Matt, a professional software engineer who left big tech to focus on making small games full-time. I've been making games as a hobby since I was in middle school programming adventure games on my friend's TI-83. Since then, I've worked on several games in my spare time like <Link
                to="/stonequest"
                className="text-primary hover:underline"
              >
                StoneQuest
              </Link> and <Link
                to="/click-farm"
                className="text-primary hover:underline"
              >
                Click Farm
              </Link>. 
          </p>

          <p>
            Now, my focus is on <Link
                to="/script-kitties"
                className="text-primary hover:underline"
              >
                Script Kitties
              </Link>, a turn-based action strategy creature collector. The game is still very early in development, but if you'd like to follow along, check out my devlog where I post regular updates about the progress and challenges along the way. It can get pretty technical, but I usually try to focus on the story rather than the details.
          </p>
        </div>

        <Link
          to="/devlog"
          className="mt-5 inline-flex items-center gap-2 border-2 border-black bg-accent px-4 py-2 transition-transform hover:-translate-y-0.5 hover:pixel-shadow"
        >
          <span className="font-pixel text-[0.6rem] text-accent-foreground uppercase">
            Read the devlog
          </span>
          <ArrowRight className="size-4 text-accent-foreground" strokeWidth={3} />
        </Link>
      </div>
    </div>
  );
};

export default About;
