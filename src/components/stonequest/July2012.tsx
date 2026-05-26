import stonequest1 from '../../res/worldsbetween/stonequest_july_2012.png'
import ImagePreview from './ImagePreview';

const July2012 = () => (
    <>
        <div className="text-center my-6">
            <hr className="border-t border-gray-600" />
            <h4 className="text-2xl font-semibold my-3">July 2012</h4>
            <hr className="border-t border-gray-600" />
        </div>

        <p>
            With my first semester at UT behind me, I went back to my family for summer vacation and picked up the game again. I threw away the first iteration and after about 100 hours, I had a fully functional game engine upon which I could write the rest of the game. The beauty of roguelikes is that they can be as simple or complex as you want. They're games that you can grow with as a developer.
        </p>

        <div className="text-center mb-6">
            <ImagePreview image={stonequest1} description="Roguelike2 progress, July 2012" />
        </div>
    </>
);

export default July2012;
