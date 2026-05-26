import cover from '../res/clickfarm/cover.png';
import earlyGame from '../res/clickfarm/early-game.png';
import midGame from '../res/clickfarm/mid-game.png';
import midGame2 from '../res/clickfarm/mid-game-2.png';
import lateGame from '../res/clickfarm/late-game.png';
import endgame from '../res/clickfarm/endgame.png';
import rebrand from '../res/clickfarm/rebrand.png';

const features = [
    {
        title: "Create Content",
        desc: "Tap to post Chirps, Selfies, Livestreams, Podcasts, and Viral Stunts. Each content type has its own art, upgrades, and feel. Start small, build an empire.",
    },
    {
        title: "Grow Your Platforms",
        desc: "Your followers spread across four platforms — Chirper, Picshift, Skroll, and PodPod — each with their own content preferences. What you create shapes where you grow.",
    },
    {
        title: "Upgrade Everything",
        desc: "Three upgrade tracks per content type: Power for output, Speed for faster posting, and Hire to automate. Stack them to watch the numbers climb.",
    },
    {
        title: "Rebrand & Go Again",
        desc: "Hit the ceiling? Rebrand to earn Clout — a permanent currency that carries across runs. Unlock new content types, platform headstarts, and massive multipliers.",
    },
];

const screenshots = [
    { img: earlyGame, caption: "Starting out — your first followers on Chirper" },
    { img: midGame, caption: "Growing — multiple content types, platforms filling up" },
    { img: midGame2, caption: "Midgame — viral stunts unlocked, engagement climbing" },
    { img: lateGame, caption: "Late game — all generators running, approaching rebrand" },
    { img: endgame, caption: "Endgame — billions of followers, maxed upgrades" },
    { img: rebrand, caption: "Approaching your first rebrand" },
];

const ClickFarm = () => {
    return (
        <div className="pb-16">
            {/* Hero */}
            <div className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-amber-900/20 via-transparent to-bg-primary" />
                <div className="max-w-5xl mx-auto px-6 pt-16 pb-20 relative z-10">
                    <div className="text-center mb-10">
                        <img
                            src={cover}
                            alt="Click Farm cover art"
                            className="w-full max-w-2xl mx-auto rounded-2xl border border-border shadow-2xl mb-8"
                            style={{ imageRendering: 'pixelated' }}
                        />
                        <p className="text-text-muted text-sm uppercase tracking-widest mb-2">Incremental / Clicker</p>
                        <h1 className="text-5xl font-black tracking-tight mb-3">Click Farm</h1>
                        <p className="text-xl text-text-secondary max-w-xl mx-auto">
                            Build a social media empire one post at a time. Grow followers, unlock platforms, upgrade everything, and rebrand for even more clout.
                        </p>
                    </div>
                </div>
            </div>

            <div className="max-w-5xl mx-auto px-6">
                {/* What is it */}
                <div className="bg-bg-card border border-border rounded-2xl p-8 mb-14 -mt-8 relative z-10">
                    <p className="text-text-secondary leading-relaxed text-lg m-0">
                        Click Farm is an incremental game about chasing internet fame. You start with nothing — just a cursor and a dream. Post chirps, take selfies, go live. Watch your follower count tick up across four social platforms that each favor different content. Hire automation. Unlock new content types. Upgrade your output until the numbers break. Then rebrand, keep your hard-earned clout, and do it all over again — faster.
                    </p>
                </div>

                {/* Features */}
                <div className="flex items-center gap-3 mb-8">
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent to-border" />
                    <h2 className="text-2xl font-bold tracking-tight">How It Works</h2>
                    <div className="h-px flex-1 bg-gradient-to-l from-transparent to-border" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-14">
                    {features.map((f, i) => (
                        <div key={i} className="bg-bg-card border border-border rounded-xl p-6 hover:border-accent/30 transition-colors duration-300">
                            <div className="flex items-start gap-3">
                                <span className="text-accent font-bold text-lg mt-0.5">0{i + 1}</span>
                                <div>
                                    <h4 className="text-base font-semibold text-white mb-2">{f.title}</h4>
                                    <p className="text-text-secondary text-sm leading-relaxed m-0">{f.desc}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* The Platforms */}
                <div className="flex items-center gap-3 mb-8">
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent to-border" />
                    <h2 className="text-2xl font-bold tracking-tight">The Platforms</h2>
                    <div className="h-px flex-1 bg-gradient-to-l from-transparent to-border" />
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-14">
                    {[
                        { name: "Chirper", desc: "Text & hot takes", color: "from-sky-500/20 to-transparent" },
                        { name: "Picshift", desc: "Photos & visuals", color: "from-pink-500/20 to-transparent" },
                        { name: "Skroll", desc: "Video & discovery", color: "from-purple-500/20 to-transparent" },
                        { name: "PodPod", desc: "Audio & podcasts", color: "from-amber-500/20 to-transparent" },
                    ].map((p) => (
                        <div key={p.name} className={`bg-gradient-to-b ${p.color} border border-border rounded-xl p-5 text-center`}>
                            <div className="font-bold text-white text-lg">{p.name}</div>
                            <div className="text-text-muted text-sm mt-1">{p.desc}</div>
                        </div>
                    ))}
                </div>

                {/* Prestige */}
                <div className="flex items-center gap-3 mb-8">
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent to-border" />
                    <h2 className="text-2xl font-bold tracking-tight">The Rebrand</h2>
                    <div className="h-px flex-1 bg-gradient-to-l from-transparent to-border" />
                </div>

                <div className="bg-bg-card border border-border rounded-2xl p-8 mb-14">
                    <p className="text-text-secondary leading-relaxed m-0">
                        Once you've reached the top, it's time to reinvent yourself. Rebrand wipes your followers and generators but awards <strong className="text-white">Clout</strong> — a permanent prestige currency. Spend Clout on engagement multipliers, platform headstarts, and powerful post-prestige generators like <em>AI Slop</em>, <em>Deepfakes</em>, and <em>Algorithmic Prophecy</em>. Each run gets faster. Each rebrand gets bigger. The numbers never stop.
                    </p>
                </div>

                {/* Screenshots */}
                <div className="flex items-center gap-3 mb-8">
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent to-border" />
                    <h2 className="text-2xl font-bold tracking-tight">Screenshots</h2>
                    <div className="h-px flex-1 bg-gradient-to-l from-transparent to-border" />
                </div>

                <div className="space-y-6 mb-14">
                    {screenshots.map((s, i) => (
                        <div key={i} className="rounded-xl overflow-hidden border border-border hover:border-accent/30 transition-colors duration-300">
                            <img src={s.img} alt={s.caption} className="w-full block" />
                            <div className="bg-bg-secondary px-4 py-2 text-text-muted text-sm">
                                {s.caption}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Status */}
                <div className="text-center py-8">
                    <div className="inline-block bg-amber-500/10 text-amber-400 text-sm font-medium px-4 py-1.5 rounded-full border border-amber-500/20">
                        Currently in Alpha &mdash; v0.6.2
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClickFarm;
