/* ---------------------------------------------------------------------------
   Every piece of copy on the site lives here.
   Layout components read from this file and never hold their own strings, so
   the same numbers and wording can't drift between the home page and a
   dedicated route.

   House style: short sentences, one idea each, and no lists of three. Pairs
   and fours read as considered; triplets read as filler.
--------------------------------------------------------------------------- */

export const site = {
  name: "Grow In Product",
  tagline: "Building products. Driving growth.",
  email: "hello@growinproduct.com",
  location: "Product & technology consulting",
  linkedin: "https://www.linkedin.com/company/growinproduct",
  founded: "2021",
  years: "10+ years",
  seats: 2,
} as const;

/* Rolls forward with the calendar, so the page can never advertise a quarter
   that has already ended. Evaluated at build time on static pages — only call
   it from server components, or the client may hydrate with a different
   quarter than the server rendered. */
export function availability(date = new Date()) {
  const quarter = Math.floor(date.getMonth() / 3) + 1;
  return `${site.seats} client seats open for Q${quarter} ${date.getFullYear()}`;
}

export const nav = [
  { label: "Home", href: "/" },
  { label: "Work", href: "/work" },
  { label: "Services", href: "/#services" },
  { label: "Process", href: "/process" },
  { label: "About", href: "/about" },
] as const;

/* ---------------------------------------------------------------- hero ---- */

export const hero = {
  lines: ["From fuzzy problem", "to shipped product"],
  lead: "Senior product leadership, embedded in your team for as long as you need it. The person who scopes the work is the one who ships it.",
} as const;

/* ------------------------------------------------------------ services ---- */

export type ServiceIcon = "strategy" | "analysis" | "spec" | "workflow" | "ai" | "lead";

export type Service = {
  id: string;
  icon: ServiceIcon;
  title: string;
  summary: string;
  deliverables: readonly string[];
};

export const services: readonly Service[] = [
  {
    id: "strategy",
    icon: "strategy",
    title: "Product strategy",
    summary: "Find the one workflow that keeps customers, then build the roadmap around it.",
    deliverables: ["Positioning", "North-star metric", "Roadmap", "Prioritisation model"],
  },
  {
    id: "analysis",
    icon: "analysis",
    title: "Business analysis",
    summary: "Name the problem and size it before anyone writes a line of code.",
    deliverables: ["Requirements", "Data audit", "Opportunity sizing", "Decision memo"],
  },
  {
    id: "prds",
    icon: "spec",
    title: "PRDs & documentation",
    summary: "Short, testable specs written with engineering in the room, not after it.",
    deliverables: ["PRDs", "User stories", "Acceptance criteria", "API contracts"],
  },
  {
    id: "workflows",
    icon: "workflow",
    title: "Workflow design",
    summary: "Map how work really moves, then remove the handoffs nobody ever questioned.",
    deliverables: ["Process maps", "Routing rules", "SLAs", "Runbooks"],
  },
  {
    id: "ai",
    icon: "ai",
    title: "AI & automation",
    summary: "LLM features with evals and a human in the loop, built to survive a bad model day.",
    deliverables: ["LLM features", "Eval harness", "Automation pipelines", "Guardrails"],
  },
  {
    id: "leadership",
    icon: "lead",
    title: "Fractional leadership",
    summary: "A senior product lead in your standups and roadmap reviews, for as long as you need one.",
    deliverables: ["Team coaching", "Roadmap ownership", "Hiring support", "Exec reporting"],
  },
];

/* ---------------------------------------------------------------- cases ---- */

export type Case = {
  id: string;
  sector: string;
  title: string;
  metric: { value: string; label: string };
  problem: string;
  change: string;
  comparison: readonly { label: string; before: string; after: string }[];
};

export const cases: readonly Case[] = [
  {
    id: "patient-intake",
    sector: "Healthcare SaaS",
    title: "Patient intake, rebuilt",
    metric: { value: "−62%", label: "intake time" },
    problem:
      "A multi-clinic healthcare platform was losing patients halfway through a fourteen-screen intake full of duplicate questions and manual insurance checks.",
    change:
      "After shadowing front-desk staff, we rebuilt the flow around the few questions that actually gate triage and moved insurance checks to a background job. It shipped clinic by clinic behind a feature flag.",
    comparison: [
      { label: "Screens to complete", before: "14", after: "5" },
      { label: "Insurance check", before: "Manual, blocking", after: "Async, with fallback" },
      { label: "Median intake", before: "11m 20s", after: "4m 18s" },
      { label: "Abandonment", before: "31%", after: "9%" },
    ],
  },
  {
    id: "ops-workflow",
    sector: "Logistics",
    title: "Ops that run themselves",
    metric: { value: "31 hrs", label: "saved every week" },
    problem:
      "A logistics firm's back office ran on tribal knowledge: forty steps and seventeen handoffs, held together by spreadsheets.",
    change:
      "Seventy percent of approvals turned out to follow predictable rules, so they now route automatically with a human on the exceptions. The rebuild took eight weeks and has run without an error since launch.",
    comparison: [
      { label: "Process steps", before: "40", after: "12" },
      { label: "Manual handoffs", before: "17", after: "0" },
      { label: "Approval routing", before: "Tribal knowledge", after: "Rule-based" },
      { label: "Weekly hours", before: "44h", after: "13h" },
    ],
  },
  {
    id: "focused-roadmap",
    sector: "B2B analytics",
    title: "From factory to focus",
    metric: { value: "2.3×", label: "activation in a quarter" },
    problem:
      "A B2B analytics startup shipped fast but kept few of the customers it won. The roadmap had eighty items and no spine.",
    change:
      "Usage data showed one workflow drove nearly every retained account. We cut the roadmap by sixty percent to serve it, and rebuilt onboarding so new users reach it in under five minutes.",
    comparison: [
      { label: "Roadmap items", before: "80", after: "32" },
      { label: "Time to core value", before: "3 sessions", after: "< 5 min" },
      { label: "Activation", before: "8.4%", after: "19.3%" },
      { label: "90-day retention", before: "41%", after: "58%" },
    ],
  },
  {
    id: "support-copilot",
    sector: "Customer support",
    title: "A support copilot",
    metric: { value: "78%", label: "of tickets resolved without a human" },
    problem: "Support volume was growing faster than the team could hire to meet it.",
    change:
      "An LLM layer now reads each ticket and drafts a reply grounded in the help centre. Anything low-confidence goes to a person, and every correction feeds the eval set. Concept to production took six weeks.",
    comparison: [
      { label: "Tickets touched by a human", before: "100%", after: "22%" },
      { label: "First response", before: "3h 40m", after: "1h 42m" },
      { label: "Quality review", before: "Ad hoc", after: "Weekly eval set" },
      { label: "Escalation path", before: "None", after: "Confidence-gated" },
    ],
  },
];

/* -------------------------------------------------------------- process ---- */

export const stages = [
  {
    name: "Discover",
    line: "Interviews and a data audit, before anyone has an opinion.",
    detail:
      "We map what is actually happening before deciding what should. That means sitting with the people who use the product, and reading the numbers nobody has looked at lately.",
    output: "A written read of where things really stand",
  },
  {
    name: "Define",
    line: "A pile of ideas becomes one problem, sized.",
    detail:
      "A sharp problem statement beats a hundred feature ideas. Every candidate gets sized, and the one worth solving gets a metric attached to it.",
    output: "One problem statement with its success metric",
  },
  {
    name: "Design",
    line: "Specs drafted with engineering in the room.",
    detail:
      "Specs and prototypes are written with engineering constraints on the table from day one, rather than discovered halfway through the build.",
    output: "PRDs and clickable flows your engineers sign off",
  },
  {
    name: "Deliver",
    line: "Weekly demos and a date that holds.",
    detail:
      "Tight build loops with a demo every week. Scope gets managed openly, so the launch date holds and quality doesn't quietly slip.",
    output: "A shipped release and the plan to launch it",
  },
  {
    name: "Scale",
    line: "Instrument what shipped and let it compound.",
    detail:
      "Post-launch instrumentation and growth experiments keep the product improving after it's been handed back to your team.",
    output: "Live dashboards and a clean team handoff",
  },
] as const;

/* ---------------------------------------------------------------- about ---- */

export const about = {
  title: ["One operator,", "no bench"],
  lead: "Grow In Product is one senior product operator, not a bench of juniors behind a polished pitch. The person on your first call is the person writing your specs and sitting in your demos.",
  body: "A decade of work has had one throughline: turning fuzzy business problems into shipped, measurable product. Lately that includes a lot of AI and automation, used only where it earns its keep. Most of it has been in healthcare and B2B SaaS.",
} as const;

/* Agency vs. this practice, row by row. Every claim on the right is one the
   rest of the site already makes. */
export const comparison = [
  { label: "Who you talk to", them: "An account manager", us: "The person doing the work" },
  { label: "Who does the work", them: "Whoever is free on the bench", us: "One senior operator, start to finish" },
  { label: "What you get", them: "A strategy deck", us: "Shipped product and specs engineers use" },
  { label: "How long it lasts", them: "A fixed retainer", us: "Exactly as long as you need" },
  { label: "When you hear back", them: "At the next status call", us: "Usually the same day" },
] as const;

export const timeline = [
  {
    period: "Early career",
    title: "Engineering & business analysis",
    desc: "Started on the technical side, then moved into translating between the business and its engineers.",
  },
  {
    period: "Growth years",
    title: "Product management",
    desc: "Owned products end to end in healthcare and B2B SaaS, usually in operations-heavy domains.",
  },
  {
    period: "Recent",
    title: "AI & automation",
    desc: "Shipped LLM-powered workflows and automation systems before it was a buzzword.",
  },
  {
    period: "Now",
    title: "Grow In Product",
    desc: "Consulting and fractional product leadership for teams that want senior judgment without senior overhead.",
  },
] as const;

/* ---------------------------------------------------------------- praise -- */

export type Review = {
  quote: string;
  time: string;
  cat: "Interview prep" | "Product strategy" | "Educational articles";
};

/* Real client feedback. Names withheld; time is when the review was left.
   Ordered so the business engagements lead and the one-line reviews close. */
export const reviews: readonly Review[] = [
  {
    quote:
      "Aman is an expert product engineer with a keen eye for detail and truly understands how to bring a product to life. He has helped with our GTM strategy and plan and will continue to help until we launch. Thanks!",
    time: "4 years ago",
    cat: "Product strategy",
  },
  {
    quote:
      "Excellent quality and efficient work as always. I've ordered from him multiple times at this point, and he never disappoints. It's always above and beyond. I'd highly recommend him for any product management assistance.",
    time: "3 years ago",
    cat: "Product strategy",
  },
  {
    quote:
      "I collaborated with Aman on a few side projects. He is professional and will always go the extra mile for you. Will definitely hire again, thanks Aman!",
    time: "2 years ago",
    cat: "Educational articles",
  },
  {
    quote:
      "Aman was incredible to work with! A Product Management expert who demonstrated his knowledge during our 1:1 mock interview and coaching sessions. I went in with no idea how to answer RCA and product design questions, and by our last session I felt like a pro.",
    time: "2 years ago",
    cat: "Interview prep",
  },
  {
    quote:
      "Great work as always! Incredibly detailed, and gave me a lot to work off of to tailor it how I want. I really appreciate the assistance on product related tasks and would recommend him to anyone looking for interview case study guidance!",
    time: "4 years ago",
    cat: "Product strategy",
  },
  {
    quote:
      "I enjoyed working with Aman so much that I signed up for two additional coaching sessions to get even more practice answering Product Management interview questions. I highly recommend his services to anyone looking to ace their upcoming PM interviews.",
    time: "2 years ago",
    cat: "Interview prep",
  },
  {
    quote:
      "Aman was great, I would highly recommend having mock interviews with him. Very understanding even when our schedules weren't aligning. I definitely learned some things from our mock interview and he was even willing to mock a case study if I wanted to.",
    time: "3 months ago",
    cat: "Interview prep",
  },
  {
    quote:
      "After sending me a document reviewing an interview, he answered all my questions in detail and provided materials to help me develop the areas where I can improve. Overall I recommend him for providing feedback on your interviews.",
    time: "1 year ago",
    cat: "Interview prep",
  },
  {
    quote:
      "Great seller! Answered any and all inquiries I had and displayed a wealth of knowledge. I gained valuable insight on product management concepts.",
    time: "4 years ago",
    cat: "Interview prep",
  },
  {
    quote: "I got actionable feedback on how to improve an interview use case presentation.",
    time: "1 year ago",
    cat: "Interview prep",
  },
  { quote: "Extremely knowledgeable.", time: "1 year ago", cat: "Interview prep" },
  {
    quote: "Really good to work with. I definitely recommend Aman.",
    time: "4 years ago",
    cat: "Interview prep",
  },
  { quote: "An exceptional service was delivered.", time: "2 years ago", cat: "Interview prep" },
  { quote: "Excellent work and delivery.", time: "4 years ago", cat: "Product strategy" },
  { quote: "Great work!!", time: "1 year ago", cat: "Product strategy" },
  { quote: "Great work.", time: "3 years ago", cat: "Product strategy" },
];

/* -------------------------------------------------------------- contact ---- */

export const contactSteps = [
  ["You send this", "Two minutes. Half-formed is fine."],
  ["I read it myself", "It lands in my inbox, not a queue."],
  ["We talk", "Thirty minutes about your product."],
  ["You decide", "No pitch deck and no retainer trap."],
] as const;

export const cta = {
  title: "Bring the fuzzy problem",
  body: "Thirty minutes, no pitch deck. Tell me what's going wrong and you'll get an honest read on whether I can help.",
  button: "Start a conversation",
} as const;
