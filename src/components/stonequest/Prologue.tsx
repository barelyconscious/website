import earliestRoguelikeImage from '../../res/worldsbetween/earliestRoguelikeImage.png'
import ImagePreview from './ImagePreview';

const Prologue = () => (
    <>
        <p className="text-text-secondary leading-relaxed">I consider Worlds Between to be the beginning of the actualization of my desire to write and design my own game which started in December of 2011, over winter break. My life was about to move in an unpredictable direction when I returned to university a few weeks later, but until then all I wanted to do was expand my skills as a programmer.</p>

        <p className="text-text-secondary leading-relaxed">I had just learned about <a className="fancy-link" href="https://en.wikipedia.org/wiki/Roguelike">roguelikes</a> and completed a semester of advanced networking in C, so naturally I began looking into <a className="fancy-link" href="https://en.wikipedia.org/wiki/Ncurses">ncurses</a>. It was quickly abandoned because I wanted to spend more of the time I had writing the game before the break ended. I went with what I knew at the time: <a className="fancy-link" href="https://en.wikipedia.org/wiki/Swing_(Java)">Java Swing</a>. From this point on, I began a series of constant tweaking and perfecting.</p>

        <div className="my-8 rounded-xl overflow-hidden border border-border">
            <ImagePreview image={earliestRoguelikeImage} description="Earliest screenshot I have" width="100%" />
        </div>

        <p className="text-text-secondary leading-relaxed">The UI got the most obvious overhaul over the years, as you will see below, but internally I spent countless hours fighting Swing and eventually Canvas to do what I wanted it to do. I wrote a custom rasterizer for images and fonts; a custom event-handling loop that sat on top of Swing's for key and mouse input; and of course the game loop itself, object interactivity, and collision detection.</p>

        <p className="text-text-secondary leading-relaxed">But I realized as soon as I gave it a name why I was obsessing over it like I had been at that point: I had a story to tell and a promise to keep. This is still my very first game. And this will be the first story I ever tell.</p>

        <p className="text-text-secondary leading-relaxed">StoneQuest was to be set in the typical fantasy world, 1100s or 1200s maybe. The player would begin at the edge of a small town that sat in the shadow of a looming mountain nearby. In standard roguelike fashion, the player would descend into that mountain and find tougher and tougher enemies as she delved deeper.</p>

        <p className="text-text-secondary leading-relaxed">Well, I hadn't really planned that part out. It never found its form in the context of StoneQuest because StoneQuest wasn't the story I needed to tell. But I sat on it and years later, it found me through <strong className="text-white">Worlds Between Blood</strong>.</p>
    </>
);

export default Prologue;
