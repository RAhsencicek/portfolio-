import { lazy, Suspense } from "react";
import { motion } from "framer-motion";
import { Marquee } from "./Marquee";
import { copy, type Locale } from "@/lib/portfolio-content";

const Scene3D = lazy(() => import("./Scene3D").then((module) => ({ default: module.Scene3D })));

export function Hero({ locale }: { locale: Locale }) {
  const t = copy[locale].hero;
  return (
    <section
      id="top"
      className="relative h-[100svh] min-h-[680px] w-full overflow-hidden bg-[#0d0a18] text-white"
    >
      <Suspense
        fallback={
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_60%,#332048_0%,#0d0a18_65%)]" />
        }
      >
        <Scene3D className="absolute inset-0 z-0" />
      </Suspense>
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-44 bg-gradient-to-b from-[#0d0a18] to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-72 bg-gradient-to-t from-[#0d0a18] via-[#0d0a18]/65 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 top-28 z-20 md:top-24">
        <Marquee className="text-[12vw] font-semibold leading-[0.95] tracking-tight text-white md:text-[8vw]">
          {t.phrases.map((phrase) => (
            <span key={phrase} className="flex items-center pr-12">
              <span className="font-display">{phrase}</span>
              <span className="mx-10 text-[var(--violet)]">•</span>
            </span>
          ))}
        </Marquee>
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-12 z-10 hidden md:block">
        <Marquee
          reverse
          className="text-[8vw] font-semibold leading-[0.95] tracking-tight text-white/10"
        >
          {t.phrases.map((phrase) => (
            <span key={phrase} className="flex items-center pr-12">
              <span className="font-display italic">{phrase}</span>
              <span className="mx-10">•</span>
            </span>
          ))}
        </Marquee>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="absolute inset-x-4 bottom-5 z-30 max-w-2xl rounded-2xl border border-white/20 bg-[#0d0a18]/85 p-5 backdrop-blur-xl md:inset-x-auto md:bottom-10 md:left-10 md:max-w-[470px] md:p-6"
      >
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--violet-glow)]">
          Rümeysa Ahsen Çiçek · {t.eyebrow}
        </p>
        <h1 className="mt-3 max-w-xl font-display text-2xl font-medium leading-tight md:text-3xl">
          {t.headline}
        </h1>
        <p className="mt-3 hidden max-w-xl text-sm leading-relaxed text-white/70 md:block">
          {t.recent}
        </p>
        <a
          href="#work"
          className="mt-4 inline-flex border-b border-[var(--violet-glow)] pb-1 font-mono text-[11px] uppercase tracking-[0.15em]"
        >
          {t.cta} ↗
        </a>
      </motion.div>
    </section>
  );
}
