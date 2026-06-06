import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import type { Game } from "@/data/site";
import { Badge } from "@/components/ui/badge";

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
        <Badge className="font-pixel absolute top-2 right-2 rounded-none border-2 border-black bg-accent text-[0.5rem] text-accent-foreground uppercase">
          {game.status}
        </Badge>
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
