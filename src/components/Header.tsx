import React from "react";
import { Link, useLocation } from "react-router-dom";
import routes from "../routes";

import "../styles/header.css";
import avatar from "../res/avatar.png";

const Header: React.FC = () => {
    // Get the current pathname using React Router
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
        <nav className="header navbar navbar-expand-lg">
            <a className="navbar-brand" href="/">
                <img className="avatar-icon" src={avatar} alt="Avatar" /> bc.games
            </a>

            <div id="navbarSupportedContent" className="collapse navbar-collapse">
                <ul className="navbar-nav mr-auto">
                    {routes.map((t: any, idx: any) => (
                        <li key={`nav${idx}-${t.url}`} className={`nav-item ${highlightRoute(t.url) ? "active" : ""}`}>
                            {highlightRoute(t.url) ? (
                                <span className="nav-link" style={{ color: "white", fontWeight: "bolder" }}>
                                    {t.navText} <span className="sr-only">(current)</span>
                                </span>
                            ) : (
                                <Link className="nav-link" to={t.url}>
                                    {t.navText}
                                </Link>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
};

export default Header;
