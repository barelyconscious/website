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

const credits = [
  { name: "John Dodson", role: "Art director" },
  { name: "Rob Luckfield", role: "Sound engineer" },
  { name: "Tyler Pixley", role: "Programmer" },
  { name: "Matt Schwartz", role: "Programmer" },
  { name: "Taylor Womack", role: "Animator and Scrum master" },
];

const contributions = [
  {
    title: "Designing the puzzle game loop",
    desc: "I programmed a set of Unity prefabs that allowed new puzzles to be set up quickly by defining how each individual piece was involved with other parts of the level.",
  },
  {
    title: "Designing a simple sound manager",
    desc: "I worked with our sound engineer, Rob, to develop a simple interface for adding and tweaking sounds in the game.",
  },
  {
    title: "Designing and implementing the mobile interface",
    desc: "The instructors gave additional credit for teams who implemented their game for mobile platforms as well. Ours was the only team to have done this. I developed the mobile interface, which was simply drag-to-move and touch-to-jump.",
  },
  {
    title: "Helped with the artwork",
    desc: "I drew placeholder art and ended up finishing some first-pass artwork by our artist. The title scene artwork (also featured as the banner at the top of this page) was drawn by me.",
  },
];

const After = () => {
  const [carouselIndex, setCarouselIndex] = useState(0);
  const prev = () => setCarouselIndex((i) => (i === 0 ? screenshots.length - 1 : i - 1));
  const next = () => setCarouselIndex((i) => (i === screenshots.length - 1 ? 0 : i + 1));

  return (
    <div className="pb-16">
      {/* Banner */}
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
      </div>

      <div className="max-w-5xl mx-auto px-6 mt-12">
        {/* About */}
        <div className="flex items-center gap-3 mb-6">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-border" />
          <h2 className="text-2xl font-bold">About</h2>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-border" />
        </div>

        <div className="bg-bg-card border border-border rounded-2xl p-8 mb-10">
          <p className="text-text-secondary leading-relaxed">
            After takes place in the ruins of a city in the near future. All life has disappeared except for a man who has
            forgotten everything. He must learn what happened to the city, what happened to the entire planet and what
            happened to its inhabitants before he can learn what happened to himself.
          </p>
          <p className="text-text-secondary leading-relaxed m-0">
            It is a puzzle platformer, focused on telling the story of the traveler and the city in which he finds himself
            through the environment and puzzles. After features three main levels, with a few more transitory levels, with
            unique puzzle elements in each.
          </p>
        </div>

        {/* Carousel */}
        <div className="relative rounded-2xl overflow-hidden border border-border bg-bg-secondary mb-10">
          <img
            src={screenshots[carouselIndex]}
            alt={`Screenshot ${carouselIndex + 1}`}
            className="w-full block"
          />
          <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-4 py-3 bg-gradient-to-t from-black/80 to-transparent">
            <button onClick={prev} className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition cursor-pointer flex items-center justify-center">&larr;</button>
            <span className="text-white/70 text-sm font-medium">{carouselIndex + 1} / {screenshots.length}</span>
            <button onClick={next} className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition cursor-pointer flex items-center justify-center">&rarr;</button>
          </div>
        </div>

        {/* Credits */}
        <div className="flex items-center gap-3 mb-6">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-border" />
          <h2 className="text-2xl font-bold">Credits</h2>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-border" />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-10">
          {credits.map((c) => (
            <div key={c.name} className="bg-bg-card border border-border rounded-xl p-4 text-center">
              <div className="font-semibold text-white text-sm">{c.name}</div>
              <div className="text-text-muted text-xs mt-1">{c.role}</div>
            </div>
          ))}
        </div>

        {/* Trailer */}
        <div className="rounded-2xl overflow-hidden border border-border shadow-2xl mb-2">
          <video width="100%" controls>
            <source src={trailer} type="video/mp4" />
          </video>
        </div>
        <p className="text-text-muted text-sm italic text-center mb-10">Trailer directed by Taylor Womack with sound by Rob Luckfield</p>

        {/* My Role */}
        <div className="flex items-center gap-3 mb-6">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-border" />
          <h2 className="text-2xl font-bold">My Role</h2>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-border" />
        </div>

        <p className="text-text-secondary leading-relaxed mb-6">
          I worked with four other students through UT's multidisciplinary GAMMA game design program.
          The course was designed to be student-driven, allowing teams to design their own games with guidance from the instructors.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
          {contributions.map((c) => (
            <div key={c.title} className="bg-bg-card border border-border rounded-xl p-6 hover:border-accent/30 transition-colors duration-300">
              <h4 className="text-base font-semibold text-white mb-2">{c.title}</h4>
              <p className="text-text-secondary text-sm leading-relaxed m-0">{c.desc}</p>
            </div>
          ))}
        </div>

        {/* Links */}
        <div className="flex flex-col sm:flex-row gap-4">
          <a
            className="flex-1 text-center border border-border hover:border-accent text-text-secondary hover:text-accent py-3 px-6 rounded-xl transition-all duration-200 font-medium"
            href="http://www.cs.utexas.edu/~gamedev/fall-2014/Transient-Games/Release.html"
            target="_blank"
          >
            Play in Browser
          </a>
          <a
            className="flex-1 text-center border border-border hover:border-accent text-text-secondary hover:text-accent py-3 px-6 rounded-xl transition-all duration-200 font-medium"
            href="https://github.com/mattschwartz/after"
            target="_blank"
          >
            View Source Code &rarr;
          </a>
        </div>
      </div>
    </div>
  );
};

export default After;
