import { Link } from "react-router-dom";
import skGamejam from '../res/scriptkitties/Screenshot 2024-03-22 184347.png';
import skCombat2 from '../res/scriptkitties/Screenshot 2024-08-12 094439.png';
import rng from '../res/scriptkitties/connected areas.png';
import rngWorld from '../res/scriptkitties/Screenshot 2024-07-14 172338.png';
import dialog from '../res/scriptkitties/dialog.png';

const Blog20250719 = () => {
    return (
        <article className="max-w-3xl mx-auto px-6 py-12">
            {/* Header */}
            <div className="text-center mb-10">
                <div className="inline-block bg-accent/10 text-accent text-sm font-medium px-3 py-1 rounded-full mb-4">
                    Jul 19, 2025
                </div>
                <h1 className="text-3xl font-bold mb-2">A Brief Retrospective</h1>
                <div className="h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent mt-6" />
            </div>

            <p className="text-text-secondary leading-relaxed">
                What do people who have nothing to say write about? Lorem ipsum springs to mind, but that's hardly worth your time to read let alone my time to copy-paste. Let's start with introductions and see where that gets us:
            </p>

            <hr />

            <p className="text-text-secondary leading-relaxed">
                Among other things, I'm the sole developer of <Link className="fancy-link" to="/script-kitties">Script Kitties</Link>, the action strategy creature collector with deep turn-based combat.
                Script Kitties started in March 2024, when I decided to kick off a 2-day game jam with everyone I knew. Only 1 person showed up, but other people might have if I told them about it.
            </p>
            <p className="text-text-secondary leading-relaxed">This is how it turned out:</p>

            <div className="my-8 rounded-xl overflow-hidden border border-border">
                <img className="w-full block" src={skGamejam} alt="Game jam result" />
            </div>

            <p className="text-text-secondary leading-relaxed">
                Completing what I set out to do initially, I decided to turn it into something actually worth playing. Mostly, I was just enjoying programming again but after a few months, I started seeing a real game.
            </p>

            <div className="my-8 rounded-xl overflow-hidden border border-border">
                <img className="w-full block" src={skCombat2} alt="Combat screenshot" />
            </div>

            <p className="text-text-secondary leading-relaxed">
                The world was originally randomly generated across 7 biomes.
            </p>

            <div className="grid grid-cols-2 gap-3 my-8">
                <div className="rounded-xl overflow-hidden border border-border">
                    <img className="w-full block" src={rngWorld} alt="Random world" />
                </div>
                <div className="rounded-xl overflow-hidden border border-border">
                    <img className="w-full block" src={rng} alt="Connected areas" />
                </div>
            </div>

            <p className="text-text-secondary leading-relaxed">
                It turned out okay, and it was a lot of fun to implement, but I knew it would be difficult to get right and chose to pivot to a hand-crafted world that felt more connected.
            </p>

            <div className="my-8 rounded-xl overflow-hidden border border-border">
                <img className="w-full block" src={dialog} alt="Dialog system" />
            </div>

            <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent mt-12" />
        </article>
    );
};

export default Blog20250719;
