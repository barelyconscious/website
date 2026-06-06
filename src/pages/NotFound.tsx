import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import words from "@/res/words.json";
import { Button } from "@/components/ui/button";

const getRandomObservation = (last?: string): string => {
  let tries = 3;
  let observation = last;
  while ((observation === last || !observation) && tries-- > 0) {
    observation = words[Math.floor(Math.random() * words.length)];
  }
  return observation || "nothing at all...";
};

const NotFound = () => {
  const [observation, setObservation] = useState(() => getRandomObservation());

  useEffect(() => {
    const id = setInterval(() => {
      setObservation((prev) => getRandomObservation(prev));
    }, 6000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative flex min-h-[70vh] flex-col items-center justify-center px-4 text-center scanlines">
      <p className="font-pixel text-5xl text-primary sm:text-7xl">404</p>
      <h1 className="mt-6 text-lg text-foreground sm:text-xl">Page not found</h1>
      <p className="mt-3 text-muted-foreground">
        Looks like there ain't nothing here, chief.
      </p>

      <p className="mt-8 text-sm text-muted-foreground italic">
        That cloud up there looks like{" "}
        <span className="text-accent">{observation}</span>
      </p>

      <Button asChild variant="pixel" size="pixel" className="mt-10">
        <Link to="/">Back home</Link>
      </Button>
    </div>
  );
};

export default NotFound;
