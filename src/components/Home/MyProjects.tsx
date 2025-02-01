import React from "react";
import { Tab, Tabs } from "react-bootstrap";
import { useModal } from "../../context/ModalContext"; // Using Context instead of Redux
import YouTubeModal, { YOUTUBE_MODAL_ID } from "./YouTubeModal";

import stonequestPreview from "../../res/stonequestPreview.png";
import afterPreview from "../../res/afterPreview.png";
import rogrePreview from "../../res/rogrePreview.png";

const WorldsBetweenTabPane: React.FC = () => (
  <div className="row mt-3">
    <div className="col-sm-12 col-lg-6">
      <p>
        <strong>StoneQuest</strong> started out as a very basic 2D roguelike written in Java in 2012 using the
        Swing library. Over time, it has been rewritten and had all of its features reworked several times over.
      </p>
      <div className="btn-group full-width">
        <a className="btn btn-primary" href="/stonequest">
          Learn More
        </a>
      </div>
      <hr className="d-block d-lg-none" />
    </div>

    <div className="col-sm-12 col-lg-6">
      <img className="project-preview-img" src={stonequestPreview} alt="StoneQuest preview" />
    </div>
  </div>
);

const AfterTabPane: React.FC = () => (
  <div className="row mt-3">
    <div className="col-sm-12 col-lg-6">
      <p>
        After is a 2D puzzle platformer, created in collaboration with four other students at UT through the Game
        Development Program.
      </p>
      <p>
        The player plays as the apparent lone survivor of a post-apocalyptic world whose self-found purpose is to scour
        the city for clues to his identity and purpose as well as to discover the cause of the recent city's
        destruction.
      </p>

      <div className="btn-group full-width">
        <a className="btn btn-primary" href="/after">
          Learn More
        </a>
        <a className="btn btn-primary" href="https://www.github.com/mattschwartz/after">
          <i className="fab fa-github" /> View Source
        </a>
      </div>
      <hr className="d-block d-lg-none" />
    </div>
    <div className="col-sm-12 col-lg-6">
      <img className="project-preview-img" src={afterPreview} alt="After preview" />
    </div>
  </div>
);

const ROgreTabPane: React.FC = () => {
  const { showModal } = useModal(); // Using Context instead of Redux

  return (
    <div className="row mt-3">
      <div className="col-sm-12 col-lg-6">
        <p>
          In the spring of 2014, I undertook a game technology class at UT and along with a group of students, we worked
          on projects targeted at implementing specific aspects of game design.
        </p>
        <p>
          At the end of the semester, my team and I created the game ROgre (a dungeon crawler written in{" "}
          <a className="fancy-link" href="http://www.ogre3d.org/">
            Ogre 3D
          </a>
          ) in C++.
        </p>

        <div>
          <button className="btn btn-danger full-width" onClick={() => showModal(YOUTUBE_MODAL_ID)}>
            <i className="fab fa-youtube" /> Watch the trailer
          </button>
        </div>
        <div className="btn-group mt-3 full-width">
          <a className="btn btn-primary" href="/rogre">
            Learn More
          </a>
          <a className="btn btn-primary" href="https://www.github.com/mattschwartz/rogre">
            <i className="fab fa-github" /> View Source
          </a>
        </div>
        <hr className="d-block d-lg-none" />
      </div>
      <div className="col-sm-12 col-lg-6">
        <img className="project-preview-img" src={rogrePreview} alt="ROgre preview" />
      </div>
    </div>
  );
};

const MyProjects: React.FC = () => {
  return (
    <div className="my-projects">
      <YouTubeModal title="ROgre" youTubeUrl="https://www.youtube.com/embed/pd1MyZFK1-8" />
      <h1 className="section-header">Projects</h1>

      <Tabs id="projects-tabs" defaultActiveKey="worlds-between">
        <Tab eventKey="worlds-between" title="StoneQuest">
          <WorldsBetweenTabPane />
        </Tab>
        <Tab eventKey="after" title="After">
          <AfterTabPane />
        </Tab>
        <Tab eventKey="rogre" title="ROgre">
          <ROgreTabPane />
        </Tab>
      </Tabs>
    </div>
  );
};

export default MyProjects;
