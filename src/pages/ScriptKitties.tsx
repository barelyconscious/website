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

import '../styles/scriptKitties.css';

const ScriptKitties = () => {
    return (
        <div className="script-kitties">
            <div>
                <div className='header-container'>
                    <h1>Script Kitties</h1>
                    <h2>a turn-based action strategy creature collector</h2>
                </div>

                <p className="mb-6">
                    A creature collector with deep, turn-based action combat that combines elements of party-based strategy games and customizable abilities. Script Kitties is a mod-first game with hot-reloading to encourage learning and experimentation. Make your own abilities, creatures, items and more with a simple, intuitive API. Break the game and remake it in your own image.
                </p>

                <h4 className="text-xl font-semibold">Socials</h4>
                <div className="flex flex-row gap-8 justify-center my-4">
                    <a className="font-bold no-underline" href="https://youtube.com/@cassiius" target="_blank">
                        <img className="w-12 inline-block" src={youtube} alt="YouTube" /> YouTube
                    </a>
                    <a className="font-bold no-underline" href="https://bsky.app/profile/cassii.us" target="_blank">
                        <img className="w-12 inline-block" src={bluesky} alt="BlueSky" /> BlueSky
                    </a>
                    <a className="font-bold no-underline" href="https://www.twitch.tv/cassiius" target="_blank">
                        <img className="w-12 inline-block" src={twitch} alt="Twitch" /> Twitch
                    </a>
                    <a className="font-bold no-underline" href="https://www.tiktok.com/@_cassiius" target="_blank">
                        <img className="w-12 inline-block" src={tiktok} alt="TikTok" /> TikTok
                    </a>
                </div>

                <hr className="my-6" />
                <div className="header-separator"></div>
                <hr className="my-6" />

                <h5 className="text-lg font-semibold mt-6">When is it coming out?</h5>
                <p className="mb-6">Eventually</p>

                <p>Anyway, here's an old video and some newer screenshots:</p>

                <div className="mt-8">
                    <video width="100%" height="100%" controls>
                        <source src={trailer} type="video/mp4" />
                    </video>
                </div>
                <ImagePreview width="100%" image={img1} description="Screenshot" />
                <ImagePreview width="100%" image={img2} description="Screenshot" />
                <ImagePreview width="100%" image={img3} description="Screenshot" />
                <ImagePreview width="100%" image={img4} description="Screenshot" />
                <ImagePreview width="100%" image={img5} description="Screenshot" />
                <ImagePreview width="100%" image={img6} description="Screenshot" />
                <ImagePreview width="100%" image={img7} description="Screenshot" />
                <ImagePreview width="100%" image={img8} description="Screenshot" />
            </div>
        </div>
    );
};

export default ScriptKitties;
