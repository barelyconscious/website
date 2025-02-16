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
import Forum from "./pages/Forum/Forum";
import Board from "./pages/Forum/Board";
import Topic from "./pages/Forum/Topic";
import ForumHeader from "./components/Forum/ForumHeader";
import SignUp from "./pages/Forum/SignUp";
import SignIn from "./pages/Forum/SignIn";

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
                    <Route path="/forum" element={<div>
                        <ForumHeader />
                        <Forum />
                    </div>} />
                    <Route path="/forum/:boardId" element={<div>
                        <ForumHeader />
                        <Board />
                    </div>} />
                    <Route path="/forum/:boardId/:topicId" element={<div>
                        <ForumHeader />
                        <Topic />
                    </div>} />
                    <Route path="/signup" element={<div>
                        <SignUp />
                    </div>} />
                    <Route path="/signin" element={<SignIn />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Layout>
        </ModalProvider>
    );
};

export default App;
