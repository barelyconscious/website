import '../styles/App.css';
import { Link } from "react-router-dom";
import skGamejam from '../res/scriptkitties/Screenshot 2024-03-22 184347.png';
import skCombat2 from '../res/scriptkitties/Screenshot 2024-08-12 094439.png';
import rng from '../res/scriptkitties/connected areas.png';
import rngWorld from '../res/scriptkitties/Screenshot 2024-07-14 172338.png';
import dialog from '../res/scriptkitties/dialog.png';

const Blog20250719 = () => {
    return (
        <div className="mx-10 lg:mx-40 mt-5">
            <div className="text-center mb-4">
                <hr className="border-t border-gray-600" />
                <h4 className="text-2xl font-semibold my-2">Jul 19, 2025</h4>
                <p className="italic">a brief retrospective</p>
                <hr className="border-t border-gray-600" />
            </div>

            <p>
                What do people who have nothing to say write about? Lorem ipsum springs to mind, but that's hardly worth your time to read let alone my time to copy-paste. Let's start with introductions and see where that gets us:
            </p>

            <hr className="my-4 border-t border-gray-600" />

            <p>
                Among other things, I'm the sole developer of <Link className="fancy-link" to="/script-kitties">Script Kitties</Link>, the action strategy creature collector with deep turn-based combat.
                Script Kitties started in March 2024, when I decided to kick off a 2-day game jam with everyone I knew. Only 1 person showed up, but other people might have if I told them about it.
            </p>
            <p className="my-4">
                This is how it turned out:
            </p>

            <img className='responsive-image' src={skGamejam} />

            <p className="my-4">
                Completing what I set out to do initially, I decided to turn it into something actually worth playing. Mostly, I was just enjoying programming again but after a few months, I started seeing a real game. I expanded existing systems, like rendering sprites flush with color, and added party-based combat to make things a bit more interesting.
            </p>

            <img className='responsive-image' src={skCombat2} />

            <p className="my-4">
                The world was originally randomly generated across 7 biomes.
            </p>

            <div className="flex flex-wrap">
                <img className="w-1/2 responsive-image" src={rngWorld} />
                <img className="w-1/2 responsive-image" src={rng} />
            </div>

            <p className="my-4">
                It turned out okay, and it was a lot of fun to implement, but I knew it would be difficult to get right and chose to pivot to a hand-crafted world that felt more connected.
            </p>

            <img className='responsive-image' src={dialog} />

            <hr className="mb-10 border-t border-gray-600" />
        </div>
    );
};

export default Blog20250719;
