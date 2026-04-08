import { useState, useEffect } from "react";
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
  const currentHour = new Date().getHours();
  return currentHour < 7 || currentHour > 18;
};

const NotFound = () => {
  const [nighttime] = useState<boolean>(isNighttime());
  const [observation, setObservation] = useState<string>(getRandomObservation());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setObservation(getRandomObservation(observation));
    }, 10000);
    return () => clearInterval(intervalId);
  }, [observation]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] px-6 py-16">
      <h1 className="text-5xl font-black mb-2">404</h1>
      <p className="text-text-secondary text-lg mb-8">Looks like there ain't nothing here, chief.</p>

      <div className={`not-found`}>
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
      </div>

      <p className="mt-6 text-text-muted italic text-sm">
        That one looks like {observation}
      </p>

      <a
        className="mt-8 inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-bg-primary font-semibold py-3 px-8 rounded-xl transition-all duration-200"
        href="/"
      >
        &larr; Go home
      </a>
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
