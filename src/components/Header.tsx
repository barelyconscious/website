import { Link, useLocation } from "react-router-dom";
import routes, { WebsiteAppRoute } from "../routes";
import avatar from "../res/avatar.png";

const Header = () => {
    const location = useLocation();
    const locationUrl = location.pathname;
    const highlightRoute = (route: string) => {
        if (route === "/") return locationUrl === route;
        return locationUrl.startsWith(route);
    };

    return (
        <nav className="sticky top-0 z-50 bg-bg-secondary/80 backdrop-blur-xl border-b border-border px-6 py-3 flex items-center justify-between">
            <a className="flex items-center gap-3 no-underline group" href="/">
                <img
                    className="w-9 h-9 rounded-lg ring-2 ring-border group-hover:ring-accent transition-all duration-300"
                    src={avatar}
                    alt="Avatar"
                />
                <span className="text-lg tracking-tight text-text-primary" style={{ fontFamily: "'Fredoka', sans-serif", fontWeight: 600 }}>Barely Conscious Games</span>
            </a>

            <ul className="hidden md:flex items-center gap-1 list-none m-0 p-0">
                {routes.map((t: WebsiteAppRoute, idx: number) => (
                    <li key={`nav${idx}-${t.url}`}>
                        {highlightRoute(t.url) ? (
                            <span className="px-4 py-2 text-sm font-semibold text-white bg-accent rounded-lg">
                                {t.navText}
                            </span>
                        ) : (
                            <Link
                                className="px-4 py-2 text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-bg-elevated rounded-lg transition-all duration-200"
                                to={t.url}
                            >
                                {t.navText}
                            </Link>
                        )}
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Header;
