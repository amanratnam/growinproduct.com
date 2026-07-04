import type { Metadata } from "next";
import ContactPanel from "@/components/ContactPanel";

export const metadata: Metadata = {
  title: "You're Invited",
  description:
    "An open invitation to build something great: product strategy, AI & automation, or fractional product leadership.",
};

export default function ContactPage() {
  return (
    <main>
      <section className="relative overflow-hidden bg-foreground/[0.018] px-6 pb-24 pt-36 lg:pt-44">
        {/* soft glows behind the invitation */}
        <div
          className="pointer-events-none absolute -top-32 left-1/2 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(16,185,129,0.14) 0%, rgba(16,185,129,0.04) 45%, transparent 70%)",
          }}
          aria-hidden
        />
        <div
          className="pointer-events-none absolute bottom-0 right-[-12%] h-[26rem] w-[26rem] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(16,185,129,0.08) 0%, transparent 65%)",
          }}
          aria-hidden
        />
        <ContactPanel />
      </section>
    </main>
  );
}
