import { useState } from "react";
import { X, Menu } from "lucide-react";
import { useMotionPref } from "./MotionPref";
import { copy, homePath, type Locale } from "@/lib/portfolio-content";

export function Nav({ locale }: { locale: Locale }) {
  const { reduced, toggle } = useMotionPref();
  const [open, setOpen] = useState(false);
  const t = copy[locale].nav;
  const base = homePath(locale);
  const other = locale === "en" ? "tr" : "en";
  const links = [
    { label: t.work, hash: "work" },
    { label: t.about, hash: "about" },
    { label: t.contact, hash: "contact" },
  ];
  const switchLanguage = () => {
    const hash = typeof window === "undefined" ? "" : window.location.hash;
    window.location.href = homePath(other) + hash;
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 py-4 md:px-10 md:py-5">
      <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-4 rounded-full border border-white/20 bg-[#111019]/90 px-4 py-2.5 text-white shadow-xl backdrop-blur-xl md:bg-[#111019]/80 md:px-6">
        <a href={base + "#top"} className="font-mono text-xs font-medium tracking-wide md:text-sm">
          Rümeysa Ahsen Çiçek
        </a>
        <nav
          aria-label={locale === "tr" ? "Ana gezinme" : "Main navigation"}
          className="hidden items-center gap-7 font-mono text-[11px] uppercase tracking-[0.18em] md:flex"
        >
          {links.map((link) => (
            <a
              key={link.hash}
              href={base + "#" + link.hash}
              className="text-white/75 transition-colors hover:text-white"
            >
              {link.label}
            </a>
          ))}
          <a
            href={homePath(other)}
            onClick={(event) => {
              event.preventDefault();
              window.location.href = homePath(other) + window.location.hash;
            }}
            aria-label={locale === "tr" ? "Switch to English" : "Türkçeye geç"}
            className="rounded-full border border-white/30 px-3 py-1.5 hover:bg-white hover:text-black"
          >
            {locale === "tr" ? "EN" : "TR"}
          </a>
          <button
            type="button"
            onClick={toggle}
            aria-pressed={reduced}
            className="rounded-full border border-white/30 px-3 py-1.5 hover:bg-white hover:text-black"
          >
            {reduced ? t.motionOff : t.motionOn}
          </button>
        </nav>
        <button
          type="button"
          aria-expanded={open}
          aria-controls="mobile-portfolio-menu"
          aria-label={open ? t.close : t.menu}
          onClick={() => setOpen((value) => !value)}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-white/30 md:hidden"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>
      {open && (
        <nav
          id="mobile-portfolio-menu"
          aria-label={locale === "tr" ? "Mobil gezinme" : "Mobile navigation"}
          className="mx-auto mt-2 grid max-w-[1600px] gap-1 rounded-2xl border border-white/20 bg-[#111019] p-4 font-mono text-sm uppercase tracking-[0.16em] text-white shadow-2xl md:hidden"
        >
          {links.map((link) => (
            <a
              key={link.hash}
              href={base + "#" + link.hash}
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-3 hover:bg-white/10"
            >
              {link.label}
            </a>
          ))}
          <div className="mt-2 flex gap-2 border-t border-white/15 pt-4">
            <a
              href={homePath(other)}
              onClick={(event) => {
                event.preventDefault();
                window.location.href = homePath(other) + window.location.hash;
              }}
              className="rounded-full border border-white/30 px-4 py-2"
            >
              {locale === "tr" ? "English" : "Türkçe"}
            </a>
            <button
              type="button"
              onClick={toggle}
              aria-pressed={reduced}
              className="rounded-full border border-white/30 px-4 py-2"
            >
              {reduced ? t.motionOff : t.motionOn}
            </button>
          </div>
        </nav>
      )}
    </header>
  );
}
