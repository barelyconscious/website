import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

/** Single source of truth for the Steam Next Fest target window. */
export const STEAM_NEXT_FEST = {
  title: "Steam Next Fest",
  start: "2026-06-11",
  end: "2027-06-01",
} as const;

/** PAX West milestone — an interim deadline marked on the same timeline. */
export const PAX_WEST = {
  label: "PAX West",
  date: "2026-09-04",
} as const;

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

const DAY_MS = 86_400_000;

/** "2026-06-11" → "Jun 11, 2026". */
function formatIsoDate(iso: string): string {
  const [y, m, d] = iso.split("-").map((n) => Number(n));
  return `${MONTHS[m - 1]} ${d}, ${y}`;
}

/** An interim deadline drawn as a colored tick on the bar. */
export interface DeadlineMarker {
  /** ISO date the marker sits at. */
  date: string;
  label: string;
  /** Tailwind bg-* class for the tick + legend swatch. Defaults to teal. */
  colorClass?: string;
}

interface DeadlineCountdownProps {
  /** ISO date the window opened. */
  start: string;
  /** ISO date the window closes (the deadline). */
  end: string;
  /** Left-hand caption above the bar. */
  label?: string;
  /** Interim deadlines drawn along the same start→end timeline. */
  markers?: DeadlineMarker[];
  className?: string;
}

/**
 * Horizontal "time-to-deadline" bar: fills with the elapsed share of the
 * start→end window and shows a days-remaining countdown. Interim deadlines
 * (`markers`) are drawn as colored ticks at their position on the same
 * timeline. "Today" is read from the browser clock at render.
 */
const DeadlineCountdown = ({
  start,
  end,
  label = "",
  markers = [],
  className,
}: DeadlineCountdownProps) => {
  const startMs = new Date(start).getTime();
  const endMs = new Date(end).getTime();
  const now = Date.now();
  const span = endMs - startMs;

  const pct = Math.max(0, Math.min(100, ((now - startMs) / span) * 100));
  const daysLeft = Math.max(0, Math.ceil((endMs - now) / DAY_MS));

  const placedMarkers = markers.map((m) => {
    const markerMs = new Date(m.date).getTime();
    return {
      ...m,
      colorClass: m.colorClass ?? "bg-primary",
      left: Math.max(0, Math.min(100, ((markerMs - startMs) / span) * 100)),
      daysLeft: Math.max(0, Math.ceil((markerMs - now) / DAY_MS)),
    };
  });

  return (
    <div className={cn("w-full", className)}>
      <div className="mb-1.5 flex items-center justify-between">
        <span className="font-pixel text-[0.55rem] text-muted-foreground uppercase">
          {label}
        </span>
        <span className="font-pixel text-[0.55rem] text-accent uppercase">
          {daysLeft} days left
        </span>
      </div>

      <div className="relative h-3 w-full border-2 border-black bg-background">
        <motion.div
          className="h-full bg-accent"
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
        {placedMarkers.map((m) => (
          <div
            key={m.label}
            className={cn("absolute -top-0.5 -bottom-0.5 w-[3px] -translate-x-1/2", m.colorClass)}
            style={{ left: `${m.left}%` }}
            title={`${m.label} — ${formatIsoDate(m.date)}`}
          />
        ))}
      </div>

      <div className="mt-1 flex items-center justify-between text-[0.65rem] text-muted-foreground">
        <span>{formatIsoDate(start)}</span>
        <span>{formatIsoDate(end)}</span>
      </div>

      {placedMarkers.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
          {placedMarkers.map((m) => (
            <span key={m.label} className="inline-flex items-center gap-2 text-[0.65rem]">
              <span className={cn("size-2.5 border border-black", m.colorClass)} />
              <span className="text-foreground">{m.label}</span>
              <span className="text-muted-foreground">
                {formatIsoDate(m.date)} · {m.daysLeft} days left
              </span>
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default DeadlineCountdown;
