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

      <section className="shell relative pb-[clamp(40px,7vh,88px)] pt-[clamp(20px,3vh,40px)]">
        <div className="rule-b flex items-baseline justify-between gap-4 pb-3">
          <p className="label text-ink-40">Contact</p>
          <p className="label text-ink-40">Replies from a human</p>
        </div>

        <div className="mt-[clamp(20px,3vh,40px)] grid items-start gap-x-10 gap-y-10 lg:grid-cols-12">
          {/* ---- left: the pitch, kept short so it clears the fold ---- */}
          <div className="lg:col-span-5">
            <h1 className="display text-[clamp(2.2rem,5vw,4.2rem)]">
              <RevealLines lines={["Bring the", "fuzzy problem"]} stagger={0.1} />
            </h1>

            <p className="mt-5 max-w-[40ch] leading-relaxed text-muted">
              One honest conversation to start. No deck, no discovery-call
              theatre, no bots. Tell me what&apos;s actually going wrong.
            </p>

            <ol className="mt-8 rule-t">
              {[
                ["You send this", "Two minutes. Half-formed is fine."],
                ["I read it properly", "Not a queue — it comes to my inbox."],
                ["We talk", "Thirty honest minutes about your product."],
                ["You decide", "No pitch deck, no retainer trap."],
              ].map(([head, sub], i) => (
                <li key={head} className="rule-b flex gap-4 py-3.5">
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

            <p className="label mt-6 flex items-center gap-2 text-ink-40">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
              {site.availability}
            </p>
          </div>

          {/* ---- right: the form, in the fold ---- */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>
        </div>
      </section>
    </main>
  );
}
