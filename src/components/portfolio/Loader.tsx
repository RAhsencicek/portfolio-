import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export function Loader() {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const duration = 1600;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      setProgress(Math.round(t * 100));
      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setTimeout(() => setDone(true), 300);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[var(--canvas)]"
          initial={{ opacity: 1 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="flex items-center gap-4 rounded-full bg-[var(--ink)] px-6 py-3 text-[var(--canvas)] shadow-[0_0_60px_-10px_var(--violet)]">
            <span className="font-mono text-xs uppercase tracking-[0.3em]">Loading</span>
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