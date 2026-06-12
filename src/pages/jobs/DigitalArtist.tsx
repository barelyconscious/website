import PageHero from "@/components/content/PageHero";
import coverImg from "@/res/clickfarm/cover.jpg";
import shot from "@/res/clickfarm/gameplay-multipliers.png";

// Placeholder assets to be replaced — each "The Work" item previews on hover
// and opens full-size on click.
import heroBanner from "@/res/jobs/click-farm/hero-banner.png";
import faviconImg from "@/res/jobs/click-farm/favicon.png";
import splashDesktop from "@/res/jobs/click-farm/splash-screen-desktop.png";
import splashMobile from "@/res/jobs/click-farm/splash-screen-mobile.png";
import openGraph from "@/res/jobs/click-farm/open-graph-image.png";
import sendTweet from "@/res/jobs/click-farm/send-tweet-action.png";
import postSelfie from "@/res/jobs/click-farm/post-selfie-action.png";
import startLivestream from "@/res/jobs/click-farm/start-livestream-action.png";
import startPodcast from "@/res/jobs/click-farm/start-podcast-action.png";
import moggingAction from "@/res/jobs/click-farm/mogging-action.png";
import chirperLogo from "@/res/jobs/click-farm/chirper-logo.png";
import picshiftLogo from "@/res/jobs/click-farm/picshift-logo.png";
import skrollLogo from "@/res/jobs/click-farm/skroll-logo.png";
import podpodLogo from "@/res/jobs/click-farm/podpod-logo.png";
import currencyIcon from "@/res/jobs/click-farm/currency-icon.png";

/** A single deliverable in the artwork breakdown. */
interface Asset {
  /** Human-facing name. */
  name: string;
  /** Rough target dimensions, e.g. "1376x768". */
  dims: string;
  /** Optional extra context shown after the title. */
  desc?: string;
  /** Placeholder image — previews on hover, opens full-size on click. */
  img: string;
}

interface AssetGroup {
  title: string;
  assets: Asset[];
}

const GROUPS: AssetGroup[] = [
  {
    title: "Hero & Brand Art",
    assets: [
      {
        name: "Hero banner",
        dims: "1248x72",
        desc: "displayed at the top of the game, muted, minimal detail needed",
        img: heroBanner,
      },
      {
        name: "Favicon",
        dims: "64x64",
        desc: "displayed in the browser tab as well as on the hero banner",
        img: faviconImg,
      },
      {
        name: "Splash screen - desktop/tablet",
        dims: "1376x768",
        desc: 'version for larger screens. Has "CLICK FARM" title text and "CLICK ANYWHERE TO PLAY" action text',
        img: splashDesktop,
      },
      {
        name: "Splash screen - mobile",
        dims: "1376x768",
        desc: 'version for phone screens. Has "TAP FARM" title text and "TAP ANYWHERE TO PLAY" action text (otherwise identical)',
        img: splashMobile,
      },
      {
        name: "Open Graph image",
        dims: "1200x630",
        desc: 'prominent text "CLICK FARM" with flavor sprites (no "TAP FARM" version needed)',
        img: openGraph,
      },
    ],
  },
  {
    title: "Action Buttons",
    assets: [
      { name: "Send tweet action", dims: "310x100", img: sendTweet },
      { name: "Post selfie action", dims: "310x100", img: postSelfie },
      { name: "Start livestream action", dims: "310x100", img: startLivestream },
      { name: "Start podcast action", dims: "310x100", img: startPodcast },
      { name: "Mogging action", dims: "310x100", img: moggingAction },
    ],
  },
  {
    title: "Social Media Logos",
    assets: [
      {
        name: "Chirper logo",
        dims: "64x64",
        desc: "Satirical X/Twitter social media company",
        img: chirperLogo,
      },
      {
        name: "Picshift logo",
        dims: "64x64",
        desc: "Satirical Instagram social media company",
        img: picshiftLogo,
      },
      {
        name: "Skroll logo",
        dims: "64x64",
        desc: "Satirical TikTok social media company",
        img: skrollLogo,
      },
      {
        name: "PodPod logo",
        dims: "64x64",
        desc: "Satirical Podcast company",
        img: podpodLogo,
      },
    ],
  },
  {
    title: "Other",
    assets: [
      {
        name: "Currency icon",
        dims: "32x32",
        desc: "displayed in the hero banner next to the big number",
        img: currencyIcon,
      },
    ],
  },
];

const TOTAL = GROUPS.reduce((n, g) => n + g.assets.length, 0);

/**
 * A single asset line: the title links to the full-size placeholder (opens in a
 * new tab), and hovering/focusing it pops up a small preview.
 */
function AssetItem({ asset }: { asset: Asset }) {
  return (
    <li>
      <span className="group relative inline-block">
        <a
          href={asset.img}
          target="_blank"
          rel="noreferrer"
          className="font-semibold text-foreground underline decoration-dotted underline-offset-2 hover:text-primary"
        >
          {asset.name} ({asset.dims})
        </a>
        {/* Hover/focus preview — escapes the list flow, sits above the title. */}
        <span className="pointer-events-none absolute bottom-full left-0 z-50 mb-2 hidden group-hover:block group-focus-within:block">
          <span className="block rounded-md border-2 border-black bg-[#11131a] p-1.5 pixel-shadow">
            <img
              src={asset.img}
              alt={`${asset.name} placeholder preview`}
              loading="lazy"
              className="block max-h-44 w-auto max-w-[16rem] object-contain pixelated"
            />
          </span>
        </span>
      </span>
      {asset.desc ? <span>: {asset.desc}</span> : null}
    </li>
  );
}

const DigitalArtist = () => {
  return (
    <div>
      <PageHero
        title="[Hiring] Digital Artist"
        subtitle="Paid commission for digital assets for Click Farm, a social-media-themed idle clicker game"
        image={coverImg}
        pixelated
      />

      <div className="mx-auto max-w-3xl space-y-5 px-4 py-12 leading-relaxed text-foreground/85">
        <p>
          <strong>Barely Conscious Games</strong> is an indie game studio looking for
          a digital artist to replace {TOTAL} pieces of AI-generated artwork for a small portfolio project, Click Farm.
        </p>

        <p>
          To set expectations early: while Click Farm is a complete and playable game, it's meant as a demo to flesh out the portfolio. It is not likely to be directly monetized or developed further. Once your artwork is added, Click Farm will be featured prominently on the{" "}
          <a href="/#games" className="text-primary hover:underline">
            front page
          </a>. It is currently not promoted because of its use of AI art.
        </p>

        <h2 className="mt-10 text-base text-primary">Job Overview</h2>

        <ul className="ml-5 list-disc space-y-2">
          <li>No AI use in any asset (including drafts and the final product) provided by you</li>
          <li>{TOTAL} total digital art assets (varying in size from 64x64px to 1376x768px, <a href="#scope-of-work" className="text-primary hover:underline">full breakdown below</a>)</li>
          <li>Your work will be included in Click Farm's public open-source repo under the Apache 2.0 license and credit to you (licensing is negotiable)</li>
          <li>Budget: $200-300 USD, negotiable</li>
          <li>Payment through Artistree, Venmo, or PayPal</li>
          <li>50% upfront; 50% on completion</li>
        </ul>

        <h2 className="mt-10 text-base text-primary">The game</h2>
        <p>
          Click Farm is a browser-based idle clicker game
          that lightly mocks the social media grind. It has cheery, chiptune-style music and arcade-style sound FX. The art style should
          naturally fit with these elements. You can play the game <a href="https://click-farm.barelyconscious.games/" className="text-primary hover:underline" target="_blank">here</a>.
        </p>

        <p>
          The game is <a href="https://github.com/mattschwartz/click-farm" className="text-primary hover:underline" target="_blank">open-source</a> and can easily be run
          locally to test out your art pieces live. Hands-on instructions (like a Discord call) will be provided to help set it up if needed.
        </p>

        <img
          src={shot}
          alt="Screenshot of Click Farm in action"
          className="w-full border-2 border-black pixel-shadow"
        />

        <h2 id="scope-of-work" className="mt-10 scroll-mt-24 text-base text-primary">Scope of Work ({TOTAL} assets)</h2>

        <p>
          Here's a list of all the work to be done plus the size of each asset needed (which can be upscaled from a smaller source to fit the budget).
          Hover over any asset to preview the current placeholder, or click it to open the full-size image.
        </p>

        <div className="space-y-5">
          {GROUPS.map((g) => (
            <div key={g.title}>
              <h3 className="text-sm font-semibold text-foreground">
                {g.title}{" "}
                <span className="text-muted-foreground/70">
                  ({g.assets.length} {g.assets.length === 1 ? "asset" : "assets"})
                </span>
              </h3>
              <ul className="ml-5 mt-2 list-disc space-y-1 text-foreground/80">
                {g.assets.map((a) => (
                  <AssetItem key={a.name} asset={a} />
                ))}
              </ul>
            </div>
          ))}
        </div>

        <h2 className="mt-10 text-base text-primary">Terms</h2>

        <p>
          Click Farm is an open-source project, and your artwork will be part of it: the assets will be committed to its public repository and released under the same Apache License 2.0 as the rest of the project. This means the finished assets will be publicly downloadable, and other people may reuse them under the Apache 2.0 license — which requires that they keep your attribution intact. Different licensing requirements can be negotiated.
        </p>

        <p>
          You personally guarantee that your work is 100% your own and original, and that every asset you provide is free from all forms of generative AI. You also guarantee that the work does not infringe anyone else's copyright, trademark, or other rights.
        </p>

        <p>
          Both parties will first agree to an acceptable amount of pay for the work. 50% of this payment will be provided upfront and 50% upon completion of all assets. Payment will be processed via Artistree, Venmo, or PayPal (your choice). If the work can't be completed for any reason, you deliver whatever assets are finished and are paid pro-rata for them — that is, for the share of the agreed assets actually delivered. If that amount is less than the 50% already paid upfront, you refund the difference; if it's more, you will receive the remainder. For example: deliver half the agreed assets and you keep the 50% downpayment with nothing further owed either way; deliver three-quarters and receive an additional 25%; deliver only a quarter and you refund the unearned 25%.
        </p>

        <h2 className="mt-10 text-base text-primary">Timeline &amp; Expectations</h2>

        <p>
          All work must be completed before August 1, 2026. Once the initial 50% payment is provided, please provide a sketch/rough draft asset to review the art direction within 2 days. Regular communication is expected on the progress of the work, especially if it needs to be put on hold for a period of time.
        </p>

        <p>
          The budget is set to match the purpose of the project: a complete and playable demo to build a portfolio of games. It is meant to reflect how much of your time being asked for, not a measure of the value in your work. Basically, the job is asking for 6-8 hours of work for $35/hr.
        </p>

        <p>
          I'll be available on Discord and email throughout the process for any questions/clarifications. Most days, expect a response within a few hours.
        </p>

        <h2 className="mt-10 text-base text-primary">How to apply</h2>

        <p>
          You can reach out via email: <a
            href="mailto:matt@barelyconscious.games?subject=Digital%20Artist%20%E2%80%94%20Click%20Farm"
            className="text-primary hover:underline"
          >
            matt@barelyconscious.games
          </a>.
        </p>

        <div>
          When reaching out, please provide at least the following:
        </div>

        <ul className="ml-5 list-disc space-y-2">
          <li>A link to your portfolio or sample pieces you have done (ideally commissioned pieces - backgrounds, sprites, game art)</li>
          <li>A link to at least 1 active social media handle</li>
          <li>Your fee &amp; pricing structure for all {TOTAL} pieces</li>
          <li>Your estimated delivery timeline for all {TOTAL} pieces</li>
        </ul>
      </div>
    </div>
  );
};

export default DigitalArtist;
