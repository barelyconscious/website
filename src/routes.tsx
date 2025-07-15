import Home from "./pages/Home";
import ScriptKitties from "./pages/ScriptKitties";
// import Forum from "./pages/Forum/Forum";

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
  // {
  //   component: Forum,
  //   navText: "Forum",
  //   url: "/forum",
  // }
];

export default routes;
