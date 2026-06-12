import scriptKittiesPreview from "@/res/scriptkitties/battle.png";
import stoneQuestPreview from "@/res/stonequestPreview.png";
import afterPreview from "@/res/afterPreview.png";
import clickFarmPreview from "@/res/clickfarm/cover.jpg";

import blueskyIcon from "@/res/social_bluesky.png";
import youtubeIcon from "@/res/social_youtube.png";
import twitchIcon from "@/res/social_twitch.png";
import tiktokIcon from "@/res/social_tiktok.png";

export interface Game {
  slug: string;
  title: string;
  tagline: string;
  blurb: string;
  preview: string;
  href: string;
  status: string;
  /** True when the entire game — code and art — was AI-generated. */
  ai?: boolean;
  /** Optional external "play now" URL. */
  external?: string;
}

export const GAMES: Game[] = [
  {
    slug: "script-kitties",
    title: "Script Kitties",
    tagline: "A turn-based action strategy creature collector",
    blurb:
      "A mod-first creature collector with deep, turn-based action combat. Make your own abilities, creatures, items and more with a simple, intuitive API. Break the game and remake it in your own image.",
    preview: scriptKittiesPreview,
    href: "/script-kitties",
    status: "In development",
  },
  {
    slug: "click-farm",
    title: "Click Farm",
    tagline: "A satirical social-media clicker",
    blurb:
      "Start as a nobody posting chirps into the void; end as an algorithmic prophet whose AI-generated deepfakes print engagement while you sleep. An idle clicker that plays like an arcade cabinet and reads like satire.",
    preview: clickFarmPreview,
    href: "/click-farm",
    status: "Playable",
    ai: true,
    external: "https://click-farm.barelyconscious.games/",
  },
  {
    slug: "stonequest",
    title: "StoneQuest",
    tagline: "A roguelike, rebuilt again and again since 2012",
    blurb:
      "Started as a very basic 2D roguelike written in Java in 2012, StoneQuest has been rewritten and reworked many times over — a decade-long obsession with worlds and systems.",
    preview: stoneQuestPreview,
    href: "/stonequest",
    status: "Archive",
  },
  {
    slug: "after",
    title: "After",
    tagline: "A 2D puzzle platformer about a lone survivor",
    blurb:
      "Built with four other students at UT through the Game Development Program. Play as the apparent lone survivor of a post-apocalyptic world, scouring the city for clues to your identity and its destruction.",
    preview: afterPreview,
    href: "/after",
    status: "Archive",
  },
];

export interface Social {
  label: string;
  handle: string;
  href: string;
  icon: string;
}

export const SOCIALS: Social[] = [
  {
    label: "BlueSky",
    handle: "@cassii.us",
    href: "https://bsky.app/profile/cassii.us",
    icon: blueskyIcon,
  },
  {
    label: "YouTube",
    handle: "@cassiius",
    href: "https://www.youtube.com/@cassiius",
    icon: youtubeIcon,
  },
  {
    label: "Twitch",
    handle: "@cassiius",
    href: "https://www.twitch.tv/cassiius",
    icon: twitchIcon,
  },
  {
    label: "TikTok",
    handle: "@_cassiius",
    href: "https://www.tiktok.com/@_cassiius",
    icon: tiktokIcon,
  },
];

export interface Opening {
  /** Role title shown in the footer. */
  role: string;
  /** One-line description of what we're after. */
  blurb: string;
  /**
   * Link to the full job posting. Placeholder ("#") until the posting is
   * written — the footer hides openings whose href is still "#".
   */
  href: string;
}

/**
 * Open roles advertised in the footer's "We're Hiring" section. Fill in `href`
 * once each posting exists; entries still pointing at "#" render as
 * "coming soon" and are non-clickable.
 */
export const OPENINGS: Opening[] = [
  {
    role: "Digital Artist",
    blurb: "Sprites & backgrounds for Click Farm.",
    href: "/jobs/digital-artist",
  },
  {
    role: "Sound Engineer",
    blurb: "SFX & music for Script Kitties.",
    href: "#",
  },
];

export const SITE = {
  name: "Barely Conscious Games",
  short: "bc.games",
  tagline: "A small studio making pixel-art games.",
  sourceUrl: "https://github.com/barelyconscious/website",
  // Buttondown username powering the newsletter signup. Not a secret — it's the
  // public form endpoint (buttondown.com/api/emails/embed-subscribe/<username>).
  // Set this once you've created the Buttondown account; the signup form hides
  // itself while it's empty.
  newsletter: "",
} as const;
