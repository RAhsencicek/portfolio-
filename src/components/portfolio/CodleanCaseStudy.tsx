import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { homePath, casePath, type Locale } from "@/lib/portfolio-content";
import { mesCaseCopy } from "@/lib/mes-case-copy";

function Shot({
  src,
  alt,
  caption,
  full,
}: {
  src: string;
  alt: string;
  caption: string;
  full: string;
}) {
  return (
    <figure className="overflow-hidden rounded-2xl border border-white/10 bg-[#12151d]">
      <a href={src} target="_blank" rel="noreferrer" aria-label={`${full}: ${alt}`}>
        <img src={src} alt={alt} className="block h-auto w-full" loading="lazy" />
      </a>
      <figcaption className="flex flex-wrap items-center justify-between gap-2 border-t border-white/10 px-5 py-4 font-mono text-[11px] uppercase tracking-[0.12em] text-white/60">
        <span>{caption}</span>
        <a
          href={src}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1 text-white/85 hover:text-white"
        >
          {full} <ArrowUpRight size={13} />
        </a>
      </figcaption>
    </figure>
  );
}

export function CodleanCaseStudy({ locale }: { locale: Locale }) {
  const t = mesCaseCopy[locale];
  const other: Locale = locale === "en" ? "tr" : "en";
  const repos = [
    "https://github.com/RAhsencicek/codleanMES",
    "https://github.com/RAhsencicek/codlean-scada-integration",
    "https://github.com/RAhsencicek/codlean-ai-gateway",
  ];
  return (
    <main className="min-h-screen bg-[var(--ink)] text-white">
      <div className="mx-auto max-w-[1500px] px-6 pb-24 pt-8 md:px-10 md:pb-32">
        <nav className="flex items-center justify-between gap-4 border-b border-white/15 pb-7 font-mono text-xs uppercase tracking-[0.15em]">
          <Link
            to={homePath(locale)}
            hash="work"
            className="inline-flex items-center gap-2 text-white/75 hover:text-white"
          >
            <ArrowLeft size={15} /> {t.back}
          </Link>
          <div className="flex items-center gap-4">
            <span className="hidden text-white/45 sm:inline">
              Rümeysa Ahsen Çiçek / {t.caseLabel}
            </span>
            <Link
              to={casePath(other)}
              className="rounded-full border border-white/25 px-3 py-1.5 hover:bg-white hover:text-black"
            >
              {locale === "en" ? "TR" : "EN"}
            </Link>
          </div>
        </nav>
        <header className="grid gap-8 pb-12 pt-20 lg:grid-cols-[1.2fr_0.8fr] lg:items-end lg:gap-16 lg:pb-20 lg:pt-28">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--violet-glow)]">
              {t.eyebrow}
            </p>
            <h1 className="mt-6 font-display text-[clamp(4rem,9vw,9rem)] font-medium leading-[0.9] tracking-tight">
              Codlean
              <br />
              MES
            </h1>
          </div>
          <div>
            <p className="font-display text-2xl leading-snug md:text-4xl">{t.headline}</p>
            <p className="mt-6 max-w-xl leading-relaxed text-white/70">{t.intro}</p>
          </div>
        </header>
        <Shot
          src="/images/mes-dashboard.png"
          alt={
            locale === "tr"
              ? "Altı makine kartlı canlı Codlean MES paneli"
              : "Codlean MES dashboard with six live machine cards"
          }
          caption={t.shot1}
          full={t.full}
        />
        <section className="grid gap-8 border-b border-white/15 py-20 md:grid-cols-[0.7fr_1.3fr] md:gap-20">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--violet-glow)]">
            01 / {t.challengeLabel}
          </p>
          <div>
            <h2 className="font-display text-3xl font-medium leading-tight md:text-5xl">
              {t.challengeTitle}
            </h2>
            <p className="mt-7 max-w-3xl text-lg leading-relaxed text-white/70">
              {t.challengeText}
            </p>
          </div>
        </section>
        <section className="border-b border-white/15 py-20">
          <div className="grid gap-8 md:grid-cols-[0.7fr_1.3fr] md:gap-20">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--violet-glow)]">
              02 / {t.buildLabel}
            </p>
            <div>
              <h2 className="font-display text-3xl font-medium leading-tight md:text-5xl">
                {t.buildTitle}
              </h2>
              <p className="mt-7 max-w-3xl text-lg leading-relaxed text-white/70">{t.buildText}</p>
            </div>
          </div>
          <ol className="mt-14 grid gap-px overflow-hidden rounded-xl bg-white/15 md:grid-cols-2">
            {t.stages.map((stage, index) => (
              <li key={stage.title} className="bg-[#1a1a21] p-7 md:p-10">
                <span className="font-mono text-xs text-[var(--violet-glow)]">
                  {String(index + 1).padStart(2, "0")} / 04
                </span>
                <h3 className="mt-6 font-display text-2xl font-medium md:text-3xl">
                  {stage.title}
                </h3>
                <p className="mt-4 max-w-xl leading-relaxed text-white/65">{stage.text}</p>
              </li>
            ))}
          </ol>
        </section>
        <section className="border-b border-white/15 py-20">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--violet-glow)]">
                03 / {t.useLabel}
              </p>
              <h2 className="mt-5 font-display text-3xl font-medium md:text-5xl">{t.useTitle}</h2>
            </div>
            <p className="max-w-sm text-white/60">{t.useText}</p>
          </div>
          <div className="mt-10 grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
            <Shot
              src="/images/mes-fleet-analysis.png"
              alt={
                locale === "tr"
                  ? "Filo analizi yapan Codlean yapay zekâ asistanı"
                  : "Codlean AI assistant fleet analysis"
              }
              caption={t.shot2}
              full={t.full}
            />
            <Shot
              src="/images/mes-risk-explanation.png"
              alt={
                locale === "tr"
                  ? "Makine risk puanı ve kanıtlı aksiyon önerisi"
                  : "Machine risk score and evidence-based action"
              }
              caption={t.shot3}
              full={t.full}
            />
          </div>
        </section>
        <section className="grid gap-12 border-b border-white/15 py-20 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--violet-glow)]">
              04 / {t.resultsLabel}
            </p>
            <h2 className="mt-5 font-display text-3xl font-medium md:text-5xl">{t.resultsTitle}</h2>
            <p className="mt-7 max-w-xl leading-relaxed text-white/65">{t.resultsText}</p>
          </div>
          <dl className="grid gap-6 sm:grid-cols-3">
            {t.results.map((result) => (
              <div key={result.label} className="border-t border-white/20 pt-5">
                <dt className="text-sm text-white/60">{result.label}</dt>
                <dd className="mt-3 font-display text-4xl md:text-5xl">{result.value}</dd>
              </div>
            ))}
          </dl>
        </section>
        <section className="grid gap-8 border-b border-white/15 py-20 md:grid-cols-[0.7fr_1.3fr] md:gap-20">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--violet-glow)]">
            05 / {t.deliveryLabel}
          </p>
          <div>
            <h2 className="font-display text-3xl font-medium leading-tight md:text-5xl">
              {t.deliveryTitle}
            </h2>
            <p className="mt-7 max-w-3xl text-lg leading-relaxed text-white/70">{t.deliveryText}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              {repos.map((href, index) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/25 px-5 py-3 font-mono text-xs uppercase tracking-[0.12em] hover:bg-white hover:text-[var(--ink)]"
                >
                  {t.repos[index]} <ArrowUpRight size={14} />
                </a>
              ))}
            </div>
          </div>
        </section>
        <footer className="flex flex-wrap items-end justify-between gap-8 pt-20">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--violet-glow)]">
              {t.footerLabel}
            </p>
            <h2 className="mt-4 font-display text-4xl font-medium md:text-6xl">{t.footerTitle}</h2>
          </div>
          <a
            href="mailto:ahsen.cicek752@gmail.com"
            className="inline-flex items-center gap-2 rounded-full bg-[var(--violet)] px-6 py-4 font-mono text-xs uppercase tracking-[0.16em]"
          >
            {t.contact} <ArrowUpRight size={16} />
          </a>
        </footer>
      </div>
    </main>
  );
}
