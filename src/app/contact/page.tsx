import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import KeywordField from "@/components/KeywordField";
import { availability, contactSteps } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Bring the fuzzy problem. Product strategy, AI & automation or fractional product leadership — one honest conversation to start.",
};

/* Two columns from the very top: the pitch on the left, the form on the right.
   Both sit inside the first viewport, so nobody has to scroll to find the one
   thing this page exists for. */
export default function ContactPage() {
  return (
    <main className="relative overflow-hidden">
      <KeywordField />

      <section className="shell relative pb-[clamp(48px,7vw,96px)] pt-[clamp(28px,4vw,64px)]">
        {/* On a phone the columns stack, which pushed the form below the fold.
            The heading stays first, then the form, then what happens next —
            so the thing the page exists for is the first thing in reach. */}
        <div className="flex flex-col gap-8 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12">
          <div className="contents lg:col-span-5 lg:!block">
            <div className="order-1">
              <h1 className="display h-page">
                <span className="block">Bring the</span>
                <span className="block">fuzzy problem</span>
              </h1>
              <p className="lead mt-5 max-w-[40ch] lg:mt-7">
                One honest conversation to start. Tell me what&apos;s actually going wrong, and the
                reply comes from me.
              </p>
            </div>

            <div className="order-3 lg:mt-10">
              <p className="h-card">What happens next</p>
              <ol className="mt-4 border-t border-rule-strong">
                {contactSteps.map(([head, sub], i) => (
                  <li key={head} className="flex gap-4 border-b border-rule-strong py-3.5">
                    <span className="display pt-0.5 text-[1.125rem] text-accent">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span>
                      <span className="block font-semibold">{head}</span>
                      <span className="mt-0.5 block text-[0.9375rem] leading-relaxed text-muted">
                        {sub}
                      </span>
                    </span>
                  </li>
                ))}
              </ol>
              <p className="mt-5 flex items-center gap-2.5 text-[0.9375rem] font-medium">
                <span className="h-2 w-2 shrink-0 rounded-full bg-accent" aria-hidden />
                {availability()}
              </p>
            </div>
          </div>

          {/* order-2 on a phone puts this directly under the intro line */}
          <div className="order-2 lg:col-span-7">
            <ContactForm />
          </div>
        </div>
      </section>
    </main>
  );
}
