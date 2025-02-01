import React, { useEffect } from "react";
import Prologue from "../components/stonequest/Prologue";
import January2012 from "../components/stonequest/January2012";
import July2012 from "../components/stonequest/July2012";
import May2013 from "../components/stonequest/May2013";
import Summer2013 from "../components/stonequest/Summer2013";
import Remnants from "../components/stonequest/Remnants";

import "../styles/worldsBetween.css";
import backgroundImage from "../res/stonequestPreview.png";

const StoneQuest: React.FC = () => {
    useEffect(() => {
        document.title = "StoneQuest";
    }, []); // Runs only once on mount

    return (
        <div className="worlds-between">
            <div className="banner" style={{ backgroundImage: `url(${backgroundImage})` }}>
                <div className="overlay" />
            </div>

            <div className="container">
                <div className="title-container">
                    <h1 className="heading">StoneQuest</h1>
                    <hr className="divider" />
                    <div className="subheading">@mattschwartz</div>
                </div>

                <div className="stonequest">
                    <h3 className="section-header">The Life and Death of StoneQuest</h3>
                    <Prologue />
                    <January2012 />
                    <July2012 />
                    <May2013 />
                    <Summer2013 />
                    <Remnants />
                </div>

            </div>
        </div>
    );
};

export default StoneQuest;
