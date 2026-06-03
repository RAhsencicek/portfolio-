import { motion } from "framer-motion";
import { Parallax, ScrollSection } from "./ScrollReveal";

const experience = [
  {
    company: "Atasayar Teknoloji (Codlean)",
    location: "Düzce",
    role: "AI R&D Intern · Lead AI Engine Developer",
    period: "02/2026 — Present",
    summary:
      "Sole AI developer for CODLEAN MES. Built Kafka-based data streams, anomaly detection, and decision engines for predictive maintenance.",
  },
  {
    company: "Kriptarium LTD. ŞTİ.",
    location: "Elazığ",
    role: "AI Research Intern · Computer Vision & Mobile Deployment",
    period: "07/2025 — 09/2025",
    summary:
      "Benchmarked 20+ CNN/ViT models on DIBaS dataset. Converted MobileNetV3-Large to TorchScript/ONNX and deployed to iOS.",
  },
];

export function Experience() {
  return (
    <ScrollSection className="relative bg-[var(--canvas)] py-32">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <Parallax speed={0.12} className="mb-16 flex items-end justify-between">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-[var(--muted-foreground)]">
            (03) Experience
          </p>
        </Parallax>

        <div className="divide-y divide-[var(--border)] border-y border-[var(--border)]">
          {experience.map((e, i) => (
            <motion.div
              key={e.company}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group grid items-start gap-6 py-10 md:grid-cols-12"
            >
              <div className="font-mono text-xs uppercase tracking-[0.25em] text-[var(--muted-foreground)] md:col-span-2">
                {e.period}
              </div>
              <div className="md:col-span-5">
                <h3 className="font-display text-2xl font-medium tracking-tight text-[var(--ink)] md:text-3xl">
                  {e.company}
                </h3>
                <p className="mt-1 font-mono text-xs uppercase tracking-[0.25em] text-[var(--violet)]">
                  {e.role}
                </p>
              </div>
              <p className="text-base leading-relaxed text-[var(--muted-foreground)] md:col-span-5">
                {e.summary}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </ScrollSection>
  );
}