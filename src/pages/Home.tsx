import MyProjects from "../components/Home/MyProjects";
import coverImg from "../res/clickfarm/cover.png";

const Home = () => {
  return (
    <div>
      {/* Featured */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-amber-900/10 via-transparent to-bg-primary pointer-events-none" />
        <div className="max-w-6xl mx-auto px-6 pt-14 pb-10 relative z-10">
          <p className="text-text-muted text-xs uppercase tracking-widest mb-6 text-center">Featured</p>

          <a href="/click-farm" className="group block">
            <div className="relative rounded-2xl overflow-hidden border border-border hover:border-accent/40 transition-all duration-500 shadow-2xl">
              <img
                src={coverImg}
                alt="Click Farm"
                className="w-full block"
                style={{ imageRendering: "pixelated" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <div className="flex items-end justify-between">
                  <div>
                    <div className="inline-block bg-amber-500/20 text-amber-400 text-xs font-semibold px-2.5 py-1 rounded-full border border-amber-500/30 mb-3">
                      Alpha &mdash; v0.6.2
                    </div>
                    <h2 className="text-3xl font-black text-white mb-1 tracking-tight">Click Farm</h2>
                    <p className="text-white/70 text-sm max-w-md m-0">
                      Build a social media empire one post at a time. Grow followers, unlock platforms, and rebrand for clout.
                    </p>
                  </div>
                  <span className="hidden sm:flex items-center gap-1 text-sm font-medium text-white/50 group-hover:text-accent transition-colors">
                    Learn more &rarr;
                  </span>
                </div>
              </div>
            </div>
          </a>
        </div>
      </section>

      {/* All Games */}
      <section className="pb-16">
        <div className="max-w-6xl mx-auto px-6">
          <MyProjects />
        </div>
      </section>
    </div>
  );
};

export default Home;
