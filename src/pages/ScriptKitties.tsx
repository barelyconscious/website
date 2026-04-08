import ImagePreview from '../components/stonequest/ImagePreview';
import img1 from '../res/scriptkitties/bag.png';
import img2 from '../res/scriptkitties/profile.png';
import img3 from '../res/scriptkitties/journal.png';
import img4 from '../res/scriptkitties/kennel.png';
import img5 from '../res/scriptkitties/battle.png';
import img6 from '../res/scriptkitties/shop.png';
import img7 from '../res/scriptkitties/dialog.png';
import img8 from '../res/scriptkitties/map.png';
import trailer from '../res/scriptkitties/ScriptKitties 2025-01-13 19-44-08.mp4';
import twitch from '../res/social_twitch.png';
import bluesky from '../res/social_bluesky.png';
import youtube from '../res/social_youtube.png';
import tiktok from '../res/social_tiktok.png';

const socials = [
    { img: youtube, label: "YouTube", href: "https://youtube.com/@cassiius" },
    { img: bluesky, label: "BlueSky", href: "https://bsky.app/profile/cassii.us" },
    { img: twitch, label: "Twitch", href: "https://www.twitch.tv/cassiius" },
    { img: tiktok, label: "TikTok", href: "https://www.tiktok.com/@_cassiius" },
];

const screenshots = [img1, img2, img3, img4, img5, img6, img7, img8];

const ScriptKitties = () => {
    return (
        <div className="max-w-5xl mx-auto px-6 py-12">
            {/* Hero */}
            <div className="text-center mb-12">
                <h1 className="text-5xl font-black tracking-tight mb-2" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                    Script Kitties
                </h1>
                <p className="text-text-muted italic text-lg">a turn-based action strategy creature collector</p>
            </div>

            {/* Description */}
            <div className="bg-bg-card border border-border rounded-2xl p-8 mb-10">
                <p className="text-text-secondary leading-relaxed text-lg m-0">
                    A creature collector with deep, turn-based action combat that combines elements of party-based strategy games and customizable abilities. Script Kitties is a mod-first game with hot-reloading to encourage learning and experimentation. Make your own abilities, creatures, items and more with a simple, intuitive API. Break the game and remake it in your own image.
                </p>
            </div>

            {/* Socials */}
            <div className="flex flex-wrap justify-center gap-6 mb-12">
                {socials.map((s) => (
                    <a
                        key={s.label}
                        className="flex items-center gap-2 px-5 py-3 bg-bg-secondary border border-border rounded-xl hover:border-accent hover:shadow-[0_0_15px_rgba(16,193,149,0.15)] transition-all duration-300 text-text-primary font-medium"
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <img className="w-6 h-6" src={s.img} alt={s.label} />
                        {s.label}
                    </a>
                ))}
            </div>

            {/* Gradient separator */}
            <div className="h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent mb-12" />

            {/* FAQ */}
            <div className="text-center mb-12">
                <h3 className="text-xl font-semibold mb-2">When is it coming out?</h3>
                <p className="text-text-muted text-lg italic">Eventually</p>
            </div>

            <p className="text-text-secondary text-center mb-8">Anyway, here's an old video and some newer screenshots:</p>

            {/* Trailer */}
            <div className="rounded-2xl overflow-hidden border border-border shadow-2xl mb-12">
                <video width="100%" controls>
                    <source src={trailer} type="video/mp4" />
                </video>
            </div>

            {/* Screenshots grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {screenshots.map((img, i) => (
                    <div key={i} className="rounded-xl overflow-hidden border border-border hover:border-accent/50 transition-colors duration-300">
                        <ImagePreview width="100%" image={img} description={`Screenshot ${i + 1}`} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ScriptKitties;
