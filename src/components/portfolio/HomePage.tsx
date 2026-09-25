import { CustomCursor } from "./CustomCursor";
import { Nav } from "./Nav";
import { Hero } from "./Hero";
import { About } from "./About";
import { Projects } from "./Projects";
import { Experience } from "./Experience";
import { Publications } from "./Publications";
import { Skills } from "./Skills";
import { Contact } from "./Contact";
import type { Locale } from "@/lib/portfolio-content";

export function HomePage({ locale }: { locale: Locale }) {
  return (
    <main className="relative bg-[var(--canvas)] text-[var(--ink)]">
      <CustomCursor />
      <Nav locale={locale} />
      <Hero locale={locale} />
      <About locale={locale} />
      <Projects locale={locale} />
      <Experience locale={locale} />
      <Publications locale={locale} />
      <Skills locale={locale} />
      <Contact locale={locale} />
    </main>
  );
}
