import { lazy, Suspense } from "react";
import { motion } from "framer-motion";
import { Marquee } from "./Marquee";
import { copy, type Locale } from "@/lib/portfolio-content";

const Scene3D = lazy(() => import("./Scene3D").then((module) => ({ default: module.Scene3D })));

export function Hero({ locale, onSceneReady }: { locale: Locale; onSceneReady: () => void }) {
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
        <Scene3D className="absolute inset-0 z-0" onReady={onSceneReady} />
      </Suspense>
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-44 bg-gradient-to-b from-[#0d0a18] to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-72 bg-gradient-to-t from-[#0d0a18] via-[#0d0a18]/65 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 top-20 z-20 md:top-16">
        <Marquee className="text-[12vw] font-semibold leading-[0.95] tracking-tight text-white md:text-[8vw]">
          {t.phrases.map((phrase) => (
            <span key={phrase} className="flex items-center pr-12">
              <span className="font-display">{phrase}</span>
              <span className="mx-10 text-[var(--violet)]">•</span>
            </span>
          ))}
        </Marquee>
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 hidden md:block">
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
      <h1 className="sr-only">Rümeysa Ahsen Çiçek — {t.headline}</h1>
      <div className="pointer-events-none absolute inset-0 z-30">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="absolute bottom-[28%] left-6 hidden max-w-[220px] isolate md:left-10 md:block"
        >
          <div className="absolute -inset-x-7 -inset-y-6 -z-10 bg-[#0d0a18]/15 backdrop-blur-[18px] [mask-image:radial-gradient(ellipse_70%_85%_at_center,black_25%,transparent_100%)]" />
          <p className="font-mono text-[20px] uppercase tracking-[0.3em] text-white">
            {locale === "tr" ? "Son çalışma" : "Most recently"}
          </p>
          <p className="mt-2 text-sm leading-snug text-white/80">{t.sideRecent}</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="absolute bottom-[28%] right-6 hidden max-w-[230px] isolate text-right md:right-10 md:block"
        >
          <div className="absolute -inset-x-7 -inset-y-6 -z-10 bg-[#0d0a18]/15 backdrop-blur-[18px] [mask-image:radial-gradient(ellipse_70%_85%_at_center,black_25%,transparent_100%)]" />
          <p className="text-[18px] uppercase tracking-[0.3em] text-white">Rümeysa Ahsen Çiçek</p>
          <p className="mt-2 text-sm leading-snug text-white/80">{t.sideBio}</p>
        </motion.div>
      </div>
      <div className="pointer-events-none absolute inset-x-6 bottom-8 z-30 isolate md:hidden">
        <div className="absolute -inset-x-3 -inset-y-3 -z-10 bg-[#0d0a18]/25 backdrop-blur-xl [mask-image:linear-gradient(to_right,black_70%,transparent)]" />
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-white">
          Rümeysa Ahsen Çiçek
        </p>
        <p className="mt-2 max-w-xs text-sm leading-snug text-white/80">{t.sideBio}</p>
      </div>
    </section>
  );
}
