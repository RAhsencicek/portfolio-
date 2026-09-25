import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";
import { ScrollSection } from "./ScrollReveal";
import { casePath, copy, projects, type Locale, type Project } from "@/lib/portfolio-content";

function ProjectVisual({
  project,
  locale,
  featured = false,
}: {
  project: Project;
  locale: Locale;
  featured?: boolean;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-white/10 bg-[#171b23] ${featured ? "aspect-[16/10]" : "aspect-[16/10]"}`}
    >
      {project.image && (
        <img
          src={project.image}
          alt={
            featured
              ? locale === "tr"
                ? "Codlean MES canlı makine paneli"
                : "Codlean MES live machine dashboard"
              : ""
          }
          className={`h-full w-full ${featured ? "object-contain" : "object-cover"} transition-transform duration-500 group-hover:scale-[1.025]`}
          loading="lazy"
        />
      )}
      {!featured && (
        <span className="absolute bottom-3 right-3 rounded-full border border-white/20 bg-[#111019]/85 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.1em] text-white/75 backdrop-blur">
          {copy[locale].work.visual}
        </span>
      )}
    </div>
  );
}

function ProjectDialog({
  project,
  locale,
  onClose,
}: {
  project: Project | null;
  locale: Locale;
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const t = copy[locale].work;
  useEffect(() => {
    if (!project) return;
    const previousFocus = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key !== "Tab") return;
      const focusable = Array.from(
        dialogRef.current?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ) ?? [],
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
      previousFocus?.focus();
    };
  }, [project, onClose]);
  if (typeof document === "undefined") return null;
  return createPortal(
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-3 backdrop-blur-xl md:p-8"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) onClose();
          }}
        >
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-dialog-title"
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.25 }}
            className="relative grid max-h-[90svh] w-full max-w-5xl overflow-y-auto rounded-2xl border border-white/15 bg-[#181820] text-white shadow-2xl lg:grid-cols-[0.85fr_1.15fr]"
          >
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label={t.close}
              className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/75 text-white hover:bg-white hover:text-black"
            >
              <X size={18} />
            </button>
            <div className="relative min-h-56 bg-[#12151d] lg:min-h-full">
              {project.image && (
                <img
                  src={project.image}
                  alt={project.caseStudy ? (locale === "tr" ? "MES paneli" : "MES dashboard") : ""}
                  className={`h-full w-full ${project.caseStudy ? "object-contain" : "object-cover"}`}
                />
              )}
              {!project.caseStudy && (
                <span className="absolute bottom-4 left-4 rounded-full bg-black/70 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.1em]">
                  {t.visual}
                </span>
              )}
            </div>
            <div className="p-7 md:p-10">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--violet-glow)]">
                {project.category} · {project.year}
              </p>
              <h2
                id="project-dialog-title"
                className="mt-4 font-display text-4xl font-medium md:text-5xl"
              >
                {project.title}
              </h2>
              <p className="mt-2 text-sm text-white/55">{project.role}</p>
              <p className="mt-6 text-lg leading-relaxed text-white/85">{project.summary}</p>
              <dl className="mt-8 space-y-5 border-t border-white/15 pt-7">
                {[
                  [t.challenge, project.challenge],
                  [t.contribution, project.contribution],
                  [t.result, project.result],
                ].map(([label, value]) => (
                  <div key={label}>
                    <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--violet-glow)]">
                      {label}
                    </dt>
                    <dd className="mt-2 leading-relaxed text-white/70">{value}</dd>
                  </div>
                ))}
              </dl>
              <ul className="mt-7 flex flex-wrap gap-2">
                {project.stack.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-white/20 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.08em] text-white/65"
                  >
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap gap-3">
                {project.caseStudy && (
                  <Link
                    to={casePath(locale)}
                    onClick={onClose}
                    className="inline-flex items-center gap-2 rounded-full bg-[var(--violet)] px-5 py-3 font-mono text-[11px] uppercase tracking-[0.1em]"
                  >
                    {t.caseStudy} <ArrowUpRight size={14} />
                  </Link>
                )}
                {project.links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-white/25 px-5 py-3 font-mono text-[11px] uppercase tracking-[0.1em] hover:bg-white hover:text-[var(--ink)]"
                  >
                    {link.label} <ArrowUpRight size={14} />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}

export function Projects({ locale }: { locale: Locale }) {
  const [active, setActive] = useState<Project | null>(null);
  const closeDialog = useCallback(() => setActive(null), []);
  const [mes, ...other] = projects[locale];
  const featured = other.filter((project) => project.priority);
  const compact = other.filter((project) => !project.priority);
  const t = copy[locale].work;
  return (
    <ScrollSection id="work" className="relative bg-[var(--ink)] py-24 text-white md:py-32">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="flex items-end justify-between border-b border-white/15 pb-8">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-white/55">
            (02) {t.label}
          </p>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-white/55">2024 — 2026</p>
        </div>
        <div className="grid gap-8 py-12 lg:grid-cols-[1.12fr_0.88fr] lg:items-center lg:gap-16 lg:py-20">
          <button
            type="button"
            onClick={() => setActive(mes)}
            aria-haspopup="dialog"
            className="group w-full text-left focus-visible:outline-2 focus-visible:outline-[var(--violet-glow)]"
          >
            <ProjectVisual project={mes} locale={locale} featured />
          </button>
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--violet-glow)]">
              {t.featured}
            </p>
            <h2 className="mt-5 font-display text-5xl font-medium tracking-tight md:text-7xl">
              {mes.title}
            </h2>
            <p className="mt-5 max-w-xl text-xl leading-snug text-white/85 md:text-2xl">
              {t.summary}
            </p>
            <p className="mt-6 max-w-xl leading-relaxed text-white/65">{t.intro}</p>
            <dl className="mt-8 grid grid-cols-3 gap-3 border-y border-white/15 py-6">
              {t.metrics.map((label, index) => (
                <div key={label}>
                  <dd className="font-display text-2xl md:text-3xl">{t.metricValues[index]}</dd>
                  <dt className="mt-1 text-xs leading-snug text-white/55">{label}</dt>
                </div>
              ))}
            </dl>
            <Link
              to={casePath(locale)}
              className="mt-8 inline-flex items-center gap-2 border-b border-[var(--violet-glow)] pb-2 font-mono text-xs uppercase tracking-[0.16em] hover:text-[var(--violet-glow)]"
            >
              {t.explore} <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
        <div className="flex items-end justify-between border-b border-white/15 pb-6">
          <h3 className="font-display text-2xl font-medium md:text-3xl">{t.more}</h3>
          <span className="font-mono text-xs text-white/45">02 — 08</span>
        </div>
        <div className="grid gap-6 py-8 md:grid-cols-2">
          {featured.map((project) => (
            <button
              key={project.title}
              type="button"
              onClick={() => setActive(project)}
              aria-haspopup="dialog"
              aria-label={`${t.view}: ${project.title}`}
              className="group w-full rounded-2xl border border-white/15 p-4 text-left transition-colors hover:bg-white/[0.04] focus-visible:outline-2 focus-visible:outline-[var(--violet-glow)] md:p-6"
            >
              <ProjectVisual project={project} locale={locale} />
              <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--violet-glow)]">
                {project.category}
              </p>
              <h4 className="mt-2 font-display text-3xl font-medium md:text-4xl">
                {project.title}
              </h4>
              <p className="mt-2 text-sm text-white/55">{project.role}</p>
              <p className="mt-4 max-w-xl leading-relaxed text-white/70">{project.summary}</p>
              <span className="mt-5 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.15em]">
                {t.view} <ArrowUpRight size={14} />
              </span>
            </button>
          ))}
        </div>
        <div className="grid gap-x-8 md:grid-cols-2 lg:grid-cols-3">
          {compact.map((project) => (
            <button
              key={project.title}
              type="button"
              onClick={() => setActive(project)}
              aria-haspopup="dialog"
              aria-label={`${t.view}: ${project.title}`}
              className="group border-t border-white/15 py-7 text-left transition-colors hover:bg-white/[0.03] focus-visible:outline-2 focus-visible:outline-[var(--violet-glow)]"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--violet-glow)]">
                    {project.category}
                  </p>
                  <h4 className="mt-2 font-display text-2xl font-medium">{project.title}</h4>
                </div>
                <ArrowUpRight size={18} className="text-white/45" />
              </div>
              <p className="mt-3 text-sm leading-relaxed text-white/65">{project.summary}</p>
              <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.08em] text-white/45">
                {project.role}
              </p>
            </button>
          ))}
        </div>
      </div>
      <ProjectDialog project={active} locale={locale} onClose={closeDialog} />
    </ScrollSection>
  );
}
