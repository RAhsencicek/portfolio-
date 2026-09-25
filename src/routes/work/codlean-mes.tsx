import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

export const Route = createFileRoute("/work/codlean-mes")({
  head: () => ({
    meta: [
      { title: "Codlean MES — Industrial AI Case Study | Rümeysa Ahsen Çiçek" },
      {
        name: "description",
        content:
          "How Rümeysa Ahsen Çiçek built and delivered a working industrial AI engine with live machine data, predictive maintenance, explainable ML, on-premise LLM, and specialized agents.",
      },
      { property: "og:title", content: "Codlean MES — Industrial AI Case Study" },
      {
        property: "og:description",
        content: "From live factory signals to explainable maintenance decisions.",
      },
    ],
  }),
  component: CodleanCaseStudy,
});

const stages = [
  {
    number: "01",
    title: "Live data",
    text: "Apache Kafka streams brought real HPR machine signals into the system. Collection and state layers kept readings available for monitoring and analysis.",
  },
  {
    number: "02",
    title: "Prediction & evidence",
    text: "A predictive model, risk scoring, engineering rules, and SHAP / DLIME explanations turned sensor patterns into findings that an operator could inspect.",
  },
  {
    number: "03",
    title: "Local intelligence",
    text: "Llama 3.1 ran on-premise. Five specialized agents supported machine-level questions, diagnosis, actions, reports, and fleet analysis.",
  },
  {
    number: "04",
    title: "Operator experience",
    text: "The working dashboard presented live status, alerts, risk, and an AI assistant. I handed the system to the team for the next SCADA screen integration step.",
  },
];

function Shot({ src, alt, caption }: { src: string; alt: string; caption: string }) {
  return (
    <figure className="overflow-hidden rounded-2xl border border-white/10 bg-[#12151d]">
      <a href={src} target="_blank" rel="noreferrer" aria-label={"Open full-size image: " + alt}>
        <img src={src} alt={alt} className="block h-auto w-full" loading="lazy" />
      </a>
      <figcaption className="flex flex-wrap items-center justify-between gap-2 border-t border-white/10 px-5 py-4 font-mono text-[11px] uppercase tracking-[0.16em] text-white/55">
        <span>{caption}</span>
        <a
          href={src}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1 text-white/80 hover:text-white"
        >
          View full size <ArrowUpRight size={13} />
        </a>
      </figcaption>
    </figure>
  );
}

function CodleanCaseStudy() {
  return (
    <main className="min-h-screen bg-[var(--ink)] text-white">
      <div className="mx-auto max-w-[1500px] px-6 pb-24 pt-8 md:px-10 md:pb-32">
        <nav className="flex items-center justify-between gap-4 border-b border-white/15 pb-7 font-mono text-xs uppercase tracking-[0.18em]">
          <Link
            to="/"
            hash="work"
            className="inline-flex items-center gap-2 text-white/70 transition-colors hover:text-white"
          >
            <ArrowLeft size={15} /> All work
          </Link>
          <span className="text-white/45">Rümeysa Ahsen Çiçek / Case study 01</span>
        </nav>

        <header className="grid gap-8 pb-12 pt-20 lg:grid-cols-[1.2fr_0.8fr] lg:items-end lg:gap-16 lg:pb-20 lg:pt-28">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-[var(--violet-glow)]">
              Industrial AI · Predictive maintenance · 2026
            </p>
            <h1 className="mt-6 font-display text-[clamp(4rem,9vw,9rem)] font-medium leading-[0.9] tracking-tight">
              Codlean
              <br />
              MES
            </h1>
          </div>
          <div>
            <p className="font-display text-2xl leading-snug md:text-4xl">
              From live factory signals to decisions operators can use.
            </p>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-white/65">
              I designed, built, and delivered an operational AI engine for fault prediction using
              real customer machine data. Its live dashboard, predictive model, local LLM, and
              multi-agent analysis worked together as one system.
            </p>
          </div>
        </header>

        <Shot
          src="/images/mes-dashboard.png"
          alt="Six machine cards in the Codlean MES live dashboard, each showing status, risk score, and sensor readings"
          caption="Delivered system · Live machine dashboard and event stream"
        />

        <section className="grid gap-8 border-b border-white/15 py-20 md:grid-cols-[0.7fr_1.3fr] md:gap-20">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-[var(--violet-glow)]">
            01 / The challenge
          </p>
          <div>
            <h2 className="font-display text-3xl font-medium leading-tight md:text-5xl">
              Machine data is only useful when it leads to a clear next action.
            </h2>
            <p className="mt-7 max-w-3xl text-lg leading-relaxed text-white/65">
              The system had to follow live industrial signals, identify developing faults, and
              explain why a machine deserved attention. An operator needed more than a score:
              current evidence, context, and a practical recommendation.
            </p>
          </div>
        </section>

        <section className="border-b border-white/15 py-20">
          <div className="grid gap-8 md:grid-cols-[0.7fr_1.3fr] md:gap-20">
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-[var(--violet-glow)]">
              02 / What I built
            </p>
            <div>
              <h2 className="font-display text-3xl font-medium leading-tight md:text-5xl">
                One connected path from sensor reading to explanation.
              </h2>
              <p className="mt-7 max-w-3xl text-lg leading-relaxed text-white/65">
                I owned the AI engine end to end, including the real-time data pipeline, predictive
                and explainability layers, local model integration, agents, APIs, and the
                operator-facing analysis flow.
              </p>
            </div>
          </div>
          <ol className="mt-14 grid gap-px overflow-hidden rounded-xl bg-white/15 md:grid-cols-2">
            {stages.map((stage) => (
              <li key={stage.number} className="bg-[#1a1a21] p-7 md:p-10">
                <span className="font-mono text-xs text-[var(--violet-glow)]">
                  {stage.number} / 04
                </span>
                <h3 className="mt-6 font-display text-2xl font-medium md:text-3xl">
                  {stage.title}
                </h3>
                <p className="mt-4 max-w-xl leading-relaxed text-white/60">{stage.text}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="border-b border-white/15 py-20">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-[var(--violet-glow)]">
                03 / In use
              </p>
              <h2 className="mt-5 font-display text-3xl font-medium md:text-5xl">
                The analysis was visible and actionable.
              </h2>
            </div>
            <p className="max-w-sm text-white/55">
              Screens from different stages of the working system, showing fleet-level analysis and
              a machine-specific explanation. Some interface labels reflect earlier builds.
            </p>
          </div>
          <div className="mt-10 grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
            <Shot
              src="/images/mes-fleet-analysis.png"
              alt="Codlean AI assistant showing fleet analysis and machine risk summaries"
              caption="Earlier assistant interface · Fleet analysis"
            />
            <Shot
              src="/images/mes-risk-explanation.png"
              alt="Machine-specific response with risk score, evidence, and recommended action"
              caption="Machine analysis · Evidence and next action"
            />
          </div>
        </section>

        <section className="grid gap-12 border-b border-white/15 py-20 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-[var(--violet-glow)]">
              04 / Measured results
            </p>
            <h2 className="mt-5 font-display text-3xl font-medium md:text-5xl">
              A working system, with measurable impact.
            </h2>
            <p className="mt-7 max-w-xl leading-relaxed text-white/60">
              The figures below are project outcomes documented in my engineering CV. They describe
              the model and processing pipeline delivered with the system.
            </p>
          </div>
          <dl className="grid gap-6 sm:grid-cols-3">
            <div className="border-t border-white/20 pt-5">
              <dt className="text-sm text-white/50">Predictive model AUC</dt>
              <dd className="mt-3 font-display text-4xl md:text-5xl">98.5%</dd>
            </div>
            <div className="border-t border-white/20 pt-5">
              <dt className="text-sm text-white/50">Processing latency reduction</dt>
              <dd className="mt-3 font-display text-4xl md:text-5xl">40%</dd>
            </div>
            <div className="border-t border-white/20 pt-5">
              <dt className="text-sm text-white/50">Unplanned downtime reduction</dt>
              <dd className="mt-3 font-display text-4xl md:text-5xl">25%</dd>
            </div>
          </dl>
        </section>

        <section className="grid gap-8 border-b border-white/15 py-20 md:grid-cols-[0.7fr_1.3fr] md:gap-20">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-[var(--violet-glow)]">
            05 / Delivery
          </p>
          <div>
            <h2 className="font-display text-3xl font-medium leading-tight md:text-5xl">
              Delivered as a functioning system.
            </h2>
            <p className="mt-7 max-w-3xl text-lg leading-relaxed text-white/65">
              The fault prediction, locally running LLM, agent workflow, and dashboard were used
              together with real customer data. At my handoff, I delivered the project to the wider
              team for connection to the SCADA screens. That screen integration was the next team
              step.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="https://github.com/RAhsencicek/codleanMES"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/25 px-5 py-3 font-mono text-xs uppercase tracking-[0.15em] transition-colors hover:bg-white hover:text-[var(--ink)]"
              >
                Core system <ArrowUpRight size={14} />
              </a>
              <a
                href="https://github.com/RAhsencicek/codlean-scada-integration"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/25 px-5 py-3 font-mono text-xs uppercase tracking-[0.15em] transition-colors hover:bg-white hover:text-[var(--ink)]"
              >
                SCADA API <ArrowUpRight size={14} />
              </a>
              <a
                href="https://github.com/RAhsencicek/codlean-ai-gateway"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/25 px-5 py-3 font-mono text-xs uppercase tracking-[0.15em] transition-colors hover:bg-white hover:text-[var(--ink)]"
              >
                AI gateway <ArrowUpRight size={14} />
              </a>
            </div>
          </div>
        </section>

        <footer className="flex flex-wrap items-end justify-between gap-8 pt-20">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-[var(--violet-glow)]">
              Have a similar challenge?
            </p>
            <h2 className="mt-4 font-display text-4xl font-medium md:text-6xl">
              Let&apos;s build what works.
            </h2>
          </div>
          <a
            href="mailto:ahsen.cicek752@gmail.com"
            className="inline-flex items-center gap-2 rounded-full bg-[var(--violet)] px-6 py-4 font-mono text-xs uppercase tracking-[0.2em] text-white transition-transform hover:scale-[1.03]"
          >
            Start a conversation <ArrowUpRight size={16} />
          </a>
        </footer>
      </div>
    </main>
  );
}
