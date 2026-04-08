import { useState } from "react";

import scriptKittiesPreview from '../../res/scriptkitties/battle.png';
import stonequestPreview from "../../res/stonequestPreview.png";
import afterPreview from "../../res/afterPreview.png";

const tabs = [
  { key: "script-kitties", label: "Script Kitties" },
  { key: "worlds-between", label: "StoneQuest" },
  { key: "after", label: "After" },
];

const WorldsBetweenTabPane = () => (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
    <div>
      <p>
        <strong>StoneQuest</strong> started out as a very basic 2D roguelike written in Java in 2012 using the
        Swing library. Over time, it has been rewritten and had all of its features reworked several times over.
      </p>
      <a className="block w-full text-center bg-accent hover:bg-accent-hover text-gray-900 uppercase font-medium py-2 px-4 rounded shadow-lg" href="/stonequest">
        Learn More
      </a>
    </div>
    <div>
      <img className="w-full border border-black shadow" src={stonequestPreview} alt="StoneQuest preview" />
    </div>
  </div>
);

const ScriptKittiesTabPane = () => (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
    <div>
      <p>
        <strong>Script Kitties</strong> is a turn-based action strategy creature collector with deep modding capabilities. Make your own abilities, creatures, items and more with a simple, intuitive API. Break the game and remake it in your own image.
      </p>
      <a className="block w-full text-center bg-accent hover:bg-accent-hover text-gray-900 uppercase font-medium py-2 px-4 rounded shadow-lg" href="/script-kitties">
        Learn More
      </a>
    </div>
    <div>
      <img className="w-full border border-black shadow" src={scriptKittiesPreview} alt="Script Kitties preview" />
    </div>
  </div>
);

const AfterTabPane = () => (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
    <div>
      <p>
        After is a 2D puzzle platformer, created in collaboration with four other students at UT through the Game
        Development Program.
      </p>
      <p>
        The player plays as the apparent lone survivor of a post-apocalyptic world whose self-found purpose is to scour
        the city for clues to his identity and purpose as well as to discover the cause of the recent city's
        destruction.
      </p>
      <div className="flex shadow-lg rounded overflow-hidden">
        <a className="flex-1 text-center bg-accent hover:bg-accent-hover text-gray-900 uppercase font-medium py-2 px-4" href="/after">
          Learn More
        </a>
        <a className="flex-1 text-center bg-accent hover:bg-accent-hover text-gray-900 uppercase font-medium py-2 px-4 border-l border-[#118b6d]" href="https://www.github.com/mattschwartz/after">
          View Source
        </a>
      </div>
    </div>
    <div>
      <img className="w-full border border-black shadow" src={afterPreview} alt="After preview" />
    </div>
  </div>
);

const panes: Record<string, React.FC> = {
  "script-kitties": ScriptKittiesTabPane,
  "worlds-between": WorldsBetweenTabPane,
  "after": AfterTabPane,
};

const MyProjects = () => {
  const [activeTab, setActiveTab] = useState("script-kitties");
  const ActivePane = panes[activeTab];

  return (
    <div>
      <h1 className="section-header">Games</h1>

      <div className="flex border-b-2 border-accent">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2 text-sm font-medium transition-colors cursor-pointer ${
              activeTab === tab.key
                ? "bg-accent text-gray-900 font-bold"
                : "text-text-primary hover:text-accent"
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
