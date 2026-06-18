import { Link } from "react-router-dom";
import { ArrowRight, Bot } from "lucide-react";
import type { Game } from "@/data/site";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const GameCard = ({ game }: { game: Game }) => {
  return (
    <Link
      to={game.href}
      className="group flex flex-col overflow-hidden border-2 border-black bg-card pixel-shadow transition-transform hover:-translate-y-1"
    >
      <div className="relative aspect-video overflow-hidden border-b-2 border-black">
        <img
          src={game.preview}
          alt={`${game.title} preview`}
          className="pixelated size-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <Badge
          className={cn(
            "font-pixel absolute top-2 right-2 rounded-none border-2 border-black text-[0.5rem] uppercase",
            game.status.toLowerCase() === "archive"
              ? "bg-muted text-muted-foreground"
              : "bg-accent text-accent-foreground",
          )}
        >
          {game.status}
        </Badge>
        {game.ai && (
          <Badge className="font-pixel absolute top-2 left-2 inline-flex items-center gap-1 rounded-none border-2 border-black bg-primary text-[0.5rem] text-primary-foreground uppercase">
            <Bot className="size-3" /> AI-made
          </Badge>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="font-pixel text-sm text-primary">{game.title}</h3>
        <p className="text-xs text-muted-foreground">{game.tagline}</p>
        <p className="mt-1 line-clamp-3 text-sm text-foreground/80">{game.blurb}</p>
        <span className="font-pixel mt-auto inline-flex items-center gap-2 pt-3 text-[0.6rem] text-primary uppercase">
          Learn more
          <ArrowRight className="size-3 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
};

export default GameCard;
