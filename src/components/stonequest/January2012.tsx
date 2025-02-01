import rogelikeInterface from '../../res/worldsbetween/roguelikeInterface.png'
import rogueSplash from '../../res/worldsbetween/rogue_splash1.png'
import ImagePreview from './ImagePreview';
import EntryHeading from './EntryHeading';

export default () => (
    <>
        <EntryHeading>January 2012</EntryHeading>

        <p>
            January 2012 marked the beginning of the rest of my life. I had just transferred to the University of Texas at Austin and for the first time in my life, I was in a city where I knew no one. I turned inward at first and focused on the game I wanted to create. I doodled in notebooks, pseudocoded algorithms to generate random levels, and planned the basic game design. Of course, none of that ever made it into the game, but I did create something I'm still proud of:
        </p>

        <ImagePreview image={rogelikeInterface} description="Roguelike with an interface!" />

        <p>
            Now, I know it's nothing special and I'm not proud of it for what it is but rather what it represents. This started the project that would later become StoneQuest, which has become so integral to who I am. Looking back on old screenshots is akin to flipping through old photographs in a family album for me since each brings me right back to where I was in life. It shaped me as a developer and a creator. I was incredibly excited by this. I was learning new things and this medium allowed me to express creativity and freedom in a way I had never done before.
        </p>

        <p>Anyway, here's the splash screen for no reason other than it makes me happy to see it after all these years:</p>

        <ImagePreview width="50%" image={rogueSplash} description="Rogue splash screen v1" />
    </>
)
