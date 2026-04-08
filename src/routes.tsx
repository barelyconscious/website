interface WebsiteAppRoute {
  navText: string;
  url: string;
}

const routes: WebsiteAppRoute[] = [
  {
    navText: "Home",
    url: "/",
  },
  {
    navText: "Script Kitties",
    url: "/script-kitties",
  },
];

export type { WebsiteAppRoute };
export default routes;
