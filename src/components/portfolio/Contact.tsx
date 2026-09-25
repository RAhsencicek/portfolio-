import { motion } from "framer-motion";
import { Marquee } from "./Marquee";
import { RevealLines, ScrollSection } from "./ScrollReveal";

const links = [
  { label: "Email", href: "mailto:ahsen.cicek752@gmail.com", value: "ahsen.cicek752@gmail.com" },
  { label: "GitHub", href: "https://github.com/RAhsencicek", value: "@RAhsencicek" },
  { label: "LinkedIn", href: "https://linkedin.com/in/rahsencicek/", value: "in/rahsencicek" },
  { label: "Phone", href: "tel:+905511523912", value: "+90 551 152 39 12" },
];

export function Contact() {
  return (
    <ScrollSection
      id="contact"
      className="relative overflow-hidden bg-[var(--ink)] pt-32 pb-12 text-white"
    >
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-white/50">(06) Contact</p>

        <h2 className="mt-10 max-w-5xl font-display text-balance text-5xl font-medium leading-[0.95] tracking-tight md:text-8xl">
          <RevealLines text="Let's build something that works in the real world." stagger={0.06} />
        </h2>

        <a
          href="mailto:ahsen.cicek752@gmail.com"
          className="mt-12 inline-flex items-center gap-3 rounded-full bg-[var(--violet)] px-8 py-4 font-mono text-sm uppercase tracking-[0.25em] text-white transition-transform hover:scale-[1.02]"
        >
          Start a conversation
          <span aria-hidden>→</span>
        </a>

        <div className="mt-24 grid gap-8 border-t border-white/10 pt-10 md:grid-cols-4">
          {links.map((l) => (
            <a key={l.label} href={l.href} target="_blank" rel="noreferrer" className="group">
              <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/40">
                {l.label}
              </div>
              <div className="mt-2 text-base text-white transition-colors group-hover:text-[var(--violet-glow)]">
                {l.value}
              </div>
            </a>
          ))}
        </div>
      </div>

      <div className="mt-24">
        <Marquee className="text-[18vw] font-semibold leading-none tracking-tight text-white/10">
          <span className="flex items-center pr-12">
            <span className="font-display">Let&apos;s Talk</span>
            <span className="mx-12">★</span>
            <span className="font-display italic">Let&apos;s Talk</span>
            <span className="mx-12">★</span>
          </span>
        </Marquee>
      </div>

      <div className="mx-auto mt-12 flex max-w-[1600px] flex-wrap items-center justify-between gap-4 px-6 font-mono text-xs uppercase tracking-[0.25em] text-white/40 md:px-10">
        <span>© {new Date().getFullYear()} Rümeysa Ahsen Çiçek</span>
        <span>Built in Istanbul</span>
      </div>
    </ScrollSection>
  );
}
