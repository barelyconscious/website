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
        <div className="pb-16">
            <div className="worlds-between">
                <div className="banner" style={{ backgroundImage: `url(${backgroundImage})` }}>
                    <div className="overlay" />
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-6">
                <div className="text-center -mt-16 relative z-10 mb-12">
                    <div className="inline-block bg-bg-secondary border border-border rounded-2xl px-12 py-6 shadow-2xl">
                        <h1 className="text-4xl font-bold tracking-tight" style={{ fontFamily: "'Quicksand', sans-serif" }}>StoneQuest</h1>
                    </div>
                </div>

                <div className="text-center mb-10">
                    <div className="h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent mb-4" />
                    <h3 className="text-xl font-semibold text-text-secondary">The Life and Death of StoneQuest</h3>
                    <div className="h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent mt-4" />
                </div>

                <div className="prose-custom">
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
