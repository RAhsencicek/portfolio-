import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { MotionConfig, useReducedMotion } from "framer-motion";

type Ctx = { reduced: boolean; toggle: () => void; setReduced: (v: boolean) => void };

const MotionPrefContext = createContext<Ctx>({
  reduced: false,
  toggle: () => {},
  setReduced: () => {},
});

const STORAGE_KEY = "ahsen-portfolio:reduced-motion";

export function MotionPrefProvider({ children }: { children: ReactNode }) {
  const systemReduced = useReducedMotion();
  const [reduced, setReduced] = useState(false);

  // Hydrate from localStorage / system preference once on mount
  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "1") setReduced(true);
    else if (stored === "0") setReduced(false);
    else if (systemReduced) setReduced(true);
  }, [systemReduced]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(STORAGE_KEY, reduced ? "1" : "0");
  }, [reduced]);

  return (
    <MotionPrefContext.Provider
      value={{ reduced, toggle: () => setReduced((v) => !v), setReduced }}
    >
      <MotionConfig reducedMotion={reduced ? "always" : "never"}>{children}</MotionConfig>
    </MotionPrefContext.Provider>
  );
}

export function useMotionPref() {
  return useContext(MotionPrefContext);
}