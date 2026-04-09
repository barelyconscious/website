// import MyProjects from "../components/Home/MyProjects";
import endgameImg from "../res/clickfarm/screenshot-late.png";
import titleCard from "../res/clickfarm/title-card.png";
import backdrop from "../res/clickfarm/backdrop.png";

const Home = () => {
  return (
    <div>
      {/* Featured Hero */}
      <section className="relative overflow-hidden">
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${backdrop})` }}
        />
        {/* Vignette — fades all edges into the page bg */}
        <div className="absolute inset-0" style={{
          background: `
            radial-gradient(ellipse at center, transparent 30%, var(--color-bg-primary) 80%),
            linear-gradient(to bottom, var(--color-bg-primary) 0%, transparent 15%, transparent 75%, var(--color-bg-primary) 100%)
          `
        }} />
        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center min-h-[420px]">
            {/* Left — branding */}
            <div className="py-12 lg:py-16">
              <div className="inline-block bg-accent/10 text-accent text-xs font-semibold px-3 py-1 rounded-full mb-6 border border-accent/20">
                Now in Alpha
              </div>
              <img
                src={titleCard}
                alt="Click Farm"
                className="w-full max-w-md mb-6"
                style={{ imageRendering: "pixelated" }}
              />
              <p className="text-text-secondary text-lg leading-relaxed max-w-md mb-8">
                Think a million followers is cool? A billion? How about a <strong>QUINTILLION?</strong> Post content to acquire followers! Build your social media empire! 
              </p>
              <div className="flex items-center gap-4">
                <a
                  href="https://click-farm.barelyconscious.games/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative inline-flex items-center gap-2 bg-yellow-400 text-black font-extrabold text-lg py-3.5 px-10 rounded-2xl shadow-[0_4px_0_0_#ca8a04,0_6px_20px_rgba(234,179,8,0.5)] hover:shadow-[0_2px_0_0_#ca8a04,0_4px_15px_rgba(234,179,8,0.6)] hover:translate-y-[2px] active:shadow-[0_0_0_0_#ca8a04,0_2px_10px_rgba(234,179,8,0.6)] active:translate-y-[4px] transition-all duration-100 uppercase tracking-wide"
                  style={{ textShadow: "0 1px 0 rgba(255,255,255,0.4)" }}
                >
                  Play Now!
                </a>
                <a
                  href="/click-farm"
                  className="text-text-muted hover:text-text-primary text-sm font-medium underline underline-offset-4 decoration-text-muted/50 hover:decoration-text-primary transition-all duration-200"
                >
                  Learn more &rarr;
                </a>
              </div>
            </div>

            {/* Right — screenshot */}
            <div className="hidden lg:block relative">
              <div className="relative -mr-12 xl:mr-0 rounded-l-2xl xl:rounded-2xl overflow-hidden shadow-2xl border-l border-t border-b xl:border-r border-border">
                <img
                  src={endgameImg}
                  alt="Click Farm gameplay"
                  className="w-full block"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* All Games */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          {/* <MyProjects /> */}
        </div>
      </section>
    </div>
  );
};

export default Home;
