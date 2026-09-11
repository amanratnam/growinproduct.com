/* ---------------------------------------------------------------------------
   Every piece of copy on the site lives here.
   Layout components read from this file and never hold their own strings, so
   the same numbers and wording can't drift between the home page and a
   dedicated route.
--------------------------------------------------------------------------- */

export const site = {
  name: "Grow In Product",
  tagline: "Building products. Driving growth.",
  email: "hello@growinproduct.com",
  location: "Product & technology consulting",
  linkedin: "https://www.linkedin.com/company/growinproduct",
  availability: "2 seats open · Q3 2026",
} as const;

export const nav = [
  { label: "Work", href: "/projects" },
  { label: "Services", href: "/#services" },
  { label: "Process", href: "/process" },
  { label: "About", href: "/#about" },
] as const;

/* ---------------------------------------------------------------- hero ---- */

/* The headline holds one fixed word and one that cycles. Keep the rotating
   words close in length so the line doesn't jump around too hard. */
export const heroRotator = [
  "PRODUCT",
  "STRATEGY",
  "ROADMAPS",
  "AI SYSTEMS",
  "WORKFLOWS",
] as const;

export const heroMarquee = [
  "Product strategy",
  "Business analysis",
  "PRDs & specs",
  "Workflow design",
  "AI & automation",
  "Fractional leadership",
] as const;

/* ------------------------------------------------------------ services ---- */

export type Service = {
  id: string;
  title: string;
  summary: string;
  detail: string;
  deliverables: readonly string[];
};

export const services: readonly Service[] = [
  {
    id: "strategy",
    title: "Product Strategy",
    summary: "North-star definition, positioning and roadmaps that connect vision to outcomes.",
    detail:
      "Most roadmaps are a list of promises with no spine. We find the one workflow that actually retains customers, build the strategy around it, and cut everything that doesn't serve it.",
    deliverables: ["Positioning", "North-star metric", "Roadmap", "Prioritisation model"],
  },
  {
    id: "analysis",
    title: "Business Analysis",
    summary: "Requirements, data deep-dives and opportunity sizing that turn ambiguity into decisions.",
    detail:
      "Before anything gets built, the problem gets named and sized. Stakeholder interviews, analytics audits and a written point of view you can disagree with.",
    deliverables: ["Requirements", "Data audit", "Opportunity sizing", "Decision memo"],
  },
  {
    id: "prds",
    title: "PRD & Documentation",
    summary: "Crisp specs, user stories and acceptance criteria engineers actually want to read.",
    detail:
      "Specs written with engineering constraints already in the room, not discovered in sprint three. Short, testable, and versioned alongside the code.",
    deliverables: ["PRDs", "User stories", "Acceptance criteria", "API contracts"],
  },
  {
    id: "workflows",
    title: "Workflow Design",
    summary: "Operational flows mapped, simplified and rebuilt, with fewer handoffs and faster cycles.",
    detail:
      "We document the real process, not the wiki version. Then we remove the handoffs that exist only because nobody ever questioned them.",
    deliverables: ["Process maps", "Routing rules", "SLAs", "Runbooks"],
  },
  {
    id: "ai",
    title: "AI & Automation",
    summary: "Practical AI integrations and automation pipelines that remove busywork, not jobs.",
    detail:
      "LLM features shipped with evals, kill switches and a human in the loop where confidence is low. Built to survive a bad model day.",
    deliverables: ["LLM features", "Eval harness", "Automation pipelines", "Guardrails"],
  },
  {
    id: "leadership",
    title: "Fractional Leadership",
    summary: "Senior product leadership embedded in your team, exactly as long as you need it.",
    detail:
      "In your standups, your roadmap reviews and your hiring loops. The person you talk to is the person doing the work.",
    deliverables: ["Team coaching", "Roadmap ownership", "Hiring support", "Exec reporting"],
  },
];

/* ---------------------------------------------------------------- cases ---- */

export type Case = {
  id: string;
  /* drives the accent swap as this case scrolls into view */
  theme: "black" | "red";
  sector: string;
  title: readonly [string, string];
  tags: readonly string[];
  headline: string;
  summary: string;
  body: string;
  stats: readonly (readonly [string, string])[];
};

export const cases: readonly Case[] = [
  {
    id: "patient-intake",
    theme: "red",
    sector: "Healthcare SaaS",
    title: ["Patient Intake,", "Rebuilt"],
    tags: ["#HEALTHTECH", "#B2B SAAS"],
    headline: "−62% intake time",
    summary:
      "Intake and triage cut from 14 screens to 5, with insurance verification moved to an async background job.",
    body: "A multi-clinic healthcare SaaS was losing patients mid-intake: fourteen screens, duplicate questions and manual insurance checks. We shadowed front-desk staff, mapped every drop-off point, and rebuilt the flow around the three questions that actually gate triage. Insurance verification became an async background job with graceful fallbacks. The new flow shipped behind a feature flag clinic-by-clinic, with intake time and abandonment tracked from day one.",
    stats: [
      ["62%", "Faster intake"],
      ["4.8★", "Patient CSAT"],
      ["3 wks", "To first ship"],
    ],
  },
  {
    id: "ops-workflow",
    theme: "black",
    sector: "Workflow Optimisation",
    title: ["Ops That", "Ran Itself"],
    tags: ["#LOGISTICS", "#AUTOMATION"],
    headline: "31 hrs/week saved",
    summary:
      "A 40-step back-office process reduced to rule-based routing, removing 17 manual handoffs.",
    body: "A logistics firm's back office ran on tribal knowledge: forty steps, seventeen handoffs, three spreadsheets and a prayer. We documented the real process, found that seventy percent of approvals followed predictable rules, and built rule-based routing with human escalation for the rest. The remaining manual steps got checklists and SLAs. Total rebuild time: eight weeks. Errors post-launch: zero.",
    stats: [
      ["31h", "Saved weekly"],
      ["17", "Handoffs removed"],
      ["0", "Errors post-launch"],
    ],
  },
  {
    id: "focused-roadmap",
    theme: "red",
    sector: "Product Strategy",
    title: ["From Factory", "To Focus"],
    tags: ["#B2B ANALYTICS", "#STRATEGY"],
    headline: "2.3× activation",
    summary:
      "A B2B analytics product repositioned around one core workflow, with the roadmap cut by 60%.",
    body: "A B2B analytics startup shipped fast but retained poorly. The roadmap had eighty items and no spine. Usage data showed one workflow drove nearly all retained accounts. We repositioned the product around it, cut the roadmap sixty percent, and rewrote onboarding to reach that workflow in under five minutes. Activation went 2.3× in a quarter; ninety-day retention followed.",
    stats: [
      ["2.3×", "Activation lift"],
      ["60%", "Roadmap cut"],
      ["+41%", "Retention (90d)"],
    ],
  },
  {
    id: "support-copilot",
    theme: "black",
    sector: "AI & Automation",
    title: ["Support", "Copilot"],
    tags: ["#LLM", "#SUPPORT OPS"],
    headline: "78% auto-resolved",
    summary:
      "An LLM triage layer that drafts replies, routes edge cases and learns from every agent correction.",
    body: "Support volume was scaling faster than headcount. We built an LLM triage layer that classifies intent, drafts replies grounded in the help centre, and routes anything low-confidence to humans, with every agent correction feeding the eval set. Shipped in six weeks with a kill switch and a weekly quality review. Seventy-eight percent of tickets now resolve without human touch; first-response time halved.",
    stats: [
      ["78%", "Auto-resolved"],
      ["−54%", "First-response time"],
      ["6 wks", "Concept to prod"],
    ],
  },
];

/* -------------------------------------------------------------- process ---- */

export const stages = [
  {
    name: "Discover",
    desc: "Stakeholder interviews, data audits and market scans. We map what's actually happening before deciding what should.",
    outputs: ["User research", "Analytics audit", "Landscape scan"],
  },
  {
    name: "Define",
    desc: "Problems get named, sized and prioritised. A sharp problem statement beats a hundred feature ideas.",
    outputs: ["Problem framing", "Success metrics", "Priority model"],
  },
  {
    name: "Design",
    desc: "Flows, specs and prototypes, designed with engineering constraints in the room rather than discovered after.",
    outputs: ["PRDs", "User flows", "Prototypes"],
  },
  {
    name: "Deliver",
    desc: "Tight build loops with weekly demos. Scope is managed ruthlessly so the date holds and quality doesn't slip.",
    outputs: ["Sprint cadence", "QA gates", "Launch plan"],
  },
  {
    name: "Scale",
    desc: "Post-launch instrumentation, growth loops and automation so the product compounds without constant pushing.",
    outputs: ["Funnel analysis", "Experiments", "Team handoff"],
  },
] as const;

/* ---------------------------------------------------------------- about ---- */

export const aboutBody = [
  "Grow In Product is run by a single senior product operator, not a bench of juniors behind a polished pitch. You get the person you talk to, on every document, every decision, every demo.",
  "The throughline of a decade of work: turning fuzzy business problems into shipped, measurable product. Lately with a heavy dose of AI and automation, in the places where it genuinely earns its keep.",
] as const;

export const timeline = [
  {
    period: "Early career",
    title: "Engineering & business analysis",
    desc: "Started on the technical side, building, then translating between business and engineering.",
  },
  {
    period: "Growth years",
    title: "Product management",
    desc: "Owned products end to end across healthcare, SaaS and operations-heavy domains.",
  },
  {
    period: "Recent",
    title: "AI & automation practice",
    desc: "Shipped LLM-powered workflows and automation systems before it was a buzzword.",
  },
  {
    period: "Now",
    title: "Grow In Product",
    desc: "Independent consulting and fractional product leadership for teams that want senior judgment without senior overhead.",
  },
] as const;

export const expertise = [
  "Product strategy",
  "Roadmapping",
  "PRDs & specs",
  "User research",
  "Data analysis",
  "Workflow design",
  "LLM integration",
  "Automation",
  "Stakeholder management",
  "Agile delivery",
  "Healthcare SaaS",
  "B2B platforms",
] as const;

/* ---------------------------------------------------------------- praise -- */

export type Review = {
  quote: string;
  time: string;
  cat: "Interview prep" | "Product strategy" | "Educational articles";
};

/* Real client feedback. Names withheld; time is when the review was left. */
export const reviews: readonly Review[] = [
  {
    quote:
      "Aman was great, I would highly recommend having mock interviews with him. Very understanding even when our schedules weren't aligning. I definitely learned some things from our mock interview and he was even willing to mock a case study if I wanted to.",
    time: "3 months ago",
    cat: "Interview prep",
  },
  { quote: "Extremely knowledgeable.", time: "1 year ago", cat: "Interview prep" },
  {
    quote: "I got actionable feedback on how to improve an interview use case presentation.",
    time: "1 year ago",
    cat: "Interview prep",
  },
  { quote: "Great work!!", time: "1 year ago", cat: "Product strategy" },
  {
    quote:
      "After sending me a document reviewing an interview, he answered all my questions in detail and provided materials to help me develop the areas where I can improve. Overall I recommend him for providing feedback on your interviews.",
    time: "1 year ago",
    cat: "Interview prep",
  },
  { quote: "An exceptional service was delivered.", time: "2 years ago", cat: "Interview prep" },
  {
    quote:
      "I collaborated with Aman on a few side projects. He is professional and will always go the extra mile for you. Will definitely hire again, thanks Aman!",
    time: "2 years ago",
    cat: "Educational articles",
  },
  {
    quote:
      "I enjoyed working with Aman so much that I signed up for two additional coaching sessions to get even more practice answering Product Management interview questions. I highly recommend his services to anyone looking to ace their upcoming PM interviews.",
    time: "2 years ago",
    cat: "Interview prep",
  },
  {
    quote:
      "Aman was incredible to work with! A Product Management expert who demonstrated his knowledge during our 1:1 mock interview and coaching sessions. I went in with no idea how to answer RCA and product design questions, and by our last session I felt like a pro.",
    time: "2 years ago",
    cat: "Interview prep",
  },
  { quote: "Great work.", time: "3 years ago", cat: "Product strategy" },
  {
    quote:
      "Excellent quality and efficient work as always. I've ordered from him multiple times at this point, and he never disappoints. It's always above and beyond. I'd highly recommend him for any product management assistance.",
    time: "3 years ago",
    cat: "Product strategy",
  },
  {
    quote:
      "Great work as always! Incredibly detailed, and gave me a lot to work off of to tailor it how I want. I really appreciate the assistance on product related tasks and would recommend him to anyone looking for interview case study guidance!",
    time: "4 years ago",
    cat: "Product strategy",
  },
  { quote: "Excellent work and delivery.", time: "4 years ago", cat: "Product strategy" },
  {
    quote:
      "Great seller! Answered any and all inquiries I had and displayed a wealth of knowledge. I gained valuable insight on product management concepts.",
    time: "4 years ago",
    cat: "Interview prep",
  },
  {
    quote:
      "Aman is an expert product engineer with a keen eye for detail and truly understands how to bring a product to life. He has helped with our GTM strategy and plan and will continue to help until we launch. Thanks!",
    time: "4 years ago",
    cat: "Product strategy",
  },
  {
    quote: "Really good to work with. I definitely recommend Aman.",
    time: "4 years ago",
    cat: "Interview prep",
  },
];

/* -------------------------------------------------------------- contact ---- */

export const contactRows = [
  ["Who", "You, plus one senior product operator"],
  ["What", "Thirty honest minutes about your product"],
  ["When", "A reply the same day, usually"],
  ["Dress code", "Come as you are. Half-formed ideas welcome."],
] as const;
