import { useEffect, useState } from "react";
import Papa from "papaparse";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import PageHero from "@/components/content/PageHero";
import DeadlineCountdown, { STEAM_NEXT_FEST, PAX_WEST } from "@/components/DeadlineCountdown";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

import battle from "@/res/scriptkitties/battle.png";

/**
 * Published Google Sheet (File → Share → Publish to web → CSV). Fetched live in
 * the browser so the roadmap tracks the sheet without a redeploy. The endpoint
 * 307-redirects to googleusercontent.com, which sends `Access-Control-Allow-
 * Origin: *` — so a plain client-side fetch works.
 */
const CSV_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vR3AqmtaE7pbsG-NqfbiK2rP5xnkfDQyz3xVobcln8WMqZxh51HptWnV7eSnO8nx-BeEqnBFoQ4_dOI/pub?gid=0&single=true&output=csv";

type Status = "complete" | "in-progress" | "not-started";

interface RoadmapItem {
  item: string;
  status: Status;
  notes?: string;
}

interface Milestone {
  name: string;
  /** Milestone target date — hardcoded here, not read from the sheet (see MILESTONE_DATES). */
  targetDate?: string;
  items: RoadmapItem[];
}

/** Only these sheet columns carry signal; the rest are internal planning fields. */
type Row = {
  Milestone?: string;
  Item?: string;
  Status?: string;
  Notes?: string;
};

/**
 * Milestone target dates, hardcoded by milestone name rather than read from the
 * sheet's (no-longer-maintained) "Need-by date" column. Milestones not listed
 * here — e.g. the open-ended "Early Access Launch" — render without a date.
 */
const MILESTONE_DATES: Record<string, string> = {
  Playtest: "8/1/2026",
  "PAX West": "9/4/2026",
  "Steam Next Fest": "6/1/2027",
};

const STATUS_ORDER: Record<Status, number> = {
  "in-progress": 0,
  "not-started": 1,
  complete: 2,
};

function normalizeStatus(raw: string): Status {
  const s = raw.trim().toLowerCase();
  if (s.startsWith("complete") || s === "done") return "complete";
  if (s.startsWith("in progress") || s.startsWith("in-progress")) return "in-progress";
  return "not-started";
}

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

/** "8/1/2026" → "Aug 1, 2026"; leaves anything unexpected untouched. */
function formatTargetDate(raw: string): string {
  const [m, d, y] = raw.split("/").map((n) => Number(n));
  if (!m || !d || !y || m > 12) return raw;
  return `${MONTHS[m - 1]} ${d}, ${y}`;
}

function parseRoadmap(csv: string): Milestone[] {
  const { data } = Papa.parse<Row>(csv, { header: true, skipEmptyLines: true });

  const order: string[] = [];
  const byName = new Map<string, Milestone>();

  for (const row of data) {
    const item = (row.Item ?? "").trim();
    if (!item) continue; // skip blank / separator rows

    const name = (row.Milestone ?? "").trim() || "Backlog";
    if (!byName.has(name)) {
      const target = MILESTONE_DATES[name];
      byName.set(name, {
        name,
        targetDate: target ? formatTargetDate(target) : undefined,
        items: [],
      });
      order.push(name);
    }
    const milestone = byName.get(name)!;

    const notes = (row.Notes ?? "").trim();
    milestone.items.push({
      item,
      status: normalizeStatus(row.Status ?? ""),
      notes: notes || undefined,
    });
  }

  // Surface what's left: in-progress, then not-started, then completed.
  // (Array.prototype.sort is stable, so original sheet order breaks ties.)
  for (const m of byName.values()) {
    m.items.sort((a, b) => STATUS_ORDER[a.status] - STATUS_ORDER[b.status]);
  }

  return order.map((n) => byName.get(n)!);
}

const STATUS_LABEL: Record<Status, string> = {
  complete: "Done",
  "in-progress": "In progress",
  "not-started": "To do",
};

function StatusChip({ status }: { status: Status }) {
  return (
    <Badge
      className={cn(
        "font-pixel rounded-none border-2 border-black text-[0.5rem] uppercase",
        status === "complete" && "bg-primary text-primary-foreground",
        status === "in-progress" && "bg-accent text-accent-foreground",
        status === "not-started" && "bg-muted text-muted-foreground",
      )}
    >
      {STATUS_LABEL[status]}
    </Badge>
  );
}

/** Standalone "time-to-deadline" banner card for the Steam Next Fest window. */
function DeadlineBanner() {
  return (
    <section className="mb-10 border-2 border-black bg-card pixel-shadow">
      <header className="border-b-2 border-black bg-secondary px-5 py-4">
        <h2 className="text-base text-foreground sm:text-lg">
          {STEAM_NEXT_FEST.title} 2027
        </h2>
      </header>
      <div className="px-5 py-4">
        <DeadlineCountdown
          start={STEAM_NEXT_FEST.start}
          end={STEAM_NEXT_FEST.end}
          markers={[PAX_WEST]}
        />
      </div>
    </section>
  );
}

/**
 * Item notes, rendered as markdown so `-` bullets become real lists. Tailwind's
 * preflight strips list styling, so it's restored here; a single-line note still
 * renders as a flush paragraph (matching the old plain-text look).
 */
function Notes({ markdown }: { markdown: string }) {
  return (
    <div className="mt-1 text-xs text-muted-foreground italic [&_p]:m-0 [&_ul]:list-disc [&_ul]:pl-4 [&_ol]:list-decimal [&_ol]:pl-4 [&_li]:my-0.5">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>
    </div>
  );
}

/** Small pixel marker mirroring the item's status. */
function StatusMarker({ status }: { status: Status }) {
  return (
    <span
      aria-hidden
      className={cn(
        "mt-1 size-3 shrink-0 border-2 border-black",
        status === "complete" && "bg-primary",
        status === "in-progress" && "bg-accent",
        status === "not-started" && "bg-transparent",
      )}
    />
  );
}

function MilestoneCard({ milestone, index }: { milestone: Milestone; index: number }) {
  const total = milestone.items.length;
  const done = milestone.items.filter((i) => i.status === "complete").length;
  const pct = total === 0 ? 0 : Math.round((done / total) * 100);

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.35, delay: Math.min(index * 0.05, 0.3) }}
      className="border-2 border-black bg-card pixel-shadow"
    >
      {/* Header */}
      <header className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 border-b-2 border-black bg-secondary px-5 py-4">
        <h2 className="text-base text-foreground sm:text-lg">{milestone.name}</h2>
        {milestone.targetDate && (
          <span className="font-pixel text-[0.6rem] text-accent uppercase">
            by {milestone.targetDate}
          </span>
        )}
      </header>

      {/* Progress */}
      <div className="px-5 pt-4">
        <div className="mb-1.5 flex items-center justify-between">
          <span className="font-pixel text-[0.55rem] text-muted-foreground uppercase">
            {done} / {total} done
          </span>
          <span className="font-pixel text-[0.55rem] text-primary uppercase">{pct}%</span>
        </div>
        <div className="h-3 w-full border-2 border-black bg-background">
          <motion.div
            className="h-full bg-primary"
            initial={{ width: 0 }}
            whileInView={{ width: `${pct}%` }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* Items */}
      <ul className="divide-y divide-border px-5 py-3">
        {milestone.items.map((it) => (
          <li key={it.item} className="flex items-start gap-3 py-2.5">
            <StatusMarker status={it.status} />
            <div className="min-w-0 flex-1">
              <p
                className={cn(
                  "text-sm leading-snug",
                  it.status === "complete"
                    ? "text-muted-foreground line-through"
                    : "text-foreground",
                )}
              >
                {it.item}
              </p>
              {it.notes && <Notes markdown={it.notes} />}
            </div>
            <StatusChip status={it.status} />
          </li>
        ))}
      </ul>
    </motion.section>
  );
}

const ScriptKittiesRoadmap = () => {
  const [milestones, setMilestones] = useState<Milestone[] | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch(CSV_URL)
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.text();
      })
      .then((csv) => {
        if (!cancelled) setMilestones(parseRoadmap(csv));
      })
      .catch(() => {
        if (!cancelled) setError(true);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div>
      <PageHero
        title="Script Kitties Roadmap"
        subtitle="From Game Jam to Early Access"
        image={battle}
        pixelated
      />

      <div className="mx-auto max-w-3xl px-4 py-12">
        <DeadlineBanner />

        <p className="mb-10 text-foreground/90">
          Here's a non-exhaustive list of all the things I want to get done and by when. This is the plan I am following, but to be clear nothing is being promised by this roadmap. There may be items in this list that never get done and there will be items outside this list that get prioritized.
        </p>

        {/* Legend */}
        <div className="mb-8 flex flex-wrap items-center gap-4">
          <span className="font-pixel text-[0.55rem] text-muted-foreground uppercase">
            Legend
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="size-3 border-2 border-black bg-primary" />
            <span className="text-xs text-muted-foreground">Done</span>
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="size-3 border-2 border-black bg-accent" />
            <span className="text-xs text-muted-foreground">In progress</span>
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="size-3 border-2 border-black bg-transparent" />
            <span className="text-xs text-muted-foreground">To do</span>
          </span>
        </div>

        {error && (
          <p className="text-muted-foreground">
            Couldn&apos;t load the roadmap right now.
          </p>
        )}

        {!error && milestones === null && (
          <p className="font-pixel text-[0.6rem] text-muted-foreground uppercase">
            Loading roadmap…
          </p>
        )}

        {milestones && (
          <div className="space-y-10">
            {milestones.map((m, i) => (
              <MilestoneCard key={m.name} milestone={m} index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ScriptKittiesRoadmap;
