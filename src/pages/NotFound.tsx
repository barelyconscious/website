import React, { useState, useEffect } from "react";
import moment from "moment";

import words from "../res/words.json";
import "../styles/notFound.css";

const getRandomObservation = (lastObservation?: string): string => {
  let triesRemaining = 3;
  let observation: string | null = null;

  do {
    const index = Math.floor(Math.random() * words.length);
    observation = words[index];
  } while (observation === lastObservation && triesRemaining-- > 0);

  return observation || "nothing at all...";
};

const isNighttime = (): boolean => {
  const m = moment();
  if (!m.isValid()) return false;

  const currentHour = parseFloat(m.format("HH"));
  return currentHour < 7 || currentHour > 18;
};

const NotFound: React.FC = () => {
  const [nighttime, setNighttime] = useState<boolean>(isNighttime());
  const [observation, setObservation] = useState<string>(getRandomObservation());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setObservation(getRandomObservation(observation));
    }, 10000);

    return () => clearInterval(intervalId);
  }, [observation]); // Runs when `observation` updates

  return (
    <div className="not-found container text-center">
      <h1 className="mt-5">Four, oh four: page not found</h1>
      <p>Looks like there ain't nothing here, chief.</p>

      <div className={`sky ${nighttime ? "nighttime" : ""}`}>
        <div className="sun">
          <div className="sun-ray" />
          <div className="sun-ray" style={{ animationDelay: "-6s" }} />
          <div className="sun-ray" style={{ animationDelay: "-12s" }} />
          <div className="sun-ray" style={{ animationDelay: "-18s" }} />
          <div className="sun-ray" style={{ animationDelay: "-24s" }} />
        </div>

        {renderStars()}
        <div className="cloud cloud-anim" />
        <div className="cloud cloud-2 cloud-2-anim" />
        <div className="grassy-gnoll" />
        <div className="cloud-shadow cloud-anim" />
        <div className="cloud-shadow cloud-2-shadow cloud-2-anim" />
        {renderGrassBlades()}
      </div>

      <div className="observations mt-3">
        <em>That one looks like {observation}</em>
      </div>
    </div>
  );
};

const renderGrassBlades = () => {
  return Array.from({ length: 9 }, (_, i) => (
    <div key={i} className="grass-blade" style={{ left: `${(i + 1) * 10}%` }} />
  ));
};

const renderStars = () => {
  const starPositions = [
    { left: "1rem", top: "2rem" },
    { left: "8rem", top: "3rem" },
    { left: "6rem", top: "4rem" },
    { left: "5rem", top: "1rem" },
    { left: "7rem", top: "6rem" },
    { left: "4rem", top: "4rem" },
    { left: "2rem", top: "5rem" },
  ];

  return starPositions.map(({ left, top }, index) => (
    <div key={index} className="star" style={{ left, top }} />
  ));
};

export default NotFound;
