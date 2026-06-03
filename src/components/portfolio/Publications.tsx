import { motion } from "framer-motion";
import { Parallax, ScrollSection } from "./ScrollReveal";

const items = [
  {
    kind: "Conference Paper",
    title:
      "Lightweight CNN Models Outperform Vision Transformers on a Small-Scale Medical Imaging Dataset: The DIBaS Bacterial Colony Case Study",
    venue: "ICSIS 2025",
    year: "2025",
  },
  {
    kind: "Conference Paper",
    title:
      "LGS Sınav Sorularını Tahmin Eden ve Üreten Yapay Zekâ Modeli: SWOT Analizi, Literatür Taraması ve LGS-Türkçe-QA Veri Seti",
    venue: "ICSIS 2025",
    year: "2025",
  },
  {
    kind: "Dataset",
    title: "LGS Türkçe Soru Veri Seti (Turkish LGS Exam Question Dataset) v1.0",
    venue: "Zenodo · doi.org/10.5281/zenodo.18304976",
    year: "2026",
    href: "https://doi.org/10.5281/zenodo.18304976",
  },
];

export function Publications() {
  return (
    <ScrollSection className="relative bg-[var(--ink)] py-32 text-[var(--surface-foreground)]">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <Parallax speed={0.1} className="mb-16 flex items-end justify-between">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-white/50">
            (04) Research
          </p>
        </Parallax>

        <ul className="divide-y divide-white/10 border-y border-white/10">
          {items.map((it, i) => {
            const Inner = (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="grid items-start gap-6 py-10 transition-colors hover:bg-white/[0.03] md:grid-cols-12"
              >
                <span className="font-mono text-xs uppercase tracking-[0.25em] text-white/40 md:col-span-2">
                  {it.kind} · {it.year}
                </span>
                <h3 className="font-display text-balance text-xl font-medium leading-snug tracking-tight text-white md:col-span-8 md:text-2xl">
                  {it.title}
                </h3>
                <span className="font-mono text-xs uppercase tracking-[0.25em] text-[var(--violet-glow)] md:col-span-2 md:text-right">
                  {it.venue}
                </span>
              </motion.div>
            );
            return (
              <li key={it.title}>
                {it.href ? (
                  <a href={it.href} target="_blank" rel="noreferrer" className="block">
                    {Inner}
                  </a>
                ) : (
                  Inner
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </ScrollSection>
  );
}