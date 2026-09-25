import { motion } from "framer-motion";
import { Parallax, RevealLines, ScrollSection } from "./ScrollReveal";

const stats = [
  { value: "8", label: "Projects shipped" },
  { value: "2", label: "Conference papers" },
  { value: "1", label: "Open dataset" },
  { value: "Finalist", label: "TEKNOFEST 2025" },
];

export function About() {
  return (
    <ScrollSection id="about" className="relative bg-[var(--canvas)] py-32">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <Parallax speed={0.12} className="mb-16 flex items-end justify-between">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-[var(--muted-foreground)]">
            (01) About
          </p>
          <p className="hidden font-mono text-xs uppercase tracking-[0.3em] text-[var(--muted-foreground)] md:block">
            Fırat University · Class of '26
          </p>
        </Parallax>

        <h2 className="max-w-5xl font-display text-balance text-3xl font-medium leading-[1.15] tracking-tight text-[var(--ink)] md:text-6xl">
          <RevealLines text="I turn complex data into systems people can use — from live industrial signals and explainable AI to mobile products and published research. I build across the stack and stay close to the real problem." />
        </h2>

        <div className="mt-24 grid gap-10 border-t border-[var(--border)] pt-10 md:grid-cols-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
            >
              <div className="font-display text-5xl font-medium tracking-tight text-[var(--ink)] md:text-6xl">
                {s.value}
              </div>
              <div className="mt-3 font-mono text-xs uppercase tracking-[0.25em] text-[var(--muted-foreground)]">
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </ScrollSection>
  );
}
