import React from "react";
import { Link, useLocation } from "react-router-dom";
import routes from "../routes";

import "../styles/header.css";
import avatar from "../res/avatar.png";

const Header: React.FC = () => {
  // Get the current pathname using React Router
  const location = useLocation();
  const locationUrl = location.pathname;

  return (
    <nav className="header navbar navbar-expand-lg">
      <a className="navbar-brand" href="/">
        <img className="avatar-icon" src={avatar} alt="Avatar" /> cassiius
      </a>

      <div id="navbarSupportedContent" className="collapse navbar-collapse">
        <ul className="navbar-nav mr-auto">
          {routes.map((t: any, idx: any) => (
            <li key={`nav${idx}-${t.url}`} className={`nav-item ${locationUrl === t.url ? "active" : ""}`}>
              {locationUrl === t.url ? (
                <span className="nav-link">
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
