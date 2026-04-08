import ImagePreview from './ImagePreview'
import stonequestLibGdx from '../../res/worldsbetween/stonequest_libgdx.png'

const Remnants = () => (
    <>
        <div className="flex items-center gap-4 my-10">
            <div className="h-px flex-1 bg-border" />
            <h3 className="text-xl font-bold text-accent whitespace-nowrap">2014</h3>
            <div className="h-px flex-1 bg-border" />
        </div>

        <p className="text-text-secondary leading-relaxed">
            Every good story has an epilogue. Sometimes bad ones do as well. I'll leave it up to you to decide to which category this one belongs. I reworked the UI artwork some more and designed an interface that I really liked and that was easy to parse visually. I explored other options for game engines. I tried out Slick2D and libGDX, both in Java.
        </p>

        <div className="my-8 rounded-xl overflow-hidden border border-border">
            <ImagePreview image={stonequestLibGdx} description="StoneQuest implemented in libGDX" antialias width="100%" />
        </div>

        <div className="text-center my-10">
            <span className="text-text-muted text-2xl">&sect;</span>
        </div>
    </>
);

export default Remnants;
