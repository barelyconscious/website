import ImagePreview from './ImagePreview'

import stonequestLibGdx from '../../res/worldsbetween/stonequest_libgdx.png'

const Remnants = () => (
    <>
        <div className="text-center my-6">
            <hr className="border-t border-gray-600" />
            <h4 className="text-2xl font-semibold my-3">2014</h4>
            <hr className="border-t border-gray-600" />
        </div>

        <p>
            Every good story has an epilogue. Sometimes bad ones do as well. I'll leave it up to you to decide to which category this one belongs. I reworked the UI artwork some more and designed an interface that I really liked and that was easy to parse visually. I explored other options for game engines. I tried out Slick2D and libGDX, both in Java. Here's a screenshot of the implementation of StoneQuest using libGDX with that UI:
        </p>

        <div className="text-center">
            <ImagePreview image={stonequestLibGdx} description="StoneQuest implemented in libGDX" antialias />
        </div>

        <hr className="my-8 border-t border-gray-600" />
    </>
);

export default Remnants;
