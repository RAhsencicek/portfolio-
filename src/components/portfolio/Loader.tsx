import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export function Loader({ ready, locale }: { ready: boolean; locale: "en" | "tr" }) {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const readyRef = useRef(ready);

  useEffect(() => {
    readyRef.current = ready;
  }, [ready]);

  useEffect(() => {
    let frame = 0;
    let finishTimer = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const time = now - start;
      if ((readyRef.current && time >= 550) || time >= 2500) {
        setProgress(100);
        finishTimer = window.setTimeout(() => setDone(true), 120);
        return;
      }
      const next = Math.min(94, Math.round((time / 850) * 94));
      setProgress((current) => (current === next ? current : next));
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(finishTimer);
    };
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[var(--canvas)]"
          initial={{ opacity: 1 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.38, ease: [0.76, 0, 0.24, 1] }}
          role="status"
          aria-label={locale === "tr" ? "Site yükleniyor" : "Loading site"}
        >
          <div className="flex items-center gap-4 rounded-full bg-[var(--ink)] px-6 py-3 text-[var(--canvas)] shadow-[0_0_60px_-10px_var(--violet)]">
            <span className="font-mono text-xs uppercase tracking-[0.3em]">
              {locale === "tr" ? "Yükleniyor" : "Loading"}
            </span>
            <span className="font-mono text-sm tabular-nums">{progress}%</span>
            <div className="relative h-1.5 w-16 overflow-hidden rounded-full bg-white/15">
              <div
                className="absolute inset-y-0 left-0 bg-[var(--violet-glow)]"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
