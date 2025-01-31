import React from "react";
import { Routes, Route, Link } from "react-router-dom";

// Import your page components
import Home from "./pages/Home";
import Worlds from "./pages/Worlds";
import After from "./pages/After";
import Rogre from "./pages/ROgre";

const App: React.FC = () => {
  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <nav>
        <Link to="/">Home</Link> | <Link to="/worlds">Worlds</Link> | 
        <Link to="/after">After</Link> | <Link to="/rogre">Rogre</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/worlds" element={<Worlds />} />
        <Route path="/after" element={<After />} />
        <Route path="/rogre" element={<Rogre />} />
        <Route path="*" element={<h1>404 - Page Not Found</h1>} />
      </Routes>
    </div>
  );
};

export default App;
