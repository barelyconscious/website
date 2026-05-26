import ImagePreview from './ImagePreview'

import stonequestLastSwing from '../../res/worldsbetween/stonequest_lastswing.png'
import graveFlower from '../../res/worldsbetween/graveFlower.png'

const Summer2013 = () => (
    <>
        <div className="text-center my-6">
            <hr className="border-t border-gray-600" />
            <h4 className="text-2xl font-semibold my-3">Summer 2013</h4>
            <hr className="border-t border-gray-600" />
        </div>

        <p>
            The UI depicted above was horrible to use as a player. It was tiny and hard to read at best and completely unintuitive at worst. I kept tweaking the UI more and more. I spent much of the summer sitting down and drawing. I increased the tile size since it was too small before. I upgraded the interface with a focus on readability, familiarity, and usability. I wrote transient UI elements like tips and implemented much more interactive interface elements.
        </p>

        <p>
            Without realizing it, I had begun to tie the development of StoneQuest to big moments in my personal life. I can still see where I was in my life through these screenshots. So it's no wonder to me that seeing this screenshot now makes me immeasurably sad.
        </p>

        <p>
            Here is the last screenshot I have to offer for StoneQuest as it existed for almost a year using Java's Canvas library:
        </p>

        <div className="text-center mb-6">
            <ImagePreview image={stonequestLastSwing} description="StoneQuest's final moments in Java Canvas" antialias />
        </div>

        <p>
            It was at this point I realized the code base was doomed. The input handling was a complete mess and the UI elements were just as bad internally. Scene transitions were non-existent and making them would have necessitated a major rework. I spent a few weeks trying to improve it and left it in an irrevocable state. I did not use any sort of source control before this point and have not bothered to salvage it. I don't have any way to know an exact date, but the last image I have is dated May 11, 2013.
        </p>

        <p>
            For all meaningful implications, this is where and when StoneQuest died.
        </p>

        <div className="text-center">
            <img className="inline-preview" style={{ width: '128px' }} src={graveFlower} alt="Sleep your eternal dream." />
            <p>July 2012 - May 11, 2013.</p>
        </div>
    </>
);

export default Summer2013;
