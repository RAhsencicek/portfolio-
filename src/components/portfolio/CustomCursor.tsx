import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 400, damping: 40, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 400, damping: 40, mass: 0.4 });
  const [variant, setVariant] = useState<"default" | "hover" | "view">("default");
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(pointer: fine)");
    setEnabled(mq.matches);
    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const t = e.target as HTMLElement | null;
      if (t?.closest("[data-cursor='view']")) setVariant("view");
      else if (t?.closest("a, button, [role='button']")) setVariant("hover");
      else setVariant("default");
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [x, y]);

  if (!enabled) return null;

  const size = variant === "view" ? 96 : variant === "hover" ? 44 : 14;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[90] flex items-center justify-center rounded-full mix-blend-difference"
      style={{
        x: sx,
        y: sy,
        translateX: "-50%",
        translateY: "-50%",
        background: variant === "default" ? "#fff" : "rgba(255,255,255,0.95)",
      }}
      animate={{ width: size, height: size }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      {variant === "view" && (
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-black">
          View
        </span>
      )}
    </motion.div>
  );
}