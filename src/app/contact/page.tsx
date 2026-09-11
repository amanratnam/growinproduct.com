import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import Reveal, { RevealLines } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "An open invitation to build something good: product strategy, AI & automation, or fractional product leadership.",
};

export default function ContactPage() {
  return (
    <main>
      <section className="shell pb-[clamp(36px,6vh,72px)] pt-[clamp(40px,8vh,96px)]">
        <div className="rule-b flex items-baseline justify-between gap-4 pb-4">
          <p className="label text-ink-40">Contact</p>
          <p className="label text-ink-40">Replies from a human</p>
        </div>

        <h1 className="display mt-[clamp(24px,5vh,56px)] text-[clamp(2.4rem,9vw,8rem)]">
          <RevealLines lines={["Bring the", "fuzzy problem"]} stagger={0.1} />
        </h1>

        <div className="mt-[clamp(28px,6vh,64px)] grid gap-8 md:grid-cols-12">
          <div className="md:col-span-5 lg:col-span-4">
            <p className="label text-ink-40">One conversation</p>
          </div>
          <div className="md:col-span-7 lg:col-span-8">
            <Reveal as="p" className="prose-lead max-w-[52ch] text-ink">
              One honest conversation to start. No deck, no discovery-call
              theatre, no bots. The reply comes from me.
            </Reveal>
          </div>
        </div>
      </section>

      <section className="shell pb-[var(--block)]">
        <div className="rule-t pt-10" />
        <ContactForm />
      </section>
    </main>
  );
}
