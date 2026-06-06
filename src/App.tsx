import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Layout from "@/containers/Layout";

import Home from "@/pages/Home";
import Devlog from "@/pages/Devlog";
import DevlogPost from "@/pages/DevlogPost";
import ScriptKitties from "@/pages/ScriptKitties";
import StoneQuest from "@/pages/StoneQuest";
import After from "@/pages/After";
import About from "@/pages/About";
import NotFound from "@/pages/NotFound";

/** Reset scroll on route change (but honor in-page hash anchors). */
const ScrollToTop = () => {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) return;
    window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
};

const App = () => {
  return (
    <>
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/devlog" element={<Devlog />} />
          <Route path="/devlog/:slug" element={<DevlogPost />} />
          <Route path="/script-kitties" element={<ScriptKitties />} />
          <Route path="/stonequest" element={<StoneQuest />} />
          <Route path="/after" element={<After />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </>
  );
};

export default App;
