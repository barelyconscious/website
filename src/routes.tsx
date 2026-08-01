export interface NavRoute {
  navText: string;
  url: string;
}

/** Primary navigation — the single source of truth for the header. */
const routes: NavRoute[] = [
  { navText: "Devlog", url: "/devlog" },
  { navText: "Roadmap", url: "/script-kitties/roadmap" },
  { navText: "About", url: "/about" },
];

export default routes;
