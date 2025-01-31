import After from "./pages/After";
import Worlds from "./pages/Worlds";
import Home from "./pages/Home";
import ROgre from "./pages/ROgre";

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
