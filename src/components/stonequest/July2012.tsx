import stonequest1 from '../../res/worldsbetween/stonequest_july_2012.png'
import ImagePreview from './ImagePreview';
import EntryHeading from './EntryHeading';

export default () => (
    <>
        <EntryHeading>July 2012</EntryHeading>

        <p>
            With my first semester at UT behind me, I went back to my family for summer vacation and picked up the game again. I threw away the first iteration and after about 100 hours, I had a fully functional game engine upon which I could write the rest of the game. The beauty of roguelikes is that they can be as simple or complex as you want. They're games that you can grow with as a developer.
        </p>

        <ImagePreview image={stonequest1} description="Roguelike2 progress, July 2012" />
    </>
)
