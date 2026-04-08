import stonequest1 from '../../res/worldsbetween/stonequest_july_2012.png'
import ImagePreview from './ImagePreview';

const July2012 = () => (
    <>
        <div className="flex items-center gap-4 my-10">
            <div className="h-px flex-1 bg-border" />
            <h3 className="text-xl font-bold text-accent whitespace-nowrap">July 2012</h3>
            <div className="h-px flex-1 bg-border" />
        </div>

        <p className="text-text-secondary leading-relaxed">
            With my first semester at UT behind me, I went back to my family for summer vacation and picked up the game again. I threw away the first iteration and after about 100 hours, I had a fully functional game engine upon which I could write the rest of the game. The beauty of roguelikes is that they can be as simple or complex as you want. They're games that you can grow with as a developer.
        </p>

        <div className="my-8 rounded-xl overflow-hidden border border-border">
            <ImagePreview image={stonequest1} description="Roguelike2 progress, July 2012" width="100%" />
        </div>
    </>
);

export default July2012;
