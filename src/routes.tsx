export interface NavRoute {
  navText: string;
  url: string;
}

/** Primary navigation — the single source of truth for the header. */
const routes: NavRoute[] = [
  { navText: "Games", url: "/#games" },
  { navText: "Devlog", url: "/devlog" },
  { navText: "About", url: "/about" },
];

export default routes;
