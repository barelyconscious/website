import PageHero from "@/components/content/PageHero";
import coverImg from "@/res/clickfarm/cover.jpg";
import shot from "@/res/clickfarm/gameplay-multipliers.png";

/** A single deliverable group in the artwork breakdown. */
interface WorkGroup {
  title: string;
  count: number;
  items: string[];
}

const WORK: WorkGroup[] = [
  {
    title: "Hero & brand art",
    count: 5,
    items: [
      "Title logo / wordmark — the “Click Farm” brand lockup.",
      "Splash screen (desktop) — the wide “click anywhere to play” landing art.",
      "Splash screen (mobile) — a portrait-friendly recomposition of the splash.",
      "App icon / favicon — a tiny self-contained farm scene.",
      "Social share image — the link-preview card/Open-Graph Image.",
    ],
  },
  {
    title: "In-game background",
    count: 1,
    items: [
      "Game backdrop — a farmland vista that sits behind the UI, so it must stay calm and readable in the center.",
    ],
  },
  {
    title: "Social-media platform cards",
    count: 4,
    items: [
      "Chirper (a Twitter/X parody)",
      "Picshift (an Instagram parody)",
      "Skroll (a TikTok parody)",
      "PodPod (a podcast network)",
    ],
  },
  {
    title: "Action icons",
    count: 5,
    items: [
      "Chirps, Selfies, Livestreams, Podcasts, and Mogging — small, punchy icons that read clearly at button size. These are the most critical assets and are prominently displayed. They are meant to read like those big, colorful arcade box buttons.",
    ],
  },
  {
    title: "Other",
    count: 1,
    items: ["Engagement — the primary in-game currency icon."],
  },
];

const TOTAL = WORK.reduce((n, g) => n + g.count, 0);

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
          <strong>Barely Conscious Games</strong> is an indie game studio run by me. I'm looking for
          a digital artist to backfill {TOTAL} pieces of AI-generated artwork for a small demo game I've built: Click Farm.
        </p>

        <p>
          To set expectations early: Click Farm is a <i>demo game</i>. It's not likely to be monetized or developed further.
          I'm using this game to flesh out my catalog but before I will promote it, it needs human-made artwork. There won't
          be a lot of back-and-forth with the artwork. I'll likely be your easiest client.
        </p>

        <h2 className="mt-10 text-base text-primary">Job Highlights</h2>

        <ul className="ml-5 list-disc space-y-2">
          <li>No AI use in any asset (including drafts and the final product) provided by you to me</li>
          <li>16 digital art assets</li>
          <li>Your work will be open-sourced in Click Farm's public repo under the Apache 2.0 license, with credit to you</li>
          <li>Budget: $200-300 USD, negotiable</li>
          <li>Payment through Venmo or PayPal</li>
          <li>50% upfront, 50% on completion</li>
        </ul>

        <h2 className="mt-10 text-base text-primary">The game</h2>
        <p>
          Click Farm is a browser-based idle clicker game
          that lightly mocks the social media grind. It has cheery, chiptune-style music and arcade-style sound FX. The art style should
          naturally fit with these elements. You can play the game <a href="https://click-farm.barelyconscious.games/" className="text-primary hover:underline" target="_blank">here</a>.
        </p>

        <p>
          The game is <a href="https://github.com/mattschwartz/click-farm" className="text-primary hover:underline" target="_blank">open-source</a> and can easily be run
          locally to test out your art pieces live. I'll provide hands-on instructions (like a Discord call) to help if needed.
        </p>

        <img
          src={shot}
          alt="Screenshot of Click Farm in action"
          className="w-full border-2 border-black pixel-shadow"
        />

        <h2 className="mt-10 text-base text-primary">The work ({TOTAL} pieces)</h2>

        <div className="space-y-5">
          I used AI to generate placeholder images which need to be replaced with your real artwork. You can view them{" "}
          <a href="https://drive.google.com/drive/folders/1fOgeXJJTr9JCu8uodto9cEb7NyVCo_28?usp=sharing" className="text-primary hover:underline" target="_blank">here</a> to see all the existing assets to be replaced.
          I'm not attached to them. In fact, as long as the artwork is cohesive and naturally fits the existing music, you have control over the art direction.
        </div>

        <div className="space-y-5">
          {WORK.map((g) => (
            <div key={g.title}>
              <h3 className="text-sm font-semibold text-foreground">
                {g.title}{" "}
                <span className="text-muted-foreground/70">
                  ({g.count} {g.count === 1 ? "piece" : "pieces"})
                </span>
              </h3>
              <ul className="ml-5 mt-2 list-disc space-y-1 text-foreground/80">
                {g.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <h2 className="mt-10 text-base text-primary">Terms</h2>

        <p>
          Click Farm is an open-source project, and your artwork will be part of it: the assets will be committed to its public repository and released under the same Apache License 2.0 as the rest of the project. In plain terms, by delivering the assets you grant me a worldwide, perpetual, irrevocable, royalty-free, sublicensable license to use, modify, and distribute them in any form — including the right to publish them as part of Click Farm's open-source release and to use them in commercial applications (Click Farm or otherwise). This means the finished assets will be publicly downloadable, and other people may reuse them under the Apache 2.0 license — which requires that they keep your attribution intact. Please only apply if you're comfortable with your work being open-sourced this way.
        </p>

        <p>
          You keep ownership and copyright of your work. This is a non-exclusive commission: you're free to show it in your portfolio and to use or license it elsewhere yourself. The one limit is this — you may not grant anyone else exclusive rights to these assets, or otherwise license, sell, or transfer them in any way that would conflict with, revoke, or undermine the license you've granted me. In other words, nothing you do with the art afterward can leave a third party in a position to challenge my right to use it. Whenever I use your art it will be clearly attributed to you (using the name/handle of your choice, with a link to your portfolio or socials if you'd like), and I will never claim authorship of it.
        </p>

        <p>
          You personally guarantee that your work is 100% your own and original, and that every asset you provide is free from all forms of AI usage — not a single pixel generated by an AI tool. You also guarantee that the work does not infringe anyone else's copyright, trademark, or other rights. If a third party brings a claim against me because of your work — for example, that it isn't original, or that you'd already promised it to someone else — you agree to cover the resulting costs.
        </p>

        <p>
          Both parties (you and me) will first agree to an acceptable amount of pay for the work. 50% of this payment will be provided by me upfront and 50% upon completion. Payment will be processed via Venmo or PayPal (your choice). 
        </p>

        <p>
          I'll expect to see the first piece (rough sketch) to review with you to confirm the art direction before the rest of the artwork is done. Before the final 50% is paid, I expect to see all final assets (watermarked, low-res, protected is fine of course), after which I will send the remaining funds before you send the final assets and source/raw files.
        </p>

        <h2 className="mt-10 text-base text-primary">Timeline &amp; Expectations</h2>

        <p>
          Work must be completed before August 1, 2026. Once the initial 50% payment is provided by me to you, I expect to receive a sample art piece for the art direction review within 2 days. I expect regular communication from you on the progress of the work, especially if it needs to be put on hold for a period of time. If the work can't be completed for any reason, you deliver whatever assets are finished and refund the unearned part of the upfront payment, pro-rated by the number of undelivered pieces — for example, if we agree on all 16 pieces and 8 (half) are delivered, you keep the 50% downpayment but will not receive the remaining 50%.
        </p>

        <p>
          I'm looking for demo-grade artwork that you'd only spend 30-60 minutes on per piece. I expect to receive source/raw files with layers (.psd, .ase, etc) in addition to the final produced assets. There won't be need for a lot of back and forth for corrections after the initial art direction review, but I will happily provide feedback when asked.
        </p>

        <p>
          Once both of us agree to the terms via DM/email, I'd like to meet you in a Discord call for 15 minutes. Not a full interview, more of a personality fit check to give us both a chance to ask any further questions.
        </p>

        <p>
          I'll be available on Discord and email throughout the process for any questions/clarifications. Most days, expect a response within a few hours.
        </p>

        <h2 className="mt-10 text-base text-primary">How to apply</h2>

        <p>
          When reaching out, please provide at least the following:
        </p>

        <ul className="ml-5 list-disc space-y-2">
          <li>A link to your portfolio or sample pieces you have done (ideally commissioned pieces - backgrounds, sprites, game art)</li>
          <li>A link to at least 1 active social media handle</li>
          <li>Your fee &amp; pricing structure for all 16 pieces</li>
          <li>Your estimated delivery timeline for all 16 pieces</li>
          <li>Your written guarantee that all assets provided by you to me will be 100% human-made with no generative-AI used in the making of any asset</li>
        </ul>

        <p>
          You can reach out via email (<a
            href="mailto:matt@barelyconscious.games?subject=Digital%20Artist%20%E2%80%94%20Click%20Farm"
            className="text-primary hover:underline"
          >
            matt@barelyconscious.games
          </a>) or DM me on Reddit (<a
            href="https://www.reddit.com/user/cassiius/"
            className="text-primary hover:underline"
          >
            cassiius
          </a>). Expect a response within a few hours.
        </p>
      </div>
    </div>
  );
};

export default DigitalArtist;
