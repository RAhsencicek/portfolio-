import { ScrollSection } from "./ScrollReveal";

const capabilities = [
  {
    number: "01",
    title: "Industrial data & AI",
    description:
      "Live data pipelines, risk scoring, predictive maintenance, and operator-facing decision support.",
    tools: ["Python", "Apache Kafka", "FastAPI", "SCADA", "XGBoost"],
  },
  {
    number: "02",
    title: "Models that explain themselves",
    description:
      "Training and evaluating models, then making their output understandable through evidence and context.",
    tools: ["PyTorch", "SHAP", "DLIME", "ONNX", "CoreML"],
  },
  {
    number: "03",
    title: "Products that reach people",
    description:
      "Building APIs and interfaces across web, mobile, and desktop to turn engineering work into usable software.",
    tools: ["React", "TypeScript", "SwiftUI", "Kotlin", ".NET"],
  },
];

export function Skills() {
  return (
    <ScrollSection className="relative bg-[var(--canvas)] py-24 md:py-32">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-[var(--muted-foreground)]">
          (05) Capabilities
        </p>
        <div className="mt-8 grid gap-10 border-b border-[var(--border)] pb-12 md:grid-cols-[0.8fr_1.2fr] md:gap-20">
          <h2 className="font-display text-4xl font-medium leading-tight text-[var(--ink)] md:text-6xl">
            The tools follow the problem.
          </h2>
          <p className="max-w-xl self-end text-lg leading-relaxed text-[var(--muted-foreground)]">
            I work across data, models, and software delivery. The common thread is a system that
            works outside a notebook and makes sense to the person using it.
          </p>
        </div>
        <div className="grid gap-px bg-[var(--border)] lg:grid-cols-3">
          {capabilities.map((item) => (
            <article
              key={item.number}
              className="flex flex-col bg-[var(--canvas)] py-10 lg:px-8 lg:first:pl-0 lg:last:pr-0"
            >
              <span className="font-mono text-xs text-[var(--violet)]">{item.number} / 03</span>
              <h3 className="mt-8 font-display text-3xl font-medium leading-tight text-[var(--ink)]">
                {item.title}
              </h3>
              <p className="mt-5 max-w-md leading-relaxed text-[var(--muted-foreground)]">
                {item.description}
              </p>
              <ul className="mt-8 flex flex-wrap gap-2 lg:mt-auto lg:pt-10">
                {item.tools.map((tool) => (
                  <li
                    key={tool}
                    className="rounded-full border border-[var(--border)] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--muted-foreground)]"
                  >
                    {tool}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </ScrollSection>
  );
}
