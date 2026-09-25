import { motion } from "framer-motion";

const experience = [
  {
    number: "01",
    company: "Atasayar Teknoloji (Codlean)",
    location: "Düzce, Türkiye",
    role: "AI Engine Developer · Co-op",
    period: "Feb — Jun 2026",
    theme: "Industrial AI · Client delivery",
    summary:
      "Owned the AI engine of a working manufacturing execution system, from live customer machine data to decisions operators could understand and act on.",
    metrics: [
      { value: "98.5%", label: "predictive model AUC" },
      { value: "5", label: "specialized AI agents" },
      { value: "40%", label: "lower processing latency" },
    ],
    details: [
      "Built Kafka and FastAPI data pipelines, validation and state management for live machine signals.",
      "Trained the XGBoost fault prediction model and added SHAP and DLIME explanations alongside a local Llama 3.1 assistant.",
      "Delivered the complete working system with real customer data; the next team step at handoff was connecting it to SCADA screens.",
    ],
  },
  {
    number: "02",
    company: "Kriptarium LTD. ŞTİ.",
    location: "Elazığ, Türkiye",
    role: "Software & AI Engineer · Internship",
    period: "Aug — Oct 2025",
    theme: "Computer vision · Edge deployment",
    summary:
      "Moved medical-image models beyond a training notebook: comparison, deployment optimization and companion mobile software.",
    metrics: [
      { value: "20+", label: "CNN and ViT models" },
      { value: "95.45%", label: "top-1 accuracy" },
      { value: "60%", label: "faster inference" },
    ],
    details: [
      "Benchmarked architectures on the 33-class DIBaS bacterial-colony dataset with PyTorch and TensorFlow.",
      "Prepared models for ONNX Runtime, CoreML and TorchScript, and built an Android companion app in Kotlin and Jetpack Compose.",
      "Joined the TÜBİTAK BiGG CUBE entrepreneurship program with teammates; the application was shortlisted.",
    ],
  },
];

export function Experience() {
  return (
    <section className="relative bg-[var(--canvas)] pb-14 pt-24 text-[var(--ink)] md:pb-20 md:pt-28">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="grid gap-6 pb-14 md:grid-cols-[1fr_1fr] md:items-end md:gap-16 md:pb-20">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-[var(--violet)]">
              (03) Experience
            </p>
            <h2 className="mt-6 max-w-2xl font-display text-5xl font-medium leading-[0.98] tracking-tight md:text-7xl">
              From model to working system.
            </h2>
          </div>
          <p className="max-w-lg text-base leading-relaxed text-[var(--muted-foreground)] md:justify-self-end md:text-lg">
            I work where research, engineering and product delivery meet. These roles took me from
            model evaluation to software used with real operational data.
          </p>
        </div>

        <div className="border-t border-[var(--border)]">
          {experience.map((item, index) => (
            <motion.article
              key={item.company}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.55, delay: index * 0.08 }}
              className="grid gap-8 border-b border-[var(--border)] py-12 md:grid-cols-[minmax(165px,0.24fr)_minmax(0,1fr)] md:gap-12 md:py-16"
            >
              <div className="flex items-start gap-6 md:block">
                <span className="font-display text-5xl leading-none text-[var(--violet)]/45 md:text-6xl">
                  {item.number}
                </span>
                <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--muted-foreground)] md:mt-8">
                  <p>{item.period}</p>
                  <p className="mt-2">{item.location}</p>
                </div>
              </div>

              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-[var(--violet)]">
                  {item.theme}
                </p>
                <div className="mt-4 flex flex-wrap items-baseline gap-x-5 gap-y-2">
                  <h3 className="font-display text-3xl font-medium tracking-tight md:text-5xl">
                    {item.company}
                  </h3>
                  <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--muted-foreground)]">
                    {item.role}
                  </span>
                </div>
                <p className="mt-6 max-w-3xl text-lg leading-relaxed md:text-xl">{item.summary}</p>

                <div className="mt-8 grid grid-cols-3 gap-px overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--border)]">
                  {item.metrics.map((metric) => (
                    <div key={metric.label} className="bg-[var(--canvas)] p-4 md:p-6">
                      <strong className="block font-display text-2xl font-medium md:text-4xl">
                        {metric.value}
                      </strong>
                      <span className="mt-2 block text-xs leading-snug text-[var(--muted-foreground)]">
                        {metric.label}
                      </span>
                    </div>
                  ))}
                </div>

                <ul className="mt-8 grid gap-4 md:grid-cols-2 md:gap-x-10">
                  {item.details.map((detail) => (
                    <li
                      key={detail}
                      className="flex gap-3 text-sm leading-relaxed text-[var(--muted-foreground)] md:text-base"
                    >
                      <span
                        aria-hidden
                        className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--violet)]"
                      />
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
