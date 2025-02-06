import After from "./pages/After";
import Worlds from "./pages/Worlds";
import Home from "./pages/Home";
import ROgre from "./pages/ROgre";
import ScriptKitties from "./pages/ScriptKitties";
import StoneQuest from "./pages/StoneQuest";

// Define the type for route objects
interface WebsiteAppRoute {
  component: React.FC;
  navText: string;
  url: string;
}

const routes: WebsiteAppRoute[] = [
  {
    component: Home,
    navText: "Home",
    url: "/",
  },
  {
    component: ScriptKitties,
    navText: 'Script Kitties',
    url: '/script-kitties'
  },
  {
    component: StoneQuest,
    navText: 'StoneQuest',
    url: '/StoneQuest'
  },
  {
    component: Worlds,
    navText: "Worlds Between Blood",
    url: "/worlds",
  },
  {
    component: After,
    navText: "After",
    url: "/after",
  },
  {
    component: ROgre,
    navText: "ROgre",
    url: "/rogre",
  },
];

export default routes;
