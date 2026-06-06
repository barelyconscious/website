import { Link } from "react-router-dom";
import { SITE, SOCIALS } from "@/data/site";

const Footer = () => {
  return (
    <footer className="mt-auto border-t-2 border-black bg-[#11131a]">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:grid-cols-2">
        <div>
          <h3 className="font-pixel text-xs text-primary">Socials</h3>
          <ul className="mt-4 space-y-2">
            {SOCIALS.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-3 text-sm text-muted-foreground hover:text-primary"
                >
                  <img
                    src={s.icon}
                    alt=""
                    className="size-6 transition-transform group-hover:-translate-y-0.5"
                  />
                  <span>
                    {s.label}
                    <span className="text-muted-foreground/60"> / {s.handle}</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-pixel text-xs text-primary">Site Info</h3>
          <div className="mt-4 space-y-2 text-sm text-muted-foreground">
            <p>
              <Link to="/devlog" className="text-primary hover:underline">
                Read the devlog
              </Link>{" "}
              or{" "}
              <Link to="/about" className="text-primary hover:underline">
                learn about the studio
              </Link>
              .
            </p>
            <p>
              Source on{" "}
              <a
                href={SITE.sourceUrl}
                target="_blank"
                rel="noreferrer"
                className="text-primary hover:underline"
              >
                GitHub
              </a>
              .
            </p>
            <p className="text-muted-foreground/60">
              {SITE.name} © {new Date().getFullYear()}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
