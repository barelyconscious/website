import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from './containers/Layout';
import { Amplify } from 'aws-amplify';
import awsExports from './aws-exports';

Amplify.configure(awsExports);

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
import Forum from "./pages/Forum";
import Board from "./pages/Board";
import Topic from "./pages/Topic";

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
                    <Route path="/forum" element={<Forum />} />
                    <Route path="/forum/:boardId" element={<Board />} />
                    <Route path="/forum/:boardId/:topicId" element={<Topic />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Layout>
        </ModalProvider>
    );
};

export default App;
