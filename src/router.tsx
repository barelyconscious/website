import { createBrowserRouter } from "react-router-dom";
import Layout from "./containers/Layout";
import ForumLayout from "./layouts/ForumLayout";

import Home from "./pages/Home";
import Worlds from "./pages/Worlds";
import After from "./pages/After";
import Rogre from "./pages/ROgre";
import NotFound from "./pages/NotFound";
import ScriptKitties from "./pages/ScriptKitties";
import StoneQuest from "./pages/StoneQuest";
import Forum from "./pages/Forum/Forum";
import Board from "./pages/Forum/Board";
import Topic from "./pages/Forum/Topic";
import SignUp from "./pages/Forum/SignUp";
import SignIn from "./pages/Forum/SignIn";
import Profile from "./pages/Forum/Profile";
import Devlog from "./pages/Devlog";
import ClickFarm from "./pages/ClickFarm";

export const router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            { path: "/", element: <Home /> },
            { path: "/worlds", element: <Worlds /> },
            { path: "/after", element: <After /> },
            { path: "/rogre", element: <Rogre /> },
            { path: "/script-kitties", element: <ScriptKitties /> },
            { path: "/stonequest", element: <StoneQuest /> },
            { path: "/devlog", element: <Devlog /> },
            { path: "/click-farm", element: <ClickFarm /> },
            { path: "/signup", element: <SignUp /> },
            { path: "/signin", element: <SignIn /> },
            {
                element: <ForumLayout />,
                children: [
                    { path: "/forum", element: <Forum /> },
                    { path: "/forum/:boardId", element: <Board /> },
                    { path: "/forum/:boardId/:topicId", element: <Topic /> },
                    { path: "/profile/:username", element: <Profile /> },
                ],
            },
            { path: "*", element: <NotFound /> },
        ],
    },
]);
