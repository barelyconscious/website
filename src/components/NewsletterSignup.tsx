import { useState, type FormEvent } from "react";
import { SITE } from "@/data/site";
import { cn } from "@/lib/utils";

type Status = "idle" | "submitting" | "success" | "error";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Newsletter signup backed by Buttondown's keyless embed-subscribe endpoint, so
 * no API secret ships to the browser. The request is sent with `mode: "no-cors"`
 * (the endpoint isn't CORS-enabled), which makes the response opaque — we can't
 * read status codes, so success is optimistic and the copy points people to the
 * confirmation email (double opt-in does the real validation). A network failure
 * still rejects, which we surface as an error.
 *
 * Renders nothing until SITE.newsletter (the Buttondown username) is set.
 */
const NewsletterSignup = ({
  title = "Subscribe",
  description = "Get new devlog posts in your inbox. No spam, unsubscribe anytime.",
  tag,
  className,
}: {
  title?: string;
  description?: string;
  /** Optional Buttondown tag recording where the signup came from. */
  tag?: string;
  className?: string;
}) => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  if (!SITE.newsletter) return null;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (status === "submitting") return;
    if (!EMAIL_RE.test(email)) {
      setStatus("error");
      return;
    }

    setStatus("submitting");
    try {
      const body = new URLSearchParams({ email });
      if (tag) body.set("tag", tag);
      await fetch(
        `https://buttondown.com/api/emails/embed-subscribe/${SITE.newsletter}`,
        { method: "POST", mode: "no-cors", body }
      );
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className={cn("border-2 border-black bg-card p-5", className)}>
        <p className="font-pixel text-xs text-primary">Almost there!</p>
        <p className="mt-3 text-sm text-muted-foreground">
          Check your inbox for a confirmation link to finish subscribing.
        </p>
      </div>
    );
  }

  return (
    <div className={cn("border-2 border-black bg-card p-5", className)}>
      <h3 className="font-pixel text-xs text-primary">{title}</h3>
      <p className="mt-3 text-sm text-muted-foreground">{description}</p>
      <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-3 sm:flex-row">
        <label htmlFor="newsletter-email" className="sr-only">
          Email address
        </label>
        <input
          id="newsletter-email"
          type="email"
          name="email"
          required
          autoComplete="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status === "error") setStatus("idle");
          }}
          aria-invalid={status === "error"}
          className="flex-1 border-2 border-black bg-background px-3 py-2 text-sm text-foreground outline-none placeholder:text-muted-foreground/60 focus:border-primary"
        />
        <button
          type="submit"
          disabled={status === "submitting"}
          className="font-pixel border-2 border-black bg-primary px-4 py-2 text-[0.6rem] uppercase text-primary-foreground transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "submitting" ? "…" : "Subscribe"}
        </button>
      </form>
      {status === "error" && (
        <p className="mt-2 text-xs text-destructive" role="alert">
          Enter a valid email, or try again in a moment.
        </p>
      )}
    </div>
  );
};

export default NewsletterSignup;
