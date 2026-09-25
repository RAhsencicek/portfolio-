import { motion } from "framer-motion";
import { Parallax, RevealLines, ScrollSection } from "./ScrollReveal";
import { copy, type Locale } from "@/lib/portfolio-content";

export function About({ locale }: { locale: Locale }) {
  const t = copy[locale].about;
  const stats = ["8", "2", "1", "Finalist"];
  return (
    <ScrollSection id="about" className="relative bg-[var(--canvas)] py-32">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <Parallax speed={0.12} className="mb-16 flex items-end justify-between">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-[var(--muted-foreground)]">
            (01) {t.label}
          </p>
          <p className="hidden font-mono text-xs uppercase tracking-[0.3em] text-[var(--muted-foreground)] md:block">
            {t.class}
          </p>
        </Parallax>

        <h2 className="max-w-5xl font-display text-balance text-3xl font-medium leading-[1.15] tracking-tight text-[var(--ink)] md:text-6xl">
          <RevealLines text={t.statement} />
        </h2>

        <div className="mt-24 grid gap-10 border-t border-[var(--border)] pt-10 md:grid-cols-4">
          {stats.map((value, i) => (
            <motion.div
              key={t.stats[i]}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
            >
              <div className="font-display text-5xl font-medium tracking-tight text-[var(--ink)] md:text-6xl">
                {value}
              </div>
              <div className="mt-3 font-mono text-xs uppercase tracking-[0.25em] text-[var(--muted-foreground)]">
                {t.stats[i]}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </ScrollSection>
  );
}
