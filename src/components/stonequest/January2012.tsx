import rogelikeInterface from '../../res/worldsbetween/roguelikeInterface.png'
import rogueSplash from '../../res/worldsbetween/rogue_splash1.png'
import ImagePreview from './ImagePreview';

const January2012 = () => (
    <>
        <div className="flex items-center gap-4 my-10">
            <div className="h-px flex-1 bg-border" />
            <h3 className="text-xl font-bold text-accent whitespace-nowrap">January 2012</h3>
            <div className="h-px flex-1 bg-border" />
        </div>

        <p className="text-text-secondary leading-relaxed">
            January 2012 marked the beginning of the rest of my life. I had just transferred to the University of Texas at Austin and for the first time in my life, I was in a city where I knew no one. I turned inward at first and focused on the game I wanted to create.
        </p>

        <div className="my-8 rounded-xl overflow-hidden border border-border">
            <ImagePreview image={rogelikeInterface} description="Roguelike with an interface!" width="100%" />
        </div>

        <p className="text-text-secondary leading-relaxed">
            Now, I know it's nothing special and I'm not proud of it for what it is but rather what it represents. This started the project that would later become StoneQuest, which has become so integral to who I am.
        </p>

        <p className="text-text-secondary leading-relaxed">Anyway, here's the splash screen for no reason other than it makes me happy to see it after all these years:</p>

        <div className="my-8 rounded-xl overflow-hidden border border-border max-w-md mx-auto">
            <ImagePreview image={rogueSplash} description="Rogue splash screen v1" width="100%" />
        </div>
    </>
);

export default January2012;
