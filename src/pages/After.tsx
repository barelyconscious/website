import { useState } from "react";
import "../styles/after.css";

import backgroundImage from "../res/afterBackground.png";
import trailer from "../res/trailer.mp4";
import afterScreenshot1 from "../res/afterScreenshot1.png";
import afterScreenshot2 from "../res/afterScreenshot2.png";
import afterScreenshot3 from "../res/afterScreenshot3.png";
import afterScreenshot4 from "../res/afterScreenshot4.png";
import afterScreenshot5 from "../res/afterScreenshot5.png";
import afterScreenshot6 from "../res/afterScreenshot6.png";
import afterScreenshot7 from "../res/afterScreenshot7.png";

const screenshots = [afterScreenshot1, afterScreenshot2, afterScreenshot3, afterScreenshot4, afterScreenshot5, afterScreenshot6, afterScreenshot7];

const After = () => {
  const [carouselIndex, setCarouselIndex] = useState(0);

  const prev = () => setCarouselIndex((i) => (i === 0 ? screenshots.length - 1 : i - 1));
  const next = () => setCarouselIndex((i) => (i === screenshots.length - 1 ? 0 : i + 1));

  return (
    <div className="after">
      <div className="banner" style={{ backgroundImage: `url(${backgroundImage})` }}>
        <div className="crt overlay"></div>
        <div className="title-container">
          <h1>
            $ after<span className="blinking-cursor">&#x2588;</span>
          </h1>
          <div className="subtitle"># a UT gamma project</div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4">
        <h1 className="section-header">About</h1>
        <p>
          After takes place in the ruins of a city in the near future. All life has disappeared except for a man who has
          forgotten everything. He must learn what happened to the city, what happened to the entire planet and what
          happened to its inhabitants before he can learn what happened to himself.
        </p>
        <p>
          It is a puzzle platformer, focused on telling the story of the traveler and the city in which he finds himself
          through the environment and puzzles. After features three main levels, with a few more transitory levels, with
          unique puzzle elements in each. As a Unity game, there are builds available for Mac, PC, and Linux as well as a
          mobile application available for Android devices (via an .apk file).
        </p>

        {/* Carousel */}
        <div className="relative text-center my-6">
          <img src={screenshots[carouselIndex]} alt={`Screenshot ${carouselIndex + 1}`} className="max-w-full mx-auto" />
          <div className="flex justify-center gap-4 mt-3">
            <button onClick={prev} className="bg-bg-secondary text-text-primary px-4 py-1 rounded hover:bg-accent cursor-pointer">&larr;</button>
            <span className="self-center text-sm">{carouselIndex + 1} / {screenshots.length}</span>
            <button onClick={next} className="bg-bg-secondary text-text-primary px-4 py-1 rounded hover:bg-accent cursor-pointer">&rarr;</button>
          </div>
        </div>

        <h3>Credits</h3>
        <ul className="list-disc ml-6">
          <li>John Dodson (Art director)</li>
          <li>Rob Luckfield (Sound engineer)</li>
          <li>Tyler Pixley (Programmer)</li>
          <li>Matt Schwartz (Programmer)</li>
          <li>Taylor Womack (Animator and Scrum master)</li>
        </ul>

        <div className="mt-8">
          <video width="100%" height="100%" controls>
            <source src={trailer} type="video/mp4" />
          </video>
        </div>
        <em>Trailer directed by Taylor Womack with sound by Rob Luckfield</em>

        <h1 className="section-header">My Role</h1>
        <div>
          I worked with four other students through UT's multidisciplinary GAMMA game design program.
          The course was designed to be student-driven, allowing teams to design their own games with guidance from the instructors.
          My role in After was as one of the two programmers and lead programmer for mobile direction for the game. More specifically, my work entailed:
          <div className="space-y-3 mt-4">
            <div className="bg-bg-primary p-4 rounded shadow">
              <strong>Designing the puzzle game loop</strong>
              <p>I programmed a set of Unity prefabs that allowed new puzzles to be set up quickly by defining how each individual piece was involved with other parts of the level.</p>
            </div>
            <div className="bg-bg-primary p-4 rounded shadow">
              <strong>Designing a simple sound manager</strong>
              <p>I worked with our sound engineer, Rob, to develop a simple interface for adding and tweaking sounds in the game.</p>
            </div>
            <div className="bg-bg-primary p-4 rounded shadow">
              <strong>Designing and implemented the mobile interface</strong>
              <p>
                The instructors gave additional credit for teams who implemented their game for mobile platforms as well.
                Ours was the only team to have done this. I developed the mobile interface, which was simply drag-to-move
                and touch-to-jump.
              </p>
            </div>
            <div className="bg-bg-primary p-4 rounded shadow">
              <strong>Helped with the artwork</strong>
              <p>
                I drew placeholder art and ended up finishing some first-pass artwork by our artist. The title scene
                artwork (also featured as the banner at the top of this page) was drawn by me.
              </p>
            </div>
          </div>
        </div>

        <h1 className="section-header">Play</h1>
        <p>
          While the game is hosted on the University of Texas' game development page,{" "}
          <a className="fancy-link" href="http://www.cs.utexas.edu/~gamedev/fall-2014/Transient-Games/Release.html">
            here
          </a>
          , some browsers do not support Unity's web player.
        </p>

        <h1 className="section-header">Source Code</h1>
        <p>
          The full source code, including the Unity project and assets, is available for review{" "}
          <a className="fancy-link" href="https://github.com/mattschwartz/after">
            here
          </a>
          . Go nuts.
        </p>
      </div>
    </div>
  );
};

export default After;
