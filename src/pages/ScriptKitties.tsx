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

import '../styles/scriptKitties.css';

const ScriptKitties = () => {
    return (
        <div className="script-kitties">
            <div>
                <div className='header-container'>
                    <h1>
                        Script Kitties
                    </h1>
                    <div className="header-separator"></div>
                    <h2>
                        a turn-based action strategy creature collector
                    </h2>
                </div>
                <p>
                    A creature collector with deep, turn-based action combat that combines elements of party-based strategy games and customizable abilities. Script Kitties is a mod-first game with hot-reloading to encourage learning and experimentation. Make your own abilities, creatures, items and more with a simple, intuitive API. Break the game and remake it in your own image.
                </p>

                <p>Anyway, here's an old video and some newer screenshots:</p>

                <div className="mt-5">
                    <video width="100%" height="100%" controls>
                        <source src={trailer} type="video/mp4" />
                    </video>
                </div>
                <ImagePreview width="50%" image={img1} description="Screenshot" />
                <ImagePreview width="50%" image={img2} description="Screenshot" />
                <ImagePreview width="50%" image={img3} description="Screenshot" />
                <ImagePreview width="50%" image={img4} description="Screenshot" />
                <ImagePreview width="50%" image={img5} description="Screenshot" />
                <ImagePreview width="50%" image={img6} description="Screenshot" />
                <ImagePreview width="50%" image={img7} description="Screenshot" />
                <ImagePreview width="50%" image={img8} description="Screenshot" />
            </div>
        </div>
    );
};

export default ScriptKitties;
