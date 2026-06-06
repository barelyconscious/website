import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import routes from "@/routes";
import { SITE } from "@/data/site";
import { cn } from "@/lib/utils";
import avatar from "@/res/avatar.png";

const Header = () => {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);

  const isActive = (url: string) => {
    const base = url.split("#")[0];
    if (base === "/") return pathname === "/";
    return pathname.startsWith(base);
  };

  return (
    <header className="sticky top-0 z-50 border-b-2 border-black bg-[#11131a]/95 backdrop-blur supports-[backdrop-filter]:bg-[#11131a]/80">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link
          to="/"
          onClick={() => setOpen(false)}
          className="group flex items-center gap-3"
        >
          <img
            src={avatar}
            alt=""
            className="pixelated size-9 border-2 border-black group-hover:border-primary"
          />
          <span className="font-pixel text-sm text-foreground">
            {SITE.short}
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {routes.map((r) => (
            <Link
              key={r.url}
              to={r.url}
              className={cn(
                "font-pixel px-3 py-2 text-[0.6rem] uppercase tracking-wide transition-colors",
                "border-b-2 border-transparent hover:text-primary",
                isActive(r.url)
                  ? "border-primary text-primary"
                  : "text-muted-foreground"
              )}
            >
              {r.navText}
            </Link>
          ))}
        </nav>

        {/* Mobile toggle */}
        <button
          type="button"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="flex size-9 items-center justify-center border-2 border-black bg-secondary text-foreground md:hidden"
        >
          {open ? <X className="size-4" /> : <Menu className="size-4" />}
        </button>
      </div>

      {/* Mobile nav */}
      {open && (
        <nav className="flex flex-col border-t-2 border-black md:hidden">
          {routes.map((r) => (
            <Link
              key={r.url}
              to={r.url}
              onClick={() => setOpen(false)}
              className={cn(
                "font-pixel px-4 py-3 text-[0.65rem] uppercase tracking-wide",
                isActive(r.url)
                  ? "bg-secondary text-primary"
                  : "text-muted-foreground hover:bg-secondary"
              )}
            >
              {r.navText}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
};

export default Header;
