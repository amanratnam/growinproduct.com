export const navItems = [
  {
    label: "Services",
    href: "/#services",
    desc: "Strategy, analysis, PRDs, workflows, AI and leadership. Six disciplines, one operator, zero handoffs.",
    tag: "LOADOUT",
    stat: "06 disciplines",
    hue: 0,
  },
  {
    label: "Process",
    href: "/process",
    desc: "Discover, Define, Design, Deliver, Scale. Every engagement drives the same five-pitstop road.",
    tag: "CAMPAIGN",
    stat: "05 pitstops",
    hue: 45,
  },
  {
    label: "Work",
    href: "/projects",
    desc: "Healthcare SaaS, ops automation, AI copilots. Anonymized clients, very real numbers.",
    tag: "TROPHIES",
    stat: "2.3× activation, 31h/wk saved",
    hue: -55,
  },
  {
    label: "About",
    href: "/#about",
    desc: "One senior operator, not an agency bench. The person you talk to is the person who does the work.",
    tag: "PLAYER",
    stat: "PM · BA · AI builder",
    hue: 190,
  },
  {
    label: "Praise",
    href: "/#praise",
    desc: "Sixteen five-star reviews from mock interviews to GTM strategy. Straight from the inbox.",
    tag: "REPLAYS",
    stat: "5.0 ★ average",
    hue: -25,
  },
  {
    label: "Contact",
    href: "/contact",
    desc: "Bring the fuzzy problem. You'll hear back from a human, usually the same day.",
    tag: "CO-OP",
    stat: "2 seats open · Q3 2026",
    hue: 20,
  },
] as const;

export type NavItem = (typeof navItems)[number];
