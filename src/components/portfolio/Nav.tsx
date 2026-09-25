import { useMotionPref } from "./MotionPref";

export function Nav() {
  const { reduced, toggle } = useMotionPref();
  return (
    <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-6 py-5 mix-blend-difference md:px-10">
      <a href="#top" className="font-mono text-sm font-medium text-white">
        Rümeysa Ahsen
      </a>
      <nav className="hidden items-center gap-8 font-mono text-xs uppercase tracking-[0.25em] text-white md:flex">
        <a href="#work" className="story-link">
          Work
        </a>
        <a href="#about" className="story-link">
          About
        </a>
        <a href="#contact" className="story-link">
          Contact
        </a>
        <button
          type="button"
          onClick={toggle}
          aria-pressed={reduced}
          title={reduced ? "Animasyonları aç" : "Animasyonları azalt"}
          className="flex items-center gap-2 rounded-full border border-white/40 px-3 py-1.5 text-[10px] transition-colors hover:bg-white hover:text-black"
        >
          <span
            className={`inline-block h-1.5 w-1.5 rounded-full ${reduced ? "bg-white/50" : "bg-[var(--violet-glow)]"}`}
            aria-hidden
          />
          {reduced ? "Motion: Off" : "Motion: On"}
        </button>
      </nav>
      <div className="flex items-center gap-2 md:hidden">
        <button
          type="button"
          onClick={toggle}
          aria-pressed={reduced}
          aria-label={reduced ? "Animasyonları aç" : "Animasyonları azalt"}
          className="rounded-full border border-white/40 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-white transition-colors hover:bg-white hover:text-black"
        >
          {reduced ? "Motion ⏸" : "Motion ▸"}
        </button>
        <a
          href="mailto:ahsen.cicek752@gmail.com"
          className="rounded-full border border-white/40 px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.25em] text-white transition-colors hover:bg-white hover:text-black"
        >
          Email
        </a>
      </div>
    </header>
  );
}
