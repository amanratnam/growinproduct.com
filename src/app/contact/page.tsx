import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import KeywordField from "@/components/KeywordField";
import { RevealLines } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Bring the fuzzy problem. Product strategy, AI & automation, or fractional product leadership — one honest conversation to start.",
};

export default function ContactPage() {
  return (
    <main className="relative overflow-hidden">
      {/* the vocabulary of the work, floating behind everything */}
      <KeywordField />

      <section className="shell relative pb-[var(--block)] pt-[clamp(40px,8vh,96px)]">
        <div className="rule-b flex items-baseline justify-between gap-4 pb-4">
          <p className="label text-ink-40">Contact</p>
          <p className="label text-ink-40">Replies from a human</p>
        </div>

        <h1 className="display mt-[clamp(24px,5vh,56px)] text-[clamp(2.4rem,8vw,7rem)]">
          <RevealLines lines={["Bring the", "fuzzy problem"]} stagger={0.1} />
        </h1>

        <p className="mt-7 max-w-[46ch] leading-relaxed text-muted">
          One honest conversation to start. No deck, no discovery-call theatre,
          no bots. Tell me what&apos;s actually going wrong.
        </p>

        <div className="mt-[clamp(40px,7vh,80px)] grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7 xl:col-span-6">
            <ContactForm />
          </div>

          <aside className="lg:col-span-4 lg:col-start-9">
            <p className="label text-ink-40">What happens next</p>
            <ol className="mt-6 rule-t">
              {[
                ["You send this", "Takes two minutes. Half-formed is fine."],
                ["I read it properly", "Not a form queue — it comes to my inbox."],
                ["We talk", "Thirty honest minutes about your product."],
                ["You decide", "No pitch deck, no pressure, no retainer trap."],
              ].map(([head, sub], i) => (
                <li key={head} className="rule-b py-5">
                  <p className="label text-accent">{String(i + 1).padStart(2, "0")}</p>
                  <p className="mt-2 text-sm font-semibold tracking-tight">{head}</p>
                  <p className="mt-1.5 max-w-[32ch] text-sm leading-relaxed text-muted">
                    {sub}
                  </p>
                </li>
              ))}
            </ol>
          </aside>
        </div>
      </section>
    </main>
  );
}
