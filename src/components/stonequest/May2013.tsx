import ImagePreview from './ImagePreview';
import stonequest2d from '../../res/worldsbetween/stonequest_2dgraphics_mar_2013.png'
import stonequestHella from '../../res/worldsbetween/stonequest_may_2013.png'

const May2013 = () => (
    <>
        <div className="flex items-center gap-4 my-10">
            <div className="h-px flex-1 bg-border" />
            <h3 className="text-xl font-bold text-accent whitespace-nowrap">May 2013</h3>
            <div className="h-px flex-1 bg-border" />
        </div>

        <p className="text-text-secondary leading-relaxed">
            From July 2012 until May 2013, I dedicated several hundred hours working on the game. It was sometime between January and March where I plucked the name StoneQuest out of the air, which was intended to be a working title. And once I gave it a name, it became very real to me and for the first time, I spent more time making a game than I did playing them.
        </p>

        <div className="my-8 rounded-xl overflow-hidden border border-border">
            <ImagePreview image={stonequest2d} description="StoneQuest appears" antialias width="100%" />
        </div>

        <p className="text-text-secondary leading-relaxed">
            It's painful to look at now and I would have said that then, too. The next things I added were: a minimap; shadow-casting; monsters to fight; interactable objects like chests; loot you could pick up, drop and equip; mouse support; double-buffered rendering to fix the performance issues; a sound engine; and, of course, a revamped UI. This is the most complete StoneQuest had ever been and, regrettably, ever will be:
        </p>

        <div className="my-8 rounded-xl overflow-hidden border border-border">
            <ImagePreview image={stonequestHella} description="StoneQuest's most complete form" antialias width="100%" />
        </div>
    </>
);

export default May2013;
