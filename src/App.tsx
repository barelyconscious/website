import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from './containers/Layout';

// Import your page components
import Home from "./pages/Home";
import Worlds from "./pages/Worlds";
import After from "./pages/After";
import Rogre from "./pages/ROgre";
import NotFound from './pages/NotFound';

import './styles/App.css';
import ScriptKitties from "./pages/ScriptKitties";
import StoneQuest from "./pages/StoneQuest";
import { ModalProvider } from "./context/ModalContext";

const App: React.FC = () => {
  return (
    <ModalProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/worlds" element={<Worlds />} />
          <Route path="/after" element={<After />} />
          <Route path="/rogre" element={<Rogre />} />
          <Route path="/script-kitties" element={<ScriptKitties />} />
          <Route path="/stonequest" element={<StoneQuest />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </ModalProvider>
  );
};

export default App;
