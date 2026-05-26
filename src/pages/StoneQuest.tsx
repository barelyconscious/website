import { useEffect } from "react";
import Prologue from "../components/stonequest/Prologue";
import January2012 from "../components/stonequest/January2012";
import July2012 from "../components/stonequest/July2012";
import May2013 from "../components/stonequest/May2013";
import Summer2013 from "../components/stonequest/Summer2013";
import Remnants from "../components/stonequest/Remnants";

import "../styles/worldsBetween.css";
import backgroundImage from "../res/stonequestPreview.png";

const StoneQuest = () => {
    useEffect(() => {
        document.title = "StoneQuest";
    }, []);

    return (
        <div className="worlds-between">
            <div className="banner" style={{ backgroundImage: `url(${backgroundImage})` }}>
                <div className="overlay" />
            </div>

            <div className="max-w-5xl mx-auto px-4">
                <div className="title-container">
                    <h1 className="heading">StoneQuest</h1>
                </div>

                <div className="stonequest">
                    <div className="text-center mb-6">
                        <hr className="border-t border-gray-600" />
                        <h4 className="text-2xl font-semibold my-3">The Life and Death of StoneQuest</h4>
                        <hr className="border-t border-gray-600" />
                    </div>
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
