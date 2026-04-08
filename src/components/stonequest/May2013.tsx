import ImagePreview from './ImagePreview';

import stonequest2d from '../../res/worldsbetween/stonequest_2dgraphics_mar_2013.png'
import stonequestHella from '../../res/worldsbetween/stonequest_may_2013.png'

const May2013 = () => (
    <>
        <div className="text-center my-6">
            <hr className="border-t border-gray-600" />
            <h4 className="text-2xl font-semibold my-3">May 2013</h4>
            <hr className="border-t border-gray-600" />
        </div>

        <p>
            From July 2012 until May 2013, I dedicated several hundred hours working on the game. It was sometime between January and March where I plucked the name StoneQuest out of the air, which was intended to be a working title. And once I gave it a name, it became very real to me and for the first time, I spent more time making a game  than I did playing them. And the game was iterated on constantly. Over spring break, I went home again and implemented 2D graphics. It was surprisingly easy, but the performance was trash. Below is the first screenshot I have of these (terribly over-saturated) graphics:
        </p>

        <div className="text-center mb-6">
            <ImagePreview image={stonequest2d} description="StoneQuest appears" antialias />
        </div>

        <p>
            It's painful to look at now and I would have said that then, too. The next things I added were: a minimap; shadow-casting; monsters to fight; interactable objects like chests; loot you could pick up, drop and equip; mouse support; double-buffered rendering to fix the performance issues; a sound engine; and, of course, a revamped UI. Features came and went so quickly and I felt truly inspired passion. This is the most complete StoneQuest had ever been and, regrettably, ever will be:
        </p>

        <div className="text-center mb-6">
            <ImagePreview image={stonequestHella} description="StoneQuest's most complete form" antialias />
        </div>
    </>
);

export default May2013;
