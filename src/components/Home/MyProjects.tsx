import { useState, useRef, useEffect, useCallback } from "react";

import scriptKittiesPreview from '../../res/scriptkitties/battle.png';
import stonequestPreview from "../../res/stonequestPreview.png";
import afterPreview from "../../res/afterPreview.png";
import clickFarmPreview from "../../res/clickfarm/endgame.png";

const tabs = [
  { key: "script-kitties", label: "Script Kitties" },
  { key: "click-farm", label: "Click Farm" },
  { key: "stonequest", label: "StoneQuest" },
  { key: "after", label: "After" },
];

const WorldsBetweenTabPane = () => (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-6">
    <div className="flex flex-col justify-center">
      <p className="text-text-secondary leading-relaxed">
        <strong className="text-white">StoneQuest</strong> started out as a very basic 2D roguelike written in Java in 2012 using the
        Swing library. Over time, it has been rewritten and had all of its features reworked several times over.
      </p>
      <a
        className="mt-4 inline-flex items-center justify-center bg-accent hover:bg-accent-hover text-bg-primary font-semibold py-3 px-6 rounded-lg transition-all duration-200 hover:shadow-[0_0_20px_rgba(16,193,149,0.3)]"
        href="/stonequest"
      >
        Read the Story &rarr;
      </a>
    </div>
    <div className="relative group">
      <div className="absolute -inset-1 bg-gradient-to-r from-accent/20 to-accent/0 rounded-xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <img className="relative w-full rounded-xl border border-border shadow-2xl" src={stonequestPreview} alt="StoneQuest preview" />
    </div>
  </div>
);

const ScriptKittiesTabPane = () => (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-6">
    <div className="flex flex-col justify-center">
      <p className="text-text-secondary leading-relaxed">
        <strong className="text-white">Script Kitties</strong> is a turn-based action strategy creature collector with deep modding capabilities.
        Make your own abilities, creatures, items and more with a simple, intuitive API. Break the game and remake it in your own image.
      </p>
      <a
        className="mt-4 inline-flex items-center justify-center bg-accent hover:bg-accent-hover text-bg-primary font-semibold py-3 px-6 rounded-lg transition-all duration-200 hover:shadow-[0_0_20px_rgba(16,193,149,0.3)]"
        href="/script-kitties"
      >
        Learn More &rarr;
      </a>
    </div>
    <div className="relative group">
      <div className="absolute -inset-1 bg-gradient-to-r from-accent/20 to-accent/0 rounded-xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <img className="relative w-full rounded-xl border border-border shadow-2xl" src={scriptKittiesPreview} alt="Script Kitties preview" />
    </div>
  </div>
);

const AfterTabPane = () => (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-6">
    <div className="flex flex-col justify-center">
      <p className="text-text-secondary leading-relaxed">
        <strong className="text-white">After</strong> is a 2D puzzle platformer, created in collaboration with four other students at UT through the Game
        Development Program.
      </p>
      <p className="text-text-secondary leading-relaxed">
        The player plays as the apparent lone survivor of a post-apocalyptic world whose self-found purpose is to scour
        the city for clues to his identity and purpose.
      </p>
      <div className="flex gap-3 mt-4">
        <a
          className="flex-1 inline-flex items-center justify-center bg-accent hover:bg-accent-hover text-bg-primary font-semibold py-3 px-6 rounded-lg transition-all duration-200 hover:shadow-[0_0_20px_rgba(16,193,149,0.3)]"
          href="/after"
        >
          Learn More &rarr;
        </a>
        <a
          className="flex-1 inline-flex items-center justify-center border border-border hover:border-accent text-text-secondary hover:text-accent font-semibold py-3 px-6 rounded-lg transition-all duration-200"
          href="https://www.github.com/mattschwartz/after"
          target="_blank"
        >
          Source Code
        </a>
      </div>
    </div>
    <div className="relative group">
      <div className="absolute -inset-1 bg-gradient-to-r from-accent/20 to-accent/0 rounded-xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <img className="relative w-full rounded-xl border border-border shadow-2xl" src={afterPreview} alt="After preview" />
    </div>
  </div>
);

const ClickFarmTabPane = () => (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-6">
    <div className="flex flex-col justify-center">
      <p className="text-text-secondary leading-relaxed">
        <strong className="text-white">Click Farm</strong> is an incremental game about building a social media empire.
        Post content, grow followers across four platforms, upgrade everything, and rebrand for even more clout.
      </p>
      <a
        className="mt-4 inline-flex items-center justify-center bg-accent hover:bg-accent-hover text-bg-primary font-semibold py-3 px-6 rounded-lg transition-all duration-200 hover:shadow-[0_0_20px_rgba(16,193,149,0.3)]"
        href="/click-farm"
      >
        Learn More &rarr;
      </a>
    </div>
    <div className="relative group">
      <div className="absolute -inset-1 bg-gradient-to-r from-accent/20 to-accent/0 rounded-xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <img className="relative w-full rounded-xl border border-border shadow-2xl" src={clickFarmPreview} alt="Click Farm preview" />
    </div>
  </div>
);

const panes: Record<string, React.FC> = {
  "script-kitties": ScriptKittiesTabPane,
  "click-farm": ClickFarmTabPane,
  "stonequest": WorldsBetweenTabPane,
  "after": AfterTabPane,
};

const MyProjects = () => {
  const [activeTab, setActiveTab] = useState("script-kitties");
  const ActivePane = panes[activeTab];
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<Map<string, HTMLButtonElement>>(new Map());
  const [pillStyle, setPillStyle] = useState<{ left: number; width: number }>({ left: 0, width: 0 });

  const updatePill = useCallback(() => {
    const btn = buttonRefs.current.get(activeTab);
    const container = containerRef.current;
    if (btn && container) {
      const containerRect = container.getBoundingClientRect();
      const btnRect = btn.getBoundingClientRect();
      setPillStyle({
        left: btnRect.left - containerRect.left,
        width: btnRect.width,
      });
    }
  }, [activeTab]);

  useEffect(() => {
    updatePill();
    window.addEventListener("resize", updatePill);
    return () => window.removeEventListener("resize", updatePill);
  }, [updatePill]);

  return (
    <div>
      <div className="flex items-center gap-3 mb-8">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent to-border" />
        <h2 className="text-2xl font-bold tracking-tight">Games</h2>
        <div className="h-px flex-1 bg-gradient-to-l from-transparent to-border" />
      </div>

      <div ref={containerRef} className="relative flex gap-1 p-1 bg-bg-secondary rounded-xl border border-border">
        {/* Sliding pill */}
        <div
          className="absolute top-1 bottom-1 bg-accent rounded-lg shadow-lg shadow-accent/20 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] z-0"
          style={{ left: pillStyle.left, width: pillStyle.width }}
        />

        {tabs.map((tab) => (
          <button
            key={tab.key}
            ref={(el) => { if (el) buttonRefs.current.set(tab.key, el); }}
            onClick={() => setActiveTab(tab.key)}
            className={`relative z-10 flex-1 px-4 py-2.5 text-sm font-medium rounded-lg transition-colors duration-200 cursor-pointer ${
              activeTab === tab.key
                ? "text-bg-primary font-semibold"
                : "text-text-secondary hover:text-white"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <ActivePane />
    </div>
  );
};

export default MyProjects;
