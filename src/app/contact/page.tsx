import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import KeywordField from "@/components/KeywordField";
import { RevealLines } from "@/components/Reveal";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Bring the fuzzy problem. Product strategy, AI & automation, or fractional product leadership — one honest conversation to start.",
};

/* Two columns from the very top: the pitch on the left, the form on the right.
   Both sit inside the first viewport, so nobody has to scroll to find the one
   thing this page exists for. */
export default function ContactPage() {
  return (
    <main className="relative overflow-hidden">
      <KeywordField />

      <section className="shell relative pb-[clamp(40px,7vh,88px)] pt-[clamp(14px,2.5vh,40px)]">
        <div className="rule-b flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 pb-3">
          <p className="label text-ink-40">Contact</p>
          <p className="label shrink-0 text-ink-40">Replies from a human</p>
        </div>

        {/* On a phone the columns stack, which pushed the form below the fold.
            The heading stays first, then the form, then the expectation list —
            so the thing the page exists for is the first thing in reach. */}
        <div className="mt-[clamp(16px,3vh,40px)] flex flex-col gap-8 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-10 lg:gap-y-10">
          <div className="contents lg:col-span-5 lg:!block">
            <h1 className="display order-1 text-[clamp(1.9rem,9vw,4.2rem)]">
              <RevealLines lines={["Bring the", "fuzzy problem"]} stagger={0.1} />
            </h1>

            <p className="order-2 mt-4 max-w-[40ch] leading-relaxed text-muted lg:mt-5">
              One honest conversation to start. No deck, no discovery-call
              theatre, no bots. Tell me what&apos;s actually going wrong.
            </p>

            <ol className="order-4 rule-t mt-2 lg:mt-8">
              {[
                ["You send this", "Two minutes. Half-formed is fine."],
                ["I read it properly", "Not a queue — it comes to my inbox."],
                ["We talk", "Thirty honest minutes about your product."],
                ["You decide", "No pitch deck, no retainer trap."],
              ].map(([head, sub], i) => (
                <li key={head} className="rule-b flex gap-3.5 py-3">
                  <span className="label pt-0.5 text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>
                    <span className="block text-sm font-semibold tracking-tight">{head}</span>
                    <span className="mt-1 block max-w-[34ch] text-sm leading-relaxed text-muted">
                      {sub}
                    </span>
                  </span>
                </li>
              ))}
            </ol>

            <p className="label order-5 mt-5 flex items-center gap-2 text-ink-40 lg:mt-6">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
              {site.availability}
            </p>
          </div>

          {/* order-3 on a phone puts this directly under the intro line */}
          <div className="order-3 lg:col-span-7">
            <ContactForm />
          </div>
        </div>
      </section>
    </main>
  );
}
