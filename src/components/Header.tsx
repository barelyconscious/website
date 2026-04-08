import { Link, useLocation } from "react-router-dom";
import routes, { WebsiteAppRoute } from "../routes";

import avatar from "../res/avatar.png";

const Header = () => {
    const location = useLocation();
    const locationUrl = location.pathname;
    const highlightRoute = (route: string) => {
        if (route === "/") {
            return locationUrl === route;
        } else {
            return locationUrl.startsWith(route);
        }
    };

    return (
        <nav className="bg-bg-secondary px-8 py-2 border-b border-black shadow-md flex items-center">
            <a className="flex items-center gap-2 text-white no-underline font-medium" href="/">
                <img className="w-9 border border-black rounded-sm hover:border-accent-alt" src={avatar} alt="Avatar" />
                bc.games
            </a>

            <ul className="hidden lg:flex ml-6 gap-2 list-none m-0 p-0">
                {routes.map((t: WebsiteAppRoute, idx: number) => (
                    <li key={`nav${idx}-${t.url}`}>
                        {highlightRoute(t.url) ? (
                            <span className="px-3 py-1 text-white font-bold border-b-2 border-accent-alt">
                                {t.navText}
                            </span>
                        ) : (
                            <Link
                                className="px-3 py-1 text-text-primary border-b-2 border-transparent hover:text-white hover:border-white"
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
