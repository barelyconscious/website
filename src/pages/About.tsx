import { Link } from "react-router-dom";
import PageHero from "@/components/content/PageHero";
import { SITE, SOCIALS } from "@/data/site";

const About = () => {
  return (
    <div>
      <PageHero
        title="About"
        subtitle={`${SITE.name} — ${SITE.tagline}`}
      />

      <div className="mx-auto max-w-3xl space-y-5 px-4 py-12 leading-relaxed text-foreground/85">
        <p>
          <strong className="text-foreground">{SITE.short}</strong> is the home of Barely
          Conscious Games, a one-person studio. It's where I keep my games and write about making
          them.
        </p>
        <p>
          I'm Matt Schwartz — a software engineer (currently at Amazon Prime Video) who has been
          building games on the side since 2011. It started with{" "}
          <Link to="/stonequest" className="text-primary hover:underline">
            StoneQuest
          </Link>
          , a roguelike I rewrote more times than I'd like to admit, and continues today with{" "}
          <Link to="/script-kitties" className="text-primary hover:underline">
            Script Kitties
          </Link>
          , a mod-first creature collector.
        </p>
        <p>
          The{" "}
          <Link to="/devlog" className="text-primary hover:underline">
            devlog
          </Link>{" "}
          is where I think out loud about design, write postmortems, and post screenshots. If any
          of that sounds interesting, the best place to follow along is wherever you already spend
          your time:
        </p>

        <div className="flex flex-wrap gap-3 pt-2">
          {SOCIALS.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-3 border-2 border-black bg-card px-4 py-2 transition-transform hover:-translate-y-0.5 hover:pixel-shadow"
            >
              <img src={s.icon} alt="" className="size-6" />
              <span className="font-pixel text-[0.6rem] text-foreground uppercase">
                {s.label}
              </span>
            </a>
          ))}
        </div>

        <p className="pt-4 text-sm text-muted-foreground">
          The source for this site lives on{" "}
          <a href={SITE.sourceUrl} className="text-primary hover:underline">
            GitHub
          </a>
          .
        </p>
      </div>
    </div>
  );
};

export default About;
