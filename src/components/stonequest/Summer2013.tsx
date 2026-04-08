import ImagePreview from './ImagePreview'
import stonequestLastSwing from '../../res/worldsbetween/stonequest_lastswing.png'
import graveFlower from '../../res/worldsbetween/graveFlower.png'

const Summer2013 = () => (
    <>
        <div className="flex items-center gap-4 my-10">
            <div className="h-px flex-1 bg-border" />
            <h3 className="text-xl font-bold text-accent whitespace-nowrap">Summer 2013</h3>
            <div className="h-px flex-1 bg-border" />
        </div>

        <p className="text-text-secondary leading-relaxed">
            The UI depicted above was horrible to use as a player. It was tiny and hard to read at best and completely unintuitive at worst. I kept tweaking the UI more and more. I spent much of the summer sitting down and drawing.
        </p>

        <p className="text-text-secondary leading-relaxed">
            Without realizing it, I had begun to tie the development of StoneQuest to big moments in my personal life. I can still see where I was in my life through these screenshots. So it's no wonder to me that seeing this screenshot now makes me immeasurably sad.
        </p>

        <p className="text-text-secondary leading-relaxed">
            Here is the last screenshot I have to offer for StoneQuest as it existed for almost a year using Java's Canvas library:
        </p>

        <div className="my-8 rounded-xl overflow-hidden border border-border">
            <ImagePreview image={stonequestLastSwing} description="StoneQuest's final moments in Java Canvas" antialias width="100%" />
        </div>

        <p className="text-text-secondary leading-relaxed">
            It was at this point I realized the code base was doomed. The input handling was a complete mess and the UI elements were just as bad internally. Scene transitions were non-existent and making them would have necessitated a major rework.
        </p>

        <p className="text-text-secondary leading-relaxed font-medium text-text-primary">
            For all meaningful implications, this is where and when StoneQuest died.
        </p>

        <div className="text-center my-10 py-8">
            <img className="mx-auto mb-4 opacity-70" style={{ width: '96px' }} src={graveFlower} alt="Sleep your eternal dream." />
            <p className="text-text-muted italic text-sm">July 2012 &mdash; May 11, 2013</p>
        </div>
    </>
);

export default Summer2013;
