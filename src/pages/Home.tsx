import MyProjects from "../components/Home/MyProjects";
import endgameImg from "../res/clickfarm/endgame.png";
import titleCard from "../res/clickfarm/title-card.png";

const Home = () => {
  return (
    <div>
      {/* Featured Hero */}
      <section className="bg-gradient-to-br from-[#f0ebe3] to-[#e8e0d4] overflow-hidden">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center min-h-[420px]">
            {/* Left — branding */}
            <div className="py-12 lg:py-16">
              <div className="inline-block bg-emerald-700/10 text-emerald-800 text-xs font-semibold px-3 py-1 rounded-full mb-6 border border-emerald-700/20">
                Now in Alpha
              </div>
              <img
                src={titleCard}
                alt="Click Farm"
                className="w-full max-w-md mb-6"
                style={{ imageRendering: "pixelated" }}
              />
              <p className="text-stone-600 text-lg leading-relaxed max-w-md mb-8">
                Build a social media empire one post at a time. Grow followers, unlock platforms, and rebrand for clout.
              </p>
              <div className="flex items-center gap-4">
                <a
                  href="https://click-farm.barelyconscious.games/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative inline-flex items-center gap-2 bg-yellow-400 text-black font-extrabold text-lg py-3.5 px-10 rounded-2xl border-b-4 border-yellow-600 hover:border-b-2 hover:translate-y-[2px] active:border-b-0 active:translate-y-[4px] transition-all duration-100 shadow-[0_6px_20px_rgba(234,179,8,0.5)] hover:shadow-[0_4px_15px_rgba(234,179,8,0.6)] uppercase tracking-wide"
                  style={{ textShadow: "0 1px 0 rgba(255,255,255,0.4)" }}
                >
                  Play Now!
                </a>
                <a
                  href="/click-farm"
                  className="text-stone-500 hover:text-stone-800 text-sm font-medium underline underline-offset-4 decoration-stone-400/50 hover:decoration-stone-600 transition-all duration-200"
                >
                  Learn more &rarr;
                </a>
              </div>
            </div>

            {/* Right — screenshot */}
            <div className="hidden lg:block relative">
              <div className="relative -mr-12 rounded-l-2xl overflow-hidden shadow-2xl border-l border-t border-b border-stone-300/50">
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
          <MyProjects />
        </div>
      </section>
    </div>
  );
};

export default Home;
