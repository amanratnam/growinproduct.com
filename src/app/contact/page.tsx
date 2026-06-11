import type { Metadata } from "next";
import ContactPanel from "@/components/ContactPanel";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Start a conversation about product strategy, AI & automation, or fractional product leadership.",
};

export default function ContactPage() {
  return (
    <main>
      <section className="relative overflow-hidden bg-white pb-24 pt-28 lg:pt-36">
        <div
          className="pointer-events-none absolute -top-40 right-[-10%] h-[36rem] w-[36rem] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(16,185,129,0.12) 0%, rgba(16,185,129,0.04) 45%, transparent 70%)",
          }}
          aria-hidden
        />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-12">
          <ContactPanel />
        </div>
      </section>
    </main>
  );
}
