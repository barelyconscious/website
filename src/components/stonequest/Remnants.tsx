import ImagePreview from './ImagePreview'
import EntryHeading from './EntryHeading'

import stonequestLibGdx from '../../res/worldsbetween/stonequest_libgdx.png'

export default () => (
    <>
        <EntryHeading>2014</EntryHeading>

        <p>
            Every good story has an epilogue. Sometimes bad ones do as well. I'll leave it up to you to decide to which category this one belongs. I reworked the UI artwork some more and designed an interface that I really liked and that was easy to parse visually. I explored other options for game engines. I tried out <a className="fancy-link" href="http://slick.ninjacave.com/">Slick2D</a> and <a className="fancy-link" href="https://libgdx.badlogicgames.com/">libGDX</a>, both in Java. Here's a screenshot of the implementation of StoneQuest using libGDX with that UI:
        </p>

        <ImagePreview image={stonequestLibGdx} description="StoneQuest implemented in libGDX" antialias />

        <hr className="rest-onward" />
    </>
)
