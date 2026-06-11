import { useEffect, useState, type RefObject } from "react";

/**
 * A thin fixed bar pinned to the top edge of the viewport that tracks reading
 * progress through the given article element. Progress reaches 100% when the
 * bottom of the article scrolls into view, so the prev/next nav and footer
 * don't count toward "how much further to go".
 */
const ReadingProgress = ({
  target,
}: {
  target: RefObject<HTMLElement | null>;
}) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const el = target.current;
      if (!el) return;

      const { top, height } = el.getBoundingClientRect();
      // Distance from the article's top to the viewport top.
      const scrolled = -top;
      // The article is "fully read" once its bottom reaches the viewport bottom.
      const total = height - window.innerHeight;
      const ratio = total > 0 ? scrolled / total : 1;
      setProgress(Math.min(1, Math.max(0, ratio)));
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [target]);

  return (
    <div
      className="fixed inset-x-0 top-0 z-[60] h-[3px] bg-transparent"
      role="progressbar"
      aria-label="Reading progress"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(progress * 100)}
    >
      <div
        className="h-full origin-left bg-accent transition-transform duration-75 ease-out"
        style={{ transform: `scaleX(${progress})` }}
      />
    </div>
  );
};

export default ReadingProgress;
