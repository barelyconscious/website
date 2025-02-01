import ImagePreview from '../components/stonequest/ImagePreview';
import img1 from '../res/scriptkitties/Screenshot 2024-08-18 110741.png';
import img2 from '../res/scriptkitties/Screenshot 2025-01-12 064844.png';
import img3 from '../res/scriptkitties/connected areas.png';
import img4 from '../res/scriptkitties/if it were the middle.png';
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
                        the roguelite creature collector you've been waiting for
                    </h2>
                </div>
                <p>
                    Engaging combat system, roguelite elements, creature collectin'. Plus, you can break the game with powerful modding capabilities that are easy and intuitive to use.
                </p>

                <div className="mt-5">
                    <video width="100%" height="100%" controls>
                        <source src={trailer} type="video/mp4" />
                    </video>
                </div>
                <ImagePreview width="50%" image={img1} description="Screenshot" />
                <ImagePreview width="50%" image={img2} description="Screenshot" />
                <ImagePreview width="50%" image={img3} description="Screenshot" />
                <ImagePreview width="50%" image={img4} description="Screenshot" />
            </div>
        </div>
    );
};

export default ScriptKitties;
