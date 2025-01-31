import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Layout from './containers/Layout';

// Import your page components
import Home from "./pages/Home";
import Worlds from "./pages/Worlds";
import After from "./pages/After";
import Rogre from "./pages/ROgre";
import NotFound from './pages/NotFound';

import './styles/App.css';

const App: React.FC = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/worlds" element={<Worlds />} />
        <Route path="/after" element={<After />} />
        <Route path="/rogre" element={<Rogre />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
};

export default App;
