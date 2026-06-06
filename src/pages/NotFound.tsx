import { useState, useEffect, type CSSProperties } from "react";
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

/** A blocky pixel-art cloud rendered with crisp SVG rects. */
const PixelCloud = ({
  className,
  style,
}: {
  className?: string;
  style?: CSSProperties;
}) => (
  <svg
    aria-hidden
    viewBox="0 0 16 9"
    shapeRendering="crispEdges"
    className={className}
    style={style}
    fill="#c7d0e2"
  >
    <rect x="1" y="6" width="14" height="3" />
    <rect x="3" y="4" width="5" height="3" />
    <rect x="5" y="2" width="6" height="4" />
    <rect x="9" y="4" width="5" height="3" />
  </svg>
);

const NotFound = () => {
  const [observation, setObservation] = useState(() => getRandomObservation());

  useEffect(() => {
    const id = setInterval(() => {
      setObservation((prev) => getRandomObservation(prev));
    }, 6000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative flex min-h-[70vh] flex-col items-center justify-center overflow-hidden px-4 text-center scanlines">
      {/* Drifting cloud sky */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-48">
        <PixelCloud
          className="cloud-drift w-28 opacity-80"
          style={{ top: "16px", animationDuration: "30s" }}
        />
        <PixelCloud
          className="cloud-drift w-20 opacity-60"
          style={{ top: "84px", animationDuration: "44s", animationDelay: "-15s" }}
        />
        <PixelCloud
          className="cloud-drift w-16 opacity-50"
          style={{ top: "44px", animationDuration: "60s", animationDelay: "-35s" }}
        />
      </div>

      <p className="relative font-pixel text-5xl text-primary sm:text-7xl">404</p>
      <h1 className="relative mt-6 text-lg text-foreground sm:text-xl">
        Page not found
      </h1>
      <p className="relative mt-3 text-muted-foreground">
        Looks like there ain't nothing here, chief.
      </p>

      <p className="relative mt-8 text-sm text-muted-foreground italic">
        That cloud up there looks like{" "}
        <span className="text-accent">{observation}</span>
      </p>

      <Button asChild variant="pixel" size="pixel" className="relative mt-10">
        <Link to="/">Back home</Link>
      </Button>
    </div>
  );
};

export default NotFound;
