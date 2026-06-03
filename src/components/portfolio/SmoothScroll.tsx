import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";
import { useMotionPref } from "./MotionPref";

export function SmoothScroll({ children }: { children: ReactNode }) {
  const { reduced } = useMotionPref();

  useEffect(() => {
    if (typeof window === "undefined" || reduced) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.2,
    });

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    // Disable native CSS smooth scroll while Lenis is active
    document.documentElement.style.scrollBehavior = "auto";

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      document.documentElement.style.scrollBehavior = "";
    };
  }, [reduced]);

  return <>{children}</>;
}